'use client';

import React from 'react';
import { ProductShelfHeader } from '@/features/product-shelf';
import {
  type BestSellersHeaderProps,
  type BestSellersSortOption,
  BEST_SELLERS_COPY,
  BEST_SELLERS_SORT_OPTIONS,
  BEST_SELLERS_SHOW_SORT_FILTER,
  buildBestSellersExploreHref,
} from '../index';

/**
 * Pure presentational header for Best Sellers with category pills and optional sort control.
 */
export const BestSellersHeader: React.FC<BestSellersHeaderProps> = ({
  categories,
  activeCategory,
  activeSortBy,
  showSort = BEST_SELLERS_SHOW_SORT_FILTER,
  onSelectCategory,
  onSelectSortBy,
}) => {
  return (
    <ProductShelfHeader
      copy={BEST_SELLERS_COPY}
      categories={categories}
      activeCategory={activeCategory}
      activeSortBy={activeSortBy}
      sortOptions={BEST_SELLERS_SORT_OPTIONS}
      exploreHref={buildBestSellersExploreHref(activeCategory)}
      showSort={showSort}
      onSelectCategory={onSelectCategory}
      onSelectSortBy={(sort) => onSelectSortBy(sort as BestSellersSortOption)}
    />
  );
};

