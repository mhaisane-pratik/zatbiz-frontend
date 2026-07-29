'use client';

/** HotelDashboard — themed guest dashboard with full booking features. Reused by all 4 themes. */

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '@/services/api';
import { HOTEL_ROOMS, inr, type HotelTheme, type HotelRoom } from './hotelThemes';

interface Booking {
  id: string;
  backendId?: number;   // hotel_data row id when persisted
  room: HotelRoom;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  total: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

interface Props {
  theme: HotelTheme;
  projectId: number;
  userName: string;
  onLogout: () => void;
  onBackToSite: () => void;
}

type Tab = 'overview' | 'book' | 'bookings' | 'profile';

const findRoom = (name: string): HotelRoom => HOTEL_ROOMS.find((r) => r.name === name) ?? HOTEL_ROOMS[0];

export default function HotelDashboard({ theme, projectId, userName, onLogout, onBackToSite }: Props) {
  const dark = theme.id === 'noir';
  const [tab, setTab] = useState<Tab>('overview');
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'BK-1042', room: HOTEL_ROOMS[0], checkIn: '2026-08-12', checkOut: '2026-08-15', guests: 2, nights: 3, total: HOTEL_ROOMS[0].price * 3, status: 'Confirmed' },
  ]);

  // Booking form state
  const [selected, setSelected] = useState<HotelRoom | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [toast, setToast] = useState('');

  // Load persisted bookings from the backend (hotel_data, dataType='booking').
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await api.hotel.data.list(projectId, 'booking');
        if (!alive || !Array.isArray(rows) || rows.length === 0) return;
        const loaded: Booking[] = rows.map((row: any) => {
          const d = JSON.parse(row.dataJson || '{}');
          const room = findRoom(d.room);
          const nightsCount = Number(d.nights) || 1;
          return {
            id: d.code || `BK-${row.id}`,
            backendId: row.id,
            room,
            checkIn: d.checkIn || '',
            checkOut: d.checkOut || '',
            guests: Number(d.guests) || 2,
            nights: nightsCount,
            total: Number(d.total) || room.price * nightsCount,
            status: (d.status as Booking['status']) || 'Confirmed',
          };
        });
        setBookings(loaded);
      } catch {
        // Backend offline — keep the local demo booking.
      }
    })();
    return () => { alive = false; };
  }, [projectId]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const d = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000;
    return d > 0 ? Math.round(d) : 0;
  }, [checkIn, checkOut]);

  const loyalty = bookings.filter((b) => b.status !== 'Cancelled').length * 250;
  const totalSpent = bookings.filter((b) => b.status !== 'Cancelled').reduce((s, b) => s + b.total, 0);

  const confirmBooking = async () => {
    if (!selected || !checkIn || !checkOut || nights <= 0) {
      setToast('Pick a room and valid dates.');
      setTimeout(() => setToast(''), 2500);
      return;
    }
    const code = 'BK-' + Math.floor(1000 + Math.random() * 9000);
    const b: Booking = {
      id: code,
      room: selected, checkIn, checkOut, guests, nights,
      total: selected.price * nights, status: 'Confirmed',
    };
    // Persist to backend (hotel_data). Falls back to local-only if offline.
    try {
      const payload = { code, room: selected.name, checkIn, checkOut, guests, nights, total: selected.price * nights, status: 'Confirmed' };
      const saved = await api.hotel.data.create({ projectId, dataType: 'booking', dataJson: JSON.stringify(payload) });
      if (saved?.id) b.backendId = saved.id;
    } catch {
      // offline preview — keep local
    }
    setBookings((prev) => [b, ...prev]);
    setSelected(null); setCheckIn(''); setCheckOut('');
    setToast('✅ Booking confirmed!');
    setTab('bookings');
    setTimeout(() => setToast(''), 2500);
  };

  const cancel = async (id: string) => {
    const target = bookings.find((b) => b.id === id);
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'Cancelled' } : b));
    if (target?.backendId) {
      try {
        const payload = { code: target.id, room: target.room.name, checkIn: target.checkIn, checkOut: target.checkOut, guests: target.guests, nights: target.nights, total: target.total, status: 'Cancelled' };
        await api.hotel.data.update(target.backendId, { dataJson: JSON.stringify(payload) });
      } catch {
        // offline — local cancel already applied
      }
    }
  };

  const btn = { background: theme.accent, color: dark ? '#0b0b0f' : '#fff' };
  const card = { background: theme.surface, borderColor: theme.border, borderRadius: theme.radius };

  return (
    <div className="min-h-screen font-sans" style={{ background: theme.bg, color: theme.text }}>
      {/* Top bar */}
      <header className="border-b" style={{ background: theme.surface, borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={btn}>{theme.emoji}</span>
            <div>
              <p className="font-bold leading-tight text-sm">{theme.hotelName}</p>
              <p className="text-[11px]" style={{ color: theme.muted }}>Guest dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onBackToSite} className="text-sm hover:opacity-70" style={{ color: theme.muted }}>View site</button>
            <button onClick={onLogout} className="px-4 py-1.5 rounded-lg text-sm font-medium border" style={{ borderColor: theme.border }}>Log out</button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-[200px_1fr] gap-8">
        {/* Sidebar */}
        <aside>
          <p className="text-sm mb-3" style={{ color: theme.muted }}>Welcome back,</p>
          <p className="font-bold text-lg mb-6">{userName} 👋</p>
          <nav className="space-y-1">
            {([['overview', '📊 Overview'], ['book', '🛏️ Book a room'], ['bookings', '📅 My bookings'], ['profile', '👤 Profile']] as [Tab, string][]).map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition"
                style={tab === id ? btn : { color: theme.muted }}>{label}</button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main>
          {tab === 'overview' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Stat theme={theme} label="Active bookings" value={String(bookings.filter((b) => b.status === 'Confirmed').length)} />
                <Stat theme={theme} label="Loyalty points" value={loyalty.toLocaleString('en-IN')} />
                <Stat theme={theme} label="Total spent" value={inr(totalSpent)} />
              </div>
              <div className="rounded-2xl border p-6" style={card}>
                <h2 className="font-semibold mb-4">Upcoming stay</h2>
                {bookings.find((b) => b.status === 'Confirmed') ? (
                  (() => {
                    const b = bookings.find((x) => x.status === 'Confirmed')!;
                    return (
                      <div className="flex items-center gap-4">
                        <img src={b.room.image} alt={b.room.name} className="w-24 h-20 object-cover" style={{ borderRadius: theme.radius }} />
                        <div className="flex-1">
                          <p className="font-semibold">{b.room.name}</p>
                          <p className="text-sm" style={{ color: theme.muted }}>{b.checkIn} → {b.checkOut} · {b.nights} nights · {b.guests} guests</p>
                        </div>
                        <span className="font-bold" style={{ color: theme.accent }}>{inr(b.total)}</span>
                      </div>
                    );
                  })()
                ) : <p className="text-sm" style={{ color: theme.muted }}>No upcoming stays. Book a room to get started.</p>}
              </div>
            </div>
          )}

          {tab === 'book' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold tracking-tight">Book a room</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HOTEL_ROOMS.map((room) => (
                  <button key={room.id} onClick={() => setSelected(room)} className="text-left rounded-2xl border overflow-hidden transition hover:shadow-md"
                    style={{ ...card, outline: selected?.id === room.id ? `2px solid ${theme.accent}` : 'none' }}>
                    <img src={room.image} alt={room.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <p className="font-semibold text-sm">{room.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs" style={{ color: theme.muted }}>👤 {room.capacity} · {room.size}</span>
                        <span className="font-bold text-sm" style={{ color: theme.accent }}>{inr(room.price)}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border p-6" style={card}>
                <h2 className="font-semibold mb-4">Reservation details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Labeled theme={theme} label="Check-in"><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm bg-transparent outline-none" style={{ borderColor: theme.border }} /></Labeled>
                  <Labeled theme={theme} label="Check-out"><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full rounded-lg border px-3 py-2.5 text-sm bg-transparent outline-none" style={{ borderColor: theme.border }} /></Labeled>
                  <Labeled theme={theme} label="Guests"><select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full rounded-lg border px-3 py-2.5 text-sm bg-transparent outline-none" style={{ borderColor: theme.border }}>{[1, 2, 3, 4, 5].map((g) => <option key={g} value={g}>{g}</option>)}</select></Labeled>
                </div>
                <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor: theme.border }}>
                  <div className="text-sm">
                    <span style={{ color: theme.muted }}>{selected ? `${selected.name} · ` : 'No room selected · '}</span>
                    <span className="font-bold" style={{ color: theme.accent }}>{selected ? inr(selected.price * (nights || 1)) : inr(0)}</span>
                    {nights > 0 && <span style={{ color: theme.muted }}> ({nights} nights)</span>}
                  </div>
                  <button onClick={confirmBooking} className="px-6 py-2.5 rounded-xl font-medium transition hover:opacity-90" style={{ ...btn, borderRadius: theme.radius }}>Confirm booking</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'bookings' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold tracking-tight">My bookings</h1>
              {bookings.length === 0 && <p className="text-sm" style={{ color: theme.muted }}>No bookings yet.</p>}
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div key={b.id} className="rounded-2xl border p-4 flex items-center gap-4" style={card}>
                    <img src={b.room.image} alt={b.room.name} className="w-20 h-16 object-cover" style={{ borderRadius: theme.radius }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{b.room.name}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
                          background: b.status === 'Confirmed' ? '#dcfce7' : b.status === 'Cancelled' ? '#fee2e2' : '#e5e7eb',
                          color: b.status === 'Confirmed' ? '#166534' : b.status === 'Cancelled' ? '#991b1b' : '#374151',
                        }}>{b.status}</span>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: theme.muted }}>{b.id} · {b.checkIn} → {b.checkOut} · {b.nights} nights · {b.guests} guests</p>
                    </div>
                    <span className="font-bold text-sm" style={{ color: theme.accent }}>{inr(b.total)}</span>
                    {b.status === 'Confirmed' && (
                      <button onClick={() => cancel(b.id)} className="text-xs px-3 py-1.5 rounded-lg border" style={{ borderColor: theme.border, color: theme.muted }}>Cancel</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'profile' && (
            <div className="space-y-6 max-w-lg">
              <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
              <div className="rounded-2xl border p-6 space-y-4" style={card}>
                <Labeled theme={theme} label="Full name"><input defaultValue={userName} className="w-full rounded-lg border px-3 py-2.5 text-sm bg-transparent outline-none" style={{ borderColor: theme.border }} /></Labeled>
                <Labeled theme={theme} label="Email"><input defaultValue={`${userName.toLowerCase().replace(/\s+/g, '')}@email.com`} className="w-full rounded-lg border px-3 py-2.5 text-sm bg-transparent outline-none" style={{ borderColor: theme.border }} /></Labeled>
                <Labeled theme={theme} label="Phone"><input placeholder="+91 90000 00000" className="w-full rounded-lg border px-3 py-2.5 text-sm bg-transparent outline-none" style={{ borderColor: theme.border }} /></Labeled>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm" style={{ color: theme.muted }}>⭐ {loyalty.toLocaleString('en-IN')} loyalty points</span>
                  <button className="px-5 py-2 rounded-lg font-medium" style={{ ...btn, borderRadius: theme.radius }}>Save changes</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-sm font-medium shadow-lg" style={{ background: theme.text, color: theme.bg }}>{toast}</div>
      )}
    </div>
  );
}

function Stat({ theme, label, value }: { theme: HotelTheme; label: string; value: string }) {
  return (
    <div className="rounded-2xl border p-5" style={{ background: theme.surface, borderColor: theme.border, borderRadius: theme.radius }}>
      <p className="text-xs uppercase tracking-wide" style={{ color: theme.muted }}>{label}</p>
      <p className="text-2xl font-bold mt-1" style={{ color: theme.accent }}>{value}</p>
    </div>
  );
}

function Labeled({ theme, label, children }: { theme: HotelTheme; label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: theme.muted }}>{label}</label>
      {children}
    </div>
  );
}
