import * as vscode from 'vscode'
import * as nls from 'vscode-nls'
import type { EnhancedError, ErrorRecoveryOptions, ErrorSummary } from '../utils/errorHandling'

const localize = nls.config({ messageFormat: nls.MessageFormat.file })()

function buildErrorMessage(error: EnhancedError, options?: ErrorRecoveryOptions): string {
  let fullMessage = error.userMessage

  const hasSuggestion = Boolean(error.suggestion)
  if (hasSuggestion) {
    const suggestionLabel = localize('runtime.error.suggestion', 'Suggestion')
    fullMessage += `\n\n${suggestionLabel}: ${error.suggestion}`
  }

  const hasUserAction = Boolean(options?.userAction)
  if (hasUserAction) {
    const actionLabel = localize('runtime.error.action', 'Action')
    fullMessage += `\n\n${actionLabel}: ${options?.userAction}`
  }

  return fullMessage
}

export interface Notifier {
  showInfo(message: string): void
  showWarning(message: string): void
  showError(message: string): void
  showEnhancedError(error: EnhancedError, options?: ErrorRecoveryOptions): Promise<void>
  showErrorSummary(summary: ErrorSummary): void
  showProgress<T>(
    title: string,
    task: (
      progress: vscode.Progress<{ message?: string; increment?: number }>,
      token: vscode.CancellationToken,
    ) => Promise<T>,
  ): Promise<T>
}

export function createNotifier(): Notifier {
  return Object.freeze({
    showInfo(message: string): void {
      vscode.window.showInformationMessage(message)
    },
    showWarning(message: string): void {
      vscode.window.showWarningMessage(message)
    },
    showError(message: string): void {
      vscode.window.showErrorMessage(message)
    },
    async showEnhancedError(error: EnhancedError, options?: ErrorRecoveryOptions): Promise<void> {
      const fullMessage = buildErrorMessage(error, options)

      if (error.severity === 'high') {
        await vscode.window.showErrorMessage(fullMessage, {
          modal: true,
          detail: error.message,
        })
        return
      }

      if (error.severity === 'medium') {
        await vscode.window.showWarningMessage(fullMessage, {
          detail: error.message,
        })
        return
      }

      await vscode.window.showInformationMessage(fullMessage, {
        detail: error.message,
      })
    },
    showErrorSummary(summary: ErrorSummary): void {
      const hasNoErrors = summary.totalErrors === 0
      if (hasNoErrors) {
        this.showInfo(localize('runtime.error.summary.none', 'No errors occurred'))
        return
      }

      const criticalCount = summary.severity.high
      const message = localize(
        'runtime.error.summary.notification',
        'Processing completed with {0} errors ({1} critical)',
        summary.totalErrors,
        criticalCount,
      )

      const hasCriticalErrors = criticalCount > 0
      if (hasCriticalErrors) {
        this.showError(message)
        return
      }

      const hasNonRecoverableErrors = summary.nonRecoverableErrors > 0
      if (hasNonRecoverableErrors) {
        this.showWarning(message)
        return
      }

      this.showInfo(message)
    },
    async showProgress<T>(
      title: string,
      task: (
        progress: vscode.Progress<{ message?: string; increment?: number }>,
        token: vscode.CancellationToken,
      ) => Promise<T>,
    ): Promise<T> {
      return vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title,
          cancellable: true,
        },
        task,
      )
    },
  })
}
