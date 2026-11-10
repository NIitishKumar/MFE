import {
  ProductCategory,
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from '../types/productCategory.types';
import { API_BASE_URL } from '@/config/api.config';
import { CATEGORIES } from '@/data/categories';

const STORAGE_KEY = 'mfe_admin_furniture_categories_v1';

const INITIAL_FALLBACK_CATEGORIES: ProductCategory[] = CATEGORIES.map((c, idx) => ({
  id: c.id,
  uniqueId: c.id,
  categoryId: c.slug,
  title: c.name,
  description: c.description,
  imageUrl: c.image,
  bannerImageUrl: c.image,
  orderBy: idx + 1,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

function normalizeCategory(raw: any): ProductCategory {
  const id = raw.id || raw.uniqueId || raw._id || raw.slug || `cat-${Date.now()}`;
  const categoryId = raw.categoryId || raw.slug || raw.id || 'category';
  return {
    id: String(id),
    uniqueId: raw.uniqueId ? String(raw.uniqueId) : String(id),
    categoryId: String(categoryId),
    title: raw.title || raw.name || '',
    description: raw.description || '',
    imageUrl: raw.imageUrl || raw.image_url || raw.image || '',
    bannerImageUrl: raw.bannerImageUrl || raw.banner_image_url || raw.image || '',
    orderBy: Number(raw.orderBy ?? raw.order_by ?? 1),
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

function getStoredCategories(): ProductCategory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FALLBACK_CATEGORIES));
      return INITIAL_FALLBACK_CATEGORIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_FALLBACK_CATEGORIES;
  } catch {
    return INITIAL_FALLBACK_CATEGORIES;
  }
}

function saveStoredCategories(items: ProductCategory[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save categories to localStorage', e);
  }
}

export const productCategoryService = {
  /**
   * GET /api/v1/categories or /api/v1/product-categories
   */
  async getAll(): Promise<{ data: ProductCategory[]; fromApi: boolean }> {
    try {
      // 1. Try /categories
      let response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        response = await fetch(`${API_BASE_URL}/product-categories`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
      }

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json) ? json : json?.data || [];
        if (Array.isArray(rawList) && rawList.length > 0) {
          const list = rawList.map(normalizeCategory);
          saveStoredCategories(list);
          return { data: list, fromApi: true };
        }
      }
    } catch {
      // Backend offline; fallback to local storage
    }

    return { data: getStoredCategories(), fromApi: false };
  },

  /**
   * POST /api/v1/categories
   */
  async create(dto: CreateProductCategoryDto): Promise<{ data: ProductCategory; message: string }> {
    const payload = {
      id: dto.id.toLowerCase().trim(),
      name: dto.title.trim(),
      slug: dto.id.toLowerCase().trim(),
      title: dto.title.trim(),
      description: (dto.description || '').trim(),
      image: (dto.image_url || '').trim(),
      image_url: (dto.image_url || '').trim(),
      banner_image_url: (dto.banner_image_url || '').trim(),
      order_by: Number(dto.order_by),
      is_active: Boolean(dto.is_active),
    };

    try {
      let response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        response = await fetch(`${API_BASE_URL}/product-categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to create category.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const rawData = json?.data || json;
      const createdItem = normalizeCategory(rawData);
      const message = json?.message || 'Category created successfully';

      const stored = getStoredCategories();
      stored.push(createdItem);
      saveStoredCategories(stored);

      return { data: createdItem, message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      // Local fallback
      const localItem: ProductCategory = {
        id: `cat-${Date.now()}`,
        uniqueId: `cat-${Date.now()}`,
        categoryId: payload.id,
        title: payload.title,
        description: payload.description,
        imageUrl: payload.image_url,
        bannerImageUrl: payload.banner_image_url,
        orderBy: payload.order_by,
        isActive: payload.is_active,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const stored = getStoredCategories();
      stored.push(localItem);
      saveStoredCategories(stored);

      return { data: localItem, message: 'Category created successfully' };
    }
  },

  /**
   * PATCH /api/v1/categories/:id
   */
  async update(
    id: string,
    dto: UpdateProductCategoryDto
  ): Promise<{ data: ProductCategory; message: string }> {
    const payload: Record<string, any> = {};
    if (dto.id !== undefined) {
      payload.id = dto.id.toLowerCase().trim();
      payload.slug = dto.id.toLowerCase().trim();
    }
    if (dto.title !== undefined) {
      payload.title = dto.title.trim();
      payload.name = dto.title.trim();
    }
    if (dto.description !== undefined) payload.description = dto.description.trim();
    if (dto.image_url !== undefined) {
      payload.image_url = dto.image_url.trim();
      payload.imageUrl = dto.image_url.trim();
      payload.image = dto.image_url.trim();
    }
    if (dto.banner_image_url !== undefined) {
      payload.banner_image_url = dto.banner_image_url.trim();
      payload.bannerImageUrl = dto.banner_image_url.trim();
    }
    if (dto.order_by !== undefined) {
      payload.order_by = Number(dto.order_by);
      payload.orderBy = Number(dto.order_by);
    }
    if (dto.is_active !== undefined) {
      payload.is_active = Boolean(dto.is_active);
      payload.isActive = Boolean(dto.is_active);
    }

    try {
      let response = await fetch(`${API_BASE_URL}/categories/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 404 || response.status === 405) {
        response = await fetch(`${API_BASE_URL}/product-categories/${encodeURIComponent(id)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to update category.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const rawData = json?.data || json;
      const updatedItem = normalizeCategory(rawData);
      const message = json?.message || 'Category updated successfully';

      const stored = getStoredCategories().map((c) =>
        c.id === id || c.categoryId === id ? updatedItem : c
      );
      saveStoredCategories(stored);

      return { data: updatedItem, message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredCategories();
      const index = stored.findIndex((c) => c.id === id || c.categoryId === id);
      if (index === -1) {
        throw new Error(`Category "${id}" not found.`);
      }

      const current = stored[index];
      const updatedItem: ProductCategory = {
        ...current,
        categoryId: payload.id ?? current.categoryId,
        title: payload.title ?? current.title,
        description: payload.description ?? current.description,
        imageUrl: payload.image_url ?? current.imageUrl,
        bannerImageUrl: payload.banner_image_url ?? current.bannerImageUrl,
        orderBy: payload.order_by ?? current.orderBy,
        isActive: payload.is_active ?? current.isActive,
        updatedAt: new Date().toISOString(),
      };
      stored[index] = updatedItem;
      saveStoredCategories(stored);

      return { data: updatedItem, message: 'Category updated successfully' };
    }
  },

  /**
   * DELETE /api/v1/categories/:id
   */
  async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to delete category.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const message = json?.message || 'Category deleted successfully';
      const stored = getStoredCategories().filter((c) => c.id !== id && c.categoryId !== id);
      saveStoredCategories(stored);

      return { message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredCategories().filter((c) => c.id !== id && c.categoryId !== id);
      saveStoredCategories(stored);

      return { message: 'Category deleted successfully' };
    }
  },

  /**
   * Toggle category active status
   */
  async toggleActive(
    id: string,
    currentStatus: boolean
  ): Promise<{ data: ProductCategory; message: string }> {
    return this.update(id, { is_active: !currentStatus });
  },
};
