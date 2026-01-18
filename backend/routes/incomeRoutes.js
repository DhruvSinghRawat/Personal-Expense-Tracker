/**
 * Income Routes
 * Handles CRUD operations and export for user income
 */

const express = require('express');
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// =========================
// Income Routes
// =========================

/**
 * Add a new income entry
 * @route POST /api/v1/income/add
 * @access Private
 */
router.post('/add', protect, addIncome);

/**
 * Get all income entries for logged-in user
 * @route GET /api/v1/income/get
 * @access Private
 */
router.get('/get', protect, getAllIncome);

/**
 * Alias route for fetching all income entries
 * @route GET /api/v1/income/all
 * @access Private
 */
router.get('/all', protect, getAllIncome);

/**
 * Delete an income entry by ID
 * @route DELETE /api/v1/income/:id
 * @access Private
 */
router.delete('/:id', protect, deleteIncome);

/**
 * Download income data as Excel file
 * @route GET /api/v1/income/download-excel
 * @access Private
 */
router.get('/download-excel', protect, downloadIncomeExcel);

module.exports = router;
