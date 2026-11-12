import type { MetadataRoute } from 'next';
import {
  fetchCategories,
  fetchCollections,
  fetchProducts,
} from '@/services/api';
import { getSiteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const MAX_SITEMAP_PRODUCT_PAGES = 5;
const PRODUCTS_PER_PAGE = 100;

function toValidDate(dateValue?: string): Date {
  if (!dateValue) return new Date();
  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/collections`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/showroom`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/consultation`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const [categories, collections, firstProductsPage] = await Promise.all([
    fetchCategories().catch(() => []),
    fetchCollections().catch(() => []),
    fetchProducts({ page: 1, limit: PRODUCTS_PER_PAGE }).catch(() => ({
      data: [],
      totalPages: 1,
      page: 1,
      limit: PRODUCTS_PER_PAGE,
      count: 0,
      total: 0,
    })),
  ]);

  const categoryEntries: MetadataRoute.Sitemap = categories
    .filter((cat) => Boolean(cat.slug))
    .map((cat) => ({
      url: `${siteUrl}/category/${encodeURIComponent(cat.slug)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
      ...(cat.image && /^https?:\/\//i.test(cat.image)
        ? { images: [cat.image] }
        : {}),
    }));

  const collectionEntries: MetadataRoute.Sitemap = collections
    .filter((col) => Boolean(col.slug))
    .map((col) => ({
      url: `${siteUrl}/collections/${encodeURIComponent(col.slug)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      ...(col.heroImage && /^https?:\/\//i.test(col.heroImage)
        ? { images: [col.heroImage] }
        : {}),
    }));

  const allProducts = [...(firstProductsPage.data || [])];
  const totalPages = Math.min(
    firstProductsPage.totalPages || 1,
    MAX_SITEMAP_PRODUCT_PAGES,
  );

  if (totalPages > 1) {
    const remainingPages = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        fetchProducts({ page: index + 2, limit: PRODUCTS_PER_PAGE }).catch(
          () => ({ data: [] }),
        ),
      ),
    );
    for (const pageResult of remainingPages) {
      if (Array.isArray(pageResult.data)) {
        allProducts.push(...pageResult.data);
      }
    }
  }

  const seenProductPaths = new Set<string>();
  const productEntries: MetadataRoute.Sitemap = [];

  for (const product of allProducts) {
    const identifier = (product.slug || product.id || '').trim();
    if (!identifier || seenProductPaths.has(identifier)) continue;
    seenProductPaths.add(identifier);

    const validImages = (product.images || []).filter((img) =>
      /^https?:\/\//i.test(img),
    );

    productEntries.push({
      url: `${siteUrl}/product/${encodeURIComponent(identifier)}`,
      lastModified: toValidDate(product.updatedAt || product.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
      ...(validImages.length > 0 ? { images: validImages.slice(0, 5) } : {}),
    });
  }

  return [
    ...staticRoutes,
    ...categoryEntries,
    ...collectionEntries,
    ...productEntries,
  ];
}

