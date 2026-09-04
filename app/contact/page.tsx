'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, ChevronRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ContactPage() {
  const { addToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message received. An Aura concierge will respond within 4 business hours.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">Contact Concierge</span>
      </nav>

      <div className="max-w-2xl space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
          Client Care &amp; Trade Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal">
          We&apos;re here to assist your vision.
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
          From trade pricing for interior architects to bespoke spatial sizing inquiries, our team is directly reachable via telephone, WhatsApp, or through our concierge form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#EDE7DC] shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EBF3ED] text-[#2D3E33] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Message Delivered
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C] max-w-sm mx-auto">
                Thank you, {name}. Our client services manager will contact you promptly at {email || phone}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="font-serif text-lg font-semibold text-[#1C1917] pb-3 border-b border-[#F2ECE1]">
                Send an Inquiry
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#57534E] font-medium mb-1">Mobile Number (+91)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98450 00000"
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl px-3 py-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-[#57534E] font-medium mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with order status, product customization, or trade inquiries?"
                  className="w-full bg-[#FDFBF7] border border-[#D5C9B8] rounded-xl p-3 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 rounded-xl shadow-sm transition cursor-pointer"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#EDE5D8] space-y-6 text-xs sm:text-sm text-[#57534E]">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              Direct Showroom Lines
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#443224] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1C1917] block">Bengaluru Studio:</strong>
                  <a href="tel:+918049208800" className="hover:underline text-[#443224]">+91 80 4920 8800</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#443224] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1C1917] block">Mumbai Gallery:</strong>
                  <a href="tel:+912268294400" className="hover:underline text-[#443224]">+91 22 6829 4400</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#443224] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1C1917] block">General &amp; Trade Inquiries:</strong>
                  <a href="mailto:concierge@auraliving.in" className="hover:underline text-[#443224]">concierge@auraliving.in</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#443224] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1C1917] block">Concierge Hours:</strong>
                  <p>10:00 AM &ndash; 8:00 PM IST (Daily)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFD3]">
              <Link
                href="/faq"
                className="text-xs font-semibold text-[#443224] hover:underline flex items-center gap-1"
              >
                <span>Have quick questions? Read our Shipping &amp; Warranty FAQ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
