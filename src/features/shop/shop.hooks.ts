'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  fetchProducts,
  fetchProductFilters,
  fetchCollections,
  fetchRooms,
} from '@/services/api';
import { useStore } from '@/context/StoreContext';
import {
  type FilterState,
  type Product,
  type ProductFiltersMeta,
  type Collection,
  type Room,
  type ShopPaginationState,
  type UseShopReturn,
  DEFAULT_SHOP_LIMIT,
  DEFAULT_SHOP_PAGE,
  parseFiltersFromSearchParams,
  buildShopUrlQuery,
  checkHasActiveFilters,
  extractSizesFromProducts,
  extractBadgesFromProducts,
  buildColorHexMap,
} from './index';

/**
 * Controller hook driving the Shop page catalogue:
 * - Reads & synchronizes all 15 filter/sort/pagination params with URL query string
 * - Fetches dynamic filter metadata (/api/v1/products/filters, /collections, /rooms)
 * - Fetches live filtered & paginated products from GET /api/v1/products
 */
export function useShop(): UseShopReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname() || '/shop';
  const { categories, products: catalogProducts } = useStore();

  const filters = useMemo<FilterState>(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams],
  );

  const [searchInput, setSearchInput] = useState<string>(() => filters.search);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<ShopPaginationState>({
    count: 0,
    total: 0,
    page: filters.page ?? DEFAULT_SHOP_PAGE,
    limit: filters.limit ?? DEFAULT_SHOP_LIMIT,
    totalPages: 1,
  });
  const [filterMeta, setFilterMeta] = useState<ProductFiltersMeta | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pushQueryToUrl = useCallback(
    (nextFilters: FilterState) => {
      const qs = buildShopUrlQuery(nextFilters);
      const targetUrl = qs ? `${pathname}?${qs}` : pathname;
      router.replace(targetUrl, { scroll: false });
    },
    [pathname, router],
  );

  const updateFilters = useCallback(
    (updated: Partial<FilterState>) => {
      const shouldResetPage = updated.page === undefined;
      const nextFilters: FilterState = {
        ...filters,
        ...updated,
        page: shouldResetPage ? DEFAULT_SHOP_PAGE : updated.page,
      };
      if (updated.search !== undefined) {
        setSearchInput(updated.search);
      }
      pushQueryToUrl(nextFilters);
    },
    [filters, pushQueryToUrl],
  );

  const setPage = useCallback(
    (page: number) => {
      const safePage = Math.max(1, page);
      pushQueryToUrl({ ...filters, page: safePage });
    },
    [filters, pushQueryToUrl],
  );

  const resetFilters = useCallback(() => {
    setSearchInput('');
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  // Debounce search text input into URL ?search= query param
  useEffect(() => {
    const trimmedInput = searchInput.trim();
    const trimmedFilter = filters.search.trim();
    if (trimmedInput === trimmedFilter) return;

    const timer = setTimeout(() => {
      pushQueryToUrl({
        ...filters,
        search: trimmedInput,
        page: DEFAULT_SHOP_PAGE,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, filters, pushQueryToUrl]);

  // Fetch filter metadata, collections, and rooms once on mount
  useEffect(() => {
    let active = true;
    const loadMeta = async () => {
      const [metaRes, collectionsRes, roomsRes] = await Promise.all([
        fetchProductFilters(),
        fetchCollections(),
        fetchRooms(),
      ]);
      if (!active) return;
      setFilterMeta(metaRes);
      setCollections(collectionsRes);
      setRooms(roomsRes);
    };
    loadMeta();
    return () => {
      active = false;
    };
  }, []);

  // Fetch live filtered products whenever URL-derived filters change
  useEffect(() => {
    let isCancelled = false;

    const loadFilteredProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetchProducts(filters);
        if (isCancelled) return;
        setProducts(res.data);
        setPagination({
          count: res.count,
          total: res.total,
          page: res.page,
          limit: res.limit,
          totalPages: res.totalPages,
        });
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadFilteredProducts();

    return () => {
      isCancelled = true;
    };
  }, [filters]);

  const optionSourceProducts =
    catalogProducts.length > 0 ? catalogProducts : products;

  const availableSizes = useMemo(
    () => extractSizesFromProducts(optionSourceProducts, filters.sizes),
    [optionSourceProducts, filters.sizes],
  );

  const availableBadges = useMemo(
    () => extractBadgesFromProducts(optionSourceProducts, filters.badge),
    [optionSourceProducts, filters.badge],
  );

  const colorHexMap = useMemo(
    () => buildColorHexMap(optionSourceProducts),
    [optionSourceProducts],
  );

  const hasActiveFilters = useMemo(
    () => checkHasActiveFilters(filters),
    [filters],
  );

  return {
    filters,
    searchInput,
    setSearchInput,
    products,
    pagination,
    filterMeta,
    categories,
    collections,
    rooms,
    availableSizes,
    availableBadges,
    colorHexMap,
    isLoading,
    hasActiveFilters,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    updateFilters,
    setPage,
    resetFilters,
  };
}

