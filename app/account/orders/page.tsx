'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ChevronRight, ArrowRight, Truck, Clock } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function MyOrdersPage() {
  const { orders, formatINR } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <Link href="/account" className="hover:text-[#1C1917] transition">
          Account
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">My Orders</span>
      </nav>

      <div className="pb-6 border-b border-[#E8DFD3]">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
          Purchase Records
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
          My Residence Orders ({orders.length})
        </h1>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const statusColor =
              order.status === 'Delivered'
                ? 'bg-[#EBF3ED] text-[#2D3E33]'
                : order.status === 'Shipped' || order.status === 'Out for Delivery'
                ? 'bg-[#F5F0E6] text-[#443224]'
                : 'bg-[#F2ECE1] text-[#78716C]';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-[#EDE7DC] p-6 sm:p-8 shadow-xs hover:border-[#D5C9B8] transition space-y-6"
              >
                {/* Order Top Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F2ECE1] gap-3">
                  <div>
                    <span className="font-serif text-lg font-bold text-[#1C1917] block">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-[#8C827A]">
                      Ordered on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>
                      {order.status}
                    </span>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-2 px-4 rounded-xl transition flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Shipment</span>
                    </Link>
                  </div>
                </div>

                {/* Items List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 p-3 bg-[#FAF7F2] rounded-2xl border border-[#EDE5D8]">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-white"
                      />
                      <div className="min-w-0 flex-1 text-xs">
                        <h4 className="font-serif text-sm font-semibold text-[#1C1917] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[#78716C] mt-0.5">
                          Finish: {item.selectedColor} &bull; Qty: {item.quantity}
                        </p>
                        <p className="font-serif font-bold text-[#1C1917] mt-1">
                          {formatINR(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer summary */}
                <div className="pt-4 border-t border-[#F2ECE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#57534E]">
                  <div>
                    <span>Delivery Address: </span>
                    <strong className="text-[#1C1917]">{order.shippingAddress.addressLine1}, {order.shippingAddress.city}</strong>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>Total Paid: <strong className="text-base font-serif text-[#1C1917]">{formatINR(order.total)}</strong></span>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-[#443224] font-semibold hover:underline flex items-center gap-0.5"
                    >
                      <span>View Invoice &amp; Timeline</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EDE7DC] space-y-4 max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F5F0E6] mx-auto flex items-center justify-center text-[#8C827A]">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-medium text-[#1C1917]">
            No orders placed yet
          </h3>
          <p className="text-xs text-[#78716C]">
            Explore our curated catalog to furnish your home with architectural tranquility.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block bg-[#2C241E] text-white text-xs font-semibold py-3 px-6 rounded-xl hover:bg-[#1C1917] transition"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
