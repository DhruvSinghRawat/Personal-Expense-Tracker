/**
 * uploadImage.js
 * Utility function for uploading images to the backend.
 * Used primarily during user sign-up for profile image upload.
 */

import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

/**
 * Uploads an image file to the server
 *
 * @param {File} imageFile - Image file selected by the user
 * @returns {Promise<string>} Uploaded image URL
 */
const uploadImage = async (imageFile) => {
  const formData = new FormData();

  // Append image file to FormData
  formData.append('image', imageFile);

  try {
    // Send multipart/form-data request
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Return uploaded image URL from response
    return response.data.imageUrl;
  } catch (error) {
    // Log and rethrow error for calling component to handle
    console.error('Error uploading image:', error);
    throw error;
  }
};

export default uploadImage;
