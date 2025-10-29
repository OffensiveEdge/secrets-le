# Secrets-LE

**Zero-Hassle Secrets Detection & Sanitization** - Detect and sanitize credentials, tokens, and API keys locally — before you commit. GitGuardian-level security without ever sending data off your machine.

[![Version](https://img.shields.io/badge/version-1.8.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.secrets-le)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## ✨ Features

- 🔍 **Detect Secrets** - Find API keys, tokens, passwords, and private keys in your code
- 🧹 **Sanitize Content** - Automatically replace detected secrets with safe placeholders
- 🎯 **Configurable Sensitivity** - Adjust detection levels (low, medium, high)
- 🛡️ **Security-First** - Detects AWS, Azure, GCP keys, JWT tokens, and more
- 🔒 **100% Local** - No data leaves your machine, ever
- 🚀 **Zero-Hassle Guarantee** - Works reliably on any text file

## 🚀 Quick Start

1. **Open any file** in VS Code (JavaScript, Python, JSON, or any text file)
2. **Press `Ctrl+Alt+S`** (or `Cmd+Alt+S` on Mac) or search for "Secrets-LE: Detect Secrets"
3. **Review results** - See all detected secrets with locations and confidence levels
4. **Sanitize if needed** - Run "Sanitize Secrets" to replace them safely

## 📋 Commands

### Detect Secrets (`secrets-le.detect`)
Scan the active document for potential secrets (API keys, tokens, passwords, private keys).

**Usage**: `Ctrl+Alt+S` / `Cmd+Alt+S` or Command Palette → "Secrets-LE: Detect Secrets"

**Features**:
- Detects 15+ secret types (AWS keys, GitHub tokens, passwords, private keys, etc.)
- Configurable sensitivity levels
- Line and column positioning
- Confidence scoring (low, medium, high)
- Deduplication option
- Progress indication for large files

### Sanitize Secrets (`secrets-le.sanitize`)
Replace detected secrets with safe placeholders.

**Usage**: Command Palette → "Secrets-LE: Sanitize Secrets"

**Features**:
- Interactive confirmation before sanitizing
- Customizable replacement text
- Preserves file structure
- Tracks all replacements made

### Settings Management
- **Export Settings** - Save your configuration to a JSON file
- **Import Settings** - Restore settings from a previously exported file
- **Reset Settings** - Reset all settings to defaults

## 📁 Supported File Types

**Secrets-LE works on any text file!** Detection uses regex patterns applied directly to text content, making it truly universal—just like Regex-LE.

### ✅ Works Universally (Zero-Hassle Guaranteed)

**Once the extension is activated, it works on any text file VS Code can open.**

**Programming Languages**
- JavaScript/TypeScript (`.js`, `.ts`, `.jsx`, `.tsx`, `.mjs`, `.cjs`)
- Python (`.py`, `.pyw`, `.pyi`)
- Ruby (`.rb`, `.rake`)
- Go (`.go`)
- Rust (`.rs`)
- Java (`.java`)
- C/C++ (`.c`, `.cpp`, `.h`, `.hpp`)
- C# (`.cs`)
- PHP (`.php`)
- Swift (`.swift`)
- Kotlin (`.kt`)
- And any other programming language

**Data Formats**
- JSON (`.json`, `.jsonc`)
- YAML (`.yaml`, `.yml`)
- TOML (`.toml`)
- XML (`.xml`, `.xhtml`)
- CSV (`.csv`)

**Web Technologies**
- HTML (`.html`, `.htm`)
- CSS (`.css`, `.scss`, `.less`, `.sass`)

**Configuration Files**
- Environment (`.env`, `.env.local`, `.env.production`)
- INI (`.ini`, `.cfg`, `.conf`)
- Config files (`.config`, `.conf`)

**Documentation & Text**
- Markdown (`.md`, `.markdown`)
- Plain Text (`.txt`)
- Log Files (`.log`)
- README files
- Documentation (`.rst`, `.tex`, `.org`)

**Shell & Scripts**
- Shell/Bash (`.sh`, `.bash`, `.zsh`)
- PowerShell (`.ps1`)
- Batch (`.bat`, `.cmd`)

### Understanding Activation Events

**Performance Optimization**: Secrets-LE uses language-specific activation events in `package.json` for performance—these make the extension load faster for common file types. However, **once activated, the extension works on any text file**.

**How It Works**:
1. Extension activates when you open JavaScript, TypeScript, JSON, Python, etc. (for performance)
2. Once activated, commands work on **any file** VS Code can open
3. Detection uses regex patterns—no format parsing required
4. Safety checks handle edge cases (binary files, size limits)

**Key Message**: Activation events are for **performance optimization**, not functionality restrictions. Open any text file and try it—it works!

### What Gets Detected

**API Keys & Credentials**:
- Generic API keys (`apiKey`, `api_key`)
- AWS Access Keys (`AKIA...`)
- AWS Secret Keys (base64 encoded, 40 chars)
- Azure keys
- GCP service account keys
- Database connection strings

**Tokens**:
- GitHub Personal Access Tokens (`ghp_...`)
- JWT tokens
- OAuth tokens
- Bearer tokens
- Access/Refresh tokens

**Passwords**:
- Plaintext passwords
- Hashed passwords (if detected)
- Password fields in configs

**Private Keys**:
- SSH keys (RSA, ED25519)
- PGP keys
- Private key files

**Other**:
- Session IDs
- Cookie values
- Connection strings

### Examples by File Type

**JavaScript/TypeScript** - Detect API keys:
```javascript
// Pattern: apiKey: "..." or API_KEY="..."
const apiKey = "AKIAIOSFODNN7EXAMPLE";  // ✅ Detected
```

**JSON Config** - Detect secrets in config:
```json
{
  "database": {
    "password": "mypassword123",  // ✅ Detected
    "apiKey": "sk_live_..."        // ✅ Detected
  }
}
```

**ENV Files** - Environment variables:
```env
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE  # ✅ Detected
DATABASE_PASSWORD=secret123             # ✅ Detected
```

**Python** - Detect in code:
```python
api_key = "sk_live_abcd1234"  # ✅ Detected
password = "mysecret"          # ✅ Detected
```

**YAML Config** - Kubernetes secrets:
```yaml
apiVersion: v1
data:
  password: cGFzc3dvcmQxMjM=  # ✅ Detected if base64 decoded
```

## ⚙️ Configuration

### Key Settings

- **`detection.enabled`** - Enable/disable secret detection
- **`detection.sensitivity`** - Detection level (low, medium, high)
- **`detection.includeApiKeys`** - Include API keys in detection
- **`detection.includePasswords`** - Include passwords in detection
- **`detection.includeTokens`** - Include tokens in detection
- **`detection.includePrivateKeys`** - Include private keys in detection
- **`sanitization.enabled`** - Enable content sanitization
- **`sanitization.replaceWith`** - Replacement text (default: `***REDACTED***`)
- **`dedupeEnabled`** - Remove duplicate detections
- **`copyToClipboardEnabled`** - Auto-copy results
- **`safety.enabled`** - Enable safety checks for large files
- **`notificationsLevel`** - Control notification verbosity (all, important, silent)

For the complete list, open VS Code Settings and search for "secrets-le".

## 🌍 Language Support

**13 languages**: English, German, Spanish, French, Indonesian, Italian, Japanese, Korean, Portuguese (Brazil), Russian, Ukrainian, Vietnamese, Chinese (Simplified)

## 🧩 System Requirements

- **VS Code**: 1.70.0 or higher
- **Platform**: Windows, macOS, Linux
- **Node.js**: 20.0.0+ (bundled with VS Code)

## 🔒 Privacy & Security

- **100% local processing** - No data leaves your machine
- **No network requests** - Everything runs locally
- **Optional telemetry** - Local-only logging when enabled
- **Secure settings import** - Validated against schema
- **Path sanitization** - Error messages don't leak sensitive paths

## 🎯 Zero-Hassle Guarantee

Secrets-LE is designed to "just work" without complications:

✅ **Universal text support** - Works on any file VS Code can open as text  
✅ **No format restrictions** - Regex patterns work on any text content  
✅ **Automatic safety checks** - Binary files, size limits handled automatically  
✅ **Graceful error handling** - Clear messages, not cryptic errors  
✅ **Performance protection** - Built-in limits prevent resource exhaustion

**Unlike format-specific extractors** (which require parsers for each file type), Secrets-LE uses regex patterns on text—making it truly universal while maintaining reliability.

## 🆚 Comparison with Other LE Extensions

| Feature | Secrets-LE | Regex-LE | Paths-LE |
|---------|------------|----------|----------|
| **File Type Support** | ✅ Any text (once activated) | ✅ Any text | ⚠️ 9 specific types |
| **Detection Method** | ✅ Regex patterns | ✅ User-defined regex | ❌ Format parsers |
| **Activation Strategy** | ⚠️ Language-specific | ✅ Command-based | ⚠️ Format-specific |
| **Zero-Hassle** | ✅ Universal (post-activation) | ✅ Universal | ⚠️ Format-limited |

**Key Insight**: Secrets-LE and Regex-LE both use regex on text—functionally identical. Only difference is Secrets-LE uses predefined secret patterns vs Regex-LE's user-defined patterns.

## 📚 Documentation

- **Commands Guide**: See [docs/COMMANDS.md](docs/COMMANDS.md)
- **Architecture**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **File Type Analysis**: See [docs/FILE_TYPE_ANALYSIS.md](docs/FILE_TYPE_ANALYSIS.md)
- **Performance**: See [docs/PERFORMANCE.md](docs/PERFORMANCE.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with patterns from the LE extension family:
- Paths-LE, Regex-LE, Numbers-LE, Dates-LE, URLs-LE, Strings-LE, EnvSync-LE, Scrape-LE

## 📞 Support

- **GitHub Issues**: [Report a bug or request a feature](https://github.com/OffensiveEdge/secrets-le/issues)
- **Documentation**: See the `docs/` directory for detailed guides

---

**Made with ❤️ by [OffensiveEdge](https://github.com/OffensiveEdge)**
