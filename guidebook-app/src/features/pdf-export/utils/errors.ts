/**
 * Custom error types for PDF generation
 */

/**
 * Base error class for PDF generation errors
 */
export class PdfGenerationError extends Error {
  public readonly cause?: Error;
  constructor(message: string, cause?: Error) {
    super(message);
    this.name = 'PdfGenerationError';
    this.cause = cause;
  }
}

/**
 * Error thrown when content data is invalid or missing
 */
export class InvalidContentError extends PdfGenerationError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
    this.name = 'InvalidContentError';
  }
}

/**
 * Error thrown when image processing fails
 */
export class ImageProcessingError extends PdfGenerationError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
    this.name = 'ImageProcessingError';
  }
}

/**
 * Error thrown when PDF rendering fails
 */
export class PdfRenderingError extends PdfGenerationError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
    this.name = 'PdfRenderingError';
  }
}

/**
 * Error thrown when PDF download fails
 */
export class PdfDownloadError extends PdfGenerationError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
    this.name = 'PdfDownloadError';
  }
}

/**
 * Logs an error with context for debugging
 * 
 * Can also be used for info/warning logging by passing null as error.
 * 
 * @param error - Error to log, or null for info/warning logs
 * @param context - Additional context information
 */
export function logError(error: Error | null, context: Record<string, any> = {}): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level: error ? (context.warning ? 'WARN' : 'ERROR') : 'INFO',
    ...(error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : {
      message: context.message || 'Log entry',
    }),
    ...context,
  };

  if (logEntry.level === 'ERROR') {
    console.error('[PDF Generation Error]', logEntry);
  } else if (logEntry.level === 'WARN') {
    console.warn('[PDF Generation Warning]', logEntry);
  } else {
    console.log('[PDF Generation Info]', logEntry);
  }
  
  // In production, you might want to send this to an error tracking service
  // e.g., Sentry, LogRocket, etc.
}

