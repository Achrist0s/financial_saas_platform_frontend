import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'red' | 'purple';
}

const colorClasses = {
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  red: 'from-red-500 to-pink-500',
  purple: 'from-purple-500 to-indigo-500',
};

function StatsCard({ title, value, change, trend, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  );
}

export default StatsCard;