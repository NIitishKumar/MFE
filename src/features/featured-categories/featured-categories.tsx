'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  type FeaturedCategoriesProps,
  useFeaturedCategories,
  CategoryCardGrid,
  CategoryDetailBanner,
  CategoryProductsGrid,
} from './index';

/**
 * Main View component for the Home Page Featured Categories section.
 * Delegates state and relational category/product fetching to useFeaturedCategories.
 */
export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  initialCategories,
  initialSlug,
}) => {
  const {
    categories,
    isCategoriesLoading,
    activeSlug,
    selectedCategory,
    categoryProducts,
    isLoading,
    error,
    selectCategory,
    refreshCategory,
    retryCategories,
  } = useFeaturedCategories(initialCategories, initialSlug);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
            Curated Catalog
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-normal mt-1">
            Featured Categories
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs uppercase tracking-wider font-semibold text-[#443224] hover:text-[#1C1917] flex items-center gap-1 mt-2 sm:mt-0 transition group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
        </Link>
      </div>

      <CategoryCardGrid
        categories={categories}
        isCategoriesLoading={isCategoriesLoading}
        activeSlug={activeSlug}
        onSelectCategory={selectCategory}
        onRetry={retryCategories}
      />

      {/* {activeSlug && (
        <div className="space-y-6 pt-2">
          <CategoryDetailBanner
            category={selectedCategory}
            activeSlug={activeSlug}
            productCount={categoryProducts.length}
            isLoading={isLoading}
          />
          <CategoryProductsGrid
            products={categoryProducts}
            categoryName={selectedCategory?.name}
            categorySlug={activeSlug}
            isLoading={isLoading}
            error={error}
            onRetry={refreshCategory}
          />
        </div>
      )} */}
    </section>
  );
};

