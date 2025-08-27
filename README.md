# FinanceTracker - Django Frontend Templates

This is the frontend part of the FinanceTracker SaaS platform, designed to be integrated with a Django backend.

## Features

- **Modern Dark Theme Design**: Beautiful gradient-based UI with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Complete Page Templates**: Login, Dashboard, Transactions, Categories, Budgets, Analytics, and Settings
- **Django Template Integration**: Ready-to-use Django templates with proper template tags
- **Interactive Components**: Modals, forms, charts, and filtering functionality
- **Accessibility**: Proper semantic HTML and keyboard navigation support

## File Structure

```
├── templates/
│   ├── base.html                    # Base template with common layout
│   ├── auth/
│   │   ├── login.html              # Login page
│   │   └── register.html           # Registration page
│   ├── dashboard/
│   │   └── dashboard.html          # Main dashboard
│   ├── transactions/
│   │   └── transactions.html       # Transactions management
│   ├── categories/
│   │   └── categories.html         # Categories management
│   ├── budgets/
│   │   └── budgets.html           # Budget tracking
│   ├── analytics/
│   │   └── analytics.html         # Financial analytics
│   ├── settings/
│   │   └── settings.html          # User settings
│   └── partials/
│       ├── sidebar.html           # Navigation sidebar
│       ├── transaction_modal.html  # Transaction form modal
│       ├── category_modal.html    # Category form modal
│       └── budget_modal.html      # Budget form modal
├── static/
│   ├── css/
│   │   ├── styles.css             # Base styles and components
│   │   ├── auth.css               # Authentication pages styles
│   │   ├── dashboard.css          # Dashboard specific styles
│   │   ├── transactions.css       # Transactions page styles
│   │   ├── categories.css         # Categories page styles
│   │   ├── budgets.css           # Budgets page styles
│   │   ├── analytics.css         # Analytics page styles
│   │   └── settings.css          # Settings page styles
│   └── js/
│       ├── main.js               # Core JavaScript functionality
│       └── auth.js               # Authentication related JS
└── README.md
```

## Integration with Django

### 1. Copy Templates and Static Files

Copy the `templates/` and `static/` directories to your Django project:

```bash
cp -r templates/ /path/to/your/django/project/
cp -r static/ /path/to/your/django/project/
```

### 2. Configure Django Settings

Make sure your Django settings include:

```python
# settings.py
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
```

### 3. URL Configuration

Create URL patterns for your views:

```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('transactions/', views.transactions, name='transactions'),
    path('categories/', views.categories, name='categories'),
    path('budgets/', views.budgets, name='budgets'),
    path('analytics/', views.analytics, name='analytics'),
    path('settings/', views.settings, name='settings'),
    # API endpoints for AJAX operations
    path('api/transactions/add/', views.add_transaction, name='add_transaction'),
    path('api/categories/add/', views.add_category, name='add_category'),
    path('api/budgets/add/', views.add_budget, name='add_budget'),
]
```

### 4. Context Variables

The templates expect these context variables:

#### Dashboard
- `balance`: Current account balance
- `total_income`: Total income amount
- `total_expenses`: Total expenses amount
- `total_budget`: Total budget amount
- `budgets`: List of budget objects with percentage calculations
- `recent_transactions`: Recent transactions list
- `categories`: List of categories for forms

#### Transactions
- `transactions`: List of transaction objects
- `categories`: List of categories for filtering

#### Categories
- `categories`: List of category objects with transaction counts and totals

#### Budgets
- `budgets`: List of budget objects with progress calculations

#### Analytics
- `expense_breakdown`: Category-wise expense breakdown
- `avg_monthly_income`: Average monthly income
- `avg_monthly_expenses`: Average monthly expenses
- `avg_monthly_savings`: Average monthly savings
- `savings_rate`: Savings rate percentage
- `weekly_spending`: Weekly spending pattern data
- `financial_goals`: List of financial goals with progress

#### Settings
- `user`: Current user object
- `subscription`: Subscription details
- `usage`: Usage statistics
- `limits`: Plan limits
- `payment_method`: Payment method details
- `notifications`: Notification preferences
- `preferences`: User preferences

### 5. Model Structure

Create Django models that match the template expectations:

```python
# models.py
from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7)  # Hex color
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Transaction(models.Model):
    TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
    date = models.DateField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.DateField()
    
    @property
    def spent(self):
        # Calculate spent amount for this budget
        pass
    
    @property
    def percentage(self):
        # Calculate percentage spent
        pass
```

## Features Included

### Authentication
- Login and registration forms
- Password visibility toggle
- Form validation and error handling
- Responsive design

### Dashboard
- Financial overview with stats cards
- Interactive charts (placeholder for Chart.js integration)
- Recent transactions list
- Budget overview with progress bars
- Quick action buttons

### Transactions
- Complete transaction management
- Search and filtering functionality
- Add/edit/delete operations
- Transaction type indicators

### Categories
- Category management with color coding
- Usage statistics
- Visual category cards

### Budgets
- Budget tracking with progress indicators
- Over-budget alerts
- Monthly budget management
- Budget tips section

### Analytics
- Expense breakdown charts
- Monthly trends analysis
- Weekly spending patterns
- Financial goals tracking

### Settings
- Profile management
- Security settings
- Subscription and billing
- Notification preferences
- Appearance settings

## Customization

### Colors and Themes
The design uses CSS custom properties for easy theming. Main colors are defined in `static/css/styles.css`:

- Primary gradient: `#8b5cf6` to `#3b82f6`
- Background: `#0f172a`
- Cards: `#1e293b`
- Borders: `#334155`

### JavaScript Functionality
- Modal management
- Form handling
- Sidebar toggle with state persistence
- Chart rendering (placeholder)
- Search and filtering

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive grids and layouts
- Touch-friendly interactions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Next Steps

1. Implement Django views and models
2. Add Chart.js for interactive charts
3. Integrate with Stripe for payments
4. Add REST API endpoints
5. Implement real-time updates with WebSockets
6. Add data export functionality
7. Implement advanced filtering and search

This frontend is production-ready and provides a solid foundation for your Django-based financial SaaS platform.