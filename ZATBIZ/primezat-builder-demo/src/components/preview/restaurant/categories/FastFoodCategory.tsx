'use client';

import React from 'react';
import Link from 'next/link';
import { Product, Project } from '@/types';
import { CategoryProps, getThemeColors } from './types';
import { FastFoodLogin } from './FastFoodLogin';
import { FastFoodDashboard } from './FastFoodDashboard';

export { FastFoodLogin, FastFoodDashboard };

export default function FastFoodCategory({
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
    bgAccent: 'bg-[#f97316]',
    textAccent: 'text-[#f97316]',
    hoverBgAccent: 'hover:bg-orange-700',
    borderAccent: 'border-orange-955',
    hoverBorderAccent: 'hover:border-orange-500',
    selectionBg: 'selection:bg-[#f97316]',
    btnBorderAccent: 'border-[#f97316]',
    btnTextAccent: 'text-[#f97316]',
    btnHoverBgAccent: 'hover:bg-[#f97316]'
  };
  const colors = getThemeColors(themePreset, defaultTheme);

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
  ) : (
    <span className="text-3xl select-none">{logoIcon || '🍔'}</span>
  );
  const displayName = companyName || project.name.replace(" Site", "");
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop&q=80';
  const displayHeroTitle = heroTitle || 'Juicy Burgers & Crispy Fries';
  const displayHeroSubtitle = heroSubtitle || 'Double flame-grilled beef smash patties, melted cheddar cheese, house special sauce, and warm toasted brioche buns. Made fresh and hot in minutes.';

  return (
    <div className={`min-h-screen bg-[#0f0f12] text-slate-100 font-sans ${colors.selectionBg} selection:text-white`}>
      {/* Fast Food Navbar */}
      <nav className="border-b border-orange-500/10 bg-[#0f0f12]/95 backdrop-blur-md sticky top-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {displayLogo}
          <div className="text-left font-sans">
            <span className="text-base font-black tracking-tight text-white block uppercase">
              {displayName}
            </span>
            <span className={`text-[9px] ${colors.textAccent} font-extrabold uppercase tracking-widest block mt-0.5 animate-pulse`}>
              Golden Buns & Golden Fries
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-black uppercase tracking-wider text-slate-300">
          <a href="#menu" className={`hover:${colors.textAccent} transition`}>Our Menu</a>
          <a href="#combos" className={`hover:${colors.textAccent} transition`}>Deals</a>
          {customerSession ? (
            <div className="flex items-center gap-4">
              <Link href={`/preview/${projectId}/dashboard`} className={`hover:${colors.textAccent} transition`}>
                Dashboard
              </Link>
              <button onClick={onLogout} className="text-slate-404 hover:text-rose-450 transition cursor-pointer border-none bg-transparent font-black uppercase tracking-wider text-xs">
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
      <section className="relative min-h-[80vh] flex items-center justify-start bg-cover bg-center px-6 sm:px-16"
               style={{
                 backgroundImage: `linear-gradient(to right, rgba(15, 15, 18, 0.95), rgba(15, 15, 18, 0.4)), url('${displayHeroImage}')`
               }}>
        <div className="max-w-2xl text-left space-y-6">
          <span className={`px-3.5 py-1.5 bg-orange-500/10 border border-[#f97316]/20 rounded-full text-[10px] uppercase tracking-widest ${colors.textAccent} font-black inline-block`}>
            🔥 Crave-worthy fast bites
          </span>
          <h1 className="text-4xl sm:text-6xl text-white font-black tracking-tight leading-[1.05] uppercase">
            {displayHeroTitle}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-md">
            {displayHeroSubtitle}
          </p>
          <div className="pt-2 flex gap-4 text-xs uppercase tracking-wider font-black">
            <a
              href="#menu"
              className={`px-8 py-3.5 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl shadow-lg shadow-orange-500/25 transition cursor-pointer border-none text-center`}
            >
              Order Online
            </a>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className={`px-8 py-3.5 bg-neutral-900 border border-slate-700 hover:${colors.btnBorderAccent} text-white rounded-xl transition cursor-pointer`}
            >
              Book Table
            </button>
          </div>
        </div>
      </section>

      {/* Signature Combo Deals */}
      <section id="combos" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 text-left">
        <div className="flex justify-between items-end">
          <div className="space-y-1.5">
            <span className={`text-xs uppercase tracking-wider ${colors.textAccent} font-black`}>Exclusive Deals</span>
            <h2 className="text-2xl sm:text-3xl text-white font-black uppercase">Super Saver Combos</h2>
          </div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:block">Limited Time Offer</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureDishes.length === 0 ? (
            ['Double Smash Deal', 'Crispy Tender Box', 'Midnight Feast Combo', 'BBQ Grill Share'].map((name, idx) => (
              <div key={idx} className="bg-[#14151b] border border-slate-900 rounded-3xl p-5 space-y-4">
                <h3 className="font-extrabold text-white text-sm uppercase">{name}</h3>
                <p className="text-slate-400 text-[11px] min-h-[40px]">Juicy flame-grilled patties served with golden salted fries and a chilled beverage.</p>
                <button onClick={() => alert('Sign In to start placing online orders!')} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>
                  Grab Deal
                </button>
              </div>
            ))
          ) : (
            signatureDishes.map((p) => (
              <div key={p.id} className="bg-[#14151b] border border-slate-900 rounded-3xl p-5 space-y-4">
                <img src={p.imageUrl || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'} alt={p.name} className="w-full h-36 object-cover rounded-2xl" />
                <div className="flex justify-between items-baseline">
                  <h3 className="font-extrabold text-white text-sm uppercase truncate max-w-[150px]">{p.name}</h3>
                  <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                </div>
                <p className="text-slate-400 text-[11px] min-h-[40px]">{p.description}</p>
                <button onClick={() => onAddToCart(p)} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>
                  Grab Deal
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b0c0f] border-t border-slate-900 py-10 px-6 text-center text-xs text-slate-500 font-sans space-y-2">
        <p className="font-black text-slate-350 uppercase tracking-widest">
          🍔 {displayName} 🍔
        </p>
        <p>© 2026 Fast Food Express. All rights reserved.</p>
      </footer>
    </div>
  );
}
