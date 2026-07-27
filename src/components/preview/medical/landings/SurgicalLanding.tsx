'use client';

import React from 'react';
import { Reveal, ArrowIcon } from '../_shared';

const CATALOG = [
  { name: 'Surgical Steel Forceps', spec: 'AISI 420 · Autoclavable', code: 'SF-2201', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80' },
  { name: 'Nitrile Exam Gloves', spec: 'Powder-free · 4.5 mil', code: 'NG-0098', img: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=600&q=80' },
  { name: 'Patient Monitor', spec: '12" · ECG/SpO₂/NIBP', code: 'PM-7700', img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Sterile Gauze Pack', spec: '10×10cm · 100pcs', code: 'GZ-0450', img: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80' },
];

export default function SurgicalLanding({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-black tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-white">🔬</span>
            SterileTech<span className="text-sky-400"> Pro</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-400 md:flex">
            <a href="#catalog" className="hover:text-sky-400">Catalog</a>
            <a href="#specs" className="hover:text-sky-400">Compliance</a>
            <a href="#quote" className="hover:text-sky-400">Bulk quote</a>
          </nav>
          <button onClick={onLogin} className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sky-400">
            Partner login
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-sky-600/20 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-300">
              ISO 13485 · CE · FDA registered
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Precision equipment for <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">operating theatres.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400">
              Hospital-grade surgical instruments, consumables, and diagnostics — supplied at scale with full traceability and bulk pricing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalog" className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-7 py-3.5 text-sm font-black text-white transition hover:bg-sky-400">
                Browse catalog <ArrowIcon />
              </a>
              <a href="#quote" className="rounded-lg border border-white/15 px-7 py-3.5 text-sm font-black text-white transition hover:bg-white/5">
                Request bulk quote
              </a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80" alt="surgical" className="w-full rounded-2xl border border-white/10 object-cover shadow-2xl" />
          </Reveal>
        </div>
      </section>

      {/* Spec strip */}
      <section id="specs" className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-6 py-2 md:grid-cols-4">
          {[
            ['99.98%', 'Sterility assurance'],
            ['24h', 'Dispatch SLA'],
            ['3,400+', 'Hospital partners'],
            ['100%', 'Batch traceability'],
          ].map(([v, l], i) => (
            <Reveal key={l} delay={i * 80} className="py-6 text-center">
              <div className="text-3xl font-black text-sky-400">{v}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mb-10">
          <h2 className="text-3xl font-black">Equipment catalog</h2>
          <p className="mt-2 text-sm text-slate-400">Every SKU ships with a certificate of conformity and lot number.</p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATALOG.map((c, i) => (
            <Reveal key={c.code} delay={i * 90} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-2 hover:border-sky-500/40">
                <div className="h-40 overflow-hidden bg-slate-900">
                  <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-110 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-mono text-[10px] text-sky-400">{c.code}</span>
                  <h3 className="mt-1 text-sm font-black">{c.name}</h3>
                  <p className="mt-1 flex-1 text-xs text-slate-400">{c.spec}</p>
                  <button className="mt-4 w-full rounded-lg border border-white/15 py-2 text-xs font-black text-white transition hover:bg-sky-500 hover:border-sky-500">
                    Add to RFQ
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quote CTA */}
      <section id="quote" className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-sky-600/20 to-indigo-600/20 p-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-3xl font-black md:text-4xl">Need a facility-wide supply contract?</h2>
              <p className="mt-3 max-w-md text-sm text-slate-300">Get volume pricing, dedicated account management, and scheduled restocking. Log in to your partner portal to start.</p>
            </div>
            <button onClick={onLogin} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-slate-900 transition hover:scale-105">
              Access partner portal <ArrowIcon />
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-600">
        SterileTech Pro · Regulated medical device distributor · Live theme preview.
      </footer>
    </div>
  );
}
