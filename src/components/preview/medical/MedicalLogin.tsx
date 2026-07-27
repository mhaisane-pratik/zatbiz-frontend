'use client';

import React, { useState } from 'react';
import { MedicalNiche } from './medicalNiches';
import { Reveal, ArrowIcon } from './_shared';

/** Shared input + button block, tinted by the niche accent. */
function Form({
  accent,
  dark = false,
  rounded = 'rounded-2xl',
  cta = 'Login',
}: {
  accent: string;
  dark?: boolean;
  rounded?: string;
  cta?: string;
}) {
  const [show, setShow] = useState(false);
  const label = dark ? 'text-slate-300' : 'text-slate-500';
  const field = dark
    ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500'
    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400';
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <div className="space-y-1.5 text-left">
        <label className={`text-[11px] font-black uppercase tracking-wider ${label}`}>Email address</label>
        <input type="email" defaultValue="demo@pharmacy.com" className={`w-full ${rounded} border px-4 py-3 text-sm outline-none transition focus:ring-4 ${field}`} style={{ ['--tw-ring-color' as any]: accent + '22' }} />
      </div>
      <div className="space-y-1.5 text-left">
        <label className={`text-[11px] font-black uppercase tracking-wider ${label}`}>Password</label>
        <div className="relative">
          <input type={show ? 'text' : 'password'} defaultValue="password123" className={`w-full ${rounded} border px-4 py-3 pr-11 text-sm outline-none transition focus:ring-4 ${field}`} style={{ ['--tw-ring-color' as any]: accent + '22' }} />
          <button type="button" onClick={() => setShow(!show)} className={`absolute inset-y-0 right-0 pr-4 text-xs font-bold ${dark ? 'text-slate-400' : 'text-slate-400'}`}>{show ? 'Hide' : 'Show'}</button>
        </div>
      </div>
      <button type="submit" className={`group flex w-full items-center justify-center gap-2 ${rounded} py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5`} style={{ backgroundColor: accent }}>
        {cta} <span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
      </button>
      <p className={`text-center text-xs ${label}`}>
        No account? <span className="cursor-pointer font-black" style={{ color: accent }}>Create one</span>
      </p>
    </form>
  );
}

export default function MedicalLogin({ niche, onBack }: { niche: MedicalNiche; onBack: () => void }) {
  const heroImg: Record<string, string> = {
    retail: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80',
    ayurvedic: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=1200&q=80',
    surgical: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80',
    pediatric: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
    wellness: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
  };

  const Brand = (
    <div className="flex items-center gap-2 font-black">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ backgroundColor: niche.accent }}>{niche.emoji}</span>
      {niche.name}
    </div>
  );

  // RETAIL — clean left-illustration split
  if (niche.id === 'retail') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-emerald-50 p-4">
        <Reveal className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
          <div className="relative hidden lg:block">
            <img src={heroImg.retail} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-emerald-600/30" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="text-2xl font-black">Welcome back to MediCare+</h2>
              <p className="mt-2 text-sm text-emerald-50">Reorder in one tap and track your delivery live.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            {Brand}
            <h1 className="mt-6 text-3xl font-black">Login to your account</h1>
            <p className="mt-2 text-sm text-slate-500">Your health, delivered.</p>
            <div className="mt-8"><Form accent={niche.accent} /></div>
          </div>
        </Reveal>
      </div>
    );
  }

  // AYURVEDIC — full-bleed image with centered glass card, serif
  if (niche.id === 'ayurvedic') {
    return (
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <img src={heroImg.ayurvedic} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-stone-900/60" />
        <Reveal className="relative w-full max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-8 backdrop-blur-xl md:p-10">
          <div className="text-center text-white">
            <div className="text-2xl">🌿</div>
            <h1 className="mt-3 text-3xl font-black" style={{ fontFamily: 'Georgia, serif' }}>Vedaroot</h1>
            <p className="mt-1 text-sm text-stone-200">Sign in to your wellness journey</p>
          </div>
          <div className="mt-8 [&_label]:text-stone-200">
            <Form accent="#d97706" dark rounded="rounded-xl" cta="Enter" />
          </div>
        </Reveal>
      </div>
    );
  }

  // SURGICAL — dark technical split, form left / image right
  if (niche.id === 'surgical') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
        <Reveal className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 text-white md:p-12">
            <div className="flex items-center gap-2 font-black">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600">🔬</span>
              SterileTech Pro
            </div>
            <h1 className="mt-6 text-3xl font-black">Partner portal access</h1>
            <p className="mt-2 text-sm text-slate-400">Secure login for verified healthcare facilities.</p>
            <div className="mt-8"><Form accent="#0ea5e9" dark rounded="rounded-lg" cta="Authenticate" /></div>
          </div>
          <div className="relative hidden lg:block">
            <img src={heroImg.surgical} alt="" className="h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-950" />
          </div>
        </Reveal>
      </div>
    );
  }

  // PEDIATRIC — playful pastel centered card with blobs
  if (niche.id === 'pediatric') {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff5f9] p-4">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-pink-200/60 blur-2xl" />
          <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-violet-200/60 blur-2xl" />
          <div className="absolute right-1/3 top-1/4 h-32 w-32 rounded-full bg-amber-200/60 blur-2xl" />
        </div>
        <Reveal className="relative w-full max-w-md rounded-[2.5rem] bg-white p-8 text-center shadow-2xl shadow-pink-500/10 md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-3xl">🧸</div>
          <h1 className="mt-5 text-3xl font-black">Hello, parent!</h1>
          <p className="mt-2 text-sm text-slate-500">Login to your LittleCare family account.</p>
          <div className="mt-8 text-left"><Form accent="#ec4899" rounded="rounded-full" cta="Login" /></div>
        </Reveal>
      </div>
    );
  }

  // WELLNESS — minimal editorial centered
  return (
    <div className="flex min-h-screen bg-[#faf7ff]">
      <div className="relative hidden w-1/2 lg:block">
        <img src={heroImg.wellness} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-20">
        <Reveal className="mx-auto w-full max-w-sm">
          <div className="text-2xl font-black tracking-[0.2em]" style={{ fontFamily: 'Georgia, serif' }}>LUMÉ</div>
          <h1 className="mt-8 text-4xl font-black leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Welcome back.</h1>
          <p className="mt-3 text-sm text-slate-500">Sign in to continue your ritual.</p>
          <div className="mt-8"><Form accent="#7c3aed" rounded="rounded-xl" cta="Sign in" /></div>
        </Reveal>
      </div>
    </div>
  );
}
