import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

/**
 * Custom hook to protect authenticated routes.
 * - Fetches logged-in user data if not already present
 * - Redirects to login if authentication fails
 */
export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already available in context, no need to fetch again
    if (user) return;

    let isMounted = true;

    /**
     * Fetch authenticated user information from backend
     */
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.AUTH.GET_USER_INFO
        );

        // Update context only if component is still mounted
        if (isMounted && response?.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);

        // Clear user state and redirect on auth failure
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};
