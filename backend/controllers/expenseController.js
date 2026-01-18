/**
 * Expense Controller
 * Handles expense creation, retrieval, deletion, and Excel export
 */

const xlsx = require('xlsx');
const Expense = require('../models/Expense');

// =========================
// Add Expense
// =========================
/**
 * Adds a new expense entry for the logged-in user
 * @route POST /api/v1/expense/add
 */
exports.addExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, category, amount, date } = req.body;

    // Validate required fields
    if (!category || !amount || !date) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();

    return res.status(201).json({
      message: 'Expense added successfully',
      expense: newExpense,
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// =========================
// Get All Expenses
// =========================
/**
 * Fetches all expense records for the logged-in user
 * @route GET /api/v1/expense/get
 */
exports.getAllExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    return res.status(200).json({ expenses });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// =========================
// Delete Expense
// =========================
/**
 * Deletes a specific expense entry belonging to the logged-in user
 * @route DELETE /api/v1/expense/:id
 */
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    // Ensure expense belongs to the current user
    if (expense.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: 'Not authorized to delete this expense',
      });
    }

    await Expense.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// =========================
// Download Expenses as Excel
// =========================
/**
 * Downloads all expense records of the user as an Excel file
 * @route GET /api/v1/expense/download-excel
 */
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const excelData = expenses.map((expense) => ({
      Category: expense.category,
      Amount: expense.amount,
      Date: new Date(expense.date).toLocaleDateString(),
    }));

    // Create Excel workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(excelData);

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Expenses');

    // Convert workbook to buffer
    const buffer = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    });

    // Set headers for file download
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=expense_report.xlsx'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Length', buffer.length);

    return res.end(buffer);
  } catch (error) {
    console.error('Error downloading expense:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
