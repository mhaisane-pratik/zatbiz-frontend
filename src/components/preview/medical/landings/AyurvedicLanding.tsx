'use client';

import React from 'react';
import { Reveal, ArrowIcon } from '../_shared';

const REMEDIES = [
  { name: 'Ashwagandha Root', use: 'Stress & sleep', price: '$16', img: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Turmeric Gold', use: 'Immunity & joints', price: '$14', img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80' },
  { name: 'Triphala Blend', use: 'Digestion', price: '$12', img: 'https://images.unsplash.com/photo-1590080876351-3d1a5c3d2a9d?auto=format&fit=crop&w=600&q=80' },
];

export default function AyurvedicLanding({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-[#fbf7ef] font-sans text-stone-800">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-white">
          <div className="flex items-center gap-2 text-lg font-black tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            🌿 Vedaroot
          </div>
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#remedies" className="opacity-90 hover:opacity-100">Remedies</a>
            <a href="#story" className="opacity-90 hover:opacity-100">Our story</a>
            <a href="#ritual" className="opacity-90 hover:opacity-100">Rituals</a>
          </nav>
          <button onClick={onLogin} className="rounded-full border border-white/60 px-5 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-stone-800">
            Login
          </button>
        </div>
      </header>

      {/* Full-bleed hero */}
      <section className="relative flex min-h-[92vh] items-center">
        <img
          src="https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=1600&q=80"
          alt="Herbs"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <Reveal className="max-w-xl text-white">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-amber-300">Est. rituals · 100% natural</p>
            <h1 className="mt-6 text-5xl font-black leading-[1.05] md:text-7xl" style={{ fontFamily: 'Georgia, serif' }}>
              Ancient wisdom, naturally sourced.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-200">
              Hand-blended herbal remedies rooted in 5,000 years of Ayurveda — ethically harvested, lab-tested, and delivered pure.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#remedies" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-black text-stone-900 transition hover:bg-amber-400">
                Explore remedies <ArrowIcon />
              </a>
              <button onClick={onLogin} className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-black text-white transition hover:bg-white/10">
                Member login
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <img src="https://images.unsplash.com/photo-1509130298739-651801c76e96?auto=format&fit=crop&w=800&q=80" alt="mortar" className="w-full rounded-[2rem] object-cover shadow-xl" />
          </Reveal>
          <Reveal delay={150}>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-700">The origin</p>
            <h2 className="mt-4 text-4xl font-black leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              From the soil to your shelf, untouched by shortcuts.
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-600">
              Every batch is slow-dried, stone-ground, and blended by third-generation vaidyas. No fillers, no synthetics — just the plant, as nature intended.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[['5,000+', 'years of wisdom'], ['48', 'single-origin herbs'], ['0', 'artificial additives']].map(([v, l]) => (
                <div key={l}>
                  <div className="text-3xl font-black text-amber-700" style={{ fontFamily: 'Georgia, serif' }}>{v}</div>
                  <div className="mt-1 text-xs font-semibold text-stone-500">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Remedies */}
      <section id="remedies" className="bg-[#f2ead9] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-700">Bestselling remedies</p>
            <h2 className="mt-4 text-4xl font-black" style={{ fontFamily: 'Georgia, serif' }}>Formulated for balance</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {REMEDIES.map((r, i) => (
              <Reveal key={r.name} delay={i * 130} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
                  <div className="h-56 overflow-hidden">
                    <img src={r.img} alt={r.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-700">{r.use}</span>
                    <h3 className="mt-2 text-2xl font-black" style={{ fontFamily: 'Georgia, serif' }}>{r.name}</h3>
                    <div className="mt-5 flex items-center justify-center gap-4">
                      <span className="text-xl font-black">{r.price}</span>
                      <button className="rounded-full border-2 border-stone-800 px-5 py-2 text-xs font-black transition hover:bg-stone-800 hover:text-white">Add to cart</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual band */}
      <section id="ritual" className="relative overflow-hidden py-28 text-center text-white">
        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80" alt="tea ritual" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-stone-900/70" />
        <Reveal className="relative mx-auto max-w-2xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-amber-300">Daily ritual</p>
          <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl" style={{ fontFamily: 'Georgia, serif' }}>
            “The body benefits from movement, the mind benefits from stillness.”
          </h2>
          <button onClick={onLogin} className="mt-9 inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-black text-stone-900 transition hover:bg-amber-400">
            Begin your ritual <ArrowIcon />
          </button>
        </Reveal>
      </section>

      <footer className="bg-[#fbf7ef] py-10 text-center text-xs text-stone-400">
        🌿 Vedaroot Ayurveda · Rooted in tradition · Live theme preview.
      </footer>
    </div>
  );
}
