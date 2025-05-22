<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Job Application Tracker - Development Guidelines

This is a Node.js application for tracking job applications. Keep these guidelines in mind when suggesting code:

## Project Structure
- `/src/models`: MongoDB schemas
- `/src/controllers`: Business logic
- `/src/routes`: API endpoints
- `/config`: Configuration files
- `/public`: Static assets

## Development Standards
- Use async/await for asynchronous operations
- Follow RESTful API design principles
- Implement proper error handling using try/catch
- Include input validation where appropriate
- Write descriptive comments
- Use camelCase for variables and functions
- Prefer const over let where possible