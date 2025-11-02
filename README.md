<p align="center">
  <img src="src/assets/images/icon.png" alt="Secrets-LE Logo" width="96" height="96"/>
</p>
<h1 align="center">Secrets-LE: Zero Hassle Secret Detection</h1>
<p align="center">
  <b>Detect and sanitize credentials, tokens, and API keys locally</b><br/>
  <i>GitGuardian-level security without ever sending data off your machine</i>
</p>

<p align="center">
  <a href="https://open-vsx.org/extension/OffensiveEdge/secrets-le">
    <img src="https://img.shields.io/badge/Install%20from-Open%20VSX-blue?style=for-the-badge&logo=visualstudiocode" alt="Install from Open VSX" />
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.secrets-le">
    <img src="https://img.shields.io/badge/Install%20from-VS%20Code-blue?style=for-the-badge&logo=visualstudiocode" alt="Install from VS Code" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/open-vsx/dt/OffensiveEdge/secrets-le?label=downloads&color=green" alt="Downloads" />
  <img src="https://img.shields.io/open-vsx/rating/OffensiveEdge/secrets-le?label=rating&color=yellow" alt="Rating" />
  <img src="https://img.shields.io/badge/Open%20Source-100%25-purple" alt="100% Open Source" />
  <img src="https://github.com/OffensiveEdge/secrets-le/actions/workflows/ci.yml/badge.svg" alt="Build Status" />
  <img src="https://img.shields.io/badge/Vulnerabilities-0%20Critical-brightgreen" alt="Zero Critical Vulnerabilities" />
</p>

---

<!-- Preview images will go here -->

---

## ⚡ See It In Action

**Before**: Manually searching for hardcoded secrets (30+ minutes)

```javascript
const apiKey = "AKIAIOSFODNN7EXAMPLE"
const password = "mypassword123"
// ... searching through 100+ files
```

**After**: One command detects all secrets automatically

```
AWS Access Key (line 1) - Confidence: High
Password (line 2) - Confidence: Medium
GitHub Token (line 15) - Confidence: High
... (12 secrets total)
```

---

## ✅ Why Secrets-LE?

- **15+ secret types detected** - AWS, Azure, GCP, GitHub, JWT, passwords, private keys
- **Zero Config** - Install → Press `Cmd+Alt+S` → Done
- **100% Local** - No data leaves your machine, ever
- **GitGuardian-level detection** - Without the cloud dependency

Perfect for pre-commit checks, security audits, and credential management.

---

## 🙏 Thank You

