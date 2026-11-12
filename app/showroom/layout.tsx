import React from 'react';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Showrooms in Bengaluru & Mumbai',
  description:
    'Visit Madhav Furnitures flagship showrooms in Indiranagar (Bengaluru) and Worli (Mumbai). Experience solid timber grains, stone libraries, and private architectural walkthroughs.',
  path: '/showroom',
  keywords: [
    'Madhav Furnitures Bengaluru showroom',
    'Indiranagar furniture showroom',
    'Worli Mumbai furniture gallery',
    'luxury furniture showroom near me',
    SITE_NAME,
  ],
});

export default function ShowroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Showrooms', path: '/showroom' },
        ])}
      />
      {children}
    </>
  );
}

