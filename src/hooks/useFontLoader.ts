
import { useEffect, useState } from 'react';

export const useFontLoader = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontError, setFontError] = useState(false);

  useEffect(() => {
    // Check if fonts are already loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          // Check if Cairo font is loaded
          const cairoFont = new FontFace('Cairo', 'url(https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-aIhqE4LR5iA.woff2)');
          
          return cairoFont.load();
        })
        .then(() => {
          setFontLoaded(true);
        })
        .catch((error) => {
          console.warn('Font loading failed:', error);
          setFontError(true);
        });
    } else {
      // Fallback for browsers without FontFace API
      const link = document.querySelector('link[href*="cairo"]');
      if (link) {
        link.addEventListener('load', () => setFontLoaded(true));
        link.addEventListener('error', () => setFontError(true));
      }
    }

    // Set a timeout to ensure we don't wait forever
    const timeoutId = setTimeout(() => {
      if (!fontLoaded) {
        setFontError(true);
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [fontLoaded]);

  return { fontLoaded, fontError };
};
