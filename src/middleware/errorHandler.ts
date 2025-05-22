import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const error: ErrorResponse = {
    message: err.message || 'Server Error',
  };

  // Log error for server-side debugging
  console.error(err);

  // Add stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
  }

  res.status(500).json(error);
};
