'use client';

import React from 'react';
import { FilterState } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { Star, Check, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  productCount: number;
}

export const MATERIALS_LIST = [
  'Solid White Oak',
  'American Black Walnut',
  'Travertine Stone',
  'Calacatta Marble',
  'Italian Bouclé',
  'Belgian Linen',
  'Saddle Leather',
  'Smoked Ash',
  'Performance Velvet'
];

export const COLOR_SWATCHES = [
  { name: 'Oatmeal / Cream', hex: '#EBE5D8' },
  { name: 'Walnut / Brown', hex: '#443224' },
  { name: 'Charcoal / Black', hex: '#232323' },
  { name: 'Olive / Forest', hex: '#3E4739' },
  { name: 'Terracotta', hex: '#BA7A65' },
  { name: 'Bone White', hex: '#F6F3EC' }
];

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  productCount
}: FilterSidebarProps) {
  const handleMaterialToggle = (material: string) => {
    const next = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];
    onFilterChange({ materials: next });
  };

  const handleColorToggle = (color: string) => {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ colors: next });
  };

  return (
    <aside className="w-full space-y-8 text-sm">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">Filters</h2>
          <p className="text-xs text-[#8C827A] mt-0.5">{productCount} curated pieces</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[#BA5D40] hover:text-[#9A4830] font-medium flex items-center gap-1 transition cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear all</span>
        </button>
      </div>

      {/* Category Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
          Category
        </h3>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => onFilterChange({ category: '' })}
            className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs transition cursor-pointer flex items-center justify-between ${
              filters.category === ''
                ? 'bg-[#F2ECE1] font-semibold text-[#2C241E]'
                : 'text-[#57534E] hover:bg-[#FAF7F2]'
            }`}
          >
            <span>All Categories</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onFilterChange({ category: cat.slug })}
              className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs transition cursor-pointer flex items-center justify-between ${
                filters.category === cat.slug
                  ? 'bg-[#F2ECE1] font-semibold text-[#2C241E]'
                  : 'text-[#57534E] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-[#A39B8F]">({cat.itemCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
            Price Range
          </h3>
          <span className="text-xs font-medium text-[#443224]">
            Up to ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={15000}
          max={250000}
          step={5000}
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#443224] bg-[#E8DFD3] h-1.5 rounded-lg cursor-pointer"
        />
        <div className="flex items-center justify-between text-[11px] text-[#8C827A]">
          <span>₹15,000</span>
          <span>₹2,50,000+</span>
        </div>
      </div>

      {/* Materials Filter */}
      <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
          Materials
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {MATERIALS_LIST.map((mat) => {
            const isSelected = filters.materials.includes(mat);
            return (
              <button
                key={mat}
                type="button"
                onClick={() => handleMaterialToggle(mat)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#2C241E] text-white border-[#2C241E]'
                    : 'bg-white text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0]'
                }`}
              >
                {mat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Swatches */}
      <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
          Color Palette
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {COLOR_SWATCHES.map((swatch) => {
            const isSelected = filters.colors.includes(swatch.name);
            return (
              <button
                key={swatch.name}
                type="button"
                onClick={() => handleColorToggle(swatch.name)}
                className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition cursor-pointer ${
                  isSelected
                    ? 'border-[#443224] bg-[#F2ECE1]'
                    : 'border-[#EDE5D8] hover:border-[#D5C9B8]'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-black/10 shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: swatch.hex }}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 text-white drop-shadow-xs" />}
                </span>
                <span className="text-[11px] text-[#443224] font-medium truncate">
                  {swatch.name.split('/')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
          Availability
        </h3>
        <div className="space-y-2">
          {[
            { label: 'All Items', val: 'all' },
            { label: 'In Stock (Ships in 48h)', val: 'in-stock' },
            { label: 'Crafted to Order', val: 'made-to-order' }
          ].map((item) => (
            <label
              key={item.val}
              className="flex items-center gap-2.5 text-xs text-[#57534E] cursor-pointer"
            >
              <input
                type="radio"
                name="availability"
                checked={filters.availability === item.val}
                onChange={() => onFilterChange({ availability: item.val as any })}
                className="accent-[#443224] w-3.5 h-3.5 cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
          Rating
        </h3>
        <div className="flex items-center gap-2">
          {[0, 4.5, 4.8, 4.9].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => onFilterChange({ rating: rate })}
              className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1 transition cursor-pointer ${
                filters.rating === rate
                  ? 'bg-[#443224] text-white border-[#443224]'
                  : 'bg-white text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0]'
              }`}
            >
              {rate === 0 ? (
                'All'
              ) : (
                <>
                  <Star className="w-3 h-3 fill-current text-[#B89758]" />
                  <span>{rate}+</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
