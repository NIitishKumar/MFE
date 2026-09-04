import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { AnnouncementBar } from '@/components/ui/AnnouncementBar';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { MobileBottomNav } from '@/components/ui/MobileBottomNav';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { SearchOverlay } from '@/components/ui/SearchOverlay';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { PWAInstallBanner } from '@/components/ui/PWAInstallBanner';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MADHAV FURNITURES — Premium Furniture Showroom & Studio',
  description:
    'Thoughtfully designed architectural furniture crafted for modern living. Explore hand-honed travertine dining tables, curved bouclé sofas, solid oak beds, and schedule appointments at our Bengaluru & Mumbai showrooms.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Madhav Furnitures',
  },
  keywords: [
    'luxury furniture showroom',
    'curved boucle sofa',
    'travertine dining table',
    'solid oak bed',
    'bengaluru furniture showroom',
    'mumbai furniture studio',
    'interior consultation india'
  ]
};

export const viewport: Viewport = {
  themeColor: '#FDFBF7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#FDFBF7] text-[#1C1917] flex flex-col min-h-screen">
        <StoreProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
          <CartDrawer />
          <SearchOverlay />
          <ToastContainer />
          <PWAInstallBanner />
        </StoreProvider>
      </body>
    </html>
  );
}
