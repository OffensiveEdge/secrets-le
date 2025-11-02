# Secrets-LE Commands

## Overview

Secrets-LE provides **4 commands** for detecting and sanitizing secrets across your workspace. All commands are designed with developer empathy in mind, providing clear feedback and graceful error handling.

## Core Commands

### 1. Detect Secrets (`secrets-le.detect`)

**Purpose**: Scan entire workspace for secrets and display them in a structured format.

**Usage**:

- **Command Palette**: `Secrets-LE: Detect Secrets`
- **Keyboard Shortcut**: `Ctrl+Alt+S` (Windows/Linux) or `Cmd+Alt+S` (Mac)

**Features**:

- Scans entire workspace (not just active file)
- Detects 15+ secret types (API keys, tokens, passwords, private keys)
- Smart exclusions (node_modules, .git, dist, build artifacts)
- Groups results by file and secret type
- Configurable sensitivity levels (low, medium, high)
- Filter by secret type (API keys, passwords, tokens, private keys)
- Progress indication for large workspaces
- Cancellation support

**Output Format**:

```
⚠️ Found 12 potential secret(s):

## 📄 src/config.js (1 secret(s))
  API-KEY (1)
  - Line 2, Column 14
    Key: apiKey
    Confidence: high
    Value: AKIAIOSFODNN7EXAMPLE...
    Context: const apiKey = "AKIAIOSFODNN7EXAMPLE"

## 📄 .env (1 secret(s))
  PASSWORD (1)
  - Line 15, Column 18
    Key: DATABASE_PASSWORD
    Confidence: medium
    Value: mysecret123
    Context: DATABASE_PASSWORD=mysecret123

... (12 secrets found across 8 files, 247 files scanned)
```

**Configuration**:

- `workspace.scanPatterns` - File patterns to scan (default: `['**/*']`)
- `workspace.scanExcludes` - Patterns to exclude (default: node_modules, .git, etc.)
- `workspace.scanMaxFiles` - Maximum files to scan (default: `10000`)
- `detection.sensitivity` - Sensitivity level: low, medium, high
- `detection.includeApiKeys` - Include API key detection
- `detection.includePasswords` - Include password detection
- `detection.includeTokens` - Include token detection
- `detection.includePrivateKeys` - Include private key detection

**Error Handling**:

- Gracefully handles file read errors
- Skips binary files automatically
- Skips oversized files automatically
- Provides clear error messages for workspace issues
- Continues processing despite individual file errors

### 2. Sanitize Secrets (`secrets-le.sanitize`)

**Purpose**: Replace detected secrets in the active file with safe placeholders.

**Usage**:

- **Command Palette**: `Secrets-LE: Sanitize Secrets`
- **Context Menu**: Right-click in editor → `Sanitize Secrets`

**Features**:

- Detects secrets in active file
- Replaces secrets with safe placeholders (default: `***REDACTED***`)
- Position-aware replacement (preserves file structure)
- Shows sanitization report
- Customizable replacement text via settings

**Output Format**:

```
✅ Sanitized 3 secret(s)

## API-KEY (2)
- Line 2, Column 14
  Original: AKIAIOSFODNN7EXAMPLE...
  Replaced: ***REDACTED***

## PASSWORD (1)
- Line 15, Column 18
  Original: mysecret123
  Replaced: ***REDACTED***
```

**Configuration**:

- `sanitization.replaceWith` - Replacement text (default: `***REDACTED***`)
- `sanitization.enabled` - Enable/disable sanitization

**Error Handling**:

- Handles invalid file content gracefully
- Provides clear error messages for sanitization failures
- Preserves original file if sanitization fails

## Settings Commands

### 3. Open Settings (`secrets-le.openSettings`)

**Purpose**: Quick access to Secrets-LE settings in VS Code.

**Usage**:

- **Command Palette**: `Secrets-LE: Open Settings`

**Details**: Opens VS Code settings filtered to Secrets-LE configuration options.

### 4. Help & Troubleshooting (`secrets-le.help`)

**Purpose**: Display comprehensive help and troubleshooting information.

**Usage**:

- **Command Palette**: `Secrets-LE: Help & Troubleshooting`

