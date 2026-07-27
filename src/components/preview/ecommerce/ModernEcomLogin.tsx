'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { api } from '@/services/api';
import { readEcomConfig } from './ModernEcomStorefront';

interface Props {
  projectId: number;
  isSignUp: boolean;
  setIsSignUp: (s: boolean) => void;
  companyName: string;
  logoUrl: string;
  logoIcon: string;
  errorMessage: string;
  successMessage: string;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Live customer login for themed e-commerce stores. Renders the variant's
 * login layout (dark-panel / minimal-light / centered-glass / split-image)
 * around the real auth form, so the live page matches the wizard preview.
 */
export default function ModernEcomLogin({
  projectId,
  isSignUp,
  setIsSignUp,
  companyName,
  logoUrl,
  logoIcon,
  errorMessage,
  successMessage,
  handleLoginSubmit,
}: Props) {
  const [project, setProject] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.projects
      .get(projectId)
      .then(setProject)
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [projectId]);

  const ecom = useMemo(() => readEcomConfig(project || undefined), [project]);
  const theme = ecom.theme;

  if (!loaded) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const accent = theme?.primaryColor || '#6366f1';
  const layout = theme?.loginLayout || 'split-image';
  const heroImg = theme?.heroImageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80';
  const brand = ecom.brand || companyName || 'Our Store';
  const icon = logoIcon || ecom.logoIcon || theme?.icon || '🛍️';
  const darkPanel = layout === 'dark-panel';

  const inputCls = darkPanel
    ? 'w-full rounded-xl px-4 py-3 text-[13px] outline-none transition border bg-white/5 border-white/15 focus:border-white/40 text-white'
    : 'w-full rounded-xl px-4 py-3 text-[13px] outline-none transition border bg-slate-50 border-slate-200 focus:border-slate-400 focus:bg-white text-slate-900';
  const labelCls = `text-[10px] font-black uppercase tracking-widest ${darkPanel ? 'text-white/50' : 'text-slate-500'}`;

