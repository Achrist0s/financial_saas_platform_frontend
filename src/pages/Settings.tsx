import React from 'react';
import { User, Bell, Shield, Palette, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account and application preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white flex items-center mb-6">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  />
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white flex items-center mb-6">
              <Shield className="w-5 h-5 mr-2" />
              Security & Privacy
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                  <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Change Password</h4>
                  <p className="text-gray-400 text-sm">Update your account password</p>
                </div>
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white flex items-center mb-6">
              <CreditCard className="w-5 h-5 mr-2" />
              Subscription & Billing
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Pro Plan</h4>
                  <p className="text-gray-400 text-sm">$9.99/month • Next billing: Jan 15, 2024</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                  Manage
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Usage Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Transactions</span>
                      <span className="text-white text-sm">124 / 1000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Categories</span>
                      <span className="text-white text-sm">8 / 50</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Payment Method</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <span className="text-gray-400 text-sm">•••• 4242</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white flex items-center mb-6">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Budget alerts', checked: true },
                { label: 'New transactions', checked: false },
                { label: 'Monthly reports', checked: true },
                { label: 'Security alerts', checked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-gray-300">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white flex items-center mb-6">
              <Palette className="w-5 h-5 mr-2" />
              Appearance
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Theme
                </label>
                <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white">
                  <option>Dark (Current)</option>
                  <option>Light</option>
                  <option>Auto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currency
                </label>
                <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>UAH (₴)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Account Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white">
                <span>Export Data</span>
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;