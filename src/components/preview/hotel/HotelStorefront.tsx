'use client';

/**
 * HotelStorefront
 * ----------------
 * Self-contained hotel / resort template with a room-booking flow.
 * Kept fully separate from other niche templates (restaurant, gym, etc.)
 * so its logic and markup never mix with theirs.
 *
 * Sections: hero, room listings, booking summary/checkout, amenities.
 * All state is local — no backend required to preview.
 */

import { useMemo, useState } from 'react';

export interface HotelRoom {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  size: string;
  image: string;
  perks: string[];
}

export const HOTEL_ROOMS: HotelRoom[] = [
  {
    id: 'deluxe-king',
    name: 'Deluxe King Room',
    type: 'Deluxe',
    price: 4200,
    capacity: 2,
    size: '32 m²',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&auto=format&fit=crop&q=80',
    perks: ['King bed', 'City view', 'Free WiFi', 'Breakfast'],
  },
  {
    id: 'twin-standard',
    name: 'Standard Twin Room',
    type: 'Standard',
    price: 3100,
    capacity: 2,
    size: '26 m²',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&auto=format&fit=crop&q=80',
    perks: ['Two beds', 'Work desk', 'Free WiFi'],
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    type: 'Suite',
    price: 7800,
    capacity: 3,
    size: '52 m²',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&auto=format&fit=crop&q=80',
    perks: ['Living area', 'Ocean view', 'Lounge access', 'Breakfast'],
  },
  {
    id: 'family-suite',
    name: 'Family Garden Suite',
    type: 'Suite',
    price: 6400,
    capacity: 4,
    size: '48 m²',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&auto=format&fit=crop&q=80',
    perks: ['Two rooms', 'Garden view', 'Kids welcome', 'Breakfast'],
  },
  {
    id: 'presidential',
    name: 'Presidential Villa',
    type: 'Villa',
    price: 15200,
    capacity: 5,
    size: '120 m²',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&auto=format&fit=crop&q=80',
    perks: ['Private pool', 'Butler service', 'Panoramic view', 'All meals'],
  },
  {
    id: 'cozy-single',
    name: 'Cozy Single Room',
    type: 'Standard',
    price: 2200,
    capacity: 1,
    size: '18 m²',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&auto=format&fit=crop&q=80',
    perks: ['Queen bed', 'Free WiFi', 'City view'],
  },
];

const ROOM_TYPES = ['All', 'Standard', 'Deluxe', 'Suite', 'Villa'];

const AMENITIES = [
  { icon: '🏊', label: 'Infinity pool' },
  { icon: '🍽️', label: 'Fine dining' },
  { icon: '💆', label: 'Spa & wellness' },
  { icon: '🅿️', label: 'Free parking' },
  { icon: '📶', label: 'High-speed WiFi' },
  { icon: '🏋️', label: 'Fitness center' },
];

interface HotelStorefrontProps {
  hotelName?: string;
  tagline?: string;
  accent?: string;
}

