'use client';

/** MetroLanding — minimal, corporate business-hotel layout with a tight room grid. */

import { useState } from 'react';
import { HOTEL_ROOMS, HOTEL_AMENITIES, inr, type HotelTheme } from '../hotelThemes';

interface Props {
  theme: HotelTheme;
  onSignIn: () => void;
  onBack: () => void;
}

export default function MetroLanding({ theme, onSignIn, onBack }: Props) {
  const [city, setCity] = useState('Bengaluru');

  return (
    <div className="min-h-screen font-sans" style={{ background: theme.bg, color: theme.text }}>
      <header className="border-b" style={{ background: theme.surface, borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded text-white flex items-center justify-center text-sm font-bold" style={{ background: theme.accent }}>M</span>
            <span className="font-semibold tracking-tight">{theme.hotelName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: theme.muted }}>
            <a href="#rooms" className="hover:opacity-70">Rooms</a>
            <a href="#facilities" className="hover:opacity-70">Facilities</a>
            <button onClick={onBack} className="hover:opacity-70">Themes</button>
            <button onClick={onSignIn} className="px-4 py-1.5 rounded text-white font-medium" style={{ background: theme.accent }}>Sign in</button>
          </nav>
        </div>
      </header>

      {/* Compact hero with inline booking */}
      <section className="relative overflow-hidden" style={{ background: theme.text }}>
        <img src={theme.heroImage} alt="Business hotel" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: theme.accent2 }}>{theme.propertyType}</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-3 text-white max-w-2xl">{theme.tagline}</h1>
          <div className="mt-8 rounded-lg p-3 grid grid-cols-1 md:grid-cols-4 gap-3" style={{ background: theme.surface, borderRadius: theme.radius }}>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded border px-3 py-2.5 text-sm bg-transparent outline-none" style={{ borderColor: theme.border }}>
              {['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'].map((c) => <option key={c}>{c}</option>)}
            </select>
            <input type="date" className="rounded border px-3 py-2.5 text-sm outline-none" style={{ borderColor: theme.border }} />
            <input type="date" className="rounded border px-3 py-2.5 text-sm outline-none" style={{ borderColor: theme.border }} />
            <button onClick={onSignIn} className="rounded text-white text-sm font-medium py-2.5" style={{ background: theme.accent }}>Search {city}</button>
          </div>
        </div>
      </section>

      {/* Tight room grid */}
      <section id="rooms" className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">Available rooms</h2>
          <span className="text-sm" style={{ color: theme.muted }}>{HOTEL_ROOMS.length} room types</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOTEL_ROOMS.map((room) => (
            <div key={room.id} className="flex gap-4 p-3 border transition hover:shadow-sm" style={{ background: theme.surface, borderColor: theme.border, borderRadius: theme.radius }}>
              <img src={room.image} alt={room.name} className="w-32 h-28 object-cover flex-shrink-0" style={{ borderRadius: `calc(${theme.radius} - 4px)` }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm">{room.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: theme.bg, color: theme.muted }}>{room.type}</span>
                </div>
                <div className="flex items-center gap-3 text-xs mt-1" style={{ color: theme.muted }}><span>👤 {room.capacity}</span><span>📐 {room.size}</span></div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold" style={{ color: theme.accent }}>{inr(room.price)}<span className="text-[10px] font-normal" style={{ color: theme.muted }}>/night</span></span>
                  <button onClick={onSignIn} className="px-4 py-1.5 rounded text-white text-xs font-medium" style={{ background: theme.accent }}>Reserve</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="facilities" className="border-t" style={{ background: theme.surface, borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-lg font-bold tracking-tight mb-6">Business facilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {HOTEL_AMENITIES.map((a) => (
              <div key={a.label} className="flex items-center gap-2 p-3 border" style={{ borderColor: theme.border, borderRadius: theme.radius }}>
                <span className="text-lg">{a.icon}</span><span className="text-xs font-medium">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t" style={{ background: theme.surface, borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="font-semibold">{theme.hotelName}</span>
          <p className="text-xs" style={{ color: theme.muted }}>© {new Date().getFullYear()} · All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
