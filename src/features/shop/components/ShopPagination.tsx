'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ShopPaginationProps } from '../index';

/**
 * Pure presentational pagination bar synced with API page / totalPages metadata.
 */
export const ShopPagination: React.FC<ShopPaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  if (pagination.totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: pagination.totalPages },
    (_, idx) => idx + 1,
  );

  return (
    <div className="pt-8 border-t border-[#E8DFD3] flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-[#78716C]">
        Showing page <strong className="text-[#1C1917]">{pagination.page}</strong>{' '}
        of <strong className="text-[#1C1917]">{pagination.totalPages}</strong> (
        {pagination.total} pieces)
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
          aria-label="Previous page"
          className="p-2 rounded-xl border border-[#D5C9B8] bg-white text-[#1C1917] hover:bg-[#F5F0E6] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((pageNum) => {
          const isCurrent = pageNum === pagination.page;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-current={isCurrent ? 'page' : undefined}
              className={`min-w-[36px] h-9 px-3 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                isCurrent
                  ? 'bg-[#2C241E] text-white border-[#2C241E]'
                  : 'bg-white text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0]'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.totalPages}
          aria-label="Next page"
          className="p-2 rounded-xl border border-[#D5C9B8] bg-white text-[#1C1917] hover:bg-[#F5F0E6] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

