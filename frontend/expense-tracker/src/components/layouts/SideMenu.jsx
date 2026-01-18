import React, { useContext } from 'react';
import { SideMenuData } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

/**
 * Sidebar navigation menu for dashboard pages
 * Handles routing and logout logic
 */
const SideMenu = ({ activeMenu, onMenuClick }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Handles menu item click
   * @param {string} route - Target route path
   */
  const handleMenuClick = (route) => {
    if (route === '/logout') {
      handleLogout();
      return;
    }

    navigate(route);

    // Close mobile menu if callback is provided
    if (onMenuClick) {
      onMenuClick();
    }
  };

  /**
   * Clears user session and redirects to login
   */
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200/50 p-5 sticky top-0 z-20">
      {/* User profile section */}
      <div className="flex flex-col items-center justify-center mb-8 pt-16">
        {user?.profileImageUrl && (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-32 h-32 bg-slate-400 rounded-full object-cover"
          />
        )}
        <h5 className="text-gray-950 font-medium leading-6 mt-2">
          {user?.fullName || ''}
        </h5>
      </div>

      {/* Navigation items */}
      <div className="flex flex-col">
        {SideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleMenuClick(item.path)}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-2 transition-colors duration-200
              ${
                activeMenu === item.label
                  ? 'text-white bg-[#875cf5]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {item.icon && <item.icon className="text-xl" />}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
