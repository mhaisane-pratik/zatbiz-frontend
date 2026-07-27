'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryProps, CategoryLoginProps, RestaurantDashboardProps, getThemeColors } from './types';
import { CategoryLoginTemplate } from './CategoryLoginTemplate';
import { CategoryDashboardTemplate } from './CategoryDashboardTemplate';

export function CafeCategory({
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
  const products = dbProducts.slice(0, 4);
  const defaultTheme = {
    bgAccent: 'bg-[#78350f]',
    textAccent: 'text-[#d97706]',
    hoverBgAccent: 'hover:bg-amber-900',
    borderAccent: 'border-[#78350f]',
    hoverBorderAccent: 'hover:border-amber-700',
    selectionBg: 'selection:bg-[#78350f]',
    btnBorderAccent: 'border-[#78350f]',
    btnTextAccent: 'text-[#78350f]',
    btnHoverBgAccent: 'hover:bg-[#78350f]'
  };
  const colors = getThemeColors(themePreset, defaultTheme);

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
  ) : (
    <span className="text-3xl select-none">{logoIcon || '☕'}</span>
  );
  const displayName = companyName || project.name.replace(" Site", "");
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&auto=format&fit=crop&q=80';
  const displayHeroTitle = heroTitle || 'Craft Espresso & Pastry';
  const displayHeroSubtitle = heroSubtitle || 'Sip single-origin Arabica cold brews, handmade velvet latte art, and daily butter croissants baked fresh in our cozy roastery lounge.';

  return (
    <div className={`min-h-screen bg-[#0e0a07] text-[#f5f5f4] font-sans ${colors.selectionBg} selection:text-white`}>
      <nav className="border-b border-[#291a0f] bg-[#0e0a07]/95 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {displayLogo}
          <div className="text-left font-sans">
            <span className="text-base font-black tracking-tight text-white block uppercase">{displayName}</span>
            <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest block mt-0.5`}>Espresso Bar & Cozy Lounge</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-stone-300">
          <a href="#menu" className={`hover:${colors.textAccent} transition`}>Brew Menu</a>
          <button onClick={() => setIsBookingModalOpen(true)} className={`hover:${colors.textAccent} transition bg-transparent border-none cursor-pointer uppercase text-xs font-bold`}>Book Table</button>
          {customerSession ? (
            <div className="flex items-center gap-4">
              <Link href={`/preview/${projectId}/dashboard`} className={`hover:${colors.textAccent} transition font-bold`}>Dashboard</Link>
              <button onClick={onLogout} className="text-stone-400 hover:text-rose-400 transition cursor-pointer border-none bg-transparent uppercase font-bold text-xs">Logout</button>
            </div>
          ) : (
            <Link href={`/preview/${projectId}/login`} className={`hover:${colors.textAccent} transition font-bold`}>Sign In</Link>
          )}
        </div>
      </nav>

      <section className="relative min-h-[75vh] flex items-center justify-center bg-cover bg-center text-center px-6"
               style={{ backgroundImage: `linear-gradient(to bottom, rgba(14, 10, 7, 0.6), rgba(14, 10, 7, 0.95)), url('${displayHeroImage}')` }}>
        <div className="max-w-2xl space-y-6">
          <span className={`text-xs uppercase tracking-widest ${colors.textAccent} font-black block`}>☕ Micro-Roastery beans</span>
          <h1 className="text-4xl sm:text-6xl text-white font-black uppercase">{displayHeroTitle}</h1>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">{displayHeroSubtitle}</p>
          <div className="pt-2 flex justify-center gap-4 text-xs font-black uppercase">
            <a href="#menu" className={`px-8 py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl shadow-lg transition text-center border-none`}>Order Brews</a>
            <button onClick={() => setIsBookingModalOpen(true)} className={`px-8 py-3 bg-neutral-950 border border-stone-880 hover:${colors.btnBorderAccent} text-white rounded-xl transition cursor-pointer`}>Find A Booth</button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 max-w-7xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-2xl sm:text-3xl text-white font-black uppercase font-serif">Signature Coffee & Bakery Treats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            ['Barista Special Latte', 'Vanilla Cold Brew', 'Butter Croissant', 'Avocado Toast Box'].map((name, idx) => (
              <div key={idx} className="bg-[#17120e] border border-stone-900 rounded-2xl overflow-hidden text-left p-5 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase">{name}</h3>
                <p className="text-stone-400 text-[11px] min-h-[40px]">Fresh custom grind espresso shot paired with warm boutique bakes.</p>
                <button onClick={() => alert('Register/Login to place orders!')} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Order Brew</button>
              </div>
            ))
          ) : (
            products.map((p) => (
              <div key={p.id} className="bg-[#17120e] border border-stone-900 rounded-2xl overflow-hidden text-left p-5 space-y-4">
                <img src={p.imageUrl || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'} alt={p.name} className="w-full h-36 object-cover rounded-xl" />
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white text-sm uppercase truncate max-w-[150px]">{p.name}</h3>
                  <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                </div>
                <p className="text-stone-400 text-[11px] min-h-[40px]">{p.description}</p>
                <button onClick={() => onAddToCart(p)} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Order Brew</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export function CafeCategoryLogin(props: CategoryLoginProps) {
  return <CategoryLoginTemplate {...props} niche="cafe" themeColor="#78350f" img="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600" desc="single-origin espresso selections, warm latte art, and fresh pastries in a cozy roastery." emoji="☕" />;
}

export function CafeCategoryDashboard(props: RestaurantDashboardProps) {
  return <CategoryDashboardTemplate {...props} niche="cafe" primaryColor="#78350f" accentBg="bg-amber-50 text-amber-800 border-amber-200" emoji="☕" metrics={[
    { title: 'Loyalty coffee beans active', value: '450 reward stars', desc: 'Supplement free double espressos' },
    { title: 'Brew stations live', value: '3 active bars', desc: 'Organic cold brews active on tap' },
    { title: 'Daily checkouts completed', value: '84 cafe orders', desc: 'Morning coffee rush completed' }
  ]} />;
}
