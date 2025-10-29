import * as vscode from 'vscode'
import type { Configuration } from '../types'

/**
 * Get extension configuration with validation and defaults
 */
export function getConfiguration(): Configuration {
  const config = vscode.workspace.getConfiguration('secrets-le')

  // Validate notification level
  const notifRaw = config.get('notificationsLevel', 'important') as unknown as string
  const notificationsLevel = isValidNotificationLevel(notifRaw) ? notifRaw : 'important'

  // Validate detection sensitivity
  const sensitivityRaw = config.get('detection.sensitivity', 'medium') as unknown as string
  const detectionSensitivity = isValidSensitivity(sensitivityRaw) ? sensitivityRaw : 'medium'

  return Object.freeze({
    copyToClipboardEnabled: Boolean(config.get('copyToClipboardEnabled', false)),
    dedupeEnabled: Boolean(config.get('dedupeEnabled', false)),
    notificationsLevel,
    openResultsSideBySide: Boolean(config.get('openResultsSideBySide', true)),
    detectionEnabled: Boolean(config.get('detection.enabled', true)),
    detectionSensitivity,
    detectionIncludeApiKeys: Boolean(config.get('detection.includeApiKeys', true)),
    detectionIncludePasswords: Boolean(config.get('detection.includePasswords', true)),
    detectionIncludeTokens: Boolean(config.get('detection.includeTokens', true)),
    detectionIncludePrivateKeys: Boolean(config.get('detection.includePrivateKeys', true)),
    sanitizationEnabled: Boolean(config.get('sanitization.enabled', true)),
    sanitizationReplaceWith: String(config.get('sanitization.replaceWith', '***REDACTED***')),
    safetyEnabled: Boolean(config.get('safety.enabled', true)),
    safetyFileSizeWarnBytes: Math.max(
      1000,
      Number(config.get('safety.fileSizeWarnBytes', 1000000)),
    ),
    safetyLargeOutputLinesThreshold: Math.max(
      100,
      Number(config.get('safety.largeOutputLinesThreshold', 50000)),
    ),
    safetyManyDocumentsThreshold: Math.max(
      1,
      Number(config.get('safety.manyDocumentsThreshold', 8)),
    ),
    showParseErrors: Boolean(config.get('showParseErrors', false)),
    statusBarEnabled: Boolean(config.get('statusBar.enabled', true)),
    telemetryEnabled: Boolean(config.get('telemetryEnabled', false)),
    performanceEnabled: Boolean(config.get('performance.enabled', true)),
    performanceMaxDuration: Math.max(1000, Number(config.get('performance.maxDuration', 5000))),
    performanceMaxMemoryUsage: Math.max(
      1048576,
      Number(config.get('performance.maxMemoryUsage', 104857600)),
    ),
    performanceMaxCpuUsage: Math.max(
      100000,
      Number(config.get('performance.maxCpuUsage', 1000000)),
    ),
  })
}

export type NotificationLevel = 'all' | 'important' | 'silent'

function isValidNotificationLevel(v: unknown): v is NotificationLevel {
  return v === 'all' || v === 'important' || v === 'silent'
}

export type DetectionSensitivity = 'low' | 'medium' | 'high'

function isValidSensitivity(v: unknown): v is DetectionSensitivity {
  return v === 'low' || v === 'medium' || v === 'high'
}
