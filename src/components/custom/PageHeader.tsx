
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
    } py-8 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            {Icon && (
              <div className={`p-3 rounded-lg ${
                backgroundGradient 
                  ? 'bg-white/20' 
                  : 'bg-primary-100 text-primary-600'
              }`}>
                <Icon className="h-8 w-8" />
              </div>
            )}
            <div>
              <h1 className={`text-3xl font-bold ${
                backgroundGradient ? 'text-white' : 'text-gray-900'
              }`}>
                {title}
              </h1>
              {subtitle && (
                <p className={`mt-2 text-lg ${
                  backgroundGradient ? 'text-primary-100' : 'text-gray-600'
                }`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {children && (
            <div className="flex-shrink-0">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
