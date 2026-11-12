'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Trash2, ChevronRight, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { buildProductWhatsAppUrl } from '@/lib/whatsapp';
import { useClientOrigin } from '@/lib/useClientOrigin';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export default function WishlistPage() {
  const { wishlistProducts, toggleWishlist, formatINR } = useStore();
  const origin = useClientOrigin();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">Wishlist</span>
      </nav>

      {/* Header */}
      <div className="pb-6 border-b border-[#E8DFD3] flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
            Saved Creations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal mt-1">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'piece' : 'pieces'} reserved for your residence
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#443224] hover:underline"
          >
            <span>Continue Browsing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Wishlist Grid or Empty State */}
      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EDE7DC] flex flex-col justify-between shadow-xs hover:shadow-md transition duration-300"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#F5F1E8]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#BA5D40] shadow-xs transition cursor-pointer"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-semibold uppercase px-2.5 py-1 rounded-md text-[#1C1917]">
                  {product.inStock ? 'In Stock • Ships in 48h' : 'Crafted to Order'}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A39B8F]">
                    {product.categoryLabel}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#1C1917] mt-0.5">
                    <Link href={`/product/${product.id}`} className="hover:text-[#443224]">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#78716C] mt-1 line-clamp-1">
                    {product.materials.slice(0, 2).join(' • ')}
                  </p>
                  <div className="font-serif text-lg font-bold text-[#1C1917] mt-3">
                    {formatINR(product.price)}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F5EFE6] flex gap-2">
                  {/* Move to Cart commented out while bag option is hidden */}
                  {/* <button
                    type="button"
                    onClick={() => {
                      addToCart(product, 1);
                      toggleWishlist(product.id);
                    }}
                    className="flex-1 bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button> */}
                  <a
                    href={buildProductWhatsAppUrl({ product, origin })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                  <Link
                    href={`/product/${product.id}`}
                    className="p-2.5 rounded-xl border border-[#D5C9B8] text-[#57534E] hover:bg-[#FAF7F2] text-xs font-medium flex items-center justify-center"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-[#EDE7DC] space-y-5 max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F5F0E6] mx-auto flex items-center justify-center text-[#BA5D40]">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl font-medium text-[#1C1917]">
              Your wishlist is waiting for something beautiful.
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Explore our architectural sofas, fluted timber platform beds, and Roman travertine tables to save your favorite selections.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 px-8 rounded-xl shadow-md transition"
            >
              Explore Furniture
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
