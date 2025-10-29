import * as vscode from 'vscode'
import * as nls from 'vscode-nls'
import type { Telemetry } from '../telemetry/telemetry'

const localize = nls.config({ messageFormat: nls.MessageFormat.file })()

/**
 * Register help command to show documentation
 */
export function registerHelpCommand(context: vscode.ExtensionContext, telemetry: Telemetry): void {
  const disposable = vscode.commands.registerCommand('secrets-le.help', async () => {
    telemetry.event('help-opened')

    const helpContent = buildHelpContent()

    const doc = await vscode.workspace.openTextDocument({
      content: helpContent,
      language: 'markdown',
    })

    await vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside)
  })

  context.subscriptions.push(disposable)
}

function buildHelpContent(): string {
  const title = localize('runtime.help.title', 'Secrets-LE Help')
  const quickStart = localize(
    'runtime.help.quick-start',
    '1. Open a file\n2. Run "Secrets-LE: Detect Secrets" to scan for secrets\n3. Run "Secrets-LE: Sanitize Secrets" to replace them with placeholders',
  )
  const commands = localize(
    'runtime.help.commands',
    '**Detect**: Scan document for secrets (API keys, tokens, passwords, etc.)\n**Sanitize**: Replace detected secrets with safe placeholders\n**Settings**: Configure detection sensitivity and options',
  )
  const troubleshooting = localize(
    'runtime.help.troubleshooting',
    '**No secrets found?** Adjust sensitivity in settings\n**Performance issues?** Enable safety settings for large files\n**Need help?** Check Output panel for details',
  )
  const settings = localize(
    'runtime.help.settings',
    'Access via Command Palette: "Secrets-LE: Open Settings"\nKey settings: Detection sensitivity, sanitization placeholder, safety checks',
  )
  const support = localize(
    'runtime.help.support',
    'GitHub Issues: https://github.com/OffensiveEdge/secrets-le/issues',
  )

  return `# ${title}

## Quick Start

${quickStart}

## Commands

${commands}

## Troubleshooting

${troubleshooting}

## Settings

${settings}

## Support

${support}
`
}
