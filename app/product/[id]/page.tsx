import React, { cache } from 'react';
import type { Metadata } from 'next';
import { fetchProductById, fetchRelatedProducts } from '@/services/api';
import { ApiFallbackState } from '@/components/ui/ApiFallbackState';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildNoIndexMetadata,
  buildPageMetadata,
  buildProductJsonLd,
} from '@/lib/seo';
import { ProductDetailClient } from './ProductDetailClient';

export const dynamic = 'force-dynamic';

const getCachedProduct = cache(async (id: string) =>
  fetchProductById(id).catch(() => null),
);

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getCachedProduct(id);

  if (!product) {
    return buildNoIndexMetadata(
      'Product Unavailable',
      'This product could not be found in the Madhav Furnitures catalog.',
      true,
    );
  }

  const categoryName = product.categoryLabel || product.category || 'Furniture';
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const materialsText =
    product.materials && product.materials.length > 0
      ? ` Crafted in ${product.materials.slice(0, 3).join(', ')}.`
      : '';
  const descriptionSource =
    product.shortDescription || product.fullDescription || '';
  const description = `${descriptionSource}${materialsText} Priced at ${formattedPrice} with White-Glove delivery across India.`.trim();

  const images =
    product.images && product.images.length > 0
      ? product.images.slice(0, 4).map((url) => ({
          url,
          width: 1200,
          height: 900,
          alt: `${product.name} — ${categoryName} by ${SITE_NAME}`,
        }))
      : [
          {
            url: DEFAULT_OG_IMAGE_PATH,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ];

  return buildPageMetadata({
    title: `${product.name} — ${categoryName}`,
    description,
    path: `/product/${product.slug || product.id}`,
    keywords: [
      product.name,
      categoryName,
      product.roomLabel || product.room || '',
      ...(product.materials || []),
      ...(product.collectionName ? [product.collectionName] : []),
      `${product.name} India`,
      `buy ${categoryName} India`,
      SITE_NAME,
    ].filter(Boolean),
    images,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getCachedProduct(id);

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
  const categoryName = product.categoryLabel || product.category || 'Furniture';
  const productPath = `/product/${product.slug || product.id}`;

  return (
    <>
      <JsonLd
        data={[
          buildProductJsonLd(product),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            ...(product.category
              ? [{ name: categoryName, path: `/category/${product.category}` }]
              : []),
            { name: product.name, path: productPath },
          ]),
        ]}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
