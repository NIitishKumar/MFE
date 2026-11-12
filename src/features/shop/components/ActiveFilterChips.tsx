'use client';

import React from 'react';
import { X } from 'lucide-react';
import {
  type ActiveFilterChipsProps,
  resolveCategoryName,
  resolveRoomName,
  resolveCollectionName,
} from '../index';

/**
 * Pure presentational removable chip bar for all active query-param filters.
 */
export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  categories,
  rooms,
  collections,
  onFilterChange,
  onClearSearch,
  onResetFilters,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-[#F5F0E6] rounded-xl text-xs">
      <span className="text-[#8C827A] font-medium text-[11px] uppercase tracking-wider">
        Active:
      </span>

      {filters.search.trim() && (
        <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
          Search: &ldquo;{filters.search}&rdquo;
          <button
            type="button"
            onClick={onClearSearch}
            aria-label="Remove search filter"
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filters.category && (
        <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium capitalize">
          {resolveCategoryName(filters.category, categories)}
          <button
            type="button"
            onClick={() => onFilterChange({ category: '' })}
            aria-label="Remove category filter"
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filters.room && (
        <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium capitalize">
          Room: {resolveRoomName(filters.room, rooms)}
          <button
            type="button"
            onClick={() => onFilterChange({ room: '' })}
            aria-label="Remove room filter"
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filters.collectionSlug && (
        <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
          Collection: {resolveCollectionName(filters.collectionSlug, collections)}
          <button
            type="button"
            onClick={() => onFilterChange({ collectionSlug: '' })}
            aria-label="Remove collection filter"
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {(filters.minPrice > 0 || filters.maxPrice > 0) && (
        <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
          Price:{' '}
          {filters.minPrice > 0
            ? `₹${filters.minPrice.toLocaleString('en-IN')}`
            : '₹0'}{' '}
          -{' '}
          {filters.maxPrice > 0
            ? `₹${filters.maxPrice.toLocaleString('en-IN')}`
            : 'Any'}
          <button
            type="button"
            onClick={() => onFilterChange({ minPrice: 0, maxPrice: 0 })}
            aria-label="Remove price filter"
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filters.materials.map((m) => (
        <span
          key={m}
          className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium"
        >
          {m}
          <button
            type="button"
            onClick={() =>
              onFilterChange({
                materials: filters.materials.filter((item) => item !== m),
              })
            }
            aria-label={`Remove material ${m}`}
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filters.colors.map((c) => (
        <span
          key={c}
          className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium"
        >
          {c}
          <button
            type="button"
            onClick={() =>
              onFilterChange({
                colors: filters.colors.filter((item) => item !== c),
              })
            }
            aria-label={`Remove color ${c}`}
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filters.sizes.map((s) => (
        <span
          key={s}
          className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium"
        >
          {s}
          <button
            type="button"
            onClick={() =>
              onFilterChange({
                sizes: filters.sizes.filter((item) => item !== s),
              })
            }
            aria-label={`Remove size ${s}`}
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filters.badge && (
        <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
          Badge: {filters.badge}
          <button
            type="button"
            onClick={() => onFilterChange({ badge: '' })}
            aria-label="Remove badge filter"
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filters.availability !== 'all' && (
        <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
          {filters.availability === 'in-stock' ? 'In Stock' : 'Crafted to Order'}
          <button
            type="button"
            onClick={() => onFilterChange({ availability: 'all' })}
            aria-label="Remove availability filter"
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filters.rating > 0 && (
        <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
          {filters.rating}+ Stars
          <button
            type="button"
            onClick={() => onFilterChange({ rating: 0 })}
            aria-label="Remove rating filter"
            className="hover:text-black cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={onResetFilters}
        className="text-[#BA5D40] hover:underline font-semibold ml-auto text-xs cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
};

