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
  const primaryColor = projectConfig?.themeColor || '#d4af37';
  const logoIcon = projectConfig?.logoIcon || '💎';
  const companyName = projectConfig?.projectName || 'Aurelia';
  const slogan = projectConfig?.slogan || 'Exquisite Handcrafted Luxury Jewelry & Fine Timepieces';

  const [currentSubPage, setCurrentSubPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-serif bg-neutral-950 text-neutral-100 selection:bg-amber-600 selection:text-white">
      {/* Announcement Bar */}
      <div className="py-2.5 text-center text-[10px] font-black tracking-widest text-neutral-950 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 uppercase">
        ✦ Aurelia Atelier - Free Insured Shipping Worldwide on All Diamond Orders ✦
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-amber-500/10 bg-neutral-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSubPage('home')}>
            <span className="text-3xl p-1 bg-amber-500/10 border border-amber-500/20 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.15)]">{logoIcon}</span>
            <div>
              <h1 className="text-sm font-black tracking-widest text-amber-400 uppercase">{companyName}</h1>
              <p className="text-[7px] text-neutral-500 font-bold uppercase tracking-widest font-sans">Haute Joaillerie</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-sans">
            <button onClick={() => setCurrentSubPage('home')} className={`hover:text-amber-400 transition ${currentSubPage === 'home' ? 'text-amber-400 border-b border-amber-550 pb-1' : ''}`}>Collections</button>
            <button onClick={() => setCurrentSubPage('about')} className={`hover:text-amber-400 transition ${currentSubPage === 'about' ? 'text-amber-400 border-b border-amber-550 pb-1' : ''}`}>The Atelier</button>
            <button onClick={() => setCurrentSubPage('contact')} className={`hover:text-amber-400 transition ${currentSubPage === 'contact' ? 'text-amber-400 border-b border-amber-550 pb-1' : ''}`}>Consultations</button>
          </nav>

          <div className="flex items-center gap-3 font-sans">
            <button 
              onClick={() => setActiveView('login')}
              className="px-4 py-1.5 bg-neutral-900 border border-amber-500/25 text-neutral-350 hover:text-white rounded-full text-[9px] font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider text-neutral-950 rounded-full transition cursor-pointer hover:opacity-90 shadow-md font-black"
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
              className="relative py-24 px-6 text-center border-b border-amber-500/10 bg-neutral-900/10 bg-cover bg-center"
              style={projectConfig?.bannerUrl ? { backgroundImage: `url(${projectConfig.bannerUrl})` } : {}}
            >
              {projectConfig?.bannerUrl && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-0" />
              )}
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-amber-550/30 text-[9px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/20 font-sans">
                  EXQUISITE CARAT INDEX
                </span>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight text-white">
                  {slogan}
                </h2>
                <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-xl mx-auto font-sans">
                  Certified diamonds, 18-karat solid golds, pristine platinum bands, and luxury tourbillon watches handcrafted for the refined collector.
                </p>
                <div className="pt-4 font-sans">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-neutral-950 rounded-full text-xs font-black uppercase tracking-widest transition shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
                  >
                    View Atelier Showcase
                  </button>
                </div>
              </div>
            </section>

            {/* Catalog Grid */}
            <section id="catalog" className="max-w-6xl mx-auto px-6 pt-16 space-y-8 font-sans">
              <div className="flex justify-between items-end border-b border-amber-500/10 pb-4">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500">// LUXURY SHOWCASE</h3>
                  <h2 className="text-xl font-serif text-white">Atelier Masterpieces</h2>
                </div>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{products.length} Gems Seeded</span>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20 bg-neutral-900/30 rounded-3xl border border-amber-500/15">
                  <p className="text-xs text-amber-400 font-bold uppercase tracking-widest font-mono">SYS_WARN: SHOWCASE_EMPTY</p>
                  <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">Connect workspace to list diamond inventory.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((p: any) => (
                    <div 
                      key={p.id} 
                      className="group flex flex-col justify-between cursor-pointer bg-neutral-900/40 border border-neutral-800 rounded-3xl p-5 hover:border-amber-400/40 transition duration-300 relative shadow-lg"
                      onClick={() => onProductClick && onProductClick(p)}
                    >
                      <div className="space-y-4">
                        <div className="aspect-video w-full overflow-hidden bg-neutral-950 rounded-2xl relative border border-neutral-800">
                          <img 
                            src={p.imageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e'} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" 
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist && handleToggleWishlist(p.id);
                            }}
                            className="absolute top-3 right-3 bg-neutral-955 border border-neutral-800 hover:border-amber-400 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
                          >
                            <span className="text-xs">{wishlist.includes(p.id) ? '❤️' : '🖤'}</span>
                          </button>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-bold text-amber-400">
                            <span className="uppercase tracking-widest">{p.category || 'Fine Jewelry'}</span>
                            <span className="bg-amber-950/20 px-2 py-0.5 rounded border border-amber-500/20 text-amber-350">₹{p.price.toLocaleString()}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-tight truncate pt-1">{p.name}</h4>
                          <p className="text-[10px] text-neutral-450 line-clamp-2 leading-relaxed pt-1">
                            {p.description || 'Rare diamond elements structured in certified high purity gold molds.'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 mt-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart && handleAddToCart(p);
                          }}
                          className="w-full py-2 bg-amber-500/10 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-neutral-900 text-[10px] font-bold uppercase tracking-widest rounded-xl transition font-mono"
                        >
                          ACQUIRE PIECE
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
          <section className="max-w-3xl mx-auto px-6 py-20 space-y-8 text-center bg-neutral-900/20 border border-amber-500/10 rounded-3xl mt-12 font-serif">
            <h2 className="text-2xl text-amber-400 tracking-widest uppercase">The Heritage Atelier</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-xl mx-auto">
              Our designs represent standard-certified diamonds. Cleanly mined, individually carved, and set in high-end structural settings. Authenticity guaranteed with global certificate registries.
            </p>
          </section>
        )}

        {currentSubPage === 'contact' && (
          <section className="max-w-md mx-auto px-6 py-20 space-y-6 font-sans">
            <h2 className="text-xl font-serif text-white text-center tracking-widest uppercase">Private Consulting</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Consultation requested!'); }} className="space-y-4 text-xs font-mono">
              <input type="text" placeholder="Name" className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400" required />
              <input type="email" placeholder="Email Address" className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400" required />
              <textarea placeholder="Desired custom sizing / carat specifications" className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 h-28" required />
              <button type="submit" className="w-full py-3 bg-amber-400 text-neutral-950 font-bold uppercase tracking-widest rounded-xl hover:bg-amber-500 transition shadow-[0_0_15px_rgba(212,175,55,0.3)] font-sans">Schedule Call</button>
            </form>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-500/10 py-8 text-center text-[10px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-950 font-sans">
        <p>© 2026 {companyName}. All designs certified. GIA standard.</p>
      </footer>
    </div>
  );
}
