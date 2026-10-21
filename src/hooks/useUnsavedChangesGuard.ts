import { useCallback, useEffect, useRef } from 'react';
import { useBlocker } from 'react-router-dom';

export interface UnsavedChangesGuard {
  /**
   * Declares the changes as saved, so the navigation the app triggers right
   * after saving is not blocked by the guard itself.
   */
  markClean: () => void;
}

/**
 * Warns before leaving the page with changes that are not saved yet. It covers
 * the links of the app, the back/forward buttons of the browser and closing or
 * reloading the tab.
 */
export const useUnsavedChangesGuard = (
  when: boolean,
  message: string,
): UnsavedChangesGuard => {
  // The blocker is evaluated while the navigation happens, so it has to read
  // the current value instead of the one captured when it was created.
  const pendingRef = useRef(when);
  pendingRef.current = when;

  const blocker = useBlocker(() => pendingRef.current);

  const markClean = useCallback(() => {
    pendingRef.current = false;
  }, []);

  useEffect(() => {
    if (blocker.state !== 'blocked') return;

    if (window.confirm(message)) {
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker, message]);

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [when]);

  return { markClean };
};
