'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TrendingProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

interface DownloadItem {
  id: string;
  name: string;
  format: string;
  icon: string;
}

interface DashboardHomeProps {
  userName: string;
  onNavigateTab: (tab: string) => void;
  wishlistCount: number;
  onUpdateWishlist: (count: number) => void;
  showToast: (message: string, isError?: boolean) => void;
}

export default function DashboardHome({
  userName,
  onNavigateTab,
  wishlistCount,
  onUpdateWishlist,
  showToast
}: DashboardHomeProps) {
  // State for wallet balance
  const [walletBalance, setWalletBalance] = useState<number>(48.50);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>('20.00');

  // State for invite modal
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [referralCode] = useState(() => `ZAT-${Math.floor(100000 + Math.random() * 900000)}`);

  // State for wishlisted product IDs
  const [wishlistedIds, setWishlistedIds] = useState<Record<string, boolean>>({});

  // Help widget open state
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Trending Products data
  const trendingProducts: TrendingProduct[] = [
    {
      id: 'tp1',
      name: 'Minimal Digital Planner',
      category: 'Digital Planners',
      price: 19.00,
      rating: 4.9,
      reviews: 120,
      imageUrl: '/images/builder_canvas.png'
    },
    {
      id: 'tp2',
      name: 'Notion Business OS',
      category: 'Notion Templates',
      price: 29.00,
      rating: 4.8,
      reviews: 98,
      imageUrl: '/images/clinic_template.png'
    },
    {
      id: 'tp3',
      name: 'Brand Guidelines Kit',
      category: 'Design Assets',
      price: 25.00,
      rating: 4.9,
      reviews: 76,
      imageUrl: '/images/gym_template.png'
    },
    {
      id: 'tp4',
      name: 'Canva Social Media Pack',
      category: 'Design Assets',
      price: 15.00,
      rating: 4.7,
      reviews: 64,
      imageUrl: '/images/realestate_template.png'
    },
    {
      id: 'tp5',
      name: 'E-book: Productivity',
      category: 'E-Books',
      price: 12.00,
      rating: 4.8,
      reviews: 52,
      imageUrl: '/images/school_template.png'
    }
  ];

  // Recent Downloads data
  const downloadItems: DownloadItem[] = [
    { id: 'dl1', name: 'Minimal Digital Planner', format: 'PDF', icon: '📝' },
    { id: 'dl2', name: 'Notion Business OS', format: 'PDF', icon: '📓' },
    { id: 'dl3', name: 'Brand Guidelines Kit', format: 'ZIP', icon: '📦' },
    { id: 'dl4', name: 'Canva Social Media Pack', format: 'PDF', icon: '🎨' }
  ];

  // Popular Categories data
  const popularCategories = [
    { name: 'Digital Planners', count: 125, icon: '📅', color: 'bg-indigo-50 border border-indigo-100/50 text-indigo-650' },
    { name: 'Notion Templates', count: 98, icon: '📓', color: 'bg-slate-50 border border-slate-200/50 text-slate-700' },
    { name: 'E-Books', count: 76, icon: '📚', color: 'bg-emerald-50 border border-emerald-100/50 text-emerald-650' },
    { name: 'Design Assets', count: 64, icon: '🎨', color: 'bg-amber-50 border border-amber-100/50 text-amber-650' },
    { name: 'Courses', count: 42, icon: '🎓', color: 'bg-blue-50 border border-blue-100/50 text-blue-650' }
  ];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(depositAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showToast('Please enter a valid deposit amount.', true);
      return;
    }
    setWalletBalance(prev => prev + parsedAmount);
    showToast(`Successfully deposited $${parsedAmount.toFixed(2)} to your wallet!`);
    setIsWalletModalOpen(false);
  };

  const toggleWishlist = (productId: string, productName: string) => {
    setWishlistedIds(prev => {
      const updated = { ...prev };
      const isCurrentlyWishlisted = !!updated[productId];
      updated[productId] = !isCurrentlyWishlisted;

      // Update wishlist count in parent sidebar
      const diff = isCurrentlyWishlisted ? -1 : 1;
      onUpdateWishlist(Math.max(0, wishlistCount + diff));

      if (isCurrentlyWishlisted) {
        showToast(`Removed "${productName}" from your wishlist.`);
      } else {
        showToast(`Added "${productName}" to your wishlist!`);
      }

      return updated;
    });
  };

  const handleDownload = (itemName: string) => {
    showToast(`Initializing secure download for ${itemName}...`);
    setTimeout(() => {
      showToast(`Success! "${itemName}" downloaded successfully.`, false);
    }, 1500);
  };

  const handleCopyReferral = () => {
    const refUrl = `https://zatbiz.site/ref/${userName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${referralCode}`;
    navigator.clipboard.writeText(refUrl);
    showToast('Referral link copied to clipboard!');
  };

  return (
    <div className="space-y-8 max-w-[1440px] mx-auto pb-16 w-full text-left">
        
        {/* Welcome Hero Banner */}
        <div className="relative w-full bg-[#f3f0ff] rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden border border-[#e5dfff]">
          {/* Background shapes */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-br from-[#dcd3ff]/40 to-[#c8b7ff]/20 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-[#ebdfff]/30 blur-2xl pointer-events-none rounded-full" />
          
          {/* Text content */}
          <div className="flex-1 space-y-4 z-10 max-w-xl pr-0 md:pr-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#e5dfff] rounded-full text-xs font-bold text-indigo-650 shadow-sm">
              Welcome back, {userName}! 👋
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Find, Download & <br />
              <span className="bg-gradient-to-r from-indigo-600 to-[#5c3bee] bg-clip-text text-transparent">Grow</span> Your Business
            </h1>
            <p className="text-slate-550 text-sm leading-relaxed font-semibold">
              Discover premium digital products, templates, and resources to take your business to the next level.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onNavigateTab('browse_products')}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/10 hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                <span>Explore Products</span>
                <span>➔</span>
              </button>
            </div>
          </div>

          {/* Pedestal & Shopping bag Graphic illustration */}
          <div className="relative w-62 h-52 mt-6 md:mt-0 flex items-center justify-center z-10">
            <div className="absolute bottom-2 w-44 h-6 bg-slate-900/5 blur-md rounded-full pointer-events-none" />
            {/* Pedestal */}
            <div className="absolute bottom-4 w-40 h-8 bg-gradient-to-b from-white to-[#ece8ff] border border-[#e5dfff] rounded-[24px] shadow-sm transform scale-y-75 flex items-center justify-center">
              <div className="w-36 h-6 bg-white/50 rounded-[20px]" />
            </div>
            {/* Main Shopping Bag Asset */}
            <div className="absolute bottom-7 animate-float-slow select-none w-40 h-40 flex items-center justify-center">
              <Image 
                src="/images/zatbiz_dashboard_hero.png" 
                alt="ZatBiz Shopping Bag" 
                width={140} 
                height={140} 
                className="object-contain drop-shadow-[0_20px_40px_rgba(92,59,238,0.25)] hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>
        </div>

        {/* Value Badges Row */}
     

        {/* Popular Categories */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Popular Categories</h2>
            <button 
              onClick={() => onNavigateTab('categories')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer bg-transparent border-0"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {popularCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onNavigateTab('categories')}
                className={`p-4 rounded-2xl ${cat.color} hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left space-y-3 cursor-pointer w-full`}
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm border border-slate-100/50">
                  {cat.icon}
                </div>
                <div className="leading-tight">
                  <h4 className="text-xs font-extrabold truncate">{cat.name}</h4>
                  <p className="text-[10px] opacity-75 mt-0.5 font-bold">{cat.count} products</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Trending Products</h2>
            <button 
              onClick={() => onNavigateTab('browse_products')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer bg-transparent border-0"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
            {trendingProducts.map((product) => {
              const isWishlisted = !!wishlistedIds[product.id];
              return (
                <div 
                  key={product.id} 
                  className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-md hover:border-slate-300 transition duration-300 flex flex-col justify-between"
                >
                  {/* Thumbnail / Image with overlay button */}
                  <div className="relative h-32 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                    <Image 
                      src={product.imageUrl}
                      alt={product.name}
                      width={200}
                      height={120}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Favorite Heart Button */}
                    <button 
                      onClick={() => toggleWishlist(product.id, product.name)}
                      className="absolute top-2.5 right-2.5 w-7.5 h-7.5 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm border border-slate-100 transition active:scale-90 cursor-pointer"
                    >
                      <i className={`fa-${isWishlisted ? 'solid text-rose-500' : 'regular'} fa-heart text-xs`} />
                    </button>
                  </div>

                  {/* Info details */}
                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block truncate">{product.category}</span>
                      <h4 className="text-xs font-extrabold text-slate-800 line-clamp-2 mt-0.5 leading-snug">{product.name}</h4>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-slate-50">
                      {/* Rating details */}
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400 text-[10px]">
                          {'★'.repeat(5)}
                        </div>
                        <span className="text-[9px] text-slate-500 font-bold">
                          {product.rating}
                        </span>
                      </div>

                      {/* Price & Buy Button */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-indigo-650">
                          ${product.price.toFixed(2)}
                        </span>
                        
                        <button 
                          onClick={() => {
                            showToast(`"${product.name}" added to cart!`);
                          }}
                          className="w-6 h-6 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer border-0"
                          title="Add to Cart"
                        >
                          <i className="fa-solid fa-plus text-[9px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      {/* RENDER DYNAMIC FLOATING INTERACTIVE MODALS */}

      {/* 1. Wallet Add Funds Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-150 shadow-2xl relative">
            <button 
              onClick={() => setIsWalletModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center cursor-pointer transition border-0 bg-transparent"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            <div className="text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-650 mx-auto text-xl">
                💳
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Add Funds to Wallet</h3>
                <p className="text-xs text-slate-455 font-semibold">Load currency to purchase premium templates instantly.</p>
              </div>

              <form onSubmit={handleDeposit} className="space-y-4">
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500 font-black text-sm">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl py-3 pl-8 pr-4 text-slate-800 font-black text-sm outline-none transition"
                    placeholder="20.00"
                    autoFocus
                  />
                </div>

                <div className="flex gap-2">
                  {['10', '25', '50'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepositAmount(`${amt}.00`)}
                      className={`flex-1 py-1.5 border rounded-lg text-xs font-bold transition cursor-pointer ${
                        depositAmount === `${amt}.00` 
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-655'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      +${amt}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer border-0"
                >
                  Deposit Funds
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. Refer & Earn Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-150 shadow-2xl relative">
            <button 
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center cursor-pointer transition border-0 bg-transparent"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            <div className="text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-650 mx-auto text-xl">
                💎
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Invite Your Network</h3>
                <p className="text-xs text-slate-455 font-semibold">Earn 10% commission on every purchase made with your code.</p>
              </div>

              <div className="space-y-3.5">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center text-xs">
                  <span className="font-mono font-black text-slate-800 tracking-wide select-all">
                    {referralCode}
                  </span>
                  <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded font-black border border-purple-100 uppercase">
                    Code Active
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={`https://zatbiz.site/ref/${userName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${referralCode}`}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4.5 pr-20 text-[10px] text-slate-500 font-bold select-all outline-none"
                  />
                  <button
                    onClick={handleCopyReferral}
                    className="absolute right-2 top-2 bottom-2 bg-slate-900 hover:bg-black text-white text-[10px] font-black px-3.5 rounded-lg transition cursor-pointer border-0"
                  >
                    Copy
                  </button>
                </div>

                <button
                  onClick={() => setIsInviteModalOpen(false)}
                  className="w-full py-3 border border-slate-200 hover:bg-slate-50 text-slate-655 text-xs font-bold rounded-xl transition cursor-pointer bg-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Need Help Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
        {isHelpOpen && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 w-72 text-left space-y-3 animate-slide-in relative">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-xs font-black text-slate-800">Support Chat Helper</span>
              <button 
                onClick={() => setIsHelpOpen(false)} 
                className="text-slate-400 hover:text-slate-700 text-xs transition cursor-pointer border-0 bg-transparent"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Have questions about templates, downloads, or API settings? Connect with our support team.
            </p>
            
            <button 
              onClick={() => {
                showToast('Connecting with support team...');
                setIsHelpOpen(false);
              }}
              className="w-full bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-[10px] font-black py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer border-0"
            >
              <span>Start Chat Session</span>
            </button>
          </div>
        )}
        
        <button
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          className="w-12 h-12 rounded-full bg-[#5c3bee] hover:bg-[#4f46e5] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer border-0"
          title="Need Help?"
        >
          <i className="fa-solid fa-message text-base" />
        </button>
      </div>

    </div>
  );
}
