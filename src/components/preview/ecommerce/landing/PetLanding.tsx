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
  const primaryColor = projectConfig?.themeColor || '#f59e0b';
  const logoIcon = projectConfig?.logoIcon || '🐾';
  const companyName = projectConfig?.projectName || 'HappyPaws';
  const slogan = projectConfig?.slogan || 'Premium Nutritious Food & Playful Toys for Your Pets';

  const [currentSubPage, setCurrentSubPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF6F0] text-slate-800">
      {/* Announcement Bar */}
      <div className="py-2.5 text-center text-[10px] font-black tracking-widest text-white uppercase" style={{ backgroundColor: primaryColor }}>
        🐾 Friendly Supplies - 100% Vet Recommended Formulas & Organic Toy Materials 🐾
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-[#FAF6F0]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSubPage('home')}>
            <span className="text-3xl p-1 bg-amber-500/10 rounded-2xl border border-orange-200">{logoIcon}</span>
            <div>
              <h1 className="text-sm font-black tracking-tight text-amber-800 uppercase">{companyName}</h1>
              <p className="text-[8px] text-amber-600 font-bold uppercase tracking-widest">Premium Pet Care</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-amber-700">
            <button onClick={() => setCurrentSubPage('home')} className={`hover:text-amber-950 transition ${currentSubPage === 'home' ? 'text-amber-950 font-black border-b-2 border-amber-600 pb-1' : ''}`}>Shop Supplies</button>
            <button onClick={() => setCurrentSubPage('about')} className={`hover:text-amber-950 transition ${currentSubPage === 'about' ? 'text-amber-950 font-black border-b-2 border-amber-600 pb-1' : ''}`}>Our Mission</button>
            <button onClick={() => setCurrentSubPage('contact')} className={`hover:text-amber-950 transition ${currentSubPage === 'contact' ? 'text-amber-950 font-black border-b-2 border-amber-600 pb-1' : ''}`}>Contact Vet</button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('login')}
              className="px-4 py-1.5 border border-orange-200 hover:bg-orange-50 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
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
              className="relative py-20 px-6 text-center border-b border-orange-100 bg-cover bg-center"
              style={projectConfig?.bannerUrl ? { backgroundImage: `url(${projectConfig.bannerUrl})` } : { backgroundColor: '#F4EBE1' }}
            >
              {projectConfig?.bannerUrl && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0" />
              )}
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white bg-amber-600">
                  HAPPY PETS GUARANTEE
                </span>
                <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${projectConfig?.bannerUrl ? 'text-white' : 'text-amber-905'}`}>
                  {slogan}
                </h2>
                <p className={`text-xs font-medium leading-relaxed max-w-xl mx-auto ${projectConfig?.bannerUrl ? 'text-amber-100' : 'text-amber-800'}`}>
                  High-protein dry kibbles, grain-free delicious wet treats, interactive puzzle toys, and cozy orthopedic dog/cat beds built to keep them thriving.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-black uppercase tracking-widest transition shadow-lg cursor-pointer"
                  >
                    View Supplies Catalogue
                  </button>
                </div>
              </div>
            </section>

            {/* Catalog Grid */}
            <section id="catalog" className="max-w-6xl mx-auto px-6 pt-16 space-y-8">
              <div className="flex justify-between items-end border-b border-orange-100 pb-4">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-amber-500">Vet Checked Supplies</h3>
                  <h2 className="text-xl font-black text-amber-900">Pet Inventory</h2>
                </div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{products.length} Products Online</span>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-orange-100">
                  <p className="text-xs text-orange-400 font-bold uppercase tracking-widest">No Supplies Online</p>
                  <p className="text-[10px] text-orange-400 mt-1">Please add products in the workspace console.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((p: any) => (
                    <div 
                      key={p.id} 
                      className="group flex flex-col justify-between cursor-pointer bg-white border border-orange-100 rounded-3xl p-5 hover:shadow-xl transition duration-300 relative"
                      onClick={() => onProductClick && onProductClick(p)}
                    >
                      <div className="space-y-4">
                        <div className="aspect-video w-full overflow-hidden bg-orange-50/50 rounded-2xl relative border border-orange-100">
                          <img 
                            src={p.imageUrl || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e'} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" 
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist && handleToggleWishlist(p.id);
                            }}
                            className="absolute top-3 right-3 bg-white hover:bg-orange-50 w-8 h-8 rounded-full flex items-center justify-center shadow transition cursor-pointer"
                          >
                            <span className="text-xs">{wishlist.includes(p.id) ? '❤️' : '🖤'}</span>
                          </button>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-black text-amber-600 uppercase tracking-widest">
                            <span>{p.category || 'Supplies'}</span>
                            <span className="bg-amber-50 px-2 py-0.5 rounded border border-orange-150">₹{p.price}/unit</span>
                          </div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider truncate pt-1">{p.name}</h4>
                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed pt-1">
                            {p.description || 'Nutritional food element designed by pet wellness specialists.'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart && handleAddToCart(p);
                          }}
                          className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition shadow-md"
                        >
                          Add to Box
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
          <section className="max-w-3xl mx-auto px-6 py-20 space-y-8 text-center bg-orange-50/50 border border-orange-100 rounded-3xl mt-12 font-sans">
            <h2 className="text-2xl font-black text-amber-850">The Organic Nutrition Mission</h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl mx-auto">
              Our products are processed using natural ingredients. Free from synthetic fillers or non-digestible fats. Curated with care for all canine and feline sizes.
            </p>
          </section>
        )}

        {currentSubPage === 'contact' && (
          <section className="max-w-md mx-auto px-6 py-20 space-y-6">
            <h2 className="text-xl font-black text-amber-900 text-center uppercase tracking-widest">Vet Support Line</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent!'); }} className="space-y-4 text-xs font-sans">
              <input type="text" placeholder="Name" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-2.5" required />
              <input type="email" placeholder="Email Address" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-2.5" required />
              <textarea placeholder="Pet weight / species detail if wellness query" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-2.5 h-28" required />
              <button type="submit" className="w-full py-3 bg-amber-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-amber-700 transition shadow-md">Consult Vet Team</button>
            </form>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-orange-100 py-8 text-center text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-white">
        <p>© 2026 {companyName}. Sustainably certified & vet-approved.</p>
      </footer>
    </div>
  );
}
