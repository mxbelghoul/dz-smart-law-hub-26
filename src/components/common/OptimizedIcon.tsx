
import React, { Suspense, lazy, memo } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

// Fallback component for loading state
const IconFallback = ({ size = 24 }: { size?: number }) => (
  <div 
    className="animate-pulse bg-gray-200 rounded"
    style={{ width: size, height: size }}
    aria-hidden="true"
  />
);

// Most commonly used icons that should be preloaded
const CRITICAL_ICONS = [
  'menu',
  'x',
  'search',
  'user',
  'home',
  'book-open',
  'users',
  'phone',
  'mail',
  'map-pin'
] as const;

// Cache for loaded icons to prevent re-importing
const iconCache = new Map<string, React.ComponentType<LucideProps>>();

interface OptimizedIconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
  fallbackSize?: number;
  critical?: boolean;
}

// Helper function to convert size to number
const getSizeAsNumber = (size?: string | number, fallback: number = 24): number => {
  if (typeof size === 'number') return size;
  if (typeof size === 'string') {
    const parsed = parseInt(size, 10);
    return isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};

const OptimizedIcon: React.FC<OptimizedIconProps> = memo(({ 
  name, 
  fallbackSize, 
  critical = false,
  ...props 
}) => {
  // Check if icon is in cache first
  if (iconCache.has(name)) {
    const CachedIcon = iconCache.get(name)!;
    return <CachedIcon {...props} />;
  }

  // Convert size to number for fallback component
  const numericSize = getSizeAsNumber(fallbackSize || props.size);

  // For critical icons, load immediately without lazy loading
  if (critical || CRITICAL_ICONS.includes(name as any)) {
    const IconComponent = lazy(async () => {
      const module = await dynamicIconImports[name]();
      iconCache.set(name, module.default);
      return module;
    });

    return (
      <Suspense fallback={<IconFallback size={numericSize} />}>
        <IconComponent {...props} />
      </Suspense>
    );
  }

  // For non-critical icons, use lazy loading with intersection observer
  const LazyIcon = lazy(async () => {
    const module = await dynamicIconImports[name]();
    iconCache.set(name, module.default);
    return module;
  });

  return (
    <Suspense fallback={<IconFallback size={numericSize} />}>
      <LazyIcon {...props} />
    </Suspense>
  );
});

OptimizedIcon.displayName = 'OptimizedIcon';

export default OptimizedIcon;
