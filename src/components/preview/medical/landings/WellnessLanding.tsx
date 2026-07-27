'use client';

import React from 'react';
import { Reveal, ArrowIcon } from '../_shared';

const PRODUCTS = [
  { name: 'Radiance Serum', cat: 'Skincare', price: '$48', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80' },
  { name: 'Collagen Complex', cat: 'Supplement', price: '$36', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80' },
  { name: 'Calm Night Drops', cat: 'Wellness', price: '$29', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80' },
];

export default function WellnessLanding({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-[#faf7ff] font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf7ff]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="text-xl font-black tracking-[0.2em]" style={{ fontFamily: 'Georgia, serif' }}>LUMÉ</div>
          <nav className="hidden items-center gap-9 text-xs font-bold uppercase tracking-widest text-slate-500 md:flex">
            <a href="#shop" className="hover:text-violet-600">Shop</a>
            <a href="#ritual" className="hover:text-violet-600">Ritual</a>
            <a href="#about" className="hover:text-violet-600">About</a>
          </nav>
          <button onClick={onLogin} className="rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-violet-600">
            Login
          </button>
        </div>
      </header>

      {/* Hero — editorial */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-24">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.5em] text-violet-500">Clean beauty · Inner wellness</p>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl" style={{ fontFamily: 'Georgia, serif' }}>
            Elevate your everyday self-care.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-500">
            A curated apothecary of dermatologist-formulated skincare and supplements — minimal ingredients, maximal glow.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-12">
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80" alt="wellness" className="h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 to-transparent" />
            <button onClick={onLogin} className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-900 transition hover:scale-105">
              Discover the collection <ArrowIcon />
            </button>
          </div>
        </Reveal>
      </section>

      {/* Products — minimal grid */}
      <section id="shop" className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl font-black" style={{ fontFamily: 'Georgia, serif' }}>The essentials</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Free shipping over $50</span>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 130} className="h-full">
              <div className="group">
                <div className="relative overflow-hidden rounded-[2rem] bg-white">
                  <img src={p.img} alt={p.name} loading="lazy" className="h-80 w-full object-cover transition duration-700 group-hover:scale-105" />
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-900 opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:bottom-6 group-hover:opacity-100">
                    Add · {p.price}
                  </button>
                </div>
                <div className="mt-5 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-500">{p.cat}</span>
                  <h3 className="mt-1 text-xl font-black" style={{ fontFamily: 'Georgia, serif' }}>{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{p.price}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ritual split */}
      <section id="ritual" className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
          <Reveal>
            <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80" alt="ritual" className="w-full rounded-[2.5rem] object-cover" />
          </Reveal>
          <Reveal delay={150}>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-violet-500">The Lumé ritual</p>
            <h2 className="mt-4 text-4xl font-black leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Three minutes of calm, morning and night.
            </h2>
            <div className="mt-8 space-y-5">
              {[['01', 'Cleanse', 'A gentle reset for balanced, breathable skin.'], ['02', 'Treat', 'Targeted serums that work while you rest.'], ['03', 'Glow', 'Lock in radiance with lightweight hydration.']].map(([n, t, d]) => (
                <div key={n} className="flex gap-5">
                  <span className="text-2xl font-black text-violet-300" style={{ fontFamily: 'Georgia, serif' }}>{n}</span>
                  <div>
                    <h3 className="text-lg font-black">{t}</h3>
                    <p className="mt-1 text-sm text-slate-500">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-4xl font-black leading-tight md:text-5xl" style={{ fontFamily: 'Georgia, serif' }}>
            Become a member. Glow with intention.
          </h2>
          <button onClick={onLogin} className="mt-9 inline-flex items-center gap-2 rounded-full bg-slate-900 px-9 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-violet-600">
            Login to your account <ArrowIcon />
          </button>
        </Reveal>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-400">
        LUMÉ · Clean beauty apothecary · Live theme preview.
      </footer>
    </div>
  );
}
