import rateLimit from 'express-rate-limit';
import { RequestHandler } from 'express';

/**
 * Default message for rate limit exceeded
 */
const defaultMessage = 'Too many requests from this IP, please try again later';

/**
 * Generic rate limiter factory function
 * @param maxRequests - Maximum number of requests allowed within the window
 * @param windowMs - Time window in milliseconds
 * @param message - Custom message for rate limit exceeded
 * @returns Rate limiter middleware
 */
export const createRateLimiter = (
  maxRequests: number,
  windowMs: number = 15 * 60 * 1000,
  message: string = defaultMessage
): RequestHandler => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 'error',
      message,
    },
  });
};

/**
 * Global API rate limiter - applies to all routes
 * Limits to 100 requests per 15 minutes window per IP
 */
export const globalLimiter = createRateLimiter(100);

/**
 * Auth rate limiter - stricter limits for authentication endpoints
 * Limits to 10 requests per 15 minutes window per IP
 */
export const authLimiter = createRateLimiter(
  10,
  15 * 60 * 1000,
  'Too many authentication attempts, please try again after 15 minutes'
);

/**
 * Jobs API rate limiter
 * Limits to 50 requests per 15 minutes window per IP
 */
export const jobsLimiter = createRateLimiter(
  100,
  15 * 60 * 1000,
  'Too many requests to jobs API, please try again after 15 minutes'
);

/**
 * Roles API rate limiter
 * Limits to 30 requests per 15 minutes window per IP
 */
export const rolesLimiter = createRateLimiter(30);
