
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
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 ${
        onClick ? 'cursor-pointer hover-scale' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {title && (
            <div className="flex items-center space-x-3 space-x-reverse mb-2">
              {Icon && (
                <div className="p-2 bg-primary-100 text-primary-600 rounded-md">
                  <Icon className="h-5 w-5" />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
          )}
          
          {value && (
            <div className="mb-2">
              <span className="text-2xl font-bold text-gray-900">{value}</span>
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
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
