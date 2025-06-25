
import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'جميع الأسئلة', count: 45 },
    { id: 'civil', name: 'القانون المدني', count: 12 },
    { id: 'family', name: 'قانون الأسرة', count: 15 },
    { id: 'business', name: 'القانون التجاري', count: 8 },
    { id: 'criminal', name: 'القانون الجزائي', count: 10 },
  ];

  const faqs = [
    {
      id: 1,
      question: 'ما هي الشروط المطلوبة للزواج في الجزائر؟',
      answer: 'يشترط للزواج في الجزائر: بلوغ سن الرشد (19 سنة للذكر و19 سنة للأنثى)، عدم وجود مانع شرعي أو قانوني، موافقة الولي للمرأة البكر، حضور شاهدين، دفع المهر المتفق عليه. كما يجب توثيق عقد الزواج أمام الموثق أو ضابط الحالة المدنية.',
      category: 'family',
      isPopular: true,
      tags: ['زواج', 'أسرة', 'حالة مدنية']
    },
    {
      id: 2,
      question: 'كيف يمكنني تأسيس شركة في الجزائر؟',
      answer: 'لتأسيس شركة في الجزائر، يجب: اختيار الشكل القانوني المناسب، إعداد عقد التأسيس، إيداع رأس المال، التسجيل في السجل التجاري، الحصول على البطاقة الجبائية، فتح حساب مصرفي للشركة، والتصريح لدى الضمان الاجتماعي.',
      category: 'business',
      isPopular: true,
      tags: ['شركة', 'تجارة', 'استثمار']
    },
    {
      id: 3,
      question: 'ما هي مراحل الطلاق في القانون الجزائري؟',
      answer: 'مراحل الطلاق تشمل: تقديم طلب الطلاق أمام المحكمة، محاولة الصلح من قبل القاضي، تحديد النفقة والحضانة المؤقتة، فترة العدة، إصدار حكم الطلاق النهائي، تسوية المسائل المالية والحضانة.',
      category: 'family',
      isPopular: false,
      tags: ['طلاق', 'أسرة', 'محكمة']
    },
    {
      id: 4,
      question: 'ما هي عقوبة السرقة في القانون الجزائري؟',
      answer: 'عقوبة السرقة تختلف حسب ظروف الجريمة: السرقة البسيطة تعاقب بالحبس من سنة إلى 5 سنوات وغرامة مالية. السرقة الموصوفة (بظروف مشددة) تعاقب بالسجن المؤقت من 5 إلى 10 سنوات. السرقة المقترنة بالعنف قد تصل عقوبتها إلى السجن المؤبد.',
      category: 'criminal',
      isPopular: false,
      tags: ['سرقة', 'عقوبات', 'جريمة']
    },
    {
      id: 5,
      question: 'كيف يتم توزيع الميراث في القانون الجزائري؟',
      answer: 'يتم توزيع الميراث وفقاً لأحكام الشريعة الإسلامية: للذكر مثل حظ الأنثيين في حالة الأبناء، للزوجة الثمن إذا كان هناك أولاد والربع إذا لم يكن هناك أولاد، للزوج النصف إذا لم تكن هناك أولاد والربع إذا كان هناك أولاد، مع مراعاة حقوق الورثة الآخرين.',
      category: 'family',
      isPopular: true,
      tags: ['ميراث', 'أسرة', 'توزيع']
    },
    {
      id: 6,
      question: 'ما هي إجراءات رفع دعوى قضائية؟',
      answer: 'إجراءات رفع الدعوى تشمل: إعداد عريضة افتتاح الدعوى، تحديد المحكمة المختصة، دفع الرسوم القضائية، تقديم المستندات والوثائق المؤيدة، تبليغ الخصم، حضور الجلسات، تقديم المرافعات والدفوع.',
      category: 'civil',
      isPopular: true,
      tags: ['دعوى', 'محكمة', 'إجراءات']
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.includes(searchTerm) || faq.answer.includes(searchTerm) || 
                         faq.tags.some(tag => tag.includes(searchTerm));
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <Layout>
      <PageHeader
        title="الأسئلة الشائعة"
        subtitle="إجابات مفصلة على أكثر الأسئلة القانونية شيوعاً"
        icon={HelpCircle}
        backgroundGradient
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="ابحث في الأسئلة والأجوبة..."
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
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                selectedCategory === category.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <div className="font-medium text-sm mb-1">{category.name}</div>
              <div className="text-xs text-gray-500">{category.count}</div>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map(faq => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3 space-x-reverse flex-1">
                  <div className="p-2 bg-primary-100 text-primary-600 rounded-md">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    {faq.isPopular && (
                      <span className="inline-block mt-1 bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                        سؤال شائع
                      </span>
                    )}
                  </div>
                </div>
                {expandedItems.includes(faq.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {expandedItems.includes(faq.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                    <div className="flex flex-wrap gap-2">
                      {faq.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أسئلة مطابقة</h3>
            <p className="text-gray-600">جرب تغيير البحث أو الفئة المحددة</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-primary-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            لم تجد إجابة لسؤالك؟
          </h3>
          <p className="text-primary-700 mb-4">
            تواصل معنا أو اطرح سؤالك في المنتدى القانوني
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              اتصل بنا
            </button>
            <button 
              onClick={() => window.location.href = '/forum'}
              className="border border-primary-600 text-primary-600 px-6 py-2 rounded-md hover:bg-primary-50 transition-colors"
            >
              المنتدى القانوني
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
