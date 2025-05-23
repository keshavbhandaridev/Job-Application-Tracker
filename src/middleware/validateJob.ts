import { Request, Response, NextFunction } from 'express';

/**
 * Validate job input data middleware
 */
export const validateJobInput = (req: Request, res: Response, next: NextFunction): void => {
  const { company } = req.body;

  // Required fields validation
  if (!company) {
    res.status(400).json({
      message: 'Company field is required',
    });
    return;
  }

  next();
};
