import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Initialize Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }, { apiVersion: "v1" });

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/chatapp";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  hash: { type: String },
  displayName: { type: String, required: true },
  provider: { type: String, default: 'local' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Public config for client-side scripts (e.g., Google Client ID)
app.get("/config.js", (req, res) => {
  res.type("application/javascript");
  const cfg = { googleClientId: GOOGLE_CLIENT_ID ? GOOGLE_CLIENT_ID : "" };
  res.send(`window.APP_CONFIG = ${JSON.stringify(cfg)};`);
});

// Auth endpoints
app.post("/auth/register", async (req, res) => {
  try {
    console.log("📝 Registration attempt:", req.body);
    const { email, password, name } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      console.log("⚠️ User already exists:", email);
      return res.status(409).json({ error: "User already exists" });
    }
    
    const hash = await bcrypt.hash(password, 10);
    const displayName = (name && String(name).trim()) || email.split("@")[0];
    
    const user = new User({ email: email.toLowerCase(), hash, displayName });
    await user.save();
    console.log("✅ User registered successfully:", email);
    
    return res.json({ ok: true });
  } catch (e) {
    console.error("❌ Registration error:", e);
    return res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
    const ok = await bcrypt.compare(password, user.hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    
    const token = jwt.sign({ sub: user.email, name: user.displayName }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { email: user.email, displayName: user.displayName } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Login failed" });
  }
});

// Google Sign-In (One-tap / button) endpoint: exchange ID token for app JWT
app.post("/auth/google", async (req, res) => {
  try {
    const { idToken } = req.body || {};
    if (!idToken) return res.status(400).json({ error: "Missing idToken" });
    if (!googleClient) return res.status(500).json({ error: "Google sign-in not configured" });

    const ticket = await googleClient.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name || (email ? email.split("@")[0] : "User");
    if (!email) return res.status(400).json({ error: "Invalid Google token" });

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = new User({ email: email.toLowerCase(), hash: null, displayName: name, provider: "google" });
      await user.save();
    }

    const token = jwt.sign({ sub: user.email, name: user.displayName }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { email: user.email, displayName: user.displayName } });
  } catch (e) {
    console.error("Google auth error", e);
    return res.status(401).json({ error: "Google sign-in failed" });
  }
});

// Current user profile
app.get("/auth/me", authRequired, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.sub.toLowerCase() });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ email: user.email, displayName: user.displayName });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load profile" });
  }
});

app.post("/chat", authRequired, async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Send message to Gemini
      const result = await model.generateContent(userMessage);
      // Debug logs can be noisy for long replies; enable only when needed.
      if (process.env.DEBUG_GEMINI === '1') {
        console.log('=== Gemini raw result ===');
        console.dir(result, { depth: 4 });
      }

      let reply = '';
      try {
        // Try common shapes
        if (result.response && typeof result.response.text === 'function') {
          reply = result.response.text();
        } else if (result.candidates && result.candidates[0] && result.candidates[0].content) {
          reply = result.candidates[0].content;
        } else if (result.output && Array.isArray(result.output) && result.output[0] && result.output[0].content) {
          reply = result.output[0].content;
        } else if (typeof result === 'string') {
          reply = result;
        } else {
          reply = JSON.stringify(result);
        }
      } catch (e) {
        console.error('Error extracting reply:', e);
        reply = JSON.stringify(result);
      }

      if (process.env.DEBUG_GEMINI === '1') {
        console.log('=== Extracted reply ===', reply);
      }

      res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong with Gemini API" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
