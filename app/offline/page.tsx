'use client';

import React from 'react';
import Link from 'next/link';
import { WifiOff, RotateCcw, Compass, PhoneCall } from 'lucide-react';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 sm:py-32 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-[#F5F0E6] text-[#8C827A] mx-auto flex items-center justify-center border border-[#E8DFD3]">
        <WifiOff className="w-10 h-10 text-[#BA5D40]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-[#BA5D40] font-bold">
          Connection Interrupted
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
          You&apos;re offline.
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed max-w-md mx-auto">
          Some live inventory and booking services may be unavailable, but you can still browse previously loaded pieces and your saved wishlist.
        </p>
      </div>

      <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleRetry}
          className="w-full sm:w-auto bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/wishlist"
          className="w-full sm:w-auto border border-[#D5C9B8] text-[#443224] text-xs font-semibold py-3.5 px-6 rounded-xl hover:bg-white transition flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>View Saved Wishlist</span>
        </Link>
      </div>

      <div className="pt-8 border-t border-[#E8DFD3] text-xs text-[#8C827A] flex items-center justify-center gap-2">
        <PhoneCall className="w-3.5 h-3.5 text-[#443224]" />
        <span>For telephone orders: call <a href="tel:+917500931934" className="text-[#443224] underline">+91 75 0093 1934</a></span>
      </div>
    </div>
  );
}
