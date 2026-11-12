'use client';

import React from 'react';
import { ProductShelfHeader } from '@/features/product-shelf';
import {
  type NewArrivalsHeaderProps,
  type NewArrivalsSortOption,
  NEW_ARRIVALS_COPY,
  NEW_ARRIVALS_SORT_OPTIONS,
  NEW_ARRIVALS_SHOW_SORT_FILTER,
  buildNewArrivalsExploreHref,
} from '../index';

/**
 * Pure presentational header for New Arrivals with category pills and optional sort control.
 */
export const NewArrivalsHeader: React.FC<NewArrivalsHeaderProps> = ({
  categories,
  activeCategory,
  activeSortBy,
  showSort = NEW_ARRIVALS_SHOW_SORT_FILTER,
  onSelectCategory,
  onSelectSortBy,
}) => {
  return (
    <ProductShelfHeader
      copy={NEW_ARRIVALS_COPY}
      categories={categories}
      activeCategory={activeCategory}
      activeSortBy={activeSortBy}
      sortOptions={NEW_ARRIVALS_SORT_OPTIONS}
      exploreHref={buildNewArrivalsExploreHref(activeCategory)}
      showSort={showSort}
      onSelectCategory={onSelectCategory}
      onSelectSortBy={(sort) => onSelectSortBy(sort as NewArrivalsSortOption)}
    />
  );
};
