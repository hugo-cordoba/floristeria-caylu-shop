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

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
  );
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
export default function Testimonials({ title, testimonials, googleReviewHref }: TestimonialsProps) {
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

      {googleReviewHref && (
        <div className={styles.reviewCta}>
          <a
            href={googleReviewHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.reviewButton}
          >
            <GoogleIcon />
            Deja tu reseña
          </a>
        </div>
      )}
    </section>
  );
}