import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8 text-xs sm:text-sm text-[#57534E] leading-relaxed">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8C827A]">
        <Link href="/" className="hover:text-[#1C1917] transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
        <span className="text-[#1C1917] font-semibold">Privacy Policy</span>
      </nav>

      <div className="border-b border-[#E8DFD3] pb-6">
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#8C827A] mt-1">Last revised: August 2026 &bull; Madhav Furnitures India Pvt. Ltd.</p>
      </div>

      <div className="space-y-6 bg-white p-8 rounded-3xl border border-[#EDE7DC]">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">1. Collection of Information</h2>
          <p>
            When you purchase furniture pieces, schedule a showroom walkthrough, or request an interior consultation, we collect necessary contact information (name, address, telephone number, PIN code, and payment identifiers) strictly for White-Glove delivery and artisan communication.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">2. Delivery Logistics &amp; Installation</h2>
          <p>
            Your shipping coordinates and delivery notes are shared only with our certified Madhav Furnitures White-Glove installation technicians for pre-call transit scheduling. We never sell, lease, or monetize client records to third-party marketing brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">3. Data Security</h2>
          <p>
            All electronic transactions and card processing are handled via PCI-DSS compliant gateways encrypted with 256-bit SSL protocols.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">4. Contact Us</h2>
          <p>
            For privacy inquiries or deletion requests, call our data officer at{' '}
            <a href="tel:+917500931934" className="text-[#443224] underline">+91 75 0093 1934</a>.
            {/* For privacy inquiries or deletion requests, email our data officer at <a href="mailto:privacy@madhavfurnitures.in" className="text-[#443224] underline">privacy@madhavfurnitures.in</a>. */}
          </p>
        </section>
      </div>
    </div>
  );
}
