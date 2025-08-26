import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  budget?: number;
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
  month: string;
}

interface FinanceContextType {
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Mock data
const mockTransactions: Transaction[] = [
  { id: '1', amount: 2500, category: 'Salary', description: 'Monthly salary', date: '2024-01-01', type: 'income' },
  { id: '2', amount: -500, category: 'Groceries', description: 'Weekly groceries', date: '2024-01-02', type: 'expense' },
  { id: '3', amount: -200, category: 'Transport', description: 'Gas and parking', date: '2024-01-03', type: 'expense' },
  { id: '4', amount: -150, category: 'Entertainment', description: 'Movie tickets', date: '2024-01-04', type: 'expense' },
];

const mockCategories: Category[] = [
  { id: '1', name: 'Salary', color: '#10B981' },
  { id: '2', name: 'Groceries', color: '#F59E0B' },
  { id: '3', name: 'Transport', color: '#3B82F6' },
  { id: '4', name: 'Entertainment', color: '#8B5CF6' },
];

const mockBudgets: Budget[] = [
  { id: '1', categoryId: '2', amount: 600, spent: 500, month: '2024-01' },
  { id: '2', categoryId: '3', amount: 300, spent: 200, month: '2024-01' },
];

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
    };
    setBudgets(prev => [...prev, newBudget]);
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      categories,
      budgets,
      addTransaction,
      addCategory,
      addBudget,
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}