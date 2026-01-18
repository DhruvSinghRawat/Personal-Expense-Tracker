/**
 * SignUp.jsx
 * Handles user registration, profile image upload,
 * and account creation flow.
 */

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Layout and UI components
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

// Utilities and API helpers
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

// Global user context
import { UserContext } from '../../context/userContext';

const SignUp = () => {
  // Form state
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error state
  const [error, setError] = useState(null);

  // Access global user context
  const context = useContext(UserContext);
  const updateUser = context?.updateUser || (() => {});

  // Navigation hook
  const navigate = useNavigate();

  /**
   * Handles sign-up form submission.
   * Validates user input, uploads profile image,
   * and registers the user.
   *
   * @param {React.FormEvent} event - Form submit event
   */
  const handleSignUp = async (event) => {
    event.preventDefault();

    // Validate full name
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password length
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    // Clear previous errors
    setError('');

    try {
      let profileImageUrl = '';

      // Upload profile image if user selected one
      if (profilePic) {
        const formData = new FormData();
        formData.append('image', profilePic);

        const imageResponse = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        profileImageUrl = imageResponse.data.imageUrl;
      }

      // Register user with backend
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      // If registration is successful
      if (token) {
        // Store authentication token
        localStorage.setItem('token', token);

        // Update global user state
        updateUser(user);

        // Redirect to dashboard
        navigate('/home');
      }
    } catch (error) {
      // Handle API or validation errors
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">
          Create an Account
        </h3>

        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to sign up.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />
          </div>

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
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{' '}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
