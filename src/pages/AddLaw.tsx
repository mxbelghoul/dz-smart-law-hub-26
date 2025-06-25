
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import AppButton from '@/components/custom/AppButton';
import { BookOpen, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddLaw = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lawName, setLawName] = useState('');
  const [lawType, setLawType] = useState('');
  const [lawText, setLawText] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lawTypes = [
    'القانون المدني',
    'القانون الجزائي',
    'القانون الإداري',
    'القانون التجاري',
    'قانون الأسرة',
    'قانون العمل',
    'القانون الدستوري',
    'قانون البيئة',
    'قانون الاستثمار',
    'قوانين أخرى'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lawName.trim() || !lawType || !lawText.trim()) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // محاكاة إرسال البيانات
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إرسال الاقتراح بنجاح!",
        description: "سيتم مراجعة القانون المقترح من قبل المختصين",
      });
      
      navigate('/laws');
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الاقتراح. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="اقتراح قانون جديد"
        subtitle="ساهم في إثراء المكتبة القانونية باقتراح قوانين جديدة"
        icon={BookOpen}
        backgroundGradient={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InfoCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* اسم القانون */}
            <div>
              <label htmlFor="lawName" className="block text-sm font-medium text-gray-700 mb-2">
                اسم القانون *
              </label>
              <input
                type="text"
                id="lawName"
                value={lawName}
                onChange={(e) => setLawName(e.target.value)}
                placeholder="مثال: قانون حماية البيانات الشخصية"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
              />
            </div>

            {/* نوع القانون وتاريخ الإصدار */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lawType" className="block text-sm font-medium text-gray-700 mb-2">
                  نوع القانون *
                </label>
                <select
                  id="lawType"
                  value={lawType}
                  onChange={(e) => setLawType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
                >
                  <option value="">اختر نوع القانون</option>
                  {lawTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ الإصدار (اختياري)
                </label>
                <input
                  type="date"
                  id="issueDate"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* نص القانون */}
            <div>
              <label htmlFor="lawText" className="block text-sm font-medium text-gray-700 mb-2">
                نص القانون *
              </label>
              <textarea
                id="lawText"
                value={lawText}
                onChange={(e) => setLawText(e.target.value)}
                placeholder="اكتب نص القانون بالتفصيل مع ترقيم المواد..."
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  اكتب المواد القانونية بترقيم واضح
                </p>
                <p className="text-sm text-gray-500">
                  {lawText.length} حرف
                </p>
              </div>
            </div>

            {/* إرشادات الكتابة */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                💡 إرشادات الكتابة
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• ابدأ بديباجة القانون والغرض منه</li>
                <li>• رقّم المواد بوضوح (المادة الأولى، المادة الثانية...)</li>
                <li>• استخدم لغة قانونية واضحة ومفهومة</li>
                <li>• اذكر المراجع والقوانين ذات الصلة</li>
                <li>• أضف مواد التنفيذ وتاريخ السريان</li>
              </ul>
            </div>

            {/* ملاحظة مهمة */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                ⚠️ ملاحظة مهمة
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• هذا اقتراح قانوني وليس قانوناً نافذاً</li>
                <li>• سيخضع للمراجعة من قبل الخبراء القانونيين</li>
                <li>• لن تتمكن من تعديل أو حذف الاقتراح بعد الإرسال</li>
                <li>• سيظهر في قسم "اقتراحات المجتمع" بعد الموافقة</li>
              </ul>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex space-x-4 space-x-reverse pt-4">
              <AppButton
                type="submit"
                disabled={isSubmitting}
                icon={Send}
                className="flex-1 md:flex-none"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الاقتراح'}
              </AppButton>
              
              <AppButton
                type="button"
                variant="outline"
                onClick={() => navigate('/laws')}
                className="flex-1 md:flex-none"
              >
                إلغاء
              </AppButton>
            </div>
          </form>
        </InfoCard>

        {/* نماذج للمساعدة */}
        <InfoCard className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            نموذج لكتابة القانون
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 rtl-content">
            <strong>قانون رقم XX-XX المؤرخ في XX/XX/XXXX المتعلق بـ [موضوع القانون]</strong>
            <br /><br />
            <strong>المادة الأولى:</strong> يهدف هذا القانون إلى...
            <br /><br />
            <strong>المادة الثانية:</strong> يُقصد بالمصطلحات الواردة في هذا القانون...
            <br /><br />
            <strong>المادة الثالثة:</strong> [نص المادة]...
            <br /><br />
            <em>... وهكذا لباقي المواد</em>
          </div>
        </InfoCard>
      </div>
    </Layout>
  );
};

export default AddLaw;
