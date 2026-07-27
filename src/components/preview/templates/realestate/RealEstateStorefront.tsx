'use client';

import React from 'react';
import Link from 'next/link';
import { Project, Block, Product } from '@/types';
import { THEMES_30 } from '@/app/dashboard/themesData';

/**
 * Themed Real Estate landing — renders the rich, preview-style landing (hero
 * photo + search, featured listings, agents, CTA) using the project's REAL
 * data (company name, hero, theme, listings) instead of the generic block
 * layout. This makes the published site match the theme the user picked.
 */

interface Props {
  projectId: number;
  project: Project;
  currentPageBlocks: Block[];
  dbProducts: Product[];
  customerSession?: any;
  realEstateInfo?: any;
  openProductDetail?: (p: Product) => void;
  handleAddToCart?: (p: Product) => void;
  onLogout?: () => void;
}

// The 10 curated real-estate theme presets → primary color.
const RE_COLORS: Record<string, string> = {
  'realestate-elite': '#1e3a8a',
  'realestate-luxury-mansions': '#0f172a',
  'realestate-apex-builders': '#b45309',
  'realestate-vertex-commercial': '#0284c7',
  'realestate-urban-nest': '#0d9488',
  'realestate-horizon-advisors': '#4f46e5',
  'realestate-luxe-spaces': '#7c3aed',
  'realestate-nova-smartcity': '#2563eb',
  'realestate-heritage-homes': '#15803d',
  'realestate-modern-living': '#ea580c',
  emerald: '#10b981',
  deepblue: '#3b82f6',
  purple: '#7c3aed',
  sunset: '#f97316',
  slate: '#475569',
};

