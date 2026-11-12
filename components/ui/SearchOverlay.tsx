'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, History, Sparkles, TrendingUp } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import { fetchProducts } from '@/services/api';

export function SearchOverlay() {
  const router = useRouter();
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    products,
    formatINR
  } = useStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [liveResults, setLiveResults] = useState<Product[]>([]);
  const displayedResults = searchQuery.trim() ? liveResults : [];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isSearchOpen]);

  useEffect(() => {
    let active = true;
    const q = searchQuery.trim();
    if (!q) {
      return;
    }
    const timer = setTimeout(() => {
      fetchProducts({ search: q, limit: 5 })
        .then((res) => {
          if (active) setLiveResults(res.data);
        })
        .catch(() => {
          if (active) setLiveResults([]);
        });
    }, 150);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Bouclé sofa',
    'Travertine dining table',
    'Solid oak bed',
    'Saddle leather chair',
    'Marble monolith',
    'Reeded credenza'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    addRecentSearch(searchQuery);
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSelectQuery = (term: string) => {
    setSearchQuery(term);
    addRecentSearch(term);
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      {/* Search Header Container */}
      <div className="bg-[#FDFBF7] border-b border-[#E8DFD3] shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs uppercase tracking-widest text-[#8C827A] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B89758]" /> Search Madhav Furnitures Catalog
            </span>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-[#57534E] hover:text-[#1C1917] rounded-full hover:bg-[#F2ECE1] transition cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-6 h-6 text-[#8C827A] absolute left-3 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by furniture name, material, category (e.g. travertine, oak, boucle)..."
              className="w-full bg-[#F5F1E8] border border-[#DDD4C5] focus:border-[#443224] focus:outline-hidden text-base sm:text-lg text-[#1C1917] placeholder-[#9A8F82] rounded-xl pl-12 pr-12 py-3.5 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 text-[#8C827A] hover:text-[#1C1917] cursor-pointer"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Search Content & Results Body */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
        <div className="bg-[#FDFBF7] rounded-2xl p-6 shadow-xl border border-[#E8DFD3] space-y-6">
          {/* Live Search Suggestions (when typing) */}
          {searchQuery.trim() !== '' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8C827A]">
                  Suggested Products ({displayedResults.length})
                </h3>
                {displayedResults.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-xs text-[#443224] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all matching results</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {displayedResults.length > 0 ? (
                <div className="divide-y divide-[#F0E9DE]">
                  {displayedResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => {
                        addRecentSearch(searchQuery);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-4 py-3 hover:bg-[#F9F6F0] rounded-xl px-2.5 transition group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-[#F5F1E8] shrink-0 border border-[#E8DFD3]"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#A39B8F] font-semibold">
                          {product.categoryLabel || product.category}
                        </span>
                        <h4 className="font-serif text-sm sm:text-base font-medium text-[#1C1917] group-hover:text-[#443224] truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#78716C] truncate">
                          {product.materials.slice(0, 2).join(' • ')}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-serif font-semibold text-sm text-[#1C1917]">
                          {formatINR(product.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center space-y-2">
                  <p className="text-sm text-[#57534E]">
                    No furniture pieces matched &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;.
                  </p>
                  <p className="text-xs text-[#8C827A]">
                    Try searching for general terms like &ldquo;sofa&rdquo;, &ldquo;walnut&rdquo;, &ldquo;dining&rdquo;, or &ldquo;linen&rdquo;.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Popular Searches */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#8C827A]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#B89758]" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSelectQuery(item)}
                      className="text-xs px-3 py-2 rounded-xl bg-[#F5F0E6] hover:bg-[#EBE3D3] text-[#443224] transition font-medium cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#8C827A]">
                      <History className="w-3.5 h-3.5" />
                      <span>Recent Searches</span>
                    </div>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-[#BA5D40] hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSelectQuery(term)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-[#DDD4C5] text-[#57534E] hover:border-[#443224] hover:text-[#1C1917] transition cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Quick Highlight */}
              {products.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8C827A]">
                    Curators&apos; Choice
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.slice(0, 2).map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/product/${prod.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-[#EDE5D8] hover:border-[#D5C9B8] hover:bg-[#FAF7F2] transition"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-14 h-14 rounded-lg object-cover bg-[#F5F1E8]"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-xs font-semibold text-[#1C1917] truncate">
                            {prod.name}
                          </p>
                          <p className="text-xs text-[#8C827A]">{formatINR(prod.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
