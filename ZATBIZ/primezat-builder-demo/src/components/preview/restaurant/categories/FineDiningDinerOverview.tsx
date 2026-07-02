import React from 'react';

interface FineDiningDinerOverviewProps {
  colors: any;
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab: (tab: string) => void;
}

export function FineDiningDinerOverview({
  colors,
  walletBalance,
  setWalletBalance,
  setActiveTab
}: FineDiningDinerOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
      <div className="lg:col-span-8 space-y-6">
        
        {/* Concierge Greeting Card */}
        <div className="bg-[#111217] border border-[#2a2c35]/35 rounded-3xl p-8 relative overflow-hidden"
             style={{
               backgroundImage: "linear-gradient(rgba(17, 18, 23, 0.9), rgba(17, 18, 23, 0.95)), url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80')",
               backgroundSize: 'cover'
             }}>
          <span className={`${colors.textAccent} text-xs font-bold uppercase tracking-widest block font-sans`}>Michelin Star Experience</span>
          <h3 className="text-3xl text-white font-extrabold font-serif mt-2">Bespoke Dining Selection</h3>
          <p className="text-stone-400 text-xs font-sans leading-relaxed mt-2 max-w-lg">
            Each course is prepared to request by Michelin-starred culinary teams. Our elite cellars hold pairing vintage bottles from Bordeaux, Tuscany, and Napa Valley.
          </p>
          <div className="mt-6 flex gap-4 font-sans text-xs">
            <button onClick={() => setActiveTab('items')} className="px-6 py-3 bg-[#c5a880] hover:bg-[#d8c2a3] text-black font-black uppercase tracking-wider transition border-none cursor-pointer">
              Browse Tasting Menu
            </button>
            <button onClick={() => setActiveTab('bookings')} className={`px-6 py-3 border border-[#c5a880] hover:bg-[#c5a880] hover:text-black ${colors.textAccent} font-black uppercase tracking-wider transition cursor-pointer bg-transparent`}>
              Book Private Table
            </button>
          </div>
        </div>

        {/* Wine Cellar Selection Mockup */}
        <div className="bg-[#111217] border border-[#2a2c35]/35 rounded-3xl p-6">
          <h3 className="text-xs font-black text-white font-sans uppercase tracking-widest mb-4">Elite Sommelier Pairings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Château Margaux 2015', type: 'Red Wine - Bordeaux, France', note: 'Polished tannins, dark currant notes, rated 99 pts.', price: '₹75,000' },
              { name: 'Dom Pérignon Vintage Rose', type: 'Champagne - Epernay, France', note: 'Bright red wild strawberry fruit, mineral precision.', price: '₹42,000' }
            ].map((w, idx) => (
              <div key={idx} className="bg-[#0d0e12] border border-[#2a2c35]/20 rounded-2xl p-4 flex justify-between gap-4 hover:border-[#c5a880]/30 transition">
                <div className="text-left space-y-1">
                  <span className={`text-[10px] ${colors.textAccent} font-bold uppercase tracking-wider block font-sans`}>{w.type}</span>
                  <h4 className="font-extrabold text-white text-xs leading-tight">{w.name}</h4>
                  <p className="text-[10px] text-stone-500 font-sans italic">"{w.note}"</p>
                </div>
                <span className={`font-sans font-black text-xs ${colors.textAccent}`}>{w.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Col: Wallet & VIP Status */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#111217] border border-[#2a2c35]/35 rounded-3xl p-6 flex flex-col justify-between min-h-[170px]">
          <div>
            <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block font-sans">Gold Room House Account Credit</span>
            <h4 className={`text-3xl font-extrabold ${colors.textAccent} mt-1.5 font-sans`}>₹{walletBalance.toFixed(2)}</h4>
          </div>
          <button 
            onClick={() => {
              setWalletBalance(prev => prev + 5000);
              alert('Added ₹5,000 credit to your gold house account!');
            }}
            className="w-full mt-4 py-3 bg-[#c5a880] hover:bg-[#d8c2a3] text-black font-black text-xs rounded-none shadow-md transition cursor-pointer border-none uppercase tracking-widest font-sans"
          >
            + Supplement Account
          </button>
        </div>

        <div className="bg-[#111217] border border-[#2a2c35]/35 rounded-3xl p-6 space-y-4">
          <h4 className="text-xs font-black text-white font-sans uppercase tracking-widest">VIP Perks Checklist</h4>
          <div className="space-y-3 font-sans text-xs">
            {[
              { title: 'Valet Priority Service', desc: 'Pre-arranged limousine retrieval.' },
              { title: 'Elite Sommelier Tastings', desc: 'Complimentary cellar tour.' },
              { title: 'Custom Plate Engravings', desc: 'Keepsake silver plate markers.' }
            ].map((perk, i) => (
              <div key={i} className="flex gap-3">
                <span className={colors.textAccent}>✦</span>
                <div>
                  <p className="font-black text-stone-200">{perk.title}</p>
                  <p className="text-[10px] text-stone-500 font-semibold">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
