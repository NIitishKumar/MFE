'use client';

import React from 'react';
import {
  type ProductShelfProps,
  useProductShelf,
  buildShelfExploreHref,
  ProductShelfHeader,
  ProductShelfGrid,
} from './index';

/**
 * Generic Product Shelf View component connecting useProductShelf to pure Header and Grid views.
 */
export const ProductShelf: React.FC<ProductShelfProps> = ({
  config,
  initialData,
  initialCategories,
  limit,
  showSort,
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
  } = useProductShelf(
    config,
    initialData,
    initialCategories,
    limit ?? config.defaultLimit,
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <ProductShelfHeader
        copy={config.copy}
        categories={categories}
        activeCategory={query.category}
        activeSortBy={query.sortBy}
        sortOptions={config.sortOptions}
        exploreHref={buildShelfExploreHref(
          config.exploreFilterParam,
          query.category,
        )}
        showSort={showSort ?? config.showSortDefault}
        onSelectCategory={selectCategory}
        onSelectSortBy={selectSortBy}
      />

      <ProductShelfGrid
        copy={config.copy}
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

