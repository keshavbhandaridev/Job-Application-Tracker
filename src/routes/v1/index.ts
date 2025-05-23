import express, { Router } from 'express';
import jobsRouter from './jobs';
import rolesRouter from './roles';

const router: Router = express.Router();

// Mount all resource routers
router.use('/jobs', jobsRouter);
router.use('/roles', rolesRouter);

export default router;
