import type { Product } from '@/types';

export const WHATSAPP_PHONE_NUMBER = '917500931934';

export const DEFAULT_WHATSAPP_GREETING =
  'Hello! I visited your website and would like to know more about your services.';

export interface ProductWhatsAppOptions {
  product: Product;
  quantity?: number;
  selectedColor?: string;
  selectedSize?: string;
  customMessage?: string;
  productUrl?: string;
  origin?: string;
}

function formatINRPrice(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Builds the general storefront WhatsApp inquiry URL.
 */
export function buildGeneralWhatsAppUrl(
  message: string = DEFAULT_WHATSAPP_GREETING,
): string {
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats selected product specifications and optional custom message
 * into a structured WhatsApp inquiry string.
 */
export function buildProductWhatsAppMessage({
  product,
  quantity = 1,
  selectedColor,
  selectedSize,
  customMessage,
  productUrl,
  origin,
}: ProductWhatsAppOptions): string {
  const safeQuantity = Math.max(1, quantity);
  const colorLabel = selectedColor?.trim() || product.colors?.[0]?.name || '';
  const sizeLabel = selectedSize?.trim() || product.sizes?.[0] || '';
  const dimensions = [
    product.dimensions?.width,
    product.dimensions?.depth,
    product.dimensions?.height,
  ]
    .filter(Boolean)
    .join(' x ');

  const resolvedOrigin =
    origin !== undefined
      ? origin
      : typeof window !== 'undefined'
      ? window.location.origin
      : '';
  const resolvedUrl =
    productUrl || `${resolvedOrigin}/product/${product.slug || product.id}`;

  const lines: string[] = [
    'Hello Madhav Furniture & Electronics Team, I am interested in this product:',
    '',
    `*Product:* ${product.name}`,
    ...(product.categoryLabel ? [`*Category:* ${product.categoryLabel}`] : []),
    `*Price:* ${formatINRPrice(product.price)}${
      safeQuantity > 1
        ? ` (Qty: ${safeQuantity} • Total: ${formatINRPrice(product.price * safeQuantity)})`
        : ''
    }`,
    ...(colorLabel ? [`*Selected Finish/Color:* ${colorLabel}`] : []),
    ...(sizeLabel ? [`*Selected Size:* ${sizeLabel}`] : []),
    ...(dimensions ? [`*Dimensions:* ${dimensions}`] : []),
    `*Availability:* ${product.inStock ? 'In Stock' : 'Made to Order'}`,
    `*Product Link:* ${resolvedUrl}`,
  ];

  const trimmedNote = customMessage?.trim();
  lines.push('');
  lines.push(
    trimmedNote
      ? `*Custom Message:* ${trimmedNote}`
      : '*Message:* Please share availability, customization options, and delivery timeline.',
  );

  return lines.join('\n');
}

/**
 * Builds the full WhatsApp navigation URL pre-filled with product details and custom message.
 */
export function buildProductWhatsAppUrl(options: ProductWhatsAppOptions): string {
  return buildGeneralWhatsAppUrl(buildProductWhatsAppMessage(options));
}

/**
 * Opens WhatsApp in a new browser tab/window, falling back to same-tab navigation if blocked.
 */
export function openProductWhatsApp(options: ProductWhatsAppOptions): void {
  if (typeof window === 'undefined') return;
  const url = buildProductWhatsAppUrl({
    ...options,
    origin: options.origin ?? window.location.origin,
  });
  const popup = window.open(url, '_blank', 'noopener,noreferrer');
  if (!popup) {
    window.location.assign(url);
  }
}
