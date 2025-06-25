
import { useEffect } from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

// Critical icons that should be preloaded on app startup
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
  'map-pin',
  'file-text',
  'message-square',
  'calendar',
  'thumbs-up'
] as const;

export const useIconPreloader = () => {
  useEffect(() => {
    // Preload critical icons in the background
    const preloadIcons = async () => {
      try {
        const preloadPromises = CRITICAL_ICONS.map(async (iconName) => {
          if (iconName in dynamicIconImports) {
            // Use requestIdleCallback if available for better performance
            if ('requestIdleCallback' in window) {
              return new Promise<void>((resolve) => {
                window.requestIdleCallback(async () => {
                  try {
                    await dynamicIconImports[iconName]();
                    resolve();
                  } catch (error) {
                    console.warn(`Failed to preload icon: ${iconName}`, error);
                    resolve();
                  }
                });
              });
            } else {
              // Fallback for browsers without requestIdleCallback
              return dynamicIconImports[iconName]().catch((error) => {
                console.warn(`Failed to preload icon: ${iconName}`, error);
              });
            }
          }
        });

        await Promise.allSettled(preloadPromises);
        console.log('Critical icons preloaded successfully');
      } catch (error) {
        console.warn('Icon preloading failed:', error);
      }
    };

    // Start preloading after a short delay to not block initial render
    const timeoutId = setTimeout(preloadIcons, 100);

    return () => clearTimeout(timeoutId);
  }, []);
};