**Help Sections**:

- **Quick Start**: How to get started
- **Commands**: Description of all commands
- **Detection Types**: Supported secret types
- **Configuration**: Settings and options
- **Troubleshooting**: Common issues and solutions
- **Support**: GitHub issues and links

## Command Workflow

### Typical Usage Pattern

1. **Open Workspace**: Open a workspace folder in VS Code
2. **Detect Secrets**: Use `Detect Secrets` command to scan entire workspace
3. **Review Results**: Check detected secrets grouped by file
4. **Sanitize**: Open specific files and use `Sanitize Secrets` to replace secrets
5. **Configure Settings**: Use `Open Settings` to customize detection behavior

### Advanced Workflow

1. **Detect Secrets**: Scan workspace with custom patterns/excludes
2. **Review by File**: Check which files contain secrets
3. **Adjust Sensitivity**: Change sensitivity level in settings
4. **Re-scan**: Run detection again with new settings
5. **Sanitize Files**: Replace secrets in affected files

## Command Dependencies

### Service Dependencies

- **Telemetry**: Event logging and usage tracking
- **Notifier**: User notifications and feedback
- **StatusBar**: Progress indication and status updates
- **PerformanceMonitor**: Performance tracking and optimization

### Configuration Dependencies

- **Workspace Settings**: Scan patterns, excludes, file limits
- **Detection Settings**: Sensitivity, secret type filters
- **Safety Settings**: File size and processing limits
- **Notification Settings**: User feedback preferences

## Error Handling

### Common Errors

- **No Workspace**: Workspace folder not open
- **No Secrets Found**: No secrets detected in workspace
- **File Access Error**: Cannot read file or insufficient permissions
- **Memory Error**: Too many files or file too large
- **Timeout Error**: Processing takes too long

### Recovery Actions

- **Retry**: Automatically retry failed operations
- **Skip**: Skip problematic files and continue
- **User Action**: Request user intervention
- **Abort**: Stop processing entirely (cancellation)

## Performance Considerations

### Large Workspace Handling

- **Progress Indication**: Real-time progress updates
- **Cancellation Support**: Cancel long-running scans
- **Memory Management**: Efficient file-by-file processing
- **Smart Exclusions**: Automatically skip large directories

### Optimization Features

- **File Limits**: Configurable maximum files to scan
- **Size Limits**: Automatic skipping of oversized files
- **Pattern Optimization**: Efficient regex matching
- **Resource Cleanup**: Proper resource management

## Integration Points

### VS Code Integration

- **Command Palette**: All commands available in command palette
- **Context Menu**: Right-click context menu integration
- **Status Bar**: Status bar entry for quick access
- **Settings UI**: Integrated settings interface
- **Keybindings**: Customizable keyboard shortcuts

### Workspace Integration

- **Workspace Scanning**: Scans entire workspace folder
- **Multi-root Support**: Support for multi-root workspaces
- **Virtual Workspaces**: Limited support for virtual workspaces
- **File Watching**: Can be extended for file watching (future)

## Best Practices

### Command Usage

- **Start with Defaults**: Begin with default scan settings
- **Adjust Exclusions**: Add more exclusions for large codebases
- **Review Results**: Check files with secrets before sanitizing
- **Configure Sensitivity**: Adjust based on false positive rate
- **Monitor Performance**: Watch files scanned vs skipped metrics

### Performance Tips

- **Optimize Exclusions**: Add more exclude patterns for build artifacts
- **Limit File Count**: Set `workspace.scanMaxFiles` for very large projects
- **Use Specific Patterns**: Scan specific file types instead of `**/*`
- **Adjust Sensitivity**: Lower sensitivity for faster scans with fewer false positives

### Troubleshooting

- **No Secrets Found**: Check sensitivity level and secret type filters
- **Too Many False Positives**: Lower sensitivity or disable specific secret types
- **Scan Too Slow**: Reduce file limits or add more exclusions
- **Memory Issues**: Lower file limits or file size thresholds

---

This command reference provides comprehensive information about all Secrets-LE commands, helping users make the most of the extension's capabilities while following best practices for performance and reliability.

