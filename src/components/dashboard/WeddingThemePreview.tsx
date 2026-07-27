'use client';

import React, { useState } from 'react';

/**
 * Self-contained Wedding/Event template preview. Each niche gets a genuinely
 * DIFFERENT landing design — its own hero layout, colors, imagery, copy and
 * packages — plus a modern login page. No backend/project needed (demo content).
 */

interface Props {
  category: string;
  onClose: () => void;
  onUse: () => void;
}

type Layout = 'centered' | 'split' | 'overlay' | 'left' | 'minimal';

interface NicheProfile {
  primary: string;
  secondary: string;
  layout: Layout;
  hero: string;
  badge: string;
  headline: string;
  subtitle: string;
  packages: { name: string; price: string; img: string }[];
  gallery: string[];
  loginTag: string;
}

const U = (id: string, w = 800) => `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`;

const PROFILES: Record<string, NicheProfile> = {
  wedding: {
    primary: '#be185d', secondary: '#7c3aed', layout: 'centered',
    hero: U('photo-1519741497674-611481863552', 1600),
    badge: 'Wedding Planner', headline: 'Your Dream Wedding, Perfectly Planned',
    subtitle: 'Timeless design, flawless timelines and bridal coordination.',
    packages: [
      { name: 'Classic Wedding', price: '₹2.5L', img: U('photo-1465495976277-4387d4b0b4c6') },
      { name: 'Grand Celebration', price: '₹6.0L', img: U('photo-1519225421980-715cb0215aed') },
      { name: 'Destination Wedding', price: '₹12L', img: U('photo-1520854221256-17451cc331bf') },
    ],
    gallery: [U('photo-1478146896981-b80fe463b330', 600), U('photo-1522673607200-164d1b6ce486', 600), U('photo-1583939003579-730e3918a45a', 600), U('photo-1460978812857-470ed1c77af0', 600)],
    loginTag: 'Access your wedding portal, guest lists & RSVPs.',
  },
  event: {
    primary: '#7c3aed', secondary: '#4f46e5', layout: 'split',
    hero: U('photo-1511795409834-ef04bbd61622', 1600),
    badge: 'Event Planner', headline: 'Events That Leave a Mark',
    subtitle: 'Social soirées, private dining and corporate gatherings.',
    packages: [
      { name: 'Social Soirée', price: '₹1.5L', img: U('photo-1530103862676-de8c9debad1d') },
      { name: 'Private Party', price: '₹3.0L', img: U('photo-1533174072545-7a4b6ad7a6c3') },
      { name: 'Gala Night', price: '₹8.0L', img: U('photo-1540575467063-178a50c2df87') },
    ],
    gallery: [U('photo-1470229722913-7c0e2dbbafd3', 600), U('photo-1492684223066-81342ee5ff30', 600), U('photo-1514525253161-7a46d19cd819', 600), U('photo-1519671482749-fd09be7ccebf', 600)],
    loginTag: 'Manage your events, vendors and guest check-ins.',
  },
  birthday: {
    primary: '#f59e0b', secondary: '#ec4899', layout: 'overlay',
    hero: U('photo-1530103862676-de8c9debad1d', 1600),
    badge: 'Birthday Planner', headline: 'Birthdays Worth Celebrating',
    subtitle: 'Themes, décor, cakes and kids activities — done right.',
    packages: [
      { name: 'Kids Party', price: '₹40K', img: U('photo-1464349095431-e9a21285b5f3') },
      { name: 'Milestone Bash', price: '₹1.2L', img: U('photo-1533294455009-a77b7557d979') },
      { name: 'Theme Party', price: '₹2.0L', img: U('photo-1513151233558-d860c5398176') },
    ],
    gallery: [U('photo-1527529482837-4698179dc6ce', 600), U('photo-1464349095431-e9a21285b5f3', 600), U('photo-1516450360452-9312f5e86fc7', 600), U('photo-1481349518771-20055b2a7b24', 600)],
    loginTag: 'Track bookings, themes and party checklists.',
  },
  corporate: {
    primary: '#0ea5e9', secondary: '#1e3a8a', layout: 'left',
    hero: U('photo-1540575467063-178a50c2df87', 1600),
    badge: 'Corporate Events', headline: 'Corporate Events, Flawlessly Executed',
    subtitle: 'Seminars, board dinners, launches and business galas.',
    packages: [
      { name: 'Seminar', price: '₹2.0L', img: U('photo-1517048676732-d65bc937f952') },
      { name: 'Board Dinner', price: '₹3.5L', img: U('photo-1519389950473-47ba0277781c') },
      { name: 'Product Launch', price: '₹9.0L', img: U('photo-1505373877841-8d25f7d46678') },
    ],
    gallery: [U('photo-1531058020387-3be344556be6', 600), U('photo-1511578314322-379afb476865', 600), U('photo-1475721027785-f74eccf877e2', 600), U('photo-1515187029135-18ee286d815b', 600)],
    loginTag: 'Manage delegates, agendas and invoices.',
  },
  conference: {
    primary: '#0d9488', secondary: '#0f766e', layout: 'minimal',
    hero: U('photo-1505373877841-8d25f7d46678', 1600),
    badge: 'Conference Organizer', headline: 'Conferences, at Scale',
    subtitle: 'Summits, expos and workshops with seamless logistics.',
    packages: [
      { name: 'Summit', price: '₹5.0L', img: U('photo-1540304453527-62f979142a17') },
      { name: 'Expo', price: '₹10L', img: U('photo-1492684223066-81342ee5ff30') },
      { name: 'Workshop', price: '₹1.5L', img: U('photo-1524178232363-1fb2b075b655') },
    ],
    gallery: [U('photo-1587825140708-dfaf72ae4b04', 600), U('photo-1560523159-4a9692d222f9', 600), U('photo-1591115765373-5207764f72e7', 600), U('photo-1475721027785-f74eccf877e2', 600)],
    loginTag: 'Manage speakers, sessions and attendee passes.',
  },
};

