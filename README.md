# Job Application Tracker

A Node.js application to help you track your job applications, interviews, and offers.

## Features

- Track job applications with detailed information
- Monitor application status (Applied, Interview, Offer, Rejected, Saved)
- Store contact information, salary details, and important dates
- User authentication and authorization
- Pre-defined job roles for easy categorization
- Location data with countries, states, and cities
- Rate limiting for enhanced security
- API validation and error handling
- Swagger API documentation
- Simple and intuitive REST API

## Technology Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **API Documentation**: Swagger/OpenAPI
- **Security**: Rate limiting, input validation
- **API**: RESTful API design

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB
- TypeScript

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
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=30d
   ```
4. Seed the database with initial data
   ```
   npm run seed:regions    # Seed countries, states, and cities
   npm run seed:roles      # Seed job roles
   ```
5. Build the application
   ```
   npm run build
   ```
6. Start the server
   ```
   npm start
   ```
7. For development with hot reload
   ```
   npm run dev
   ```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Run development server with hot reload
- `npm run build`: Build the TypeScript project
- `npm run lint`: Run ESLint for code quality checks
- `npm run lint:fix`: Fix ESLint issues automatically
- `npm run format`: Format code using Prettier
- `npm run check-format`: Check if code needs formatting
- `npm run check`: Run linting and format checking
- `npm run seed:regions`: Seed the database with geographic regions
- `npm run seed:roles`: Seed the database with common job roles

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get authentication token

### Jobs

- `GET /api/v1/jobs` - Get all job applications
- `GET /api/v1/jobs/:id` - Get a specific job application
- `POST /api/v1/jobs` - Create a new job application
- `PUT /api/v1/jobs/:id` - Update a job application
- `DELETE /api/v1/jobs/:id` - Delete a job application

### Roles

- `GET /api/v1/roles` - Get all job roles

### Regions

- `GET /api/v1/countries` - Get all countries
- `GET /api/v1/countries/states` - Get states by country ID
- `GET /api/v1/countries/cities` - Get cities by state ID

## API Documentation

API documentation is available at `/api-docs` once the server is running.

## Project Structure

- `/src/models`: MongoDB schemas (User, Job, Role, Country, State, City)
- `/src/controllers`: Business logic for handling requests
- `/src/routes`: API endpoint definitions
- `/src/middleware`: Authentication, validation, error handling
- `/config`: Application configuration
- `/scripts`: Database seeding scripts
- `/public`: Static assets

## License

This project is licensed under the MIT License