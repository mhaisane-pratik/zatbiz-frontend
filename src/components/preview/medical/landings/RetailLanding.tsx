'use client';

import React from 'react';
import { Reveal, ArrowIcon } from '../_shared';

const PRODUCTS = [
  { name: 'Paracetamol 500mg', price: '$4.50', tag: 'Pain relief', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80' },
  { name: 'Vitamin C 1000mg', price: '$12.00', tag: 'Immunity', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=500&q=80' },
  { name: 'Digital Thermometer', price: '$18.00', tag: 'Devices', img: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=500&q=80' },
  { name: 'First Aid Kit', price: '$25.00', tag: 'Essentials', img: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=500&q=80' },
];

const CATEGORIES = ['Prescription', 'Wellness', 'Baby Care', 'Devices', 'Personal Care', 'Ayurveda', 'Skin', 'Diabetes'];

export default function RetailLanding({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-black">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">💊</span>
            MediCare<span className="text-emerald-600">+</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#cats" className="hover:text-emerald-600">Shop</a>
            <a href="#products" className="hover:text-emerald-600">Offers</a>
            <a href="#how" className="hover:text-emerald-600">How it works</a>
          </nav>
          <button onClick={onLogin} className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700">
            Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              🚚 Same-day delivery in 90 minutes
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight md:text-5xl">
              Your trusted pharmacy, now at your doorstep.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
              Order genuine medicines, upload prescriptions, and get expert advice — all from one clean, reliable storefront.
            </p>
            <div className="mt-7 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <span className="pl-3 text-slate-400">🔍</span>
              <input placeholder="Search medicines, brands, health needs…" className="flex-1 bg-transparent px-2 py-2 text-sm outline-none" />
              <button className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700">Search</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Fever', 'Cold & Flu', 'Vitamins', 'Diabetes'].map((p) => (
                <span key={p} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{p}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80"
                alt="Pharmacist"
                className="w-full rounded-3xl object-cover shadow-2xl shadow-emerald-600/10"
              />
              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
                <div className="text-2xl font-black text-emerald-600">4.9★</div>
                <div className="text-[11px] font-semibold text-slate-500">50k+ happy customers</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-8 md:grid-cols-4">
          {[
            ['✅', '100% Genuine', 'Licensed & verified'],
            ['🔒', 'Secure Uploads', 'Encrypted prescriptions'],
            ['🚚', 'Fast Delivery', '90-min in metro'],
            ['💬', '24/7 Support', 'Pharmacist on call'],
          ].map(([icon, t, d], i) => (
            <Reveal key={t} delay={i * 90} className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="text-sm font-black">{t}</div>
                <div className="text-xs text-slate-500">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="cats" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-black md:text-3xl">Shop by category</h2>
          <a href="#products" className="text-sm font-bold text-emerald-600">View all →</a>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c} delay={i * 60}>
              <div className="group flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl transition group-hover:scale-110">💊</span>
                <span className="text-sm font-bold text-slate-700">{c}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-black md:text-3xl">Today's best sellers</h2>
            <p className="mt-2 text-sm text-slate-500">Handpicked essentials at everyday low prices.</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                  <div className="h-36 overflow-hidden bg-slate-100">
                    <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">{p.tag}</span>
                    <h3 className="mt-1 flex-1 text-sm font-bold">{p.name}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-black">{p.price}</span>
                      <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700">Add</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="mb-10 text-center">
          <h2 className="text-2xl font-black md:text-3xl">Get your medicines in 3 easy steps</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['1', 'Search or upload', 'Find medicines or upload your prescription securely.'],
            ['2', 'We verify & pack', 'A licensed pharmacist checks and packs your order.'],
            ['3', 'Doorstep delivery', 'Track live and receive within 90 minutes.'],
          ].map(([n, t, d], i) => (
            <Reveal key={t} delay={i * 120}>
              <div className="rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-lg font-black text-white">{n}</div>
                <h3 className="mt-4 text-lg font-black">{t}</h3>
                <p className="mt-2 text-sm text-slate-500">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-14 text-center text-white">
            <h2 className="text-3xl font-black md:text-4xl">Ready to order your first delivery?</h2>
            <p className="mx-auto mt-3 max-w-lg text-emerald-50">Create an account and get 20% off your first prescription order.</p>
            <button onClick={onLogin} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-emerald-700 transition hover:scale-105">
              Login &amp; get started <ArrowIcon />
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-slate-100 bg-white py-8 text-center text-xs text-slate-400">
        © 2026 MediCare+ · Licensed online pharmacy · This is a live theme preview.
      </footer>
    </div>
  );
}
