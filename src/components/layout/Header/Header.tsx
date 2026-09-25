// src/components/layout/Header/Header.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User } from 'lucide-react';
import type { NavLink } from '@/types/section.types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import AuthSidebar from '@/components/auth/AuthSidebar/AuthSidebar';
import CartSidebar from '@/components/cart/CartSidebar/CartSidebar';
import SearchDropdown from '@/components/product/SearchDropdown/SearchDropdown';
import styles from './Header.module.css';
import { usePathname } from 'next/navigation';
import { useDelayedUnmount } from '@/hooks/use-delayed-unmount';

interface HeaderProps {
  siteName: string;
  siteNameFull?: string;
  navLinks?: NavLink[];
  searchLabel?: string;
  loginLabel?: string;
  wishlistHref?: string;
  wishlistLabel?: string;
  cartHref?: string;
  cartLabel?: string;
  cartCount?: number;
  minimal?: boolean;
}

export default function Header({
  siteName,
  siteNameFull = siteName,
  navLinks = [],
  searchLabel = 'Buscar',
  loginLabel = 'Iniciar sesión',
  wishlistHref = '#',
  wishlistLabel = 'Wishlist',
  cartLabel = 'Cesta',
  cartCount,
  minimal = false,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();
  const { user, hydrated: authHydrated } = useAuth();
  const displayCartCount = cartCount ?? itemCount;
  const prevCartCountRef = useRef(displayCartCount);
  const prevWishlistCountRef = useRef(wishlistItemCount);
  const [cartBump, setCartBump] = useState(false);
  const [wishlistBump, setWishlistBump] = useState(false);
  const pathname = usePathname();
  const isSearchPage = pathname === '/search';
  const anyPanelOpen = searchOpen || authOpen || cartOpen;
  const showMenuOverlay = useDelayedUnmount(menuOpen, 500);

  useEffect(() => {
    if (displayCartCount > prevCartCountRef.current) setCartBump(true);
    prevCartCountRef.current = displayCartCount;
  }, [displayCartCount]);

  useEffect(() => {
    if (wishlistItemCount > prevWishlistCountRef.current) setWishlistBump(true);
    prevWishlistCountRef.current = wishlistItemCount;
  }, [wishlistItemCount]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen || authOpen || searchOpen || cartOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen, authOpen, searchOpen, cartOpen]);

  useEffect(() => {
    if (!menuOpen && !authOpen && !searchOpen && !cartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setAuthOpen(false);
        setSearchOpen(false);
        setCartOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, authOpen, searchOpen, cartOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('authRequired') === '1' || params.has('callbackUrl')) {
      setAuthOpen(true);
      params.delete('authRequired');
      const nextSearch = params.toString();
      window.history.replaceState({}, '', window.location.pathname + (nextSearch ? `?${nextSearch}` : ''));
    }
  }, []);

  function openAuth() {
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    setAuthOpen(true);
  }

  function openCart() {
    setMenuOpen(false);
    setAuthOpen(false);
    setSearchOpen(false);
    setCartOpen(true);
  }

  function toggleSearch() {
    if (isSearchPage) return;
    setMenuOpen(false);
    setAuthOpen(false);
    setCartOpen(false);
    setSearchOpen((open) => !open);
  }

  function handleWishlistClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!user && authHydrated) {
      e.preventDefault();
      openAuth();
    }
  }

  if (minimal) {
    return (
      <header className={`${styles.header} ${styles.headerMinimal}`}>
        <div className={styles.bar}>
          <span />
          <Link href="/" className={styles.logo}>
            <span className={styles.hideOnMobile}>{siteNameFull}</span>
            <span className={styles.mobileOnly}>{siteName}</span>
          </Link>
          <span />
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <div className={styles.side}>
          <button
            type="button"
            className={styles.menuButton}
            data-open={menuOpen}
            onClick={() => {
              setAuthOpen(false);
              setSearchOpen(false);
              setCartOpen(false);
              setMenuOpen((open) => !open);
            }}
            aria-expanded={menuOpen}
            aria-controls="site-sidebar"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className={styles.menuIcon} />
          </button>

          <button
            type="button"
            onClick={toggleSearch}
            className={`${styles.iconButton} ${styles.mobileOnly} ${isSearchPage && !anyPanelOpen ? styles.actionButtonActive : ''}`}
            aria-expanded={searchOpen}
            aria-controls="search-dropdown"
            aria-label={searchLabel}
          >
            <Search size={20} aria-hidden="true" />
          </button>
        </div>

        <Link href="/" className={styles.logo}>
          <span className={styles.hideOnMobile}>{siteNameFull}</span>
          <span className={styles.mobileOnly}>{siteName}</span>
        </Link>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={toggleSearch}
            className={`${styles.actionButton} ${styles.hideOnMobile} ${isSearchPage && !anyPanelOpen ? styles.actionButtonActive : ''}`}
            aria-expanded={searchOpen}
            aria-controls="search-dropdown"
            aria-current={isSearchPage && !anyPanelOpen ? 'page' : undefined}
          >
            {searchLabel}
          </button>

          {authHydrated && user ? (
            <Link
              href="/account"
              className={styles.actionLink}
              aria-current={pathname === '/account' && !anyPanelOpen ? 'page' : undefined}
              aria-label={user.fullName.split(' ')[0]}
            >
              <User size={20} className={styles.mobileOnly} aria-hidden="true" />
              <span className={styles.hideOnMobile}>{user.fullName.split(' ')[0]}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={openAuth}
              className={styles.actionButton}
              aria-expanded={authOpen}
              aria-label={loginLabel}
            >
              <User size={20} className={styles.mobileOnly} aria-hidden="true" />
              <span className={styles.hideOnMobile}>{loginLabel}</span>
            </button>
          )}

          <Link
            href={wishlistHref}
            className={`${styles.actionLink} ${styles.hideOnMobile} ${wishlistBump ? styles.bump : ''}`}
            onClick={handleWishlistClick}
            onAnimationEnd={() => setWishlistBump(false)}
            aria-current={pathname === wishlistHref && !anyPanelOpen ? 'page' : undefined}
          >
            {wishlistLabel} ({wishlistItemCount})
          </Link>

          <button
            type="button"
            onClick={openCart}
            className={`${styles.actionLink} ${styles.cartTrigger} ${cartBump ? styles.bump : ''}`}
            onAnimationEnd={() => setCartBump(false)}
            aria-expanded={cartOpen}
            aria-label={`${cartLabel} (${displayCartCount})`}
          >
            <span className={`${styles.iconWrapper} ${styles.mobileOnly}`}>
              <ShoppingBag size={20} aria-hidden="true" />
              {displayCartCount > 0 && <span className={styles.badge}>{displayCartCount}</span>}
            </span>
            <span className={styles.hideOnMobile}>
              {cartLabel} ({displayCartCount})
            </span>
          </button>
        </div>
      </div>

      {!isSearchPage && <SearchDropdown isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}

      {showMenuOverlay && (
        <div className={styles.overlay} data-open={menuOpen} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <aside id="site-sidebar" className={styles.sidebar} data-open={menuOpen} aria-hidden={!menuOpen}>
        <nav>
          <ul className={styles.sidebarList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          {authHydrated && user ? (
            <a href="/account" onClick={() => setMenuOpen(false)}>
              {user.fullName.split(' ')[0]}
            </a>
          ) : (
            <button type="button" className={styles.sidebarLogout} onClick={openAuth}>
              {loginLabel}
            </button>
          )}

          <a
            href={wishlistHref}
            onClick={(e) => {
              handleWishlistClick(e);
              if (user || !authHydrated) {
                setMenuOpen(false);
              }
            }}
          >
            {wishlistLabel} ({wishlistItemCount})
          </a>
        </div>
      </aside>

      <AuthSidebar isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}