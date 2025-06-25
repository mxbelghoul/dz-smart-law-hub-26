
import React from 'react';
import { Eye, Check, X } from 'lucide-react';
import InfoCard from '@/components/custom/InfoCard';

interface PendingItemsListProps {
  items: any[];
  type: string;
  title: string;
  onApprove: (type: string, id: number) => void;
  onReject: (type: string, id: number) => void;
}

const PendingItemsList: React.FC<PendingItemsListProps> = ({
  items,
  type,
  title,
  onApprove,
  onReject
}) => {
  return (
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
                    onClick={() => onApprove(type, item.id)}
                    className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                    title="موافقة"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => onReject(type, item.id)}
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
};

export default PendingItemsList;
