import React from 'react';
import type { Metadata } from 'next';
import { buildNoIndexMetadata } from '@/lib/seo';

export const metadata: Metadata = buildNoIndexMetadata(
  'Sign In',
  'Sign in to your Madhav Furnitures residence portal.',
);

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

