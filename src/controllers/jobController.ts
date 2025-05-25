import { Request, Response } from 'express';
import Job from '../models/Job';

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find({ user: req.user?._id });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: errorMessage,
    });
  }
};

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

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    req.body.user = req.user?._id;

    const newJob = new Job(req.body);
    const savedJob = await newJob.save();

    res.status(201).json({
      success: true,
      data: savedJob,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({
      success: false,
      message: 'Error creating job application',
      error: errorMessage,
    });
  }
};

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
