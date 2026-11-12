'use client';

import { useProductShelf } from '@/features/product-shelf';
import {
  type Category,
  type FetchProductsResponse,
  type UseBestSellersReturn,
  BEST_SELLERS_DEFAULT_LIMIT,
  BEST_SELLERS_SHELF_CONFIG,
} from './index';

/**
 * Controller hook managing Best Sellers state, category/sort filters, pagination,
 * and API calls to GET /api/v1/products/best-sellers.
 */
export function useBestSellers(
  initialData?: FetchProductsResponse,
  initialCategories: Category[] = [],
  limit: number = BEST_SELLERS_DEFAULT_LIMIT,
): UseBestSellersReturn {
  return useProductShelf(
    BEST_SELLERS_SHELF_CONFIG,
    initialData,
    initialCategories,
    limit,
  ) as UseBestSellersReturn;
}

