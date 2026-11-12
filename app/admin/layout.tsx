import type { Metadata } from 'next';
import { AdminLayout } from '@/features/admin';

export const metadata: Metadata = {
  title: 'Madhav Master Console — Admin Portal',
  description: 'Madhav Furnitures Studio and Catalog Master Management Portal',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

