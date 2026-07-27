'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryProps, CategoryLoginProps, RestaurantDashboardProps, getThemeColors } from './types';
import { CategoryLoginTemplate } from './CategoryLoginTemplate';
import { CategoryDashboardTemplate } from './CategoryDashboardTemplate';

export function ChineseCategory({
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
    bgAccent: 'bg-[#dc2626]',
    textAccent: 'text-[#dc2626]',
    hoverBgAccent: 'hover:bg-red-700',
    borderAccent: 'border-red-955',
    hoverBorderAccent: 'hover:border-red-500',
    selectionBg: 'selection:bg-[#dc2626]',
    btnBorderAccent: 'border-[#dc2626]',
    btnTextAccent: 'text-[#dc2626]',
    btnHoverBgAccent: 'hover:bg-[#dc2626]'
  };
  const colors = getThemeColors(themePreset, defaultTheme);

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
  ) : (
    <span className="text-3xl select-none">{logoIcon || '🥢'}</span>
  );
  const displayName = companyName || project.name.replace(" Site", "");
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1600&auto=format&fit=crop&q=80';
  const displayHeroTitle = heroTitle || 'Sizzling Woks & Hot Dumplings';
  const displayHeroSubtitle = heroSubtitle || 'Feast on flame-fried hakka noodles, hot garlic soups, steamed crystal dim sums, and spicy Szechuan platters cooked fresh over iron woks.';

  return (
    <div className={`min-h-screen bg-[#110505] text-[#fecaca] font-sans ${colors.selectionBg} selection:text-white`}>
      <nav className="border-b border-[#3b0a0a] bg-[#110505]/95 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {displayLogo}
          <div className="text-left font-sans">
            <span className="text-base font-black tracking-tight text-white block uppercase">{displayName}</span>
            <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest block mt-0.5`}>Sizzling Woks & Dim Sums</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-stone-300">
          <a href="#menu" className={`hover:${colors.textAccent} transition`}>Wok Menu</a>
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
               style={{ backgroundImage: `linear-gradient(to bottom, rgba(17, 5, 5, 0.65), rgba(17, 5, 5, 0.95)), url('${displayHeroImage}')` }}>
        <div className="max-w-2xl space-y-6">
          <span className={`text-xs uppercase tracking-widest ${colors.textAccent} font-black block`}>🥢 Traditional Fire Cooking</span>
          <h1 className="text-4xl sm:text-6xl text-white font-black uppercase font-serif">{displayHeroTitle}</h1>
          <p className="text-red-100/70 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">{displayHeroSubtitle}</p>
          <div className="pt-2 flex justify-center gap-4 text-xs font-black uppercase">
            <a href="#menu" className={`px-8 py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl shadow-lg transition text-center border-none`}>Order Wok</a>
            <button onClick={() => setIsBookingModalOpen(true)} className={`px-8 py-3 bg-neutral-900 border border-red-900 hover:${colors.btnBorderAccent} text-white rounded-xl transition cursor-pointer`}>Reserve Seating</button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 max-w-7xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-2xl sm:text-3xl text-white font-black uppercase font-serif">Authentic Dim Sum Carts & Rice Platters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            ['Steamed Crystal Dim Sum', 'Fire Wok Hakka Noodles', 'Kung Pao Tofu Box', 'Hot Garlic Soup'].map((name, idx) => (
              <div key={idx} className="bg-[#1f0b0b] border border-red-955/40 rounded-2xl overflow-hidden text-left p-5 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase">{name}</h3>
                <p className="text-red-100/40 text-[11px] min-h-[40px]">Cooked instantly using high-heat woks, organic garlic, and Szechuan peppers.</p>
                <button onClick={() => alert('Register/Login to place orders!')} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Order Wok</button>
              </div>
            ))
          ) : (
            products.map((p) => (
              <div key={p.id} className="bg-[#1f0b0b] border border-red-955/40 rounded-2xl overflow-hidden text-left p-5 space-y-4 font-sans">
                <img src={p.imageUrl || 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400'} alt={p.name} className="w-full h-36 object-cover rounded-xl" />
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white text-sm uppercase truncate max-w-[150px]">{p.name}</h3>
                  <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                </div>
                <p className="text-red-100/40 text-[11px] min-h-[40px]">{p.description}</p>
                <button onClick={() => onAddToCart(p)} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Order Wok</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export function ChineseCategoryLogin(props: CategoryLoginProps) {
  return <CategoryLoginTemplate {...props} niche="chinese" themeColor="#dc2626" img="https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600" desc="authentic dim sum carts, sizzling iron wok cooking, and spicy Szechuan specialties." emoji="🥢" />;
}

export function ChineseCategoryDashboard(props: RestaurantDashboardProps) {
  return <CategoryDashboardTemplate {...props} niche="chinese" primaryColor="#dc2626" accentBg="bg-red-50 text-red-700 border-red-100" emoji="🥢" metrics={[
    { title: 'Wok stations firing', value: '4 iron woks active', desc: 'Steamer baskets prepped' },
    { title: 'Sourcing stock levels', value: 'Fresh garlic & ginger loaded', desc: 'Szechuan spices high' },
    { title: 'Steaming deliveries', value: '18 hot takeaways', desc: 'Avg. 9 mins quick chef wok time' }
  ]} />;
}
