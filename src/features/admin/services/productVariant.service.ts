import {
  ProductVariant,
  CreateProductVariantDto,
  UpdateProductVariantDto,
} from '../types/productVariant.types';
import { API_BASE_URL } from '@/config/api.config';

const STORAGE_KEY = 'mfe_admin_furniture_variants_v1';

const INITIAL_FALLBACK_VARIANTS: ProductVariant[] = [
  {
    id: 'var-sorrento-3s-oatmeal',
    uniqueId: 'var-sorrento-3s-oatmeal',
    variantId: 'var-sorrento-3s-oatmeal',
    productId: 'prod-sorrento-boucle-sofa',
    product: {
      id: 'prod-sorrento-boucle-sofa',
      uniqueId: 'prod-sorrento-boucle-sofa',
      name: 'Sorrento Curved Bouclé Sofa',
      slug: 'sorrento-curved-boucle-sofa',
      basePrice: 145000,
    },
    fitSizeId: 'size-3seater',
    fitSize: {
      id: 'size-3seater',
      uniqueId: 'size-3seater',
      name: '3-Seater (240 cm)',
      fitCode: '3S-240',
      displayOrder: 1,
    },
    productColorId: 'col-oatmeal-boucle',
    productColor: {
      id: 'col-oatmeal-boucle',
      uniqueId: 'col-oatmeal-boucle',
      name: 'Oatmeal Bouclé',
      code: '#EBE5D8',
    },
    price: 145000,
    compareAtPrice: 168000,
    sku: 'SORR-3S-OATBOU-01',
    stockQuantity: 8,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'var-sorrento-4s-charcoal',
    uniqueId: 'var-sorrento-4s-charcoal',
    variantId: 'var-sorrento-4s-charcoal',
    productId: 'prod-sorrento-boucle-sofa',
    product: {
      id: 'prod-sorrento-boucle-sofa',
      name: 'Sorrento Curved Bouclé Sofa',
      slug: 'sorrento-curved-boucle-sofa',
      basePrice: 168000,
    },
    fitSizeId: 'size-4seater',
    fitSize: {
      id: 'size-4seater',
      name: '4-Seater Grande (260 cm)',
      fitCode: '4S-260',
      displayOrder: 2,
    },
    productColorId: 'col-warm-charcoal',
    productColor: {
      id: 'col-warm-charcoal',
      name: 'Warm Charcoal',
      code: '#2F2E2C',
    },
    price: 168000,
    compareAtPrice: 195000,
    sku: 'SORR-4S-WRMCHR-02',
    stockQuantity: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'var-travertine-8s',
    uniqueId: 'var-travertine-8s',
    variantId: 'var-travertine-8s',
    productId: 'prod-brutalist-travertine-table',
    product: {
      id: 'prod-brutalist-travertine-table',
      name: 'Brutalist Travertine Dining Table',
      slug: 'brutalist-travertine-dining-table',
      basePrice: 185000,
    },
    fitSizeId: 'size-8seater',
    fitSize: {
      id: 'size-8seater',
      name: '8-Seater (240 cm)',
      fitCode: '8S-240',
      displayOrder: 3,
    },
    productColorId: 'col-raw-honed-travertine',
    productColor: {
      id: 'col-raw-honed-travertine',
      name: 'Raw Honed Travertine',
      code: '#E4DCD3',
    },
    price: 185000,
    compareAtPrice: 215000,
    sku: 'TRV-8S-HOND-01',
    stockQuantity: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'var-nara-king-walnut',
    uniqueId: 'var-nara-king-walnut',
    variantId: 'var-nara-king-walnut',
    productId: 'prod-nara-walnut-bed',
    product: {
      id: 'prod-nara-walnut-bed',
      name: 'Nara Low-Slung Solid Walnut Bed',
      slug: 'nara-low-slung-solid-walnut-bed',
      basePrice: 135000,
    },
    fitSizeId: 'size-king',
    fitSize: {
      id: 'size-king',
      name: 'King (78x84 in)',
      fitCode: 'KNG-78',
      displayOrder: 4,
    },
    productColorId: 'col-natural-walnut',
    productColor: {
      id: 'col-natural-walnut',
      name: 'Natural Walnut',
      code: '#5A3825',
    },
    price: 135000,
    compareAtPrice: 155000,
    sku: 'NARA-KNG-WLN-01',
    stockQuantity: 6,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getStoredVariants(): ProductVariant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FALLBACK_VARIANTS));
      return INITIAL_FALLBACK_VARIANTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_FALLBACK_VARIANTS;
  } catch {
    return INITIAL_FALLBACK_VARIANTS;
  }
}

