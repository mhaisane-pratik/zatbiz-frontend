'use client';

import React, { useState, useEffect } from 'react';
import { RestaurantDashboardProps, getThemeColors } from './types';
import { useCategoryDashboardState } from './useCategoryDashboardState';
import { FineDiningDinerOverview } from './FineDiningDinerOverview';
import { FineDiningBookingsView } from './FineDiningBookingsView';
import { FineDiningItemsView } from './FineDiningItemsView';
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

export function FineDiningDashboard({
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
}: RestaurantDashboardProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<string>('overview');

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
  const [resFormTime, setResFormTime] = useState('20:00');
  const [resFormGuests, setResFormGuests] = useState(2);
  const [resFormNotes, setResFormNotes] = useState('');

  const defaultTheme = {
    bgAccent: 'bg-[#c5a880]',
    textAccent: 'text-[#c5a880]',
    hoverBgAccent: 'hover:bg-[#d8c2a3]',
    borderAccent: 'border-stone-850',
    hoverBorderAccent: 'hover:border-[#c5a880]/30',
    selectionBg: 'selection:bg-[#c5a880]',
    btnBorderAccent: 'border-[#c5a880]',
    btnTextAccent: 'text-[#c5a880]',
    btnHoverBgAccent: 'hover:bg-[#c5a880]'
  };
  // Retrieve theme preset colors
  const themePreset = project.blocksJson ? JSON.parse(project.blocksJson).businessConfig?.themePreset : undefined;
  const colors = getThemeColors(themePreset, defaultTheme);

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
      alert('VIP Guest Profile updated successfully!');
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
      customerName: userName || 'VIP Guest',
      customerEmail: clientEmail,
      customerPhone: userPhone,
      bookingDate: resFormDate,
      bookingTime: resFormTime,
      numberOfGuests: resFormGuests,
      tableNumber: 'Auto-Allocated Private Room',
      notes: resFormNotes,
      preOrderItems: preOrderSummary,
      status: 'Pending'
    };

    try {
      await api.reservations.create(payload);
      if (preOrderSummary) {
        alert(`Bespoke Reservation and Fine Dining Pre-Order ("${preOrderSummary}") requested successfully!`);
        clearCart();
      } else {
        alert('Bespoke Table Reservation Requested! Check reservation log below.');
      }
      setResFormNotes('');
      fetchReservationsList();
    } catch (err) {
      console.error(err);
      alert('Failed to submit reservation.');
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
    if (!confirm('Cancel this elite booking request?')) return;
    try {
      await api.reservations.delete(id);
      fetchReservationsList();
    } catch (err) {
      console.error(err);
    }
  };

  const isDiner = clientEmail !== 'admin@gmail.com';

  useEffect(() => {
    if (clientEmail === 'admin@gmail.com') {
      setActiveTab('overview');
    } else {
      setActiveTab('dashboard');
    }
  }, [clientEmail]);

  return (
    <div className={`flex flex-1 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0c] text-[#e2e8f0]' : 'bg-[#faf8f5] text-stone-800'} font-sans`}>
      {/* Luxury Sidebar */}
      <aside className={`w-64 border-r p-6 flex flex-col justify-between flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'bg-[#0d0e12] border-[#2a2c35]/35' : 'bg-white border-stone-200/80'}`}>
        <div className="space-y-8 text-left">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className={`text-2xl ${colors.textAccent} select-none`}>⚜️</span>
            <div>
              <h3 className="font-extrabold text-white text-xs tracking-widest uppercase leading-none font-serif">
                {companyName.replace(" Site", "")}
              </h3>
              <p className={`text-[7px] ${colors.textAccent} font-extrabold uppercase tracking-widest mt-1 font-sans`}>HAUTE CUISINE PORTAL</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {(isDiner
              ? [
                  { id: 'dashboard', label: 'VIP Concierge', icon: '🍷' },
                  { id: 'items', label: 'Reserve Tasting', icon: '🍽️' },
                  { id: 'bookings', label: 'My Bookings', icon: '📅' },
                  { id: 'orders', label: 'Cart & Orders', icon: '🛒' },
                  { id: 'profile', label: 'Guest Profile', icon: '👤' }
                ]
              : [
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'bookings', label: 'Reservations', icon: '📅' },
                  { id: 'orders', label: 'Diner Orders', icon: '🍽️' },
                  { id: 'settings', label: 'Concierge Settings', icon: '⚙️' }
                ]
            ).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                    isActive 
                      ? (isDarkMode ? `bg-[#c5a880]/15 ${colors.textAccent} border border-[#c5a880]/20` : `bg-[#c5a880]/10 ${colors.textAccent} border border-[#c5a880]/20`)
                      : (isDarkMode ? 'text-stone-400 hover:text-white hover:bg-stone-900/40' : 'text-stone-500 hover:text-stone-800 hover:bg-[#c5a880]/10')
                  }`}
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
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent uppercase tracking-wider ${
              isDarkMode ? 'text-stone-400 hover:text-white hover:bg-stone-900/40' : 'text-stone-500 hover:text-stone-850 hover:bg-stone-100'
            }`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent uppercase tracking-wider ${
              isDarkMode ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-955/10' : 'text-rose-600 hover:text-rose-800 hover:bg-rose-50'
            }`}
          >
            🚪 Exit Console
          </button>
        </div>
      </aside>

      <main className={`flex-1 p-8 overflow-y-auto font-serif transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0c]' : 'bg-[#faf8f5]'}`}>
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <header className={`flex justify-between items-center pb-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-stone-850' : 'border-stone-200'}`}>
            <div className="flex items-center gap-3 text-left">
              <div className={`w-12 h-12 rounded-full overflow-hidden border flex items-center justify-center text-xl ${
                isDarkMode ? 'border-[#c5a880]/30 bg-[#0d0e12]' : 'border-[#c5a880]/40 bg-white'
              }`}>
                ⚜️
              </div>
              <div className="text-left font-sans">
                <h2 className={`text-lg font-black tracking-tight leading-tight uppercase font-serif ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
                  {isDiner ? `Honored Guest: ${userName || 'VIP Diner'}` : 'Grand Administrator'}
                </h2>
                <p className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest mt-0.5`}>
                  {isDiner ? 'YOUR BESPOKE PLACEMENT AWAITS' : 'RESERVE STATUS & PERFORMANCE PANEL'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 font-sans">
              {isDiner && (
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`relative text-[10px] border rounded-xl px-4 py-2 font-black shadow-sm flex items-center gap-2 transition cursor-pointer ${
                    isDarkMode
                      ? 'bg-[#0d0e12] border-[#c5a880]/20 text-[#c5a880] hover:bg-[#c5a880]/10'
                      : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <span>🛒</span>
                  <span>ACTIVE DRAFT</span>
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
                    <span className="bg-[#c5a880] text-black px-1.5 py-0.5 rounded-full font-black text-[9px]">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
              )}
              <div className={`text-[10px] rounded-xl px-4 py-2 font-black shadow-sm flex items-center gap-2 select-none border ${
                isDarkMode ? 'bg-[#0d0e12] border-[#c5a880]/20 text-[#c5a880]' : 'bg-white border-stone-200 text-stone-800'
              }`}>
                <span className="w-2 h-2 bg-[#c5a880] rounded-full animate-pulse" />
                ROYAL PLATINUM CLUB ACTIVE
              </div>
            </div>
          </header>

          {/* DYNAMIC TAB RENDERING */}
          {activeTab === 'dashboard' && isDiner && (
            <FineDiningDinerOverview
              colors={colors}
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Admin Overview Panel */}
          {activeTab === 'overview' && !isDiner && (
            <div className="space-y-6 text-left font-sans">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Fine Dining Rooms tonight', value: `${reservations.length} private suites`, desc: 'Michelin star placements requested' },
                  { title: 'Cellar Sommelier Revenue', value: '₹1,48,900', desc: 'Peak vintage wine bottles opened' },
                  { title: 'Chef Sourcing Surcharge', value: '0 items low', desc: 'Fresh caviar, black truffles, wagyu stocked' }
                ].map((stat, i) => (
                  <div key={i} className={`border rounded-3xl p-6 transition-colors duration-300 ${
                    isDarkMode ? 'bg-[#111217] border-[#2a2c35]/30' : 'bg-white border-stone-200 shadow-sm'
                  }`}>
                    <span className="text-[10px] text-stone-500 font-black uppercase tracking-widest block">{stat.title}</span>
                    <h4 className={`text-2xl font-black mt-1.5 ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{stat.value}</h4>
                    <p className={`text-[10px] ${colors.textAccent} font-semibold mt-1`}>✓ {stat.desc}</p>
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
            <div className="pt-6 font-sans">
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

          {/* Reservations Tab */}
          {activeTab === 'bookings' && (
            <FineDiningBookingsView
              isDiner={isDiner}
              colors={colors}
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

          {/* Menus / Items Tab */}
          {activeTab === 'items' && isDiner && (
            <FineDiningItemsView
              products={products}
              colors={colors}
              onAddToCart={addToCart}
            />
          )}

          {/* Orders Log (Diner) */}
          {activeTab === 'orders' && isDiner && (
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left font-sans animate-fade-in ${
              isDarkMode ? 'text-white' : 'text-stone-800'
            }`}>
              {/* Cart / Draft Column */}
              <div className={`lg:col-span-7 border p-6 space-y-6 ${
                isDarkMode ? 'bg-[#111217] border-[#2a2c35]/35 rounded-none' : 'bg-white border-stone-200 shadow-sm rounded-2xl'
              }`}>
                <div className={`flex justify-between items-center pb-3 border-b ${
                  isDarkMode ? 'border-[#2a2c35]/20' : 'border-stone-100'
                }`}>
                  <h3 className={`text-xs font-bold uppercase tracking-widest font-serif ${isDarkMode ? 'text-white' : 'text-stone-905'}`}>Bespoke Table Order Draft</h3>
                  <span className="text-[10px] bg-[#c5a880] text-black px-3 py-1 font-black uppercase tracking-wider">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Courses
                  </span>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12 space-y-2">
                    <span className="text-3xl block">🍷</span>
                    <p className="text-xs text-stone-400 font-bold">Your private menu selection is empty</p>
                    <p className="text-[10px] text-stone-505 font-medium">Select fine dining courses from the Tasting Menu to prepare your plate.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className={`divide-y max-h-80 overflow-y-auto pr-1 ${
                      isDarkMode ? 'divide-[#2a2c35]/20' : 'divide-stone-100'
                    }`}>
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">🍷</span>
                            <div className="text-left">
                              <h4 className={`font-extrabold text-xs uppercase leading-tight font-serif ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{item.product.name}</h4>
                              <span className="text-[10px] font-bold text-stone-500 font-mono">₹{item.product.price} each</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className={`flex items-center border rounded-none overflow-hidden ${
                              isDarkMode ? 'border-[#2a2c35]/30 bg-[#0f0f12]' : 'border-stone-200 bg-stone-50'
                            }`}>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className={`px-2.5 py-1 hover:bg-[#c5a880] hover:text-black font-black cursor-pointer border-none bg-transparent text-xs ${
                                  isDarkMode ? 'text-stone-300' : 'text-stone-605'
                                }`}
                              >
                                -
                              </button>
                              <span className={`px-2.5 text-[10px] font-mono font-black ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{item.quantity}</span>
                              <button
                                onClick={() => addToCart(item.product)}
                                className={`px-2.5 py-1 hover:bg-[#c5a880] hover:text-black font-black cursor-pointer border-none bg-transparent text-xs ${
                                  isDarkMode ? 'text-stone-300' : 'text-stone-605'
                                }`}
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs font-black text-[#c5a880] font-mono min-w-[50px] text-right">
                              ₹{(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`border-t pt-4 space-y-2 text-[10px] text-stone-400 font-bold uppercase tracking-wider ${
                      isDarkMode ? 'border-[#2a2c35]/20' : 'border-stone-100'
                    }`}>
                      <div className="flex justify-between">
                        <span>Tasting Subtotal</span>
                        <span className={`font-mono ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>₹{cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Luxe Service Tax ({storeSettings.taxRate}%)</span>
                        <span className={`font-mono ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>₹{(cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) * (storeSettings.taxRate / 100)).toFixed(2)}</span>
                      </div>
                      <div className={`flex justify-between border-t pt-2 text-xs font-black text-[#c5a880] ${
                        isDarkMode ? 'border-[#2a2c35]/20' : 'border-stone-100'
                      }`}>
                        <span>Bespoke Total Payable</span>
                        <span className="font-mono">
                          ₹{(
                            cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) * (1 + storeSettings.taxRate / 100)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Details Form */}
                    <form onSubmit={handleCheckoutSubmit} className={`border-t pt-4 space-y-4 text-left ${
                      isDarkMode ? 'border-[#2a2c35]/20' : 'border-stone-100'
                    }`}>
                      <h4 className={`text-[10px] font-black uppercase tracking-widest font-serif ${
                        isDarkMode ? 'text-stone-200' : 'text-stone-850'
                      }`}>Consummation & Billing coordinates</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[8px] text-stone-500 font-bold uppercase mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={checkoutCity}
                            onChange={(e) => setCheckoutCity(e.target.value)}
                            className={`w-full border rounded-none px-2 py-1.5 text-[10px] outline-none focus:border-[#c5a880] transition ${
                              isDarkMode ? 'bg-neutral-900 border-[#2a2c35]/35 text-white' : 'bg-stone-50 border-stone-200 text-stone-800'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] text-stone-500 font-bold uppercase mb-1">State</label>
                          <input
                            type="text"
                            required
                            value={checkoutState}
                            onChange={(e) => setCheckoutState(e.target.value)}
                            className={`w-full border rounded-none px-2 py-1.5 text-[10px] outline-none focus:border-[#c5a880] transition ${
                              isDarkMode ? 'bg-neutral-900 border-[#2a2c35]/35 text-white' : 'bg-stone-50 border-stone-200 text-stone-800'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] text-stone-500 font-bold uppercase mb-1">Pincode</label>
                          <input
                            type="text"
                            required
                            value={checkoutPincode}
                            onChange={(e) => setCheckoutPincode(e.target.value)}
                            className={`w-full border rounded-none px-2 py-1.5 text-[10px] outline-none focus:border-[#c5a880] transition ${
                              isDarkMode ? 'bg-neutral-900 border-[#2a2c35]/35 text-white' : 'bg-stone-50 border-stone-200 text-stone-800'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] text-stone-500 font-bold uppercase mb-1">Settlement Method</label>
                        <select
                          value={checkoutPaymentMethod}
                          onChange={(e) => setCheckoutPaymentMethod(e.target.value)}
                          className={`w-full border rounded-none px-2 py-1.5 text-[10px] font-bold outline-none focus:border-[#c5a880] transition cursor-pointer ${
                            isDarkMode ? 'bg-neutral-900 border-[#2a2c35]/35 text-white' : 'bg-stone-50 border-stone-200 text-stone-850'
                          }`}
                        >
                          <option value="COD">Table Charge (COD)</option>
                          <option value="UPI">UPI Elite Settlement</option>
                          <option value="Card">Pre-Auth Platinum Card</option>
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={clearCart}
                          className={`px-4 py-2.5 border font-bold rounded-none text-[10px] transition cursor-pointer bg-transparent uppercase tracking-wider ${
                            isDarkMode ? 'border-[#2a2c35]/40 hover:bg-stone-900 text-stone-400' : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                          }`}
                        >
                          Reset Course
                        </button>
                        <button
                          type="submit"
                          disabled={checkoutLoading}
                          className="flex-1 py-2.5 bg-[#c5a880] hover:bg-[#d8c2a3] text-black font-black rounded-none text-[10px] transition shadow cursor-pointer border-none uppercase tracking-wider disabled:opacity-50"
                        >
                          {checkoutLoading ? 'Preparing Chef Plates...' : 'Order to Table'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Order History Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className={`border p-6 text-left font-sans ${
                  isDarkMode ? 'bg-[#111217] border-[#2a2c35]/35 rounded-none text-white' : 'bg-white border-stone-200 shadow-sm rounded-2xl text-stone-800'
                }`}>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 font-serif ${isDarkMode ? 'text-white' : 'text-stone-905'}`}>Past Order History</h3>
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
              primaryColor="#c5a880"
              theme={theme}
              shopNiche={shopNiche}
            />
          )}

          {/* Settings Console (Admin) */}
          {activeTab === 'settings' && !isDiner && (
            <div>
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
            <div className="text-left font-sans">
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
