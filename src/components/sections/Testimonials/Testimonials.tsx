import { Star } from 'lucide-react';
import type { Testimonial, TestimonialsProps } from '@/types/section.types';
import styles from './Testimonials.module.css';

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
            // Avatar externo (ej. foto de perfil de Google): se usa <img>
            // en vez de next/image porque el dominio de origen no es
            // predecible de antemano (no se puede whitelistar en
            // next.config.mjs como se hace con placehold.co).
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
 * Carrusel de testimonios en bucle infinito (marquee), sin librerías
 * externas: una pista con la lista duplicada se desplaza con una
 * animación CSS de 0% a -50%, así el final enlaza con el principio sin
 * salto visible. Se pausa al pasar el ratón por encima (ver
 * Testimonials.module.css).
 *
 * `testimonials` es un array de datos simple (quote/autor/rating/avatar
 * opcional) para poder alimentarlo con reseñas reales de Google en el
 * futuro (via Google Places API / Business Profile API) sin tocar este
 * componente -- hoy mismo puedes rellenarlo a mano en landing.config.ts.
 */
export default function Testimonials({ title, testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  const loopItems = [...testimonials, ...testimonials];
  // Segunda fila con el orden invertido y girando en sentido contrario,
  // para que no sea un simple espejo de la primera.
  const reversedTestimonials = [...testimonials].reverse();
  const loopItemsReverse = [...reversedTestimonials, ...reversedTestimonials];

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
        <div className={styles.marquee}>
          <div className={styles.track} aria-hidden="true">
            {loopItems.map((testimonial, index) => (
              <TestimonialCard key={`fwd-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        <div className={styles.marquee}>
          <div className={`${styles.track} ${styles.trackReverse}`} aria-hidden="true">
            {loopItemsReverse.map((testimonial, index) => (
              <TestimonialCard key={`rev-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
