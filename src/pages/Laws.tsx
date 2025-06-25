
import React, { useState } from 'react';
import { Book, Search, FileText, Calendar, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import AppButton from '@/components/custom/AppButton';

const Laws = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'جميع القوانين', count: 150 },
    { id: 'civil', name: 'القانون المدني', count: 45 },
    { id: 'criminal', name: 'القانون الجزائي', count: 32 },
    { id: 'administrative', name: 'القانون الإداري', count: 28 },
    { id: 'commercial', name: 'القانون التجاري', count: 25 },
    { id: 'family', name: 'قانون الأسرة', count: 20 },
  ];

  const laws = [
    {
      id: 1,
      title: 'القانون المدني الجزائري',
      description: 'ينظم العلاقات المدنية بين الأشخاص ويحدد الحقوق والواجبات المدنية',
      category: 'civil',
      lastUpdated: '2024-01-15',
      articles: 1853,
      isPopular: true
    },
    {
      id: 2,
      title: 'قانون الإجراءات المدنية والإدارية',
      description: 'ينظم الإجراءات أمام المحاكم المدنية والإدارية',
      category: 'civil',
      lastUpdated: '2023-12-20',
      articles: 1036,
      isPopular: true
    },
    {
      id: 3,
      title: 'قانون العقوبات',
      description: 'يحدد الجرائم والعقوبات المقررة لها في النظام القانوني الجزائري',
      category: 'criminal',
      lastUpdated: '2024-02-01',
      articles: 458,
      isPopular: true
    },
    {
      id: 4,
      title: 'قانون الأسرة الجزائري',
      description: 'ينظم أحكام الزواج والطلاق والميراث وحقوق الطفل',
      category: 'family',
      lastUpdated: '2023-11-10',
      articles: 222,
      isPopular: false
    },
    {
      id: 5,
      title: 'القانون التجاري',
      description: 'ينظم الأنشطة التجارية والشركات التجارية والعمليات المصرفية',
      category: 'commercial',
      lastUpdated: '2024-01-05',
      articles: 563,
      isPopular: false
    },
    {
      id: 6,
      title: 'قانون الإجراءات الجزائية',
      description: 'ينظم الإجراءات المتبعة في القضايا الجزائية من التحقيق إلى المحاكمة',
      category: 'criminal',
      lastUpdated: '2023-12-15',
      articles: 743,
      isPopular: true
    }
  ];

  const filteredLaws = laws.filter(law => {
    const matchesCategory = selectedCategory === 'all' || law.category === selectedCategory;
    const matchesSearch = law.title.includes(searchTerm) || law.description.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <PageHeader
        title="القوانين الأساسية"
        subtitle="مجموعة شاملة من القوانين الجزائرية مبسطة ومنظمة"
        icon={Book}
        backgroundGradient
      >
        <AppButton variant="secondary" icon={Download}>
          تحميل دليل القوانين
        </AppButton>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="ابحث في القوانين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
                />
              </div>
            </div>
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                selectedCategory === category.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <div className="font-medium text-sm mb-1">{category.name}</div>
              <div className="text-xs text-gray-500">{category.count} قانون</div>
            </button>
          ))}
        </div>

        {/* Laws Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLaws.map(law => (
            <InfoCard
              key={law.id}
              title={law.title}
              description={law.description}
              icon={FileText}
              className="hover:border-primary-300"
            >
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Calendar className="h-4 w-4" />
                    <span>آخر تحديث: {law.lastUpdated}</span>
                  </div>
                  {law.isPopular && (
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                      شائع
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-600">
                  {law.articles} مادة قانونية
                </div>
                
                <div className="flex space-x-2 space-x-reverse">
                  <AppButton size="sm" className="flex-1">
                    عرض القانون
                  </AppButton>
                  <AppButton variant="outline" size="sm">
                    تحميل PDF
                  </AppButton>
                </div>
              </div>
            </InfoCard>
          ))}
        </div>

        {filteredLaws.length === 0 && (
          <div className="text-center py-12">
            <Book className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد قوانين مطابقة</h3>
            <p className="text-gray-600">جرب تغيير البحث أو الفئة المحددة</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Laws;
