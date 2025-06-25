
import React from 'react';
import InfoCard from '@/components/custom/InfoCard';

interface StatsGridProps {
  stats: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    color: string;
  }>;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <InfoCard key={index} className="text-center">
            <div className={`${stat.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
              <Icon className="h-8 w-8" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </InfoCard>
        );
      })}
    </div>
  );
};

export default StatsGrid;
