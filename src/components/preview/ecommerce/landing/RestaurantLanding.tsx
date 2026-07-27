'use client';
import React, { useState } from 'react';

export default function Landing({
  projectId,
  projectConfig,
  products = [],
  onProductClick,
  cart = [],
  handleAddToCart,
  activeView,
  setActiveView,
  handleToggleWishlist,
  wishlist = [],
  handleCheckout
}: any) {
  const primaryColor = projectConfig?.themeColor || '#ea580c';
  const logoIcon = projectConfig?.logoIcon || '🍔';
  const companyName = projectConfig?.projectName || 'GourmetBite';
  const slogan = projectConfig?.slogan || 'Exquisite Handcrafted Gourmet Dishes & Refreshing Delicacies';

  const [currentSubPage, setCurrentSubPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-950 text-stone-150 selection:bg-orange-600 selection:text-white">
      {/* Announcement Bar */}
      <div className="py-2.5 text-center text-[10px] font-black tracking-widest text-stone-950 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 uppercase">
        ✦ Gourmet Bistro - Live Kitchen Online Orders // Delivery in Under 40 Mins ✦
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-orange-500/10 bg-stone-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSubPage('home')}>
            <span className="text-3xl p-1 bg-orange-500/10 border border-orange-500/20 rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.15)]">{logoIcon}</span>
            <div>
              <h1 className="text-sm font-black tracking-widest text-orange-400 uppercase">{companyName}</h1>
              <p className="text-[7px] text-stone-500 font-bold uppercase tracking-widest">Gourmet Kitchen</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            <button onClick={() => setCurrentSubPage('home')} className={`hover:text-orange-400 transition ${currentSubPage === 'home' ? 'text-orange-400 border-b border-orange-550 pb-1' : ''}`}>Menu Card</button>
            <button onClick={() => setCurrentSubPage('about')} className={`hover:text-orange-400 transition ${currentSubPage === 'about' ? 'text-orange-400 border-b border-orange-550 pb-1' : ''}`}>Bistro Story</button>
            <button onClick={() => setCurrentSubPage('contact')} className={`hover:text-orange-400 transition ${currentSubPage === 'contact' ? 'text-orange-400 border-b border-orange-550 pb-1' : ''}`}>Reservations</button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('login')}
              className="px-4 py-1.5 bg-stone-900 border border-orange-500/25 text-stone-355 hover:text-white rounded-full text-[9px] font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white rounded-full transition cursor-pointer hover:opacity-90 shadow-md font-black"
              style={{ backgroundColor: primaryColor }}
            >
              Workspace
            </button>
          </div>
        </div>
      </header>

      {/* Main Pages Content */}
      <main className="flex-grow">
        {currentSubPage === 'home' && (
          <div className="pb-24">
            {/* Hero Section */}
            <section 
              className="relative py-24 px-6 text-center border-b border-orange-500/10 bg-stone-900/10 bg-cover bg-center"
              style={projectConfig?.bannerUrl ? { backgroundImage: `url(${projectConfig.bannerUrl})` } : {}}
            >
              {projectConfig?.bannerUrl ? (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-0" />
              ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-orange-500/5 blur-[80px]" />
              )}
              
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-orange-550/30 text-[9px] font-bold uppercase tracking-widest text-orange-400 bg-orange-950/20">
                  CULINARY MASTERPIECES
                </span>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white uppercase">
                  {slogan}
                </h2>
                <p className="text-xs text-stone-400 font-medium leading-relaxed max-w-xl mx-auto">
                  Artisanal stone-baked pizzas, flame-grilled beef burgers, organic culinary salads, and custom beverages prepared by award-winning chefs.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-stone-950 rounded-full text-xs font-black uppercase tracking-widest transition shadow-[0_0_15px_rgba(234,88,12,0.15)] cursor-pointer"
                  >
                    View Gourmet Menu
                  </button>
                </div>
              </div>
            </section>

            {/* Catalog Grid */}
            <section id="catalog" className="max-w-6xl mx-auto px-6 pt-16 space-y-8">
              <div className="flex justify-between items-end border-b border-orange-500/10 pb-4">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-orange-500">// ONLINE DIGITAL MENU</h3>
                  <h2 className="text-xl font-serif text-white">Bistro Delicacies</h2>
                </div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{products.length} Dishes Online</span>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20 bg-stone-900/30 rounded-3xl border border-orange-550/15">
                  <p className="text-xs text-orange-400 font-bold uppercase tracking-widest">BISTRO_WARN: KITCHEN_OFFLINE</p>
                  <p className="text-[10px] text-stone-500 mt-1 uppercase tracking-widest">Connect workspace to list chef menu catalog.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((p: any) => (
                    <div 
                      key={p.id} 
                      className="group flex flex-col justify-between cursor-pointer bg-stone-900/40 border border-stone-800 rounded-3xl p-5 hover:border-orange-400/40 transition duration-300 relative shadow-lg"
                      onClick={() => onProductClick && onProductClick(p)}
                    >
                      <div className="space-y-4">
                        <div className="aspect-video w-full overflow-hidden bg-stone-950 rounded-2xl relative border border-stone-850">
                          <img 
                            src={p.imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" 
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist && handleToggleWishlist(p.id);
                            }}
                            className="absolute top-3 right-3 bg-stone-955 border border-stone-800 hover:border-orange-400 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
                          >
                            <span className="text-xs">{wishlist.includes(p.id) ? '❤️' : '🖤'}</span>
                          </button>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-bold text-orange-400">
                            <span className="uppercase tracking-widest">{p.category || 'Kitchen Master'}</span>
                            <span className="bg-orange-950/20 px-2 py-0.5 rounded border border-orange-500/20 text-orange-350">₹{p.price}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-tight truncate pt-1">{p.name}</h4>
                          <p className="text-[10px] text-stone-400 line-clamp-2 leading-relaxed pt-1">
                            {p.description || 'Gourmet kitchen dish, freshly cooked using organic ingredients.'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 mt-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart && handleAddToCart(p);
                          }}
                          className="w-full py-2 bg-orange-500/10 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-stone-950 text-[10px] font-bold uppercase tracking-widest rounded-xl transition"
                        >
                          ADD TO TRAY
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {currentSubPage === 'about' && (
          <section className="max-w-3xl mx-auto px-6 py-20 space-y-8 text-center bg-stone-900/20 border border-orange-500/10 rounded-3xl mt-12 font-serif">
            <h2 className="text-2xl text-orange-400 tracking-widest uppercase">The Bistro Story</h2>
            <p className="text-xs text-stone-400 leading-relaxed font-sans max-w-xl mx-auto">
              Our food represents standard-certified hygiene. Organic farm meats, zero processed preservatives, cooked freshly inside clean firewood oven systems.
            </p>
          </section>
        )}

        {currentSubPage === 'contact' && (
          <section className="max-w-md mx-auto px-6 py-20 space-y-6">
            <h2 className="text-xl font-serif text-white text-center tracking-widest uppercase">Reserve A Table</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Reservation requested!'); }} className="space-y-4 text-xs font-mono">
              <input type="text" placeholder="Name" className="w-full bg-stone-900 border border-stone-850 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-400" required />
              <input type="email" placeholder="Email Address" className="w-full bg-stone-900 border border-stone-850 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-400" required />
              <textarea placeholder="Describe desired guest count & date specifications" className="w-full bg-stone-900 border border-stone-850 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-400 h-28" required />
              <button type="submit" className="w-full py-3 bg-orange-400 text-stone-950 font-bold uppercase tracking-widest rounded-xl hover:bg-orange-500 transition shadow-[0_0_15px_rgba(234,88,12,0.3)]">Submit Table Booking</button>
            </form>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-orange-500/10 py-8 text-center text-[10px] font-bold uppercase tracking-widest text-stone-500 bg-stone-950">
        <p>© 2026 {companyName}. Fresh organic kitchen service.</p>
      </footer>
    </div>
  );
}
