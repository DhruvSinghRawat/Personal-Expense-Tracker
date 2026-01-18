/**
 * Dashboard Controller
 * Provides aggregated financial data for the dashboard view
 */

const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { Types } = require('mongoose');

/**
 * Fetch dashboard summary data for the logged-in user
 * @route GET /api/v1/dashboard
 */
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(userId);

    // =========================
    // Total Income
    // =========================
    const totalIncomeResult = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // =========================
    // Total Expense
    // =========================
    const totalExpenseResult = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // =========================
    // Income of Last 60 Days
    // =========================
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const last60DaysIncomeTotal = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // =========================
    // Expenses of Last 30 Days
    // =========================
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const last30DaysExpenseTransactions = (
      await Expense.find({
        userId,
        date: { $gte: thirtyDaysAgo, $lte: today },
      }).sort({ date: -1 })
    ).map((transaction) => ({
      ...transaction.toObject(),
      type: 'expense',
    }));

    const last30DaysExpenseTotal = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // =========================
    // Last 5 Transactions (Income + Expense)
    // =========================
    const recentIncomeTransactions = (
      await Income.find({ userId }).sort({ date: -1 }).limit(5)
    ).map((transaction) => ({
      ...transaction.toObject(),
      type: 'income',
    }));

    const recentExpenseTransactions = (
      await Expense.find({ userId }).sort({ date: -1 }).limit(5)
    ).map((transaction) => ({
      ...transaction.toObject(),
      type: 'expense',
    }));

    const recentTransactions = [...recentIncomeTransactions, ...recentExpenseTransactions]
      .sort((a, b) => b.date - a.date);

    // =========================
    // All Expenses (For Expense List)
    // =========================
    const allExpenses = (
      await Expense.find({ userId }).sort({ date: -1 })
    ).map((transaction) => ({
      ...transaction.toObject(),
      type: 'expense',
    }));

    // =========================
    // Final Dashboard Response
    // =========================
    res.json({
      totalBalance:
        (totalIncomeResult[0]?.total || 0) -
        (totalExpenseResult[0]?.total || 0),

      totalIncome: totalIncomeResult[0]?.total || 0,
      totalExpense: totalExpenseResult[0]?.total || 0,

      last30DaysExpense: {
        total: last30DaysExpenseTotal,
        transactions: last30DaysExpenseTransactions,
      },

      last60DaysIncome: {
        total: last60DaysIncomeTotal,
        transactions: last60DaysIncomeTransactions,
      },

      lastTransactions: recentTransactions,
      allExpenses,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
