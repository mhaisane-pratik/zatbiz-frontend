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
    userAddressHome, setUserAddressHome
  } = useCategoryDashboardState(projectId, clientEmail, companyName, logoUrl);

  const [checkoutCity, setCheckoutCity] = useState('Local City');
  const [checkoutState, setCheckoutState] = useState('Local State');
  const [checkoutPincode, setCheckoutPincode] = useState('110001');
  const [checkoutPaymentMethod, setCheckoutPaymentMethod] = useState('COD');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutLoading(true);
    try {
      await placeDinerOrder(checkoutPaymentMethod, checkoutCity, checkoutState, checkoutPincode);
      alert('Order placed successfully!');
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
            <DashboardItemsView
              products={products}
              primaryColor={primaryColor}
              onAddToCart={addToCart}
            />
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
                        <span className="font-mono text-slate-850">₹{cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST Tax ({storeSettings.taxRate}%)</span>
                        <span className="font-mono text-slate-850">₹{(cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) * (storeSettings.taxRate / 100)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery & Packaging Fee</span>
                        <span className="font-mono text-slate-850">₹{(storeSettings.shippingFee || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-100 pt-2 text-xs font-black text-slate-900">
                        <span>Total Payable</span>
                        <span className="font-mono" style={{ color: primaryColor }}>
                          ₹{(
                            cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) * (1 + storeSettings.taxRate / 100) +
                            (storeSettings.shippingFee || 0)
                          ).toFixed(2)}
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
        </div>
      </main>
    </div>
  );
}
