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
  const primaryColor = projectConfig?.themeColor || '#0ea5e9';
  const logoIcon = projectConfig?.logoIcon || '💊';
  const companyName = projectConfig?.projectName || 'MediCare';
  const slogan = projectConfig?.slogan || 'Verified Over-The-Counter Healthcare & Wellness Supplements';

  const [currentSubPage, setCurrentSubPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      {/* Announcement Bar */}
      <div className="py-2.5 text-center text-[10px] font-bold tracking-wider text-white uppercase bg-slate-900">
        🛡️ CERTIFIED PHARMACY REGISTRY // ALL BATCHES LAB-TESTED // COMPLIANT PACKACTION 🛡️
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSubPage('home')}>
            <span className="text-3xl p-1 bg-sky-500/10 rounded-2xl border border-sky-200">{logoIcon}</span>
            <div>
              <h1 className="text-sm font-black tracking-tight text-sky-850 uppercase">{companyName}</h1>
              <p className="text-[8px] text-sky-600 font-bold uppercase tracking-widest">Medical Solutions</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-sky-700">
            <button onClick={() => setCurrentSubPage('home')} className={`hover:text-sky-950 transition ${currentSubPage === 'home' ? 'text-sky-950 font-black border-b-2 border-sky-600 pb-1' : ''}`}>Wellness Index</button>
            <button onClick={() => setCurrentSubPage('about')} className={`hover:text-sky-950 transition ${currentSubPage === 'about' ? 'text-sky-950 font-black border-b-2 border-sky-600 pb-1' : ''}`}>Standards</button>
            <button onClick={() => setCurrentSubPage('contact')} className={`hover:text-sky-950 transition ${currentSubPage === 'contact' ? 'text-sky-950 font-black border-b-2 border-sky-600 pb-1' : ''}`}>Consult Pharmacist</button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('login')}
              className="px-4 py-1.5 border border-sky-250 hover:bg-sky-50 text-sky-850 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
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
              className="relative py-20 px-6 text-center border-b border-sky-100 bg-cover bg-center"
              style={projectConfig?.bannerUrl ? { backgroundImage: `url(${projectConfig.bannerUrl})` } : { backgroundColor: '#EBF5FB' }}
            >
              {projectConfig?.bannerUrl && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0" />
              )}
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white bg-sky-600">
                  CLINICALLY VERIFIED PHARMACEUTICALS
                </span>
                <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${projectConfig?.bannerUrl ? 'text-white' : 'text-sky-950'}`}>
                  {slogan}
                </h2>
                <p className={`text-xs font-medium leading-relaxed max-w-xl mx-auto ${projectConfig?.bannerUrl ? 'text-sky-100' : 'text-sky-700'}`}>
                  Over-the-counter medicine nodes, multi-vitamins, certified dietary wellness supplements, and high-precision monitoring devices shipped with safety seals.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-750 text-white rounded-full text-xs font-black uppercase tracking-widest transition shadow-lg cursor-pointer"
                  >
                    View Wellness Index
                  </button>
                </div>
              </div>
            </section>

            {/* Catalog Grid */}
            <section id="catalog" className="max-w-6xl mx-auto px-6 pt-16 space-y-8">
              <div className="flex justify-between items-end border-b border-sky-100 pb-4">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-sky-600">// THERAPEUTICS LIST</h3>
                  <h2 className="text-xl font-black text-sky-900">Medical Catalog</h2>
                </div>
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">{products.length} Items Available</span>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-sky-100">
                  <p className="text-xs text-sky-400 font-bold uppercase tracking-widest">No Items Configured</p>
                  <p className="text-[10px] text-sky-400 mt-1">Please add products in the workspace console.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((p: any) => (
                    <div 
                      key={p.id} 
                      className="group flex flex-col justify-between cursor-pointer bg-white border border-sky-100 rounded-3xl p-5 hover:shadow-xl transition duration-300 relative"
                      onClick={() => onProductClick && onProductClick(p)}
                    >
                      <div className="space-y-4">
                        <div className="aspect-video w-full overflow-hidden bg-sky-50 rounded-2xl relative border border-sky-100/50">
                          <img 
                            src={p.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae'} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" 
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist && handleToggleWishlist(p.id);
                            }}
                            className="absolute top-3 right-3 bg-white hover:bg-sky-50 w-8 h-8 rounded-full flex items-center justify-center shadow transition cursor-pointer"
                          >
                            <span className="text-xs">{wishlist.includes(p.id) ? '❤️' : '🖤'}</span>
                          </button>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-black text-sky-600 uppercase tracking-widest">
                            <span>{p.category || 'Therapeutics'}</span>
                            <span className="bg-sky-50 px-2 py-0.5 rounded border border-sky-100 font-bold text-sky-800">₹{p.price}</span>
                          </div>
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider truncate pt-1">{p.name}</h4>
                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed pt-1">
                            {p.description || 'Verified OTC chemical compound, compliant with safety protocols.'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart && handleAddToCart(p);
                          }}
                          className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition shadow-md"
                        >
                          Request Pack
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
          <section className="max-w-3xl mx-auto px-6 py-20 space-y-8 text-center bg-sky-50 border border-sky-100 rounded-3xl mt-12">
            <h2 className="text-2xl font-black text-sky-850">Regulatory Compliance Standards</h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl mx-auto">
              Our registry satisfies standard medical distribution guidelines. All formulations are verified, stored under strict thermal control, and sealed with tracking logs for security.
            </p>
          </section>
        )}

        {currentSubPage === 'contact' && (
          <section className="max-w-md mx-auto px-6 py-20 space-y-6">
            <h2 className="text-xl font-black text-sky-900 text-center uppercase tracking-widest">Consult Registry Pharmacist</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent!'); }} className="space-y-4 text-xs font-sans">
              <input type="text" placeholder="Name" className="w-full bg-white border border-sky-200 rounded-xl px-4 py-2.5" required />
              <input type="email" placeholder="Email Address" className="w-full bg-white border border-sky-200 rounded-xl px-4 py-2.5" required />
              <textarea placeholder="Describe dosage query / wellness support required" className="w-full bg-white border border-sky-200 rounded-xl px-4 py-2.5 h-28" required />
              <button type="submit" className="w-full py-3 bg-sky-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-sky-700 transition shadow-md">Send Consultation</button>
            </form>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-100 py-8 text-center text-[10px] font-bold uppercase tracking-widest text-sky-600 bg-white">
        <p>© 2026 {companyName}. Verified OTC medical distributor.</p>
      </footer>
    </div>
  );
}
