
import React from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import { useAuth } from '@/contexts/AuthContext';
import { User, FileText, Upload, Users, MessageSquare, Download, Activity } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const userStats = [
    { icon: FileText, label: 'المقالات المنشورة', value: '12', color: 'text-blue-600 bg-blue-100' },
    { icon: Upload, label: 'الملفات المرفوعة', value: '8', color: 'text-green-600 bg-green-100' },
    { icon: Users, label: 'المراكز المضافة', value: '3', color: 'text-purple-600 bg-purple-100' },
    { icon: MessageSquare, label: 'التعليقات', value: '45', color: 'text-orange-600 bg-orange-100' }
  ];

  const recentActivities = [
    {
      type: 'article',
      title: 'نشر مقال: "حقوق المستأجر في القانون الجزائري"',
      date: '2024-01-15',
      category: 'مقالات'
    },
    {
      type: 'file',
      title: 'رفع ملف: "دليل إجراءات المحاكم الإدارية"',
      date: '2024-01-12',
      category: 'مكتبة'
    },
    {
      type: 'center',
      title: 'إضافة مركز: "مكتب المحامي أحمد بن علي - وهران"',
      date: '2024-01-10',
      category: 'مراكز'
    },
    {
      type: 'comment',
      title: 'تعليق على موضوع: "إجراءات الزواج في الجزائر"',
      date: '2024-01-08',
      category: 'منتدى'
    }
  ];

  const quickActions = [
    { icon: FileText, label: 'كتابة مقال جديد', href: '/blog/new', color: 'bg-blue-600' },
    { icon: Upload, label: 'رفع ملف جديد', href: '/library/upload', color: 'bg-green-600' },
    { icon: Users, label: 'إضافة مركز قانوني', href: '/centers/add', color: 'bg-purple-600' },
    { icon: MessageSquare, label: 'إنشاء موضوع جديد', href: '/forum/new', color: 'bg-orange-600' }
  ];

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              يجب تسجيل الدخول للوصول لهذه الصفحة
            </h2>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
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
        title="لوحة التحكم"
        subtitle={`مرحباً ${user.name}، تابع نشاطك ومساهماتك في المنصة`}
        icon={Activity}
        backgroundGradient={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Summary */}
        <InfoCard className="mb-8">
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className="bg-primary-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <div className="flex items-center space-x-4 space-x-reverse text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role === 'admin' ? 'مشرف' : 'مستخدم'}
                </span>
                <span className="text-gray-500">عضو منذ يناير 2024</span>
              </div>
            </div>
            
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              تحديث الملف الشخصي
            </button>
          </div>
        </InfoCard>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <InfoCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">النشاط الأخير</h3>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  عرض الكل
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
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
          </div>
          
          {/* Quick Actions */}
          <div>
            <InfoCard>
              <h3 className="text-lg font-bold text-gray-900 mb-6">إجراءات سريعة</h3>
              
              <div className="space-y-3">
                {quickActions.map((action, index) => {
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
            
            {/* Quick Stats */}
            <InfoCard className="mt-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">إحصائيات سريعة</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">مجموع المشاهدات</span>
                  <span className="font-medium">2,341</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">إجمالي الإعجابات</span>
                  <span className="font-medium">189</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">معدل التفاعل</span>
                  <span className="font-medium">8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تقييم المحتوى</span>
                  <span className="font-medium">4.8 ⭐</span>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
