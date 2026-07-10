'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryProps, CategoryLoginProps, RestaurantDashboardProps, getThemeColors } from './types';
import { CategoryLoginTemplate } from './CategoryLoginTemplate';
import { CategoryDashboardTemplate } from './CategoryDashboardTemplate';

export function GeneralCategory({
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
    bgAccent: 'bg-[#4f46e5]',
    textAccent: 'text-[#4f46e5]',
    hoverBgAccent: 'hover:bg-indigo-650',
    borderAccent: 'border-slate-800',
    hoverBorderAccent: 'hover:border-[#4f46e5]',
    selectionBg: 'selection:bg-[#4f46e5]',
    btnBorderAccent: 'border-[#4f46e5]',
    btnTextAccent: 'text-[#4f46e5]',
    btnHoverBgAccent: 'hover:bg-[#4f46e5]'
  };
  const colors = getThemeColors(themePreset, defaultTheme);

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
  ) : (
    <span className="text-3xl select-none">{logoIcon || '🍲'}</span>
  );
  const displayName = companyName || project.name.replace(" Site", "");
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&auto=format&fit=crop&q=80';
  const displayHeroTitle = heroTitle || 'A Culinary Dining Place';
  const displayHeroSubtitle = heroSubtitle || 'Explore high-quality plated chef selections, warm seasonal menu creations, and express online deliveries cooked to standard.';

  return (
    <div className={`min-h-screen bg-[#0d0e12] text-slate-100 font-sans ${colors.selectionBg} selection:text-white`}>
      <nav className="border-b border-slate-800 bg-[#0d0e12]/95 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {displayLogo}
          <div className="text-left font-sans">
            <span className="text-base font-black tracking-tight text-white block uppercase">{displayName}</span>
            <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest block mt-0.5`}>Gourmet Kitchen Storefront</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-stone-300">
          <a href="#menu" className={`hover:${colors.textAccent} transition`}>Menu</a>
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
               style={{ backgroundImage: `linear-gradient(to bottom, rgba(13, 14, 18, 0.65), rgba(13, 14, 18, 0.95)), url('${displayHeroImage}')` }}>
        <div className="max-w-2xl space-y-6 font-sans">
          <span className={`text-xs uppercase tracking-widest ${colors.textAccent} font-black block`}>🍲 Premium food service</span>
          <h1 className="text-4xl sm:text-6xl text-white font-black uppercase font-serif">{displayHeroTitle}</h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">{displayHeroSubtitle}</p>
          <div className="pt-2 flex justify-center gap-4 text-xs font-black uppercase">
            <a href="#menu" className={`px-8 py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl shadow-lg transition text-center border-none`}>Order Online</a>
            <button onClick={() => setIsBookingModalOpen(true)} className={`px-8 py-3 bg-neutral-900 border border-slate-700 hover:${colors.btnBorderAccent} text-white rounded-xl transition cursor-pointer`}>Book Table</button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 max-w-7xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-2xl sm:text-3xl text-white font-black uppercase font-serif">Signature Chef Creations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            ['Spicy Garlic Pasta', 'Loaded Garden Sub', 'Crispy Golden Tenders', 'Red Velvet Cupcake'].map((name, idx) => (
              <div key={idx} className="bg-[#121319] border border-slate-850 rounded-2xl overflow-hidden text-left p-5 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase">{name}</h3>
                <p className="text-slate-405 text-[11px] min-h-[40px]">Fresh plated chef selection prepared fresh and hot in our main kitchen.</p>
                <button onClick={() => alert('Register/Login to place orders!')} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Add to Order</button>
              </div>
            ))
          ) : (
            products.map((p) => (
              <div key={p.id} className="bg-[#121319] border border-slate-850 rounded-2xl overflow-hidden text-left p-5 space-y-4 font-sans">
                <img src={p.imageUrl || 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400'} alt={p.name} className="w-full h-36 object-cover rounded-xl" />
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white text-sm uppercase truncate max-w-[150px]">{p.name}</h3>
                  <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                </div>
                <p className="text-slate-400 text-[11px] min-h-[40px]">{p.description}</p>
                <button onClick={() => onAddToCart(p)} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Add to Order</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export function GeneralCategoryLogin(props: CategoryLoginProps) {
  return <CategoryLoginTemplate {...props} niche="general" themeColor="#4f46e5" img="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600" desc="exquisite chef recipes, real-time table reservations, and premium dine-in service." emoji="🍲" />;
}

export function GeneralCategoryDashboard(props: RestaurantDashboardProps) {
  return <CategoryDashboardTemplate {...props} niche="general" primaryColor="#4f46e5" accentBg="bg-indigo-50 text-indigo-700 border-indigo-100" emoji="🍲" metrics={[
    { title: 'Tables booked tonight', value: '14 tables reserved', desc: 'Peak dining hours active' },
    { title: 'Daily gourmet sales', value: '₹12,400', desc: 'Chef special is #1 seller' },
    { title: 'Kitchen delivery queue', value: '4 takeaways hot', desc: 'Avg. 10 mins preparational time' }
  ]} />;
}
