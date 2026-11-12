'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { ApiFallbackState } from '@/components/ui/ApiFallbackState';
import { type ProductShelfGridProps } from '../index';

/**
 * Pure presentational grid for product shelves with loading skeletons,
 * empty/error feedback, and pagination controls.
 */
export const ProductShelfGrid: React.FC<ProductShelfGridProps> = ({
  copy,
  products,
  activeCategory,
  pagination,
  hasPagination,
  isLoading,
  error,
  onPageChange,
  onResetCategory,
  onRetry,
}) => {
  if (isLoading && products.length === 0) {
    const skeletonCount = Math.max(1, pagination.limit || 4);
    return (
      <div
        aria-busy="true"
        aria-label={copy.loadingAriaLabel}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#EDE7DC] bg-[#FAF7F2] overflow-hidden animate-pulse"
          >
            <div className="aspect-4/3 bg-[#E8DFD3]" />
            <div className="p-4 space-y-2.5">
              <div className="h-3 w-1/3 bg-[#E8DFD3] rounded" />
              <div className="h-4 w-4/5 bg-[#E8DFD3] rounded" />
              <div className="h-3 w-2/3 bg-[#E8DFD3] rounded" />
              <div className="h-4 w-1/2 bg-[#E8DFD3] rounded pt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ApiFallbackState
        compact
        title={copy.emptyTitle}
        description={error}
        onRetry={onRetry}
      />
    );
  }

  if (products.length === 0) {
    return (
      <ApiFallbackState
        compact
        title={copy.emptyTitle}
        description={
          activeCategory
            ? copy.emptyCategorySubtitle
            : copy.emptyDefaultSubtitle
        }
        onRetry={activeCategory ? onResetCategory : onRetry}
        retryLabel={activeCategory ? copy.resetCategoryLabel : 'Retry Connection'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-200 ${
          isLoading ? 'opacity-60' : 'opacity-100'
        }`}
      >
        {products.map((prod, idx) => (
          <ProductCard key={prod.id} product={prod} priority={idx < 2} />
        ))}
      </div>

      {hasPagination && (
        <div className="flex items-center justify-between pt-2 border-t border-[#EDE7DC]">
          <span className="text-xs text-[#78716C]">
            Page <strong className="text-[#1C1917]">{pagination.page}</strong> of{' '}
            <strong className="text-[#1C1917]">{pagination.totalPages}</strong> (
            {pagination.total} pieces)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1 || isLoading}
              aria-label={copy.prevPageAriaLabel}
              className="p-2 rounded-xl border border-[#D5C9B8] bg-white text-[#1C1917] hover:bg-[#F5F0E6] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || isLoading}
              aria-label={copy.nextPageAriaLabel}
              className="p-2 rounded-xl border border-[#D5C9B8] bg-white text-[#1C1917] hover:bg-[#F5F0E6] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

