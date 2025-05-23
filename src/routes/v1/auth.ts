import express, { Router } from 'express';
import * as authController from '../../controllers/authController';

const router: Router = express.Router();

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

export default router;
