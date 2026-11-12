import React from 'react';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  PHONE_DISPLAY,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Concierge & Trade Desk',
  description: `Reach Madhav Furnitures client care & trade concierge via WhatsApp, phone (${PHONE_DISPLAY}), or our Bengaluru and Mumbai showroom inquiry desk.`,
  path: '/contact',
  keywords: [
    'contact Madhav Furnitures',
    'furniture trade pricing India',
    'interior architect concierge',
    SITE_NAME,
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      {children}
    </>
  );
}

