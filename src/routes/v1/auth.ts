import express, { Router } from 'express';
import * as authController from '../../controllers/authController';
import { registerValidation, loginValidation } from '../../middleware/validators/authValidator';
import validationHandler from '../../middleware/validators/validationHandler';
import { authLimiter } from '../../middleware/rateLimit/rateLimiter';

const router: Router = express.Router();

// Apply auth rate limiter to all authentication routes
router.use(authLimiter);

// Register new user
router.post('/register', registerValidation, validationHandler, authController.register);

// Login user
router.post('/login', loginValidation, validationHandler, authController.login);

export default router;
