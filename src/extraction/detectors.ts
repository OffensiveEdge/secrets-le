/**
 * Secret detection patterns
 * Detects various types of secrets using regex patterns and validation
 */

import type { ConfidenceLevel, DetectedSecret, SecretType } from '../types'

export interface SecretPattern {
  readonly type: SecretType
  readonly pattern: RegExp
  readonly confidence: (match: RegExpMatchArray, context: string) => ConfidenceLevel
  readonly extractKey?: (match: RegExpMatchArray, context: string) => string | undefined
  readonly description: string
}

/**
 * All secret detection patterns
 */
export const SECRET_PATTERNS = Object.freeze([
  // API Keys
  {
    type: 'api-key',
    pattern: /(?:api[_-]?key|apikey)\s*[:=]\s*['"]?([a-zA-Z0-9_\-]{20,})['"]?/gi,
    confidence: (match: RegExpMatchArray) => {
      const value = match[1] ?? ''
      if (value.length >= 32) return 'high'
      if (value.length >= 20) return 'medium'
      return 'low'
    },
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Generic API key',
  },
  {
    type: 'api-key',
    pattern: /(?:['"]?)([a-zA-Z0-9_\-]{32,})(?:['"]?)\s*[:=]\s*(?:['"]?)(?:api[_-]?key|apikey)/gi,
    confidence: () => 'high',
    description: 'API key (reversed format)',
  },

  // AWS Keys
  {
    type: 'aws-key',
    pattern:
      /(?:aws[_-]?(?:access[_-]?)?key[_-]?(?:id)?|accesskeyid)\s*[:=]\s*['"]?(AKIA[0-9A-Z]{16})['"]?/gi,
    confidence: () => 'high',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'AWS Access Key ID',
  },
  {
    type: 'aws-secret',
    pattern:
      /(?:aws[_-]?(?:secret[_-]?)?(?:access[_-]?)?key|secretkey)\s*[:=]\s*['"]?([a-zA-Z0-9/+=]{40})['"]?/gi,
    confidence: () => 'high',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'AWS Secret Access Key',
  },

  // Passwords
  {
    type: 'password',
    pattern: /(?:password|passwd|pwd)\s*[:=]\s*['"]?([^\s'"]{8,})['"]?/gi,
    confidence: (match: RegExpMatchArray) => {
      const value = match[1] ?? ''
      if (value.length >= 12) return 'high'
      if (value.length >= 8) return 'medium'
      return 'low'
    },
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Password',
  },

  // Tokens
  {
    type: 'token',
    pattern: /(?:token|secret[_-]?token)\s*[:=]\s*['"]?([a-zA-Z0-9_\-\.]{20,})['"]?/gi,
    confidence: (match: RegExpMatchArray) => {
      const value = match[1] ?? ''
      if (value.length >= 32) return 'high'
      if (value.length >= 20) return 'medium'
      return 'low'
    },
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Generic token',
  },
  {
    type: 'bearer-token',
    pattern: /(?:bearer|authorization)\s+([a-zA-Z0-9_\-\.]{20,})/gi,
    confidence: () => 'high',
    description: 'Bearer token',
  },
  {
    type: 'access-token',
    pattern: /(?:access[_-]?token)\s*[:=]\s*['"]?([a-zA-Z0-9_\-\.]{20,})['"]?/gi,
    confidence: () => 'high',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Access token',
  },
  {
    type: 'refresh-token',
    pattern: /(?:refresh[_-]?token)\s*[:=]\s*['"]?([a-zA-Z0-9_\-\.]{20,})['"]?/gi,
    confidence: () => 'high',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Refresh token',
  },

  // JWT Tokens
  {
    type: 'jwt',
    pattern: /(?:jwt|json[_-]?web[_-]?token)\s*[:=]\s*['"]?([a-zA-Z0-9_\-\.]{50,})['"]?/gi,
    confidence: (match: RegExpMatchArray) => {
      const value = match[1] ?? ''
      const parts = value.split('.')
      if (parts.length === 3) return 'high'
      return 'medium'
    },
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'JWT token',
  },
  {
    type: 'jwt',
    pattern: /['"]?([a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+)['"]?/g,
    confidence: (match: RegExpMatchArray) => {
      const value = match[1] ?? ''
      if (value.includes('.') && value.split('.').length === 3) return 'high'
      return 'medium'
    },
    description: 'JWT token (format only)',
  },

  // OAuth
  {
    type: 'oauth-token',
    pattern:
      /(?:oauth[_-]?token|oauth[_-]?2[_-]?token)\s*[:=]\s*['"]?([a-zA-Z0-9_\-\.]{20,})['"]?/gi,
    confidence: () => 'high',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'OAuth token',
  },

  // Private Keys
  {
    type: 'private-key',
    pattern:
      /-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----[\s\S]{100,}?-----END\s+(?:RSA\s+)?PRIVATE\s+KEY-----/gi,
    confidence: () => 'high',
    description: 'Private key (RSA/SSH)',
  },
  {
    type: 'ssh-key',
    pattern:
      /-----BEGIN\s+(?:OPENSSH\s+)?PRIVATE\s+KEY-----[\s\S]{100,}?-----END\s+(?:OPENSSH\s+)?PRIVATE\s+KEY-----/gi,
    confidence: () => 'high',
    description: 'SSH private key',
  },
  {
    type: 'pgp-key',
    pattern:
      /-----BEGIN\s+PGP\s+PRIVATE\s+KEY\s+BLOCK-----[\s\S]{100,}?-----END\s+PGP\s+PRIVATE\s+KEY\s+BLOCK-----/gi,
    confidence: () => 'high',
    description: 'PGP private key',
  },

  // Database URLs
  {
    type: 'database-url',
    pattern:
      /(?:database[_-]?url|db[_-]?url|datasource[_-]?url)\s*[:=]\s*['"]?(?:postgres|mysql|mongodb|redis|sqlite):\/\/[^\s'"]+['"]?/gi,
    confidence: (match: RegExpMatchArray) => {
      const value = match[0] ?? ''
      if (value.includes('://')) {
        const url = value.match(/(postgres|mysql|mongodb|redis|sqlite):\/\/[^\s'"]+/)
        if (url && url[0]?.includes(':')) return 'high'
      }
      return 'medium'
    },
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Database connection URL',
  },
  {
    type: 'connection-string',
    pattern: /(?:connection[_-]?string|conn[_-]?string)\s*[:=]\s*['"]?[^\s'"]{20,}['"]?/gi,
    confidence: () => 'medium',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Connection string',
  },

  // Azure
  {
    type: 'azure-key',
    pattern:
      /(?:azure[_-]?(?:account[_-]?)?key|accountkey)\s*[:=]\s*['"]?([a-zA-Z0-9+/]{32,}=?)['"]?/gi,
    confidence: () => 'high',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Azure account key',
  },

  // GCP
  {
    type: 'gcp-key',
    pattern:
      /(?:gcp[_-]?key|google[_-]?cloud[_-]?key|project[_-]?id)\s*[:=]\s*['"]?([a-zA-Z0-9_\-]{12,})['"]?/gi,
    confidence: () => 'medium',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'GCP/Google Cloud key',
  },

  // Session IDs
  {
    type: 'session-id',
    pattern: /(?:session[_-]?id|sessionid)\s*[:=]\s*['"]?([a-zA-Z0-9_\-]{20,})['"]?/gi,
    confidence: () => 'medium',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Session ID',
  },

  // Cookies
  {
    type: 'cookie',
    pattern: /(?:cookie|set-cookie)\s*[:=]\s*['"]?([^\s'"]{20,})['"]?/gi,
    confidence: () => 'low',
    extractKey: (match: RegExpMatchArray) => match[0]?.split(/[:=]/)[0]?.trim().toLowerCase(),
    description: 'Cookie value',
  },
]) as readonly SecretPattern[]

/**
 * Detects secrets in content using all patterns
 */
export function detectSecrets(
  content: string,
  options: {
    readonly includeApiKeys?: boolean
    readonly includePasswords?: boolean
    readonly includeTokens?: boolean
    readonly includePrivateKeys?: boolean
    readonly sensitivity?: 'low' | 'medium' | 'high'
  } = {},
): readonly DetectedSecret[] {
  const {
    includeApiKeys = true,
    includePasswords = true,
    includeTokens = true,
    includePrivateKeys = true,
    sensitivity = 'medium',
  } = options

  const lines = content.split('\n')
  const secrets: DetectedSecret[] = []
  const seen = new Set<string>()

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum] ?? ''
    if (!line) continue

    for (const pattern of SECRET_PATTERNS) {
      // Check if this pattern type should be included
      if (
        (pattern.type === 'api-key' ||
          pattern.type === 'aws-key' ||
          pattern.type === 'aws-secret' ||
          pattern.type === 'gcp-key' ||
          pattern.type === 'azure-key') &&
        !includeApiKeys
      ) {
        continue
      }
      if (pattern.type === 'password' && !includePasswords) {
        continue
      }
      if (
        (pattern.type === 'token' ||
          pattern.type === 'jwt' ||
          pattern.type === 'oauth-token' ||
          pattern.type === 'bearer-token' ||
          pattern.type === 'access-token' ||
          pattern.type === 'refresh-token') &&
        !includeTokens
      ) {
        continue
      }
      if (
        (pattern.type === 'private-key' ||
          pattern.type === 'ssh-key' ||
          pattern.type === 'pgp-key') &&
        !includePrivateKeys
      ) {
        continue
      }

      const matches = Array.from(line.matchAll(pattern.pattern))
      for (const match of matches) {
        if (!match[0]) continue

        // Extract the secret value
        let value = match[1]
        if (!value && match[0]) {
          // For patterns without capture groups, use the full match
          value = match[0]
        }
        if (!value) continue

        // Filter by sensitivity
        const confidence = pattern.confidence(match, line)
        if (sensitivity === 'high' && confidence !== 'high') {
          continue
        }
        if (sensitivity === 'medium' && confidence === 'low') {
          continue
        }

        // Deduplicate based on value and line
        const key = `${lineNum}:${value}`
        if (seen.has(key)) continue
        seen.add(key)

        const keyName = pattern.extractKey ? pattern.extractKey(match, line) : undefined

        const secret: DetectedSecret = Object.freeze({
          value,
          type: pattern.type,
          confidence,
          position: Object.freeze({
            line: lineNum + 1,
            column: (match.index ?? 0) + 1,
          }),
          context: line.trim(),
          key: keyName,
          description: pattern.description,
        })

        secrets.push(secret)
      }
    }
  }

  return Object.freeze(secrets)
}
