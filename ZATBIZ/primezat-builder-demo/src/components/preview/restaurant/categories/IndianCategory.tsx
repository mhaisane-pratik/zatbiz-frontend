'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryProps, CategoryLoginProps, RestaurantDashboardProps, getThemeColors } from './types';
import { CategoryLoginTemplate } from './CategoryLoginTemplate';
import { CategoryDashboardTemplate } from './CategoryDashboardTemplate';

export function IndianCategory({
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
    bgAccent: 'bg-[#d97706]',
    textAccent: 'text-[#d97706]',
    hoverBgAccent: 'hover:bg-amber-700',
    borderAccent: 'border-amber-955',
    hoverBorderAccent: 'hover:border-amber-500',
    selectionBg: 'selection:bg-[#d97706]',
    btnBorderAccent: 'border-[#d97706]',
    btnTextAccent: 'text-[#d97706]',
    btnHoverBgAccent: 'hover:bg-[#d97706]'
  };
  const colors = getThemeColors(themePreset, defaultTheme);

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
  ) : (
    <span className="text-3xl select-none">{logoIcon || '🍛'}</span>
  );
  const displayName = companyName || project.name.replace(" Site", "");
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=1600&auto=format&fit=crop&q=80';
  const displayHeroTitle = heroTitle || 'Authentic Spiced Indian Cuisine';
  const displayHeroSubtitle = heroSubtitle || 'Savor the rich heritage of slow-simmered gravies, traditional charcoal tandoori roasts, and organic spices mixed to centuries-old royal formulas.';

  return (
    <div className={`min-h-screen bg-[#140b05] text-[#fef3c7] font-sans ${colors.selectionBg} selection:text-white`}>
      <nav className="border-b border-[#451a03] bg-[#140b05]/95 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {displayLogo}
          <div className="text-left font-sans">
            <span className="text-base font-black tracking-tight text-white block uppercase">{displayName}</span>
            <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest block mt-0.5`}>Authentic Royal Kitchens</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-stone-355 font-sans">
          <a href="#menu" className={`hover:${colors.textAccent} transition`}>Royal Menu</a>
          <button onClick={() => setIsBookingModalOpen(true)} className={`hover:${colors.textAccent} transition bg-transparent border-none cursor-pointer uppercase text-xs font-bold font-sans`}>Book Banquet</button>
          {customerSession ? (
            <div className="flex items-center gap-4">
              <Link href={`/preview/${projectId}/dashboard`} className={`hover:${colors.textAccent} transition font-bold font-sans`}>Dashboard</Link>
              <button onClick={onLogout} className="text-stone-400 hover:text-rose-400 transition cursor-pointer border-none bg-transparent uppercase font-bold text-xs font-sans">Logout</button>
            </div>
          ) : (
            <Link href={`/preview/${projectId}/login`} className={`hover:${colors.textAccent} transition font-bold font-sans`}>Sign In</Link>
          )}
        </div>
      </nav>

      <section className="relative min-h-[75vh] flex items-center justify-center bg-cover bg-center text-center px-6"
               style={{ backgroundImage: `linear-gradient(to bottom, rgba(20, 11, 5, 0.65), rgba(20, 11, 5, 0.95)), url('${displayHeroImage}')` }}>
        <div className="max-w-2xl space-y-6">
          <span className={`text-xs uppercase tracking-widest ${colors.textAccent} font-black block`}>🍛 Royal Tandoor Secrets</span>
          <h1 className="text-4xl sm:text-6xl text-white font-black uppercase">{displayHeroTitle}</h1>
          <p className="text-amber-100/70 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">{displayHeroSubtitle}</p>
          <div className="pt-2 flex justify-center gap-4 text-xs font-black uppercase font-sans">
            <a href="#menu" className={`px-8 py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl shadow-lg transition text-center border-none`}>Order Feast</a>
            <button onClick={() => setIsBookingModalOpen(true)} className={`px-8 py-3 bg-neutral-900 border border-amber-900 hover:${colors.btnBorderAccent} text-white rounded-xl transition cursor-pointer`}>Book Banquet</button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 max-w-7xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-2xl sm:text-3xl text-white font-black uppercase font-serif">Royal Curry & Clay Oven Specials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          {products.length === 0 ? (
            ['Butter Chicken Royale', 'Paneer Tikka Masala', 'Dum Biryani Feast', 'Garlic Butter Naan'].map((name, idx) => (
              <div key={idx} className="bg-[#1f1107] border border-amber-955/40 rounded-2xl overflow-hidden text-left p-5 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase">{name}</h3>
                <p className="text-amber-200/50 text-[11px] min-h-[40px]">Slow cooked using organic hand-ground spices and creamy local dairy.</p>
                <button onClick={() => alert('Register/Login to place orders!')} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer`}>Add to Feast</button>
              </div>
            ))
          ) : (
            products.map((p) => (
              <div key={p.id} className="bg-[#1f1107] border border-amber-955/40 rounded-2xl overflow-hidden text-left p-5 space-y-4">
                <img src={p.imageUrl || 'https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=400'} alt={p.name} className="w-full h-36 object-cover rounded-xl" />
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white text-sm uppercase truncate max-w-[150px]">{p.name}</h3>
                  <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                </div>
                <p className="text-amber-200/50 text-[11px] min-h-[40px]">{p.description}</p>
                <button onClick={() => onAddToCart(p)} className={`w-full py-2 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer font-sans`}>Add to Feast</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export function IndianCategoryLogin(props: CategoryLoginProps) {
  return <CategoryLoginTemplate {...props} niche="indian" themeColor="#d97706" img="https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=600" desc="slow-simmered tandoori specials, authentic hand-ground spice blends, and royal banquets." emoji="🍛" />;
}

export function IndianCategoryDashboard(props: RestaurantDashboardProps) {
  return <CategoryDashboardTemplate {...props} niche="indian" primaryColor="#d97706" accentBg="bg-amber-50 text-amber-700 border-amber-100" emoji="🍛" metrics={[
    { title: 'Tandoori queues tonight', value: '18 banquet tables', desc: 'Slow simmered gravies prep active' },
    { title: 'Spice Vault Levels', value: 'Premium Saffron loaded', desc: 'Cardamom & cinnamon high' },
    { title: 'Royal feast orders', value: '32 deliveries hot', desc: 'Avg. 22 mins delivery prep time' }
  ]} />;
}