function saveStoredVariants(items: ProductVariant[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save product variants to localStorage', e);
  }
}

function normalizeVariant(raw: any): ProductVariant {
  const id = raw?.id || raw?.uniqueId || raw?.variantId || raw?._id || `var-${Date.now()}`;
  const productId = raw?.productId || raw?.product_id || raw?.product?.id || '';

  // Fit size normalization
  const fitSizeRaw = raw?.fitSize || raw?.fit_size;
  const fitSizeId = raw?.fitSizeId || raw?.fit_size_id || fitSizeRaw?.id || '';
  const fitSize = fitSizeRaw
    ? {
        id: fitSizeRaw?.id || fitSizeRaw?.uniqueId || fitSizeId,
        uniqueId: fitSizeRaw?.uniqueId,
        name: fitSizeRaw?.name || '',
        fitCode: fitSizeRaw?.fitCode || fitSizeRaw?.fit_code || fitSizeRaw?.code || '',
        displayOrder: Number(fitSizeRaw?.displayOrder ?? fitSizeRaw?.display_order ?? 0),
      }
    : undefined;

  // Product color normalization
  const colorRaw = raw?.productColor || raw?.product_color;
  const productColorId = raw?.productColorId || raw?.product_color_id || colorRaw?.id || '';
  const productColor = colorRaw
    ? {
        id: colorRaw?.id || colorRaw?.uniqueId || productColorId,
        uniqueId: colorRaw?.uniqueId,
        name: colorRaw?.name || '',
        code: colorRaw?.code || '',
      }
    : undefined;

  // Product normalization
  const prodRaw = raw?.product;
  const product = prodRaw
    ? {
        id: prodRaw?.id || prodRaw?.uniqueId || productId,
        uniqueId: prodRaw?.uniqueId,
        name: prodRaw?.name || '',
        slug: prodRaw?.slug || '',
        basePrice: prodRaw?.basePrice != null ? Number(prodRaw.basePrice) : undefined,
      }
    : undefined;

  const compareAtPrice =
    raw?.compareAtPrice !== undefined && raw?.compareAtPrice !== null
      ? Number(raw.compareAtPrice)
      : raw?.compare_at_price !== undefined && raw?.compare_at_price !== null
      ? Number(raw.compare_at_price)
      : null;

  return {
    id: String(id),
    uniqueId: raw?.uniqueId || String(id),
    variantId: raw?.variantId || String(id),
    productId: String(productId),
    product,
    fitSizeId: String(fitSizeId),
    fitSize,
    productColorId: String(productColorId),
    productColor,
    price: Number(raw?.price ?? 0),
    compareAtPrice,
    sku: String(raw?.sku || ''),
    stockQuantity: Number(raw?.stockQuantity ?? raw?.stock_quantity ?? 0),
    isActive: Boolean(raw?.isActive ?? raw?.is_active ?? true),
    createdAt: raw?.createdAt || raw?.created_at || new Date().toISOString(),
    updatedAt: raw?.updatedAt || raw?.updated_at || new Date().toISOString(),
  };
}

