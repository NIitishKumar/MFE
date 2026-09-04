'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Package, Clock, MapPin, Printer } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface OrderConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderId } = use(params);
  const { getOrderById, formatINR } = useStore();

  const order = getOrderById(orderId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      {/* Confirmation Badge Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EDE7DC] text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-[#EBF3ED] text-[#2D3E33] mx-auto flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-[#2D3E33] font-bold">
            Order Confirmed &amp; Hand-Crafting Scheduled
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal">
            Your order is confirmed.
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
            Thank you for welcoming Madhav Furnitures into your residence. A confirmation receipt has been sent to your email with White-Glove delivery coordination details.
          </p>
        </div>

        {/* Key Order Meta Box */}
        <div className="p-6 rounded-2xl bg-[#F5F0E6] border border-[#E8DFD3] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Order Number</span>
            <span className="text-xs sm:text-sm font-serif font-bold text-[#1C1917] mt-0.5 block">
              {order?.orderNumber || 'AURA-2026-CONFIRMED'}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Estimated Delivery</span>
            <span className="text-xs sm:text-sm font-serif font-bold text-[#2D3E33] mt-0.5 block">
              {order?.estimatedDelivery || 'Within 5-7 Business Days'}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Total Paid</span>
            <span className="text-xs sm:text-sm font-serif font-bold text-[#1C1917] mt-0.5 block">
              {order ? formatINR(order.total) : '₹1,45,000'}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Payment Method</span>
            <span className="text-xs sm:text-sm font-serif font-bold text-[#1C1917] uppercase mt-0.5 block">
              {order?.paymentMethod || 'UPI'}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/account/orders/${order?.id || orderId}`}
            className="w-full sm:w-auto bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 px-8 rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Track Order &amp; Delivery</span>
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto border border-[#D5C9B8] hover:border-[#443224] text-[#443224] text-xs font-semibold py-3.5 px-8 rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Order Items & Shipping Destination Card */}
      {order && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE7DC] space-y-6">
          <h2 className="font-serif text-xl font-semibold text-[#1C1917] pb-3 border-b border-[#F2ECE1]">
            Purchased Pieces &amp; In-Home Assembly
          </h2>

          <div className="divide-y divide-[#F2ECE1]">
            {order.items.map((item) => (
              <div key={item.product.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#F5F1E8]"
                  />
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-medium text-[#1C1917]">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#78716C] mt-0.5">
                      Finish: {item.selectedColor} &bull; Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-serif text-sm font-bold text-[#1C1917]">
                  {formatINR(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F2ECE1] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#57534E]">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#8C827A] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Destination Address:
              </span>
              <p className="font-semibold text-[#1C1917]">{order.shippingAddress.fullName}</p>
              <p>
                {order.shippingAddress.addressLine1}, {order.shippingAddress.city} — {order.shippingAddress.pincode}
              </p>
              <p className="text-[#8C827A]">{order.shippingAddress.phone}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#8C827A] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> White-Glove Protocol:
              </span>
              <p className="text-[#57534E]">
                Our regional dispatch manager will call you 24 hours prior to schedule an exact 2-hour arrival window that fits your schedule.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
