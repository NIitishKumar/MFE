import {
  Product,
  Category,
  Collection,
  Room,
  FilterState,
  ProductFiltersMeta,
  FetchProductsResponse,
  ProductColor,
  ProductBadge,
  ProductDimensions,
} from '@/types';
import { NEXT_PUBLIC_API_BASE_URL } from '@/config/api.config';

function getRequestOptions(): RequestInit {
  return {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  };
}

function normalizeApiProduct(raw: Record<string, unknown>): Product {
  const id = String(raw.id ?? raw._id ?? raw.slug ?? '');
  const slug = String(raw.slug ?? raw.id ?? '');
  const rawDimensions = (raw.dimensions as Record<string, unknown> | undefined) || {};
  const dimensions: ProductDimensions = {
    width: String(rawDimensions.width ?? ''),
    depth: String(rawDimensions.depth ?? ''),
    height: String(rawDimensions.height ?? ''),
    seatHeight: rawDimensions.seatHeight ? String(rawDimensions.seatHeight) : undefined,
    weight: rawDimensions.weight ? String(rawDimensions.weight) : undefined,
  };

  const images = Array.isArray(raw.images)
    ? raw.images.map(String)
    : raw.imageUrl || raw.image
      ? [String(raw.imageUrl ?? raw.image)]
      : [];

  return {
    id,
    name: String(raw.name ?? ''),
    slug,
    category: String(raw.category ?? ''),
    categoryLabel: raw.categoryLabel ? String(raw.categoryLabel) : String(raw.category ?? ''),
    room: String(raw.room ?? ''),
    roomLabel: raw.roomLabel ? String(raw.roomLabel) : String(raw.room ?? ''),
    price: Number(raw.price ?? 0),
    originalPrice: raw.originalPrice !== undefined ? Number(raw.originalPrice) : undefined,
    discountPercentage:
      raw.discountPercentage !== undefined ? Number(raw.discountPercentage) : undefined,
    rating: Number(raw.rating ?? 0),
    reviewCount: Number(raw.reviewCount ?? 0),
    shortDescription: String(raw.shortDescription ?? ''),
    fullDescription: String(raw.fullDescription ?? raw.shortDescription ?? ''),
    materials: Array.isArray(raw.materials) ? raw.materials.map(String) : [],
    dimensions,
    colors: Array.isArray(raw.colors) ? (raw.colors as ProductColor[]) : [],
    sizes: Array.isArray(raw.sizes) ? raw.sizes.map(String) : [],
    badges: Array.isArray(raw.badges) ? (raw.badges as ProductBadge[]) : [],
    inStock: typeof raw.inStock === 'boolean' ? raw.inStock : true,
    images,
    lifestyleImages: Array.isArray(raw.lifestyleImages)
      ? raw.lifestyleImages.map(String)
      : [],
    careInstructions: raw.careInstructions ? String(raw.careInstructions) : undefined,
    warranty: raw.warranty ? String(raw.warranty) : undefined,
    leadTime: raw.leadTime ? String(raw.leadTime) : undefined,
    collectionSlug: raw.collectionSlug ? String(raw.collectionSlug) : undefined,
    collectionName: raw.collectionName ? String(raw.collectionName) : undefined,
    createdAt: raw.createdAt ? String(raw.createdAt) : undefined,
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : undefined,
  };
}

/**
 * Serializes product catalogue filter & pagination state into API query parameters.
 */
export function buildProductsQueryParams(
  filters?: Partial<FilterState> & { limit?: number; page?: number },
): URLSearchParams {
  const queryParams = new URLSearchParams();

  if (filters?.category) queryParams.set('category', filters.category);
  if (filters?.room) queryParams.set('room', filters.room);
  if (filters?.minPrice !== undefined && filters.minPrice > 0) {
    queryParams.set('minPrice', filters.minPrice.toString());
  }
  if (filters?.maxPrice !== undefined && filters.maxPrice > 0) {
    queryParams.set('maxPrice', filters.maxPrice.toString());
  }
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
  if (filters?.rating !== undefined && filters.rating > 0) {
    queryParams.set('rating', filters.rating.toString());
  }
  if (filters?.badge) queryParams.set('badge', filters.badge);
  if (filters?.collectionSlug) queryParams.set('collectionSlug', filters.collectionSlug);
  if (filters?.search?.trim()) queryParams.set('search', filters.search.trim());
  if (filters?.sortBy) queryParams.set('sortBy', filters.sortBy);
  if (filters?.page !== undefined && filters.page > 0) {
    queryParams.set('page', filters.page.toString());
  }
  if (filters?.limit !== undefined && filters.limit > 0) {
    queryParams.set('limit', filters.limit.toString());
  }

  return queryParams;
}

