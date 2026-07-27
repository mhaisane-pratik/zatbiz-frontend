'use client';

import React, { useMemo, useState } from 'react';
import { THEMES_30 } from '@/app/dashboard/themesData';
import { getGymThemeContent, readGymLayout } from './gymThemeContent';

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
  gymInfo?: any;
  themePreset?: string;
  /** Live edits from the Theme Studio. Falls back to gymInfo.layoutContent.login. */
  overrides?: any;
  /** Forces a layout in the studio preview, ignoring the saved one. */
  layoutOverride?: string;
}

/**
 * Gym member login, driven by the saved theme + the login layout chosen in the
 * wizard. Replaces the hard-coded indigo split-screen login.
 */
export default function ModernGymLogin({
  projectId,
  isSignUp,
  setIsSignUp,
  companyName,
  logoUrl,
  logoIcon,
  errorMessage,
  successMessage,
  handleLoginSubmit,
  gymInfo,
  themePreset,
  overrides,
  layoutOverride,
}: Props) {
  const themeId = gymInfo?.selectedTheme || themePreset || 'gym-volt-apex';
  const theme = useMemo(() => THEMES_30.find((t) => t.id === themeId), [themeId]);

  const ov = overrides ?? readGymLayout(gymInfo).login;
  const c = useMemo(() => getGymThemeContent(themeId, ov), [themeId, ov]);

  const accent = gymInfo?.themeColor || theme?.primaryColor || '#ea580c';
  const brand = ov?.brandName || companyName || gymInfo?.clubName || 'Fitness Club';
  const hero = ov?.heroImage || gymInfo?.headerBgImage || c.heroImage;
  const layout = layoutOverride || gymInfo?.selectedLoginLayout || 'split-left-image';

  const isRight = layout === 'split-right-image';
  const isCentered = layout === 'centered-card' || layout === 'transparent-blurred';
  const isDarkMinimal = layout === 'dark-mode-minimal';
  const isMinimalLogo = layout === 'minimal-logo-focus';
  const isMesh = layout === 'gradient-mesh-bg';
  const isGeometric = layout === 'geometric-patterns';
  const isSidePanel = layout === 'clean-side-panel';

  const inputCls = isDarkMinimal
    ? 'w-full rounded-xl px-4 py-3 text-[13px] outline-none transition border bg-white/5 border-white/15 focus:border-white/40 text-white'
    : 'w-full rounded-xl px-4 py-3 text-[13px] outline-none transition border bg-slate-50 border-slate-200 focus:border-slate-400 focus:bg-white text-slate-900';

  const labelCls = `text-[10px] font-black uppercase tracking-widest ${isDarkMinimal ? 'text-white/50' : 'text-slate-500'}`;

  const form = (
    <div className="w-full max-w-sm space-y-6">
      <a
        href={`/preview/${projectId}`}
        className={`text-[11px] font-bold transition ${isDarkMinimal ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}
      >
        ← Back to site
      </a>

      <div className="space-y-3">
        {(isMinimalLogo || isCentered) &&
          (logoUrl ? (
            <img src={logoUrl} alt={brand} className="w-14 h-14 rounded-2xl object-cover shadow-lg mb-2" />
          ) : (
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg mb-2" style={{ backgroundColor: accent }}>
              {logoIcon || theme?.brandIcon || '💪'}
            </div>
          ))}
        <h1 className={`text-3xl font-black tracking-tight ${isDarkMinimal ? 'text-white' : 'text-slate-900'}`}>
          {isSignUp ? 'Create account' : c.portalLabel}
        </h1>
        <p className={`text-[13px] ${isDarkMinimal ? 'text-white/45' : 'text-slate-500'}`}>
          {isSignUp ? `Join ${brand} and book your first session in minutes.` : `Access your ${brand} schedule, bookings and progress.`}
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

      <div className={`flex gap-1 p-1 rounded-xl border ${isDarkMinimal ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
        {[
          { k: false, l: 'Sign In' },
          { k: true, l: 'Sign Up' },
        ].map((m) => (
          <button
            key={m.l}
            type="button"
            onClick={() => setIsSignUp(m.k)}
            className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer transition ${
              isSignUp === m.k ? 'text-white' : `bg-transparent ${isDarkMinimal ? 'text-white/50' : 'text-slate-500'} hover:opacity-80`
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
          <input name="email" type="email" required placeholder="member@example.com" className={inputCls} />
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
          {isSignUp ? 'Create Account ➔' : `Enter ${c.portalLabel} ➔`}
        </button>
      </form>

      <p className={`text-center text-[10px] font-semibold ${isDarkMinimal ? 'text-white/30' : 'text-slate-400'}`}>
        Secure member sign in
      </p>
    </div>
  );

  const panel = (
    <div className="relative hidden lg:block overflow-hidden">
      <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}e6, #0f172aee)` }} />
      <div className="relative h-full flex flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-2.5">
          {logoUrl ? (
            <img src={logoUrl} alt={brand} className="w-10 h-10 rounded-xl object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-xl">
              {logoIcon || theme?.brandIcon || '💪'}
            </div>
          )}
          <span className="font-black text-[15px] uppercase">{brand}</span>
        </div>
        <div className="space-y-4 max-w-sm">
          <h2 className="text-4xl font-black uppercase leading-tight tracking-tight whitespace-pre-line">{c.headline}</h2>
          <p className="text-white/75 text-[13px] leading-relaxed">{gymInfo?.description || c.sub}</p>
          <div className="flex gap-6 pt-4">
            {c.stats.slice(0, 3).map((s) => (
              <div key={s.l}>
                <div className="text-xl font-black">{s.v}</div>
                <div className="text-[9px] uppercase tracking-widest text-white/50 font-bold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">Powered by ZATBIZ</p>
      </div>
    </div>
  );

  if (isCentered || isMesh || isGeometric) {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-8">
        {isMesh ? (
          <div className="absolute inset-0 bg-slate-50">
            <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-40" style={{ backgroundColor: accent }} />
            <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-30" style={{ backgroundColor: theme?.secondaryColor || accent }} />
          </div>
        ) : isGeometric ? (
          <div
            className="absolute inset-0 bg-slate-50"
            style={{
              backgroundImage: `linear-gradient(135deg, ${accent}14 25%, transparent 25%, transparent 50%, ${accent}14 50%, ${accent}14 75%, transparent 75%)`,
              backgroundSize: '48px 48px',
            }}
          />
        ) : (
          <>
            <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm" />
          </>
        )}
        <div className={`relative w-full max-w-md rounded-[32px] p-8 sm:p-10 shadow-2xl border ${isCentered ? 'bg-white/90 backdrop-blur-2xl border-white/60' : 'bg-white border-slate-200'}`}>
          {form}
        </div>
      </main>
    );
  }

  if (isMinimalLogo) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-[32px] p-10 shadow-xl">{form}</div>
      </main>
    );
  }

  if (isDarkMinimal) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: theme?.bgColor || '#09090b' }}>
        <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-[32px] p-10 backdrop-blur-xl">{form}</div>
      </main>
    );
  }

  if (isSidePanel) {
    return (
      <main className="min-h-screen grid lg:grid-cols-[1.4fr_1fr] bg-slate-50">
        <div className="relative hidden lg:block overflow-hidden">
          <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/35" />
        </div>
        <div className="flex items-center justify-center p-8 sm:p-12 bg-white">{form}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {!isRight && panel}
      <div className="flex items-center justify-center p-8 sm:p-14 bg-white">{form}</div>
      {isRight && panel}
    </main>
  );
}