function resolveColor(themeKey?: string, override?: string): string {
  if (override && /^#/.test(override)) return override;
  if (!themeKey) return '#1e3a8a';
  if (RE_COLORS[themeKey]) return RE_COLORS[themeKey];
  const t = THEMES_30.find((x: any) => x.id === themeKey);
  if (t?.primaryColor) return t.primaryColor;
  if (/^#/.test(themeKey)) return themeKey;
  return '#1e3a8a';
}

function darken(hex: string, amt = 0.25): string {
  const m = hex.replace('#', '');
  if (m.length !== 6) return hex;
  const r = Math.max(0, Math.round(parseInt(m.slice(0, 2), 16) * (1 - amt)));
  const g = Math.max(0, Math.round(parseInt(m.slice(2, 4), 16) * (1 - amt)));
  const b = Math.max(0, Math.round(parseInt(m.slice(4, 6), 16) * (1 - amt)));
  return `rgb(${r}, ${g}, ${b})`;
}

const AGENTS = [
  { name: 'Sophia Bennett', role: 'Senior Broker', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
  { name: 'James Carter', role: 'Property Advisor', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
  { name: 'Aisha Khan', role: 'Luxury Specialist', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop&q=80' },
];

const DEMO_LISTINGS = [
  { name: 'Lakeview Villa', price: 1850000, imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80', description: '' },
  { name: 'Modern City Loft', price: 720000, imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80', description: '' },
  { name: 'Hillside Estate', price: 2400000, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80', description: '' },
];

function parseNiche(desc?: string) {
  try {
    if (desc && desc.trim().startsWith('{')) {
      const d = JSON.parse(desc);
      const nf = d.nicheFields || {};
      return { beds: nf.beds || nf.bedrooms, baths: nf.baths || nf.bathrooms, area: nf.area || nf.size, text: d.text };
    }
  } catch (e) {}
  return { text: desc } as any;
}

export default function RealEstateStorefront({
  projectId,
  project,
  currentPageBlocks,
  dbProducts,
  customerSession,
  realEstateInfo,
  openProductDetail,
  handleAddToCart,
  onLogout,
}: Props) {
  const blocks = currentPageBlocks || [];
  const header: any = blocks.find((b) => b.type === 'header');
  const hero: any = blocks.find((b) => b.type === 'hero');
  const features: any = blocks.find((b) => b.type === 'features');

  const primary = resolveColor(hero?.theme || header?.theme, realEstateInfo?.themeColor);
  const primaryDark = darken(primary, 0.3);

  const companyName = header?.content?.companyName || realEstateInfo?.companyName || project?.name || 'Real Estate';
  const logoUrl = header?.content?.logoUrl || realEstateInfo?.logoUrl || '';
  const logoIcon = header?.content?.logoIcon || '🏡';
  const heroTitle = hero?.content?.title || `Find Your Dream Property with ${companyName}`;
  const heroSubtitle = hero?.content?.subtitle || 'Premium residential and commercial properties, curated for you.';
  const heroImage =
    hero?.content?.imageUrl ||
    realEstateInfo?.brandImageUrl ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80';

  const listings = (dbProducts && dbProducts.length > 0 ? dbProducts : (DEMO_LISTINGS as any[])).slice(0, 6);
  const niches: any[] = features?.content?.items || [];

  const money = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `$${Math.round(n / 1000)}K`;
    return `$${n}`;
  };

  return (
    <div className="bg-white text-slate-900">
      <style>{`
        @keyframes reKen { 0%{transform:scale(1)} 100%{transform:scale(1.15)} }
        .re-ken { animation: reKen 20s ease-in-out infinite alternate; }
        @keyframes reFade { 0%{opacity:0; transform:translateY(16px)} 100%{opacity:1; transform:translateY(0)} }
        .re-fade { animation: reFade .7s ease both; }
      `}</style>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ backgroundColor: primary }}>{logoIcon}</span>
            )}
            <span className="font-black text-lg tracking-tight">{companyName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-slate-900">Home</a>
            <a href="#listings" className="hover:text-slate-900">Properties</a>
            <a href="#contact" className="hover:text-slate-900">Contact Us</a>
            <Link href={`/preview/${projectId}/login`} className="hover:text-slate-900">Portal Sign In</Link>
          </nav>
          <div className="flex items-center gap-2">
            {customerSession ? (
              <button onClick={onLogout} className="px-4 py-2 rounded-lg text-xs font-black text-white" style={{ backgroundColor: primary }}>Log Out</button>
            ) : (
              <Link href={`/preview/${projectId}/login`} className="px-4 py-2 rounded-lg text-xs font-black text-white" style={{ backgroundColor: primary }}>Log In</Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImage} alt="" className="re-ken w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${primary}d9 0%, rgba(0,0,0,0.55) 100%)` }} />
        <div className="relative max-w-6xl mx-auto px-5 w-full text-white">
          <div className="max-w-2xl">
            <h1 className="re-fade text-4xl md:text-6xl font-black leading-tight mb-4">{heroTitle}</h1>
            <p className="re-fade text-sm md:text-lg opacity-90 mb-8 max-w-xl" style={{ animationDelay: '.15s' }}>{heroSubtitle}</p>
            <div className="re-fade bg-white rounded-2xl p-3 flex flex-col sm:flex-row gap-2 shadow-2xl max-w-2xl" style={{ animationDelay: '.25s' }}>
              <input placeholder="City, ZIP code, or address" className="flex-1 px-3 py-2.5 rounded-xl text-xs text-slate-700 bg-slate-50 border border-slate-200 outline-none" />
              <select className="px-3 py-2.5 rounded-xl text-xs text-slate-700 bg-slate-50 border border-slate-200"><option>House, Villa, Apartment</option></select>
              <a href="#listings" className="px-5 py-2.5 rounded-xl text-xs font-black text-white text-center" style={{ backgroundColor: primary }}>Search Properties</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[{ n: `${listings.length}+`, l: 'Active Listings' }, { n: '18 yrs', l: 'Experience' }, { n: '4.9★', l: 'Client Rating' }, { n: '24/7', l: 'Support' }].map((s) => (
            <div key={s.l}>
              <p className="text-2xl md:text-3xl font-black" style={{ color: primary }}>{s.n}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="max-w-6xl mx-auto px-5 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: primary }}>Featured</p>
            <h2 className="text-2xl md:text-3xl font-black">Premium Listings</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((p: any, i: number) => {
            const nf = parseNiche(p.description);
            return (
              <div
                key={p.id ?? i}
                onClick={() => p.id && openProductDetail && openProductDetail(p)}
                className="re-fade rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group cursor-pointer bg-white"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={p.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'} alt={p.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                  <span className="absolute top-3 left-3 text-[11px] font-black text-white px-3 py-1 rounded-lg shadow" style={{ backgroundColor: primary }}>{money(Number(p.price) || 0)}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-sm font-black mb-1">{p.name}</h3>
                  {(nf.beds || nf.baths || nf.area) && (
                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 mb-3">
                      {nf.beds && <span>🛏 {nf.beds}</span>}
                      {nf.baths && <span>🛁 {nf.baths}</span>}
                      {nf.area && <span>📐 {nf.area}</span>}
                    </div>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); p.id && handleAddToCart && handleAddToCart(p); }}
                    className="mt-auto py-2 rounded-xl text-[11px] font-black text-white transition hover:opacity-90"
                    style={{ backgroundColor: primary }}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Niches / why choose */}
      {niches.length > 0 && (
        <section className="bg-slate-50 py-14">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl font-black text-center mb-8">{features?.content?.title || 'Why Choose Us'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {niches.slice(0, 6).map((n: any, i: number) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                  <div className="text-3xl mb-3">{n.icon || '🏡'}</div>
                  <h4 className="text-sm font-black mb-1">{n.title}</h4>
                  <p className="text-[11px] font-semibold text-slate-500">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agents */}
      <section className="max-w-6xl mx-auto px-5 py-14">
        <h2 className="text-2xl font-black text-center mb-8">Meet Our Agents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {AGENTS.map((a) => (
            <div key={a.name} className="text-center p-5 rounded-2xl border border-slate-200">
              <img src={a.img} alt={a.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2" style={{ borderColor: primary }} />
              <h4 className="text-sm font-black">{a.name}</h4>
              <p className="text-[11px] font-semibold text-slate-500">{a.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="relative py-16 text-center text-white overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryDark} 0%, ${primary} 100%)` }} />
        <div className="relative max-w-2xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-black mb-3">Talk to a {companyName} agent</h2>
          <p className="text-sm opacity-90 mb-6">Book a free consultation and tour your dream property.</p>
          <Link href={`/preview/${projectId}/login`} className="inline-block px-6 py-3 rounded-xl text-xs font-black bg-white" style={{ color: primary }}>Contact Broker</Link>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <p className="text-[11px] font-bold">© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
      </footer>
    </div>
  );
}
