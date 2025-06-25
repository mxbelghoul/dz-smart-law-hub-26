
import React from 'react';
import InfoCard from '@/components/custom/InfoCard';

interface UserProfileCardProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
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
  );
};

export default UserProfileCard;
