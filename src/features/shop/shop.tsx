'use client';

import React from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ChevronRight, X, Loader2 } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { ApiFallbackState } from '@/components/ui/ApiFallbackState';
import {
  useShop,
  ShopHeaderBar,
  ActiveFilterChips,
  ShopPagination,
  resolveCategoryName,
} from './index';

/**
 * Main View component for the Shop Catalogue page.
 * All filtering, URL query-param sync, and API loading are delegated to useShop.
 */
export const ShopCatalogView: React.FC = () => {
  const {
    filters,
    searchInput,
    setSearchInput,
    products,
    pagination,
    filterMeta,
    categories,
    collections,
    rooms,
    availableSizes,
    availableBadges,
    colorHexMap,
    isLoading,
    hasActiveFilters,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    updateFilters,
    setPage,
    resetFilters,
  } = useShop();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput.trim() });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateFilters({ search: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-[#8C827A]"
      >
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-medium">Shop Furniture</span>
        {filters.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
            <span className="capitalize text-[#443224] font-semibold">
              {resolveCategoryName(filters.category, categories)}
            </span>
          </>
        )}
      </nav>

      {/* Header, Search & Sort Controls */}
      <ShopHeaderBar
        filters={filters}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onClearSearch={handleClearSearch}
        onFilterChange={updateFilters}
        onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-28 bg-[#FFFFFF] p-6 rounded-2xl border border-[#EDE7DC] shadow-xs">
          <FilterSidebar
            filters={filters}
            onFilterChange={updateFilters}
            onReset={resetFilters}
            productCount={pagination.total}
            filterMeta={filterMeta}
            categories={categories}
            rooms={rooms}
            collections={collections}
            availableSizes={availableSizes}
            availableBadges={availableBadges}
            colorHexMap={colorHexMap}
          />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-9 space-y-6">
          {hasActiveFilters && (
            <ActiveFilterChips
              filters={filters}
              categories={categories}
              rooms={rooms}
              collections={collections}
              onFilterChange={updateFilters}
              onClearSearch={handleClearSearch}
              onResetFilters={resetFilters}
            />
          )}

          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-neutral-400">
              <Loader2 className="w-6 h-6 animate-spin text-[#8b633b]" />
              <span className="text-xs uppercase tracking-widest font-mono">
                Loading Catalogue...
              </span>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {products.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
              <ShopPagination
                pagination={pagination}
                onPageChange={setPage}
              />
            </>
          ) : hasActiveFilters ? (
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
                onClick={resetFilters}
                className="bg-[#2C241E] text-white text-xs font-semibold py-3 px-6 rounded-xl hover:bg-[#443224] transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <ApiFallbackState
              title="Catalog is currently unavailable"
              description="Unable to load furniture pieces from the backend API. Confirm the backend server is running and retry."
              allowPageRetry
              actionHref="/"
              actionLabel="Back to Home"
            />
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-[#EFE8DC] flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Filter Furniture
              </h3>
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
                onFilterChange={updateFilters}
                onReset={resetFilters}
                productCount={pagination.total}
                filterMeta={filterMeta}
                categories={categories}
                rooms={rooms}
                collections={collections}
                availableSizes={availableSizes}
                availableBadges={availableBadges}
                colorHexMap={colorHexMap}
              />
            </div>

            <div className="p-4 border-t border-[#EFE8DC] bg-[#FAF7F2] flex gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="w-1/3 py-3 rounded-xl border border-[#D5C9B8] text-xs font-semibold text-[#57534E]"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-2/3 bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3 rounded-xl transition"
              >
                Show {pagination.total} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

