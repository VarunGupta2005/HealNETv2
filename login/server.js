const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');

// Initialize express
const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser()); // To parse cookies
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend origin (adjust if different)
  credentials: true // Allow cookies to be sent
}));

// --- Static File Serving ---

// Serve static files from the 'login' directory itself (for login page assets: css, js)
app.use(express.static(path.join(__dirname)));

// Serve static files from the main 'css' and 'js' directories (relative to login folder)
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// Serve static files from the 'Blog' directory under the '/blog' path
// This makes CSS, JS, and images inside Blog/ accessible via /blog/css, /blog/js, /blog/img
app.use('/blog', express.static(path.join(__dirname, '..', 'Blog')));

// --- API Routes ---
app.use('/api/auth', authRoutes);

// --- Page Routes ---

// Route for the main application page
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'healnet_main.html'));
});

// Route for the login page (root)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the main blog page
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Blog', 'index.html'));
});

// Route for the blog contact page
app.get('/blog/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Blog', 'contact.html'));
});

// Route for a specific blog post page
// Note: If you have multiple blog posts, you might need a more dynamic route like /blog/posts/:postName
app.get('/blog/post', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Blog', 'blogpost.html'));
});

// Route for the Appointment page
app.get('/appointment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Appointment', 'index.html'));
});

// Serve assets for the Appointment page
app.use('/appointment', express.static(path.join(__dirname, '..', 'Appointment')));


// --- Database Connection ---
// Make sure MONGO_URI is set in your .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));


// --- Start Server ---
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
