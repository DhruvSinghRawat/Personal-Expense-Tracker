/**
 * CharAvatar.jsx
 * Displays a circular avatar containing the initials
 * of the user's full name.
 */

import React from 'react';

/**
 * CharAvatar component
 *
 * @param {Object} props
 * @param {string} props.fullName - Full name of the user
 * @param {string} props.width - Tailwind width class
 * @param {string} props.height - Tailwind height class
 * @param {string} props.style - Tailwind text size class
 */
const CharAvatar = ({
  fullName,
  width = 'w-20',
  height = 'h-20',
  style = 'text-xl',
}) => {
  /**
   * Extracts initials from the full name.
   *
   * @param {string} name - User's full name
   * @returns {string} Initials in uppercase
   */
  const getInitials = (name) => {
    if (!name) return 'U';

    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={`${width} ${height} bg-slate-400 rounded-full flex items-center justify-center`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p className={`font-bold text-white ${style}`}>
        {getInitials(fullName)}
      </p>
    </div>
  );
};

export default CharAvatar;
