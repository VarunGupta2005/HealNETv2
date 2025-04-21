const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const { protect } = require('../middleware/auth'); // Optional: if you add protected routes later

// --- Helper function to send token response ---
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // Convert days to milliseconds
    ),
    httpOnly: true // Cookie cannot be accessed by client-side scripts
  };

  // Add secure flag in production environment for HTTPS
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options) // Set cookie
    .json({
      success: true,
      token // Also send token in response body (optional, but useful for frontend)
    });
  res.redirect('localhost://'); // Redirect to the home page after login or registration
};

// --- Routes ---

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username, email, and password' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists with that email' });
    }

    // Create user
    user = await User.create({
      username,
      email,
      password
    });

    sendTokenResponse(user, 201, res); // Send token and cookie upon successful registration

  } catch (err) {
    console.error('Registration Error:', err.message);
    // Handle potential Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server Error during registration' });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password presence
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    // Check for user by email, explicitly select password which is normally hidden
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' }); // Use generic message
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' }); // Use generic message
    }

    sendTokenResponse(user, 200, res); // Send token and cookie upon successful login

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ success: false, message: 'Server Error during login' });
  }
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Public (or Private if using protect middleware)
router.get('/logout', (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // Expire quickly
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
});


// Example protected route (requires middleware)
/*
router.get('/me', protect, async (req, res) => {
  try {
    // req.user is added by the protect middleware
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error('Get Me Error:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});
*/

module.exports = router;
