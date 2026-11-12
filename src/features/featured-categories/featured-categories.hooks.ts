'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategoryBySlug, fetchProducts } from '@/services/api';
import { useStore } from '@/context/StoreContext';
import {
  type Category,
  type Product,
  type UseFeaturedCategoriesReturn,
  getDefaultCategorySlug,
  buildCategoryRoute,
} from './index';

/**
 * Controller hook managing Featured Categories state and relational API calls:
 * - GET /api/v1/categories (via StoreContext live API response)
 * - GET /api/v1/categories/:slug (category banner, room reference, description)
 * - GET /api/v1/products?category=:slug (curated products belonging to category)
 */
export function useFeaturedCategories(
  initialCategories: Category[],
  initialSlug?: string
): UseFeaturedCategoriesReturn {
  const router = useRouter();
  const {
    categories: storeCategories,
    isCategoriesLoading,
    refreshCategories,
  } = useStore();

  const categories = useMemo(
    () =>
      storeCategories.length > 0 || !isCategoriesLoading
        ? storeCategories
        : initialCategories,
    [storeCategories, isCategoriesLoading, initialCategories],
  );

  const [selectedSlug, setSelectedSlug] = useState<string>(() =>
    getDefaultCategorySlug(categories, initialSlug)
  );
  const activeSlug =
    selectedSlug || getDefaultCategorySlug(categories, initialSlug);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(() => {
    const defaultSlug = getDefaultCategorySlug(categories, initialSlug);
    return categories.find((c) => c.slug === defaultSlug) || null;
  });
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState<number>(0);

  // Fetch category details and products whenever activeSlug changes
  useEffect(() => {
    if (!activeSlug) return;

    let isCancelled = false;

    const loadCategoryShowcase = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [categoryDetail, productsResponse] = await Promise.all([
          fetchCategoryBySlug(activeSlug),
          fetchProducts({ category: activeSlug }),
        ]);

        if (isCancelled) return;

        const fallbackFromList =
          categories.find((cat) => cat.slug === activeSlug) || null;
        setSelectedCategory(categoryDetail || fallbackFromList);
        setCategoryProducts(productsResponse.data || []);
      } catch (err) {
        if (isCancelled) return;
        const message =
          err instanceof Error ? err.message : 'Unable to load category showcase';
        setError(message);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadCategoryShowcase();

    return () => {
      isCancelled = true;
    };
  }, [activeSlug, refreshTick, categories]);

  const selectCategory = useCallback(
    (slug: string) => {
      if (!slug) return;
      setSelectedSlug(slug);
      router.push(buildCategoryRoute(slug));
    },
    [router],
  );

  const refreshCategory = useCallback(() => {
    setRefreshTick((prev) => prev + 1);
  }, []);

  const retryCategories = useCallback(() => {
    void refreshCategories();
  }, [refreshCategories]);

  return {
    categories,
    isCategoriesLoading: isCategoriesLoading && categories.length === 0,
    activeSlug,
    selectedCategory,
    categoryProducts,
    isLoading,
    error,
    selectCategory,
    refreshCategory,
    retryCategories,
  };
}
