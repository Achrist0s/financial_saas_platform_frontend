// Authentication functionality
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check for stored user session
        const storedUser = localStorage.getItem('financeTracker_user');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.updateUserInfo();
        }
    }

    login(email, password) {
        // Mock authentication - replace with actual API call to Django
        const mockUsers = [
            { id: '1', email: 'admin@example.com', name: 'Admin User', role: 'admin' },
            { id: '2', email: 'user@example.com', name: 'Regular User', role: 'user' }
        ];

        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
            this.currentUser = user;
            localStorage.setItem('financeTracker_user', JSON.stringify(user));
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('financeTracker_user');
        window.location.href = 'index.html';
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateUserInfo() {
        const userEmailElements = document.querySelectorAll('#userEmail');
        const userRoleElements = document.querySelectorAll('#userRole');
        
        userEmailElements.forEach(el => {
            if (el && this.currentUser) {
                el.textContent = this.currentUser.email;
            }
        });
        
        userRoleElements.forEach(el => {
            if (el && this.currentUser) {
                el.textContent = this.currentUser.role;
            }
        });
    }

    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
}

// Global auth instance
const auth = new AuthManager();

// Global functions
function logout() {
    auth.logout();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (sidebar && mainContent) {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    }
}

// Check authentication on protected pages
document.addEventListener('DOMContentLoaded', function() {
    // Skip auth check on login page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        return;
    }
    
    auth.requireAuth();
    auth.updateUserInfo();
});