import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import connectDB from '../config/db';
import path from 'path';
import config from '../config/config';
import { errorHandler } from './middleware/errorHandler';
import { seedRoles } from '../config/jobRoles';

// Import API versions
import v1Routes from './routes/v1';

// Connect to database
connectDB();

// Seed job roles if they don't exist
seedRoles();

// Initialize Express app
const app: Express = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, '../public')));

// API Routes - Version 1
app.use('/api/v1', v1Routes);

// Basic route
app.get('/', (_req: Request, res: Response) => {
  res.send('Job Application Tracker API is running');
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.info(`Server running in ${config.env} mode on port ${PORT}`);
});
