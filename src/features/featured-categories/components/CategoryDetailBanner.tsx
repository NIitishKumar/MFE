'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import {
  type CategoryDetailBannerProps,
  formatDesignCountLabel,
  formatRoomReference,
} from '../index';

/**
 * Pure presentational banner displaying relational metadata from GET /api/v1/categories/:slug.
 */
export const CategoryDetailBanner: React.FC<CategoryDetailBannerProps> = ({
  category,
  activeSlug,
  productCount,
  isLoading,
}) => {
  if (!category && !isLoading) {
    return null;
  }

  const displayCount = productCount > 0 ? productCount : category?.itemCount ?? 0;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-[#2C241E] text-white p-6 sm:p-10 border border-[#3E332A] shadow-lg">
      {category?.image && (
        <div className="absolute inset-0 z-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover brightness-[0.35] transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37] font-semibold inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Category Spotlight
            </span>
            {category?.room && (
              <Link
                href={`/shop?room=${category.room}`}
                className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-[#EDE5DA] inline-flex items-center gap-1.5 transition"
              >
                <Compass className="w-3 h-3 text-[#D4AF37]" />
                <span>Room: {formatRoomReference(category.room)}</span>
              </Link>
            )}
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl font-light text-white">
            {isLoading && !category
              ? 'Loading category...'
              : `${category?.name || activeSlug} Collection`}
          </h3>

          {category?.description && (
            <p className="text-xs sm:text-sm text-[#DDD3C5] font-light leading-relaxed">
              {category.description}
            </p>
          )}

          <p className="text-xs text-[#C5A059] font-medium pt-1">
            {formatDesignCountLabel(displayCount)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href={`/category/${category?.slug || activeSlug}`}
            className="bg-[#FDFBF7] hover:bg-white text-[#1C1917] font-semibold text-xs px-5 py-3 rounded-xl shadow-md transition inline-flex items-center gap-2 group"
          >
            <span>Open {category?.name || 'Category'} Page</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
};

