/**
 * TransactionInfoCard.jsx
 * Displays a single transaction item for
 * either expense or income.
 */

/**
 * TransactionInfoCard component
 *
 * @param {Object} props
 * @param {string} props.title - Expense category or income source
 * @param {number} props.amount - Transaction amount
 * @param {string} props.date - Formatted transaction date
 * @param {string} props.type - Transaction type ("expense" or "income")
 */
const TransactionInfoCard = ({ title, amount, date, type }) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded mb-2">
      {/* Transaction details */}
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>

      {/* Amount with conditional color */}
      <p
        className={
          type === 'expense' ? 'text-red-500' : 'text-green-500'
        }
      >
        ₹{amount}
      </p>
    </div>
  );
};

export default TransactionInfoCard;
