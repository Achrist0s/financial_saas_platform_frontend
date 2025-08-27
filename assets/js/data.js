// Mock data - replace with Django API calls
class DataManager {
    constructor() {
        this.transactions = this.loadTransactions();
        this.categories = this.loadCategories();
        this.budgets = this.loadBudgets();
    }

    loadTransactions() {
        const stored = localStorage.getItem('financeTracker_transactions');
        if (stored) {
            return JSON.parse(stored);
        }
        
        const defaultTransactions = [
            {
                id: '1',
                amount: 2500,
                category: 'Salary',
                description: 'Monthly salary',
                date: '2024-01-01',
                type: 'income'
            },
            {
                id: '2',
                amount: -500,
                category: 'Groceries',
                description: 'Weekly groceries',
                date: '2024-01-02',
                type: 'expense'
            },
            {
                id: '3',
                amount: -200,
                category: 'Transport',
                description: 'Gas and parking',
                date: '2024-01-03',
                type: 'expense'
            },
            {
                id: '4',
                amount: -150,
                category: 'Entertainment',
                description: 'Movie tickets',
                date: '2024-01-04',
                type: 'expense'
            }
        ];
        
        this.saveTransactions(defaultTransactions);
        return defaultTransactions;
    }

    loadCategories() {
        const stored = localStorage.getItem('financeTracker_categories');
        if (stored) {
            return JSON.parse(stored);
        }
        
        const defaultCategories = [
            { id: '1', name: 'Salary', color: '#10B981' },
            { id: '2', name: 'Groceries', color: '#F59E0B' },
            { id: '3', name: 'Transport', color: '#3B82F6' },
            { id: '4', name: 'Entertainment', color: '#8B5CF6' }
        ];
        
        this.saveCategories(defaultCategories);
        return defaultCategories;
    }

    loadBudgets() {
        const stored = localStorage.getItem('financeTracker_budgets');
        if (stored) {
            return JSON.parse(stored);
        }
        
        const defaultBudgets = [
            { id: '1', categoryId: '2', amount: 600, spent: 500, month: '2024-01' },
            { id: '2', categoryId: '3', amount: 300, spent: 200, month: '2024-01' }
        ];
        
        this.saveBudgets(defaultBudgets);
        return defaultBudgets;
    }

    saveTransactions(transactions) {
        localStorage.setItem('financeTracker_transactions', JSON.stringify(transactions));
        this.transactions = transactions;
    }

    saveCategories(categories) {
        localStorage.setItem('financeTracker_categories', JSON.stringify(categories));
        this.categories = categories;
    }

    saveBudgets(budgets) {
        localStorage.setItem('financeTracker_budgets', JSON.stringify(budgets));
        this.budgets = budgets;
    }

    addTransaction(transaction) {
        const newTransaction = {
            ...transaction,
            id: Date.now().toString()
        };
        this.transactions.unshift(newTransaction);
        this.saveTransactions(this.transactions);
        return newTransaction;
    }

    addCategory(category) {
        const newCategory = {
            ...category,
            id: Date.now().toString()
        };
        this.categories.push(newCategory);
        this.saveCategories(this.categories);
        return newCategory;
    }

    addBudget(budget) {
        const newBudget = {
            ...budget,
            id: Date.now().toString()
        };
        this.budgets.push(newBudget);
        this.saveBudgets(this.budgets);
        return newBudget;
    }

    getTransactions() {
        return this.transactions;
    }

    getCategories() {
        return this.categories;
    }

    getBudgets() {
        return this.budgets;
    }

    getCategoryById(id) {
        return this.categories.find(c => c.id === id);
    }

    getTransactionsByCategory(categoryName) {
        return this.transactions.filter(t => t.category === categoryName);
    }

    getIncomeTotal() {
        return this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
    }

    getExpenseTotal() {
        return this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    }

    getBalance() {
        return this.getIncomeTotal() - this.getExpenseTotal();
    }
}

// Global data instance
const dataManager = new DataManager();