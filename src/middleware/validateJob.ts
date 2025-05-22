import { Request, Response, NextFunction } from "express";
import { JobStatus } from "../models/Job";

/**
 * Validate job input data middleware
 */
export const validateJobInput = (req: Request, res: Response, next: NextFunction): void => {
  const { company, position, status } = req.body;

  // Required fields validation
  if (!company || !position) {
    res.status(400).json({
      message: "Company and position fields are required",
    });
    return;
  }

  // Status validation if provided
  if (status) {
    const validStatuses: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected", "Saved"];
    if (!validStatuses.includes(status as JobStatus)) {
      res.status(400).json({
        message: "Invalid status value. Must be one of: Applied, Interview, Offer, Rejected, Saved",
      });
      return;
    }
  }

  next();
};
