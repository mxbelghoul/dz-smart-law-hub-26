
import React from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import { MessageSquare, User, Clock, ThumbsUp, Reply } from 'lucide-react';

const Forum = () => {
  const forumTopics = [
    {
      id: 1,
      title: 'كيفية استخراج شهادة الميلاد من البلدية؟',
      description: 'أحتاج معلومات حول الوثائق المطلوبة واستخراج شهادة الميلاد',
      author: 'أحمد محمد',
      category: 'إجراءات إدارية',
      replies: 8,
      likes: 15,
      lastReply: '2024-01-15',
      isPinned: false
    },
    {
      id: 2,
      title: 'مشكلة في عقد الإيجار - نصيحة قانونية',
      description: 'المالك يريد زيادة الإيجار بطريقة غير قانونية، ما الحل؟',
      author: 'سارة بن علي',
      category: 'قانون العقارات',
      replies: 12,
      likes: 23,
      lastReply: '2024-01-14',
      isPinned: true
    },
    {
      id: 3,
      title: 'إجراءات تأسيس شركة ذات مسؤولية محدودة',
      description: 'ما هي الخطوات والوثائق المطلوبة لتأسيس شركة؟',
      author: 'محمد الصالح',
      category: 'قانون الشركات',
      replies: 5,
      likes: 18,
      lastReply: '2024-01-13',
      isPinned: false
    }
  ];

  const categories = [
    'جميع المواضيع',
    'إجراءات إدارية',
    'قانون العقارات',
    'قانون الشركات',
    'قانون الأسرة',
    'قانون العمل',
    'استشارات قانونية'
  ];

  return (
    <Layout>
      <PageHeader
        title="المنتدى القانوني"
        subtitle="منصة للنقاش والاستشارات القانونية بين المختصين والمواطنين"
        icon={MessageSquare}
        backgroundGradient={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories and New Topic Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
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
          
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap">
            موضوع جديد +
          </button>
        </div>

        {/* Forum Topics */}
        <div className="space-y-4">
          {forumTopics.map((topic) => (
            <InfoCard key={topic.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4 space-x-reverse">
                {/* Topic Icon */}
                <div className="flex-shrink-0">
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
                
                {/* Topic Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    {topic.isPinned && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        مثبت
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {topic.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer">
                    {topic.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {topic.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <User className="h-4 w-4" />
                        <span>{topic.author}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Reply className="h-4 w-4" />
                        <span>{topic.replies} رد</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{topic.likes} إعجاب</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Clock className="h-4 w-4" />
                      <span>آخر رد: {topic.lastReply}</span>
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2 space-x-reverse">
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">السابق</button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded">1</button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">2</button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">3</button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">التالي</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forum;
