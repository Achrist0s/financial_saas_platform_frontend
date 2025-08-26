import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, Plus } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';
import StatsCard from '../components/StatsCard';
import TransactionChart from '../components/TransactionChart';
import RecentTransactions from '../components/RecentTransactions';
import BudgetOverview from '../components/BudgetOverview';

function Dashboard() {
  const { transactions, budgets } = useFinance();

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expenses;
  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's your financial overview.</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Balance"
          value={`$${balance.toFixed(2)}`}
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          color="blue"
        />
        <StatsCard
          title="Income"
          value={`$${income.toFixed(2)}`}
          change="+8.2%"
          trend="up"
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Expenses"
          value={`$${expenses.toFixed(2)}`}
          change="-3.1%"
          trend="down"
          icon={TrendingDown}
          color="red"
        />
        <StatsCard
          title="Budget"
          value={`$${totalBudget.toFixed(2)}`}
          change="+5.4%"
          trend="up"
          icon={Target}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionChart />
        </div>
        <div className="space-y-6">
          <BudgetOverview />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-white">Add Income</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-white">Add Expense</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-white">Set Budget</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;