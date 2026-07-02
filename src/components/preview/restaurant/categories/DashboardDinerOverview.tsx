import React, { useState } from 'react';

interface DashboardDinerOverviewProps {
  primaryColor: string;
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab: (tab: string) => void;
}

export function DashboardDinerOverview({
  primaryColor,
  walletBalance,
  setWalletBalance,
  setActiveTab
}: DashboardDinerOverviewProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    { name: 'Gourmet Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80', count: '12 items' },
    { name: 'Smash Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80', count: '8 items' },
    { name: 'Artisan Pasta', img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&auto=format&fit=crop&q=80', count: '6 items' },
    { name: 'Healthy Bowls', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&auto=format&fit=crop&q=80', count: '9 items' },
    { name: 'Sweet Delights', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&auto=format&fit=crop&q=80', count: '10 items' },
    { name: 'Craft Drinks', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&auto=format&fit=crop&q=80', count: '15 items' },
  ];

  const specials = [
    {
      name: 'Black Truffle Tagliatelle',
      type: 'Chef\'s Signature',
      desc: 'Fresh hand-cut ribbon pasta tossed in truffle butter sauce and aged Parmigiano-Reggiano.',
      price: '₹480',
      image: 'https://images.unsplash.com/photo-1621996346565-e3bb64e0be5e?w=500&auto=format&fit=crop&q=80',
      badge: 'Best Seller'
    },
    {
      name: 'Charcoal Roasted Tandoori Salmon',
      type: 'Spice Special',
      desc: 'Atlantic salmon fillet marinated in Greek yogurt and hand-ground royal spices, slow-grilled in clay oven.',
      price: '₹550',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=80',
      badge: 'Chef Choice'
    }
  ];

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left font-sans">
      <div className="lg:col-span-8 space-y-6">
        
        {/* Banner Hero Card */}
        <div 
          className="relative bg-slate-900 rounded-3xl p-8 overflow-hidden min-h-[220px] flex flex-col justify-end group shadow-lg"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15, 17, 26, 0.95) 40%, rgba(15, 17, 26, 0.4) 100%), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&auto=format&fit=crop&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 max-w-md space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 border border-white/10 inline-block">
              ✨ Premium Dining Club
            </span>
            <h3 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight leading-tight uppercase font-serif">
              A Symphony of Exquisite Flavors
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed font-medium">
              Treat yourself to our handcrafted dishes, locally sourced ingredients, and gourmet recipes created by award-winning chefs.
            </p>
            <div className="pt-3 flex gap-3">
              <button 
                onClick={() => setActiveTab('items')} 
                className="px-6 py-3 text-slate-900 font-extrabold text-xs rounded-xl transition duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer shadow-md border-none flex items-center gap-1.5" 
                style={{ backgroundColor: primaryColor }}
              >
                📖 Explore Plated Menu
              </button>
            </div>
          </div>
          {/* Subtle background glow effect */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none transition duration-500 group-hover:opacity-75" />
        </div>

        {/* Visual Category Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Browse Categories</h3>
            <button onClick={() => setActiveTab('items')} className="text-[10px] font-extrabold hover:underline uppercase tracking-wider" style={{ color: primaryColor }}>
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                onClick={() => setActiveTab('items')}
                className="bg-white border border-stone-200/80 rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer hover:border-slate-300 hover:shadow-md transition-all duration-350 group"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-stone-100 group-hover:border-slate-200 transition">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                </div>
                <span className="text-[11px] font-extrabold text-slate-800 leading-tight block">{cat.name}</span>
                <span className="text-[9px] text-slate-400 font-bold mt-0.5">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chef Specials Deck */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Tonight's Plated Masterpieces</h3>
            <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Freshly Plated
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specials.map((s, i) => (
              <div key={i} className="bg-stone-50 border border-stone-200/60 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                <div className="h-40 bg-stone-200 relative overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider border border-white/10">
                    {s.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm shadow-sm text-xs font-black px-3 py-1.5 rounded-xl font-mono text-slate-800">
                    {s.price}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-wider block" style={{ color: primaryColor }}>
                      {s.type}
                    </span>
                    <h4 className="font-extrabold text-slate-800 text-xs leading-tight uppercase">
                      {s.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('items');
                    }}
                    className="w-full py-2 bg-white hover:bg-stone-100 border border-stone-200 hover:border-stone-300 text-slate-800 font-black text-[10px] uppercase rounded-xl transition cursor-pointer shadow-sm tracking-wider"
                  >
                    🛒 Add Specially
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column: Wallet & Vouchers */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Wallet Membership Card */}
        <div 
          className="relative bg-slate-900 rounded-3xl p-6 min-h-[190px] flex flex-col justify-between shadow-lg text-white overflow-hidden group"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(20, 24, 33, 0.95), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80')`,
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none group-hover:scale-125 transition duration-500" />
          
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">VIP Diners Card</span>
              <h4 className="text-3xl font-black mt-1 font-mono text-white tracking-tight">₹{walletBalance.toFixed(2)}</h4>
            </div>
            <span className="text-xl">💳</span>
          </div>

          {/* Gamified Progress Tracker */}
          <div className="space-y-1.5 z-10">
            <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-400">
              <span>🥈 Silver Level</span>
              <span style={{ color: primaryColor }}>350 / 500 XP to Gold</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: '70%', backgroundColor: primaryColor }} />
            </div>
          </div>

          <button 
            onClick={() => {
              setWalletBalance(prev => prev + 1000);
              alert('Added ₹1,000 credit to your VIP Diners wallet!');
            }}
            className="w-full py-3 text-slate-900 font-extrabold text-[10px] rounded-xl shadow-md transition duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer border-none uppercase tracking-wider z-10"
            style={{ backgroundColor: primaryColor }}
          >
            ⚡ Load Dining Credit
          </button>
        </div>

        {/* Ticket Styled Vouchers */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 space-y-4 shadow-sm text-left">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Active Vouchers</h4>
          <div className="space-y-3 text-xs">
            {[
              { code: 'GOURMET10', desc: '10% off chef signature specials.' },
              { code: 'DINEFREE', desc: 'Free appetizer on orders above ₹699.' }
            ].map((cp, idx) => (
              <div 
                key={idx} 
                className="relative bg-stone-50 border border-stone-200/60 rounded-2xl p-3.5 flex justify-between items-center overflow-hidden group hover:border-stone-300 transition"
              >
                {/* Coupon ticket cuts */}
                <div className="absolute left-[-6px] w-3 h-3 rounded-full bg-white border border-stone-200/60 shadow-inner" />
                <div className="absolute right-[-6px] w-3 h-3 rounded-full bg-white border border-stone-200/60 shadow-inner" />
                
                <div className="text-left pl-1">
                  <p className="font-mono font-black text-slate-800 text-[11px] uppercase tracking-wider">{cp.code}</p>
                  <p className="text-[9px] text-slate-500 font-semibold mt-0.5">{cp.desc}</p>
                </div>
                <button 
                  onClick={() => handleCopy(cp.code, idx)} 
                  className="text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border bg-white border-stone-200 hover:border-slate-300 transition cursor-pointer select-none"
                  style={{ color: copiedIndex === idx ? '#059669' : primaryColor }}
                >
                  {copiedIndex === idx ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Order Tracker Mockup */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-5 space-y-3 shadow-sm text-left">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Live Kitchen Status</h4>
          <div className="p-3 bg-stone-50 border border-stone-200/40 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500">Order #ZB-8291</span>
              <span className="text-[9px] font-black text-amber-600 uppercase tracking-wider px-2 py-0.5 bg-amber-50 border border-amber-100 rounded-md">
                In Kitchen
              </span>
            </div>
            
            {/* Timeline step indicator */}
            <div className="flex justify-between items-center relative pt-1 pb-2">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 z-0" />
              {[
                { label: 'Placed', active: true },
                { label: 'Kitchen', active: true },
                { label: 'Delivered', active: false },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-1 relative z-10">
                  <span 
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black border-2 transition duration-300"
                    style={{
                      backgroundColor: step.active ? primaryColor : '#f1f5f9',
                      borderColor: step.active ? primaryColor : '#cbd5e1',
                      color: step.active ? '#0f172a' : '#94a3b8'
                    }}
                  >
                    {step.active ? '✓' : ''}
                  </span>
                  <span className="text-[8px] font-black uppercase text-slate-500">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
