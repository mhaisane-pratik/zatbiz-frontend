import React from 'react';

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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left font-sans">
      <div className="lg:col-span-8 space-y-6">
        
        {/* Greeting Promo */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 relative overflow-hidden"
             style={{
               backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.7)), url('https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80')`,
               backgroundSize: 'cover'
             }}>
          <span className="text-xs font-black uppercase tracking-wider block" style={{ color: primaryColor }}>Exclusive Culinary Season</span>
          <h3 className="text-3xl text-slate-800 font-black uppercase mt-1">Special Gourmet Selections</h3>
          <p className="text-slate-500 text-xs leading-relaxed mt-2 max-w-sm font-semibold">
            Review and order our curated signature recipes, tandoori grills, artisan sourdoughs, or vegan plant-based coldpress juices.
          </p>
          <div className="mt-4 flex gap-4 text-xs font-black uppercase tracking-wider">
            <button onClick={() => setActiveTab('items')} className="px-6 py-3 text-slate-800 rounded-xl transition border-none cursor-pointer" style={{ backgroundColor: primaryColor }}>
              Browse Plated Menu
            </button>
          </div>
        </div>

        {/* Sourcing Perks */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4">Plated Specials Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'House Crafted Specialty', type: 'Signature Treat', note: 'Curated by head chefs weekly.', price: '₹299' },
              { name: 'Platter Combo Deal', type: 'Super Saver Meal', note: 'Perfect gourmet share box.', price: '₹499' }
            ].map((c, i) => (
              <div key={i} className="bg-stone-50 border border-stone-200/60 rounded-2xl p-4 flex justify-between gap-4">
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider block" style={{ color: primaryColor }}>{c.type}</span>
                  <h4 className="font-extrabold text-slate-800 text-xs leading-tight">{c.name}</h4>
                  <p className="text-[10px] text-slate-600">{c.note}</p>
                </div>
                <span className="font-black text-xs font-mono" style={{ color: primaryColor }}>{c.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Col: Wallet */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 flex flex-col justify-between min-h-[170px]">
          <div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Gold Diner Wallet Balance</span>
            <h4 className="text-3xl font-black mt-1.5 font-mono" style={{ color: primaryColor }}>₹{walletBalance.toFixed(2)}</h4>
          </div>
          <button 
            onClick={() => {
              setWalletBalance(prev => prev + 1000);
              alert('Added ₹1,000 credit to your gold card account!');
            }}
            className="w-full mt-4 py-3 text-slate-850 font-black text-xs rounded-xl shadow-md transition cursor-pointer border-none uppercase tracking-wider"
            style={{ backgroundColor: primaryColor }}
          >
            + Add Dinner Credit
          </button>
        </div>

        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 space-y-4">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Active Dinner Vouchers</h4>
          <div className="space-y-3 text-xs">
            {[
              { code: 'GOURMET10', desc: 'Get 10% off any chef signature special.' },
              { code: 'DINEFREE', desc: 'Free chef appetizer on orders above ₹699.' }
            ].map((cp, idx) => (
              <div key={idx} className="p-3 bg-stone-50 border border-stone-200/60 rounded-xl flex justify-between items-center">
                <div className="text-left font-sans">
                  <p className="font-mono font-black text-slate-800 text-[11px]">{cp.code}</p>
                  <p className="text-[9px] text-slate-500 font-semibold">{cp.desc}</p>
                </div>
                <span className="text-[9px] font-black uppercase cursor-pointer" style={{ color: primaryColor }} onClick={() => alert('Code copied!')}>Copy</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
