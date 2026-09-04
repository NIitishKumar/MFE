'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, ChevronRight } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-[#2C241E] text-[#F3EFEA] text-xs py-2.5 px-4 tracking-wide font-medium transition-all z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span>
            Complimentary White-Glove delivery &amp; in-home assembly on orders above ₹50,000
          </span>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-0.5 underline hover:text-[#D4AF37] transition ml-1.5"
          >
            Explore Catalog <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#C4B7AA] hover:text-white p-1 rounded-full hover:bg-white/10 transition ml-2"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
