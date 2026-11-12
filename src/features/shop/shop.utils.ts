import type { ReadonlyURLSearchParams } from 'next/navigation';
import type {
  FilterState,
  Product,
  Category,
  Room,
  Collection,
} from './index';

export const DEFAULT_SHOP_PAGE = 1;
export const DEFAULT_SHOP_LIMIT = 12;

/**
 * Splits a comma-separated query param into trimmed non-empty tokens.
 */
export function parseCsvParam(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Returns the clean baseline FilterState with no active filter constraints.
 */
export function createEmptyFilterState(): FilterState {
  return {
    search: '',
    category: '',
    room: '',
    collectionSlug: '',
    minPrice: 0,
    maxPrice: 0,
    materials: [],
    colors: [],
    sizes: [],
    availability: 'all',
    badge: '',
    rating: 0,
    sortBy: 'featured',
    page: DEFAULT_SHOP_PAGE,
    limit: DEFAULT_SHOP_LIMIT,
  };
}

/**
 * Parses URLSearchParams into structured FilterState matching the Products API query params.
 */
export function parseFiltersFromSearchParams(
  params: URLSearchParams | ReadonlyURLSearchParams,
): FilterState {
  const legacyFilter = params.get('filter') || '';
  const rawSort = params.get('sortBy');
  let sortBy: FilterState['sortBy'] = 'featured';

  if (
    rawSort === 'featured' ||
    rawSort === 'price-low' ||
    rawSort === 'price-high' ||
    rawSort === 'rating' ||
    rawSort === 'newest'
  ) {
    sortBy = rawSort;
  } else if (legacyFilter === 'new') {
    sortBy = 'newest';
  } else if (legacyFilter === 'best-seller') {
    sortBy = 'rating';
  }

  const rawAvailability = params.get('availability');
  const availability: FilterState['availability'] =
    rawAvailability === 'in-stock' || rawAvailability === 'made-to-order'
      ? rawAvailability
      : 'all';

  const parsedMinPrice = Number(params.get('minPrice') || 0);
  const parsedMaxPrice = Number(params.get('maxPrice') || 0);
  const parsedRating = Number(params.get('rating') || 0);
  const parsedPage = Number(params.get('page') || DEFAULT_SHOP_PAGE);
  const parsedLimit = Number(params.get('limit') || DEFAULT_SHOP_LIMIT);

  return {
    search: params.get('search') || params.get('q') || '',
    category: params.get('category') || '',
    room: params.get('room') || '',
    collectionSlug: params.get('collectionSlug') || '',
    minPrice: Number.isFinite(parsedMinPrice) && parsedMinPrice > 0 ? parsedMinPrice : 0,
    maxPrice: Number.isFinite(parsedMaxPrice) && parsedMaxPrice > 0 ? parsedMaxPrice : 0,
    materials: parseCsvParam(params.get('materials')),
    colors: parseCsvParam(params.get('colors')),
    sizes: parseCsvParam(params.get('sizes')),
    availability,
    badge: params.get('badge') || '',
    rating: Number.isFinite(parsedRating) && parsedRating > 0 ? parsedRating : 0,
    sortBy,
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : DEFAULT_SHOP_PAGE,
    limit: Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : DEFAULT_SHOP_LIMIT,
  };
}

/**
 * Serializes active FilterState into URL query string parameters.
 */
export function buildShopUrlQuery(filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.category) params.set('category', filters.category);
  if (filters.room) params.set('room', filters.room);
  if (filters.minPrice > 0) params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice > 0) params.set('maxPrice', String(filters.maxPrice));
  if (filters.materials.length > 0) {
    params.set('materials', filters.materials.join(','));
  }
  if (filters.colors.length > 0) params.set('colors', filters.colors.join(','));
  if (filters.sizes.length > 0) params.set('sizes', filters.sizes.join(','));
  if (filters.availability && filters.availability !== 'all') {
    params.set('availability', filters.availability);
  }
  if (filters.rating > 0) params.set('rating', String(filters.rating));
  if (filters.badge) params.set('badge', filters.badge);
  if (filters.collectionSlug) params.set('collectionSlug', filters.collectionSlug);
  if (filters.search.trim()) params.set('search', filters.search.trim());
  if (filters.sortBy && filters.sortBy !== 'featured') {
    params.set('sortBy', filters.sortBy);
  }
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));
  if (filters.limit && filters.limit !== DEFAULT_SHOP_LIMIT) {
    params.set('limit', String(filters.limit));
  }

  return params.toString();
}

/**
 * Determines whether any non-default filter constraint is active.
 */
export function checkHasActiveFilters(filters: FilterState): boolean {
  return Boolean(
    filters.search.trim() ||
      filters.category ||
      filters.room ||
      filters.collectionSlug ||
      filters.minPrice > 0 ||
      filters.maxPrice > 0 ||
      filters.materials.length > 0 ||
      filters.colors.length > 0 ||
      filters.sizes.length > 0 ||
      filters.availability !== 'all' ||
      filters.badge ||
      filters.rating > 0,
  );
}

/**
 * Extracts unique product sizes/configurations dynamically from loaded API products.
 */
export function extractSizesFromProducts(
  products: Product[],
  activeSizes: string[],
): string[] {
  const seen = new Set<string>(activeSizes);
  for (const product of products) {
    for (const size of product.sizes || []) {
      if (size) seen.add(size);
    }
  }
  return Array.from(seen);
}

/**
 * Extracts unique product badges dynamically from loaded API products.
 */
export function extractBadgesFromProducts(
  products: Product[],
  activeBadge?: string,
): string[] {
  const seen = new Set<string>();
  if (activeBadge) seen.add(activeBadge);
  for (const product of products) {
    for (const badge of product.badges || []) {
      if (badge) seen.add(badge);
    }
  }
  return Array.from(seen);
}

/**
 * Builds a color-name -> hex lookup map from live API products.
 */
export function buildColorHexMap(products: Product[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const product of products) {
    for (const color of product.colors || []) {
      if (color.name && color.hex && !map[color.name]) {
        map[color.name] = color.hex;
      }
    }
  }
  return map;
}

/**
 * Resolves a human-readable category name from API categories or formats the slug.
 */
export function resolveCategoryName(slug: string, categories: Category[]): string {
  const matched = categories.find((c) => c.slug === slug);
  return matched?.name || slug.replace(/-/g, ' ');
}

/**
 * Resolves a human-readable room name from API rooms or formats the slug.
 */
export function resolveRoomName(slug: string, rooms: Room[]): string {
  const matched = rooms.find((r) => r.slug === slug);
  return matched?.name || slug.replace(/-/g, ' ');
}

/**
 * Resolves a human-readable collection name from API collections or formats the slug.
 */
export function resolveCollectionName(
  slug: string,
  collections: Collection[],
): string {
  const matched = collections.find((c) => c.slug === slug);
  return matched?.name || slug.replace(/-/g, ' ');
}

