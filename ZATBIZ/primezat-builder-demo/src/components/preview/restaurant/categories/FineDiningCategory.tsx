'use client';

import React from 'react';
import Link from 'next/link';
import { Product, Project } from '@/types';
import { CategoryProps, getThemeColors } from './types';
import { FineDiningLogin } from './FineDiningLogin';
import { FineDiningDashboard } from './FineDiningDashboard';

export { FineDiningLogin, FineDiningDashboard };

export default function FineDiningCategory({
  projectId,
  project,
  dbProducts,
  onAddToCart,
  setIsBookingModalOpen,
  customerSession,
  onLogout,
  logoUrl,
  logoIcon,
  companyName,
  heroImage,
  heroTitle,
  heroSubtitle,
  themePreset
}: CategoryProps) {
  const signatureDishes = dbProducts.slice(0, 4);
  const defaultTheme = {
    bgAccent: 'bg-[#c5a880]',
    textAccent: 'text-[#c5a880]',
    hoverBgAccent: 'hover:bg-[#d8c2a3]',
    borderAccent: 'border-stone-850',
    hoverBorderAccent: 'hover:border-[#c5a880]/30',
    selectionBg: 'selection:bg-[#c5a880]',
    btnBorderAccent: 'border-[#c5a880]',
    btnTextAccent: 'text-[#c5a880]',
    btnHoverBgAccent: 'hover:bg-[#c5a880]'
  };
  const colors = getThemeColors(themePreset, defaultTheme);

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
  ) : (
    <span className="text-2xl select-none">{logoIcon || '⚜️'}</span>
  );
  const displayName = companyName || project.name.replace(" Site", "");
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&auto=format&fit=crop&q=80';
  const displayHeroTitle = heroTitle || 'Exquisite Gastronomy & Refined Service';
  const displayHeroSubtitle = heroSubtitle || 'Sophisticated multi-course tasting menus, premium dry-aged cuts, and world-class sommelier pairings served in an atmosphere of quiet luxury.';

  return (
    <div className={`min-h-screen bg-[#0a0a0c] text-[#e2e8f0] font-serif ${colors.selectionBg} selection:text-white`}>
      {/* Luxury Navbar */}
      <nav className="border-b border-[#2a2c35]/20 bg-[#0a0a0c]/95 backdrop-blur-md sticky top-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {displayLogo}
          <div className="text-left font-sans">
            <span className="text-base font-black tracking-widest text-white block uppercase font-serif">
              {displayName}
            </span>
            <span className={`text-[7px] ${colors.textAccent} font-extrabold uppercase tracking-widest block mt-1`}>
              Michelin Star Cuisine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-black uppercase tracking-wider text-stone-400 font-sans">
          <a href="#menu" className={`hover:${colors.textAccent} transition`}>Tasting Menu</a>
          <button onClick={() => setIsBookingModalOpen(true)} className={`hover:${colors.textAccent} transition bg-transparent border-none cursor-pointer uppercase text-xs font-bold font-sans`}>Reserve Seating</button>
          {customerSession ? (
            <div className="flex items-center gap-4">
              <Link href={`/preview/${projectId}/dashboard`} className={`hover:${colors.textAccent} transition`}>
                Concierge
              </Link>
              <button onClick={onLogout} className="text-stone-500 hover:text-rose-400 transition cursor-pointer border-none bg-transparent font-black uppercase tracking-wider text-xs">
                Logout
              </button>
            </div>
          ) : (
            <Link href={`/preview/${projectId}/login`} className={`hover:${colors.textAccent} transition font-bold`}>
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center px-6 text-center"
               style={{
                 backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 12, 0.7), rgba(10, 10, 12, 0.98)), url('${displayHeroImage}')`
               }}>
        <div className="max-w-2xl space-y-6">
          <span className={`px-4 py-1.5 bg-[#c5a880]/15 border border-[#c5a880]/20 rounded-none text-[8px] uppercase tracking-widest ${colors.textAccent} font-black inline-block font-sans`}>
            ⚜️ Haute Cuisine & Cellar ⚜️
          </span>
          <h1 className="text-4xl sm:text-6xl text-white font-extrabold tracking-tight leading-[1.1] uppercase font-serif">
            {displayHeroTitle}
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm font-medium leading-relaxed max-w-lg mx-auto font-sans">
            {displayHeroSubtitle}
          </p>
          <div className="pt-4 flex justify-center gap-4 text-xs uppercase tracking-widest font-black font-sans">
            <a
              href="#menu"
              className={`px-8 py-3.5 ${colors.bgAccent} hover:bg-[#d8c2a3] text-black transition cursor-pointer border-none text-center`}
            >
              Tasting Menu
            </a>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-3.5 bg-transparent border border-stone-800 hover:border-[#c5a880] text-white transition cursor-pointer"
            >
              Request Table
            </button>
          </div>
        </div>
      </section>

      {/* Signature Plated Dishes */}
      <section id="menu" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-16 text-center">
        <div className="space-y-3">
          <span className={`text-xs uppercase tracking-widest ${colors.textAccent} font-black font-sans`}>A Culinary Journey</span>
          <h2 className="text-3xl sm:text-4xl text-white font-extrabold uppercase font-serif">Tonight's Curated Plates</h2>
          <p className="text-stone-400 text-xs max-w-md mx-auto font-sans">Savor our chef's seasonal degustation selections prepared with artisanal craftsmanship.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {signatureDishes.length === 0 ? (
            ['Truffle Butter Tagliatelle', 'Pan-Seared Sea Bass', 'Wagyu Beef Tenderloin', 'Grand Soufflé'].map((name, idx) => (
              <div key={idx} className="bg-[#111217] border border-[#2a2c35]/20 rounded-none p-6 space-y-4 text-left hover:border-[#c5a880]/30 transition duration-300">
                <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest font-sans`}>Course {idx + 1}</span>
                <h3 className="font-extrabold text-white text-sm uppercase font-serif">{name}</h3>
                <p className="text-stone-400 text-[11px] min-h-[40px] font-sans">Garnished with wild forest mushrooms, organic garden herbs, or premium shaved truffles.</p>
                <button onClick={() => alert('Please register an account or sign in to order!')} className={`w-full py-2.5 bg-transparent border border-stone-800 hover:border-[#c5a880] ${colors.textAccent} font-bold text-[9px] uppercase tracking-widest transition cursor-pointer font-sans`}>
                  Reserve Plate
                </button>
              </div>
            ))
          ) : (
            signatureDishes.map((p, idx) => (
              <div key={p.id} className="bg-[#111217] border border-[#2a2c35]/20 rounded-none p-6 space-y-4 text-left hover:border-[#c5a880]/30 transition duration-300">
                <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest font-sans`}>Course {idx + 1}</span>
                <img src={p.imageUrl || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400'} alt={p.name} className="w-full h-36 object-cover rounded-none filter brightness-90" />
                <div className="flex justify-between items-baseline font-sans">
                  <h3 className="font-extrabold text-white text-sm uppercase truncate max-w-[150px] font-serif">{p.name}</h3>
                  <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                </div>
                <p className="text-stone-400 text-[11px] min-h-[40px] font-sans">{p.description}</p>
                <button onClick={() => onAddToCart(p)} className={`w-full py-2.5 bg-transparent border border-stone-850 hover:border-[#c5a880] ${colors.textAccent} font-bold text-[9px] uppercase tracking-widest transition cursor-pointer font-sans`}>
                  Reserve Plate
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050507] border-t border-stone-900 py-12 px-6 text-center text-xs text-stone-500 font-sans space-y-2">
        <p className="font-black text-stone-450 uppercase tracking-widest font-serif">
          ⚜️ {displayName} ⚜️
        </p>
        <p>© 2026 Le Sommet Fine Dining. All rights reserved.</p>
      </footer>
    </div>
  );
}
