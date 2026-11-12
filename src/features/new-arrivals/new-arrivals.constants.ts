import type { ProductShelfCopy } from '@/features/product-shelf';

export const NEW_ARRIVALS_DEFAULT_LIMIT = 4;
export const NEW_ARRIVALS_DEFAULT_PAGE = 1;
export const NEW_ARRIVALS_DEFAULT_SORT = 'newest' as const;
export const NEW_ARRIVALS_SHOW_SORT_FILTER = false;
export const NEW_ARRIVALS_EXPLORE_FILTER = 'new' as const;

export const NEW_ARRIVALS_COPY: ProductShelfCopy = {
  eyebrow: 'Seasonal Release',
  title: 'New Arrivals',
  subtitle: 'Fresh additions exploring organic geometries and geological stonework.',
  exploreLabel: 'Explore All New',
  allCategoriesLabel: 'All New',
  emptyTitle: 'No new arrivals available right now.',
  emptyCategorySubtitle:
    'Try clearing the category filter or exploring the full catalogue.',
  emptyDefaultSubtitle:
    'Check back soon for new architectural pieces added to the collection.',
  resetCategoryLabel: 'Show All New Arrivals',
  sortAriaLabel: 'Sort new arrivals',
  categoryTabsAriaLabel: 'Filter new arrivals by category',
  loadingAriaLabel: 'Loading new arrivals',
  prevPageAriaLabel: 'Previous new arrivals page',
  nextPageAriaLabel: 'Next new arrivals page',
};

export const NEW_ARRIVALS_SORT_OPTIONS = [
  { value: 'newest', label: 'Latest Arrivals' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
] as const;
