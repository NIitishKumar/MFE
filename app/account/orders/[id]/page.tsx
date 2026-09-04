'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Package,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Printer,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const { getOrderById, formatINR } = useStore();

  const order = getOrderById(id);

  if (!order) {
    notFound();
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 print:p-0">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A] print:hidden">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <Link href="/account" className="hover:text-[#1C1917] transition">
          Account
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <Link href="/account/orders" className="hover:text-[#1C1917] transition">
          Orders
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">{order.orderNumber}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD3]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {order.orderNumber}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E5EFE7] text-[#2D3E33]">
              {order.status}
            </span>
          </div>
          <p className="text-xs text-[#78716C] mt-1">
            Ordered on {new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="print:hidden flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-white text-[#443224] hover:bg-[#FAF7F2] transition cursor-pointer shadow-2xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print Tax Invoice</span>
        </button>
      </div>

      {/* Live Tracking Visual Timeline Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE7DC] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#443224]" />
            <h2 className="font-serif text-lg font-semibold text-[#1C1917]">
              White-Glove Logistics Timeline
            </h2>
          </div>
          <span className="text-xs font-medium text-[#2D3E33] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Target Arrival: <strong>{order.estimatedDelivery}</strong></span>
          </span>
        </div>

        {/* 5-Step Progress Steps */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DFD3]">
          {order.trackingSteps.map((step, idx) => {
            let markerClass = 'bg-[#EDE7DC] text-[#8C827A] border-2 border-white';
            if (step.completed) {
              markerClass = 'bg-[#2D3E33] text-white border-2 border-white';
            } else if (step.current) {
              markerClass = 'bg-[#D4AF37] text-white border-2 border-white ring-4 ring-[#D4AF37]/20';
            }

            return (
              <div key={idx} className="relative flex items-start justify-between gap-4">
                <span
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition shadow-xs ${markerClass}`}
                >
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </span>

                <div className="space-y-1">
                  <h3
                    className={`font-serif text-sm sm:text-base font-semibold ${
                      step.current || step.completed ? 'text-[#1C1917]' : 'text-[#8C827A]'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#78716C] leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>

                <span className="text-[11px] font-semibold text-[#8C827A] shrink-0 text-right">
                  {step.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Purchased Items (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#EDE7DC] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#1C1917] pb-3 border-b border-[#F2ECE1]">
            Commissioned Furniture Pieces
          </h3>

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
                    <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1C1917]">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#78716C] mt-0.5">
                      Finish: {item.selectedColor} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                    </p>
                    <p className="text-xs text-[#8C827A]">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-serif text-sm sm:text-base font-bold text-[#1C1917]">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Destination & Pricing (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#EDE7DC] shadow-xs space-y-3 text-xs text-[#57534E]">
            <h4 className="font-serif text-base font-semibold text-[#1C1917] flex items-center gap-1.5 pb-2 border-b border-[#F2ECE1]">
              <MapPin className="w-4 h-4 text-[#443224]" /> Delivery Destination
            </h4>
            <p className="font-semibold text-[#1C1917]">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}</p>
            <p className="text-[#8C827A] pt-1">Contact: {order.shippingAddress.phone}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EDE7DC] shadow-xs space-y-3 text-xs text-[#57534E]">
            <h4 className="font-serif text-base font-semibold text-[#1C1917] pb-2 border-b border-[#F2ECE1]">
              Payment Breakdown
            </h4>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1C1917]">{formatINR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>White-Glove In-Home Installation</span>
              <span className="text-[#2D3E33] font-semibold">
                {order.deliveryFee === 0 ? 'COMPLIMENTARY' : formatINR(order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span className="font-semibold uppercase text-[#1C1917]">{order.paymentMethod}</span>
            </div>
            <div className="pt-3 border-t border-[#E8DFD3] flex justify-between text-base font-serif font-bold text-[#1C1917]">
              <span>Total Paid</span>
              <span>{formatINR(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
