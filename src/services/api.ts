import { Product, Category, Collection, Room, FilterState, ProductFiltersMeta } from '@/types';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES, ROOMS } from '@/data/categories';
import { COLLECTIONS } from '@/data/collections';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

/**
 * GET /api/v1/products
 * Fetch and filter catalogue with multi-facet queries.
 */
export async function fetchProducts(
  filters?: Partial<FilterState> & { limit?: number; page?: number },
): Promise<{ count: number; total: number; data: Product[] }> {
  try {
    const queryParams = new URLSearchParams();

    if (filters?.search) queryParams.set('search', filters.search);
    if (filters?.category) queryParams.set('category', filters.category);
    if (filters?.room) queryParams.set('room', filters.room);
    if (filters?.collectionSlug) queryParams.set('collectionSlug', filters.collectionSlug);
    if (filters?.minPrice !== undefined)
      queryParams.set('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice !== undefined)
      queryParams.set('maxPrice', filters.maxPrice.toString());
    if (filters?.materials && filters.materials.length > 0) {
      queryParams.set('materials', filters.materials.join(','));
    }
    if (filters?.colors && filters.colors.length > 0) {
      queryParams.set('colors', filters.colors.join(','));
    }
    if (filters?.sizes && filters.sizes.length > 0) {
      queryParams.set('sizes', filters.sizes.join(','));
    }
    if (filters?.availability && filters.availability !== 'all') {
      queryParams.set('availability', filters.availability);
    }
    if (filters?.rating && filters.rating > 0) {
      queryParams.set('rating', filters.rating.toString());
    }
    if (filters?.badge) queryParams.set('badge', filters.badge);
    if (filters?.sortBy) queryParams.set('sortBy', filters.sortBy);
    if (filters?.limit) queryParams.set('limit', filters.limit.toString());
    if (filters?.page) queryParams.set('page', filters.page.toString());

    const url = `${API_BASE_URL}/products?${queryParams.toString()}`;
    const res = await fetch(url, { next: { revalidate: 30 } });

    if (res.ok) {
      const json = await res.json();
      return {
        count: json.count ?? json.data?.length ?? 0,
        total: json.total ?? json.data?.length ?? 0,
        data: json.data || [],
      };
    }
  } catch {
    // Fallback to local filtering if backend is offline
  }

  // Local fallback
  let list = [...PRODUCTS];
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
  }
  if (filters?.category) {
    list = list.filter((p) => p.category.toLowerCase() === filters.category!.toLowerCase());
  }
  if (filters?.room) {
    list = list.filter((p) => p.room.toLowerCase() === filters.room!.toLowerCase());
  }
  if (filters?.collectionSlug) {
    list = list.filter((p) => p.collectionSlug === filters.collectionSlug);
  }
  if (filters?.badge) {
    list = list.filter((p) => p.badges?.includes(filters.badge as any));
  }
  if (filters?.minPrice !== undefined) {
    list = list.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters?.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters?.materials && filters.materials.length > 0) {
    list = list.filter((p) =>
      p.materials.some((m) => filters.materials!.some((fm) => m.toLowerCase().includes(fm.toLowerCase())))
    );
  }
  if (filters?.colors && filters.colors.length > 0) {
    list = list.filter((p) =>
      p.colors.some((c) => filters.colors!.some((fc) => c.name.toLowerCase().includes(fc.toLowerCase())))
    );
  }
  if (filters?.sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (filters?.sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (filters?.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (filters?.sortBy === 'newest') {
    list.sort((a, b) => (b.badges?.includes('New') ? 1 : 0) - (a.badges?.includes('New') ? 1 : 0));
  }

  return {
    count: list.length,
    total: list.length,
    data: list,
  };
}

/**
 * GET /api/v1/products/:id
 * Lookup by Mongo _id, custom ID (e.g. prod-sorrento-boucle-sofa), or slug.
 */
export async function fetchProductById(idOrSlug: string): Promise<Product> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(idOrSlug)}`, {
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // Fallback to local lookup
  }

  const local = PRODUCTS.find(
    (p) =>
      p.id === idOrSlug ||
      p.slug === idOrSlug ||
      p.slug.toLowerCase() === idOrSlug.toLowerCase()
  );
  if (local) return local;

  throw new Error(`Product not found: ${idOrSlug}`);
}

/**
 * GET /api/v1/products/:id/related?limit=4
 */
export async function fetchRelatedProducts(
  idOrSlug: string,
  limit: number = 4,
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products/${encodeURIComponent(idOrSlug)}/related?limit=${limit}`,
      { next: { revalidate: 60 } },
    );

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // Fallback
  }

  const current = PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  return PRODUCTS.filter(
    (p) =>
      p.id !== idOrSlug &&
      p.slug !== idOrSlug &&
      (current ? p.category === current.category || p.room === current.room : true)
  ).slice(0, limit);
}

