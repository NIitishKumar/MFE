'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Star,
  Truck,
  ShieldCheck,
  Check,
  ChevronRight,
  Layers,
  Ruler
} from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { ProductGallery } from '@/components/ui/ProductGallery';
import { ProductCard } from '@/components/ui/ProductCard';
import { buildProductWhatsAppUrl } from '@/lib/whatsapp';
import { useClientOrigin } from '@/lib/useClientOrigin';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { isInWishlist, toggleWishlist, formatINR } = useStore();
  const origin = useClientOrigin();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'materials' | 'dimensions' | 'delivery' | 'warranty'>('description');

  // PIN Code Delivery Estimate Checker
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<null | {
    valid: boolean;
    city?: string;
    deliveryDate?: string;
    whiteGlove?: boolean;
  }>(null);

  const isSaved = isInWishlist(product.id);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (cleanPin.length === 6 && /^\d+$/.test(cleanPin)) {
      const isBengaluru = cleanPin.startsWith('560');
      const isMumbai = cleanPin.startsWith('400');
      const isDelhi = cleanPin.startsWith('110');
      const isHyd = cleanPin.startsWith('500');

      let city = 'Metro Region';
      if (isBengaluru) city = 'Bengaluru';
      else if (isMumbai) city = 'Mumbai';
      else if (isDelhi) city = 'Delhi NCR';
      else if (isHyd) city = 'Hyderabad';

      setPincodeStatus({
        valid: true,
        city,
        deliveryDate: product.inStock ? 'Delivery by Tuesday, 08 Sep' : 'Crafted & Delivered in 10-14 days',
        whiteGlove: true
      });
    } else {
      setPincodeStatus({ valid: false });
    }
  };

  // Bag / Checkout actions commented out for now in favor of WhatsApp product inquiry
  // const handleAddToCart = () => {
  //   addToCart(product, quantity, selectedColor, selectedSize);
  //   setIsCartOpen(true);
  // };
  //
  // const handleBuyNow = () => {
  //   addToCart(product, quantity, selectedColor, selectedSize);
  //   router.push('/checkout');
  // };

  const whatsappUrl = buildProductWhatsAppUrl({
    product,
    quantity,
    selectedColor,
    selectedSize,
    customMessage,
    origin,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A] flex-wrap">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <Link href="/shop" className="hover:text-[#1C1917] transition">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <Link href={`/category/${product.category}`} className="hover:text-[#1C1917] transition capitalize">
          {product.categoryLabel || product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />

          {/* Key Craftsmanship Callout */}
          <div className="mt-8 p-6 rounded-2xl bg-[#F5F0E6] border border-[#E8DFD3] grid grid-cols-3 gap-4 text-center">
            <div>
              <Layers className="w-5 h-5 text-[#443224] mx-auto mb-1" />
              <p className="text-[11px] font-semibold text-[#1C1917] uppercase tracking-wider">Materials</p>
              <p className="text-[11px] text-[#78716C] mt-0.5">{product.materials[0] || 'Natural Timber'}</p>
            </div>
            <div className="border-x border-[#E0D5C5] px-2">
              <Ruler className="w-5 h-5 text-[#443224] mx-auto mb-1" />
              <p className="text-[11px] font-semibold text-[#1C1917] uppercase tracking-wider">Width</p>
              <p className="text-[11px] text-[#78716C] mt-0.5">{product.dimensions?.width || 'Standard'}</p>
            </div>
            <div>
              <ShieldCheck className="w-5 h-5 text-[#443224] mx-auto mb-1" />
              <p className="text-[11px] font-semibold text-[#1C1917] uppercase tracking-wider">Warranty</p>
              <p className="text-[11px] text-[#78716C] mt-0.5">10-15 Years</p>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Purchasing Options (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Badges & Title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#F2ECE1] text-[#443224] font-semibold">
                {product.categoryLabel || product.category}
              </span>
              {product.badges?.map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#2C241E] text-white font-semibold"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-medium text-[#1C1917] tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'text-[#B89758] fill-[#B89758]'
                        : 'text-[#DDD4C5]'
                    }`}
                  />
                ))}
                <span className="font-semibold text-[#1C1917] ml-1">{product.rating}</span>
              </div>
              <span className="text-[#A39B8F]">&bull;</span>
              <span className="text-[#57534E] hover:underline cursor-pointer">
                {product.reviewCount} Verified Homeowner Reviews
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EDE5D8] flex items-baseline justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#A39B8F] line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#78716C]">
                Inclusive of all taxes &bull; Complimentary White-Glove delivery above ₹50,000
              </p>
            </div>
            {product.discountPercentage && (
              <span className="text-xs bg-[#BA5D40] text-white font-semibold px-2.5 py-1 rounded-lg">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Short Narrative */}
          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-[#E8DFD3]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#1C1917]">
                  Upholstery / Finish: <span className="font-normal text-[#57534E]">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative p-1 rounded-full border-2 transition cursor-pointer ${
                        isSelected ? 'border-[#443224]' : 'border-transparent hover:border-[#D5C9B8]'
                      }`}
                      title={`${color.name} ${!color.inStock ? '(Made to order)' : ''}`}
                    >
                      <span
                        className="w-7 h-7 rounded-full block border border-black/10 shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size / Dimension Variant */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-[#E8DFD3]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] block">
                Select Configuration:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#2C241E] text-white border-[#2C241E] font-medium'
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

          {/* Custom Message & CTA Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#E8DFD3]">
            <div className="space-y-1.5">
              <label
                htmlFor="whatsapp-custom-message"
                className="block text-xs font-semibold text-[#1C1917]"
              >
                Custom Note / Inquiry Message <span className="font-normal text-[#8C827A]">(optional)</span>
              </label>
              <textarea
                id="whatsapp-custom-message"
                rows={2}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g. Custom fabric finish, delivery city, or custom dimensions request..."
                className="w-full bg-white border border-[#D5C9B8] focus:border-[#2C241E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] placeholder-[#A39B8F] focus:outline-hidden resize-none transition"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#D5C9B8] rounded-xl bg-white px-2 py-1.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 text-[#57534E] hover:text-[#1C1917] text-sm font-semibold cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-xs font-bold text-[#1C1917] px-3">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 text-[#57534E] hover:text-[#1C1917] text-sm font-semibold cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-center ${
                  isSaved
                    ? 'bg-[#BA5D40] text-white border-[#BA5D40]'
                    : 'bg-white text-[#57534E] border-[#D5C9B8] hover:border-[#443224]'
                }`}
                aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-white stroke-white' : 'stroke-current'}`} />
              </button>

              {/* Bag / Add to Cart commented out for now */}
              {/* <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart &bull; {formatINR(product.price * quantity)}</span>
              </button> */}

              {/* WhatsApp Inquiry CTA with selected product details & custom message */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Inquire on WhatsApp &bull; {formatINR(product.price * quantity)}</span>
              </a>
            </div>

            {/* Buy Now Button commented out with bag option */}
            {/* <button
              type="button"
              onClick={handleBuyNow}
              className="w-full bg-[#B89758] hover:bg-[#C5A059] text-[#1C1917] text-xs font-bold py-3.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instant Buy with White-Glove Delivery</span>
            </button> */}
          </div>

          {/* Indian PIN Code Delivery Checker */}
          <div className="p-4 rounded-xl bg-[#F5F0E6] border border-[#E8DFD3] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
              <Truck className="w-4 h-4 text-[#443224]" />
              <span>Check Estimated Delivery &amp; Assembly</span>
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit PIN code (e.g. 560038)"
                className="flex-1 bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs text-[#1C1917] placeholder-[#A39B8F] focus:outline-hidden focus:border-[#443224]"
              />
              <button
                type="submit"
                className="bg-[#443224] hover:bg-[#2C241E] text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Check
              </button>
            </form>

            {pincodeStatus && (
              <div className="text-xs pt-1">
                {pincodeStatus.valid ? (
                  <div className="text-[#2D3E33] font-medium flex items-start gap-1.5">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p>White-Glove Delivery eligible for <strong>{pincodeStatus.city}</strong> ({pincode}).</p>
                      <p className="text-[#57534E] text-[11px] mt-0.5">{pincodeStatus.deliveryDate}. Complimentary assembly included.</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#BA5D40]">Please enter a valid 6-digit Indian PIN code.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accordion / Tabbed Specifications Section */}
      <div className="pt-12 border-t border-[#E8DFD3] space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-[#E8DFD3] gap-6 overflow-x-auto scrollbar-none">
          {[
            { id: 'description', label: 'Description' },
            { id: 'materials', label: 'Materials & Care' },
            { id: 'dimensions', label: 'Dimensions & Diagram' },
            { id: 'delivery', label: 'Delivery & Returns' },
            { id: 'warranty', label: 'Warranty' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs sm:text-sm font-semibold transition tracking-wide cursor-pointer relative shrink-0 ${
                activeTab === tab.id ? 'text-[#1C1917]' : 'text-[#8C827A] hover:text-[#57534E]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#443224] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#EDE7DC] shadow-xs text-xs sm:text-sm text-[#57534E] leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Architectural Concept</h3>
              <p>{product.fullDescription || product.shortDescription}</p>
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-[#F5F0E6] rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Lead Time</span>
                  <span className="font-medium text-[#1C1917] mt-0.5 block">{product.leadTime || 'Crafted to order; 4-6 weeks'}</span>
                </div>
                <div className="p-3 bg-[#F5F0E6] rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Origin</span>
                  <span className="font-medium text-[#1C1917] mt-0.5 block">Artisan Atelier, India</span>
                </div>
                <div className="p-3 bg-[#F5F0E6] rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Assembly</span>
                  <span className="font-medium text-[#1C1917] mt-0.5 block">White-Glove Included</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Material Composition</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                {product.materials.map((m) => (
                  <li key={m}>
                    <strong>{m}</strong>
                  </li>
                ))}
              </ul>
              <h4 className="font-serif text-base font-semibold text-[#1C1917] pt-3">Care &amp; Maintenance</h4>
              <p>{product.careInstructions || 'Professional clean only. Dust regularly with a microfiber cloth.'}</p>
            </div>
          )}

          {activeTab === 'dimensions' && product.dimensions && (
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Product Dimensions</h3>
              <div className="divide-y divide-[#EDE5D8] border border-[#EDE5D8] rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 p-3 bg-[#F9F6F0] font-semibold text-[#1C1917]">
                  <span>Specification</span>
                  <span>Measurement</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span>Overall Width</span>
                  <span className="font-medium text-[#1C1917]">{product.dimensions.width}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span>Overall Depth</span>
                  <span className="font-medium text-[#1C1917]">{product.dimensions.depth}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span>Overall Height</span>
                  <span className="font-medium text-[#1C1917]">{product.dimensions.height}</span>
                </div>
                {product.dimensions.seatHeight && (
                  <div className="grid grid-cols-2 p-3">
                    <span>Seat Height from Floor</span>
                    <span className="font-medium text-[#1C1917]">{product.dimensions.seatHeight}</span>
                  </div>
                )}
                {product.dimensions.weight && (
                  <div className="grid grid-cols-2 p-3">
                    <span>Net Weight</span>
                    <span className="font-medium text-[#1C1917]">{product.dimensions.weight}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Complimentary White-Glove Logistics</h3>
              <p>
                All orders above ₹50,000 receive our premier White-Glove delivery service. Our crew uncrates, handles multi-level stairs, installs the piece in your requested room layout, levels all legs, and clears away all protective wraps for recycling.
              </p>
              <h4 className="font-serif text-base font-semibold text-[#1C1917] pt-2">14-Day Returns</h4>
              <p>
                Standard catalogue pieces may be returned within 14 calendar days of delivery in pristine condition. Custom upholstered bespoke sizes are handcrafted specifically for your residence and covered by our damage and repair guarantee.
              </p>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="space-y-3 max-w-3xl">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Artisan Structural Guarantee</h3>
              <p>{product.warranty || '15-Year Solid Timber & Architectural Structural Guarantee'}</p>
              <p className="text-xs text-[#78716C]">
                Includes complimentary annual timber conditioning and hardware tightening inspection upon request at our Bengaluru and Mumbai service hubs.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
                Cohesive Pairings
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal mt-1">
                You May Also Like
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-wider font-semibold text-[#443224] hover:underline"
            >
              View Full Catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Bar (WhatsApp inquiry replaces Add to Cart) */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E8DFD3] p-3 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="font-serif text-base font-bold text-[#1C1917] block">
            {formatINR(product.price)}
          </span>
          <span className="text-[10px] text-[#78716C] line-clamp-1">{selectedColor}</span>
        </div>
        {/* <button
          type="button"
          onClick={handleAddToCart}
          className="bg-[#2C241E] text-white text-xs font-semibold py-2.5 px-5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button> */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold py-2.5 px-5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

