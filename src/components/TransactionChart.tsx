import React from 'react';
import { BarChart3 } from 'lucide-react';

function TransactionChart() {
  // Mock chart data - in real app, this would use a charting library like Chart.js or recharts
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const incomeData = [2500, 2800, 2600, 3000, 2900, 3200];
  const expenseData = [1800, 2100, 1900, 2200, 2000, 2300];

  const maxValue = Math.max(...incomeData, ...expenseData);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Financial Overview
          </h3>
          <p className="text-gray-400 text-sm">Monthly income vs expenses</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Income</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {months.map((month, index) => (
          <div key={month} className="flex-1 flex flex-col items-center space-y-1">
            <div className="w-full flex space-x-1 h-48 items-end">
              <div 
                className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                style={{ height: `${(incomeData[index] / maxValue) * 100}%` }}
              ></div>
              <div 
                className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t"
                style={{ height: `${(expenseData[index] / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionChart;