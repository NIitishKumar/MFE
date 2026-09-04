import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '@/data/collections';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = PRODUCTS.filter((p) => p.collectionSlug === slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <Link href="/collections" className="hover:text-[#1C1917] transition">
          Collections
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">{collection.name}</span>
      </nav>

      {/* Collection Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-[#2C241E] text-white p-8 sm:p-14 lg:p-20 border border-[#3D332B] shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            src={collection.heroImage}
            alt={collection.name}
            className="w-full h-full object-cover brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Curated Design Study
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white">
            {collection.name}
          </h1>
          <p className="text-xs sm:text-base text-[#D4AF37] font-medium italic">
            &ldquo;{collection.tagline}&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-[#DDD3C5] font-light leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal">
            Pieces in this Collection ({collectionProducts.length})
          </h2>
          <Link href="/shop" className="text-xs text-[#443224] font-semibold hover:underline">
            View All Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
