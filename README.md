# Job Application Tracker

A Node.js application to help you track your job applications, interviews, and offers.

## Features

- Track job applications with detailed information
- Monitor application status (Applied, Interview, Offer, Rejected, Saved)
- Store contact information, salary details, and important dates
- Simple and intuitive API

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API design

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB

### Installation

1. Clone this repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a .env file in the root directory with the following content:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/job-tracker
   NODE_ENV=development
   ```
4. Start the server
   ```
   npm start
   ```

## API Endpoints

### Jobs

- `GET /api/jobs` - Get all job applications
- `GET /api/jobs/:id` - Get a specific job application
- `POST /api/jobs` - Create a new job application
- `PUT /api/jobs/:id` - Update a job application
- `DELETE /api/jobs/:id` - Delete a job application

## License

This project is licensed under the MIT License