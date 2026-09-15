'use client';

import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import type { Testimonial, TestimonialsProps } from '@/types/section.types';
import styles from './Testimonials.module.css';

/** Nº mínimo de copias de la lista por pista. Sube dinámicamente si hace falta. */
const MIN_SETS = 2;

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = testimonial.rating ?? 5;

  return (
    <article className={styles.card}>
      <div className={styles.rating} aria-hidden="true">
        <Star size={16} className={styles.starFilled} fill="currentColor" />
        <span className={styles.ratingValue}>{rating}</span>
      </div>

      <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>

      <hr className={styles.divider} />

      <div className={styles.author}>
        <span className={styles.avatar} aria-hidden="true">
          {testimonial.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={testimonial.avatar} alt="" className={styles.avatarImage} />
          ) : (
            getInitials(testimonial.authorName)
          )}
        </span>
        <span className={styles.authorInfo}>
          <span className={styles.authorName}>{testimonial.authorName}</span>
          <span className={styles.authorRole}>{testimonial.authorRole}</span>
        </span>
      </div>
    </article>
  );
}

/**
 * Carrusel de testimonios en bucle infinito (marquee). La pista repite la
 * lista "sets" veces seguidas; la animación CSS solo recorre el ancho de
 * UN set (variable --sets, ver Testimonials.module.css) y al llegar ahí
 * vuelve a 0%, que es visualmente idéntico (el siguiente set es igual al
 * primero) -> no se nota el salto.
 *
 * Antes se usaban siempre 2 copias fijas con translateX(-50%): si la
 * ventana era más ancha que el contenido (fácil con pocos testimonios),
 * hacia el final del recorrido ya no quedaba una tercera copia detrás y
 * se veía hueco vacío. Por eso "sets" se recalcula en cliente según el
 * ancho real de la pista y del contenedor, y sube hasta que siempre haya
 * tarjetas de sobra detrás, sin importar cuántos testimonios haya ni lo
 * ancha que sea la pantalla.
 */
export default function Testimonials({ title, testimonials }: TestimonialsProps) {
  const reversedTestimonials = [...(testimonials ?? [])].reverse();

  const [sets, setSets] = useState(3);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    function recalcSets() {
      const marquee = marqueeRef.current;
      const track = trackRef.current;
      if (!marquee || !track) return;

      const singleSetWidth = track.scrollWidth / sets;
      if (!singleSetWidth) return;

      // +2 de margen: cubre redondeo de subpíxeles y deja siempre un set
      // entero de sobra detrás, aunque el usuario redimensione la ventana.
      const needed = Math.max(MIN_SETS, Math.ceil(marquee.clientWidth / singleSetWidth) + 2);
      if (needed !== sets) setSets(needed);
    }

    recalcSets();
    window.addEventListener('resize', recalcSets);
    return () => window.removeEventListener('resize', recalcSets);
  }, [sets, testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const loopItems = Array.from({ length: sets }, () => testimonials).flat();
  const loopItemsReverse = Array.from({ length: sets }, () => reversedTestimonials).flat();
  const trackStyle = { '--sets': sets } as React.CSSProperties;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      {/* Lista real para lectores de pantalla y SEO: las pistas animadas de
          abajo duplican el contenido para el loop, así que se marcan
          aria-hidden para no leerse dos veces. */}
      <ul className={styles.srOnly}>
        {testimonials.map((testimonial, index) => (
          <li key={index}>
            {testimonial.authorName}, {testimonial.authorRole}: &ldquo;{testimonial.quote}&rdquo;
          </li>
        ))}
      </ul>

      <div className={styles.rows}>
        <div className={styles.marquee} ref={marqueeRef}>
          <div className={styles.track} style={trackStyle} ref={trackRef} aria-hidden="true">
            {loopItems.map((testimonial, index) => (
              <TestimonialCard key={`fwd-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        <div className={styles.marquee}>
          <div className={`${styles.track} ${styles.trackReverse}`} style={trackStyle} aria-hidden="true">
            {loopItemsReverse.map((testimonial, index) => (
              <TestimonialCard key={`rev-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}