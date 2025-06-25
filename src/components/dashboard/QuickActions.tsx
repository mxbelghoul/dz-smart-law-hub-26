
import React from 'react';
import { FileText, Upload, Users, MessageSquare } from 'lucide-react';
import InfoCard from '@/components/custom/InfoCard';

interface QuickActionsProps {
  actions: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    color: string;
  }>;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <InfoCard>
      <h3 className="text-lg font-bold text-gray-900 mb-6">إجراءات سريعة</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors group"
            >
              <div className={`${action.color} text-white p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-gray-700 font-medium text-sm">{action.label}</span>
            </button>
          );
        })}
      </div>
    </InfoCard>
  );
};

export default QuickActions;
