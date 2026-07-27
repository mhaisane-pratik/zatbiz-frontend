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
    { name: 'Digital Planners', count: 125, icon: '📅', color: 'bg-indigo-50 border border-indigo-100/50 text-indigo-650 dark:bg-indigo-950/40 dark:border-indigo-900/40 dark:text-indigo-300' },
    { name: 'Notion Templates', count: 98, icon: '📓', color: 'bg-slate-50 border border-slate-200/50 text-slate-700 dark:bg-slate-900/40 dark:border-slate-800/40 dark:text-slate-350' },
    { name: 'E-Books', count: 76, icon: '📚', color: 'bg-emerald-50 border border-emerald-100/50 text-emerald-650 dark:bg-emerald-950/40 dark:border-emerald-900/40 dark:text-emerald-300' },
    { name: 'Design Assets', count: 64, icon: '🎨', color: 'bg-amber-50 border border-amber-100/50 text-amber-650 dark:bg-amber-950/40 dark:border-amber-900/40 dark:text-amber-300' },
    { name: 'Courses', count: 42, icon: '🎓', color: 'bg-blue-50 border border-blue-100/50 text-blue-650 dark:bg-blue-950/40 dark:border-blue-900/40 dark:text-blue-300' }
  ];

  const quickStats = [
    { label: 'Wallet balance', value: `$${walletBalance.toFixed(2)}`, hint: 'Live business funds' },
    { label: 'Wishlist items', value: String(wishlistCount), hint: 'Saved products' },
    { label: 'Referral code', value: referralCode, hint: 'Shareable growth loop' },
    { label: 'Support', value: 'Online', hint: 'Help widget available' },
  ];

  const quickActions = [
    { label: 'Browse products', tab: 'browse_products', icon: 'fa-bag-shopping' },
    { label: 'Open categories', tab: 'categories', icon: 'fa-layer-group' },
    { label: 'View wishlist', tab: 'wishlist', icon: 'fa-heart' },
    { label: 'Open messages', tab: 'messages', icon: 'fa-comment-dots' },
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
    <div className="space-y-5 max-w-[1100px] mx-auto pb-16 w-full text-left">

        {/* Setup Guide — Shopify style */}
        <div className="bg-white border border-[#e3e3e3] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-5 flex flex-col md:flex-row gap-6 justify-between items-start text-left">
            <div className="flex-1 space-y-3 max-w-xl">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-[#303030]">Setup guide</h2>
                <p className="text-[13px] text-[#616161]">Use this personalized guide to get your store up and running.</p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs text-[#616161]">2 of 4 tasks complete</span>
                <div className="flex-1 max-w-[120px] bg-[#e3e3e3] h-1 rounded-full overflow-hidden">
                  <div className="bg-[#1a1a1a] h-full rounded-full transition-all duration-500" style={{ width: '50%' }} />
                </div>
              </div>

              {/* Task Items */}
              <div className="space-y-1 pt-2">
                <div className="flex gap-3 items-start px-3 py-2 rounded-lg">
                  <span className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[10px] text-white flex-shrink-0 mt-0.5">
                    <i className="fa-solid fa-check" />
                  </span>
                  <div>
                    <h4 className="text-[13px] font-medium text-[#616161] line-through">Select a design template</h4>
                  </div>
                </div>

                <div className="flex gap-3 items-start px-3 py-2 rounded-lg">
                  <span className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[10px] text-white flex-shrink-0 mt-0.5">
                    <i className="fa-solid fa-check" />
                  </span>
                  <div>
                    <h4 className="text-[13px] font-medium text-[#616161] line-through">Setup your business profile</h4>
                  </div>
                </div>

                <div className="flex gap-3 items-start px-3 py-3 rounded-lg bg-[#f7f7f7]">
                  <span className="w-5 h-5 rounded-full border-2 border-dashed border-[#8a8a8a] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[13px] font-semibold text-[#303030]">Customize template layout & theme studio</h4>
                    <p className="text-xs text-[#616161] mt-1 leading-relaxed">Edit color presets, custom typography, header logos, and page layouts in real-time.</p>
                    <button
                      onClick={() => onNavigateTab('browse_products')}
                      className="mt-3 px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-lg text-xs font-semibold transition cursor-pointer border-none shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]"
                    >
                      Open builder
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 items-start px-3 py-2 rounded-lg">
                  <span className="w-5 h-5 rounded-full border-2 border-dashed border-[#c9c9c9] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[13px] font-medium text-[#8a8a8a]">Publish store live</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-72 bg-[#f7f7f7] border border-[#e3e3e3] rounded-xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-medium text-[#014b40] bg-[#cdfee1] px-2 py-0.5 rounded-md inline-block">ZatBiz Storefront</span>
                <h3 className="text-[13px] font-semibold text-[#303030] mt-1">Active sandbox portal</h3>
                <p className="text-xs text-[#616161] leading-relaxed">
                  Your store is initialized in sandbox mode. All mock databases and page generators are running online.
                </p>
              </div>

              <div className="pt-3 border-t border-[#e3e3e3]">
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-[#616161]">Store domain</span>
                  <span className="text-[#303030] font-semibold truncate max-w-[150px] font-mono">zatbiz.site/demo</span>
                </div>
                <button
                  onClick={() => onNavigateTab('browse_products')}
                  className="w-full py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white font-semibold text-xs rounded-lg transition cursor-pointer border-none shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]"
                >
                  Select & deploy store
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Badges Row */}
     

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((item) => (
            <div key={item.label} className="rounded-xl border border-[#e3e3e3] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <p className="text-xs font-medium text-[#616161]">{item.label}</p>
              <p className="mt-1.5 text-base font-semibold text-[#303030]">{item.value}</p>
              <p className="mt-0.5 text-xs text-[#8a8a8a]">{item.hint}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => onNavigateTab(action.tab)}
              className="flex items-center gap-3 rounded-xl border border-[#e3e3e3] bg-white px-4 py-3.5 text-left transition hover:bg-[#fafafa] hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f1f1f1] text-[#303030]">
                <i className={`fa-solid ${action.icon} text-sm`} />
              </span>
              <span>
                <span className="block text-[13px] font-semibold text-[#303030]">{action.label}</span>
                <span className="block text-xs text-[#616161]">Open this section now</span>
              </span>
            </button>
          ))}
        </div>

        {/* Popular Categories */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <h2 className="text-sm font-semibold text-[#303030]">Popular categories</h2>
            <button
              onClick={() => onNavigateTab('categories')}
              className="text-xs font-medium text-[#005bd3] hover:underline transition cursor-pointer bg-transparent border-0"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {popularCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onNavigateTab('categories')}
                className="p-4 rounded-xl bg-white border border-[#e3e3e3] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#fafafa] hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-150 text-left space-y-3 cursor-pointer w-full"
              >
                <div className="w-9 h-9 rounded-lg bg-[#f1f1f1] flex items-center justify-center text-base">
                  {cat.icon}
                </div>
                <div className="leading-tight">
                  <h4 className="text-[13px] font-semibold text-[#303030] truncate">{cat.name}</h4>
                  <p className="text-xs text-[#616161] mt-0.5">{cat.count} products</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <h2 className="text-sm font-semibold text-[#303030]">Trending products</h2>
            <button
              onClick={() => onNavigateTab('browse_products')}
              className="text-xs font-medium text-[#005bd3] hover:underline transition cursor-pointer bg-transparent border-0"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {trendingProducts.map((product) => {
              const isWishlisted = !!wishlistedIds[product.id];
              return (
                <div
                  key={product.id}
                  className="group bg-white border border-[#e3e3e3] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_1px_4px_rgba(0,0,0,0.1)] transition duration-200 flex flex-col justify-between"
                >
                  {/* Thumbnail / Image with overlay button */}
                  <div className="relative h-32 bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-900">
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
                      className="absolute top-2.5 right-2.5 w-7.5 h-7.5 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm border border-slate-100 dark:border-slate-700 transition active:scale-90 cursor-pointer"
                    >
                      <i className={`fa-${isWishlisted ? 'solid text-rose-500' : 'regular'} fa-heart text-xs`} />
                    </button>
                  </div>

                  {/* Info details */}
                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block truncate">{product.category}</span>
                      <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 line-clamp-2 mt-0.5 leading-snug">{product.name}</h4>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-[#f1f1f1]">
                      {/* Rating details */}
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400 text-[10px]">
                          {'★'.repeat(5)}
                        </div>
                        <span className="text-[10px] text-[#616161] font-medium">
                          {product.rating}
                        </span>
                      </div>

                      {/* Price & Buy Button */}
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-semibold text-[#303030]">
                          ${product.price.toFixed(2)}
                        </span>

                        <button
                          onClick={() => {
                            showToast(`"${product.name}" added to cart!`);
                          }}
                          className="w-6 h-6 rounded-md bg-[#f1f1f1] hover:bg-[#1a1a1a] text-[#303030] hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer border-0"
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-150 dark:border-slate-800 shadow-2xl relative">
            <button 
              onClick={() => setIsWalletModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 flex items-center justify-center cursor-pointer transition border-0 bg-transparent"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            <div className="text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-650 dark:text-indigo-300 mx-auto text-xl">
                💳
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 dark:text-white">Add Funds to Wallet</h3>
                <p className="text-xs text-slate-455 dark:text-slate-400 font-semibold">Load currency to purchase premium templates instantly.</p>
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
                    className="w-full bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 rounded-xl py-3 pl-8 pr-4 text-slate-800 dark:text-slate-200 font-black text-sm outline-none transition"
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
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-655 dark:bg-indigo-950/50 dark:border-indigo-800 dark:text-indigo-400'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-455 dark:hover:bg-slate-800'
                      }`}
                    >
                      +${amt}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer border-0"
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-150 dark:border-slate-800 shadow-2xl relative">
            <button 
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 flex items-center justify-center cursor-pointer transition border-0 bg-transparent"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            <div className="text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 flex items-center justify-center text-purple-650 dark:text-purple-300 mx-auto text-xl">
                💎
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 dark:text-white">Invite Your Network</h3>
                <p className="text-xs text-slate-455 dark:text-slate-400 font-semibold">Earn 10% commission on every purchase made with your code.</p>
              </div>

              <div className="space-y-3.5">
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex justify-between items-center text-xs">
                  <span className="font-mono font-black text-slate-800 dark:text-slate-200 tracking-wide select-all">
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
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-4.5 pr-20 text-[10px] text-slate-500 dark:text-slate-400 font-bold select-all outline-none"
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
                  className="w-full py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-655 dark:text-slate-400 text-xs font-bold rounded-xl transition cursor-pointer bg-white dark:bg-slate-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating chat widget removed — the sidebar "Messages" item opens ZatChat instead. */}

    </div>
  );
}
