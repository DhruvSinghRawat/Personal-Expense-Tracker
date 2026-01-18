/**
 * Multer configuration for image uploads
 * Handles storage, filename, and file validation
 */

const multer = require('multer');

// =========================
// Storage Configuration
// =========================
const storage = multer.diskStorage({
  /**
   * Defines upload destination folder
   */
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },

  /**
   * Generates unique filename using timestamp
   */
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

// =========================
// File Filter Configuration
// =========================
/**
 * Allows only image file types
 */
const fileFilter = (req, file, callback) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'),
      false
    );
  }
};

// =========================
// Multer Instance
// =========================
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
