'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ApiFallbackState } from '@/components/ui/ApiFallbackState';
import {
  type CategoryCardGridProps,
  formatDesignCountLabel,
  formatRoomReference,
  buildCategoryRoute,
} from '../index';

/**
 * Pure presentational editorial grid of featured furniture categories.
 * Both the top category selector options and category cards trigger navigation
 * to `/category/[slug]` on click.
 */
export const CategoryCardGrid: React.FC<CategoryCardGridProps> = ({
  categories,
  isCategoriesLoading,
  activeSlug,
  onSelectCategory,
  onRetry,
}) => {
  if (isCategoriesLoading && categories.length === 0) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading featured categories"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {[0, 1, 2, 3].map((slot) => (
          <div
            key={slot}
            className={`rounded-2xl bg-[#F5F0E6] border border-[#E8DFD3] animate-pulse ${
              slot === 0
                ? 'col-span-2 md:col-span-1 lg:col-span-2 aspect-16/10 sm:aspect-auto min-h-[240px]'
                : 'aspect-4/5'
            }`}
          />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <ApiFallbackState
        compact
        title="Categories are currently unavailable"
        description="Unable to load categories from the backend catalog API. Please check that the API service is running and try again."
        onRetry={onRetry}
        allowPageRetry={!onRetry}
        actionHref="/shop"
        actionLabel="Browse Shop"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Interactive Category Selector Pills */}
      <div
        role="tablist"
        aria-label="Browse categories interactively"
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
      >
        {categories.map((cat) => {
          const isSelected = cat.slug === activeSlug;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition shrink-0 cursor-pointer border ${
                isSelected
                  ? 'bg-[#2C241E] text-[#FDFBF7] border-[#2C241E] shadow-xs'
                  : 'bg-[#F5F0E6] text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0] hover:text-[#1C1917]'
              }`}
            >
              {cat.name}
              <span
                className={`ml-1.5 text-[10px] ${
                  isSelected ? 'text-[#D4AF37]' : 'text-[#8C827A]'
                }`}
              >
                ({cat.itemCount})
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Editorial Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, idx) => {
          const isSelected = cat.slug === activeSlug;
          const spanClass =
            idx === 0
              ? 'col-span-2 md:col-span-1 lg:col-span-2 aspect-16/10 sm:aspect-auto'
              : 'aspect-4/5';

          return (
            <div
              key={cat.id}
              className={`group relative rounded-2xl overflow-hidden bg-[#F5F0E6] border transition-all duration-300 hover:shadow-lg ${spanClass} ${
                isSelected
                  ? 'border-[#B89758] ring-2 ring-[#B89758]/40 shadow-md'
                  : 'border-[#E8DFD3]'
              }`}
            >
              {/* Navigate to Category Page Action Button Covering Card Surface */}
              <button
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                aria-label={`Open ${cat.name} category`}
                className="w-full h-full block text-left cursor-pointer focus:outline-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Active Room & Preview Indicator */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-[#EDE5DA] border border-white/15 font-medium">
                    {formatRoomReference(cat.room)}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#1C1917] font-semibold">
                      Viewing
                    </span>
                  )}
                </div>

                {/* Bottom Details */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 pr-14 text-white">
                  <h3 className="font-serif text-lg sm:text-2xl font-medium">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#D8CFBF] mt-0.5 hidden sm:block line-clamp-1">
                    {cat.description}
                  </p>
                  <span className="text-[11px] text-[#C5A059] font-medium tracking-wide block mt-0.5">
                    {formatDesignCountLabel(cat.itemCount)}
                  </span>
                </div>
              </button>

              {/* Sibling Direct Link to Full Category Page */}
              <Link
                href={buildCategoryRoute(cat.slug)}
                aria-label={`Open full ${cat.name} collection page`}
                title={`Open ${cat.name} Page`}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#1C1917] transition shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