  const form = (
    <div className="w-full max-w-sm space-y-6">
      <a
        href={`/preview/${projectId}`}
        className={`text-[11px] font-bold transition ${darkPanel ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}
      >
        ← Back to store
      </a>

      <div className="space-y-3">
        {logoUrl ? (
          <img src={logoUrl} alt={brand} className="w-12 h-12 rounded-2xl object-cover shadow-lg" />
        ) : (
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg" style={{ backgroundColor: accent }}>
            {icon}
          </div>
        )}
        <h1 className={`text-3xl font-black tracking-tight ${darkPanel ? 'text-white' : 'text-slate-900'}`}>
          {isSignUp ? 'Create account' : 'Welcome back'}
        </h1>
        <p className={`text-[13px] ${darkPanel ? 'text-white/45' : 'text-slate-500'}`}>
          {isSignUp
            ? `Join ${brand} for order tracking, wishlists and member pricing.`
            : `Sign in to track orders and check out faster at ${brand}.`}
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/25 text-rose-600 rounded-xl text-[11px] font-bold text-center">
          ⚠️ {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 rounded-xl text-[11px] font-bold text-center">
          ✅ {successMessage}
        </div>
      )}

      <div className={`flex gap-1 p-1 rounded-xl border ${darkPanel ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
        {[
          { k: false, l: 'Sign In' },
          { k: true, l: 'Sign Up' },
        ].map((m) => (
          <button
            key={m.l}
            type="button"
            onClick={() => setIsSignUp(m.k)}
            className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer transition ${
              isSignUp === m.k ? 'text-white' : `bg-transparent ${darkPanel ? 'text-white/50' : 'text-slate-500'} hover:opacity-80`
            }`}
            style={isSignUp === m.k ? { backgroundColor: accent } : undefined}
          >
            {m.l}
          </button>
        ))}
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <div className="space-y-1.5">
              <label className={labelCls}>Full Name</label>
              <input name="name" type="text" required placeholder="e.g. Aarav Sharma" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Phone Number</label>
              <input name="phone" type="text" placeholder="e.g. +91 98765 43210" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Address</label>
              <input name="address" type="text" placeholder="e.g. Sector 62, Noida" className={inputCls} />
            </div>
          </>
        )}
        <div className="space-y-1.5">
          <label className={labelCls}>Email Address</label>
          <input name="email" type="email" required placeholder="customer@example.com" className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className={labelCls}>Password</label>
            {!isSignUp && (
              <span className="text-[11px] font-bold cursor-pointer" style={{ color: accent }}>
                Forgot password?
              </span>
            )}
          </div>
          <input name="password" type="password" required placeholder="••••••••" className={inputCls} />
        </div>
        <button
          type="submit"
          className="w-full py-3.5 text-[11px] font-black uppercase tracking-widest rounded-xl text-white border-none cursor-pointer shadow-xl hover:brightness-110 transition"
          style={{ backgroundColor: accent }}
        >
          {isSignUp ? 'Create Account ➔' : 'Sign In & Shop ➔'}
        </button>
      </form>

      <p className={`text-center text-[10px] font-semibold ${darkPanel ? 'text-white/30' : 'text-slate-400'}`}>
        Secure customer sign in
      </p>
    </div>
  );

  if (layout === 'centered-glass') {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-8">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 backdrop-blur-md" style={{ background: `linear-gradient(160deg, ${accent}99, #0f172acc)` }} />
        <div className="relative w-full max-w-md rounded-[32px] p-8 sm:p-10 shadow-2xl bg-white/90 backdrop-blur-2xl border border-white/60">{form}</div>
      </main>
    );
  }

  if (layout === 'minimal-light') {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-[32px] p-10 shadow-xl">{form}</div>
      </main>
    );
  }

  if (layout === 'boxed-center') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md border-2 border-slate-900 p-10">{form}</div>
      </main>
    );
  }

  if (layout === 'right-panel') {
    return (
      <main className="min-h-screen grid lg:grid-cols-[1fr_1.2fr]" style={{ backgroundColor: '#0a0a0d' }}>
        <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
        <div className="relative hidden lg:block overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}33, transparent 60%)` }} />
          <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0d]/60" />
          <div className="relative h-full flex flex-col justify-end p-12 text-white space-y-3 z-20">
            <h2 className="text-3xl font-black tracking-tight leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{theme?.tagline || brand}</h2>
            <p className="text-white/70 text-[13px] max-w-sm">{theme?.desc || ''}</p>
          </div>
        </div>
      </main>
    );
  }

  if (layout === 'gradient-split') {
    return (
      <main className="min-h-screen grid lg:grid-cols-2" style={{ backgroundColor: '#0b0b0f' }}>
        <div className="relative hidden lg:block overflow-hidden">
          <div className="absolute inset-0" style={{ background: `linear-gradient(140deg, ${accent}, ${theme?.secondaryColor || accent} 70%, #0b0b0f)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,.15), transparent 40%)` }} />
          <div className="relative h-full flex flex-col justify-center p-12 text-white space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">{theme?.badge}</span>
            <h2 className="text-4xl font-black tracking-tight leading-tight">{theme?.tagline || brand}</h2>
            <p className="text-white/80 text-[13px] max-w-sm">{theme?.desc || ''}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
      </main>
    );
  }

  if (layout === 'fullbleed-form') {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-8" style={{ backgroundColor: `${accent}12` }}>
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-40" style={{ backgroundColor: accent }} />
        <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-30" style={{ backgroundColor: theme?.secondaryColor || accent }} />
        <div className="relative w-full max-w-md bg-white rounded-[28px] p-10 shadow-2xl border border-white">{form}</div>
      </main>
    );
  }

  if (darkPanel) {
    return (
      <main className="min-h-screen grid lg:grid-cols-2" style={{ backgroundColor: '#0b0b0f' }}>
        <div className="relative hidden lg:block overflow-hidden">
          <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0b0f]" />
          <div className="relative h-full flex flex-col justify-end p-12 text-white space-y-3">
            <h2 className="text-3xl font-black tracking-tight leading-tight">{theme?.tagline || brand}</h2>
            <p className="text-white/70 text-[13px] max-w-sm">{theme?.desc || ''}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
      </main>
    );
  }

  // split-image default
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="relative hidden lg:block overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}cc, #0f172ab3)` }} />
        <div className="relative h-full flex flex-col justify-end p-12 text-white space-y-3">
          <h2 className="text-3xl font-black tracking-tight leading-tight">{theme?.tagline || brand}</h2>
          <p className="text-white/75 text-[13px] max-w-sm">{theme?.desc || ''}</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
    </main>
  );
}
