/**
 * apiPaths.js
 * Centralized API endpoint definitions for the application.
 * This file helps avoid hardcoded URLs scattered across components.
 */

/**
 * Base URL for backend API
 * Uses Vite environment variable if available,
 * otherwise falls back to local development server.
 */
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * API_PATHS
 * Groups all API endpoints by feature/module
 * (Auth, Dashboard, Income, Expense, Image)
 */
export const API_PATHS = {
  /**
   * Authentication-related endpoints
   */
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    GET_USER_INFO: '/api/v1/auth/getUser',
  },

  /**
   * Dashboard data endpoints
   */
  DASHBOARD: {
    GET_DATA: '/api/v1/dashboard',
  },

  /**
   * Income-related endpoints
   */
  INCOME: {
    ADD_INCOME: '/api/v1/income/add',
    GET_ALL_INCOME: '/api/v1/income/get',

    /**
     * Dynamic endpoint to delete a specific income entry
     * @param {string} incomeid - Income ID
     */
    DELETE_INCOME: (incomeid) => `/api/v1/income/${incomeid}`,

    DOWNLOAD_INCOME: '/api/v1/income/download-excel',
  },

  /**
   * Expense-related endpoints
   */
  EXPENSE: {
    ADD_EXPENSE: '/api/v1/expense/add',
    GET_ALL_EXPENSE: '/api/v1/expense/get',

    /**
     * Dynamic endpoint to delete a specific expense entry
     * @param {string} expenseid - Expense ID
     */
    DELETE_EXPENSE: (expenseid) => `/api/v1/expense/${expenseid}`,

    DOWNLOAD_EXPENSE: '/api/v1/expense/download-excel',
  },

  /**
   * Image upload endpoints
   */
  IMAGE: {
    UPLOAD_IMAGE: '/api/v1/auth/upload-image',
  },
};
