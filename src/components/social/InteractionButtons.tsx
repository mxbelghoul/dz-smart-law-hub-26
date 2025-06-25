
import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Heart } from 'lucide-react';
import { useLikeContent, useUnlikeContent } from '@/hooks/useSupabase';
import { useAuth } from '@/contexts/AuthContext';
import { ContentInteraction } from '@/types/database';

interface InteractionButtonsProps {
  contentType: 'blog' | 'forum' | 'library';
  contentId: string;
  interaction: ContentInteraction;
  onCommentClick?: () => void;
  onShareClick?: () => void;
}

const InteractionButtons: React.FC<InteractionButtonsProps> = ({
  contentType,
  contentId,
  interaction,
  onCommentClick,
  onShareClick
}) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(interaction.user_liked);
  const likeMutation = useLikeContent();
  const unlikeMutation = useUnlikeContent();

  const handleLike = async () => {
    if (!user) {
      // Redirect to login or show toast
      return;
    }

    if (isLiked) {
      unlikeMutation.mutate({ contentType, contentId });
      setIsLiked(false);
    } else {
      likeMutation.mutate({ contentType, contentId });
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    if (onShareClick) {
      onShareClick();
    } else {
      // Default share behavior
      const url = window.location.href;
      navigator.share?.({ url }) || navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex items-center space-x-6 space-x-reverse py-3 border-t border-gray-200">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg transition-colors ${
          isLiked
            ? 'text-red-600 bg-red-50 hover:bg-red-100'
            : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
        }`}
        disabled={likeMutation.isPending || unlikeMutation.isPending}
      >
        <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        <span className="text-sm font-medium">
          {interaction.likes_count > 0 ? interaction.likes_count : 'إعجاب'}
        </span>
      </button>

      {/* Comment Button */}
      <button
        onClick={onCommentClick}
        className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="text-sm font-medium">
          {interaction.comments_count > 0 ? interaction.comments_count : 'تعليق'}
        </span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
      >
        <Share2 className="h-5 w-5" />
        <span className="text-sm font-medium">
          {interaction.reposts_count > 0 ? interaction.reposts_count : 'مشاركة'}
        </span>
      </button>
    </div>
  );
};

export default InteractionButtons;
