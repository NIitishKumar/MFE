import React from 'react';
import type { Metadata } from 'next';
import { buildNoIndexMetadata } from '@/lib/seo';

export const metadata: Metadata = buildNoIndexMetadata(
  'Search Furniture Catalog',
  'Search handcrafted sofas, travertine dining tables, solid oak beds, and architectural decor at Madhav Furnitures.',
  true,
);

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

