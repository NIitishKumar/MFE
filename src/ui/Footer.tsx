'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function Footer() {
  const { addToast, categories } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to Madhav Furnitures. Enjoy 10% off with code MADHAV10 at checkout.', 'success');
  };

  return (
    <footer className="bg-[#241E1A] text-[#EFEBE4] pt-16 pb-24 lg:pb-12 border-t border-[#382F28] mt-auto">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#382F28]">
        <div className="bg-[#2E2621] rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#443831]">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium flex items-center justify-center lg:justify-start gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Private Design Journal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal mt-2">
              Bring better design home.
            </h3>
            <p className="text-sm text-[#BFB3A4] mt-2 font-light leading-relaxed">
              Receive limited release previews, architectural spatial essays, and 10% privilege towards your inaugural order.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-3 bg-[#1C1815] border border-[#C5A059]/40 py-3 px-5 rounded-xl text-sm text-[#F7F4EE]">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>You are subscribed! Use voucher <strong>MADHAV10</strong> for 10% privilege.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md w-full">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#8A7C6E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-[#1C1815] border border-[#4D3F37] focus:border-[#C5A059] focus:outline-hidden text-sm text-white placeholder-[#8A7C6E] rounded-xl pl-10 pr-4 py-3 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#D4AF37] text-[#1C1815] font-semibold text-sm px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#382F28]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <Truck className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white">White-Glove Delivery</h4>
              <p className="text-xs text-[#A89C8F] mt-0.5">Complimentary for orders above ₹50,000</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white">10-15 Year Warranty</h4>
              <p className="text-xs text-[#A89C8F] mt-0.5">Solid hardwoods &amp; natural stones</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white">Artisan Crafted</h4>
              <p className="text-xs text-[#A89C8F] mt-0.5">Traditional mortise &amp; tenon joinery</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <Clock className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white">Showrooms in IN</h4>
              <p className="text-xs text-[#A89C8F] mt-0.5">Bengaluru (HAL 100ft) &amp; Mumbai (Worli)</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main 4-Column Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Intro */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-wider text-white">
                MADHAV FURNITURES
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059]">
                Studio &amp; Showroom
              </span>
            </div>
            <p className="text-xs text-[#BFB3A4] leading-relaxed max-w-sm">
              Conceiving quiet sanctuaries across modern Indian homes through architectural furniture, sustainable forestry timbers, and timeless geological stonework.
            </p>
            <div className="pt-2 text-xs text-[#C5A059] space-y-1">
              <p>Showroom Inquiries: <a href="tel:+917500931934" className="text-white hover:underline">+91 75 0093 1934</a></p>
              {/* <p>Email: <a href="mailto:concierge@madhavfurnitures.in" className="text-white hover:underline">concierge@madhavfurnitures.in</a></p> */}
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Shop</h4>
            <ul className="space-y-2 text-xs text-[#BFB3A4]">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.slug}`} className="hover:text-white transition">
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/shop" className="hover:text-white transition">
                    Browse Complete Catalog
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* About & Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">About</h4>
            <ul className="space-y-2 text-xs text-[#BFB3A4]">
              <li><Link href="/about" className="hover:text-white transition">Our Story</Link></li>
              <li><Link href="/about#craft" className="hover:text-white transition">Artisan Craftsmanship</Link></li>
              <li><Link href="/collections" className="hover:text-white transition">Curated Collections</Link></li>
              <li><Link href="/showroom" className="hover:text-white transition">Showroom Sanctuaries</Link></li>
              <li><Link href="/consultation" className="hover:text-white transition">Book Design Consultation</Link></li>
            </ul>
          </div>

          {/* Client Care & Account */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Help &amp; Account</h4>
            <ul className="space-y-2 text-xs text-[#BFB3A4]">
              <li><Link href="/contact" className="hover:text-white transition">Contact Concierge</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Frequently Asked Questions</Link></li>
              <li><Link href="/account/orders" className="hover:text-white transition">Track Your Order</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition">Saved Wishlist</Link></li>
              <li><Link href="/account/addresses" className="hover:text-white transition">Address Book</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#382F28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7C6E]">
        <p>© {new Date().getFullYear()} Madhav Furnitures India Pvt. Ltd. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {/* <span className="text-[11px] text-[#A89C8F]">Accepted Payments: UPI • NetBanking • Visa • Mastercard • RuPay • COD</span> */}
          <div className="flex items-center space-x-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#BFB3A4] hover:text-white transition" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#BFB3A4] hover:text-white transition" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" /></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#BFB3A4] hover:text-white transition" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
