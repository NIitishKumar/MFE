import React from 'react';
import type { Metadata } from 'next';
import { buildNoIndexMetadata } from '@/lib/seo';

export const metadata: Metadata = buildNoIndexMetadata(
  'Offline',
  'You appear to be offline. Reconnect to browse the Madhav Furnitures catalog.',
);

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

