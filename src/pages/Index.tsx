
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Gavel, HelpCircle, FileText, MessageSquare, Users, Inbox, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import InfoCard from '@/components/custom/InfoCard';
import AppButton from '@/components/custom/AppButton';

const Index = () => {
  const stats = [
    { label: 'القوانين المتاحة', value: '150+', icon: Book },
    { label: 'الإجراءات القانونية', value: '75+', icon: Gavel },
    { label: 'المقالات المنشورة', value: '200+', icon: FileText },
    { label: 'المراكز القانونية', value: '500+', icon: Users },
  ];

  const features = [
    {
      title: 'القوانين الأساسية',
      description: 'مجموعة شاملة من القوانين الجزائرية مبسطة ومنظمة بطريقة سهلة الفهم',
      icon: Book,
      link: '/laws',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'الإجراءات القانونية',
      description: 'دليل خطوة بخطوة للإجراءات القانونية الشائعة في الجزائر',
      icon: Gavel,
      link: '/procedures',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'المنتدى القانوني',
      description: 'مساحة للنقاش وتبادل الخبرات القانونية مع المختصين والمهتمين',
      icon: MessageSquare,
      link: '/forum',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'المكتبة القانونية',
      description: 'مجموعة من الكتب والمراجع القانونية المتاحة للتحميل مجاناً',
      icon: Inbox,
      link: '/library',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'الأسئلة الشائعة',
      description: 'إجابات مفصلة على أكثر الأسئلة القانونية شيوعاً',
      icon: HelpCircle,
      link: '/faq',
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'مراكز قانونية',
      description: 'دليل شامل للمحامين والمحاكم والمؤسسات القانونية في الجزائر',
      icon: Users,
      link: '/centers',
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto mobile-container py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 mobile-text-overflow">
              الموسوعة القانونية الجزائرية الذكية
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-100 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed mobile-text-overflow">
              منصة قانونية ذكية تقدم محتوى قانوني مبسط ودقيق للمواطن الجزائري
              مع إمكانية المساهمة المجتمعية والتفاعل الاجتماعي
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 md:mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن قانون، إجراء، أو موضوع قانوني..."
                  className="w-full px-4 md:px-6 py-3 md:py-4 pr-12 md:pr-12 text-gray-900 rounded-full border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 rtl-input text-base"
                />
                <button className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                  <Search className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <AppButton 
                variant="secondary" 
                size="lg"
                onClick={() => window.location.href = '/laws'}
                className="w-full sm:w-auto"
              >
                استكشف القوانين
              </AppButton>
              <AppButton 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600 w-full sm:w-auto"
                onClick={() => window.location.href = '/procedures'}
              >
                تعلم الإجراءات
              </AppButton>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto mobile-container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              أرقام ومؤشرات المنصة
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              إحصائيات حديثة عن محتوى المنصة ونشاط المستخدمين
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 mobile-grid-gap">
            {stats.map((stat, index) => (
              <InfoCard
                key={index}
                title={stat.label}
                value={stat.value}
                icon={stat.icon}
                className="text-center"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto mobile-container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              خدمات المنصة
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              اكتشف مجموعة شاملة من الخدمات القانونية المصممة لتلبية احتياجاتك
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mobile-grid-gap">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link 
                  key={index}
                  to={feature.link}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-md mobile-card hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full">
                    <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                      <Icon className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors mobile-text-overflow">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mobile-text-responsive mobile-text-overflow">
                      {feature.description}
                    </p>
                    <div className="mt-4 md:mt-6">
                      <span className="text-primary-600 font-medium group-hover:underline mobile-text-responsive">
                        اكتشف المزيد ←
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center mobile-container">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            انضم إلى مجتمع الموسوعة القانونية
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-6 md:mb-8 leading-relaxed">
            ساهم في بناء أكبر مكتبة قانونية عربية، شارك معرفتك، واستفد من خبرات الآخرين
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <AppButton 
              variant="secondary" 
              size="lg"
              onClick={() => window.location.href = '/auth'}
              className="w-full sm:w-auto"
            >
              إنشاء حساب جديد
            </AppButton>
            <AppButton 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-600 w-full sm:w-auto"
              onClick={() => window.location.href = '/forum'}
            >
              انضم للمنتدى
            </AppButton>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
