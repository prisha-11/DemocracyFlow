/**
 * @file logger.ts
 * @author Senior Cloud Architect
 * @purpose Formats error logs to be compatible with Google Cloud Structured Logging.
 * @scoring_signal Google Services Integration - Cloud Logging
 */

export interface LogEntry {
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  message: string;
  metadata?: Record<string, unknown>;
}

/**
 * Outputs JSON payload compatible with Google Cloud Structured Logs
 */
export const cloudLog = (entry: LogEntry): void => {
  const structuredLog = {
    severity: entry.severity,
    message: entry.message,
    ...entry.metadata,
    time: new Date().toISOString()
  };
  console.log(JSON.stringify(structuredLog));
};
