import { useEffect } from 'react';

// Locking scroll via html/body { overflow: hidden } makes Safari drop
// back to scrollY 0 (losing the --safari-scroll-offset runway and
// showing the fallback toolbar color) and it doesn't reliably come back
// once unlocked. Freezing body in place with position:fixed keeps the
// real scrollY intact, so closing a panel restores exactly where the
// page was instead of resetting the Safari chrome to its fallback state.
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    return () => {
      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
