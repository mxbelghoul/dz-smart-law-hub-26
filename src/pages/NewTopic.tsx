
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import AppButton from '@/components/custom/AppButton';
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewTopic = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'قانون الأسرة',
    'القانون المدني',
    'القانون الجزائي',
    'القانون التجاري',
    'القانون الإداري',
    'قانون العمل',
    'استشارات قانونية عامة'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // محاكاة إرسال البيانات
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم نشر الموضوع بنجاح!",
        description: "سيتم مراجعة موضوعك وسيظهر في المنتدى قريباً",
      });
      
      navigate('/forum');
    } catch (error) {
      toast({
        title: "خطأ في النشر",
        description: "حدث خطأ أثناء نشر الموضوع. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="موضوع جديد"
        subtitle="شارك سؤالك أو استفسارك القانوني مع المجتمع"
        icon={MessageSquare}
        backgroundGradient={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InfoCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* عنوان الموضوع */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                عنوان الموضوع *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="اكتب عنواناً واضحاً ومختصراً لموضوعك..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
                maxLength={150}
              />
              <p className="text-sm text-gray-500 mt-1">
                {title.length}/150 حرف
              </p>
            </div>

            {/* التصنيف */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                التصنيف *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
              >
                <option value="">اختر التصنيف المناسب</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* محتوى الموضوع */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                محتوى الموضوع *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="اشرح سؤالك أو استفسارك بالتفصيل... يمكنك استخدام Markdown للتنسيق"
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  يدعم تنسيق Markdown للنصوص المنسقة
                </p>
                <p className="text-sm text-gray-500">
                  {content.length} حرف
                </p>
              </div>
            </div>

            {/* ملاحظة مهمة */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                ⚠️ ملاحظة مهمة
              </h4>
              <p className="text-sm text-yellow-700">
                بعد نشر الموضوع، لن تتمكن من تعديله أو حذفه. تأكد من صحة المعلومات قبل النشر.
              </p>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex space-x-4 space-x-reverse pt-4">
              <AppButton
                type="submit"
                disabled={isSubmitting}
                icon={Send}
                className="flex-1 md:flex-none"
              >
                {isSubmitting ? 'جاري النشر...' : 'نشر الموضوع'}
              </AppButton>
              
              <AppButton
                type="button"
                variant="outline"
                onClick={() => navigate('/forum')}
                className="flex-1 md:flex-none"
              >
                إلغاء
              </AppButton>
            </div>
          </form>
        </InfoCard>

        {/* نصائح للكتابة */}
        <InfoCard className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            نصائح لكتابة موضوع فعال
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• استخدم عنواناً واضحاً يصف المشكلة أو السؤال</li>
            <li>• اذكر التفاصيل المهمة والظروف المحيطة بالمسألة</li>
            <li>• حدد الولاية أو المنطقة إذا كان ذلك مهماً</li>
            <li>• تجنب المعلومات الشخصية الحساسة</li>
            <li>• اختر التصنيف المناسب ليسهل على الخبراء العثور على موضوعك</li>
          </ul>
        </InfoCard>
      </div>
    </Layout>
  );
};

export default NewTopic;
