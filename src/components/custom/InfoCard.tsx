
import React from 'react';

interface InfoCardProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  value?: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon: Icon,
  value,
  trend,
  children,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md border border-gray-200 mobile-card hover:shadow-lg transition-shadow duration-200 ${
        onClick ? 'cursor-pointer hover-scale' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {title && (
            <div className="flex items-center space-x-3 space-x-reverse mb-3">
              {Icon && (
                <div className="p-2 bg-primary-100 text-primary-600 rounded-md flex-shrink-0">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
              )}
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mobile-text-overflow">{title}</h3>
            </div>
          )}
          
          {value && (
            <div className="mb-3">
              <span className="text-xl md:text-2xl font-bold text-gray-900">{value}</span>
              {trend && (
                <span className={`mr-2 text-sm font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
          )}
          
          {description && (
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mobile-text-overflow">{description}</p>
          )}
          
          {children && (
            <div className="mt-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
