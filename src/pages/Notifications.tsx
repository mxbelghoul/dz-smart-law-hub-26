
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import { Bell, ThumbsUp, MessageSquare, Repeat, UserPlus, CheckCircle, Clock, ExternalLink, Trash2 } from 'lucide-react';

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

  const handleNotificationClick = (notification: any) => {
    // تحديد المسار بناءً على نوع المصدر
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

    // تحديث حالة القراءة
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
        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm whitespace-nowrap"
            >
              تحديد الكل كمقروء
            </button>
          )}
        </div>

        {/* Notifications List */}
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
              <InfoCard 
                key={notification.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  !notification.is_read ? 'border-r-4 border-primary-500 bg-primary-50' : ''
                }`}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  {/* Notification Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  {/* Notification Content */}
                  <div 
                    className="flex-grow min-w-0 cursor-pointer"
                    onClick={() => handleNotificationClick(notification)}
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
                            handleNotificationClick(notification);
                          }}
                          className="text-gray-400 hover:text-primary-600 transition-colors"
                          title="فتح المصدر"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notification.id);
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
            ))
          )}
        </div>

        {/* Load More */}
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
