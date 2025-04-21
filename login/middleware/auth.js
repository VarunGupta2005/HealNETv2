const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - Middleware to verify JWT
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Else check for token in cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route (no token)' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload to request object
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      // Handle case where user associated with token no longer exists
      return res.status(401).json({ success: false, message: 'Not authorized to access this route (user not found)' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(401).json({ success: false, message: 'Not authorized to access this route (token invalid)' });
  }
};

// Grant access to specific roles (Example)
/*
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};
*/
