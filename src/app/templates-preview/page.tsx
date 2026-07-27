'use client';

import { useState } from 'react';

// Verification types
type TemplateNiche = 'clothing' | 'fruits';
type TemplatePage = 'home' | 'login' | 'user' | 'admin';

// Static Products Data
const CLOTHING_PRODUCTS = [
  { id: 1, name: 'Minimalist Cotton Tee', price: 999, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80', rating: 4.8 },
  { id: 2, name: 'Classic Denim Jacket', price: 2999, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=80', rating: 4.9 },
  { id: 3, name: 'Linen Summer Dress', price: 2499, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80', rating: 4.7 },
  { id: 4, name: 'Designer Leather Boots', price: 4599, image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&fit=crop&q=80', rating: 5.0 },
];

const FRUITS_PRODUCTS = [
  { id: 1, name: 'Organic Strawberries (250g)', price: 180, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=80', rating: 4.9 },
  { id: 2, name: 'Organic Hass Avocados (2pcs)', price: 240, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80', rating: 4.8 },
  { id: 3, name: 'Crisp Royal Gala Apples (1kg)', price: 190, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80', rating: 4.7 },
  { id: 4, name: 'Tropical Golden Mangoes (1kg)', price: 350, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80', rating: 5.0 },
];

export default function TemplatesPreviewPage() {
  const [selectedNiche, setSelectedNiche] = useState<TemplateNiche>('clothing');
  const [activePage, setActivePage] = useState<TemplatePage>('home');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [activeUserTab, setActiveUserTab] = useState<string>('Home');
  const [wishlistCount, setWishlistCount] = useState(12);

  // Toggle selectors
  const toggleNiche = (niche: TemplateNiche) => {
    setSelectedNiche(niche);
    setActivePage('home');
  };

  return (
    <main className="min-h-screen w-full bg-[#fafafd] flex flex-col font-sans select-none">
      
      {/* Top Banner Control Panel */}
      <header className="w-full bg-white border-b border-slate-200 shadow-sm px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-650 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
            Z
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 tracking-tight leading-tight">Zatbiz Storefront Studio</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-450">Template Simulator</span>
          </div>
        </div>

        {/* Niche Selector */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => toggleNiche('clothing')}
            className={`px-5 py-2 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer ${
              selectedNiche === 'clothing' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-550 hover:text-slate-800'
            }`}
          >
            <span>👗</span> Clothing Store
          </button>
          <button
            onClick={() => toggleNiche('fruits')}
            className={`px-5 py-2 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer ${
              selectedNiche === 'fruits' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-550 hover:text-slate-800'
            }`}
          >
            <span>🍎</span> Fresh Fruits
          </button>
        </div>

        {/* Page Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {(['home', 'login', 'user', 'admin'] as TemplatePage[]).map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-4 py-2 text-xs font-black capitalize rounded-xl transition cursor-pointer ${
                activePage === page
                  ? selectedNiche === 'clothing'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-550 hover:text-slate-800'
              }`}
            >
              {page === 'user' ? 'User Portal' : page === 'admin' ? 'Admin Portal' : page}
            </button>
          ))}
        </div>
      </header>

      {/* Main Sandbox Area */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-8 space-y-6">
        
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400 select-none">
          <a href="/dashboard" className="hover:text-indigo-600 transition">Dashboard</a>
          <span>/</span>
          <span className="hover:text-indigo-600 cursor-pointer" onClick={() => setActivePage('home')}>Templates Preview</span>
          <span>/</span>
          <span className="hover:text-indigo-600 cursor-pointer" onClick={() => setActivePage('home')}>
            {selectedNiche === 'clothing' ? 'Clothing Store' : 'Fresh Fruits'}
          </span>
          <span>/</span>
          <span className="text-slate-600">
            {activePage === 'home' && 'Homepage'}
            {activePage === 'login' && 'Login Page'}
            {activePage === 'user' && 'User Dashboard'}
            {activePage === 'admin' && 'Admin Dashboard'}
          </span>
        </div>
        
        {/* Simulating Clothing Template */}
        {selectedNiche === 'clothing' && (
          <div className="w-full bg-white rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.04)] overflow-hidden min-h-[700px] flex flex-col">
            
            {/* Clothing - HOMEPAGE */}
            {activePage === 'home' && (
              <div className="w-full flex flex-col bg-white">
                
                {/* Navbar */}
                <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
                  <div className="flex items-center gap-2 font-black text-lg text-slate-900 tracking-tight">
                    <span className="text-indigo-600">AURA</span> WEAR
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-650">
                    <a className="hover:text-indigo-600 cursor-pointer">Home</a>
                    <a className="hover:text-indigo-600 cursor-pointer">Shop</a>
                    <a className="hover:text-indigo-600 cursor-pointer">New Arrivals</a>
                    <a className="hover:text-indigo-600 cursor-pointer">Summer Sale</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-slate-700 text-xs font-bold bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition cursor-pointer" onClick={() => setActivePage('login')}>
                      Login
                    </button>
                  </div>
                </nav>

                {/* Hero Section */}
                <section className="relative px-6 py-16 md:py-24 bg-gradient-to-r from-indigo-50/50 to-purple-50/30 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 text-left space-y-6">
                    <span className="bg-indigo-100/60 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Summer Collection 2026</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                      Redefine Your Style & Comfort
                    </h2>
                    <p className="text-slate-550 text-sm leading-relaxed max-w-md">
                      Explore our hand-curated summer apparel designed with pure organic cotton. Feel the breeze, love the colors.
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
                        Shop Collection ➔
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 w-full max-w-md rounded-[28px] overflow-hidden aspect-[4/3] shadow-lg relative border border-slate-200/50">
                    <img
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80"
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Fashion banner"
                    />
                  </div>
                </section>

                {/* Features Grid */}
                <section className="px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-100">
                  <div className="p-6 bg-slate-50 rounded-2xl flex items-center gap-4 text-left">
                    <span className="text-3xl">🚚</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-850">Free Shipping</h4>
                      <p className="text-[10px] text-slate-400">On all orders above ₹1,500</p>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl flex items-center gap-4 text-left">
                    <span className="text-3xl">🔄</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-850">Easy Returns</h4>
                      <p className="text-[10px] text-slate-400">30-day hassle free replacement</p>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl flex items-center gap-4 text-left">
                    <span className="text-3xl">🛡️</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-850">Secure Payment</h4>
                      <p className="text-[10px] text-slate-400">100% end-to-end encrypted transactions</p>
                    </div>
                  </div>
                </section>

                {/* Trending Products */}
                <section className="px-6 py-16 space-y-8">
                  <div className="text-center max-w-xs mx-auto space-y-1">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Trending Items</h3>
                    <p className="text-xs text-slate-400">Most loved designs of this week</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {CLOTHING_PRODUCTS.map((prod) => (
                      <div key={prod.id} className="group border border-slate-150 rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col bg-white">
                        <div className="aspect-[3/4] w-full overflow-hidden bg-slate-100 relative">
                          <img src={prod.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={prod.name} />
                          <span className="absolute top-3 left-3 bg-white/90 text-slate-850 font-black text-[9px] px-2 py-0.5 rounded-md shadow-sm">
                            ★ {prod.rating}
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-1.5">
                          <h4 className="text-xs font-black text-slate-800 leading-tight truncate">{prod.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-indigo-650">₹{prod.price}</span>
                            <button className="p-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-650 hover:text-indigo-600 rounded-lg transition cursor-pointer text-[10px] font-bold">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Promo Banner */}
                <section className="mx-6 mb-12 p-8 bg-indigo-900 rounded-[24px] text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-700/25 blur-3xl pointer-events-none" />
                  <div className="text-left space-y-2 z-10">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">Grab Extra 15% OFF On First Purchase!</h3>
                    <p className="text-xs text-indigo-200 max-w-sm">Use coupon code <span className="bg-indigo-800 text-indigo-100 px-2 py-0.5 rounded-md font-extrabold ml-1">WELCOME15</span> at simulation checkout.</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-indigo-700 font-bold text-xs rounded-xl shadow-md hover:bg-slate-55 transition z-10 cursor-pointer">
                    Get Offer Now
                  </button>
                </section>

              </div>
            )}

            {/* Clothing - LOGIN PAGE */}
            {activePage === 'login' && (
              <div className="w-full flex items-center justify-center p-8 bg-[#f5f4f8] min-h-[620px]">
                
                {/* Unified Card Container */}
                <div className="w-full max-w-4xl bg-white rounded-[32px] border border-slate-200 shadow-xl flex flex-col md:flex-row items-stretch p-3 gap-6">
                  
                  {/* Left Side: Modern illustration image */}
                  <div className="flex-1 relative hidden md:flex bg-slate-50 rounded-[24px] overflow-hidden min-h-[440px] items-center justify-center border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80"
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Fashion login"
                    />
                    <div className="absolute inset-0 bg-indigo-950/20" />
                    <div className="absolute bottom-6 left-6 text-white text-left z-10 max-w-xs space-y-1">
                      <h4 className="font-extrabold text-lg leading-tight">Elevate Your Lifestyle</h4>
                      <p className="text-[10px] text-slate-200">Unlock custom member prices and early access to summer lines.</p>
                    </div>
                  </div>

                  {/* Right Side: Form */}
                  <div className="w-full md:max-w-[400px] bg-white p-6 md:p-8 flex flex-col justify-between text-left">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-650 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                          Z
                        </div>
                        <span className="font-black text-sm text-slate-855 tracking-tight">AURA WEAR</span>
                      </div>
                      <div>
                        <h3 className="font-black text-xl text-slate-900 leading-tight">Welcome Back!</h3>
                        <p className="text-[10px] text-slate-450 mt-1 uppercase font-bold tracking-wide">Login to your clothing account</p>
                      </div>

                      <form className="space-y-3.5 pt-2" onSubmit={(e) => { e.preventDefault(); setActivePage('user'); }}>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-black uppercase text-slate-400 tracking-wider">Email Address</label>
                          <input
                            type="email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="sarah@aura.com"
                            className="w-full rounded-xl pl-4 pr-4 py-2.5 bg-white border border-slate-200 text-slate-850 placeholder:text-slate-400 outline-none text-xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-150"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-black uppercase text-slate-400 tracking-wider">Password</label>
                          <input
                            type="password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl pl-4 pr-4 py-2.5 bg-white border border-slate-200 text-slate-850 placeholder:text-slate-400 outline-none text-xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-150"
                          />
                        </div>
                        <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:scale-[1.01] transition border-none cursor-pointer">
                          Login ➔
                        </button>
                      </form>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-6 text-center">
                      <p className="text-[10px] text-slate-400 font-bold">
                        New Customer? <span className="text-indigo-650 hover:underline cursor-pointer">Create Account</span>
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Clothing - USER DASHBOARD */}
            {activePage === 'user' && (
              <div className="w-full flex flex-col md:flex-row items-stretch min-h-[600px] bg-[#fdfdfd]">
                
                {/* Sidebar (Matches screenshot style) */}
                <aside className="w-full md:w-64 bg-[#f7f5f0] border-r border-slate-200/60 p-5 flex flex-col gap-1.5 text-left">
                  <div className="flex items-center gap-3 px-3 py-4 mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-105 text-indigo-600 font-extrabold flex items-center justify-center text-xs">SJ</div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 leading-tight">Sarah Jenkins</h4>
                      <p className="text-[9px] text-slate-450">VIP Member</p>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  {[
                    { name: 'Home', icon: '🏠', badge: null },
                    { name: 'Browse Products', icon: '🧭', badge: null },
                    { name: 'Categories', icon: '🥞', badge: null },
                    { name: 'My Orders', icon: '🧾', badge: null },
                    { name: 'Downloads', icon: '📥', badge: null },
                    { name: 'Wishlist', icon: '❤️', badge: wishlistCount },
                    { name: 'Reviews', icon: '⭐', badge: null },
                    { name: 'Messages', icon: '💬', badge: null },
                    { name: 'Settings', icon: '⚙️', badge: null },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveUserTab(item.name)}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer bg-transparent border-none ${
                        activeUserTab === item.name
                          ? 'bg-slate-200/80 text-indigo-600'
                          : 'text-slate-650 hover:bg-slate-200/40 hover:text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== null && (
                        <span className="bg-slate-200 text-slate-700 text-[8px] font-black px-2 py-0.5 rounded-full border border-slate-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </aside>

                {/* Content Frame */}
                <div className="flex-1 p-6 md:p-8 text-left bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-base font-black text-slate-850">{activeUserTab} Panel</h3>
                    <span className="text-[9px] font-black bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-wider">
                      Simulated Client Mode
                    </span>
                  </div>

                  {activeUserTab === 'Home' && (
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100/20 border border-indigo-100 rounded-2xl space-y-2">
                        <h4 className="text-sm font-black text-indigo-950">Welcome back to AURA, Sarah! 🎉</h4>
                        <p className="text-xs text-slate-555 max-w-md">Your summer wardrobe delivery is scheduled for tomorrow. Check order history below.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Spent</span>
                          <p className="text-lg font-black text-slate-800">₹8,490</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Orders</span>
                          <p className="text-lg font-black text-slate-800">1 Pending</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Wishlist Items</span>
                          <p className="text-lg font-black text-indigo-600">{wishlistCount} Products</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeUserTab !== 'Home' && (
                    <div className="py-12 text-center max-w-sm mx-auto space-y-2 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                      <span className="text-3xl">🧬</span>
                      <h4 className="text-xs font-black text-slate-800">Client tab "{activeUserTab}" is simulated</h4>
                      <p className="text-[10px] text-slate-400">All data interactions on user portal are active for live customization preview.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Clothing - ADMIN DASHBOARD */}
            {activePage === 'admin' && (
              <div className="w-full flex flex-col md:flex-row items-stretch min-h-[600px] bg-slate-55">
                
                {/* Admin Sidebar */}
                <aside className="w-full md:w-60 bg-slate-900 text-white p-5 flex flex-col gap-1.5 text-left flex-shrink-0">
                  <div className="flex items-center gap-2.5 px-2 py-4 mb-4 border-b border-slate-800">
                    <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-extrabold text-white">
                      A
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-100">Aura Admin</h4>
                      <p className="text-[8px] text-slate-450 uppercase font-black tracking-wider text-emerald-400">Store active</p>
                    </div>
                  </div>

                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 px-3.5 mb-1.5">Overview</span>
                  <a className="bg-slate-800 text-indigo-400 px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer">
                    📊 Analytics
                  </a>
                  <a className="text-slate-350 hover:bg-slate-800 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer">
                    📦 Products Inventory
                  </a>
                  <a className="text-slate-350 hover:bg-slate-800 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer">
                    🧾 Customer Orders
                  </a>
                  <a className="text-slate-350 hover:bg-slate-800 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer">
                    ⚙️ Settings
                  </a>
                </aside>

                {/* Admin Content Area */}
                <div className="flex-1 p-6 md:p-8 text-left space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-205 pb-4">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-450">Studio Portal</span>
                      <h3 className="text-lg font-black text-slate-900 mt-0.5">Simulated Store Dashboard</h3>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow cursor-pointer">
                      Export Report
                    </button>
                  </div>

                  {/* Analytics Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-1 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Sales</span>
                      <p className="text-xl font-black text-slate-900">₹1,45,280</p>
                      <span className="text-[9px] font-bold text-emerald-600">+12% vs last week</span>
                    </div>
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-1 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Orders</span>
                      <p className="text-xl font-black text-slate-900">428</p>
                      <span className="text-[9px] font-bold text-emerald-600">+8% growth</span>
                    </div>
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-1 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Customers</span>
                      <p className="text-xl font-black text-slate-900">1,890</p>
                      <span className="text-[9px] font-bold text-indigo-600">32 new signups today</span>
                    </div>
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-1 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Conversion</span>
                      <p className="text-xl font-black text-slate-900">3.4%</p>
                      <span className="text-[9px] font-bold text-emerald-600">Optimal health</span>
                    </div>
                  </div>

                  {/* Chart and Activity Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm lg:col-span-2 space-y-4">
                      <h4 className="text-xs font-black text-slate-850">Weekly Sales Curve</h4>
                      <div className="h-44 w-full bg-slate-50 border border-slate-200/60 rounded-xl flex items-end p-4 gap-3">
                        {/* Simulated Bars */}
                        {[40, 60, 45, 80, 55, 90, 75].map((val, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                            <div className="w-full bg-indigo-600 rounded-t-md hover:bg-indigo-700 transition" style={{ height: `${val}px` }} />
                            <span className="text-[8px] text-slate-400 font-bold">D{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-4">
                      <h4 className="text-xs font-black text-slate-850">Recent Orders Feed</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <h5 className="font-extrabold text-slate-800">Sarah J. (#1090)</h5>
                            <span className="text-[9px] text-slate-400">1 item • Delhi</span>
                          </div>
                          <span className="font-black text-indigo-600">₹2,999</span>
                        </div>
                        <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3.5">
                          <div>
                            <h5 className="font-extrabold text-slate-800">Michael S. (#1089)</h5>
                            <span className="text-[9px] text-slate-400">2 items • Mumbai</span>
                          </div>
                          <span className="font-black text-indigo-600">₹3,450</span>
                        </div>
                        <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3.5">
                          <div>
                            <h5 className="font-extrabold text-slate-800">Rita K. (#1088)</h5>
                            <span className="text-[9px] text-slate-400">1 item • Pune</span>
                          </div>
                          <span className="font-black text-indigo-600">₹999</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Simulating Fruits Template */}
        {selectedNiche === 'fruits' && (
          <div className="w-full bg-white rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.04)] overflow-hidden min-h-[700px] flex flex-col">
            
            {/* Fruits - HOMEPAGE */}
            {activePage === 'home' && (
              <div className="w-full flex flex-col bg-white">
                
                {/* Navbar */}
                <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
                  <div className="flex items-center gap-2 font-black text-lg text-slate-900 tracking-tight">
                    <span className="text-emerald-600">ORGANO</span> MART
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-655">
                    <a className="hover:text-emerald-600 cursor-pointer">Home</a>
                    <a className="hover:text-emerald-600 cursor-pointer">Shop Fruits</a>
                    <a className="hover:text-emerald-600 cursor-pointer">Organic Juices</a>
                    <a className="hover:text-emerald-600 cursor-pointer">Weekly Offers</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-slate-700 text-xs font-bold bg-slate-55 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition cursor-pointer" onClick={() => setActivePage('login')}>
                      Login
                    </button>
                  </div>
                </nav>

                {/* Hero Section */}
                <section className="relative px-6 py-16 md:py-24 bg-gradient-to-r from-emerald-50/50 to-teal-50/30 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 text-left space-y-6">
                    <span className="bg-emerald-100/60 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">100% Farm Fresh Produce</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                      Healthy Fruits For Healthy Living
                    </h2>
                    <p className="text-slate-550 text-sm leading-relaxed max-w-md">
                      Plucked fresh at dawn, packed under strict hygiene conditions, and delivered directly to your doorstep in eco-friendly boxes.
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
                        Order Fresh Now ➔
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 w-full max-w-md rounded-[28px] overflow-hidden aspect-[4/3] shadow-lg relative border border-slate-200/50">
                    <img
                      src="https://images.unsplash.com/photo-1610832958506-ee563361f155?w=800&auto=format&fit=crop&q=80"
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Organic fruits"
                    />
                  </div>
                </section>

                {/* Features Grid */}
                <section className="px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-100">
                  <div className="p-6 bg-slate-55 rounded-2xl flex items-center gap-4 text-left">
                    <span className="text-3xl">🍓</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-850">100% Organic</h4>
                      <p className="text-[10px] text-slate-400">Zero chemical fertilizers used</p>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-55 rounded-2xl flex items-center gap-4 text-left">
                    <span className="text-3xl">⚡</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-855">Same Day Delivery</h4>
                      <p className="text-[10px] text-slate-400">Fresh within 4 hours in metro cities</p>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-55 rounded-2xl flex items-center gap-4 text-left">
                    <span className="text-3xl">❄️</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-855">Cold Chain Storage</h4>
                      <p className="text-[10px] text-slate-400">Guaranteed freshness intact</p>
                    </div>
                  </div>
                </section>

                {/* Trending Products */}
                <section className="px-6 py-16 space-y-8">
                  <div className="text-center max-w-xs mx-auto space-y-1">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Best Sellers</h3>
                    <p className="text-xs text-slate-400">Organic produce of this morning</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {FRUITS_PRODUCTS.map((prod) => (
                      <div key={prod.id} className="group border border-slate-150 rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col bg-white">
                        <div className="aspect-[3/4] w-full overflow-hidden bg-slate-100 relative">
                          <img src={prod.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={prod.name} />
                          <span className="absolute top-3 left-3 bg-white/90 text-slate-850 font-black text-[9px] px-2 py-0.5 rounded-md shadow-sm">
                            ★ {prod.rating}
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-1.5">
                          <h4 className="text-xs font-black text-slate-850 leading-tight truncate">{prod.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-emerald-650">₹{prod.price}</span>
                            <button className="p-1.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-655 hover:text-emerald-600 rounded-lg transition cursor-pointer text-[10px] font-bold">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Promo Banner */}
                <section className="mx-6 mb-12 p-8 bg-emerald-900 rounded-[24px] text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-700/25 blur-3xl pointer-events-none" />
                  <div className="text-left space-y-2 z-10">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">Fresh Juices Flat 20% Discount!</h3>
                    <p className="text-xs text-emerald-200 max-w-sm">Use coupon code <span className="bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded-md font-extrabold ml-1">JUICE20</span> at checkout.</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-emerald-700 font-bold text-xs rounded-xl shadow-md hover:bg-slate-55 transition z-10 cursor-pointer">
                    Browse Juices
                  </button>
                </section>

              </div>
            )}

            {/* Fruits - LOGIN PAGE */}
            {activePage === 'login' && (
              <div className="w-full flex items-center justify-center p-8 bg-[#f5f8f6] min-h-[620px]">
                
                {/* Unified Card Container */}
                <div className="w-full max-w-4xl bg-white rounded-[32px] border border-slate-200 shadow-xl flex flex-col md:flex-row items-stretch p-3 gap-6">
                  
                  {/* Left Side: Modern illustration image */}
                  <div className="flex-1 relative hidden md:flex bg-slate-50 rounded-[24px] overflow-hidden min-h-[440px] items-center justify-center border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1610832958506-ee563361f155?w=600&auto=format&fit=crop&q=80"
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Fruits login"
                    />
                    <div className="absolute inset-0 bg-emerald-950/20" />
                    <div className="absolute bottom-6 left-6 text-white text-left z-10 max-w-xs space-y-1">
                      <h4 className="font-extrabold text-lg leading-tight">Fresh organic baskets</h4>
                      <p className="text-[10px] text-slate-200">Access exclusive seasonal yields and local farm subscription updates.</p>
                    </div>
                  </div>

                  {/* Right Side: Form */}
                  <div className="w-full md:max-w-[400px] bg-white p-6 md:p-8 flex flex-col justify-between text-left">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-650 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                          Z
                        </div>
                        <span className="font-black text-sm text-slate-855 tracking-tight">ORGANO MART</span>
                      </div>
                      <div>
                        <h3 className="font-black text-xl text-slate-900 leading-tight">Welcome Back!</h3>
                        <p className="text-[10px] text-slate-455 mt-1 uppercase font-bold tracking-wide">Login to your organic account</p>
                      </div>

                      <form className="space-y-3.5 pt-2" onSubmit={(e) => { e.preventDefault(); setActivePage('user'); }}>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-black uppercase text-slate-400 tracking-wider">Email Address</label>
                          <input
                            type="email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="david@organo.com"
                            className="w-full rounded-xl pl-4 pr-4 py-2.5 bg-white border border-slate-200 text-slate-850 placeholder:text-slate-400 outline-none text-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-150"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-black uppercase text-slate-400 tracking-wider">Password</label>
                          <input
                            type="password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl pl-4 pr-4 py-2.5 bg-white border border-slate-200 text-slate-850 placeholder:text-slate-400 outline-none text-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-150"
                          />
                        </div>
                        <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md hover:scale-[1.01] transition border-none cursor-pointer">
                          Login ➔
                        </button>
                      </form>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-6 text-center">
                      <p className="text-[10px] text-slate-400 font-bold">
                        New Customer? <span className="text-emerald-650 hover:underline cursor-pointer">Create Account</span>
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Fruits - USER DASHBOARD */}
            {activePage === 'user' && (
              <div className="w-full flex flex-col md:flex-row items-stretch min-h-[600px] bg-[#fdfdfd]">
                
                {/* Sidebar (Matches screenshot style) */}
                <aside className="w-full md:w-64 bg-[#f5f7f6] border-r border-slate-200/60 p-5 flex flex-col gap-1.5 text-left">
                  <div className="flex items-center gap-3 px-3 py-4 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-extrabold flex items-center justify-center text-xs">DM</div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 leading-tight">David Miller</h4>
                      <p className="text-[9px] text-slate-450">Green Member</p>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  {[
                    { name: 'Home', icon: '🏠', badge: null },
                    { name: 'Browse Products', icon: '🧭', badge: null },
                    { name: 'Categories', icon: '🥞', badge: null },
                    { name: 'My Orders', icon: '🧾', badge: null },
                    { name: 'Downloads', icon: '📥', badge: null },
                    { name: 'Wishlist', icon: '❤️', badge: 4 },
                    { name: 'Reviews', icon: '⭐', badge: null },
                    { name: 'Messages', icon: '💬', badge: null },
                    { name: 'Settings', icon: '⚙️', badge: null },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveUserTab(item.name)}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer bg-transparent border-none ${
                        activeUserTab === item.name
                          ? 'bg-slate-200/80 text-emerald-600'
                          : 'text-slate-655 hover:bg-slate-200/40 hover:text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== null && (
                        <span className="bg-slate-200 text-slate-700 text-[8px] font-black px-2 py-0.5 rounded-full border border-slate-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </aside>

                {/* Content Frame */}
                <div className="flex-1 p-6 md:p-8 text-left bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-base font-black text-slate-850">{activeUserTab} Panel</h3>
                    <span className="text-[9px] font-black bg-emerald-50 border border-emerald-100 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-wider">
                      Simulated Client Mode
                    </span>
                  </div>

                  {activeUserTab === 'Home' && (
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/20 border border-emerald-100 rounded-2xl space-y-2">
                        <h4 className="text-sm font-black text-emerald-950">Welcome back, David! 🍏</h4>
                        <p className="text-xs text-slate-555 max-w-md">Your fresh box of mangoes and organic strawberries is packed and ready for delivery.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total spent</span>
                          <p className="text-lg font-black text-slate-800">₹1,850</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active orders</span>
                          <p className="text-lg font-black text-slate-800">1 out for delivery</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-1">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Wishlist items</span>
                          <p className="text-lg font-black text-emerald-600">4 items</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeUserTab !== 'Home' && (
                    <div className="py-12 text-center max-w-sm mx-auto space-y-2 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                      <span className="text-3xl">🍏</span>
                      <h4 className="text-xs font-black text-slate-850">Client tab "{activeUserTab}" is simulated</h4>
                      <p className="text-[10px] text-slate-400">All data interactions on user portal are active for live customization preview.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Fruits - ADMIN DASHBOARD */}
            {activePage === 'admin' && (
              <div className="w-full flex flex-col md:flex-row items-stretch min-h-[600px] bg-slate-55">
                
                {/* Admin Sidebar */}
                <aside className="w-full md:w-60 bg-slate-900 text-white p-5 flex flex-col gap-1.5 text-left flex-shrink-0">
                  <div className="flex items-center gap-2.5 px-2 py-4 mb-4 border-b border-slate-800">
                    <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-xs font-extrabold text-white">
                      A
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-100">Organo Admin</h4>
                      <p className="text-[8px] text-slate-450 uppercase font-black tracking-wider text-emerald-400">Store active</p>
                    </div>
                  </div>

                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 px-3.5 mb-1.5">Produce manager</span>
                  <a className="bg-slate-800 text-emerald-455 px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer">
                    📊 Analytics
                  </a>
                  <a className="text-slate-350 hover:bg-slate-800 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer">
                    📦 Fresh Stock Inventory
                  </a>
                  <a className="text-slate-350 hover:bg-slate-800 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer">
                    🧾 Fresh Orders
                  </a>
                  <a className="text-slate-350 hover:bg-slate-800 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer">
                    ⚙️ Settings
                  </a>
                </aside>

                {/* Admin Content Area */}
                <div className="flex-1 p-6 md:p-8 text-left space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-205 pb-4">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-455">Studio Portal</span>
                      <h3 className="text-lg font-black text-slate-900 mt-0.5">Fresh produce dashboard</h3>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow cursor-pointer">
                      Export Report
                    </button>
                  </div>

                  {/* Analytics Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-1 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Sales</span>
                      <p className="text-xl font-black text-slate-900">₹82,450</p>
                      <span className="text-[9px] font-bold text-emerald-600">+15% vs yesterday</span>
                    </div>
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-1 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Orders</span>
                      <p className="text-xl font-black text-slate-900">190</p>
                      <span className="text-[9px] font-bold text-emerald-600">+10% growth</span>
                    </div>
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-1 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Customers</span>
                      <p className="text-xl font-black text-slate-900">620</p>
                      <span className="text-[9px] font-bold text-emerald-600">8 new signups today</span>
                    </div>
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-1 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Stock Alert</span>
                      <p className="text-xl font-black text-rose-600">5 Low Stock</p>
                      <span className="text-[9px] font-bold text-slate-400">Needs pluck refresh</span>
                    </div>
                  </div>

                  {/* Chart and Activity Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm lg:col-span-2 space-y-4">
                      <h4 className="text-xs font-black text-slate-850">Weekly Produce Demand</h4>
                      <div className="h-44 w-full bg-slate-55 border border-slate-200/60 rounded-xl flex items-end p-4 gap-3">
                        {/* Simulated Bars */}
                        {[25, 45, 60, 35, 70, 85, 95].map((val, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                            <div className="w-full bg-emerald-600 rounded-t-md hover:bg-emerald-700 transition" style={{ height: `${val}px` }} />
                            <span className="text-[8px] text-slate-400 font-bold">D{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-4">
                      <h4 className="text-xs font-black text-slate-850">Recent Orders Feed</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <h5 className="font-extrabold text-slate-800">David M. (#142)</h5>
                            <span className="text-[9px] text-slate-400">2 items • Sector 45</span>
                          </div>
                          <span className="font-black text-emerald-600">₹420</span>
                        </div>
                        <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3.5">
                          <div>
                            <h5 className="font-extrabold text-slate-800">Alice R. (#141)</h5>
                            <span className="text-[9px] text-slate-400">3 items • Green Ville</span>
                          </div>
                          <span className="font-black text-emerald-600">₹720</span>
                        </div>
                        <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3.5">
                          <div>
                            <h5 className="font-extrabold text-slate-800">John D. (#140)</h5>
                            <span className="text-[9px] text-slate-400">1 item • Downtown</span>
                          </div>
                          <span className="font-black text-emerald-600">₹180</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
