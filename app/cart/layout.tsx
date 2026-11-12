import React from 'react';
import type { Metadata } from 'next';
import { buildNoIndexMetadata } from '@/lib/seo';

export const metadata: Metadata = buildNoIndexMetadata(
  'Shopping Bag',
  'Review your selected architectural furniture pieces at Madhav Furnitures.',
);

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

