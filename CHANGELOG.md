# Changelog

All notable changes to Secrets-LE will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.1] - 2025-11-02

### Documentation

- **LE Family Updates** - Added Regex-LE to the "More from the LE Family" section in README

## [1.7.0] - 2025-11-02

### Initial Public Release

Secrets-LE brings zero-hassle secrets detection and sanitization to VS Code. Simple, reliable, focused.

#### Core Features

- **Automatic Secret Detection** - Detects 15+ types of secrets automatically:
  - AWS Access Keys (`AKIA...`)
  - AWS Secret Keys
  - Azure keys and connection strings
  - GCP service account keys
  - GitHub Personal Access Tokens (`ghp_...`)
  - JWT tokens
  - OAuth tokens
  - Bearer tokens
  - Plaintext passwords
  - Database connection strings
  - Private keys (RSA, ED25519, PGP)
  - Generic API keys
  - And more
- **Sanitization** - Replace detected secrets with safe placeholders:
  - Configurable replacement text
  - Preserves file structure
  - Side-by-side or clipboard copy output
- **Configurable Sensitivity** - Adjust detection levels:
  - Low, Medium, High sensitivity
  - Enable/disable specific secret types
  - Reduce false positives

#### Supported File Types

Secrets-LE works universally on any text file format:
- **Programming Languages**: JavaScript, TypeScript, Python, Ruby, Go, Rust, Java, C/C++, C#, PHP, Swift, Kotlin
- **Data Formats**: JSON, YAML, TOML, XML, CSV
- **Web**: HTML, CSS, SCSS, LESS, Sass
- **Configuration**: .env, .ini, .cfg, .conf
- **Documentation**: Markdown, Plain Text, Log Files
- **Shell Scripts**: Bash, Zsh, PowerShell, Batch

#### Advanced Features

- **Security-First Design**:
  - 100% local processing (no data leaves your machine)
  - GitGuardian-level detection without cloud dependency
  - Pre-commit check support
  - Security audit capabilities
- **Performance**:
  - Fast scanning with regex-based detection
  - Efficient processing of large files
  - Memory-optimized operations
- **Safety Features**:
  - Binary file detection
  - File size warnings (configurable thresholds)
  - Output limits to prevent excessive memory usage
  - Automatic safety checks

#### Commands

- **Detect Secrets** (`Cmd/Ctrl+Alt+S`) - Scan for secrets in current document
- **Sanitize Secrets** - Replace detected secrets with safe placeholders
- **Open Settings** - Quick access to configuration
- **Help & Troubleshooting** - In-editor documentation
- **Export/Import/Reset Settings** - Manage extension configuration

#### Configuration

- Detection sensitivity (low, medium, high)
- Secret type filters (API keys, passwords, tokens, private keys)
- Sanitization replacement text
- Deduplication options
- Output preferences (side-by-side, clipboard copy)
- Safety thresholds (file size, output limits)
- Notification levels (silent, important, all)
- Status bar visibility
- Local telemetry logging

#### Infrastructure

- **TypeScript** - Strict mode with comprehensive type safety
- **Testing** - Unit tests with Vitest
- **Code Quality** - Biome for linting and formatting
- **Localization** - English language support (13 languages coming in v1.8.0)
- **Factory-based Architecture** - Dependency injection and service factories
- **Immutable Data Structures** - All exports frozen with `Object.freeze()`
- **Error Handling** - Enterprise-grade error categorization and recovery

#### Performance

- Built-in performance monitoring
- Configurable thresholds
- Efficient secret detection
- Memory-optimized operations

#### Privacy

- 100% local processing
- No data collection
- Optional local-only telemetry logging to Output panel
