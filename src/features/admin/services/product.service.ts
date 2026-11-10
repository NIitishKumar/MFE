import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '../types/product.types';
import { API_BASE_URL } from '@/config/api.config';
import { PRODUCTS } from '@/data/products';

const STORAGE_KEY = 'mfe_admin_furniture_products_v1';

function normalizeProduct(raw: any): Product {
  const id = raw.id || raw.productId || raw.uniqueId || raw._id || `prod-${Date.now()}`;
  const price = Number(raw.price ?? raw.basePrice ?? 0);
  const primaryImg = raw.imageUrl || (Array.isArray(raw.images) && raw.images[0]) || raw.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc';
  return {
    id: String(id),
    productId: String(id),
    uniqueId: String(id),
    name: raw.name || '',
    slug: raw.slug || (raw.name ? raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `prod-${Date.now()}`),
    category: raw.category || 'sofas',
    categoryLabel: raw.categoryLabel || raw.category || 'Sofas',
    room: raw.room || 'living-room',
    roomLabel: raw.roomLabel || raw.room || 'Living Room',
    collectionSlug: raw.collectionSlug || '',
    collectionName: raw.collectionName || '',
    price,
    basePrice: price,
    originalPrice: raw.originalPrice ? Number(raw.originalPrice) : undefined,
    discountPercentage: raw.discountPercentage ? Number(raw.discountPercentage) : undefined,
    rating: Number(raw.rating ?? 5),
    reviewCount: Number(raw.reviewCount ?? 0),
    shortDescription: raw.shortDescription || raw.short_description || '',
    fullDescription: raw.fullDescription || raw.description || '',
    materials: Array.isArray(raw.materials) ? raw.materials : [],
    dimensions: raw.dimensions || {
      width: '220 cm',
      depth: '95 cm',
      height: '78 cm',
      seatHeight: '42 cm',
      weight: '60 kg',
    },
    colors: Array.isArray(raw.colors) ? raw.colors : [],
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    badges: Array.isArray(raw.badges) ? raw.badges : [],
    inStock: typeof raw.inStock === 'boolean' ? raw.inStock : true,
    imageUrl: primaryImg,
    images: Array.isArray(raw.images) && raw.images.length > 0 ? raw.images : [primaryImg],
    lifestyleImages: Array.isArray(raw.lifestyleImages) ? raw.lifestyleImages : [],
    careInstructions: raw.careInstructions || '',
    warranty: raw.warranty || '',
    leadTime: raw.leadTime || '',
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PRODUCTS;
  } catch {
    return PRODUCTS;
  }
}

function saveStoredProducts(items: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save products to localStorage', e);
  }
}

