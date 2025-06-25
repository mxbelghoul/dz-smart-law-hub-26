
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock data service - سيتم استبدالها بـ Supabase
const mockDataService = {
  // Notifications
  getNotifications: async (userId: string) => {
    // Mock data - سيتم استبدالها بـ supabase.from('notifications').select()
    return [];
  },
  
  markNotificationAsRead: async (notificationId: string) => {
    // Mock - سيتم استبدالها بـ supabase.from('notifications').update()
    return true;
  },

  // Interactions
  likeContent: async (contentType: string, contentId: string, userId: string) => {
    // Mock - سيتم استبدالها بـ supabase.from('likes').insert()
    return { success: true };
  },

  unlikeContent: async (contentType: string, contentId: string, userId: string) => {
    // Mock - سيتم استبدالها بـ supabase.from('likes').delete()
    return { success: true };
  },

  addComment: async (contentType: string, contentId: string, content: string, userId: string) => {
    // Mock - سيتم استبدالها بـ supabase.from('comments').insert()
    return { success: true };
  },

  // Admin functions
  getPendingContent: async () => {
    // Mock - سيتم استبدالها بـ multiple supabase queries
    return {
      laws: [],
      files: [],
      topics: [],
      centers: []
    };
  },

  approveContent: async (contentType: string, contentId: string) => {
    // Mock - سيتم استبدالها بـ supabase update
    return { success: true };
  },

  rejectContent: async (contentType: string, contentId: string) => {
    // Mock - سيتم استبدالها بـ supabase update
    return { success: true };
  }
};

// Notifications hooks
export const useNotifications = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => mockDataService.getNotifications(user?.id || ''),
    enabled: !!user?.id,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => 
      mockDataService.markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Content interaction hooks
export const useLikeContent = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: ({ contentType, contentId }: { contentType: string; contentId: string }) =>
      mockDataService.likeContent(contentType, contentId, user?.id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      toast({ title: 'تم الإعجاب بالمحتوى' });
    },
  });
};

export const useUnlikeContent = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: ({ contentType, contentId }: { contentType: string; contentId: string }) =>
      mockDataService.unlikeContent(contentType, contentId, user?.id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      toast({ title: 'تم إلغاء الإعجاب' });
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: ({ contentType, contentId, content }: { 
      contentType: string; 
      contentId: string; 
      content: string; 
    }) =>
      mockDataService.addComment(contentType, contentId, content, user?.id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast({ title: 'تم إضافة التعليق بنجاح' });
    },
  });
};

// Admin hooks
export const usePendingContent = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['pending-content'],
    queryFn: () => mockDataService.getPendingContent(),
    enabled: user?.role === 'admin',
  });
};

export const useApproveContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ contentType, contentId }: { contentType: string; contentId: string }) =>
      mockDataService.approveContent(contentType, contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-content'] });
      toast({ title: 'تم قبول المحتوى بنجاح' });
    },
  });
};

export const useRejectContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ contentType, contentId }: { contentType: string; contentId: string }) =>
      mockDataService.rejectContent(contentType, contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-content'] });
      toast({ title: 'تم رفض المحتوى' });
    },
  });
};
