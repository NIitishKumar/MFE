import {
  ProductCategory,
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from '../types/productCategory.types';
import { NEXT_PUBLIC_API_BASE_URL } from '@/config/api.config';

function normalizeCategory(raw: Record<string, unknown>): ProductCategory {
  const id = String(raw.id ?? raw.uniqueId ?? raw._id ?? raw.slug ?? `cat-${Date.now()}`);
  const categoryId = String(raw.categoryId ?? raw.slug ?? raw.id ?? 'category');
  return {
    id,
    uniqueId: raw.uniqueId ? String(raw.uniqueId) : id,
    categoryId,
    title: String(raw.title ?? raw.name ?? ''),
    description: String(raw.description ?? ''),
    imageUrl: String(raw.imageUrl ?? raw.image_url ?? raw.image ?? ''),
    bannerImageUrl: String(raw.bannerImageUrl ?? raw.banner_image_url ?? raw.image ?? ''),
    orderBy: Number(raw.orderBy ?? raw.order_by ?? 1),
    isActive:
      typeof raw.isActive === 'boolean'
        ? raw.isActive
        : typeof raw.is_active === 'boolean'
          ? raw.is_active
          : true,
    createdAt: raw.createdAt ? String(raw.createdAt) : new Date().toISOString(),
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : new Date().toISOString(),
  };
}

export const productCategoryService = {
  /**
   * GET /api/v1/categories (falls back to /api/v1/product-categories if needed)
   */
  async getAll(): Promise<{ data: ProductCategory[]; fromApi: boolean }> {
    try {
      let response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/categories`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/product-categories`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
      }

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json) ? json : json?.data || [];
        const list = Array.isArray(rawList) ? rawList.map(normalizeCategory) : [];
        return { data: list, fromApi: true };
      }
    } catch {
      // Backend unreachable
    }

    return { data: [], fromApi: false };
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

    let response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) {
      response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/product-categories`, {
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

    return { data: createdItem, message };
  },

  /**
   * PATCH /api/v1/categories/:id
   */
  async update(
    id: string,
    dto: UpdateProductCategoryDto
  ): Promise<{ data: ProductCategory; message: string }> {
    const payload: Record<string, unknown> = {};
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

    let response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/categories/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.status === 404 || response.status === 405) {
      response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/product-categories/${encodeURIComponent(id)}`, {
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

    return { data: updatedItem, message };
  },

  /**
   * DELETE /api/v1/categories/:id
   */
  async delete(id: string): Promise<{ message: string }> {
    let response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/categories/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });

    if (response.status === 404) {
      response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/product-categories/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });
    }

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errMsg = json?.message || 'Failed to delete category.';
      throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
    }

    const message = json?.message || 'Category deleted successfully';
    return { message };
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
