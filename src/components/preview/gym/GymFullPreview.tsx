'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getGymThemeContent, GymThemeContent } from './gymThemeContent';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface GymTheme {
  id: string;
  name: string;
  desc?: string;
  icon?: string;
  brandIcon?: string;
  tagline?: string;
  primaryColor: string;
  secondaryColor?: string;
  bgColor?: string;
  textColor?: string;
  accentBg?: string;
  gradient?: string;
}

interface Props {
  theme: GymTheme;
  category: string;
  bgImage: string;
  /** True once the user has explicitly picked a header image in step 3. */
  bgChosen?: boolean;
  loginLayout: string;
  onClose: () => void;
  onUseTheme: () => void;
}

type ViewMode = 'landing' | 'login' | 'dashboard';

/** Themes whose bgColor is a light surface need dark text on the landing page. */
function isLightSurface(hex?: string) {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function GymFullPreview({
  theme,
  category,
  bgImage,
  bgChosen,
  loginLayout,
  onClose,
  onUseTheme,
}: Props) {
  const [view, setView] = useState<ViewMode>('landing');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const scrollRef = useRef<HTMLDivElement>(null);

  const accent = theme.primaryColor || '#f97316';
  // Every piece of page content is keyed off the theme id.
  const content = useMemo(() => getGymThemeContent(theme.id), [theme.id]);
  const brand = theme.name || 'Iron Forge';

  // The theme's own hero wins unless the user explicitly picked a header image.
  const hero = bgChosen && bgImage ? bgImage : content.heroImage;

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) return;
    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('zb-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('zb-in');
            io.unobserve(e.target);
          }
        }),
      { root, threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [view, device, theme.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [view]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const tabs: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'landing', label: 'Landing Page', icon: '🏠' },
    { id: 'login', label: 'Login Page', icon: '🔐' },
    { id: 'dashboard', label: content.portalLabel, icon: '📊' },
  ];

  return (
    <div className="fixed inset-0 z-[80] bg-slate-950 flex flex-col">
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        [data-reveal].zb-in{opacity:1;transform:none}
        [data-reveal][data-delay="1"]{transition-delay:.09s}
        [data-reveal][data-delay="2"]{transition-delay:.18s}
        [data-reveal][data-delay="3"]{transition-delay:.27s}
        @keyframes zbFadeUp{from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:none}}
        @keyframes zbZoom{from{transform:scale(1.14)}to{transform:scale(1)}}
        @keyframes zbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes zbPulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:0;transform:scale(1.5)}}
        .zb-hero-t{animation:zbFadeUp .9s cubic-bezier(.16,1,.3,1) both}
        .zb-hero-img{animation:zbZoom 1.8s cubic-bezier(.16,1,.3,1) both}
        .zb-float{animation:zbFloat 5s ease-in-out infinite}
        .zb-ping{animation:zbPulse 2s ease-out infinite}
        .zb-scroll::-webkit-scrollbar{width:8px}
        .zb-scroll::-webkit-scrollbar-thumb{background:#334155;border-radius:8px}
      `}</style>

      {/* Top chrome */}
      <div className="shrink-0 bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 mr-1">
          <span className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>

        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md shrink-0 text-white"
            style={{ backgroundColor: accent }}
          >
            Live Preview
          </span>
          <span className="text-white text-xs font-bold truncate">
            {theme.brandIcon} {brand}
          </span>
          <span className="hidden md:inline text-slate-500 text-[10px] font-mono truncate">
            {brand.toLowerCase().replace(/[^a-z0-9]+/g, '')}.zatbiz.site
          </span>
        </div>

        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mx-auto order-last w-full sm:order-none sm:w-auto justify-center">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition border-none cursor-pointer ${
                view === t.id ? 'text-white' : 'bg-transparent text-slate-400 hover:text-white'
              }`}
              style={view === t.id ? { backgroundColor: accent } : undefined}
            >
              <span className="mr-1">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['desktop', 'mobile'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md border-none cursor-pointer transition ${
                  device === d ? 'bg-slate-800 text-white' : 'bg-transparent text-slate-500 hover:text-white'
                }`}
              >
                {d === 'desktop' ? '🖥 Desktop' : '📱 Mobile'}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 cursor-pointer transition flex items-center gap-1.5"
          >
            ← Back to Themes
          </button>
          <button
            onClick={onUseTheme}
            className="px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer text-white shadow-lg hover:brightness-110 transition"
            style={{ backgroundColor: accent }}
          >
            Use This Theme ➔
          </button>
          <button
            onClick={onClose}
            title="Close preview"
            className="px-3 py-2 text-[11px] font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border-none cursor-pointer transition"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="flex-grow min-h-0 bg-slate-800 flex justify-center">
        <div
          ref={scrollRef}
          key={view + device + theme.id}
          className={`zb-scroll h-full overflow-y-auto overflow-x-hidden bg-white transition-all duration-300 ${
            device === 'mobile' ? 'w-[420px] max-w-full border-x border-slate-700 shadow-2xl' : 'w-full'
          }`}
        >
          {view === 'landing' && (
            <GymLanding theme={theme} accent={accent} brand={brand} hero={hero} c={content} onLogin={() => setView('login')} />
          )}
          {view === 'login' && (
            <GymLogin
              theme={theme}
              accent={accent}
              brand={brand}
              hero={hero}
              c={content}
              layout={loginLayout}
              onSuccess={() => setView('dashboard')}
              onBack={() => setView('landing')}
            />
          )}
          {view === 'dashboard' && (
            <GymDashboard theme={theme} accent={accent} brand={brand} c={content} onLogout={() => setView('landing')} />
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="shrink-0 bg-slate-900 border-t border-slate-800 px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[11px] text-slate-400 font-semibold min-w-0">
          <span className="text-white font-bold">{brand}</span>
          <span className="hidden sm:inline"> · {category} · {content.eyebrow}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border-none cursor-pointer transition"
          >
            ← Back to Themes
          </button>
          <button
            onClick={onUseTheme}
            className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl border-none cursor-pointer text-white shadow-xl hover:scale-[1.02] transition"
            style={{ backgroundColor: accent }}
          >
            Use This Theme & Generate Site ➔
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LANDING                                                            */
/* ------------------------------------------------------------------ */

function GymLanding({
  theme,
  accent,
  brand,
  hero,
  c,
  onLogin,
}: {
  theme: GymTheme;
  accent: string;
  brand: string;
  hero: string;
  c: GymThemeContent;
  onLogin: () => void;
}) {
  const bg = theme.bgColor || '#09090b';
  const light = isLightSurface(bg);
  const [playing, setPlaying] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  // Surface tokens flip for light themes (Zen, Zumba, Aqua, Wellness, Royal, Digital)
  const t = {
    text: light ? 'text-slate-900' : 'text-white',
    muted: light ? 'text-slate-500' : 'text-white/50',
    soft: light ? 'text-slate-600' : 'text-white/65',
    border: light ? 'border-slate-200' : 'border-white/10',
    borderHover: light ? 'hover:border-slate-300' : 'hover:border-white/25',
    card: light ? 'bg-white' : 'bg-white/[0.03]',
    band: light ? 'bg-slate-50' : 'bg-white/[0.02]',
    navBtn: light
      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
      : 'bg-white/10 hover:bg-white/20 text-white border-white/15',
  };

  return (
    <div style={{ backgroundColor: bg }} className={t.text}>
      {/* NAV */}
      <nav className={`sticky top-0 z-30 backdrop-blur-xl border-b ${t.border}`} style={{ backgroundColor: `${bg}e6` }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-lg" style={{ backgroundColor: accent }}>
              {theme.brandIcon || '💪'}
            </div>
            <div className="min-w-0">
              <span className="font-black tracking-tight text-[15px] block truncate uppercase">{brand}</span>
              <span className="text-[8.5px] font-black uppercase tracking-[0.2em] block" style={{ color: accent }}>
                {c.eyebrow}
              </span>
            </div>
          </div>

          <div className={`hidden lg:flex items-center gap-7 text-[12px] font-semibold ${t.muted}`}>
            {c.navLinks.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/[^a-z]/g, '')}`} className={`${light ? 'hover:text-slate-900' : 'hover:text-white'} transition`}>
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={onLogin} className={`px-4 py-2 text-[11px] font-bold rounded-lg border cursor-pointer transition ${t.navBtn}`}>
              {c.portalLabel}
            </button>
            <button
              onClick={onLogin}
              className="px-4 py-2 text-[11px] font-black rounded-lg text-white border-none cursor-pointer hover:brightness-110 transition"
              style={{ backgroundColor: accent }}
            >
              {c.joinLabel}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[620px] flex items-center overflow-hidden">
        <img src={hero} alt={brand} className="zb-hero-img absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, #0b0b0f 8%, #0b0b0fd9 45%, transparent)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${light ? bg : '#0b0b0f'}, transparent 55%)` }} />

        <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-xl space-y-6 text-white">
            <span
              className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: accent, animationDelay: '.1s' }}
            >
              {theme.icon} {c.eyebrow}
            </span>
            <h1
              className="zb-hero-t text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[1] tracking-tight whitespace-pre-line"
              style={{ animationDelay: '.22s' }}
            >
              {c.headline}
            </h1>
            <p className="zb-hero-t text-white/70 text-[15px] leading-relaxed font-medium" style={{ animationDelay: '.34s' }}>
              {c.sub}
            </p>
            <div className="zb-hero-t flex flex-wrap gap-3 pt-1" style={{ animationDelay: '.46s' }}>
              <button
                onClick={onLogin}
                className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl text-white border-none cursor-pointer shadow-2xl hover:scale-[1.03] transition"
                style={{ backgroundColor: accent }}
              >
                {c.primaryCta}
              </button>
              <a
                href="#classes"
                className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition"
              >
                {c.secondaryCta}
              </a>
            </div>
            <div className="zb-hero-t flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[11px] font-semibold text-white/55" style={{ animationDelay: '.58s' }}>
              {c.stats.slice(0, 3).map((s) => (
                <span key={s.l}>
                  {s.v} · {s.l}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a href="#stats" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/70 text-[10px] font-bold tracking-widest uppercase zb-float transition">
          Scroll ↓
        </a>
      </section>

      {/* STATS */}
      <section id="stats" className={`border-y ${t.border} ${t.band}`}>
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {c.stats.map((s, i) => (
            <div key={s.l} data-reveal data-delay={i % 4} className="text-center">
              <div className="text-3xl font-black" style={{ color: accent }}>{s.v}</div>
              <div className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${t.muted}`}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div data-reveal className="text-center max-w-lg mx-auto space-y-3 mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
            {c.navLinks[0]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">{c.classesTitle}</h2>
          <p className={`text-[13px] leading-relaxed ${t.muted}`}>{c.classesSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.classes.map((cl, i) => (
            <div
              key={cl.name}
              data-reveal
              data-delay={i % 3}
              className={`group relative rounded-3xl overflow-hidden h-64 border ${t.border} ${t.borderHover} hover:-translate-y-1.5 transition duration-500`}
            >
              <img src={cl.img} alt={cl.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 space-y-1.5 text-white">
                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white inline-block" style={{ backgroundColor: accent }}>
                  {`0${i + 1}`}
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight">{cl.name}</h3>
                <p className="text-white/60 text-[11px] font-semibold">{cl.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      <section id="facilities" className={`${t.band} border-y ${t.border} scroll-mt-20`}>
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-10">
          <div data-reveal className="text-center max-w-lg mx-auto space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
              Walkthrough
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">{c.videoTitle}</h2>
            <p className={`text-[13px] leading-relaxed ${t.muted}`}>{c.videoSub}</p>
          </div>

          <div data-reveal className={`relative rounded-3xl overflow-hidden border ${t.border} aspect-video max-w-5xl mx-auto bg-black`}>
            {playing ? (
              <video src={c.videoUrl} controls autoPlay className="w-full h-full object-cover" />
            ) : (
              <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full cursor-pointer border-none p-0 bg-transparent group">
                <img src={hero} alt="Facility tour" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="relative flex items-center justify-center">
                    <span className="absolute w-20 h-20 rounded-full zb-ping" style={{ backgroundColor: accent }} />
                    <span className="relative w-20 h-20 rounded-full flex items-center justify-center text-2xl text-white shadow-2xl" style={{ backgroundColor: accent }}>
                      ▶
                    </span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/80">Play walkthrough</span>
                </span>
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {c.features.map((f, i) => (
              <div key={f.t} data-reveal data-delay={i % 3} className={`${t.card} border ${t.border} rounded-3xl p-6 space-y-2`}>
                <span className="text-2xl">{f.i}</span>
                <h4 className="text-[14px] font-black uppercase tracking-tight">{f.t}</h4>
                <p className={`text-[12px] leading-relaxed ${t.muted}`}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COACHES */}
      <section id="coaches" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div data-reveal className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
            {c.coachRole}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">{c.coachesTitle}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {c.coaches.map((co, i) => (
            <div key={co.n} data-reveal data-delay={i % 3} className="group space-y-3">
              <div className={`rounded-3xl overflow-hidden h-56 border ${t.border}`}>
                <img src={co.img} alt={co.n} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-black tracking-tight">{co.n}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>{co.r}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className={`${t.band} border-y ${t.border} scroll-mt-20`}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div data-reveal className="text-center space-y-4 mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>Membership</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Pick your plan</h2>
            <div className={`inline-flex gap-1 p-1 rounded-xl border ${t.border} ${light ? 'bg-white' : 'bg-white/5'}`}>
              {(['monthly', 'yearly'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-5 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer transition ${
                    billing === b ? 'text-white' : `bg-transparent ${t.muted}`
                  }`}
                  style={billing === b ? { backgroundColor: accent } : undefined}
                >
                  {b === 'yearly' ? 'Yearly · save 17%' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {c.plans.map((p, i) => (
              <div
                key={p.name}
                data-reveal
                data-delay={i % 3}
                className={`rounded-3xl p-7 space-y-5 border transition ${p.pop ? (light ? 'bg-white shadow-xl scale-[1.02]' : 'bg-white/[0.06] scale-[1.02]') : `${t.card} ${t.border}`}`}
                style={p.pop ? { borderColor: accent } : undefined}
              >
                {p.pop && (
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white inline-block" style={{ backgroundColor: accent }}>
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-black uppercase tracking-tight">{p.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black" style={{ color: accent }}>
                    ₹{(billing === 'monthly' ? p.m : p.y).toLocaleString('en-IN')}
                  </span>
                  <span className={`text-[12px] font-bold pb-1.5 ${t.muted}`}>/{billing === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <ul className={`space-y-2.5 pt-2 border-t ${t.border}`}>
                  {p.feats.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-[12.5px] font-semibold ${t.soft}`}>
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] text-white shrink-0" style={{ backgroundColor: accent }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onLogin}
                  className={`w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-xl cursor-pointer transition border ${
                    p.pop ? 'text-white border-transparent' : `bg-transparent ${t.text} ${t.border} hover:opacity-80`
                  }`}
                  style={p.pop ? { backgroundColor: accent } : undefined}
                >
                  Choose {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div data-reveal className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>Results</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Member stories</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {c.reviews.map((r, i) => (
            <div key={r.n} data-reveal data-delay={i % 3} className={`${t.card} border ${t.border} rounded-3xl p-7 space-y-4`}>
              <div className="text-lg" style={{ color: accent }}>★★★★★</div>
              <p className={`text-[13px] leading-relaxed italic ${t.soft}`}>“{r.q}”</p>
              <div className={`flex items-center gap-3 pt-2 border-t ${t.border}`}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-black text-white" style={{ backgroundColor: accent }}>
                  {r.n[0]}
                </div>
                <div>
                  <div className="text-[12px] font-bold">{r.n}</div>
                  <div className={`text-[10px] font-semibold uppercase tracking-wider ${t.muted}`}>{r.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div data-reveal className="text-center space-y-3 mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>Gallery</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">{c.galleryTitle}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {c.gallery.map((g, i) => (
            <div key={g} data-reveal data-delay={i % 3} className={`overflow-hidden rounded-2xl ${i === 0 ? 'md:row-span-2 md:h-[420px]' : 'h-52'}`}>
              <img src={g} alt="gallery" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${accent}, ${accent}22)` }} />
        <div data-reveal className="relative max-w-4xl mx-auto px-6 py-20 text-center text-white space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">{c.ctaHeadline}</h2>
          <p className="text-white/85 text-[14px] font-semibold max-w-lg mx-auto">{c.ctaSub}</p>
          <button
            onClick={onLogin}
            className="px-8 py-4 bg-black hover:bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-xl border-none cursor-pointer shadow-2xl transition"
          >
            {c.primaryCta}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t ${t.border} ${light ? 'bg-slate-50' : 'bg-black/40'}`}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: accent }}>
                {theme.brandIcon || '💪'}
              </div>
              <span className="font-black text-[15px] uppercase">{brand}</span>
            </div>
            <p className={`text-[12px] leading-relaxed max-w-sm ${t.muted}`}>{c.sub}</p>
          </div>
          {[
            { h: 'Visit', items: ['22 Fitness Park, Sector 62', 'Noida, UP 201301', 'Open 5:00 – 23:00 daily'] },
            { h: 'Contact', items: ['+91 98765 43210', `hello@${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, 'Corporate memberships'] },
          ].map((col) => (
            <div key={col.h} className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>{col.h}</h4>
              {col.items.map((it) => (
                <p key={it} className={`text-[12px] font-medium ${t.muted}`}>{it}</p>
              ))}
            </div>
          ))}
        </div>
        <div className={`border-t ${t.border} py-5 text-center text-[10px] font-semibold uppercase tracking-widest ${t.muted}`}>
          © {new Date().getFullYear()} {brand} · Built with ZATBIZ
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LOGIN                                                              */
/* ------------------------------------------------------------------ */

function GymLogin({
  theme,
  accent,
  brand,
  hero,
  c,
  layout,
  onSuccess,
  onBack,
}: {
  theme: GymTheme;
  accent: string;
  brand: string;
  hero: string;
  c: GymThemeContent;
  layout: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(onSuccess, 800);
  };

  const isRight = layout === 'split-right-image';
  const isCentered = layout === 'centered-card' || layout === 'transparent-blurred';
  const isDarkMinimal = layout === 'dark-mode-minimal';
  const isMinimalLogo = layout === 'minimal-logo-focus';
  const isMesh = layout === 'gradient-mesh-bg';
  const isGeometric = layout === 'geometric-patterns';
  const isSidePanel = layout === 'clean-side-panel';

  const form = (
    <div className="w-full max-w-sm space-y-6">
      <button
        onClick={onBack}
        className={`text-[11px] font-bold bg-transparent border-none cursor-pointer p-0 transition ${
          isDarkMinimal ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-800'
        }`}
      >
        ← Back to site
      </button>

      <div className="space-y-3">
        {(isMinimalLogo || isCentered) && (
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg mb-2" style={{ backgroundColor: accent }}>
            {theme.brandIcon || '💪'}
          </div>
        )}
        <h1 className={`text-3xl font-black tracking-tight ${isDarkMinimal ? 'text-white' : 'text-slate-900'}`}>
          {mode === 'signin' ? c.portalLabel : 'Create account'}
        </h1>
        <p className={`text-[13px] ${isDarkMinimal ? 'text-white/45' : 'text-slate-500'}`}>
          {mode === 'signin' ? `Access your ${brand} schedule, bookings and progress.` : `Join ${brand} and book your first session in minutes.`}
        </p>
      </div>

      <div className={`flex gap-1 p-1 rounded-xl border ${isDarkMinimal ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
        {(['signin', 'signup'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer transition ${
              mode === m ? 'text-white' : `bg-transparent ${isDarkMinimal ? 'text-white/50' : 'text-slate-500'} hover:opacity-80`
            }`}
            style={mode === m ? { backgroundColor: accent } : undefined}
          >
            {m === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === 'signup' && <LoginField label="Full Name" type="text" defaultValue="Aarav Sharma" dark={isDarkMinimal} />}
        <LoginField label="Email Address" type="email" defaultValue="member@demo.com" dark={isDarkMinimal} />
        <LoginField label="Password" type="password" defaultValue="demo1234" dark={isDarkMinimal} />

        {mode === 'signin' && (
          <div className="flex justify-between items-center">
            <label className={`flex items-center gap-2 text-[11px] font-semibold cursor-pointer ${isDarkMinimal ? 'text-white/50' : 'text-slate-500'}`}>
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5" style={{ accentColor: accent }} />
              Remember me
            </label>
            <span className="text-[11px] font-bold cursor-pointer" style={{ color: accent }}>Forgot password?</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 text-[11px] font-black uppercase tracking-widest rounded-xl text-white border-none cursor-pointer shadow-xl hover:brightness-110 transition disabled:opacity-70"
          style={{ backgroundColor: accent }}
        >
          {loading ? 'Signing in…' : mode === 'signin' ? `Enter ${c.portalLabel} ➔` : 'Create Account ➔'}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <span className={`flex-grow h-px ${isDarkMinimal ? 'bg-white/10' : 'bg-slate-200'}`} />
        <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMinimal ? 'text-white/30' : 'text-slate-400'}`}>or</span>
        <span className={`flex-grow h-px ${isDarkMinimal ? 'bg-white/10' : 'bg-slate-200'}`} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {['Google', 'Apple'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={onSuccess}
            className={`py-3 text-[11px] font-bold rounded-xl cursor-pointer transition border ${
              isDarkMinimal ? 'bg-white/5 hover:bg-white/12 text-white border-white/15' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <p className={`text-center text-[10px] font-semibold ${isDarkMinimal ? 'text-white/30' : 'text-slate-400'}`}>
        Demo preview · any credentials open the portal
      </p>
    </div>
  );

  const panel = (
    <div className="relative hidden lg:block overflow-hidden">
      <img src={hero} alt="" className="zb-hero-img absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}e6, #0f172aee)` }} />
      <div className="relative h-full flex flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-xl">
            {theme.brandIcon || '💪'}
          </div>
          <span className="font-black text-[15px] uppercase">{brand}</span>
        </div>
        <div className="space-y-4 max-w-sm">
          <h2 className="text-4xl font-black uppercase leading-tight tracking-tight whitespace-pre-line">{c.headline}</h2>
          <p className="text-white/75 text-[13px] leading-relaxed">{c.sub}</p>
          <div className="flex gap-6 pt-4">
            {c.stats.slice(0, 3).map((s) => (
              <div key={s.l}>
                <div className="text-xl font-black">{s.v}</div>
                <div className="text-[9px] uppercase tracking-widest text-white/50 font-bold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">Powered by ZATBIZ</p>
      </div>
    </div>
  );

  if (isCentered || isMesh || isGeometric) {
    return (
      <div className="min-h-full relative flex items-center justify-center p-8">
        {isMesh ? (
          <div className="absolute inset-0 bg-slate-50">
            <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-40" style={{ backgroundColor: accent }} />
            <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-30" style={{ backgroundColor: theme.secondaryColor || accent }} />
          </div>
        ) : isGeometric ? (
          <div
            className="absolute inset-0 bg-slate-50"
            style={{
              backgroundImage: `linear-gradient(135deg, ${accent}14 25%, transparent 25%, transparent 50%, ${accent}14 50%, ${accent}14 75%, transparent 75%)`,
              backgroundSize: '48px 48px',
            }}
          />
        ) : (
          <>
            <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm" />
          </>
        )}
        <div className={`relative w-full max-w-md rounded-[32px] p-8 sm:p-10 shadow-2xl border ${isCentered ? 'bg-white/90 backdrop-blur-2xl border-white/60' : 'bg-white border-slate-200'}`}>
          {form}
        </div>
      </div>
    );
  }

  if (isMinimalLogo) {
    return (
      <div className="min-h-full bg-slate-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-[32px] p-10 shadow-xl">{form}</div>
      </div>
    );
  }

  if (isDarkMinimal) {
    return (
      <div className="min-h-full flex items-center justify-center p-8" style={{ backgroundColor: theme.bgColor || '#09090b' }}>
        <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-[32px] p-10 backdrop-blur-xl">{form}</div>
      </div>
    );
  }

  if (isSidePanel) {
    return (
      <div className="min-h-full grid lg:grid-cols-[1.4fr_1fr] bg-slate-50">
        <div className="relative hidden lg:block overflow-hidden">
          <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/35" />
        </div>
        <div className="flex items-center justify-center p-8 sm:p-12 bg-white">{form}</div>
      </div>
    );
  }

  return (
    <div className="min-h-full grid lg:grid-cols-2 bg-slate-50">
      {!isRight && panel}
      <div className="flex items-center justify-center p-8 sm:p-14 bg-white">{form}</div>
      {isRight && panel}
    </div>
  );
}

function LoginField({ label, type, defaultValue, dark }: { label: string; type: string; defaultValue: string; dark?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className={`text-[10px] font-black uppercase tracking-widest ${dark ? 'text-white/50' : 'text-slate-500'}`}>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className={`w-full rounded-xl px-4 py-3 text-[13px] outline-none transition border ${
          dark ? 'bg-white/5 border-white/15 focus:border-white/40 text-white' : 'bg-slate-50 border-slate-200 focus:border-slate-400 focus:bg-white text-slate-900'
        }`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PORTAL                                                             */
/* ------------------------------------------------------------------ */

function GymDashboard({
  theme,
  accent,
  brand,
  c,
  onLogout,
}: {
  theme: GymTheme;
  accent: string;
  brand: string;
  c: GymThemeContent;
  onLogout: () => void;
}) {
  const [nav, setNav] = useState(c.portalNav[0]);

  const schedule = c.classes.slice(0, 4).map((cl, i) => ({
    c: cl.name,
    coach: c.coaches[i % c.coaches.length].n,
    t: ['Today · 06:30', 'Today · 18:00', 'Tomorrow · 07:00', 'Thu · 19:30'][i],
    s: ['Booked', 'Waitlist', 'Booked', 'Open'][i],
  }));

  const statusStyle: Record<string, string> = {
    Booked: 'bg-emerald-100 text-emerald-700',
    Waitlist: 'bg-amber-100 text-amber-700',
    Open: 'bg-sky-100 text-sky-700',
  };

  return (
    <div className="min-h-full bg-slate-50 text-slate-900 flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col text-white" style={{ backgroundColor: theme.bgColor && isLightSurface(theme.bgColor) ? '#0f172a' : theme.bgColor || '#0f172a' }}>
        <div className="p-5 flex items-center gap-2.5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: accent }}>
            {theme.brandIcon || '💪'}
          </div>
          <div className="min-w-0">
            <div className="font-black text-[12px] truncate uppercase">{brand}</div>
            <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold">{c.portalLabel}</div>
          </div>
        </div>

        <nav className="p-3 space-y-1 flex-grow">
          {c.portalNav.map((it) => (
            <button
              key={it}
              onClick={() => setNav(it)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[12px] font-bold border-none cursor-pointer transition ${
                nav === it ? 'text-white' : 'bg-transparent text-white/55 hover:bg-white/10 hover:text-white'
              }`}
              style={nav === it ? { backgroundColor: accent } : undefined}
            >
              {it}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={onLogout} className="w-full px-4 py-2.5 rounded-xl text-[11px] font-bold bg-white/5 hover:bg-white/15 text-white/70 border-none cursor-pointer transition">
            ← Sign out
          </button>
        </div>
      </aside>

      <div className="flex-grow min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-black tracking-tight">{nav}</h1>
            <p className="text-[11px] text-slate-500 font-semibold">Welcome back, Aarav · {c.plans[1].name} plan</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[13px]">🔔</span>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-black text-white" style={{ backgroundColor: accent }}>AS</div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: 'Sessions This Month', v: '18', d: '+4 vs last', i: '🔥' },
              { l: 'Current Streak', v: '12 days', d: 'Personal best', i: '⚡' },
              { l: c.stats[0].l, v: c.stats[0].v, d: 'Club total', i: '🎯' },
              { l: 'Next Session', v: '06:30', d: c.classes[0].name, i: '📅' },
            ].map((s) => (
              <div key={s.l} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">{s.l}</span>
                  <span className="text-base">{s.i}</span>
                </div>
                <div className="text-2xl font-black tracking-tight">{s.v}</div>
                <div className="text-[11px] font-bold text-slate-400 truncate">{s.d}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-[13px] font-black">Upcoming Sessions</h3>
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>Book more</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      {['Session', 'Coach', 'When', 'Status'].map((h) => (
                        <th key={h} className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((r) => (
                      <tr key={r.c} className="border-t border-slate-100 hover:bg-slate-50 transition">
                        <td className="px-5 py-3.5 text-[12px] font-black">{r.c}</td>
                        <td className="px-5 py-3.5 text-[12px] text-slate-500 font-semibold">{r.coach}</td>
                        <td className="px-5 py-3.5 text-[12px] font-semibold">{r.t}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${statusStyle[r.s]}`}>{r.s}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <h3 className="text-[13px] font-black">Weekly Goal</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black" style={{ color: accent }}>4</span>
                  <span className="text-[12px] font-bold text-slate-400 pb-1.5">/ 5 sessions</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: '80%', backgroundColor: accent }} />
                </div>
                <p className="text-[11px] text-slate-400 font-semibold">One more session to hit this week&apos;s target.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <h3 className="text-[13px] font-black">Your Numbers</h3>
                {c.prs.map((r) => (
                  <div key={r.n} className="space-y-1.5">
                    <div className="flex justify-between text-[11.5px] font-bold">
                      <span>{r.n}</span>
                      <span style={{ color: accent }}>{r.v}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${r.p}%`, backgroundColor: accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
