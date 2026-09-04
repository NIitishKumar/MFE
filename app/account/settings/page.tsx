'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Phone, Mail, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AccountSettingsPage() {
  const { user, updateProfile } = useStore();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, email });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
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
        <span className="text-[#1C1917] font-semibold">Settings</span>
      </nav>

      <div className="pb-6 border-b border-[#E8DFD3]">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
          Preferences &amp; Contact
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
          Account Settings
        </h1>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EDE7DC] shadow-xs space-y-8">
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          <h2 className="font-serif text-lg font-semibold text-[#1C1917] pb-2 border-b border-[#F2ECE1]">
            Personal Profile Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#57534E] font-medium mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#57534E] font-medium mb-1">Mobile (+91)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[#57534E] font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1917]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F2ECE1] space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">
              White-Glove Logistics Notifications
            </h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-[#57534E]">
                <input
                  type="checkbox"
                  checked={notifyWhatsApp}
                  onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                  className="accent-[#443224] rounded-sm"
                />
                <span>WhatsApp alerts for dispatch window coordination &amp; gate pass entries</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-[#57534E]">
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="accent-[#443224] rounded-sm"
                />
                <span>Email order invoices and annual timber maintenance reminders</span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-[#2C241E] hover:bg-[#1C1917] text-white font-semibold py-3.5 px-8 rounded-xl transition cursor-pointer shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
