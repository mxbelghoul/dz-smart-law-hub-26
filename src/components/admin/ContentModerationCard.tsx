
import React from 'react';
import { Eye, Check, X, Clock } from 'lucide-react';
import { useApproveContent, useRejectContent } from '@/hooks/useSupabase';

interface ContentModerationCardProps {
  item: {
    id: string;
    title: string;
    author: string;
    date: string;
    category?: string;
    location?: string;
    size?: string;
    type?: string;
  };
  contentType: string;
  onPreview?: (item: any) => void;
}

const ContentModerationCard: React.FC<ContentModerationCardProps> = ({
  item,
  contentType,
  onPreview
}) => {
  const approveMutation = useApproveContent();
  const rejectMutation = useRejectContent();

  const handleApprove = () => {
    approveMutation.mutate({ contentType, contentId: item.id });
  };

  const handleReject = () => {
    rejectMutation.mutate({ contentType, contentId: item.id });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
            {item.title}
          </h4>
          <p className="text-sm text-gray-600 mb-2">بواسطة: {item.author}</p>
          <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
            <span className="flex items-center space-x-1 space-x-reverse">
              <Clock className="h-3 w-3" />
              <span>{item.date}</span>
            </span>
            {item.category && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {item.category}
              </span>
            )}
            {item.location && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                📍 {item.location}
              </span>
            )}
            {item.size && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                📁 {item.size}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          {onPreview && (
            <button
              onClick={() => onPreview(item)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="معاينة"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
          
          <button
            onClick={handleApprove}
            disabled={approveMutation.isPending}
            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
            title="موافقة"
          >
            <Check className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleReject}
            disabled={rejectMutation.isPending}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="رفض"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentModerationCard;
