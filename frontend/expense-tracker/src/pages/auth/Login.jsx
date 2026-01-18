/**
 * Login.jsx
 * Handles user authentication by validating input,
 * calling the login API, and storing user session data.
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Layout and UI components
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';

// Utilities and API helpers
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

// Global user context
import { UserContext } from '../../context/userContext';

function Login() {
  // Form state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  // Access global user context
  const context = React.useContext(UserContext);
  const updateUser = context?.updateUser || (() => {});

  // Navigation hook
  const navigate = useNavigate();

  /**
   * Handles login form submission.
   * Validates input fields and sends login request to backend.
   *
   * @param {React.FormEvent} event - Form submit event
   */
  const handleLogin = async (event) => {
    event.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password presence
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    // Clear previous errors
    setError('');

    try {
      // Send login request to backend
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      // If token exists, login is successful
      if (token) {
        // Store authentication token
        localStorage.setItem('token', token);

        // Update global user state
        updateUser(user);

        // Redirect to home/dashboard
        navigate('/home');
      }
    } catch (error) {
      // Handle API or network errors
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-3xl md:text-xl font-semibold text-black">
          Welcome Back
        </h3>

        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to login.
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {/* Display error message if validation or API fails */}
          {error && (
            <p className="text-red-500 text-xs pb-2.5">{error}</p>
          )}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don&apos;t have an account?{' '}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
