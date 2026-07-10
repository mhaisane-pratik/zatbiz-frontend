import React, { useState } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';

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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>('Grand Salon');
  const [decantTime, setDecantTime] = useState<string>('1 Hour');
  const [decantRequested, setDecantRequested] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();

  const winePairings = [
    { 
      name: 'Château Margaux 2015', 
      type: 'Red Wine - Bordeaux, France', 
      note: 'Polished tannins, dark currant notes, rated 99 pts.', 
      price: '₹75,000',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&auto=format&fit=crop&q=80'
    },
    { 
      name: 'Dom Pérignon Vintage Rose', 
      type: 'Champagne - Epernay, France', 
      note: 'Bright red wild strawberry fruit, mineral precision.', 
      price: '₹42,005',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=300&auto=format&fit=crop&q=80'
    }
  ];

  const seatingAreas = [
    { id: 'Grand Salon', name: 'Grand Salon', desc: 'Piano acoustics & cozy fireplace seating.', status: 'Optimal' },
    { id: 'Wine Cellar', name: 'Sommelier\'s Cellar', desc: 'Surrounded by historic reserve vintages.', status: 'High Demand' },
    { id: 'Garden Terrace', name: 'Waterfall Terrace', desc: 'Glass enclosure overlooking cascading water.', status: 'Limited' },
    { id: 'Chefs Counter', name: 'Chef\'s Counter', desc: 'Front-row view of the culinary assembly.', status: 'VIP Only' }
  ];

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleDecantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDecantRequested(true);
    alert(`Sommelier notified! Your red wine selection will be opened and decanted for exactly ${decantTime} prior to your seating.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left font-sans">
      <div className="lg:col-span-8 space-y-6">
        
        {/* Concierge Greeting Card (Always Dark for Luxury Feel) */}
        <div 
          className="relative bg-[#111217] border border-[#2a2c35]/35 rounded-3xl p-8 overflow-hidden min-h-[220px] flex flex-col justify-end group shadow-lg"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(17, 18, 23, 0.95) 45%, rgba(17, 18, 23, 0.4) 100%), url('https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 max-w-lg space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-[#c5a880]/15 backdrop-blur-md rounded-full border border-[#c5a880]/30 inline-block" style={{ color: '#c5a880' }}>
              ✦ Michelin Star Dining Experience
            </span>
            <h3 className="text-3xl font-black tracking-tight leading-tight uppercase font-serif" style={{ color: '#ffffff' }}>
              Bespoke Dining Selection
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed font-semibold">
              Each course is prepared to request by Michelin-starred culinary teams. Our elite cellars hold pairing vintage bottles from Bordeaux, Tuscany, and Napa Valley.
            </p>
            <div className="pt-3 flex gap-3 font-sans text-xs">
              <button 
                onClick={() => setActiveTab('items')} 
                className="px-6 py-3 bg-[#c5a880] hover:bg-[#d8c2a3] text-black font-black uppercase tracking-wider transition duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer border-none shadow-md"
              >
                Browse Tasting Menu
              </button>
              <button 
                onClick={() => setActiveTab('bookings')} 
                className="px-6 py-3 border hover:bg-[#c5a880]/10 font-black uppercase tracking-wider transition cursor-pointer bg-transparent"
                style={{ borderColor: '#c5a880', color: '#c5a880' }}
              >
                Book Private Table
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none transition duration-500 group-hover:opacity-75" />
        </div>

        {/* Floor Plan Area Selector */}
        <div className={`rounded-3xl p-6 space-y-4 shadow-sm border transition-colors duration-300 ${
          isDarkMode ? 'bg-[#111217] border-[#2a2c35]/35' : 'bg-white border-stone-200'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-xs font-black font-sans uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-stone-850'}`}>Bespoke Floor Plan Selection</h3>
            <span className="text-[9px] font-black text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/20 px-2.5 py-1 rounded-full uppercase">
              🏛️ Salons & Chambers
            </span>
          </div>
          <p className="text-[11px] font-sans font-semibold" style={{ color: isDarkMode ? '#a8a29e' : '#57534e' }}>
            Specify your preferred chamber below. We will do our absolute best to allocate seating within your chosen aesthetic hall.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {seatingAreas.map((area) => {
              const isSelected = selectedArea === area.id;
              return (
                <div 
                  key={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  className={`p-4 border rounded-2xl cursor-pointer transition-all duration-300 text-left flex justify-between gap-4 group ${
                    isDarkMode ? 'bg-[#0d0e12]' : 'bg-stone-50'
                  }`}
                  style={{
                    borderColor: isSelected ? '#c5a880' : (isDarkMode ? 'rgba(42, 44, 53, 0.2)' : '#e5e7eb')
                  }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h4 className="font-bold text-xs leading-none uppercase font-serif group-hover:text-[#c5a880] transition" style={{ color: isDarkMode ? '#ffffff' : '#1c1917' }}>
                        {area.name}
                      </h4>
                    </div>
                    <p className="text-[10px] font-sans leading-normal font-medium" style={{ color: '#737373' }}>{area.desc}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md leading-none border ${
                      isDarkMode 
                        ? 'text-stone-400 bg-stone-900 border-stone-800' 
                        : 'text-stone-600 bg-stone-100 border-stone-200'
                    }`}>
                      {area.status}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] text-[#c5a880] font-black animate-pulse leading-none mt-1">✓ SELECTED</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sommelier Pairings Selection */}
        <div className={`rounded-3xl p-6 space-y-4 shadow-sm border transition-colors duration-300 ${
          isDarkMode ? 'bg-[#111217] border-[#2a2c35]/35' : 'bg-white border-stone-200'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-xs font-black font-sans uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-stone-850'}`}>Elite Sommelier Pairings</h3>
            <span className="text-[9px] font-black text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/20 px-2.5 py-1 rounded-full uppercase">
              🍷 Vintage Cellar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {winePairings.map((w, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#c5a880]/30 transition group ${
                  isDarkMode ? 'bg-[#0d0e12] border-[#2a2c35]/20' : 'bg-stone-50 border-stone-200'
                }`}
              >
                <div className="h-32 bg-[#1b1c23] relative overflow-hidden">
                  <img src={w.image} alt={w.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
                  <span className="absolute bottom-3 right-3 backdrop-blur-sm text-xs font-black px-2.5 py-1.5 rounded-xl font-mono shadow-sm border" style={{ color: '#c5a880', backgroundColor: isDarkMode ? '#0d0e12' : '#ffffff', borderColor: isDarkMode ? '#222' : '#eee' }}>
                    {w.price}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider block" style={{ color: '#c5a880' }}>
                      {w.type}
                    </span>
                    <h4 className="font-extrabold text-xs leading-tight uppercase font-serif" style={{ color: isDarkMode ? '#ffffff' : '#1c1917' }}>
                      {w.name}
                    </h4>
                    <p className="text-[10px] font-sans italic font-medium" style={{ color: isDarkMode ? '#78716c' : '#57534e' }}>
                      "{w.note}"
                    </p>
                  </div>
                  <button 
                    onClick={() => alert(`Sommelier notified about interest in ${w.name}.`)}
                    className="w-full py-1.5 bg-transparent border border-stone-850 hover:border-[#c5a880]/40 text-stone-400 hover:text-white font-bold text-[9px] uppercase rounded-xl transition cursor-pointer font-sans"
                    style={{ borderColor: isDarkMode ? '#2c2d35' : '#ccc' }}
                  >
                    Inquire Sommelier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column: Wallet & Vouchers */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Wallet Membership Card (Always Dark for Luxury Feel) */}
        <div 
          className="relative bg-slate-900 rounded-3xl p-6 min-h-[190px] flex flex-col justify-between shadow-lg overflow-hidden group border border-[#c5a880]/15"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(17, 18, 23, 0.95), rgba(30, 31, 38, 0.9)), url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&auto=format&fit=crop&q=80')`,
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full bg-[#c5a880]/5 blur-xl pointer-events-none group-hover:scale-125 transition duration-500" />
          
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-[8px] font-black uppercase tracking-widest block font-sans" style={{ color: '#a1a1aa' }}>
                Gold Room House Account
              </span>
              <h4 className="text-3xl font-black mt-1 font-mono tracking-tight" style={{ color: '#c5a880' }}>
                ₹{walletBalance.toFixed(2)}
              </h4>
            </div>
            <span className="text-xl">💳</span>
          </div>

          {/* Gamified Progress Tracker */}
          <div className="space-y-1.5 z-10 text-left">
            <div className="flex justify-between items-center text-[9px] font-black uppercase">
              <span style={{ color: '#a1a1aa' }}>👑 Elite VIP Status</span>
              <span style={{ color: '#c5a880' }}>Tier 1 Active</span>
            </div>
            <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: '80%', backgroundColor: '#c5a880' }} />
            </div>
          </div>

          <button 
            onClick={() => {
              setWalletBalance(prev => prev + 5000);
              alert('Supplemented ₹5,000 credit to your Gold Room account!');
            }}
            className="w-full py-3 font-extrabold text-[10px] rounded-xl shadow-md transition duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer border-none uppercase tracking-wider z-10"
            style={{ backgroundColor: '#c5a880', color: '#000000' }}
          >
            ⚡ Supplement Account
          </button>
        </div>

        {/* Sommelier Pre-Decanting Service */}
        <div className={`rounded-3xl p-5 shadow-sm border transition-colors duration-300 ${
          isDarkMode ? 'bg-[#111217] border-[#2a2c35]/35' : 'bg-white border-stone-200'
        }`}>
          <h4 className={`text-xs font-black font-sans uppercase tracking-widest mb-3 ${isDarkMode ? 'text-white' : 'text-stone-850'}`}>🍷 Sommelier Decanting</h4>
          <form onSubmit={handleDecantSubmit} className={`p-3 border rounded-2xl space-y-3 font-sans text-xs ${
            isDarkMode ? 'bg-[#0d0e12] border-[#2a2c35]/25' : 'bg-stone-50 border-stone-200'
          }`}>
            <p className="text-[10px] font-semibold leading-normal" style={{ color: isDarkMode ? '#a8a29e' : '#57534e' }}>
              Select breathing duration for your red wine bottles prior to your reservation time:
            </p>
            <select 
              value={decantTime} 
              onChange={(e) => {
                setDecantTime(e.target.value);
                setDecantRequested(false);
              }}
              className={`w-full border rounded-xl px-4 py-2 text-xs outline-none cursor-pointer font-bold ${
                isDarkMode ? 'bg-[#111217] border-stone-850 text-white' : 'bg-white border-stone-200 text-stone-800'
              }`}
            >
              {['None', '30 Minutes', '1 Hour', '1.5 Hours', '2 Hours'].map((t) => (
                <option key={t} value={t}>{t} Decant</option>
              ))}
            </select>
            <button 
              type="submit"
              className="w-full py-2 font-black text-[10px] uppercase rounded-xl transition cursor-pointer border-none shadow-sm"
              style={{ backgroundColor: '#c5a880', color: '#000000' }}
            >
              {decantRequested ? 'Decanting Requested ✓' : 'Submit Decant Request'}
            </button>
          </form>
        </div>

        {/* Ticket Styled Vouchers */}
        <div className={`rounded-3xl p-6 space-y-4 shadow-sm border transition-colors duration-300 ${
          isDarkMode ? 'bg-[#111217] border-[#2a2c35]/35' : 'bg-white border-stone-200'
        }`}>
          <h4 className={`text-xs font-black font-sans uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-stone-850'}`}>Active Dinner Perks</h4>
          <div className="space-y-3 text-xs font-sans">
            {[
              { code: 'GOURMET10', desc: '10% off chef tasting specials.' },
              { code: 'CELLAR20', desc: 'Complimentary vintage wine glass pairing.' }
            ].map((cp, idx) => (
              <div 
                key={idx} 
                className={`relative border rounded-2xl p-3.5 flex justify-between items-center overflow-hidden group hover:border-[#c5a880]/30 transition ${
                  isDarkMode ? 'bg-[#0d0e12] border-[#2a2c35]/20' : 'bg-stone-50 border-stone-200'
                }`}
              >
                {/* Coupon ticket cuts */}
                <div className={`absolute left-[-6px] w-3 h-3 rounded-full border shadow-inner ${
                  isDarkMode ? 'bg-[#111217] border-[#2a2c35]/35' : 'bg-white border-stone-200'
                }`} />
                <div className={`absolute right-[-6px] w-3 h-3 rounded-full border shadow-inner ${
                  isDarkMode ? 'bg-[#111217] border-[#2a2c35]/35' : 'bg-white border-stone-200'
                }`} />
                
                <div className="text-left pl-1">
                  <p className="font-mono font-black text-[11px] uppercase tracking-wider" style={{ color: isDarkMode ? '#ffffff' : '#1c1917' }}>{cp.code}</p>
                  <p className="text-[9px] font-semibold mt-0.5" style={{ color: isDarkMode ? '#78716c' : '#57534e' }}>{cp.desc}</p>
                </div>
                <button 
                  onClick={() => handleCopy(cp.code, idx)} 
                  className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border transition cursor-pointer select-none ${
                    isDarkMode ? 'bg-transparent border-stone-800 hover:border-stone-750' : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                  style={{ color: copiedIndex === idx ? '#059669' : '#c5a880' }}
                >
                  {copiedIndex === idx ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Valet/Elite Service Checklist */}
        <div className={`rounded-3xl p-6 space-y-4 shadow-sm border transition-colors duration-300 ${
          isDarkMode ? 'bg-[#111217] border-[#2a2c35]/35' : 'bg-white border-stone-200'
        }`}>
          <h4 className={`text-xs font-black font-sans uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-stone-850'}`}>Valet / Concierge Perks</h4>
          <div className="space-y-3 font-sans text-xs">
            {[
              { title: 'Valet Priority Service', desc: 'Pre-arranged limousine retrieval.' },
              { title: 'Elite Sommelier Tastings', desc: 'Complimentary cellar tour.' },
              { title: 'Custom Plate Engravings', desc: 'Keepsake silver plate markers.' }
            ].map((perk, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span style={{ color: '#c5a880' }} className="text-sm leading-none">✦</span>
                <div className="space-y-0.5 text-left">
                  <p className="font-black" style={{ color: isDarkMode ? '#e7e5e4' : '#1c1917' }}>{perk.title}</p>
                  <p className="text-[10px] font-semibold leading-normal" style={{ color: isDarkMode ? '#78716c' : '#57534e' }}>{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
