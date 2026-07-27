'use client';

import React from 'react';

/**
 * Self-contained, themed Real Estate landing preview.
 *
 * Each theme id maps to a distinct hero layout + hero photo, with a slow
 * "Ken Burns" zoom on the hero image (video-like feel), scroll-in animations
 * and rich demo content. No backend/project needed — all data is demo content.
 */

interface RealEstateThemePreviewProps {
  theme: {
    id: string;
    name: string;
    tagline?: string;
    brandIcon?: string;
    icon?: string;
    primaryColor: string;
    secondaryColor?: string;
    bgColor?: string;
  };
  category?: string | null;
  onClose: () => void;
  onUse: () => void;
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80', // modern house
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=80', // luxury mansion
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=80',    // city apartments
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=80', // villa + pool
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=80', // interior
];

const LISTINGS = [
  { title: 'Lakeview Villa', location: 'Palm Springs, CA', price: '$1.85M', beds: 4, baths: 3, area: '3,200 sqft', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80' },
  { title: 'Modern City Loft', location: 'Downtown, Austin', price: '$720K', beds: 2, baths: 2, area: '1,450 sqft', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80' },
  { title: 'Hillside Estate', location: 'Boulder, CO', price: '$2.40M', beds: 5, baths: 4, area: '4,600 sqft', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80' },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=80',
];

const AGENTS = [
  { name: 'Sophia Bennett', role: 'Senior Broker', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
  { name: 'James Carter', role: 'Property Advisor', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
  { name: 'Aisha Khan', role: 'Luxury Specialist', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop&q=80' },
];

// Deterministic index from a theme id so each theme gets a consistent look.
function hashIndex(id: string, mod: number) {
  let h = 0;
  for (let i = 0; i < (id || '').length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % mod;
}

type HeroLayout = 'centered' | 'left' | 'split' | 'overlay-card' | 'minimal';
const HERO_LAYOUTS: HeroLayout[] = ['left', 'centered', 'split', 'overlay-card', 'minimal'];

export default function RealEstateThemePreview({ theme, category, onClose, onUse }: RealEstateThemePreviewProps) {
  const primary = theme.primaryColor || '#4f46e5';
  const secondary = theme.secondaryColor || primary;
  const bg = theme.bgColor || '#ffffff';
  const isDark = /^#?(0|1|2|3)/.test((bg || '').replace('#', ''));
  const text = isDark ? '#f8fafc' : '#0f172a';
  const subText = isDark ? 'rgba(248,250,252,0.65)' : '#64748b';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0';

  const variant = hashIndex(theme.id, HERO_LAYOUTS.length);
  const heroLayout = HERO_LAYOUTS[variant];
  const heroImg = HERO_IMAGES[hashIndex(theme.id + 'x', HERO_IMAGES.length)];

  const searchBar = (
    <div className="rethp-fade bg-white rounded-2xl p-3 flex flex-col sm:flex-row gap-2 shadow-2xl max-w-2xl" style={{ animationDelay: '.25s' }}>
      <input disabled placeholder="City, ZIP code, or address" className="flex-1 px-3 py-2.5 rounded-xl text-xs text-slate-700 bg-slate-50 border border-slate-200 outline-none" />
      <select disabled className="px-3 py-2.5 rounded-xl text-xs text-slate-700 bg-slate-50 border border-slate-200"><option>House, Villa, Apartment</option></select>
      <button className="px-5 py-2.5 rounded-xl text-xs font-black text-white whitespace-nowrap" style={{ backgroundColor: primary }}>Search Properties</button>
    </div>
  );

  const badge = (
    <span className="rethp-fade inline-block text-[10px] font-black uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full mb-4 backdrop-blur">
      {category || 'Real Estate Agency'}
    </span>
  );
  const headline = <>Find your next home with <span style={{ color: '#fff' }}>{theme.name}</span></>;
  const tagline = theme.tagline || 'Premium residential and commercial properties, curated for you.';

  const kenBurns = (
    <div className="absolute inset-0 overflow-hidden">
      <img src={heroImg} alt="" className="rethp-kenburns w-full h-full object-cover" />
    </div>
  );

  const renderHero = () => {
    // Shared tint overlay driven by the theme's primary color.
    const tint = (opacity: string) => (
      <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${primary}${opacity} 0%, rgba(0,0,0,0.55) 100%)` }} />
    );

    if (heroLayout === 'centered') {
      return (
        <section className="relative min-h-[440px] flex items-center justify-center text-center px-6 py-16 overflow-hidden">
          {kenBurns}{tint('cc')}
          <div className="relative text-white max-w-2xl mx-auto">
            {badge}
            <h1 className="rethp-fade text-4xl md:text-5xl font-black leading-tight mb-4">{headline}</h1>
            <p className="rethp-fade text-sm md:text-base opacity-90 mb-8" style={{ animationDelay: '.15s' }}>{tagline}</p>
            <div className="flex justify-center">{searchBar}</div>
          </div>
        </section>
      );
    }
    if (heroLayout === 'split') {
      return (
        <section className="relative grid md:grid-cols-2 min-h-[440px] overflow-hidden">
          <div className="flex flex-col justify-center px-8 py-14 text-white" style={{ background: `linear-gradient(160deg, ${primary} 0%, ${secondary} 100%)` }}>
            {badge}
            <h1 className="rethp-fade text-3xl md:text-4xl font-black leading-tight mb-4">{headline}</h1>
            <p className="rethp-fade text-sm opacity-90 mb-8" style={{ animationDelay: '.15s' }}>{tagline}</p>
            {searchBar}
          </div>
          <div className="relative min-h-[240px]">{kenBurns}</div>
        </section>
      );
    }
    if (heroLayout === 'overlay-card') {
      return (
        <section className="relative min-h-[460px] flex items-end px-6 py-10 overflow-hidden">
          {kenBurns}<div className="absolute inset-0 bg-black/30" />
          <div className="rethp-fade relative w-full max-w-lg rounded-3xl p-7 shadow-2xl backdrop-blur-xl" style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 text-white" style={{ backgroundColor: primary }}>{category || 'Real Estate'}</span>
            <h1 className="text-3xl font-black leading-tight mb-3 text-slate-900">Find your next home with {theme.name}</h1>
            <p className="text-xs text-slate-500 mb-5">{tagline}</p>
            {searchBar}
          </div>
        </section>
      );
    }
    if (heroLayout === 'minimal') {
      return (
        <section className="relative min-h-[420px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          {kenBurns}<div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
          <div className="relative text-white">
            <div className="rethp-fade text-5xl mb-4">{theme.brandIcon || theme.icon || '🏠'}</div>
            <h1 className="rethp-fade text-4xl md:text-6xl font-black tracking-tight mb-4" style={{ animationDelay: '.1s' }}>{theme.name}</h1>
            <p className="rethp-fade text-sm opacity-85 mb-8 max-w-md mx-auto" style={{ animationDelay: '.2s' }}>{tagline}</p>
            <button className="rethp-fade px-8 py-3 rounded-full text-xs font-black text-white" style={{ backgroundColor: primary, animationDelay: '.3s' }}>Explore Listings ➔</button>
          </div>
        </section>
      );
    }
    // 'left' (default)
    return (
      <section className="relative min-h-[440px] flex items-center px-6 md:px-10 py-16 overflow-hidden">
        {kenBurns}{tint('cc')}
        <div className="relative text-white max-w-2xl">
          {badge}
          <h1 className="rethp-fade text-4xl md:text-5xl font-black leading-tight mb-4">{headline}</h1>
          <p className="rethp-fade text-sm md:text-base opacity-90 mb-8 max-w-xl" style={{ animationDelay: '.15s' }}>{tagline}</p>
          {searchBar}
        </div>
      </section>
    );
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6">
      <style>{`
        @keyframes rethpKenburns { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.18) translate(-2%,-2%)} }
        .rethp-kenburns { animation: rethpKenburns 18s ease-in-out infinite alternate; }
        @keyframes rethpFade { 0%{opacity:0; transform:translateY(16px)} 100%{opacity:1; transform:translateY(0)} }
        .rethp-fade { animation: rethpFade .7s ease both; }
        @keyframes rethpFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .rethp-float { animation: rethpFloat 3s ease-in-out infinite; }
      `}</style>

      <div className="w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col" style={{ backgroundColor: bg, color: text }}>
        {/* Preview control bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">{theme.brandIcon || theme.icon || '🏠'}</span>
            <div className="min-w-0">
              <p className="text-xs font-black truncate" style={{ color: text }}>{theme.name} — Live Preview</p>
              <p className="text-[10px] font-semibold truncate" style={{ color: subText }}>Demo of your {category || 'Real Estate'} website</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={onUse} className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider text-white transition hover:opacity-90 cursor-pointer border-none" style={{ backgroundColor: primary }}>Use Theme &amp; Continue ➔</button>
            <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold cursor-pointer border" style={{ borderColor: cardBorder, color: subText, background: 'transparent' }} title="Close preview">✕</button>
          </div>
        </div>

        {/* Scrolling themed landing */}
        <div className="flex-1 overflow-y-auto">
          {renderHero()}

          {/* Animated stats strip */}
          <section className="px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-4" style={{ backgroundColor: cardBg }}>
            {[
              { n: '1,200+', l: 'Properties Sold' },
              { n: '18 yrs', l: 'Market Experience' },
              { n: '$4.2B', l: 'Total Volume' },
              { n: '4.9★', l: 'Client Rating' },
            ].map((s, i) => (
              <div key={s.l} className="rethp-fade text-center" style={{ animationDelay: `${i * 0.08}s` }}>
                <p className="text-2xl md:text-3xl font-black" style={{ color: primary }}>{s.n}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: subText }}>{s.l}</p>
              </div>
            ))}
          </section>

          {/* Featured listings */}
          <section className="px-6 md:px-10 py-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: primary }}>Featured</p>
                <h2 className="text-2xl font-black" style={{ color: text }}>Premium Listings</h2>
              </div>
              <span className="text-xs font-bold" style={{ color: subText }}>View all →</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LISTINGS.map((l, i) => (
                <div key={l.title} className="rethp-fade rounded-2xl overflow-hidden border shadow-sm flex flex-col group" style={{ backgroundColor: cardBg, borderColor: cardBorder, animationDelay: `${i * 0.1}s` }}>
                  <div className="h-44 relative overflow-hidden">
                    <img src={l.img} alt={l.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <span className="rethp-float absolute top-3 left-3 text-[10px] font-black text-white px-2.5 py-1 rounded-lg shadow-lg" style={{ backgroundColor: primary }}>{l.price}</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-sm font-black mb-1" style={{ color: text }}>{l.title}</h3>
                    <p className="text-[11px] font-semibold mb-3" style={{ color: subText }}>📍 {l.location}</p>
                    <div className="mt-auto flex items-center gap-3 text-[10px] font-bold" style={{ color: subText }}>
                      <span>🛏 {l.beds} Beds</span><span>🛁 {l.baths} Baths</span><span>📐 {l.area}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery band */}
          <section className="px-6 md:px-10 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY.map((g, i) => (
              <div key={i} className="rethp-fade h-28 rounded-xl overflow-hidden" style={{ animationDelay: `${i * 0.07}s` }}>
                <img src={g} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </div>
            ))}
          </section>

          {/* Agents */}
          <section className="px-6 md:px-10 py-14" style={{ backgroundColor: cardBg }}>
            <h2 className="text-2xl font-black text-center mb-8" style={{ color: text }}>Meet Our Agents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {AGENTS.map((a, i) => (
                <div key={a.name} className="rethp-fade text-center p-5 rounded-2xl border" style={{ borderColor: cardBorder, animationDelay: `${i * 0.1}s` }}>
                  <img src={a.img} alt={a.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2" style={{ borderColor: primary }} />
                  <h4 className="text-sm font-black" style={{ color: text }}>{a.name}</h4>
                  <p className="text-[11px] font-semibold" style={{ color: subText }}>{a.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <section className="px-6 md:px-10 py-14 text-center">
            <div className="rethp-fade max-w-2xl mx-auto">
              <p className="text-4xl mb-3" style={{ color: primary }}>“</p>
              <p className="text-lg md:text-xl font-bold leading-relaxed mb-4" style={{ color: text }}>
                {theme.name} made buying our first home effortless. The team understood exactly what we wanted.
              </p>
              <p className="text-xs font-black uppercase tracking-wider" style={{ color: subText }}>— The Andersons, Verified Buyers</p>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="relative px-6 md:px-10 py-16 text-center text-white overflow-hidden">
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${secondary} 0%, ${primary} 100%)` }} />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-black mb-3">Talk to a {theme.name} agent</h2>
              <p className="text-sm opacity-90 mb-6">Book a free consultation and tour your dream property.</p>
              <button className="px-6 py-3 rounded-xl text-xs font-black bg-white" style={{ color: primary }}>Contact Broker</button>
            </div>
          </section>

          <footer className="px-6 md:px-10 py-8 text-center" style={{ backgroundColor: cardBg }}>
            <p className="text-[11px] font-bold" style={{ color: subText }}>© {new Date().getFullYear()} {theme.name}. Demo preview powered by ZATBIZ.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
