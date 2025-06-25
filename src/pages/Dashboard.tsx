
import React from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import StatsGrid from '@/components/dashboard/StatsGrid';
import RecentActivities from '@/components/dashboard/RecentActivities';
import QuickActions from '@/components/dashboard/QuickActions';
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
        <UserProfileCard user={user} />
        <StatsGrid stats={userStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentActivities activities={recentActivities} />
          </div>
          
          <div>
            <QuickActions actions={quickActions} />
            
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
