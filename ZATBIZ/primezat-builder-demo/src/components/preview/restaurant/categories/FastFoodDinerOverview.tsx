import React from 'react';

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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
      <div className="lg:col-span-8 space-y-6">
        
        {/* Promo banner */}
        <div className="bg-[#14151b] border border-orange-500/10 rounded-3xl p-8 relative overflow-hidden"
             style={{
               backgroundImage: "linear-gradient(to right, rgba(20, 21, 27, 0.95), rgba(20, 21, 27, 0.5)), url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80')",
               backgroundSize: 'cover'
             }}>
          <span className={`${colors.textAccent} text-xs font-black uppercase tracking-wider block`}>Super Saver Deals</span>
          <h3 className="text-3xl text-white font-black uppercase mt-1">Free Extra Bacon & Cheese</h3>
          <p className="text-slate-405 text-xs leading-relaxed mt-2 max-w-sm font-semibold">
            Upgrade any double beef smash burger combo to triple meat and loaded cheese sauce for free tonight only.
          </p>
          <div className="mt-4 flex gap-4 text-xs font-black uppercase tracking-wider">
            <button onClick={() => setActiveTab('items')} className={`px-6 py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl transition border-none cursor-pointer`}>
              Get Deal Now
            </button>
          </div>
        </div>

        {/* Combos list */}
        <div className="bg-[#14151b] border border-slate-800 rounded-3xl p-6">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">Combo Slashes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Crispy Tender Basket', type: 'Fried Chicken Deal', note: '6 buttermilk tenders, fries, beverage.', price: '₹349' },
              { name: 'Double Smash Bacon Combo', type: 'Flame Grilled Deal', note: 'Double burger, loaded bacon, fries, beverage.', price: '₹399' }
            ].map((c, i) => (
              <div key={i} className="bg-[#0f0f12] border border-slate-850 rounded-2xl p-4 flex justify-between gap-4">
                <div className="text-left space-y-1">
                  <span className={`text-[10px] ${colors.textAccent} font-black uppercase tracking-wider block`}>
                    {c.type}
                  </span>
                  <h4 className="font-extrabold text-white text-xs leading-tight">{c.name}</h4>
                  <p className="text-[10px] text-slate-400">{c.note}</p>
                </div>
                <span className={`font-black text-xs ${colors.textAccent} font-mono`}>{c.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Col: Wallet */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#14151b] border border-orange-500/10 rounded-3xl p-6 flex flex-col justify-between min-h-[170px]">
          <div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">FastFoodie Wallet Balance</span>
            <h4 className={`text-3xl font-black ${colors.textAccent} mt-1.5 font-mono`}>₹{walletBalance.toFixed(2)}</h4>
          </div>
          <button 
            onClick={() => {
              setWalletBalance(prev => prev + 500);
              alert('Added ₹500 to your wallet!');
            }}
            className={`w-full mt-4 py-3 ${colors.bgAccent} ${colors.hoverBgAccent} text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer border-none uppercase tracking-wider`}
          >
            + Add Food Money
          </button>
        </div>

        <div className="bg-[#14151b] border border-slate-800 rounded-3xl p-6 space-y-4">
          <h4 className="text-xs font-black text-white uppercase tracking-widest">Active Coupon codes</h4>
          <div className="space-y-3 text-xs">
            {[
              { code: 'HOTBURGER', desc: 'Get 20% off double smash patty burgers.' },
              { code: 'CRISPY100', desc: 'Free fries on orders above ₹499.' }
            ].map((cp, idx) => (
              <div key={idx} className="p-3 bg-[#0f0f12] border border-slate-850 rounded-xl flex justify-between items-center">
                <div className="text-left">
                  <p className="font-mono font-black text-white text-[11px]">{cp.code}</p>
                  <p className="text-[9px] text-slate-400 font-semibold">{cp.desc}</p>
                </div>
                <span className={`text-[9px] ${colors.textAccent} font-black uppercase cursor-pointer`} onClick={() => alert('Code copied!')}>Copy</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
