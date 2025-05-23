import express, { Router } from 'express';
import * as roleController from '../../controllers/roleController';

const router: Router = express.Router();

// GET all roles
router.get('/', roleController.getRoles);

export default router;