async function requestProductsEndpoint(
  endpointPath: string,
  filters?: Partial<FilterState> & { limit?: number; page?: number },
): Promise<FetchProductsResponse> {
  const fallbackLimit = filters?.limit ?? 12;
  const fallbackPage = filters?.page ?? 1;

  try {
    const queryParams = buildProductsQueryParams(filters);
    const qs = queryParams.toString();
    const url = qs
      ? `${NEXT_PUBLIC_API_BASE_URL}${endpointPath}?${qs}`
      : `${NEXT_PUBLIC_API_BASE_URL}${endpointPath}`;
    const res = await fetch(url, getRequestOptions());

    if (res.ok) {
      const json = await res.json();
      const rawList = Array.isArray(json)
        ? json
        : Array.isArray(json?.data)
          ? json.data
          : [];
      const data = rawList.map((item: Record<string, unknown>) =>
        normalizeApiProduct(item),
      );
      const count = Number(json?.count ?? data.length);
      const total = Number(json?.total ?? data.length);
      const page = Number(json?.page ?? fallbackPage);
      const limit = Number(json?.limit ?? (data.length || fallbackLimit));
      const totalPages = Number(
        json?.totalPages ?? Math.max(1, Math.ceil(total / Math.max(1, limit))),
      );

      return { count, total, page, limit, totalPages, data };
    }
  } catch {
    // API unreachable
  }

  return {
    count: 0,
    total: 0,
    page: fallbackPage,
    limit: fallbackLimit,
    totalPages: 1,
    data: [],
  };
}

/**
 * GET /api/v1/products
 * Fetch and filter catalogue with multi-facet queries exclusively from the API.
 */
export async function fetchProducts(
  filters?: Partial<FilterState> & { limit?: number; page?: number },
): Promise<FetchProductsResponse> {
  return requestProductsEndpoint('/products', filters);
}

/**
 * GET /api/v1/products/new-arrivals
 * Fetch new arrival products with optional filtering, sorting, and pagination.
 */
export async function fetchNewArrivalProducts(
  filters?: Partial<FilterState> & { limit?: number; page?: number },
): Promise<FetchProductsResponse> {
  return requestProductsEndpoint('/products/new-arrivals', filters);
}

/**
 * GET /api/v1/products/best-sellers
 * Fetch best seller products with optional filtering, sorting, and pagination.
 */
export async function fetchBestSellerProducts(
  filters?: Partial<FilterState> & { limit?: number; page?: number },
): Promise<FetchProductsResponse> {
  return requestProductsEndpoint('/products/best-sellers', filters);
}

/**
 * GET /api/v1/products/:id
 * Lookup by Mongo _id, custom ID (e.g. prod-sorrento-boucle-sofa), or slug.
 */
export async function fetchProductById(idOrSlug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/products/${encodeURIComponent(idOrSlug)}`,
      getRequestOptions(),
    );

    if (res.ok) {
      const json = await res.json();
      const raw = json?.data ?? json;
      if (raw && (raw.id || raw._id || raw.slug || raw.name)) {
        return normalizeApiProduct(raw as Record<string, unknown>);
      }
    }
  } catch {
    // API unreachable
  }

  return null;
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
      `${NEXT_PUBLIC_API_BASE_URL}/products/${encodeURIComponent(idOrSlug)}/related?limit=${limit}`,
      getRequestOptions(),
    );

    if (res.ok) {
      const json = await res.json();
      const rawList = Array.isArray(json) ? json : json?.data;
      if (Array.isArray(rawList)) {
        return rawList.map((item: Record<string, unknown>) =>
          normalizeApiProduct(item),
        );
      }
    }
  } catch {
    // API unreachable
  }

  return [];
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
    const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/products/featured`, getRequestOptions());

    if (res.ok) {
      const json = await res.json();
      const payload = json?.data;
      if (payload) {
        return {
          newArrivals: Array.isArray(payload.newArrivals)
            ? payload.newArrivals.map((item: Record<string, unknown>) =>
              normalizeApiProduct(item),
            )
            : [],
          bestSellers: Array.isArray(payload.bestSellers)
            ? payload.bestSellers.map((item: Record<string, unknown>) =>
              normalizeApiProduct(item),
            )
            : [],
          topRated: Array.isArray(payload.topRated)
            ? payload.topRated.map((item: Record<string, unknown>) =>
              normalizeApiProduct(item),
            )
            : [],
        };
      }
    }
  } catch {
    // API unreachable
  }

  return {
    newArrivals: [],
    bestSellers: [],
    topRated: [],
  };
}

/**
 * GET /api/v1/products/filters
 * Returns dynamic values existing in the database to build filter sidebars.
 */
