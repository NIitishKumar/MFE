'use client';

import React from 'react';
import {
  FilterState,
  ProductFiltersMeta,
  Category,
  Room,
  Collection,
} from '@/types';
import { useStore } from '@/context/StoreContext';
import { Star, Check, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  productCount: number;
  filterMeta?: ProductFiltersMeta | null;
  categories?: Category[];
  rooms?: Room[];
  collections?: Collection[];
  availableSizes?: string[];
  availableBadges?: string[];
  colorHexMap?: Record<string, string>;
}

function resolveColorDotHex(
  colorName: string,
  colorHexMap?: Record<string, string>,
): string {
  if (colorHexMap && colorHexMap[colorName]) {
    return colorHexMap[colorName];
  }
  const lower = colorName.toLowerCase();
  if (lower.includes('black') || lower.includes('ebony') || lower.includes('ink')) return '#1E1E1E';
  if (lower.includes('charcoal') || lower.includes('smoked')) return '#3B3A39';
  if (lower.includes('white') || lower.includes('chalk') || lower.includes('bone')) return '#F5F2EB';
  if (lower.includes('cream') || lower.includes('oatmeal') || lower.includes('boucl')) return '#EBE5D8';
  if (lower.includes('walnut') || lower.includes('espresso') || lower.includes('brown') || lower.includes('sable')) return '#4B3527';
  if (lower.includes('cognac') || lower.includes('tan') || lower.includes('amber')) return '#9C5A2C';
  if (lower.includes('oak') || lower.includes('ash') || lower.includes('flax') || lower.includes('sand')) return '#D7CBB8';
  if (lower.includes('green') || lower.includes('moss') || lower.includes('olive') || lower.includes('sage')) return '#3E4B3C';
  if (lower.includes('terracotta') || lower.includes('burgundy') || lower.includes('viola')) return '#8F4E42';
  return '#C9BEAE';
}

