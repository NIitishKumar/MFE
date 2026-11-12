import React from 'react';
import type { Metadata } from 'next';
import { buildNoIndexMetadata } from '@/lib/seo';

export const metadata: Metadata = buildNoIndexMetadata(
  'Your Account',
  'Manage your Madhav Furnitures profile, saved addresses, and orders.',
);

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

