import express, { Router } from 'express';
import * as jobController from '../../controllers/jobController';
import { validateJobInput } from '../../middleware/validateJob';
import { protect } from '../../middleware/authMiddleware';

const router: Router = express.Router();

// Protect all routes with authentication middleware
router.use(protect);

router.get('/', jobController.getJobs);

router.get('/:id', jobController.getJob);

router.post('/', validateJobInput, jobController.createJob);

router.put('/:id', validateJobInput, jobController.updateJob);

router.delete('/:id', jobController.deleteJob);

export default router;
