'use client';

/**
 * HotelPublishForm
 * -----------------
 * Small modal that collects the hotel's details before the site goes live —
 * mirrors the restaurant "go live" flow. On submit the parent saves it to
 * the backend (hotel_info) and flips the site to LIVE.
 */

import { useState, type FormEvent } from 'react';
import type { HotelTheme } from './hotelThemes';

export interface HotelPublishData {
  hotelName: string;
  ownerName: string;
  mobileNo: string;
  email: string;
  city: string;
}

interface Props {
  theme: HotelTheme;
  onClose: () => void;
  onPublish: (data: HotelPublishData) => Promise<void> | void;
}

export default function HotelPublishForm({ theme, onClose, onPublish }: Props) {
  const dark = theme.id === 'noir';
  const [hotelName, setHotelName] = useState(theme.hotelName);
  const [ownerName, setOwnerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!hotelName.trim() || !mobileNo.trim() || !email.trim()) {
      setError('Hotel name, mobile and email are required.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      await onPublish({ hotelName: hotelName.trim(), ownerName: ownerName.trim(), mobileNo: mobileNo.trim(), email: email.trim(), city: city.trim() });
    } finally {
      setBusy(false);
    }
  };

  const accentText = dark ? '#0b0b0f' : '#fff';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden" style={{ background: theme.surface, color: theme.text, borderRadius: theme.radius }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-5 flex items-center gap-3" style={{ background: theme.accent, color: accentText }}>
          <span className="text-xl">{theme.emoji}</span>
          <div>
            <p className="font-bold leading-tight">Publish your hotel site</p>
            <p className="text-xs opacity-80">Theme: {theme.name} · fill in your details to go live</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-6 space-y-4">
          <Field label="Hotel name *" value={hotelName} onChange={setHotelName} theme={theme} placeholder="Azure Bay Hotel & Resort" />
          <Field label="Owner name" value={ownerName} onChange={setOwnerName} theme={theme} placeholder="Your name" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Mobile *" value={mobileNo} onChange={setMobileNo} theme={theme} placeholder="+91 90000 00000" />
            <Field label="City" value={city} onChange={setCity} theme={theme} placeholder="Goa" />
          </div>
          <Field label="Email *" type="email" value={email} onChange={setEmail} theme={theme} placeholder="stay@hotel.com" />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: theme.border, color: theme.muted }}>Cancel</button>
            <button type="submit" disabled={busy} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition hover:opacity-90 disabled:opacity-60" style={{ background: theme.accent, color: accentText, borderRadius: theme.radius }}>
              {busy ? 'Publishing…' : '⚡ Publish & go live'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, theme, type = 'text', placeholder }: { label: string; value: string; onChange: (v: string) => void; theme: HotelTheme; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: theme.muted }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none bg-transparent" style={{ borderColor: theme.border }} />
    </div>
  );
}
