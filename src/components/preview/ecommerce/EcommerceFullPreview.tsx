'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EcomTheme } from './ecomThemeVariants';
import ModernEcomStorefront from './ModernEcomStorefront';

interface Props {
  theme: EcomTheme;
  storeName: string;
  tagline?: string;
  logoIcon?: string;
  onClose: () => void;
  onUseTheme: () => void;
}

type ViewMode = 'landing' | 'login';

const REVIEWS = [
  { n: 'Ananya Rao', r: 'Verified buyer', q: 'Ordered on Monday, delivered Wednesday, quality exactly as pictured. Rare these days.' },
  { n: 'Marcus Lee', r: 'Repeat customer', q: 'Checkout took under a minute and the tracking actually updated in real time.' },
  { n: 'Priya Nair', r: 'Verified buyer', q: 'Returns were painless — printed the label, dropped it off, refunded in two days.' },
];

export default function EcommerceFullPreview({
  theme,
  storeName,
  tagline,
  logoIcon,
  onClose,
  onUseTheme,
}: Props) {
  const [view, setView] = useState<ViewMode>('landing');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const scrollRef = useRef<HTMLDivElement>(null);

  const accent = theme.primaryColor;
  const brand = storeName || theme.name;

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

  return (
    <div className="fixed inset-0 z-[80] bg-slate-950 flex flex-col font-sans">
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        [data-reveal].zb-in{opacity:1;transform:none}
        [data-reveal][data-delay="1"]{transition-delay:.09s}
        [data-reveal][data-delay="2"]{transition-delay:.18s}
        [data-reveal][data-delay="3"]{transition-delay:.27s}
        @keyframes zbFadeUp{from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:none}}
        @keyframes zbZoom{from{transform:scale(1.14)}to{transform:scale(1)}}
        @keyframes zbMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .zb-hero-t{animation:zbFadeUp .9s cubic-bezier(.16,1,.3,1) both}
        .zb-hero-img{animation:zbZoom 1.8s cubic-bezier(.16,1,.3,1) both}
        .zb-marquee{animation:zbMarquee 22s linear infinite}
        .zb-scroll::-webkit-scrollbar{width:8px}
        .zb-scroll::-webkit-scrollbar-thumb{background:#334155;border-radius:8px}
      `}</style>

      {/* Chrome bar */}
      <div className="shrink-0 bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 mr-1">
          <span className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md shrink-0 text-white" style={{ backgroundColor: accent }}>
            {theme.suffix}
          </span>
          <span className="text-white text-xs font-bold truncate">{theme.name}</span>
          <span className="hidden md:inline text-slate-500 text-[10px] font-mono truncate">
            {brand.toLowerCase().replace(/[^a-z0-9]/g, '')}.zatbiz.site
          </span>
        </div>

        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mx-auto order-last w-full sm:order-none sm:w-auto justify-center">
          {(['landing', 'login'] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer transition ${
                view === v ? 'text-white' : 'bg-transparent text-slate-400 hover:text-white'
              }`}
              style={view === v ? { backgroundColor: accent } : undefined}
            >
              {v === 'landing' ? '🏠 Landing Page' : '🔐 Login Page'}
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
          {view === 'landing' ? (
            // Render the exact same component the live store uses, so the
            // wizard preview and the generated storefront never drift apart.
            <ModernEcomStorefront
              theme={theme}
              brand={brand}
              logoIcon={logoIcon}
              onLogin={() => setView('login')}
            />
          ) : (
            <StoreLogin theme={theme} brand={brand} logoIcon={logoIcon} onBack={() => setView('landing')} />
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="shrink-0 bg-slate-900 border-t border-slate-800 px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[11px] text-slate-400 font-semibold min-w-0">
          <span className="text-white font-bold">{theme.name}</span>
          <span className="hidden sm:inline"> — {theme.desc}</span>
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
            Use This Theme & Continue ➔
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LANDING                                                            */
/* ------------------------------------------------------------------ */

function StoreLanding({
  theme,
  brand,
  tagline,
  logoIcon,
  onLogin,
}: {
  theme: EcomTheme;
  brand: string;
  tagline?: string;
  logoIcon?: string;
  onLogin: () => void;
}) {
  const accent = theme.primaryColor;
  const dark = theme.surface === 'dark';
  const bg = dark ? '#0b0b0f' : '#ffffff';

  const t = {
    text: dark ? 'text-white' : 'text-slate-900',
    muted: dark ? 'text-white/50' : 'text-slate-500',
    soft: dark ? 'text-white/65' : 'text-slate-600',
    border: dark ? 'border-white/10' : 'border-slate-200',
    card: dark ? 'bg-white/[0.03]' : 'bg-white',
    band: dark ? 'bg-white/[0.02]' : 'bg-slate-50',
    navBtn: dark
      ? 'bg-white/10 hover:bg-white/20 text-white border-white/15'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200',
  };

  const products = (theme.products || []).slice(0, 8);
  const heroTagline = tagline || theme.tagline;

  const marqueeItems = ['Free shipping over ₹999', 'Easy 7-day returns', 'Cash on delivery', 'Secure checkout', '4.9★ from 2,400 reviews'];

  /* --- Hero per layout variant --- */
  const hero = (() => {
    if (theme.heroLayout === 'split' || theme.heroLayout === 'editorial') {
      const editorial = theme.heroLayout === 'editorial';
      return (
        <section className={`grid lg:grid-cols-2 min-h-[560px] ${editorial ? 'lg:grid-cols-[1.1fr_1fr]' : ''}`}>
          <div className="flex items-center px-8 sm:px-14 py-16 order-2 lg:order-1">
            <div className="max-w-lg space-y-6">
              <span className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: accent, animationDelay: '.1s' }}>
                {theme.badge}
              </span>
              <h1
                className={`zb-hero-t text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.02] tracking-tight ${editorial ? 'italic' : ''}`}
                style={{ animationDelay: '.22s', fontFamily: editorial ? 'Georgia, serif' : undefined }}
              >
                {heroTagline}
              </h1>
              <p className={`zb-hero-t text-[15px] leading-relaxed font-medium ${t.soft}`} style={{ animationDelay: '.34s' }}>
                {theme.desc}
              </p>
              <div className="zb-hero-t flex flex-wrap gap-3 pt-1" style={{ animationDelay: '.46s' }}>
                <a href="#shop" className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl text-white shadow-2xl hover:scale-[1.03] transition" style={{ backgroundColor: accent }}>
                  Shop the Collection
                </a>
                <button onClick={onLogin} className={`px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl border cursor-pointer transition ${t.navBtn}`}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden order-1 lg:order-2">
            <img src={theme.heroImageUrl} alt={brand} className="zb-hero-img absolute inset-0 w-full h-full object-cover" />
            {editorial && (
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-5 py-4 rounded-2xl shadow-2xl max-w-[240px]">
                <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: accent }}>Featured</p>
                <p className="text-[13px] font-bold text-slate-900 leading-snug">This week's edit, hand-picked by our buyers</p>
              </div>
            )}
          </div>
        </section>
      );
    }

    const centered = theme.heroLayout === 'centered';
    return (
      <section className="relative min-h-[580px] flex items-center overflow-hidden">
        <img src={theme.heroImageUrl} alt={brand} className="zb-hero-img absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: centered
              ? `linear-gradient(160deg, ${accent}cc, #0b0b0fe6)`
              : 'linear-gradient(100deg, #0b0b0f 5%, #0b0b0fd0 45%, transparent)',
          }}
        />
        <div className={`relative max-w-7xl mx-auto px-6 w-full py-20 ${centered ? 'text-center' : ''}`}>
          <div className={`space-y-6 text-white ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
            <span className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur" style={{ animationDelay: '.1s' }}>
              {theme.badge}
            </span>
            <h1 className="zb-hero-t text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.02] tracking-tight" style={{ animationDelay: '.22s' }}>
              {heroTagline}
            </h1>
            <p className="zb-hero-t text-white/70 text-[15px] leading-relaxed font-medium" style={{ animationDelay: '.34s' }}>
              {theme.desc}
            </p>
            <div className={`zb-hero-t flex flex-wrap gap-3 pt-1 ${centered ? 'justify-center' : ''}`} style={{ animationDelay: '.46s' }}>
              <a href="#shop" className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl text-white shadow-2xl hover:scale-[1.03] transition" style={{ backgroundColor: centered ? '#0b0b0f' : accent }}>
                Shop the Collection
              </a>
              <button onClick={onLogin} className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur cursor-pointer transition">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  })();

  return (
    <div style={{ backgroundColor: bg }} className={t.text}>
      {/* NAV */}
      <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b ${t.border}`} style={{ backgroundColor: `${bg}e6` }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-lg" style={{ backgroundColor: accent }}>
              {logoIcon || theme.icon}
            </div>
            <span className="font-black tracking-tight text-[15px] truncate uppercase">{brand}</span>
          </div>
          <div className={`hidden lg:flex items-center gap-7 text-[12px] font-semibold ${t.muted}`}>
            {['New In', 'Shop', 'Collections', 'Sale', 'About'].map((l) => (
              <span key={l} className={`${dark ? 'hover:text-white' : 'hover:text-slate-900'} cursor-pointer transition`}>{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={onLogin} className={`px-4 py-2 text-[11px] font-bold rounded-lg border cursor-pointer transition ${t.navBtn}`}>
              Sign In
            </button>
            <button className="relative px-4 py-2 text-[11px] font-black rounded-lg text-white border-none cursor-pointer hover:brightness-110 transition" style={{ backgroundColor: accent }}>
              🛒 Cart
              <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full text-[9px] font-black flex items-center justify-center bg-white text-slate-900 shadow">2</span>
            </button>
          </div>
        </div>
      </nav>

      {hero}

      {/* MARQUEE */}
      <div className="overflow-hidden border-y py-3" style={{ backgroundColor: accent, borderColor: accent }}>
        <div className="zb-marquee flex gap-10 whitespace-nowrap w-max">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="text-[11px] font-black uppercase tracking-widest text-white/90">✦ {m}</span>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section id="shop" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div data-reveal className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>Bestsellers</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Shop the collection</h2>
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-wider cursor-pointer ${t.muted}`}>View all →</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {(products.length ? products : Array.from({ length: 8 })).map((p: any, i) => (
            <div
              key={i}
              data-reveal
              data-delay={i % 4}
              className={`group rounded-3xl overflow-hidden border ${t.border} ${t.card} hover:-translate-y-1.5 hover:shadow-xl transition duration-500`}
            >
              <div className="h-48 sm:h-56 overflow-hidden relative">
                <img
                  src={p?.imageUrl || p?.image || theme.heroImageUrl}
                  alt={p?.name || 'Product'}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                {i === 0 && (
                  <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
                    Bestseller
                  </span>
                )}
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-[13px] leading-snug truncate">{p?.name || `${brand} Item ${i + 1}`}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-black text-[14px]" style={{ color: accent }}>₹{p?.price ?? (499 + i * 200)}</span>
                  <span className={`text-[10px] font-semibold ${t.muted}`}>★ 4.{7 + (i % 3)}</span>
                </div>
                <button
                  className="w-full mt-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border cursor-pointer transition hover:text-white"
                  style={{ borderColor: accent, color: accent }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE BAND */}
      <section className={`${t.band} border-y ${t.border}`}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-3 gap-8">
          {[
            { i: '🚚', h: 'Fast Dispatch', d: 'Orders placed before 2 PM ship the same day, tracked door to door.' },
            { i: '↩️', h: 'Easy Returns', d: 'Seven-day no-questions returns with instant refund on pickup.' },
            { i: '🔒', h: 'Secure Checkout', d: 'UPI, cards and COD — every payment fully encrypted.' },
          ].map((f, i) => (
            <div key={f.h} data-reveal data-delay={i % 3} className="flex gap-4 items-start">
              <span className="text-2xl">{f.i}</span>
              <div>
                <h4 className="text-[14px] font-black tracking-tight">{f.h}</h4>
                <p className={`text-[12px] leading-relaxed mt-1 ${t.muted}`}>{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div data-reveal className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">What customers say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={r.n} data-reveal data-delay={i % 3} className={`${t.card} border ${t.border} rounded-3xl p-7 space-y-4`}>
              <div className="text-lg" style={{ color: accent }}>★★★★★</div>
              <p className={`text-[13px] leading-relaxed italic ${t.soft}`}>“{r.q}”</p>
              <div className={`flex items-center gap-3 pt-2 border-t ${t.border}`}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-black text-white" style={{ backgroundColor: accent }}>{r.n[0]}</div>
                <div>
                  <div className="text-[12px] font-bold">{r.n}</div>
                  <div className={`text-[10px] font-semibold uppercase tracking-wider ${t.muted}`}>{r.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${accent}, ${accent}22)` }} />
        <div data-reveal className="relative max-w-3xl mx-auto px-6 py-20 text-center text-white space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Get 10% off your first order</h2>
          <p className="text-white/85 text-[14px] font-semibold">Join the list for early drops, restocks and members-only pricing.</p>
          <div className="flex gap-2 max-w-md mx-auto pt-2">
            <input
              placeholder="you@example.com"
              className="flex-grow bg-white/95 border-none rounded-xl px-4 py-3.5 text-[13px] text-slate-900 outline-none"
            />
            <button className="px-6 py-3.5 bg-black hover:bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-xl border-none cursor-pointer transition">
              Join
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t ${t.border} ${dark ? 'bg-black/40' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: accent }}>{logoIcon || theme.icon}</div>
              <span className="font-black text-[15px] uppercase">{brand}</span>
            </div>
            <p className={`text-[12px] leading-relaxed max-w-sm ${t.muted}`}>{theme.desc}</p>
          </div>
          {[
            { h: 'Shop', items: ['New Arrivals', 'Bestsellers', 'Collections', 'Sale'] },
            { h: 'Help', items: ['Track Order', 'Returns', 'Shipping', 'Contact Us'] },
          ].map((col) => (
            <div key={col.h} className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>{col.h}</h4>
              {col.items.map((it) => (
                <p key={it} className={`text-[12px] font-medium cursor-pointer ${t.muted}`}>{it}</p>
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
/*  LOGIN — four distinct layouts                                      */
/* ------------------------------------------------------------------ */

function StoreLogin({
  theme,
  brand,
  logoIcon,
  onBack,
}: {
  theme: EcomTheme;
  brand: string;
  logoIcon?: string;
  onBack: () => void;
}) {
  const accent = theme.primaryColor;
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const layout = theme.loginLayout;
  const darkPanel = layout === 'dark-panel';

  const form = (
    <div className="w-full max-w-sm space-y-6">
      <button onClick={onBack} className={`text-[11px] font-bold bg-transparent border-none cursor-pointer p-0 transition ${darkPanel ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}>
        ← Back to store
      </button>
      <div className="space-y-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg" style={{ backgroundColor: accent }}>
          {logoIcon || theme.icon}
        </div>
        <h1 className={`text-3xl font-black tracking-tight ${darkPanel ? 'text-white' : 'text-slate-900'}`}>
          {mode === 'signin' ? 'Welcome back' : 'Create account'}
        </h1>
        <p className={`text-[13px] ${darkPanel ? 'text-white/45' : 'text-slate-500'}`}>
          {mode === 'signin' ? `Sign in to track orders and check out faster at ${brand}.` : `Join ${brand} for order tracking, wishlists and member pricing.`}
        </p>
      </div>

      <div className={`flex gap-1 p-1 rounded-xl border ${darkPanel ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
        {(['signin', 'signup'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer transition ${
              mode === m ? 'text-white' : `bg-transparent ${darkPanel ? 'text-white/50' : 'text-slate-500'}`
            }`}
            style={mode === m ? { backgroundColor: accent } : undefined}
          >
            {m === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mode === 'signup' && <Field label="Full Name" value="Aarav Sharma" dark={darkPanel} />}
        <Field label="Email Address" value="customer@demo.com" dark={darkPanel} />
        <Field label="Password" value="demo1234" type="password" dark={darkPanel} />
        <button
          className="w-full py-3.5 text-[11px] font-black uppercase tracking-widest rounded-xl text-white border-none cursor-pointer shadow-xl hover:brightness-110 transition"
          style={{ backgroundColor: accent }}
        >
          {mode === 'signin' ? 'Sign In & Shop ➔' : 'Create Account ➔'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {['Google', 'Apple'].map((p) => (
          <button
            key={p}
            className={`py-3 text-[11px] font-bold rounded-xl cursor-pointer transition border ${
              darkPanel ? 'bg-white/5 hover:bg-white/12 text-white border-white/15' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <p className={`text-center text-[10px] font-semibold ${darkPanel ? 'text-white/30' : 'text-slate-400'}`}>
        Demo preview · no real authentication
      </p>
    </div>
  );

  if (layout === 'centered-glass') {
    return (
      <main className="min-h-full relative flex items-center justify-center p-8">
        <img src={theme.heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 backdrop-blur-md" style={{ background: `linear-gradient(160deg, ${accent}99, #0f172acc)` }} />
        <div className="relative w-full max-w-md rounded-[32px] p-8 sm:p-10 shadow-2xl bg-white/90 backdrop-blur-2xl border border-white/60">{form}</div>
      </main>
    );
  }

  if (layout === 'minimal-light') {
    return (
      <main className="min-h-full bg-slate-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-[32px] p-10 shadow-xl">{form}</div>
      </main>
    );
  }

  if (layout === 'boxed-center') {
    return (
      <main className="min-h-full bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md border-2 border-slate-900 p-10">{form}</div>
      </main>
    );
  }

  if (layout === 'right-panel') {
    return (
      <main className="min-h-full grid lg:grid-cols-[1fr_1.2fr]" style={{ backgroundColor: '#0a0a0d' }}>
        <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
        <div className="relative hidden lg:block overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}33, transparent 60%)` }} />
          <img src={theme.heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0d]/60" />
          <div className="relative h-full flex flex-col justify-end p-12 text-white space-y-3 z-20">
            <h2 className="text-3xl font-black tracking-tight leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{theme.tagline}</h2>
            <p className="text-white/70 text-[13px] max-w-sm">{theme.desc}</p>
          </div>
        </div>
      </main>
    );
  }

  if (layout === 'gradient-split') {
    return (
      <main className="min-h-full grid lg:grid-cols-2" style={{ backgroundColor: '#0b0b0f' }}>
        <div className="relative hidden lg:block overflow-hidden">
          <div className="absolute inset-0" style={{ background: `linear-gradient(140deg, ${accent}, ${theme.secondaryColor || accent} 70%, #0b0b0f)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,.15), transparent 40%)` }} />
          <div className="relative h-full flex flex-col justify-center p-12 text-white space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">{theme.badge}</span>
            <h2 className="text-4xl font-black tracking-tight leading-tight">{theme.tagline}</h2>
            <p className="text-white/80 text-[13px] max-w-sm">{theme.desc}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
      </main>
    );
  }

  if (layout === 'fullbleed-form') {
    return (
      <main className="min-h-full relative flex items-center justify-center p-8" style={{ backgroundColor: `${accent}12` }}>
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-40" style={{ backgroundColor: accent }} />
        <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-30" style={{ backgroundColor: theme.secondaryColor || accent }} />
        <div className="relative w-full max-w-md bg-white rounded-[28px] p-10 shadow-2xl border border-white">{form}</div>
      </main>
    );
  }

  if (layout === 'dark-panel') {
    return (
      <main className="min-h-full grid lg:grid-cols-2" style={{ backgroundColor: '#0b0b0f' }}>
        <div className="relative hidden lg:block overflow-hidden">
          <img src={theme.heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0b0f]" />
        </div>
        <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
      </main>
    );
  }

  // split-image (editorial)
  return (
    <main className="min-h-full grid lg:grid-cols-2 bg-white">
      <div className="relative hidden lg:block overflow-hidden">
        <img src={theme.heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}cc, #0f172ab3)` }} />
        <div className="relative h-full flex flex-col justify-end p-12 text-white space-y-3">
          <h2 className="text-3xl font-black tracking-tight leading-tight">{theme.tagline}</h2>
          <p className="text-white/75 text-[13px] max-w-sm">{theme.desc}</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
    </main>
  );
}

function Field({ label, value, type = 'text', dark }: { label: string; value: string; type?: string; dark?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className={`text-[10px] font-black uppercase tracking-widest ${dark ? 'text-white/50' : 'text-slate-500'}`}>{label}</label>
      <input
        type={type}
        defaultValue={value}
        className={`w-full rounded-xl px-4 py-3 text-[13px] outline-none transition border ${
          dark ? 'bg-white/5 border-white/15 focus:border-white/40 text-white' : 'bg-slate-50 border-slate-200 focus:border-slate-400 focus:bg-white text-slate-900'
        }`}
      />
    </div>
  );
}
