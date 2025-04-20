# Node.js MongoDB API Project

## Overview
A RESTful API built with Node.js, Express, and MongoDB that demonstrates proper architecture, routing, and database integration. This project showcases a well-structured backend application with clean separation of concerns and industry best practices.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables
- cors for cross-origin resource sharing
- morgan for HTTP request logging

## Project Structure
```
nodejs-mongo-api/
├── src/
│   ├── config/       - Configuration files
│   ├── controllers/  - Business logic
│   ├── middleware/   - Custom middleware
│   ├── models/       - Database schemas
│   ├── routes/       - API routes
│   ├── utils/        - Helper functions
│   ├── app.js        - Express app setup
│   └── server.js     - Entry point
├── .env              - Environment variables
└── package.json      - Project metadata
```

## API Endpoints

### User Routes
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product

## Core Features
1. **MVC Architecture**: Separation of concerns with models, controllers, and routes
2. **MongoDB Integration**: Using Mongoose for object modeling
3. **RESTful API Design**: Following REST principles for API endpoints
4. **Error Handling**: Centralized error handling middleware
5. **Environment Configuration**: Using dotenv for environment variables
6. **Code Organization**: Well-structured codebase with clear responsibilities

<details>
<summary><b>Design Decisions and Implementation Details</b></summary>

### Why MongoDB?
MongoDB was chosen for this project because of its flexibility with document-based schemas, making it ideal for rapid development and easy adaptation to changing requirements. The Mongoose ODM provides a structured way to model application data.

### Project Structure
The project follows a modular structure to enhance maintainability and scalability:
- **Controllers**: Handle request processing and response generation
- **Models**: Define database schemas and business logic related to data
- **Routes**: Define API endpoints and connect them to controllers
- **Middleware**: Implement cross-cutting concerns like authentication and logging

### Security Considerations
1. **Password Hashing**: User passwords are hashed before storage
2. **Field Exclusion**: Password fields are excluded from query results (`select: false`)
3. **Environment Variables**: Sensitive configuration is stored in environment variables
4. **CORS Configuration**: API access is controlled via CORS settings

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation Steps
1. Clone the repository
   ```
   git clone <repository-url>
   cd nodejs-mongo-api
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/api_demo
   NODE_ENV=development
   ```

4. Start the server
   ```
   npm run dev
   ```

## API Documentation

### Create a User
```
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Create a Product
```
POST /api/products
Content-Type: application/json

{
  "name": "Smartphone",
  "description": "Latest model smartphone with advanced features",
  "price": 999.99,
  "category": "electronics",
  "inStock": true,
  "createdBy": "user_id_here"
}
```

## Future Enhancements
1. **Authentication with JWT**: Implement token-based authentication
2. **Request Validation**: Add validation for incoming requests
3. **Rate Limiting**: Protect API from abuse with rate limiting
4. **Pagination**: Add pagination for list endpoints
5. **Logging**: Implement advanced logging

## Lessons Learned
During the development of this project, I gained insights into:
1. Structuring a Node.js application for scalability
2. Working with MongoDB and Mongoose for data modeling
3. Implementing proper error handling in Express
4. Managing environment-specific configurations
5. Creating a RESTful API with proper routes and controllers
</details>

<details>
<summary><b>Testing Documentation</b></summary>

# Testing the Node.js MongoDB API

This project includes a comprehensive test suite using Jest and Supertest to verify API functionality.

## Testing Setup

The test environment uses:
- **Jest**: JavaScript testing framework
- **Supertest**: For HTTP assertions
- **mongodb-memory-server**: In-memory MongoDB server for testing

## Test Structure

```
tests/
├── app.test.js         - Tests for basic app functionality
├── db-handler.js       - MongoDB in-memory setup
├── product.test.js     - Tests for product endpoints
└── user.test.js        - Tests for user endpoints
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/user.test.js

# Run with coverage report
npm test -- --coverage
```

## Test Cases

### User API Tests
- Creating a new user
- Handling duplicate emails
- Validating required fields
- Getting all users
- Getting a single user by ID
- Handling invalid user IDs

### Product API Tests
- Creating a new product
- Validating required fields
- Validating product categories
- Getting all products
- Getting a single product by ID
- Handling invalid product IDs

### App Tests
- Testing the welcome route
- Testing 404 handling for nonexistent routes

## Adding New Tests

To add new tests, create a new test file in the tests directory following the existing patterns. Make sure to:

1. Import the necessary modules
2. Connect to the test database
3. Clean up after each test
4. Group related tests using `describe` blocks
5. Write clear, focused test cases with `it` blocks

## Best Practices

- Test both success and error scenarios
- Test validation logic
- Use clear, descriptive test names
- Keep tests independent of each other
- Clean up database after each test
</details>