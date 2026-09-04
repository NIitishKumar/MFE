import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8 text-xs sm:text-sm text-[#57534E] leading-relaxed">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">Terms &amp; Conditions</span>
      </nav>

      <div className="border-b border-[#E8DFD3] pb-6">
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-[#8C827A] mt-1">Effective: August 2026 &bull; Madhav Furnitures</p>
      </div>

      <div className="space-y-6 bg-white p-8 rounded-3xl border border-[#EDE7DC]">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">1. Natural Materials &amp; Variances</h2>
          <p>
            Because our furniture utilizes 100% authentic geological stones (such as Italian Roman Travertine and Calacatta Viola Marble) and solid North American timber, natural variances in vein pattern, tonal crystallization, wood knots, and organic grain are intentional markers of authenticity and not manufacturing defects.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">2. White-Glove In-Home Installation</h2>
          <p>
            Complimentary White-Glove delivery applies to all Indian orders above ₹50,000. Customers are responsible for verifying that doorways, service elevators, and stairwells accommodate the crated package dimensions specified on each product detail page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">3. Warranty Coverage</h2>
          <p>
            Solid timber joinery and natural stone structures carry a 10 to 15-year guarantee against structural failure under normal residential indoor use. Upholstery fabrics carry a 3-year warranty against seam unraveling and core collapse.
          </p>
        </section>
      </div>
    </div>
  );
}
