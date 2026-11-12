import type { Metadata } from 'next';
import type { Product } from '@/types';
import { SHOWROOMS } from '@/data/showroom';
import { WHATSAPP_PHONE_NUMBER } from '@/lib/whatsapp';

export const SITE_NAME = 'Madhav Furniture';
export const SITE_LEGAL_NAME = 'Madhav Furniture India';
export const DEFAULT_TITLE =
  'Madhav Furniture | Official Website — Luxury Solid Wood & Modern Living';
export const DEFAULT_DESCRIPTION =
  'Madhav Furniture official store. Handcrafted solid wood furniture, designer beds with wall matching sets, designer double beds, luxury L-shape sofas, travertine dining tables, and custom wardrobes with White-Glove delivery across India. Visit our flagship showroom in Sikandrabad (UP).';
export const DEFAULT_OG_IMAGE_PATH = '/opengraph-image';
export const DEFAULT_TWITTER_IMAGE_PATH = '/twitter-image';
export const PHONE_DISPLAY = '+91 75 0093 1934';
export const PHONE_E164 = '+91-7500931934';
export const WHATSAPP_CONTACT_URL = `https://wa.me/${WHATSAPP_PHONE_NUMBER}`;

export const GOOGLE_MAPS_PROFILE_URL =
  'https://maps.app.goo.gl/gGGeaJoxR5SY6zx9A';

export const DEFAULT_KEYWORDS = [
  'Madhav Furniture',
  'Madhav Furniture official website',
  'Madhav Furnitures',
  'Madhav Furniture Sikandrabad',
  'Madhav Furniture Bulandshahr',
  'Madhav Furniture UP',
  'Madhav Furniture showroom',
  'Designer Bed With Wall Matching Set',
  'Designer Double Bed',
  'L Shape Sofa Set',
  'solid wood furniture India',
  'luxury furniture India',
  'architectural furniture',
  'curved boucle sofa',
  'travertine dining table',
  'solid oak bed',
  'American walnut furniture',
  'white glove furniture delivery',
];

/**
 * Resolves the canonical public storefront origin without a trailing slash.
 */
export function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'https://madhavfurnitures.in',
  ];

  const raw = candidates.find((value) => Boolean(value && value.trim()))?.trim() ??
    'https://madhavfurnitures.in';
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, '');
}

/**
 * Converts a relative route path or image URL into a canonical absolute URL.
 */
export function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return getSiteUrl();
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
  noIndex?: boolean;
  follow?: boolean;
}

/**
 * Builds normalized Next.js Metadata with canonical URL, OpenGraph, Twitter, and robots.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  images,
  noIndex = false,
  follow = true,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const resolvedImages =
    images && images.length > 0
      ? images.map((img) => ({
          url: toAbsoluteUrl(img.url),
          ...(img.width ? { width: img.width } : {}),
          ...(img.height ? { height: img.height } : {}),
          alt: img.alt || title,
        }))
      : [
          {
            url: DEFAULT_OG_IMAGE_PATH,
            width: 1200,
            height: 630,
            alt: title,
          },
        ];

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: SITE_NAME,
      url: canonicalUrl,
      title,
      description,
      images: resolvedImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: resolvedImages.map((img) => img.url),
    },
    robots: noIndex
      ? { index: false, follow }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

/**
 * Builds noindex Metadata for transactional, auth, and administrative routes.
 */
export function buildNoIndexMetadata(
  title: string,
  description: string,
  follow = false,
): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow,
      nocache: !follow,
      googleBot: {
        index: false,
        follow,
        noimageindex: true,
      },
    },
  };
}

