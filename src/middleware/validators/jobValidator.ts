import { body, param, ValidationChain } from 'express-validator';

/**
 * Validation rules for creating a new job application
 */
export const createJobValidation: ValidationChain[] = [
  body('company')
    .notEmpty()
    .withMessage('Company name is required')
    .isString()
    .withMessage('Company must be a string')
    .trim(),

  body('role')
    .notEmpty()
    .withMessage('Job role is required')
    .isString()
    .withMessage('Role must be a string')
    .trim(),

  body('location.country').optional().isString().withMessage('Country must be a string').trim(),

  body('location.state').optional().isString().withMessage('State must be a string').trim(),

  body('location.city').optional().isString().withMessage('City must be a string').trim(),

  body('isRemote').optional().isBoolean().withMessage('isRemote must be a boolean'),

  body('status')
    .optional()
    .isIn(['Applied', 'Interview', 'Offer', 'Rejected'])
    .withMessage('Status must be Applied, Interview, Offer, or Rejected'),

  body('notes').optional().isString().withMessage('Notes must be a string').trim(),
];

/**
 * Validation rules for updating an existing job application
 */
export const updateJobValidation: ValidationChain[] = [
  param('id').isMongoId().withMessage('Invalid job ID format'),
];
