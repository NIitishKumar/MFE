'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  ChevronLeft,
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Address } from '@/types';

type CheckoutStep = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    freeShippingThreshold,
    addresses,
    addAddress,
    createOrder,
    formatINR
  } = useStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);

  // Address selection or new address form
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses[0]?.id || 'new'
  );
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    fullName: 'Aditya Sharma',
    phone: '+91 98450 12345',
    addressLine1: '',
    addressLine2: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    landmark: '',
    isDefault: false,
    type: 'home'
  });

  // Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'white-glove' | 'standard' | 'express'>('white-glove');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('aditya@oksbi');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#1C1917]">Your shopping bag is empty.</h2>
        <p className="text-xs text-[#8C827A]">Please select furniture to proceed with checkout.</p>
        <Link
          href="/shop"
          className="inline-block bg-[#2C241E] text-white text-xs font-semibold py-3 px-6 rounded-xl"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const deliveryFee = cartSubtotal >= freeShippingThreshold ? 0 : 2500;
  const totalAmount = cartSubtotal + deliveryFee;

  const currentAddress: Address =
    selectedAddressId === 'new'
      ? { ...newAddress, id: 'temp-addr' }
      : addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (selectedAddressId === 'new') {
        if (!newAddress.addressLine1 || !newAddress.city || !newAddress.pincode) {
          alert('Please complete all required address fields.');
          return;
        }
        const created = addAddress(newAddress);
        setSelectedAddressId(created.id);
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder({
        items: cart,
        shippingAddress: currentAddress,
        deliveryMethod,
        paymentMethod,
        subtotal: cartSubtotal,
        deliveryFee,
        discount: 0,
        total: totalAmount
      });
      setIsProcessing(false);
      router.push(`/order-confirmation/${order.id}`);
    }, 1000);
  };

  const steps = [
    { num: 1, title: 'Shipping Address' },
    { num: 2, title: 'Delivery Method' },
    { num: 3, title: 'Payment' },
    { num: 4, title: 'Review & Place' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD3]">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
            Secure Checkout
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-normal mt-1">
            Complete Your Residence Order
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#2D3E33] font-medium bg-[#F2ECE1] px-3 py-1.5 rounded-lg w-fit">
          <ShieldCheck className="w-4 h-4 text-[#2D3E33]" />
          <span>256-bit Encrypted Checkout</span>
        </div>
      </div>

      {/* Checkout Progress Stepper */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-3xl">
        {steps.map((s) => {
          const isDone = currentStep > s.num;
          const isCurrent = currentStep === s.num;
          return (
            <div
              key={s.num}
              className={`flex flex-col items-center text-center p-2 rounded-xl transition ${
                isCurrent
                  ? 'bg-[#2C241E] text-white shadow-xs'
                  : isDone
                  ? 'bg-[#F2ECE1] text-[#2D3E33]'
                  : 'bg-white/50 text-[#8C827A]'
              }`}
            >
              <span className="text-[11px] font-bold flex items-center gap-1">
                {isDone ? <Check className="w-3.5 h-3.5" /> : `Step ${s.num}`}
              </span>
              <span className="text-[10px] sm:text-xs tracking-tight truncate w-full hidden sm:block mt-0.5 font-medium">
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Form Steps + Sticky Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form Steps (7 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE7DC] shadow-xs space-y-6">
          {/* STEP 1: ADDRESS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F2ECE1]">
                <MapPin className="w-5 h-5 text-[#443224]" />
                <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                  Delivery Address &amp; Contact
                </h2>
              </div>

              {/* Saved Addresses Selector */}
              {addresses.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8C827A]">
                    Saved Indian Delivery Addresses:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                          selectedAddressId === addr.id
                            ? 'border-[#443224] bg-[#FAF7F2] ring-1 ring-[#443224]'
                            : 'border-[#EDE5D8] hover:border-[#D5C9B8]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#1C1917] block">
                              {addr.fullName}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-[#8C827A] font-semibold">
                              {addr.type} Address
                            </span>
                          </div>
                          <input
                            type="radio"
                            name="selectedAddress"
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="accent-[#443224]"
                          />
                        </div>
                        <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                          {addr.addressLine1}, {addr.addressLine2 ? `${addr.addressLine2}, ` : ''}
                          {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p className="text-[11px] text-[#8C827A] mt-1 font-medium">{addr.phone}</p>
                      </label>
                    ))}

                    {/* Option to Add New Address */}
                    <label
                      className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-center text-center ${
                        selectedAddressId === 'new'
                          ? 'border-[#443224] bg-[#FAF7F2] ring-1 ring-[#443224]'
                          : 'border-dashed border-[#D5C9B8] hover:border-[#443224]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddressId === 'new'}
                        onChange={() => setSelectedAddressId('new')}
                        className="sr-only"
                      />
                      <span className="text-xs font-semibold text-[#443224]">
                        + Add New Delivery Address
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* New Address Form (if selected) */}
              {selectedAddressId === 'new' && (
                <div className="space-y-4 pt-4 border-t border-[#F2ECE1]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8C827A] block">
                    Enter New Indian Shipping Details:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#57534E] font-medium mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#57534E] font-medium mb-1">Mobile Number (+91) *</label>
                      <input
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[#57534E] font-medium mb-1">Flat, House No., Building, Apartment *</label>
                      <input
                        type="text"
                        value={newAddress.addressLine1}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                        placeholder="e.g. Villa 18, Windmills of Your Mind"
                        className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[#57534E] font-medium mb-1">Area, Street, Sector, Village</label>
                      <input
                        type="text"
                        value={newAddress.addressLine2}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                        placeholder="e.g. EPIP Zone, Whitefield"
                        className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-[#57534E] font-medium mb-1">Town / City *</label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#57534E] font-medium mb-1">State *</label>
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#57534E] font-medium mb-1">PIN Code (6 Digits) *</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#57534E] font-medium mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        value={newAddress.landmark}
                        onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                        placeholder="e.g. Near Marriott Hotel"
                        className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: DELIVERY METHOD */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F2ECE1]">
                <Truck className="w-5 h-5 text-[#443224]" />
                <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                  Delivery &amp; White-Glove Installation
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'white-glove',
                    title: 'White-Glove In-Home Installation',
                    desc: 'Technicians unpack in room of choice, assemble, level all joints, and clean packing debris.',
                    badge: deliveryFee === 0 ? 'Complimentary' : '₹2,500'
                  },
                  {
                    id: 'standard',
                    title: 'Standard Threshold Delivery',
                    desc: 'Crated drop-off at your residence front door without in-room unboxing.',
                    badge: 'Standard'
                  }
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`p-5 rounded-2xl border transition cursor-pointer flex items-start justify-between ${
                      deliveryMethod === item.id
                        ? 'border-[#443224] bg-[#FAF7F2] ring-1 ring-[#443224]'
                        : 'border-[#EDE5D8] hover:border-[#D5C9B8]'
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-semibold text-[#1C1917]">
                          {item.title}
                        </span>
                        <span className="text-[10px] uppercase px-2 py-0.5 bg-[#2D3E33] text-white rounded-md font-semibold">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E] leading-relaxed">{item.desc}</p>
                    </div>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === item.id}
                      onChange={() => setDeliveryMethod(item.id as any)}
                      className="accent-[#443224] mt-1"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F2ECE1]">
                <CreditCard className="w-5 h-5 text-[#443224]" />
                <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col space-y-3 ${
                    paymentMethod === 'upi'
                      ? 'border-[#443224] bg-[#FAF7F2] ring-1 ring-[#443224]'
                      : 'border-[#EDE5D8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <QrCode className="w-5 h-5 text-[#443224]" />
                      <div>
                        <span className="font-serif text-sm font-semibold text-[#1C1917] block">
                          Instant UPI / QR (GPay, PhonePe, Paytm, BHIM)
                        </span>
                        <span className="text-[10px] text-[#78716C]">Zero processing surcharge</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#443224]"
                    />
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="pt-2 text-xs space-y-2">
                      <label className="block text-[#57534E] font-medium">Your UPI Virtual ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  )}
                </label>

                {/* Card Option */}
                <label
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col space-y-3 ${
                    paymentMethod === 'card'
                      ? 'border-[#443224] bg-[#FAF7F2] ring-1 ring-[#443224]'
                      : 'border-[#EDE5D8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-5 h-5 text-[#443224]" />
                      <div>
                        <span className="font-serif text-sm font-semibold text-[#1C1917] block">
                          Credit / Debit Card (Visa, Mastercard, RuPay, Amex)
                        </span>
                        <span className="text-[10px] text-[#78716C]">No-cost EMI available</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#443224]"
                    />
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="col-span-2">
                        <label className="block text-[#57534E] font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#57534E] font-medium mb-1">Expiry Date</label>
                        <input
                          type="text"
                          defaultValue="08 / 29"
                          className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#57534E] font-medium mb-1">CVV</label>
                        <input
                          type="password"
                          defaultValue="•••"
                          maxLength={4}
                          className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </label>

                {/* NetBanking */}
                <label
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#443224] bg-[#FAF7F2] ring-1 ring-[#443224]'
                      : 'border-[#EDE5D8]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-5 h-5 text-[#443224]" />
                    <div>
                      <span className="font-serif text-sm font-semibold text-[#1C1917] block">
                        Net Banking (HDFC, ICICI, SBI, Axis, Kotak)
                      </span>
                      <span className="text-[10px] text-[#78716C]">Direct portal transfer</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="accent-[#443224]"
                  />
                </label>

                {/* Cash / Check on Delivery */}
                <label
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-[#443224] bg-[#FAF7F2] ring-1 ring-[#443224]'
                      : 'border-[#EDE5D8]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Banknote className="w-5 h-5 text-[#443224]" />
                    <div>
                      <span className="font-serif text-sm font-semibold text-[#1C1917] block">
                        Verified Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] text-[#78716C]">Pay after in-home unboxing &amp; verification</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#443224]"
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & PLACE */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F2ECE1]">
                <CheckCircle2 className="w-5 h-5 text-[#2D3E33]" />
                <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                  Review &amp; Authorize Order
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EDE5D8] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C827A]">
                    Delivering To:
                  </span>
                  <p className="font-semibold text-[#1C1917]">{currentAddress.fullName}</p>
                  <p className="text-[#57534E]">
                    {currentAddress.addressLine1}, {currentAddress.city} — {currentAddress.pincode}
                  </p>
                  <p className="text-[#8C827A]">{currentAddress.phone}</p>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EDE5D8] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C827A]">
                    Logistics &amp; Payment:
                  </span>
                  <p className="font-semibold text-[#1C1917]">White-Glove In-Home Installation</p>
                  <p className="text-[#57534E] capitalize">Method: {paymentMethod.toUpperCase()}</p>
                  <p className="text-[#2D3E33] font-medium">Estimated Arrival: 5-7 Days</p>
                </div>
              </div>

              {/* Items Summary list */}
              <div className="divide-y divide-[#F2ECE1] border-t border-[#F2ECE1]">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#F5F1E8]"
                      />
                      <div>
                        <p className="font-serif font-medium text-[#1C1917]">{item.product.name}</p>
                        <p className="text-[#78716C]">{item.selectedColor} &bull; Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-serif font-semibold text-[#1C1917]">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-6 border-t border-[#F2ECE1] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => (s - 1) as CheckoutStep)}
                className="text-xs font-semibold text-[#57534E] hover:text-[#1C1917] flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <Link href="/cart" className="text-xs font-semibold text-[#57534E] hover:text-[#1C1917]">
                Return to Cart
              </Link>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 px-6 rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="bg-[#B89758] hover:bg-[#C5A059] text-[#1C1917] text-xs font-bold py-4 px-8 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Place Order &bull; {formatINR(totalAmount)}</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#EDE7DC] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#1C1917] pb-3 border-b border-[#F2ECE1]">
            Order Breakdown
          </h3>

          <div className="space-y-2 text-xs text-[#57534E]">
            <div className="flex justify-between">
              <span>Items Total ({cart.length})</span>
              <span className="font-semibold text-[#1C1917]">{formatINR(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>White-Glove In-Home Assembly</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="text-[#2D3E33] font-semibold">COMPLIMENTARY</span>
                ) : (
                  formatINR(deliveryFee)
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>GST (Included)</span>
              <span className="text-[#8C827A]">18%</span>
            </div>
            <div className="pt-3 border-t border-[#E8DFD3] flex justify-between text-base font-serif font-bold text-[#1C1917]">
              <span>Final Total</span>
              <span>{formatINR(totalAmount)}</span>
            </div>
          </div>

          <div className="p-3.5 bg-[#FAF7F2] rounded-xl text-[11px] text-[#78716C] leading-relaxed space-y-1.5 border border-[#EDE5D8]">
            <p className="font-semibold text-[#1C1917] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D3E33]" /> Aura White-Glove Guarantee
            </p>
            <p>
              Your handcrafted furniture arrives on a scheduled date with our private crew. You have 14 days to test comfort in your residence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
