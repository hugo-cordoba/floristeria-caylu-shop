import Image from 'next/image';
import { ArrowRight, Truck } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import { siteConfig } from '@/config/site.config';
import type { HeroProps } from '@/types/section.types';
import styles from './Hero.module.css';

export default function Hero({
  eyebrow,
  title,
  subtitle,
  media,
  ctaLabel,
  ctaHref,
  secondaryInfo,
  mobileTitle,
  mobileCtaLabel,
  navLinks,
}: HeroProps) {
  return (
    <header className={styles.hero}>
      {media.type === 'video' ? (
        <video
          className={styles.media}
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <>
          <Image
            src={media.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className={media.mobileSrc ? `${styles.media} ${styles.mediaDesktop}` : styles.media}
          />
          {media.mobileSrc && (
            <Image
              src={media.mobileSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className={`${styles.media} ${styles.mediaMobile}`}
            />
          )}
        </>
      )}
      <div className={styles.overlay} />

      {navLinks && (
        <nav className={styles.nav}>
          <span className={styles.logo}>{siteConfig.name}</span>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className={styles.content}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {ctaLabel && ctaHref && (
          <div className={styles.cta}>
            <Button href={ctaHref} variant="primary">
              {ctaLabel}
              <ArrowRight aria-hidden="true" className={styles.ctaArrow} size={14} strokeWidth={1.75} />
            </Button>
          </div>
        )}
        {secondaryInfo && (
          <p className={styles.secondaryInfo}>
            <Truck aria-hidden="true" className={styles.secondaryIcon} size={14} strokeWidth={1.5} />
            {secondaryInfo}
          </p>
        )}
      </div>

      {/* Bloque mobile: replica exacta del hero original (texto y diseño previos, sin cambios) */}
      <div className={styles.contentMobile}>
        <p className={styles.titleMobile}>
          {(mobileTitle ?? title).split(' ').map((word, index, words) => (
            <span key={index} className={styles.titleWordMobile}>
              {word}
              {index < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
        {ctaHref && (mobileCtaLabel ?? ctaLabel) && (
          <div className={styles.ctaMobile}>
            <Button href={ctaHref} variant="outline">
              {mobileCtaLabel ?? ctaLabel}
              <ArrowRight aria-hidden="true" className={styles.ctaArrowMobile} size={12} strokeWidth={1.75} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
