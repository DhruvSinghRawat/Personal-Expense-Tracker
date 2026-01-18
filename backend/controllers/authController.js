/**
 * Authentication Controller
 * Handles user registration, login, and authenticated user details
 */

const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Generates a signed JWT token for authentication
 * @param {string} userId - MongoDB user ID
 * @returns {string} JWT token
 */
const generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// =========================
// Register User
// =========================
/**
 * Registers a new user account
 * @route POST /api/v1/auth/register
 */
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // Validate required fields
  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  try {
    // Check if user already exists with same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create a new user document
    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    // Return safe response without password
    return res.status(201).json({
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImageUrl: newUser.profileImageUrl,
      },
      token: generateAuthToken(newUser._id),
    });
  } catch (error) {
    console.error("Register error:", error);

    // Handle duplicate email error from MongoDB
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

// =========================
// Login User
// =========================
/**
 * Authenticates user credentials and returns JWT
 * @route POST /api/v1/auth/login
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Return safe response without password
    return res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      },
      token: generateAuthToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

// =========================
// Get Logged-in User Info
// =========================
/**
 * Fetches authenticated user's profile information
 * @route GET /api/v1/auth/getUser
 */
exports.getUserInfo = async (req, res) => {
  try {
    // Fetch user details excluding password
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get user info error:", error);
    return res.status(500).json({
      message: "Error getting user info",
    });
  }
};
