'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    freeShippingThreshold,
    formatINR
  } = useStore();

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const freeDeliveryDelta = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#EFE8DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#443224]" />
            <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
              Your Cart ({cartCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[#57534E] hover:text-[#1C1917] rounded-full hover:bg-[#F2ECE1] transition cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-6 py-3.5 bg-[#F5F0E6] border-b border-[#E8DFD3]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1 text-[#443224]">
              <Truck className="w-3.5 h-3.5" />
              {freeDeliveryDelta === 0 ? (
                <span className="text-[#2D3E33] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89758]" />
                  Complimentary White-Glove Delivery Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#1C1917]">{formatINR(freeDeliveryDelta)}</strong> more for free White-Glove delivery
                </span>
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

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#F2ECE1]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F0E6] flex items-center justify-center text-[#8C827A]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                  Your cart is ready for something beautiful.
                </h3>
                <p className="text-xs text-[#8C827A] mt-1 max-w-xs">
                  Discover handcrafted timber beds, curved bouclé sofas, and honed travertine dining tables.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/shop');
                }}
                className="bg-[#2C241E] text-white text-xs font-semibold py-3 px-6 rounded-xl hover:bg-[#443224] transition cursor-pointer"
              >
                Explore Furniture
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="py-4 flex gap-4">
                <Link
                  href={`/product/${item.product.id}`}
                  onClick={() => setIsCartOpen(false)}
                  className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5F1E8] border border-[#E8DFD3] shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-serif text-sm font-medium text-[#1C1917] hover:text-[#443224] line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedColor, item.selectedSize)
                        }
                        className="text-[#A39B8F] hover:text-[#BA5D40] transition p-0.5 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#78716C] mt-0.5 flex flex-wrap gap-1">
                      <span>{item.selectedColor}</span>
                      {item.selectedSize && <span>• {item.selectedSize}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#DDD4C5] rounded-lg bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, -1)
                        }
                        className="p-1 text-[#57534E] hover:bg-[#F5F0E6] transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold text-[#1C1917] px-2.5">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, 1)
                        }
                        className="p-1 text-[#57534E] hover:bg-[#F5F0E6] transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif text-sm font-semibold text-[#1C1917]">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#EFE8DC] bg-[#FAF7F2] space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#57534E]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1C1917]">{formatINR(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#57534E]">
                <span>White-Glove Delivery</span>
                <span>
                  {freeDeliveryDelta === 0 ? (
                    <span className="text-[#2D3E33] font-semibold">FREE</span>
                  ) : (
                    '₹2,500'
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8DFD3] flex justify-between text-base font-serif font-bold text-[#1C1917]">
                <span>Estimated Total</span>
                <span>
                  {formatINR(cartSubtotal + (freeDeliveryDelta === 0 ? 0 : 2500))}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-[#2C241E] hover:bg-[#1C1917] text-white font-medium py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-xl border border-[#D5C9B8] text-xs font-semibold text-[#443224] hover:bg-white transition"
              >
                View Full Cart Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
