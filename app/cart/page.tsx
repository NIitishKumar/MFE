'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck, ShieldCheck, Sparkles, ChevronRight, Tag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    freeShippingThreshold,
    formatINR,
    addToast
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const freeDeliveryDelta = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const deliveryFee = cart.length === 0 ? 0 : freeDeliveryDelta === 0 ? 0 : 2500;
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'MADHAV10' || code === 'AURA10') {
      setDiscountPercent(10);
      setAppliedCoupon(code);
      addToast(`Privilege code ${code} applied: 10% discount granted!`, 'success');
      setCouponCode('');
    } else {
      addToast('Invalid voucher code. Try "MADHAV10".', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">Shopping Cart</span>
      </nav>

      {/* Header */}
      <div className="pb-6 border-b border-[#E8DFD3]">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
          Your Selection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal mt-1">
          Shopping Cart ({cartCount})
        </h1>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Items (7 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Delivery Banner */}
            <div className="p-4 rounded-2xl bg-[#F5F0E6] border border-[#E8DFD3] space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[#443224]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#443224]" />
                  {freeDeliveryDelta === 0 ? (
                    <span className="text-[#2D3E33] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#B89758]" /> Complimentary White-Glove Delivery Activated!
                    </span>
                  ) : (
                    <span>Add {formatINR(freeDeliveryDelta)} more for complimentary White-Glove delivery</span>
                  )}
                </span>
                <span className="text-[11px] text-[#8C827A]">{Math.round(freeDeliveryProgress)}%</span>
              </div>
              <div className="w-full bg-[#E5DCCF] h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    freeDeliveryDelta === 0 ? 'bg-[#2D3E33]' : 'bg-[#443224]'
                  }`}
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>

            {/* Items Card List */}
            <div className="bg-white rounded-2xl border border-[#EDE7DC] divide-y divide-[#F2ECE1] overflow-hidden shadow-xs">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5"
                >
                  <Link
                    href={`/product/${item.product.id}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#F5F1E8] border border-[#E8DFD3] shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#A39B8F]">
                          {item.product.categoryLabel}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-medium text-[#1C1917] mt-0.5">
                          <Link href={`/product/${item.product.id}`} className="hover:text-[#443224]">
                            {item.product.name}
                          </Link>
                        </h3>
                        <div className="text-xs text-[#78716C] mt-1 space-x-2">
                          <span>Finish: <strong>{item.selectedColor}</strong></span>
                          {item.selectedSize && <span>&bull; Size: <strong>{item.selectedSize}</strong></span>}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-base sm:text-lg font-semibold text-[#1C1917] block">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                        <span className="text-[11px] text-[#8C827A]">
                          {formatINR(item.product.price)} each
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D5C9B8] rounded-xl bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, -1)
                          }
                          className="p-2 text-[#57534E] hover:bg-[#F5F0E6] transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#1C1917] px-4">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, 1)
                          }
                          className="p-2 text-[#57534E] hover:bg-[#F5F0E6] transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedColor, item.selectedSize)
                        }
                        className="text-xs text-[#BA5D40] hover:text-[#943F29] font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* In-Home Assembly Note */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] flex items-center gap-3 text-xs text-[#57534E]">
              <ShieldCheck className="w-5 h-5 text-[#2D3E33] shrink-0" />
              <span>
                All orders are packaged in climate-proof timber crates and handled by certified Aura logistics technicians.
              </span>
            </div>
          </div>

          {/* Right Column: Order Summary (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE7DC] shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-semibold text-[#1C1917] pb-4 border-b border-[#E8DFD3]">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label htmlFor="promo" className="text-xs font-semibold uppercase tracking-wider text-[#8C827A] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#B89758]" /> Voucher or Privilege Code
              </label>
              <div className="flex gap-2">
                <input
                  id="promo"
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. MADHAV10"
                  className="flex-1 bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs uppercase text-[#1C1917] placeholder-[#A39B8F] focus:outline-hidden focus:border-[#443224]"
                />
                <button
                  type="submit"
                  className="bg-[#443224] hover:bg-[#2C241E] text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <p className="text-[11px] text-[#2D3E33] font-medium">
                  &bull; Code {appliedCoupon} active (10% privilege deduction)
                </p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-[#57534E] pt-2 border-t border-[#F2ECE1]">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-[#1C1917]">{formatINR(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#BA5D40] font-medium">
                  <span>Privilege Voucher (10%)</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove In-Home Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#2D3E33] font-semibold">COMPLIMENTARY</span>
                  ) : (
                    formatINR(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (18%)</span>
                <span className="text-[#8C827A]">Included in prices</span>
              </div>
              <div className="pt-3 border-t border-[#E8DFD3] flex justify-between text-lg font-serif font-bold text-[#1C1917]">
                <span>Total Amount</span>
                <span>{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-4 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/shop"
                className="block text-center text-xs font-semibold text-[#443224] hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-[#EDE7DC] space-y-5 max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F5F0E6] mx-auto flex items-center justify-center text-[#443224]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl font-medium text-[#1C1917]">
              Your cart is ready for something beautiful.
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Explore our curated architectural furniture, designed for lifetimes of serene contemplation.
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
