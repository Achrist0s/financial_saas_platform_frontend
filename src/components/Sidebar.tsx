import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  Tag, 
  PiggyBank, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/transactions', icon: CreditCard, label: 'Transactions' },
    { to: '/categories', icon: Tag, label: 'Categories' },
    { to: '/budgets', icon: PiggyBank, label: 'Budgets' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 z-10 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="flex items-center p-4 border-b border-gray-700">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-300" />
        </button>
        {isOpen && (
          <div className="ml-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                FinanceTracker
              </h1>
            </div>
          </div>
        )}
      </div>

      <nav className="mt-6">
        <div className="px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors group ${
                  isActive ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        {isOpen && (
          <div className="mb-4">
            <p className="text-sm text-gray-400">{user?.email}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;