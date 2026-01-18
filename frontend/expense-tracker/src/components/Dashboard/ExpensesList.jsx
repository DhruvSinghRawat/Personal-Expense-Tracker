/**
 * ExpensesList.jsx
 * Displays a list of recent expenses (last 30 days),
 * along with total expense calculation and optional
 * actions like "See All" and "Download".
 */

import React from 'react';
import { LuArrowRight, LuDownload } from 'react-icons/lu';
import moment from 'moment';
import {
  getCategoryIcon,
  addThousandSeparators,
} from '../../utils/helper';

/**
 * ExpensesList component
 *
 * @param {Object} props
 * @param {Array} props.expenses - List of expense transactions
 * @param {Function} props.onSeeMore - Callback for "See All" action
 * @param {Function} props.onDownload - Callback for downloading expense report
 * @param {boolean} props.hideSeeAll - Whether to hide "See All" button
 */
const ExpensesList = ({
  expenses,
  onSeeMore,
  onDownload,
  hideSeeAll = false,
}) => {
  // Ensure expenses is always an array
  const expensesArray = Array.isArray(expenses) ? expenses : [];

  /**
   * Store current date once (memoized)
   */
  const now = React.useMemo(() => moment(), []);

  /**
   * Filter expenses to last 30 days and sort by newest first
   */
  const recentExpenses = React.useMemo(() => {
    const cutoff = now.clone().subtract(30, 'days');

    return expensesArray
      .filter((expense) => {
        const date = moment(expense.date);
        return date.isValid() && date.isSameOrAfter(cutoff);
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expensesArray, now]);

  /**
   * Calculate total expense amount for recent expenses
   */
  const totalExpenses =
    recentExpenses.length > 0
      ? recentExpenses.reduce(
          (sum, expense) => sum + (expense.amount || 0),
          0
        )
      : 0;

  // Determine if "See All" button should be shown
  const showSeeAll = !hideSeeAll && typeof onSeeMore === 'function';

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-lg font-semibold">Expenses</h5>

        {(showSeeAll || onDownload) && (
          <div className="flex items-center gap-2">
            {showSeeAll && (
              <button className="card-btn text-sm" onClick={onSeeMore}>
                See All <LuArrowRight className="text-sm" />
              </button>
            )}

            {onDownload && (
              <button
                className="card-btn text-sm text-purple-700 border-purple-100 bg-purple-50 hover:bg-purple-100"
                onClick={onDownload}
              >
                <LuDownload className="text-sm" /> Download
              </button>
            )}
          </div>
        )}
      </div>

      {/* Expense items */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {recentExpenses.length > 0 ? (
          recentExpenses.slice(0, 4).map((expense) => (
            <div
              key={expense._id || expense.id}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition"
            >
              {/* Category Icon */}
              <div className="w-10 h-10 flex items-center justify-center text-xl bg-gray-100 rounded-full flex-shrink-0">
                <span>
                  {getCategoryIcon(expense.category, 'expense')}
                </span>
              </div>

              {/* Category & Date */}
              <div className="flex-1 min-w-0">
                <h6 className="text-sm font-medium text-gray-800">
                  {expense.category}
                </h6>
                <p className="text-xs text-gray-500">
                  {moment(expense.date).format('DD MMM YYYY')}
                </p>
              </div>

              {/* Amount */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-red-600">
                  -₹{addThousandSeparators(expense.amount)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No expenses found
          </p>
        )}
      </div>

      {/* Total expenses summary */}
      {recentExpenses.length > 0 && (
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Total Expenses Spent
            </span>
            <span className="text-lg font-bold text-red-600">
              ₹{addThousandSeparators(totalExpenses)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesList;
