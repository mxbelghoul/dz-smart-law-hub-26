import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import NotificationItem from '@/components/notifications/NotificationItem';
import NotificationFilters from '@/components/notifications/NotificationFilters';
import { Bell } from 'lucide-react';

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('جميع الإشعارات');

  // Mock notifications data - سيتم استبدالها بـ Supabase
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      message: 'أعجب أحمد محمد بمقالك "حقوق المستأجر في القانون الجزائري"',
      source_type: 'blog',
      source_id: '123',
      user_name: 'أحمد محمد',
      is_read: false,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      type: 'comment',
      message: 'علق سارة بن علي على موضوعك في المنتدى',
      source_type: 'forum',
      source_id: '456',
      user_name: 'سارة بن علي',
      is_read: false,
      created_at: '2024-01-15T09:15:00Z'
    },
    {
      id: 3,
      type: 'repost',
      message: 'شارك محمد الصالح ملفك "دليل إجراءات المحاكم"',
      source_type: 'library',
      source_id: '789',
      user_name: 'محمد الصالح',
      is_read: true,
      created_at: '2024-01-14T16:45:00Z'
    },
    {
      id: 4,
      type: 'follow',
      message: 'بدأ عبد الرحمن خليل بمتابعتك',
      source_type: 'profile',
      source_id: 'user_123',
      user_name: 'عبد الرحمن خليل',
      is_read: true,
      created_at: '2024-01-14T14:20:00Z'
    },
    {
      id: 5,
      type: 'approval',
      message: 'تم قبول اقتراحك لقانون "تعديل قانون العمل 2024"',
      source_type: 'laws',
      source_id: '101',
      user_name: 'إدارة المنصة',
      is_read: false,
      created_at: '2024-01-13T11:00:00Z'
    }
  ]);

  const filters = [
    'جميع الإشعارات',
    'غير مقروءة',
    'الإعجابات',
    'التعليقات',
    'المشاركات',
    'المتابعات',
    'الموافقات'
  ];

  const handleNotificationClick = (notification: any) => {
    let targetPath = '/';
    switch (notification.source_type) {
      case 'blog':
        targetPath = `/blog/${notification.source_id}`;
        break;
      case 'forum':
        targetPath = `/forum/${notification.source_id}`;
        break;
      case 'library':
        targetPath = `/library/${notification.source_id}`;
        break;
      case 'profile':
        targetPath = `/profile/${notification.source_id}`;
        break;
      case 'laws':
        targetPath = `/laws/${notification.source_id}`;
        break;
    }

    if (!notification.is_read) {
      setNotifications(prev => 
        prev.map(n => 
          n.id === notification.id ? { ...n, is_read: true } : n
        )
      );
    }

    navigate(targetPath);
  };

  const handleDeleteNotification = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'جميع الإشعارات') return true;
    if (selectedFilter === 'غير مقروءة') return !notification.is_read;
    if (selectedFilter === 'الإعجابات') return notification.type === 'like';
    if (selectedFilter === 'التعليقات') return notification.type === 'comment';
    if (selectedFilter === 'المشاركات') return notification.type === 'repost';
    if (selectedFilter === 'المتابعات') return notification.type === 'follow';
    if (selectedFilter === 'الموافقات') return notification.type === 'approval';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              يجب تسجيل الدخول للوصول للإشعارات
            </h2>
            <button 
              onClick={() => navigate('/auth')}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="الإشعارات"
        subtitle={`لديك ${unreadCount} إشعار جديد`}
        icon={Bell}
        backgroundGradient={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NotificationFilters
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          unreadCount={unreadCount}
          onMarkAllAsRead={markAllAsRead}
        />

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <InfoCard className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                لا توجد إشعارات
              </h3>
              <p className="text-gray-600">
                ستظهر هنا جميع التفاعلات والتحديثات الخاصة بمحتواك
              </p>
            </InfoCard>
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onNotificationClick={handleNotificationClick}
                onDeleteNotification={handleDeleteNotification}
              />
            ))
          )}
        </div>

        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
              عرض المزيد من الإشعارات
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
