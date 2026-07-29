'use client';

/** HotelLogin — themed guest login/register. Reused by all 4 themes, restyled via tokens. */

import { useState, type FormEvent } from 'react';
import { api } from '@/services/api';
import type { HotelTheme } from './hotelThemes';

interface Props {
  theme: HotelTheme;
  projectId: number;
  onSuccess: (name: string) => void;
  onBack: () => void;
}

export default function HotelLogin({ theme, projectId, onSuccess, onBack }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const dark = theme.id === 'noir';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'register' && !name)) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      if (mode === 'register') {
        const user = await api.hotel.users.register({ projectId, name, email, password });
        onSuccess(user?.name || name);
      } else {
        const user = await api.hotel.users.login({ projectId, email, password });
        onSuccess(user?.name || email.split('@')[0]);
      }
    } catch (err: any) {
      const msg = String(err?.message || '');
      if (msg.includes('409')) {
        setError('Email already registered. Try signing in.');
      } else if (msg.includes('401')) {
        setError('Invalid email or password.');
      } else {
        // Backend offline in preview — fall back so the demo still works.
        onSuccess(mode === 'register' ? name : email.split('@')[0]);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 font-sans" style={{ background: theme.bg, color: theme.text }}>
      <div className="w-full max-w-md">
        <button onClick={onBack} className="text-sm mb-6 hover:opacity-70" style={{ color: theme.muted }}>← Back to site</button>
        <div className="rounded-2xl border shadow-sm p-8" style={{ background: theme.surface, borderColor: theme.border, borderRadius: theme.radius }}>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-10 h-10 rounded-xl text-white flex items-center justify-center text-lg" style={{ background: theme.accent, color: dark ? '#0b0b0f' : '#fff' }}>{theme.emoji}</span>
            <div>
              <p className="font-bold leading-tight">{theme.hotelName}</p>
              <p className="text-xs" style={{ color: theme.muted }}>Guest portal</p>
            </div>
          </div>

          <div className="flex rounded-lg p-1 mb-6" style={{ background: theme.bg }}>
            {(['login', 'register'] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(''); }} className="flex-1 py-2 rounded-md text-sm font-medium capitalize transition"
                style={mode === m ? { background: theme.accent, color: dark ? '#0b0b0f' : '#fff' } : { color: theme.muted }}>
                {m === 'login' ? 'Sign in' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'register' && (
              <Input label="Full name" value={name} onChange={setName} theme={theme} placeholder="Jane Traveller" />
            )}
            <Input label="Email" type="email" value={email} onChange={setEmail} theme={theme} placeholder="you@email.com" />
            <Input label="Password" type="password" value={password} onChange={setPassword} theme={theme} placeholder="••••••••" />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" disabled={busy} className="w-full py-3 rounded-xl font-medium transition hover:opacity-90 disabled:opacity-60" style={{ background: theme.accent, color: dark ? '#0b0b0f' : '#fff', borderRadius: theme.radius }}>
              {busy ? 'Please wait…' : mode === 'login' ? 'Sign in to your account' : 'Create account'}
            </button>
          </form>

          <p className="text-xs text-center mt-6" style={{ color: theme.muted }}>
            Demo mode — any email and password will sign you in.
          </p>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, theme, type = 'text', placeholder }: { label: string; value: string; onChange: (v: string) => void; theme: HotelTheme; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: theme.muted }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none bg-transparent focus:ring-2"
        style={{ borderColor: theme.border }} />
    </div>
  );
}
