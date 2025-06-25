
import React from 'react';
import { BarChart3, Clock, Users, Settings } from 'lucide-react';

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'pending', label: 'في انتظار المراجعة', icon: Clock },
    { id: 'users', label: 'إدارة المستخدمين', icon: Users },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8 space-x-reverse">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 space-x-reverse py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminTabs;
