import { Request } from 'express';
import { IJob } from '../models/Job';

// Error interface
export interface ErrorResponse {
  message: string;
  error?: string;
  stack?: string;
}

// Custom request interfaces
export interface JobRequest extends Request {
  job?: IJob;
}

// Pagination result interface
export interface PaginationResult<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
