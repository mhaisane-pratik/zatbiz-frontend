'use client';

/** TerraLanding — warm, organic villa layout with a split hero and alternating room rows. */

import { HOTEL_ROOMS, HOTEL_AMENITIES, inr, type HotelTheme } from '../hotelThemes';

interface Props {
  theme: HotelTheme;
  onSignIn: () => void;
  onBack: () => void;
}

export default function TerraLanding({ theme, onSignIn, onBack }: Props) {
  const rooms = HOTEL_ROOMS.slice(0, 4);

  return (
    <div className="min-h-screen font-sans" style={{ background: theme.bg, color: theme.text }}>
      <header className="sticky top-0 z-30 backdrop-blur" style={{ background: `${theme.bg}dd` }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 flex items-center justify-center text-lg rounded-full" style={{ background: theme.accent, color: '#fff' }}>🌿</span>
            <span className="font-bold text-lg tracking-tight">{theme.hotelName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: theme.muted }}>
            <a href="#stays" className="hover:opacity-70">Stays</a>
            <a href="#nature" className="hover:opacity-70">Nature</a>
            <button onClick={onBack} className="hover:opacity-70">Themes</button>
          </nav>
          <button onClick={onSignIn} className="px-5 py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90" style={{ background: theme.accent }}>Book a villa</button>
        </div>
      </header>

      {/* Split hero */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>{theme.propertyType}</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 leading-tight">{theme.tagline}</h1>
          <p className="mt-5 text-base leading-relaxed" style={{ color: theme.muted }}>Private villas and homestays wrapped in greenery. Wake to birdsong, unwind by your own garden, and let time slow down.</p>
          <div className="mt-7 flex items-center gap-3">
            <button onClick={onSignIn} className="px-6 py-3 rounded-full text-white text-sm font-medium" style={{ background: theme.accent }}>Reserve your stay</button>
            <a href="#stays" className="px-6 py-3 rounded-full text-sm font-medium border" style={{ borderColor: theme.border, color: theme.text }}>Explore villas</a>
          </div>
        </div>
        <div className="relative">
          <img src={theme.heroImage} alt="Villa" className="w-full h-[380px] object-cover" style={{ borderRadius: theme.radius }} />
          <div className="absolute -bottom-5 -left-5 px-5 py-3 shadow-lg" style={{ background: theme.surface, borderRadius: theme.radius }}>
            <p className="text-sm font-semibold">⭐ 4.9 · Rated “Nature Escape”</p>
          </div>
        </div>
      </section>

      {/* Alternating room rows */}
      <section id="stays" className="max-w-5xl mx-auto px-6 py-14 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Your kind of stay</h2>
          <p className="text-sm mt-2" style={{ color: theme.muted }}>Every villa is different. Pick the one that feels like home.</p>
        </div>
        {rooms.map((room, i) => (
          <div key={room.id} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 items-center`}>
            <img src={room.image} alt={room.name} className="w-full md:w-1/2 h-64 object-cover" style={{ borderRadius: theme.radius }} />
            <div className="w-full md:w-1/2">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: theme.accent }}>{room.type}</span>
              <h3 className="text-2xl font-bold mt-2">{room.name}</h3>
              <div className="flex items-center gap-4 text-sm mt-2" style={{ color: theme.muted }}><span>👤 up to {room.capacity}</span><span>📐 {room.size}</span></div>
              <div className="flex flex-wrap gap-2 mt-4">{room.perks.map((p) => <span key={p} className="text-xs px-3 py-1 rounded-full" style={{ background: theme.surface, color: theme.muted, border: `1px solid ${theme.border}` }}>{p}</span>)}</div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-xl font-bold" style={{ color: theme.accent }}>{inr(room.price)}<span className="text-xs font-normal" style={{ color: theme.muted }}> / night</span></span>
                <button onClick={onSignIn} className="px-6 py-2.5 rounded-full text-white text-sm font-medium" style={{ background: theme.accent }}>Book now</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="nature" style={{ background: theme.surface }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">On the grounds</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOTEL_AMENITIES.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-2 p-5 text-center" style={{ background: theme.bg, borderRadius: theme.radius }}>
                <span className="text-2xl">{a.icon}</span><span className="text-sm font-medium">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: theme.accent, color: '#fff' }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-semibold text-lg">{theme.hotelName}</span>
          <p className="text-sm text-white/80">© {new Date().getFullYear()} {theme.hotelName}. Made with 🌿</p>
        </div>
      </footer>
    </div>
  );
}
