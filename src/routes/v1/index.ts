import express, { Router } from 'express';
import jobsRouter from './jobs';
import rolesRouter from './roles';
import authRouter from './auth';

const router: Router = express.Router();

// Mount all resource routers
router.use('/jobs', jobsRouter);
router.use('/roles', rolesRouter);
router.use('/auth', authRouter);

export default router;
