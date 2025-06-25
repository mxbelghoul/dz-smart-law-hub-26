
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import AdminTabs from '@/components/admin/AdminTabs';
import AdminOverview from '@/components/admin/AdminOverview';
import PendingItemsList from '@/components/admin/PendingItemsList';
import { Shield } from 'lucide-react';

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
  };

  const handleReject = (type: string, id: number) => {
    setPendingItems(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].filter((item: any) => item.id !== id)
    }));
  };

  const pendingCounts = {
    laws: pendingItems.laws.length,
    files: pendingItems.files.length,
    topics: pendingItems.topics.length,
    centers: pendingItems.centers.length
  };

  return (
    <Layout>
      <PageHeader
        title="لوحة تحكم المشرفين"
        subtitle="إدارة المحتوى والمستخدمين والإعدادات"
        icon={Shield}
        backgroundGradient={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'overview' && (
          <AdminOverview stats={stats} pendingCounts={pendingCounts} />
        )}

        {activeTab === 'pending' && (
          <div className="space-y-6">
            <PendingItemsList
              items={pendingItems.laws}
              type="laws"
              title="القوانين المقترحة"
              onApprove={handleApprove}
              onReject={handleReject}
            />
            <PendingItemsList
              items={pendingItems.files}
              type="files"
              title="الملفات الجديدة"
              onApprove={handleApprove}
              onReject={handleReject}
            />
            <PendingItemsList
              items={pendingItems.topics}
              type="topics"
              title="مواضيع المنتدى"
              onApprove={handleApprove}
              onReject={handleReject}
            />
            <PendingItemsList
              items={pendingItems.centers}
              type="centers"
              title="المراكز القانونية"
              onApprove={handleApprove}
              onReject={handleReject}
            />
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
