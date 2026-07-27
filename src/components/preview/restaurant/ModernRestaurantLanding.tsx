'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { CategoryProps } from './categories/types';
import {
  resolveAccent,
  getNicheCopy,
  getNicheDishes,
  RESTAURANT_GALLERY,
  RESTAURANT_REVIEWS,
  DemoDish,
} from './restaurantContent';
import { Ed, EdImg, EDIT_STYLES } from '@/components/preview/gym/Editable';

/** Extra props for inline click-to-type editing inside the Theme Studio. */
interface EditProps {
  editMode?: boolean;
  /** path is "section.field", e.g. "hero.title" */
  onEdit?: (path: string, value: any) => void;
  onPickFile?: (path: string, file: File) => void;
  overrides?: any;
}

/**
 * A single modern, fully scrollable restaurant landing page shared by every
 * restaurant template. Copy, imagery and accent colour are derived from the
 * template's niche + theme preset, so all 24 templates get a distinct look
 * without maintaining 24 separate layouts.
 */
export default function ModernRestaurantLanding({
  projectId,
  project,
  dbProducts,
  cartCount,
  onAddToCart,
  onViewCart,
  onViewMyOrders,
  onProductClick,
  wishlist,
  onToggleWishlist,
  setIsBookingModalOpen,
  customerSession,
  onLogout,
  logoUrl,
  logoIcon,
  companyName,
  heroImage,
  heroTitle,
  heroSubtitle,
  themePreset,
  restaurantInfo,
  editMode,
  onEdit,
  onPickFile,
  overrides,
}: CategoryProps & EditProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const niche =
    restaurantInfo?.subcategory || (project?.name ?? '') || '';
  const copy = useMemo(() => getNicheCopy(niche), [niche]);
  const accent = resolveAccent(themePreset || restaurantInfo?.selectedTheme);

  // Saved layout edits (from the studio or persisted on the restaurant profile)
  const ov = overrides ?? restaurantInfo?.layoutContent?.landing ?? {};
  /** Read an override field with a fallback, keyed by studio section.field. */
  const L = (section: string, field: string, fallback: string) =>
    (ov?.[section]?.[field] ?? '') || fallback;
  /** Inline editable text node (only interactive in editMode). */
  const E = (section: string, field: string, value: string, cls?: string, as: any = 'span', style?: React.CSSProperties, ml?: boolean) => (
    <Ed path={`${section}.${field}`} value={value} edit={editMode} onEdit={onEdit} as={as} className={cls} style={style} multiline={ml} />
  );

  const displayName = companyName || project?.name?.replace(' Site', '') || 'Our Restaurant';
  const displayHeroImage = L('hero', 'imageUrl', heroImage && heroImage.startsWith('http') ? heroImage : copy.heroImage);
  const displayHeroTitle = L('hero', 'title', heroTitle || copy.heroTitle);
  const displayHeroSubtitle = L('hero', 'subtitle', heroSubtitle || restaurantInfo?.description || copy.heroSubtitle);
  const heroEyebrow = L('hero', 'eyebrow', copy.eyebrow);
  const menuHeading = L('dishes', 'heading', copy.menuHeading);
  const menuSub = L('dishes', 'note', copy.menuSub);
  const storyHeading = L('ambiance1', 'heading', copy.storyHeading);
  const storySub = L('ambiance1', 'text', copy.storySub);
  const ctaHeading = L('reserve', 'heading', copy.ctaHeading);
  const primaryCta = L('hero', 'primaryCta', copy.primaryCta);
  const secondaryCta = L('hero', 'secondaryCta', copy.secondaryCta);
  const bookLabel = L('hero', 'bookLabel', copy.bookLabel);
  const reviewsHeading = L('statement', 'heading', 'What our guests say');

  // Real products win; demo dishes only fill in when the catalog is empty.
  const demoDishes = useMemo(() => getNicheDishes(niche), [niche]);
  const usingLiveProducts = (dbProducts?.length ?? 0) > 0;

  const items = useMemo(() => {
    if (usingLiveProducts) {
      return dbProducts.map((p) => ({
        key: String(p.id),
        name: p.name,
        desc: p.description || '',
        price: p.price,
        tag: p.category || 'Menu',
        img: p.imageUrl || demoDishes[0].img,
        product: p as Product,
      }));
    }
    return demoDishes.map((d: DemoDish) => ({
      key: d.name,
      name: d.name,
      desc: d.desc,
      price: d.price,
      tag: d.tag,
      img: d.img,
      product: null,
    }));
  }, [usingLiveProducts, dbProducts, demoDishes]);

  const cats = useMemo(
    () => ['All', ...Array.from(new Set(items.map((i) => i.tag).filter(Boolean)))],
    [items]
  );
  const [activeCat, setActiveCat] = useState('All');
  const [query, setQuery] = useState('');

  const shown = items.filter((i) => {
    const matchesCat = activeCat === 'All' || i.tag === activeCat;
    const matchesQuery =
      !query.trim() ||
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.desc.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // Reveal-on-scroll
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
  }, [shown.length, activeCat]);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Our Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit', href: '#visit' },
  ];

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt={displayName} className="h-9 w-9 rounded-xl object-cover" />
  ) : (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-lg"
      style={{ backgroundColor: accent }}
    >
      {logoIcon || copy.emoji}
    </div>
  );

  return (
    <div ref={rootRef} className="bg-[#0b0b0f] text-white">
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        [data-reveal].zb-in{opacity:1;transform:none}
        [data-reveal][data-delay="1"]{transition-delay:.09s}
        [data-reveal][data-delay="2"]{transition-delay:.18s}
        [data-reveal][data-delay="3"]{transition-delay:.27s}
        @keyframes zbFadeUp{from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:none}}
        @keyframes zbZoom{from{transform:scale(1.14)}to{transform:scale(1)}}
        @keyframes zbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        .zb-hero-t{animation:zbFadeUp .9s cubic-bezier(.16,1,.3,1) both}
        .zb-hero-img{animation:zbZoom 1.8s cubic-bezier(.16,1,.3,1) both}
        .zb-float{animation:zbFloat 5s ease-in-out infinite}
        html{scroll-behavior:smooth}
        ${editMode ? EDIT_STYLES : ''}
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <nav data-section="hero" className="sticky top-0 z-40 backdrop-blur-xl bg-[#0b0b0f]/85 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            {displayLogo}
            <div className="min-w-0">
              <span className="font-black tracking-tight text-[15px] block truncate">{displayName}</span>
              <span
                className="text-[8.5px] font-black uppercase tracking-[0.2em] block"
                style={{ color: accent }}
              >
                {copy.eyebrow}
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-7 text-[12px] font-semibold text-white/60">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white transition">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onViewCart?.()}
              className="relative px-3 py-2 text-[11px] font-bold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 cursor-pointer transition"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-black flex items-center justify-center text-slate-900"
                  style={{ backgroundColor: accent }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {customerSession ? (
              <>
                <button
                  onClick={() => onViewMyOrders?.()}
                  className="hidden sm:block px-3 py-2 text-[11px] font-bold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 cursor-pointer transition"
                >
                  My Orders
                </button>
                <Link
                  href={`/preview/${projectId}/dashboard`}
                  className="hidden sm:block px-3 py-2 text-[11px] font-bold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="px-3 py-2 text-[11px] font-bold rounded-lg bg-transparent text-white/50 hover:text-white border-none cursor-pointer transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href={`/preview/${projectId}/login`}
                className="px-4 py-2 text-[11px] font-bold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 text-[11px] font-black rounded-lg text-slate-900 border-none cursor-pointer hover:brightness-110 transition"
              style={{ backgroundColor: accent }}
            >
              {E('hero', 'bookLabel', bookLabel)}
            </button>
          </div>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <section data-section="hero" className={`relative min-h-[600px] flex items-center overflow-hidden ${editMode ? 'zb-img-wrap' : ''}`}>
        {editMode ? (
          <EdImg path="hero.imageUrl" src={displayHeroImage} alt={displayName} edit onEdit={onEdit} onPickFile={onPickFile} className="zb-hero-img absolute inset-0 w-full h-full object-cover" />
        ) : (
          <img src={displayHeroImage} alt={displayName} className="zb-hero-img absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0f] via-[#0b0b0f]/85 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-xl space-y-6">
            <span
              className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full"
              style={{ backgroundColor: accent, color: '#0f172a', animationDelay: '.1s' }}
            >
              {copy.emoji} {E('hero', 'eyebrow', heroEyebrow)}
            </span>
            {E('hero', 'title', displayHeroTitle, 'zb-hero-t block text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight', 'h1', { animationDelay: '.22s' }, true)}
            {E('hero', 'subtitle', displayHeroSubtitle, 'zb-hero-t block text-white/65 text-[15px] leading-relaxed font-medium', 'p', { animationDelay: '.34s' }, true)}
            <div className="zb-hero-t flex flex-wrap gap-3 pt-1" style={{ animationDelay: '.46s' }}>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl text-slate-900 border-none cursor-pointer shadow-2xl hover:scale-[1.03] transition"
                style={{ backgroundColor: accent }}
              >
                {E('hero', 'primaryCta', primaryCta)}
              </button>
              <a
                href="#menu"
                className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition"
              >
                {E('hero', 'secondaryCta', secondaryCta)}
              </a>
            </div>
            <div
              className="zb-hero-t flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[11px] font-semibold text-white/50"
              style={{ animationDelay: '.58s' }}
            >
              <span>⭐ 4.9 · 2,400+ reviews</span>
              <span>🕒 Open till 11:30 PM</span>
              <span>📍 {restaurantInfo?.city || 'Noida'}</span>
            </div>
          </div>
        </div>

        <a
          href="#menu"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/70 text-[10px] font-bold tracking-widest uppercase zb-float transition"
        >
          Scroll ↓
        </a>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: `${items.length}+`, l: 'Menu Items' },
            { v: '18k', l: 'Guests Served' },
            { v: '4.9★', l: 'Average Rating' },
            { v: '12', l: 'Years of Craft' },
          ].map((s, i) => (
            <div key={s.l} data-reveal data-delay={i % 4} className="text-center">
              <div className="text-3xl font-black" style={{ color: accent }}>
                {s.v}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- MENU ---------------- */}
      <section data-section="dishes" id="menu" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div data-reveal className="text-center max-w-lg mx-auto space-y-3 mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
            Our Menu
          </span>
          {E('dishes', 'heading', menuHeading, 'block text-3xl sm:text-4xl font-black tracking-tight', 'h2')}
          {E('dishes', 'note', menuSub, 'block text-white/50 text-[13px] leading-relaxed', 'p', undefined, true)}
        </div>

        <div data-reveal className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8">
          <div className="flex flex-wrap justify-center gap-2 order-2 sm:order-1">
            {cats.slice(0, 8).map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-full border cursor-pointer transition ${
                  activeCat === c
                    ? 'text-slate-900 border-transparent'
                    : 'bg-white/5 text-white/60 border-white/15 hover:bg-white/10'
                }`}
                style={activeCat === c ? { backgroundColor: accent } : undefined}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative order-1 sm:order-2 w-full sm:w-56">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu…"
              className="w-full bg-white/5 border border-white/15 focus:border-white/40 rounded-xl pl-9 pr-3 py-2.5 text-[12px] text-white outline-none transition"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-[12px]">🔍</span>
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <span className="text-4xl block mb-3">🍽</span>
            <p className="text-[13px] font-semibold">No dishes match that search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((d, i) => {
              const isWishlisted = d.product?.id != null && wishlist?.includes(d.product.id);
              return (
                <div
                  key={d.key}
                  data-reveal
                  data-delay={i % 3}
                  className="group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-white/25 hover:-translate-y-1.5 transition duration-500 flex flex-col"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={d.img}
                      alt={d.name}
                      onClick={() => d.product && onProductClick?.(d.product)}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 cursor-pointer"
                    />
                    <span
                      className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-slate-900"
                      style={{ backgroundColor: accent }}
                    >
                      {d.tag}
                    </span>
                    {d.product && onToggleWishlist && (
                      <button
                        onClick={() => onToggleWishlist(d.product!)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/20 text-[13px] cursor-pointer transition hover:bg-black/70"
                      >
                        {isWishlisted ? '❤️' : '🤍'}
                      </button>
                    )}
                  </div>

                  <div className="p-5 space-y-2 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-black text-[15px] leading-snug">{d.name}</h3>
                      <span className="font-black text-[15px] shrink-0" style={{ color: accent }}>
                        ₹{d.price}
                      </span>
                    </div>
                    <p className="text-white/45 text-[12px] leading-relaxed flex-grow">{d.desc}</p>
                    <button
                      onClick={() => {
                        if (d.product) onAddToCart(d.product);
                        else setIsBookingModalOpen(true);
                      }}
                      className="w-full mt-3 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl border cursor-pointer transition hover:text-slate-900"
                      style={{ borderColor: accent, color: accent }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accent)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {d.product ? 'Add to Order' : 'Enquire'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ---------------- STORY ---------------- */}
      <section data-section="ambiance1" id="story" className="bg-white/[0.02] border-y border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
          <div data-reveal className="relative">
            <img src={copy.storyImage} alt="Our kitchen" className="rounded-3xl w-full h-[420px] object-cover" />
            <div
              className="absolute -bottom-6 right-4 md:right-8 rounded-2xl px-6 py-5 shadow-2xl text-slate-900 zb-float"
              style={{ backgroundColor: accent }}
            >
              <div className="text-3xl font-black leading-none">12+</div>
              <div className="text-[10px] font-black uppercase tracking-widest mt-1">Years of craft</div>
            </div>
          </div>

          <div data-reveal data-delay="1" className="space-y-5">
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
              Our Story
            </span>
            {E('ambiance1', 'heading', storyHeading, 'block text-3xl sm:text-4xl font-black tracking-tight leading-tight whitespace-pre-line', 'h2', undefined, true)}
            {E('ambiance1', 'text', storySub, 'block text-white/50 text-[13.5px] leading-relaxed', 'p', undefined, true)}
            <ul className="space-y-3 pt-2">
              {copy.facts.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[13px] text-white/70 font-semibold">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-slate-900 shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- RESERVATION BAND ---------------- */}
      <section data-section="reserve" className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${accent}, ${accent}22)` }} />
        <div data-reveal className="relative max-w-4xl mx-auto px-6 py-20 text-center text-slate-900 space-y-5">
          {E('reserve', 'heading', ctaHeading, 'block text-3xl sm:text-4xl font-black tracking-tight', 'h2')}
          <p className="text-slate-900/70 text-[14px] font-semibold max-w-lg mx-auto">
            Live seat map, instant confirmation, and a reminder before you arrive.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-4 bg-slate-900 hover:bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-xl border-none cursor-pointer shadow-2xl transition"
            >
              {E('hero', 'bookLabel', bookLabel)}
            </button>
            <a
              href="#menu"
              className="px-8 py-4 bg-white/25 hover:bg-white/40 backdrop-blur text-slate-900 text-[11px] font-black uppercase tracking-widest rounded-xl border border-slate-900/10 transition"
            >
              Order Takeaway
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <section data-section="statement" className="max-w-7xl mx-auto px-6 py-20">
        <div data-reveal className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
            Reviews
          </span>
          {E('statement', 'heading', reviewsHeading, 'block text-3xl sm:text-4xl font-black tracking-tight', 'h2')}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {RESTAURANT_REVIEWS.map((t, i) => (
            <div key={t.n} data-reveal data-delay={i % 3} className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 space-y-4">
              <div className="text-lg" style={{ color: accent }}>
                ★★★★★
              </div>
              <p className="text-white/60 text-[13px] leading-relaxed italic">“{t.q}”</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-black text-slate-900"
                  style={{ backgroundColor: accent }}
                >
                  {t.n[0]}
                </div>
                <div>
                  <div className="text-[12px] font-bold">{t.n}</div>
                  <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section data-section="ambiance2" id="gallery" className="max-w-7xl mx-auto px-6 pb-20 scroll-mt-20">
        <div data-reveal className="text-center space-y-3 mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Inside the room</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {RESTAURANT_GALLERY.map((g, i) => (
            <div
              key={g}
              data-reveal
              data-delay={i % 3}
              className={`overflow-hidden rounded-2xl ${i === 0 ? 'md:row-span-2 md:h-[420px]' : 'h-52'}`}
            >
              <img src={g} alt="gallery" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- VISIT / HOURS ---------------- */}
      <section data-section="reserve" id="visit" className="bg-white/[0.02] border-y border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
          {[
            {
              h: 'Opening Hours',
              rows: ['Mon – Thu · 11:00 – 23:00', 'Fri – Sat · 11:00 – 23:30', 'Sunday · 12:00 – 22:30'],
            },
            {
              h: 'Find Us',
              rows: [
                restaurantInfo?.address || '104 Food Arcade, MG Road',
                `${restaurantInfo?.city || 'Noida'}, ${restaurantInfo?.state || 'Uttar Pradesh'}`,
                restaurantInfo?.pincode || '201301',
              ],
            },
            {
              h: 'Get in Touch',
              rows: [
                restaurantInfo?.mobileNo || '+91 98765 43210',
                restaurantInfo?.email || `hello@${displayName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
                'Private events desk available',
              ],
            },
          ].map((col, i) => (
            <div key={col.h} data-reveal data-delay={i % 3} className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
                {col.h}
              </h3>
              {col.rows.map((r) => (
                <p key={r} className="text-white/60 text-[13px] font-medium">
                  {r}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer data-section="reserve" className="bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              {displayLogo}
              <span className="font-black text-[15px]">{displayName}</span>
            </div>
            <p className="text-white/40 text-[12px] leading-relaxed max-w-sm">
              {restaurantInfo?.description || copy.heroSubtitle}
            </p>
            <div className="flex gap-2 pt-2">
              {['ig', 'fb', 'x', 'in'].map((s) => (
                <span
                  key={s}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black uppercase text-white/50"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
              Explore
            </h4>
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="block text-white/45 hover:text-white text-[12px] font-medium transition">
                {l.label}
              </a>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
              Account
            </h4>
            <Link href={`/preview/${projectId}/login`} className="block text-white/45 hover:text-white text-[12px] font-medium transition">
              Sign In
            </Link>
            <Link href={`/preview/${projectId}/dashboard`} className="block text-white/45 hover:text-white text-[12px] font-medium transition">
              Dashboard
            </Link>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="block text-white/45 hover:text-white text-[12px] font-medium transition bg-transparent border-none cursor-pointer p-0"
            >
              {E('hero', 'bookLabel', bookLabel)}
            </button>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-white/25 text-[10px] font-semibold uppercase tracking-widest">
          © {new Date().getFullYear()} {displayName} · Built with ZATBIZ
        </div>
      </footer>
    </div>
  );
}
