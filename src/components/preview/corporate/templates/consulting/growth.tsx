'use client';

import React from 'react';
import { Reveal, ArrowIcon, CorpView } from '../../_shared';

type P = { accent: string; onView: (v: CorpView) => void };

export function Landing({ accent, onView }: P) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-black"><span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ backgroundColor: accent }}>▲</span>Ascend</div>
          <button onClick={() => onView('login')} className="rounded-lg px-5 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: accent }}>Dashboard login</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <Reveal>
          <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: accent }}>Data-driven consulting</span>
          <h1 className="mt-5 text-4xl font-black leading-[1.1] md:text-5xl">We turn your numbers into your next quarter's growth.</h1>
          <p className="mt-5 max-w-md text-base text-slate-600">Diagnostics, benchmarking, and execution — measured every step, so you always know what's working.</p>
          <div className="mt-8 flex gap-3">
            <a href="#metrics" className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-black text-white" style={{ backgroundColor: accent }}>See the numbers <ArrowIcon /></a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between text-sm font-bold"><span>Client growth index</span><span style={{ color: accent }}>+42%</span></div>
            <div className="mt-6 flex h-44 items-end gap-2">
              {[30, 45, 40, 58, 66, 61, 80, 92].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: accent, opacity: 0.4 + i * 0.07 }} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[['ROI', '3.8x'], ['Payback', '5mo'], ['NPS', '72']].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-slate-50 p-3"><div className="text-lg font-black">{v}</div><div className="text-[10px] uppercase text-slate-400">{l}</div></div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="metrics" className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {[['$1.9B', 'Revenue influenced'], ['210+', 'Growth audits'], ['31%', 'Avg. margin lift'], ['14', 'Industries']].map(([v, l], i) => (
            <Reveal key={l} delay={i * 80} className="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center">
              <div className="text-3xl font-black" style={{ color: accent }}>{v}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="mb-8"><h2 className="text-3xl font-black">A measurable engagement model</h2></Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[['Diagnose', 'Baseline every metric that matters in 2 weeks.'], ['Deploy', 'Ship changes in fast, tracked sprints.'], ['Compound', 'Lock in gains with live dashboards.']].map(([t, d], i) => (
            <Reveal key={t} delay={i * 110}>
              <div className="h-full rounded-xl bg-white p-7 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg font-black text-white" style={{ backgroundColor: accent }}>{i + 1}</div>
                <h3 className="mt-4 text-lg font-black">{t}</h3>
                <p className="mt-2 text-sm text-slate-600">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <div className="rounded-2xl px-8 py-14 text-center text-white" style={{ backgroundColor: accent }}>
            <h2 className="text-3xl font-black md:text-4xl">See your growth dashboard live.</h2>
            <button onClick={() => onView('login')} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-black" style={{ color: accent }}>Login to dashboard <ArrowIcon /></button>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400">Ascend · Growth Data theme · Live preview.</footer>
    </div>
  );
}

export function Login({ accent, onView }: P) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between p-12 text-white lg:flex" style={{ backgroundColor: accent }}>
        <div className="flex items-center gap-2 text-lg font-black"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">▲</span>Ascend</div>
        <div>
          <h2 className="text-3xl font-black leading-tight">Your metrics, in real time.</h2>
          <div className="mt-8 flex h-32 items-end gap-2">
            {[40, 60, 50, 75, 65, 90].map((h, i) => <div key={i} className="flex-1 rounded-t bg-white/40" style={{ height: `${h}%` }} />)}
          </div>
        </div>
        <div className="text-xs text-white/60">SOC 2 · GDPR compliant</div>
      </div>
      <div className="flex w-full flex-col justify-center bg-white px-8 lg:w-1/2 lg:px-20">
        <Reveal className="mx-auto w-full max-w-sm">
          <h1 className="text-3xl font-black">Dashboard login</h1>
          <p className="mt-2 text-sm text-slate-500">Access your live growth metrics.</p>
          <form onSubmit={(e) => { e.preventDefault(); onView('dashboard'); }} className="mt-8 space-y-4">
            <input defaultValue="team@ascend.io" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
            <input type="password" defaultValue="password" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
            <button className="w-full rounded-lg py-3.5 text-sm font-black text-white" style={{ backgroundColor: accent }}>Sign in</button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

export function Dashboard({ accent, onView }: P) {
  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans text-slate-900 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black">Growth dashboard</h1>
          <button onClick={() => onView('landing')} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold">View site</button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[['MRR', '$284k', '+12%'], ['CAC', '$410', '-8%'], ['LTV', '$9.2k', '+5%'], ['Churn', '1.8%', '-0.3%']].map(([l, v, c]) => (
            <div key={l} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{l}</div>
              <div className="mt-2 text-2xl font-black">{v}</div>
              <div className="mt-1 text-xs font-black" style={{ color: accent }}>{c}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="text-sm font-black">Revenue vs. target</h3>
            <div className="mt-4 flex h-44 items-end gap-1.5">
              {[45, 52, 48, 63, 70, 66, 82, 78, 90, 95, 88, 99].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: accent, opacity: 0.4 + i * 0.05 }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-sm font-black">Top channels</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {[['Organic', '38%'], ['Paid', '27%'], ['Referral', '21%'], ['Direct', '14%']].map(([c, p]) => (
                <li key={c}>
                  <div className="flex justify-between font-semibold"><span>{c}</span><span>{p}</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: p, backgroundColor: accent }} /></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
