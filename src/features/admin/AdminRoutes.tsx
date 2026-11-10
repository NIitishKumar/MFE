'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminLayout } from './AdminLayout';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ProductCategoryPage } from './pages/product-category';
import { ProductSubCategoryPage } from './pages/product-sub-category';
import { ProductPage } from './pages/product';
import { ProductAttributePage } from './pages/product-attribute';
import { ProductImagePage } from './pages/product-image';
import { ProductVariantPage } from './pages/product-variant';
import { FitSizePage } from './pages/fit-size';
import { ProductColorListPage } from './pages/ProductColorListPage';

export const AdminRoutes: React.FC = () => {
  const pathname = usePathname() || '';

  const renderContent = () => {
    if (pathname === '/admin/products') return <ProductPage />;
    if (pathname === '/admin/product-variants') return <ProductVariantPage />;
    if (pathname === '/admin/product-images') return <ProductImagePage />;
    if (pathname === '/admin/product-attributes') return <ProductAttributePage />;
    if (pathname === '/admin/product-categories') return <ProductCategoryPage />;
    if (pathname === '/admin/product-sub-categories') return <ProductSubCategoryPage />;
    if (pathname === '/admin/fit-sizes') return <FitSizePage />;
    if (pathname === '/admin/product-colors') return <ProductColorListPage />;
    return <AdminDashboardPage />;
  };

  return <AdminLayout>{renderContent()}</AdminLayout>;
};
