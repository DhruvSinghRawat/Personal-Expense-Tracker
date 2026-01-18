/**
 * App.jsx
 * This file defines the main application routes and
 * handles authentication-based redirection.
 */

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Authentication pages
import Login from './pages/auth/Login.jsx';
import SignUp from './pages/auth/SignUp.jsx';

// Dashboard pages
import Home from './pages/Dashboard/Home.jsx';
import Expense from './pages/Dashboard/Expense.jsx';
import Income from './pages/Dashboard/Income.jsx';

// Global user context provider
import UserProvider from './context/userContext.jsx';

/**
 * Root component
 * Decides whether to redirect the user to login or home
 * based on authentication status.
 */
const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication token from localStorage
    const token = localStorage.getItem('token');

    // Convert token existence into boolean value
    setIsAuthenticated(!!token);

    // Stop loading once authentication check is complete
    setIsLoading(false);
  }, []);

  // Display loader while authentication status is being verified
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect user based on authentication status
  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

/**
 * App component
 * Defines all application routes and wraps the app
 * with global providers.
 */
const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/income" element={<Income />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
