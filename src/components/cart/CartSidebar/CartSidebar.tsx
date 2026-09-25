// src/components/cart/CartSidebar/CartSidebar.tsx
'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartLineItem from '@/components/cart/CartLineItem/CartLineItem';
import { useDelayedUnmount } from '@/hooks/use-delayed-unmount';
import styles from './CartSidebar.module.css';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, itemCount, subtotalFormatted, updateQuantity, removeItem } = useCart();
  const showOverlay = useDelayedUnmount(isOpen, 400);

  return (
    <>
      {showOverlay && (
        <div className={styles.overlay} data-open={isOpen} onClick={onClose} aria-hidden="true" />
      )}

      <aside className={styles.sidebar} data-open={isOpen} aria-hidden={!isOpen}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Tu cesta <span className={styles.count}>({itemCount})</span>
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Todavía no has añadido ningún producto.</p>
            <Link href="/" className={styles.emptyCta} onClick={onClose}>
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {items.map((item) => (
                <CartLineItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.subtotalRow}>
                <span>Subtotal</span>
                <span className={styles.subtotalValue}>{subtotalFormatted}</span>
              </div>
              <p className={styles.note}>Envío e impuestos se calculan en el siguiente paso.</p>

              <Link href="/checkout" className={styles.checkoutButton} onClick={onClose}>
                Tramitar pedido
              </Link>

              <button type="button" className={styles.continueLink} onClick={onClose}>
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}