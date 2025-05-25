import express, { Router } from 'express';
import * as jobController from '../../controllers/jobController';
import { protect } from '../../middleware/authMiddleware';
import { createJobValidation, updateJobValidation } from '../../middleware/validators/jobValidator';
import validationHandler from '../../middleware/validators/validationHandler';
import { jobsLimiter } from '../../middleware/rateLimit/rateLimiter';

const router: Router = express.Router();

// Apply jobs rate limiter to all job routes
router.use(jobsLimiter);

// All routes require authentication
router.use(protect);

// GET all jobs
router.get('/', jobController.getJobs);

// GET a single job
router.get('/:id', jobController.getJob);

// POST a new job with validation
router.post('/', createJobValidation, validationHandler, jobController.createJob);

// PUT update a job with validation
router.put('/:id', updateJobValidation, validationHandler, jobController.updateJob);

// DELETE a job
router.delete('/:id', jobController.deleteJob);

export default router;