export const productService = {
  /**
   * GET /api/v1/products
   */
  async getAll(query?: {
    category?: string;
    room?: string;
    collectionSlug?: string;
    search?: string;
  }): Promise<{ data: Product[]; fromApi: boolean }> {
    try {
      const params = new URLSearchParams();
      if (query?.category) params.append('category', query.category);
      if (query?.room) params.append('room', query.room);
      if (query?.collectionSlug) params.append('collectionSlug', query.collectionSlug);
      if (query?.search) params.append('search', query.search);

      const qs = params.toString();
      const url = qs ? `${API_BASE_URL}/products?${qs}` : `${API_BASE_URL}/products`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json) ? json : json?.data || [];
        if (Array.isArray(rawList)) {
          const list = rawList.map(normalizeProduct);
          saveStoredProducts(list);
          return { data: list, fromApi: true };
        }
      }
    } catch {
      // Backend offline; fallback to local storage
    }

    let stored = getStoredProducts();
    if (query?.category) {
      stored = stored.filter((p) => p.category.toLowerCase() === query.category!.toLowerCase());
    }
    if (query?.room) {
      stored = stored.filter((p) => p.room.toLowerCase() === query.room!.toLowerCase());
    }
    if (query?.search) {
      const q = query.search.toLowerCase();
      stored = stored.filter((p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q));
    }

    return { data: stored, fromApi: false };
  },

  /**
   * GET /api/v1/products/:id
   */
  async getById(id: string): Promise<{ data: Product; fromApi: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        const json = await response.json();
        const rawData = json?.data || json;
        if (rawData) {
          const item = normalizeProduct(rawData);
          const stored = getStoredProducts();
          const index = stored.findIndex((p) => p.id === item.id || p.slug === item.slug);
          if (index !== -1) {
            stored[index] = item;
            saveStoredProducts(stored);
          }
          return { data: item, fromApi: true };
        }
      }
    } catch {
      // Backend offline; fallback
    }

    const stored = getStoredProducts();
    const found = stored.find((p) => p.id === id || p.slug === id);
    if (found) {
      return { data: found, fromApi: false };
    }

    throw new Error(`Product "${id}" was not found.`);
  },

  /**
   * POST /api/v1/products
   */
  async create(dto: CreateProductDto): Promise<{ data: Product; message: string }> {
    const slug = dto.slug?.trim() || dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = {
      ...dto,
      slug,
      price: Number(dto.price),
      originalPrice: dto.originalPrice ? Number(dto.originalPrice) : undefined,
      discountPercentage: dto.discountPercentage ? Number(dto.discountPercentage) : undefined,
      rating: Number(dto.rating ?? 5),
      reviewCount: Number(dto.reviewCount ?? 0),
      inStock: dto.inStock ?? true,
    };

    try {
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
        const errMsg = json?.message || 'Failed to create product. Please verify all inputs.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const rawData = json?.data || json;
      const createdItem = normalizeProduct(rawData);
      const message = json?.message || 'Product created successfully';

      const stored = getStoredProducts();
      stored.unshift(createdItem);
      saveStoredProducts(stored);

      return { data: createdItem, message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      // Local fallback
      const localItem: Product = normalizeProduct({
        ...payload,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const stored = getStoredProducts();
      stored.unshift(localItem);
      saveStoredProducts(stored);

      return { data: localItem, message: 'Product created successfully' };
    }
  },

  /**
   * PATCH /api/v1/products/:id
   */
  async update(id: string, dto: UpdateProductDto): Promise<{ data: Product; message: string }> {
    const payload: Record<string, any> = { ...dto };
    if (dto.price !== undefined) payload.price = Number(dto.price);
    if (dto.originalPrice !== undefined) payload.originalPrice = Number(dto.originalPrice);
    if (dto.discountPercentage !== undefined) payload.discountPercentage = Number(dto.discountPercentage);

    try {
      let response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 404 || response.status === 405) {
        response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to update product.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const rawData = json?.data || json;
      const updatedItem = normalizeProduct(rawData);
      const message = json?.message || 'Product updated successfully';

      const stored = getStoredProducts().map((p) =>
        p.id === id || p.slug === id ? updatedItem : p
      );
      saveStoredProducts(stored);

      return { data: updatedItem, message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredProducts();
      const index = stored.findIndex((p) => p.id === id || p.slug === id);
      if (index === -1) {
        throw new Error(`Product with ID ${id} not found.`);
      }

      const current = stored[index];
      const updatedItem: Product = {
        ...current,
        ...payload,
        updatedAt: new Date().toISOString(),
      };
      stored[index] = updatedItem;
      saveStoredProducts(stored);

      return { data: updatedItem, message: 'Product updated successfully' };
    }
  },

  /**
   * DELETE /api/v1/products/:id
   */
  async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to delete product.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const message = json?.message || 'Product deleted successfully';

      const stored = getStoredProducts().filter((p) => p.id !== id && p.slug !== id);
      saveStoredProducts(stored);

      return { message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredProducts().filter((p) => p.id !== id && p.slug !== id);
      saveStoredProducts(stored);

      return { message: 'Product deleted successfully' };
    }
  },

  /**
   * Toggle product inStock status
   */
  async toggleStatus(
    id: string,
    currentInStock: boolean
  ): Promise<{ data: Product; message: string }> {
    return this.update(id, { inStock: !currentInStock });
  },
};
