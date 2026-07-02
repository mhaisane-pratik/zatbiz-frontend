import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardTemplateProps } from './types';
import { useCategoryDashboardState } from './useCategoryDashboardState';
import { DashboardDinerOverview } from './DashboardDinerOverview';
import { DashboardBookingsView } from './DashboardBookingsView';
import { DashboardItemsView } from './DashboardItemsView';
import { api } from '@/services/api';
import { useDarkMode } from '@/hooks/useDarkMode';
import {
  UserProfilePanel,
  UserOrdersPanel,
} from '../../dashboard/UserPanels';
import {
  AdminOverviewPanel,
  AdminProductsPanel,
  AdminSettingsPanel,
  AdminOrdersPanel,
} from '../../dashboard/AdminPanels';

export function CategoryDashboardTemplate({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  setCompanyName,
  logoIcon,
  logoUrl,
  shopNiche,
  niche,
  primaryColor,
  accentBg,
  emoji,
  metrics
}: DashboardTemplateProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const router = useRouter();

  const {
    products, fetchDbProducts,
    orders, fetchOrders,
    reservations, fetchReservationsList, reservationLoading,
    walletBalance, setWalletBalance,
    cartItems, addToCart, removeFromCart, clearCart, placeDinerOrder,
    storeSettings, setStoreSettings,
    userName, setUserName,
    userPhone, setUserPhone,
    userAddressHome, setUserAddressHome,
    eventsList, fetchEvents,
    eventBookings, fetchEventBookings,
    couponsList, fetchCoupons,
    offersList, fetchOffers,
    categoriesList, fetchCategories
  } = useCategoryDashboardState(projectId, clientEmail, companyName, logoUrl);

  const [checkoutCity, setCheckoutCity] = useState('Local City');
  const [checkoutState, setCheckoutState] = useState('Local State');
  const [checkoutPincode, setCheckoutPincode] = useState('110001');
  const [checkoutPaymentMethod, setCheckoutPaymentMethod] = useState('COD');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [checkoutNotes, setCheckoutNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({});
  const [dealsSearchQuery, setDealsSearchQuery] = useState('');

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    const codeClean = couponCode.trim().toUpperCase();
    if (!codeClean) return;
    const found = couponsList.find(c => c.code.toUpperCase() === codeClean);
    if (!found) {
      setCouponError('Invalid coupon code.');
      setAppliedCoupon(null);
      return;
    }
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    if (subtotal < found.minOrderAmount) {
      setCouponError(`Min order amount to use this coupon is $${found.minOrderAmount}.`);
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(found);
    setCouponSuccess(`Coupon applied! $${found.discountType === 'Percentage' ? `${found.discountValue}%` : found.discountValue} discount.`);
  };

  const handleBookTickets = async (eventObj: any) => {
    const e = JSON.parse(eventObj.dataJson);
    const qty = ticketQuantities[eventObj.id] || 1;
    const cost = qty * e.price;
    if (walletBalance < cost) {
      alert("Insufficient wallet balance to buy these tickets!");
      return;
    }
    
    // Deduct wallet balance
    const newBalance = walletBalance - cost;
    setWalletBalance(newBalance);
    localStorage.setItem(`zatbiz_wallet_balance_${projectId}_${clientEmail}`, String(newBalance));
    
    // Save event booking
    const bookingPayload = {
      eventName: e.name,
      customerName: userName || 'Gourmet Diner',
      customerEmail: clientEmail,
      tickets: qty,
      totalPaid: cost,
      status: 'Approved'
    };
    
    try {
      await api.restaurantData.create({
        projectId,
        dataType: 'event_booking',
        dataJson: JSON.stringify(bookingPayload)
      });
      alert(`Successfully booked ${qty} tickets for ${e.name}! $${cost} deducted from wallet.`);
      fetchEventBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to book event tickets.");
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutLoading(true);
    try {
      const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
      let discountVal = 0;
      if (appliedCoupon) {
        if (appliedCoupon.discountType === 'Percentage') {
          discountVal = subtotal * (parseFloat(appliedCoupon.discountValue) / 100);
        } else {
          discountVal = parseFloat(appliedCoupon.discountValue);
        }
      }
      const finalSubtotal = Math.max(0, subtotal - discountVal);
      const tax = finalSubtotal * (storeSettings.taxRate / 100);
      const total = finalSubtotal + tax + (storeSettings.shippingFee || 0);

      if (checkoutPaymentMethod === 'Wallet') {
        if (walletBalance < total) {
          alert('Insufficient wallet balance!');
          setCheckoutLoading(false);
          return;
        }
        const newBalance = walletBalance - total;
        setWalletBalance(newBalance);
        localStorage.setItem(`zatbiz_wallet_balance_${projectId}_${clientEmail}`, String(newBalance));
      }

      await placeDinerOrder(checkoutPaymentMethod, checkoutCity, checkoutState, checkoutPincode, checkoutNotes);
      alert('Order placed successfully!');
      setCheckoutNotes('');
      setAppliedCoupon(null);
      setCouponCode('');
      setCouponSuccess('');
    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const [resFormDate, setResFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [resFormTime, setResFormTime] = useState('19:00');
  const [resFormGuests, setResFormGuests] = useState(2);
  const [resFormNotes, setResFormNotes] = useState('');

  const handleSaveProfileChanges = async () => {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) return;
    try {
      await api.customers.update(parseInt(clientId, 10), {
        name: userName,
        phone: userPhone,
        address: userAddressHome
      });
      localStorage.setItem('clientName', userName);
      localStorage.setItem('clientPhone', userPhone);
      localStorage.setItem('clientAddress', userAddressHome);
      alert('VIP Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const preOrderSummary = cartItems.length > 0
      ? cartItems.map(c => `${c.quantity}x ${c.product.name}`).join(', ')
      : '';

    const payload = {
      projectId,
      customerName: userName || 'Honored Guest',
      customerEmail: clientEmail,
      customerPhone: userPhone,
      bookingDate: resFormDate,
      bookingTime: resFormTime,
      numberOfGuests: resFormGuests,
      tableNumber: 'Auto-Allocated Table',
      notes: resFormNotes,
      preOrderItems: preOrderSummary,
      status: 'Pending'
    };

    try {
      await api.reservations.create(payload);
      if (preOrderSummary) {
        alert(`Table reservation and Pre-Order ("${preOrderSummary}") requested successfully!`);
        clearCart();
      } else {
        alert('Table reservation requested successfully! Check status below.');
      }
      setResFormNotes('');
      fetchReservationsList();
    } catch (err) {
      console.error(err);
      alert('Failed to submit booking.');
    }
  };

  const handleUpdateReservationStatus = async (id: number, status: string) => {
    try {
      await api.reservations.updateStatus(id, status);
      alert(`Reservation marked as ${status}!`);
      fetchReservationsList();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBooking = async (id: number) => {
    if (!confirm('Cancel this booking request?')) return;
    try {
      await api.reservations.delete(id);
      fetchReservationsList();
    } catch (err) {
      console.error(err);
    }
  };

  const isDiner = clientEmail !== 'admin@gmail.com';

  useEffect(() => {
    if (!isDiner) {
      setActiveTab('overview');
    } else {
      setActiveTab('dashboard');
    }
  }, [clientEmail]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  let discountVal = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'Percentage') {
      discountVal = subtotal * (parseFloat(appliedCoupon.discountValue) / 100);
    } else {
      discountVal = parseFloat(appliedCoupon.discountValue);
    }
  }
  const finalSubtotal = Math.max(0, subtotal - discountVal);
  const tax = finalSubtotal * (storeSettings.taxRate / 100);
  const total = finalSubtotal + tax + (storeSettings.shippingFee || 0);

  return (
    <div className="flex flex-1 min-h-screen bg-[#faf8f5] text-slate-800 font-sans">
      {/* Category-Specific Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200/80 p-6 flex flex-col justify-between flex-shrink-0 font-sans">
        <div className="space-y-8 text-left">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl select-none">{emoji}</span>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider leading-none">
                {companyName.replace(" Site", "")}
              </h3>
              <p className="text-[8px] font-black uppercase tracking-widest mt-1" style={{ color: primaryColor }}>{niche.toUpperCase()} PORTAL</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {(isDiner
              ? [
                  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                  { id: 'items', label: 'Plated Menu', icon: emoji },
                  { id: 'events', label: 'Special Events', icon: '✨' },
                  { id: 'offers_coupons', label: 'Offers & Coupons', icon: '🔥' },
                  { id: 'bookings', label: 'Reservations', icon: '📅' },
                  { id: 'orders', label: 'Order Drafts', icon: '🛵' },
                  { id: 'profile', label: 'Profile', icon: '👤' }
                ]
              : [
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'bookings', label: 'Table Bookings', icon: '📅' },
                  { id: 'orders', label: 'Diner Orders', icon: '🛵' },
                  { id: 'settings', label: 'Kitchen Settings', icon: '⚙️' }
                ]
            ).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border border-transparent bg-transparent"
                  style={isActive ? {
                    backgroundColor: `${primaryColor}1a`,
                    color: primaryColor,
                    borderColor: `${primaryColor}33`
                  } : {
                    color: '#94a3b8'
                  }}
                >
                  <span className="text-sm select-none">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-1.5">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-stone-500 hover:text-stone-900 hover:bg-stone-55 rounded-xl transition text-left cursor-pointer border-none bg-transparent uppercase tracking-wider"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-500 hover:text-rose-455 hover:bg-rose-50 rounded-xl transition text-left cursor-pointer border-none bg-transparent uppercase tracking-wider"
          >
            🚪 Exit Console
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#faf9f6] p-8 overflow-y-auto font-sans">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <header className="flex justify-between items-center pb-6 border-b border-stone-200/50 font-sans">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full overflow-hidden border bg-stone-50 flex items-center justify-center text-xl" style={{ borderColor: `${primaryColor}40` }}>
                {emoji}
              </div>
              <div className="text-left font-sans">
                <h2 className="text-lg font-black text-slate-800 tracking-tight leading-tight uppercase font-serif">
                  {isDiner ? `Welcome back, ${userName || 'Diner'}` : `${niche} Manager Terminal`}
                </h2>
                <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5" style={{ color: primaryColor }}>
                  {isDiner ? 'FEASTING CATALOG PORTAL' : 'ACTIVE PIPELINE CONTROL'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-[10px] bg-white border rounded-xl px-4 py-2 font-black shadow-sm flex items-center gap-2 select-none" style={{ borderColor: `${primaryColor}20`, color: primaryColor }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                {niche.toUpperCase()} CONSOLE ACTIVE
              </div>
            </div>
          </header>

          {/* DYNAMIC TAB RENDERING */}
          {activeTab === 'dashboard' && isDiner && (
            <DashboardDinerOverview
              primaryColor={primaryColor}
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Admin overview tab */}
          {activeTab === 'overview' && !isDiner && (
            <div className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((stat, i) => (
                  <div key={i} className="bg-white border border-stone-200/80 rounded-3xl p-6">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">{stat.title}</span>
                    <h4 className="text-2xl font-black text-slate-800 mt-1.5 font-mono">{stat.value}</h4>
                    <p className="text-[10px] font-extrabold mt-1" style={{ color: primaryColor }}>✓ {stat.desc}</p>
                  </div>
                ))}
              </div>
              <AdminOverviewPanel
                orders={orders}
                products={products}
                couponsList={[]}
                theme={theme}
                setActiveTab={setActiveTab}
                isRestaurant={true}
              />
            </div>
          )}

          {/* Products Panel (Admin) */}
          {activeTab === 'overview' && !isDiner && (
            <div className="pt-6">
              <AdminProductsPanel
                projectId={projectId}
                products={products}
                categoriesList={[]}
                brandsList={[]}
                fetchDbProducts={fetchDbProducts}
                isRestaurant={true}
                shopNiche={shopNiche}
              />
            </div>
          )}

          {/* Bookings/Reservations Tab */}
          {activeTab === 'bookings' && (
            <DashboardBookingsView
              isDiner={isDiner}
              primaryColor={primaryColor}
              reservationLoading={reservationLoading}
              reservations={reservations}
              handleCreateBooking={handleCreateBooking}
              handleUpdateReservationStatus={handleUpdateReservationStatus}
              handleDeleteBooking={handleDeleteBooking}
              resFormDate={resFormDate}
              setResFormDate={setResFormDate}
              resFormTime={resFormTime}
              setResFormTime={setResFormTime}
              resFormGuests={resFormGuests}
              setResFormGuests={setResFormGuests}
              resFormNotes={resFormNotes}
              setResFormNotes={setResFormNotes}
            />
          )}

          {/* Plated Menu Tab (Diner) */}
          {activeTab === 'items' && isDiner && (
            <div className="text-left font-sans animate-fadeIn">
              <DashboardItemsView
                products={products}
                categories={categoriesList}
                primaryColor={primaryColor}
                onAddToCart={addToCart}
              />
            </div>
          )}

          {/* Orders Log (Diner) */}
          {activeTab === 'orders' && isDiner && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left font-sans">
              {/* Cart / Draft Column */}
              <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-3xl p-6 space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <h3 className="text-xs font-bold text-slate-905 uppercase">Active Diner Order Draft</h3>
                  <span className="text-[10px] text-white px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: primaryColor }}>
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
                  </span>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12 space-y-2">
                    <span className="text-3xl block">🛒</span>
                    <p className="text-xs text-slate-550 font-bold">Your order draft is empty</p>
                    <p className="text-[10px] text-slate-400">Browse the Plated Menu tab to add delicious dishes to your draft.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{emoji}</span>
                            <div className="text-left">
                              <h4 className="font-extrabold text-slate-800 text-xs uppercase leading-tight">{item.product.name}</h4>
                              <span className="text-[10px] font-bold text-slate-400 font-mono">₹{item.product.price} each</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-stone-50">
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="px-2.5 py-1 hover:bg-slate-200/50 text-slate-600 font-black cursor-pointer border-none bg-transparent text-xs"
                              >
                                -
                              </button>
                              <span className="px-2.5 text-[10px] font-mono font-black text-slate-800">{item.quantity}</span>
                              <button
                                onClick={() => addToCart(item.product)}
                                className="px-2.5 py-1 hover:bg-slate-200/50 text-slate-600 font-black cursor-pointer border-none bg-transparent text-xs"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs font-black text-slate-900 font-mono min-w-[50px] text-right">
                              ₹{(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-4 space-y-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-mono text-slate-850">₹{subtotal.toFixed(2)}</span>
                      </div>
                      {discountVal > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Discount ({appliedCoupon.code})</span>
                          <span className="font-mono">-₹{discountVal.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>GST Tax ({storeSettings.taxRate}%)</span>
                        <span className="font-mono text-slate-850">₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery & Packaging Fee</span>
                        <span className="font-mono text-slate-850">₹{(storeSettings.shippingFee || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-100 pt-2 text-xs font-black text-slate-900">
                        <span>Total Payable</span>
                        <span className="font-mono" style={{ color: primaryColor }}>
                          ₹{total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Details Form */}
                    <form onSubmit={handleCheckoutSubmit} className="border-t border-slate-100 pt-4 space-y-4 text-left">
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Delivery & Payment details</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[8px] text-slate-400 font-bold uppercase mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={checkoutCity}
                            onChange={(e) => setCheckoutCity(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] text-slate-800 outline-none focus:border-stone-400 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] text-slate-400 font-bold uppercase mb-1">State</label>
                          <input
                            type="text"
                            required
                            value={checkoutState}
                            onChange={(e) => setCheckoutState(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] text-slate-800 outline-none focus:border-stone-400 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] text-slate-400 font-bold uppercase mb-1">Pincode</label>
                          <input
                            type="text"
                            required
                            value={checkoutPincode}
                            onChange={(e) => setCheckoutPincode(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] text-slate-800 outline-none focus:border-stone-400 transition"
                          />
                        </div>
                      </div>

                      {/* ORDER NOTES */}
                      <div>
                        <label className="block text-[8px] text-slate-400 font-bold uppercase mb-1">Special Instructions / Order Notes</label>
                        <textarea
                          placeholder="e.g. Make it extra spicy, no onions, delivery instructions..."
                          value={checkoutNotes}
                          onChange={(e) => setCheckoutNotes(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] text-slate-800 outline-none h-12 resize-none focus:border-stone-400 transition"
                        />
                      </div>

                      {/* COUPONS */}
                      <div className="space-y-1.5 border-t border-slate-100 pt-3">
                        <label className="block text-[8px] text-slate-400 font-bold uppercase mb-1">Coupon Discount Code</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. ROYAL10"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] text-slate-800 outline-none uppercase"
                          />
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer border-none"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && <p className="text-[9px] text-rose-500 font-semibold">{couponError}</p>}
                        {couponSuccess && <p className="text-[9px] text-emerald-600 font-semibold">{couponSuccess}</p>}
                      </div>

                      <div>
                        <label className="block text-[8px] text-slate-400 font-bold uppercase mb-1">Payment Option</label>
                        <select
                          value={checkoutPaymentMethod}
                          onChange={(e) => setCheckoutPaymentMethod(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] text-slate-800 font-bold outline-none focus:border-stone-400 transition cursor-pointer"
                        >
                          <option value="COD">Cash on Delivery (COD)</option>
                          <option value="UPI">UPI Instant Payment</option>
                          <option value="Card">Visa / MasterCard / Rupay</option>
                          <option value="Wallet">ZatBiz Wallet (Balance: ₹{walletBalance.toFixed(2)})</option>
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={clearCart}
                          className="px-4 py-2.5 border border-slate-200 hover:bg-rose-50 text-rose-500 font-bold rounded-xl text-[10px] transition cursor-pointer bg-transparent uppercase tracking-wider"
                        >
                          Clear Draft
                        </button>
                        <button
                          type="submit"
                          disabled={checkoutLoading}
                          className="flex-1 py-2.5 text-slate-850 font-black rounded-xl text-[10px] transition shadow cursor-pointer border-none uppercase tracking-wider disabled:opacity-50"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {checkoutLoading ? 'Processing Order...' : 'Place Diner Order'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Order History Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-stone-200/80 rounded-3xl p-6 text-left font-sans animate-fade-in">
                  <h3 className="text-xs font-bold text-slate-905 uppercase mb-4">Past Order History</h3>
                  <UserOrdersPanel orders={orders} clientEmail={clientEmail} shopNiche={shopNiche} theme={theme} />
                </div>
              </div>
            </div>
          )}

          {/* Admin Diner Orders pipeline view */}
          {activeTab === 'orders' && !isDiner && (
            <AdminOrdersPanel
              orders={orders}
              fetchOrders={fetchOrders}
              primaryColor={primaryColor}
              theme={theme}
              shopNiche={shopNiche}
            />
          )}

          {/* Settings Console (Admin) */}
          {activeTab === 'settings' && !isDiner && (
            <div className="font-sans">
              <AdminSettingsPanel
                projectId={projectId}
                storeSettings={storeSettings}
                setStoreSettings={setStoreSettings}
                setCompanyName={setCompanyName}
              />
            </div>
          )}

          {/* Profile Tab (Diner) */}
          {/* Profile Tab (Diner) */}
          {activeTab === 'profile' && isDiner && (
            <div className="text-left font-sans animate-fadeIn">
              <UserProfilePanel
                userName={userName}
                setUserName={setUserName}
                userPhone={userPhone}
                setUserPhone={setUserPhone}
                userAddressHome={userAddressHome}
                setUserAddressHome={setUserAddressHome}
                clientEmail={clientEmail}
                theme={theme}
                shopNiche={shopNiche}
                handleSaveProfileChanges={handleSaveProfileChanges}
              />
            </div>
          )}

          {/* Special Events Tab (Diner) */}
          {activeTab === 'events' && isDiner && (
            <div className="space-y-6 text-left font-sans animate-fadeIn">
              <div className="bg-white border rounded-3xl p-6" style={{ borderColor: `${primaryColor}20` }}>
                <span className="text-[9px] font-black uppercase tracking-wider block mb-1" style={{ color: primaryColor }}>
                  🌟 Exclusive Dining Galas
                </span>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-wider mb-1">VIP Events Masterlist</h3>
                <p className="text-slate-500 text-xs font-semibold">
                  Reserve entry passes and pairings to our upcoming gourmet events. Paid instantly using your wallet balance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eventsList.filter(item => JSON.parse(item.dataJson).status === 'Published').length === 0 ? (
                  <div className="col-span-2 py-12 bg-white border border-stone-200 rounded-3xl text-center text-slate-500 font-bold uppercase text-xs">
                    No active events listed at this time.
                  </div>
                ) : (
                  eventsList.filter(item => JSON.parse(item.dataJson).status === 'Published').map((item) => {
                    const e = JSON.parse(item.dataJson);
                    const qty = ticketQuantities[item.id] || 1;
                    const eventBookingsForThisEvent = eventBookings.filter(eb => JSON.parse(eb.dataJson).eventName === e.name);
                    const ticketsSold = eventBookingsForThisEvent.reduce((acc, eb) => acc + (JSON.parse(eb.dataJson).tickets || 1), 0);
                    const remainingTickets = Math.max(0, e.capacity - ticketsSold);

                    return (
                      <div key={item.id} className="bg-white border border-stone-200/80 rounded-[32px] overflow-hidden flex flex-col justify-between shadow-sm">
                        <div className="h-48 bg-stone-100 relative">
                          <img
                            src={e.banner || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=80'}
                            alt={e.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 right-3 bg-slate-905/90 px-3 py-1 rounded-full text-xs font-black text-white">
                            ${e.price} / Ticket
                          </span>
                        </div>
                        <div className="p-6 space-y-4 text-left">
                          <div>
                            <span className="text-[9.5px] font-black uppercase tracking-wider" style={{ color: primaryColor }}>
                              📅 {e.date} | ⏰ {e.time}
                            </span>
                            <h4 className="font-serif text-lg font-black text-slate-805 uppercase mt-1">{e.name}</h4>
                            {e.artist && <p className="text-[10px] text-stone-500 font-bold mt-1">Host/Performer: <span className="text-[#c5a880] font-black">{e.artist}</span></p>}
                            <p className="text-slate-500 text-xs mt-2 font-medium leading-relaxed">{e.description || 'Join us for a unique gourmet dining experience.'}</p>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                            <div>
                              <span className="text-[9px] text-slate-400 uppercase font-black block">Available Passes</span>
                              <span className="text-xs font-black text-slate-800">{remainingTickets} Remaining</span>
                            </div>
                            {remainingTickets > 0 ? (
                              <div className="flex items-center gap-2">
                                <label className="text-[9px] text-slate-400 font-bold uppercase">Qty:</label>
                                <input
                                  type="number"
                                  min="1"
                                  max={remainingTickets}
                                  value={qty}
                                  onChange={(evt) => setTicketQuantities({ ...ticketQuantities, [item.id]: parseInt(evt.target.value, 10) })}
                                  className="w-12 text-center bg-stone-50 border rounded p-1 text-xs font-bold outline-none text-slate-800"
                                />
                                <button
                                  onClick={() => handleBookTickets(item)}
                                  className="px-4 py-2 rounded-xl text-slate-850 font-black text-[10px] uppercase border-none cursor-pointer"
                                  style={{ backgroundColor: primaryColor }}
                                >
                                  Book passes
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] px-2.5 py-1 rounded bg-rose-500/10 text-rose-500 border border-rose-500/25 font-black uppercase">Sold Out</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Offers & Coupons Tab (Diner) */}
          {activeTab === 'offers_coupons' && isDiner && (
            <div className="space-y-6 text-left font-sans animate-fadeIn">
              <div className="bg-white border rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ borderColor: `${primaryColor}20` }}>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-wider block mb-1" style={{ color: primaryColor }}>
                    🔥 Active discount codes
                  </span>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-wider mb-1">Diner Offers & Coupons</h3>
                  <p className="text-slate-500 text-xs font-semibold">
                    Copy and apply discount coupons during checkout to save on your orders!
                  </p>
                </div>

                {/* SEARCH BAR */}
                <div className="w-full md:w-72">
                  <input
                    type="text"
                    placeholder="🔍 Search offers, coupons..."
                    value={dealsSearchQuery}
                    onChange={(e) => setDealsSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-stone-400 transition"
                  />
                </div>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* OFFERS LIST */}
                <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-sm space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#c5a880] border-b pb-2 flex items-center gap-1.5">
                    🔥 Promo & Happy Hour Offers
                  </h4>
                  <div className="space-y-4 divide-y divide-slate-100">
                    {offersList.filter(item => {
                      const o = JSON.parse(item.dataJson);
                      return o.title.toLowerCase().includes(dealsSearchQuery.toLowerCase()) || 
                             o.details.toLowerCase().includes(dealsSearchQuery.toLowerCase());
                    }).length === 0 ? (
                      <p className="text-xs text-slate-400 py-6 font-bold text-center">No matching offers found.</p>
                    ) : (
                      offersList.filter(item => {
                        const o = JSON.parse(item.dataJson);
                        return o.title.toLowerCase().includes(dealsSearchQuery.toLowerCase()) || 
                               o.details.toLowerCase().includes(dealsSearchQuery.toLowerCase());
                      }).map((item) => {
                        const o = JSON.parse(item.dataJson);
                        return (
                          <div key={item.id} className="pt-4 first:pt-0 space-y-2 relative">
                            <h5 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">{o.title}</h5>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{o.details}</p>
                            <span className="text-[10px] text-amber-500 font-extrabold block">📅 {o.schedule}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* COUPONS LIST */}
                <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-sm space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 border-b pb-2 flex items-center gap-1.5">
                    🎟️ Available Discount Coupons
                  </h4>
                  <div className="space-y-4">
                    {couponsList.filter(c => {
                      return c.code.toLowerCase().includes(dealsSearchQuery.toLowerCase());
                    }).length === 0 ? (
                      <p className="text-xs text-slate-400 py-6 font-bold text-center">No matching coupons found.</p>
                    ) : (
                      couponsList.filter(c => {
                        return c.code.toLowerCase().includes(dealsSearchQuery.toLowerCase());
                      }).map((c) => (
                        <div key={c.id} className="p-4 border border-dashed border-emerald-500/20 rounded-2xl flex justify-between items-center bg-emerald-50/5">
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">
                              {c.code}
                            </span>
                            <p className="text-[11px] text-slate-805 font-extrabold pt-1">
                              {c.discountType === 'Percentage' ? `${c.discountValue}% Off` : `$${c.discountValue} Flat Off`}
                            </p>
                            <p className="text-[9px] text-slate-450 font-bold">
                              Valid on orders above ${c.minOrderAmount}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(c.code);
                              alert(`Coupon code "${c.code}" copied to clipboard!`);
                              setCouponCode(c.code);
                            }}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-slate-850 font-black text-[9px] uppercase tracking-wider rounded-xl cursor-pointer border-none shadow-sm transition"
                          >
                            Copy & Use
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
