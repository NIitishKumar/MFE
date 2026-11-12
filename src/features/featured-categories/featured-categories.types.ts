import type { Category, Product } from '@/types';
export type { Category, Product } from '@/types';

/**
 * Props accepted by the main FeaturedCategories feature view.
 */
export interface FeaturedCategoriesProps {
  initialCategories: Category[];
  initialSlug?: string;
}

/**
 * Return contract for the useFeaturedCategories controller hook.
 */
export interface UseFeaturedCategoriesReturn {
  categories: Category[];
  isCategoriesLoading: boolean;
  activeSlug: string;
  selectedCategory: Category | null;
  categoryProducts: Product[];
  isLoading: boolean;
  error: string | null;
  selectCategory: (slug: string) => void;
  refreshCategory: () => void;
  retryCategories: () => void;
}

/**
 * Props for the pure CategoryCardGrid presentational component.
 */
export interface CategoryCardGridProps {
  categories: Category[];
  isCategoriesLoading: boolean;
  activeSlug: string;
  onSelectCategory: (slug: string) => void;
  onRetry?: () => void;
}

/**
 * Props for the pure CategoryDetailBanner presentational component.
 */
export interface CategoryDetailBannerProps {
  category: Category | null;
  activeSlug: string;
  productCount: number;
  isLoading: boolean;
}

/**
 * Props for the pure CategoryProductsGrid presentational component.
 */
export interface CategoryProductsGridProps {
  products: Product[];
  categoryName?: string;
  categorySlug: string;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}
