
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'استفسار عام'
  });

  const contactTypes = [
    'استفسار عام',
    'استشارة قانونية',
    'تقرير خطأ',
    'اقتراح تحسين',
    'شراكة',
    'إعلام',
    'شكوى'
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'الهاتف',
      details: ['+213 21 123 456', '+213 21 789 012'],
      description: 'متاح من السبت إلى الخميس 8:00 - 17:00'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: ['info@legal-encyclopedia.dz', 'support@legal-encyclopedia.dz'],
      description: 'نرد على جميع الرسائل خلال 24 ساعة'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      details: ['شارع ديدوش مراد، الجزائر العاصمة', 'الجزائر 16000'],
      description: 'مفتوح للزيارات بموعد مسبق'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      details: ['السبت - الخميس: 8:00 - 17:00', 'الجمعة: مغلق'],
      description: 'خدمة العملاء متاحة طوال أيام العمل'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      type: 'استفسار عام'
    });
  };

  return (
    <Layout>
      <PageHeader
        title="اتصل بنا"
        subtitle="نحن هنا لمساعدتك. تواصل معنا لأي استفسارات أو اقتراحات"
        icon={Phone}
        backgroundGradient={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <InfoCard>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">أرسل لنا رسالة</h3>
                <p className="text-gray-600">
                  املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      نوع الاستفسار
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {contactTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      الموضوع *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="موضوع الرسالة"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    الرسالة *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <Send className="h-5 w-5" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            </InfoCard>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <InfoCard key={index}>
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="bg-primary-100 text-primary-600 p-3 rounded-lg flex-shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h4>
                      
                      <div className="space-y-1 mb-3">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 font-medium">
                            {detail}
                          </p>
                        ))}
                      </div>
                      
                      <p className="text-gray-500 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </InfoCard>
              );
            })}
            
            {/* FAQ Link */}
            <InfoCard className="bg-primary-50 border-primary-200">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  الأسئلة الشائعة
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  قد تجد إجابة سؤالك في قسم الأسئلة الشائعة
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  تصفح الأسئلة الشائعة ←
                </button>
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
