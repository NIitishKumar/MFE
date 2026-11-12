import React from 'react';
import type { Metadata } from 'next';
import { buildNoIndexMetadata } from '@/lib/seo';

export const metadata: Metadata = buildNoIndexMetadata(
  'Saved Wishlist',
  'View your saved luxury furniture pieces and send quick inquiries on WhatsApp.',
);

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

