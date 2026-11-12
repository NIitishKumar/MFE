import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '../types/product.types';
import { API_BASE_URL } from '@/config/api.config';
import { buildProductsQueryParams } from '@/services/api';
import { FilterState } from '@/types';

function normalizeProduct(raw: Record<string, unknown>): Product {
  const id = String(
    raw.id ?? raw.productId ?? raw.uniqueId ?? raw._id ?? `prod-${Date.now()}`,
  );
  const price = Number(raw.price ?? raw.basePrice ?? 0);
  const images = Array.isArray(raw.images)
    ? raw.images.map(String)
    : raw.imageUrl || raw.image
    ? [String(raw.imageUrl ?? raw.image)]
    : [];
  const primaryImg = String(raw.imageUrl ?? images[0] ?? raw.image ?? '');
  const rawName = String(raw.name ?? '');
  const slug = String(
    raw.slug ??
      (rawName
        ? rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        : `prod-${Date.now()}`),
  );

  return {
    id,
    productId: id,
    uniqueId: id,
    name: rawName,
    slug,
    category: String(raw.category ?? ''),
    categoryLabel: String(raw.categoryLabel ?? raw.category ?? ''),
    room: String(raw.room ?? ''),
    roomLabel: String(raw.roomLabel ?? raw.room ?? ''),
    collectionSlug: raw.collectionSlug ? String(raw.collectionSlug) : '',
    collectionName: raw.collectionName ? String(raw.collectionName) : '',
    price,
    basePrice: price,
    originalPrice:
      raw.originalPrice !== undefined ? Number(raw.originalPrice) : undefined,
    discountPercentage:
      raw.discountPercentage !== undefined
        ? Number(raw.discountPercentage)
        : undefined,
    rating: Number(raw.rating ?? 5),
    reviewCount: Number(raw.reviewCount ?? 0),
    shortDescription: String(raw.shortDescription ?? raw.short_description ?? ''),
    fullDescription: String(raw.fullDescription ?? raw.description ?? ''),
    materials: Array.isArray(raw.materials) ? raw.materials.map(String) : [],
    dimensions: (raw.dimensions as Product['dimensions']) || {
      width: '',
      depth: '',
      height: '',
    },
    colors: Array.isArray(raw.colors) ? (raw.colors as Product['colors']) : [],
    sizes: Array.isArray(raw.sizes) ? raw.sizes.map(String) : [],
    badges: Array.isArray(raw.badges) ? (raw.badges as Product['badges']) : [],
    inStock: typeof raw.inStock === 'boolean' ? raw.inStock : true,
    imageUrl: primaryImg,
    images,
    lifestyleImages: Array.isArray(raw.lifestyleImages)
      ? raw.lifestyleImages.map(String)
      : [],
    careInstructions: String(raw.careInstructions ?? ''),
    warranty: String(raw.warranty ?? ''),
    leadTime: String(raw.leadTime ?? ''),
    createdAt: raw.createdAt ? String(raw.createdAt) : new Date().toISOString(),
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : new Date().toISOString(),
  };
}

export const productService = {
  /**
   * GET /api/v1/products
   */
  async getAll(
    query?: Partial<FilterState> & { limit?: number; page?: number },
  ): Promise<{
    data: Product[];
    fromApi: boolean;
    count?: number;
    total?: number;
    page?: number;
    totalPages?: number;
  }> {
    try {
      const params = buildProductsQueryParams(query);
      const qs = params.toString();
      const url = qs
        ? `${API_BASE_URL}/products?${qs}`
        : `${API_BASE_URL}/products`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
          ? json.data
          : [];
        const list = rawList.map((item: Record<string, unknown>) =>
          normalizeProduct(item),
        );
        return {
          data: list,
          fromApi: true,
          count: Number(json?.count ?? list.length),
          total: Number(json?.total ?? list.length),
          page: Number(json?.page ?? 1),
          totalPages: Number(json?.totalPages ?? 1),
        };
      }
    } catch {
      // Backend unreachable
    }

    return { data: [], fromApi: false };
  },

  /**
   * GET /api/v1/products/:id
   */
  async getById(id: string): Promise<{ data: Product; fromApi: boolean }> {
    const response = await fetch(
      `${API_BASE_URL}/products/${encodeURIComponent(id)}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      },
    );

    const json = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(json?.message || `Product "${id}" was not found.`);
    }

    const rawData = json?.data || json;
    if (!rawData) {
      throw new Error(`Product "${id}" was not found.`);
    }

    return {
      data: normalizeProduct(rawData as Record<string, unknown>),
      fromApi: true,
    };
  },

  /**
   * POST /api/v1/products
   */
  async create(
    dto: CreateProductDto,
  ): Promise<{ data: Product; message: string }> {
    const slug =
      dto.slug?.trim() || dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = {
      ...dto,
      slug,
      price: Number(dto.price),
      originalPrice: dto.originalPrice ? Number(dto.originalPrice) : undefined,
      discountPercentage: dto.discountPercentage
        ? Number(dto.discountPercentage)
        : undefined,
      rating: Number(dto.rating ?? 5),
      reviewCount: Number(dto.reviewCount ?? 0),
      inStock: dto.inStock ?? true,
    };

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errMsg =
        json?.message || 'Failed to create product. Please verify all inputs.';
      throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
    }

    const rawData = json?.data || json;
    const createdItem = normalizeProduct(rawData as Record<string, unknown>);
    const message = json?.message || 'Product created successfully';

    return { data: createdItem, message };
  },

  /**
   * PATCH /api/v1/products/:id
   */
  async update(
    id: string,
    dto: UpdateProductDto,
  ): Promise<{ data: Product; message: string }> {
    const payload: Record<string, unknown> = { ...dto };
    if (dto.price !== undefined) payload.price = Number(dto.price);
    if (dto.originalPrice !== undefined) {
      payload.originalPrice = Number(dto.originalPrice);
    }
    if (dto.discountPercentage !== undefined) {
      payload.discountPercentage = Number(dto.discountPercentage);
    }

    let response = await fetch(
      `${API_BASE_URL}/products/${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    if (response.status === 404 || response.status === 405) {
      response = await fetch(
        `${API_BASE_URL}/products/${encodeURIComponent(id)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );
    }

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errMsg = json?.message || 'Failed to update product.';
      throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
    }

    const rawData = json?.data || json;
    const updatedItem = normalizeProduct(rawData as Record<string, unknown>);
    const message = json?.message || 'Product updated successfully';

    return { data: updatedItem, message };
  },

  /**
   * DELETE /api/v1/products/:id
   */
  async delete(id: string): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/products/${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      },
    );

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errMsg = json?.message || 'Failed to delete product.';
      throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
    }

    const message = json?.message || 'Product deleted successfully';
    return { message };
  },

  /**
   * Toggle product inStock status
   */
  async toggleStatus(
    id: string,
    currentInStock: boolean,
  ): Promise<{ data: Product; message: string }> {
    return this.update(id, { inStock: !currentInStock });
  },
};
