'use client';

import React from 'react';
import { MEDICAL_NICHES } from './medicalNiches';
import { Reveal, ArrowIcon } from './_shared';

export default function MedicalNicheSelector({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-400">Medical Shop · Choose your niche</p>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Five pharmacies.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              Five completely different looks.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400">
            Pick a niche to open its live storefront. Each one has its own theme, layout, imagery, and matching login — not just a colour swap.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MEDICAL_NICHES.map((niche, i) => (
            <Reveal key={niche.id} delay={i * 110} className="h-full">
              <button
                onClick={() => onSelect(niche.id)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left transition-all duration-500 hover:-translate-y-2 hover:border-white/25"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={niche.image}
                    alt={niche.name}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${niche.gradient} opacity-40 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-slate-900 backdrop-blur">
                    {niche.emoji} {niche.vibe}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-black">{niche.name}</h3>
                  <p className="mt-1 text-sm font-semibold" style={{ color: niche.accent === '#0ea5e9' ? '#38bdf8' : niche.accent }}>
                    {niche.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{niche.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white">
                    Open live preview
                    <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
                  </span>
                </div>
              </button>
            </Reveal>
          ))}

          {/* Hint card */}
          <Reveal delay={550} className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
              <span className="text-4xl">👆</span>
              <p className="mt-4 text-sm font-semibold text-slate-300">Tap any theme</p>
              <p className="mt-1 text-xs text-slate-500">Each opens a full scrollable landing page with its own login screen.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
