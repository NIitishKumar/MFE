'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import {
  type CategoryProductsGridProps,
  getPreviewProducts,
} from '../index';

/**
 * Pure presentational grid displaying furniture pieces fetched from
 * GET /api/v1/products?category=:slug.
 */
export const CategoryProductsGrid: React.FC<CategoryProductsGridProps> = ({
  products,
  categoryName,
  categorySlug,
  isLoading,
  error,
  onRetry,
}) => {
  const previewProducts = getPreviewProducts(products, 4);

  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading category pieces"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[0, 1, 2, 3].map((slot) => (
          <div
            key={slot}
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
      <div className="rounded-2xl border border-[#E8DFD3] bg-[#FAF7F2] p-8 text-center space-y-3">
        <p className="text-sm text-[#57534E]">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2C241E] text-white text-xs font-semibold hover:bg-[#1C1917] transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Loading Pieces</span>
        </button>
      </div>
    );
  }

  if (previewProducts.length === 0) {
    return (
      <div className="rounded-2xl border border-[#EDE7DC] bg-white p-8 text-center space-y-2">
        <p className="font-serif text-lg text-[#1C1917]">
          No pieces found in {categoryName || categorySlug} yet.
        </p>
        <p className="text-xs text-[#78716C]">
          Explore our complete catalog for custom commissions and newly added designs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {previewProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > previewProducts.length && (
        <div className="flex justify-center pt-1">
          <Link
            href={`/category/${categorySlug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#443224] hover:text-[#1C1917] border border-[#DDD3C2] hover:border-[#443224] px-6 py-2.5 rounded-xl transition group"
          >
            <span>
              View All {products.length} {categoryName || categorySlug} Designs
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
      )}
    </div>
  );
};

