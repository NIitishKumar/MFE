'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Car,
  Sparkles,
  Calendar,
  Users,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { SHOWROOMS, ShowroomLocation } from '@/data/showroom';
import { useStore } from '@/context/StoreContext';

export default function ShowroomPage() {
  const { addToast } = useStore();
  const [selectedShowroom, setSelectedShowroom] = useState<ShowroomLocation>(SHOWROOMS[0]);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingLocation, setBookingLocation] = useState(SHOWROOMS[0].city);
  const [guestName, setGuestName] = useState('Aditya Sharma');
  const [guestEmail, setGuestEmail] = useState('aditya.sharma@example.in');
  const [guestPhone, setGuestPhone] = useState('+91 98450 12345');
  const [bookingDate, setBookingDate] = useState('2026-09-08');
  const [bookingTime, setBookingTime] = useState('11:30 AM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    addToast('Showroom visit reserved. An invitation card has been sent to your WhatsApp.', 'success');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center bg-[#241E1A] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Madhav Furnitures Showroom Gallery"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sanctuaries in Bengaluru &amp; Mumbai</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight max-w-3xl text-white">
            Experience furniture in person.
          </h1>

          <p className="text-base sm:text-lg text-[#EDE5DA] font-light leading-relaxed max-w-xl">
            Step away from digital screens. Run your palms across hand-planed timber grains, test the natural spring of goose down cushions, and discover spatial harmony.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setBookingConfirmed(false);
                setIsBookingOpen(true);
              }}
              className="bg-[#FDFBF7] hover:bg-white text-[#1C1917] font-semibold text-xs py-4 px-8 rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#443224]" />
              <span>Book a Private Showroom Walkthrough</span>
            </button>
          </div>
        </div>
      </section>

      {/* Showrooms Selector Tabs & Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-center gap-3 border-b border-[#E8DFD3] pb-4">
          {SHOWROOMS.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setSelectedShowroom(loc)}
              className={`pb-2 px-6 text-sm sm:text-base font-serif transition cursor-pointer relative ${
                selectedShowroom.id === loc.id
                  ? 'text-[#1C1917] font-bold'
                  : 'text-[#8C827A] hover:text-[#1C1917]'
              }`}
            >
              {loc.city} &mdash; {loc.neighborhood}
              {selectedShowroom.id === loc.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#443224]" />
              )}
            </button>
          ))}
        </div>

        {/* Selected Showroom Detailed Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Gallery & Visual (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-16/10 rounded-3xl overflow-hidden bg-[#F5F1E8] border border-[#E8DFD3] shadow-md">
              <img
                src={selectedShowroom.heroImage}
                alt={selectedShowroom.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {selectedShowroom.gallery.slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  className="aspect-4/3 rounded-2xl overflow-hidden bg-[#F5F1E8] border border-[#E8DFD3]"
                >
                  <img
                    src={img}
                    alt={`${selectedShowroom.name} interior angle ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Simulated Interactive Map Card */}
            <div className="p-6 rounded-2xl bg-[#F5F0E6] border border-[#E8DFD3] space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1C1917]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#BA5D40]" /> Coordinates: {selectedShowroom.coordinates.lat}° N, {selectedShowroom.coordinates.lng}° E
                </span>
                <span className="text-[11px] text-[#2D3E33] bg-[#E5EFE7] px-2 py-0.5 rounded-md">
                  Live Navigation
                </span>
              </div>
              <div className="h-40 rounded-xl overflow-hidden relative bg-[#EBE5DA] flex items-center justify-center text-center p-4 border border-[#DDD3C2]">
                <div className="space-y-1">
                  <p className="font-serif text-sm font-semibold text-[#1C1917]">
                    Google Maps Directional Guide
                  </p>
                  <p className="text-[11px] text-[#78716C] max-w-xs">
                    {selectedShowroom.address}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedShowroom.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-xs font-semibold text-[#443224] underline hover:text-[#1C1917]"
                  >
                    Open in Google Maps App &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info & Amenities (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE7DC] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#A39B8F]">
                Flagship Sanctuary
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] mt-1">
                {selectedShowroom.name}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#57534E]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#443224] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1C1917] block">Address:</strong>
                  <span>{selectedShowroom.address} — {selectedShowroom.pincode}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#443224] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1C1917] block">Showroom Hours:</strong>
                  <p>{selectedShowroom.hours.weekdays}</p>
                  <p className="text-[#8C827A]">{selectedShowroom.hours.weekends}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-4 h-4 text-[#443224] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1C1917] block">Parking &amp; Valet:</strong>
                  <span>{selectedShowroom.parking}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#443224] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1C1917] block">Concierge Telephone:</strong>
                  <a href={`tel:${selectedShowroom.phone}`} className="hover:underline text-[#1C1917]">
                    {selectedShowroom.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#443224] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1C1917] block">Direct Studio Inquiries:</strong>
                  <a href={`mailto:${selectedShowroom.email}`} className="hover:underline text-[#1C1917]">
                    {selectedShowroom.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Amenities Library */}
            <div className="pt-4 border-t border-[#F2ECE1] space-y-3">
              <h3 className="font-serif text-sm font-semibold text-[#1C1917] uppercase tracking-wider">
                Sanctuary Amenities
              </h3>
              <ul className="space-y-2 text-xs text-[#57534E]">
                {selectedShowroom.amenities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D3E33] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Trigger Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setBookingLocation(selectedShowroom.city);
                  setBookingConfirmed(false);
                  setIsBookingOpen(true);
                }}
                className="w-full bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-4 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Visit to {selectedShowroom.city}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8DFD3] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD3]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A39B8F]">
                  VIP Reservation
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                  Book Showroom Walkthrough
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(false)}
                className="text-[#8C827A] hover:text-[#1C1917] p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-4 animate-in zoom-in">
                <div className="w-16 h-16 rounded-full bg-[#EBF3ED] text-[#2D3E33] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-semibold text-[#1C1917]">
                    Walkthrough Reserved!
                  </h4>
                  <p className="text-xs text-[#78716C] max-w-sm mx-auto leading-relaxed">
                    We look forward to welcoming you to our {bookingLocation} sanctuary on{' '}
                    <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>. A barista and design concierge will be assigned to your party.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="bg-[#2C241E] text-white text-xs font-semibold py-3 px-6 rounded-xl"
                >
                  Close &amp; Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookVisit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#57534E] font-medium mb-1">Select Sanctuary *</label>
                  <select
                    value={bookingLocation}
                    onChange={(e) => setBookingLocation(e.target.value)}
                    className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                  >
                    <option value="Bengaluru">Bengaluru &mdash; Indiranagar (HAL 100ft)</option>
                    <option value="Mumbai">Mumbai &mdash; Worli / Lower Parel</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#57534E] font-medium mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#57534E] font-medium mb-1">Preferred Slot *</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                    >
                      <option value="11:30 AM">11:30 AM &mdash; Morning Light</option>
                      <option value="02:30 PM">02:30 PM &mdash; Afternoon Quiet</option>
                      <option value="05:30 PM">05:30 PM &mdash; Evening Ambient</option>
                      <option value="07:00 PM">07:00 PM &mdash; Late Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#57534E] font-medium mb-1">Guest Name *</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#57534E] font-medium mb-1">Party Size (Guests)</label>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#57534E] font-medium mb-1">Mobile (+91) *</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#57534E] font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-white border border-[#D5C9B8] rounded-xl px-3 py-2.5"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2C241E] hover:bg-[#1C1917] text-white text-xs font-semibold py-3.5 rounded-xl shadow-md transition cursor-pointer"
                >
                  Confirm Showroom Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
