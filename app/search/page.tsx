'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ChevronRight, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Product } from '@/types';
import { fetchProducts } from '@/services/api';
import { ProductCard } from '@/components/ui/ProductCard';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    fetchProducts({ search: query.trim() || undefined })
      .then((res) => {
        if (active) {
          setResults(res.data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query]);

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
        <span className="text-[#1C1917] font-semibold">Search Results</span>
      </nav>

      {/* Header */}
      <div className="pb-6 border-b border-[#E8DFD3]">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
          Search Inquiry
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
          {query ? (
            <>
              Results for &ldquo;<span className="italic">{query}</span>&rdquo;
            </>
          ) : (
            'All Products Search'
          )}
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1">
          {isLoading
            ? 'Querying architectural catalog...'
            : `Showing ${results.length} heirloom pieces matching your query`}
        </p>
      </div>

      {/* Results Grid */}
      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3 text-neutral-400">
          <Loader2 className="w-6 h-6 animate-spin text-[#8b633b]" />
          <span className="text-xs uppercase tracking-widest font-mono">Searching pieces...</span>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EDE7DC] space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F5F0E6] mx-auto flex items-center justify-center text-[#8C827A]">
            <Search className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-xl font-medium text-[#1C1917]">
            We couldn&apos;t find anything matching &ldquo;{query}&rdquo;
          </h2>
          <p className="text-xs text-[#78716C]">
            Try checking for spelling errors, using more general terms, or exploring our room collections.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3 px-6 rounded-xl transition"
            >
              Browse Complete Catalog
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm">Searching catalog...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
