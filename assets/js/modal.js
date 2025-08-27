// Modal functionality
let currentTransactionType = 'expense';

function openTransactionModal(type = 'expense') {
    const modal = document.getElementById('transactionModal');
    const form = document.getElementById('transactionForm');
    
    if (modal && form) {
        currentTransactionType = type;
        
        // Reset form
        form.reset();
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
        
        // Update type buttons
        updateTypeButtons(type);
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeTransactionModal() {
    const modal = document.getElementById('transactionModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function updateTypeButtons(activeType) {
    const typeButtons = document.querySelectorAll('.type-btn');
    typeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === activeType) {
            btn.classList.add('active');
        }
    });
    currentTransactionType = activeType;
}

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Type button handlers
    const typeButtons = document.querySelectorAll('.type-btn');
    typeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            updateTypeButtons(this.dataset.type);
        });
    });

    // Transaction form handler
    const transactionForm = document.getElementById('transactionForm');
    if (transactionForm) {
        transactionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const amount = parseFloat(formData.get('amount'));
            const adjustedAmount = currentTransactionType === 'income' ? amount : -amount;
            
            const transaction = {
                amount: adjustedAmount,
                category: formData.get('category'),
                description: formData.get('description'),
                date: formData.get('date'),
                type: currentTransactionType
            };
            
            // Add transaction to data manager
            dataManager.addTransaction(transaction);
            
            // Refresh current page data
            if (typeof renderRecentTransactions === 'function') {
                renderRecentTransactions();
            }
            if (typeof renderTransactionsTable === 'function') {
                renderTransactionsTable();
            }
            if (typeof updateStats === 'function') {
                updateStats();
            }
            
            closeTransactionModal();
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('transactionModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTransactionModal();
            }
        });
    }
});