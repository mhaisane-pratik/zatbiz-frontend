'use client';

import React, { useState, useEffect } from 'react';
import { RestaurantDashboardProps, getThemeColors } from './types';
import { useCategoryDashboardState } from './useCategoryDashboardState';
import { FastFoodDinerOverview } from './FastFoodDinerOverview';
import { FastFoodBookingsView } from './FastFoodBookingsView';
import { FastFoodItemsView } from './FastFoodItemsView';
import { api } from '@/services/api';
import {
  UserProfilePanel,
  UserOrdersPanel,
} from '../../dashboard/UserPanels';
import {
  AdminOverviewPanel,
  AdminProductsPanel,
  AdminSettingsPanel,
} from '../../dashboard/AdminPanels';

export function FastFoodDashboard({
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
  const [activeTab, setActiveTab] = useState<string>('overview');

  const {
    products, fetchDbProducts,
    orders, fetchOrders,
    reservations, fetchReservationsList, reservationLoading,
    walletBalance, setWalletBalance,
    storeSettings, setStoreSettings,
    userName, setUserName,
    userPhone, setUserPhone,
    userAddressHome, setUserAddressHome
  } = useCategoryDashboardState(projectId, clientEmail, companyName, logoUrl);

  const [resFormDate, setResFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [resFormTime, setResFormTime] = useState('18:00');
  const [resFormGuests, setResFormGuests] = useState(2);
  const [resFormNotes, setResFormNotes] = useState('');

  const defaultTheme = {
    bgAccent: 'bg-[#f97316]',
    textAccent: 'text-[#f97316]',
    hoverBgAccent: 'hover:bg-orange-700',
    borderAccent: 'border-orange-955',
    hoverBorderAccent: 'hover:border-orange-500',
    selectionBg: 'selection:bg-[#f97316]',
    btnBorderAccent: 'border-[#f97316]',
    btnTextAccent: 'text-[#f97316]',
    btnHoverBgAccent: 'hover:bg-[#f97316]'
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
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      customerName: userName || 'Customer',
      customerEmail: clientEmail,
      customerPhone: userPhone,
      bookingDate: resFormDate,
      bookingTime: resFormTime,
      numberOfGuests: resFormGuests,
      tableNumber: 'Auto-Allocated Booth',
      notes: resFormNotes,
      status: 'Pending'
    };

    try {
      await api.reservations.create(payload);
      alert('Table reservation requested successfully!');
      setResFormNotes('');
      fetchReservationsList();
    } catch (err) {
      console.error(err);
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
    if (clientEmail === 'admin@gmail.com') {
      setActiveTab('overview');
    } else {
      setActiveTab('dashboard');
    }
  }, [clientEmail]);

  return (
    <div className="flex flex-1 min-h-screen bg-[#0f0f12] text-slate-100 font-sans">
      {/* Orange/Red Fast Food Sidebar */}
      <aside className="w-64 bg-[#14151b] border-r border-orange-500/10 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8 text-left">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl select-none">🍔</span>
            <div>
              <h3 className="font-black text-white text-sm uppercase tracking-tight leading-none">
                {companyName.replace(" Site", "")}
              </h3>
              <p className={`text-[8px] ${colors.textAccent} font-black uppercase tracking-widest mt-1`}>FAST EXPRESS PORTAL</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {(isDiner
              ? [
                  { id: 'dashboard', label: 'Order Dashboard', icon: '📊' },
                  { id: 'items', label: 'Fast Menu', icon: '🍔' },
                  { id: 'bookings', label: 'Table Booking', icon: '📅' },
                  { id: 'orders', label: 'My Orders', icon: '🛵' },
                  { id: 'profile', label: 'My Profile', icon: '👤' }
                ]
              : [
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'bookings', label: 'Table Bookings', icon: '📅' },
                  { id: 'orders', label: 'Online Orders', icon: '🛵' },
                  { id: 'settings', label: 'Shop Settings', icon: '⚙️' }
                ]
            ).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                    isActive 
                      ? `${colors.bgAccent} text-white shadow-lg shadow-orange-500/20` 
                      : 'text-slate-404 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span className="text-sm select-none">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-500 hover:text-rose-450 hover:bg-rose-950/10 rounded-xl transition text-left cursor-pointer border-none bg-transparent uppercase tracking-wider"
        >
          🚪 Exit Console
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#09090b] p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <header className="flex justify-between items-center pb-6 border-b border-slate-900">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-orange-500/20 bg-slate-900 flex items-center justify-center text-xl">
                🍔
              </div>
              <div className="text-left font-sans">
                <h2 className="text-lg font-black text-white tracking-tight leading-tight uppercase">
                  {isDiner ? `Welcome back, ${userName || 'Foodie'}` : 'Burger Admin Terminal'}
                </h2>
                <p className={`text-[9px] ${colors.textAccent} font-bold uppercase tracking-widest mt-0.5`}>
                  {isDiner ? 'GET YOUR GRUB IN MINUTES' : 'ACTIVE PIPELINE MANAGEMENT'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`text-[10px] bg-[#14151b] border border-orange-500/10 rounded-xl px-4 py-2 font-black ${colors.textAccent} shadow-sm flex items-center gap-2 select-none`}>
                <span className={`w-2 h-2 ${colors.bgAccent} rounded-full animate-pulse`} />
                EXPRESS DISPATCH ACTIVE
              </div>
            </div>
          </header>

          {/* DYNAMIC TAB RENDERING */}
          {activeTab === 'dashboard' && isDiner && (
            <FastFoodDinerOverview
              colors={colors}
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Admin overview tab */}
          {activeTab === 'overview' && !isDiner && (
            <div className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Active Delivery Orders', value: `${orders.length} in queue`, desc: '3 riders dispatched' },
                  { title: 'Daily Kitchen Revenue', value: '₹14,200', desc: 'Peak hours active' },
                  { title: 'Kitchen stock status', value: '2 items low', desc: 'Restock bacon and buns' }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#14151b] border border-slate-800 rounded-3xl p-6">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">{stat.title}</span>
                    <h4 className="text-2xl font-black text-white mt-1.5 font-mono">{stat.value}</h4>
                    <p className={`text-[10px] ${colors.textAccent} font-extrabold mt-1`}>✓ {stat.desc}</p>
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
            <FastFoodBookingsView
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

          {/* Online Ordering Menu (Diner) */}
          {activeTab === 'items' && isDiner && (
            <FastFoodItemsView
              products={products}
              colors={colors}
            />
          )}

          {/* Orders Log (Diner) */}
          {activeTab === 'orders' && isDiner && (
            <div className="bg-[#14151b] border border-orange-500/10 rounded-3xl p-6 text-left">
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Delivery Rider Track Logs</h3>
              <UserOrdersPanel orders={orders} clientEmail={clientEmail} shopNiche={shopNiche} theme={theme} />
            </div>
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
            <div className="text-left">
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
