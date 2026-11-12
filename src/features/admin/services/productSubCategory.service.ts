import {
  ProductSubCategory,
  CreateProductSubCategoryDto,
  UpdateProductSubCategoryDto,
} from '../types/productSubCategory.types';
import { API_BASE_URL } from '@/config/api.config';
import { COLLECTIONS } from '@/data/collections';

const STORAGE_KEY = 'mfe_admin_furniture_collections_v1';

const INITIAL_FALLBACK_SUBCATEGORIES: ProductSubCategory[] = COLLECTIONS.map((c) => ({
  id: c.id,
  uniqueId: c.id,
  categoryId: 'all',
  name: c.name,
  slug: c.slug,
  imageUrl: c.heroImage,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

function normalizeSubCategory(raw: any): ProductSubCategory {
  const id = raw.id || raw.uniqueId || raw._id || raw.slug || `col-${Date.now()}`;
  return {
    id: String(id),
    uniqueId: raw.uniqueId ? String(raw.uniqueId) : String(id),
    categoryId: String(raw.categoryId || 'all'),
    name: raw.name || '',
    slug: raw.slug || '',
    imageUrl: raw.imageUrl || raw.image_url || raw.heroImage || '',
    isActive:
      typeof raw.isActive === 'boolean'
        ? raw.isActive
        : typeof raw.is_active === 'boolean'
        ? raw.is_active
        : true,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

function getStoredSubCategories(): ProductSubCategory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FALLBACK_SUBCATEGORIES));
      return INITIAL_FALLBACK_SUBCATEGORIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_FALLBACK_SUBCATEGORIES;
  } catch {
    return INITIAL_FALLBACK_SUBCATEGORIES;
  }
}

function saveStoredSubCategories(items: ProductSubCategory[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save collections to localStorage', e);
  }
}

export const productSubCategoryService = {
  /**
   * GET /api/v1/collections or /api/v1/product-sub-categories
   */
  async getAll(categoryId?: string): Promise<{ data: ProductSubCategory[]; fromApi: boolean }> {
    try {
      let response = await fetch(`${API_BASE_URL}/collections`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        response = await fetch(`${API_BASE_URL}/product-sub-categories`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
      }

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json) ? json : json?.data || [];
        if (Array.isArray(rawList)) {
          const list = rawList.map(normalizeSubCategory);
          return { data: list, fromApi: true };
        }
      }
    } catch {
      // Backend offline
    }

    return { data: [], fromApi: false };
  },

  /**
   * POST /api/v1/collections
   */
  async create(
    dto: CreateProductSubCategoryDto
  ): Promise<{ data: ProductSubCategory; message: string }> {
    const payload = {
      name: dto.name.trim(),
      slug: dto.slug.toLowerCase().trim(),
      heroImage: (dto.image_url || '').trim(),
      image_url: (dto.image_url || '').trim(),
      is_active: Boolean(dto.is_active),
    };

    try {
      let response = await fetch(`${API_BASE_URL}/collections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        response = await fetch(`${API_BASE_URL}/product-sub-categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to create collection.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const rawData = json?.data || json;
      const createdItem = normalizeSubCategory(rawData);
      const message = json?.message || 'Collection created successfully';

      const stored = getStoredSubCategories();
      stored.push(createdItem);
      saveStoredSubCategories(stored);

      return { data: createdItem, message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const localItem: ProductSubCategory = {
        id: `col-${Date.now()}`,
        uniqueId: `col-${Date.now()}`,
        categoryId: dto.categoryId || 'all',
        name: payload.name,
        slug: payload.slug,
        imageUrl: payload.image_url,
        isActive: payload.is_active,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const stored = getStoredSubCategories();
      stored.push(localItem);
      saveStoredSubCategories(stored);

      return { data: localItem, message: 'Collection created successfully' };
    }
  },

  /**
   * PATCH /api/v1/collections/:id
   */
  async update(
    id: string,
    dto: UpdateProductSubCategoryDto
  ): Promise<{ data: ProductSubCategory; message: string }> {
    const payload: Record<string, any> = {};
    if (dto.name !== undefined) payload.name = dto.name.trim();
    if (dto.slug !== undefined) payload.slug = dto.slug.toLowerCase().trim();
    if (dto.image_url !== undefined) {
      payload.image_url = dto.image_url.trim();
      payload.heroImage = dto.image_url.trim();
    }
    if (dto.is_active !== undefined) payload.is_active = Boolean(dto.is_active);

    try {
      let response = await fetch(`${API_BASE_URL}/collections/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 404 || response.status === 405) {
        response = await fetch(`${API_BASE_URL}/product-sub-categories/${encodeURIComponent(id)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to update collection.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const updatedItem = normalizeSubCategory(json?.data || json);
      const stored = getStoredSubCategories().map((s) =>
        s.id === id || s.slug === id ? updatedItem : s
      );
      saveStoredSubCategories(stored);

      return { data: updatedItem, message: 'Collection updated successfully' };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredSubCategories();
      const index = stored.findIndex((s) => s.id === id || s.slug === id);
      if (index === -1) {
        throw new Error(`Collection "${id}" not found.`);
      }

      const current = stored[index];
      const updatedItem: ProductSubCategory = {
        ...current,
        name: payload.name ?? current.name,
        slug: payload.slug ?? current.slug,
        imageUrl: payload.image_url ?? current.imageUrl,
        isActive: payload.is_active ?? current.isActive,
        updatedAt: new Date().toISOString(),
      };
      stored[index] = updatedItem;
      saveStoredSubCategories(stored);

      return { data: updatedItem, message: 'Collection updated successfully' };
    }
  },

  /**
   * DELETE /api/v1/collections/:id
   */
  async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/collections/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to delete collection.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const message = json?.message || 'Collection deleted successfully';
      const stored = getStoredSubCategories().filter((s) => s.id !== id && s.slug !== id);
      saveStoredSubCategories(stored);

      return { message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredSubCategories().filter((s) => s.id !== id && s.slug !== id);
      saveStoredSubCategories(stored);

      return { message: 'Collection deleted successfully' };
    }
  },

  /**
   * Toggle collection active status
   */
  async toggleActive(
    id: string,
    currentStatus: boolean
  ): Promise<{ data: ProductSubCategory; message: string }> {
    return this.update(id, { is_active: !currentStatus });
  },
};
