'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, CheckCircle2, ChevronRight, Compass, ShieldCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ConsultationPage() {
  const { addToast } = useStore();

  const [name, setName] = useState('Aditya Sharma');
  const [email, setEmail] = useState('aditya.sharma@example.in');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [preferredDate, setPreferredDate] = useState('2026-09-12');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [roomType, setRoomType] = useState('Living Room & Dining Space');
  const [approximateBudget, setApproximateBudget] = useState('₹5 Lakhs – ₹10 Lakhs');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `AURA-DSGN-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceCode(ref);
    setSubmitted(true);
    addToast('Design Consultation requested. A senior architect will reach out within 24 hours.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">Interior Consultation</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-2xl space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Spatial Design Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1C1917] leading-tight">
          Let&apos;s design your space together.
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
          Whether outfitting a new penthouse in Bengaluru or redesigning a coastal apartment in Worli, our senior interior architects provide 1:1 floor plan spatial layout modeling, bespoke upholstery pairing, and stone selection.
        </p>
      </div>

      {/* Main Grid: Form + Process Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#EDE7DC] shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-5 animate-in zoom-in">
              <div className="w-20 h-20 rounded-full bg-[#EBF3ED] text-[#2D3E33] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#2D3E33] font-bold">
                  Reference: {referenceCode}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                  Consultation Request Received
                </h2>
                <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Our senior design specialist has reserved your slot for{' '}
                  <strong>{preferredDate}</strong> at <strong>{preferredTime}</strong>. We will share moodboards and timber swatches directly with you.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/shop"
                  className="bg-[#2C241E] text-white text-xs font-semibold py-3.5 px-6 rounded-xl"
                >
                  Explore Catalog
                </Link>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#443224] hover:underline"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="border-b border-[#F2ECE1] pb-4">
                <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                  Consultation Request Form
                </h3>
                <p className="text-[#8C827A] mt-0.5">Complimentary 60-minute session with 3D CAD modeling support.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Mobile (+91) *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Preferred Time *</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                  >
                    <option value="11:00 AM">11:00 AM (Morning)</option>
                    <option value="02:30 PM">02:30 PM (Afternoon)</option>
                    <option value="05:30 PM">05:30 PM (Evening)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Room / Scope *</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                  >
                    <option value="Living Room & Dining Space">Living Room &amp; Dining Space</option>
                    <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                    <option value="Entire Apartment / Penthouse">Entire Apartment / Penthouse</option>
                    <option value="Villa / Independent Residence">Villa / Independent Residence</option>
                    <option value="Executive Home Office">Executive Home Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Approximate Budget *</label>
                  <select
                    value={approximateBudget}
                    onChange={(e) => setApproximateBudget(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                  >
                    <option value="₹2 Lakhs – ₹5 Lakhs">₹2 Lakhs &ndash; ₹5 Lakhs</option>
                    <option value="₹5 Lakhs – ₹10 Lakhs">₹5 Lakhs &ndash; ₹10 Lakhs</option>
                    <option value="₹10 Lakhs – ₹25 Lakhs">₹10 Lakhs &ndash; ₹25 Lakhs</option>
                    <option value="₹25 Lakhs+ (Full Home Custom)">₹25 Lakhs+ (Full Home Custom)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#57534E] font-medium mb-1">
                  Tell us about your home (Architectural style, color tones, floor plan notes)
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Modern minimalist 4BHK in Whitefield with double-height ceiling. Looking for curved bouclé seating and an 8-seater stone dining table."
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl p-3 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-4 rounded-xl shadow-md transition cursor-pointer"
              >
                Request 1:1 Interior Consultation
              </button>
            </form>
          )}
        </div>

        {/* Process & Benefits (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#EDE5D8] space-y-6">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              What to Expect
            </h3>

            <div className="space-y-4 text-xs text-[#57534E] leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#443224] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-[#1C1917] block">Spatial Discovery:</strong>
                  <span>We review your architectural blueprints and lighting orientations.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#443224] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-[#1C1917] block">Tactile Curation:</strong>
                  <span>We send physical sample boxes containing Roman travertine slabs, white oak samples, and Italian wool bouclé swatches directly to your doorstep.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#443224] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-[#1C1917] block">3D Vignette Rendering:</strong>
                  <span>See realistic 1:1 scale mockups of your room before confirming the order.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#241E1A] text-white space-y-3">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">Architect Guarantee</span>
            </div>
            <p className="text-xs text-[#BFB3A4] leading-relaxed font-light">
              No pushy sales pitches. Our interior consultants are practicing spatial designers focused on ergonomics, proportion, and generational longevity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
