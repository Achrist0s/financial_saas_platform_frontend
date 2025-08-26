import React, { useState } from 'react';
import { Plus, Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';
import TransactionModal from '../components/TransactionModal';

function Transactions() {
  const { transactions, categories } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    return (
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === '' || transaction.category === filterCategory) &&
      (filterType === '' || transaction.type === filterType)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Transactions</h1>
          <p className="text-gray-400 mt-1">Manage all your financial transactions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-400">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-400" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <span className="text-white">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`capitalize ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default Transactions;