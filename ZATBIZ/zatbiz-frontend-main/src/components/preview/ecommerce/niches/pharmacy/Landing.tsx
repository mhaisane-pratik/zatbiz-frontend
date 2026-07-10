'use client';
import React, { useState } from 'react';

export default function Landing({ projectId, projectConfig, products = [], onProductClick, cart = [], handleAddToCart, activeView, setActiveView, handleToggleWishlist, wishlist = [], handleCheckout }: any) {
  const primaryColor = projectConfig?.themeColor || '#059669';
  const isLight = projectConfig?.selectedThemeData?.bgColor === '#ffffff';
  const cardStyle = projectConfig?.selectedThemeData?.cardStyle || 'classic-bordered';
  const layoutStyle = projectConfig?.selectedThemeData?.layoutStyle || 'modern-grid';
  const buttonRoundness = projectConfig?.selectedThemeData?.buttonRoundness || 'rounded-xl';

  const [currentSubPage, setCurrentSubPage] = useState('home');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const fontClass = 'font-mono';
  
  const getCardClass = () => {
    let base = 'p-4 border transition-all duration-300 ';
    if (cardStyle === 'glassmorphism') {
      base += isLight ? 'bg-white/40 border-white/20 backdrop-blur shadow-sm' : 'bg-slate-900/60 border-white/10 backdrop-blur shadow-lg';
    } else if (cardStyle === 'bold-shadow') {
      base += isLight ? 'bg-white border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]' : 'bg-slate-900 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]';
    } else if (cardStyle === 'minimalist') {
      base += 'bg-transparent border-transparent';
    } else {
      base += isLight ? 'bg-white border-slate-200 shadow-sm rounded-2xl' : 'bg-slate-900 border-white/5 shadow-lg rounded-2xl';
    }
    return base;
  };

  const cCard = getCardClass();

  return (
    <div className={`min-h-screen flex flex-col ${fontClass} ${isLight ? 'bg-white text-slate-800' : 'bg-slate-955 text-white'}`}>
      {/* Announcement Bar */}
      <div className="py-2 text-center text-[10px] font-black tracking-widest text-white transition duration-300" style={{ backgroundColor: primaryColor }}>
        ✨ PREMIUM PHARMACY & WELLNESS STORE - POWERED BY SHARABLE ENDPOINTS ✨
      </div>

      {/* Header Navigation */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${isLight ? 'bg-white/85 border-slate-200' : 'bg-slate-900/80 border-white/5'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSubPage('home')}>
            <span className="text-3xl p-1 bg-white/5 rounded-xl border border-white/10">🩺</span>
            <div>
              <h1 className="text-sm font-black tracking-tight uppercase">{projectConfig?.projectName || niche.name}</h1>
              <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Premium Storefront</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold">
            <button onClick={() => setCurrentSubPage('home')} className={`hover:opacity-85 transition ${currentSubPage === 'home' ? 'underline' : ''}`}>Home</button>
            <button onClick={() => setCurrentSubPage('about')} className={`hover:opacity-85 transition ${currentSubPage === 'about' ? 'underline' : ''}`}>About Us</button>
            <button onClick={() => setCurrentSubPage('contact')} className={`hover:opacity-85 transition ${currentSubPage === 'contact' ? 'underline' : ''}`}>Contact Us</button>
            <button onClick={() => setCurrentSubPage('faq')} className={`hover:opacity-85 transition ${currentSubPage === 'faq' ? 'underline' : ''}`}>FAQs</button>
            <button onClick={() => setCurrentSubPage('blog')} className={`hover:opacity-85 transition ${currentSubPage === 'blog' ? 'underline' : ''}`}>Blog</button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('login')}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition cursor-pointer text-white"
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="px-3.5 py-1.5 text-xs font-bold text-white rounded-xl transition cursor-pointer"
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
          <div className="space-y-12 pb-20">
            {/* Hero Section */}
            <section className={`relative overflow-hidden py-20 px-6 text-center border-b ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-white/5'}`}>
              <div className="max-w-2xl mx-auto space-y-6">
                <span className="px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white" style={{ backgroundColor: primaryColor }}>
                  Exclusive Collection
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Curated Premium Pharmacy & Wellness
                </h2>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  First-Aid kits, Insulin Pen Needles & Prescription Medicines. Explore items with standard design schemas configured for high-performance storefront layouts.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-6 py-2.5 text-xs font-bold text-white transition ${buttonRoundness} hover:opacity-90`}
                    style={{ backgroundColor: primaryColor }}
                  >
                    Explore Shop
                  </button>
                  <button onClick={() => setCurrentSubPage('about')} className="px-6 py-2.5 text-xs font-bold border border-white/15 bg-white/5 text-white hover:bg-white/10 rounded-xl transition">
                    Our Story
                  </button>
                </div>
              </div>
            </section>

            {/* Catalog Section */}
            <section id="catalog" className="max-w-6xl mx-auto px-6 space-y-8">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-black tracking-tight uppercase">Featured Products</h3>
                  <p className="text-[10px] text-slate-500 font-semibold">Specialty collections verified for quality assurance</p>
                </div>
                <span className="text-xs font-bold text-slate-450 uppercase tracking-wider">Showcasing {products.length} Items</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product: any) => (
                  <div 
                    key={product.id} 
                    className={`${cCard} group hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
                    onClick={() => onProductClick && onProductClick(product)}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-900 border border-white/5 mb-3 flex items-center justify-center">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                      ) : (
                        <span className="text-4xl text-slate-655">🩺</span>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleToggleWishlist && handleToggleWishlist(product); }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-955/80 hover:bg-slate-900 flex items-center justify-center border border-white/10 transition text-white"
                      >
                        {wishlist.some((w: any) => w.id === product.id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                    <div>
                      <span className="text-[8px] font-black uppercase text-slate-550 tracking-wider">{product.category || 'Standard'}</span>
                      <h4 className="text-xs font-black truncate max-w-[200px] text-white mt-1">{product.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold line-clamp-2 mt-1 leading-relaxed">{product.description || 'Verified organic ingredients and build components.'}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <span className="text-xs font-black text-white">₹{product.price}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddToCart && handleAddToCart(product); }}
                        className={`px-3 py-1.5 text-[9px] font-black text-white uppercase tracking-wider hover:opacity-90 transition ${buttonRoundness}`}
                        style={{ backgroundColor: primaryColor }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentSubPage === 'about' && (
          <div className="max-w-3xl mx-auto px-6 py-16 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Our Story</h2>
            <div className="h-1 w-12" style={{ backgroundColor: primaryColor }} />
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              Founded in 2026, our premium boutique represents the zenith of customer-driven visual layout structures. We specialize in curating top-tier Pharmacy & Wellness products directly sourced from sustainable manufacturers.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              By combining high-performance storefront layouts with direct REST API integrations, we deliver a premium Shopify-style digital customer experience.
            </p>
          </div>
        )}

        {currentSubPage === 'contact' && (
          <div className="max-w-md mx-auto px-6 py-16 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-center">Contact Us</h2>
            <div className="h-1 w-12 mx-auto" style={{ backgroundColor: primaryColor }} />
            <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent successfully!'); setContactName(''); setContactEmail(''); setContactMsg(''); }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Email Address</label>
                <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Message</label>
                <textarea rows={4} required value={contactMsg} onChange={(e) => setContactMsg(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <button type="submit" className="w-full py-2.5 text-xs font-black text-white rounded-xl uppercase tracking-wider" style={{ backgroundColor: primaryColor }}>Send Inquiry</button>
            </form>
          </div>
        )}

        {currentSubPage === 'faq' && (
          <div className="max-w-2xl mx-auto px-6 py-16 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-center">Frequently Asked Questions</h2>
            <div className="h-1 w-12 mx-auto" style={{ backgroundColor: primaryColor }} />
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <h4 className="text-xs font-black uppercase">What is the domestic shipping turnaround?</h4>
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">All orders are fulfilled via our dynamic checkout routing and dispatched in under 48 hours.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <h4 className="text-xs font-black uppercase">Do you support product refunds?</h4>
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Yes. Customers can request refunds directly through their customer workspace dashboard portal.</p>
              </div>
            </div>
          </div>
        )}

        {currentSubPage === 'blog' && (
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tight text-center">Curated Insights</h2>
            <div className="h-1 w-12 mx-auto" style={{ backgroundColor: primaryColor }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">July 2026 Edition</span>
                <h3 className="text-sm font-black uppercase">The Future of Pharmacy & Wellness Visual Customizers</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">How digital multi-tenant dashboards are changing user conversion rates for boutique merchants globally.</p>
                <button onClick={() => alert('Full article coming soon.')} className="text-xs font-bold text-indigo-400 hover:underline">Read Article →</button>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">June 2026 Edition</span>
                <h3 className="text-sm font-black uppercase">Maximizing Store Performance</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">Tips on styling button roundness, font configurations, and card layouts without increasing build sizes.</p>
                <button onClick={() => alert('Full article coming soon.')} className="text-xs font-bold text-indigo-400 hover:underline">Read Article →</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-12 px-6 ${isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-955 border-white/5 text-slate-400'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-bold leading-relaxed">
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-white">Pharmacy & Wellness Hub</h4>
            <p className="text-slate-500 font-medium max-w-xs">Dynamic Shopify-style layout engine built specifically for e-commerce workspaces.</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase text-white">Policies</h4>
            <div className="flex flex-col gap-1 text-slate-500 font-medium">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms & Conditions</span>
              <span className="hover:underline cursor-pointer">Refund Policy</span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-white">Newsletter</h4>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to newsletter.'); setNewsletterEmail(''); }} className="flex gap-2">
              <input type="email" required placeholder="name@email.com" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-550 focus:outline-none" />
              <button type="submit" className="px-3.5 py-1.5 text-xs font-bold text-white rounded-xl" style={{ backgroundColor: primaryColor }}>Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
