import React from 'react';
import type { Metadata } from 'next';
import { FAQS } from '@/data/showroom';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildPageMetadata,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Frequently Asked Questions — Delivery, Warranty & Customization',
  description:
    'Find answers about Madhav Furnitures White-Glove pan-India delivery, bespoke timber and stone customization, 10–15 year structural warranties, and showroom visits.',
  path: '/faq',
  keywords: [
    'Madhav Furnitures FAQ',
    'white glove furniture delivery India',
    'solid wood furniture warranty',
    'custom furniture sizing India',
    SITE_NAME,
  ],
});

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'FAQs', path: '/faq' },
          ]),
          buildFaqJsonLd(FAQS),
        ]}
      />
      {children}
    </>
  );
}

