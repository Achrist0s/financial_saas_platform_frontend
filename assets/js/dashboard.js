// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    renderFinancialChart();
    renderBudgetOverview();
    renderRecentTransactions();
    updateStats();
});

function updateStats() {
    const income = dataManager.getIncomeTotal();
    const expenses = dataManager.getExpenseTotal();
    const balance = dataManager.getBalance();
    const totalBudget = dataManager.getBudgets().reduce((sum, b) => sum + b.amount, 0);

    // Update stats cards
    const statsCards = document.querySelectorAll('.stats-card');
    if (statsCards.length >= 4) {
        statsCards[0].querySelector('.stats-value').textContent = `$${balance.toFixed(2)}`;
        statsCards[1].querySelector('.stats-value').textContent = `$${income.toFixed(2)}`;
        statsCards[2].querySelector('.stats-value').textContent = `$${expenses.toFixed(2)}`;
        statsCards[3].querySelector('.stats-value').textContent = `$${totalBudget.toFixed(2)}`;
    }
}

function renderFinancialChart() {
    const chartContainer = document.getElementById('financialChart');
    if (!chartContainer) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const incomeData = [2500, 2800, 2600, 3000, 2900, 3200];
    const expenseData = [1800, 2100, 1900, 2200, 2000, 2300];
    const maxValue = Math.max(...incomeData, ...expenseData);

    chartContainer.innerHTML = '';

    months.forEach((month, index) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'chart-bar';

        const incomeHeight = (incomeData[index] / maxValue) * 100;
        const expenseHeight = (expenseData[index] / maxValue) * 100;

        barContainer.innerHTML = `
            <div class="chart-bar-income" style="height: ${incomeHeight}%"></div>
            <div class="chart-bar-expense" style="height: ${expenseHeight}%"></div>
        `;

        const labelContainer = document.createElement('div');
        labelContainer.className = 'chart-label';
        labelContainer.textContent = month;

        const monthContainer = document.createElement('div');
        monthContainer.style.flex = '1';
        monthContainer.style.display = 'flex';
        monthContainer.style.flexDirection = 'column';
        monthContainer.style.alignItems = 'center';
        monthContainer.appendChild(barContainer);
        monthContainer.appendChild(labelContainer);

        chartContainer.appendChild(monthContainer);
    });
}

function renderBudgetOverview() {
    const budgetContainer = document.getElementById('budgetOverview');
    if (!budgetContainer) return;

    const budgets = dataManager.getBudgets();
    const categories = dataManager.getCategories();

    budgetContainer.innerHTML = '';

    budgets.forEach(budget => {
        const category = categories.find(c => c.id === budget.categoryId);
        const percentage = (budget.spent / budget.amount) * 100;
        const isOverBudget = percentage > 100;

        const budgetItem = document.createElement('div');
        budgetItem.className = 'budget-item';
        budgetItem.innerHTML = `
            <div class="budget-header">
                <span class="budget-name">${category?.name || 'Unknown'}</span>
                <span class="budget-amount">$${budget.spent} / $${budget.amount}</span>
            </div>
            <div class="budget-progress">
                <div class="budget-progress-bar">
                    <div class="budget-progress-fill ${isOverBudget ? 'over' : 'normal'}" 
                         style="width: ${Math.min(percentage, 100)}%"></div>
                </div>
                <span class="budget-percentage">${percentage.toFixed(0)}%</span>
            </div>
        `;

        budgetContainer.appendChild(budgetItem);
    });
}

function renderRecentTransactions() {
    const transactionsContainer = document.getElementById('recentTransactions');
    if (!transactionsContainer) return;

    const transactions = dataManager.getTransactions().slice(0, 5);

    transactionsContainer.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        const isIncome = transaction.type === 'income';
        const iconSvg = isIncome 
            ? '<path d="m7 7 10 10M7 17l10-10"/>'
            : '<path d="m17 7-10 10M7 7l10 10"/>';

        transactionItem.innerHTML = `
            <div class="transaction-left">
                <div class="transaction-icon ${transaction.type}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${iconSvg}
                    </svg>
                </div>
                <div class="transaction-details">
                    <h4>${transaction.description}</h4>
                    <p>${transaction.category}</p>
                </div>
            </div>
            <div class="transaction-right">
                <p class="transaction-amount ${transaction.type}">
                    ${isIncome ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p class="transaction-date">${new Date(transaction.date).toLocaleDateString()}</p>
            </div>
        `;

        transactionsContainer.appendChild(transactionItem);
    });
}