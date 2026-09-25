'use client';

import { useLayoutEffect } from 'react';

/**
 * Renders a tiny spacer at the very top of the document and scrolls past
 * it on mount (mobile only). The spacer height and the scroll distance
 * are equal, so the visible layout is unchanged - the only effect is that
 * the page starts at a non-zero scrollY, which is what gets iOS 26 Safari
 * to composite real page pixels behind the top status bar instead of
 * falling back to a sampled color. See --safari-scroll-offset in globals.css.
 *
 * Uses useLayoutEffect (not useEffect) so the scroll happens before the
 * browser paints the first frame - otherwise the page briefly renders at
 * scrollY 0 and then visibly jumps, which looks like the hero image moving.
 */
export default function SafariScrollRunway() {
  useLayoutEffect(() => {
    const offset =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--safari-scroll-offset'),
      ) || 0;

    if (offset > 0 && window.scrollY < offset) {
      window.scrollTo({ top: offset, left: 0, behavior: 'instant' });
    }
  }, []);

  return <div aria-hidden="true" style={{ height: 'var(--safari-scroll-offset)' }} />;
}
