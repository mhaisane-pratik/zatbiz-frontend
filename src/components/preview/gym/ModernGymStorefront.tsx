'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { THEMES_30 } from '@/app/dashboard/themesData';
import { getGymThemeContent, readGymLayout } from './gymThemeContent';
import { Ed, EdImg, EDIT_STYLES, EditFn } from './Editable';

interface Props {
  projectId: number;
  project: Project;
  customerSession?: any;
  gymInfo?: any;
  onLogout?: () => void;
  /** Live edits from the Theme Studio. Falls back to gymInfo.layoutContent. */
  overrides?: any;
  /** Section visibility map from the layout editor, e.g. { gallery: false }. */
  sectionVisibility?: Record<string, boolean>;
  /** Turns on inline click-to-type editing of every text and image. */
  editMode?: boolean;
  onEdit?: EditFn;
  onPickFile?: (path: string, file: File) => void;
}

function isLightSurface(hex?: string) {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

/** Resolves the saved theme id from the gym profile or the project's blocksJson. */
export function resolveGymTheme(project?: Project, gymInfo?: any) {
  let themeId: string | undefined = gymInfo?.selectedTheme;

  if (!themeId && project?.blocksJson) {
    try {
      const parsed = JSON.parse(project.blocksJson);
      if (Array.isArray(parsed)) {
        const biz = parsed.find((b: any) => b.type === 'business_config');
        themeId = biz?.theme || parsed.find((b: any) => b.type === 'header')?.theme;
      } else {
        themeId = parsed?.businessConfig?.themePreset;
      }
    } catch {
      /* ignore */
    }
  }

  const theme = THEMES_30.find((t) => t.id === themeId);
  return {
    themeId: themeId || 'gym-volt-apex',
    theme,
    accent: gymInfo?.themeColor || theme?.primaryColor || '#ea580c',
    bg: theme?.bgColor || '#09090b',
    brandIcon: theme?.brandIcon || '💪',
  };
}

export default function ModernGymStorefront({
  projectId,
  project,
  customerSession,
  gymInfo,
  onLogout,
  overrides,
  sectionVisibility,
  editMode,
  onEdit,
  onPickFile,
}: Props) {
  // Shorthands so the JSX below stays readable
  const E = (p: string, v: string, cls?: string, as: any = 'span', style?: React.CSSProperties, ml?: boolean) => (
    <Ed path={p} value={v} edit={editMode} onEdit={onEdit} as={as} className={cls} style={style} multiline={ml} />
  );
  const I = (p: string, src: string, cls: string, alt?: string) => (
    <EdImg path={p} src={src} alt={alt} edit={editMode} onEdit={onEdit} onPickFile={onPickFile} className={cls} />
  );
  const imgWrap = editMode ? 'zb-img-wrap' : '';
  const rootRef = useRef<HTMLDivElement>(null);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [playing, setPlaying] = useState(false);

  const { themeId, theme, accent, bg, brandIcon } = useMemo(
    () => resolveGymTheme(project, gymInfo),
    [project, gymInfo]
  );
  // Editor overrides: live from the studio, else whatever was saved
  const saved = useMemo(() => readGymLayout(gymInfo, project), [gymInfo, project]);
  const activeOverrides = overrides ?? saved.landing;
  const c = useMemo(() => getGymThemeContent(themeId, activeOverrides), [themeId, activeOverrides]);

  const vis = sectionVisibility ?? saved.sectionVisibility ?? {};
  const show = (key: string) => vis[key] !== false;

  const brand = gymInfo?.clubName || gymInfo?.businessName || project?.name?.replace(' Site', '') || 'Fitness Club';
  const hero = gymInfo?.headerBgImage || c.heroImage;
  const light = isLightSurface(bg);

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
  }, [themeId]);

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
        @keyframes zbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes zbPulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:0;transform:scale(1.5)}}
        .zb-hero-t{animation:zbFadeUp .9s cubic-bezier(.16,1,.3,1) both}
        .zb-hero-img{animation:zbZoom 1.8s cubic-bezier(.16,1,.3,1) both}
        .zb-float{animation:zbFloat 5s ease-in-out infinite}
        .zb-ping{animation:zbPulse 2s ease-out infinite}
        html{scroll-behavior:smooth}
        ${editMode ? EDIT_STYLES : ''}
      `}</style>

      {/* NAV */}
      <nav data-section="footer" className={`sticky top-0 z-40 backdrop-blur-xl border-b ${t.border}`} style={{ backgroundColor: `${bg}e6` }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            {gymInfo?.logoUrl ? (
              <img src={gymInfo.logoUrl} alt={brand} className="h-9 w-9 rounded-xl object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-lg" style={{ backgroundColor: accent }}>
                {brandIcon}
              </div>
            )}
            <div className="min-w-0">
              <span className="font-black tracking-tight text-[15px] block truncate uppercase">{brand}</span>
              {E('eyebrow', c.eyebrow, 'text-[8.5px] font-black uppercase tracking-[0.2em] block', 'span', { color: accent })}
            </div>
          </div>

          <div className={`hidden lg:flex items-center gap-7 text-[12px] font-semibold ${t.muted}`}>
            {c.navLinks.map((l, i) =>
              editMode ? (
                <React.Fragment key={i}>{E(`navLinks.${i}`, l, 'transition')}</React.Fragment>
              ) : (
                <a key={l} href={`#${l.toLowerCase().replace(/[^a-z]/g, '')}`} className={`${light ? 'hover:text-slate-900' : 'hover:text-white'} transition`}>
                  {l}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {customerSession ? (
              <>
                <Link href={`/preview/${projectId}/dashboard`} className={`px-4 py-2 text-[11px] font-bold rounded-lg border transition ${t.navBtn}`}>
                  {E('portalLabel', c.portalLabel)}
                </Link>
                <button onClick={onLogout} className={`px-3 py-2 text-[11px] font-bold rounded-lg bg-transparent border-none cursor-pointer transition ${t.muted}`}>
                  Logout
                </button>
              </>
            ) : (
              <Link href={`/preview/${projectId}/login`} className={`px-4 py-2 text-[11px] font-bold rounded-lg border transition ${t.navBtn}`}>
                {E('portalLabel', c.portalLabel)}
              </Link>
            )}
            <Link
              href={`/preview/${projectId}/login`}
              className="px-4 py-2 text-[11px] font-black rounded-lg text-white border-none hover:brightness-110 transition"
              style={{ backgroundColor: accent }}
            >
              {E('joinLabel', c.joinLabel)}
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      {show('hero') && (
      <section data-section="hero" className={`relative min-h-[620px] flex items-center overflow-hidden ${imgWrap}`}>
        {I('heroImage', hero, 'zb-hero-img absolute inset-0 w-full h-full object-cover', brand)}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, #0b0b0f 8%, #0b0b0fd9 45%, transparent)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${light ? bg : '#0b0b0f'}, transparent 55%)` }} />

        <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-xl space-y-6 text-white">
            <span
              className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: accent, animationDelay: '.1s' }}
            >
              {theme?.icon} {E('eyebrow', c.eyebrow)}
            </span>
            {E(
              'headline',
              c.headline,
              'zb-hero-t block text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[1] tracking-tight whitespace-pre-line',
              'h1',
              { animationDelay: '.22s' },
              true
            )}
            {E(
              'sub',
              gymInfo?.description || c.sub,
              'zb-hero-t block text-white/70 text-[15px] leading-relaxed font-medium',
              'p',
              { animationDelay: '.34s' },
              true
            )}
            <div className="zb-hero-t flex flex-wrap gap-3 pt-1" style={{ animationDelay: '.46s' }}>
              <Link
                href={`/preview/${projectId}/login`}
                className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl text-white border-none shadow-2xl hover:scale-[1.03] transition inline-block"
                style={{ backgroundColor: accent }}
              >
                {E('primaryCta', c.primaryCta)}
              </Link>
              <a
                href="#classes"
                className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition"
              >
                {E('secondaryCta', c.secondaryCta)}
              </a>
            </div>
            <div className="zb-hero-t flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[11px] font-semibold text-white/55" style={{ animationDelay: '.58s' }}>
              {c.stats.slice(0, 3).map((s, i) => (
                <span key={i}>
                  {E(`stats.${i}.v`, s.v)} · {E(`stats.${i}.l`, s.l)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a href="#stats" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/70 text-[10px] font-bold tracking-widest uppercase zb-float transition">
          Scroll ↓
        </a>
      </section>
      )}

      {/* STATS */}
      {show('stats') && (
      <section data-section="stats" id="stats" className={`border-y ${t.border} ${t.band}`}>
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {c.stats.map((s, i) => (
            <div key={i} data-reveal data-delay={i % 4} className="text-center">
              {E(`stats.${i}.v`, s.v, 'block text-3xl font-black', 'div', { color: accent })}
              {E(`stats.${i}.l`, s.l, `block text-[10px] uppercase tracking-widest font-bold mt-1 ${t.muted}`, 'div')}
            </div>
          ))}
        </div>
      </section>
      )}

      {/* CLASSES */}
      {show('classes') && (
      <section data-section="classes" id="classes" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div data-reveal className="text-center max-w-lg mx-auto space-y-3 mb-12">
          {E('navLinks.0', c.navLinks[0], 'text-[10px] font-black uppercase tracking-[0.25em]', 'span', { color: accent })}
          {E('classesTitle', c.classesTitle, 'block text-3xl sm:text-4xl font-black uppercase tracking-tight', 'h2')}
          {E('classesSub', c.classesSub, `block text-[13px] leading-relaxed ${t.muted}`, 'p', undefined, true)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.classes.map((cl, i) => (
            <div
              key={i}
              data-reveal
              data-delay={i % 3}
              className={`group relative rounded-3xl overflow-hidden h-64 border ${t.border} ${t.borderHover} hover:-translate-y-1.5 transition duration-500 ${imgWrap}`}
            >
              {I(`classes.${i}.img`, cl.img, 'absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700', cl.name)}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 space-y-1.5 text-white">
                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white inline-block" style={{ backgroundColor: accent }}>
                  {`0${i + 1}`}
                </span>
                {E(`classes.${i}.name`, cl.name, 'block text-lg font-black uppercase tracking-tight', 'h3')}
                {E(`classes.${i}.meta`, cl.meta, 'block text-white/60 text-[11px] font-semibold', 'p')}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* VIDEO + FEATURES */}
      {(show('video') || show('features')) && (
      <section id="facilities" className={`${t.band} border-y ${t.border} scroll-mt-20`}>
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-10">
          {show('video') && (
          <div data-reveal className="text-center max-w-lg mx-auto space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>Walkthrough</span>
            {E('videoTitle', c.videoTitle, 'block text-3xl sm:text-4xl font-black uppercase tracking-tight', 'h2')}
            {E('videoSub', c.videoSub, `block text-[13px] leading-relaxed ${t.muted}`, 'p', undefined, true)}
          </div>
          )}

          {show('video') && (
          <div data-section="video" data-reveal className={`relative rounded-3xl overflow-hidden border ${t.border} aspect-video max-w-5xl mx-auto bg-black`}>
            {playing ? (
              <video src={c.videoUrl} controls autoPlay className="w-full h-full object-cover" />
            ) : (
              <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full cursor-pointer border-none p-0 bg-transparent group">
                <img src={hero} alt="Facility tour" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="relative flex items-center justify-center">
                    <span className="absolute w-20 h-20 rounded-full zb-ping" style={{ backgroundColor: accent }} />
                    <span className="relative w-20 h-20 rounded-full flex items-center justify-center text-2xl text-white shadow-2xl" style={{ backgroundColor: accent }}>▶</span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/80">Play walkthrough</span>
                </span>
              </button>
            )}
          </div>
          )}

          {show('features') && (
          <div data-section="features" className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {c.features.map((f, i) => (
              <div key={i} data-reveal data-delay={i % 3} className={`${t.card} border ${t.border} rounded-3xl p-6 space-y-2`}>
                {E(`features.${i}.i`, f.i, 'block text-2xl', 'span')}
                {E(`features.${i}.t`, f.t, 'block text-[14px] font-black uppercase tracking-tight', 'h4')}
                {E(`features.${i}.d`, f.d, `block text-[12px] leading-relaxed ${t.muted}`, 'p', undefined, true)}
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
      )}

      {/* COACHES */}
      {show('coaches') && (
      <section data-section="coaches" id="coaches" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div data-reveal className="text-center space-y-3 mb-12">
          {E('coachRole', c.coachRole, 'text-[10px] font-black uppercase tracking-[0.25em]', 'span', { color: accent })}
          {E('coachesTitle', c.coachesTitle, 'block text-3xl sm:text-4xl font-black uppercase tracking-tight', 'h2')}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {c.coaches.map((co, i) => (
            <div key={i} data-reveal data-delay={i % 3} className="group space-y-3">
              <div className={`rounded-3xl overflow-hidden h-56 border ${t.border} ${imgWrap}`}>
                {I(`coaches.${i}.img`, co.img, 'w-full h-full object-cover group-hover:scale-110 transition duration-700', co.n)}
              </div>
              <div>
                {E(`coaches.${i}.n`, co.n, 'block text-[14px] font-black tracking-tight', 'h4')}
                {E(`coaches.${i}.r`, co.r, 'block text-[10px] font-black uppercase tracking-widest', 'p', { color: accent })}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* MEMBERSHIP */}
      {show('membership') && (
      <section data-section="membership" id="membership" className={`${t.band} border-y ${t.border} scroll-mt-20`}>
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
                {E(`plans.${i}.name`, p.name, 'block text-lg font-black uppercase tracking-tight', 'h3')}
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black" style={{ color: accent }}>
                    ₹
                    {E(
                      `plans.${i}.${billing === 'monthly' ? 'm' : 'y'}`,
                      (billing === 'monthly' ? p.m : p.y).toLocaleString('en-IN')
                    )}
                  </span>
                  <span className={`text-[12px] font-bold pb-1.5 ${t.muted}`}>/{billing === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <ul className={`space-y-2.5 pt-2 border-t ${t.border}`}>
                  {p.feats.map((f, fi) => (
                    <li key={fi} className={`flex items-center gap-2.5 text-[12.5px] font-semibold ${t.soft}`}>
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] text-white shrink-0" style={{ backgroundColor: accent }}>✓</span>
                      {E(`plans.${i}.feats.${fi}`, f)}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/preview/${projectId}/login`}
                  className={`block text-center w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition border ${
                    p.pop ? 'text-white border-transparent' : `bg-transparent ${t.text} ${t.border} hover:opacity-80`
                  }`}
                  style={p.pop ? { backgroundColor: accent } : undefined}
                >
                  Choose {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* REVIEWS */}
      {show('reviews') && (
      <section data-section="reviews" className="max-w-7xl mx-auto px-6 py-20">
        <div data-reveal className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>Results</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Member stories</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {c.reviews.map((r, i) => (
            <div key={i} data-reveal data-delay={i % 3} className={`${t.card} border ${t.border} rounded-3xl p-7 space-y-4`}>
              <div className="text-lg" style={{ color: accent }}>★★★★★</div>
              {E(`reviews.${i}.q`, r.q, `block text-[13px] leading-relaxed italic ${t.soft}`, 'p', undefined, true)}
              <div className={`flex items-center gap-3 pt-2 border-t ${t.border}`}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-black text-white" style={{ backgroundColor: accent }}>
                  {r.n[0]}
                </div>
                <div>
                  {E(`reviews.${i}.n`, r.n, 'block text-[12px] font-bold', 'div')}
                  {E(`reviews.${i}.r`, r.r, `block text-[10px] font-semibold uppercase tracking-wider ${t.muted}`, 'div')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* GALLERY */}
      {show('gallery') && (
      <section data-section="gallery" className="max-w-7xl mx-auto px-6 pb-20">
        <div data-reveal className="text-center space-y-3 mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accent }}>Gallery</span>
          {E('galleryTitle', c.galleryTitle, 'block text-3xl sm:text-4xl font-black uppercase tracking-tight', 'h2')}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {c.gallery.map((g, i) => (
            <div key={i} data-reveal data-delay={i % 3} className={`overflow-hidden rounded-2xl ${imgWrap} ${i === 0 ? 'md:row-span-2 md:h-[420px]' : 'h-52'}`}>
              {I(`gallery.${i}`, g, 'w-full h-full object-cover hover:scale-110 transition duration-700', 'gallery')}
            </div>
          ))}
        </div>
      </section>
      )}

      {/* CTA */}
      {show('cta') && (
      <section data-section="cta" className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${accent}, ${accent}22)` }} />
        <div data-reveal className="relative max-w-4xl mx-auto px-6 py-20 text-center text-white space-y-5">
          {E('ctaHeadline', c.ctaHeadline, 'block text-3xl sm:text-4xl font-black uppercase tracking-tight', 'h2')}
          {E('ctaSub', c.ctaSub, 'block text-white/85 text-[14px] font-semibold max-w-lg mx-auto', 'p', undefined, true)}
          <Link
            href={`/preview/${projectId}/login`}
            className="inline-block px-8 py-4 bg-black hover:bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-xl border-none shadow-2xl transition"
          >
            {E('primaryCta', c.primaryCta)}
          </Link>
        </div>
      </section>
      )}

      {/* FOOTER */}
      {show('footer') && (
      <footer data-section="footer" className={`border-t ${t.border} ${light ? 'bg-slate-50' : 'bg-black/40'}`}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: accent }}>{brandIcon}</div>
              <span className="font-black text-[15px] uppercase">{brand}</span>
            </div>
            <p className={`text-[12px] leading-relaxed max-w-sm ${t.muted}`}>{gymInfo?.description || c.sub}</p>
          </div>
          {[
            {
              h: 'Visit',
              items: [
                gymInfo?.address || '22 Fitness Park, Sector 62',
                `${gymInfo?.city || 'Noida'}, ${gymInfo?.state || 'Uttar Pradesh'}`,
                gymInfo?.pincode || '201301',
              ],
            },
            {
              h: 'Contact',
              items: [
                gymInfo?.mobileNo || '+91 98765 43210',
                gymInfo?.email || `hello@${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
                'Corporate memberships',
              ],
            },
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
      )}
    </div>
  );
}
