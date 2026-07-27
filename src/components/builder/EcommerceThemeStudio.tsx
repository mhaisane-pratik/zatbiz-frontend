'use client';

import React, { useMemo, useState } from 'react';
import { api } from '@/services/api';
import { Project } from '@/types';
import ModernEcomStorefront, {
  buildEcomContent,
  readEcomConfig,
} from '@/components/preview/ecommerce/ModernEcomStorefront';
import { getEcomThemes } from '@/components/preview/ecommerce/ecomThemeVariants';

interface Props {
  projectId: number;
  project: Project;
  showToast: (msg: string, isError?: boolean) => void;
}

type PageTab = 'landing' | 'login';

const SECTIONS = [
  { key: 'nav', label: 'Navigation' },
  { key: 'hero', label: 'Hero Banner' },
  { key: 'marquee', label: 'Marquee Strip' },
  { key: 'shop', label: 'Product Grid' },
  { key: 'features', label: 'Feature Band' },
  { key: 'reviews', label: 'Customer Reviews' },
  { key: 'newsletter', label: 'Newsletter CTA' },
  { key: 'footer', label: 'Footer' },
];

export default function EcommerceThemeStudio({ projectId, project, showToast }: Props) {
  const initial = useMemo(() => readEcomConfig(project), [project]);

  const [page, setPage] = useState<PageTab>('landing');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [openSection, setOpenSection] = useState<string | null>('hero');
  const [saving, setSaving] = useState(false);

  // Theme can be switched among the niche's four variants right in the studio
  const category = initial.themeConfig?.category || initial.theme?.category || 'fashion';
  const variants = useMemo(() => getEcomThemes(category), [category]);
  const [themeId, setThemeId] = useState(initial.theme?.id || variants[0]?.id);
  const theme = variants.find((v) => v.id === themeId) || variants[0];

  const [overrides, setOverrides] = useState<any>(initial.overrides || {});
  const brand = initial.brand || project.name.replace(' Site', '');
  const accent = theme?.primaryColor || '#6366f1';

  const merged = useMemo(() => buildEcomContent(theme, overrides), [theme, overrides]);

  /* ---------------- edits ---------------- */

  const applyEdit = (path: string, value: any) => {
    const parts = path.split('.');
    const base: any = buildEcomContent(theme);
    setOverrides((prev: any) => {
      const next = { ...(prev || {}) };
      const rootKey = parts[0];
      if (parts.length === 1) {
        next[rootKey] = value;
        return next;
      }
      const baseList: any[] = base[rootKey] || [];
      const idx = Number(parts[1]);
      const list = baseList.map((item, i) => {
        const existing = next[rootKey]?.[i];
        if (existing !== undefined) return existing;
        return typeof item === 'object' ? {} : item;
      });
      if (parts.length === 2) {
        list[idx] = value;
      } else {
        const field = parts[2];
        let v: any = value;
        if (field === 'price') v = Number(String(value).replace(/[^0-9]/g, '')) || 0;
        list[idx] = { ...(list[idx] || {}), [field]: v };
      }
      next[rootKey] = list;
      return next;
    });
  };

  const handleCanvasFile = async (path: string, file: File) => {
    try {
      showToast('Uploading image…');
      const url = await api.media.uploadImage(file);
      applyEdit(path, url);
      showToast('Image updated!');
    } catch {
      showToast('Image upload failed.', true);
    }
  };

  const resetAll = () => {
    if (!confirm('Reset every edit back to the theme defaults?')) return;
    setOverrides({});
    showToast('Layout reset to theme defaults.');
  };

  /* ---------------- save: persists into blocksJson ---------------- */

  const handleSave = async () => {
    setSaving(true);
    try {
      const serialized = JSON.stringify(overrides);
      const parsed = project.blocksJson ? JSON.parse(project.blocksJson) : [];
      let nextBlocks = parsed;

      const patchCfg = (content: any) => ({
        ...(content || {}),
        ecomLayoutContent: serialized,
        themeConfig: { ...theme },
      });

      if (Array.isArray(parsed)) {
        const idx = parsed.findIndex((b: any) => b?.type === 'business_config');
        if (idx >= 0) {
          nextBlocks = parsed.map((b: any, i: number) => (i === idx ? { ...b, theme: theme.id, content: patchCfg(b.content) } : b));
        } else {
          nextBlocks = [...parsed, { id: 'business-config-block', type: 'business_config', theme: theme.id, content: patchCfg({ businessType: 'ecommerce' }) }];
        }
      } else if (parsed && typeof parsed === 'object') {
        nextBlocks = { ...parsed, businessConfig: patchCfg(parsed.businessConfig) };
      }

      const updated = { ...project, blocksJson: JSON.stringify(nextBlocks) };
      await api.projects.update(projectId, updated as any);
      project.blocksJson = updated.blocksJson;
      showToast('Layout saved. Reload the live site to see it.');
    } catch (err) {
      console.error('Failed to save store layout:', err);
      showToast('Could not save layout — is the backend running?', true);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- sidebar primitives ---------------- */

  const Text = ({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) => (
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</label>
      {area ? (
        <textarea value={value} rows={3} onChange={(e) => onChange(e.target.value)} className="w-full bg-slate-800 border border-slate-700 focus:border-slate-500 rounded-lg px-3 py-2 text-[11px] text-white outline-none resize-none" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-slate-800 border border-slate-700 focus:border-slate-500 rounded-lg px-3 py-2 text-[11px] text-white outline-none" />
      )}
    </div>
  );

  const Accordion = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const open = openSection === id;
    return (
      <div id={`zb-acc-${id}`} className="border rounded-xl overflow-hidden bg-slate-900 transition" style={open ? { borderColor: accent } : { borderColor: '#1e293b' }}>
        <button onClick={() => setOpenSection(open ? null : id)} className="w-full text-left px-3.5 py-3 bg-transparent border-none cursor-pointer flex items-center gap-2">
          <span className="text-slate-500 text-[10px]">{open ? '▾' : '▸'}</span>
          <span className="text-[11px] font-black uppercase tracking-wider text-white">{title}</span>
        </button>
        {open && <div className="px-3.5 pb-4 space-y-3 border-t border-slate-800 pt-3">{children}</div>}
      </div>
    );
  };

  const viewportWidth = viewport === 'mobile' ? 'w-[420px]' : viewport === 'tablet' ? 'w-[820px]' : 'w-full';

  return (
    <div className="h-screen bg-slate-950 flex flex-col text-white overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 h-14 border-b border-slate-800 bg-slate-900 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <a href="/dashboard" className="text-slate-400 hover:text-white text-[11px] font-bold transition">← Dashboard</a>
          <span className="w-px h-5 bg-slate-700" />
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md text-white shrink-0" style={{ backgroundColor: accent }}>
            {theme?.suffix || 'Store'}
          </span>
          <span className="text-[13px] font-black truncate">{project.name}</span>
        </div>

        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['landing', 'login'] as PageTab[]).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer transition ${page === p ? 'text-white' : 'bg-transparent text-slate-400 hover:text-white'}`}
              style={page === p ? { backgroundColor: accent } : undefined}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['desktop', 'tablet', 'mobile'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewport(v)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md border-none cursor-pointer transition ${viewport === v ? 'bg-slate-800 text-white' : 'bg-transparent text-slate-500 hover:text-white'}`}
              >
                {v === 'desktop' ? '🖥' : v === 'tablet' ? '⬜' : '📱'}
              </button>
            ))}
          </div>
          <button onClick={resetAll} className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border-none cursor-pointer transition">
            Reset
          </button>
          <a href={`/preview/${projectId}`} target="_blank" rel="noreferrer" className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
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
        {/* Sidebar */}
        <aside className="w-80 shrink-0 border-r border-slate-800 bg-slate-950 overflow-y-auto p-4 space-y-4">
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-white">
              {page === 'landing' ? 'Landing Page' : 'Login Page'}
            </h2>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
              {page === 'landing'
                ? 'Click any text on the page to type over it. Hover an image to replace it.'
                : 'The login style follows the selected theme variant.'}
            </p>
          </div>

          {/* Theme variant switcher */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Theme Variant</label>
            <div className="grid grid-cols-2 gap-2">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setThemeId(v.id)}
                  className={`rounded-xl overflow-hidden border cursor-pointer transition text-left ${themeId === v.id ? '' : 'border-slate-800 opacity-60 hover:opacity-100'}`}
                  style={themeId === v.id ? { borderColor: v.primaryColor } : undefined}
                >
                  <img src={v.thumbnail} alt={v.suffix} className="w-full h-14 object-cover" />
                  <div className="px-2 py-1.5 bg-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: v.primaryColor }} />
                    <span className="text-[9px] font-black uppercase tracking-wider text-white truncate">{v.suffix}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {page === 'landing' && (
            <div className="space-y-2.5">
              <Accordion id="hero" title="Hero Banner">
                <Text label="Badge" value={merged.badge} onChange={(v) => applyEdit('badge', v)} />
                <Text label="Headline" value={merged.tagline} onChange={(v) => applyEdit('tagline', v)} area />
                <Text label="Subtext" value={merged.desc} onChange={(v) => applyEdit('desc', v)} area />
              </Accordion>
              <Accordion id="marquee" title="Marquee Strip">
                <Text label="Items (one per line)" value={merged.marquee.join('\n')} onChange={(v) => applyEdit('marquee', v.split('\n').filter(Boolean))} area />
              </Accordion>
              <Accordion id="shop" title="Product Grid">
                <Text label="Eyebrow" value={merged.shopEyebrow} onChange={(v) => applyEdit('shopEyebrow', v)} />
                <Text label="Title" value={merged.shopTitle} onChange={(v) => applyEdit('shopTitle', v)} />
                <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">
                  Products come from your catalog once you add them in the dashboard; the demo cards below are placeholders and are editable inline on the canvas.
                </p>
              </Accordion>
              <Accordion id="features" title="Feature Band">
                {merged.features.map((f, i) => (
                  <div key={i} className="space-y-2 pb-3 border-b border-slate-800 last:border-0">
                    <Text label={`Icon ${i + 1}`} value={f.i} onChange={(v) => applyEdit(`features.${i}.i`, v)} />
                    <Text label="Title" value={f.h} onChange={(v) => applyEdit(`features.${i}.h`, v)} />
                    <Text label="Description" value={f.d} onChange={(v) => applyEdit(`features.${i}.d`, v)} area />
                  </div>
                ))}
              </Accordion>
              <Accordion id="reviews" title="Customer Reviews">
                {merged.reviews.map((r, i) => (
                  <div key={i} className="space-y-2 pb-3 border-b border-slate-800 last:border-0">
                    <Text label={`Name ${i + 1}`} value={r.n} onChange={(v) => applyEdit(`reviews.${i}.n`, v)} />
                    <Text label="Role" value={r.r} onChange={(v) => applyEdit(`reviews.${i}.r`, v)} />
                    <Text label="Quote" value={r.q} onChange={(v) => applyEdit(`reviews.${i}.q`, v)} area />
                  </div>
                ))}
              </Accordion>
              <Accordion id="newsletter" title="Newsletter CTA">
                <Text label="Headline" value={merged.newsTitle} onChange={(v) => applyEdit('newsTitle', v)} />
                <Text label="Subtext" value={merged.newsSub} onChange={(v) => applyEdit('newsSub', v)} area />
              </Accordion>
              <Accordion id="nav" title="Navigation Links">
                <Text label="Links (one per line)" value={merged.navLinks.join('\n')} onChange={(v) => applyEdit('navLinks', v.split('\n').filter(Boolean))} area />
              </Accordion>
            </div>
          )}

          {page === 'login' && (
            <div className="space-y-2.5">
              <Accordion id="login-info" title="Login Style">
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  This variant uses the <span className="text-white font-black">{theme?.loginLayout.replace(/-/g, ' ')}</span> layout.
                  Switch the theme variant above to change it — Noir, Ivory, Vivid and Editorial each carry a different login design.
                </p>
              </Accordion>
            </div>
          )}
        </aside>

        {/* Canvas */}
        <main className="flex-grow min-w-0 bg-slate-800 overflow-y-auto flex justify-center">
          <style>{`
            .zb-edit [data-section]{outline:2px solid transparent;outline-offset:-2px;transition:outline-color .15s}
            .zb-edit [data-section]:hover{outline-color:${accent}}
          `}</style>
          <div
            className={`zb-edit ${viewportWidth} max-w-full bg-white min-h-full transition-all duration-300`}
            onClickCapture={(e) => {
              const target = e.target as HTMLElement;
              const sec = target.closest('[data-section]');
              const key = sec?.getAttribute('data-section');
              if (key) {
                setOpenSection(key);
                document.getElementById(`zb-acc-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
              if (target.closest('.zb-ed') || target.closest('.zb-img-btn')) return;
              if (target.closest('a, button, input, select')) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {page === 'landing' ? (
              <ModernEcomStorefront
                theme={theme}
                brand={brand}
                logoIcon={initial.logoIcon}
                overrides={overrides}
                editMode
                onEdit={applyEdit}
                onPickFile={handleCanvasFile}
              />
            ) : (
              <LoginPreview theme={theme} brand={brand} logoIcon={initial.logoIcon} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/** Lightweight login preview reusing the variant's layout tokens. */
function LoginPreview({ theme, brand, logoIcon }: { theme: any; brand: string; logoIcon?: string }) {
  const accent = theme.primaryColor;
  const darkPanel = theme.loginLayout === 'dark-panel';
  const form = (
    <div className="w-full max-w-sm space-y-5">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg" style={{ backgroundColor: accent }}>
        {logoIcon || theme.icon}
      </div>
      <h1 className={`text-3xl font-black tracking-tight ${darkPanel ? 'text-white' : 'text-slate-900'}`}>Welcome back</h1>
      <p className={`text-[13px] ${darkPanel ? 'text-white/45' : 'text-slate-500'}`}>Sign in to track orders and check out faster at {brand}.</p>
      {['Email Address', 'Password'].map((l) => (
        <div key={l} className="space-y-1.5">
          <label className={`text-[10px] font-black uppercase tracking-widest ${darkPanel ? 'text-white/50' : 'text-slate-500'}`}>{l}</label>
          <input
            type={l === 'Password' ? 'password' : 'email'}
            defaultValue={l === 'Password' ? 'demo1234' : 'customer@demo.com'}
            className={`w-full rounded-xl px-4 py-3 text-[13px] outline-none border ${darkPanel ? 'bg-white/5 border-white/15 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
          />
        </div>
      ))}
      <button className="w-full py-3.5 text-[11px] font-black uppercase tracking-widest rounded-xl text-white border-none cursor-pointer shadow-xl" style={{ backgroundColor: accent }}>
        Sign In & Shop ➔
      </button>
    </div>
  );

  if (theme.loginLayout === 'centered-glass') {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-8">
        <img src={theme.heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 backdrop-blur-md" style={{ background: `linear-gradient(160deg, ${accent}99, #0f172acc)` }} />
        <div className="relative w-full max-w-md rounded-[32px] p-10 shadow-2xl bg-white/90 backdrop-blur-2xl border border-white/60">{form}</div>
      </main>
    );
  }
  if (theme.loginLayout === 'minimal-light') {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-[32px] p-10 shadow-xl">{form}</div>
      </main>
    );
  }
  if (darkPanel) {
    return (
      <main className="min-h-screen grid lg:grid-cols-2" style={{ backgroundColor: '#0b0b0f' }}>
        <div className="relative hidden lg:block overflow-hidden">
          <img src={theme.heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0b0f]" />
        </div>
        <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
      </main>
    );
  }
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="relative hidden lg:block overflow-hidden">
        <img src={theme.heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}cc, #0f172ab3)` }} />
      </div>
      <div className="flex items-center justify-center p-8 sm:p-14">{form}</div>
    </main>
  );
}
