import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Also scroll document element (needed for some mobile browsers)
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // And body (fallback for older browsers)
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};
