/**
 * axiosInstance.js
 * Centralized Axios configuration for the application.
 * Handles base URL, headers, authentication token,
 * and global request/response behavior.
 */

import axios from 'axios';
import { BASE_URL } from './apiPaths';

/**
 * Create a reusable Axios instance
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout for API requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * REQUEST INTERCEPTOR
 * Attaches JWT token to every outgoing request (if available)
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');

    // Add Authorization header if token exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Reject request error
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * Handles global API errors and responses
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  (error) => {
    if (error.response) {
      /**
       * Unauthorized access (JWT expired / invalid)
       * Redirect user to login page
       */
      if (error.response.status === 401) {
        window.location.href = '/login';
      }
      /**
       * Internal server error
       */
      else if (error.response.status === 500) {
        console.error('Server error:', error.response.data);
      }
    }
    /**
     * Request timeout handling
     */
    else if (error.code === 'ECONNABORTED') {
      console.error(
        'Request timeout. Please try again.',
        error.message
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
