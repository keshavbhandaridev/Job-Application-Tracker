import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import config from '../../config/config';

// Extend Express Request interface to include user
// Using module augmentation instead of namespace
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

// Interface for JWT payload
interface JwtPayload {
  id: string;
}

/**
 * Middleware to protect routes - verifies JWT token and attaches user to request
 * Only authenticated users can access protected routes
 */
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Extract token from 'Bearer [token]'
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
      return;
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

      // Find user by id from decoded token
      const user = await User.findById(decoded.id);

      // Check if user exists
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(401).json({
        success: false,
        message: 'Invalid token',
        error: errorMessage,
      });
      return;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: errorMessage,
    });
  }
};
