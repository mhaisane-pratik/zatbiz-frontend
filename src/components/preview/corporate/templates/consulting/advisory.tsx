'use client';

import React from 'react';
import { Reveal, ArrowIcon, CorpView } from '../../_shared';

type P = { accent: string; onView: (v: CorpView) => void };

export function Landing({ accent, onView }: P) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <div className="text-base font-black tracking-tight">north<span style={{ color: accent }}>·</span>partners</div>
        <nav className="hidden gap-8 text-sm font-medium text-slate-500 md:flex">
          <a href="#approach" className="hover:text-slate-900">Approach</a>
          <a href="#work" className="hover:text-slate-900">Work</a>
        </nav>
        <button onClick={() => onView('login')} className="text-sm font-bold" style={{ color: accent }}>Login →</button>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-16 pb-28">
        <Reveal>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">Clarity, before capital.</h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-500">A boutique advisory built on one belief: the right question is worth more than a hundred slides. We think slowly so you can move quickly.</p>
          <div className="mt-10 flex items-center gap-6">
            <a href="#approach" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black text-white" style={{ backgroundColor: accent }}>Start here <ArrowIcon /></a>
            <button onClick={() => onView('login')} className="text-sm font-bold text-slate-500 hover:text-slate-900">Client login</button>
          </div>
        </Reveal>
      </section>

      <section id="approach" className="border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="grid gap-16 md:grid-cols-3">
            {[['01', 'Listen', 'We start with your real constraints, not a template.'], ['02', 'Frame', 'We reduce the noise to the two or three decisions that matter.'], ['03', 'Execute', 'We stay until the change is real and measurable.']].map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 120}>
                <div className="text-sm font-black" style={{ color: accent }}>{n}</div>
                <h3 className="mt-4 text-2xl font-black">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="mb-10 text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Recent outcomes</Reveal>
          <div className="space-y-8">
            {[['Doubled margin for a family manufacturer', '18-month operations rebuild'], ['Guided a founder through exit', 'Positioning, diligence, and negotiation'], ['Reset a stalled expansion', 'Market re-entry across three regions']].map(([t, d], i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="group flex items-baseline justify-between border-b border-slate-100 pb-8">
                  <div className="max-w-xl">
                    <h3 className="text-2xl font-black">{t}</h3>
                    <p className="mt-1 text-sm text-slate-500">{d}</p>
                  </div>
                  <span className="text-slate-300 transition group-hover:translate-x-1" style={{ color: accent }}><ArrowIcon /></span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-28 text-center">
        <Reveal>
          <h2 className="text-4xl font-black md:text-5xl">Let's find the real question.</h2>
          <button onClick={() => onView('login')} className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black text-white" style={{ backgroundColor: accent }}>Access your account <ArrowIcon /></button>
        </Reveal>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-400">north·partners · Advisory Light theme · Live preview.</footer>
    </div>
  );
}

export function Login({ accent, onView }: P) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <Reveal className="w-full max-w-sm">
        <div className="text-base font-black tracking-tight">north<span style={{ color: accent }}>·</span>partners</div>
        <h1 className="mt-10 text-4xl font-black leading-tight">Welcome back.</h1>
        <p className="mt-3 text-sm text-slate-500">Sign in to your client account.</p>
        <form onSubmit={(e) => { e.preventDefault(); onView('dashboard'); }} className="mt-8 space-y-4">
          <input defaultValue="hello@northpartners.com" className="w-full border-b border-slate-200 py-3 text-sm outline-none focus:border-slate-900" />
          <input type="password" defaultValue="password" className="w-full border-b border-slate-200 py-3 text-sm outline-none focus:border-slate-900" />
          <button className="mt-4 w-full rounded-full py-3.5 text-sm font-black text-white" style={{ backgroundColor: accent }}>Sign in →</button>
        </form>
      </Reveal>
    </div>
  );
}

export function Dashboard({ accent, onView }: P) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Client workspace</div>
            <h1 className="mt-2 text-3xl font-black">Hello, Priya.</h1>
          </div>
          <button onClick={() => onView('landing')} className="text-sm font-bold" style={{ color: accent }}>View site →</button>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[['Engagement', 'Operations rebuild'], ['Phase', '2 of 4 · Framing'], ['Next session', 'Thu, 10:00']].map(([l, v]) => (
            <div key={l} className="border-t-2 pt-4" style={{ borderColor: accent }}>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{l}</div>
              <div className="mt-2 text-lg font-black">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Shared documents</h3>
          <ul className="mt-6 divide-y divide-slate-100">
            {['Decision memo — v2', 'Cost model workbook', 'Stakeholder map'].map((d) => (
              <li key={d} className="flex items-center justify-between py-4">
                <span className="text-lg font-bold">{d}</span>
                <span className="text-sm font-black" style={{ color: accent }}>Open</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
