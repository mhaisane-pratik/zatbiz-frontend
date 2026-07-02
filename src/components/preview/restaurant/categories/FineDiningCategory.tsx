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
  themePreset,
  restaurantInfo
}: CategoryProps) {
  const selectedHomepageLayout = restaurantInfo?.selectedHomepageLayout || 'menu-grid-focus';
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeDiet, setActiveDiet] = React.useState('All');

  const getDishBadge = (p: any) => {
    const name = p.name.toLowerCase();
    const desc = (p.description || '').toLowerCase();
    if (name.includes('wagyu') || name.includes('truffle') || name.includes('soufflé') || p.price > 400) {
      return { text: '⭐ Chef Special', style: 'bg-amber-500/10 text-amber-400 border-amber-500/20 border' };
    }
    if (name.includes('vegan') || name.includes('veg') || name.includes('salad') || desc.includes('vegetarian')) {
      return { text: '🌿 Veg', style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border' };
    }
    return { text: '⚜️ Fine Dining', style: 'bg-zinc-800/40 text-zinc-400 border-zinc-700/30 border' };
  };

  const allDishes = dbProducts.length > 0 ? dbProducts : [
    { id: 101, name: 'Truffle Butter Tagliatelle', price: 650, description: 'Artisanal hand-rolled pasta, imported black winter truffles, aged Parmigiano-Reggiano, and cultured butter.', imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600' },
    { id: 102, name: 'Pan-Seared Sea Bass', price: 950, description: 'Wild-caught sea bass, heirloom baby carrots, saffron-infused champagne emulsion, and fresh dill oil.', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600' },
    { id: 103, name: 'Wagyu Beef Tenderloin', price: 1850, description: 'A5 grade Miyazaki Wagyu, wood-fire roasted marrow, charred pearl onions, and red wine reduction.', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600' },
    { id: 104, name: 'Grand Soufflé', price: 450, description: 'Madagascar vanilla bean soufflé, warm dark chocolate ganache, and gold leaf garnish.', imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600' }
  ];

  const filteredDishes = allDishes.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = (() => {
      if (activeCategory === 'All') return true;
      const desc = (p.description || '').toLowerCase();
      const name = p.name.toLowerCase();
      if (activeCategory === 'Appetizers') return name.includes('salad') || name.includes('soup') || name.includes('tartare') || name.includes('carpaccio') || desc.includes('starter') || desc.includes('appetizer');
      if (activeCategory === 'Mains') return name.includes('wagyu') || name.includes('steak') || name.includes('fish') || name.includes('bass') || name.includes('pasta') || name.includes('tenderloin') || desc.includes('main');
      if (activeCategory === 'Desserts') return name.includes('soufflé') || name.includes('cake') || name.includes('chocolate') || name.includes('tart') || desc.includes('dessert') || desc.includes('sweet');
      return true;
    })();

    const matchesDiet = (() => {
      if (activeDiet === 'All') return true;
      const desc = (p.description || '').toLowerCase();
      const name = p.name.toLowerCase();
      const isVeg = name.includes('vegan') || name.includes('veg') || name.includes('salad') || name.includes('tagliatelle') || desc.includes('vegetarian') || desc.includes('plant-based');
      if (activeDiet === 'Veg') return isVeg;
      if (activeDiet === 'Special') return name.includes('wagyu') || name.includes('truffle') || name.includes('soufflé') || name.includes('bass') || p.price > 500;
      return true;
    })();

    return matchesSearch && matchesCategory && matchesDiet;
  });

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
          {selectedHomepageLayout === 'reservation-banner' ? (
            <div className="bg-[#111217]/90 border border-[#c5a880]/20 p-6 rounded-none max-w-lg mx-auto mt-8 text-left space-y-4 font-sans backdrop-blur-md shadow-2xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#c5a880] border-b border-zinc-850 pb-2">Table Booking Center</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-extrabold text-stone-400 uppercase tracking-wider">Dining Date</label>
                  <input type="date" className="w-full bg-[#181920] border border-zinc-850 rounded-none px-3 py-2 text-[10px] text-white outline-none focus:border-[#c5a880] transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-extrabold text-stone-400 uppercase tracking-wider">Preferred Time</label>
                  <input type="time" className="w-full bg-[#181920] border border-zinc-850 rounded-none px-3 py-2 text-[10px] text-white outline-none focus:border-[#c5a880] transition" />
                </div>
              </div>
              <button onClick={() => setIsBookingModalOpen(true)} className="w-full py-3 bg-[#c5a880] hover:bg-[#d8c2a3] text-black text-[10px] font-black uppercase tracking-widest transition cursor-pointer border-none">
                Select Table & Reserve Seating
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* Dynamic Layout Sections */}
      {selectedHomepageLayout === 'chef-specials' && (
        <section className="py-20 bg-zinc-950/40 border-b border-zinc-900/60 px-6 sm:px-12 text-center max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-black font-sans block">Gastronomy Spotlight</span>
            <h2 className="text-2xl sm:text-3xl text-white font-extrabold uppercase font-serif">Chef's Signature Selections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left font-sans">
            <div className="bg-[#111217] border border-[#2a2c35]/20 overflow-hidden flex flex-col sm:flex-row">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400" alt="Plated Steak" className="w-full sm:w-44 h-48 object-cover" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] bg-[#c5a880]/15 text-[#c5a880] px-2 py-0.5 font-bold uppercase tracking-widest">Sommelier Choice</span>
                  <h4 className="text-white text-sm font-extrabold uppercase mt-2 font-serif">Dry Aged Wagyu Ribeye</h4>
                  <p className="text-stone-400 text-[10px] mt-2 leading-relaxed">Served with truffle-infused potato puree, roasted seasonal wild mushrooms, and a rich barolo wine reduction.</p>
                </div>
                <span className="text-xs text-[#c5a880] font-black mt-4">₹2,850</span>
              </div>
            </div>
            <div className="bg-[#111217] border border-[#2a2c35]/20 overflow-hidden flex flex-col sm:flex-row">
              <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400" alt="Gourmet Salad" className="w-full sm:w-44 h-48 object-cover" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 font-bold uppercase tracking-widest">Organic Pure</span>
                  <h4 className="text-white text-sm font-extrabold uppercase mt-2 font-serif">Maine Lobster Medallions</h4>
                  <p className="text-stone-400 text-[10px] mt-2 leading-relaxed">Sautéd in garlic brown butter, set on organic heirloom tomatoes, with basil pesto and microgreens.</p>
                </div>
                <span className="text-xs text-[#c5a880] font-black mt-4">₹1,950</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedHomepageLayout === 'gallery-carousel' && (
        <section className="py-20 bg-zinc-950/40 border-b border-zinc-900/60 px-6 sm:px-12 text-center max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-black font-sans block">Visual Photo Stream</span>
            <h2 className="text-2xl sm:text-3xl text-white font-extrabold uppercase font-serif">Dining Room & Atmos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
              'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400',
              'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
              'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400'
            ].map((url, i) => (
              <div key={i} className="overflow-hidden border border-zinc-900 aspect-square">
                <img src={url} alt="Dining" className="w-full h-full object-cover hover:scale-105 transition duration-500 filter brightness-90 hover:brightness-100" />
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedHomepageLayout === 'map-timings' && (
        <section className="py-20 bg-zinc-950/40 border-b border-zinc-900/60 px-6 sm:px-12 text-center max-w-4xl mx-auto space-y-12 font-sans">
          <div className="bg-[#111217] border border-[#2a2c35]/20 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] text-[#c5a880] font-black uppercase tracking-widest">Le Sommet Haute Cuisine</span>
              <h3 className="text-xl font-extrabold text-white uppercase font-serif">Hours & Location</h3>
              <p className="text-stone-400 text-xs leading-relaxed">12 Gourmet Blvd, Culinary District, Noida, UP - 201301</p>
              <div className="text-xs text-stone-300 space-y-1 mt-4">
                <p><strong>Lunch:</strong> Wed - Sun: 12:00 PM - 3:00 PM</p>
                <p><strong>Dinner:</strong> Daily: 6:00 PM - 11:30 PM</p>
              </div>
            </div>
            <div className="h-48 bg-zinc-950 border border-[#2a2c35]/20 flex flex-col items-center justify-center text-stone-500 rounded-none relative">
              <span className="text-2xl">🗺️</span>
              <span className="text-[9px] uppercase font-black tracking-widest text-[#c5a880] mt-2">[Interactive Google Map]</span>
            </div>
          </div>
        </section>
      )}

      {/* Signature Plated Dishes */}
      <section id="menu" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 text-center">
        <div className="space-y-3">
          <span className={`text-xs uppercase tracking-widest ${colors.textAccent} font-black font-sans`}>A Culinary Journey</span>
          <h2 className="text-3xl sm:text-4xl text-white font-extrabold uppercase font-serif">Tonight's Curated Plates</h2>
          <p className="text-stone-400 text-xs max-w-md mx-auto font-sans">Savor our chef's seasonal degustation selections prepared with artisanal craftsmanship.</p>
        </div>

        {/* Filters and Search Control panel */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#111217] border border-zinc-850 p-5 rounded-2xl max-w-4xl mx-auto font-sans">
          
          {/* Search */}
          <div className="relative w-full md:w-72 flex items-center bg-zinc-950 rounded-xl px-3 border border-zinc-800">
            <span className="material-symbols-outlined text-zinc-500 text-base select-none">search</span>
            <input 
              type="text"
              placeholder="Search course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-white p-2.5 w-full"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-wider">
            {['All', 'Appetizers', 'Mains', 'Desserts'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-lg transition duration-200 cursor-pointer border-0 ${activeCategory === cat ? `${colors.bgAccent} text-black font-extrabold` : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Diet filter pills */}
          <div className="flex gap-2 text-[10px] font-black uppercase tracking-wider">
            {['All', 'Veg', 'Special'].map((diet) => (
              <button
                key={diet}
                type="button"
                onClick={() => setActiveDiet(diet)}
                className={`px-3 py-1.5 rounded-full border transition duration-200 cursor-pointer ${
                  activeDiet === diet 
                    ? `bg-zinc-850 text-white ${colors.btnBorderAccent}` 
                    : 'border-zinc-800 bg-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {diet === 'Veg' ? '🌿 Veg' : diet === 'Special' ? '⭐ Specials' : 'All Diet'}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDishes.length === 0 ? (
            <div className="col-span-full py-16 text-center text-stone-500 font-sans space-y-2">
              <span className="material-symbols-outlined text-4xl select-none">sentiment_dissatisfied</span>
              <p className="text-xs font-bold uppercase tracking-wider">No signature dishes match your selection</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveDiet('All'); }} 
                className={`text-xs underline ${colors.textAccent} bg-transparent border-0 cursor-pointer`}
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredDishes.map((p, idx) => {
              const badge = getDishBadge(p);
              return (
                <div key={p.id} className="bg-[#111217] border border-[#2a2c35]/20 rounded-none p-6 space-y-4 text-left hover:border-[#c5a880]/30 transition duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={`text-[8px] px-2 py-0.5 rounded ${badge.style} font-black uppercase tracking-widest font-sans`}>
                        {badge.text}
                      </span>
                      <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest font-sans`}>Course {idx + 1}</span>
                    </div>
                    <img 
                      src={p.imageUrl || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400'} 
                      alt={p.name} 
                      className="w-full h-36 object-cover rounded-none filter brightness-90 hover:brightness-100 transition duration-300" 
                    />
                    <div className="flex justify-between items-baseline font-sans">
                      <h3 className="font-extrabold text-white text-sm uppercase truncate max-w-[150px] font-serif">{p.name}</h3>
                      <span className={`text-xs font-black ${colors.textAccent}`}>₹{p.price}</span>
                    </div>
                    <p className="text-stone-400 text-[11px] min-h-[40px] font-sans leading-relaxed">{p.description}</p>
                  </div>
                  <button 
                    onClick={() => onAddToCart(p as any)} 
                    className={`w-full py-2.5 bg-transparent border border-stone-850 hover:border-[#c5a880] ${colors.textAccent} font-bold text-[9px] uppercase tracking-widest transition cursor-pointer font-sans mt-4`}
                    type="button"
                  >
                    Reserve Plate
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Guest Reviews / Patrons Testimonials Slider */}
      <section className="py-24 border-t border-zinc-900/60 bg-zinc-950/20 px-6 sm:px-12 text-center max-w-7xl mx-auto space-y-16">
        <div className="space-y-3">
          <span className={`text-xs uppercase tracking-widest ${colors.textAccent} font-black font-sans`}>Diner Stories</span>
          <h2 className="text-3xl sm:text-4xl text-white font-extrabold uppercase font-serif">Patrons' Experiences</h2>
          <p className="text-stone-400 text-xs max-w-md mx-auto font-sans">Sincere impressions from critics and our most distinguished guests.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { quote: "The Wagyu beef tenderloin was prepared to absolute perfection. An unforgettable culinary journey with masterclass sommelier pairings.", author: "Sophia V.", role: "Michelin Guide Reviewer", rating: 5 },
            { quote: "Quiet luxury defined. The service is impeccable, and the truffles are generously shaved at your table. A sanctuary of taste.", author: "Marcus K.", role: "Connoisseur Patron", rating: 5 },
            { quote: "Haute cuisine at its highest standard. The Grand Soufflé alone is worth a reservation weeks in advance. Sublime.", author: "Elena D.", role: "Gourmet Critic", rating: 5 }
          ].map((t, idx) => (
            <div key={idx} className="bg-[#111217] border border-[#2a2c35]/20 p-8 text-left space-y-4 hover:border-[#c5a880]/30 transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-[#c5a880] text-xs">★</span>
                  ))}
                </div>
                <p className="text-stone-300 text-xs italic font-serif leading-relaxed">"{t.quote}"</p>
              </div>
              <div className="border-t border-stone-850 pt-4 flex items-center justify-between font-sans mt-6">
                <div>
                  <h4 className="text-white text-xs font-black uppercase">{t.author}</h4>
                  <p className={`text-[9px] ${colors.textAccent} font-bold tracking-wider mt-0.5`}>{t.role}</p>
                </div>
                <span className="text-[10px] text-zinc-600 font-extrabold uppercase">Verified</span>
              </div>
            </div>
          ))}
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
