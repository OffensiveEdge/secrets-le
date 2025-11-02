import * as vscode from 'vscode';
import type { DetectedSecret, DetectionResult, ParseError } from '../types';
import { detectSecretsInContent } from '../extraction/extract';

export interface WorkspaceScanOptions {
	readonly includeApiKeys?: boolean;
	readonly includePasswords?: boolean;
	readonly includeTokens?: boolean;
	readonly includePrivateKeys?: boolean;
	readonly sensitivity?: 'low' | 'medium' | 'high';
	readonly patterns?: readonly string[];
	readonly excludes?: readonly string[];
	readonly maxFiles?: number;
	readonly fileSizeLimit?: number;
}

export interface WorkspaceScanResult {
	readonly secrets: readonly DetectedSecret[];
	readonly errors: readonly ParseError[];
	readonly filesScanned: number;
	readonly filesSkipped: number;
	readonly totalProcessingTimeMs: number;
}

/**
 * Scans workspace files for secrets
 */
export async function scanWorkspaceForSecrets(
	options: WorkspaceScanOptions = {},
): Promise<WorkspaceScanResult> {
	const {
		patterns = ['**/*'],
		excludes = [
			'**/node_modules/**',
			'**/.git/**',
			'**/dist/**',
			'**/build/**',
			'**/.next/**',
			'**/coverage/**',
			'**/*.min.js',
			'**/*.bundle.js',
			'**/package-lock.json',
			'**/yarn.lock',
			'**/pnpm-lock.yaml',
		],
		maxFiles = 10000,
		fileSizeLimit = 1048576, // 1MB default
	} = options;

	const startTime = Date.now();
	const secrets: DetectedSecret[] = [];
	const errors: ParseError[] = [];
	let filesScanned = 0;
	let filesSkipped = 0;

	try {
		// Find all files matching patterns
		const fileArrays = await Promise.all(
			patterns.map((pattern) =>
				vscode.workspace.findFiles(pattern, null, maxFiles),
			),
		);
		// Deduplicate files by URI string
		const fileSet = new Set<string>();
		const allFiles: vscode.Uri[] = [];
		for (const fileArray of fileArrays) {
			for (const uri of fileArray) {
				const uriString = uri.toString();
				if (!fileSet.has(uriString)) {
					fileSet.add(uriString);
					allFiles.push(uri);
				}
			}
		}
		let allFilesList = allFiles;

		// Apply manual excludes filtering
		if (excludes.length > 0) {
			allFilesList = allFilesList.filter((uri) => {
				const relativePath = vscode.workspace.asRelativePath(uri, false);
				return !excludes.some((exclude) => {
					// Simple glob matching - convert ** to regex
					const regexStr = exclude
						.replace(/\*\*/g, '.*')
						.replace(/\*/g, '[^/]*')
						.replace(/\?/g, '.');
					const regex = new RegExp(`^${regexStr}$`);
					return regex.test(relativePath);
				});
			});
		}

		// Limit to maxFiles
		allFilesList = allFilesList.slice(0, maxFiles);

		// Process each file
		for (const fileUri of allFilesList) {
			try {
				const stat = await vscode.workspace.fs.stat(fileUri);
				
				// Skip if too large
				if (stat.size > fileSizeLimit) {
					filesSkipped++;
					continue;
				}

				// Read and process file
				const document = await vscode.workspace.openTextDocument(fileUri);
				const filepath = vscode.workspace.asRelativePath(fileUri, false);
				
				// Skip binary files
				if (document.languageId === 'plaintext' && stat.size > 0 && document.getText().includes('\x00')) {
					filesSkipped++;
					continue;
				}

				const content = document.getText();
				const result = detectSecretsInContent(content, {
					includeApiKeys: options.includeApiKeys,
					includePasswords: options.includePasswords,
					includeTokens: options.includeTokens,
					includePrivateKeys: options.includePrivateKeys,
					sensitivity: options.sensitivity,
				});

				// Add filepath to each secret
				const secretsWithPath = result.secrets.map((secret) =>
					Object.freeze({
						...secret,
						filepath,
					}),
				);

				secrets.push(...secretsWithPath);
				errors.push(...result.errors.map((err) => ({
					...err,
					filepath,
				})));

				filesScanned++;
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : String(error);
				const filepath = vscode.workspace.asRelativePath(fileUri, false);
				errors.push({
					type: 'parse-error',
					message: `Failed to scan file: ${errorMessage}`,
					filepath,
				});
				filesSkipped++;
			}
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		errors.push({
			type: 'parse-error',
			message: `Workspace scan failed: ${errorMessage}`,
		});
	}

	const totalProcessingTimeMs = Date.now() - startTime;

	return Object.freeze({
		secrets: Object.freeze(secrets),
		errors: Object.freeze(errors),
		filesScanned,
		filesSkipped,
		totalProcessingTimeMs,
	});
}

