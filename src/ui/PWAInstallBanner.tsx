'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    const isDismissed = sessionStorage.getItem('aura_pwa_dismissed');
    if (isDismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Register service worker if supported
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Service worker registration failed:', err);
      });
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('aura_pwa_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-sm w-full bg-[#2C241E] text-[#FDFBF7] p-4 rounded-2xl shadow-2xl border border-[#443831] animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#443224] flex items-center justify-center shrink-0 border border-[#B89758]/30">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Install Madhav Furnitures App
            </h4>
            <p className="text-xs text-[#BFB3A4] mt-0.5 leading-relaxed">
              Faster showroom appointments, offline catalogue browsing, and instant design concierge.
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-[#8C827A] hover:text-white p-1 rounded-full"
          aria-label="Dismiss app install banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        <button
          type="button"
          onClick={handleInstall}
          className="flex-1 bg-[#D4AF37] hover:bg-[#E5C158] text-[#1C1917] text-xs font-semibold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Add to Home Screen</span>
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-xs text-[#BFB3A4] hover:text-white px-3 py-2 cursor-pointer"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
