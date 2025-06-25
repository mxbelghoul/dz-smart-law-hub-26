
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/custom/PageHeader';
import InfoCard from '@/components/custom/InfoCard';
import { Users, MapPin, Phone, Mail, Search, Filter } from 'lucide-react';

const Centers = () => {
  const [selectedWilaya, setSelectedWilaya] = useState('جميع الولايات');
  const [selectedType, setSelectedType] = useState('جميع الأنواع');

  const wilayas = [
    'جميع الولايات', 'الجزائر', 'وهران', 'قسنطينة', 'عنابة', 'البليدة', 'باتنة',
    'سطيف', 'سيدي بلعباس', 'بسكرة', 'تلمسان'
  ];

  const centerTypes = [
    'جميع الأنواع', 'محكمة', 'محامي', 'موثق', 'قاضي', 'مكتب عدل', 'استشارات قانونية'
  ];

  const legalCenters = [
    {
      id: 1,
      name: 'محكمة الجزائر العليا',
      type: 'محكمة',
      address: 'الجزائر العاصمة، الجزائر',
      wilaya: 'الجزائر',
      phone: '+213 21 123 456',
      email: 'contact@supreme-court.dz',
      specialties: ['القانون المدني', 'القانون الجزائي', 'القانون الإداري'],
      rating: 4.8,
      workingHours: 'الأحد - الخميس: 8:00 - 16:00'
    },
    {
      id: 2,
      name: 'مكتب المحامي أحمد بن علي',
      type: 'محامي',
      address: 'وهران، الجزائر',
      wilaya: 'وهران',
      phone: '+213 41 789 123',
      email: 'ahmed.benali@lawyer.dz',
      specialties: ['قانون الأسرة', 'القانون التجاري'],
      rating: 4.5,
      workingHours: 'السبت - الخميس: 9:00 - 17:00'
    },
    {
      id: 3,
      name: 'مكتب التوثيق العقاري',
      type: 'موثق',
      address: 'قسنطينة، الجزائر',
      wilaya: 'قسنطينة',
      phone: '+213 31 456 789',
      email: 'notary@constantine.dz',
      specialties: ['العقارات', 'المواريث', 'الشركات'],
      rating: 4.3,
      workingHours: 'الأحد - الخميس: 8:30 - 16:30'
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="مراكز قانونية"
        subtitle="دليل شامل للمحاكم والمحامين والموثقين في جميع أنحاء الجزائر"
        icon={Users}
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
                placeholder="البحث عن مركز قانوني..."
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            {/* Wilaya Filter */}
            <select
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {wilayas.map((wilaya) => (
                <option key={wilaya} value={wilaya}>{wilaya}</option>
              ))}
            </select>
            
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {centerTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <button className="flex items-center space-x-2 space-x-reverse text-primary-600 hover:text-primary-700">
              <Filter className="h-4 w-4" />
              <span>فلاتر متقدمة</span>
            </button>
            
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              إضافة مركز جديد +
            </button>
          </div>
        </div>

        {/* Legal Centers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalCenters.map((center) => (
            <InfoCard key={center.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {center.name}
                    </h3>
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                      {center.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{center.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{center.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{center.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{center.email}</span>
                  </div>
                </div>
                
                {/* Specialties */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">التخصصات:</h4>
                  <div className="flex flex-wrap gap-1">
                    {center.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Working Hours */}
                <div className="text-xs text-gray-500 border-t pt-3">
                  ساعات العمل: {center.workingHours}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2 space-x-reverse pt-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded text-sm hover:bg-primary-700 transition-colors">
                    عرض التفاصيل
                  </button>
                  <button className="flex-1 border border-primary-600 text-primary-600 py-2 px-4 rounded text-sm hover:bg-primary-50 transition-colors">
                    اتصال
                  </button>
                </div>
              </div>
            </InfoCard>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            عرض المزيد من المراكز
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Centers;
