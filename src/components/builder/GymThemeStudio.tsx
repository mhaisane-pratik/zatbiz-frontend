'use client';

import React, { useMemo, useState } from 'react';
import { api } from '@/services/api';
import { Project } from '@/types';
import { THEMES_30 } from '@/app/dashboard/themesData';
import {
  getGymThemeContent,
  readGymLayout,
  GYM_LANDING_SECTIONS,
} from '@/components/preview/gym/gymThemeContent';
import ModernGymStorefront from '@/components/preview/gym/ModernGymStorefront';
import ModernGymLogin from '@/components/preview/gym/ModernGymLogin';
import ModernGymDashboard from '@/components/preview/gym/ModernGymDashboard';

interface Props {
  projectId: number;
  project: Project;
  gymInfo: any;
  setGymInfo: (g: any) => void;
  showToast: (msg: string, isError?: boolean) => void;
}

const LOGIN_LAYOUTS = [
  'split-left-image',
  'split-right-image',
  'centered-card',
  'dark-mode-minimal',
  'minimal-logo-focus',
  'gradient-mesh-bg',
  'clean-side-panel',
  'geometric-patterns',
];

type PageTab = 'landing' | 'login' | 'dashboard';

export default function GymThemeStudio({ projectId, project, gymInfo, setGymInfo, showToast }: Props) {
  const [page, setPage] = useState<PageTab>('landing');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [openSection, setOpenSection] = useState<string | null>('hero');
  const [saving, setSaving] = useState(false);

  const themeId = gymInfo?.selectedTheme || 'gym-volt-apex';
  const theme = useMemo(() => THEMES_30.find((t) => t.id === themeId), [themeId]);
  const accent = gymInfo?.themeColor || theme?.primaryColor || '#ea580c';

  // Persisted layout edits, split per page
  const [layout, setLayout] = useState<any>(() => {
    const saved = readGymLayout(gymInfo, project);
    return {
      landing: saved.landing || {},
      login: saved.login || {},
      dashboard: saved.dashboard || {},
      sectionVisibility: saved.sectionVisibility || {},
    };
  });

  const landingOv = layout.landing || {};
  const loginOv = layout.login || {};
  const dashOv = layout.dashboard || {};
  const visibility: Record<string, boolean> = layout.sectionVisibility || {};

  // Base content merged with edits — what the preview and live site both show
  const merged = useMemo(() => getGymThemeContent(themeId, landingOv), [themeId, landingOv]);

  /* ---------------- mutations ---------------- */

  const setField = (pageKey: PageTab, field: string, value: any) => {
    setLayout((prev: any) => ({
      ...prev,
      [pageKey]: { ...(prev[pageKey] || {}), [field]: value },
    }));
  };

  const setListField = (pageKey: PageTab, listKey: string, index: number, field: string, value: any) => {
    setLayout((prev: any) => {
      const base = (getGymThemeContent(themeId) as any)[listKey] || [];
      const current = (prev[pageKey]?.[listKey] as any[]) || [];
      const next = base.map((_: any, i: number) => current[i] || {});
      next[index] = { ...(next[index] || {}), [field]: value };
      return { ...prev, [pageKey]: { ...(prev[pageKey] || {}), [listKey]: next } };
    });
  };

  const setGalleryImage = (index: number, value: string) => {
    setLayout((prev: any) => {
      const base = (getGymThemeContent(themeId) as any).gallery || [];
      const current = (prev.landing?.gallery as any[]) || [];
      const next = base.map((g: string, i: number) => current[i] ?? g);
      next[index] = value;
      return { ...prev, landing: { ...(prev.landing || {}), gallery: next } };
    });
  };

  /**
   * Applies an inline edit from the canvas. Paths look like:
   *   "headline"            → scalar
   *   "stats.2.v"           → object inside a list
   *   "gallery.3"           → string inside a list
   *   "plans.1.feats.0"     → string inside a nested list
   */
  const applyEdit = (pageKey: PageTab, path: string, value: any) => {
    const parts = path.split('.');
    const base: any = getGymThemeContent(themeId);

    setLayout((prev: any) => {
      const pageOv = { ...(prev[pageKey] || {}) };
      const rootKey = parts[0];

      if (parts.length === 1) {
        pageOv[rootKey] = value;
        return { ...prev, [pageKey]: pageOv };
      }

      const baseList: any[] = base[rootKey] || [];
      const idx = Number(parts[1]);
      // Seed the override array so untouched entries keep their defaults
      const list = baseList.map((item, i) => {
        const existing = pageOv[rootKey]?.[i];
        if (existing !== undefined) return existing;
        return typeof item === 'object' ? {} : item;
      });

      if (parts.length === 2) {
        // gallery.3 — plain string list
        list[idx] = value;
      } else if (parts.length === 3) {
        // stats.2.v — object field
        const field = parts[2];
        let v = value;
        if (field === 'm' || field === 'y') v = Number(String(value).replace(/[^0-9]/g, '')) || 0;
        list[idx] = { ...(list[idx] || {}), [field]: v };
      } else {
        // plans.1.feats.0 — nested string list
        const field = parts[2];
        const subIdx = Number(parts[3]);
        const baseSub: any[] = baseList[idx]?.[field] || [];
        const currentSub: any[] = list[idx]?.[field] || baseSub;
        const nextSub = baseSub.map((s, i) => currentSub[i] ?? s);
        nextSub[subIdx] = value;
        list[idx] = { ...(list[idx] || {}), [field]: nextSub };
      }

      pageOv[rootKey] = list;
      return { ...prev, [pageKey]: pageOv };
    });
  };

  const handleCanvasFile = async (pageKey: PageTab, path: string, file: File) => {
    try {
      showToast('Uploading image…');
      const url = await api.media.uploadImage(file);
      applyEdit(pageKey, path, url);
      showToast('Image updated!');
    } catch {
      showToast('Image upload failed.', true);
    }
  };

  const toggleSection = (key: string) => {
    setLayout((prev: any) => ({
      ...prev,
      sectionVisibility: { ...(prev.sectionVisibility || {}), [key]: visibility[key] === false },
    }));
  };

  const uploadImage = async (onDone: (url: string) => void, file: File) => {
    try {
      showToast('Uploading image…');
      const url = await api.media.uploadImage(file);
      onDone(url);
      showToast('Image updated!');
    } catch {
      showToast('Image upload failed.', true);
    }
  };

  const resetAll = () => {
    if (!confirm('Reset every edit back to the theme defaults?')) return;
    setLayout({ landing: {}, login: {}, dashboard: {}, sectionVisibility: {} });
    showToast('Layout reset to theme defaults.');
  };

  const handleSave = async () => {
    setSaving(true);
    const serialized = JSON.stringify(layout);
    let ok = false;

    // 1. Primary store: the gym profile row (layoutContent is a TEXT column)
    try {
      const nextGym = { ...(gymInfo || {}), layoutContent: serialized };
      await api.gym.update(projectId, nextGym);
      setGymInfo({ ...nextGym, layoutContent: layout });
      ok = true;
    } catch (err) {
      console.error('Failed to save gym layout to profile:', err);
    }

    // 2. Mirror into blocksJson so edits survive even if the gym column is
    //    missing on an older backend build.
    try {
      const parsed = project.blocksJson ? JSON.parse(project.blocksJson) : [];
      let nextBlocks = parsed;

      if (Array.isArray(parsed)) {
        const idx = parsed.findIndex((b: any) => b?.type === 'business_config');
        if (idx >= 0) {
          nextBlocks = parsed.map((b: any, i: number) =>
            i === idx ? { ...b, content: { ...(b.content || {}), gymLayoutContent: serialized } } : b
          );
        } else {
          nextBlocks = [
            ...parsed,
            { id: 'business-config-block', type: 'business_config', content: { gymLayoutContent: serialized } },
          ];
        }
      } else if (parsed && typeof parsed === 'object') {
        nextBlocks = {
          ...parsed,
          businessConfig: { ...(parsed.businessConfig || {}), gymLayoutContent: serialized },
        };
      }

      const updated = { ...project, blocksJson: JSON.stringify(nextBlocks) };
      await api.projects.update(projectId, updated as any);
      project.blocksJson = updated.blocksJson;
      ok = true;
    } catch (err) {
      console.error('Failed to mirror gym layout into project blocks:', err);
    }

    setSaving(false);
    if (ok) showToast('Layout saved. Reload the live site to see it.');
    else showToast('Could not save layout — is the backend running?', true);
  };

  /* ---------------- small editor primitives ---------------- */

  const Text = ({
    label,
    value,
    onChange,
    area,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    area?: boolean;
  }) => (
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</label>
      {area ? (
        <textarea
          value={value}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 focus:border-slate-500 rounded-lg px-3 py-2 text-[11px] text-white outline-none resize-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 focus:border-slate-500 rounded-lg px-3 py-2 text-[11px] text-white outline-none"
        />
      )}
    </div>
  );

  const ImageField = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</label>
      <div className="flex gap-2 items-center">
        {value && <img src={value} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0" />}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL"
          className="flex-grow min-w-0 bg-slate-800 border border-slate-700 focus:border-slate-500 rounded-lg px-3 py-2 text-[11px] text-white outline-none"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadImage(onChange, f);
        }}
        className="w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-slate-700 file:text-white cursor-pointer"
      />
    </div>
  );

  const Accordion = ({ id, title, count, children }: { id: string; title: string; count?: number; children: React.ReactNode }) => {
    const open = openSection === id;
    const hidden = visibility[id] === false;
    return (
      <div
        id={`zb-acc-${id}`}
        className={`border rounded-xl overflow-hidden bg-slate-900 transition ${open ? '' : 'border-slate-800'}`}
        style={open ? { borderColor: accent } : undefined}
      >
        <div className="flex items-center">
          <button
            onClick={() => setOpenSection(open ? null : id)}
            className="flex-grow text-left px-3.5 py-3 bg-transparent border-none cursor-pointer flex items-center gap-2"
          >
            <span className="text-slate-500 text-[10px]">{open ? '▾' : '▸'}</span>
            <span className={`text-[11px] font-black uppercase tracking-wider ${hidden ? 'text-slate-600 line-through' : 'text-white'}`}>
              {title}
            </span>
            {typeof count === 'number' && (
              <span className="text-[9px] font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">{count}</span>
            )}
          </button>
          {GYM_LANDING_SECTIONS.some((s) => s.key === id) && (
            <button
              onClick={() => toggleSection(id)}
              title={hidden ? 'Show section' : 'Hide section'}
              className="px-3 py-3 bg-transparent border-none cursor-pointer text-[12px]"
            >
              {hidden ? '🚫' : '👁'}
            </button>
          )}
        </div>
        {open && <div className="px-3.5 pb-4 space-y-3 border-t border-slate-800 pt-3">{children}</div>}
      </div>
    );
  };

  /* ---------------- editor panels ---------------- */

  const landingEditor = (
    <div className="space-y-2.5">
      <Accordion id="hero" title="Hero Banner">
        <Text label="Eyebrow" value={merged.eyebrow} onChange={(v) => setField('landing', 'eyebrow', v)} />
        <Text label="Headline" value={merged.headline} onChange={(v) => setField('landing', 'headline', v)} area />
        <Text label="Subtext" value={merged.sub} onChange={(v) => setField('landing', 'sub', v)} area />
        <Text label="Primary Button" value={merged.primaryCta} onChange={(v) => setField('landing', 'primaryCta', v)} />
        <Text label="Secondary Button" value={merged.secondaryCta} onChange={(v) => setField('landing', 'secondaryCta', v)} />
        <Text label="Portal Button" value={merged.portalLabel} onChange={(v) => setField('landing', 'portalLabel', v)} />
        <Text label="Join Button" value={merged.joinLabel} onChange={(v) => setField('landing', 'joinLabel', v)} />
        <ImageField label="Hero Image" value={merged.heroImage} onChange={(v) => setField('landing', 'heroImage', v)} />
      </Accordion>

      <Accordion id="stats" title="Stats Strip" count={merged.stats.length}>
        {merged.stats.map((s, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800 last:border-0">
            <Text label={`Value ${i + 1}`} value={s.v} onChange={(v) => setListField('landing', 'stats', i, 'v', v)} />
            <Text label={`Label ${i + 1}`} value={s.l} onChange={(v) => setListField('landing', 'stats', i, 'l', v)} />
          </div>
        ))}
      </Accordion>

      <Accordion id="classes" title="Classes / Programmes" count={merged.classes.length}>
        <Text label="Section Title" value={merged.classesTitle} onChange={(v) => setField('landing', 'classesTitle', v)} />
        <Text label="Section Subtitle" value={merged.classesSub} onChange={(v) => setField('landing', 'classesSub', v)} area />
        {merged.classes.map((cl, i) => (
          <div key={i} className="space-y-2 pt-2 pb-3 border-b border-slate-800 last:border-0">
            <Text label={`Class ${i + 1} Name`} value={cl.name} onChange={(v) => setListField('landing', 'classes', i, 'name', v)} />
            <Text label="Meta" value={cl.meta} onChange={(v) => setListField('landing', 'classes', i, 'meta', v)} />
            <ImageField label="Image" value={cl.img} onChange={(v) => setListField('landing', 'classes', i, 'img', v)} />
          </div>
        ))}
      </Accordion>

      <Accordion id="video" title="Video Walkthrough">
        <Text label="Title" value={merged.videoTitle} onChange={(v) => setField('landing', 'videoTitle', v)} />
        <Text label="Subtitle" value={merged.videoSub} onChange={(v) => setField('landing', 'videoSub', v)} area />
        <Text label="Video URL (mp4)" value={merged.videoUrl} onChange={(v) => setField('landing', 'videoUrl', v)} />
      </Accordion>

      <Accordion id="features" title="Facility Features" count={merged.features.length}>
        {merged.features.map((f, i) => (
          <div key={i} className="space-y-2 pb-3 border-b border-slate-800 last:border-0">
            <Text label={`Icon ${i + 1}`} value={f.i} onChange={(v) => setListField('landing', 'features', i, 'i', v)} />
            <Text label="Title" value={f.t} onChange={(v) => setListField('landing', 'features', i, 't', v)} />
            <Text label="Description" value={f.d} onChange={(v) => setListField('landing', 'features', i, 'd', v)} area />
          </div>
        ))}
      </Accordion>

      <Accordion id="coaches" title="Coaches" count={merged.coaches.length}>
        <Text label="Section Title" value={merged.coachesTitle} onChange={(v) => setField('landing', 'coachesTitle', v)} />
        <Text label="Eyebrow" value={merged.coachRole} onChange={(v) => setField('landing', 'coachRole', v)} />
        {merged.coaches.map((co, i) => (
          <div key={i} className="space-y-2 pt-2 pb-3 border-b border-slate-800 last:border-0">
            <Text label={`Coach ${i + 1} Name`} value={co.n} onChange={(v) => setListField('landing', 'coaches', i, 'n', v)} />
            <Text label="Role" value={co.r} onChange={(v) => setListField('landing', 'coaches', i, 'r', v)} />
            <ImageField label="Photo" value={co.img} onChange={(v) => setListField('landing', 'coaches', i, 'img', v)} />
          </div>
        ))}
      </Accordion>

      <Accordion id="membership" title="Membership Plans" count={merged.plans.length}>
        {merged.plans.map((p, i) => (
          <div key={i} className="space-y-2 pb-3 border-b border-slate-800 last:border-0">
            <Text label={`Plan ${i + 1} Name`} value={p.name} onChange={(v) => setListField('landing', 'plans', i, 'name', v)} />
            <div className="grid grid-cols-2 gap-2">
              <Text label="Monthly ₹" value={String(p.m)} onChange={(v) => setListField('landing', 'plans', i, 'm', Number(v) || 0)} />
              <Text label="Yearly ₹" value={String(p.y)} onChange={(v) => setListField('landing', 'plans', i, 'y', Number(v) || 0)} />
            </div>
            <Text
              label="Features (one per line)"
              value={p.feats.join('\n')}
              onChange={(v) => setListField('landing', 'plans', i, 'feats', v.split('\n').filter(Boolean))}
              area
            />
          </div>
        ))}
      </Accordion>

      <Accordion id="reviews" title="Member Reviews" count={merged.reviews.length}>
        {merged.reviews.map((r, i) => (
          <div key={i} className="space-y-2 pb-3 border-b border-slate-800 last:border-0">
            <Text label={`Name ${i + 1}`} value={r.n} onChange={(v) => setListField('landing', 'reviews', i, 'n', v)} />
            <Text label="Role" value={r.r} onChange={(v) => setListField('landing', 'reviews', i, 'r', v)} />
            <Text label="Quote" value={r.q} onChange={(v) => setListField('landing', 'reviews', i, 'q', v)} area />
          </div>
        ))}
      </Accordion>

      <Accordion id="gallery" title="Gallery" count={merged.gallery.length}>
        <Text label="Section Title" value={merged.galleryTitle} onChange={(v) => setField('landing', 'galleryTitle', v)} />
        {merged.gallery.map((g, i) => (
          <ImageField key={i} label={`Image ${i + 1}`} value={g} onChange={(v) => setGalleryImage(i, v)} />
        ))}
      </Accordion>

      <Accordion id="cta" title="Closing CTA">
        <Text label="Headline" value={merged.ctaHeadline} onChange={(v) => setField('landing', 'ctaHeadline', v)} />
        <Text label="Subtext" value={merged.ctaSub} onChange={(v) => setField('landing', 'ctaSub', v)} area />
      </Accordion>

      <Accordion id="footer" title="Footer & Navigation">
        <Text
          label="Nav Links (one per line)"
          value={merged.navLinks.join('\n')}
          onChange={(v) => setField('landing', 'navLinks', v.split('\n').filter(Boolean))}
          area
        />
      </Accordion>
    </div>
  );

  const loginEditor = (
    <div className="space-y-2.5">
      <Accordion id="login-layout" title="Login Layout">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Layout Style</label>
          <select
            value={loginOv.layout || gymInfo?.selectedLoginLayout || 'split-left-image'}
            onChange={(e) => setField('login', 'layout', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-[11px] text-white outline-none"
          >
            {LOGIN_LAYOUTS.map((l) => (
              <option key={l} value={l}>
                {l.replace(/-/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </Accordion>

      <Accordion id="login-content" title="Login Content">
        <Text
          label="Portal Title"
          value={getGymThemeContent(themeId, loginOv).portalLabel}
          onChange={(v) => setField('login', 'portalLabel', v)}
        />
        <Text label="Brand Name Override" value={loginOv.brandName || ''} onChange={(v) => setField('login', 'brandName', v)} />
        <Text
          label="Panel Headline"
          value={getGymThemeContent(themeId, loginOv).headline}
          onChange={(v) => setField('login', 'headline', v)}
          area
        />
        <Text
          label="Panel Subtext"
          value={getGymThemeContent(themeId, loginOv).sub}
          onChange={(v) => setField('login', 'sub', v)}
          area
        />
        <ImageField
          label="Side Panel Image"
          value={loginOv.heroImage || gymInfo?.headerBgImage || getGymThemeContent(themeId).heroImage}
          onChange={(v) => setField('login', 'heroImage', v)}
        />
      </Accordion>
    </div>
  );

  const dashboardEditor = (
    <div className="space-y-2.5">
      <Accordion id="dash-brand" title="Portal Branding">
        <Text label="Portal Label" value={getGymThemeContent(themeId, dashOv).portalLabel} onChange={(v) => setField('dashboard', 'portalLabel', v)} />
        <Text label="Brand Name Override" value={dashOv.brandName || ''} onChange={(v) => setField('dashboard', 'brandName', v)} />
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Sidebar Colour</label>
          <input
            type="color"
            value={dashOv.sidebarColor || '#0f172a'}
            onChange={(e) => setField('dashboard', 'sidebarColor', e.target.value)}
            className="w-full h-9 bg-transparent border-0 cursor-pointer p-0"
          />
        </div>
      </Accordion>

      <Accordion id="dash-nav" title="Sidebar Menu">
        <Text
          label="Menu Items (one per line)"
          value={getGymThemeContent(themeId, dashOv).portalNav.join('\n')}
          onChange={(v) => setField('dashboard', 'portalNav', v.split('\n').filter(Boolean))}
          area
        />
      </Accordion>

      <Accordion id="dash-cards" title="Stat Cards & Goal">
        <Text label="Sessions This Month" value={dashOv.stat1 || '18'} onChange={(v) => setField('dashboard', 'stat1', v)} />
        <Text label="Current Streak" value={dashOv.stat2 || '12 days'} onChange={(v) => setField('dashboard', 'stat2', v)} />
        <Text label="Next Session Time" value={dashOv.stat4 || '06:30'} onChange={(v) => setField('dashboard', 'stat4', v)} />
        <Text label="Schedule Panel Title" value={dashOv.scheduleTitle || 'Upcoming Sessions'} onChange={(v) => setField('dashboard', 'scheduleTitle', v)} />
        <div className="grid grid-cols-2 gap-2">
          <Text label="Goal Done" value={String(dashOv.goalDone ?? 4)} onChange={(v) => setField('dashboard', 'goalDone', Number(v) || 0)} />
          <Text label="Goal Target" value={String(dashOv.goalTarget ?? 5)} onChange={(v) => setField('dashboard', 'goalTarget', Number(v) || 0)} />
        </div>
        <Text label="Goal Note" value={dashOv.goalNote || "One more session to hit this week's target."} onChange={(v) => setField('dashboard', 'goalNote', v)} area />
      </Accordion>

      <Accordion id="dash-prs" title="Member Numbers" count={getGymThemeContent(themeId, dashOv).prs.length}>
        {getGymThemeContent(themeId, dashOv).prs.map((r, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800 last:border-0">
            <Text label={`Metric ${i + 1}`} value={r.n} onChange={(v) => setListField('dashboard', 'prs', i, 'n', v)} />
            <Text label="Value" value={r.v} onChange={(v) => setListField('dashboard', 'prs', i, 'v', v)} />
          </div>
        ))}
      </Accordion>
    </div>
  );

  const viewportWidth =
    viewport === 'mobile' ? 'w-[420px]' : viewport === 'tablet' ? 'w-[820px]' : 'w-full';

  /* ---------------- shell ---------------- */

  return (
    <div className="h-screen bg-slate-950 flex flex-col text-white overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 h-14 border-b border-slate-800 bg-slate-900 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <a href="/dashboard" className="text-slate-400 hover:text-white text-[11px] font-bold transition">
            ← Dashboard
          </a>
          <span className="w-px h-5 bg-slate-700" />
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md text-white shrink-0" style={{ backgroundColor: accent }}>
            {theme?.name || 'Gym'}
          </span>
          <span className="text-[13px] font-black truncate">{project.name}</span>
        </div>

        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['landing', 'login', 'dashboard'] as PageTab[]).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer transition ${
                page === p ? 'text-white' : 'bg-transparent text-slate-400 hover:text-white'
              }`}
              style={page === p ? { backgroundColor: accent } : undefined}
            >
              {p === 'dashboard' ? 'Member Portal' : p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['desktop', 'tablet', 'mobile'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewport(v)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md border-none cursor-pointer transition ${
                  viewport === v ? 'bg-slate-800 text-white' : 'bg-transparent text-slate-500 hover:text-white'
                }`}
              >
                {v === 'desktop' ? '🖥' : v === 'tablet' ? '⬜' : '📱'}
              </button>
            ))}
          </div>
          <button
            onClick={resetAll}
            className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border-none cursor-pointer transition"
          >
            Reset
          </button>
          <a
            href={`/preview/${projectId}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            View Live ↗
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg text-white border-none cursor-pointer shadow-lg hover:brightness-110 transition disabled:opacity-60"
            style={{ backgroundColor: accent }}
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="flex-grow min-h-0 flex">
        {/* Editor sidebar */}
        <aside className="w-80 shrink-0 border-r border-slate-800 bg-slate-950 overflow-y-auto p-4 space-y-4">
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-white">
              {page === 'landing' ? 'Landing Page' : page === 'login' ? 'Login Page' : 'Member Portal'}
            </h2>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
              {page === 'landing'
                ? 'Click any text on the page to type over it. Hover an image to replace it.'
                : 'Edits apply live to the preview on the right.'}
            </p>
          </div>

          {page === 'landing' && landingEditor}
          {page === 'login' && loginEditor}
          {page === 'dashboard' && dashboardEditor}
        </aside>

        {/* Live preview — click any section to jump straight to its editor */}
        <main className="flex-grow min-w-0 bg-slate-800 overflow-y-auto flex justify-center">
          <style>{`
            .zb-edit [data-section]{position:relative;cursor:pointer;transition:outline-color .15s}
            .zb-edit [data-section]{outline:2px solid transparent;outline-offset:-2px}
            .zb-edit [data-section]:hover{outline-color:${accent}}
            .zb-edit [data-section][data-active="true"]{outline-color:${accent};outline-style:dashed}
            .zb-edit [data-section]:hover::after{
              content:attr(data-label);
              position:absolute;top:8px;left:8px;z-index:60;
              background:${accent};color:#fff;font-size:9px;font-weight:900;
              letter-spacing:.08em;text-transform:uppercase;
              padding:3px 8px;border-radius:6px;pointer-events:none;
              font-family:ui-sans-serif,system-ui,sans-serif;
            }
          `}</style>
          <div
            className={`zb-edit ${viewportWidth} max-w-full bg-white min-h-full transition-all duration-300`}
            onClickCapture={(e) => {
              const target = e.target as HTMLElement;

              // Open the matching editor panel for whatever was clicked
              const sec = target.closest('[data-section]');
              const key = sec?.getAttribute('data-section');
              if (key) {
                setOpenSection(key);
                document.getElementById(`zb-acc-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }

              // Let inline text fields and the image-replace button work normally
              if (target.closest('.zb-ed') || target.closest('.zb-img-btn')) return;

              // Otherwise suppress navigation so the canvas stays put while editing
              if (target.closest('a, button, input, select')) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            ref={(node) => {
              // Label + active-state each hotspot for the hover chip
              if (!node) return;
              node.querySelectorAll<HTMLElement>('[data-section]').forEach((el) => {
                const key = el.getAttribute('data-section') || '';
                const match = GYM_LANDING_SECTIONS.find((s) => s.key === key);
                el.setAttribute('data-label', match?.label || key);
                el.setAttribute('data-active', String(openSection === key));
              });
            }}
          >
            {page === 'landing' && (
              <ModernGymStorefront
                projectId={projectId}
                project={project}
                gymInfo={gymInfo}
                overrides={landingOv}
                sectionVisibility={visibility}
                editMode
                onEdit={(path, value) => applyEdit('landing', path, value)}
                onPickFile={(path, file) => handleCanvasFile('landing', path, file)}
              />
            )}
            {page === 'login' && (
              <ModernGymLogin
                projectId={projectId}
                isSignUp={false}
                setIsSignUp={() => {}}
                companyName={gymInfo?.clubName || project.name.replace(' Site', '')}
                logoUrl={gymInfo?.logoUrl || ''}
                logoIcon={theme?.brandIcon || '💪'}
                errorMessage=""
                successMessage=""
                handleLoginSubmit={(e) => e.preventDefault()}
                gymInfo={gymInfo}
                overrides={loginOv}
                layoutOverride={loginOv.layout}
              />
            )}
            {page === 'dashboard' && (
              <ModernGymDashboard
                brand={gymInfo?.clubName || project.name.replace(' Site', '')}
                gymInfo={gymInfo}
                overrides={dashOv}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
