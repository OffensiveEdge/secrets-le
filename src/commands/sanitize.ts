import * as vscode from 'vscode';
import * as nls from 'vscode-nls';
import { getConfiguration } from '../config/config';
import {
	detectSecretsInContent,
	formatSanitizationResults,
	sanitizeContent,
} from '../extraction/extract';
import type { Telemetry } from '../telemetry/telemetry';
import type { Notifier } from '../ui/notifier';
import type { StatusBar } from '../ui/statusBar';
import type { PerformanceMonitor } from '../utils/performance';
import { handleSafetyChecks } from '../utils/safety';

const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

/**
 * Register command to sanitize secrets in active document
 */
export function registerSanitizeCommand(
	context: vscode.ExtensionContext,
	deps: {
		readonly telemetry: Telemetry;
		readonly notifier: Notifier;
		readonly statusBar: StatusBar;
		readonly performanceMonitor: PerformanceMonitor;
	},
): void {
	const disposable = vscode.commands.registerCommand(
		'secrets-le.sanitize',
		async () => {
			deps.telemetry.event('sanitize-command-invoked');

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				deps.notifier.showWarning(
					localize(
						'runtime.sanitize.no-editor',
						'No active editor. Please open a file first.',
					),
				);
				return;
			}

			const config = getConfiguration();
			const document = editor.document;

			// Perform safety checks
			const safetyResult = handleSafetyChecks(document, config);
			if (!safetyResult.proceed) {
				if (safetyResult.error) {
					await deps.notifier.showEnhancedError(safetyResult.error);
				} else {
					deps.notifier.showError(safetyResult.message);
				}
				deps.telemetry.event('sanitize-blocked-by-safety', {
					reason: safetyResult.message,
				});
				return;
			}

			// Show warnings if any
			if (safetyResult.warnings.length > 0) {
				for (const warning of safetyResult.warnings) {
					deps.notifier.showWarning(warning);
				}
			}

			// Confirm before sanitizing
			const confirm = await vscode.window.showWarningMessage(
				localize(
					'runtime.sanitize.confirm',
					'This will replace detected secrets with placeholders. Continue?',
				),
				{ modal: true },
				localize('runtime.sanitize.confirm.yes', 'Yes, Sanitize'),
				localize('runtime.sanitize.confirm.no', 'Cancel'),
			);

			if (
				confirm !== localize('runtime.sanitize.confirm.yes', 'Yes, Sanitize')
			) {
				return;
			}

			// Process with progress indicator
			deps.statusBar.showProgress('Sanitizing secrets...');
			try {
				await deps.notifier.showProgress(
					localize('runtime.sanitize.progress', 'Sanitizing content...'),
					async (progress, token) => {
						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						const content = document.getText();
						const perfTracker = deps.performanceMonitor.startOperation(
							'sanitize',
							content.length,
						);

						progress.report({ message: 'Detecting secrets...', increment: 30 });

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// First detect secrets
						const detectionResult = detectSecretsInContent(content, {
							includeApiKeys: config.detectionIncludeApiKeys,
							includePasswords: config.detectionIncludePasswords,
							includeTokens: config.detectionIncludeTokens,
							includePrivateKeys: config.detectionIncludePrivateKeys,
							sensitivity: config.detectionSensitivity,
						});

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						if (detectionResult.secrets.length === 0) {
							deps.notifier.showInfo(
								localize(
									'runtime.sanitize.no-secrets',
									'No secrets found to sanitize.',
								),
							);
							perfTracker.end(0, 0, 0, 0);
							return;
						}

						progress.report({
							message: `Found ${detectionResult.secrets.length} secret(s)...`,
							increment: 30,
						});

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// Sanitize content
						const sanitizationResult = sanitizeContent(
							content,
							detectionResult.secrets,
							config.sanitizationReplaceWith,
						);

						progress.report({
							message: 'Preparing sanitized content...',
							increment: 30,
						});

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// End performance tracking
						const metrics = perfTracker.end(
							sanitizationResult.sanitizedContent.length,
							sanitizationResult.replacements.length,
							sanitizationResult.errors.length,
							sanitizationResult.warnings?.length || 0,
						);

						// Validate document is still valid before editing
						const activeEditor = vscode.window.activeTextEditor;
						if (
							!activeEditor ||
							activeEditor.document.uri.toString() !== document.uri.toString()
						) {
							throw new Error('Document was closed or changed during sanitization');
						}

						// Check for cancellation before applying edit
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// Replace current document
						const edit = new vscode.WorkspaceEdit();
						edit.replace(
							document.uri,
							new vscode.Range(0, 0, document.lineCount, 0),
							sanitizationResult.sanitizedContent,
						);
						await vscode.workspace.applyEdit(edit);

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// Copy formatted report to clipboard if enabled
						if (config.copyToClipboardEnabled) {
							const formattedReport =
								formatSanitizationResults(sanitizationResult);
							await vscode.env.clipboard.writeText(formattedReport);
						}

						progress.report({ message: 'Complete', increment: 10 });

						// Track success
						deps.telemetry.event('sanitize-completed', {
							replacementsCount: sanitizationResult.replacements.length,
							duration: metrics.duration,
							fileSize: content.length,
						});

						// Show completion message
						deps.notifier.showInfo(
							localize(
								'runtime.sanitize.complete',
								'Sanitized {0} secret(s)',
								sanitizationResult.replacements.length,
							),
						);
					},
				);
				deps.statusBar.hideProgress();
			} catch (error) {
				deps.statusBar.hideProgress();
				// Don't show error for user cancellation
				if (error instanceof vscode.CancellationError) {
					return;
				}
				const errorMessage =
					error instanceof Error ? error.message : String(error);
				deps.notifier.showError(
					localize(
						'runtime.sanitize.error',
						'Sanitization failed: {0}',
						errorMessage,
					),
				);
				deps.telemetry.event('sanitize-failed', {
					error: errorMessage,
				});
			}
		},
	);

	context.subscriptions.push(disposable);
}
