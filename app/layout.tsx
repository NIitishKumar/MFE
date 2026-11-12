import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { StorefrontChrome } from '@/components/ui/StorefrontChrome';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
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
          <StorefrontChrome>{children}</StorefrontChrome>
          <WhatsAppButton />
        </StoreProvider>
      </body>
    </html>
  );
}
