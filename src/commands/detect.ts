import * as vscode from 'vscode';
import * as nls from 'vscode-nls';
import { getConfiguration } from '../config/config';
import {
	deduplicateSecrets,
	detectSecretsInContent,
	formatDetectionResults,
} from '../extraction/extract';
import type { Telemetry } from '../telemetry/telemetry';
import type { Notifier } from '../ui/notifier';
import type { StatusBar } from '../ui/statusBar';
import type { PerformanceMonitor } from '../utils/performance';
import { handleSafetyChecks } from '../utils/safety';

const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

/**
 * Register command to detect secrets in active document
 */
export function registerDetectCommand(
	context: vscode.ExtensionContext,
	deps: {
		readonly telemetry: Telemetry;
		readonly notifier: Notifier;
		readonly statusBar: StatusBar;
		readonly performanceMonitor: PerformanceMonitor;
	},
): void {
	const disposable = vscode.commands.registerCommand(
		'secrets-le.detect',
		async () => {
			deps.telemetry.event('detect-command-invoked');

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				deps.notifier.showWarning(
					localize(
						'runtime.detect.no-editor',
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
				deps.telemetry.event('detect-blocked-by-safety', {
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

			// Process with progress indicator
			try {
				await deps.notifier.showProgress(
					localize('runtime.detect.progress', 'Detecting secrets...'),
					async (progress, token) => {
						const content = document.getText();
						const perfTracker = deps.performanceMonitor.startOperation(
							'detect',
							content.length,
						);

						progress.report({ message: 'Scanning content...', increment: 20 });

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// Detect secrets
						const result = detectSecretsInContent(content, {
							includeApiKeys: config.detectionIncludeApiKeys,
							includePasswords: config.detectionIncludePasswords,
							includeTokens: config.detectionIncludeTokens,
							includePrivateKeys: config.detectionIncludePrivateKeys,
							sensitivity: config.detectionSensitivity,
						});

						progress.report({
							message: 'Processing results...',
							increment: 40,
						});

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// Apply deduplication if enabled
						let secrets = result.secrets;
						if (config.dedupeEnabled && secrets.length > 0) {
							secrets = deduplicateSecrets(secrets);
							progress.report({
								message: 'Removing duplicates...',
								increment: 20,
							});
						}

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// Format results
						const formattedResult = formatDetectionResults({
							...result,
							secrets,
						});

						progress.report({ message: 'Preparing output...', increment: 20 });

						// End performance tracking
						const metrics = perfTracker.end(
							formattedResult.length,
							secrets.length,
							result.errors.length,
							result.warnings?.length || 0,
						);

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// Copy to clipboard if enabled
						if (config.copyToClipboardEnabled) {
							await vscode.env.clipboard.writeText(formattedResult);
							if (config.notificationsLevel === 'all') {
								deps.notifier.showInfo(
									localize(
										'runtime.detect.copied',
										'Results copied to clipboard',
									),
								);
							}
						}

						// Check for cancellation
						if (token.isCancellationRequested) {
							throw new vscode.CancellationError();
						}

						// Open in new document
						const doc = await vscode.workspace.openTextDocument({
							content: formattedResult,
							language: 'markdown',
						});

						const viewColumn = config.openResultsSideBySide
							? vscode.ViewColumn.Beside
							: vscode.ViewColumn.Active;

						await vscode.window.showTextDocument(doc, viewColumn);

						// Track success
						deps.telemetry.event('detect-completed', {
							secretCount: secrets.length,
							duration: metrics.duration,
							fileSize: content.length,
							sensitivity: config.detectionSensitivity,
						});

						// Show completion message based on notification level
						if (secrets.length > 0) {
							if (config.notificationsLevel === 'all') {
								deps.notifier.showWarning(
									localize(
										'runtime.detect.found',
										'Found {0} potential secret(s)',
										secrets.length,
									),
								);
							} else if (config.notificationsLevel === 'important') {
								deps.notifier.showWarning(
									localize(
										'runtime.detect.found',
										'Found {0} potential secret(s)',
										secrets.length,
									),
								);
							}
						} else if (config.notificationsLevel === 'all') {
							deps.notifier.showInfo(
								localize(
									'runtime.detect.none',
									'No secrets detected in this document',
								),
							);
						}
					},
				);
			} catch (error) {
				// Don't show error for user cancellation
				if (error instanceof vscode.CancellationError) {
					return;
				}
				const errorMessage =
					error instanceof Error ? error.message : String(error);
				deps.notifier.showError(
					localize(
						'runtime.detect.error',
						'Detection failed: {0}',
						errorMessage,
					),
				);
				deps.telemetry.event('detect-failed', {
					error: errorMessage,
				});
			}
		},
	);

	context.subscriptions.push(disposable);
}
