import type { Metadata } from 'next';
import { AdminLayout } from '@/features/admin';
import { buildNoIndexMetadata } from '@/lib/seo';

export const metadata: Metadata = buildNoIndexMetadata(
  'Madhav Master Console — Admin Portal',
  'Madhav Furnitures Studio and Catalog Master Management Portal',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

