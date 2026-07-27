'use client';

import React from 'react';
import { Reveal, ArrowIcon } from '../_shared';

const PRODUCTS = [
  { name: 'Gentle Baby Syrup', age: '0–2 yrs', price: '$8', color: 'bg-pink-100', img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=500&q=80' },
  { name: 'Kids Multivitamin Gummies', age: '3–8 yrs', price: '$15', color: 'bg-amber-100', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=500&q=80' },
  { name: 'Soft Nasal Aspirator', age: '0–3 yrs', price: '$11', color: 'bg-sky-100', img: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=500&q=80' },
  { name: 'Baby Skin Balm', age: 'All ages', price: '$9', color: 'bg-violet-100', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=80' },
];

export default function PediatricLanding({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-[#fff5f9] font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#fff5f9]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-black text-pink-500">
            🧸 LittleCare
          </div>
          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-500 md:flex">
            <a href="#shop" className="hover:text-pink-500">Shop</a>
            <a href="#ages" className="hover:text-pink-500">By age</a>
            <a href="#tips" className="hover:text-pink-500">Parenting tips</a>
          </nav>
          <button onClick={onLogin} className="rounded-full bg-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition hover:bg-pink-600">
            Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-10 h-40 w-40 rounded-full bg-pink-200/50 blur-2xl" />
          <div className="absolute right-16 top-20 h-52 w-52 rounded-full bg-violet-200/50 blur-2xl" />
          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-amber-200/50 blur-2xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-black text-pink-500 shadow-sm">
              🌸 Paediatrician approved
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight md:text-6xl">
              Gentle care for your <span className="text-pink-500">littlest</span> ones.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
              Safe, doctor-recommended medicine and baby essentials — delivered with a whole lot of love.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shop" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-pink-500/30 transition hover:scale-105">
                Shop essentials <ArrowIcon />
              </a>
              <button onClick={onLogin} className="rounded-full bg-white px-7 py-3.5 text-sm font-black text-slate-700 shadow-sm transition hover:shadow-md">
                Parent login
              </button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80" alt="baby" className="w-full rounded-[2.5rem] object-cover shadow-2xl shadow-pink-500/20" />
              <div className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl">
                <span className="text-2xl">💗</span>
                <div>
                  <div className="text-sm font-black">30k+ parents</div>
                  <div className="text-[11px] text-slate-400">trust LittleCare</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Shop by age */}
      <section id="ages" className="mx-auto max-w-6xl px-6 py-14">
        <Reveal className="mb-8 text-center">
          <h2 className="text-3xl font-black">Shop by age</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[['👶', '0–1 yr', 'bg-pink-100'], ['🧒', '1–3 yrs', 'bg-amber-100'], ['🧑', '3–6 yrs', 'bg-sky-100'], ['👦', '6–12 yrs', 'bg-violet-100']].map(([e, a, c], i) => (
            <Reveal key={a as string} delay={i * 80}>
              <div className={`flex cursor-pointer flex-col items-center gap-2 rounded-3xl ${c} p-7 transition hover:-translate-y-1`}>
                <span className="text-4xl">{e}</span>
                <span className="text-sm font-black text-slate-700">{a}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="mx-auto max-w-6xl px-6 py-14">
        <Reveal className="mb-8">
          <h2 className="text-3xl font-black">Loved by little ones</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                <div className={`h-36 overflow-hidden ${p.color}`}>
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-[10px] font-black uppercase tracking-wide text-pink-500">{p.age}</span>
                  <h3 className="mt-1 flex-1 text-sm font-black">{p.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-black">{p.price}</span>
                    <button className="rounded-full bg-pink-500 px-4 py-1.5 text-xs font-black text-white transition hover:bg-pink-600">Add</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section id="tips" className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['🌡️', 'Fever first-aid', 'When to worry and when to wait — a simple parent guide.'],
            ['🍼', 'Feeding & nutrition', 'Age-wise supplement charts approved by paediatricians.'],
            ['😴', 'Better sleep', 'Gentle routines to help your baby (and you) rest easy.'],
          ].map(([e, t, d], i) => (
            <Reveal key={t} delay={i * 110}>
              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <span className="text-3xl">{e}</span>
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
          <div className="rounded-[2.5rem] bg-gradient-to-r from-pink-400 to-fuchsia-400 px-8 py-14 text-center text-white">
            <h2 className="text-3xl font-black md:text-4xl">Join the LittleCare family 💗</h2>
            <p className="mx-auto mt-3 max-w-md text-pink-50">Sign in for personalised reminders, growth trackers, and members-only deals.</p>
            <button onClick={onLogin} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-pink-600 transition hover:scale-105">
              Login now <ArrowIcon />
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="py-8 text-center text-xs text-slate-400">
        🧸 LittleCare · Gentle paediatric pharmacy · Live theme preview.
      </footer>
    </div>
  );
}
