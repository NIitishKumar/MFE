import React from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { fetchCategoryBySlug, fetchProducts } from '@/services/api';
import { ProductCard } from '@/components/ui/ProductCard';
import { ApiFallbackState } from '@/components/ui/ApiFallbackState';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, { data: categoryProducts }] = await Promise.all([
    fetchCategoryBySlug(slug),
    fetchProducts({ category: slug }),
  ]);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ApiFallbackState
          title="Category could not be loaded"
          description="We could not reach this category in the backend catalog API. Please verify the backend service is running or browse another section."
          allowPageRetry
          actionHref="/"
          actionLabel="Back to Home"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <Link href="/shop" className="hover:text-[#1C1917] transition">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">{category.name}</span>
      </nav>

      {/* Category Editorial Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-[#2C241E] text-white p-8 sm:p-14 border border-[#3E332A] shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Department
            </span>
            {category.room && (
              <Link
                href={`/shop?room=${category.room}`}
                className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-[#EDE5DA] transition capitalize"
              >
                Room: {category.room.replace(/-/g, ' ')}
              </Link>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white">
            {category.name} Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#DDD3C5] font-light leading-relaxed">
            {category.description}
          </p>
          <div className="pt-2 text-xs text-[#C5A059] font-medium">
            {categoryProducts.length} Heirloom Designs Available
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="pt-4">
        {categoryProducts.length === 0 ? (
          <ApiFallbackState
            compact
            title={`No pieces found in ${category.name}`}
            description="No products were returned from the API for this category right now."
            allowPageRetry
            actionHref="/shop"
            actionLabel="Browse Full Catalog"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
