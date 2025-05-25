import swaggerJSDoc from 'swagger-jsdoc';
import config from './config';

/**
 * Swagger configuration options
 */
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Application Tracker API',
      version: '1.0.0',
      description: 'API documentation for the Job Application Tracker application',
      contact: {
        name: 'API Support',
        url: 'https://jobapplicationtracker.example.com/support',
        email: 'support@jobapplicationtracker.example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v1`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Path patterns to API documentation files
  apis: ['./src/docs/swagger/*.ts'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
