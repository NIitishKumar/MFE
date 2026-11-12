'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Product,
  ProductBadge,
  ProductStatusFilter,
  ProductSortField,
} from '../../types/product.types';
import { ProductFormData } from '../../schemas/product.schema';
import { productService } from '../../services/product.service';
import {
  fetchCategories,
  fetchRooms,
  fetchCollections,
} from '@/services/api';
import { resolveUploadedImageUrl } from '../../utils/imageUploadHelper';
import { Category, Room, Collection } from '@/types';
import { ToastItem } from '../../components/common/AdminToast';

export function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<ProductStatusFilter>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [roomFilter, setRoomFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<ProductSortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Detail Modal States
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, message, title }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadDependencies = useCallback(async () => {
    try {
      const [cats, rms, cols] = await Promise.all([
        fetchCategories(),
        fetchRooms(),
        fetchCollections(),
      ]);
      setCategories(cats);
      setRooms(rms);
      setCollections(cols);
    } catch (e) {
      console.error('Failed to load dependencies', e);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await productService.getAll({ limit: 100 });
      setProducts(res.data);
      setIsLiveApi(res.fromApi);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to load products from server';
      showToast('error', msg, 'Load Error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const init = async () => {
      try {
        const res = await productService.getAll({ limit: 100 });
        if (active) {
          setProducts(res.data);
          setIsLiveApi(res.fromApi);
        }
      } catch (err: unknown) {
        if (active) {
          const msg =
            err instanceof Error ? err.message : 'Failed to load products from server';
          showToast('error', msg, 'Load Error');
        }
      } finally {
        if (active) setIsLoading(false);
      }
      await loadDependencies();
    };
    init();
    return () => {
      active = false;
    };
  }, [loadDependencies]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(query)) ||
          p.materials.some((m) => m.toLowerCase().includes(query));

        const matchesStatus =
          statusFilter === 'ALL' ||
          (statusFilter === 'IN_STOCK' && p.inStock) ||
          (statusFilter === 'OUT_OF_STOCK' && !p.inStock);

        const matchesCategory =
          categoryFilter === 'ALL' ||
          p.category.toLowerCase() === categoryFilter.toLowerCase();

        const matchesRoom =
          roomFilter === 'ALL' ||
          p.room.toLowerCase() === roomFilter.toLowerCase();

        return matchesQuery && matchesStatus && matchesCategory && matchesRoom;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortField === 'name') {
          comp = a.name.localeCompare(b.name);
        } else if (sortField === 'price') {
          comp = a.price - b.price;
        } else if (sortField === 'rating') {
          comp = a.rating - b.rating;
        } else if (sortField === 'category') {
          comp = a.category.localeCompare(b.category);
        } else if (sortField === 'createdAt') {
          comp = (a.createdAt || '').localeCompare(b.createdAt || '');
        }
        return sortDirection === 'asc' ? comp : -comp;
      });
  }, [products, searchQuery, statusFilter, categoryFilter, roomFilter, sortField, sortDirection]);

  // Handlers
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleOpenDetail = async (product: Product) => {
    setSelectedProductDetail(product);
    setIsDetailModalOpen(true);
    setIsLoadingDetail(true);
    setDetailError(null);

    try {
      const res = await productService.getById(product.id);
      setSelectedProductDetail(res.data);
    } catch {
      // Keep selectedProductDetail
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleFormSubmit = async (values: ProductFormData) => {
    try {
      const materials = (values.materialsString || '')
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);

      const resolvedSlug =
        values.slug?.trim() ||
        values.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

      const resolvedPrimaryImage = await resolveUploadedImageUrl({
        file: values.imageFile,
        existingUrl: values.primaryImage,
        folder: 'products',
        publicId: resolvedSlug || undefined,
      });

      const secondaryImages = editingProduct?.images?.slice(1) ?? [];
      const images = resolvedPrimaryImage
        ? [resolvedPrimaryImage, ...secondaryImages.filter((img) => img !== resolvedPrimaryImage)]
        : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc'];

      const matchedCategory = categories.find((c) => c.slug === values.category.trim());
      const matchedRoom = rooms.find((r) => r.slug === values.room.trim());
      const matchedCollection = collections.find(
        (c) => c.slug === (values.collectionSlug || '').trim(),
      );

      const payload = {
        name: values.name.trim(),
        slug: resolvedSlug,
        category: values.category.trim(),
        categoryLabel:
          values.categoryLabel?.trim() ||
          matchedCategory?.name ||
          values.category.charAt(0).toUpperCase() + values.category.slice(1),
        room: values.room.trim(),
        roomLabel:
          values.roomLabel?.trim() ||
          matchedRoom?.name ||
          values.room.charAt(0).toUpperCase() + values.room.slice(1),
        collectionSlug: values.collectionSlug?.trim() || undefined,
        collectionName:
          values.collectionName?.trim() || matchedCollection?.name || undefined,
        price: Number(values.price),
        originalPrice: values.originalPrice ? Number(values.originalPrice) : undefined,
        discountPercentage: values.discountPercentage ? Number(values.discountPercentage) : undefined,
        rating: Number(values.rating ?? 5),
        reviewCount: Number(values.reviewCount ?? 0),
        shortDescription: values.shortDescription?.trim() || '',
        fullDescription: values.fullDescription?.trim() || '',
        materials: materials.length > 0 ? materials : ['Architectural Grade Timber'],
        dimensions: {
          width: values.width.trim(),
          depth: values.depth.trim(),
          height: values.height.trim(),
          seatHeight: values.seatHeight?.trim(),
          weight: values.weight?.trim(),
        },
        images,
        inStock: values.inStock,
        badges: values.badges as ProductBadge[],
        careInstructions: values.careInstructions?.trim(),
        warranty: values.warranty?.trim(),
        leadTime: values.leadTime?.trim(),
      };

      if (editingProduct) {
        const res = await productService.update(editingProduct.id, payload);
        setProducts((prev) => prev.map((p) => (p.id === res.data.id ? res.data : p)));
        showToast('success', res.message || `Product "${res.data.name}" updated successfully`, 'Updated');
      } else {
        const res = await productService.create(payload);
        setProducts((prev) => [res.data, ...prev]);
        showToast('success', res.message || `Product "${res.data.name}" created successfully`, 'Created');
      }

      setIsFormModalOpen(false);
      setEditingProduct(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save product';
      showToast('error', msg, 'Server Error');
      throw err;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      const res = await productService.delete(deletingProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      showToast('success', res.message || `Deleted "${deletingProduct.name}" successfully`, 'Deleted');
      setIsDeleteModalOpen(false);
      setDeletingProduct(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete product';
      showToast('error', msg, 'Error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    const current = products.find((p) => p.id === id);
    if (!current) return;

    try {
      const res = await productService.toggleStatus(id, current.inStock);
      setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      showToast('success', `"${res.data.name}" is now ${res.data.inStock ? 'In Stock' : 'Out of Stock'}.`, 'Stock Status');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to toggle stock status';
      showToast('error', msg, 'Error');
    }
  };

  // Stats
  const totalCount = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = totalCount - inStockCount;

  return {
    products,
    categories,
    rooms,
    collections,
    filteredProducts,
    isLoading,
    isLiveApi,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    roomFilter,
    setRoomFilter,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    totalCount,
    inStockCount,
    outOfStockCount,
    isFormModalOpen,
    setIsFormModalOpen,
    editingProduct,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deletingProduct,
    isDeleting,
    isDetailModalOpen,
    setIsDetailModalOpen,
    selectedProductDetail,
    isLoadingDetail,
    detailError,
    toasts,
    dismissToast,
    loadProducts,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenDetail,
    handleFormSubmit,
    handleDeleteConfirm,
    handleToggleStatus,
  };
}
