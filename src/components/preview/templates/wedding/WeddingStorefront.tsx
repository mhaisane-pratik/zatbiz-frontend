'use client';

import React from 'react';
import Link from 'next/link';
import { Project, Block, Product } from '@/types';
import { resolveWeddingProfile } from './weddingProfiles';

/**
 * Themed Wedding & Event landing — renders a modern, scrollable, animated
 * landing built from the project's REAL data (company name, hero, theme,
 * service packages) so the published site reflects the chosen theme instead of
 * the generic block layout.
 */

interface Props {
  projectId: number;
  project: Project;
  currentPageBlocks: Block[];
  dbProducts: Product[];
  customerSession?: any;
  niche?: string;
  openProductDetail?: (p: Product) => void;
  handleAddToCart?: (p: Product) => void;
  onLogout?: () => void;
}

function darken(hex: string, amt = 0.3): string {
  const m = hex.replace('#', '');
  if (m.length !== 6) return hex;
  const r = Math.round(parseInt(m.slice(0, 2), 16) * (1 - amt));
  const g = Math.round(parseInt(m.slice(2, 4), 16) * (1 - amt));
  const b = Math.round(parseInt(m.slice(4, 6), 16) * (1 - amt));
  return `rgb(${r}, ${g}, ${b})`;
}

const GALLERY = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&auto=format&fit=crop&q=80',
];

