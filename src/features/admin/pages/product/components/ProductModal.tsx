'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { X, Check, Layers, Image as ImageIcon } from 'lucide-react';
import { Product } from '../../../types/product.types';
import { productSchema, ProductFormData } from '../../../schemas/product.schema';
import { validateWithZod } from '@/lib/validation/zod-formik';
import { Category, Room, Collection } from '@/types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormData) => Promise<void>;
  initialData?: Product | null;
  categories: Category[];
  rooms: Room[];
  collections: Collection[];
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
  rooms,
  collections,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(initialData);

  const initialValues: ProductFormData = {
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    category: initialData?.category || (categories[0]?.slug || 'sofas'),
    categoryLabel: initialData?.categoryLabel || '',
    room: initialData?.room || (rooms[0]?.slug || 'living-room'),
    roomLabel: initialData?.roomLabel || '',
    collectionSlug: initialData?.collectionSlug || '',
    collectionName: initialData?.collectionName || '',
    price: initialData?.price ?? 145000,
    originalPrice: initialData?.originalPrice ?? 168000,
    discountPercentage: initialData?.discountPercentage ?? 14,
    rating: initialData?.rating ?? 4.9,
    reviewCount: initialData?.reviewCount ?? 12,
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    materialsString: initialData?.materials?.join(', ') || 'Italian Textured Wool Bouclé, Kiln-Dried European Beechwood',
    width: initialData?.dimensions?.width || '260 cm',
    depth: initialData?.dimensions?.depth || '115 cm',
    height: initialData?.dimensions?.height || '76 cm',
    seatHeight: initialData?.dimensions?.seatHeight || '43 cm',
    weight: initialData?.dimensions?.weight || '78 kg',
    primaryImage: initialData?.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    inStock: initialData?.inStock ?? true,
    badges: (initialData?.badges as string[]) || ['Best Seller'],
    careInstructions: initialData?.careInstructions || 'Professional upholstery clean only. Fluff cushioning weekly.',
    warranty: initialData?.warranty || '10-Year Structural Timber Frame Warranty',
    leadTime: initialData?.leadTime || 'Crafted to order; 4-6 weeks delivery',
  };

  const badgeOptions = ['New', 'Best Seller', '20% Off', 'Crafted to Order'];

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
              <h3 className="font-serif text-lg text-neutral-100">
                {isEditing ? 'Edit Furniture Piece' : 'Add New Furniture Piece'}
              </h3>
              <p className="text-[11px] text-neutral-400 font-sans">
                Configure architectural specifications, materials, pricing, and imagery.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <Formik
          initialValues={initialValues}
          validate={validateWithZod(productSchema)}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await onSubmit(values);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Section 1: Core Identity */}
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#c9a87c] font-semibold border-b border-[#252220] pb-1">
                  1. Essential Identity
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Piece Name *</label>
                    <Field
                      name="name"
                      placeholder="e.g. Sorrento Curved Bouclé Sofa"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                    />
                    <ErrorMessage name="name" component="div" className="text-rose-400 text-[10px]" />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Slug (URL identifier)</label>
                    <Field
                      name="slug"
                      placeholder="e.g. sorrento-curved-boucle-sofa"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                    />
                    <ErrorMessage name="slug" component="div" className="text-rose-400 text-[10px]" />
                  </div>
                </div>

                {/* Category & Room & Collection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Category *</label>
                    <Field
                      as="select"
                      name="category"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                      onChange={(e: any) => {
                        const val = e.target.value;
                        setFieldValue('category', val);
                        const cat = categories.find((c) => c.slug === val);
                        if (cat) setFieldValue('categoryLabel', cat.name);
                      }}
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug} className="bg-[#1b1917]">
                          {c.name}
                        </option>
                      ))}
                    </Field>
                  </div>

                  {/* Room */}
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Room *</label>
                    <Field
                      as="select"
                      name="room"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                      onChange={(e: any) => {
                        const val = e.target.value;
                        setFieldValue('room', val);
                        const r = rooms.find((rm) => rm.slug === val);
                        if (r) setFieldValue('roomLabel', r.name);
                      }}
                    >
                      {rooms.map((r) => (
                        <option key={r.slug} value={r.slug} className="bg-[#1b1917]">
                          {r.name}
                        </option>
                      ))}
                    </Field>
                  </div>

                  {/* Collection */}
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Collection</label>
                    <Field
                      as="select"
                      name="collectionSlug"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                      onChange={(e: any) => {
                        const val = e.target.value;
                        setFieldValue('collectionSlug', val);
                        const col = collections.find((c) => c.slug === val);
                        if (col) setFieldValue('collectionName', col.name);
                      }}
                    >
                      <option value="" className="bg-[#1b1917]">
                        (None / Standalone)
                      </option>
                      {collections.map((col) => (
                        <option key={col.slug} value={col.slug} className="bg-[#1b1917]">
                          {col.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Availability */}
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#c9a87c] font-semibold border-b border-[#252220] pb-1">
                  2. Pricing &amp; Badges
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Selling Price (INR) *</label>
                    <Field
                      name="price"
                      type="number"
                      placeholder="145000"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                    />
                    <ErrorMessage name="price" component="div" className="text-rose-400 text-[10px]" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Original Price (INR)</label>
                    <Field
                      name="originalPrice"
                      type="number"
                      placeholder="168000"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Discount %</label>
                    <Field
                      name="discountPercentage"
                      type="number"
                      placeholder="14"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                    />
                  </div>
                </div>

                {/* In Stock & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#191715] rounded border border-[#2b2723]">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <Field
                      type="checkbox"
                      name="inStock"
                      className="rounded accent-[#c9a87c] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-neutral-200 font-medium">Available in Stock</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-400 font-mono">Badges:</span>
                    {badgeOptions.map((badge) => {
                      const isSelected = values.badges.includes(badge);
                      return (
                        <button
                          key={badge}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setFieldValue('badges', values.badges.filter((b) => b !== badge));
                            } else {
                              setFieldValue('badges', [...values.badges, badge]);
                            }
                          }}
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border transition-colors ${
                            isSelected
                              ? 'bg-[#2e261f] text-[#c9a87c] border-[#4d3a2b]'
                              : 'text-neutral-500 border-[#2f2b27] hover:text-neutral-300'
                          }`}
                        >
                          {badge}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 3: Dimensions & Materials */}
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#c9a87c] font-semibold border-b border-[#252220] pb-1">
                  3. Architectural Dimensions &amp; Materials
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-300">Width *</label>
                    <Field
                      name="width"
                      placeholder="260 cm"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-2.5 py-1.5 text-xs text-neutral-200 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-300">Depth *</label>
                    <Field
                      name="depth"
                      placeholder="115 cm"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-2.5 py-1.5 text-xs text-neutral-200 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-300">Height *</label>
                    <Field
                      name="height"
                      placeholder="76 cm"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-2.5 py-1.5 text-xs text-neutral-200 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-300">Seat Height</label>
                    <Field
                      name="seatHeight"
                      placeholder="43 cm"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-2.5 py-1.5 text-xs text-neutral-200 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-300">Weight</label>
                    <Field
                      name="weight"
                      placeholder="78 kg"
                      className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-2.5 py-1.5 text-xs text-neutral-200 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Materials (comma-separated)</label>
                  <Field
                    name="materialsString"
                    placeholder="Italian Textured Wool Bouclé, Kiln-Dried European Beechwood"
                    className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                  />
                </div>
              </div>

              {/* Section 4: Imagery & Narrative */}
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#c9a87c] font-semibold border-b border-[#252220] pb-1">
                  4. Visuals &amp; Narrative
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Primary Image URL *</label>
                  <div className="flex items-center gap-2">
                    <Field
                      name="primaryImage"
                      placeholder="https://images.unsplash.com/photo-..."
                      className="flex-1 bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                    />
                    {values.primaryImage && (
                      <div className="w-9 h-9 rounded overflow-hidden border border-[#332e29] shrink-0 bg-[#221e1a]">
                        <img src={values.primaryImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <ErrorMessage name="primaryImage" component="div" className="text-rose-400 text-[10px]" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Short Description</label>
                  <Field
                    as="textarea"
                    rows={2}
                    name="shortDescription"
                    placeholder="Organic sculptural curve wrapped in tactile Italian wool bouclé..."
                    className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Full Narrative</label>
                  <Field
                    as="textarea"
                    rows={3}
                    name="fullDescription"
                    placeholder="Comprehensive craft and design narrative..."
                    className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded px-3 py-2 text-xs text-neutral-200 outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#252220] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#54382c] hover:bg-[#3e271d] text-white rounded text-xs uppercase tracking-widest font-sans font-medium transition-all duration-150 flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <Check size={14} />
                  <span>{isEditing ? 'Save Changes' : 'Create Piece'}</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
