import React from 'react';
import { Target } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';

function BudgetOverview() {
  const { budgets, categories } = useFinance();

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white flex items-center mb-6">
        <Target className="w-5 h-5 mr-2" />
        Budget Overview
      </h3>
      
      <div className="space-y-4">
        {budgets.map((budget) => {
          const category = categories.find(c => c.id === budget.categoryId);
          const percentage = (budget.spent / budget.amount) * 100;
          const isOverBudget = percentage > 100;
          
          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{category?.name || 'Unknown'}</span>
                <span className="text-gray-400 text-sm">
                  ${budget.spent} / ${budget.amount}
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <span className={`absolute right-0 -top-6 text-xs ${
                  isOverBudget ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {percentage.toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetOverview;