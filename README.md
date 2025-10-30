<div align="center">

# 🤖 Full-Stack Chat Application

### AI-Powered Chat with Gemini AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/atlas)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7.svg)](https://render.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A modern, responsive chat application powered by Google's Gemini AI with secure user authentication and MongoDB storage.

[Live Demo](#) • [Features](#features) • [Installation](#installation) • [Deployment](#deployment-on-render)

</div>

---

## 📸 Screenshots

<div align="center">

### Chat Interface
*Modern glassmorphism design with real-time AI responses*

### Authentication Pages
*Secure login and signup with Google OAuth support*

</div>

## Features

- 🤖 **AI-Powered Chat**: Integration with Google Gemini 2.5 Flash for intelligent conversations
- 🔐 **Authentication**: Secure user registration and login with JWT tokens
- 🔒 **Password Security**: Bcrypt password hashing
- 🗄️ **MongoDB Storage**: Cloud-based user data storage with MongoDB Atlas
- 🎨 **Modern UI**: Glassmorphism design with gradient animations
- 📱 **Fully Responsive**: Works seamlessly on all devices
- 🌐 **Google OAuth**: Optional Google Sign-In support

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Google Generative AI** SDK

### Frontend
- **Vanilla JavaScript**
- **Modern CSS** (Glassmorphism, Gradients, Animations)
- **Responsive Design** (Mobile-first approach)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/priyanshirana-00/full_stack.git
cd full_stack/backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start the server
npm start

# Open http://localhost:5000 in your browser
```

## 📋 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/priyanshirana-00/full_stack.git
   cd full_stack/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=your_mongodb_connection_string_here
   GOOGLE_CLIENT_ID=your_google_client_id_here (optional)
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   Navigate to `http://localhost:5000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `JWT_SECRET` | Secret key for JWT token generation | Yes |
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | No |

## Project Structure

```
full_stack/
├── backend/
│   ├── public/              # Frontend files (HTML, CSS, JS)
│   ├── server.js            # Main server file
│   ├── package.json         # Dependencies
│   ├── .env                 # Environment variables (not tracked)
│   └── .env.example         # Environment template
├── render.yaml              # Render deployment config
├── README.md                # Main documentation
└── .gitignore              # Git ignore rules
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with credentials
- `POST /auth/google` - Google OAuth login
- `GET /auth/me` - Get current user profile

### Chat
- `POST /chat` - Send message to AI (requires authentication)

### Configuration
- `GET /config.js` - Get client configuration

## Features in Detail

### User Authentication
- Secure password hashing with bcrypt
- JWT-based session management
- Email validation and duplicate checking
- Optional Google OAuth integration

### AI Chat
- Real-time responses from Google Gemini AI
- Message history display
- User-friendly chat interface
- Error handling and loading states

### Database Schema

**User Model:**
```javascript
{
  email: String (unique, lowercase),
  hash: String,
  displayName: String,
  provider: String (default: 'local'),
  createdAt: Date
}
```

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Environment variable protection
- ✅ Input validation
- ✅ CORS enabled
- ✅ Secure MongoDB connection

## Responsive Design

The application is fully responsive with breakpoints at:
- 📱 360px (Small phones)
- 📱 480px (Phones)
- 📱 640px (Large phones)
- 💻 768px (Tablets)

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## Deployment on Render

1. **Push your code to GitHub** (already done!)

2. **Create a Render account** at https://render.com

3. **Create a new Web Service**
   - Connect your GitHub repository
   - Select the `full_stack` repository
   - Render will automatically detect the `render.yaml` file

4. **Add Environment Variables** in Render dashboard:
   - `GEMINI_API_KEY` - Your Google Gemini AI API key
   - `JWT_SECRET` - A secure random string
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `GOOGLE_CLIENT_ID` - (Optional) Your Google OAuth Client ID
   - `NODE_ENV` - Set to `production`

5. **Deploy!**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Your app will be live at `https://your-app-name.onrender.com`

### Manual Deployment (Alternative)

If `render.yaml` doesn't work, manually configure:
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node

## License

This project is open source and available under the MIT License.

## Author

Built with ❤️ by Priyanshi Rana

## Acknowledgments

- Google Gemini AI for the chat functionality
- MongoDB Atlas for cloud database hosting
- NavGurukul for learning and support
