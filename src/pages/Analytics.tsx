import React from 'react';
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';

function Analytics() {
  const expenseCategories = [
    { name: 'Groceries', amount: 500, percentage: 35, color: '#F59E0B' },
    { name: 'Transport', amount: 200, percentage: 14, color: '#3B82F6' },
    { name: 'Entertainment', amount: 150, percentage: 10, color: '#8B5CF6' },
    { name: 'Utilities', amount: 300, percentage: 21, color: '#10B981' },
    { name: 'Others', amount: 280, percentage: 20, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Detailed insights into your financial patterns.</p>
        </div>
        <div className="flex space-x-2">
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white flex items-center mb-6">
            <PieChart className="w-5 h-5 mr-2" />
            Expense Breakdown
          </h3>
          <div className="space-y-4">
            {expenseCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-gray-300">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium">${category.amount}</span>
                  <span className="text-gray-400 text-sm w-12 text-right">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white flex items-center mb-6">
            <TrendingUp className="w-5 h-5 mr-2" />
            Monthly Trends
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
              <span className="text-gray-300">Average Monthly Income</span>
              <span className="text-green-400 font-semibold">$2,850</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
              <span className="text-gray-300">Average Monthly Expenses</span>
              <span className="text-red-400 font-semibold">$2,100</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
              <span className="text-gray-300">Average Monthly Savings</span>
              <span className="text-blue-400 font-semibold">$750</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
              <span className="text-gray-300">Savings Rate</span>
              <span className="text-purple-400 font-semibold">26.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spending Patterns */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white flex items-center mb-6">
          <Calendar className="w-5 h-5 mr-2" />
          Weekly Spending Pattern
        </h3>
        <div className="grid grid-cols-7 gap-2 h-32">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const height = [60, 80, 45, 70, 90, 95, 40][index];
            return (
              <div key={day} className="flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t flex-shrink-0 mb-2"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-400">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h4 className="font-semibold text-white mb-4">Emergency Fund</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Progress</span>
              <span className="text-gray-400 text-sm">$3,500 / $10,000</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <div className="text-right">
              <span className="text-sm text-green-400">35% complete</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h4 className="font-semibold text-white mb-4">Vacation Fund</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Progress</span>
              <span className="text-gray-400 text-sm">$1,800 / $3,000</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="text-right">
              <span className="text-sm text-blue-400">60% complete</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h4 className="font-semibold text-white mb-4">Investment Goal</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Progress</span>
              <span className="text-gray-400 text-sm">$2,200 / $5,000</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: '44%' }}></div>
            </div>
            <div className="text-right">
              <span className="text-sm text-purple-400">44% complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;