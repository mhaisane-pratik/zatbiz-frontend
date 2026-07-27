'use client';

import React, { useMemo, useState } from 'react';
import { THEMES_30 } from '@/app/dashboard/themesData';
import { getGymThemeContent, readGymLayout } from './gymThemeContent';

interface Props {
  brand?: string;
  gymInfo?: any;
  themePreset?: string;
  overrides?: any;
  onLogout?: () => void;
  memberName?: string;
}

/**
 * Gym member portal. Shares gymThemeContent with the landing page so the
 * nav items, session names, coaches and metrics all match the live site.
 */
export default function ModernGymDashboard({
  brand,
  gymInfo,
  themePreset,
  overrides,
  onLogout,
  memberName = 'Aarav Sharma',
}: Props) {
  const themeId = gymInfo?.selectedTheme || themePreset || 'gym-volt-apex';
  const theme = useMemo(() => THEMES_30.find((t) => t.id === themeId), [themeId]);

  const ov = overrides ?? readGymLayout(gymInfo).dashboard;
  const c = useMemo(() => getGymThemeContent(themeId, ov), [themeId, ov]);

  const accent = gymInfo?.themeColor || theme?.primaryColor || '#ea580c';
  const clubName = ov?.brandName || brand || gymInfo?.clubName || 'Fitness Club';
  const sidebarBg = ov?.sidebarColor || '#0f172a';

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

  const initials = memberName
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-full bg-slate-50 text-slate-900 flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col text-white" style={{ backgroundColor: sidebarBg }}>
        <div className="p-5 flex items-center gap-2.5 border-b border-white/10">
          {gymInfo?.logoUrl ? (
            <img src={gymInfo.logoUrl} alt={clubName} className="w-9 h-9 rounded-xl object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: accent }}>
              {theme?.brandIcon || '💪'}
            </div>
          )}
          <div className="min-w-0">
            <div className="font-black text-[12px] truncate uppercase">{clubName}</div>
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
          <button
            onClick={onLogout}
            className="w-full px-4 py-2.5 rounded-xl text-[11px] font-bold bg-white/5 hover:bg-white/15 text-white/70 border-none cursor-pointer transition"
          >
            ← Sign out
          </button>
        </div>
      </aside>

      <div className="flex-grow min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-black tracking-tight">{nav}</h1>
            <p className="text-[11px] text-slate-500 font-semibold">
              Welcome back, {memberName.split(' ')[0]} · {c.plans[1]?.name} plan
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[13px]">🔔</span>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-black text-white" style={{ backgroundColor: accent }}>
              {initials}
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: 'Sessions This Month', v: ov?.stat1 || '18', d: '+4 vs last', i: '🔥' },
              { l: 'Current Streak', v: ov?.stat2 || '12 days', d: 'Personal best', i: '⚡' },
              { l: c.stats[0].l, v: c.stats[0].v, d: 'Club total', i: '🎯' },
              { l: 'Next Session', v: ov?.stat4 || '06:30', d: c.classes[0].name, i: '📅' },
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
                <h3 className="text-[13px] font-black">{ov?.scheduleTitle || 'Upcoming Sessions'}</h3>
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
                <h3 className="text-[13px] font-black">{ov?.goalTitle || 'Weekly Goal'}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black" style={{ color: accent }}>{ov?.goalDone || 4}</span>
                  <span className="text-[12px] font-bold text-slate-400 pb-1.5">/ {ov?.goalTarget || 5} sessions</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, ((ov?.goalDone || 4) / (ov?.goalTarget || 5)) * 100)}%`,
                      backgroundColor: accent,
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-semibold">
                  {ov?.goalNote || "One more session to hit this week's target."}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <h3 className="text-[13px] font-black">{ov?.prsTitle || 'Your Numbers'}</h3>
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
