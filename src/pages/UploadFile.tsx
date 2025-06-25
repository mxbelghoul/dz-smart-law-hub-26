
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import AppButton from '@/components/custom/AppButton';
import { Upload, FileText, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UploadFile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [audience, setAudience] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const categories = [
    'كتب قانونية',
    'الجريدة الرسمية',
    'مذكرات وأطروحات',
    'أبحاث قانونية',
    'أحكام قضائية',
    'دلائل إجرائية',
    'قوانين ومراسيم'
  ];

  const audiences = [
    'طلبة القانون',
    'الباحثون',
    'المحامون',
    'القضاة',
    'المواطنون',
    'جميع المستخدمين'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: "نوع ملف غير مدعوم",
          description: "يرجى رفع ملفات PDF فقط",
          variant: "destructive"
        });
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
        toast({
          title: "حجم الملف كبير جداً",
          description: "يجب أن يكون حجم الملف أقل من 10 ميجابايت",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !category || !audience || !file) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول ورفع ملف PDF",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // محاكاة رفع الملف
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // محاكاة رابط الملف
      const mockFileUrl = `https://library.legal-encyclopedia.dz/files/${Date.now()}-${file.name}`;
      setFileUrl(mockFileUrl);
      setUploadSuccess(true);
      
      toast({
        title: "تم رفع الملف بنجاح!",
        description: "الملف متاح الآن في المكتبة القانونية",
      });
      
    } catch (error) {
      toast({
        title: "خطأ في الرفع",
        description: "حدث خطأ أثناء رفع الملف. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const copyFileUrl = () => {
    navigator.clipboard.writeText(fileUrl);
    toast({
      title: "تم نسخ الرابط",
      description: "تم نسخ رابط الملف إلى الحافظة",
    });
  };

  if (uploadSuccess) {
    return (
      <Layout>
        <PageHeader
          title="تم الرفع بنجاح"
          subtitle="الملف متاح الآن في المكتبة القانونية"
          icon={FileText}
          backgroundGradient={true}
        />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <InfoCard className="text-center">
            <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{description}</p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">رابط الملف:</p>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="text"
                    value={fileUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded text-sm"
                  />
                  <AppButton
                    size="sm"
                    onClick={copyFileUrl}
                    icon={LinkIcon}
                  >
                    نسخ
                  </AppButton>
                </div>
              </div>
              
              <div className="flex space-x-4 space-x-reverse">
                <AppButton
                  onClick={() => navigate('/library')}
                  className="flex-1"
                >
                  عرض في المكتبة
                </AppButton>
                <AppButton
                  variant="outline"
                  onClick={() => {
                    setUploadSuccess(false);
                    setTitle('');
                    setDescription('');
                    setCategory('');
                    setAudience('');
                    setFile(null);
                    setFileUrl('');
                  }}
                  className="flex-1"
                >
                  رفع ملف آخر
                </AppButton>
              </div>
            </div>
          </InfoCard>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="رفع ملف جديد"
        subtitle="شارك المراجع والوثائق القانونية مع المجتمع"
        icon={Upload}
        backgroundGradient={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InfoCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* عنوان الملف */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                عنوان الملف *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="اكتب عنواناً واضحاً للملف..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
              />
            </div>

            {/* وصف الملف */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                وصف الملف *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب وصفاً مختصراً عن محتوى الملف..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
              />
            </div>

            {/* التصنيف والفئة المستهدفة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="">اختر التصنيف</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة المستهدفة *
                </label>
                <select
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
                >
                  <option value="">اختر الفئة المستهدفة</option>
                  {audiences.map((aud) => (
                    <option key={aud} value={aud}>{aud}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* رفع الملف */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                ملف PDF *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
                <input
                  type="file"
                  id="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file" className="cursor-pointer">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    {file ? (
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} ميجابايت</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">اضغط لاختيار ملف PDF أو اسحبه هنا</p>
                        <p className="text-xs text-gray-500 mt-1">الحد الأقصى: 10 ميجابايت</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* ملاحظة مهمة */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                📝 شروط النشر
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• يجب أن يكون المحتوى قانونياً ومناسباً</li>
                <li>• لا يحتوي على معلومات شخصية حساسة</li>
                <li>• لن تتمكن من تعديل أو حذف الملف بعد الرفع</li>
                <li>• سيتم مراجعة الملف قبل النشر</li>
              </ul>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex space-x-4 space-x-reverse pt-4">
              <AppButton
                type="submit"
                disabled={isUploading}
                icon={Upload}
                className="flex-1 md:flex-none"
              >
                {isUploading ? 'جاري الرفع...' : 'رفع الملف'}
              </AppButton>
              
              <AppButton
                type="button"
                variant="outline"
                onClick={() => navigate('/library')}
                className="flex-1 md:flex-none"
              >
                إلغاء
              </AppButton>
            </div>
          </form>
        </InfoCard>
      </div>
    </Layout>
  );
};

export default UploadFile;
