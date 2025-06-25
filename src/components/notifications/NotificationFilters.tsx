
import React from 'react';

interface NotificationFiltersProps {
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  filters,
  selectedFilter,
  onFilterChange,
  unreadCount,
  onMarkAllAsRead
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === filter
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {unreadCount > 0 && (
        <button
          onClick={onMarkAllAsRead}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm whitespace-nowrap"
        >
          تحديد الكل كمقروء
        </button>
      )}
    </div>
  );
};

export default NotificationFilters;
