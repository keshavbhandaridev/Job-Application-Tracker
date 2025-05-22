import express, { Router } from "express";
import * as jobController from "../controllers/jobController";
import { validateJobInput } from "../middleware/validateJob";

const router: Router = express.Router();

// GET all jobs
router.get("/", jobController.getJobs);

// GET a single job
router.get("/:id", jobController.getJob);

// POST a new job
router.post("/", validateJobInput, jobController.createJob);

// PUT update a job
router.put("/:id", validateJobInput, jobController.updateJob);

// DELETE a job
router.delete("/:id", jobController.deleteJob);

export default router;
