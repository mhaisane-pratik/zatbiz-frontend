'use client';

import React from 'react';
import { resolveWeddingProfile } from './weddingProfiles';

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
  niche?: string;
}

/**
 * Themed Wedding/Event login — matches the niche the user previewed (same
 * colors and hero image via the shared weddingProfiles source of truth).
 */
export default function WeddingThemedLogin({
  projectId,
  isSignUp,
  setIsSignUp,
  companyName,
  logoUrl,
  logoIcon,
  errorMessage,
  successMessage,
  handleLoginSubmit,
  niche,
}: Props) {
  const p = resolveWeddingProfile(niche || companyName);

  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-slate-50 text-slate-800">
      {/* Left: themed hero */}
      <div className="relative hidden md:block overflow-hidden">
        <img src={p.hero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${p.primary}cc 0%, rgba(0,0,0,0.6) 100%)` }} />
        <div className="absolute top-8 left-8 flex items-center gap-2 text-white">
          {logoUrl ? <img src={logoUrl} alt="" className="w-9 h-9 rounded-lg object-cover" /> : (
            <span className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>{logoIcon}</span>
          )}
          <span className="font-black text-lg">{companyName}</span>
        </div>
        <div className="absolute bottom-10 left-8 right-8 text-white">
          <h3 className="text-3xl font-black mb-2 leading-tight">{p.headline}</h3>
          <p className="text-sm opacity-90">{p.loginTag}</p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl mb-5" style={{ backgroundColor: p.primary }}>{logoIcon}</div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
          <p className="text-xs text-slate-500 mb-6">Sign in to your {companyName} portal.</p>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold">⚠️ {errorMessage}</div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">✓ {successMessage}</div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-3">
            {isSignUp && (
              <>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                  <input name="name" required placeholder="Your name" className="w-full mt-1 px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 outline-none focus:border-slate-400" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Phone</label>
                  <input name="phone" placeholder="+91 …" className="w-full mt-1 px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 outline-none focus:border-slate-400" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Address</label>
                  <input name="address" placeholder="City / area" className="w-full mt-1 px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 outline-none focus:border-slate-400" />
                </div>
              </>
            )}
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400">Email</label>
              <input name="email" type="email" required placeholder="you@email.com" className="w-full mt-1 px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 outline-none focus:border-slate-400" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400">Password</label>
              <input name="password" type="password" required placeholder="••••••••" className="w-full mt-1 px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 outline-none focus:border-slate-400" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl text-xs font-black text-white transition hover:opacity-90" style={{ backgroundColor: p.primary }}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-400 mt-5">
            {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-black cursor-pointer bg-transparent border-none" style={{ color: p.primary }}>
              {isSignUp ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
