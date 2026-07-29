'use client';

/**
 * HotelExperience
 * ----------------
 * Orchestrates the whole Hotel & Resort template:
 *   Gallery (4 distinct themes)  ->  Landing  ->  Login  ->  Dashboard
 * with a "Go live" publish action per theme.
 * Fully self-contained — no other niche template is touched.
 */

import { useState } from 'react';
import { api } from '@/services/api';
import { HOTEL_THEMES, getHotelTheme, type HotelThemeId } from './hotelThemes';
import AzureLanding from './landings/AzureLanding';
import NoirLanding from './landings/NoirLanding';
import TerraLanding from './landings/TerraLanding';
import MetroLanding from './landings/MetroLanding';
import HotelLogin from './HotelLogin';
import HotelDashboard from './HotelDashboard';
import HotelPublishForm, { type HotelPublishData } from './HotelPublishForm';

type Flow = 'landing' | 'login' | 'dashboard';

interface HotelExperienceProps {
  projectId?: number;
  initialThemeId?: HotelThemeId | null; // when set, skip the gallery and open this theme
  liveMode?: boolean;                   // render as a published live site
}

export default function HotelExperience({ projectId = 1, initialThemeId = null, liveMode = false }: HotelExperienceProps = {}) {
  const [activeId, setActiveId] = useState<HotelThemeId | null>(initialThemeId);
  const [flow, setFlow] = useState<Flow>('landing');
  const [userName, setUserName] = useState('');
  const [live, setLive] = useState(liveMode);
  const [publishedId, setPublishedId] = useState<HotelThemeId | null>(liveMode ? initialThemeId : null);
  const [publishTarget, setPublishTarget] = useState<HotelThemeId | null>(null); // theme whose form is open

  // Open a theme's landing (preview only — no publishing).
  const openTheme = (id: HotelThemeId, asLive: boolean) => {
    setActiveId(id);
    setFlow('landing');
    setLive(asLive);
    if (asLive) setPublishedId(id);
  };

  // Step 1: user clicks "Go live"/"Publish" -> open the details form.
  const requestPublish = (id: HotelThemeId) => setPublishTarget(id);

  // Step 2: form submitted -> create a published Project (shows in "My Websites"),
  // save hotel details, then go live.
  const doPublish = async (form: HotelPublishData) => {
    const id = publishTarget;
    if (!id) return;
    const t = getHotelTheme(id);
    const slug = (form.hotelName || t.hotelName).toLowerCase().replace(/[^a-z0-9]+/g, '');
    let savedProjectId = projectId;

    // 1) Create a real project so it appears in the dashboard grid like other templates.
    try {
      const blocks = [{
        id: 'business-config-block',
        type: 'business_config',
        theme: id,
        content: {
          businessType: 'hotel',
          shopNiche: 'hotel',
          selectedTheme: id,
          hotelName: form.hotelName || t.hotelName,
          domainName: `${slug || 'hotel'}.zatbiz.site`,
          seoTitle: `${form.hotelName || t.hotelName} | Hotel & Resort`,
          seoDescription: `${t.propertyType} — book rooms online`,
        },
      }];
      const proj = await api.projects.create({
        name: form.hotelName || t.hotelName,
        description: `${t.propertyType} • ${t.name} theme`,
        blocksJson: JSON.stringify(blocks),
        status: 'Published',
      } as any);
      if (proj?.id) savedProjectId = proj.id;
    } catch {
      // Not logged in / offline — continue with the default projectId.
    }

    // 2) Save the hotel profile against that project.
    try {
      await api.hotel.info.save(savedProjectId, {
        subcategory: t.propertyType,
        hotelName: form.hotelName || t.hotelName,
        businessName: form.hotelName || t.hotelName,
        ownerName: form.ownerName,
        mobileNo: form.mobileNo,
        email: form.email,
        city: form.city,
        propertyType: t.propertyType,
        currency: 'INR',
        themeColor: id,
        selectedTheme: id,
        selectedHomepageLayout: id,
        selectedLoginLayout: id,
        selectedDashboardLayout: id,
      });
    } catch {
      // Backend offline in preview — keep the published state locally.
    }

    setPublishedId(id);
    setActiveId(id);
    setFlow('landing');
    setLive(true);
    setPublishTarget(null);
  };

  const backToGallery = () => { setActiveId(null); setFlow('landing'); setUserName(''); };

  const publishModal = publishTarget ? (
    <HotelPublishForm theme={getHotelTheme(publishTarget)} onClose={() => setPublishTarget(null)} onPublish={doPublish} />
  ) : null;

  // ---- Gallery ----
  if (!activeId) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <header className="border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">ZATBIZ · Hotel &amp; Resort</p>
            <h1 className="text-2xl font-bold tracking-tight mt-1">Choose a theme for your hotel site</h1>
            <p className="text-sm text-slate-500 mt-1">Four distinct modern designs. Preview any of them, then publish the one you like to go live.</p>
          </div>
        </header>

        {publishedId && (
          <div className="max-w-6xl mx-auto px-6 pt-5">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-sm text-emerald-800">
                <span className="inline-flex items-center gap-1.5 font-semibold"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> LIVE</span>
                {'  '}“{getHotelTheme(publishedId).name}” is published at <span className="font-mono">yourhotel.zatbiz.site</span>
              </p>
              <button onClick={() => openTheme(publishedId, true)} className="text-sm font-medium text-emerald-700 hover:underline">Open live site →</button>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOTEL_THEMES.map((t) => (
            <div key={t.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col hover:shadow-lg transition">
              <div className="relative h-44">
                <img src={t.heroImage} alt={t.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }} />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest opacity-80">{t.propertyType}</span>
                  <p className="text-lg font-bold leading-tight">{t.name}</p>
                </div>
                <span className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ background: t.accent }}>{t.emoji}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-sm text-slate-600 flex-1">{t.vibe}</p>
                <div className="flex items-center gap-2 mt-3">
                  {[t.accent, t.accent2, t.bg, t.text].map((c, i) => (
                    <span key={i} className="w-5 h-5 rounded-full border border-slate-200" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openTheme(t.id, false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 transition">👁 Preview</button>
                  <button onClick={() => requestPublish(t.id)} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition hover:opacity-90" style={{ background: t.accent }}>⚡ Go live</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {publishModal}
      </div>
    );
  }

  // ---- Selected theme flow ----
  const theme = getHotelTheme(activeId);

  const renderLanding = () => {
    const props = { theme, onSignIn: () => setFlow('login'), onBack: backToGallery };
    switch (theme.id) {
      case 'noir': return <NoirLanding {...props} />;
      case 'terra': return <TerraLanding {...props} />;
      case 'metro': return <MetroLanding {...props} />;
      default: return <AzureLanding {...props} />;
    }
  };

  return (
    <div className="relative">
      {/* Preview / Live control bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 text-xs text-white" style={{ background: live ? '#059669' : '#0f172a' }}>
        <div className="flex items-center gap-2">
          {live
            ? <span className="inline-flex items-center gap-1.5 font-semibold"><span className="w-2 h-2 rounded-full bg-white animate-pulse" /> LIVE · {theme.name}</span>
            : <span className="font-medium">Preview · {theme.name}</span>}
        </div>
        <div className="flex items-center gap-3">
          {['landing', 'login', 'dashboard'].map((f) => (
            <button key={f} onClick={() => setFlow(f as Flow)} className="capitalize hover:underline" style={{ opacity: flow === f ? 1 : 0.6 }}>{f}</button>
          ))}
          {!live && <button onClick={() => requestPublish(theme.id)} className="px-3 py-1 rounded-md bg-emerald-500 font-medium">⚡ Publish live</button>}
          <button onClick={backToGallery} className="px-3 py-1 rounded-md bg-white/15 font-medium">← Themes</button>
        </div>
      </div>

      {flow === 'landing' && renderLanding()}
      {flow === 'login' && (
        <HotelLogin theme={theme} projectId={projectId} onBack={() => setFlow('landing')} onSuccess={(name) => { setUserName(name); setFlow('dashboard'); }} />
      )}
      {flow === 'dashboard' && (
        <HotelDashboard theme={theme} projectId={projectId} userName={userName || 'Guest'} onLogout={() => setFlow('login')} onBackToSite={() => setFlow('landing')} />
      )}

      {publishModal}
    </div>
  );
}
