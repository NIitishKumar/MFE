'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CATEGORIES, ROOMS } from '@/data/categories';

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, wishlistCount, setIsCartOpen, setIsSearchOpen, user } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Best Sellers', href: '/shop?filter=best-seller' },
    { label: 'Showroom', href: '/showroom' },
    { label: 'About', href: '/about' }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-xs border-b border-[#E8E0D5]'
            : 'bg-[#FDFBF7] border-b border-[#F0E9DF]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Menu Toggle & Logo */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#2C241E] hover:text-[#594433] rounded-md transition"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link href="/" className="group flex flex-col items-start select-none">
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#1C1917] group-hover:text-[#443224] transition">
                  MADHAV FURNITURES
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C827A] -mt-1 font-sans">
                  Studio &amp; Showroom
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition relative py-1 ${
                      isActive
                        ? 'text-[#1C1917] font-semibold'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#443224] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Account, Wishlist, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#2C241E] hover:text-[#443224] rounded-full hover:bg-[#F2ECE1] transition"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href={user.isLoggedIn ? '/account' : '/login'}
                className="hidden sm:inline-flex p-2 text-[#2C241E] hover:text-[#443224] rounded-full hover:bg-[#F2ECE1] transition relative group"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                {user.isLoggedIn && (
                  <span className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-[#2D3E33] rounded-full ring-2 ring-[#FDFBF7]" />
                )}
              </Link>

              <Link
                href="/wishlist"
                className="hidden sm:inline-flex p-2 text-[#2C241E] hover:text-[#443224] rounded-full hover:bg-[#F2ECE1] transition relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#BA5D40] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#2C241E] hover:text-[#443224] rounded-full hover:bg-[#F2ECE1] transition relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#443224] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-xs bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#EFE8DC]">
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold tracking-wider text-[#1C1917]">
                  MADHAV FURNITURES
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8C827A]">
                  Furniture Showroom
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#57534E] hover:text-[#1C1917] rounded-full hover:bg-[#EFE8DC] transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-widest font-semibold text-[#8C827A]">
                  Main Menu
                </p>
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-base font-medium text-[#2C241E] hover:text-[#443224] py-1.5 flex items-center justify-between border-b border-[#F5EFE6]"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#A89C8F]" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories Quick Access */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-widest font-semibold text-[#8C827A]">
                  Shop by Category
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className="p-2.5 rounded-lg bg-[#F5F0E6] text-xs font-medium text-[#443224] hover:bg-[#EBE3D3] transition text-center"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Showroom & Consultation CTA */}
              <div className="bg-[#2C241E] text-[#FDFBF7] p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-medium tracking-wide">
                    Bengaluru &amp; Mumbai
                  </span>
                </div>
                <p className="text-xs text-[#D8CFBF] leading-relaxed">
                  Touch and experience our hand-crafted solid timber and Italian bouclé pieces in person.
                </p>
                <div className="pt-1 flex flex-col gap-2">
                  <Link
                    href="/showroom"
                    className="block text-center py-2 px-3 text-xs font-medium bg-[#FDFBF7] text-[#2C241E] rounded-md hover:bg-[#ECE5D8] transition"
                  >
                    Visit Showroom
                  </Link>
                  <Link
                    href="/consultation"
                    className="block text-center py-2 px-3 text-xs font-medium border border-[#A89C8F] text-[#FDFBF7] rounded-md hover:bg-white/10 transition"
                  >
                    Book Design Consultation
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-[#EFE8DC] bg-[#F7F2EA] flex items-center justify-between text-xs text-[#70675D]">
              <Link href="/account" className="flex items-center gap-1.5 hover:text-[#1C1917]">
                <User className="w-4 h-4" />
                <span>{user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}</span>
              </Link>
              <Link href="/contact" className="hover:text-[#1C1917]">
                Concierge Care
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
