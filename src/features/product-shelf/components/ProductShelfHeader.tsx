'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpDown } from 'lucide-react';
import {
  type ProductShelfHeaderProps,
  type ProductShelfSortOption,
} from '../index';

/**
 * Pure presentational header for product shelves with category filter tabs and optional sort control.
 */
export const ProductShelfHeader: React.FC<ProductShelfHeaderProps> = ({
  copy,
  categories,
  activeCategory,
  activeSortBy,
  sortOptions,
  exploreHref,
  showSort,
  onSelectCategory,
  onSelectSortBy,
}) => {
  return (
    <div className="space-y-5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
            {copy.eyebrow}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-normal mt-1">
            {copy.title}
          </h2>
          <p className="text-xs text-[#78716C] mt-1">{copy.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {showSort && (
            <div className="relative flex items-center bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1917] shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8C827A] mr-2 shrink-0" />
              <span className="text-[#8C827A] mr-1.5">Sort:</span>
              <select
                value={activeSortBy}
                onChange={(e) =>
                  onSelectSortBy(e.target.value as ProductShelfSortOption)
                }
                aria-label={copy.sortAriaLabel}
                className="bg-transparent focus:outline-hidden text-xs font-semibold text-[#1C1917] cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Link
            href={exploreHref}
            className="text-xs uppercase tracking-wider font-semibold text-[#443224] hover:text-[#1C1917] flex items-center gap-1 transition group"
          >
            <span>{copy.exploreLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
      </div>

      {categories.length > 0 && (
        <div
          role="tablist"
          aria-label={copy.categoryTabsAriaLabel}
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === ''}
            onClick={() => onSelectCategory('')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition shrink-0 cursor-pointer border ${
              activeCategory === ''
                ? 'bg-[#2C241E] text-[#FDFBF7] border-[#2C241E]'
                : 'bg-[#F5F0E6] text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0] hover:text-[#1C1917]'
            }`}
          >
            {copy.allCategoriesLabel}
          </button>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectCategory(isSelected ? '' : cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#2C241E] text-[#FDFBF7] border-[#2C241E]'
                    : 'bg-[#F5F0E6] text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0] hover:text-[#1C1917]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

