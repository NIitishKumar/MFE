'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WifiOff, RefreshCw, ArrowRight } from 'lucide-react';

interface ApiFallbackStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
  retryLabel?: string;
  allowPageRetry?: boolean;
  isRetrying?: boolean;
  actionHref?: string;
  actionLabel?: string;
  compact?: boolean;
}

/**
 * Shared graceful Fallback UI displayed across storefront sections and routes
 * whenever live backend API data is unavailable or empty.
 */
export const ApiFallbackState: React.FC<ApiFallbackStateProps> = ({
  title,
  description,
  onRetry,
  retryLabel = 'Retry Connection',
  allowPageRetry = false,
  isRetrying = false,
  actionHref,
  actionLabel,
  compact = false,
}) => {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else if (allowPageRetry) {
      router.refresh();
    }
  };

  const canRetry = Boolean(onRetry || allowPageRetry);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-2xl border border-[#EDE7DC] bg-[#FAF7F2] text-center flex flex-col items-center justify-center space-y-3 ${
        compact ? 'p-6 sm:p-8' : 'p-10 sm:p-12'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-[#EFE8DC] flex items-center justify-center text-[#594433]">
        <WifiOff className="w-5 h-5" />
      </div>

      <div className="space-y-1 max-w-md">
        <p className="font-serif text-lg sm:text-xl text-[#1C1917] font-medium">
          {title}
        </p>
        <p className="text-xs text-[#78716C] leading-relaxed">{description}</p>
      </div>

      {(canRetry || (actionHref && actionLabel)) && (
        <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
          {canRetry && (
            <button
              type="button"
              onClick={handleRetry}
              disabled={isRetrying}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2C241E] text-white text-xs font-semibold hover:bg-[#1C1917] disabled:opacity-60 transition cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`}
              />
              <span>{retryLabel}</span>
            </button>
          )}

          {actionHref && actionLabel && (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D5C9B8] bg-white text-[#2C241E] text-xs font-semibold hover:bg-[#F5F0E6] transition"
            >
              <span>{actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

