import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors from express-validator
 * Checks for validation errors and returns them in a consistent format
 */
const validationHandler = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map((error: any) => ({
        field: error.path,
        message: error.msg,
      })),
    });
    return;
  }

  next();
};

export default validationHandler;
