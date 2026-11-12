'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  type Category,
  type Product,
  type FetchProductsResponse,
  type ProductShelfConfig,
  type ProductShelfQueryState,
  type ProductShelfPagination,
  type ProductShelfSortOption,
  type UseProductShelfReturn,
  buildInitialShelfQuery,
  buildShelfApiParams,
  extractShelfPagination,
  hasMultipleShelfPages,
} from './index';

/**
 * Shared controller hook managing product shelf state, category/sort filters,
 * pagination, and live API fetching.
 */
export function useProductShelf(
  config: ProductShelfConfig,
  initialData?: FetchProductsResponse,
  initialCategories: Category[] = [],
  limit?: number,
): UseProductShelfReturn {
  const effectiveLimit = limit ?? config.defaultLimit;
  const { categories: storeCategories, isCategoriesLoading } = useStore();

  const categories = useMemo(
    () =>
      storeCategories.length > 0 || !isCategoriesLoading
        ? storeCategories
        : initialCategories,
    [storeCategories, isCategoriesLoading, initialCategories],
  );

  const [query, setQuery] = useState<ProductShelfQueryState>(() =>
    buildInitialShelfQuery(
      config.defaultSort,
      config.defaultPage,
      effectiveLimit,
    ),
  );
  const [products, setProducts] = useState<Product[]>(
    () => initialData?.data ?? [],
  );
  const [pagination, setPagination] = useState<ProductShelfPagination>(() =>
    extractShelfPagination(initialData, effectiveLimit, config.defaultPage),
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    () => !(initialData && initialData.data.length > 0),
  );
  const [error, setError] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState<number>(0);

  useEffect(() => {
    let isCancelled = false;

    const loadShelfProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await config.fetcher(buildShelfApiParams(query));
        if (isCancelled) return;
        setProducts(res.data);
        setPagination(
          extractShelfPagination(res, query.limit, config.defaultPage),
        );
      } catch (err) {
        if (isCancelled) return;
        const message =
          err instanceof Error ? err.message : config.errorFallbackMessage;
        setError(message);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadShelfProducts();

    return () => {
      isCancelled = true;
    };
  }, [config, query, refreshTick]);

  const selectCategory = useCallback(
    (categorySlug: string) => {
      setQuery((prev) => ({
        ...prev,
        category: categorySlug,
        page: config.defaultPage,
      }));
    },
    [config.defaultPage],
  );

  const selectSortBy = useCallback(
    (sortBy: ProductShelfSortOption) => {
      setQuery((prev) => ({
        ...prev,
        sortBy,
        page: config.defaultPage,
      }));
    },
    [config.defaultPage],
  );

  const goToPage = useCallback(
    (nextPage: number) => {
      const safePage = Math.min(Math.max(1, nextPage), pagination.totalPages);
      setQuery((prev) => ({
        ...prev,
        page: safePage,
      }));
    },
    [pagination.totalPages],
  );

  const retry = useCallback(() => {
    setRefreshTick((prev) => prev + 1);
  }, []);

  return {
    products,
    categories,
    query,
    pagination,
    isLoading,
    error,
    hasPagination: hasMultipleShelfPages(pagination),
    selectCategory,
    selectSortBy,
    goToPage,
    retry,
  };
}

