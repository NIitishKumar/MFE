import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ShopCatalogView } from '@/features/shop';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildPageMetadata,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Shop All Handcrafted Luxury Furniture',
  description:
    'Browse all architectural furniture at Madhav Furnitures — sofas, travertine dining tables, solid oak beds, lounge chairs, lighting, and custom storage with White-Glove India delivery.',
  path: '/shop',
  keywords: [
    'buy luxury furniture online India',
    'designer sofa India',
    'solid wood dining table',
    'solid oak beds',
    'modern living room furniture',
    SITE_NAME,
  ],
});

export default function ShopPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Shop All Furniture', path: '/shop' },
          ]),
          buildCollectionPageJsonLd({
            name: 'Madhav Furnitures Full Catalog',
            description:
              'Complete catalog of handcrafted solid wood, natural stone, and upholstered furniture.',
            path: '/shop',
          }),
        ]}
      />
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-[#78716C]">
            Loading catalogue...
          </div>
        }
      >
        <ShopCatalogView />
      </Suspense>
    </>
  );
}
