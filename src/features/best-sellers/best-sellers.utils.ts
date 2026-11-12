import { fetchBestSellerProducts } from '@/services/api';
import {
  type ProductShelfConfig,
  buildInitialShelfQuery,
  buildShelfApiParams,
  extractShelfPagination,
  hasMultipleShelfPages,
  buildShelfExploreHref,
} from '@/features/product-shelf';
import {
  type FilterState,
  type FetchProductsResponse,
  type BestSellersQueryState,
  type BestSellersPagination,
  BEST_SELLERS_DEFAULT_LIMIT,
  BEST_SELLERS_DEFAULT_PAGE,
  BEST_SELLERS_DEFAULT_SORT,
  BEST_SELLERS_SHOW_SORT_FILTER,
  BEST_SELLERS_EXPLORE_FILTER,
  BEST_SELLERS_COPY,
  BEST_SELLERS_SORT_OPTIONS,
} from './index';

/**
 * Shelf configuration binding Best Sellers to GET /api/v1/products/best-sellers.
 */
export const BEST_SELLERS_SHELF_CONFIG: ProductShelfConfig = {
  fetcher: fetchBestSellerProducts,
  defaultLimit: BEST_SELLERS_DEFAULT_LIMIT,
  defaultPage: BEST_SELLERS_DEFAULT_PAGE,
  defaultSort: BEST_SELLERS_DEFAULT_SORT,
  showSortDefault: BEST_SELLERS_SHOW_SORT_FILTER,
  exploreFilterParam: BEST_SELLERS_EXPLORE_FILTER,
  errorFallbackMessage: 'Unable to load best sellers right now.',
  copy: BEST_SELLERS_COPY,
  sortOptions: BEST_SELLERS_SORT_OPTIONS,
};

/**
 * Builds the default Best Sellers query state with optional limit override.
 */
export function buildInitialBestSellersQuery(
  limit: number = BEST_SELLERS_DEFAULT_LIMIT,
): BestSellersQueryState {
  return buildInitialShelfQuery(
    BEST_SELLERS_DEFAULT_SORT,
    BEST_SELLERS_DEFAULT_PAGE,
    limit,
  ) as BestSellersQueryState;
}

/**
 * Converts UI query state into clean API filter parameters for GET /api/v1/products/best-sellers.
 */
export function buildBestSellersApiParams(
  query: BestSellersQueryState,
): Partial<FilterState> & { limit: number; page: number } {
  return buildShelfApiParams(query);
}

/**
 * Extracts normalized pagination metadata from the Best Sellers API response.
 */
export function extractBestSellersPagination(
  response?: FetchProductsResponse,
  fallbackLimit: number = BEST_SELLERS_DEFAULT_LIMIT,
): BestSellersPagination {
  return extractShelfPagination(
    response,
    fallbackLimit,
    BEST_SELLERS_DEFAULT_PAGE,
  );
}

/**
 * Indicates whether multi-page navigation controls should be displayed.
 */
export function hasMultipleBestSellersPages(
  pagination: BestSellersPagination,
): boolean {
  return hasMultipleShelfPages(pagination);
}

/**
 * Builds the target /shop URL preserving Best Seller filter and active category.
 */
export function buildBestSellersExploreHref(categorySlug?: string): string {
  return buildShelfExploreHref(BEST_SELLERS_EXPLORE_FILTER, categorySlug);
}

