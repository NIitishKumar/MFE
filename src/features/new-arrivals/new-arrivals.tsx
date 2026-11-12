'use client';

import React from 'react';
import {
  type NewArrivalsProps,
  NEW_ARRIVALS_DEFAULT_LIMIT,
  NEW_ARRIVALS_SHOW_SORT_FILTER,
  useNewArrivals,
  NewArrivalsHeader,
  NewArrivalsGrid,
} from './index';

/**
 * Main View component for the Home Page New Arrivals showcase.
 * Connects useNewArrivals hook to pure presentational Header and Grid sub-components.
 */
export const NewArrivals: React.FC<NewArrivalsProps> = ({
  initialData,
  initialCategories,
  limit = NEW_ARRIVALS_DEFAULT_LIMIT,
  showSort = NEW_ARRIVALS_SHOW_SORT_FILTER,
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
  } = useNewArrivals(initialData, initialCategories, limit);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <NewArrivalsHeader
        categories={categories}
        activeCategory={query.category}
        activeSortBy={query.sortBy}
        showSort={showSort}
        onSelectCategory={selectCategory}
        onSelectSortBy={selectSortBy}
      />

      <NewArrivalsGrid
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
