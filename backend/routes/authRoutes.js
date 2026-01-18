/**
 * Authentication Routes
 * Handles user registration, login, profile fetching, and image upload
 */

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// =========================
// Auth Routes
// =========================

/**
 * Register a new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
router.post('/register', registerUser);

/**
 * Login an existing user
 * @route POST /api/v1/auth/login
 * @access Public
 */
router.post('/login', loginUser);

/**
 * Get logged-in user information
 * @route GET /api/v1/auth/getUser
 * @access Private
 */
router.get('/getUser', protect, getUserInfo);

// =========================
// Image Upload Route
// =========================

/**
 * Upload user profile image
 * @route POST /api/v1/auth/upload-image
 * @access Private
 */
router.post(
  '/upload-image',
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded',
      });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({
      imageUrl,
    });
  }
);

module.exports = router;
