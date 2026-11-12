import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Leaf, Users } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  SITE_NAME,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Us — Heritage, Craftsmanship & Architecture',
  description:
    'Discover the philosophy and artisan joinery behind Madhav Furnitures — solid timber furniture, sustainable forestry, natural stone craftsmanship, and bespoke design in India.',
  path: '/about',
  keywords: [
    'Madhav Furnitures story',
    'solid wood joinery India',
    'handcrafted furniture atelier',
    SITE_NAME,
  ],
});

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ])}
      />
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-[#241E1A] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=2000&q=85"
            alt="Artisan joinery studio"
            className="w-full h-full object-cover brightness-[0.38]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Our Heritage &amp; Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl font-light tracking-tight max-w-3xl text-white">
            Architecture at the human scale.
          </h1>
          <p className="text-xs sm:text-base text-[#DDD3C5] font-light leading-relaxed max-w-xl">
            Madhav Furnitures was founded on a simple thesis: furniture is not disposable decor. It is the silent architectural foundation of family memory, tactile peace, and daily living.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal leading-tight">
              Rejecting the ephemeral. Reclaiming generational joinery.
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              In an era dominated by flatpack fast-furniture designed to fail after two monsoons, Madhav Furnitures returned to first principles. We work exclusively with certified sustainably harvested American hardwoods, Roman travertine, and master artisans whose lineage spans generations of wood-turning and stone-carving.
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Every curve is calculated with ergonomic restraint. Our seated heights are deliberately lower, creating an expansive illusion of spatial volume under standard 10-foot Indian apartment ceilings.
            </p>
          </div>

          <div className="lg:col-span-6 aspect-4/3 rounded-3xl overflow-hidden bg-[#F5F1E8] border border-[#E8DFD3] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85"
              alt="Artisan woodcarver working on timber joint"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
            Core Commitments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
            Our Craft Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-[#EDE7DC] space-y-3 shadow-xs">
            <Leaf className="w-6 h-6 text-[#2D3E33]" />
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Sustainably Cultivated</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              100% of our White Oak, American Walnut, and Ash is sourced from FSC-managed regenerative temperate forests.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#EDE7DC] space-y-3 shadow-xs">
            <HeartHandshake className="w-6 h-6 text-[#443224]" />
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Artisan Fair Practice</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              We employ over 60 multi-generational joiners, stone carvers, and textile tailors across Karnataka and Rajasthan.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#EDE7DC] space-y-3 shadow-xs">
            <ShieldCheck className="w-6 h-6 text-[#BA5D40]" />
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Non-Toxic Living</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Zero-formaldehyde glues, organic hardwax plant oils, and hypo-allergenic feather down cores for clean indoor air.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#EDE7DC] space-y-3 shadow-xs">
            <Users className="w-6 h-6 text-[#B89758]" />
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Lifetime Service</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Complimentary annual timber inspections, hardware tightening, and in-home upholstery care across major Indian cities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F5F0E6] p-8 sm:p-14 border border-[#E8DFD3] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
              Visit our Flagship Sanctuaries
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C]">
              Experience our tactile material library in Bengaluru (Indiranagar) or Mumbai (Worli).
            </p>
          </div>
          <Link
            href="/showroom"
            className="bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-4 px-8 rounded-xl shadow-md transition flex items-center gap-2 shrink-0"
          >
            <span>Book Showroom Walkthrough</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
