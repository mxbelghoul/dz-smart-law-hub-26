import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import { Shield, Users, FileText, MessageSquare, Inbox, Book, Eye, Check, X, BarChart3, Settings, Calendar, Clock } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - سيتم استبدالها بـ Supabase
  const [pendingItems, setPendingItems] = useState({
    laws: [
      { id: 1, title: 'تعديل قانون العمل 2024', author: 'أحمد محمد', date: '2024-01-15', category: 'قانون العمل' },
      { id: 2, title: 'قانون حماية البيئة', author: 'سارة بن علي', date: '2024-01-14', category: 'قانون البيئة' }
    ],
    files: [
      { id: 1, title: 'دليل المحاكم الإدارية', author: 'محمد الصالح', date: '2024-01-15', type: 'PDF', size: '2.3 MB' },
      { id: 2, title: 'الجريدة الرسمية العدد 02', author: 'وزارة العدل', date: '2024-01-14', type: 'PDF', size: '5.1 MB' }
    ],
    topics: [
      { id: 1, title: 'استشارة قانونية حول الإيجار', author: 'فاطمة زهرة', date: '2024-01-15', category: 'قانون العقارات' },
      { id: 2, title: 'إجراءات الطلاق في الجزائر', author: 'عبد الله كريم', date: '2024-01-14', category: 'قانون الأسرة' }
    ],
    centers: [
      { id: 1, title: 'مكتب المحامي خالد بن عمر', author: 'خالد بن عمر', date: '2024-01-15', location: 'الجزائر العاصمة' },
      { id: 2, title: 'مركز الاستشارات القانونية - وهران', author: 'نادية محمدي', date: '2024-01-14', location: 'وهران' }
    ]
  });

  const stats = {
    totalUsers: 1247,
    newUsersThisMonth: 189,
    totalPosts: 2856,
    postsThisMonth: 142,
    mostActiveUsers: [
      { name: 'أحمد محمد', posts: 23, engagement: '94%' },
      { name: 'سارة بن علي', posts: 18, engagement: '87%' },
      { name: 'محمد الصالح', posts: 15, engagement: '91%' }
    ]
  };

  // التحقق من صلاحيات المشرف
  if (!user || user.role !== 'admin') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              غير مخول للوصول
            </h2>
            <p className="text-gray-600 mb-6">
              هذه الصفحة مخصصة للمشرفين فقط
            </p>
            <button 
              onClick={() => navigate('/')}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleApprove = (type: string, id: number) => {
    setPendingItems(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].filter((item: any) => item.id !== id)
    }));
    // إضافة toast notification
  };

  const handleReject = (type: string, id: number) => {
    setPendingItems(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].filter((item: any) => item.id !== id)
    }));
    // إضافة toast notification
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'pending', label: 'في انتظار المراجعة', icon: Clock },
    { id: 'users', label: 'إدارة المستخدمين', icon: Users },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  const renderPendingItems = (items: any[], type: string, title: string) => (
    <InfoCard className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4">لا توجد عناصر في انتظار المراجعة</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">بواسطة: {item.author}</p>
                  <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                    <span>📅 {item.date}</span>
                    {item.category && <span>🏷️ {item.category}</span>}
                    {item.location && <span>📍 {item.location}</span>}
                    {item.size && <span>📁 {item.size}</span>}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => {/* معاينة */}}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="معاينة"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleApprove(type, item.id)}
                    className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                    title="موافقة"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleReject(type, item.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="رفض"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </InfoCard>
  );

  return (
    <Layout>
      <PageHeader
        title="لوحة تحكم المشرفين"
        subtitle="إدارة المحتوى والمستخدمين والإعدادات"
        icon={Shield}
        backgroundGradient={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8 space-x-reverse">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Statistics Cards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                      <p className="text-gray-600">إجمالي المستخدمين</p>
                      <p className="text-sm text-green-600">+{stats.newUsersThisMonth} هذا الشهر</p>
                    </div>
                  </div>
                </InfoCard>
                
                <InfoCard>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
                      <p className="text-gray-600">إجمالي المشاركات</p>
                      <p className="text-sm text-green-600">+{stats.postsThisMonth} هذا الشهر</p>
                    </div>
                  </div>
                </InfoCard>
              </div>

              {/* Pending Items Summary */}
              <InfoCard>
                <h3 className="text-lg font-bold text-gray-900 mb-4">العناصر في انتظار المراجعة</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{pendingItems.laws.length}</div>
                    <div className="text-sm text-gray-600">قوانين مقترحة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{pendingItems.files.length}</div>
                    <div className="text-sm text-gray-600">ملفات جديدة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{pendingItems.topics.length}</div>
                    <div className="text-sm text-gray-600">مواضيع منتدى</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{pendingItems.centers.length}</div>
                    <div className="text-sm text-gray-600">مراكز قانونية</div>
                  </div>
                </div>
              </InfoCard>
            </div>

            {/* Most Active Users */}
            <div>
              <InfoCard>
                <h3 className="text-lg font-bold text-gray-900 mb-4">الأكثر نشاطاً</h3>
                <div className="space-y-3">
                  {stats.mostActiveUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.posts} مشاركة</p>
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        {user.engagement}
                      </div>
                    </div>
                  ))}
                </div>
              </InfoCard>
            </div>
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="space-y-6">
            {renderPendingItems(pendingItems.laws, 'laws', 'القوانين المقترحة')}
            {renderPendingItems(pendingItems.files, 'files', 'الملفات الجديدة')}
            {renderPendingItems(pendingItems.topics, 'topics', 'مواضيع المنتدى')}
            {renderPendingItems(pendingItems.centers, 'centers', 'المراكز القانونية')}
          </div>
        )}

        {activeTab === 'users' && (
          <InfoCard>
            <h3 className="text-lg font-bold text-gray-900 mb-4">إدارة المستخدمين</h3>
            <p className="text-gray-600">قريباً - أدوات إدارة المستخدمين والأدوار</p>
          </InfoCard>
        )}

        {activeTab === 'settings' && (
          <InfoCard>
            <h3 className="text-lg font-bold text-gray-900 mb-4">إعدادات المنصة</h3>
            <p className="text-gray-600">قريباً - إعدادات التصنيفات والإعدادات العامة</p>
          </InfoCard>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
