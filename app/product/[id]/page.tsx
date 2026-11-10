import React from 'react';
import { notFound } from 'next/navigation';
import { fetchProductById, fetchRelatedProducts } from '@/services/api';
import { ProductDetailClient } from './ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id).catch(() => null);

  if (!product) {
    notFound();
  }

  const relatedProducts = await fetchRelatedProducts(product.id, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
