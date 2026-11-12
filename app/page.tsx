import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, MapPin, Star, ShieldCheck, HeartHandshake, Compass, CheckCircle2 } from 'lucide-react';
import {
  fetchNewArrivalProducts,
  fetchBestSellerProducts,
  fetchCategories,
  fetchCollections,
  fetchRooms,
} from '@/services/api';
import { FeaturedCategories } from '@/features/featured-categories';
import { NewArrivals } from '@/features/new-arrivals';
import { BestSellers } from '@/features/best-sellers';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [newArrivalsData, bestSellersData, categories, collections, rooms] = await Promise.all([
    fetchNewArrivalProducts({ limit: 4, page: 1 }),
    fetchBestSellerProducts({ limit: 4, page: 1 }),
    fetchCategories(),
    fetchCollections(),
    fetchRooms(),
  ]);

  const testimonials = [
    {
      name: 'Dr. Avantika Menon',
      location: 'Koramangala, Bengaluru',
      role: 'Architect & Homeowner',
      rating: 5,
      review:
        'The Brutalist Travertine Table is nothing short of a museum piece in our dining room. The weight, honed surface, and white-glove installation crew were phenomenal.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Karan & Rhea Mehra',
      location: 'Bandra West, Mumbai',
      role: 'Interior Enthusiasts',
      rating: 5,
      review:
        'We ordered the Sorrento Bouclé Sofa after trying it at the Worli studio. It has survived two dogs and dinner parties without losing an ounce of shape or texture. Pure understated luxury.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Samir Singhania',
      location: 'Jubilee Hills, Hyderabad',
      role: 'Founder',
      rating: 5,
      review:
        'Finding solid American walnut joinery in India with this level of Japanese minimalism seemed impossible until Madhav Furnitures. The Nara Bed transformed our master suite completely.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <div className="flex flex-col space-y-16 sm:space-y-24 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-[#F5F0E6] overflow-hidden">
        {/* Background Editorial Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
            alt="Warm architectural living room with bouclé sofa and travertine table"
            className="w-full h-full object-cover object-center brightness-[0.88] scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Warm Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent sm:w-2/3" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
          <div className="max-w-2xl text-white space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs uppercase tracking-widest text-[#FDFBF7]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Architectural Furniture &bull; 2026 Collection</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
              Furniture that makes space feel like home.
            </h1>

            <p className="text-base sm:text-lg text-[#EDE5DA] font-light leading-relaxed max-w-xl">
              Thoughtfully designed pieces crafted for modern living. Sculpted from solid American hardwoods, Italian travertine, and tactile Belgian linens.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/shop"
                className="bg-[#FDFBF7] hover:bg-white text-[#1C1917] font-semibold text-sm px-8 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="https://maps.app.goo.gl/gGGeaJoxR5SY6zx9A"
                target='_blank'
                className="bg-black/30 hover:bg-black/50 text-white border border-white/30 backdrop-blur-md text-sm font-medium px-8 py-4 rounded-xl transition flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Visit Our Showroom</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            {/* <div className="pt-8 border-t border-white/20 grid grid-cols-3 gap-6 text-xs text-[#E5DDD2]">
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-white">100%</span>
                <span>Solid Timber &amp; Stone</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-white">15-Yr</span>
                <span>Artisan Warranty</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-white">White-Glove</span>
                <span>In-Home Assembly</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <FeaturedCategories initialCategories={categories} />

      {/* 3. NEW ARRIVALS */}
      <NewArrivals
        initialData={newArrivalsData}
        initialCategories={categories}
      />

      {/* 4. EDITORIAL BANNER (Split Layout) */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#241E1A] rounded-3xl overflow-hidden text-white grid grid-cols-1 lg:grid-cols-12 border border-[#382F28] shadow-xl">
          <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
              alt="Artisan crafted travertine furniture in serene interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#241E1A]/60 hidden lg:block" />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Slow Furniture Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              Designed for everyday living.
            </h2>
            <p className="text-sm text-[#BFB3A4] font-light leading-relaxed">
              We reject fleeting micro-trends. Every curve, mortise joint, and linen weave is calculated to endure decades of family dinners, quiet Sunday mornings, and celebratory reunions.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#1C1917] font-semibold text-xs py-3.5 px-6 rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/consultation"
                className="border border-[#7A6C5D] hover:border-white text-white text-xs font-semibold py-3.5 px-6 rounded-xl transition"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* 5. BEST SELLERS */}
      <BestSellers
        initialData={bestSellersData}
        initialCategories={categories}
      />

      {/* 5.5 CURATED DESIGN COLLECTIONS */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
              Design Studies
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-normal mt-1">
              Curated Collections
            </h2>
            <p className="text-xs text-[#78716C] mt-1">
              Holistic interior narratives sculpted around singular architectural materials and moods.
            </p>
          </div>
          <Link
            href="/collections"
            className="text-xs uppercase tracking-wider font-semibold text-[#443224] hover:text-[#1C1917] flex items-center gap-1 mt-2 sm:mt-0 transition group"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.slice(0, 4).map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-4/5 bg-[#2C241E] border border-[#3E332A] transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={col.heroImage}
                alt={col.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block mb-1">
                  {col.productsCount} Pieces
                </span>
                <h3 className="font-serif text-xl font-medium">{col.name}</h3>
                <p className="text-xs text-[#DDD3C5] mt-1 line-clamp-1 italic font-light">
                  &ldquo;{col.tagline}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold group-hover:translate-x-1 transition">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section> */}

      {/* 6. SHOP BY ROOM */}
      {/* <section className="bg-[#F5F0E6] py-16 sm:py-20 border-y border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
              Spatial Cohesion
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
              Shop by Room
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-2">
              Transform each corner of your residence into a calm, interconnected sensory haven.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {rooms.map((room) => (
              <Link
                key={room.id}
                href={`/shop?room=${room.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-3/4 bg-[#EBE5DA] border border-[#DDD3C2] transition-all duration-300 hover:shadow-lg"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-serif text-lg font-medium">{room.name}</h3>
                  <p className="text-[11px] text-[#D8CFBF] mt-1 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#D4AF37] font-semibold mt-3 group-hover:translate-x-1 transition">
                    <span>Explore Space</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* 7. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
            The Aura Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
            Why Discerning Homes Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#EDE7DC] space-y-3.5 hover:border-[#C5A059]/50 transition">
            <div className="w-12 h-12 rounded-xl bg-[#F5F0E6] flex items-center justify-center text-[#443224]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Crafted with Care</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Every mortise and tenon joint is hand-inspected by master artisans. No staple guns or hollow chipboard.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#EDE7DC] space-y-3.5 hover:border-[#C5A059]/50 transition">
            <div className="w-12 h-12 rounded-xl bg-[#F5F0E6] flex items-center justify-center text-[#443224]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Premium Materials</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Sustainably cultivated American Oak, Italian Roman Travertine, and Grade-A non-toxic organic oil finishes.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#EDE7DC] space-y-3.5 hover:border-[#C5A059]/50 transition">
            <div className="w-12 h-12 rounded-xl bg-[#F5F0E6] flex items-center justify-center text-[#443224]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Thoughtful Proportions</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Sculpted with ergonomic seated depths and balanced low-slung heights that make rooms feel twice as spacious.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#EDE7DC] space-y-3.5 hover:border-[#C5A059]/50 transition">
            <div className="w-12 h-12 rounded-xl bg-[#F5F0E6] flex items-center justify-center text-[#443224]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Reliable White-Glove</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Complimentary on orders above ₹50,000. In-room positioning, full assembly, and packaging recycling.
            </p>
          </div>
        </div>
      </section>

      {/* 8. SHOWROOM EXPERIENCE CTA */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-[#241E1A] text-white p-8 sm:p-14 lg:p-20 border border-[#3D332B] shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
              alt="Madhav Furnitures Showroom Gallery"
              className="w-full h-full object-cover brightness-[0.35]"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Bengaluru &bull; Mumbai Showroom Sanctuaries
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-tight">
              See it. Sit in it. Feel the difference.
            </h2>

            <p className="text-sm sm:text-base text-[#D8CFBF] font-light leading-relaxed">
              True luxury must be felt in person. Run your hands over our honed travertine stone, test the ergonomic pitch of our feather-cushioned loungers, and meet with an interior specialist.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/showroom"
                className="bg-[#FDFBF7] hover:bg-white text-[#1C1917] font-semibold text-xs py-4 px-8 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>Book a Showroom Visit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/consultation"
                className="border border-[#BFB3A4] hover:border-white text-white text-xs font-semibold py-4 px-8 rounded-xl transition text-center"
              >
                Request 1:1 Interior Consultation
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* 9. TESTIMONIALS */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C827A]">
            Verified Homeowners
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
            Voices of Living with Madhav Furnitures
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#EDE7DC] flex flex-col justify-between space-y-6 shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#B89758] fill-[#B89758]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#443E38] font-light leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#F5EFE6]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E8DFD3]"
                />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#1C1917]">{t.name}</h4>
                  <p className="text-[11px] text-[#8C827A]">{t.location} &bull; {t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