function resolveProfile(category: string): NicheProfile {
  const c = (category || '').toLowerCase();
  if (c.includes('wedding') || c.includes('bridal') || c.includes('marriage') || c.includes('anniversary')) return { ...PROFILES.wedding, badge: category };
  if (c.includes('birthday') || c.includes('kids') || c.includes('baby')) return { ...PROFILES.birthday, badge: category };
  if (c.includes('conference') || c.includes('summit') || c.includes('expo') || c.includes('seminar')) return { ...PROFILES.conference, badge: category };
  if (c.includes('corporate') || c.includes('business') || c.includes('gala') || c.includes('launch')) return { ...PROFILES.corporate, badge: category };
  return { ...PROFILES.event, badge: category };
}

export default function WeddingThemePreview({ category, onClose, onUse }: Props) {
  const [view, setView] = useState<'landing' | 'login'>('landing');
  const p = resolveProfile(category);
  const { primary, secondary, layout, hero, headline, subtitle, packages, gallery, badge, loginTag } = p;

  const KenHero = () => (
    <div className="absolute inset-0 overflow-hidden"><img src={hero} alt="" className="wtp-ken w-full h-full object-cover" /></div>
  );

  const HeroButtons = () => (
    <div className="wtp-fade flex gap-3" style={{ animationDelay: '.3s' }}>
      <span className="px-6 py-3 rounded-full text-xs font-black text-white" style={{ backgroundColor: primary }}>View Packages</span>
      <button onClick={() => setView('login')} className="px-6 py-3 rounded-full text-xs font-black bg-white cursor-pointer border-none" style={{ color: primary }}>Client Login</button>
    </div>
  );

  const renderHero = () => {
    if (layout === 'split') {
      return (
        <section className="relative grid md:grid-cols-2 min-h-[460px] overflow-hidden">
          <div className="flex flex-col justify-center px-8 py-14 text-white" style={{ background: `linear-gradient(160deg, ${primary} 0%, ${secondary} 100%)` }}>
            <p className="wtp-fade text-[11px] font-black uppercase tracking-[0.3em] mb-3 opacity-90">{badge}</p>
            <h1 className="wtp-fade text-3xl md:text-5xl font-black leading-tight mb-4" style={{ animationDelay: '.1s' }}>{headline}</h1>
            <p className="wtp-fade text-sm opacity-90 mb-8" style={{ animationDelay: '.2s' }}>{subtitle}</p>
            <HeroButtons />
          </div>
          <div className="relative min-h-[240px]"><KenHero /></div>
        </section>
      );
    }
    if (layout === 'overlay') {
      return (
        <section className="relative min-h-[480px] flex items-end px-6 py-10 overflow-hidden">
          <KenHero /><div className="absolute inset-0 bg-black/25" />
          <div className="wtp-fade relative w-full max-w-lg rounded-3xl p-7 shadow-2xl backdrop-blur-xl" style={{ backgroundColor: 'rgba(255,255,255,0.94)' }}>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 text-white" style={{ backgroundColor: primary }}>{badge}</span>
            <h1 className="text-3xl font-black leading-tight mb-3 text-slate-900">{headline}</h1>
            <p className="text-xs text-slate-500 mb-5">{subtitle}</p>
            <HeroButtons />
          </div>
        </section>
      );
    }
    if (layout === 'minimal') {
      return (
        <section className="relative min-h-[440px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          <KenHero /><div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />
          <div className="relative text-white">
            <p className="wtp-fade text-[11px] font-black uppercase tracking-[0.4em] mb-4 opacity-80">{badge}</p>
            <h1 className="wtp-fade text-4xl md:text-6xl font-black tracking-tight mb-4" style={{ animationDelay: '.1s' }}>{headline}</h1>
            <p className="wtp-fade text-sm opacity-85 mb-8 max-w-md mx-auto" style={{ animationDelay: '.2s' }}>{subtitle}</p>
            <div className="flex justify-center"><HeroButtons /></div>
          </div>
        </section>
      );
    }
    if (layout === 'left') {
      return (
        <section className="relative min-h-[460px] flex items-center px-6 md:px-10 overflow-hidden">
          <KenHero /><div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${primary}e0 0%, rgba(0,0,0,0.55) 100%)` }} />
          <div className="relative text-white max-w-2xl">
            <p className="wtp-fade text-[11px] font-black uppercase tracking-[0.3em] mb-3 opacity-90">{badge}</p>
            <h1 className="wtp-fade text-4xl md:text-5xl font-black leading-tight mb-4" style={{ animationDelay: '.1s' }}>{headline}</h1>
            <p className="wtp-fade text-sm md:text-lg opacity-90 mb-8 max-w-xl" style={{ animationDelay: '.2s' }}>{subtitle}</p>
            <HeroButtons />
          </div>
        </section>
      );
    }
    // centered
    return (
      <section className="relative min-h-[480px] flex items-center justify-center text-center overflow-hidden">
        <KenHero /><div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${primary}cc 0%, rgba(0,0,0,0.55) 100%)` }} />
        <div className="relative text-white max-w-2xl px-5">
          <p className="wtp-fade text-[11px] font-black uppercase tracking-[0.3em] mb-3 opacity-90">{badge}</p>
          <h1 className="wtp-fade text-4xl md:text-6xl font-black leading-tight mb-4" style={{ animationDelay: '.1s' }}>{headline}</h1>
          <p className="wtp-fade text-sm md:text-lg opacity-90 mb-8" style={{ animationDelay: '.2s' }}>{subtitle}</p>
          <div className="flex justify-center"><HeroButtons /></div>
        </div>
      </section>
    );
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6">
      <style>{`
        @keyframes wtpKen{0%{transform:scale(1)}100%{transform:scale(1.15)}}
        .wtp-ken{animation:wtpKen 18s ease-in-out infinite alternate}
        @keyframes wtpFade{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
        .wtp-fade{animation:wtpFade .6s ease both}
      `}</style>

      <div className="w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-white">
        {/* Control bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 flex-shrink-0 bg-white">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs" style={{ backgroundColor: primary }}>💍</span>
            <p className="text-xs font-black text-slate-900 truncate">{category} — Live Preview</p>
            <div className="hidden sm:flex bg-slate-100 rounded-lg p-0.5">
              {(['landing', 'login'] as const).map((v) => (
                <button key={v} onClick={() => setView(v)} className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider cursor-pointer ${view === v ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>{v === 'landing' ? 'Landing' : 'Login'}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={onUse} className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider text-white cursor-pointer border-none" style={{ backgroundColor: primary }}>Use Template ➔</button>
            <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold cursor-pointer border border-slate-200 text-slate-500 bg-transparent" title="Close">✕</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          {view === 'landing' ? (
            <>
              {renderHero()}

              {/* Packages */}
              <section className="max-w-5xl mx-auto px-5 py-14">
                <h2 className="text-2xl font-black text-center mb-8 text-slate-900">Our Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pk, i) => (
                    <div key={pk.name} className="wtp-fade rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="h-44 overflow-hidden relative">
                        <img src={pk.img} alt={pk.name} className="w-full h-full object-cover hover:scale-110 transition duration-700" />
                        <span className="absolute top-3 left-3 text-[11px] font-black text-white px-3 py-1 rounded-lg" style={{ backgroundColor: primary }}>{pk.price}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-black text-slate-900 mb-2">{pk.name}</h3>
                        <button className="w-full py-2 rounded-xl text-[11px] font-black text-white" style={{ backgroundColor: primary }}>Enquire Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              <section className="max-w-5xl mx-auto px-5 py-6">
                <h2 className="text-2xl font-black text-center mb-6 text-slate-900">Moments We Created</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gallery.map((g, i) => (
                    <div key={i} className="wtp-fade h-36 rounded-xl overflow-hidden" style={{ animationDelay: `${i * 0.07}s` }}><img src={g} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-500" /></div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section className="mt-10 py-16 text-center text-white" style={{ background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 120%)` }}>
                <h2 className="text-2xl md:text-3xl font-black mb-3">Let's plan your celebration</h2>
                <p className="text-sm opacity-90 mb-6">Book a free consultation today.</p>
                <span className="inline-block px-6 py-3 rounded-xl text-xs font-black bg-white" style={{ color: primary }}>Book Now</span>
              </section>
            </>
          ) : (
            /* Modern login page — themed per niche */
            <section className="min-h-full grid md:grid-cols-2">
              <div className="relative hidden md:block overflow-hidden">
                <img src={hero} alt="" className="wtp-ken w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${primary}cc 0%, rgba(0,0,0,0.55) 100%)` }} />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl font-black mb-2">{category}</h3>
                  <p className="text-xs opacity-90">{loginTag}</p>
                </div>
              </div>
              <div className="flex items-center justify-center p-8 bg-slate-50">
                <div className="wtp-fade w-full max-w-sm">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl mb-5" style={{ backgroundColor: primary }}>💍</div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Welcome back</h2>
                  <p className="text-xs text-slate-500 mb-6">Sign in to your {badge} portal.</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400">Email</label>
                      <input disabled placeholder="you@email.com" className="w-full mt-1 px-3 py-2.5 rounded-xl text-xs bg-white border border-slate-200 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400">Password</label>
                      <input disabled type="password" placeholder="••••••••" className="w-full mt-1 px-3 py-2.5 rounded-xl text-xs bg-white border border-slate-200 outline-none" />
                    </div>
                    <button className="w-full py-3 rounded-xl text-xs font-black text-white" style={{ backgroundColor: primary }}>Sign In</button>
                    <p className="text-center text-[11px] text-slate-400">New here? <span className="font-black" style={{ color: primary }}>Create an account</span></p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
