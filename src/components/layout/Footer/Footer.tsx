import Link from 'next/link';
import type { NavLink } from '@/types/section.types';
import FooterLegalLinks from './FooterLegalLinks';
import styles from './Footer.module.css';

interface FooterProps {
  siteName: string;
  navLinks?: NavLink[];
  email?: string;
}

export default function Footer({ siteName, navLinks = [], email }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <Link href="/" className={styles.brand}>
          {siteName}
        </Link>

        {navLinks.length > 0 && (
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        )}

        {email && (
          <a href={`mailto:${email}`} className={styles.email}>
            {email}
          </a>
        )}
      </div>

      <div className={styles.bottomBar}>
        <p>
          &copy; {new Date().getFullYear()} {siteName}. Todos los derechos reservados.
        </p>
        <FooterLegalLinks />
      </div>
    </footer>
  );
}