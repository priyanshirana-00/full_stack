# Deployment Guide for Render

## Prerequisites
- GitHub repository with your code (✅ Done!)
- MongoDB Atlas account with connection string
- Google Gemini AI API key
- Render account (free tier available)

## Step-by-Step Deployment

### 1. Sign up for Render
- Go to https://render.com
- Sign up with your GitHub account

### 2. Create a New Web Service
1. Click "New +" button → "Web Service"
2. Connect your GitHub account if not already connected
3. Select the `priyanshirana-00/full_stack` repository
4. Render will detect your repository

### 3. Configure the Service

**Basic Settings:**
- **Name:** fullstack-chat-app (or any name you prefer)
- **Region:** Choose closest to you (e.g., Singapore, Oregon)
- **Branch:** main
- **Root Directory:** `backend`
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** Free

### 4. Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add these:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Required |
| `GEMINI_API_KEY` | `your_actual_api_key` | Get from Google AI Studio |
| `JWT_SECRET` | `your_random_secret_string` | Use a strong random string |
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `GOOGLE_CLIENT_ID` | `your_google_client_id` | Optional - for Google OAuth |
| `PORT` | Leave empty | Render sets this automatically |

**Important:** Don't use quotes around the values!

### 5. Deploy!
1. Click "Create Web Service"
2. Render will:
   - Clone your repository
   - Install dependencies
   - Start your server
3. Wait 2-5 minutes for the first deployment
4. Your app will be live at: `https://fullstack-chat-app-xxxx.onrender.com`

## After Deployment

### Update Your MongoDB Settings
1. Go to MongoDB Atlas
2. Network Access → Add Render's IP or allow all IPs (0.0.0.0/0)

### Test Your App
1. Open the Render URL
2. Try to sign up
3. Log in
4. Test the chat functionality

## Troubleshooting

### Build Failed
- Check logs in Render dashboard
- Verify `backend` folder has package.json
- Ensure all dependencies are in package.json

### Server Crashes
- Check Environment Variables are set correctly
- MongoDB connection string must be URL-encoded
- Verify GEMINI_API_KEY is valid

### Can't Connect to MongoDB
- Whitelist Render's IP in MongoDB Atlas
- Or allow all IPs: 0.0.0.0/0
- Check MONGODB_URI has correct password encoding

### Chat Not Working
- Verify GEMINI_API_KEY in environment variables
- Check browser console for errors
- Check Render logs for API errors

## Updating Your App

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Render will automatically redeploy!

## Free Tier Limitations
- App goes to sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month free (enough for one service)

## Upgrading
To keep your app always running:
- Upgrade to Render's paid plan ($7/month)
- App stays awake 24/7
- No cold starts

---

🎉 **Your app is now live and accessible worldwide!**
