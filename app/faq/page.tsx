'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
import { FAQS } from '@/data/showroom';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">Client Help &amp; FAQs</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B89758]" /> Client Services &amp; Guidance
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C]">
          Everything you need to know about our White-Glove delivery, custom joinery, stone sealants, and warranty coverage.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#EDE7DC] overflow-hidden transition shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] transition"
              >
                <h3 className="font-serif text-base sm:text-lg font-medium text-[#1C1917]">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-[#8C827A] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#443224]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-[#F5EFE6] pt-4 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Box */}
      <div className="p-8 rounded-3xl bg-[#F5F0E6] border border-[#E8DFD3] text-center space-y-3">
        <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
          Have a specific spatial question?
        </h3>
        <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto">
          Our design concierge is happy to review your floor plans or send stone samples directly to your doorstep.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/consultation"
            className="bg-[#2C241E] text-white text-xs font-semibold py-3 px-6 rounded-xl hover:bg-[#1C1917] transition"
          >
            Book Free Consultation
          </Link>
          <Link
            href="/contact"
            className="border border-[#D5C9B8] text-[#443224] text-xs font-semibold py-3 px-6 rounded-xl hover:bg-white transition"
          >
            Contact Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
