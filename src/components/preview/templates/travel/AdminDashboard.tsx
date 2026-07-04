'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface AdminDashboardProps {
  projectId: number;
  project: any;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  logoIcon: string;
  logoUrl: string;
  shopNiche: string | null;
}

export default function TravelAdminDashboard({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  setCompanyName,
  logoIcon,
  logoUrl,
  shopNiche
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [travelConfig, setTravelConfig] = useState<any>(null);

  // 1. Dashboard Metrics States
  const [revenue, setRevenue] = useState(245000);
  const [visitors, setVisitors] = useState(4820);
  const [bookingsCount, setBookingsCount] = useState(38);
  const [pendingPayments, setPendingPayments] = useState(5);

  // 2. Website Drag & Drop Sections Layout States
  const [homepageSections, setHomepageSections] = useState<string[]>([
    'Hero Banner',
    'Search Bar',
    'Popular Destinations',
    'Packages',
    'Testimonials',
    'Gallery',
    'Blogs',
    'FAQ',
    'Contact',
    'Footer'
  ]);
  const [hiddenSections, setHiddenSections] = useState<string[]>([]);
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#06b6d4');

  // 3. Packages Management States
  const [packages, setPackages] = useState<any[]>([
    { id: 1, name: 'Ultimate Bali Tropical Paradise', destination: 'Bali / Ubud', price: 42000, duration: '5 Days', status: 'Published' },
    { id: 2, name: 'Grand European Tour Explorer', destination: 'Paris / Rome', price: 85000, duration: '7 Days', status: 'Published' },
    { id: 3, name: 'Swiss Alps Mountaineer Expedition', destination: 'Zermatt / Interlaken', price: 110000, duration: '6 Days', status: 'Draft' }
  ]);
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgDest, setNewPkgDest] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState('');
  const [newPkgDuration, setNewPkgDuration] = useState('5 Days');
  const [newPkgStatus, setNewPkgStatus] = useState('Published');

  // 4. Destinations Database States
  const [destinations, setDestinations] = useState<any[]>([
    { id: 1, country: 'France', city: 'Paris', state: 'Ile-de-France', places: 'Louvre Museum, Eiffel Tower' },
    { id: 2, country: 'Indonesia', city: 'Bali', state: 'Badung', places: 'Ubud Monkey Forest, Uluwatu Temple' },
    { id: 3, country: 'Switzerland', city: 'Zermatt', state: 'Valais', places: 'Matterhorn Peak, Gornergrat railway' }
  ]);
  const [newDestCountry, setNewDestCountry] = useState('');
  const [newDestCity, setNewDestCity] = useState('');
  const [newDestPlaces, setNewDestPlaces] = useState('');

  // 5. Bookings List States
  const [bookings, setBookings] = useState<any[]>([
    { id: 'ZB-TRAV-923847', customer: 'Aman Verma', email: 'aman@gmail.com', pkg: 'Ultimate Bali Tropical Paradise', date: '2026-08-12', guests: 2, total: 84000, status: 'Confirmed' },
    { id: 'ZB-TRAV-482019', customer: 'Riya Sen', email: 'riya@gmail.com', pkg: 'Grand European Tour Explorer', date: '2026-09-05', guests: 1, total: 85000, status: 'Pending Approval' },
    { id: 'ZB-TRAV-293847', customer: 'David Miller', email: 'david@outlook.com', pkg: 'Swiss Alps Expedition', date: '2026-07-22', guests: 4, total: 440000, status: 'Cancelled' }
  ]);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<any>(null);

  // 6. Customers list
  const [customers, setCustomers] = useState<any[]>([
    { id: 1, name: 'Aman Verma', email: 'aman@gmail.com', bookings: 2, loyaltyPoints: 400 },
    { id: 2, name: 'Riya Sen', email: 'riya@gmail.com', bookings: 1, loyaltyPoints: 100 },
    { id: 3, name: 'David Miller', email: 'david@outlook.com', bookings: 1, loyaltyPoints: 0 }
  ]);

  // 7. Hotels database
  const [hotels, setHotels] = useState<any[]>([
    { id: 1, name: 'Grand Hyatt Seminyak', city: 'Bali', rooms: 'Deluxe Suite, Pool Villa', pricing: '₹9,500/night' },
    { id: 2, name: 'Swiss Chalet Interlaken', city: 'Interlaken', rooms: 'Alpine Quad, Standard Lodge', pricing: '₹14,500/night' }
  ]);
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelCity, setNewHotelCity] = useState('');
  const [newHotelPrice, setNewHotelPrice] = useState('₹8,000/night');

  // 8. Flights schedules
  const [flights, setFlights] = useState<any[]>([
    { id: 1, airline: 'Singapore Airlines', schedule: 'Delhi to Bali, 08:45 AM Daily', availability: 45, pricing: 34500 },
    { id: 2, airline: 'Air France', schedule: 'Mumbai to Paris, 11:15 PM Mon/Wed/Fri', availability: 28, pricing: 58000 }
  ]);

  // 9. Visas application list
  const [visas, setVisas] = useState<any[]>([
    { id: 1, country: 'United States', customer: 'Aman Verma', visaType: 'Tourist B1/B2', fees: 15500, status: 'Pending Review' },
    { id: 2, country: 'France (Schengen)', customer: 'Sneha Patil', visaType: 'Tourist short-stay', fees: 8500, status: 'Approved' }
  ]);

  // 10. Payments payouts ledger
  const [payments, setPayments] = useState<any[]>([
    { id: 'PAY-892', date: '2026-07-01', amount: 84000, channel: 'Stripe Card', payoutStatus: 'Cleared' },
    { id: 'PAY-431', date: '2026-07-02', amount: 85000, channel: 'UPI Razorpay', payoutStatus: 'Pending Settlement' }
  ]);

  // 11. Marketing coupon list
  const [coupons, setCoupons] = useState<any[]>([
    { code: 'WANDERLUST15', discount: '15% Off', status: 'Active' },
    { code: 'BALIDEAL', discount: '₹5,000 Off', status: 'Active' }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('10%');

  useEffect(() => {
    api.travel.get(projectId)
      .then(data => {
        if (data && data.projectId) {
          setTravelConfig(data);
        }
      })
      .catch(e => console.log('Offline or no travel config:', e));

    api.travel.themeSettings.get(projectId)
      .then(data => {
        if (data && data.projectId) {
          if (data.customColorHex) setCustomPrimaryColor(data.customColorHex);
        }
      })
      .catch(e => console.log('No theme settings:', e));

    api.travel.packages.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((p: any) => ({
            id: p.id,
            name: p.name || '',
            destination: p.destination || '',
            price: typeof p.price === 'number' ? p.price : 0,
            duration: p.duration || '5 Days',
            status: p.status || 'Published'
          }));
          setPackages(normalized);
        }
      })
      .catch(e => console.log('Error loading packages:', e));

    api.travel.bookings.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((b: any) => ({
            id: b.id ? `ZB-TRAV-${b.id}` : (b.invoiceId || ''),
            dbId: b.id,
            customer: b.customer || b.customerName || '',
            email: b.email || b.customerEmail || '',
            pkg: b.pkg || b.packageName || '',
            date: b.date || b.travelDate || '',
            total: typeof b.total === 'number' ? b.total : (b.totalPrice || 0),
            status: b.status || b.bookingStatus || 'Pending'
          }));
          setBookings(normalized);
        }
      })
      .catch(e => console.log('Error loading bookings:', e));

    api.travel.destinations.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((d: any) => ({
            id: d.id,
            country: d.country || '',
            city: d.city || '',
            state: d.state || '',
            tourist_places: d.tourist_places || d.touristPlaces || ''
          }));
          setDestinations(normalized);
        }
      })
      .catch(e => console.log('Error loading destinations:', e));

    api.travel.hotels.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((h: any) => ({
            id: h.id,
            name: h.name || '',
            city: h.city || '',
            pricing: h.pricing || '₹8,000/night',
            rooms: h.rooms || 'Standard Lodge'
          }));
          setHotels(normalized);
        }
      })
      .catch(e => console.log('Error loading hotels:', e));

    api.travel.flights.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((f: any) => ({
            id: f.id,
            airline: f.airline || '',
            schedule: f.schedule || '',
            availability: typeof f.availability === 'number' ? f.availability : 0,
            pricing: typeof f.pricing === 'number' ? f.pricing : 0
          }));
          setFlights(normalized);
        }
      })
      .catch(e => console.log('Error loading flights:', e));

    api.travel.visas.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((v: any) => ({
            id: v.id,
            dbId: v.id,
            country: v.country || '',
            customer: v.customer || 'Walk-in',
            visaType: v.visaType || 'Tourist',
            fees: typeof v.fees === 'number' ? v.fees : 0,
            status: v.status || v.approvalStatus || 'Pending'
          }));
          setVisas(normalized);
        }
      })
      .catch(e => console.log('Error loading visas:', e));
  }, [projectId]);

  // Drag & Drop layout builder action simulations
  const moveSection = (idx: number, direction: 'up' | 'down') => {
    const updated = [...homepageSections];
    if (direction === 'up' && idx > 0) {
      const temp = updated[idx];
      updated[idx] = updated[idx - 1];
      updated[idx - 1] = temp;
    } else if (direction === 'down' && idx < updated.length - 1) {
      const temp = updated[idx];
      updated[idx] = updated[idx + 1];
      updated[idx + 1] = temp;
    }
    setHomepageSections(updated);
  };

  const deleteSection = (secName: string) => {
    setHomepageSections(prev => prev.filter(s => s !== secName));
  };

  const duplicateSection = (secName: string, idx: number) => {
    const updated = [...homepageSections];
    updated.splice(idx + 1, 0, `${secName} (Clone)`);
    setHomepageSections(updated);
  };

  const toggleHideSection = (secName: string) => {
    if (hiddenSections.includes(secName)) {
      setHiddenSections(prev => prev.filter(s => s !== secName));
    } else {
      setHiddenSections(prev => [...prev, secName]);
    }
  };

  const addSection = (secName: string) => {
    setHomepageSections(prev => [...prev, secName]);
  };

  // Add Item actions
  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgName || !newPkgPrice) return;
    const newPkg = {
      name: newPkgName,
      destination: newPkgDest || 'Global Niche',
      price: parseFloat(newPkgPrice),
      duration: newPkgDuration,
      status: newPkgStatus,
      country: 'India',
      discount: 0,
      imagesJson: '[]',
      videosJson: '[]',
      description: 'New package description',
      inclusions: '',
      exclusions: '',
      itineraryJson: '[]',
      pickup: '',
      dropPoint: '',
      meals: '',
      hotel: '',
      flightIncluded: false,
      guideIncluded: false
    };

    api.travel.packages.create(projectId, newPkg)
      .then(savedPkg => {
        setPackages(prev => [...prev, savedPkg]);
        setNewPkgName('');
        setNewPkgDest('');
        setNewPkgPrice('');
      })
      .catch(err => {
        console.error('Error adding package:', err);
        const localPkg = { id: packages.length + 101, ...newPkg };
        setPackages(prev => [...prev, localPkg]);
        setNewPkgName('');
        setNewPkgDest('');
        setNewPkgPrice('');
      });
  };

  const handleAddDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestCountry || !newDestCity) return;
    const newDest = {
      country: newDestCountry,
      city: newDestCity,
      state: '',
      touristPlaces: newDestPlaces,
      imageUrl: '',
      description: ''
    };

    api.travel.destinations.create(projectId, newDest)
      .then(savedDest => {
        setDestinations(prev => [...prev, savedDest]);
        setNewDestCountry('');
        setNewDestCity('');
        setNewDestPlaces('');
      })
      .catch(err => {
        console.error('Error adding destination:', err);
        const localDest = { id: destinations.length + 1, ...newDest, tourist_places: newDestPlaces };
        setDestinations(prev => [...prev, localDest]);
        setNewDestCountry('');
        setNewDestCity('');
        setNewDestPlaces('');
      });
  };

  const handleAddHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName || !newHotelCity) return;
    const newH = {
      name: newHotelName,
      city: newHotelCity,
      pricing: newHotelPrice,
      rooms: 'Standard Lodge',
      availability: 'Available',
      imagesJson: '[]'
    };

    api.travel.hotels.create(projectId, newH)
      .then(savedHotel => {
        setHotels(prev => [...prev, savedHotel]);
        setNewHotelName('');
        setNewHotelCity('');
      })
      .catch(err => {
        console.error('Error adding hotel:', err);
        const localH = { id: hotels.length + 1, ...newH };
        setHotels(prev => [...prev, localH]);
        setNewHotelName('');
        setNewHotelCity('');
      });
  };

  const handleApproveBooking = (booking: any) => {
    const updatedStatus = { bookingStatus: 'Confirmed' };
    if (booking.dbId) {
      api.travel.bookings.update(booking.dbId, projectId, updatedStatus)
        .then(() => {
          setBookings(prev => prev.map(b => b.dbId === booking.dbId ? { ...b, status: 'Confirmed' } : b));
          setSelectedBookingDetails((prev: any) => prev ? { ...prev, status: 'Confirmed' } : null);
        })
        .catch(err => {
          console.error('Error updating booking status:', err);
          setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'Confirmed' } : b));
          setSelectedBookingDetails((prev: any) => prev ? { ...prev, status: 'Confirmed' } : null);
        });
    } else {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'Confirmed' } : b));
      setSelectedBookingDetails((prev: any) => prev ? { ...prev, status: 'Confirmed' } : null);
    }
  };

  const handleApproveVisa = (visa: any) => {
    const updatedStatus = { approvalStatus: 'Approved' };
    if (visa.dbId) {
      api.travel.visas.update(visa.dbId, projectId, updatedStatus)
        .then(() => {
          setVisas(prev => prev.map(v => v.dbId === visa.dbId ? { ...v, status: 'Approved' } : v));
        })
        .catch(err => {
          console.error('Error updating visa status:', err);
          setVisas(prev => prev.map(item => item.id === visa.id ? { ...item, status: 'Approved' } : item));
        });
    } else {
      setVisas(prev => prev.map(item => item.id === visa.id ? { ...item, status: 'Approved' } : item));
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-xs text-slate-800">
      
      {/* 1. Light Aesthetic Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-200/80 flex flex-col justify-between p-4 shadow-sm select-none">
        <div className="space-y-6 text-left">
          {/* Brand Logo header */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="text-xl">✈️</span>
            <div className="truncate">
              <h3 className="text-[11px] font-black text-slate-900 leading-tight">{companyName || 'Wanderlust Travels'}</h3>
              <span className="text-[8px] text-cyan-600 block font-bold uppercase tracking-wider">Travel Console</span>
            </div>
          </div>

          {/* Links list */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'website', name: 'Website Layout', icon: '💻' },
              { id: 'packages', name: 'Packages', icon: '📦' },
              { id: 'destinations', name: 'Destinations', icon: '🗺️' },
              { id: 'bookings', name: 'Bookings', icon: '📅' },
              { id: 'customers', name: 'Customers', icon: '👥' },
              { id: 'hotels', name: 'Hotels Log', icon: '🏢' },
              { id: 'flights', name: 'Flights Log', icon: '🛫' },
              { id: 'visa', name: 'Visas', icon: '📄' },
              { id: 'payments', name: 'Payments Ledger', icon: '💳' },
              { id: 'marketing', name: 'Marketing', icon: '📣' },
              { id: 'reports', name: 'Reports', icon: '📈' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedBookingDetails(null);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-black transition text-left cursor-pointer border-none text-[10px] ${
                    isActive ? 'text-cyan-700 bg-cyan-50' : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900 bg-transparent'
                  }`}
                  style={isActive ? { borderLeft: `3px solid ${customPrimaryColor}` } : {}}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="border-t border-slate-100 pt-4 space-y-2 text-left">
          <div className="truncate">
            <span className="text-[7px] text-slate-400 block font-bold uppercase">Logged Agent</span>
            <span className="text-[9px] text-slate-700 font-extrabold truncate block">{clientEmail}</span>
          </div>
          <button 
            onClick={onLogout} 
            className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-650 font-black rounded-xl transition border-none cursor-pointer text-[10px]"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Main Page Content View */}
      <main className="flex-grow flex flex-col overflow-hidden bg-slate-50/50">
        
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200/60 flex justify-between items-center px-6 shadow-sm">
          <h2 className="text-sm font-black text-slate-900 capitalize flex items-center gap-1.5">
            <span>Admin Control Panel</span>
            <span className="text-slate-300 font-medium">/</span>
            <span className="text-slate-500 font-medium text-xs">{activeTab}</span>
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => window.open(`/preview/${projectId}`, '_blank')} 
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border-none cursor-pointer text-[10px]"
            >
              Launch Customer Storefront ➔
            </button>
          </div>
        </header>

        {/* Inner Scrollable Workspace */}
        <div className="flex-grow p-6 overflow-y-auto min-h-0 text-left">

          {/* TAB 1: DASHBOARD METRICS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { title: 'Today\'s Sales Revenue', value: `₹${revenue.toLocaleString()}`, change: '+12% from yesterday', icon: '💰', color: 'border-l-cyan-500' },
                  { title: 'Tour Bookings placed', value: bookingsCount, change: '+5 new packages today', icon: '📅', color: 'border-l-indigo-500' },
                  { title: 'Weekly Portal Visitors', value: visitors, change: '+240 page visits', icon: '👥', color: 'border-l-emerald-500' },
                  { title: 'Pending Visa Applications', value: pendingPayments, change: 'Requires agent response', icon: '📄', color: 'border-l-amber-500' }
                ].map((c, idx) => (
                  <div key={idx} className={`bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm border-l-4 ${c.color} text-left flex justify-between items-center`}>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase text-slate-400 block">{c.title}</span>
                      <span className="text-base font-black text-slate-900 block">{c.value}</span>
                      <span className="text-[8px] text-slate-450 font-bold block">{c.change}</span>
                    </div>
                    <span className="text-xl opacity-60">{c.icon}</span>
                  </div>
                ))}
              </div>

              {/* Graphical representation widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="md:col-span-2 bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4">
                  <h4 className="font-extrabold uppercase text-[9px] text-slate-400">Monthly Revenue & Bookings graph</h4>
                  <div className="h-48 bg-slate-50 rounded-2xl flex items-end justify-between p-4 border border-slate-200/80">
                    {[35, 45, 20, 60, 80, 50, 95, 110].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5 w-8">
                        <div className="w-4 bg-cyan-500 rounded-t" style={{ height: `${h}px` }} />
                        <span className="text-[7px] text-slate-400 font-bold">M{i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checklist column */}
                <div className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4">
                  <h4 className="font-extrabold uppercase text-[9px] text-slate-400">Pending Actions Required</h4>
                  <div className="space-y-2">
                    {[
                      { icon: '⚠️', text: 'Consul file missing for Aman Verma\'s Visa' },
                      { icon: '👤', text: 'Approve manual checkout payment for Riya Sen' },
                      { icon: '🏢', text: 'Verify room availability at Grand Hyatt Seminyak' }
                    ].map((act, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-150 rounded-2xl">
                        <span>{act.icon}</span>
                        <p className="text-[9px] font-bold text-slate-700 leading-tight">{act.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEBSITE DRAG & DROP BUILDER */}
          {activeTab === 'website' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="md:col-span-1 bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4">
                <div>
                  <h3 className="font-black text-xs text-slate-900">Shopify Homepage Builder</h3>
                  <p className="text-[9px] text-slate-400 leading-relaxed mt-1">Drag and drop sections, reorder layouts, toggle visibility, duplicate or delete elements instantly.</p>
                </div>

                {/* Section List with Actions */}
                <div className="space-y-2 pt-2">
                  {homepageSections.map((sec, idx) => {
                    const isHidden = hiddenSections.includes(sec);
                    return (
                      <div key={sec} className={`flex justify-between items-center p-3 border rounded-2xl bg-slate-50 transition ${
                        isHidden ? 'opacity-40' : ''
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="cursor-grab text-slate-400">⋮⋮</span>
                          <span className="font-black text-[10px]">{sec}</span>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-slate-200 disabled:opacity-30 rounded text-[9px] border-none bg-transparent cursor-pointer">▲</button>
                          <button onClick={() => moveSection(idx, 'down')} disabled={idx === homepageSections.length - 1} className="p-1 hover:bg-slate-200 disabled:opacity-30 rounded text-[9px] border-none bg-transparent cursor-pointer">▼</button>
                          <button onClick={() => toggleHideSection(sec)} className="p-1 hover:bg-slate-200 rounded text-[9px] border-none bg-transparent cursor-pointer">{isHidden ? '👁️‍🗨️' : '👁️'}</button>
                          <button onClick={() => duplicateSection(sec, idx)} className="p-1 hover:bg-slate-200 rounded text-[9px] border-none bg-transparent cursor-pointer">📋</button>
                          <button onClick={() => deleteSection(sec)} className="p-1 hover:bg-red-50 text-red-500 rounded text-[9px] border-none bg-transparent cursor-pointer">✕</button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t pt-3 flex gap-2">
                  <button onClick={() => addSection('Testimonials Slider')} className="flex-grow py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-[9px] font-bold border-none cursor-pointer">Add Testimonials</button>
                  <button onClick={() => addSection('Custom FAQ List')} className="flex-grow py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-[9px] font-bold border-none cursor-pointer">Add FAQs</button>
                </div>
              </div>

              {/* Live Preview Pane */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Dynamic Layout Visualizer</label>
                <div className="border border-slate-200/60 rounded-3xl overflow-hidden shadow bg-white p-5 space-y-3">
                  {homepageSections.map((sec) => {
                    const isHidden = hiddenSections.includes(sec);
                    if (isHidden) return null;
                    return (
                      <div key={sec} className="border border-dashed border-slate-200 p-4 rounded-xl text-center bg-slate-50/50 font-bold relative group">
                        <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Section</span>
                        <h4 className="text-xs text-slate-800 mt-1 font-black">{sec}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PACKAGES MANAGER */}
          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="md:col-span-2 bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4">
                <h3 className="font-black text-xs">Holiday Packages Catalog</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b text-slate-400 font-bold text-[9px] uppercase">
                        <th className="py-2">Tour Name</th>
                        <th className="py-2">Destination</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Duration</th>
                        <th className="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[10px] text-slate-650 font-bold">
                      {packages.map((p, idx) => (
                        <tr key={p.id ? `${p.id}-${idx}` : idx}>
                          <td className="py-2.5 font-bold text-slate-900">{p.name}</td>
                          <td className="py-2.5">{p.destination}</td>
                          <td className="py-2.5 font-bold text-cyan-600">₹{p.price.toLocaleString()}</td>
                          <td className="py-2.5 font-bold text-slate-700">{p.duration}</td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-50 text-emerald-700">{p.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <form onSubmit={handleAddPackage} className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-3">
                <h4 className="font-extrabold uppercase text-[9px] text-slate-400 border-b pb-2">Add New Package</h4>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Package Name *</label>
                  <input type="text" required value={newPkgName} onChange={e => setNewPkgName(e.target.value)} placeholder="Swiss Alps Explorer" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Destination *</label>
                  <input type="text" required value={newPkgDest} onChange={e => setNewPkgDest(e.target.value)} placeholder="Zermatt, Interlaken" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Price (INR) *</label>
                    <input type="number" required value={newPkgPrice} onChange={e => setNewPkgPrice(e.target.value)} placeholder="75000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Duration</label>
                    <input type="text" required value={newPkgDuration} onChange={e => setNewPkgDuration(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 outline-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Status</label>
                  <select value={newPkgStatus} onChange={e => setNewPkgStatus(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer">
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-2.5 text-white font-black rounded-xl transition border-none cursor-pointer text-[10px]" style={{ backgroundColor: customPrimaryColor }}>
                  Create Package
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: DESTINATIONS */}
          {activeTab === 'destinations' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="md:col-span-2 bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4">
                <h3 className="font-black text-xs">Registered Tourist Hubs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destinations.map((d, idx) => (
                    <div key={d.id ? `${d.id}-${idx}` : idx} className="bg-slate-50 p-4 border border-slate-150 rounded-2xl space-y-2">
                      <span className="text-[8px] bg-cyan-55/15 text-cyan-700 font-extrabold uppercase px-1.5 py-0.5 rounded">{d.country}</span>
                      <h4 className="font-black text-xs text-slate-900">{d.city} ({d.state})</h4>
                      <p className="text-[9px] text-slate-500 leading-tight">Must see: {d.places}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleAddDestination} className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-3">
                <h4 className="font-extrabold uppercase text-[9px] text-slate-400 border-b pb-2">Add Tourist Place</h4>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Country Name *</label>
                  <input type="text" required value={newDestCountry} onChange={e => setNewDestCountry(e.target.value)} placeholder="France" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">City Name *</label>
                  <input type="text" required value={newDestCity} onChange={e => setNewDestCity(e.target.value)} placeholder="Paris" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Sightseeing Places</label>
                  <textarea value={newDestPlaces} onChange={e => setNewDestPlaces(e.target.value)} rows={3} placeholder="Eiffel Tower, Louvre Museum..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none resize-none" />
                </div>
                <button type="submit" className="w-full py-2.5 text-white font-black rounded-xl transition border-none cursor-pointer text-[10px]" style={{ backgroundColor: customPrimaryColor }}>
                  Add Destination
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 text-left">
              
              {selectedBookingDetails && (
                <div className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-md space-y-4 max-w-2xl">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-black text-xs text-slate-900">Booking Ticket details ({selectedBookingDetails.id})</h3>
                    <button onClick={() => setSelectedBookingDetails(null)} className="p-1 hover:bg-slate-100 rounded-full border-none cursor-pointer bg-transparent">✕</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold leading-relaxed">
                    <div>
                      <p className="text-slate-400">Customer Name</p>
                      <p className="text-slate-800 font-black">{selectedBookingDetails.customer}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Customer Email</p>
                      <p className="text-slate-800 font-black">{selectedBookingDetails.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Tour Package</p>
                      <p className="text-slate-800 font-black">{selectedBookingDetails.pkg}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Travel Date</p>
                      <p className="text-slate-850 font-black">{selectedBookingDetails.date}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Total Price Paid</p>
                      <p className="text-cyan-600 font-black">₹{selectedBookingDetails.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Booking Status</p>
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-50 text-emerald-700">{selectedBookingDetails.status}</span>
                    </div>
                  </div>
                  <div className="border-t pt-3 flex gap-2">
                    <button onClick={() => alert('Voucher PDF generated!')} className="flex-grow py-2 text-white font-black rounded-lg text-center border-none cursor-pointer text-[10px]" style={{ backgroundColor: customPrimaryColor }}>
                      Download PDF Voucher Invoice
                    </button>
                    {selectedBookingDetails.status === 'Pending Approval' && (
                      <button
                        onClick={() => handleApproveBooking(selectedBookingDetails)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl border-none cursor-pointer text-[10px]"
                      >
                        Approve Booking
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4">
                <h3 className="font-black text-xs text-slate-900">Customer Bookings Ledger</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b text-slate-400 font-bold text-[9px] uppercase">
                        <th className="py-2">Booking ID</th>
                        <th className="py-2">Customer</th>
                        <th className="py-2">Package</th>
                        <th className="py-2">Travel Date</th>
                        <th className="py-2">Total Paid</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[10px] text-slate-650 font-bold">
                      {bookings.map((b, idx) => (
                        <tr key={b.id ? `${b.id}-${idx}` : idx} className="hover:bg-slate-50/50 transition">
                          <td className="py-2.5 font-mono text-slate-900">{b.id}</td>
                          <td className="py-2.5">{b.customer}</td>
                          <td className="py-2.5 truncate max-w-[150px]">{b.pkg}</td>
                          <td className="py-2.5 text-slate-500">{b.date}</td>
                          <td className="py-2.5 font-black text-cyan-600">₹{b.total.toLocaleString()}</td>
                          <td className="py-2.5 font-black uppercase text-[8px]">
                            <span className={`px-2 py-0.5 rounded ${
                              b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' :
                              b.status === 'Pending Approval' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                            }`}>{b.status}</span>
                          </td>
                          <td className="py-2.5">
                            <button onClick={() => setSelectedBookingDetails(b)} className="px-2.5 py-1.5 bg-slate-900 text-white text-[8px] font-bold rounded-lg cursor-pointer border-none shadow">
                              View Ticket
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4 text-left">
              <h3 className="font-black text-xs text-slate-900">Customer Database</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-slate-400 font-bold text-[9px] uppercase">
                      <th className="py-2">Name</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Total Bookings</th>
                      <th className="py-2">Loyalty Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[10px] text-slate-650 font-bold">
                    {customers.map((c, idx) => (
                      <tr key={c.id ? `${c.id}-${idx}` : idx}>
                        <td className="py-2.5 font-bold text-slate-900">{c.name}</td>
                        <td className="py-2.5">{c.email}</td>
                        <td className="py-2.5 font-bold">{c.bookings} Tour(s)</td>
                        <td className="py-2.5 text-indigo-650 font-bold">{c.loyaltyPoints} Pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: HOTELS LOG */}
          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="md:col-span-2 bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4">
                <h3 className="font-black text-xs text-slate-900">Active Lodge & Resort Partners</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b text-slate-400 font-bold text-[9px] uppercase">
                        <th className="py-2">Hotel Name</th>
                        <th className="py-2">City</th>
                        <th className="py-2">Room Variants</th>
                        <th className="py-2">Pricing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[10px] text-slate-650 font-bold">
                      {hotels.map((h, idx) => (
                        <tr key={h.id ? `${h.id}-${idx}` : idx}>
                          <td className="py-2.5 font-bold text-slate-900">{h.name}</td>
                          <td className="py-2.5">{h.city}</td>
                          <td className="py-2.5 text-slate-500">{h.rooms}</td>
                          <td className="py-2.5 font-bold text-cyan-600">{h.pricing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <form onSubmit={handleAddHotel} className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-3">
                <h4 className="font-extrabold uppercase text-[9px] text-slate-400 border-b pb-2">Add Partner Hotel</h4>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Hotel Name *</label>
                  <input type="text" required value={newHotelName} onChange={e => setNewHotelName(e.target.value)} placeholder="Grand Palace Resort" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">City Location *</label>
                  <input type="text" required value={newHotelCity} onChange={e => setNewHotelCity(e.target.value)} placeholder="Bali / Paris" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Price per Night</label>
                  <input type="text" value={newHotelPrice} onChange={e => setNewHotelPrice(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none" />
                </div>
                <button type="submit" className="w-full py-2.5 text-white font-black rounded-xl transition border-none cursor-pointer text-[10px]" style={{ backgroundColor: customPrimaryColor }}>
                  Register Hotel
                </button>
              </form>
            </div>
          )}

          {/* TAB 8: FLIGHTS LOG */}
          {activeTab === 'flights' && (
            <div className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4 text-left">
              <h3 className="font-black text-xs text-slate-900">Flights Schedules Registry</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-slate-400 font-bold text-[9px] uppercase">
                      <th className="py-2">Airline</th>
                      <th className="py-2">Schedule & Route</th>
                      <th className="py-2">Available Seats</th>
                      <th className="py-2">Base Airfare</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[10px] text-slate-650 font-bold">
                    {flights.map((f, idx) => (
                      <tr key={f.id ? `${f.id}-${idx}` : idx}>
                        <td className="py-2.5 font-bold text-slate-900">{f.airline}</td>
                        <td className="py-2.5 text-slate-500">{f.schedule}</td>
                        <td className="py-2.5 font-bold">{f.availability} Seats</td>
                        <td className="py-2.5 font-bold text-emerald-600">₹{f.pricing.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: VISAS */}
          {activeTab === 'visa' && (
            <div className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4 text-left">
              <h3 className="font-black text-xs text-slate-900">Visa Consulting Submissions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-slate-400 font-bold text-[9px] uppercase">
                      <th className="py-2">Visa Country</th>
                      <th className="py-2">Customer</th>
                      <th className="py-2">Visa Category</th>
                      <th className="py-2">Consul Fee</th>
                      <th className="py-2">Review Status</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[10px] text-slate-650 font-bold">
                    {visas.map((v, idx) => (
                      <tr key={v.id ? `${v.id}-${idx}` : idx}>
                        <td className="py-2.5 font-bold text-slate-900">{v.country}</td>
                        <td className="py-2.5">{v.customer}</td>
                        <td className="py-2.5 font-bold">{v.visaType}</td>
                        <td className="py-2.5">₹{v.fees.toLocaleString()}</td>
                        <td className="py-2.5 font-black">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                            v.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>{v.status}</span>
                        </td>
                        <td className="py-2.5">
                          {v.status === 'Pending Review' && (
                            <button
                              onClick={() => handleApproveVisa(v)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[8px] font-bold rounded-lg cursor-pointer border-none"
                            >
                              Approve Visa
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4 text-left">
              <h3 className="font-black text-xs text-slate-900">Payment Payouts Ledger</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-slate-400 font-bold text-[9px] uppercase">
                      <th className="py-2">Txn ID</th>
                      <th className="py-2">Timestamp</th>
                      <th className="py-2">Gross Amount</th>
                      <th className="py-2">Payment Gateway</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[10px] text-slate-650 font-bold">
                    {payments.map((p, idx) => (
                      <tr key={p.id ? `${p.id}-${idx}` : idx}>
                        <td className="py-2.5 font-mono text-slate-900">{p.id}</td>
                        <td className="py-2.5 text-slate-500">{p.date}</td>
                        <td className="py-2.5 font-bold text-slate-900">₹{p.amount.toLocaleString()}</td>
                        <td className="py-2.5">{p.channel}</td>
                        <td className="py-2.5 font-black uppercase text-[8px] text-emerald-700">{p.payoutStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 11: MARKETING */}
          {activeTab === 'marketing' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="md:col-span-2 bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4">
                <h3 className="font-black text-xs text-slate-900">Active Coupon campaigns</h3>
                <div className="space-y-2">
                  {coupons.map((c, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 border border-slate-150 rounded-2xl bg-slate-50/50 font-black">
                      <div className="flex items-center gap-3">
                        <span className="text-base">🎟️</span>
                        <div>
                          <h4 className="text-[10px] font-mono text-cyan-600">{c.code}</h4>
                          <p className="text-[8px] text-slate-400 font-bold uppercase">{c.discount}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] rounded uppercase">{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newCouponCode) return;
                setCoupons(prev => [...prev, { code: newCouponCode.toUpperCase(), discount: newCouponDiscount, status: 'Active' }]);
                setNewCouponCode('');
              }} className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-3">
                <h4 className="font-extrabold uppercase text-[9px] text-slate-400 border-b pb-2">Create Coupon Code</h4>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Coupon Code *</label>
                  <input type="text" required value={newCouponCode} onChange={e => setNewCouponCode(e.target.value)} placeholder="SUMMER26" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Discount percentage/value</label>
                  <input type="text" required value={newCouponDiscount} onChange={e => setNewCouponDiscount(e.target.value)} placeholder="15% Off" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none" />
                </div>
                <button type="submit" className="w-full py-2.5 text-white font-black rounded-xl transition border-none cursor-pointer text-[10px]" style={{ backgroundColor: customPrimaryColor }}>
                  Launch Campaign
                </button>
              </form>
            </div>
          )}

          {/* TAB 12: REPORTS */}
          {activeTab === 'reports' && (
            <div className="bg-white p-5 border border-slate-200/60 rounded-3xl shadow-sm space-y-4 text-left">
              <h3 className="font-black text-xs text-slate-900">Financial Reports Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold leading-relaxed">
                <div className="p-3.5 bg-slate-50 border rounded-2xl shadow-inner">
                  <span className="text-[8px] text-slate-400 block uppercase font-black">Estimated Taxes (18% GST)</span>
                  <span className="text-sm font-black text-slate-900">₹{Math.floor(revenue * 0.18).toLocaleString()}</span>
                </div>
                <div className="p-3.5 bg-slate-50 border rounded-2xl shadow-inner">
                  <span className="text-[8px] text-slate-400 block uppercase font-black">Net Profit margin</span>
                  <span className="text-sm font-black text-emerald-600">₹{Math.floor(revenue * 0.25).toLocaleString()} (25%)</span>
                </div>
                <div className="p-3.5 bg-slate-50 border rounded-2xl shadow-inner">
                  <span className="text-[8px] text-slate-400 block uppercase font-black">Top Package Sold</span>
                  <span className="text-sm font-black text-indigo-650">Bali Paradise Tour</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={(e) => {
              e.preventDefault();
              api.travel.update(projectId, travelConfig)
                .then((updated) => {
                  setTravelConfig(updated);
                  alert('Travel Settings Profile Saved Successfully!');
                })
                .catch((err) => {
                  console.error('Failed to save settings:', err);
                  alert('Failed to save settings to database.');
                });
            }} className="bg-white p-6 border border-slate-200/60 rounded-3xl shadow-sm space-y-4 text-left max-w-2xl">
              <h3 className="font-black text-xs border-b pb-2 mb-3 text-slate-900">General Settings Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Agency / Business Name</label>
                  <input
                    type="text"
                    value={travelConfig?.businessName || ''}
                    onChange={(e) => setTravelConfig({ ...travelConfig, businessName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Owner Name</label>
                  <input
                    type="text"
                    value={travelConfig?.ownerName || ''}
                    onChange={(e) => setTravelConfig({ ...travelConfig, ownerName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Contact Email</label>
                  <input
                    type="email"
                    value={travelConfig?.email || ''}
                    onChange={(e) => setTravelConfig({ ...travelConfig, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Phone Number</label>
                  <input
                    type="text"
                    value={travelConfig?.phoneNo || ''}
                    onChange={(e) => setTravelConfig({ ...travelConfig, phoneNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">WhatsApp Number</label>
                  <input
                    type="text"
                    value={travelConfig?.whatsappNo || ''}
                    onChange={(e) => setTravelConfig({ ...travelConfig, whatsappNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">GSTIN (GST Number)</label>
                  <input
                    type="text"
                    value={travelConfig?.gstNumber || ''}
                    onChange={(e) => setTravelConfig({ ...travelConfig, gstNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Travel Niche / Subcategory</label>
                  <select
                    value={travelConfig?.subcategory || 'Domestic Travel'}
                    onChange={(e) => setTravelConfig({ ...travelConfig, subcategory: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer text-xs"
                  >
                    <option value="Domestic Travel">Domestic Travel</option>
                    <option value="International Holidays">International Holidays</option>
                    <option value="Adventure Tours">Adventure Tours</option>
                    <option value="Luxury Travel">Luxury Travel</option>
                    <option value="Corporate Travel">Corporate Travel</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Logo Image URL</label>
                  <input
                    type="text"
                    value={travelConfig?.logoUrl || ''}
                    onChange={(e) => setTravelConfig({ ...travelConfig, logoUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-xs"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Business Address</label>
                  <textarea
                    rows={2}
                    value={travelConfig?.address || ''}
                    onChange={(e) => setTravelConfig({ ...travelConfig, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-xs resize-none"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Agency Description / Tagline</label>
                  <textarea
                    rows={2}
                    value={travelConfig?.description || ''}
                    onChange={(e) => setTravelConfig({ ...travelConfig, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-xs resize-none"
                  />
                </div>
              </div>
              <button type="submit" className="px-6 py-2 text-white font-black rounded-xl transition border-none cursor-pointer text-[10px]" style={{ backgroundColor: customPrimaryColor }}>
                Save Settings
              </button>
            </form>
          )}

        </div>
      </main>

    </div>
  );
}
