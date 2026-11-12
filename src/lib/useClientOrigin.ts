'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * SSR-safe origin reader using useSyncExternalStore (prevents hydration mismatch on <a> hrefs).
 */
export function useClientOrigin(): string {
  return useSyncExternalStore(
    emptySubscribe,
    () => window.location.origin,
    () => '',
  );
}

