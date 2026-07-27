'use client';

import React, { useState } from 'react';
import { CORP_TEMPLATES, getTemplate, getTheme } from '@/components/preview/corporate/corporateData';
import { Reveal, ArrowIcon, CorpPreviewBar, CorpView } from '@/components/preview/corporate/_shared';
import { getBundle } from '@/components/preview/corporate/registry';

type Stage = 'templates' | 'themes' | 'preview';

export default function CorporatePreviewPage() {
  const [stage, setStage] = useState<Stage>('templates');
  const [templateId, setTemplateId] = useState(CORP_TEMPLATES[0].id);
  const [themeId, setThemeId] = useState(CORP_TEMPLATES[0].themes[0].id);
  const [view, setView] = useState<CorpView>('landing');

  const template = getTemplate(templateId);
  const theme = getTheme(template, themeId);

  // STAGE 1 — pick 1 of 4 templates
  if (stage === 'templates') {
    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-blue-400">Corporate · Choose a template</p>
            <h1 className="mt-5 text-4xl font-black md:text-6xl">Four business types.<br /><span className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent">Each with four distinct themes.</span></h1>
            <p className="mx-auto mt-5 max-w-lg text-slate-400">Pick a template, then a theme. Every theme is a completely different landing, login, and dashboard.</p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {CORP_TEMPLATES.map((t, i) => (
              <Reveal key={t.id} delay={i * 100}>
                <button
                  onClick={() => { setTemplateId(t.id); setThemeId(t.themes[0].id); setStage('themes'); window.scrollTo({ top: 0 }); }}
                  className="group flex w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left transition hover:-translate-y-1 hover:border-white/25"
                >
                  <div className="relative h-40 w-40 shrink-0 overflow-hidden">
                    <img src={t.image} alt={t.name} className="h-full w-full object-cover opacity-80 transition group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${t.gradient} opacity-50 mix-blend-multiply`} />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-5">
                    <span className="text-2xl">{t.emoji}</span>
                    <h3 className="mt-1 text-lg font-black">{t.name}</h3>
                    <p className="mt-1 text-xs text-slate-400">{t.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-black text-white">4 themes <ArrowIcon className="h-3.5 w-3.5" /></span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // STAGE 2 — pick 1 of 4 themes for the chosen template
  if (stage === 'themes') {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <button onClick={() => setStage('templates')} className="mb-8 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold transition hover:bg-white/20">
            <span className="rotate-180"><ArrowIcon className="h-3.5 w-3.5" /></span> All templates
          </button>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: template.themes[0].accent }}>{template.emoji} {template.name}</p>
            <h1 className="mt-4 text-3xl font-black md:text-5xl">Choose a theme</h1>
            <p className="mt-3 text-slate-400">Each theme is a fully different design — layout, colour, and dashboard.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {template.themes.map((th, i) => (
              <Reveal key={th.id} delay={i * 90}>
                <button
                  onClick={() => { setThemeId(th.id); setView('landing'); setStage('preview'); window.scrollTo({ top: 0 }); }}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:-translate-y-2 hover:border-white/25"
                >
                  <div className="h-24" style={{ background: `linear-gradient(135deg, ${th.accent}, ${th.accent}99)` }} />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-black">{th.name}</h3>
                    <p className="mt-1 flex-1 text-xs text-slate-400">{th.style}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-white">Open preview <ArrowIcon className="h-3.5 w-3.5" /></span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // STAGE 3 — live preview with landing/login/dashboard switcher
  const bundle = getBundle(template.id, theme.id, `${template.name} · ${theme.name}`);
  const View = view === 'landing' ? bundle.Landing : view === 'login' ? bundle.Login : bundle.Dashboard;
  return (
    <div>
      <CorpPreviewBar
        label={`${template.name} · ${theme.name}`}
        accent={theme.accent}
        view={view}
        onView={setView}
        onBack={() => { setStage('themes'); window.scrollTo({ top: 0 }); }}
      />
      <View accent={theme.accent} onView={(v) => { setView(v); window.scrollTo({ top: 0 }); }} />
    </div>
  );
}
