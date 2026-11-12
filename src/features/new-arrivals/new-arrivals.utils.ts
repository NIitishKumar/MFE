import { fetchNewArrivalProducts } from '@/services/api';
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
  type NewArrivalsQueryState,
  type NewArrivalsPagination,
  NEW_ARRIVALS_DEFAULT_LIMIT,
  NEW_ARRIVALS_DEFAULT_PAGE,
  NEW_ARRIVALS_DEFAULT_SORT,
  NEW_ARRIVALS_SHOW_SORT_FILTER,
  NEW_ARRIVALS_EXPLORE_FILTER,
  NEW_ARRIVALS_COPY,
  NEW_ARRIVALS_SORT_OPTIONS,
} from './index';

/**
 * Shelf configuration binding New Arrivals to GET /api/v1/products/new-arrivals.
 */
export const NEW_ARRIVALS_SHELF_CONFIG: ProductShelfConfig = {
  fetcher: fetchNewArrivalProducts,
  defaultLimit: NEW_ARRIVALS_DEFAULT_LIMIT,
  defaultPage: NEW_ARRIVALS_DEFAULT_PAGE,
  defaultSort: NEW_ARRIVALS_DEFAULT_SORT,
  showSortDefault: NEW_ARRIVALS_SHOW_SORT_FILTER,
  exploreFilterParam: NEW_ARRIVALS_EXPLORE_FILTER,
  errorFallbackMessage: 'Unable to load new arrivals right now.',
  copy: NEW_ARRIVALS_COPY,
  sortOptions: NEW_ARRIVALS_SORT_OPTIONS,
};

/**
 * Builds the default New Arrivals query state with optional limit override.
 */
export function buildInitialNewArrivalsQuery(
  limit: number = NEW_ARRIVALS_DEFAULT_LIMIT,
): NewArrivalsQueryState {
  return buildInitialShelfQuery(
    NEW_ARRIVALS_DEFAULT_SORT,
    NEW_ARRIVALS_DEFAULT_PAGE,
    limit,
  ) as NewArrivalsQueryState;
}

/**
 * Converts UI query state into clean API filter parameters for GET /api/v1/products/new-arrivals.
 */
export function buildNewArrivalsApiParams(
  query: NewArrivalsQueryState,
): Partial<FilterState> & { limit: number; page: number } {
  return buildShelfApiParams(query);
}

/**
 * Extracts normalized pagination metadata from the New Arrivals API response.
 */
export function extractNewArrivalsPagination(
  response?: FetchProductsResponse,
  fallbackLimit: number = NEW_ARRIVALS_DEFAULT_LIMIT,
): NewArrivalsPagination {
  return extractShelfPagination(
    response,
    fallbackLimit,
    NEW_ARRIVALS_DEFAULT_PAGE,
  );
}

/**
 * Indicates whether multi-page navigation controls should be displayed.
 */
export function hasMultipleNewArrivalsPages(
  pagination: NewArrivalsPagination,
): boolean {
  return hasMultipleShelfPages(pagination);
}

/**
 * Builds the target /shop URL preserving New Arrival filter and active category.
 */
export function buildNewArrivalsExploreHref(categorySlug?: string): string {
  return buildShelfExploreHref(NEW_ARRIVALS_EXPLORE_FILTER, categorySlug);
}
