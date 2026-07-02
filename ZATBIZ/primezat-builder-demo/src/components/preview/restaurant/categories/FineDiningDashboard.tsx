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
    storeSettings, setStoreSettings,
    userName, setUserName,
    userPhone, setUserPhone,
    userAddressHome, setUserAddressHome
  } = useCategoryDashboardState(projectId, clientEmail, companyName, logoUrl);

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
      status: 'Pending'
    };

    try {
      await api.reservations.create(payload);
      alert('Bespoke Table Reservation Requested! Check reservation log below.');
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
    <div className="flex flex-1 min-h-screen bg-[#0a0a0c] text-[#e2e8f0] font-sans">
      {/* Luxury Dark Sidebar */}
      <aside className="w-64 bg-[#0d0e12] border-r border-[#2a2c35]/35 p-6 flex flex-col justify-between flex-shrink-0">
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
                  { id: 'orders', label: 'Order History', icon: '📜' },
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
                      ? `bg-[#c5a880]/15 ${colors.textAccent} border border-[#c5a880]/20` 
                      : 'text-stone-404 hover:text-white hover:bg-stone-900/40'
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
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-stone-404 hover:text-white hover:bg-stone-900/40 rounded-xl transition text-left cursor-pointer border-none bg-transparent uppercase tracking-wider"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-455 hover:text-rose-300 hover:bg-rose-955/10 rounded-xl transition text-left cursor-pointer border-none bg-transparent uppercase tracking-wider"
          >
            🚪 Exit Console
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#0a0a0c] p-8 overflow-y-auto font-serif">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <header className="flex justify-between items-center pb-6 border-b border-stone-850">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#c5a880]/30 bg-[#0d0e12] flex items-center justify-center text-xl">
                ⚜️
              </div>
              <div className="text-left font-sans">
                <h2 className="text-lg font-black text-white tracking-tight leading-tight uppercase font-serif">
                  {isDiner ? `Honored Guest: ${userName || 'VIP Diner'}` : 'Grand Administrator'}
                </h2>
                <p className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest mt-0.5`}>
                  {isDiner ? 'YOUR BESPOKE PLACEMENT AWAITS' : 'RESERVE STATUS & PERFORMANCE PANEL'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 font-sans">
              <div className={`text-[10px] bg-[#0d0e12] border border-[#c5a880]/20 rounded-xl px-4 py-2 font-black ${colors.textAccent} shadow-sm flex items-center gap-2 select-none`}>
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
                  <div key={i} className="bg-[#111217] border border-[#2a2c35]/30 rounded-3xl p-6">
                    <span className="text-[10px] text-stone-500 font-black uppercase tracking-widest block">{stat.title}</span>
                    <h4 className="text-2xl font-black text-white mt-1.5">{stat.value}</h4>
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
            />
          )}

          {/* Orders Log (Diner) */}
          {activeTab === 'orders' && isDiner && (
            <div className="bg-[#111217] border border-[#2a2c35]/35 rounded-3xl p-6 text-left">
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 font-serif">Diner Order History</h3>
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
