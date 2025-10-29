import type {
  DetectedSecret,
  DetectionResult,
  ParseError,
  SanitizationResult,
  SecretReplacement,
} from '../types'
import { detectSecrets } from './detectors'

/**
 * Detects secrets in content
 */
export function detectSecretsInContent(
  content: string,
  options: {
    readonly includeApiKeys?: boolean
    readonly includePasswords?: boolean
    readonly includeTokens?: boolean
    readonly includePrivateKeys?: boolean
    readonly sensitivity?: 'low' | 'medium' | 'high'
  } = {},
): DetectionResult {
  const startTime = Date.now()
  const lines = content.split('\n')
  const errors: ParseError[] = []

  try {
    const secrets = detectSecrets(content, options)

    const processingTimeMs = Date.now() - startTime

    return Object.freeze({
      success: true,
      secrets: Object.freeze(secrets),
      errors: Object.freeze(errors),
      warnings: Object.freeze([]),
      metadata: Object.freeze({
        totalLines: lines.length,
        processedLines: lines.length,
        processingTimeMs,
      }),
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const parseError: ParseError = {
      type: 'parse-error',
      message: `Detection failed: ${errorMessage}`,
      context: 'Secret detection',
    }

    return Object.freeze({
      success: false,
      secrets: Object.freeze([]),
      errors: Object.freeze([parseError]),
      warnings: Object.freeze([]),
    })
  }
}

/**
 * Deduplicates detected secrets
 */
export function deduplicateSecrets(secrets: readonly DetectedSecret[]): readonly DetectedSecret[] {
  const seen = new Set<string>()
  const unique: DetectedSecret[] = []

  for (const secret of secrets) {
    const key = `${secret.value}:${secret.type}`
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(secret)
    }
  }

  return Object.freeze(unique)
}

/**
 * Sanitizes content by replacing detected secrets with placeholders
 */
export function sanitizeContent(
  content: string,
  secrets: readonly DetectedSecret[],
  replaceWith: string = '***REDACTED***',
): SanitizationResult {
  const startTime = Date.now()
  const originalLength = content.length
  const errors: ParseError[] = []
  const replacements: SecretReplacement[] = []

  try {
    let sanitized = content
    const sortedSecrets = [...secrets].sort((a, b) => {
      const lineA = a.position?.line ?? 0
      const lineB = b.position?.line ?? 0
      if (lineA !== lineB) return lineB - lineA // Process from end to start
      return (b.position?.column ?? 0) - (a.position?.column ?? 0)
    })

    const lines = sanitized.split('\n')

    for (const secret of sortedSecrets) {
      const lineNum = (secret.position?.line ?? 1) - 1
      const column = (secret.position?.column ?? 1) - 1

      if (lineNum >= 0 && lineNum < lines.length) {
        const line = lines[lineNum] ?? ''
        const value = secret.value

        // Find and replace the secret value
        const valueIndex = line.indexOf(value)
        if (valueIndex >= 0) {
          const before = line.substring(0, valueIndex)
          const after = line.substring(valueIndex + value.length)
          const newLine = before + replaceWith + after
          lines[lineNum] = newLine

          replacements.push(
            Object.freeze({
              original: value,
              replaced: replaceWith,
              type: secret.type,
              position: secret.position,
            }),
          )
        }
      }
    }

    sanitized = lines.join('\n')
    const sanitizedLength = sanitized.length
    const processingTimeMs = Date.now() - startTime

    return Object.freeze({
      success: true,
      sanitizedContent: sanitized,
      replacements: Object.freeze(replacements),
      errors: Object.freeze(errors),
      warnings: Object.freeze([]),
      metadata: Object.freeze({
        originalLength,
        sanitizedLength,
        replacementsCount: replacements.length,
        processingTimeMs,
      }),
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)

    const parseError: ParseError = {
      type: 'parse-error',
      message: `Sanitization failed: ${errorMessage}`,
      context: 'Content sanitization',
    }

    return Object.freeze({
      success: false,
      sanitizedContent: content,
      replacements: Object.freeze([]),
      errors: Object.freeze([parseError]),
      warnings: Object.freeze([]),
    })
  }
}

/**
 * Formats detection results for display
 */
export function formatDetectionResults(result: DetectionResult): string {
  const lines: string[] = []

  lines.push('# Secrets Detection Results')
  lines.push('')

  if (result.secrets.length === 0) {
    lines.push('✅ No secrets detected.')
  } else {
    lines.push(`⚠️ Found ${result.secrets.length} potential secret(s):`)
    lines.push('')

    // Group by type
    const byType = new Map<string, DetectedSecret[]>()
    for (const secret of result.secrets) {
      const existing = byType.get(secret.type) ?? []
      existing.push(secret)
      byType.set(secret.type, existing)
    }

    for (const [type, secrets] of byType.entries()) {
      lines.push(`## ${type.toUpperCase()} (${secrets.length})`)
      lines.push('')

      for (const secret of secrets) {
        if (secret.position) {
          lines.push(`- Line ${secret.position.line}, Column ${secret.position.column}`)
        } else {
          lines.push('- Found')
        }
        if (secret.key) {
          lines.push(`  Key: ${secret.key}`)
        }
        if (secret.description) {
          lines.push(`  Type: ${secret.description}`)
        }
        lines.push(`  Confidence: ${secret.confidence}`)
        lines.push(
          `  Value: ${secret.value.substring(0, 20)}${secret.value.length > 20 ? '...' : ''}`,
        )
        if (secret.context) {
          lines.push(
            `  Context: ${secret.context.substring(0, 80)}${
              secret.context.length > 80 ? '...' : ''
            }`,
          )
        }
        lines.push('')
      }
    }
  }

  if (result.errors.length > 0) {
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push('# Errors')
    lines.push('')
    for (const error of result.errors) {
      lines.push(`- ${error.message}`)
      if (error.context) {
        lines.push(`  ${error.context}`)
      }
    }
  }

  if (result.warnings && result.warnings.length > 0) {
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push('# Warnings')
    lines.push('')
    for (const warning of result.warnings) {
      lines.push(`- ${warning}`)
    }
  }

  if (result.metadata) {
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push('# Metadata')
    lines.push('')
    lines.push(`Total Lines: ${result.metadata.totalLines}`)
    lines.push(`Processed Lines: ${result.metadata.processedLines}`)
    lines.push(`Processing Time: ${result.metadata.processingTimeMs.toFixed(2)}ms`)
  }

  return lines.join('\n')
}

/**
 * Formats sanitization results for display
 */
export function formatSanitizationResults(result: SanitizationResult): string {
  const lines: string[] = []

  lines.push('# Content Sanitization Results')
  lines.push('')

  if (result.success) {
    lines.push(`✅ Sanitized ${result.replacements.length} secret(s)`)
  } else {
    lines.push('❌ Sanitization failed')
  }

  lines.push('')

  if (result.replacements.length > 0) {
    lines.push('## Replacements')
    lines.push('')

    // Group by type
    const byType = new Map<string, SecretReplacement[]>()
    for (const replacement of result.replacements) {
      const existing = byType.get(replacement.type) ?? []
      existing.push(replacement)
      byType.set(replacement.type, existing)
    }

    for (const [type, replacements] of byType.entries()) {
      lines.push(`### ${type.toUpperCase()} (${replacements.length})`)
      lines.push('')
      for (const replacement of replacements) {
        if (replacement.position) {
          lines.push(`- Line ${replacement.position.line}, Column ${replacement.position.column}`)
        } else {
          lines.push('- Found')
        }
        lines.push(
          `  Original: ${replacement.original.substring(0, 30)}${
            replacement.original.length > 30 ? '...' : ''
          }`,
        )
        lines.push(`  Replaced: ${replacement.replaced}`)
        lines.push('')
      }
    }
  }

  if (result.errors.length > 0) {
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push('# Errors')
    lines.push('')
    for (const error of result.errors) {
      lines.push(`- ${error.message}`)
    }
  }

  if (result.metadata) {
    lines.push('')
    lines.push('---')
    lines.push('')
    lines.push('# Metadata')
    lines.push('')
    lines.push(`Original Length: ${result.metadata.originalLength}`)
    lines.push(`Sanitized Length: ${result.metadata.sanitizedLength}`)
    lines.push(`Replacements: ${result.metadata.replacementsCount}`)
    lines.push(`Processing Time: ${result.metadata.processingTimeMs.toFixed(2)}ms`)
  }

  return lines.join('\n')
}
