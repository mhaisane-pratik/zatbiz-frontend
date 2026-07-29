'use client';

/** AzureLanding — bright, airy coastal resort layout. */

import { useMemo, useState, type ReactNode } from 'react';
import { HOTEL_ROOMS, HOTEL_ROOM_TYPES, HOTEL_AMENITIES, inr, type HotelTheme, type HotelRoom } from '../hotelThemes';

interface Props {
  theme: HotelTheme;
  onSignIn: () => void;
  onBack: () => void;
}

export default function AzureLanding({ theme, onSignIn, onBack }: Props) {
  const [activeType, setActiveType] = useState('All');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000;
    return diff > 0 ? Math.round(diff) : 0;
  }, [checkIn, checkOut]);

  const rooms: HotelRoom[] = activeType === 'All' ? HOTEL_ROOMS : HOTEL_ROOMS.filter((r) => r.type === activeType);

  return (
    <div className="min-h-screen font-sans" style={{ background: theme.bg, color: theme.text }}>
      <header className="sticky top-0 z-30 backdrop-blur border-b" style={{ background: `${theme.surface}dd`, borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl text-white flex items-center justify-center text-lg" style={{ background: theme.accent }}>🏨</span>
            <span className="font-bold text-lg tracking-tight">{theme.hotelName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: theme.muted }}>
            <a href="#rooms" className="hover:opacity-70 transition">Rooms</a>
            <a href="#amenities" className="hover:opacity-70 transition">Amenities</a>
            <button onClick={onBack} className="hover:opacity-70 transition">Themes</button>
          </nav>
          <button onClick={onSignIn} className="px-4 py-2 rounded-xl text-white text-sm font-medium transition hover:opacity-90" style={{ background: theme.accent }}>
            Sign in / Book
          </button>
        </div>
      </header>

      <section className="relative h-[440px] overflow-hidden">
        <img src={theme.heroImage} alt="Resort" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.8), rgba(15,23,42,0.25), transparent)' }} />
        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-14 text-white">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/80">{theme.propertyType} · Beachfront</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-3 max-w-3xl">{theme.tagline}</h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-white/85">
            <span>⭐ 4.9 · 3,200+ reviews</span><span>· Goa, India</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 -mt-9 relative z-10">
        <div className="rounded-2xl border shadow-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-3" style={{ background: theme.surface, borderColor: theme.border }}>
          <Field label="Check-in"><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none" style={{ borderColor: theme.border }} /></Field>
          <Field label="Check-out"><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none" style={{ borderColor: theme.border }} /></Field>
          <Field label="Guests"><select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none bg-transparent" style={{ borderColor: theme.border }}>{[1, 2, 3, 4, 5].map((g) => <option key={g} value={g}>{g} {g === 1 ? 'guest' : 'guests'}</option>)}</select></Field>
          <div className="flex items-end">
            <button onClick={onSignIn} className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition hover:opacity-90" style={{ background: theme.accent }}>
              Search rooms{nights ? ` · ${nights} night${nights > 1 ? 's' : ''}` : ''}
            </button>
          </div>
        </div>
      </section>

      <section id="rooms" className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Choose your room</h2>
            <p className="text-sm mt-1" style={{ color: theme.muted }}>Handpicked rooms and suites for every kind of stay.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {HOTEL_ROOM_TYPES.map((t) => (
              <button key={t} onClick={() => setActiveType(t)} className="px-4 py-1.5 rounded-full text-sm font-medium transition border"
                style={activeType === t ? { background: theme.accent, color: '#fff', borderColor: 'transparent' } : { color: theme.muted, borderColor: theme.border }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="rounded-2xl border overflow-hidden flex flex-col hover:shadow-lg transition" style={{ background: theme.surface, borderColor: theme.border }}>
              <div className="h-44 overflow-hidden relative">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-white/90 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-full">{room.type}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[15px] leading-snug">{room.name}</h3>
                  <div className="text-right"><span className="block font-bold" style={{ color: theme.accent }}>{inr(room.price)}</span><span className="block text-[10px]" style={{ color: theme.muted }}>/ night</span></div>
                </div>
                <div className="flex items-center gap-3 text-[12px] mt-2" style={{ color: theme.muted }}><span>👤 {room.capacity}</span><span>📐 {room.size}</span></div>
                <div className="flex flex-wrap gap-1.5 mt-3">{room.perks.map((p) => <span key={p} className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: theme.bg, color: theme.muted }}>{p}</span>)}</div>
                <button onClick={onSignIn} className="mt-4 w-full py-2.5 rounded-xl text-white text-sm font-medium transition hover:opacity-90" style={{ background: theme.accent }}>Book now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="amenities" className="border-t" style={{ background: theme.surface, borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold tracking-tight text-center">Everything you need for a perfect stay</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {HOTEL_AMENITIES.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-2 p-5 rounded-2xl border transition" style={{ borderColor: theme.border }}>
                <span className="text-2xl">{a.icon}</span><span className="text-sm font-medium text-center">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: '#0f172a', color: '#cbd5e1' }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5"><span className="w-8 h-8 rounded-lg text-white flex items-center justify-center" style={{ background: theme.accent }}>🏨</span><span className="font-semibold text-white">{theme.hotelName}</span></div>
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} {theme.hotelName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <label className="text-[11px] font-semibold uppercase tracking-wide mb-1 opacity-60">{label}</label>
      {children}
    </div>
  );
}