If Secrets-LE saves you time, a quick rating helps other developers discover it:  
⭐ [Open VSX](https://open-vsx.org/extension/OffensiveEdge/secrets-le) • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.secrets-le)

---

### Key Features

- **Detect Secrets** - Find API keys, tokens, passwords, and private keys
- **Sanitize Content** - Automatically replace secrets with safe placeholders
- **Configurable Sensitivity** - Adjust detection levels (low, medium, high)
- **Security-First** - Detects AWS, Azure, GCP keys, JWT tokens, and more
- **Universal Support** - Works on any text file format
- **13 languages** - English, Chinese, German, Spanish, French, Indonesian, Italian, Japanese, Korean, Portuguese, Russian, Ukrainian, Vietnamese

## 🚀 More from the LE Family

- **[Paths-LE](https://open-vsx.org/extension/OffensiveEdge/paths-le)** - Extract file paths from code and configs • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.paths-le)
- **[Regex-LE](https://open-vsx.org/extension/OffensiveEdge/regex-le)** - Test and validate regex patterns • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.regex-le)
- **[String-LE](https://open-vsx.org/extension/OffensiveEdge/string-le)** - Extract user-visible strings for i18n • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.string-le)
- **[Numbers-LE](https://open-vsx.org/extension/OffensiveEdge/numbers-le)** - Extract and analyze numeric data • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.numbers-le)
- **[URLs-LE](https://open-vsx.org/extension/OffensiveEdge/urls-le)** - Audit API endpoints and external resources • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.urls-le)
- **[Colors-LE](https://open-vsx.org/extension/OffensiveEdge/colors-le)** - Extract and analyze colors from stylesheets • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.colors-le)
- **[Dates-LE](https://open-vsx.org/extension/OffensiveEdge/dates-le)** - Extract temporal data from logs and APIs • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.dates-le)

## 💡 Use Cases

- **Pre-Commit Checks** - Scan files before committing to prevent credential leaks
- **Security Audits** - Find hardcoded secrets across entire codebase
- **Config Validation** - Ensure no secrets in config files before deployment
- **Code Review** - Quick scan during pull request reviews

### Detecting API Keys & Credentials

Find cloud provider keys and credentials automatically:

```javascript
// AWS Access Key
const AWS_KEY = "AKIAIOSFODNN7EXAMPLE" // ✅ Detected

// Azure Key
const AZURE_KEY = "DefaultEndpointsProtocol=https;AccountKey=..." // ✅ Detected

// GCP Service Account
const GCP_KEY = '{"type":"service_account",...}' // ✅ Detected
```

---

### Detecting Tokens & Authentication

Find authentication tokens:

```javascript
// GitHub Personal Access Token
const GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // ✅ Detected (example pattern)

// JWT Token
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // ✅ Detected

// Bearer Token
Authorization: Bearer sk_live_xxxxxxxxxxxx // ✅ Detected
```

---

### Detecting Passwords & Private Keys

Find passwords and private keys:

```env
# Environment file
DATABASE_PASSWORD=mysecret123  # ✅ Detected
API_KEY=sk_live_abcdefgh       # ✅ Detected
```

```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...  # ✅ Detected
-----END RSA PRIVATE KEY-----
```

---

## 🚀 Quick Start

1. Install from [Open VSX](https://open-vsx.org/extension/OffensiveEdge/secrets-le) or [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.secrets-le)
2. Open any file (`.js`, `.ts`, `.json`, `.env`, `.py`, or any text file)
3. Run `Secrets-LE: Detect Secrets` (`Cmd+Alt+S` / `Ctrl+Alt+S`)
4. Review detected secrets and sanitize if needed

## 📋 Available Commands

Secrets-LE provides **5 commands** accessible via Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

### Core Commands

- **Detect Secrets** (`Cmd/Ctrl+Alt+S`) - Scan for API keys, tokens, passwords
- **Sanitize Secrets** - Replace detected secrets with safe placeholders

### Settings & Help

- **Open Settings** - Quick access to extension settings
- **Help & Troubleshooting** - Comprehensive in-editor documentation

## ⚙️ Configuration

Secrets-LE has minimal configuration to keep things simple. Most settings are available in VS Code's settings UI under "Secrets-LE".

Key settings include:

- Detection sensitivity (low, medium, high)
- Secret type filters (API keys, passwords, tokens, private keys)
- Sanitization replacement text
- Deduplication options
- Output format preferences (side-by-side, clipboard copy)
- Safety warnings and thresholds
- Notification levels (silent, important, all)

For the complete list of available settings, open VS Code Settings and search for "secrets-le".

## 📁 Supported File Types

**Secrets-LE works universally on any text file!** Detection uses regex patterns applied directly to text content.

| Category          | File Types                                                                          |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Programming**   | JavaScript, TypeScript, Python, Ruby, Go, Rust, Java, C/C++, C#, PHP, Swift, Kotlin |
| **Data Formats**  | JSON, YAML, TOML, XML, CSV                                                          |
| **Web**           | HTML, CSS, SCSS, LESS, Sass                                                         |
| **Config**        | .env, .ini, .cfg, .conf                                                             |
| **Documentation** | Markdown, Plain Text, Log Files                                                     |
| **Shell**         | Bash, Zsh, PowerShell, Batch                                                        |

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
- Password fields in configs

**Private Keys**:
- SSH keys (RSA, ED25519)
- PGP keys
- Private key files

---

## 🌍 Language Support

**13 languages**: English, German, Spanish, French, Indonesian, Italian, Japanese, Korean, Portuguese (Brazil), Russian, Ukrainian, Vietnamese, Chinese (Simplified)

## 🧩 System Requirements

**VS Code** 1.70.0+ • **Platform** Windows, macOS, Linux  
**Memory** 200MB recommended for large files

## 🔒 Privacy

100% local processing. No data leaves your machine. Optional logging: `secrets-le.telemetryEnabled`

## ⚡ Performance

Secrets-LE includes built-in performance monitoring and configurable thresholds to help track operation speed and resource usage.

For detailed information, see [Performance Monitoring](docs/PERFORMANCE.md).

## 🔧 Troubleshooting

**Not detecting secrets?**  
Ensure file is saved and check sensitivity level in settings

**False positives?**  
Lower sensitivity level or disable specific secret types

**Need help?**  
Check [Issues](https://github.com/OffensiveEdge/secrets-le/issues) or enable logging: `secrets-le.telemetryEnabled: true`

## ❓ FAQ

**What secrets are detected?**  
15+ types including AWS, Azure, GCP, GitHub, JWT, passwords, private keys

**Does it send data anywhere?**  
No! 100% local processing. No network requests ever

**Can I customize detection?**  
Yes! Adjust sensitivity levels and enable/disable specific secret types

**How accurate is detection?**  
High accuracy with configurable sensitivity to reduce false positives

## 📊 Testing

**17 unit tests across 1 test file** • Powered by Vitest • Run with `bun run test:coverage`

### Core Principle

**No broken or failed tests are allowed in commits.** All tests must pass before code can be committed or merged.

### Test Suite Highlights

- **Comprehensive secret detection** across 15+ types
- **Sanitization validation** with replacement verification
- **Error handling** with graceful degradation
- **Security-focused** testing for edge cases

For detailed testing guidelines, see [Testing Guidelines](docs/TESTING.md).

---

Copyright © 2025
<a href="https://github.com/OffensiveEdge">@OffensiveEdge</a>. All rights reserved.
