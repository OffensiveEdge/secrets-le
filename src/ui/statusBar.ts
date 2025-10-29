import * as vscode from 'vscode'
import { getConfiguration } from '../config/config'

export interface StatusBar {
  show(): void
  hide(): void
  updateText(text: string): void
  dispose(): void
}

export function createStatusBar(_context: vscode.ExtensionContext): StatusBar {
  const config = getConfiguration()
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)

  statusBarItem.text = '$(symbol-misc) {{DisplayName}}-LE'
  statusBarItem.tooltip = 'Click to extract from active editor'
  statusBarItem.command = '{{namespace}}-le.extract'

  if (config.statusBarEnabled) {
    statusBarItem.show()
  }

  return Object.freeze({
    show(): void {
      statusBarItem.show()
    },
    hide(): void {
      statusBarItem.hide()
    },
    updateText(text: string): void {
      statusBarItem.text = text
    },
    dispose(): void {
      statusBarItem.dispose()
    },
  })
}
