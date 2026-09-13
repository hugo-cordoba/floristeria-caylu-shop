import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { siteNavLinks, footerContent } from '@/config/landing.config';
import { siteConfig } from '@/config/site.config';
import { CheckoutProvider } from '@/context/CheckoutContext';
import styles from './Checkout.module.css';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <CheckoutProvider>
      <div className={styles.pageWrapper}>
        <Header
          siteName={siteConfig.name}
          navLinks={siteNavLinks}
          wishlistHref="/account/wishlist"
          cartHref="/cart"
        />
        <main className={styles.main}>{children}</main>
        <Footer siteName={siteConfig.name} navLinks={siteNavLinks} {...footerContent} />
      </div>
    </CheckoutProvider>
  );
}