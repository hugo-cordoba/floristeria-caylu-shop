import type { SectionConfig, NavLink } from '@/types/section.types';

/**
 * Enlaces de navegacion compartidos, usados por el Header fijo.
 * Antes vivian dentro de hero.props.navLinks; ahora estan aqui para
 * que el Header (fuera del Hero) pueda usarlos tambien.
 */
export const siteNavLinks: NavLink[] = [
  { label: 'Productos', href: '/products' },
  { label: 'Catalogo', href: '#productos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

/**
 * Este es el fichero "comun" para AÑADIR, QUITAR o REORDENAR secciones
 * de la home. Es un simple array: el orden en que aparecen aqui es el
 * orden en que se pintan en la pagina.
 *
 * - Para quitar una seccion: borra (o comenta) su objeto del array.
 * - Para añadir una: copia un bloque, cambia "type" y sus "props".
 * - Para reordenar: cambia la posicion del objeto en el array.
 *
 * El contenido (texto, imagenes, productos) tambien vive aqui, para que
 * personalizar una tienda nueva sea, en gran parte, editar este fichero.
 */
export const landingSections: SectionConfig[] = [
  {
    id: 'hero',
    type: 'hero',
    props: {
      title: 'Flores que cuentan historias',
      subtitle: 'Ramos y composiciones florales diseñados para regalar, celebrar y hacer especial cualquier día.',
      media: {
        type: 'image',
        src: '/banner.png',
        mobileSrc: '/banner-mobile.png',
      },
      ctaLabel: 'Descubrir colección',
      ctaHref: '/products',
      secondaryInfo: 'Entrega en Madrid',
      mobileTitle: 'flores para cada ocasión',
      mobileCtaLabel: 'Comprar ahora',
    },
  },
  {
    id: 'productos',
    type: 'productCarousel',
    props: {
      title: 'PRODUCTOS DESTACADOS',
      viewAllLabel: 'Ver todos',
      viewAllHref: '/products',
    },
  },
  {
    id: 'destacado',
    type: 'featureBanner',
    props: {
      title: 'Una coleccion para cada ocasion',
      description: 'Bloque de ancho completo con el color principal de marca, ideal para campañas o lanzamientos.',
      ctaLabel: 'Comprar ahora',
      ctaHref: '#productos',
      backgroundImage: '/section1.png',
    },
  },
  {
    id: 'productos-baratos',
    type: 'productCarousel',
    props: {
      title: 'PRODUCTOS POR MENOS DE 50€',
      viewAllLabel: 'Ver todos',
      viewAllHref: '/products?maxPrice=50',
    },
  },
  {
    id: 'destacado-2',
    type: 'featureBanner',
    props: {
      title: 'Ofertas por tiempo limitado',
      description: 'Aprovecha los descuentos de esta temporada antes de que se agoten.',
      ctaLabel: 'Ver ofertas',
      ctaHref: '/products?maxPrice=50',
    },
  },
  {
    id: 'testimonios',
    type: 'testimonials',
    props: {
      title: '¿Qué opinan nuestros clientes?',
      googleReviewHref: 'https://search.google.com/local/writereview?placeid=ChIJRbJFjNcnQg0ROe0GlmppbgM',
      testimonials: [
        { authorName: 'Laura Nguyen', authorRole: 'Directora de tienda', quote: 'El proceso de compra es clarísimo, nuestros clientes lo notan.' },
        { authorName: 'Carlos Díaz', authorRole: 'Cliente habitual', quote: 'Envíos rápidos y la web es muy fácil de usar.' },
        { authorName: 'Liam Johnson', authorRole: 'Cliente', quote: 'La atención al cliente resolvió mi duda en minutos.' },
        { authorName: 'Sofía Carter', authorRole: 'Cliente', quote: 'Desde que compro aquí no he tenido ni un problema.' },
      ],
    },
  },
];

export const footerContent = {
  email: 'user@example.com',
};
