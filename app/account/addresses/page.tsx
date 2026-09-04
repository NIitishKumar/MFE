'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Trash2, Check, ChevronRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Address } from '@/types';

export default function AddressesPage() {
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState<Omit<Address, 'id'>>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    landmark: '',
    isDefault: false,
    type: 'home'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.addressLine1 || !form.pincode) return;
    addAddress(form);
    setIsAdding(false);
    setForm({
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: 'Karnataka',
      pincode: '',
      landmark: '',
      isDefault: false,
      type: 'home'
    });
  };

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
        <span className="text-[#1C1917] font-semibold">Saved Addresses</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD3]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
            Delivery Destinations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
            Saved Addresses ({addresses.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3 px-5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Add New Address'}</span>
        </button>
      </div>

      {/* Add Address Form Modal/Box */}
      {isAdding && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#443224] shadow-md animate-in slide-in-from-top-4 duration-300">
          <h3 className="font-serif text-xl font-semibold text-[#1C1917] mb-4">
            Add Delivery Destination
          </h3>
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#57534E] font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[#57534E] font-medium mb-1">Mobile (+91) *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98450 00000"
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#57534E] font-medium mb-1">Flat / House / Building *</label>
                <input
                  type="text"
                  required
                  value={form.addressLine1}
                  onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[#57534E] font-medium mb-1">Street / Colony</label>
                <input
                  type="text"
                  value={form.addressLine2}
                  onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#57534E] font-medium mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[#57534E] font-medium mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[#57534E] font-medium mb-1">PIN Code (6 Digits) *</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="bg-[#2C241E] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1C1917] transition cursor-pointer"
              >
                Save Destination
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-[#57534E] py-3 px-4 rounded-xl hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white rounded-3xl p-6 border transition flex flex-col justify-between space-y-4 shadow-xs ${
              addr.isDefault ? 'border-[#443224] ring-1 ring-[#443224]' : 'border-[#EDE7DC]'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#1C1917]">
                  {addr.fullName}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F5F0E6] text-[#443224] font-semibold">
                  {addr.type}
                </span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                {addr.addressLine1}
                {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                <br />
                {addr.city}, {addr.state} &mdash; <strong>{addr.pincode}</strong>
              </p>
              <p className="text-xs text-[#8C827A] pt-1">Phone: {addr.phone}</p>
            </div>

            <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
              {addr.isDefault ? (
                <span className="text-[#2D3E33] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Default Address
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setDefaultAddress(addr.id)}
                  className="text-[#443224] font-medium hover:underline cursor-pointer"
                >
                  Set as Default
                </button>
              )}

              <button
                type="button"
                onClick={() => deleteAddress(addr.id)}
                className="text-[#BA5D40] hover:text-[#8D341E] p-1 cursor-pointer"
                aria-label="Delete address"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
