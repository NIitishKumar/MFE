'use client';

import React from 'react';
import {
  Eye,
  Edit2,
  Trash2,
  Layers,
  Star,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Product } from '../../../types/product.types';

interface ProductTableProps {
  products: Product[];
  onViewDetail: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onToggleStatus: (id: string, currentInStock: boolean) => Promise<void>;
  isLoading?: boolean;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onViewDetail,
  onEdit,
  onDelete,
  onToggleStatus,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="p-12 text-center text-neutral-400">
        <div className="w-8 h-8 border-2 border-[#c9a87c] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs tracking-wider uppercase font-mono">Loading furniture catalog...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-12 text-center border border-dashed border-[#332f2c] rounded-lg bg-[#141312]">
        <div className="w-12 h-12 rounded-full bg-[#241e19] text-[#c9a87c] border border-[#44372c] flex items-center justify-center mx-auto mb-3">
          <Layers size={20} />
        </div>
        <h4 className="font-serif text-base text-neutral-200">No Furniture Products Found</h4>
        <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
          No pieces match your selected filters. Create a new piece or reset search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[#2e2a27] rounded-xl overflow-hidden bg-[#141414] shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1b1917] text-neutral-400 font-mono text-[10px] uppercase tracking-wider border-b border-[#2b2723]">
            <tr>
              <th className="py-3 px-4">Piece / Model</th>
              <th className="py-3 px-4">Category & Room</th>
              <th className="py-3 px-4">Price (INR)</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Availability</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#221f1d] text-neutral-300">
            {products.map((product) => {
              const imageSrc = product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc';
              return (
                <tr
                  key={product.id}
                  className="hover:bg-[#1a1816] transition-colors group"
                >
                  {/* Name & Thumb */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#332e29] bg-[#221e1a] shrink-0">
                        <img
                          src={imageSrc}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-serif text-sm text-neutral-100 group-hover:text-[#c9a87c] transition-colors truncate max-w-xs font-normal">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 font-mono text-[10px] text-neutral-500">
                          <span>{product.slug}</span>
                          {product.collectionName && (
                            <>
                              <span>•</span>
                              <span className="text-[#c9a87c]">{product.collectionName}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category & Room */}
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#221d18] text-[#c9a87c] border border-[#3d3024]">
                        {product.categoryLabel || product.category}
                      </span>
                      <div className="text-[10px] text-neutral-400 font-sans capitalize">
                        {product.roomLabel || product.room.replace(/-/g, ' ')}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <div className="font-serif text-sm text-neutral-100 font-medium">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    {product.originalPrice && (
                      <div className="text-[10px] text-neutral-500 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>

                  {/* Rating */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-[#c9a87c]">
                      <Star size={12} className="fill-[#c9a87c]" />
                      <span className="font-mono text-xs text-neutral-200">{product.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-neutral-500">({product.reviewCount})</span>
                    </div>
                  </td>

                  {/* Stock Status */}
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(product.id, product.inStock)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border cursor-pointer transition-colors ${
                        product.inStock
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/80'
                          : 'bg-rose-950/70 text-rose-300 border-rose-800/80 hover:bg-rose-900/80'
                      }`}
                      title="Click to toggle stock status"
                    >
                      {product.inStock ? (
                        <>
                          <CheckCircle2 size={12} className="text-emerald-400" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={12} className="text-rose-400" />
                          <span>Out of Stock</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onViewDetail(product)}
                        className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="View Piece Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => onEdit(product)}
                        className="p-1.5 rounded text-neutral-400 hover:text-[#c9a87c] hover:bg-[#c9a87c]/10 transition-colors"
                        title="Edit Piece"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(product)}
                        className="p-1.5 rounded text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Piece"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
