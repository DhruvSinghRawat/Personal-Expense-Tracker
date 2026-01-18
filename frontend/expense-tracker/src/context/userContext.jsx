/**
 * userContext.jsx
 * This file defines a global user context to manage
 * authenticated user data across the application.
 */

import React, { createContext, useState } from 'react';

/**
 * UserContext
 * Provides access to user data and user-related actions
 * throughout the component tree.
 */
export const UserContext = createContext();

/**
 * UserProvider component
 * Wraps the application and supplies user state
 * and helper functions via React Context.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components wrapped by the provider
 */
export const UserProvider = ({ children }) => {
  // Stores the currently authenticated user
  const [user, setUser] = useState(null);

  /**
   * Updates the current user information.
   *
   * @param {Object} userData - Logged-in user details
   */
  const updateUser = (userData) => {
    setUser(userData);
  };

  /**
   * Clears the user state.
   * Typically used during logout.
   */
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
