/**
 * RecentTransactions.jsx
 * Displays a short list of the most recent income
 * and expense transactions.
 */

import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

/**
 * RecentTransactions component
 *
 * @param {Object} props
 * @param {Array} props.transactions - List of recent transactions
 * @param {Function} props.onSeeMore - Callback to navigate to full list
 */
const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex justify-between items-center pt-6 px-6">
        <h5 className="text-lg font-semibold">
          Recent Transactions
        </h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Transaction list */}
      <div className="mt-6 pl-6 pr-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id || item.id}
            title={
              item.type === 'expense'
                ? item.category
                : item.source
            }
            amount={item.amount}
            date={moment(item.date).format('DD MMM, YYYY')}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
