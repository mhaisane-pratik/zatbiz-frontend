'use client';

import React from 'react';
import { Reveal, ArrowIcon, CorpView } from '../../_shared';

type P = { accent: string; onView: (v: CorpView) => void };

export function Landing({ accent, onView }: P) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-black tracking-tight" style={{ color: accent }}>MERIDIAN<span className="text-slate-900"> Advisory</span></div>
          <nav className="hidden gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#services" className="hover:text-slate-900">Services</a>
            <a href="#results" className="hover:text-slate-900">Results</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>
          <button onClick={() => onView('login')} className="rounded-md px-5 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: accent }}>Client login</button>
        </div>
      </header>

      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>Trusted since 1998</span>
            <h1 className="mt-4 text-4xl font-black leading-[1.1] tracking-tight md:text-5xl">Strategy that moves the boardroom to action.</h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">We partner with leadership teams to unlock growth, cut cost, and execute transformation with measurable results.</p>
            <div className="mt-8 flex gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-black text-white" style={{ backgroundColor: accent }}>Book a consult <ArrowIcon /></a>
              <a href="#services" className="rounded-md border border-slate-300 px-6 py-3.5 text-sm font-black text-slate-700">Our services</a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" alt="team" className="w-full rounded-xl object-cover shadow-2xl" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-100 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {[['$4.2B', 'Value created'], ['320+', 'Engagements'], ['40', 'Countries'], ['96%', 'Repeat clients']].map(([v, l], i) => (
            <Reveal key={l} delay={i * 80} className="text-center">
              <div className="text-3xl font-black" style={{ color: accent }}>{v}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mb-10"><h2 className="text-3xl font-black">Practice areas</h2></Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[['Strategy & Growth', 'Market entry, M&A, and portfolio strategy.'], ['Operations', 'Cost transformation and supply-chain excellence.'], ['Digital', 'Data, automation, and technology roadmaps.']].map(([t, d], i) => (
            <Reveal key={t} delay={i * 110}>
              <div className="group h-full rounded-xl border border-slate-200 bg-white p-7 transition hover:-translate-y-2 hover:shadow-xl" style={{ borderTopColor: accent, borderTopWidth: 3 }}>
                <h3 className="text-lg font-black">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{d}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-black" style={{ color: accent }}>Learn more <ArrowIcon className="h-3.5 w-3.5" /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-slate-900 py-16">
        <Reveal className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-3xl font-black md:text-4xl">Ready to discuss your next move?</h2>
          <button onClick={() => onView('login')} className="mt-7 inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-black text-white" style={{ backgroundColor: accent }}>Access client portal <ArrowIcon /></button>
        </Reveal>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-400">© 2026 Meridian Advisory · Executive Navy theme · Live preview.</footer>
    </div>
  );
}

export function Login({ accent, onView }: P) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Reveal className="grid w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl lg:grid-cols-2">
        <div className="relative hidden lg:block" style={{ backgroundColor: accent }}>
          <div className="flex h-full flex-col justify-between p-10 text-white">
            <div className="text-lg font-black">MERIDIAN Advisory</div>
            <div>
              <h2 className="text-3xl font-black leading-tight">Welcome back to your client portal.</h2>
              <p className="mt-3 text-sm text-white/80">Access engagement dashboards, reports, and invoices.</p>
            </div>
            <div className="text-xs text-white/60">Secure · SOC 2 Type II</div>
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <h1 className="text-3xl font-black">Client login</h1>
          <p className="mt-2 text-sm text-slate-500">Enter your credentials to continue.</p>
          <form onSubmit={(e) => { e.preventDefault(); onView('dashboard'); }} className="mt-8 space-y-4">
            <input defaultValue="client@meridian.com" className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400" />
            <input type="password" defaultValue="password" className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400" />
            <button className="w-full rounded-md py-3.5 text-sm font-black text-white" style={{ backgroundColor: accent }}>Sign in</button>
          </form>
        </div>
      </Reveal>
    </div>
  );
}

export function Dashboard({ accent, onView }: P) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <div className="flex">
        <aside className="hidden w-56 shrink-0 flex-col gap-1 border-r border-slate-200 bg-white p-4 md:flex">
          <div className="mb-4 px-2 text-sm font-black" style={{ color: accent }}>MERIDIAN</div>
          {['Overview', 'Engagements', 'Reports', 'Invoices', 'Team'].map((m, i) => (
            <a key={m} className={`rounded-md px-3 py-2 text-sm font-bold ${i === 0 ? 'text-white' : 'text-slate-500 hover:bg-slate-100'}`} style={i === 0 ? { backgroundColor: accent } : undefined}>{m}</a>
          ))}
        </aside>
        <main className="flex-1 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Engagement overview</h1>
              <p className="text-sm text-slate-500">Welcome back, Alex.</p>
            </div>
            <button onClick={() => onView('landing')} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-bold">View site</button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[['Active projects', '12'], ['Hours this month', '1,840'], ['Open invoices', '$92k'], ['Satisfaction', '4.9/5']].map(([l, v]) => (
              <div key={l} className="rounded-xl bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{l}</div>
                <div className="mt-2 text-2xl font-black">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
              <h3 className="text-sm font-black">Revenue trend</h3>
              <div className="mt-4 flex h-40 items-end gap-2">
                {[40, 65, 52, 78, 60, 88, 72, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: accent, opacity: 0.35 + i * 0.08 }} />
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black">Recent reports</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {['Q2 Market Entry', 'Ops Cost Review', 'Digital Roadmap'].map((r) => (
                  <li key={r} className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-semibold text-slate-700">{r}</span>
                    <span className="text-xs font-black" style={{ color: accent }}>View</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
