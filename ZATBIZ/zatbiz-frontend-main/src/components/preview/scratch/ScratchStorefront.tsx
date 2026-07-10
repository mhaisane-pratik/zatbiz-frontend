'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ScratchStorefrontProps {
  projectId: number;
  project: any;
  scratchInfo: any;
  onClose?: () => void;
}

export default function ScratchStorefront({
  projectId,
  project,
  scratchInfo,
  onClose
}: ScratchStorefrontProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'login' | 'dashboard'>('home');
  const [customerSession, setCustomerSession] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Form states on login screen
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Setup visual assets based on business niche
  const bizType = (scratchInfo?.businessType || 'Cloth Shop').trim();
  const bizEmoji = () => {
    const bt = bizType.toLowerCase();
    if (bt.includes('cloth') || bt.includes('fashion') || bt.includes('wear')) return '👕';
    if (bt.includes('coffee') || bt.includes('cafe')) return '☕';
    if (bt.includes('gym') || bt.includes('fitness')) return '💪';
    if (bt.includes('food') || bt.includes('eat')) return '🍔';
    if (bt.includes('salon') || bt.includes('beauty')) return '✂️';
    if (bt.includes('book') || bt.includes('library')) return '📚';
    return '💼';
  };

  // Mock Products generated dynamically according to business type
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const bt = bizType.toLowerCase();
    if (bt.includes('cloth') || bt.includes('fashion') || bt.includes('wear')) {
      setProducts([
        { id: 1, name: 'Premium Cotton Hoodie', price: 899, category: 'Apparel', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300', desc: 'Heavyweight organic cotton hoodie with brushed interior fleece.' },
        { id: 2, name: 'Retro Denim Jacket', price: 1499, category: 'Outerwear', img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300', desc: 'Classic stonewashed denim jacket with adjustable button cuffs.' },
        { id: 3, name: 'Minimalist Canvas Tote', price: 399, category: 'Accessories', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300', desc: 'Durable reinforced canvas bag with interior card pockets.' },
        { id: 4, name: 'Urban Leather Boots', price: 2499, category: 'Footwear', img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300', desc: 'Water-resistant grain leather boots with traction rubber soles.' }
      ]);
    } else if (bt.includes('coffee') || bt.includes('cafe')) {
      setProducts([
        { id: 1, name: 'Organic Dark Espresso', price: 180, category: 'Hot Drinks', img: 'https://images.unsplash.com/photo-1510972527409-cca19de31749?w=300', desc: 'Double shot of our house espresso made from washed Ethiopian beans.' },
        { id: 2, name: 'Salted Caramel Latte', price: 240, category: 'Specialty', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300', desc: 'Espresso mixed with steamed oatmilk and house caramel drizzle.' },
        { id: 3, name: 'Fresh Butter Croissant', price: 120, category: 'Bakery', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300', desc: 'Flaky, double-laminated French croissant baked fresh daily.' },
        { id: 4, name: 'Triple Chocolate Muffin', price: 90, category: 'Bakery', img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300', desc: 'Rich cocoa muffin loaded with dark, milk, and white choc chips.' }
      ]);
    } else if (bt.includes('gym') || bt.includes('fitness')) {
      setProducts([
        { id: 1, name: 'All-Access Monthly Pass', price: 1500, category: 'Memberships', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300', desc: 'Unlimited access to weight room, cardio zones, and group sessions.' },
        { id: 2, name: 'Personal Training Session', price: 800, category: 'Coaching', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300', desc: '1-on-1 personal workout plan directed by certified trainers.' },
        { id: 3, name: 'Whey Protein Blend (1kg)', price: 2800, category: 'Supplements', img: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=300', desc: 'Premium fast-absorbing isolate powder for muscle recovery.' },
        { id: 4, name: 'Grip Strength Gripper', price: 349, category: 'Gear', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300', desc: 'Heavy resistance steel hand gripper with knurled handles.' }
      ]);
    } else {
      // General fallback
      setProducts([
        { id: 1, name: 'Standard Service Plan', price: 999, category: 'Services', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300', desc: 'Basic operational consulting matching your business.' },
        { id: 2, name: 'Premium Service Plan', price: 1999, category: 'Services', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300', desc: 'Advanced telemetry management and dedicated support.' },
        { id: 3, name: 'Brand Starter Kit', price: 499, category: 'Assets', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300', desc: 'Custom logo stamps and stationery matching your brand.' },
        { id: 4, name: 'Corporate Consulting', price: 3999, category: 'Coaching', img: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=300', desc: 'Full custom workflow integration and analytics reports.' }
      ]);
    }
  }, [bizType]);

  const handleAddToCart = (p: any) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) {
        return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail) {
      setLoginError('Email address is required.');
      return;
    }
    
    // Authenticate Admin vs Client User
    if (loginEmail === 'admin@gmail.com') {
      setCustomerSession({
        email: 'admin@gmail.com',
        name: scratchInfo?.ownerName || 'Admin Manager',
        role: 'admin'
      });
      setActiveTab('dashboard');
    } else {
      setCustomerSession({
        email: loginEmail,
        name: loginEmail.split('@')[0] || 'Guest Client',
        role: 'user'
      });
      setActiveTab('dashboard');
    }
  };

  const resolvedLogoUrl = scratchInfo?.logoUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100';
  const resolvedBannerUrl = scratchInfo?.bannerUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200';
  const resolvedPhotoUrl = scratchInfo?.photoUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600';
  const resolvedTitle = scratchInfo?.restaurantName || project?.name?.replace(" Site", "") || 'Custom Builder';
  const resolvedDesc = scratchInfo?.description || 'Custom business workspace.';
  const homeLayout = scratchInfo?.selectedHomepageLayout || 'grid-focus';
  const loginLayout = scratchInfo?.selectedLoginLayout || 'left-illustration';
  const dashboardLayout = scratchInfo?.selectedDashboardLayout || 'metric-overview';
  const isBannerFocus = homeLayout === 'banner-focus';
  const isGridFocus = homeLayout === 'grid-focus';
  const isMapFocus = homeLayout === 'map-focus';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm select-none">
        <div className="flex items-center gap-2.5">
          <img src={resolvedLogoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-100" />
          <div>
            <span className="text-sm font-black text-slate-900 tracking-tight block uppercase">{resolvedTitle}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{bizType}</span>
              <span className="text-[7px] bg-indigo-50 text-indigo-600 border border-indigo-100/40 px-1.5 py-0.5 rounded-md font-mono font-bold">
                Home: {homeLayout} | Login: {loginLayout} | Dash: {dashboardLayout}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
          <button onClick={() => setActiveTab('home')} className={`bg-transparent border-none cursor-pointer ${activeTab === 'home' ? 'text-indigo-600' : 'hover:text-slate-900'}`}>Home</button>
          {customerSession ? (
            <>
              <button onClick={() => setActiveTab('dashboard')} className={`bg-transparent border-none cursor-pointer ${activeTab === 'dashboard' ? 'text-indigo-600' : 'hover:text-slate-900'}`}>Dashboard</button>
              <button onClick={() => { setCustomerSession(null); setActiveTab('home'); }} className="text-rose-500 hover:text-rose-600 bg-transparent border-none cursor-pointer">Logout</button>
            </>
          ) : (
            <button onClick={() => setActiveTab('login')} className={`bg-transparent border-none cursor-pointer ${activeTab === 'login' ? 'text-indigo-600' : 'hover:text-slate-900'}`}>Sign In</button>
          )}
          <button onClick={() => setIsCartOpen(true)} className="relative bg-transparent border-none cursor-pointer text-slate-700">
            🛒 Cart ({cart.reduce((a, b) => a + b.qty, 0)})
          </button>
        </div>
      </nav>

      {/* Main View Area */}
      <main className="flex-grow">
        
        {/* TAB 1: HOME LANDING PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-16 pb-20">
            {/* Conditional Layout headers */}
            {isMapFocus ? (
              <section className="bg-slate-900 text-white py-12 px-6 border-b border-slate-800 text-center font-sans">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
                  <div className="space-y-4">
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full font-black uppercase tracking-wider">{bizType} Hub</span>
                    <h1 className="text-3xl font-black uppercase tracking-tight">{resolvedTitle} Location</h1>
                    <p className="text-xs text-slate-400 leading-relaxed">{scratchInfo?.address || '123 Business Avenue, Sector 62, Noida, India'}</p>
                    <div className="text-xs space-y-1 pt-2">
                      <p><strong>Phone:</strong> {scratchInfo?.mobileNo || '+91 99999 88888'}</p>
                      <p><strong>WhatsApp:</strong> {scratchInfo?.whatsappNo || '+91 99999 88888'}</p>
                      <p><strong>Hours:</strong> Daily 10:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                  <div className="h-56 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 relative">
                    <span className="text-3xl">🗺️</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mt-2">[Interactive Google Map]</span>
                  </div>
                </div>
              </section>
            ) : isBannerFocus ? (
              <section className="max-w-6xl mx-auto px-6 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-7 relative overflow-hidden rounded-[32px] min-h-[440px] text-white shadow-2xl border border-slate-200/60" style={{ backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.30), rgba(15,23,42,0.92)), url('${resolvedBannerUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/35 via-transparent to-fuchsia-900/25" />
                    <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full">
                      <span className="text-[9px] bg-white/15 backdrop-blur border border-white/15 px-3 py-1 rounded-full font-black uppercase tracking-widest inline-flex w-fit mb-4">
                        {bizEmoji()} Promotional Banner Focus
                      </span>
                      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none max-w-xl">{resolvedTitle}</h1>
                      <p className="text-xs md:text-sm text-slate-200 max-w-lg mt-4 leading-relaxed">{resolvedDesc}</p>
                      <div className="flex flex-wrap gap-3 mt-6 text-xs font-black uppercase tracking-wider">
                        <a href="#products" className="px-6 py-3 bg-white text-slate-900 rounded-xl transition shadow hover:translate-y-[-1px]">Browse Catalog</a>
                        <button onClick={() => setActiveTab('login')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition shadow">Sign In Portal</button>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                    <div className="bg-white border border-slate-200/70 rounded-[28px] p-5 shadow-sm flex items-center gap-4">
                      <img src={resolvedLogoUrl} alt="Brand logo" className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brand Identity</p>
                        <h3 className="text-sm font-black text-slate-900">Selected logo is live</h3>
                        <p className="text-[11px] text-slate-500">Your uploaded logo and color choices should appear here.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900 text-white rounded-[24px] p-4 shadow-xl min-h-[176px] flex flex-col justify-end" style={{ backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.05), rgba(15,23,42,0.85)), url('${resolvedPhotoUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <span className="text-[9px] font-black uppercase tracking-wider bg-white/15 backdrop-blur px-2 py-1 rounded-full w-fit">Custom Photo</span>
                        <p className="text-xs font-bold mt-3">Uploaded image preview</p>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-100 rounded-[24px] p-4 shadow-sm min-h-[176px] flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Promo Layout</span>
                          <p className="text-sm font-black text-slate-900 mt-2">Campaign ready</p>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">This layout is now distinct from the grid-focused version.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              isGridFocus ? (
                <section className="max-w-6xl mx-auto px-6 pt-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-5 bg-white border border-slate-200/70 rounded-[32px] p-6 shadow-sm space-y-5">
                      <div className="flex items-center gap-4">
                        <img src={resolvedLogoUrl} alt="Brand logo" className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Grid Focus</span>
                          <h2 className="text-xl font-black text-slate-900 mt-1">{resolvedTitle}</h2>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{resolvedDesc}</p>
                      <div className="grid grid-cols-2 gap-3 text-[10px] font-black uppercase tracking-wider text-slate-600">
                        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3">Custom logo</div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3">Custom banner</div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3">Product grid</div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3">Promo cards</div>
                      </div>
                      <div className="flex gap-3">
                        <a href="#products" className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition shadow">Browse Catalog</a>
                        <button onClick={() => setActiveTab('login')} className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition shadow">Sign In</button>
                      </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 rounded-[28px] overflow-hidden min-h-[260px] border border-slate-200 shadow-xl" style={{ backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.30), rgba(15,23,42,0.92)), url('${resolvedBannerUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <div className="bg-white border border-slate-200 rounded-[28px] p-4 shadow-sm flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Preview</span>
                          <p className="text-sm font-black text-slate-900 mt-2">Selected layout</p>
                        </div>
                        <img src={resolvedPhotoUrl} alt="Custom preview" className="w-full h-32 object-cover rounded-2xl border border-slate-100" />
                      </div>
                      <div className="bg-indigo-50 border border-indigo-100 rounded-[28px] p-4 shadow-sm md:col-span-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Theme</span>
                        <p className="text-sm font-black text-slate-900 mt-2">Product Grid Focus</p>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">This path now emphasizes product discovery instead of promo-first framing.</p>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                /* Standard fallback hero */
                <section 
                  className="relative py-28 px-6 text-center text-white bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.95)), url('${resolvedBannerUrl}')`
                  }}
                >
                  <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
                    <span className="text-[9px] bg-white/10 border border-white/15 px-3 py-1 rounded-full font-black uppercase tracking-widest inline-block">
                      {bizEmoji()} {bizType} Platform
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none">{resolvedTitle}</h1>
                    <p className="text-xs sm:text-sm text-slate-350 max-w-md mx-auto leading-relaxed">{resolvedDesc}</p>
                    <div className="pt-2 flex justify-center gap-4 text-xs font-bold uppercase tracking-wider">
                      <a href="#products" className="px-6 py-3 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl transition shadow">Browse Catalog</a>
                      <button onClick={() => setActiveTab('login')} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition">Sign In Portal</button>
                    </div>
                  </div>
                </section>
              )
            )}

            {/* Custom Banner Showcase for banner-focus */}
            {isBannerFocus && (
              <section className="max-w-5xl mx-auto px-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 text-left">
                  <div className="space-y-3 max-w-md">
                    <span className="text-[8px] bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full font-extrabold uppercase">Limited Offer</span>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Active Launch Campaign</h2>
                    <p className="text-xs text-slate-500 leading-relaxed">Enjoy flat 15% off on all items to celebrate our brand new online platform launch. Use checkout coupon code <strong>LAUNCH15</strong> at checkout!</p>
                  </div>
                  <img src={resolvedPhotoUrl} alt="Offer" className="w-full md:w-56 h-36 object-cover rounded-2xl border border-white shadow-md" />
                </div>
              </section>
            )}

            {/* Product Catalog list */}
            <section id="products" className="max-w-5xl mx-auto px-6 space-y-8 text-left">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Menu & Catalog</h2>
                <p className="text-xs text-slate-500 font-semibold">Filterable product inventory catalog items.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                    <div className="h-36 w-full overflow-hidden relative">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2.5 left-2.5 bg-white/90 text-[8px] text-slate-700 font-black px-2 py-0.5 rounded-full uppercase">{p.category}</span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-slate-800 line-clamp-1">{p.name}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold line-clamp-2 leading-relaxed">{p.desc}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-900">₹{p.price}</span>
                        <button 
                          onClick={() => handleAddToCart(p)} 
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer border-none"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Patrons Testimonials */}
            <section className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-100 text-left space-y-8">
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Testimonials</h3>
                <p className="text-xs text-slate-500 font-semibold">What our clients and active visitors say about us.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { quote: `Fabulous experience. The branding of ${resolvedTitle} is spot on and ordering online is extremely fast and smooth.`, author: 'Marcus V.', role: 'Loyal customer' },
                  { quote: `Absolute five stars. The customer support is always active and available via whatsapp dispatcher.`, author: 'Elena S.', role: 'Verified Purchaser' },
                  { quote: `Very premium layout. Highly customizable catalog and beautiful aesthetic styling. Highly recommend.`, author: 'Rahul K.', role: 'Local guide' }
                ].map((t, idx) => (
                  <div key={idx} className="bg-white border border-slate-150 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
                    <p className="text-xs italic text-slate-500 font-semibold leading-relaxed">"{t.quote}"</p>
                    <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center">
                      <div>
                        <h5 className="text-xs font-black text-slate-800 uppercase">{t.author}</h5>
                        <span className="text-[8px] text-slate-400 font-extrabold uppercase">{t.role}</span>
                      </div>
                      <span className="text-amber-500 text-[10px]">★★★★★</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: LOGIN SYSTEM (10 CHOSEN LAYOUT RENDERING) */}
        {activeTab === 'login' && (
          (() => {
            const isNeon = loginLayout === 'neon-dark';
            const isGlass = loginLayout === 'glassmorphism';
            const isMinimal = loginLayout === 'minimal-logo';
            const isRight = loginLayout === 'right-illustration';
            const isLeft = loginLayout === 'left-illustration';
            const isCurved = loginLayout === 'curved-wave';
            const isSplit = loginLayout === 'split-screen';
            const isGlow = loginLayout === 'gradient-glow';
            const isMasonry = loginLayout === 'grid-masonry';
            const isFloatingImg = loginLayout === 'floating-dishes';

            const loginBgClass = 
              isNeon ? 'bg-slate-950 text-white' :
              isGlass ? 'bg-gradient-to-tr from-slate-900 to-indigo-950 text-white' :
              isGlow ? 'bg-slate-900 text-white relative' :
              isMasonry ? 'bg-cover bg-center relative' :
              'bg-slate-50 text-slate-800';

            const formCardClass = 
              isMinimal ? 'w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl' :
              isGlass ? 'w-full max-w-[850px] rounded-[36px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row p-6 gap-6 items-stretch' :
              isNeon ? 'w-full max-w-[850px] bg-slate-900 border border-amber-500/20 rounded-[32px] overflow-hidden flex flex-col md:flex-row p-6 gap-6 items-stretch shadow-[0_0_30px_rgba(245,158,11,0.05)]' :
              isSplit ? 'w-full min-h-screen flex flex-col md:flex-row items-stretch' :
              'w-full max-w-[850px] bg-white border border-slate-200 rounded-[32px] overflow-hidden flex flex-col md:flex-row p-6 gap-6 items-stretch shadow-xl';

            const imageBannerStyle = {
              backgroundImage: `url('${resolvedPhotoUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            };

            return (
              <div 
                className={`min-h-[85vh] flex items-center justify-center p-6 ${loginBgClass}`}
                style={isMasonry ? { backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.85), rgba(15,23,42,0.95)), url('${resolvedBannerUrl}')` } : {}}
              >
                {/* Glow components for radial glow layout */}
                {isGlow && (
                  <>
                    <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
                  </>
                )}

                {/* Floating backgrounds for floating dishes layout */}
                {isFloatingImg && (
                  <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none overflow-hidden select-none">
                    <span className="absolute top-[10%] left-[20%] text-6xl rotate-12">📦</span>
                    <span className="absolute top-[50%] left-[10%] text-6xl -rotate-12">👕</span>
                    <span className="absolute top-[20%] right-[15%] text-6xl rotate-45">🛒</span>
                    <span className="absolute bottom-[15%] right-[25%] text-6xl -rotate-45">✨</span>
                  </div>
                )}

                <div className={formCardClass}>
                  
                  {/* Left Banner Illustration Column (For Left layout, Curved Wave, etc.) */}
                  {((isLeft || isCurved || isGlass || isNeon || isFloatingImg) && !isMinimal) && (
                    <div 
                      className={`flex-1 min-h-[350px] rounded-2xl relative overflow-hidden hidden md:flex flex-col justify-end p-8 text-white ${
                        isCurved ? 'clip-curved-wave' : ''
                      }`}
                      style={imageBannerStyle}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                      <div className="relative z-20 space-y-2">
                        <span className="text-[9px] bg-white/20 backdrop-blur px-2.5 py-1 rounded-full font-black uppercase tracking-wider inline-block">Official Site</span>
                        <h3 className="text-xl font-black uppercase tracking-tight">{resolvedTitle}</h3>
                        <p className="text-[10px] text-slate-350 leading-relaxed font-semibold">{resolvedDesc}</p>
                      </div>
                    </div>
                  )}

                  {/* The Split half screen left column */}
                  {isSplit && (
                    <div className="flex-1 hidden md:block" style={imageBannerStyle} />
                  )}

                  {/* Form Side Column */}
                  <div className="flex-grow max-w-md w-full mx-auto flex flex-col justify-center p-4 md:p-8 text-left z-10">
                    <div className="space-y-2 mb-6">
                      <img src={resolvedLogoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                      <h3 className={`text-xl font-black uppercase ${isNeon ? 'text-amber-500' : 'text-slate-900'}`}>{isSignUp ? 'Join Us Today' : 'Sign In Portal'}</h3>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Credentials testing: <strong>admin@gmail.com</strong> / any other email</p>
                    </div>

                    {loginError && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-[10px] font-bold text-center mb-4">
                        ⚠️ {loginError}
                      </div>
                    )}

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      {isSignUp && (
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase text-slate-400">Account Username</label>
                          <input 
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full border border-slate-200 focus:border-indigo-500 bg-white/50 backdrop-blur rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition" 
                          />
                        </div>
                      )}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400">Email Address *</label>
                        <input 
                          type="email" 
                          value={loginEmail}
                          onChange={e => setLoginEmail(e.target.value)}
                          placeholder="admin@gmail.com" 
                          required
                          className="w-full border border-slate-200 focus:border-indigo-500 bg-white/50 backdrop-blur rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400">Secret Password *</label>
                        <input 
                          type="password" 
                          value={loginPass}
                          onChange={e => setLoginPass(e.target.value)}
                          placeholder="••••••••" 
                          required
                          className="w-full border border-slate-200 focus:border-indigo-500 bg-white/50 backdrop-blur rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition" 
                        />
                      </div>

                      <button 
                        type="submit" 
                        className={`w-full py-3 ${isNeon ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-750'} text-white rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer border-none shadow`}
                      >
                        {isSignUp ? 'Generate Account ➔' : 'Verify Credentials ➔'}
                      </button>
                    </form>

                    <div className="text-center pt-4">
                      <button 
                        onClick={() => setIsSignUp(!isSignUp)}
                        className={`text-[10px] font-extrabold uppercase tracking-wide transition border-none bg-transparent cursor-pointer underline ${
                          isNeon ? 'text-amber-500 hover:text-amber-400' : 'text-indigo-650 hover:text-indigo-850'
                        }`}
                      >
                        {isSignUp ? 'Already registered? Sign In' : 'Create guest client account'}
                      </button>
                    </div>
                  </div>

                  {/* Right Banner Illustration Column (For Right layout, Split-screen, etc.) */}
                  {(isRight && !isMinimal) && (
                    <div 
                      className="flex-1 min-h-[350px] rounded-2xl relative overflow-hidden hidden md:flex flex-col justify-end p-8 text-white"
                      style={imageBannerStyle}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                      <div className="relative z-20 space-y-2">
                        <span className="text-[9px] bg-white/20 backdrop-blur px-2.5 py-1 rounded-full font-black uppercase tracking-wider inline-block">Official Site</span>
                        <h3 className="text-xl font-black uppercase tracking-tight">{resolvedTitle}</h3>
                        <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">{resolvedDesc}</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })()
        )}

        {/* TAB 3: ADAPTIVE ADMIN & USER DASHBOARDS */}
        {activeTab === 'dashboard' && (
          <div className="max-w-5xl mx-auto px-6 py-12 text-left space-y-8 animate-fade-in">
            {customerSession?.role === 'admin' ? (
              /* --- ADMIN SIDE VIEW (admin@gmail.com) --- */
              <div className="space-y-8">
                {/* Header Metrics overview */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-black uppercase tracking-wider">Super Administrator</span>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{resolvedTitle} Telemetry</h2>
                    <p className="text-xs text-slate-400 font-semibold">Welcome back, {customerSession?.name}. Managing {bizType} dashboard.</p>
                  </div>
                  <span className="text-2xl">{bizEmoji()}</span>
                </div>

                {/* Adaptive telemetry cards (Hidden if simple-list selected) */}
                {dashboardLayout !== 'simple-list' && (
                  bizType.toLowerCase().includes('cloth') ? (
                    /* Clothes shop dashboard */
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
                      <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-2">
                        <span className="text-[9px] text-slate-400 font-black uppercase">Wardrobe Sales</span>
                        <h3 className="text-2xl font-black text-slate-900">₹1,24,500</h3>
                        <p className="text-[10px] text-emerald-600 font-bold">▲ +12.4% this month</p>
                      </div>
                      <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-2">
                        <span className="text-[9px] text-slate-400 font-black uppercase">Clothes Dispatched</span>
                        <h3 className="text-2xl font-black text-slate-900">28 active</h3>
                        <p className="text-[10px] text-slate-400 font-semibold">12 pending pickup</p>
                      </div>
                      <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-2">
                        <span className="text-[9px] text-slate-400 font-black uppercase">Inventory Stock</span>
                        <h3 className="text-2xl font-black text-slate-900">340 articles</h3>
                        <p className="text-[10px] text-rose-500 font-bold">▼ 2 items low stock</p>
                      </div>
                    </div>
                  ) : (
                    /* Other dynamic business dashboard */
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
                      <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-2">
                        <span className="text-[9px] text-slate-400 font-black uppercase">{bizType} Telemetry</span>
                        <h3 className="text-2xl font-black text-slate-900">₹84,200</h3>
                        <p className="text-[10px] text-emerald-600 font-bold">▲ +8.2% in simulation</p>
                      </div>
                      <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-2">
                        <span className="text-[9px] text-slate-400 font-black uppercase">Active Sessions</span>
                        <h3 className="text-2xl font-black text-slate-900">18 active</h3>
                        <p className="text-[10px] text-slate-400 font-semibold">Real-time telemetry tracking</p>
                      </div>
                      <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-2">
                        <span className="text-[9px] text-slate-400 font-black uppercase">Niche Capacity</span>
                        <h3 className="text-2xl font-black text-slate-900">92% efficiency</h3>
                        <p className="text-[10px] text-indigo-600 font-bold">Optimal levels</p>
                      </div>
                    </div>
                  )
                )}

                {/* Database logs and graphs - conditional based on selected style */}
                {dashboardLayout === 'compact-menu' ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 animate-fade-in">
                    <h4 className="text-sm font-black uppercase tracking-tight text-slate-800">Quick Dashboard Menu Actions</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'POS Terminal', icon: '💻', desc: 'Accept physical checkouts' },
                        { label: 'Stock Manager', icon: '📦', desc: 'Scan barcode shipments' },
                        { label: 'Dispatch Center', icon: '🚚', desc: 'Print shipping slips' },
                        { label: 'Coupon Campaigns', icon: '🎫', desc: 'Configure launch promo' },
                        { label: 'Staff Attendance', icon: '👥', desc: 'Check employee shifts' },
                        { label: 'Expense Tracker', icon: '💳', desc: 'Register utility bills' },
                        { label: 'Customer Chat', icon: '💬', desc: 'Reply client dispatchers' },
                        { label: 'System Settings', icon: '⚙️', desc: 'Database telemetry' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 border border-slate-100 rounded-2xl hover:border-indigo-500 transition text-center space-y-2 cursor-pointer bg-slate-50/50">
                          <span className="text-2xl">{item.icon}</span>
                          <h5 className="text-xs font-black text-slate-850 uppercase">{item.label}</h5>
                          <p className="text-[8px] text-slate-400 font-semibold">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : dashboardLayout === 'simple-list' ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 animate-fade-in">
                    <h4 className="text-sm font-black uppercase tracking-tight text-slate-800">Full Product Stock Inventory Table</h4>
                    <div className="divide-y divide-slate-100 text-xs">
                      {products.map((p) => (
                        <div key={p.id} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                          <div className="flex items-center gap-3">
                            <img src={p.img} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                            <div>
                              <p className="font-extrabold text-slate-800">{p.name}</p>
                              <span className="text-[9px] bg-slate-150 text-slate-650 px-2 py-0.5 rounded font-black uppercase">{p.category}</span>
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="font-black text-slate-900">₹{p.price}</p>
                            <span className="text-[9px] text-emerald-600 font-bold">● In Stock (24 units)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Standard metric-overview layout */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                    {/* Left: Operations logs */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-tight text-slate-800">Operational Log Dispatch</h4>
                      <div className="divide-y divide-slate-100 text-xs">
                        {[
                          { customer: 'Amit Verma', action: 'Ordered Cotton Hoodie', price: '₹899', time: '10 min ago' },
                          { customer: 'Pooja Sen', action: 'Ordered Retro Denim Jacket', price: '₹1499', time: '1 hour ago' },
                          { customer: 'Vikram Singh', action: 'Checked out starter catalog', price: '₹399', time: '3 hours ago' }
                        ].map((log, idx) => (
                          <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                            <div>
                              <p className="font-extrabold text-slate-800">{log.customer}</p>
                              <span className="text-[10px] text-slate-400 font-semibold">{log.action}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-slate-850">{log.price}</p>
                              <span className="text-[9px] text-slate-400 uppercase font-black">{log.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Right: Products catalog editable grid */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-tight text-slate-800">Configure Product Inventory</h4>
                      <div className="divide-y divide-slate-100 text-xs">
                        {products.map((p) => (
                          <div key={p.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                            <div className="flex items-center gap-2">
                              <img src={p.img} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                              <div>
                                <p className="font-extrabold text-slate-800">{p.name}</p>
                                <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-black uppercase">{p.category}</span>
                              </div>
                            </div>
                            <span className="font-black text-slate-900">₹{p.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* --- CLIENT USER SIDE VIEW --- */
              <div className="space-y-8">
                {/* Header Metrics overview */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-black uppercase tracking-wider">Registered Client</span>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">My Customer Dashboard</h2>
                    <p className="text-xs text-slate-400 font-semibold">Welcome, {customerSession?.name}. Reviewing active orders and profile.</p>
                  </div>
                  <span className="text-2xl">👤</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Order tracking status */}
                  <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4 md:col-span-2">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Track My Deliveries</h4>
                    <div className="divide-y divide-slate-100 text-xs">
                      {[
                        { orderId: '#ORD-8041', item: 'Retro Denim Jacket', status: 'In Transit', date: 'Exp Delivery July 3', price: '₹1499' },
                        { orderId: '#ORD-7012', item: 'Minimalist Canvas Tote', status: 'Delivered', date: 'Delivered June 28', price: '₹399' }
                      ].map((ord, idx) => (
                        <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                          <div>
                            <p className="font-extrabold text-slate-800">{ord.item} <span className="text-slate-400 font-normal">({ord.orderId})</span></p>
                            <span className="text-[10px] text-slate-400 font-semibold">{ord.date}</span>
                          </div>
                          <div className="text-right space-y-1">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                              ord.status === 'In Transit' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>{ord.status}</span>
                            <p className="font-black text-slate-850 text-xs">{ord.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Loyalty Points Wallet */}
                  <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Cashback Wallet</h4>
                    <div className="text-center py-4 space-y-2">
                      <span className="text-3xl">✨</span>
                      <h3 className="text-3xl font-black text-slate-900">450 pts</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Equivalent to ₹45.00 cash rewards credits</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Shopping Cart Drawer overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between p-6 shadow-2xl animate-slide-in">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h4 className="text-sm font-black uppercase text-slate-900">Your Basket</h4>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold bg-transparent border-none text-base cursor-pointer">✕</button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <span className="text-3xl block">🛒</span>
                  <p className="text-xs text-slate-400 font-semibold">Your shopping cart is empty.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 overflow-y-auto max-h-[60vh] text-xs">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-extrabold text-slate-800">{item.name}</p>
                          <span className="text-[10px] text-slate-400 font-semibold">Qty: {item.qty} × ₹{item.price}</span>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveFromCart(item.id)} className="text-rose-500 hover:text-rose-600 bg-transparent border-none cursor-pointer font-bold">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-100 pt-6 space-y-4 text-xs">
                <div className="flex justify-between items-center font-black text-slate-850">
                  <span>Subtotal:</span>
                  <span>₹{cart.reduce((a, b) => a + (b.price * b.qty), 0)}</span>
                </div>
                <button onClick={() => { setCart([]); setIsCartOpen(false); alert('Mock Checkout completed successfully!'); }} className="w-full py-3 bg-indigo-600 hover:bg-indigo-755 text-white rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer border-none shadow">
                  Proceed to Checkout ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-850 py-12 px-6 text-center text-[10px] text-slate-500 font-sans space-y-2 select-none">
        <p className="font-black text-slate-400 uppercase tracking-widest">{bizEmoji()} {resolvedTitle} {bizEmoji()}</p>
        <p>© 2026 {resolvedTitle}. Powered by custom scratch canvas. All rights reserved.</p>
      </footer>

    </div>
  );
}
