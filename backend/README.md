# Backend - Full-Stack Chat Application

Express.js server with MongoDB integration and Gemini AI.

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id (optional)
```

## Running the Server

```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login with credentials
- `POST /auth/google` - Google OAuth login
- `GET /auth/me` - Get current user profile

### Chat
- `POST /chat` - Send message to AI (requires auth)

### Configuration
- `GET /config.js` - Client configuration
