'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { EcomTheme, getEcomThemes } from './ecomThemeVariants';
import { Ed, EdImg, EDIT_STYLES, EditFn } from '@/components/preview/gym/Editable';

/* ------------------------------------------------------------------ */
/*  Content model: theme defaults + editor overrides                   */
/* ------------------------------------------------------------------ */

export interface EcomContent {
  badge: string;
  tagline: string;
  desc: string;
  heroImageUrl: string;
  navLinks: string[];
  marquee: string[];
  shopTitle: string;
  shopEyebrow: string;
  products: { name: string; price: number; imageUrl: string }[];
  features: { i: string; h: string; d: string }[];
  reviews: { n: string; r: string; q: string }[];
  newsTitle: string;
  newsSub: string;
}

export function buildEcomContent(theme: EcomTheme, overrides?: any): EcomContent {
  const baseProducts = (theme.products || []).slice(0, 8).map((p: any, i: number) => ({
    name: p?.name || `Item ${i + 1}`,
    price: p?.price ?? 499 + i * 200,
    imageUrl: p?.imageUrl || p?.image || theme.heroImageUrl,
  }));
  while (baseProducts.length < 8) {
    const i = baseProducts.length;
    baseProducts.push({ name: `Item ${i + 1}`, price: 499 + i * 200, imageUrl: theme.heroImageUrl });
  }

  const base: EcomContent = {
    badge: theme.badge,
    tagline: theme.tagline,
    desc: theme.desc,
    heroImageUrl: theme.heroImageUrl,
    navLinks: ['New In', 'Shop', 'Collections', 'Sale', 'About'],
    marquee: ['Free shipping over ₹999', 'Easy 7-day returns', 'Cash on delivery', 'Secure checkout', '4.9★ from 2,400 reviews'],
    shopTitle: 'Shop the collection',
    shopEyebrow: 'Bestsellers',
    products: baseProducts,
    features: [
      { i: '🚚', h: 'Fast Dispatch', d: 'Orders placed before 2 PM ship the same day, tracked door to door.' },
      { i: '↩️', h: 'Easy Returns', d: 'Seven-day no-questions returns with instant refund on pickup.' },
      { i: '🔒', h: 'Secure Checkout', d: 'UPI, cards and COD — every payment fully encrypted.' },
    ],
    reviews: [
      { n: 'Ananya Rao', r: 'Verified buyer', q: 'Ordered on Monday, delivered Wednesday, quality exactly as pictured. Rare these days.' },
      { n: 'Marcus Lee', r: 'Repeat customer', q: 'Checkout took under a minute and the tracking actually updated in real time.' },
      { n: 'Priya Nair', r: 'Verified buyer', q: 'Returns were painless — printed the label, dropped it off, refunded in two days.' },
    ],
    newsTitle: 'Get 10% off your first order',
    newsSub: 'Join the list for early drops, restocks and members-only pricing.',
  };

  if (!overrides || typeof overrides !== 'object') return base;

  const out: any = { ...base };
  for (const key of Object.keys(overrides)) {
    const val = overrides[key];
    if (val === undefined || val === null || val === '') continue;
    const baseVal = (base as any)[key];
    if (Array.isArray(baseVal) && Array.isArray(val)) {
      out[key] = baseVal.map((item, i) => {
        const patch = val[i];
        if (patch === undefined || patch === null) return item;
        if (typeof item === 'object' && typeof patch === 'object') {
          const merged: any = { ...item };
          for (const f of Object.keys(patch)) {
            if (patch[f] !== undefined && patch[f] !== null && patch[f] !== '') merged[f] = patch[f];
          }
          return merged;
        }
        return patch;
      });
    } else {
      out[key] = val;
    }
  }
  return out as EcomContent;
}

