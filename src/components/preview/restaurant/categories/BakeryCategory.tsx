'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryProps, CategoryLoginProps, RestaurantDashboardProps, getThemeColors } from './types';
import { CategoryLoginTemplate } from './CategoryLoginTemplate';
import { CategoryDashboardTemplate } from './CategoryDashboardTemplate';

export function BakeryCategory({
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
    bgAccent: 'bg-[#db2777]',
    textAccent: 'text-[#db2777]',
    hoverBgAccent: 'hover:bg-pink-650',
    borderAccent: 'border-pink-900',
    hoverBorderAccent: 'hover:border-pink-500',
    selectionBg: 'selection:bg-[#db2777]',
    btnBorderAccent: 'border-[#db2777]',
    btnTextAccent: 'text-[#db2777]',
    btnHoverBgAccent: 'hover:bg-[#db2777]'
  };
  const colors = getThemeColors(themePreset, defaultTheme);

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
  ) : (
    <span className="text-3xl select-none">{logoIcon || '🍰'}</span>
  );
  const displayName = companyName || project.name.replace(" Site", "");
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&auto=format&fit=crop&q=80';
  const displayHeroTitle = heroTitle || 'Designer Cakes & Pastries';
  const displayHeroSubtitle = heroSubtitle || 'Indulge in sweet velvet layers, fresh fruit tarts, warm morning sourdoughs, and designer celebration cakes crafted to order by hand.';

  return (
    <div className={`min-h-screen bg-[#171415] text-[#fdf4f5] font-sans ${colors.selectionBg} selection:text-white`}>
      <nav className="border-b border-[#3d2731] bg-[#171415]/95 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {displayLogo}
          <div className="text-left font-sans">
            <span className="text-base font-black tracking-tight text-white block uppercase">{displayName}</span>
            <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest block mt-0.5`}>Bespoke Designer Cakes</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-stone-300">
          <a href="#menu" className={`hover:${colors.textAccent} transition`}>Cake Menu</a>
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
               style={{ backgroundImage: `linear-gradient(to bottom, rgba(23, 20, 21, 0.5), rgba(23, 20, 21, 0.95)), url('${displayHeroImage}')` }}>
        <div className="max-w-2xl space-y-6">
          <span className={`text-xs uppercase tracking-widest ${colors.textAccent} font-black block`}>🍰 Baked Fresh Daily</span>
          <h1 className="text-4xl sm:text-6xl text-white font-black uppercase">{displayHeroTitle}</h1>
          <p className="text-[#fbcfe8]/70 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-medium">{displayHeroSubtitle}</p>
          <div className="pt-2 flex justify-center gap-4 text-xs font-black uppercase">
            <a href="#menu" className={`px-8 py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl shadow-lg transition text-center border-none`}>Order Cakes</a>
            <button onClick={() => setIsBookingModalOpen(true)} className={`px-8 py-3 bg-neutral-900 border border-pink-900 hover:${colors.btnBorderAccent} text-white rounded-xl transition cursor-pointer`}>Reserve Seating</button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 max-w-7xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-2xl sm:text-3xl text-white font-black uppercase font-serif">Fresh Confectionery & Pastry Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            ['Red Velvet Cake Slice', 'Belgian Chocolate Macarons', 'Warm Sourdough Loaf', 'Fresh Strawberry Tart'].map((name, idx) => (
              <div key={idx} className="bg-[#241b1f] border border-pink-955/30 rounded-2xl overflow-hidden text-left p-5 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase">{name}</h3>
                <p className="text-pink-100/40 text-[11px] min-h-[40px]">Handmade from organic French butter and single-origin chocolates.</p>
                <button onClick={() => alert('Register/Login to place orders!')} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Order Slice</button>
              </div>
            ))
          ) : (
            products.map((p) => (
              <div key={p.id} className="bg-[#241b1f] border border-pink-955/30 rounded-2xl overflow-hidden text-left p-5 space-y-4">
                <img src={p.imageUrl || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'} alt={p.name} className="w-full h-36 object-cover rounded-xl" />
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white text-sm uppercase truncate max-w-[150px]">{p.name}</h3>
                  <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                </div>
                <p className="text-pink-100/40 text-[11px] min-h-[40px]">{p.description}</p>
                <button onClick={() => onAddToCart(p)} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Order Slice</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export function BakeryCategoryLogin(props: CategoryLoginProps) {
  return <CategoryLoginTemplate {...props} niche="bakery" themeColor="#db2777" img="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600" desc="custom celebration cakes, warm artisanal sourdough, and gourmet pastries baked daily." emoji="🍰" />;
}

export function BakeryCategoryDashboard(props: RestaurantDashboardProps) {
  return <CategoryDashboardTemplate {...props} niche="bakery" primaryColor="#db2777" accentBg="bg-pink-50 text-pink-700 border-pink-100" emoji="🍰" metrics={[
    { title: 'Bespoke custom cakes', value: '4 designer cakes today', desc: '8 anniversary orders baking' },
    { title: 'Fresh Sourdough batch', value: '25 loaves warm', desc: 'Oven stock levels normal' },
    { title: 'Bakery deliveries', value: '14 pick-ups pending', desc: 'Packaged in custom designer boxes' }
  ]} />;
}