/**
 * GET /api/v1/products/featured
 * Returns pre-grouped sets for the homepage without multiple queries.
 */
export async function fetchFeaturedProducts(): Promise<{
  newArrivals: Product[];
  bestSellers: Product[];
  topRated: Product[];
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/featured`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // Fallback
  }

  return {
    newArrivals: PRODUCTS.filter((p) => p.badges?.includes('New')).slice(0, 4),
    bestSellers: PRODUCTS.filter((p) => p.badges?.includes('Best Seller')).slice(0, 4),
    topRated: PRODUCTS.filter((p) => p.rating >= 4.8).slice(0, 4),
  };
}

/**
 * GET /api/v1/products/filters
 * Returns dynamic values existing in the database to build filter sidebars.
 */
export async function fetchProductFilters(): Promise<ProductFiltersMeta> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/filters`, {
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // Fallback
  }

  return {
    categories: ['sofas', 'beds', 'dining', 'chairs', 'tables', 'storage', 'decor'],
    rooms: ['living-room', 'bedroom', 'dining-room', 'home-office', 'outdoor'],
    materials: [
      'Italian Textured Wool Bouclé',
      'Kiln-Dried European Beechwood',
      'Solid American Black Walnut',
      'Belgian Flax Linen',
      'Roman Travertine',
      'Hand-Spun New Zealand Wool'
    ],
    colors: [
      'Oatmeal Bouclé',
      'Warm Charcoal',
      'Belgian Natural Flax',
      'Raw Honed Travertine',
      'Natural Walnut'
    ],
    minPrice: 14000,
    maxPrice: 220000,
    totalProducts: PRODUCTS.length,
  };
}

/**
 * GET /api/v1/categories
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) return json.data;
    }
  } catch {
    // Fallback
  }

  return CATEGORIES;
}

/**
 * GET /api/v1/categories/:slug
 */
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/${encodeURIComponent(slug)}`, {
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // Fallback
  }

  return CATEGORIES.find((c) => c.slug === slug || c.id === slug) || null;
}

/**
 * GET /api/v1/collections
 */
export async function fetchCollections(): Promise<Collection[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/collections`, {
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) return json.data;
    }
  } catch {
    // Fallback
  }

  return COLLECTIONS;
}

/**
 * GET /api/v1/collections/:slug
 */
export async function fetchCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/collections/${encodeURIComponent(slug)}`, {
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // Fallback
  }

  return COLLECTIONS.find((c) => c.slug === slug || c.id === slug) || null;
}

/**
 * GET /api/v1/rooms
 */
export async function fetchRooms(): Promise<Room[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/rooms`, {
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) return json.data;
    }
  } catch {
    // Fallback
  }

  return ROOMS;
}

/**
 * POST /api/v1/products
 */
export async function createProduct(payload: Partial<Product>): Promise<{ data: Product; message: string }> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.message || 'Failed to create product');
  }

  return { data: json.data || json, message: json?.message || 'Product created successfully' };
}

/**
 * PATCH /api/v1/products/:id
 */
export async function updateProduct(id: string, payload: Partial<Product>): Promise<{ data: Product; message: string }> {
  const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.message || 'Failed to update product');
  }

  return { data: json.data || json, message: json?.message || 'Product updated successfully' };
}

/**
 * DELETE /api/v1/products/:id
 */
export async function deleteProduct(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.message || 'Failed to delete product');
  }

  return { message: json?.message || 'Product deleted successfully' };
}
