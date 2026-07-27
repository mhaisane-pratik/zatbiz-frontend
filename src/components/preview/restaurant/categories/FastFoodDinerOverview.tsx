import React, { useState } from 'react';

interface FastFoodDinerOverviewProps {
  colors: any;
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab: (tab: string) => void;
}

export function FastFoodDinerOverview({
  colors,
  walletBalance,
  setWalletBalance,
  setActiveTab
}: FastFoodDinerOverviewProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const combos = [
    { 
      name: 'Crispy Tender Basket', 
      type: 'Fried Chicken Deal', 
      note: '6 buttermilk tenders, loaded fries, dipping sauces, beverage.', 
      price: '₹349',
      image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=300&auto=format&fit=crop&q=80'
    },
    { 
      name: 'Double Smash Bacon Combo', 
      type: 'Flame Grilled Deal', 
      note: 'Double smashed beef patties, crispy bacon, melted cheddar, fries, beverage.', 
      price: '₹399',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80'
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
        
        {/* Promo banner */}
        <div 
          className="relative bg-[#14151b] border border-orange-500/10 rounded-3xl p-8 overflow-hidden min-h-[220px] flex flex-col justify-end group shadow-lg"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(20, 21, 27, 0.95) 45%, rgba(20, 21, 27, 0.4) 100%), url('https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1000&auto=format&fit=crop&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 max-w-sm space-y-2">
            <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/95 border border-white/10 inline-block`} style={{ color: colors.textAccent.includes('orange') || colors.textAccent.includes('amber') ? '#f97316' : '#ef4444' }}>
              🔥 Super Saver Deals
            </span>
            <h3 className="text-3xl text-white font-black uppercase tracking-tight leading-none">
              Free Extra Bacon & Cheese
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed font-semibold">
              Upgrade any double beef smash burger combo to triple meat and loaded cheese sauce for free tonight only.
            </p>
            <div className="pt-3">
              <button 
                onClick={() => setActiveTab('items')} 
                className={`px-6 py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white font-black text-xs rounded-xl shadow-md transition duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer border-none uppercase tracking-wider`}
              >
                Get Deal Now
              </button>
            </div>
          </div>
          {/* Subtle background glow effect */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none transition duration-500 group-hover:opacity-75" />
        </div>

        {/* Combos list */}
        <div className="bg-[#14151b] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Fast Combos & Slashes</h3>
            <span className="text-[9px] font-black text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2.5 py-1 rounded-full uppercase">
              ⚡ Flash Deals
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {combos.map((c, i) => (
              <div 
                key={i} 
                className="bg-[#0f0f12] border border-slate-850 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-orange-500/25 transition group"
              >
                <div className="h-32 bg-[#1b1c23] relative overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
                  <span className="absolute bottom-3 right-3 bg-[#0f0f12]/95 backdrop-blur-sm text-xs font-black px-2.5 py-1.5 rounded-xl font-mono" style={{ color: '#f97316' }}>
                    {c.price}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-2">
                  <div className="space-y-1">
                    <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-wider block`}>
                      {c.type}
                    </span>
                    <h4 className="font-extrabold text-white text-xs leading-tight uppercase">
                      {c.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                      {c.note}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('items');
                    }}
                    className="w-full py-1.5 bg-transparent border border-slate-800 hover:border-orange-500/30 text-slate-300 hover:text-white font-bold text-[9px] uppercase rounded-xl transition cursor-pointer font-sans"
                  >
                    Add Deal
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
          className="relative bg-[#14151b] border border-orange-500/10 rounded-3xl p-6 min-h-[190px] flex flex-col justify-between shadow-lg text-white overflow-hidden group"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(20, 21, 27, 0.95), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=80')`,
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full bg-orange-500/5 blur-xl pointer-events-none group-hover:scale-125 transition duration-500" />
          
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">FastFoodie Wallet Balance</span>
              <h4 className={`text-3xl font-black mt-1 font-mono tracking-tight`} style={{ color: '#f97316' }}>
                ₹{walletBalance.toFixed(2)}
              </h4>
            </div>
            <span className="text-xl">🍔</span>
          </div>

          {/* Gamified Progress Tracker */}
          <div className="space-y-1.5 z-10">
            <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-400">
              <span>⚡ Foodie Levels</span>
              <span style={{ color: '#f97316' }}>120 points to next discount</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: '65%', backgroundColor: '#f97316' }} />
            </div>
          </div>

          <button 
            onClick={() => {
              setWalletBalance(prev => prev + 500);
              alert('Added ₹500 to your FastFoodie account!');
            }}
            className={`w-full py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white font-extrabold text-[10px] rounded-xl shadow-md transition duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer border-none uppercase tracking-wider z-10`}
          >
            ⚡ Load Food Money
          </button>
        </div>

        {/* Ticket Styled Vouchers */}
        <div className="bg-[#14151b] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm text-left">
          <h4 className="text-xs font-black text-white uppercase tracking-widest">Active Coupon codes</h4>
          <div className="space-y-3 text-xs">
            {[
              { code: 'HOTBURGER', desc: 'Get 20% off double smash patty burgers.' },
              { code: 'CRISPY100', desc: 'Free fries on orders above ₹499.' }
            ].map((cp, idx) => (
              <div 
                key={idx} 
                className="relative bg-[#0f0f12] border border-slate-850 rounded-2xl p-3.5 flex justify-between items-center overflow-hidden group hover:border-orange-500/25 transition"
              >
                {/* Coupon ticket cuts */}
                <div className="absolute left-[-6px] w-3 h-3 rounded-full bg-[#14151b] border border-slate-800 shadow-inner" />
                <div className="absolute right-[-6px] w-3 h-3 rounded-full bg-[#14151b] border border-slate-800 shadow-inner" />
                
                <div className="text-left pl-1">
                  <p className="font-mono font-black text-white text-[11px] uppercase tracking-wider">{cp.code}</p>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{cp.desc}</p>
                </div>
                <button 
                  onClick={() => handleCopy(cp.code, idx)} 
                  className="text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border bg-transparent border-slate-850 hover:border-slate-700 transition cursor-pointer select-none"
                  style={{ color: copiedIndex === idx ? '#059669' : '#f97316' }}
                >
                  {copiedIndex === idx ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Delivery Status Stepper */}
        <div className="bg-[#14151b] border border-slate-800 rounded-3xl p-5 space-y-3 shadow-sm text-left">
          <h4 className="text-xs font-black text-white uppercase tracking-widest">Speed Delivery Tracker</h4>
          <div className="p-3 bg-[#0f0f12] border border-slate-850/40 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400">Order #ZB-9912</span>
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider px-2 py-0.5 bg-emerald-500/5 border border-emerald-500/10 rounded-md">
                In Transit
              </span>
            </div>
            
            {/* Timeline step indicator */}
            <div className="flex justify-between items-center relative pt-1 pb-2">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 z-0" />
              {[
                { label: 'Cooked', active: true },
                { label: 'Transit', active: true },
                { label: 'Arrived', active: false },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-1 relative z-10">
                  <span 
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black border-2 transition duration-300"
                    style={{
                      backgroundColor: step.active ? '#f97316' : '#1e293b',
                      borderColor: step.active ? '#f97316' : '#475569',
                      color: step.active ? '#0f172a' : '#64748b'
                    }}
                  >
                    {step.active ? '✓' : ''}
                  </span>
                  <span className="text-[8px] font-black uppercase text-slate-400">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
