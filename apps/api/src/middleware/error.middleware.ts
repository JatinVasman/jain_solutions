// =============================================================================
// GLOBAL ERROR HANDLER MIDDLEWARE
// Catches any error passed to next(err) or thrown from async route handlers.
// In production: never expose stack traces.
// =============================================================================

import type { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  isOperational?: boolean;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = err.statusCode ?? 500;
  const isProduction = process.env['NODE_ENV'] === 'production';

  // Log all errors in non-test environments
  if (process.env['NODE_ENV'] !== 'test') {
    console.error(`[error] ${err.code ?? 'INTERNAL_ERROR'}: ${err.message}`);
    if (!isProduction) {
      console.error(err.stack);
    }
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code ?? 'INTERNAL_SERVER_ERROR',
      message: isProduction && statusCode === 500
        ? 'An unexpected error occurred. Please try again later.'
        : err.message,
      ...(isProduction ? {} : { stack: err.stack }),
    },
  });
}

/**
 * Creates a structured operational error with an HTTP status code.
 */
export function createError(
  message: string,
  statusCode: number = 500,
  code: string = 'INTERNAL_SERVER_ERROR',
): AppError {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  error.isOperational = true;
  return error;
}
