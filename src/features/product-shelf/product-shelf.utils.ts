import {
  type FilterState,
  type FetchProductsResponse,
  type ProductShelfSortOption,
  type ProductShelfQueryState,
  type ProductShelfPagination,
} from './index';

/**
 * Builds the default product shelf query state.
 */
export function buildInitialShelfQuery(
  defaultSort: ProductShelfSortOption,
  defaultPage: number,
  limit: number,
): ProductShelfQueryState {
  return {
    category: '',
    sortBy: defaultSort,
    page: Math.max(1, defaultPage),
    limit: Math.max(1, limit),
  };
}

/**
 * Converts UI shelf query state into API query parameters.
 */
export function buildShelfApiParams(
  query: ProductShelfQueryState,
): Partial<FilterState> & { limit: number; page: number } {
  return {
    ...(query.category ? { category: query.category } : {}),
    sortBy: query.sortBy,
    page: query.page,
    limit: query.limit,
  };
}

/**
 * Extracts normalized pagination metadata from a products endpoint response.
 */
export function extractShelfPagination(
  response: FetchProductsResponse | undefined,
  fallbackLimit: number,
  fallbackPage: number = 1,
): ProductShelfPagination {
  const limit = response?.limit || fallbackLimit;
  const total = response?.total ?? response?.data?.length ?? 0;
  return {
    count: response?.count ?? response?.data?.length ?? 0,
    total,
    page: response?.page ?? fallbackPage,
    limit,
    totalPages:
      response?.totalPages ?? Math.max(1, Math.ceil(total / Math.max(1, limit))),
  };
}

/**
 * Indicates whether multi-page navigation controls should be displayed.
 */
export function hasMultipleShelfPages(pagination: ProductShelfPagination): boolean {
  return pagination.totalPages > 1;
}

/**
 * Builds the /shop explore URL preserving shelf filter and active category.
 */
export function buildShelfExploreHref(
  filterParam: string,
  categorySlug?: string,
): string {
  const params = new URLSearchParams();
  if (filterParam) {
    params.set('filter', filterParam);
  }
  if (categorySlug) {
    params.set('category', categorySlug);
  }
  const qs = params.toString();
  return qs ? `/shop?${qs}` : '/shop';
}

