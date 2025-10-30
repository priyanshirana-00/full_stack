# Full-Stack Chat Application

A modern, responsive chat application powered by Google's Gemini AI with user authentication and MongoDB storage.

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

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "Full Stack"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=your_mongodb_connection_string_here
   GOOGLE_CLIENT_ID=your_google_client_id_here (optional)
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
Full Stack/
├── public/
│   ├── index.html       # Main chat interface
│   ├── login.html       # Login page
│   ├── signup.html      # Registration page
│   ├── index.css        # Chat page styles
│   ├── auth.css         # Authentication page styles
│   ├── chat.js          # Chat functionality
│   ├── auth.js          # Authentication logic
│   └── script.js        # General scripts
├── index.js             # Main server file
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables (not tracked)
└── .gitignore          # Git ignore rules
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

## License

This project is open source and available under the MIT License.

## Author

Built with ❤️ by Priyanshu Rana

## Acknowledgments

- Google Gemini AI for the chat functionality
- MongoDB Atlas for cloud database hosting
- NavGurukul for learning and support
