import type {
  Product,
  Category,
  FilterState,
  FetchProductsResponse,
} from '@/types';

export type {
  Product,
  Category,
  FilterState,
  FetchProductsResponse,
};

/**
 * Supported sort options for curated product shelf endpoints.
 */
export type ProductShelfSortOption = Extract<
  FilterState['sortBy'],
  'newest' | 'price-low' | 'price-high' | 'rating' | 'featured'
>;

/**
 * Single sort dropdown option definition.
 */
export interface ProductShelfSortOptionItem {
  value: ProductShelfSortOption;
  label: string;
}

/**
 * Presentation copy and accessibility labels for a product shelf.
 */
export interface ProductShelfCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  exploreLabel: string;
  allCategoriesLabel: string;
  emptyTitle: string;
  emptyCategorySubtitle: string;
  emptyDefaultSubtitle: string;
  resetCategoryLabel: string;
  sortAriaLabel: string;
  categoryTabsAriaLabel: string;
  loadingAriaLabel: string;
  prevPageAriaLabel: string;
  nextPageAriaLabel: string;
}

/**
 * Query parameters controlling a product shelf API request.
 */
export interface ProductShelfQueryState {
  category: string;
  sortBy: ProductShelfSortOption;
  page: number;
  limit: number;
}

/**
 * Pagination metadata returned by curated product endpoints.
 */
export interface ProductShelfPagination {
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Async fetcher signature shared across product shelf endpoints.
 */
export type ProductShelfFetcher = (
  filters?: Partial<FilterState> & { limit?: number; page?: number },
) => Promise<FetchProductsResponse>;

/**
 * Behavioral & presentation configuration defining a concrete shelf feature.
 */
export interface ProductShelfConfig {
  fetcher: ProductShelfFetcher;
  defaultLimit: number;
  defaultPage: number;
  defaultSort: ProductShelfSortOption;
  showSortDefault: boolean;
  exploreFilterParam: string;
  errorFallbackMessage: string;
  copy: ProductShelfCopy;
  sortOptions: readonly ProductShelfSortOptionItem[];
}

/**
 * Controller contract returned by the useProductShelf hook.
 */
export interface UseProductShelfReturn {
  products: Product[];
  categories: Category[];
  query: ProductShelfQueryState;
  pagination: ProductShelfPagination;
  isLoading: boolean;
  error: string | null;
  hasPagination: boolean;
  selectCategory: (categorySlug: string) => void;
  selectSortBy: (sortBy: ProductShelfSortOption) => void;
  goToPage: (page: number) => void;
  retry: () => void;
}

/**
 * Props accepted by a concrete shelf View component.
 */
export interface ProductShelfFeatureProps {
  initialData?: FetchProductsResponse;
  initialCategories?: Category[];
  limit?: number;
  showSort?: boolean;
}

/**
 * Props for the pure ProductShelfHeader UI component.
 */
export interface ProductShelfHeaderProps {
  copy: ProductShelfCopy;
  categories: Category[];
  activeCategory: string;
  activeSortBy: ProductShelfSortOption;
  sortOptions: readonly ProductShelfSortOptionItem[];
  exploreHref: string;
  showSort: boolean;
  onSelectCategory: (categorySlug: string) => void;
  onSelectSortBy: (sortBy: ProductShelfSortOption) => void;
}

/**
 * Props for the pure ProductShelfGrid UI component.
 */
export interface ProductShelfGridProps {
  copy: ProductShelfCopy;
  products: Product[];
  activeCategory: string;
  pagination: ProductShelfPagination;
  hasPagination: boolean;
  isLoading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
  onResetCategory: () => void;
  onRetry: () => void;
}

/**
 * Props for the generic ProductShelf view wrapper.
 */
export interface ProductShelfProps extends ProductShelfFeatureProps {
  config: ProductShelfConfig;
}

