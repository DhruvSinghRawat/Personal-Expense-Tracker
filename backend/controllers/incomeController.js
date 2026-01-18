/**
 * Income Controller
 * Handles income creation, retrieval, deletion, and Excel export
 */

const xlsx = require('xlsx');
const Income = require('../models/Income');

// =========================
// Add Income
// =========================
/**
 * Adds a new income entry for the logged-in user
 * @route POST /api/v1/income/add
 */
exports.addIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validate required fields
    if (!source || !amount || !date) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    return res.status(201).json({
      message: 'Income added successfully',
      income: newIncome,
    });
  } catch (error) {
    console.error('Error adding income:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// =========================
// Get All Income
// =========================
/**
 * Fetches all income records for the logged-in user
 * @route GET /api/v1/income/get
 */
exports.getAllIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    return res.status(200).json({ incomes });
  } catch (error) {
    console.error('Error fetching incomes:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// =========================
// Delete Income
// =========================
/**
 * Deletes a specific income entry belonging to the logged-in user
 * @route DELETE /api/v1/income/:id
 */
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const income = await Income.findById(id);

    if (!income) {
      return res.status(404).json({
        message: 'Income not found',
      });
    }

    // Ensure income belongs to the current user
    if (income.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: 'Not authorized to delete this income',
      });
    }

    await Income.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Income deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting income:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// =========================
// Download Income as Excel
// =========================
/**
 * Downloads all income records of the user as an Excel file
 * @route GET /api/v1/income/download-excel
 */
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const excelData = incomes.map((income) => ({
      Source: income.source,
      Amount: income.amount,
      Date: new Date(income.date).toLocaleDateString(),
    }));

    // Create Excel workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(excelData);

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Income');

    // Convert workbook to buffer
    const buffer = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    });

    // Set headers for file download
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=income_report.xlsx'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Length', buffer.length);

    return res.end(buffer);
  } catch (error) {
    console.error('Error downloading income:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
