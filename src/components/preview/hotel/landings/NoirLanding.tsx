'use client';

/** NoirLanding — dark, editorial boutique layout with wide horizontal room cards. */

import { useState } from 'react';
import { HOTEL_ROOMS, HOTEL_AMENITIES, inr, type HotelTheme } from '../hotelThemes';

interface Props {
  theme: HotelTheme;
  onSignIn: () => void;
  onBack: () => void;
}

export default function NoirLanding({ theme, onSignIn, onBack }: Props) {
  const [active, setActive] = useState(HOTEL_ROOMS[0].id);
  const room = HOTEL_ROOMS.find((r) => r.id === active) ?? HOTEL_ROOMS[0];

  return (
    <div className="min-h-screen font-sans" style={{ background: theme.bg, color: theme.text }}>
      <header className="sticky top-0 z-30 backdrop-blur border-b" style={{ background: `${theme.bg}cc`, borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-[0.2em] uppercase">{theme.hotelName}</span>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase" style={{ color: theme.muted }}>
            <a href="#suites" className="hover:opacity-70">Suites</a>
            <a href="#experience" className="hover:opacity-70">Experience</a>
            <button onClick={onBack} className="hover:opacity-70 uppercase tracking-widest">Themes</button>
          </nav>
          <button onClick={onSignIn} className="px-5 py-2 rounded text-xs uppercase tracking-widest font-medium transition hover:opacity-90" style={{ background: theme.accent, color: '#0b0b0f' }}>Reserve</button>
        </div>
      </header>

      {/* Centered cinematic hero */}
      <section className="relative h-[560px] overflow-hidden flex items-center justify-center text-center">
        <img src={theme.heroImage} alt="Boutique hotel" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(11,11,15,0.35), rgba(11,11,15,0.9))' }} />
        <div className="relative px-6 max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.4em]" style={{ color: theme.accent }}>{theme.propertyType}</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mt-5 leading-tight">{theme.tagline}</h1>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={onSignIn} className="px-7 py-3 rounded text-xs uppercase tracking-widest font-medium" style={{ background: theme.accent, color: '#0b0b0f' }}>Book your suite</button>
            <a href="#suites" className="px-7 py-3 rounded text-xs uppercase tracking-widest border" style={{ borderColor: theme.border, color: theme.text }}>View suites</a>
          </div>
        </div>
      </section>

      {/* Suite showcase — selectable list + large preview */}
      <section id="suites" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.4em]" style={{ color: theme.accent }}>The Collection</span>
          <h2 className="text-3xl font-light mt-3">Rooms &amp; Suites</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
            <span className="absolute bottom-4 left-4 px-3 py-1 text-xs uppercase tracking-widest" style={{ background: theme.accent, color: '#0b0b0f' }}>{room.type}</span>
          </div>
          <div>
            <div className="divide-y" style={{ borderColor: theme.border }}>
              {HOTEL_ROOMS.map((r) => (
                <button key={r.id} onClick={() => setActive(r.id)} className="w-full flex items-center justify-between py-4 text-left transition" style={{ borderColor: theme.border, opacity: r.id === active ? 1 : 0.55 }}>
                  <div>
                    <p className="font-medium" style={{ color: r.id === active ? theme.accent : theme.text }}>{r.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: theme.muted }}>{r.size} · up to {r.capacity} guests</p>
                  </div>
                  <span className="text-sm">{inr(r.price)}</span>
                </button>
              ))}
            </div>
            <button onClick={onSignIn} className="mt-8 w-full py-3 rounded text-xs uppercase tracking-widest font-medium" style={{ background: theme.accent, color: '#0b0b0f' }}>Reserve {room.name}</button>
          </div>
        </div>
      </section>

      <section id="experience" className="border-t" style={{ borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-light text-center mb-12">The experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {HOTEL_AMENITIES.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-3 text-center">
                <span className="text-3xl">{a.icon}</span>
                <span className="text-xs uppercase tracking-widest" style={{ color: theme.muted }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <p className="text-sm tracking-widest uppercase" style={{ color: theme.muted }}>{theme.hotelName}</p>
          <p className="text-xs mt-2" style={{ color: theme.muted }}>© {new Date().getFullYear()} · All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
