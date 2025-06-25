
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import { Inbox, Download, FileText, Search, Filter, Upload } from 'lucide-react';

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('جميع الفئات');
  const [selectedAudience, setSelectedAudience] = useState('جميع المستخدمين');

  const categories = [
    'جميع الفئات', 'الجريدة الرسمية', 'كتب قانونية', 'أبحاث ومذكرات', 
    'أحكام قضائية', 'قوانين ومراسيم', 'دلائل إجرائية'
  ];

  const audiences = [
    'جميع المستخدمين', 'الطلبة', 'الباحثون', 'المحامون', 'القضاة', 'العموم'
  ];

  const libraryFiles = [
    {
      id: 1,
      title: 'قانون العمل الجزائري المحدث 2024',
      description: 'النسخة الكاملة والمحدثة من قانون العمل الجزائري مع التعديلات الأخيرة',
      category: 'قوانين ومراسيم',
      audience: 'العموم',
      fileType: 'PDF',
      fileSize: '2.5 MB',
      downloads: 1250,
      uploadDate: '2024-01-15',
      uploader: 'وزارة العدل'
    },
    {
      id: 2,
      title: 'الجريدة الرسمية - العدد 01 لسنة 2024',
      description: 'الجريدة الرسمية للجمهورية الجزائرية العدد الأول لسنة 2024',
      category: 'الجريدة الرسمية',
      audience: 'جميع المستخدمين',
      fileType: 'PDF',
      fileSize: '5.8 MB',
      downloads: 890,
      uploadDate: '2024-01-08',
      uploader: 'الأمانة العامة للحكومة'
    },
    {
      id: 3,
      title: 'دليل إجراءات التقاضي أمام المحاكم',
      description: 'دليل شامل لإجراءات التقاضي في المحاكم الجزائرية للمواطنين',
      category: 'دلائل إجرائية',
      audience: 'العموم',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      downloads: 675,
      uploadDate: '2024-01-05',
      uploader: 'وزارة العدل'
    },
    {
      id: 4,
      title: 'مذكرة ماجستير: حقوق المرأة في القانون الجزائري',
      description: 'بحث أكاديمي متخصص حول تطور حقوق المرأة في التشريع الجزائري',
      category: 'أبحاث ومذكرات',
      audience: 'الباحثون',
      fileType: 'PDF',
      fileSize: '3.2 MB',
      downloads: 245,
      uploadDate: '2024-01-03',
      uploader: 'جامعة الجزائر'
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="المكتبة القانونية"
        subtitle="مكتبة شاملة للوثائق والمراجع القانونية الجزائرية قابلة للتحميل"
        icon={Inbox}
        backgroundGradient={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="البحث في المكتبة..."
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            {/* Audience Filter */}
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {audiences.map((audience) => (
                <option key={audience} value={audience}>{audience}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <button className="flex items-center space-x-2 space-x-reverse text-primary-600 hover:text-primary-700">
              <Filter className="h-4 w-4" />
              <span>فلاتر متقدمة</span>
            </button>
            
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 space-x-reverse">
              <Upload className="h-4 w-4" />
              <span>رفع ملف جديد</span>
            </button>
          </div>
        </div>

        {/* Library Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {libraryFiles.map((file) => (
            <InfoCard key={file.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* File Header */}
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="bg-red-100 text-red-600 p-3 rounded-lg flex-shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                      {file.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mb-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {file.category}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {file.audience}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* File Description */}
                <p className="text-gray-600 text-sm line-clamp-3">
                  {file.description}
                </p>
                
                {/* File Info */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">نوع الملف:</span> {file.fileType}
                  </div>
                  <div>
                    <span className="font-medium">الحجم:</span> {file.fileSize}
                  </div>
                  <div>
                    <span className="font-medium">التحميلات:</span> {file.downloads}
                  </div>
                  <div>
                    <span className="font-medium">تاريخ الرفع:</span> {file.uploadDate}
                  </div>
                </div>
                
                {/* Uploader */}
                <div className="text-sm text-gray-500 border-t pt-3">
                  <span className="font-medium">رفع بواسطة:</span> {file.uploader}
                </div>
                
                {/* Download Button */}
                <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse">
                  <Download className="h-4 w-4" />
                  <span>تحميل الملف</span>
                </button>
              </div>
            </InfoCard>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            عرض المزيد من الملفات
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Library;
