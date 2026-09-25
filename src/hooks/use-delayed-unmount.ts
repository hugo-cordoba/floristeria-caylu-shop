import { useEffect, useState } from 'react';

// iOS 26 Safari samples background-color/backdrop-filter on any
// position:fixed element covering the viewport edges, even at opacity:0.
// Keeping a closed overlay mounted (just invisible) tints the toolbar.
// This unmounts it for real once its CSS opacity transition has finished.
export function useDelayedUnmount(isOpen: boolean, delayMs: number) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      return;
    }
    const timeout = setTimeout(() => setShouldRender(false), delayMs);
    return () => clearTimeout(timeout);
  }, [isOpen, delayMs]);

  return shouldRender;
}
