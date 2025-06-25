
import React, { useState } from 'react';
import { useAddComment } from '@/hooks/useSupabase';
import { useAuth } from '@/contexts/AuthContext';
import { Comment } from '@/types/database';
import { MessageSquare, Send } from 'lucide-react';

interface CommentsSectionProps {
  contentType: 'blog' | 'forum' | 'library';
  contentId: string;
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  contentType,
  contentId,
  comments,
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const addCommentMutation = useAddComment();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    addCommentMutation.mutate({
      contentType,
      contentId,
      content: newComment.trim()
    });

    setNewComment('');
  };

  if (!isOpen) return null;

  return (
    <div className="border-t border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 space-x-reverse">
          <MessageSquare className="h-5 w-5" />
          <span>التعليقات ({comments.length})</span>
        </h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          إغلاق
        </button>
      </div>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex space-x-3 space-x-reverse">
            <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="اكتب تعليقك هنا..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newComment.trim() || addCommentMutation.isPending}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 space-x-reverse"
                >
                  <Send className="h-4 w-4" />
                  <span>إرسال</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600 mb-2">يجب تسجيل الدخول لإضافة تعليق</p>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            تسجيل الدخول
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>لا توجد تعليقات بعد</p>
            <p className="text-sm">كن أول من يعلق على هذا المحتوى</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3 space-x-reverse">
              <div className="bg-gray-300 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                {comment.user?.name.charAt(0) || 'م'}
              </div>
              <div className="flex-grow">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {comment.user?.name || 'مستخدم'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('ar-DZ')}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
