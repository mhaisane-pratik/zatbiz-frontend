'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, getRandomFoodImage } from '@/services/api';
import { Product, Order } from '@/types';

// ==========================================
// 1. UserProfilePanel
// ==========================================
interface UserProfilePanelProps {
  userName: string;
  setUserName: (n: string) => void;
  userPhone: string;
  setUserPhone: (p: string) => void;
  userAddressHome: string;
  setUserAddressHome: (a: string) => void;
  clientEmail: string | null;
  theme: any;
  shopNiche: string | null;
  handleSaveProfileChanges: () => void;
}

export function UserProfilePanel({
  userName,
  setUserName,
  userPhone,
  setUserPhone,
  userAddressHome,
  setUserAddressHome,
  clientEmail,
  theme,
  shopNiche,
  handleSaveProfileChanges,
}: UserProfilePanelProps) {
  let avatarUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
  let bannerTitle = 'Premium Shop Member';
  if (shopNiche === 'fashion_men') {
    avatarUrl = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80';
    bannerTitle = "Men's Style Club VIP";
  } else if (shopNiche === 'fashion_women') {
    avatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80';
    bannerTitle = "Women's Couture Elite";
  } else if (shopNiche === 'fashion_kids') {
    avatarUrl = 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=150&auto=format&fit=crop&q=80';
    bannerTitle = "Kids Wear Club Member";
  } else if (shopNiche === 'fashion_footwear') {
    avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    bannerTitle = "Gold Sneakerhead Collector";
  }

  const defaultName = userName || (
    shopNiche === 'fashion_men' ? 'Rahul Sharma' :
    shopNiche === 'fashion_women' ? 'Sneha Patel' :
    shopNiche === 'fashion_kids' ? 'Nisha Malhotra' :
    shopNiche === 'fashion_footwear' ? 'Amit Verma' :
    'Guest Customer'
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={`p-6 bg-gradient-to-r ${theme.gradientBanner} text-white rounded-3xl shadow-md relative overflow-hidden flex flex-col md:flex-row items-center gap-6`}>
        <div className="relative z-10 w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden shadow-lg shrink-0">
          <img src={avatarUrl} className="w-full h-full object-cover" alt="User Avatar" />
        </div>
        <div className="relative z-10 text-center md:text-left space-y-1">
          <span className="px-2.5 py-0.5 bg-white/25 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-wider">
            {bannerTitle}
          </span>
          <h2 className="text-lg font-black">{defaultName}</h2>
          <p className="text-xs text-white/80 font-semibold">{clientEmail}</p>
        </div>
      </div>

      <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6 text-xs text-slate-805">
        <h3 className="text-xs font-bold text-slate-900 uppercase">My Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              value={userName || defaultName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-550 transition font-bold"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
            <input
              type="text"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-550 transition font-bold"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Registered Email</label>
            <input
              type="email"
              disabled
              value={clientEmail || ''}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed outline-none font-bold"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-slate-150">
          <button
            onClick={handleSaveProfileChanges}
            className={`px-6 py-2.5 ${theme.primaryBtn} text-xs font-bold rounded-xl shadow-md transition active:scale-95 cursor-pointer`}
          >
            Save Profile Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. UserOrdersPanel
// ==========================================
interface UserOrdersPanelProps {
  orders: any[];
  clientEmail: string | null;
  shopNiche: string | null;
  theme: any;
}

export function UserOrdersPanel({
  orders,
  clientEmail,
  shopNiche,
  theme,
}: UserOrdersPanelProps) {
  const userOrders = orders.filter(
    (o) => o.customer === clientEmail || o.customer === 'Guest Customer' || o.customer === 'customer@example.com'
  );
  const currencySymbol = shopNiche === 'cloth' || (shopNiche && (shopNiche.startsWith('fashion') || shopNiche.startsWith('electronics') || shopNiche.startsWith('grocery'))) ? '₹' : '$';

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800">
      <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase">My Order Logs</h3>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
            {userOrders.length} orders total
          </span>
        </div>

        {userOrders.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <span className="text-3xl block">📦</span>
            <p className="text-xs text-slate-550 font-bold">No orders placed yet</p>
            <p className="text-[10px] text-slate-400">Items you purchase from the storefront will list here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {userOrders.map((o) => (
              <div key={o.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-xs font-black text-slate-905">Order #{o.id}</span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-0.5">{o.date}</span>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <span className={`text-xs font-black ${theme.accentText}`}>
                      {o.amount.startsWith('₹') || o.amount.startsWith('$') ? o.amount : `${currencySymbol}${o.amount}`}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-semibold">Free Delivery</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                    o.status === 'Delivered'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : o.status === 'Shipped'
                      ? 'bg-blue-50 text-blue-600 border border-blue-100'
                      : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. UserWishlistPanel
// ==========================================
interface UserWishlistPanelProps {
  wishlist: Product[];
  setWishlist: (w: Product[]) => void;
  theme: any;
  shopNiche: string | null;
}

export function UserWishlistPanel({
  wishlist,
  setWishlist,
  theme,
  shopNiche,
}: UserWishlistPanelProps) {
  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800">
      <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase">My Favorite Wishlist</h3>
          <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-bold">
            {wishlist.length} Items Liked
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <span className="text-3xl block">❤️</span>
            <p className="text-xs text-slate-500 font-bold">Your wishlist is empty</p>
            <p className="text-[10px] text-slate-400">Like items in the storefront to list them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlist.map((item) => (
              <div key={item.id} className="p-4 bg-slate-55/50 border border-slate-200/80 rounded-2xl flex gap-4 items-center relative group">
                <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <img src={item.imageUrl || '/images/login_illustration.png'} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1 truncate text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{item.category}</span>
                  <h4 className="font-extrabold text-slate-850 text-xs truncate leading-tight">{item.name}</h4>
                  <span className={`text-xs font-black block mt-1 ${theme.accentText}`}>
                    {shopNiche === 'cloth' || (shopNiche && (shopNiche.startsWith('fashion') || shopNiche.startsWith('electronics') || shopNiche.startsWith('grocery'))) ? '₹' : '$'}{item.price.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setWishlist(wishlist.filter(w => w.id !== item.id));
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white hover:bg-rose-50 text-rose-500 rounded-full border border-slate-200/50 hover:border-rose-100 transition shadow-sm cursor-pointer text-[9px] font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. UserAddressPanel
// ==========================================
interface UserAddressPanelProps {
  userAddressHome: string;
  setUserAddressHome: (a: string) => void;
  userAddressWork: string;
  setUserAddressWork: (a: string) => void;
  projectId: number;
}

export function UserAddressPanel({
  userAddressHome,
  setUserAddressHome,
  userAddressWork,
  setUserAddressWork,
  projectId,
}: UserAddressPanelProps) {
  const [isEditingAddress, setIsEditingAddress] = useState<'home' | 'work' | null>(null);
  const [tempAddressVal, setTempAddressVal] = useState('');

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800">
      <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase">Shipping Addresses</h3>
          <button
            onClick={() => alert('New address creation is active in complete Supabase flow.')}
            className="text-[10px] text-indigo-650 hover:underline font-bold bg-transparent border-0 cursor-pointer"
          >
            + Add Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Home Address */}
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3 relative">
            <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-705 rounded-md text-[8px] font-bold uppercase tracking-wider">
              Home Address
            </span>
            {isEditingAddress === 'home' ? (
              <div className="space-y-3">
                <textarea
                  rows={2}
                  value={tempAddressVal}
                  onChange={(e) => setTempAddressVal(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-905 outline-none focus:border-indigo-500 transition font-medium"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setIsEditingAddress(null)}
                    className="px-3 py-1.5 border border-slate-250 text-slate-500 rounded-lg text-[10px] font-bold bg-transparent cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      setUserAddressHome(tempAddressVal);
                      setIsEditingAddress(null);
                      const customerIdStr = localStorage.getItem('clientId');
                      if (customerIdStr) {
                        const customerId = parseInt(customerIdStr, 10);
                        try {
                          await api.customers.update(customerId, { address: tempAddressVal });
                          localStorage.setItem('clientAddress', tempAddressVal);
                        } catch (err) {
                          console.error('Failed to update address in DB:', err);
                        }
                      }
                    }}
                    className="px-3 py-1.5 bg-indigo-650 text-white rounded-lg text-[10px] font-bold cursor-pointer border-0"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-655 font-medium leading-relaxed">
                  {userAddressHome}
                </p>
                <button
                  onClick={() => {
                    setIsEditingAddress('home');
                    setTempAddressVal(userAddressHome);
                  }}
                  className="text-[10px] text-slate-405 hover:text-slate-800 font-bold hover:underline bg-transparent border-0 cursor-pointer p-0"
                >
                  Edit Address 🖊️
                </button>
              </>
            )}
          </div>

          {/* Work Address */}
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3 relative">
            <span className="px-2 py-0.5 bg-teal-50 border border-teal-100 text-teal-705 rounded-md text-[8px] font-bold uppercase tracking-wider">
              Work Address
            </span>
            {isEditingAddress === 'work' ? (
              <div className="space-y-3">
                <textarea
                  rows={2}
                  value={tempAddressVal}
                  onChange={(e) => setTempAddressVal(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-905 outline-none focus:border-indigo-505 transition font-medium"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setIsEditingAddress(null)}
                    className="px-3 py-1.5 border border-slate-250 text-slate-500 rounded-lg text-[10px] font-bold bg-transparent cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setUserAddressWork(tempAddressVal);
                      setIsEditingAddress(null);
                    }}
                    className="px-3 py-1.5 bg-indigo-655 text-white rounded-lg text-[10px] font-bold cursor-pointer border-0"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-655 font-medium leading-relaxed">
                  {userAddressWork}
                </p>
                <button
                  onClick={() => {
                    setIsEditingAddress('work');
                    setTempAddressVal(userAddressWork);
                  }}
                  className="text-[10px] text-slate-405 hover:text-slate-800 font-bold hover:underline bg-transparent border-0 cursor-pointer p-0"
                >
                  Edit Address 🖊️
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. UserCouponsPanel
// ==========================================
interface UserCouponsPanelProps {
  shopNiche: string | null;
  theme: any;
}

export function UserCouponsPanel({ shopNiche, theme }: UserCouponsPanelProps) {
  let couponsList = [
    { code: 'ZATBIZ10', desc: 'Get 10% off site-wide on any products.', discount: '10% OFF' },
    { code: 'FREESHIP', desc: 'Free standard shipping on your next order.', discount: 'FREE DELIVERY' }
  ];

  if (shopNiche === 'fashion_men') {
    couponsList = [
      { code: 'MANSTYLE20', desc: "Get 20% off on all Men's Shirts, Chinos, and Outerwear.", discount: '20% OFF' },
      { code: 'FIRSTMALE', desc: 'Flat ₹500 off on your first men fashion haul.', discount: '₹500 OFF' }
    ];
  } else if (shopNiche === 'fashion_women') {
    couponsList = [
      { code: 'GLAMOUR25', desc: 'Get 25% off on all elegant Women summer dresses.', discount: '25% OFF' },
      { code: 'LADIESDAY', desc: 'Free Shipping + Premium gift wrapping option.', discount: 'FREE GIFT' }
    ];
  } else if (shopNiche === 'fashion_kids') {
    couponsList = [
      { code: 'KIDSPLAY15', desc: 'Get 15% off on cartoon hoodies & durables dungarees.', discount: '15% OFF' },
      { code: 'MINIME', desc: 'Buy 2 get 1 free on all kids cotton sleepwear.', discount: 'B2G1 FREE' }
    ];
  } else if (shopNiche === 'fashion_footwear') {
    couponsList = [
      { code: 'SNEAKERHEAD', desc: 'Flat ₹1000 off on premium running sneakers & loafers.', discount: '₹1000 OFF' },
      { code: 'SOLES30', desc: 'Get 30% off on second purchase of footwear slides.', discount: '30% OFF' }
    ];
  }

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800">
      <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
        <h3 className="text-xs font-bold text-slate-900 uppercase pb-3 border-b border-slate-100">
          Exclusive Coupons & Offers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {couponsList.map((c) => (
            <div key={c.code} className="p-5 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl flex flex-col justify-between gap-4">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-wider ${theme.accentText}`}>
                  {c.discount}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-1">{c.code}</h4>
                <p className="text-[10px] text-slate-550 font-semibold leading-relaxed mt-1">
                  {c.desc}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(c.code);
                  alert(`📋 Coupon Code "${c.code}" copied to clipboard!`);
                }}
                className={`w-full py-2 bg-white border border-slate-200 hover:border-indigo-555 rounded-xl text-[10px] font-black text-slate-700 transition cursor-pointer shadow-sm`}
              >
                Copy Promo Code
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. UserNotificationsPanel
// ==========================================
interface UserNotificationsPanelProps {
  shopNiche: string | null;
}

export function UserNotificationsPanel({ shopNiche }: UserNotificationsPanelProps) {
  const notificationsList = [
    { id: 1, title: '🎉 Premium Club Membership Activated', desc: 'Welcome! You have been enrolled in our premium customer loyalty club. Enjoy early announcements and coupon reductions.', date: 'Today' },
    { id: 2, title: '📦 Order #1003 Shipped', desc: 'Excellent news! Your package containing your ordered items has been hand-inspected and handed over to logistics.', date: 'Yesterday' },
    { id: 3, title: '🔥 Weekend Flash Sale Preview', desc: 'Special promo codes have been loaded into your account. Explore catalog items to claim up to 30% discount.', date: '3 days ago' }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800">
      <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
        <h3 className="text-xs font-bold text-slate-900 uppercase pb-3 border-b border-slate-100">
          Notifications Center
        </h3>

        <div className="space-y-4 text-left">
          {notificationsList.map((n) => (
            <div key={n.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex gap-3 items-start">
              <span className="text-lg">🔔</span>
              <div className="space-y-1 w-full">
                <div className="flex justify-between items-center gap-4">
                  <h4 className="font-extrabold text-slate-805 text-xs">{n.title}</h4>
                  <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">{n.date}</span>
                </div>
                <p className="text-[10px] text-slate-550 leading-relaxed font-semibold">
                  {n.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. UserTableBookingsPanel
// ==========================================
interface UserTableBookingsPanelProps {
  projectId: number;
  clientEmail: string | null;
  userName: string;
  userPhone: string;
  reservations: any[];
  fetchReservations: (email?: string) => void;
}

export function UserTableBookingsPanel({
  projectId,
  clientEmail,
  userName,
  userPhone,
  reservations,
  fetchReservations,
}: UserTableBookingsPanelProps) {
  const [resFormDate, setResFormDate] = useState('');
  const [resFormTime, setResFormTime] = useState('18:00');
  const [resFormGuests, setResFormGuests] = useState(2);
  const [resFormTable, setResFormTable] = useState('1');
  const [resFormNotes, setResFormNotes] = useState('');

  const DEFAULT_TABLES = [
    { id: '1', name: 'Table 1 (Window)', seats: 2 },
    { id: '2', name: 'Table 2 (Window)', seats: 2 },
    { id: '3', name: 'Table 3 (Booth)', seats: 4 },
    { id: '4', name: 'Table 4 (Booth)', seats: 4 },
    { id: '5', name: 'Table 5 (Center)', seats: 4 },
    { id: '6', name: 'Table 6 (Center)', seats: 6 },
    { id: '7', name: 'Table 7 (VIP Room)', seats: 8 },
    { id: '8', name: 'Table 8 (Patio)', seats: 2 },
  ];

  const handleCustomerCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      customerName: userName || 'Customer',
      customerEmail: clientEmail,
      customerPhone: userPhone,
      bookingDate: resFormDate,
      bookingTime: resFormTime,
      numberOfGuests: resFormGuests,
      tableNumber: resFormTable,
      notes: resFormNotes,
      status: 'Pending'
    };
    try {
      await api.reservations.create(payload);
      alert('Reservation requested successfully! Our team will confirm shortly.');
      setResFormDate('');
      setResFormTime('18:00');
      setResFormGuests(2);
      setResFormNotes('');
      fetchReservations(clientEmail || undefined);
    } catch (err) {
      console.error(err);
      alert('Failed to place reservation.');
    }
  };

  const handleUpdateReservationStatus = async (id: number, status: string) => {
    try {
      await api.reservations.updateStatus(id, status);
      fetchReservations(clientEmail || undefined);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 text-xs">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start text-left">
        {/* Reservation Form */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-905 uppercase tracking-wider border-b border-slate-100 pb-2">
            Book a New Table
          </h3>
          <form onSubmit={handleCustomerCreateReservation} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Name</label>
              <input
                type="text"
                disabled
                value={userName || 'Profile User'}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">Phone Number</label>
              <input
                type="text"
                disabled
                value={userPhone || 'Not Registered'}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed outline-none font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                <input
                  type="date"
                  required
                  value={resFormDate}
                  onChange={(e) => setResFormDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer text-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Time Slot</label>
                <select
                  value={resFormTime}
                  onChange={(e) => setResFormTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer text-slate-800 font-bold"
                >
                  {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Guests Count</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={20}
                  value={resFormGuests}
                  onChange={(e) => setResFormGuests(parseInt(e.target.value, 10) || 1)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">Select Table</label>
                <select
                  value={resFormTable}
                  onChange={(e) => setResFormTable(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer text-slate-800 font-bold"
                >
                  {DEFAULT_TABLES.map((t) => (
                    <option key={t.id} value={t.id}>Table {t.id} ({t.seats} seats)</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Special Request Notes</label>
              <textarea
                value={resFormNotes}
                onChange={(e) => setResFormNotes(e.target.value)}
                placeholder="e.g. Vegetarian menu, birthday cake support, high chair."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition resize-none text-slate-800 font-semibold"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer border-none"
            >
              Submit Reservation Request
            </button>
          </form>
        </div>

        {/* Bookings History list */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-black text-slate-905 uppercase tracking-wider border-b border-slate-100 pb-2">
            My Table Bookings Registry
          </h3>
          {reservations.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-10 text-center text-slate-400 italic shadow-sm">
              No past reservations found for your email account.
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((res) => (
                <div key={res.id} className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-xs">Table {res.tableNumber}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                        res.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : res.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {res.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold space-y-0.5">
                      <p>📅 Date: {res.bookingDate} at {res.bookingTime}</p>
                      <p>👥 Guests: {res.numberOfGuests} persons</p>
                      {res.notes && <p className="italic text-indigo-500">Notes: "{res.notes}"</p>}
                    </div>
                  </div>
                  {res.status !== 'Cancelled' && (
                    <button
                      onClick={() => handleUpdateReservationStatus(res.id, 'Cancelled')}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 font-bold rounded-xl border border-rose-150 transition cursor-pointer text-[10px]"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
