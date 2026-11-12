'use client';

import React from 'react';
import {
  type BestSellersProps,
  BEST_SELLERS_DEFAULT_LIMIT,
  BEST_SELLERS_SHOW_SORT_FILTER,
  useBestSellers,
  BestSellersHeader,
  BestSellersGrid,
} from './index';

/**
 * Main View component for the Home Page Best Sellers showcase.
 * Connects useBestSellers hook to pure presentational Header and Grid sub-components.
 */
export const BestSellers: React.FC<BestSellersProps> = ({
  initialData,
  initialCategories,
  limit = BEST_SELLERS_DEFAULT_LIMIT,
  showSort = BEST_SELLERS_SHOW_SORT_FILTER,
}) => {
  const {
    products,
    categories,
    query,
    pagination,
    isLoading,
    error,
    hasPagination,
    selectCategory,
    selectSortBy,
    goToPage,
    retry,
  } = useBestSellers(initialData, initialCategories, limit);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <BestSellersHeader
        categories={categories}
        activeCategory={query.category}
        activeSortBy={query.sortBy}
        showSort={showSort}
        onSelectCategory={selectCategory}
        onSelectSortBy={selectSortBy}
      />

      <BestSellersGrid
        products={products}
        activeCategory={query.category}
        pagination={pagination}
        hasPagination={hasPagination}
        isLoading={isLoading}
        error={error}
        onPageChange={goToPage}
        onResetCategory={() => selectCategory('')}
        onRetry={retry}
      />
    </section>
  );
};

