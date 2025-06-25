
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  backgroundGradient?: boolean;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  backgroundGradient = false,
  children 
}) => {
  return (
    <div className={`${backgroundGradient 
      ? 'bg-gradient-to-l from-primary-600 to-primary-800 text-white' 
      : 'bg-white border-b border-gray-200'
    } py-6 md:py-8 mobile-container`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex items-start space-x-3 md:space-x-4 space-x-reverse">
            {Icon && (
              <div className={`p-2 md:p-3 rounded-lg flex-shrink-0 ${
                backgroundGradient 
                  ? 'bg-white/20' 
                  : 'bg-primary-100 text-primary-600'
              }`}>
                <Icon className="h-6 w-6 md:h-8 md:w-8" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h1 className={`text-2xl md:text-3xl font-bold mobile-text-overflow ${
                backgroundGradient ? 'text-white' : 'text-gray-900'
              }`}>
                {title}
              </h1>
              {subtitle && (
                <p className={`mt-2 text-base md:text-lg mobile-text-overflow ${
                  backgroundGradient ? 'text-primary-100' : 'text-gray-600'
                }`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {children && (
            <div className="flex-shrink-0 w-full lg:w-auto">
              <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-3 lg:space-x-reverse">
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
