
// Database Types for Supabase Integration
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  type: 'like' | 'comment' | 'repost' | 'follow' | 'approval';
  source_type: 'blog' | 'forum' | 'library' | 'laws' | 'profile';
  source_id: string;
  source_user_id?: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: string;
  user_id: string;
  content_type: 'blog' | 'forum' | 'library';
  content_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  content_type: 'blog' | 'forum' | 'library';
  content_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Repost {
  id: string;
  user_id: string;
  content_type: 'blog' | 'forum' | 'library';
  content_id: string;
  message?: string;
  created_at: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: string;
  tags: string[];
  is_published: boolean;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  author?: User;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: string;
  is_approved: boolean;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  author?: User;
}

export interface LegalFile {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploader_id: string;
  category: string;
  is_approved: boolean;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  uploader?: User;
}

export interface LawSuggestion {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  author?: User;
}

export interface LegalCenter {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  website?: string;
  services: string[];
  owner_id: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  owner?: User;
}

export interface ContentInteraction {
  likes_count: number;
  comments_count: number;
  reposts_count: number;
  user_liked: boolean;
  user_commented: boolean;
  user_reposted: boolean;
}
