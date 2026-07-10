'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryProps, CategoryLoginProps, RestaurantDashboardProps, getThemeColors } from './types';
import { CategoryLoginTemplate } from './CategoryLoginTemplate';
import { CategoryDashboardTemplate } from './CategoryDashboardTemplate';

export function VeganCategory({
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
    bgAccent: 'bg-[#059669]',
    textAccent: 'text-[#059669]',
    hoverBgAccent: 'hover:bg-emerald-600',
    borderAccent: 'border-emerald-900',
    hoverBorderAccent: 'hover:border-emerald-500',
    selectionBg: 'selection:bg-[#059669]',
    btnBorderAccent: 'border-[#059669]',
    btnTextAccent: 'text-[#059669]',
    btnHoverBgAccent: 'hover:bg-[#059669]'
  };
  const colors = getThemeColors(themePreset, defaultTheme);

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
  ) : (
    <span className="text-3xl select-none">{logoIcon || '🥬'}</span>
  );
  const displayName = companyName || project.name.replace(" Site", "");
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&auto=format&fit=crop&q=80';
  const displayHeroTitle = heroTitle || 'Healthy Sourced Vegan Platter';
  const displayHeroSubtitle = heroSubtitle || 'Savor fresh avocado greens, organic quinoa salads, nutrient-loaded smoothie bowls, and clean allergen-free plant bowls sourced from local bio-farms.';

  return (
    <div className={`min-h-screen bg-[#050c08] text-[#ecfdf5] font-sans ${colors.selectionBg} selection:text-white`}>
      <nav className="border-b border-[#103b22] bg-[#050c08]/95 sticky top-0 z-50 px-6 py-4 flex items-center justify-between font-sans">
        <div className="flex items-center gap-3">
          {displayLogo}
          <div className="text-left font-sans">
            <span className="text-base font-black tracking-tight text-white block uppercase">{displayName}</span>
            <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest block mt-0.5`}>Organic Plant-Based Sourcing</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-stone-300">
          <a href="#menu" className={`hover:${colors.textAccent} transition`}>Salad Menu</a>
          <button onClick={() => setIsBookingModalOpen(true)} className={`hover:${colors.textAccent} transition bg-transparent border-none cursor-pointer uppercase text-xs font-bold`}>Book Table</button>
          {customerSession ? (
            <div className="flex items-center gap-4">
              <Link href={`/preview/${projectId}/dashboard`} className={`hover:${colors.textAccent} transition font-bold`}>Dashboard</Link>
              <button onClick={onLogout} className="text-stone-400 hover:text-rose-450 transition cursor-pointer border-none bg-transparent uppercase font-bold text-xs">Logout</button>
            </div>
          ) : (
            <Link href={`/preview/${projectId}/login`} className={`hover:${colors.textAccent} transition font-bold`}>Sign In</Link>
          )}
        </div>
      </nav>

      <section className="relative min-h-[75vh] flex items-center justify-center bg-cover bg-center text-center px-6"
               style={{ backgroundImage: `linear-gradient(to bottom, rgba(5, 12, 8, 0.65), rgba(5, 12, 8, 0.95)), url('${displayHeroImage}')` }}>
        <div className="max-w-2xl space-y-6">
          <span className={`text-xs uppercase tracking-widest ${colors.textAccent} font-black block`}>🥬 100% Plant-based Organic</span>
          <h1 className="text-4xl sm:text-6xl text-white font-black uppercase font-serif">{displayHeroTitle}</h1>
          <p className="text-emerald-100/70 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">{displayHeroSubtitle}</p>
          <div className="pt-2 flex justify-center gap-4 text-xs font-black uppercase">
            <a href="#menu" className={`px-8 py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl shadow-lg transition text-center border-none`}>Order Clean</a>
            <button onClick={() => setIsBookingModalOpen(true)} className={`px-8 py-3 bg-neutral-955 border border-emerald-900 hover:${colors.btnBorderAccent} text-white rounded-xl transition cursor-pointer`}>Reserve Seating</button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 max-w-7xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-2xl sm:text-3xl text-white font-black uppercase font-serif">Organic Nutrient Bowls & Cold Brew Juices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            ['Avocado Green Crunch', 'Organic Quinoa Salad Bowl', 'Acai Berry Smoothie Bowl', 'Cold Press Green Juice'].map((name, idx) => (
              <div key={idx} className="bg-[#0b1f15] border border-emerald-955/40 rounded-2xl overflow-hidden text-left p-5 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase">{name}</h3>
                <p className="text-emerald-200/40 text-[11px] min-h-[40px]">Fresh chemical-free veggies layered with bio-grown grains and clean oils.</p>
                <button onClick={() => alert('Register/Login to place orders!')} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Order Clean</button>
              </div>
            ))
          ) : (
            products.map((p) => (
              <div key={p.id} className="bg-[#0b1f15] border border-emerald-955/40 rounded-2xl overflow-hidden text-left p-5 space-y-4 font-sans">
                <img src={p.imageUrl || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'} alt={p.name} className="w-full h-36 object-cover rounded-xl" />
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white text-sm uppercase truncate max-w-[150px]">{p.name}</h3>
                  <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                </div>
                <p className="text-emerald-200/40 text-[11px] min-h-[40px]">{p.description}</p>
                <button onClick={() => onAddToCart(p)} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Order Clean</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export function VeganCategoryLogin(props: CategoryLoginProps) {
  return <CategoryLoginTemplate {...props} niche="vegan" themeColor="#059669" img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600" desc="100% plant-based organic bowls, pesticide-free fresh greens, and eco-friendly packaging." emoji="🥬" />;
}

export function VeganCategoryDashboard(props: RestaurantDashboardProps) {
  return <CategoryDashboardTemplate {...props} niche="vegan" primaryColor="#059669" accentBg="bg-emerald-50 text-emerald-700 border-emerald-100" emoji="🥬" metrics={[
    { title: 'Eco footprint save', value: '4.2 kg CO2 saved', desc: '100% zero-waste packaging loaded' },
    { title: 'Farm supply delivery', value: 'Organic farm sourcing active', desc: 'No chemical pesticides logged' },
    { title: 'Health checks completed', value: '18 nutritional logs active', desc: 'High protein avocado bowl is #1' }
  ]} />;
}
