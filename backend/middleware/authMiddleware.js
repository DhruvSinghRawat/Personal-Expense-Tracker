/**
 * Authentication Middleware
 * Protects private routes by verifying JWT token
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// =========================
// Protect Routes Middleware
// =========================
/**
 * Verifies JWT token and attaches user to request object
 */
exports.protect = async (req, res, next) => {
  let token;

  // Extract token from Authorization header: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If token is missing
  if (!token) {
    return res.status(401).json({
      message: 'Not authorized, no token provided',
    });
  }

  try {
    // Verify token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user associated with the token
    req.user = await User.findById(decoded.id).select('-password');

    // If user does not exist
    if (!req.user) {
      return res.status(401).json({
        message: 'Not authorized, user not found',
      });
    }

    // User authenticated successfully
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);

    // Handle token expiration
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expired',
      });
    }

    // Handle invalid token
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    return res.status(401).json({
      message: 'Not authorized, token verification failed',
    });
  }
};
