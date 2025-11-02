# Secrets-LE Performance Monitoring

Secrets-LE includes built-in performance monitoring capabilities to track operation metrics and ensure optimal performance during secret detection and sanitization.

## Overview

Performance monitoring is automatically enabled for all detection and sanitization operations. The system tracks:

- **Execution Time** - How long operations take to complete
- **Memory Usage** - Heap memory consumed during operations
- **CPU Usage** - System and user CPU time
- **Operation Metrics** - Secrets detected, errors, warnings

## Configuration

Performance monitoring can be configured in VS Code settings:

```json
{
  "secrets-le.performance.enabled": true,
  "secrets-le.performance.maxDuration": 5000,
  "secrets-le.performance.maxMemoryUsage": 104857600,
  "secrets-le.performance.maxCpuUsage": 1000000
}
```

### Settings

- **`secrets-le.performance.enabled`** - Enable/disable performance monitoring (default: `true`)
- **`secrets-le.performance.maxDuration`** - Maximum operation duration in milliseconds (default: `5000`)
- **`secrets-le.performance.maxMemoryUsage`** - Maximum memory usage in bytes (default: `104857600` = 100MB)
- **`secrets-le.performance.maxCpuUsage`** - Maximum CPU usage in microseconds (default: `1000000` = 1 second)

## How It Works

### Automatic Monitoring

When you run detection or sanitization commands, performance monitoring automatically:

1. **Tracks start time** and initial resource usage
2. **Monitors operation progress** during execution
3. **Captures end metrics** when operations complete
4. **Compares against thresholds** to detect performance issues
5. **Reports metrics** via telemetry (if enabled)

### Pattern Matching Efficiency

Secret detection uses optimized pattern matching:

- **Multiple detector types** run in parallel where possible
- **Early termination** for certain patterns
- **Efficient regex matching**
- **Memory-efficient processing** for large files

## Performance Reports

Performance metrics are displayed in command results:

- Detection operations show processing time and secret count
- Sanitization operations show replacement time
- Large file warnings when approaching limits

## Best Practices

1. **Monitor large files** - Enable performance monitoring when scanning large codebases
2. **Check thresholds** - Adjust limits based on your system capabilities
3. **Review metrics** - Use performance data to optimize scanning patterns
4. **Watch for warnings** - System will warn if operations exceed thresholds

## Troubleshooting

### Operations Taking Too Long

If operations exceed `maxDuration`:
- Check file size - large files take longer to scan
- Review sensitivity level - higher sensitivity scans more patterns
- Consider scanning specific file types only

### High Memory Usage

If operations exceed `maxMemoryUsage`:
- Large input files consume more memory
- Many detected secrets increase memory usage
- Consider processing files in smaller batches

### CPU Usage Warnings

If operations exceed `maxCpuUsage`:
- Multiple pattern detectors increase CPU usage
- Higher sensitivity levels require more CPU
- Consider limiting concurrent operations

## Telemetry

When telemetry is enabled, performance metrics are logged to the Output panel for debugging:

- Operation duration
- Memory usage
- CPU usage
- Secret counts
- Errors and warnings

This helps identify performance patterns over time.

## Related Documentation

- [Commands](../README.md#commands) - Available commands and their usage
- [Configuration](../README.md#configuration) - Full configuration options
- [Detection Types](../README.md#detecting-api-keys--credentials) - Supported secret types

