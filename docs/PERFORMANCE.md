# Secrets-LE Performance Monitoring

Secrets-LE includes built-in performance monitoring capabilities to track workspace-wide secret detection operations and ensure optimal performance.

## Overview

Performance monitoring tracks:

- **Execution Time** - Workspace scan duration
- **Memory Usage** - Heap memory consumed during operations
- **CPU Usage** - System and user CPU time
- **Workspace Metrics** - Files scanned, files skipped, processing efficiency
- **Detection Metrics** - Secrets found per file, total secrets, errors

## Configuration

Performance monitoring can be configured in VS Code settings:

```json
{
  "secrets-le.performance.enabled": true,
  "secrets-le.performance.maxDuration": 5000,
  "secrets-le.performance.maxMemoryUsage": 104857600,
  "secrets-le.performance.maxCpuUsage": 1000000,
  "secrets-le.workspace.scanMaxFiles": 10000,
  "secrets-le.safety.fileSizeWarnBytes": 1048576
}
```

### Settings

- **`secrets-le.performance.enabled`** - Enable/disable performance monitoring (default: `true`)
- **`secrets-le.performance.maxDuration`** - Maximum operation duration in milliseconds (default: `5000`)
- **`secrets-le.performance.maxMemoryUsage`** - Maximum memory usage in bytes (default: `104857600` = 100MB)
- **`secrets-le.performance.maxCpuUsage`** - Maximum CPU usage in microseconds (default: `1000000` = 1 second)
- **`secrets-le.workspace.scanMaxFiles`** - Maximum files to scan per operation (default: `10000`)
- **`secrets-le.safety.fileSizeWarnBytes`** - File size limit before skipping (default: `1048576` = 1MB)

## Workspace Scanning Performance

### File Discovery

Workspace scanning uses VS Code's file system API for efficient file discovery:

- **Parallel pattern matching** - Multiple patterns processed concurrently
- **Smart exclusions** - Automatically skips `node_modules`, `.git`, `dist`, `build`, and other build artifacts
- **Early filtering** - Excludes files before processing to minimize work

### Processing Efficiency

- **File-by-file processing** - Processes files sequentially to manage memory
- **Binary detection** - Filters out binary files before content analysis
- **Size limits** - Skips oversized files automatically
- **Pattern matching** - Efficient regex-based detection with early termination
- **Cancellation support** - Long scans can be cancelled mid-operation

### Memory Management

- **Streaming processing** - Files processed one at a time to prevent memory spikes
- **Result aggregation** - Secrets collected incrementally without storing full file contents
- **Automatic cleanup** - Resources released after each file

## Performance Reports

Results include:

- **Files scanned** - Total files processed
- **Files skipped** - Files excluded due to size, binary content, or errors
- **Processing time** - Total scan duration in milliseconds
- **Secrets detected** - Count per file and total
- **Memory usage** - Peak memory consumption
- **Errors** - Files that failed to process

## Best Practices

1. **Optimize scan patterns** - Use specific patterns (`**/*.js`, `**/*.env`) instead of `**/*` for faster scans
2. **Configure exclusions** - Add more exclude patterns for large directories
3. **Set file limits** - Adjust `workspace.scanMaxFiles` based on codebase size
4. **Monitor metrics** - Review files scanned vs skipped to understand scan efficiency
5. **Adjust thresholds** - Tune performance limits based on system capabilities

## Troubleshooting

### Slow Scans

- Reduce `workspace.scanMaxFiles` limit
- Add more exclude patterns (build outputs, dependencies)
- Use specific file patterns instead of `**/*`
- Lower sensitivity level to reduce pattern matching overhead

### High Memory Usage

- Reduce `workspace.scanMaxFiles` to process fewer files
- Lower `safety.fileSizeWarnBytes` to skip large files earlier
- Add exclude patterns for large file types

### CPU Usage Warnings

- Multiple pattern detectors increase CPU usage per file
- Higher sensitivity levels require more CPU
- Consider scanning specific file types only

## Related Documentation

- [Testing Guidelines](TESTING.md) - Testing practices and policies
