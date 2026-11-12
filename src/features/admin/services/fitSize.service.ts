import { FitSize, CreateFitSizeDto, UpdateFitSizeDto } from '../types/fitSize.types';
import { API_BASE_URL } from '@/config/api.config';
import { ROOMS } from '@/data/categories';

const STORAGE_KEY = 'mfe_admin_furniture_rooms_v1';

const INITIAL_FALLBACK_FITS: FitSize[] = ROOMS.map((r, idx) => ({
  id: r.id,
  uniqueId: r.id,
  name: r.name,
  fitCode: r.slug.toUpperCase(),
  displayOrder: idx + 1,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

function normalizeFitSize(raw: any): FitSize {
  const id = raw.id || raw.uniqueId || raw._id || raw.slug || `fit-${Date.now()}`;
  return {
    id: String(id),
    uniqueId: raw.uniqueId || String(id),
    name: raw.name || '',
    fitCode: (raw.fitCode || raw.slug || '').toUpperCase(),
    displayOrder: Number(raw.displayOrder ?? raw.display_order ?? 1),
    isActive: typeof raw.isActive === 'boolean' ? raw.isActive : true,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

function getStoredFitSizes(): FitSize[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FALLBACK_FITS));
      return INITIAL_FALLBACK_FITS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_FALLBACK_FITS;
  } catch {
    return INITIAL_FALLBACK_FITS;
  }
}

function saveStoredFitSizes(items: FitSize[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export const fitSizeService = {
  /**
   * GET /api/v1/rooms or /api/v1/fit-sizes
   */
  async getAll(): Promise<{ data: FitSize[]; fromApi: boolean }> {
    try {
      let response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        response = await fetch(`${API_BASE_URL}/fit-sizes`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
      }

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json) ? json : json?.data || [];
        if (Array.isArray(rawList)) {
          const list = rawList.map(normalizeFitSize);
          return { data: list, fromApi: true };
        }
      }
    } catch {
      // Backend offline
    }

    return { data: [], fromApi: false };
  },

  /**
   * POST /api/v1/rooms
   */
  async create(dto: CreateFitSizeDto): Promise<{ data: FitSize; message: string }> {
    const payload = {
      name: dto.name.trim(),
      slug: dto.fitCode.toLowerCase().trim(),
      fitCode: dto.fitCode.toUpperCase().trim(),
      displayOrder: Number(dto.displayOrder),
      isActive: Boolean(dto.isActive),
    };

    try {
      let response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        response = await fetch(`${API_BASE_URL}/fit-sizes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to create room/fit size.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const createdItem = normalizeFitSize(json?.data || json);
      const stored = getStoredFitSizes();
      stored.push(createdItem);
      saveStoredFitSizes(stored);

      return { data: createdItem, message: json?.message || 'Created successfully' };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const localItem: FitSize = {
        id: `room-${Date.now()}`,
        uniqueId: `room-${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const stored = getStoredFitSizes();
      stored.push(localItem);
      saveStoredFitSizes(stored);

      return { data: localItem, message: 'Created successfully' };
    }
  },

  /**
   * PATCH /api/v1/rooms/:id
   */
  async update(id: string, dto: UpdateFitSizeDto): Promise<{ data: FitSize; message: string }> {
    const payload: Record<string, any> = {};
    if (dto.name !== undefined) payload.name = dto.name.trim();
    if (dto.fitCode !== undefined) {
      payload.fitCode = dto.fitCode.toUpperCase().trim();
      payload.slug = dto.fitCode.toLowerCase().trim();
    }
    if (dto.displayOrder !== undefined) payload.displayOrder = Number(dto.displayOrder);
    if (dto.isActive !== undefined) payload.isActive = Boolean(dto.isActive);

    try {
      let response = await fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 404 || response.status === 405) {
        response = await fetch(`${API_BASE_URL}/fit-sizes/${encodeURIComponent(id)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to update.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const updatedItem = normalizeFitSize(json?.data || json);
      const stored = getStoredFitSizes().map((f) => (f.id === id || f.fitCode === id ? updatedItem : f));
      saveStoredFitSizes(stored);

      return { data: updatedItem, message: json?.message || 'Updated successfully' };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredFitSizes();
      const index = stored.findIndex((f) => f.id === id || f.fitCode === id);
      if (index === -1) {
        throw new Error(`Room with ID ${id} not found.`);
      }

      const updatedItem: FitSize = {
        ...stored[index],
        ...payload,
        updatedAt: new Date().toISOString(),
      };
      stored[index] = updatedItem;
      saveStoredFitSizes(stored);

      return { data: updatedItem, message: 'Updated successfully' };
    }
  },

  /**
   * DELETE /api/v1/rooms/:id
   */
  async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg = json?.message || 'Failed to delete room.';
        throw new Error(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
      }

      const stored = getStoredFitSizes().filter((f) => f.id !== id && f.fitCode !== id);
      saveStoredFitSizes(stored);

      return { message: json?.message || 'Deleted successfully' };
    } catch (error: any) {
      if (error?.message && !error.message.includes('fetch')) {
        throw error;
      }

      const stored = getStoredFitSizes().filter((f) => f.id !== id && f.fitCode !== id);
      saveStoredFitSizes(stored);

      return { message: 'Deleted successfully' };
    }
  },

  /**
   * Toggle active status
   */
  async toggleActive(id: string, currentStatus: boolean): Promise<{ data: FitSize; message: string }> {
    return this.update(id, { isActive: !currentStatus });
  },
};
