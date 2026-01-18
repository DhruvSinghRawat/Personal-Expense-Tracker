/**
 * User Schema
 * Defines how user data is stored and secured in the database
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schema for application users
 */
const userSchema = new mongoose.Schema(
  {
    /**
     * Full name of the user
     */
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * User email (unique identifier)
     */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /**
     * Hashed password
     */
    password: {
      type: String,
      required: true,
    },

    /**
     * Optional profile image URL
     */
    profileImageUrl: {
      type: String,
      default: null,
    },
  },
  {
    /**
     * Automatically adds createdAt and updatedAt fields
     */
    timestamps: true,
  }
);

// =========================
// Pre-save Middleware
// =========================
/**
 * Hash password before saving the user
 * Runs only if the password field is modified
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// =========================
// Instance Methods
// =========================
/**
 * Compares entered password with hashed password
 * @param {string} candidatePassword - Password entered by user
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
