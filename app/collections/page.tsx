import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { COLLECTIONS } from '@/data/collections';

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">Collections</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C827A] flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B89758]" /> Curated Design Narratives
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-light">
          Madhav Furnitures Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
          Each collection represents a philosophical exploration of materiality, proportion, and architectural silence.
        </p>
      </div>

      {/* Collections Showcase Grid */}
      <div className="space-y-12">
        {COLLECTIONS.map((col, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={col.id}
              className={`rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#EDE5D8] grid grid-cols-1 lg:grid-cols-12 shadow-sm hover:shadow-md transition-all duration-300 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              <div className={`lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                <img
                  src={col.heroImage}
                  alt={col.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className={`lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center space-y-4 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <span className="text-xs uppercase tracking-[0.2em] text-[#A39B8F] font-semibold">
                  {col.productsCount} Curated Pieces
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-normal">
                  {col.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#C5A059] font-medium italic">
                  &ldquo;{col.tagline}&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-light">
                  {col.description}
                </p>
                <div className="pt-3">
                  <Link
                    href={`/collections/${col.slug}`}
                    className="inline-flex items-center gap-2 bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3 px-6 rounded-xl transition"
                  >
                    <span>Explore {col.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
