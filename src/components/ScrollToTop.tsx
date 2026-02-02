import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Evita que el navegador intente "restaurar" el scroll al navegar (muy común en mobile)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollNow = () => {
      // "instant" no es un valor estándar; usamos "auto".
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    // 1) inmediatamente
    scrollNow();
    // 2) en el siguiente frame (por si React re-renderiza y el navegador re-ajusta layout)
    requestAnimationFrame(scrollNow);
    // 3) micro-delay (iOS Safari a veces aplica scroll tras la navegación)
    setTimeout(scrollNow, 0);
  }, [pathname]);

  return null;
};
