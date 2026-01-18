/**
 * Database connection configuration
 * Responsible for establishing a connection with MongoDB
 */

const mongoose = require("mongoose");

/**
 * Connects the application to MongoDB using Mongoose
 * Uses connection string from environment variables
 */
const connectDatabase = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Log success message when connection is established
    console.log("MongoDB connected successfully");
  } catch (error) {
    // Log detailed error if connection fails
    console.error("Error connecting to MongoDB:", error);

    // Exit the process to prevent running the app without DB
    process.exit(1);
  }
};

module.exports = connectDatabase;
