import React from 'react';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Interior Design Consultation — Bespoke Spatial Studio',
  description:
    'Book a 1:1 interior design consultation with Madhav Furnitures senior architects. Floor plan layout modeling, bespoke upholstery pairing, and custom wood & marble finishes.',
  path: '/consultation',
  keywords: [
    'interior design consultation India',
    'bespoke furniture customization',
    'luxury home styling consultation',
    'custom solid wood furniture India',
    SITE_NAME,
  ],
});

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Interior Consultation', path: '/consultation' },
        ])}
      />
      {children}
    </>
  );
}

