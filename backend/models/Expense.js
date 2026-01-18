/**
 * Expense Schema
 * Defines the structure for storing user expenses
 */

const mongoose = require('mongoose');

/**
 * Expense schema for tracking user expenses
 */
const expenseSchema = new mongoose.Schema(
  {
    /**
     * Reference to the user who owns this expense
     */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    /**
     * Optional icon for UI display (emoji or string)
     */
    icon: {
      type: String,
    },

    /**
     * Expense category (e.g., Food, Transport)
     */
    category: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Expense amount
     */
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    /**
     * Date when the expense occurred
     */
    date: {
      type: Date,
      required: true,
    },
  },
  {
    /**
     * Automatically adds createdAt and updatedAt fields
     */
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
