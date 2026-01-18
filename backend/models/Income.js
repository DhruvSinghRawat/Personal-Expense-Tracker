/**
 * Income Schema
 * Defines the structure for storing user income records
 */

const mongoose = require('mongoose');

/**
 * Schema for user income entries
 */
const incomeSchema = new mongoose.Schema(
  {
    /**
     * Reference to the user who owns this income entry
     */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    /**
     * Optional icon for UI representation (emoji or string)
     */
    icon: {
      type: String,
    },

    /**
     * Income source (e.g., Salary, Freelance, Business)
     */
    source: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Income amount
     */
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    /**
     * Date when income was received
     */
    date: {
      type: Date,
      required: true,
    },
  },
  {
    /**
     * Automatically manages createdAt and updatedAt timestamps
     */
    timestamps: true,
  }
);

module.exports = mongoose.model('Income', incomeSchema);
