import React from 'react';
import { Target, Plus, AlertCircle } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';

function Budgets() {
  const { budgets, categories } = useFinance();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Budgets</h1>
          <p className="text-gray-400 mt-1">Set and track your spending limits.</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
          <Plus className="w-4 h-4" />
          <span>Create Budget</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const category = categories.find(c => c.id === budget.categoryId);
          const percentage = (budget.spent / budget.amount) * 100;
          const isOverBudget = percentage > 100;
          const remaining = budget.amount - budget.spent;

          return (
            <div key={budget.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category?.color + '20' }}
                  >
                    <Target className="w-5 h-5" style={{ color: category?.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{category?.name}</h3>
                    <p className="text-gray-400 text-sm">{budget.month}</p>
                  </div>
                </div>
                {isOverBudget && (
                  <div className="flex items-center space-x-1 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Over budget</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Budget</span>
                  <span className="text-white font-semibold">${budget.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Spent</span>
                  <span className={`font-semibold ${isOverBudget ? 'text-red-400' : 'text-white'}`}>
                    ${budget.spent.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Remaining</span>
                  <span className={`font-semibold ${remaining < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    ${remaining.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className={`text-sm font-medium ${isOverBudget ? 'text-red-400' : 'text-gray-400'}`}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Budget Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">Set Realistic Goals</h4>
            <p className="text-gray-400 text-sm">Base your budgets on historical spending data to set achievable targets.</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">Review Monthly</h4>
            <p className="text-gray-400 text-sm">Regularly review and adjust your budgets based on changing needs.</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">Emergency Buffer</h4>
            <p className="text-gray-400 text-sm">Always include a small buffer for unexpected expenses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budgets;