'use client';

import { useProductShelf } from '@/features/product-shelf';
import {
  type Category,
  type FetchProductsResponse,
  type UseNewArrivalsReturn,
  NEW_ARRIVALS_DEFAULT_LIMIT,
  NEW_ARRIVALS_SHELF_CONFIG,
} from './index';

/**
 * Controller hook managing New Arrivals state, category/sort filters, pagination,
 * and API calls to GET /api/v1/products/new-arrivals.
 */
export function useNewArrivals(
  initialData?: FetchProductsResponse,
  initialCategories: Category[] = [],
  limit: number = NEW_ARRIVALS_DEFAULT_LIMIT,
): UseNewArrivalsReturn {
  return useProductShelf(
    NEW_ARRIVALS_SHELF_CONFIG,
    initialData,
    initialCategories,
    limit,
  ) as UseNewArrivalsReturn;
}
