'use client';

import React from 'react';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  X,
} from 'lucide-react';
import type { FilterState, ShopHeaderBarProps } from '../index';

/**
 * Pure presentational Shop header controls for search, sorting, page limit,
 * and mobile filter trigger.
 */
export const ShopHeaderBar: React.FC<ShopHeaderBarProps> = ({
  filters,
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  onClearSearch,
  onFilterChange,
  onOpenMobileFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#E8DFD3]">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
          Architectural Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal mt-1">
          Shop Furniture
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1.5 max-w-xl">
          Heirloom-grade furniture sculpted with geological stone, solid American hardwoods, and tactile European upholstery.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Inline Search Form (?search=) */}
        <form
          onSubmit={onSearchSubmit}
          className="relative flex items-center bg-white border border-[#D5C9B8] focus-within:border-[#443224] rounded-xl px-3 py-2 text-xs text-[#1C1917] shadow-2xs w-full sm:w-56"
        >
          <Search className="w-3.5 h-3.5 text-[#8C827A] mr-2 shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            placeholder="Search pieces, materials..."
            aria-label="Search shop furniture"
            className="w-full bg-transparent focus:outline-hidden text-xs text-[#1C1917] placeholder-[#9A8F82]"
          />
          {searchInput && (
            <button
              type="button"
              onClick={onClearSearch}
              aria-label="Clear search"
              className="text-[#8C827A] hover:text-[#1C1917] ml-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Mobile Filter Toggle */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D5C9B8] bg-white text-xs font-semibold text-[#1C1917] hover:bg-[#F5F0E6] transition cursor-pointer shadow-2xs"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#443224]" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#BA5D40]" />
          )}
        </button>

        {/* Sort Dropdown (?sortBy=) */}
        <div className="relative flex items-center bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1917] shadow-2xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#8C827A] mr-2 shrink-0" />
          <span className="text-[#8C827A] mr-1.5 hidden sm:inline">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                sortBy: e.target.value as FilterState['sortBy'],
              })
            }
            aria-label="Sort products"
            className="bg-transparent focus:outline-hidden text-xs font-semibold text-[#1C1917] cursor-pointer"
          >
            <option value="featured">Curator&apos;s Choice</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Additions</option>
          </select>
        </div>

        {/* Page Size Limit (?limit=) */}
        <div className="relative flex items-center bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1917] shadow-2xs">
          <span className="text-[#8C827A] mr-1.5">Show:</span>
          <select
            value={filters.limit ?? 12}
            onChange={(e) => onFilterChange({ limit: Number(e.target.value) })}
            aria-label="Items per page"
            className="bg-transparent focus:outline-hidden text-xs font-semibold text-[#1C1917] cursor-pointer"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
          </select>
        </div>
      </div>
    </div>
  );
};

