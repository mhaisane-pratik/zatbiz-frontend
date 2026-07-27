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
  const primaryColor = projectConfig?.themeColor || '#db2777';
  const logoIcon = projectConfig?.logoIcon || '💄';
  const companyName = projectConfig?.projectName || 'GlowBeauty';
  const slogan = projectConfig?.slogan || 'Cruelty-Free Premium Cosmetics & Skincare';

  const [currentSubPage, setCurrentSubPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDF8F5] text-stone-850">
      {/* Announcement Bar */}
      <div className="py-2.5 text-center text-[10px] font-black tracking-widest text-white uppercase bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400">
        ✨ Pure Ingredients - Cruelty Free & Dermatologically Tested Formulas ✨
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-rose-100 bg-[#FDF8F5]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSubPage('home')}>
            <span className="text-3xl p-1 bg-pink-500/10 rounded-2xl border border-rose-200">{logoIcon}</span>
            <div>
              <h1 className="text-sm font-black tracking-widest uppercase text-rose-800">{companyName}</h1>
              <p className="text-[8px] text-rose-600 font-bold uppercase tracking-widest">Wellness Cosmetics</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-rose-700">
            <button onClick={() => setCurrentSubPage('home')} className={`hover:text-rose-950 transition ${currentSubPage === 'home' ? 'text-rose-955 font-black border-b-2 border-rose-550 pb-1' : ''}`}>Shop Glow</button>
            <button onClick={() => setCurrentSubPage('about')} className={`hover:text-rose-950 transition ${currentSubPage === 'about' ? 'text-rose-955 font-black border-b-2 border-rose-550 pb-1' : ''}`}>Philosophy</button>
            <button onClick={() => setCurrentSubPage('contact')} className={`hover:text-rose-950 transition ${currentSubPage === 'contact' ? 'text-rose-955 font-black border-b-2 border-rose-550 pb-1' : ''}`}>Contact Us</button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('login')}
              className="px-4 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-800 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white rounded-full transition cursor-pointer hover:opacity-90 shadow-md bg-gradient-to-r from-pink-500 to-rose-550"
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
              className="relative py-20 px-6 text-center border-b border-rose-100 bg-cover bg-center"
              style={projectConfig?.bannerUrl ? { backgroundImage: `url(${projectConfig.bannerUrl})` } : { backgroundImage: 'linear-gradient(to bottom, #FCEEE7, #FDF8F5)' }}
            >
              {projectConfig?.bannerUrl && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0" />
              )}
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white bg-rose-500">
                  NATURAL INGREDIENTS
                </span>
                <h2 className={`text-4xl md:text-5xl font-serif tracking-tight leading-tight ${projectConfig?.bannerUrl ? 'text-white' : 'text-rose-950'}`}>
                  {slogan}
                </h2>
                <p className={`text-xs font-medium leading-relaxed max-w-xl mx-auto ${projectConfig?.bannerUrl ? 'text-rose-100' : 'text-rose-800'}`}>
                  Hydrating serums, active botanical face cleansers, rosewater toners, and luxury skincare essentials designed to enhance your natural glow.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-black uppercase tracking-widest transition shadow-lg cursor-pointer"
                  >
                    View Cosmetics
                  </button>
                </div>
              </div>
            </section>

            {/* Catalog Grid */}
            <section id="catalog" className="max-w-6xl mx-auto px-6 pt-16 space-y-8">
              <div className="flex justify-between items-end border-b border-rose-100 pb-4">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-rose-500">Curated Hydration</h3>
                  <h2 className="text-xl font-serif text-rose-900">Skincare Products</h2>
                </div>
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">{products.length} Products Online</span>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-rose-100">
                  <p className="text-xs text-rose-400 font-bold uppercase tracking-widest">No Products Seeded</p>
                  <p className="text-[10px] text-rose-400 mt-1">Please add products in the workspace console.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((p: any) => (
                    <div 
                      key={p.id} 
                      className="group flex flex-col justify-between cursor-pointer bg-white border border-rose-100 rounded-3xl p-5 hover:shadow-xl hover:scale-[1.01] transition duration-300 relative"
                      onClick={() => onProductClick && onProductClick(p)}
                    >
                      <div className="space-y-4">
                        <div className="aspect-video w-full overflow-hidden bg-rose-50 rounded-2xl relative border border-rose-100/50">
                          <img 
                            src={p.imageUrl || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348'} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" 
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist && handleToggleWishlist(p.id);
                            }}
                            className="absolute top-3 right-3 bg-[#FDF8F5] border border-rose-200 hover:bg-rose-100 w-8 h-8 rounded-full flex items-center justify-center shadow transition cursor-pointer"
                          >
                            <span className="text-xs">{wishlist.includes(p.id) ? '❤️' : '🖤'}</span>
                          </button>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-black text-rose-600 uppercase tracking-widest">
                            <span>{p.category || 'Skincare'}</span>
                            <span className="bg-rose-50 px-2 py-0.5 rounded border border-rose-100 text-rose-800 font-bold">₹{p.price}</span>
                          </div>
                          <h4 className="text-xs font-black text-rose-900 uppercase tracking-wider truncate pt-1">{p.name}</h4>
                          <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed pt-1">
                            {p.description || 'Gentle botanical nourishment for sensitive skin types.'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart && handleAddToCart(p);
                          }}
                          className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition shadow-md"
                        >
                          Add To Vanity
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
          <section className="max-w-3xl mx-auto px-6 py-20 space-y-8 text-center bg-rose-50/50 border border-rose-100 rounded-3xl mt-12 font-serif">
            <h2 className="text-2xl text-rose-950">Active Botanicals Creed</h2>
            <p className="text-xs text-rose-900 leading-relaxed font-sans max-w-xl mx-auto">
              Our cosmetics represent standard-certified vegan elements. Free from phthalates, sulfates, or artificial fragrances. Pure skin nourishment for active radiance.
            </p>
          </section>
        )}

        {currentSubPage === 'contact' && (
          <section className="max-w-md mx-auto px-6 py-20 space-y-6">
            <h2 className="text-xl font-serif text-rose-950 text-center uppercase tracking-widest">Wellness Inquiries</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }} className="space-y-4 text-xs font-sans">
              <input type="text" placeholder="Name" className="w-full bg-white border border-rose-200 rounded-xl px-4 py-2.5" required />
              <input type="email" placeholder="Email Address" className="w-full bg-white border border-rose-200 rounded-xl px-4 py-2.5" required />
              <textarea placeholder="Message" className="w-full bg-white border border-rose-200 rounded-xl px-4 py-2.5 h-28" required />
              <button type="submit" className="w-full py-3 bg-rose-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-rose-700 transition shadow-md">Submit Inquiry</button>
            </form>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-rose-100 py-8 text-center text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-white">
        <p>© 2026 {companyName}. Sustainably certified rosewater elements.</p>
      </footer>
    </div>
  );
}