const TEAM = [
  { name: 'Emma Rose', role: 'Lead Planner', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop&q=80' },
  { name: 'Liam Grey', role: 'Décor Designer', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
  { name: 'Nadia Kaur', role: 'Catering Head', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
];

const DEMO_PACKAGES = [
  { name: 'Classic Wedding', price: 250000, imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80', description: 'Venue, décor, catering & coordination.' },
  { name: 'Grand Celebration', price: 500000, imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80', description: 'Full-service luxury event experience.' },
  { name: 'Intimate Event', price: 120000, imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80', description: 'Cozy gatherings with premium touches.' },
];

export default function WeddingStorefront({
  projectId,
  project,
  currentPageBlocks,
  dbProducts,
  customerSession,
  niche,
  openProductDetail,
  handleAddToCart,
  onLogout,
}: Props) {
  const blocks = currentPageBlocks || [];
  const header: any = blocks.find((b) => b.type === 'header');
  const hero: any = blocks.find((b) => b.type === 'hero');
  const features: any = blocks.find((b) => b.type === 'features');

  const companyName = header?.content?.companyName || project?.name || 'Events';

  // Theme comes from the same niche profile the user previewed, so the live
  // site matches the preview exactly (single source of truth).
  const profile = resolveWeddingProfile(niche || companyName);
  const primary = profile.primary;
  const primaryDark = darken(profile.secondary || primary, 0.15);

  const logoUrl = header?.content?.logoUrl || '';
  const logoIcon = header?.content?.logoIcon || '💍';
  const heroTitle = hero?.content?.title || profile.headline;
  const heroSubtitle = hero?.content?.subtitle || profile.subtitle;
  const heroImage = hero?.content?.imageUrl || profile.hero;

  const packages = (dbProducts && dbProducts.length > 0 ? dbProducts : (DEMO_PACKAGES as any[])).slice(0, 6);
  const services: any[] = features?.content?.items || [];

  const money = (n: number) => (n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString('en-IN')}`);

  return (
    <div className="bg-white text-slate-900">
      <style>{`
        @keyframes wedKen { 0%{transform:scale(1)} 100%{transform:scale(1.15)} }
        .wed-ken { animation: wedKen 20s ease-in-out infinite alternate; }
        @keyframes wedFade { 0%{opacity:0; transform:translateY(16px)} 100%{opacity:1; transform:translateY(0)} }
        .wed-fade { animation: wedFade .7s ease both; }
      `}</style>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {logoUrl ? <img src={logoUrl} alt="" className="w-8 h-8 rounded-lg object-cover" /> : (
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ backgroundColor: primary }}>{logoIcon}</span>
            )}
            <span className="font-black text-lg tracking-tight">{companyName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-slate-900">Home</a>
            <a href="#packages" className="hover:text-slate-900">Packages</a>
            <a href="#gallery" className="hover:text-slate-900">Gallery</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>
          {customerSession ? (
            <button onClick={onLogout} className="px-4 py-2 rounded-lg text-xs font-black text-white" style={{ backgroundColor: primary }}>Log Out</button>
          ) : (
            <Link href={`/preview/${projectId}/login`} className="px-4 py-2 rounded-lg text-xs font-black text-white" style={{ backgroundColor: primary }}>Log In</Link>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[540px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden"><img src={heroImage} alt="" className="wed-ken w-full h-full object-cover" /></div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${primary}cc 0%, rgba(0,0,0,0.55) 100%)` }} />
        <div className="relative text-white max-w-3xl px-5">
          <p className="wed-fade text-[11px] font-black uppercase tracking-[0.3em] mb-4 opacity-90">{companyName}</p>
          <h1 className="wed-fade text-4xl md:text-6xl font-black leading-tight mb-4" style={{ animationDelay: '.1s' }}>{heroTitle}</h1>
          <p className="wed-fade text-sm md:text-lg opacity-90 mb-8 max-w-xl mx-auto" style={{ animationDelay: '.2s' }}>{heroSubtitle}</p>
          <div className="wed-fade flex flex-wrap gap-3 justify-center" style={{ animationDelay: '.3s' }}>
            <a href="#packages" className="px-6 py-3 rounded-full text-xs font-black text-white" style={{ backgroundColor: primary }}>View Packages</a>
            <Link href={`/preview/${projectId}/login`} className="px-6 py-3 rounded-full text-xs font-black bg-white" style={{ color: primary }}>Book a Consultation</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[{ n: '500+', l: 'Events Planned' }, { n: '12 yrs', l: 'Experience' }, { n: '4.9★', l: 'Couple Rating' }, { n: '80+', l: 'Vendors' }].map((s) => (
            <div key={s.l}><p className="text-2xl md:text-3xl font-black" style={{ color: primary }}>{s.n}</p><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{s.l}</p></div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="max-w-6xl mx-auto px-5 py-14">
        <div className="text-center mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: primary }}>Our Packages</p>
          <h2 className="text-2xl md:text-3xl font-black">Choose Your Celebration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((p: any, i: number) => (
            <div key={p.id ?? i} onClick={() => p.id && openProductDetail && openProductDetail(p)} className="wed-fade rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group cursor-pointer bg-white" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="h-48 relative overflow-hidden">
                <img src={p.imageUrl || GALLERY[i % GALLERY.length]} alt={p.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute top-3 left-3 text-[11px] font-black text-white px-3 py-1 rounded-lg shadow" style={{ backgroundColor: primary }}>{money(Number(p.price) || 0)}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm font-black mb-1">{p.name}</h3>
                <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">{typeof p.description === 'string' ? p.description : ''}</p>
                <button onClick={(e) => { e.stopPropagation(); p.id && handleAddToCart && handleAddToCart(p); }} className="mt-auto py-2 rounded-xl text-[11px] font-black text-white transition hover:opacity-90" style={{ backgroundColor: primary }}>Enquire Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className="bg-slate-50 py-14">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl font-black text-center mb-8">{features?.content?.title || 'What We Offer'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {services.slice(0, 6).map((n: any, i: number) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                  <div className="text-3xl mb-3">{n.icon || '🎉'}</div>
                  <h4 className="text-sm font-black mb-1">{n.title}</h4>
                  <p className="text-[11px] font-semibold text-slate-500">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-5 py-14">
        <h2 className="text-2xl font-black text-center mb-8">Moments We Created</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY.map((g, i) => (
            <div key={i} className="wed-fade h-40 rounded-xl overflow-hidden" style={{ animationDelay: `${i * 0.07}s` }}>
              <img src={g} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-slate-50 py-14">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-2xl font-black text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map((a) => (
              <div key={a.name} className="text-center p-5 rounded-2xl bg-white border border-slate-200">
                <img src={a.img} alt={a.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2" style={{ borderColor: primary }} />
                <h4 className="text-sm font-black">{a.name}</h4>
                <p className="text-[11px] font-semibold text-slate-500">{a.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="relative py-16 text-center text-white overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryDark} 0%, ${primary} 100%)` }} />
        <div className="relative max-w-2xl mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-black mb-3">Let's plan your perfect day</h2>
          <p className="text-sm opacity-90 mb-6">Book a free consultation with {companyName} today.</p>
          <Link href={`/preview/${projectId}/login`} className="inline-block px-6 py-3 rounded-xl text-xs font-black bg-white" style={{ color: primary }}>Book Now</Link>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <p className="text-[11px] font-bold">© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
      </footer>
    </div>
  );
}
