import type { ProductShelfCopy } from '@/features/product-shelf';

export const BEST_SELLERS_DEFAULT_LIMIT = 4;
export const BEST_SELLERS_DEFAULT_PAGE = 1;
export const BEST_SELLERS_DEFAULT_SORT = 'rating' as const;
export const BEST_SELLERS_SHOW_SORT_FILTER = false;
export const BEST_SELLERS_EXPLORE_FILTER = 'best-seller' as const;

export const BEST_SELLERS_COPY: ProductShelfCopy = {
  eyebrow: 'Most Coveted',
  title: 'Best Sellers',
  subtitle:
    'Our most celebrated architectural staples, favored by discerning architects and homeowners.',
  exploreLabel: 'View All Best Sellers',
  allCategoriesLabel: 'All Best Sellers',
  emptyTitle: 'No best sellers available right now.',
  emptyCategorySubtitle:
    'Try clearing the category filter or exploring the full catalogue.',
  emptyDefaultSubtitle:
    'Check back soon for our most coveted architectural pieces.',
  resetCategoryLabel: 'Show All Best Sellers',
  sortAriaLabel: 'Sort best sellers',
  categoryTabsAriaLabel: 'Filter best sellers by category',
  loadingAriaLabel: 'Loading best sellers',
  prevPageAriaLabel: 'Previous best sellers page',
  nextPageAriaLabel: 'Next best sellers page',
};

export const BEST_SELLERS_SORT_OPTIONS = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Latest Additions' },
] as const;

