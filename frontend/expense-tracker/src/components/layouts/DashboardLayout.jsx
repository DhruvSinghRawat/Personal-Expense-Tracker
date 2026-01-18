import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

/**
 * Layout wrapper for all authenticated dashboard pages
 */
const DashboardLayout = ({ activeMenu, children }) => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Fetch user info if not already available in context
     */
    const fetchUserData = async () => {
      if (!user) {
        try {
          const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
          updateUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchUserData();
    // Intentionally runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        {/* Sidebar hidden on smaller screens */}
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>

        {/* Main content */}
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
