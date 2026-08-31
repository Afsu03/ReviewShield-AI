# ReviewShield-AI Backend Setup Guide

## Overview

The backend has been successfully connected to your ReviewShield-AI repository! This document guides you through setting up and using the backend.

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Architecture

### Directory Structure
```
backend/
├── models/              # Mongoose database schemas
│   ├── User.js         # User model
│   └── Review.js       # Review model
├── routes/             # API endpoints
│   ├── auth.js         # Authentication endpoints
│   ├── reviews.js      # Review endpoints
│   ├── analysis.js     # AI analysis endpoints
│   ├── visualizations.js # 3D visualization endpoints
│   └── users.js        # User profile endpoints
├── middleware/         # Express middleware
│   └── auth.js         # JWT authentication
├── utils/              # Utility functions
│   └── logger.js       # Logging configuration
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env.example        # Environment template
└── README.md           # Backend documentation
```

## API Endpoints

### Authentication `/api/auth`
- `POST /register` - Create new user account
- `POST /login` - Login and get JWT token
- `POST /logout` - Logout user

### Reviews `/api/reviews`
- `GET /` - Fetch all reviews (requires auth)
- `POST /` - Submit new review for analysis (requires auth)
- `GET /:id` - Get specific review details (requires auth)

### Analysis `/api/analysis`
- `POST /detect-fake` - Analyze review with AI (requires auth)
- `POST /explain` - Get explainable AI insights (requires auth)
- `GET /statistics` - Get overall statistics (requires auth)

### Visualizations `/api/visualizations`
- `GET /3d-data` - Get 3D visualization data (requires auth)
- `GET /heatmap` - Get heatmap data (requires auth)
- `GET /dashboard` - Get dashboard data (requires auth)

### Users `/api/users`
- `GET /profile` - Get user profile (requires auth)
- `PUT /profile` - Update user profile (requires auth)
- `GET /activity` - Get user activity history (requires auth)

### Health Check
- `GET /api/health` - Check server status

## Configuration

### Required Environment Variables
```env
# Database
MONGODB_URI=mongodb://localhost:27017/reviewshield-ai

# Server
PORT=5000
NODE_ENV=development

# API Keys
OPENAI_API_KEY=your_key_here
HUGGINGFACE_API_KEY=your_key_here

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Database Models

### User Schema
- `name` (String, required) - User's full name
- `email` (String, required, unique) - User's email
- `password` (String, required) - Hashed password
- `createdAt` (Date) - Account creation timestamp
- `updatedAt` (Date) - Last update timestamp

### Review Schema
- `userId` (ObjectId) - Reference to User
- `productId` (String, required) - Product identifier
- `reviewText` (String, required) - Review content
- `rating` (Number) - Review rating (1-5)
- `source` (String) - Review source (amazon, ebay, walmart, custom)
- `isFake` (Boolean) - Fake detection result
- `confidence` (Number) - Detection confidence (0-1)
- `analysis` (Object) - Detailed analysis data
- `createdAt` (Date) - Submission timestamp
- `updatedAt` (Date) - Last update timestamp

## Authentication

### JWT Token Usage
1. Register/Login to get a JWT token
2. Include token in Authorization header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. Token expires based on `JWT_EXPIRATION` setting

### Protected Routes
All routes except `/api/health`, `/api/auth/register`, and `/api/auth/login` require a valid JWT token.

## Development Workflow

### Install New Dependencies
```bash
npm install <package-name>
```

### Add New Routes
1. Create a new file in `routes/` folder
2. Import it in `server.js`
3. Add route with: `app.use('/api/your-route', require('./routes/your-file'));`

### Add New Models
1. Create model file in `models/` folder
2. Define schema using Mongoose
3. Import in routes as needed

### Logging
Use the logger utility in any file:
```javascript
const logger = require('../utils/logger');
logger.info('Info message');
logger.error('Error message');
```

## Next Implementation Steps

1. **Connect Database**
   - Set up MongoDB Atlas or local MongoDB
   - Update `MONGODB_URI` in `.env`
   - Test connection

2. **Implement Authentication**
   - Hash passwords with bcryptjs
   - Generate JWT tokens
   - Validate token on protected routes

3. **Integrate AI Services**
   - Connect to OpenAI API or similar
   - Implement fake review detection model
   - Add explainability features

4. **Database Operations**
   - Implement full CRUD operations
   - Add data validation
   - Implement pagination

5. **Visualization Data**
   - Generate 3D visualization coordinates
   - Create heatmap datasets
   - Build dashboard metrics

6. **Testing**
   - Write unit tests
   - Write integration tests
   - Set up CI/CD

7. **Frontend Integration**
   - Update frontend API URLs
   - Test all endpoints
   - Handle authentication flow

## Frontend Integration

Update your frontend API client to point to the backend:

```javascript
// Example frontend API call
const API_BASE_URL = 'http://localhost:5000/api';

// Login
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const { token } = await response.json();

// Use token in subsequent requests
const reviewsResponse = await fetch(`${API_BASE_URL}/reviews`, {
  headers: { 'Authorization': `Bearer ${token}` },
});
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or connection string is correct
- Check `MONGODB_URI` in `.env`

### Port Already in Use
- Change `PORT` in `.env`
- Or kill existing process: `lsof -ti:5000 | xargs kill -9`

### Missing Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Update `CORS_ORIGIN` in `.env` to match frontend URL
- Ensure frontend and backend run on different ports

## Support & Next Steps

- Review the backend README.md for more details
- Check individual route files for implementation examples
- Open issues in the repository for problems

Happy coding! 🚀
