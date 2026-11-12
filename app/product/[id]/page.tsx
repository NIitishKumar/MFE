import React from 'react';
import { fetchProductById, fetchRelatedProducts } from '@/services/api';
import { ApiFallbackState } from '@/components/ui/ApiFallbackState';
import { ProductDetailClient } from './ProductDetailClient';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id).catch(() => null);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ApiFallbackState
          title="Product details are currently unavailable"
          description="Unable to load this piece from the catalog API. Ensure the backend service is running or return to the shop."
          allowPageRetry
          actionHref="/shop"
          actionLabel="Browse Shop"
        />
      </div>
    );
  }

  const relatedProducts = await fetchRelatedProducts(product.id, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
