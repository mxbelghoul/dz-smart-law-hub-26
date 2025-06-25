
import React from 'react';
import { FileText, Upload, Users, MessageSquare } from 'lucide-react';
import InfoCard from '@/components/custom/InfoCard';

interface RecentActivitiesProps {
  activities: Array<{
    type: string;
    title: string;
    date: string;
    category: string;
  }>;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <InfoCard>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">النشاط الأخير</h3>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          عرض الكل
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4 space-x-reverse pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="bg-primary-100 text-primary-600 p-2 rounded-lg flex-shrink-0">
              {activity.type === 'article' && <FileText className="h-4 w-4" />}
              {activity.type === 'file' && <Upload className="h-4 w-4" />}
              {activity.type === 'center' && <Users className="h-4 w-4" />}
              {activity.type === 'comment' && <MessageSquare className="h-4 w-4" />}
            </div>
            
            <div className="flex-grow min-w-0">
              <p className="text-gray-900 font-medium text-sm mb-1 line-clamp-2">
                {activity.title}
              </p>
              <div className="flex items-center space-x-3 space-x-reverse text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">{activity.category}</span>
                <span>{activity.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfoCard>
  );
};

export default RecentActivities;
