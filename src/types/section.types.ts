import type { CSSProperties } from 'react';
import type { Product } from './product.types';

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  media: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };
  ctaLabel?: string;
  ctaHref?: string;
  navLinks?: NavLink[];
}

export interface SplitIntroProps {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: 'left' | 'right';
  ctaLabel?: string;
  ctaHref?: string;
}

export interface PromoBanner {
  id: string;
  tag?: string;
  title: string;
  ctaLabel?: string;
  href: string;
  image?: string;
}

export interface ProductCarouselProps {
  title?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  items?: Product[];
  promos?: PromoBanner[];
  className?: string;
  style?: CSSProperties;
}

export interface FeatureBannerProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  products?: Product[];
  backgroundImage?: string;
}

export interface Category {
  label: string;
  image: string;
  href?: string;
}

export interface CategoryGridProps {
  title?: string;
  categories: Category[];
}

export interface PromoGridProps {
  promos: PromoBanner[];
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  rating?: number;
  avatar?: string;
}

export interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

/**
 * Union discriminada: cada seccion de la landing es un objeto con
 * "type" + "props" tipados. Esto es lo que permite que SectionRenderer
 * sepa que componente pintar y con que props, de forma 100% tipada.
 */
export type SectionConfig =
  | { id: string; type: 'hero'; props: HeroProps }
  | { id: string; type: 'splitIntro'; props: SplitIntroProps }
  | { id: string; type: 'productCarousel'; props: ProductCarouselProps }
  | { id: string; type: 'featureBanner'; props: FeatureBannerProps }
  | { id: string; type: 'categoryGrid'; props: CategoryGridProps }
  | { id: string; type: 'promoGrid'; props: PromoGridProps }
  | { id: string; type: 'testimonials'; props: TestimonialsProps }
  | { id: string; type: 'instagramFeed'; props: InstagramFeedProps };

export interface SocialLink {
  label: string;
  initial: string;
  href: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  href: string;
}

export interface InstagramFeedProps {
  username: string;
  displayName?: string;
  profileImage: string;
  bio?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  profileHref: string;
  ctaLabel?: string;
  posts: InstagramPost[];
}