export async function fetchProductFilters(): Promise<ProductFiltersMeta> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/products/filters`, getRequestOptions());

    if (res.ok) {
      const json = await res.json();
      if (json?.data) return json.data;
    }
  } catch {
    // API unreachable
  }

  return {
    categories: [],
    rooms: [],
    materials: [],
    colors: [],
    sizes: [],
    badges: [],
    minPrice: 0,
    maxPrice: 250000,
    totalProducts: 0,
  };
}

function normalizeApiCategory(raw: Record<string, unknown>): Category {
  const id = String(raw.id ?? raw._id ?? raw.slug ?? '');
  const slug = String(raw.slug ?? raw.categoryId ?? raw.id ?? '');
  return {
    id,
    name: String(raw.name ?? raw.title ?? ''),
    slug,
    description: String(raw.description ?? ''),
    image: String(raw.image ?? raw.imageUrl ?? raw.image_url ?? raw.bannerImageUrl ?? ''),
    itemCount: Number(raw.itemCount ?? 0),
    room: String(raw.room ?? ''),
  };
}

/**
 * GET /api/v1/categories
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/categories`,
      getRequestOptions(),
    );

    if (res.ok) {
      const json = await res.json();
      const rawList = Array.isArray(json) ? json : json?.data;
      if (Array.isArray(rawList)) {
        return rawList.map(normalizeApiCategory);
      }
    }
  } catch {
    // API unreachable
  }

  return [];
}

/**
 * GET /api/v1/categories/:slug
 */
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/categories/${encodeURIComponent(slug)}`,
      getRequestOptions(),
    );

    if (res.ok) {
      const json = await res.json();
      const raw = json?.data ?? json;
      if (raw && (raw.slug || raw.id || raw.name || raw.title)) {
        return normalizeApiCategory(raw);
      }
    }
  } catch {
    // API unreachable
  }

  return null;
}

/**
 * GET /api/v1/collections
 */
export async function fetchCollections(): Promise<Collection[]> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/collections`, getRequestOptions());

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) return json.data;
    }
  } catch {
    // API unreachable
  }

  return [];
}

/**
 * GET /api/v1/collections/:slug
 */
export async function fetchCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/collections/${encodeURIComponent(slug)}`,
      getRequestOptions(),
    );

    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // API unreachable
  }

  return null;
}

/**
 * GET /api/v1/rooms
 */
export async function fetchRooms(): Promise<Room[]> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/rooms`, getRequestOptions());

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) return json.data;
    }
  } catch {
    // API unreachable
  }

  return [];
}

/**
 * POST /api/v1/products
 */
export async function createProduct(payload: Partial<Product>): Promise<{ data: Product; message: string }> {
  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/products`, {
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
  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/products/${encodeURIComponent(id)}`, {
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
  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/products/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.message || 'Failed to delete product');
  }

  return { message: json?.message || 'Product deleted successfully' };
}

export interface UploadedImageResponse {
  url: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  originalName: string;
}

export interface UploadImageOptions {
  folder?: string;
  publicId?: string;
}

/**
 * POST /api/v1/upload/image
 */
export async function uploadImage(
  file: File,
  folderOrOptions?: string | UploadImageOptions,
): Promise<UploadedImageResponse> {
  const options: UploadImageOptions =
    typeof folderOrOptions === 'string'
      ? { folder: folderOrOptions }
      : folderOrOptions ?? {};

  const formData = new FormData();
  formData.append('file', file);
  if (options.folder?.trim()) formData.append('folder', options.folder.trim());
  if (options.publicId?.trim()) {
    formData.append('publicId', options.publicId.trim());
  }

  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/upload/image`, {
    method: 'POST',
    body: formData,
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const rawMsg = json?.message;
    const errMsg = Array.isArray(rawMsg)
      ? rawMsg.join(', ')
      : rawMsg || 'Failed to upload image';
    throw new Error(errMsg);
  }

  return json.data;
}

/**
 * POST /api/v1/upload/images
 */
export async function uploadImages(
  files: File[],
  folder?: string,
): Promise<UploadedImageResponse[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  if (folder) formData.append('folder', folder);

  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/upload/images`, {
    method: 'POST',
    body: formData,
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.message || 'Failed to upload images');
  }

  return json.data;
}

/**
 * DELETE /api/v1/upload/image?publicId=...
 */
export async function deleteUploadedImage(publicId: string): Promise<{ publicId: string; result: string }> {
  const res = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/upload/image?publicId=${encodeURIComponent(publicId)}`,
    { method: 'DELETE' },
  );

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.message || 'Failed to delete image');
  }

  return json.data;
}
