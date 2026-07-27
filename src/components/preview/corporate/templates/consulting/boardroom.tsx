'use client';

import React from 'react';
import { Reveal, ArrowIcon, CorpView } from '../../_shared';

type P = { accent: string; onView: (v: CorpView) => void };
const serif = { fontFamily: 'Georgia, serif' };

export function Landing({ accent, onView }: P) {
  return (
    <div className="min-h-screen bg-[#0c0f14] font-sans text-slate-100">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="text-xl font-black tracking-[0.2em]" style={serif}>ASHWORTH & CO.</div>
          <button onClick={() => onView('login')} className="rounded-full border border-white/30 px-5 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-slate-900">Portal</button>
        </div>
      </header>

      <section className="relative flex min-h-[92vh] items-center">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f14] via-[#0c0f14]/70 to-transparent" />
        <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.5em]" style={{ color: accent }}>Private advisory · Est. MCMLXXX</p>
          <h1 className="mt-8 text-5xl font-black leading-[1.05] md:text-7xl" style={serif}>Counsel for the boardroom's hardest decisions.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">Discreet, senior-led advisory for capital, M&A, and succession — trusted by the world's most established institutions.</p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="#work" className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black text-white" style={{ backgroundColor: accent }}>Our mandates <ArrowIcon /></a>
            <button onClick={() => onView('login')} className="rounded-full border border-white/30 px-8 py-4 text-sm font-black">Client portal</button>
          </div>
        </Reveal>
      </section>

      <section id="work" className="mx-auto max-w-5xl px-6 py-24">
        <Reveal className="mb-14 text-center"><h2 className="text-4xl font-black" style={serif}>Selected mandates</h2></Reveal>
        <div className="space-y-px">
          {[['€2.4B cross-border merger', 'Financial services · 2025'], ['Family office succession', 'Private wealth · 2024'], ['Sovereign fund strategy', 'Public sector · 2024']].map(([t, m], i) => (
            <Reveal key={t} delay={i * 100}>
              <div className="group flex items-center justify-between border-b border-white/10 py-7 transition hover:px-4">
                <div>
                  <h3 className="text-2xl font-black" style={serif}>{t}</h3>
                  <p className="mt-1 text-sm text-slate-400">{m}</p>
                </div>
                <span className="opacity-0 transition group-hover:opacity-100" style={{ color: accent }}><ArrowIcon className="h-6 w-6" /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-20 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-black md:text-4xl" style={serif}>A conversation, in confidence.</h2>
          <button onClick={() => onView('login')} className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black text-white" style={{ backgroundColor: accent }}>Enter portal <ArrowIcon /></button>
        </Reveal>
      </section>

      <footer className="py-8 text-center text-xs text-slate-600">Ashworth &amp; Co. · Boardroom Dark theme · Live preview.</footer>
    </div>
  );
}

export function Login({ accent, onView }: P) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0c0f14] p-4">
      <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <Reveal className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl">
        <div className="text-center">
          <div className="text-lg font-black tracking-[0.2em]" style={serif}>ASHWORTH &amp; CO.</div>
          <h1 className="mt-4 text-2xl font-black" style={serif}>Private client access</h1>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onView('dashboard'); }} className="mt-8 space-y-4">
          <input defaultValue="client@ashworth.co" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
          <input type="password" defaultValue="password" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" />
          <button className="w-full rounded-lg py-3.5 text-sm font-black text-white" style={{ backgroundColor: accent }}>Enter</button>
        </form>
      </Reveal>
    </div>
  );
}

export function Dashboard({ accent, onView }: P) {
  return (
    <div className="min-h-screen bg-[#0c0f14] p-6 font-sans text-slate-100 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>Private portal</div>
            <h1 className="mt-2 text-3xl font-black" style={serif}>Good evening, Mr. Blackwood.</h1>
          </div>
          <button onClick={() => onView('landing')} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold">View site</button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[['Portfolio value', '€48.2M', '+3.4%'], ['Active mandates', '4', 'On track'], ['Next review', 'Mar 14', 'Boardroom']].map(([l, v, s]) => (
            <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-xs uppercase tracking-wide text-slate-500">{l}</div>
              <div className="mt-2 text-3xl font-black" style={serif}>{v}</div>
              <div className="mt-1 text-xs font-bold" style={{ color: accent }}>{s}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-300">Confidential documents</h3>
          <ul className="mt-4 divide-y divide-white/5">
            {['Merger term sheet — draft 4', 'Succession memorandum', 'Q4 capital review'].map((d) => (
              <li key={d} className="flex items-center justify-between py-3 text-sm">
                <span style={serif}>{d}</span>
                <span className="text-xs font-black" style={{ color: accent }}>Open</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
