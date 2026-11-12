import React, { Suspense } from 'react';
import { ShopCatalogView } from '@/features/shop';

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-[#78716C]">
          Loading catalogue...
        </div>
      }
    >
      <ShopCatalogView />
    </Suspense>
  );
}
