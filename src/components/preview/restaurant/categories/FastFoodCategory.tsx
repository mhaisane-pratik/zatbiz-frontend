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
  themePreset,
  restaurantInfo
}: CategoryProps) {
  const selectedHomepageLayout = restaurantInfo?.selectedHomepageLayout || 'menu-grid-focus';
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');

  const allDishes = dbProducts.length > 0 ? dbProducts : [
    { id: 201, name: 'Double Smash Burger', price: 299, description: 'Double flame-grilled beef smash patties, melted cheddar, house sauce, toasted brioche buns.', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600' },
    { id: 202, name: 'Crispy Tender Box', price: 249, description: 'Crispy buttermilk chicken tenders served with honey mustard sauce and classic fries.', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600' },
    { id: 203, name: 'Cheesy Loaded Fries', price: 189, description: 'Golden French fries topped with melted liquid cheese, jalapeños, and crispy onion bits.', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600' },
    { id: 204, name: 'Caramel Shake', price: 149, description: 'Rich double-blend vanilla ice cream shake drizzled with salted caramel fudge.', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600' }
  ];

  const filteredDishes = allDishes.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = (() => {
      if (activeCategory === 'All') return true;
      const name = p.name.toLowerCase();
      const desc = (p.description || '').toLowerCase();
      if (activeCategory === 'Burgers') return name.includes('burger') || name.includes('smash') || name.includes('patty');
      if (activeCategory === 'Sides') return name.includes('fries') || name.includes('tender') || name.includes('onion') || name.includes('wings') || desc.includes('fries') || desc.includes('tender');
      if (activeCategory === 'Drinks') return name.includes('shake') || name.includes('soda') || name.includes('beverage') || name.includes('cola') || name.includes('coke') || desc.includes('drink') || desc.includes('shake');
      return true;
    })();

    return matchesSearch && matchesCategory;
  });

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
          {selectedHomepageLayout === 'reservation-banner' ? (
            <div className="bg-[#14151b]/95 border border-orange-500/20 p-6 rounded-2xl max-w-lg mt-8 text-left space-y-4 font-sans backdrop-blur-md shadow-2xl">
              <h4 className="text-xs font-black uppercase tracking-wider text-orange-500 border-b border-zinc-800 pb-2">Table Booking Center</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Select Date</label>
                  <input type="date" className="w-full bg-[#1e202b] border border-slate-800 rounded-xl px-3 py-2 text-[10px] text-white outline-none focus:border-orange-500 transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Select Time</label>
                  <input type="time" className="w-full bg-[#1e202b] border border-slate-800 rounded-xl px-3 py-2 text-[10px] text-white outline-none focus:border-orange-500 transition" />
                </div>
              </div>
              <button onClick={() => setIsBookingModalOpen(true)} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition cursor-pointer border-none">
                Select Table & Reserve Seating
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* Dynamic Layout Sections */}
      {selectedHomepageLayout === 'chef-specials' && (
        <section className="py-16 bg-[#0e0f14] border-b border-orange-500/5 px-6 sm:px-12 max-w-7xl mx-auto space-y-8">
          <div className="space-y-1.5 text-left">
            <span className="text-xs uppercase tracking-wider text-orange-500 font-black">Signature Combos</span>
            <h2 className="text-2xl sm:text-3xl text-white font-black uppercase">Chef's Signature Craves</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left font-sans">
            <div className="bg-[#14151b] border border-orange-500/10 rounded-2xl overflow-hidden flex flex-col sm:flex-row">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" alt="Plated Burger" className="w-full sm:w-44 h-44 object-cover" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] bg-orange-500/15 text-orange-400 px-2 py-0.5 font-bold uppercase tracking-widest rounded-full">Best Seller</span>
                  <h4 className="text-white text-sm font-extrabold uppercase mt-2">The Monster Beef Combo</h4>
                  <p className="text-slate-400 text-[10px] mt-2 leading-relaxed">Double prime beef patties, extra melted cheddar, loaded crispy fries, and a regular vanilla shake.</p>
                </div>
                <span className="text-xs text-orange-500 font-black mt-4">₹489</span>
              </div>
            </div>
            <div className="bg-[#14151b] border border-orange-500/10 rounded-2xl overflow-hidden flex flex-col sm:flex-row">
              <img src="https://images.unsplash.com/photo-1562967914-608f82629710?w=400" alt="Crispy Box" className="w-full sm:w-44 h-44 object-cover" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] bg-orange-500/15 text-orange-400 px-2 py-0.5 font-bold uppercase tracking-widest rounded-full">New Combo</span>
                  <h4 className="text-white text-sm font-extrabold uppercase mt-2">Crispy Crunch Bucket</h4>
                  <p className="text-slate-400 text-[10px] mt-2 leading-relaxed">4 pieces crispy tenders, large spiced potato wedges, classic garlic dip, and cold beverage.</p>
                </div>
                <span className="text-xs text-orange-500 font-black mt-4">₹379</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedHomepageLayout === 'gallery-carousel' && (
        <section className="py-16 bg-[#0e0f14] border-b border-orange-500/5 px-6 sm:px-12 max-w-7xl mx-auto space-y-8 text-center">
          <div className="space-y-1.5 text-left">
            <span className="text-xs uppercase tracking-wider text-orange-500 font-black">Food Stream</span>
            <h2 className="text-2xl sm:text-3xl text-white font-black uppercase">Our Kitchen Photo Carousel</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
              'https://images.unsplash.com/photo-1562967914-608f82629710?w=400',
              'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
              'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'
            ].map((url, i) => (
              <div key={i} className="overflow-hidden border border-slate-800 rounded-2xl aspect-square">
                <img src={url} alt="Fast Food" className="w-full h-full object-cover hover:scale-105 transition duration-500 filter brightness-95 hover:brightness-100" />
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedHomepageLayout === 'map-timings' && (
        <section className="py-16 bg-[#0e0f14] border-b border-orange-500/5 px-6 sm:px-12 max-w-4xl mx-auto space-y-8 font-sans">
          <div className="bg-[#14151b] border border-orange-500/10 p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] text-orange-500 font-black uppercase tracking-widest">Fast Delivery Hub</span>
              <h3 className="text-xl font-extrabold text-white uppercase">Locator & Timings</h3>
              <p className="text-slate-400 text-xs leading-relaxed">24 Express Street, Commercial Block, Noida, UP - 201301</p>
              <div className="text-xs text-slate-300 space-y-1 mt-4">
                <p><strong>Open Daily:</strong> 11:00 AM - Midnight</p>
                <p><strong>Midnight Delivery:</strong> Fri - Sat: 12:00 AM - 3:00 AM</p>
              </div>
            </div>
            <div className="h-44 bg-zinc-950 border border-orange-500/10 flex flex-col items-center justify-center text-slate-500 rounded-2xl relative">
              <span className="text-2xl">🗺️</span>
              <span className="text-[9px] uppercase font-black tracking-widest text-orange-500 mt-2">[Interactive Google Map]</span>
            </div>
          </div>
        </section>
      )}

      {/* Filterable Menu Section */}
      <section id="menu" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1.5">
            <span className={`text-xs uppercase tracking-wider ${colors.textAccent} font-black`}>Fresh & Fast</span>
            <h2 className="text-2xl sm:text-3xl text-white font-black uppercase">Our Crave-Worthy Menu</h2>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center font-sans">
            {/* Search */}
            <div className="relative w-full sm:w-60 flex items-center bg-neutral-900 border border-slate-800 rounded-xl px-3">
              <span className="material-symbols-outlined text-slate-500 text-base select-none">search</span>
              <input 
                type="text"
                placeholder="Search burger, side..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white p-2.5 w-full font-sans"
              />
            </div>
            
            {/* Category tabs */}
            <div className="flex gap-1.5 bg-neutral-950 border border-slate-900 p-1 rounded-xl text-[10px] font-black uppercase tracking-wider">
              {['All', 'Burgers', 'Sides', 'Drinks'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer border-none ${activeCategory === cat ? `${colors.bgAccent} text-white font-extrabold` : 'text-slate-400 bg-transparent hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDishes.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-500 font-sans space-y-2">
              <span className="material-symbols-outlined text-4xl select-none">sentiment_dissatisfied</span>
              <p className="text-xs font-bold uppercase tracking-wider">No food items match your criteria</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} 
                className={`text-xs underline ${colors.textAccent} bg-transparent border-0 cursor-pointer`}
              >
                Reset menu filter
              </button>
            </div>
          ) : (
            filteredDishes.map((p) => {
              const isSpicy = p.name.toLowerCase().includes('tender') || p.name.toLowerCase().includes('smash');
              
              return (
                <div key={p.id} className="bg-[#14151b] border border-slate-900 rounded-3xl p-5 space-y-4 flex flex-col justify-between hover:border-orange-500/20 transition duration-300">
                  <div className="space-y-4">
                    <div className="relative">
                      <img src={p.imageUrl || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'} alt={p.name} className="w-full h-36 object-cover rounded-2xl filter brightness-95" />
                      {isSpicy && (
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-orange-600/10 border border-orange-500/20 text-orange-500 text-[8px] font-black uppercase tracking-wider">
                          🔥 Spicy
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-baseline font-sans">
                      <h3 className="font-extrabold text-white text-sm uppercase truncate max-w-[150px]">{p.name}</h3>
                      <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] min-h-[40px] leading-relaxed font-sans">{p.description}</p>
                  </div>
                  <button 
                    onClick={() => onAddToCart(p as any)} 
                    className={`w-full py-3 bg-transparent border ${colors.btnBorderAccent} hover:${colors.btnHoverBgAccent} hover:text-white ${colors.btnTextAccent} font-bold text-[10px] uppercase rounded-xl transition cursor-pointer mt-4`}
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Diner Testimonials */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 border-t border-slate-900 text-center">
        <div className="space-y-2">
          <span className={`text-xs uppercase tracking-wider ${colors.textAccent} font-black`}>Patrons Feedback</span>
          <h2 className="text-2xl sm:text-3xl text-white font-black uppercase">What Our Diners Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "The smash burgers are legendary! Perfect crispy edges and melts in your mouth. Best fries in town hands down.", author: "Jake T.", role: "Regular Diner", rating: 5 },
            { quote: "Super-fast delivery and the tenders were still crispy when they arrived. My kids love their honey mustard sauce.", author: "Sarah L.", role: "Local Diner", rating: 5 },
            { quote: "Excellent value combos. Double Smash deal satisfies my midnight cravings perfectly. Five stars!", author: "Vikram R.", role: "Night Owl Foodie", rating: 5 }
          ].map((t, idx) => (
            <div key={idx} className="bg-[#14151b] border border-slate-900 rounded-3xl p-6 text-left space-y-4 flex flex-col justify-between hover:border-orange-500/10 transition">
              <div className="space-y-3">
                <div className="flex gap-0.5 text-xs text-orange-500">
                  {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-slate-300 text-xs italic">"{t.quote}"</p>
              </div>
              <div className="border-t border-slate-850 pt-3 flex justify-between items-center text-[10px] mt-4 font-sans font-bold">
                <div>
                  <h4 className="text-white text-xs font-black uppercase">{t.author}</h4>
                  <p className={`${colors.textAccent} text-[8px] uppercase mt-0.5`}>{t.role}</p>
                </div>
                <span className="text-slate-500 font-extrabold uppercase text-[8px]">Verified</span>
              </div>
            </div>
          ))}
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
