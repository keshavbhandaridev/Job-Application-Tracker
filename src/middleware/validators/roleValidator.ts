import { body, param, ValidationChain } from 'express-validator';

/**
 * Validation rules for creating a new role
 */
export const createRoleValidation: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Role name is required')
    .isString()
    .withMessage('Role name must be a string')
    .trim(),
];

/**
 * Validation rules for retrieving a specific role
 */
export const getRoleByIdValidation: ValidationChain[] = [
  param('id').isMongoId().withMessage('Invalid role ID format'),
];
