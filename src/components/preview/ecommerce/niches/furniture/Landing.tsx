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
  const primaryColor = projectConfig?.themeColor || '#d97706';
  const logoIcon = projectConfig?.logoIcon || '🪑';
  const companyName = projectConfig?.projectName || 'NordicLiving';
  const slogan = projectConfig?.slogan || 'Minimalist Scandinavian Furniture & Home Decor';

  const [currentSubPage, setCurrentSubPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9F6F0] text-slate-800">
      {/* Announcement Bar */}
      <div className="py-2.5 text-center text-[10px] font-black tracking-widest text-white uppercase" style={{ backgroundColor: primaryColor }}>
        ✦ THE SCANDINAVIAN COLLECTION - FLAT 15% OFF ON APARTMENT MODULES ✦
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200/50 bg-[#F9F6F0]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSubPage('home')}>
            <span className="text-3xl p-1 bg-amber-500/10 rounded-2xl border border-stone-200">{logoIcon}</span>
            <div>
              <h1 className="text-sm font-black tracking-widest uppercase text-stone-900">{companyName}</h1>
              <p className="text-[8px] text-stone-500 font-bold uppercase tracking-widest">Nordic Design Lab</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-stone-500">
            <button onClick={() => setCurrentSubPage('home')} className={`hover:text-stone-900 transition ${currentSubPage === 'home' ? 'text-stone-900 font-black border-b border-stone-900 pb-1' : ''}`}>Catalog</button>
            <button onClick={() => setCurrentSubPage('about')} className={`hover:text-stone-900 transition ${currentSubPage === 'about' ? 'text-stone-900 font-black border-b border-stone-900 pb-1' : ''}`}>Our Studio</button>
            <button onClick={() => setCurrentSubPage('contact')} className={`hover:text-stone-900 transition ${currentSubPage === 'contact' ? 'text-stone-900 font-black border-b border-stone-900 pb-1' : ''}`}>Inquiries</button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('login')}
              className="px-4 py-1.5 border border-stone-300 hover:bg-stone-100 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white rounded-full transition cursor-pointer hover:opacity-90 shadow-md"
              style={{ backgroundColor: primaryColor }}
            >
              Portal Workspace
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
              className="relative py-24 px-6 text-center border-b border-stone-200/50 bg-cover bg-center"
              style={projectConfig?.bannerUrl ? { backgroundImage: `url(${projectConfig.bannerUrl})` } : { backgroundColor: '#EFECE6' }}
            >
              {projectConfig?.bannerUrl && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0" />
              )}
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white bg-stone-900">
                  FUNCTIONAL DESIGN
                </span>
                <h2 className={`text-4xl md:text-5xl font-serif tracking-tight leading-tight ${projectConfig?.bannerUrl ? 'text-white' : 'text-stone-900'}`}>
                  {slogan}
                </h2>
                <p className={`text-xs font-medium leading-relaxed max-w-xl mx-auto ${projectConfig?.bannerUrl ? 'text-stone-200' : 'text-stone-500'}`}>
                  Architectural furniture built with sustainable oaks, structural metals, and textured fibers. Explore comfortable couches, modular closets, and modern workspace desks.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-850 text-white rounded-full text-xs font-black uppercase tracking-widest transition shadow-lg cursor-pointer"
                  >
                    View Studio Catalog
                  </button>
                </div>
              </div>
            </section>

            {/* Catalog Grid */}
            <section id="catalog" className="max-w-6xl mx-auto px-6 pt-16 space-y-8">
              <div className="flex justify-between items-end border-b border-stone-200/50 pb-4">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">Minimalist Woodworks</h3>
                  <h2 className="text-xl font-serif text-stone-900">Studio Catalog</h2>
                </div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{products.length} Designs Online</span>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20 bg-stone-100 rounded-3xl border border-stone-200">
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">No Designs Seeded</p>
                  <p className="text-[10px] text-stone-400 mt-1">Please add products in the workspace console.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((p: any) => (
                    <div 
                      key={p.id} 
                      className="group flex flex-col justify-between cursor-pointer bg-white border border-stone-200/50 rounded-3xl p-5 hover:shadow-xl transition duration-300 relative"
                      onClick={() => onProductClick && onProductClick(p)}
                    >
                      <div className="space-y-4">
                        <div className="aspect-video w-full overflow-hidden bg-stone-50 rounded-2xl relative border border-stone-200/30">
                          <img 
                            src={p.imageUrl || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36'} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" 
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist && handleToggleWishlist(p.id);
                            }}
                            className="absolute top-3 right-3 bg-[#F9F6F0] border border-stone-200 hover:bg-stone-100 w-8 h-8 rounded-full flex items-center justify-center shadow transition cursor-pointer"
                          >
                            <span className="text-xs">{wishlist.includes(p.id) ? '❤️' : '🖤'}</span>
                          </button>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-black text-stone-500 uppercase tracking-widest">
                            <span>{p.category || 'Woodwork'}</span>
                            <span className="bg-[#FAF9F6] px-2 py-0.5 rounded border border-stone-200 text-stone-800">₹{p.price.toLocaleString()}</span>
                          </div>
                          <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider truncate pt-1">{p.name}</h4>
                          <p className="text-[10px] text-stone-400 line-clamp-2 leading-relaxed pt-1">
                            {p.description || 'Spacious, robust, and neutral-colored Scandinavian craft.'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart && handleAddToCart(p);
                          }}
                          className="w-full py-2 bg-stone-900 hover:bg-stone-850 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition shadow-md"
                        >
                          Configure Order
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
          <section className="max-w-3xl mx-auto px-6 py-20 space-y-8 text-center bg-stone-100 border border-stone-200 rounded-3xl mt-12 font-serif">
            <h2 className="text-2xl text-stone-900">Functional Minimalism</h2>
            <p className="text-xs text-stone-500 leading-relaxed font-sans max-w-xl mx-auto">
              Our studio believes that a space should flow naturally. Every shelf, chair, and table is manufactured with precision geometry to complement lighting, air, and room space.
            </p>
          </section>
        )}

        {currentSubPage === 'contact' && (
          <section className="max-w-md mx-auto px-6 py-20 space-y-6">
            <h2 className="text-xl font-serif text-stone-900 text-center uppercase tracking-widest">Consult Design Team</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent!'); }} className="space-y-4 text-xs font-sans">
              <input type="text" placeholder="Name" className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5" required />
              <input type="email" placeholder="Email Address" className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5" required />
              <textarea placeholder="Tell us about your room space" className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 h-28" required />
              <button type="submit" className="w-full py-3 bg-stone-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-stone-850 transition shadow-md">Send Studio Inquiry</button>
            </form>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 text-center text-[10px] font-bold uppercase tracking-widest text-stone-400 bg-white">
        <p>© 2026 {companyName}. Sustainably sourced structural craft.</p>
      </footer>
    </div>
  );
}
