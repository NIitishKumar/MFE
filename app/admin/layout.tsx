import type { Metadata } from 'next';
import { AdminLayout } from '@/features/admin';

export const metadata: Metadata = {
  title: 'Adwika Master Console — Admin Portal',
  description: 'Adwika Studio and Catalog Master Management Portal',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

