
import React, { useState } from 'react';
import { Gavel, Search, FileText, Clock, ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import AppButton from '@/components/custom/AppButton';

const Procedures = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'جميع الإجراءات', count: 75 },
    { id: 'civil', name: 'إجراءات مدنية', count: 25 },
    { id: 'family', name: 'إجراءات أسرية', count: 18 },
    { id: 'business', name: 'إجراءات تجارية', count: 15 },
    { id: 'administrative', name: 'إجراءات إدارية', count: 17 },
  ];

  const procedures = [
    {
      id: 1,
      title: 'إجراءات الزواج المدني',
      description: 'الخطوات المطلوبة لإتمام عقد الزواج المدني في الجزائر',
      category: 'family',
      duration: '15-30 يوم',
      difficulty: 'متوسط',
      steps: 8,
      documents: ['بطاقة الهوية', 'شهادة الميلاد', 'شهادة طبية', 'شاهدان'],
      isPopular: true
    },
    {
      id: 2,
      title: 'تأسيس شركة ذات مسؤولية محدودة',
      description: 'الإجراءات القانونية لإنشاء شركة ذات مسؤولية محدودة',
      category: 'business',
      duration: '30-45 يوم',
      difficulty: 'صعب',
      steps: 12,
      documents: ['عقد التأسيس', 'رأس المال', 'السجل التجاري', 'التصريح الضريبي'],
      isPopular: true
    },
    {
      id: 3,
      title: 'إجراءات الطلاق بالتراضي',
      description: 'الخطوات القانونية للطلاق بالتراضي أمام المحكمة',
      category: 'family',
      duration: '60-90 يوم',
      difficulty: 'متوسط',
      steps: 10,
      documents: ['عقد الزواج', 'اتفاق الطلاق', 'بطاقة الهوية', 'شهادة الميلاد'],
      isPopular: false
    },
    {
      id: 4,
      title: 'الحصول على جواز السفر',
      description: 'إجراءات استخراج جواز السفر الجزائري',
      category: 'administrative',
      duration: '15-21 يوم',
      difficulty: 'سهل',
      steps: 6,
      documents: ['بطاقة الهوية', 'شهادة الميلاد', 'صور شمسية', 'وصل الرسوم'],
      isPopular: true
    },
    {
      id: 5,
      title: 'رفع دعوى قضائية مدنية',
      description: 'الإجراءات المطلوبة لرفع دعوى مدنية أمام المحكمة',
      category: 'civil',
      duration: '90-180 يوم',
      difficulty: 'صعب',
      steps: 15,
      documents: ['عريضة الدعوى', 'الوثائق المؤيدة', 'رسوم المحكمة', 'توكيل محامي'],
      isPopular: false
    },
    {
      id: 6,
      title: 'تسجيل علامة تجارية',
      description: 'إجراءات تسجيل وحماية العلامة التجارية',
      category: 'business',
      duration: '6-12 شهر',
      difficulty: 'متوسط',
      steps: 9,
      documents: ['طلب التسجيل', 'العلامة التجارية', 'رسوم التسجيل', 'وكالة قانونية'],
      isPopular: false
    }
  ];

  const filteredProcedures = procedures.filter(procedure => {
    const matchesCategory = selectedCategory === 'all' || procedure.category === selectedCategory;
    const matchesSearch = procedure.title.includes(searchTerm) || procedure.description.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'سهل': return 'bg-green-100 text-green-700';
      case 'متوسط': return 'bg-yellow-100 text-yellow-700';
      case 'صعب': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Layout>
      <PageHeader
        title="الإجراءات القانونية"
        subtitle="دليل خطوة بخطوة للإجراءات القانونية الشائعة في الجزائر"
        icon={Gavel}
        backgroundGradient
      >
        <AppButton variant="secondary" icon={FileText}>
          دليل الإجراءات
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
                  placeholder="ابحث في الإجراءات..."
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

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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
              <div className="text-xs text-gray-500">{category.count} إجراء</div>
            </button>
          ))}
        </div>

        {/* Procedures Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProcedures.map(procedure => (
            <div key={procedure.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="p-2 bg-primary-100 text-primary-600 rounded-md">
                    <Gavel className="h-5 w-5" />
                  </div>
                  {procedure.isPopular && (
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                      شائع
                    </span>
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(procedure.difficulty)}`}>
                  {procedure.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{procedure.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{procedure.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>المدة: {procedure.duration}</span>
                  </div>
                  <span className="text-gray-600">{procedure.steps} خطوة</span>
                </div>

                <div className="text-sm">
                  <div className="text-gray-700 font-medium mb-1">الوثائق المطلوبة:</div>
                  <div className="text-gray-600">
                    {procedure.documents.slice(0, 2).join('، ')}
                    {procedure.documents.length > 2 && ` وأخرى...`}
                  </div>
                </div>
              </div>

              <AppButton className="w-full" icon={ArrowLeft} iconPosition="left">
                ابدأ الإجراء
              </AppButton>
            </div>
          ))}
        </div>

        {filteredProcedures.length === 0 && (
          <div className="text-center py-12">
            <Gavel className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد إجراءات مطابقة</h3>
            <p className="text-gray-600">جرب تغيير البحث أو الفئة المحددة</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Procedures;
