'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ChevronRight, X, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { FilterState } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar } from '@/components/ui/FilterSidebar';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialFilter = searchParams.get('filter') || '';
  const initialRoom = searchParams.get('room') || '';

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: initialCategory,
    room: initialRoom,
    minPrice: 15000,
    maxPrice: 250000,
    materials: [],
    colors: [],
    sizes: [],
    availability: 'all',
    rating: 0,
    sortBy: initialFilter === 'new' ? 'newest' : initialFilter === 'best-seller' ? 'rating' : 'featured'
  });

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      room: '',
      minPrice: 15000,
      maxPrice: 250000,
      materials: [],
      colors: [],
      sizes: [],
      availability: 'all',
      rating: 0,
      sortBy: 'featured'
    });
  };

  // Filtered and Sorted Products computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Room filter
      if (filters.room && product.room !== filters.room) {
        return false;
      }

      // Price filter
      if (product.price > filters.maxPrice) {
        return false;
      }

      // Materials filter
      if (filters.materials.length > 0) {
        const matchesMaterial = filters.materials.some((m) =>
          product.materials.some((pm) => pm.toLowerCase().includes(m.toLowerCase()))
        );
        if (!matchesMaterial) return false;
      }

      // Colors filter
      if (filters.colors.length > 0) {
        const matchesColor = filters.colors.some((colName) => {
          const keyword = colName.split('/')[0].trim().toLowerCase();
          return product.colors.some((c) => c.name.toLowerCase().includes(keyword));
        });
        if (!matchesColor) return false;
      }

      // Availability filter
      if (filters.availability === 'in-stock' && !product.inStock) {
        return false;
      }
      if (
        filters.availability === 'made-to-order' &&
        !product.badges?.includes('Crafted to Order')
      ) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') {
        const aNew = a.badges?.includes('New') ? 1 : 0;
        const bNew = b.badges?.includes('New') ? 1 : 0;
        return bNew - aNew;
      }
      return 0; // featured default
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-medium">Shop Furniture</span>
        {filters.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
            <span className="capitalize text-[#443224] font-semibold">{filters.category}</span>
          </>
        )}
      </nav>

      {/* Heading & Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8DFD3]">
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

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-white text-xs font-semibold text-[#1C1917] hover:bg-[#F5F0E6] transition cursor-pointer shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#443224]" />
            <span>Filters</span>
            {filters.category || filters.materials.length > 0 || filters.rating > 0 ? (
              <span className="w-2 h-2 rounded-full bg-[#BA5D40]" />
            ) : null}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1917] shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8C827A] mr-2 shrink-0" />
            <span className="text-[#8C827A] mr-1.5 hidden sm:inline">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
              className="bg-transparent focus:outline-hidden text-xs font-semibold text-[#1C1917] cursor-pointer"
            >
              <option value="featured">Curator&apos;s Choice</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Additions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-28 bg-[#FFFFFF] p-6 rounded-2xl border border-[#EDE7DC] shadow-xs">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            productCount={filteredProducts.length}
          />
        </div>

        {/* Product Grid Area (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Active Filter Chips Bar */}
          {(filters.category || filters.materials.length > 0 || filters.colors.length > 0 || filters.rating > 0) && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-[#F5F0E6] rounded-xl text-xs">
              <span className="text-[#8C827A] font-medium text-[11px] uppercase tracking-wider">Active:</span>
              {filters.category && (
                <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
                  {filters.category}
                  <button onClick={() => handleFilterChange({ category: '' })} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.materials.map((m) => (
                <span key={m} className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
                  {m}
                  <button
                    onClick={() =>
                      handleFilterChange({ materials: filters.materials.filter((item) => item !== m) })
                    }
                    className="hover:text-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filters.colors.map((c) => (
                <span key={c} className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
                  {c.split('/')[0]}
                  <button
                    onClick={() =>
                      handleFilterChange({ colors: filters.colors.filter((item) => item !== c) })
                    }
                    className="hover:text-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filters.rating > 0 && (
                <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E0D5C5] text-[#443224] font-medium">
                  {filters.rating}+ Stars
                  <button onClick={() => handleFilterChange({ rating: 0 })} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[#BA5D40] hover:underline font-semibold ml-auto text-xs"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#EDE7DC] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F0E6] mx-auto flex items-center justify-center text-[#8C827A]">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1C1917]">
                No matching furniture found
              </h3>
              <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                Try widening your price range, clearing selected material chips, or viewing all categories.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-[#2C241E] text-white text-xs font-semibold py-3 px-6 rounded-xl hover:bg-[#443224] transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer (Bottom Sheet) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-[#EFE8DC] flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Filter Furniture</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-[#57534E] hover:text-[#1C1917] rounded-full hover:bg-[#F2ECE1] transition cursor-pointer"
                aria-label="Close filter drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                productCount={filteredProducts.length}
              />
            </div>

            <div className="p-4 border-t border-[#EFE8DC] bg-[#FAF7F2] flex gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-1/3 py-3 rounded-xl border border-[#D5C9B8] text-xs font-semibold text-[#57534E]"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-2/3 bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3 rounded-xl transition"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
