import type { Category, Product } from './index';

/**
 * Resolves the default category slug from initial configuration or available list.
 */
export function getDefaultCategorySlug(
  categories: Category[],
  preferredSlug?: string
): string {
  if (preferredSlug) {
    const matched = categories.find((cat) => cat.slug === preferredSlug);
    if (matched) return matched.slug;
  }
  return categories[0]?.slug || '';
}

/**
 * Formats a hyphenated room slug (e.g. "living-room") into title case.
 */
export function formatRoomReference(roomSlug?: string): string {
  if (!roomSlug) return 'Curated Space';
  return roomSlug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats category design count labels with proper singular/plural grammar.
 */
export function formatDesignCountLabel(count: number): string {
  const safeCount = Number.isFinite(count) ? Math.max(0, count) : 0;
  return `${safeCount} ${safeCount === 1 ? 'Design' : 'Designs'} Available`;
}

/**
 * Returns the bounded preview slice of products for the homepage showcase grid.
 */
export function getPreviewProducts(products: Product[], maxItems: number = 4): Product[] {
  return products.slice(0, maxItems);
}

/**
 * Builds the canonical category page URL for a category slug.
 */
export function buildCategoryRoute(slug: string): string {
  const trimmedSlug = slug.trim();
  return trimmedSlug ? `/category/${encodeURIComponent(trimmedSlug)}` : '/shop';
}

