'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  Heart,
  MapPin,
  User,
  ArrowRight,
  LogOut,
  Sparkles,
  Truck,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AccountPage() {
  const { user, logout, orders, wishlistCount, addresses, formatINR } = useStore();

  const recentOrder = orders[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#E8DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
            Private Residence Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
            Welcome, {user.name}
          </h1>
          <p className="text-xs text-[#78716C] mt-0.5">
            {user.email} &bull; {user.phone}
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="self-start sm:self-auto text-xs text-[#BA5D40] hover:text-[#913B26] font-medium flex items-center gap-1.5 p-2 rounded-lg hover:bg-[#FAF7F2] transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex border-b border-[#E8DFD3] gap-6 overflow-x-auto text-xs font-semibold scrollbar-none">
        <Link href="/account" className="pb-3 text-[#1C1917] border-b-2 border-[#443224] shrink-0">
          Overview
        </Link>
        <Link href="/account/orders" className="pb-3 text-[#8C827A] hover:text-[#1C1917] shrink-0">
          My Orders ({orders.length})
        </Link>
        <Link href="/account/addresses" className="pb-3 text-[#8C827A] hover:text-[#1C1917] shrink-0">
          Saved Addresses ({addresses.length})
        </Link>
        <Link href="/wishlist" className="pb-3 text-[#8C827A] hover:text-[#1C1917] shrink-0">
          Saved Wishlist ({wishlistCount})
        </Link>
        <Link href="/account/settings" className="pb-3 text-[#8C827A] hover:text-[#1C1917] shrink-0">
          Settings
        </Link>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          href="/account/orders"
          className="bg-white p-6 rounded-2xl border border-[#EDE7DC] shadow-xs hover:border-[#443224] transition group"
        >
          <div className="flex items-center justify-between text-[#8C827A] mb-3">
            <Package className="w-5 h-5 text-[#443224]" />
            <span className="text-xs font-bold text-[#1C1917]">{orders.length}</span>
          </div>
          <h3 className="font-serif text-base font-medium text-[#1C1917] group-hover:text-[#443224]">
            My Orders
          </h3>
          <p className="text-[11px] text-[#78716C] mt-0.5">Track active shipments</p>
        </Link>

        <Link
          href="/wishlist"
          className="bg-white p-6 rounded-2xl border border-[#EDE7DC] shadow-xs hover:border-[#443224] transition group"
        >
          <div className="flex items-center justify-between text-[#8C827A] mb-3">
            <Heart className="w-5 h-5 text-[#BA5D40]" />
            <span className="text-xs font-bold text-[#1C1917]">{wishlistCount}</span>
          </div>
          <h3 className="font-serif text-base font-medium text-[#1C1917] group-hover:text-[#443224]">
            Wishlist
          </h3>
          <p className="text-[11px] text-[#78716C] mt-0.5">Saved pieces</p>
        </Link>

        <Link
          href="/account/addresses"
          className="bg-white p-6 rounded-2xl border border-[#EDE7DC] shadow-xs hover:border-[#443224] transition group"
        >
          <div className="flex items-center justify-between text-[#8C827A] mb-3">
            <MapPin className="w-5 h-5 text-[#B89758]" />
            <span className="text-xs font-bold text-[#1C1917]">{addresses.length}</span>
          </div>
          <h3 className="font-serif text-base font-medium text-[#1C1917] group-hover:text-[#443224]">
            Addresses
          </h3>
          <p className="text-[11px] text-[#78716C] mt-0.5">Bengaluru &amp; Mumbai</p>
        </Link>

        <Link
          href="/consultation"
          className="bg-[#2C241E] text-white p-6 rounded-2xl border border-[#3E332A] shadow-xs hover:bg-[#1C1917] transition group"
        >
          <div className="flex items-center justify-between text-[#D4AF37] mb-3">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold">1:1 CAD</span>
          </div>
          <h3 className="font-serif text-base font-medium text-white">
            Design Studio
          </h3>
          <p className="text-[11px] text-[#D8CFBF] mt-0.5">Book architect consultation</p>
        </Link>
      </div>

      {/* Recent Order Tracker Preview */}
      {recentOrder && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE7DC] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F2ECE1] gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider">
                Recent Order In Transit
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1917] mt-0.5">
                {recentOrder.orderNumber}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E5EFE7] text-[#2D3E33]">
                {recentOrder.status}
              </span>
              <Link
                href={`/account/orders/${recentOrder.id}`}
                className="text-xs font-semibold text-[#443224] hover:underline flex items-center gap-1"
              >
                <span>Full Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Products summary */}
            <div className="md:col-span-6 space-y-3">
              {recentOrder.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-[#F5F1E8]"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#1C1917]">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#78716C]">
                      {item.selectedColor} &bull; Qty: {item.quantity}
                    </p>
                    <p className="text-xs font-serif font-bold text-[#1C1917] mt-0.5">
                      {formatINR(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery estimate and live tracking state */}
            <div className="md:col-span-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE5D8] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#2D3E33] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4" /> White-Glove In-Home Assembly
                </span>
                <span>En Route</span>
              </div>
              <p className="text-[#57534E]">
                Estimated Arrival: <strong>{recentOrder.estimatedDelivery}</strong>
              </p>
              <p className="text-[#78716C] text-[11px]">
                Delivering to: {recentOrder.shippingAddress.addressLine1}, {recentOrder.shippingAddress.city}
              </p>
              <div className="pt-2">
                <Link
                  href={`/account/orders/${recentOrder.id}`}
                  className="inline-block bg-[#2C241E] text-white text-xs font-semibold py-2 px-4 rounded-xl hover:bg-[#1C1917] transition"
                >
                  View Step-by-Step Logistics
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
