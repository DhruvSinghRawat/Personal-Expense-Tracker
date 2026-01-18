/**
 * InfoCard.jsx
 * Reusable dashboard card used to display
 * summary information like balance, income, or expense.
 */

import React from 'react';

/**
 * InfoCard component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon component displayed in the card
 * @param {string} props.label - Label describing the metric
 * @param {string|number} props.value - Numeric value to display
 * @param {string} props.color - Tailwind background color class for icon
 */
const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-md">
      {/* Icon container */}
      <div
        className={`w-12 h-12 flex items-center justify-center text-white text-xl rounded-lg ${color}`}
      >
        {icon}
      </div>

      {/* Text content */}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-900">
          ₹{value}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
