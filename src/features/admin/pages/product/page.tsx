'use client';

import React from 'react';
import {
  Plus,
  Search,
  Layers,
  SlidersHorizontal,
  RefreshCw,
} from 'lucide-react';
import {
  ProductStatusFilter,
  ProductSortField,
} from '../../types/product.types';
import {
  ProductTable,
  ProductModal,
  DeleteProductModal,
  ProductDetailModal,
} from './components';
import { AdminToastContainer } from '../../components/common/AdminToast';
import { useProduct } from './useProduct';

export const ProductPage: React.FC = () => {
  const {
    filteredProducts,
    categories,
    rooms,
    collections,
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
  } = useProduct();

  return (
    <div className="space-y-6">
      {/* Toast notifications */}
      <AdminToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Page Title & Add Button Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#26221f]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-[#29221b] text-[#c9a87c] border border-[#4d3a2b]">
              <Layers size={14} />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#c9a87c]">
              Catalog Master
            </span>
            {isLiveApi && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-700/60 text-[10px] font-mono uppercase text-emerald-300 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live API Connected
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-normal tracking-tight">
            Furniture Pieces Catalogue
          </h1>
          <p className="text-xs text-neutral-400 font-sans mt-1 max-w-xl">
            Configure architectural silhouettes, material compositions, pricing, dimensions, and live inventory.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadProducts}
            className="p-2.5 text-neutral-400 hover:text-white bg-[#191715] hover:bg-[#24201c] border border-[#332e29] rounded transition-colors"
            title="Refresh Products from API"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-[#54382c] hover:bg-[#3e271d] text-white rounded text-xs uppercase tracking-widest font-sans font-medium transition-all duration-150 flex items-center gap-2 shadow-sm"
          >
            <Plus size={15} />
            <span>Add Piece</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[#141414] border border-[#2b2723]">
          <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500 block mb-1">
            Total Catalogue Pieces
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl text-neutral-100">{totalCount}</span>
            <span className="text-[11px] text-neutral-400 font-sans">registered models</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#141414] border border-[#2b2723]">
          <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-500/80 block mb-1">
            In-Stock Storefront Items
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl text-emerald-400">{inStockCount}</span>
            <span className="text-[11px] text-neutral-400 font-sans">immediate dispatch</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#141414] border border-[#2b2723]">
          <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500 block mb-1">
            Crafted To Order / Out of Stock
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl text-neutral-400">{outOfStockCount}</span>
            <span className="text-[11px] text-neutral-500 font-sans">lead-time required</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-lg bg-[#141414] border border-[#2b2723] space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by piece name, materials, category (e.g. Bouclé, Travertine, Sofa)..."
              className="w-full bg-[#1b1917] border border-[#332e29] focus:border-[#c9a87c] rounded pl-10 pr-4 py-2 text-xs text-neutral-200 placeholder:text-neutral-500 outline-none transition-colors"
            />
          </div>

          {/* Quick Selectors & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-[#1b1917] border border-[#332e29] rounded px-3 py-1.5 text-xs text-neutral-300">
              <span className="text-neutral-500 text-[11px] font-mono">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent text-xs text-neutral-200 outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-[#1b1917]">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-[#1b1917]">{c.name}</option>
                ))}
              </select>
            </div>

            {/* Room Filter */}
            <div className="flex items-center gap-1.5 bg-[#1b1917] border border-[#332e29] rounded px-3 py-1.5 text-xs text-neutral-300">
              <span className="text-neutral-500 text-[11px] font-mono">Room:</span>
              <select
                value={roomFilter}
                onChange={(e) => setRoomFilter(e.target.value)}
                className="bg-transparent text-xs text-neutral-200 outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-[#1b1917]">All Rooms</option>
                {rooms.map((r) => (
                  <option key={r.slug} value={r.slug} className="bg-[#1b1917]">{r.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="inline-flex rounded border border-[#332e29] p-0.5 bg-[#171513]">
              {(['ALL', 'IN_STOCK', 'OUT_OF_STOCK'] as ProductStatusFilter[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-colors ${
                    statusFilter === status
                      ? 'bg-[#29221b] text-[#e0cfba] font-medium border border-[#4d3a2b]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {status === 'ALL' ? 'ALL' : status === 'IN_STOCK' ? 'In Stock' : 'Pre-order'}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-[#1b1917] border border-[#332e29] rounded px-3 py-1.5 text-xs text-neutral-300">
              <SlidersHorizontal size={13} className="text-[#c9a87c]" />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as ProductSortField)}
                className="bg-transparent text-xs text-neutral-200 outline-none cursor-pointer"
              >
                <option value="createdAt" className="bg-[#1b1917]">Recently Added</option>
                <option value="name" className="bg-[#1b1917]">Name</option>
                <option value="price" className="bg-[#1b1917]">Price</option>
                <option value="rating" className="bg-[#1b1917]">Rating</option>
              </select>
              <button
                type="button"
                onClick={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}
                className="text-[10px] font-mono uppercase text-[#c9a87c] px-1 hover:text-white"
              >
                {sortDirection}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <ProductTable
        products={filteredProducts}
        onViewDetail={handleOpenDetail}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
      />

      {/* Create / Edit Modal */}
      <ProductModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
        categories={categories}
        rooms={rooms}
        collections={collections}
      />

      {/* Detail Modal */}
      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProductDetail}
        isLoading={isLoadingDetail}
        error={detailError}
        onEdit={handleOpenEdit}
      />

      {/* Delete Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        product={deletingProduct}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ProductPage;
