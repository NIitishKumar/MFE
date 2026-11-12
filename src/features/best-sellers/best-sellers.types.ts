import type {
  Product,
  Category,
  FilterState,
  FetchProductsResponse,
  ProductShelfPagination,
  ProductShelfFeatureProps,
} from '@/features/product-shelf';

export type {
  Product,
  Category,
  FilterState,
  FetchProductsResponse,
};

/**
 * Supported sort options for GET /api/v1/products/best-sellers.
 */
export type BestSellersSortOption = Extract<
  FilterState['sortBy'],
  'rating' | 'price-low' | 'price-high' | 'newest'
>;

/**
 * Query parameters controlling the Best Sellers API request.
 */
export interface BestSellersQueryState {
  category: string;
  sortBy: BestSellersSortOption;
  page: number;
  limit: number;
}

/**
 * Pagination metadata returned from GET /api/v1/products/best-sellers.
 */
export type BestSellersPagination = ProductShelfPagination;

/**
 * Props accepted by the main BestSellers feature view.
 */
export type BestSellersProps = ProductShelfFeatureProps;

/**
 * Controller contract returned by the useBestSellers hook.
 */
export interface UseBestSellersReturn {
  products: Product[];
  categories: Category[];
  query: BestSellersQueryState;
  pagination: BestSellersPagination;
  isLoading: boolean;
  error: string | null;
  hasPagination: boolean;
  selectCategory: (categorySlug: string) => void;
  selectSortBy: (sortBy: BestSellersSortOption) => void;
  goToPage: (page: number) => void;
  retry: () => void;
}

/**
 * Props for the pure BestSellersHeader UI component.
 */
export interface BestSellersHeaderProps {
  categories: Category[];
  activeCategory: string;
  activeSortBy: BestSellersSortOption;
  showSort?: boolean;
  onSelectCategory: (categorySlug: string) => void;
  onSelectSortBy: (sortBy: BestSellersSortOption) => void;
}

/**
 * Props for the pure BestSellersGrid UI component.
 */
export interface BestSellersGridProps {
  products: Product[];
  activeCategory: string;
  pagination: BestSellersPagination;
  hasPagination: boolean;
  isLoading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
  onResetCategory: () => void;
  onRetry: () => void;
}