export default function HotelStorefront({
  hotelName = 'Azure Bay Hotel & Resort',
  tagline = 'Where every stay feels like a getaway.',
  accent = '#0ea5e9',
}: HotelStorefrontProps) {
  const [activeType, setActiveType] = useState('All');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [booked, setBooked] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000;
    return diff > 0 ? Math.round(diff) : 0;
  }, [checkIn, checkOut]);

  const filteredRooms = useMemo(
    () => (activeType === 'All' ? HOTEL_ROOMS : HOTEL_ROOMS.filter((r) => r.type === activeType)),
    [activeType]
  );

  const total = selectedRoom ? selectedRoom.price * (nights || 1) : 0;
  const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl text-white flex items-center justify-center text-lg" style={{ background: accent }}>
              🏨
            </span>
            <span className="font-bold text-lg tracking-tight">{hotelName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-600">
            <a href="#rooms" className="hover:text-slate-900 transition">Rooms</a>
            <a href="#amenities" className="hover:text-slate-900 transition">Amenities</a>
            <a href="#booking" className="hover:text-slate-900 transition">Book</a>
          </nav>
          <a href="#booking" className="px-4 py-2 rounded-xl text-white text-sm font-medium transition hover:opacity-90" style={{ background: accent }}>
            Book a room
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop&q=80"
          alt="Hotel exterior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/35 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-12 text-white">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">Luxury stays · Beachfront</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 max-w-2xl">{tagline}</h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-white/85">
            <span>⭐ 4.9 · 3,200+ reviews</span>
            <span>· Goa, India</span>
          </div>
        </div>
      </section>

      {/* Booking search bar */}
      <section id="booking" className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="flex flex-col">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">Check-in</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-500" />
          </div>
          <div className="flex flex-col">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">Check-out</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-500" />
          </div>
          <div className="flex flex-col">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">Guests</label>
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-500 bg-white">
              {[1, 2, 3, 4, 5].map((g) => (
                <option key={g} value={g}>{g} {g === 1 ? 'guest' : 'guests'}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <a href="#rooms" className="w-full text-center py-2.5 rounded-lg text-white text-sm font-medium transition hover:opacity-90" style={{ background: accent }}>
              Search rooms{nights ? ` · ${nights} night${nights > 1 ? 's' : ''}` : ''}
            </a>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Choose your room</h2>
            <p className="text-sm text-slate-500 mt-1">Handpicked rooms and suites for every kind of stay.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {ROOM_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${activeType === t ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 hover:border-slate-300'}`}
                style={activeType === t ? { background: accent } : undefined}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition">
              <div className="h-44 overflow-hidden relative">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[11px] font-semibold px-2.5 py-1 rounded-full">{room.type}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[15px] leading-snug">{room.name}</h3>
                  <div className="text-right">
                    <span className="block font-bold" style={{ color: accent }}>{inr(room.price)}</span>
                    <span className="block text-[10px] text-slate-400">/ night</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-slate-500 mt-2">
                  <span>👤 {room.capacity}</span>
                  <span>📐 {room.size}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {room.perks.map((p) => (
                    <span key={p} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{p}</span>
                  ))}
                </div>
                <button
                  onClick={() => { setSelectedRoom(room); setBooked(false); }}
                  className={`mt-4 w-full py-2.5 rounded-xl text-sm font-medium transition ${selectedRoom?.id === room.id ? 'text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  style={selectedRoom?.id === room.id ? { background: accent } : undefined}
                >
                  {selectedRoom?.id === room.id ? 'Selected ✓' : 'Select room'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking summary */}
      {selectedRoom && (
        <section className="max-w-3xl mx-auto px-6 pb-14">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold tracking-tight mb-4">Booking summary</h3>
            <div className="flex items-center gap-4">
              <img src={selectedRoom.image} alt={selectedRoom.name} className="w-24 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <p className="font-semibold">{selectedRoom.name}</p>
                <p className="text-sm text-slate-500">{selectedRoom.type} · up to {selectedRoom.capacity} guests</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm border-t border-slate-100 pt-4">
              <div className="flex justify-between"><span className="text-slate-500">Check-in</span><span>{checkIn || '—'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Check-out</span><span>{checkOut || '—'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Guests</span><span>{guests}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">{inr(selectedRoom.price)} × {nights || 1} night{(nights || 1) > 1 ? 's' : ''}</span><span>{inr(total)}</span></div>
              <div className="flex justify-between font-bold text-base border-t border-slate-100 pt-2 mt-2"><span>Total</span><span style={{ color: accent }}>{inr(total)}</span></div>
            </div>
            <button
              onClick={() => setBooked(true)}
              className="mt-5 w-full py-3 rounded-xl text-white font-medium transition hover:opacity-90"
              style={{ background: accent }}
            >
              Confirm booking
            </button>
            {booked && (
              <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm font-medium text-center">
                ✅ Booking confirmed! A confirmation has been sent to your email.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Amenities */}
      <section id="amenities" className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold tracking-tight text-center">Everything you need for a perfect stay</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {AMENITIES.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition">
                <span className="text-2xl">{a.icon}</span>
                <span className="text-sm font-medium text-slate-700 text-center">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg text-white flex items-center justify-center" style={{ background: accent }}>🏨</span>
            <span className="font-semibold text-white">{hotelName}</span>
          </div>
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} {hotelName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
