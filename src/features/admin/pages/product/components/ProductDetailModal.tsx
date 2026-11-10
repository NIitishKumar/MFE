'use client';

import React from 'react';
import {
  X,
  Edit2,
  Calendar,
  Layers,
  Star,
  CheckCircle2,
  XCircle,
  Sparkles,
  Ruler,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { Product } from '../../../types/product.types';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isLoading?: boolean;
  error?: string | null;
  onEdit?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  isLoading = false,
  error = null,
  onEdit,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#141414] border border-[#2e2a27] rounded-xl shadow-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2b2723] flex items-center justify-between bg-[#191715]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded bg-[#29221b] text-[#c9a87c] border border-[#4d3a2b]">
              <Layers size={16} />
            </span>
            <div>
              <h3 className="font-serif text-lg text-neutral-100">{product.name}</h3>
              <p className="text-[11px] font-mono text-neutral-400">
                ID: {product.id} • Slug: {product.slug}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(product);
                }}
                className="px-3 py-1.5 rounded text-xs bg-[#241e19] text-[#c9a87c] border border-[#44372c] hover:bg-[#2e261f] transition-colors flex items-center gap-1.5"
              >
                <Edit2 size={13} />
                <span>Edit Piece</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Visual & Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1 rounded-lg overflow-hidden border border-[#332e29] bg-[#221e1a] aspect-4/3 md:aspect-square">
              <img
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#221d18] text-[#c9a87c] border border-[#3d3024]">
                  {product.categoryLabel || product.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#1f1d1b] text-neutral-300 border border-[#332e29]">
                  {product.roomLabel || product.room}
                </span>
                {product.collectionName && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-[#1d221e] text-emerald-300 border border-emerald-900/60">
                    {product.collectionName}
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border flex items-center gap-1 ${
                    product.inStock
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                      : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                  }`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="pt-2">
                <div className="font-serif text-2xl text-neutral-100 font-normal">
                  ₹{product.price.toLocaleString('en-IN')}
                  {product.originalPrice && (
                    <span className="text-sm font-sans text-neutral-500 line-through ml-2.5">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-[#c9a87c]">
                  <Star size={13} className="fill-[#c9a87c]" />
                  <span className="font-mono">{product.rating.toFixed(1)}</span>
                  <span className="text-neutral-500">({product.reviewCount} verified client reviews)</span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                {product.shortDescription || product.fullDescription}
              </p>
            </div>
          </div>

          {/* Specifications Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#252220]">
            {/* Dimensions */}
            <div className="p-4 rounded-lg bg-[#191715] border border-[#2b2723] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c9a87c]">
                <Ruler size={14} />
                <span>Dimensions &amp; Footprint</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans text-neutral-300 pt-1">
                <div>Width: <span className="text-neutral-100 font-mono">{product.dimensions?.width}</span></div>
                <div>Depth: <span className="text-neutral-100 font-mono">{product.dimensions?.depth}</span></div>
                <div>Height: <span className="text-neutral-100 font-mono">{product.dimensions?.height}</span></div>
                {product.dimensions?.seatHeight && (
                  <div>Seat Height: <span className="text-neutral-100 font-mono">{product.dimensions.seatHeight}</span></div>
                )}
                {product.dimensions?.weight && (
                  <div>Weight: <span className="text-neutral-100 font-mono">{product.dimensions.weight}</span></div>
                )}
              </div>
            </div>

            {/* Materials */}
            <div className="p-4 rounded-lg bg-[#191715] border border-[#2b2723] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c9a87c]">
                <Sparkles size={14} />
                <span>Artisanal Materials</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.materials.map((mat) => (
                  <span key={mat} className="text-[11px] px-2 py-0.5 rounded bg-[#221e1a] text-neutral-200 border border-[#332e29]">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Warranty & Lead Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-400">
            {product.warranty && (
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#c9a87c] shrink-0" />
                <span>{product.warranty}</span>
              </div>
            )}
            {product.leadTime && (
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#c9a87c] shrink-0" />
                <span>{product.leadTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
