
import React from 'react';
import { ThumbsUp, MessageSquare, Repeat, UserPlus, CheckCircle, Bell, Clock, ExternalLink, Trash2 } from 'lucide-react';
import InfoCard from '@/components/custom/InfoCard';

interface NotificationItemProps {
  notification: {
    id: number;
    type: string;
    message: string;
    source_type: string;
    source_id: string;
    user_name: string;
    is_read: boolean;
    created_at: string;
  };
  onNotificationClick: (notification: any) => void;
  onDeleteNotification: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onNotificationClick,
  onDeleteNotification
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <ThumbsUp className="h-5 w-5 text-blue-600" />;
      case 'comment': return <MessageSquare className="h-5 w-5 text-green-600" />;
      case 'repost': return <Repeat className="h-5 w-5 text-purple-600" />;
      case 'follow': return <UserPlus className="h-5 w-5 text-orange-600" />;
      case 'approval': return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ دقائق';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    if (diffInHours < 48) return 'منذ يوم';
    return `منذ ${Math.floor(diffInHours / 24)} أيام`;
  };

  return (
    <InfoCard 
      className={`hover:shadow-md transition-shadow cursor-pointer ${
        !notification.is_read ? 'border-r-4 border-primary-500 bg-primary-50' : ''
      }`}
    >
      <div className="flex items-start space-x-4 space-x-reverse">
        <div className="flex-shrink-0 mt-1">
          {getNotificationIcon(notification.type)}
        </div>
        
        <div 
          className="flex-grow min-w-0 cursor-pointer"
          onClick={() => onNotificationClick(notification)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <p className={`text-sm ${!notification.is_read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                {notification.message}
              </p>
              
              <div className="flex items-center space-x-2 space-x-reverse mt-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(notification.created_at)}</span>
                {!notification.is_read && (
                  <span className="bg-primary-600 text-white px-2 py-0.5 rounded-full text-xs">
                    جديد
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNotificationClick(notification);
                }}
                className="text-gray-400 hover:text-primary-600 transition-colors"
                title="فتح المصدر"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNotification(notification.id);
                }}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="حذف الإشعار"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </InfoCard>
  );
};

export default NotificationItem;
