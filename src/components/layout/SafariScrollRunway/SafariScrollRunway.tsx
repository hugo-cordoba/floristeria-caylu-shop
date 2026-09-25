// src/components/layout/SafariScrollRunway/SafariScrollRunway.tsx
'use client';

import { useEffect } from 'react';

/**
 * iOS 26 Safari (Liquid Glass) muestra el color de fallback del root detras
 * de la barra de estado cuando scrollY = 0. Arrancar con un scroll pequeno
 * y no nulo hace que Safari componga pixeles reales de la pagina en su lugar.
 * El margin-top de .safari-runway y este scroll se cancelan visualmente.
 */
export default function SafariScrollRunway() {
  useEffect(() => {
    const offset =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--safari-runway-offset'),
      ) || 0;

    if (!offset) return;
    if (!window.matchMedia('(max-width: 760px)').matches) return;

    if (window.scrollY < offset) {
      window.scrollTo({ top: offset, left: 0, behavior: 'instant' });
    }
  }, []);

  return null;
}
