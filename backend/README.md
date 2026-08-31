# ReviewShield-AI Backend

AI-powered Fake Review Monitoring System Backend - Express.js API server with MongoDB integration.

## Features

- ✅ User authentication & authorization
- ✅ Review submission and analysis
- ✅ Fake review detection with AI/ML
- ✅ Explainable AI insights
- ✅ 3D visualizations support
- ✅ RESTful API endpoints
- ✅ JWT token-based security
- ✅ Comprehensive logging

## Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Logging**: Winston
- **Environment Management**: dotenv

## Installation

1. Clone the repository and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/reviewshield-ai
   PORT=5000
   JWT_SECRET=your_secret_key_here
   # Add other required variables
   ```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Reviews
- `GET /api/reviews` - Get all reviews (paginated)
- `POST /api/reviews` - Submit a review for analysis
- `GET /api/reviews/:id` - Get a specific review

### Analysis
- `POST /api/analysis/detect-fake` - Detect fake reviews using AI
- `POST /api/analysis/explain` - Get explainable AI insights
- `GET /api/analysis/statistics` - Get analysis statistics

### Visualizations
- `GET /api/visualizations/3d-data` - Get 3D visualization data
- `GET /api/visualizations/heatmap` - Get heatmap data
- `GET /api/visualizations/dashboard` - Get dashboard data

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/activity` - Get user activity

### Health
- `GET /api/health` - Check server health status

## Project Structure

```
backend/
├── models/           # Database models (User, Review, etc.)
├── routes/           # API route handlers
├── middleware/       # Express middlewares (auth, etc.)
├── utils/            # Utility functions (logger, etc.)
├── server.js         # Main server file
├── package.json      # Dependencies
├── .env.example      # Environment variables template
└── README.md         # This file
```

## Environment Variables

See `.env.example` for all available configuration options:

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGIN` - Frontend URL for CORS
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `HUGGINGFACE_API_KEY` - HuggingFace API key for ML models

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for secure API access
- CORS enabled for frontend integration
- Environment variables for sensitive data

## Logging

Logs are stored in the `logs/` directory:
- `logs/error.log` - Error logs only
- `logs/combined.log` - All logs

## Next Steps

1. Implement database models and schemas
2. Connect AI/ML services (OpenAI, HuggingFace, etc.)
3. Implement review analysis algorithms
4. Create explainable AI features
5. Develop 3D visualization backend
6. Add comprehensive error handling
7. Write unit and integration tests
8. Set up CI/CD pipeline

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT

## Support

For issues or questions, please open an issue in the main repository.
