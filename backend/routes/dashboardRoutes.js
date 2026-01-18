/**
 * Dashboard Routes
 * Handles fetching dashboard-related analytics for the logged-in user
 */

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

// =========================
// Dashboard Route
// =========================

/**
 * Get dashboard summary data
 * @route GET /api/v1/dashboard
 * @access Private
 */
router.get('/', protect, getDashboardData);

module.exports = router;
