import type {
  Product,
  Category,
  Collection,
  Room,
  FilterState,
  ProductFiltersMeta,
  FetchProductsResponse,
} from '@/types';

export type {
  Product,
  Category,
  Collection,
  Room,
  FilterState,
  ProductFiltersMeta,
  FetchProductsResponse,
};

/**
 * Pagination summary returned from GET /api/v1/products.
 */
export interface ShopPaginationState {
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Controller contract returned by the useShop hook.
 */
export interface UseShopReturn {
  filters: FilterState;
  searchInput: string;
  setSearchInput: (value: string) => void;
  products: Product[];
  pagination: ShopPaginationState;
  filterMeta: ProductFiltersMeta | null;
  categories: Category[];
  collections: Collection[];
  rooms: Room[];
  availableSizes: string[];
  availableBadges: string[];
  colorHexMap: Record<string, string>;
  isLoading: boolean;
  hasActiveFilters: boolean;
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (open: boolean) => void;
  updateFilters: (updated: Partial<FilterState>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

/**
 * Props for the ShopHeaderBar pure UI subcomponent.
 */
export interface ShopHeaderBarProps {
  filters: FilterState;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onClearSearch: () => void;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onOpenMobileFilters: () => void;
  hasActiveFilters: boolean;
}

/**
 * Props for the ActiveFilterChips pure UI subcomponent.
 */
export interface ActiveFilterChipsProps {
  filters: FilterState;
  categories: Category[];
  rooms: Room[];
  collections: Collection[];
  onFilterChange: (updated: Partial<FilterState>) => void;
  onClearSearch: () => void;
  onResetFilters: () => void;
}

/**
 * Props for the ShopPagination pure UI subcomponent.
 */
export interface ShopPaginationProps {
  pagination: ShopPaginationState;
  onPageChange: (page: number) => void;
}

