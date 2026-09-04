'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart, formatINR } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = isInWishlist(product.id);
  const primaryImg = product.images[0];
  const secondaryImg = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#EDE7DC] hover:border-[#D5C9B8] hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F5F1E8]">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.badges?.map((badge) => {
            const isDiscount = badge === '20% Off';
            const isBestSeller = badge === 'Best Seller';
            const isNew = badge === 'New';

            let badgeStyle = 'bg-[#1C1917]/90 text-white';
            if (isDiscount) badgeStyle = 'bg-[#BA5D40] text-white';
            if (isBestSeller) badgeStyle = 'bg-[#B89758] text-[#1C1917] font-semibold';
            if (isNew) badgeStyle = 'bg-[#2D3E33] text-white';

            return (
              <span
                key={badge}
                className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs font-medium ${badgeStyle}`}
              >
                {badge}
              </span>
            );
          })}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isSaved
              ? 'bg-[#BA5D40] text-white'
              : 'bg-white/80 hover:bg-white text-[#2C241E] hover:scale-110'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition ${isSaved ? 'fill-white stroke-white scale-110' : 'stroke-current'}`}
          />
        </button>

        {/* Product Images with Hover Swap */}
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={primaryImg}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered && secondaryImg ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          {secondaryImg && (
            <img
              src={secondaryImg}
              alt={`${product.name} alternate angle`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
          )}
        </Link>

        {/* Desktop Quick Actions Overlay */}
        <div
          className={`hidden sm:flex absolute bottom-3 inset-x-3 gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 bg-[#2C241E]/95 hover:bg-[#1C1917] text-[#FDFBF7] text-xs font-medium py-2.5 px-3 rounded-xl backdrop-blur-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
          <Link
            href={`/product/${product.id}`}
            className="p-2.5 bg-white/90 hover:bg-white text-[#2C241E] rounded-xl backdrop-blur-xs transition shadow-sm flex items-center justify-center"
            aria-label="View product details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-[#8C827A] mb-1.5">
          <span className="uppercase tracking-wider text-[11px] font-medium text-[#A39B8F]">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#B89758] fill-[#B89758]" />
            <span className="font-semibold text-[#1C1917]">{product.rating}</span>
            <span className="text-[#A39B8F]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-base sm:text-lg font-medium text-[#1C1917] group-hover:text-[#443224] transition line-clamp-1">
          <Link href={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        {/* Short Material Summary */}
        <p className="text-xs text-[#78716C] mt-1 line-clamp-1 font-normal">
          {product.materials.slice(0, 2).join(' • ')}
        </p>

        {/* Color Swatch Previews */}
        <div className="flex items-center gap-1.5 mt-3">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-3.5 h-3.5 rounded-full border border-[#D5C9B8]/70 shadow-2xs"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-[#A39B8F] font-medium">
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        {/* Price & Mobile CTA */}
        <div className="mt-4 pt-3 border-t border-[#F5EFE6] flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base sm:text-lg font-semibold text-[#1C1917]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#A39B8F] line-through font-normal">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && product.discountPercentage && (
              <span className="text-[10px] text-[#BA5D40] font-semibold tracking-wide">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Mobile direct Add button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="sm:hidden p-2 bg-[#F5F0E6] text-[#443224] hover:bg-[#2C241E] hover:text-white rounded-xl transition cursor-pointer"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
