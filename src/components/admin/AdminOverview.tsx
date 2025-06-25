
import React from 'react';
import { Users, FileText } from 'lucide-react';
import InfoCard from '@/components/custom/InfoCard';

interface AdminOverviewProps {
  stats: {
    totalUsers: number;
    newUsersThisMonth: number;
    totalPosts: number;
    postsThisMonth: number;
    mostActiveUsers: Array<{
      name: string;
      posts: number;
      engagement: string;
    }>;
  };
  pendingCounts: {
    laws: number;
    files: number;
    topics: number;
    centers: number;
  };
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ stats, pendingCounts }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        <InfoCard>
          <h3 className="text-lg font-bold text-gray-900 mb-4">العناصر في انتظار المراجعة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{pendingCounts.laws}</div>
              <div className="text-sm text-gray-600">قوانين مقترحة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{pendingCounts.files}</div>
              <div className="text-sm text-gray-600">ملفات جديدة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{pendingCounts.topics}</div>
              <div className="text-sm text-gray-600">مواضيع منتدى</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{pendingCounts.centers}</div>
              <div className="text-sm text-gray-600">مراكز قانونية</div>
            </div>
          </div>
        </InfoCard>
      </div>

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
  );
};

export default AdminOverview;
