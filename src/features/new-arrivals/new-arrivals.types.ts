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
 * Supported sort options for GET /api/v1/products/new-arrivals.
 */
export type NewArrivalsSortOption = Extract<
  FilterState['sortBy'],
  'newest' | 'price-low' | 'price-high' | 'rating'
>;

/**
 * Query parameters controlling the New Arrivals API request.
 */
export interface NewArrivalsQueryState {
  category: string;
  sortBy: NewArrivalsSortOption;
  page: number;
  limit: number;
}

/**
 * Pagination metadata returned from GET /api/v1/products/new-arrivals.
 */
export type NewArrivalsPagination = ProductShelfPagination;

/**
 * Props accepted by the main NewArrivals feature view.
 */
export type NewArrivalsProps = ProductShelfFeatureProps;

/**
 * Controller contract returned by the useNewArrivals hook.
 */
export interface UseNewArrivalsReturn {
  products: Product[];
  categories: Category[];
  query: NewArrivalsQueryState;
  pagination: NewArrivalsPagination;
  isLoading: boolean;
  error: string | null;
  hasPagination: boolean;
  selectCategory: (categorySlug: string) => void;
  selectSortBy: (sortBy: NewArrivalsSortOption) => void;
  goToPage: (page: number) => void;
  retry: () => void;
}

/**
 * Props for the pure NewArrivalsHeader UI component.
 */
export interface NewArrivalsHeaderProps {
  categories: Category[];
  activeCategory: string;
  activeSortBy: NewArrivalsSortOption;
  showSort?: boolean;
  onSelectCategory: (categorySlug: string) => void;
  onSelectSortBy: (sortBy: NewArrivalsSortOption) => void;
}

/**
 * Props for the pure NewArrivalsGrid UI component.
 */
export interface NewArrivalsGridProps {
  products: Product[];
  activeCategory: string;
  pagination: NewArrivalsPagination;
  hasPagination: boolean;
  isLoading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
  onResetCategory: () => void;
  onRetry: () => void;
}
