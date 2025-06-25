
import React from 'react';
import { Bell } from 'lucide-react';
import { useRealTimeNotifications } from '@/hooks/useRealTimeNotifications';
import { useAuth } from '@/contexts/AuthContext';

const NotificationBadge: React.FC = () => {
  const { user } = useAuth();
  const { unreadCount } = useRealTimeNotifications();

  if (!user) return null;

  return (
    <div className="relative">
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;
