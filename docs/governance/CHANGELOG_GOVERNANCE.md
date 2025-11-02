# Changelog Governance

## Overview

This document defines the standards and guidelines for maintaining changelogs across all LE Family extensions. The goal is to create concise, scannable, and informative changelogs that provide value to users without overwhelming them.

## Core Principles

### 1. **User-Focused Content**

- Focus on user-visible changes and benefits
- Avoid technical implementation details
- Emphasize what users can do differently

### 2. **Scannable Format**

- Use clear, concise bullet points
- Group related changes logically
- Avoid walls of text

### 3. **Consistent Structure**

- Follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format
- Use semantic versioning
- Maintain consistent section organization

## Changelog Structure

### Header

```markdown
# Changelog

All notable changes to Secrets-LE will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
```

### Version Entry Format

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added

- Brief description of new features

### Changed

- Brief description of changes to existing features

### Fixed

- Brief description of bug fixes

### Removed

- Brief description of removed features (if any)
```

## Content Guidelines

### ✅ Good Changelog Entries

**User-Focused:**

- "Added workspace-wide secret scanning"
- "Improved detection speed for large workspaces"
- "Added keyboard shortcut Ctrl+Alt+S for quick detection"

**Concise:**

- "Fixed crash when scanning empty workspaces"
- "Added support for 15+ secret types"
- "Improved error messages for file access issues"

### ❌ Avoid These Patterns

**Too Technical:**

- "Implemented workspace scanner with VS Code file system API"
- "Added pattern matching engine with regex optimization"
- "Enhanced TypeScript usage with strict mode compliance"

**Too Verbose:**

- Long paragraphs explaining implementation details
- Repetitive bullet points saying the same thing
- Excessive emoji usage and formatting

**Internal Metrics:**

- "Increased from 1 to 17 test files (1600% improvement)"
- "34 TypeScript files"
- "17 passing tests across 1 test suite"

## Writing Rules

### 1. **One Change Per Bullet**

```markdown
✅ Good:

- Added workspace-wide scanning
- Fixed memory leak in secret detection
- Improved error messages for invalid files

❌ Bad:

- Added workspace scanning, improved performance, and fixed memory leaks
```

### 2. **Use Present Tense**

```markdown
✅ Good:

- Added workspace scanning
- Fixed crash on empty workspace
- Improved detection speed

❌ Bad:

- Added workspace scanning (uses past tense incorrectly)
```

### 3. **Focus on User Impact**

```markdown
✅ Good:

- Added workspace-wide secret scanning
- Improved detection speed for large codebases
- Fixed crash when processing large files

❌ Bad:

- Implemented workspaceScanner with findFiles API
- Optimized regex patterns and caching
- Added null pointer checks
```

### 4. **Group Related Changes**

```markdown
✅ Good:

- **Workspace Scanning**
  - Added workspace-wide secret detection
  - Added smart file exclusions
  - Added configurable scan patterns

❌ Bad:

- Added workspace scanning
- Added file exclusions
- Added scan patterns
- Fixed scanning bug
- Improved scan performance
```

## Version Categories

### Major (X.0.0)

- New features that change user workflow
- Breaking changes to existing functionality
- Major architectural changes affecting users

### Minor (0.X.0)

- New features that don't break existing functionality
- New secret type detection
- New commands or settings
- Performance improvements

### Patch (0.0.X)

- Bug fixes
- Documentation updates
- Minor UI improvements
- Internal refactoring with no user impact

## Examples

### ✅ Good Major Release

```markdown
## [2.0.0] - 2025-01-15

### Added

- **Workspace scanning** - Scan entire workspace for secrets, not just active file
- **Smart exclusions** - Automatically skips node_modules, .git, build artifacts
- **Configurable patterns** - Customize file patterns and exclusions

### Changed

- **Default behavior** - Detection now scans workspace instead of single file
- **Results format** - Secrets now grouped by file path

### Fixed

- Fixed crash when scanning empty workspaces
- Fixed memory issue with large file scanning
```

### ❌ Bad Major Release (Too Verbose)

```markdown
## [2.0.0] - 2025-01-15

### 🚀 Major Release - Workspace Scanning Implementation

This release brings Secrets-LE to the next level with comprehensive workspace scanning capabilities, establishing it as a leading secret detection tool with enterprise-grade architecture and extensive pattern matching.

#### **🏗️ Architecture Upgrades**

- **Workspace Scanner** - Implemented comprehensive workspace file scanning using VS Code's file system API with parallel pattern matching and smart exclusion filtering
- **Pattern Engine** - Enhanced detection patterns with optimized regex matching and confidence scoring
  [... continues for 50+ more lines]
```

## Maintenance Guidelines

### 1. **Regular Reviews**

- Review changelog before each release
- Remove redundant or overly technical entries
- Ensure consistency across all LE extensions

### 2. **User Testing**

- Ask non-technical users to review changelogs
- Ensure entries are understandable without context
- Focus on "what can I do now that I couldn't before?"

### 3. **Cross-Extension Consistency**

- Use similar language and structure across all LE extensions
- Maintain consistent categorization
- Align with LE Family branding and messaging

## Enforcement

### Pre-Release Checklist

- [ ] Changelog follows this governance document
- [ ] All entries are user-focused and concise
- [ ] No technical implementation details
- [ ] Consistent formatting and structure
- [ ] Reviewed by non-technical team member

### Quality Metrics

- **Readability**: Can a user understand the change in 5 seconds?
- **Actionability**: Does the user know what they can do differently?
- **Completeness**: Are all user-visible changes documented?
- **Conciseness**: Is the changelog under 50 lines for major releases?

---

**Remember**: Changelogs are for users, not developers. Focus on what users care about, not how we built it.