/**
 * Builds Schema.org FurnitureStore / Organization JSON-LD for the root layout.
 */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    '@id': `${siteUrl}/#organization`,
    name: SITE_NAME,
    alternateName: [
      'Madhav Furnitures',
      'Madhav Furniture Studio',
      'Madhav Furniture & Electronics',
    ],
    legalName: SITE_LEGAL_NAME,
    url: siteUrl,
    logo: toAbsoluteUrl('/madhav-logo.png'),
    image: toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH),
    description: DEFAULT_DESCRIPTION,
    telephone: PHONE_E164,
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        "Above BDS Convent School, Teacher's Colony, Old NH 91, Bulandshahr Road",
      addressLocality: 'Sikandrabad',
      addressRegion: 'Uttar Pradesh',
      postalCode: '203205',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4503,
      longitude: 77.6975,
    },
    hasMap: GOOGLE_MAPS_PROFILE_URL,
    sameAs: [WHATSAPP_CONTACT_URL, GOOGLE_MAPS_PROFILE_URL],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    department: SHOWROOMS.map((showroom) => ({
      '@type': 'FurnitureStore',
      name: showroom.name,
      image: showroom.heroImage,
      telephone: PHONE_E164,
      url: `${siteUrl}/showroom`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: showroom.address,
        addressLocality: showroom.city,
        postalCode: showroom.pincode,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: showroom.coordinates.lat,
        longitude: showroom.coordinates.lng,
      },
    })),
  };
}

/**
 * Builds Schema.org WebSite JSON-LD with Sitelinks SearchAction support.
 */
export function buildWebSiteJsonLd(): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: SITE_NAME,
    url: siteUrl,
    inLanguage: 'en-IN',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

/**
 * Builds Schema.org BreadcrumbList JSON-LD for SERP breadcrumb trails.
 */
export function buildBreadcrumbJsonLd(
  items: BreadcrumbEntry[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

/**
 * Builds Schema.org Product JSON-LD with INR offers, materials, dimensions, and rating.
 */
export function buildProductJsonLd(product: Product): Record<string, unknown> {
  const productPath = `/product/${product.slug || product.id}`;
  const productUrl = toAbsoluteUrl(productPath);
  const validImages = (product.images || [])
    .filter(Boolean)
    .map((img) => toAbsoluteUrl(img));

  const dimensionsNote = [
    product.dimensions?.width ? `W: ${product.dimensions.width}` : '',
    product.dimensions?.depth ? `D: ${product.dimensions.depth}` : '',
    product.dimensions?.height ? `H: ${product.dimensions.height}` : '',
  ]
    .filter(Boolean)
    .join(', ');

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: product.name,
    description: product.fullDescription || product.shortDescription,
    sku: product.id,
    url: productUrl,
    image: validImages.length > 0 ? validImages : [toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH)],
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    category: product.categoryLabel || product.category,
    ...(product.materials && product.materials.length > 0
      ? { material: product.materials.join(', ') }
      : {}),
    ...(product.colors && product.colors.length > 0
      ? { color: product.colors.map((c) => c.name).join(', ') }
      : {}),
    ...(dimensionsNote
      ? {
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Dimensions',
              value: dimensionsNote,
            },
          ],
        }
      : {}),
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: Number(product.price || 0),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    ...(product.reviewCount > 0 && product.rating > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: Number(product.rating.toFixed(1)),
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

/**
 * Builds Schema.org CollectionPage + ItemList JSON-LD for catalog and category views.
 */
export function buildCollectionPageJsonLd({
  name,
  description,
  path,
  items = [],
}: {
  name: string;
  description: string;
  path: string;
  items?: Array<{ name: string; path: string; image?: string }>;
}): Record<string, unknown> {
  const url = toAbsoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    isPartOf: {
      '@id': `${getSiteUrl()}/#website`,
    },
    ...(items.length > 0
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: items.length,
            itemListElement: items.slice(0, 20).map((item, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: item.name,
              url: toAbsoluteUrl(item.path),
              ...(item.image ? { image: toAbsoluteUrl(item.image) } : {}),
            })),
          },
        }
      : {}),
  };
}

/**
 * Builds Schema.org FAQPage JSON-LD for FAQ rich search results.
 */
export function buildFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

