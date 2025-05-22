import { Request, Response } from 'express';
import Job from '../models/Job';

// Get all job applications
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find().sort({ applicationDate: -1 });
    res.status(200).json(jobs);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error fetching jobs', error: errorMessage });
  }
};

// Get a single job application
export const getJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job application not found' });
      return;
    }
    res.status(200).json(job);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error fetching job', error: errorMessage });
  }
};

// Create a new job application
export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: 'Error creating job application', error: errorMessage });
  }
};

// Update a job application
export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) {
      res.status(404).json({ message: 'Job application not found' });
      return;
    }
    res.status(200).json(updatedJob);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: 'Error updating job application', error: errorMessage });
  }
};

// Delete a job application
export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      res.status(404).json({ message: 'Job application not found' });
      return;
    }
    res.status(200).json({ message: 'Job application deleted successfully' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error deleting job application', error: errorMessage });
  }
};
