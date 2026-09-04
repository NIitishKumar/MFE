'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-4 h-4 text-[#2D3E33] shrink-0" />;
        let border = 'border-[#2D3E33]/30';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-[#BA5D40] shrink-0" />;
          border = 'border-[#BA5D40]/30';
        } else if (toast.type === 'info') {
          icon = <Info className="w-4 h-4 text-[#B89758] shrink-0" />;
          border = 'border-[#B89758]/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 bg-[#FDFBF7] text-[#1C1917] px-4 py-3 rounded-xl border ${border} shadow-lg backdrop-blur-md animate-in slide-in-from-bottom-2 duration-200 text-xs`}
          >
            <div className="flex items-center gap-2.5">
              {icon}
              <span className="font-medium leading-tight">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-[#8C827A] hover:text-[#1C1917] p-1 transition cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
