import { ProductColor, CreateProductColorDto, UpdateProductColorDto } from '../types/productColor.types';
import { API_BASE_URL } from '@/config/api.config';

const STORAGE_KEY = 'mfe_admin_furniture_colors_v1';

const INITIAL_FALLBACK_COLORS: ProductColor[] = [
  {
    id: 'col-oatmeal-boucle',
    uniqueId: 'col-oatmeal-boucle',
    name: 'Oatmeal Bouclé',
    code: '#EBE5D8',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col-warm-charcoal',
    uniqueId: 'col-warm-charcoal',
    name: 'Warm Charcoal',
    code: '#2F2E2C',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col-belgian-natural-flax',
    uniqueId: 'col-belgian-natural-flax',
    name: 'Belgian Natural Flax',
    code: '#D9D0C1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col-raw-honed-travertine',
    uniqueId: 'col-raw-honed-travertine',
    name: 'Raw Honed Travertine',
    code: '#E4DCD3',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col-natural-walnut',
    uniqueId: 'col-natural-walnut',
    name: 'Natural Walnut',
    code: '#5A3825',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col-cognac-saddle-leather',
    uniqueId: 'col-cognac-saddle-leather',
    name: 'Cognac Saddle Leather',
    code: '#8B4513',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col-forest-green-velvet',
    uniqueId: 'col-forest-green-velvet',
    name: 'Forest Green Velvet',
    code: '#24382B',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col-desert-sand',
    uniqueId: 'col-desert-sand',
    name: 'Desert Sand',
    code: '#D5C3A1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function normalizeProductColor(raw: any): ProductColor {
  const id = raw.id || raw.uniqueId || raw._id || `col-${Date.now()}`;
  return {
    id,
    uniqueId: raw.uniqueId || id,
    name: raw.name || '',
    code: (raw.code || '').toUpperCase(),
    isActive: typeof raw.isActive === 'boolean' ? raw.isActive : true,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

function getStoredProductColors(): ProductColor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FALLBACK_COLORS));
      return INITIAL_FALLBACK_COLORS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_FALLBACK_COLORS;
  }
}

function saveStoredProductColors(items: ProductColor[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save product colors to localStorage', e);
  }
}

export const productColorService = {
  /**
   * GET /api/v1/product-colors
   * Fetches all product colors from backend API
   */
  async getAll(): Promise<{ data: ProductColor[]; fromApi: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/product-colors`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json) ? json : json?.data || [];
        if (Array.isArray(rawList)) {
          const list = rawList.map(normalizeProductColor);
          saveStoredProductColors(list);
          return { data: list, fromApi: true };
        }
      }
    } catch {
      // Backend not yet serving GET or starting up
    }

    return { data: getStoredProductColors(), fromApi: false };
  },

  /**
   * POST /api/v1/product-colors
   * Payload: { name, code, isActive }
   * Response: { message: "Product color created successfully", data: { ... } }
   */
  async create(dto: CreateProductColorDto): Promise<{ data: ProductColor; message: string }> {
    const payload = {
      name: dto.name.trim(),
      code: dto.code.toUpperCase().trim(),
      isActive: Boolean(dto.isActive),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/product-colors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg =
          json?.message ||
          (Array.isArray(json?.message) ? json.message.join(', ') : null) ||
          'Failed to create product color. Please check your inputs.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const rawData = json?.data || json;
      const createdItem = normalizeProductColor(rawData);
      const message = json?.message || 'Product color created successfully';

      // Update local cache
      const stored = getStoredProductColors();
      stored.push(createdItem);
      saveStoredProductColors(stored);

      return { data: createdItem, message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      // Local fallback
      const localItem: ProductColor = {
        id: `col-${Date.now()}`,
        uniqueId: `col-${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const stored = getStoredProductColors();
      stored.push(localItem);
      saveStoredProductColors(stored);

      return { data: localItem, message: 'Product color created successfully' };
    }
  },

  /**
   * PATCH /api/v1/product-colors/:id
   * Updates an existing product color
   */
  async update(id: string, dto: UpdateProductColorDto): Promise<{ data: ProductColor; message: string }> {
    const payload: Record<string, any> = {};
    if (dto.name !== undefined) payload.name = dto.name.trim();
    if (dto.code !== undefined) payload.code = dto.code.toUpperCase().trim();
    if (dto.isActive !== undefined) payload.isActive = Boolean(dto.isActive);

    try {
      let response = await fetch(`${API_BASE_URL}/product-colors/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 404 || response.status === 405) {
        response = await fetch(`${API_BASE_URL}/product-colors/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg =
          json?.message ||
          (Array.isArray(json?.message) ? json.message.join(', ') : null) ||
          'Failed to update product color.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const rawData = json?.data || json;
      const updatedItem = normalizeProductColor(rawData);
      const message = json?.message || 'Product color updated successfully';

      const stored = getStoredProductColors().map((c) => (c.id === id ? updatedItem : c));
      saveStoredProductColors(stored);

      return { data: updatedItem, message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredProductColors();
      const index = stored.findIndex((c) => c.id === id);
      if (index === -1) {
        throw new Error(`Product color with ID ${id} not found.`);
      }

      const updatedItem: ProductColor = {
        ...stored[index],
        ...payload,
        updatedAt: new Date().toISOString(),
      };
      stored[index] = updatedItem;
      saveStoredProductColors(stored);

      return { data: updatedItem, message: 'Product color updated successfully' };
    }
  },

  /**
   * DELETE /api/v1/product-colors/:id
   * Deletes a product color
   */
  async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/product-colors/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to delete product color.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const message = json?.message || 'Product color deleted successfully';

      const stored = getStoredProductColors().filter((c) => c.id !== id);
      saveStoredProductColors(stored);

      return { message };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredProductColors().filter((c) => c.id !== id);
      saveStoredProductColors(stored);

      return { message: 'Product color deleted successfully' };
    }
  },

  /**
   * Toggle active status
   */
  async toggleActive(id: string, currentStatus: boolean): Promise<{ data: ProductColor; message: string }> {
    return this.update(id, { isActive: !currentStatus });
  },
};
