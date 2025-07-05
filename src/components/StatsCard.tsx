
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down' | 'neutral';
  color: 'green' | 'blue' | 'purple' | 'orange';
}

const StatsCard = ({ title, value, change, icon: Icon, trend, color }: StatsCardProps) => {
  const colorClasses = {
    green: 'from-gray-700 to-gray-900',
    blue: 'from-gray-600 to-gray-800',
    purple: 'from-gray-800 to-black',
    orange: 'from-gray-500 to-gray-700'
  };

  const trendColors = {
    up: 'text-gray-700',
    down: 'text-gray-900',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          <p className={`text-sm ${trendColors[trend]}`}>
            {change}
          </p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0 ml-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
