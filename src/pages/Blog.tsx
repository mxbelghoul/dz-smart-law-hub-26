
import React from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import { FileText, Calendar, User, ThumbsUp, MessageSquare } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'قانون العمل الجديد في الجزائر: ما يجب أن تعرفه',
      excerpt: 'شرح مفصل للتعديلات الجديدة في قانون العمل الجزائري وتأثيرها على العمال وأصحاب العمل.',
      author: 'د. أحمد بن علي',
      date: '2024-01-15',
      category: 'قانون العمل',
      likes: 45,
      comments: 12,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'حقوق المستهلك في القانون الجزائري',
      excerpt: 'دليل شامل حول حقوق المستهلك وآليات الحماية المتاحة في التشريع الجزائري.',
      author: 'أ. فاطمة زهراء',
      date: '2024-01-10',
      category: 'حماية المستهلك',
      likes: 38,
      comments: 8,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'إجراءات الطلاق في القانون الجزائري',
      excerpt: 'خطوات ومتطلبات إجراءات الطلاق في الجزائر مع التركيز على حقوق الطرفين.',
      author: 'المحامي محمد صالح',
      date: '2024-01-05',
      category: 'قانون الأسرة',
      likes: 52,
      comments: 15,
      image: '/placeholder.svg'
    }
  ];

  const categories = [
    'جميع المقالات',
    'قانون العمل',
    'قانون الأسرة',
    'القانون المدني',
    'القانون الجزائي',
    'حماية المستهلك',
    'القانون الإداري'
  ];

  return (
    <Layout>
      <PageHeader
        title="المدونة القانونية"
        subtitle="مقالات ومواضيع قانونية متخصصة بقلم خبراء في القانون الجزائري"
        icon={FileText}
        backgroundGradient={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">التصنيفات</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <InfoCard key={post.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <ThumbsUp className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            عرض المزيد من المقالات
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
