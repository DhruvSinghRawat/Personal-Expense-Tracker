/**
 * Home.jsx
 * Dashboard landing page that displays an overview of
 * balances, recent transactions, expenses, and income data.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

// Layout
import DashboardLayout from '../../components/layouts/DashboardLayout';

// Authentication hook
import { useUserAuth } from '../../hooks/useUserAuth';

// API utilities
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';

// Dashboard components
import InfoCard from '../../components/Cards/InfoCard';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpensesList from '../../components/Dashboard/ExpensesList';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import IncomeLast60Days from '../../components/Dashboard/IncomeLast60Days';
import IncomeList from '../../components/Dashboard/IncomeList';

// Icons
import { IoMdCard } from 'react-icons/io';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';

// Helper functions
import { addThousandSeparators } from '../../utils/helper';

function Home() {
  // Ensures user is authenticated before accessing dashboard
  useUserAuth();

  // Navigation hook for routing
  const navigate = useNavigate();

  // Dashboard data state
  const [dashboardData, setDashboardData] = React.useState(null);

  // Loading state for API call
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    /**
     * Fetches dashboard summary data from backend.
     * Includes balances, recent transactions,
     * and expense/income analytics.
     */
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(
          API_PATHS.DASHBOARD.GET_DATA
        );

        if (response?.data) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparators(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparators(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandSeparators(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        {/* Recent transactions and finance overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.lastTransactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
        </div>

        {/* Expense analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ExpensesList
            expenses={dashboardData?.last30DaysExpense?.transactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <Last30DaysExpenses
            expenses={dashboardData?.last30DaysExpense?.transactions || []}
          />
        </div>

        {/* Income analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <IncomeList
            income={dashboardData?.last60DaysIncome}
            onSeeMore={() => navigate('/income')}
          />

          <IncomeLast60Days
            income={dashboardData?.last60DaysIncome}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
