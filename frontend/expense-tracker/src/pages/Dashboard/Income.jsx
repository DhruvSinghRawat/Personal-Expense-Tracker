/**
 * Income.jsx
 * Manages income listing, creation, summary overview,
 * and income report download functionality.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

// Layout
import DashboardLayout from '../../components/layouts/DashboardLayout';

// Dashboard components
import IncomeOverview from '../../components/Dashboard/IncomeOverview';
import IncomeList from '../../components/Dashboard/IncomeList';

// Reusable input component
import Input from '../../components/Inputs/Input';

// Authentication hook
import { useUserAuth } from '../../hooks/useUserAuth';

// API utilities
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

function Income() {
  // Ensure user is authenticated
  useUserAuth();

  // Navigation hook
  const navigate = useNavigate();

  // Income list state
  const [incomes, setIncomes] = React.useState([]);

  // Loading states
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // Modal visibility state
  const [showAddModal, setShowAddModal] = React.useState(false);

  // Add income form state
  const [formData, setFormData] = React.useState({
    source: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    icon: '',
  });

  // Error state
  const [error, setError] = React.useState('');

  // Available icons for income sources
  const ICON_CHOICES = ['💼', '💻', '🏢', '📈', '🎉', '💳', '🏠', '🚀'];

  /**
   * Fetches all income records from backend.
   */
  const fetchIncome = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.GET_ALL_INCOME
      );
      setIncomes(response?.data?.incomes || []);
    } catch (error) {
      console.error('Failed to fetch income list:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch income data on component mount
  React.useEffect(() => {
    fetchIncome();
  }, [fetchIncome]);

  /**
   * Resets add-income form fields.
   */
  const resetForm = () => {
    setFormData({
      source: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      icon: '',
    });
    setError('');
  };

  /**
   * Handles adding a new income entry.
   *
   * @param {React.FormEvent} event - Form submit event
   */
  const handleAddIncome = async (event) => {
    event.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.source || !formData.amount || !formData.date) {
      setError('Please fill source, amount, and date.');
      return;
    }

    setSaving(true);
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source: formData.source,
        amount: Number(formData.amount),
        date: formData.date,
        icon: formData.icon || undefined,
      });

      // Refresh income list after adding
      await fetchIncome();

      // Close modal and reset form
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Failed to add income:', error);
      setError('Could not add income. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  /**
   * Downloads income report as an Excel file.
   */
  const handleDownloadIncome = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: 'blob' }
      );

      // Create downloadable file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download income report:', error);
      setError('Could not download income report.');
    }
  };

  /**
   * Memoized recent income summary.
   */
  const recentIncomeSummary = React.useMemo(
    () => ({
      transactions: incomes,
      total: incomes.reduce(
        (sum, item) => sum + (item.amount || 0),
        0
      ),
    }),
    [incomes]
  );

  return (
    <DashboardLayout activeMenu="Income">
      <div className="w-full py-8">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Income</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor how your earnings evolve and explore recent income sources.
          </p>
        </div>

        {/* Income overview and list */}
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            incomes={incomes}
            loading={loading}
            onAddIncome={() => setShowAddModal(true)}
          />

          <IncomeList
            income={recentIncomeSummary}
            onSeeMore={() => navigate('/income')}
            onDownload={handleDownloadIncome}
            hideSeeAll
          />
        </div>

        {/* Add income modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200 p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                aria-label="Close add income"
              >
                ×
              </button>

              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Add Income
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Log a new earning to keep your overview up to date.
              </p>

              <form onSubmit={handleAddIncome} className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    Pick Icon
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {ICON_CHOICES.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        className={`h-12 rounded-xl border flex items-center justify-center text-xl transition ${
                          formData.icon === icon
                            ? 'border-purple-500 bg-purple-50 shadow-sm'
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, icon }))
                        }
                        aria-label={`Select icon ${icon}`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="Source"
                  placeholder="e.g., Salary, Freelance"
                  type="text"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      source: e.target.value,
                    }))
                  }
                />

                <Input
                  label="Amount"
                  placeholder="e.g., 1200"
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                />

                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 px-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-500 rounded-lg shadow-lg shadow-purple-500/30 transition hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Add Income'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Income;
