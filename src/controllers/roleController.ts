import { Request, Response } from 'express';
import Role from '../models/Role';

/**
 * Get all available job roles
 * @route GET /api/roles
 * @access Public
 */
export const getRoles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const roles = await Role.find().sort({ name: 1 });
    res.status(200).json(roles);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      message: 'Error fetching roles',
      error: errorMessage,
    });
  }
};
