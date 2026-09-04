'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, wishlistCount, setIsCartOpen, user } = useStore();

  const navItems = [
    { label: 'Home', href: '/', icon: Home, active: pathname === '/' },
    { label: 'Shop', href: '/shop', icon: Compass, active: pathname.startsWith('/shop') || pathname.startsWith('/category') },
    { label: 'Wishlist', href: '/wishlist', icon: Heart, active: pathname === '/wishlist', badge: wishlistCount },
    {
      label: 'Cart',
      href: '#',
      icon: ShoppingBag,
      active: false,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsCartOpen(true);
      },
      badge: cartCount
    },
    { label: 'Account', href: user.isLoggedIn ? '/account' : '/login', icon: User, active: pathname.startsWith('/account') || pathname === '/login' }
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-lg border-t border-[#E8DFC0]/60 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] px-2 py-2"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active;

          const content = (
            <span
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition relative ${
                isActive ? 'text-[#3E2D22] font-semibold' : 'text-[#7C7267] hover:text-[#3E2D22]'
              }`}
            >
              <span className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.25px]' : 'stroke-[1.75px]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 bg-[#BA5D40] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] tracking-tight mt-1">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 bg-[#3E2D22] rounded-full mt-0.5" />
              )}
            </span>
          );

          if (item.onClick) {
            return (
              <button key={item.label} onClick={item.onClick} type="button">
                {content}
              </button>
            );
          }

          return (
            <Link key={item.label} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
