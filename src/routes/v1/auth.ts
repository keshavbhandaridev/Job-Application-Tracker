import express, { Router } from 'express';
import * as authController from '../../controllers/authController';
import { registerValidation, loginValidation } from '../../middleware/validators/authValidator';
import validationHandler from '../../middleware/validators/validationHandler';

const router: Router = express.Router();

// Register new user
router.post('/register', registerValidation, validationHandler, authController.register);

// Login user
router.post('/login', loginValidation, validationHandler, authController.login);

export default router;
