import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';

function RecentTransactions() {
  const { transactions } = useFinance();
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Transactions
        </h3>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div>
                <p className="text-white font-medium">{transaction.description}</p>
                <p className="text-gray-400 text-sm">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </p>
              <p className="text-gray-400 text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;