function mergeUniqueOptions(primary: string[], extra: string[] = []): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of [...primary, ...extra]) {
    const clean = item.trim();
    if (!clean) continue;
    if (!seen.has(clean)) {
      seen.add(clean);
      out.push(clean);
    }
  }
  return out;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  productCount,
  filterMeta,
  categories: categoriesProp,
  rooms = [],
  collections = [],
  availableSizes = [],
  availableBadges = [],
  colorHexMap,
}: FilterSidebarProps) {
  const { categories: storeCategories, isCategoriesLoading } = useStore();
  const resolvedCategories =
    categoriesProp && categoriesProp.length > 0 ? categoriesProp : storeCategories;

  const minBound =
    filterMeta && filterMeta.minPrice > 0 ? filterMeta.minPrice : 0;
  const maxBound =
    filterMeta && filterMeta.maxPrice > 0 ? filterMeta.maxPrice : 250000;

  const effectiveMaxPrice = filters.maxPrice > 0 ? filters.maxPrice : maxBound;

  const roomSlugs = mergeUniqueOptions(
    rooms.map((r) => r.slug),
    filterMeta?.rooms || (filters.room ? [filters.room] : []),
  );

  const materialsList = mergeUniqueOptions(
    filterMeta?.materials || [],
    filters.materials,
  );

  const colorsList = mergeUniqueOptions(
    filterMeta?.colors || [],
    filters.colors,
  );

  const sizesList = mergeUniqueOptions(
    filterMeta?.sizes || availableSizes,
    filters.sizes,
  );

  const badgesList = mergeUniqueOptions(
    filterMeta?.badges || availableBadges,
    filters.badge ? [filters.badge] : [],
  );

  const handleToggleItem = (
    field: 'materials' | 'colors' | 'sizes',
    value: string,
  ) => {
    const current = filters[field];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onFilterChange({ [field]: next });
  };

  return (
    <aside className="w-full space-y-7 text-sm">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">
            Filters
          </h2>
          <p className="text-xs text-[#8C827A] mt-0.5">
            {productCount} curated pieces
          </p>
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
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
          Category
        </h3>
        <div className="space-y-1">
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
          {isCategoriesLoading && resolvedCategories.length === 0 ? (
            <div className="space-y-1.5 py-1">
              {[0, 1, 2, 3].map((slot) => (
                <div
                  key={slot}
                  className="h-7 rounded-lg bg-[#F5F0E6] animate-pulse"
                />
              ))}
            </div>
          ) : resolvedCategories.length > 0 ? (
            resolvedCategories.map((cat) => (
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
                <span className="text-[10px] text-[#A39B8F]">
                  ({cat.itemCount})
                </span>
              </button>
            ))
          ) : (
            <p className="text-xs text-[#8C827A] px-2.5 py-1">
              No categories loaded from API.
            </p>
          )}
        </div>
      </div>

      {/* Room Filter */}
      {roomSlugs.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-[#E8DFD3]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
            Room
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => onFilterChange({ room: '' })}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
                filters.room === ''
                  ? 'bg-[#2C241E] text-white border-[#2C241E]'
                  : 'bg-white text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0]'
              }`}
            >
              All Rooms
            </button>
            {roomSlugs.map((slug) => {
              const roomObj = rooms.find((r) => r.slug === slug);
              const label = roomObj?.name || slug.replace(/-/g, ' ');
              const isSelected = filters.room === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() =>
                    onFilterChange({ room: isSelected ? '' : slug })
                  }
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition cursor-pointer capitalize ${
                    isSelected
                      ? 'bg-[#2C241E] text-white border-[#2C241E]'
                      : 'bg-white text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Collection Filter */}
      {collections.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-[#E8DFD3]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
            Collection
          </h3>
          <select
            value={filters.collectionSlug || ''}
            onChange={(e) =>
              onFilterChange({ collectionSlug: e.target.value })
            }
            aria-label="Filter by collection"
            className="w-full bg-white border border-[#E8DFD3] focus:border-[#443224] focus:outline-hidden rounded-lg px-2.5 py-2 text-xs text-[#1C1917] cursor-pointer"
          >
            <option value="">All Collections</option>
            {collections.map((col) => (
              <option key={col.id} value={col.slug}>
                {col.name} ({col.productsCount})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Price Range (minPrice & maxPrice) */}
      <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
            Price Range
          </h3>
          <span className="text-[11px] font-medium text-[#443224]">
            {filters.minPrice > 0 || filters.maxPrice > 0
              ? `₹${(filters.minPrice > 0 ? filters.minPrice : minBound).toLocaleString('en-IN')} - ₹${effectiveMaxPrice.toLocaleString('en-IN')}`
              : 'All Prices'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8C827A] block mb-1">
              Min (₹)
            </label>
            <input
              type="number"
              min={0}
              max={effectiveMaxPrice}
              step={1000}
              placeholder={String(minBound)}
              value={filters.minPrice > 0 ? filters.minPrice : ''}
              onChange={(e) =>
                onFilterChange({
                  minPrice: e.target.value ? Math.max(0, Number(e.target.value)) : 0,
                })
              }
              className="w-full bg-white border border-[#E8DFD3] focus:border-[#443224] focus:outline-hidden rounded-lg px-2.5 py-1.5 text-xs text-[#1C1917]"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8C827A] block mb-1">
              Max (₹)
            </label>
            <input
              type="number"
              min={filters.minPrice > 0 ? filters.minPrice : 0}
              step={1000}
              placeholder={String(maxBound)}
              value={filters.maxPrice > 0 ? filters.maxPrice : ''}
              onChange={(e) =>
                onFilterChange({
                  maxPrice: e.target.value ? Math.max(0, Number(e.target.value)) : 0,
                })
              }
              className="w-full bg-white border border-[#E8DFD3] focus:border-[#443224] focus:outline-hidden rounded-lg px-2.5 py-1.5 text-xs text-[#1C1917]"
            />
          </div>
        </div>

        <input
          type="range"
          min={minBound}
          max={Math.max(maxBound, effectiveMaxPrice)}
          step={5000}
          value={Math.min(
            Math.max(effectiveMaxPrice, minBound),
            Math.max(maxBound, effectiveMaxPrice),
          )}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#443224] bg-[#E8DFD3] h-1.5 rounded-lg cursor-pointer"
        />
        <div className="flex items-center justify-between text-[11px] text-[#8C827A]">
          <span>₹{minBound.toLocaleString('en-IN')}</span>
          <span>₹{maxBound.toLocaleString('en-IN')}+</span>
        </div>
      </div>

      {/* Materials Filter */}
      {materialsList.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-[#E8DFD3]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
            Materials
          </h3>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {materialsList.map((mat) => {
              const isSelected = filters.materials.includes(mat);
              return (
                <button
                  key={mat}
                  type="button"
                  onClick={() => handleToggleItem('materials', mat)}
                  className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition cursor-pointer text-left ${
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
      )}

      {/* Color Swatches */}
      {colorsList.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-[#E8DFD3]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
            Color Palette
          </h3>
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {colorsList.map((colorName) => {
              const isSelected = filters.colors.includes(colorName);
              const hex = resolveColorDotHex(colorName, colorHexMap);
              return (
                <button
                  key={colorName}
                  type="button"
                  onClick={() => handleToggleItem('colors', colorName)}
                  className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition cursor-pointer ${
                    isSelected
                      ? 'border-[#443224] bg-[#F2ECE1]'
                      : 'border-[#EDE5D8] hover:border-[#D5C9B8]'
                  }`}
                  title={colorName}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/15 shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: hex }}
                  >
                    {isSelected && (
                      <Check className="w-2.5 h-2.5 text-white drop-shadow-xs" />
                    )}
                  </span>
                  <span className="text-[11px] text-[#443224] font-medium truncate">
                    {colorName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes / Configurations */}
      {sizesList.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-[#E8DFD3]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
            Sizes &amp; Configurations
          </h3>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            {sizesList.map((size) => {
              const isSelected = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleToggleItem('sizes', size)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#2C241E] text-white border-[#2C241E]'
                      : 'bg-white text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Badges Filter */}
      {badgesList.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-[#E8DFD3]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
            Highlights
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {badgesList.map((badge) => {
              const isSelected = filters.badge === badge;
              return (
                <button
                  key={badge}
                  type="button"
                  onClick={() =>
                    onFilterChange({ badge: isSelected ? '' : badge })
                  }
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#B89758] text-[#1C1917] border-[#B89758] font-semibold'
                      : 'bg-white text-[#57534E] border-[#E8DFD3] hover:border-[#BFB2A0]'
                  }`}
                >
                  {badge}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="space-y-2.5 pt-4 border-t border-[#E8DFD3]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
          Availability
        </h3>
        <div className="space-y-2">
          {(
            [
              { label: 'All Items', val: 'all' },
              { label: 'In Stock (Ships in 48h)', val: 'in-stock' },
              { label: 'Crafted to Order', val: 'made-to-order' },
            ] as { label: string; val: FilterState['availability'] }[]
          ).map((item) => (
            <label
              key={item.val}
              className="flex items-center gap-2.5 text-xs text-[#57534E] cursor-pointer"
            >
              <input
                type="radio"
                name="availability"
                checked={filters.availability === item.val}
                onChange={() => onFilterChange({ availability: item.val })}
                className="accent-[#443224] w-3.5 h-3.5 cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2.5 pt-4 border-t border-[#E8DFD3]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
          Minimum Rating
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          {[0, 4, 4.5, 4.8, 4.9].map((rate) => (
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
