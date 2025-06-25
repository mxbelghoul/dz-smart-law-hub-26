
import React from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import { Info, Target, Users, Award, Heart, CheckCircle } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'د. أحمد بن محمد',
      role: 'مدير المشروع والمستشار القانوني',
      image: '/placeholder.svg',
      description: 'دكتوراه في القانون من جامعة الجزائر، خبرة 15 سنة في المجال القانوني'
    },
    {
      name: 'أ. فاطمة الزهراء',
      role: 'محررة المحتوى القانوني',
      image: '/placeholder.svg',
      description: 'أستاذة القانون، متخصصة في قانون الأسرة والقانون المدني'
    },
    {
      name: 'م. محمد صالح',
      role: 'مطور ومصمم المنصة',
      image: '/placeholder.svg',
      description: 'مهندس برمجيات، متخصص في تطوير المنصات الذكية'
    }
  ];

  const achievements = [
    { number: '50,000+', label: 'مستخدم نشط' },
    { number: '5,000+', label: 'مقال قانوني' },
    { number: '1,200+', label: 'استشارة قانونية' },
    { number: '300+', label: 'مركز قانوني مسجل' }
  ];

  const values = [
    {
      icon: CheckCircle,
      title: 'الدقة والموثوقية',
      description: 'نضمن دقة المعلومات القانونية وتحديثها المستمر وفقاً للتشريع الجزائري'
    },
    {
      icon: Users,
      title: 'المشاركة المجتمعية',
      description: 'نشجع التفاعل والمساهمة من جميع أفراد المجتمع لإثراء المحتوى القانوني'
    },
    {
      icon: Heart,
      title: 'الخدمة المجانية',
      description: 'نؤمن بحق الجميع في الوصول للمعلومة القانونية دون قيود مالية'
    },
    {
      icon: Target,
      title: 'التبسيط والوضوح',
      description: 'نسعى لتقديم المحتوى القانوني بطريقة مبسطة ومفهومة للجميع'
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="من نحن"
        subtitle="تعرف على رؤيتنا، مهمتنا، وفريق العمل وراء الموسوعة القانونية الجزائرية الذكية"
        icon={Info}
        backgroundGradient={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mission and Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <InfoCard>
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">رؤيتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                أن نكون المرجع الأول والموثوق للمعلومات القانونية في الجزائر، 
                ونساهم في بناء مجتمع واعٍ قانونياً من خلال تقديم محتوى قانوني 
                مبسط ودقيق يخدم جميع فئات المجتمع الجزائري.
              </p>
            </div>
          </InfoCard>

          <InfoCard>
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">مهمتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                تسهيل وصول المواطن الجزائري للمعلومة القانونية الصحيحة والمحدثة، 
                وتوفير منصة تفاعلية تجمع بين المختصين والمواطنين لتبادل المعرفة 
                القانونية وتقديم الاستشارات والدعم القانوني.
              </p>
            </div>
          </InfoCard>
        </div>

        {/* Achievements */}
        <div className="bg-primary-50 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">إنجازاتنا</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 text-sm">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">قيمنا</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <InfoCard key={index} className="text-center">
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </InfoCard>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">فريق العمل</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <InfoCard key={index} className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {member.name}
                </h4>
                <p className="text-primary-600 font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </InfoCard>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-primary-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">انضم إلينا</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            هل أنت محامٍ، قاضٍ، أو مختص في القانون؟ انضم إلى فريقنا وساهم في 
            إثراء المحتوى القانوني وخدمة المجتمع الجزائري.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              اتصل بنا
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              تطوع معنا
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