/** Resolve the saved variant theme + layout edits from a project's blocksJson. */
export function readEcomConfig(project?: { blocksJson?: string; name?: string }) {
  let themeConfig: any = null;
  let overrides: any = {};
  let brand = '';
  let logoIcon = '';
  let shopNiche = '';
  if (project?.blocksJson) {
    try {
      const parsed = JSON.parse(project.blocksJson);
      const blocks: any[] = Array.isArray(parsed)
        ? parsed
        : (Object.values(parsed?.pages || {}).flat() as any[]);
      const biz = blocks.find((b: any) => b?.type === 'business_config');
      const cfg = Array.isArray(parsed) ? biz?.content : { ...(parsed?.businessConfig || {}), ...(biz?.content || {}) };
      themeConfig = cfg?.themeConfig || null;
      brand = cfg?.companyName || '';
      logoIcon = cfg?.logoIcon || '';
      shopNiche = cfg?.shopNiche || '';
      const raw = cfg?.ecomLayoutContent;
      if (raw) overrides = typeof raw === 'string' ? JSON.parse(raw) : raw;
      const header = blocks.find((b: any) => b?.type === 'header');
      if (!brand) brand = header?.content?.companyName || '';
      if (!logoIcon) logoIcon = header?.content?.logoIcon || '';
    } catch {
      /* ignore */
    }
  }

  // Legacy projects (old wizard) carry no themeConfig at all — synthesise one
  // from the niche so they still render the modern storefront.
  if (!themeConfig?.category && shopNiche && shopNiche !== 'scratch') {
    themeConfig = { ...(themeConfig || {}), category: shopNiche };
  }

  // Rebuild a full EcomTheme from the stored themeConfig. Works for both new
  // variant themes (matched by id) and legacy ALL_THEMES_160 themes (matched
  // by colour, else first variant) so older projects render modern too.
  let theme: EcomTheme | null = null;
  if (themeConfig?.category) {
    const four = getEcomThemes(themeConfig.category);
    theme =
      four.find((t) => t.id === themeConfig.id) ||
      four.find((t) => t.primaryColor === themeConfig.primaryColor) ||
      four[0] ||
      null;
    if (theme) {
      // Preserve the exact colours + banner the project was created with
      theme = {
        ...theme,
        primaryColor: themeConfig.primaryColor || theme.primaryColor,
        secondaryColor: themeConfig.secondaryColor || theme.secondaryColor,
      };
      if (themeConfig.bannerImageUrl) {
        theme = { ...theme, heroImageUrl: themeConfig.bannerImageUrl, bannerImageUrl: themeConfig.bannerImageUrl };
      }
    }
  }
  return { theme, themeConfig, overrides, brand, logoIcon };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface Props {
  theme: EcomTheme;
  brand: string;
  logoIcon?: string;
  /** Live navigation targets; when omitted, buttons act as demo-only. */
  projectId?: number;
  onLogin?: () => void;
  overrides?: any;
  editMode?: boolean;
  onEdit?: EditFn;
  onPickFile?: (path: string, file: File) => void;
  /** Real catalog products override demo ones when present. */
  dbProducts?: any[];
  onAddToCart?: (p: any) => void;
}

export default function ModernEcomStorefront({
  theme,
  brand,
  logoIcon,
  projectId,
  onLogin,
  overrides,
  editMode,
  onEdit,
  onPickFile,
  dbProducts,
  onAddToCart,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const accent = theme.primaryColor;
  const dark = theme.surface === 'dark';
  const bg = dark ? '#0b0b0f' : '#ffffff';

  const c = useMemo(() => buildEcomContent(theme, overrides), [theme, overrides]);

  // Real products win over demo content
  const products = useMemo(() => {
    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.slice(0, 8).map((p: any) => ({
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl || theme.heroImageUrl,
        live: p,
      }));
    }
    return c.products.map((p) => ({ ...p, live: null as any }));
  }, [dbProducts, c.products, theme.heroImageUrl]);

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

  const E = (p: string, v: string, cls?: string, as: any = 'span', style?: React.CSSProperties, ml?: boolean) => (
    <Ed path={p} value={v} edit={editMode} onEdit={onEdit} as={as} className={cls} style={style} multiline={ml} />
  );
  const I = (p: string, src: string, cls: string, alt?: string) => (
    <EdImg path={p} src={src} alt={alt} edit={editMode} onEdit={onEdit} onPickFile={onPickFile} className={cls} />
  );
  const imgWrap = editMode ? 'zb-img-wrap' : '';

  const goLogin = () => {
    if (onLogin) onLogin();
  };

  useEffect(() => {
    const root = rootRef.current;
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [theme.id, products.length]);

  const LoginBtn = ({ className, children }: { className: string; children: React.ReactNode }) =>
    projectId && !editMode && !onLogin ? (
      <Link href={`/preview/${projectId}/login`} className={className}>
        {children}
      </Link>
    ) : (
      <button onClick={goLogin} className={`${className} cursor-pointer border-none`}>
        {children}
      </button>
    );

  /* --- Hero variants --- */
  const hero = (() => {
    if (theme.heroLayout === 'split' || theme.heroLayout === 'editorial') {
      const editorial = theme.heroLayout === 'editorial';
      return (
        <section data-section="hero" className={`grid lg:grid-cols-2 min-h-[560px] ${editorial ? 'lg:grid-cols-[1.1fr_1fr]' : ''}`}>
          <div className="flex items-center px-8 sm:px-14 py-16 order-2 lg:order-1">
            <div className="max-w-lg space-y-6">
              <span className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: accent, animationDelay: '.1s' }}>
                {E('badge', c.badge)}
              </span>
              {E('tagline', c.tagline, `zb-hero-t block text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.02] tracking-tight ${editorial ? 'italic' : ''}`, 'h1', { animationDelay: '.22s', fontFamily: editorial ? 'Georgia, serif' : undefined }, true)}
              {E('desc', c.desc, `zb-hero-t block text-[15px] leading-relaxed font-medium ${t.soft}`, 'p', { animationDelay: '.34s' }, true)}
              <div className="zb-hero-t flex flex-wrap gap-3 pt-1" style={{ animationDelay: '.46s' }}>
                <a href="#shop" className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl text-white shadow-2xl hover:scale-[1.03] transition" style={{ backgroundColor: accent }}>
                  Shop the Collection
                </a>
                <LoginBtn className={`px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl border transition ${t.navBtn}`}>
                  Sign In
                </LoginBtn>
              </div>
            </div>
          </div>
          <div className={`relative min-h-[320px] overflow-hidden order-1 lg:order-2 ${imgWrap}`}>
            {I('heroImageUrl', c.heroImageUrl, 'zb-hero-img absolute inset-0 w-full h-full object-cover', brand)}
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
      <section data-section="hero" className={`relative min-h-[580px] flex items-center overflow-hidden ${imgWrap}`}>
        {I('heroImageUrl', c.heroImageUrl, 'zb-hero-img absolute inset-0 w-full h-full object-cover', brand)}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: centered
              ? `linear-gradient(160deg, ${accent}cc, #0b0b0fe6)`
              : 'linear-gradient(100deg, #0b0b0f 5%, #0b0b0fd0 45%, transparent)',
          }}
        />
        <div className={`relative max-w-7xl mx-auto px-6 w-full py-20 ${centered ? 'text-center' : ''}`}>
          <div className={`space-y-6 text-white ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
            <span className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur" style={{ animationDelay: '.1s' }}>
              {E('badge', c.badge)}
            </span>
            {E('tagline', c.tagline, 'zb-hero-t block text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.02] tracking-tight', 'h1', { animationDelay: '.22s' }, true)}
            {E('desc', c.desc, 'zb-hero-t block text-white/70 text-[15px] leading-relaxed font-medium', 'p', { animationDelay: '.34s' }, true)}
            <div className={`zb-hero-t flex flex-wrap gap-3 pt-1 ${centered ? 'justify-center' : ''}`} style={{ animationDelay: '.46s' }}>
              <a href="#shop" className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl text-white shadow-2xl hover:scale-[1.03] transition" style={{ backgroundColor: centered ? '#0b0b0f' : accent }}>
                Shop the Collection
              </a>
              <LoginBtn className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition">
                Sign In
              </LoginBtn>
            </div>
          </div>
        </div>
      </section>
    );
  })();

  return (
    <div ref={rootRef} style={{ backgroundColor: bg }} className={t.text}>
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
        html{scroll-behavior:smooth}
        ${editMode ? EDIT_STYLES : ''}
      `}</style>

      {/* NAV */}
      <nav data-section="nav" className={`sticky top-0 z-40 backdrop-blur-xl border-b ${t.border}`} style={{ backgroundColor: `${bg}e6` }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-lg" style={{ backgroundColor: accent }}>
              {logoIcon || theme.icon}
            </div>
            <span className="font-black tracking-tight text-[15px] truncate uppercase">{brand}</span>
          </div>
          <div className={`hidden lg:flex items-center gap-7 text-[12px] font-semibold ${t.muted}`}>
            {c.navLinks.map((l, i) => (
              <span key={i} className={`${dark ? 'hover:text-white' : 'hover:text-slate-900'} cursor-pointer transition`}>
                {E(`navLinks.${i}`, l)}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LoginBtn className={`px-4 py-2 text-[11px] font-bold rounded-lg border transition ${t.navBtn}`}>Sign In</LoginBtn>
            <button className="relative px-4 py-2 text-[11px] font-black rounded-lg text-white border-none cursor-pointer hover:brightness-110 transition" style={{ backgroundColor: accent }}>
              🛒 Cart
            </button>
          </div>
        </div>
      </nav>

      {hero}

      {/* MARQUEE */}
      <div data-section="marquee" className="overflow-hidden border-y py-3" style={{ backgroundColor: accent, borderColor: accent }}>
        <div className="zb-marquee flex gap-10 whitespace-nowrap w-max">
          {[...c.marquee, ...c.marquee, ...c.marquee].map((m, i) => (
            <span key={i} className="text-[11px] font-black uppercase tracking-widest text-white/90">
              ✦ {i < c.marquee.length ? E(`marquee.${i}`, m) : m}
            </span>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section data-section="shop" id="shop" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div data-reveal className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div className="space-y-2">
            {E('shopEyebrow', c.shopEyebrow, 'text-[10px] font-black uppercase tracking-[0.25em]', 'span', { color: accent })}
            {E('shopTitle', c.shopTitle, 'block text-3xl sm:text-4xl font-black tracking-tight', 'h2')}
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-wider cursor-pointer ${t.muted}`}>View all →</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <div key={i} data-reveal data-delay={i % 4} className={`group rounded-3xl overflow-hidden border ${t.border} ${t.card} hover:-translate-y-1.5 hover:shadow-xl transition duration-500`}>
              <div className={`h-48 sm:h-56 overflow-hidden relative ${imgWrap}`}>
                {p.live ? (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                ) : (
                  I(`products.${i}.imageUrl`, p.imageUrl, 'w-full h-full object-cover group-hover:scale-110 transition duration-700', p.name)
                )}
                {i === 0 && (
                  <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
                    Bestseller
                  </span>
                )}
              </div>
              <div className="p-4 space-y-1.5">
                {p.live
                  ? <h3 className="font-bold text-[13px] leading-snug truncate">{p.name}</h3>
                  : E(`products.${i}.name`, p.name, 'block font-bold text-[13px] leading-snug truncate', 'h3')}
                <div className="flex items-center justify-between">
                  <span className="font-black text-[14px]" style={{ color: accent }}>
                    ₹{p.live ? p.price : E(`products.${i}.price`, String(p.price))}
                  </span>
                  <span className={`text-[10px] font-semibold ${t.muted}`}>★ 4.{7 + (i % 3)}</span>
                </div>
                <button
                  onClick={() => p.live && onAddToCart?.(p.live)}
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

      {/* FEATURES */}
      <section data-section="features" className={`${t.band} border-y ${t.border}`}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-3 gap-8">
          {c.features.map((f, i) => (
            <div key={i} data-reveal data-delay={i % 3} className="flex gap-4 items-start">
              {E(`features.${i}.i`, f.i, 'text-2xl', 'span')}
              <div>
                {E(`features.${i}.h`, f.h, 'block text-[14px] font-black tracking-tight', 'h4')}
                {E(`features.${i}.d`, f.d, `block text-[12px] leading-relaxed mt-1 ${t.muted}`, 'p', undefined, true)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section data-section="reviews" className="max-w-7xl mx-auto px-6 py-20">
        <div data-reveal className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">What customers say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {c.reviews.map((r, i) => (
            <div key={i} data-reveal data-delay={i % 3} className={`${t.card} border ${t.border} rounded-3xl p-7 space-y-4`}>
              <div className="text-lg" style={{ color: accent }}>★★★★★</div>
              {E(`reviews.${i}.q`, r.q, `block text-[13px] leading-relaxed italic ${t.soft}`, 'p', undefined, true)}
              <div className={`flex items-center gap-3 pt-2 border-t ${t.border}`}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-black text-white" style={{ backgroundColor: accent }}>{r.n[0]}</div>
                <div>
                  {E(`reviews.${i}.n`, r.n, 'block text-[12px] font-bold', 'div')}
                  {E(`reviews.${i}.r`, r.r, `block text-[10px] font-semibold uppercase tracking-wider ${t.muted}`, 'div')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section data-section="newsletter" className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${accent}, ${accent}22)` }} />
        <div data-reveal className="relative max-w-3xl mx-auto px-6 py-20 text-center text-white space-y-5">
          {E('newsTitle', c.newsTitle, 'block text-3xl sm:text-4xl font-black tracking-tight', 'h2')}
          {E('newsSub', c.newsSub, 'block text-white/85 text-[14px] font-semibold', 'p', undefined, true)}
          <div className="flex gap-2 max-w-md mx-auto pt-2">
            <input placeholder="you@example.com" className="flex-grow bg-white/95 border-none rounded-xl px-4 py-3.5 text-[13px] text-slate-900 outline-none" />
            <button className="px-6 py-3.5 bg-black hover:bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-xl border-none cursor-pointer transition">
              Join
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer data-section="footer" className={`border-t ${t.border} ${dark ? 'bg-black/40' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: accent }}>{logoIcon || theme.icon}</div>
              <span className="font-black text-[15px] uppercase">{brand}</span>
            </div>
            <p className={`text-[12px] leading-relaxed max-w-sm ${t.muted}`}>{c.desc}</p>
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
