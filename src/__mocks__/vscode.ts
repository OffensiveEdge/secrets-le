/**
 * Mock VS Code API for testing
 */
const mockFn = () => Promise.resolve()

export const window = {
  activeTextEditor: undefined,
  showInformationMessage: mockFn,
  showWarningMessage: mockFn,
  showErrorMessage: mockFn,
  createStatusBarItem: () => ({
    text: '',
    tooltip: '',
    command: '',
    show: mockFn,
    hide: mockFn,
    dispose: mockFn,
  }),
  createOutputChannel: () => ({
    appendLine: mockFn,
    dispose: mockFn,
  }),
  withProgress: mockFn,
  showTextDocument: mockFn,
}

export const workspace = {
  openTextDocument: mockFn,
  applyEdit: mockFn,
  getConfiguration: () => ({
    get: (key: string, defaultValue?: unknown) => defaultValue,
  }),
}

export const commands = {
  registerCommand: mockFn,
  executeCommand: mockFn,
}

export const env = {
  clipboard: {
    writeText: mockFn,
  },
}

export const ViewColumn = {
  Active: 1,
  Beside: 2,
}

export const StatusBarAlignment = {
  Left: 1,
  Right: 2,
}

export const ProgressLocation = {
  Notification: 15,
}

export const Range = class Range {
  constructor(
    public startLine: number,
    public startCharacter: number,
    public endLine: number,
    public endCharacter: number,
  ) {}
}

export const WorkspaceEdit = class WorkspaceEdit {
  replace(_uri: unknown, _range: unknown, _text: string) {}
}

export const Uri = {
  file: (path: string) => ({ fsPath: path, path }),
  parse: (uri: string) => ({ toString: () => uri }),
}
