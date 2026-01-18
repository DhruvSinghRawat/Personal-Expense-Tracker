/**
 * helper.js
 * Collection of reusable utility/helper functions
 * used across the application for validation,
 * formatting, and UI-related logic.
 */

/**
 * Validates email format using regex
 *
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Formats a number into currency format (USD)
 *
 * @param {number} amount - Numeric amount
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Formats a date into readable string
 *
 * @param {string|Date} date - Date value
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Extracts initials from a full name
 *
 * @param {string} fullName - User's full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (fullName) => {
  if (!fullName) return 'U';

  const words = fullName.split(' ');
  let initials = words[0].charAt(0).toUpperCase();

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > 0 && initials.length < 2) {
      initials += words[i].charAt(0).toUpperCase();
    }
  }

  return initials;
};

/**
 * Adds thousand separators to a number
 *
 * @param {number|string} number - Numeric value
 * @returns {string} Formatted number with commas
 */
export const addThousandSeparators = (number) => {
  if (number == null || isNaN(number)) return '';

  const parts = number.toString().split('.');
  const integerPart = parts[0];
  const fractionalPart = parts[1];

  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  );

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

/**
 * Returns emoji icon based on category/source and type
 *
 * @param {string} category - Expense category or income source
 * @param {string} type - 'expense' | 'income'
 * @returns {string} Emoji icon
 */
export const getCategoryIcon = (category, type) => {
  if (type === 'expense') {
    const categoryMap = {
      food: '🍔',
      groceries: '🛒',
      transportation: '🚗',
      shopping: '🛍️',
      entertainment: '🎬',
      health: '🏥',
      education: '📚',
      bills: '📄',
      rent: '🏠',
      utilities: '💡',
      travel: '✈️',
      gym: '💪',
      clothing: '👔',
      insurance: '🛡️',
      phone: '📱',
      internet: '🌐',
      subscriptions: '📺',
      gifts: '🎁',
      other: '💰',
    };

    return categoryMap[category?.toLowerCase()] || '💸';
  }

  // Income source icons
  const sourceMap = {
    salary: '💼',
    freelance: '💻',
    business: '🏢',
    investment: '📈',
    bonus: '🎉',
    gift: '🎁',
    rental: '🏘️',
    dividends: '💹',
    interest: '🏦',
    pension: '👴',
    refund: '↩️',
    cashback: '💳',
    'side hustle': '🚀',
    other: '💰',
  };

  return sourceMap[category?.toLowerCase()] || '💵';
};