export const productVariantService = {
  /**
   * GET /api/v1/product-variants
   */
  async getAll(productId?: string): Promise<{ data: ProductVariant[]; fromApi: boolean }> {
    try {
      const url = productId
        ? `${API_BASE_URL}/product-variants?productId=${encodeURIComponent(productId)}`
        : `${API_BASE_URL}/product-variants`;

      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json) ? json : json?.data || [];
        if (Array.isArray(rawList)) {
          const list = rawList.map(normalizeVariant);
          return { data: list, fromApi: true };
        }
      }
    } catch {
      // Backend offline
    }

    return { data: [], fromApi: false };
  },

  /**
   * GET /api/v1/product-variants/:id
   */
  async getById(id: string): Promise<{ data: ProductVariant; fromApi: boolean }> {
    const cleanId = (id || '').trim();
    if (!cleanId) {
      throw new Error('Product variant identifier is missing.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/product-variants/${encodeURIComponent(cleanId)}`, {
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        const json = await response.json();
        const raw = json?.data || json;
        if (raw) {
          const item = normalizeVariant(raw);
          const stored = getStoredVariants();
          const idx = stored.findIndex(
            (v) => v.id === item.id || v.variantId === item.id || v.uniqueId === item.id
          );
          if (idx !== -1) {
            stored[idx] = item;
            saveStoredVariants(stored);
          }
          return { data: item, fromApi: true };
        }
      }
    } catch {
      // Backend offline or booting; fallback to local storage
    }

    const stored = getStoredVariants();
    const found = stored.find(
      (v) =>
        v.id === cleanId ||
        v.variantId === cleanId ||
        v.uniqueId === cleanId ||
        v.sku === cleanId
    );
    if (found) {
      return { data: found, fromApi: false };
    }

    throw new Error(`Product variant with ID "${cleanId}" was not found.`);
  },

  /**
   * POST /api/v1/product-variants
   */
  async create(dto: CreateProductVariantDto): Promise<{ data: ProductVariant; message: string }> {
    const payload = {
      productId: dto.productId.trim(),
      product_id: dto.productId.trim(),
      fitSizeId: dto.fitSizeId.trim(),
      fit_size_id: dto.fitSizeId.trim(),
      productColorId: dto.productColorId.trim(),
      product_color_id: dto.productColorId.trim(),
      price: Number(dto.price),
      compare_at_price: dto.compare_at_price != null ? Number(dto.compare_at_price) : null,
      compareAtPrice: dto.compare_at_price != null ? Number(dto.compare_at_price) : null,
      sku: dto.sku.trim().toUpperCase(),
      stock_quantity: Number(dto.stock_quantity),
      stockQuantity: Number(dto.stock_quantity),
      is_active: Boolean(dto.is_active),
      isActive: Boolean(dto.is_active),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/product-variants`, {
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
          json?.message ||
          (Array.isArray(json?.message) ? json.message.join(', ') : null) ||
          'Failed to create product variant. Please verify input data.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const rawData = json?.data || json;
      const createdItem = normalizeVariant(rawData);
      const message = json?.message || 'Product variant created successfully';

      const stored = getStoredVariants();
      stored.unshift(createdItem);
      saveStoredVariants(stored);

      return { data: createdItem, message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      // Local fallback
      const localItem: ProductVariant = {
        id: `var-${Date.now()}`,
        uniqueId: `var-${Date.now()}`,
        variantId: `var-${Date.now()}`,
        productId: payload.productId,
        fitSizeId: payload.fitSizeId,
        productColorId: payload.productColorId,
        price: payload.price,
        compareAtPrice: payload.compareAtPrice,
        sku: payload.sku,
        stockQuantity: payload.stockQuantity,
        isActive: payload.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const stored = getStoredVariants();
      stored.unshift(localItem);
      saveStoredVariants(stored);

      return {
        data: localItem,
        message: 'Product variant created (saved in local store)',
      };
    }
  },

  /**
   * PATCH /api/v1/product-variants/:id
   */
  async update(
    id: string,
    dto: UpdateProductVariantDto
  ): Promise<{ data: ProductVariant; message: string }> {
    const payload: Record<string, any> = {};

    if (dto.productId !== undefined) {
      payload.productId = dto.productId.trim();
      payload.product_id = dto.productId.trim();
    }
    if (dto.fitSizeId !== undefined) {
      payload.fitSizeId = dto.fitSizeId.trim();
      payload.fit_size_id = dto.fitSizeId.trim();
    }
    if (dto.productColorId !== undefined) {
      payload.productColorId = dto.productColorId.trim();
      payload.product_color_id = dto.productColorId.trim();
    }
    if (dto.price !== undefined) {
      payload.price = Number(dto.price);
    }
    if (dto.compare_at_price !== undefined) {
      payload.compare_at_price = dto.compare_at_price != null ? Number(dto.compare_at_price) : null;
      payload.compareAtPrice = payload.compare_at_price;
    }
    if (dto.sku !== undefined) {
      payload.sku = dto.sku.trim().toUpperCase();
    }
    if (dto.stock_quantity !== undefined) {
      payload.stock_quantity = Number(dto.stock_quantity);
      payload.stockQuantity = payload.stock_quantity;
    }
    if (dto.is_active !== undefined) {
      payload.is_active = Boolean(dto.is_active);
      payload.isActive = payload.is_active;
    }

    try {
      let response = await fetch(`${API_BASE_URL}/product-variants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok && response.status === 404) {
        // Fallback to PUT if backend implements PUT
        response = await fetch(`${API_BASE_URL}/product-variants/${id}`, {
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
        const errMsg =
          json?.message ||
          (Array.isArray(json?.message) ? json.message.join(', ') : null) ||
          'Failed to update product variant.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const updated = normalizeVariant(json?.data || json);
      const stored = getStoredVariants();
      const idx = stored.findIndex((v) => v.id === id);
      if (idx !== -1) {
        stored[idx] = updated;
        saveStoredVariants(stored);
      }

      return {
        data: updated,
        message: json?.message || 'Product variant updated successfully',
      };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      // Local fallback
      const stored = getStoredVariants();
      const idx = stored.findIndex((v) => v.id === id);
      if (idx !== -1) {
        const item = stored[idx];
        const updated: ProductVariant = {
          ...item,
          productId: payload.productId ?? item.productId,
          fitSizeId: payload.fitSizeId ?? item.fitSizeId,
          productColorId: payload.productColorId ?? item.productColorId,
          price: payload.price ?? item.price,
          compareAtPrice:
            payload.compareAtPrice !== undefined ? payload.compareAtPrice : item.compareAtPrice,
          sku: payload.sku ?? item.sku,
          stockQuantity: payload.stockQuantity ?? item.stockQuantity,
          isActive: payload.isActive ?? item.isActive,
          updatedAt: new Date().toISOString(),
        };
        stored[idx] = updated;
        saveStoredVariants(stored);
        return {
          data: updated,
          message: 'Product variant updated (saved locally)',
        };
      }
      throw new Error(`Variant ${id} not found in local storage`);
    }
  },

  /**
   * DELETE /api/v1/product-variants/:id
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/product-variants/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        const json = await response.json().catch(() => ({}));
        const stored = getStoredVariants().filter((v) => v.id !== id);
        saveStoredVariants(stored);
        return {
          success: true,
          message: json?.message || 'Product variant deleted successfully',
        };
      }
    } catch {
      // Backend offline
    }

    const stored = getStoredVariants().filter((v) => v.id !== id);
    saveStoredVariants(stored);
    return { success: true, message: 'Product variant deleted locally' };
  },

  /**
   * Toggle Active Status
   */
  async toggleStatus(id: string, currentStatus: boolean): Promise<ProductVariant> {
    const res = await this.update(id, { is_active: !currentStatus });
    return res.data;
  },
};
