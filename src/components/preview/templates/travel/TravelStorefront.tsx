'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface TravelStorefrontProps {
  projectId: number;
  project: any;
  customerSession: any;
  onLogout: () => void;
  addToast: (msg: string, isError?: boolean) => void;
}

export default function TravelStorefront({
  projectId,
  project,
  customerSession,
  onLogout,
  addToast
}: TravelStorefrontProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'packages' | 'destinations' | 'hotels' | 'flights' | 'visa' | 'about' | 'gallery' | 'blog' | 'contact'>('home');
  const [travelConfig, setTravelConfig] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [flights, setFlights] = useState<any[]>([]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNiche, setFilterNiche] = useState('All');
  const [filterDuration, setFilterDuration] = useState('All');
  const [filterPriceRange, setFilterPriceRange] = useState(150000);
  const [selectedDate, setSelectedDate] = useState('');

  // Selected Detail Views
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [bookingPackage, setBookingPackage] = useState<any>(null);
  
  // Booking Form States
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentSuccessVoucher, setPaymentSuccessVoucher] = useState<any>(null);

  // Flight search
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [flightResults, setFlightResults] = useState<any[]>([]);

  // Hotel search
  const [hotelCity, setHotelCity] = useState('');
  const [hotelResults, setHotelResults] = useState<any[]>([]);

  // Visa consultant state
  const [visaType, setVisaType] = useState('Tourist');
  const [visaCountry, setVisaCountry] = useState('United States');
  const [visaDocsUploaded, setVisaDocsUploaded] = useState(false);

  useEffect(() => {
    // Load config and initial data
    api.travel.get(projectId)
      .then(data => {
        if (data && data.projectId) {
          setTravelConfig(data);
        }
      })
      .catch(e => console.log('Offline or no travel config:', e));

    const defaultPackages = [
      {
        id: 101,
        name: 'Grand European Explorer Tour',
        destination: 'Paris, Rome, London',
        country: 'France / Italy',
        duration: '7 Days / 6 Nights',
        price: 85000,
        discount: 15,
        description: 'Explore the historic landmarks of Europe, including Eiffel Tower, Colosseum, and Westminster Abbey.',
        inclusions: '4-star Hotel lodging, European Rail Passes, Guided city tours, Daily buffet breakfast',
        exclusions: 'Flight tickets, Personal souvenirs, Extra lunches',
        itinerary: 'Day 1: Arrival in Paris & Seine River Cruise. Day 2: Louvre & Eiffel Tour. Day 3: Train to Rome. Day 4: Vatican City & Colosseum. Day 5: Rome leisure. Day 6: Fly to London. Day 7: London departure.',
        flightIncluded: false,
        guideIncluded: true,
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80'
      },
      {
        id: 102,
        name: 'Bali Tropical Paradise Holiday',
        destination: 'Seminyak & Ubud',
        country: 'Indonesia',
        duration: '5 Days / 4 Nights',
        price: 42000,
        discount: 10,
        description: 'Sunset temple tours, white-water rafting, and boutique beachside pool villa stays.',
        inclusions: 'Pool Villa resort stay, Airport chauffeur pickup, Daily floating breakfast, Tour guide',
        exclusions: 'Personal purchases, Dinners, Rafting insurance fees',
        itinerary: 'Day 1: Chauffeur arrival at Seminyak. Day 2: Ubud rice terrace & monkeys forest. Day 3: Water sports & temple sunset. Day 4: Mount Batur sunrise hike. Day 5: Airport drop.',
        flightIncluded: true,
        guideIncluded: true,
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80'
      },
      {
        id: 103,
        name: 'Swiss Alps Mountaineer Expedition',
        destination: 'Zermatt & Interlaken',
        country: 'Switzerland',
        duration: '6 Days / 5 Nights',
        price: 110000,
        discount: 5,
        description: 'Spectacular alpine vistas, Matterhorn cable cars, and scenic Glacier Express rides.',
        inclusions: 'Swiss Chalet accommodation, Glacier Express train pass, Cable car ticket, Alpine trekking guide',
        exclusions: 'Ski equipment hires, Dinners, Outstation taxi drops',
        itinerary: 'Day 1: Interlaken arrival. Day 2: Jungfraujoch top of Europe. Day 3: Glacier Express to Zermatt. Day 4: Matterhorn glacier paradise. Day 5: Hiking & cheese fondue dinner. Day 6: Departure.',
        flightIncluded: false,
        guideIncluded: true,
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80'
      }
    ];

    api.travel.packages.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((pkg: any) => ({
            ...pkg,
            image: pkg.image || (pkg.imagesJson ? JSON.parse(pkg.imagesJson)[0] : '') || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500'
          }));
          setPackages(normalized);
        } else {
          setPackages(defaultPackages);
        }
      })
      .catch(e => {
        console.log('Error loading packages:', e);
        setPackages(defaultPackages);
      });

    const defaultDestinations = [
      { id: 1, country: 'France', city: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&auto=format&fit=crop&q=80', desc: 'The city of lights, landmarks and fine dining.' },
      { id: 2, country: 'Indonesia', city: 'Bali', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80', desc: 'Exotic beaches, volcanos, and historical temples.' },
      { id: 3, country: 'Switzerland', city: 'Zermatt', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80', desc: 'Snowy mountains, cable cars, and alpine chalets.' },
      { id: 4, country: 'India', city: 'Agra', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&auto=format&fit=crop&q=80', desc: 'Home to the magnificent Taj Mahal heritage.' }
    ];

    api.travel.destinations.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((d: any) => ({
            ...d,
            image: d.image || d.imageUrl || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
            desc: d.desc || d.description || 'Stunning destination.'
          }));
          setDestinations(normalized);
        } else {
          setDestinations(defaultDestinations);
        }
      })
      .catch(e => {
        console.log('Error loading destinations:', e);
        setDestinations(defaultDestinations);
      });

    const defaultHotels = [
      { id: 1, name: 'Grand Hyatt Resort Seminyak', city: 'Bali', price: '₹9,500/night', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80', rating: '4.8 ★' },
      { id: 2, name: 'The Ritz-Carlton London', city: 'London', price: '₹22,000/night', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80', rating: '4.9 ★' },
      { id: 3, name: 'Swiss Alpine Chalet Resort', city: 'Zermatt', price: '₹14,500/night', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80', rating: '4.7 ★' }
    ];

    api.travel.hotels.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((h: any) => ({
            ...h,
            price: h.price || h.pricing || '₹8,000/night',
            image: h.image || (h.imagesJson ? JSON.parse(h.imagesJson)[0] : '') || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
            rating: h.rating || '4.5 ★'
          }));
          setHotels(normalized);
        } else {
          setHotels(defaultHotels);
        }
      })
      .catch(e => {
        console.log('Error loading hotels:', e);
        setHotels(defaultHotels);
      });

    const defaultFlights = [
      { id: 1, airline: 'Singapore Airlines', from: 'Delhi', to: 'Bali', price: 34500, time: '08:45 AM - 04:30 PM' },
      { id: 2, airline: 'Air France', from: 'Mumbai', to: 'Paris', price: 58000, time: '11:15 PM - 06:45 AM' },
      { id: 3, airline: 'Swiss International Air', from: 'Delhi', to: 'Zurich', price: 62000, time: '02:30 AM - 08:15 AM' }
    ];

    api.travel.flights.list(projectId)
      .then(data => {
        if (data && data.length > 0) {
          const normalized = data.map((f: any) => {
            let from = 'Delhi';
            let to = 'Bali';
            let time = '08:45 AM - 04:30 PM';
            if (f.schedule) {
              const parts = f.schedule.split(',');
              if (parts[0]) {
                const routeParts = parts[0].split('to');
                if (routeParts[0]) from = routeParts[0].trim();
                if (routeParts[1]) to = routeParts[1].trim();
              }
              if (parts[1]) time = parts[1].trim();
            }
            return {
              id: f.id,
              airline: f.airline,
              from,
              to,
              price: f.pricing || 30000,
              time
            };
          });
          setFlights(normalized);
        } else {
          setFlights(defaultFlights);
        }
      })
      .catch(e => {
        console.log('Error loading flights:', e);
        setFlights(defaultFlights);
      });
  }, [projectId]);

  const getThemeHex = () => {
    if (travelConfig?.themeColor === 'Custom') return travelConfig.customColorHex || '#06b6d4';
    const presets: Record<string, string> = {
      Blue: '#0284c7',
      Green: '#16a34a',
      Purple: '#9333ea',
      Orange: '#ea580c',
      Dark: '#1e293b'
    };
    return presets[travelConfig?.themeColor] || '#06b6d4';
  };

  const activeColor = getThemeHex();

  // Search/Filter Handlers
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = pkg.price <= filterPriceRange;
    return matchesSearch && matchesPrice;
  });

  const handleBookNow = (pkg: any) => {
    setBookingPackage(pkg);
    setBookingName(customerSession?.name || '');
    setBookingEmail(customerSession?.email || '');
    setBookingPhone('');
    setGuestsCount(1);
    setIsCheckoutOpen(true);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingPhone) {
      addToast('Please fill all required booking details', true);
      return;
    }

    const calculatedPrice = bookingPackage.price * guestsCount * (1 - (bookingPackage.discount / 100));

    // Simulated Voucher Object (as fallback)
    const voucher = {
      invoiceId: 'ZB-TRAV-' + Math.floor(100000 + Math.random() * 900000),
      packageName: bookingPackage.name,
      destination: bookingPackage.destination,
      duration: bookingPackage.duration,
      customerName: bookingName,
      customerEmail: bookingEmail,
      customerPhone: bookingPhone,
      travelDate: bookingDate || new Date().toISOString().split('T')[0],
      guests: guestsCount,
      totalPaid: calculatedPrice,
      paymentStatus: 'Paid',
      bookingStatus: travelConfig?.approvalMode === 'manual' ? 'Pending Approval' : 'Confirmed'
    };

    const dbBooking = {
      customerName: bookingName,
      customerEmail: bookingEmail,
      customerPhone: bookingPhone,
      packageId: bookingPackage.id,
      packageName: bookingPackage.name,
      travelDate: bookingDate || new Date().toISOString().split('T')[0],
      guestsCount: guestsCount,
      totalPrice: calculatedPrice,
      paymentStatus: 'Paid',
      bookingStatus: travelConfig?.approvalMode === 'manual' ? 'Pending Approval' : 'Confirmed',
      bookingSettings: travelConfig?.approvalMode === 'manual' ? 'Manual Approval' : 'Instant Booking',
      pdfUrl: ''
    };

    api.travel.bookings.create(projectId, dbBooking)
      .then(savedBooking => {
        const resultVoucher = {
          invoiceId: savedBooking.id ? `ZB-TRAV-${savedBooking.id}` : voucher.invoiceId,
          packageName: savedBooking.packageName,
          destination: bookingPackage.destination,
          duration: bookingPackage.duration,
          customerName: savedBooking.customerName,
          customerEmail: savedBooking.customerEmail,
          customerPhone: savedBooking.customerPhone,
          travelDate: savedBooking.travelDate,
          guests: savedBooking.guestsCount,
          totalPaid: savedBooking.totalPrice,
          paymentStatus: savedBooking.paymentStatus,
          bookingStatus: savedBooking.bookingStatus
        };
        setPaymentSuccessVoucher(resultVoucher);
        setIsCheckoutOpen(false);
        addToast('Booking successfully placed! Voucher generated.', false);
      })
      .catch(err => {
        console.error('Error creating booking in DB:', err);
        setPaymentSuccessVoucher(voucher);
        setIsCheckoutOpen(false);
        addToast('Booking successfully placed! Voucher generated.', false);
      });
  };

  const handleSearchFlights = () => {
    if (!flightFrom || !flightTo) {
      addToast('Please enter both departure and destination airport cities', true);
      return;
    }
    const matches = flights.filter(f => 
      f.from.toLowerCase().includes(flightFrom.toLowerCase()) &&
      f.to.toLowerCase().includes(flightTo.toLowerCase())
    );
    setFlightResults(matches.length > 0 ? matches : [
      { id: 99, airline: 'Air India Express', from: flightFrom, to: flightTo, price: 28000, time: '10:00 AM - 05:00 PM' }
    ]);
  };

  const handleSearchHotels = () => {
    if (!hotelCity) {
      addToast('Please enter city name to search hotels', true);
      return;
    }
    const matches = hotels.filter(h => h.city.toLowerCase().includes(hotelCity.toLowerCase()));
    setHotelResults(matches.length > 0 ? matches : [
      { id: 99, name: `${hotelCity} Heritage Palace Inn`, city: hotelCity, price: '₹4,800/night', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80', rating: '4.5 ★' }
    ]);
  };

  return (
    <div className="bg-slate-55 text-slate-800 min-h-screen flex flex-col font-sans">
      
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
          
          {/* Logo */}
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 cursor-pointer bg-transparent border-none">
            {travelConfig?.logoUrl ? (
              <img src={travelConfig.logoUrl} alt="Logo" className="h-8 max-w-[120px] object-contain" />
            ) : (
              <span className="text-2xl">✈️</span>
            )}
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              {travelConfig?.businessName || project.name}
            </span>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex gap-6 text-xs font-black uppercase text-slate-500 tracking-wider">
            {(['home', 'packages', 'destinations', 'hotels', 'flights', 'visa', 'gallery', 'blog', 'contact'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedPackage(null);
                  setPaymentSuccessVoucher(null);
                }}
                className={`transition cursor-pointer bg-transparent border-none text-[10px] ${
                  activeTab === tab ? 'text-slate-900 dark:text-white font-extrabold' : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                style={activeTab === tab ? { borderBottom: `2px solid ${activeColor}`, paddingBottom: '2px' } : {}}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-3">
            {customerSession ? (
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-1 rounded">👤 {customerSession.name}</span>
                <button onClick={onLogout} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold transition">Logout</button>
              </div>
            ) : (
              <a
                href={`/preview/${projectId}/login`}
                className="px-4 py-2 text-white text-xs font-black rounded-xl shadow transition text-center no-underline inline-block cursor-pointer"
                style={{ backgroundColor: activeColor }}
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Storefront Pages Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">

        {/* Voucher Banner details */}
        {paymentSuccessVoucher && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 mb-8 text-left max-w-2xl mx-auto space-y-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-emerald-800 font-black text-sm">🎉 Booking Receipt Voucher Generated</h3>
              <span className="text-[10px] bg-emerald-200 text-emerald-800 font-extrabold px-2 py-0.5 rounded uppercase">Paid</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-bold">Invoice ID</p>
                <p className="font-extrabold text-slate-800">{paymentSuccessVoucher.invoiceId}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Booking Status</p>
                <p className="font-extrabold text-slate-800">{paymentSuccessVoucher.bookingStatus}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Package Name</p>
                <p className="font-extrabold text-slate-800">{paymentSuccessVoucher.packageName}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Travel Date</p>
                <p className="font-extrabold text-slate-800">{paymentSuccessVoucher.travelDate}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Guests Count</p>
                <p className="font-extrabold text-slate-800">{paymentSuccessVoucher.guests} Person(s)</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Total Paid</p>
                <p className="font-extrabold text-slate-800">₹{paymentSuccessVoucher.totalPaid.toLocaleString()}</p>
              </div>
            </div>
            <div className="border-t pt-3 flex gap-2">
              <button
                onClick={() => addToast('Voucher downloaded successfully as PDF', false)}
                className="flex-grow py-2 text-white text-xs font-black rounded-xl text-center"
                style={{ backgroundColor: activeColor }}
              >
                Download PDF Ticket Receipt 📥
              </button>
              <button onClick={() => setPaymentSuccessVoucher(null)} className="px-4 py-2 border rounded-xl text-xs font-bold">Close</button>
            </div>
          </div>
        )}

        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            
            {/* Banner Video / Hero banner block */}
            <div className="relative h-[380px] rounded-[32px] overflow-hidden text-white flex items-center justify-start p-8 md:p-16 text-left shadow-2xl">
              {travelConfig?.heroVideoUrl ? (
                <video src={travelConfig.heroVideoUrl} autoPlay loop muted className="absolute inset-0 w-full h-full object-cover" />
              ) : travelConfig?.bannerUrl ? (
                <img src={travelConfig.bannerUrl} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
              
              <div className="relative space-y-4 max-w-xl">
                <span className="text-[10px] text-white/90 bg-white/20 backdrop-blur font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                  ⛺ {travelConfig?.subcategory || 'Adventure Tours'}
                </span>
                <h1 className="text-3xl md:text-5xl font-black leading-tight drop-shadow-md">
                  Let's explore the beauty of world together
                </h1>
                <p className="text-xs text-slate-200 max-w-md leading-relaxed font-medium">
                  {travelConfig?.description || 'Discover customized tropical getaways, guided alpine summits, regional cab bookings, and flight tickets reservations.'}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setActiveTab('packages')} className="px-6 py-3 text-white text-xs font-black rounded-xl shadow-lg border-none cursor-pointer hover:scale-105 transition" style={{ backgroundColor: activeColor }}>
                    Explore Tour Packages ➔
                  </button>
                  <button onClick={() => setActiveTab('visa')} className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur rounded-xl text-xs font-bold transition">
                    Visa Consultation
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Search bar block */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xl max-w-4xl mx-auto -mt-16 relative z-10 grid grid-cols-1 sm:grid-cols-4 gap-4 text-left">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase">Search Destination</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Paris, Bali, Alps..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-950 dark:border-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase">Travel Niche</label>
                <select
                  value={filterNiche}
                  onChange={e => setFilterNiche(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-950 dark:border-slate-800 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Domestic Travel">Domestic</option>
                  <option value="International Travel">International</option>
                  <option value="Adventure Tours">Adventure</option>
                  <option value="Honeymoon">Honeymoon</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase">Budget Price limit</label>
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  step="5000"
                  value={filterPriceRange}
                  onChange={e => setFilterPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500 mt-2"
                />
                <span className="text-[9px] font-bold block text-slate-500">Up to: ₹{filterPriceRange.toLocaleString()}</span>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setActiveTab('packages');
                  }}
                  className="w-full py-2.5 text-white text-xs font-black rounded-xl shadow-lg border-none cursor-pointer"
                  style={{ backgroundColor: activeColor }}
                >
                  Filter Tours 🔍
                </button>
              </div>
            </div>

            {/* Popular Destinations catalog */}
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[9px] font-extrabold uppercase tracking-widest" style={{ color: activeColor }}>Scenic Gateways</span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Explore Popular Destinations</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {destinations.map(dest => (
                  <div key={dest.id} className="group relative h-48 rounded-2xl overflow-hidden shadow-md cursor-pointer" onClick={() => {
                    setSearchQuery(dest.city);
                    setActiveTab('packages');
                  }}>
                    <img src={dest.image} alt={dest.city} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-left">
                      <span className="text-[8px] bg-white/20 backdrop-blur text-white font-extrabold uppercase px-1.5 py-0.5 rounded">{dest.country}</span>
                      <h4 className="text-xs font-black text-white mt-1">{dest.city}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages Grid */}
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[9px] font-extrabold uppercase tracking-widest" style={{ color: activeColor }}>Wanderlust Tours</span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Active Tour Packages</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {packages.slice(0, 3).map(pkg => {
                  const discountedPrice = pkg.price * (1 - (pkg.discount / 100));
                  return (
                    <div key={pkg.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col">
                      <div className="h-44 w-full relative">
                        <img src={pkg.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80'} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-red-650 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full">Save {pkg.discount}%</span>
                      </div>
                      <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-bold text-slate-400">
                            <span>📍 {pkg.destination}</span>
                            <span>⏳ {pkg.duration}</span>
                          </div>
                          <h4 className="text-[12px] font-black text-slate-900 dark:text-white leading-snug line-clamp-1">{pkg.name}</h4>
                          <p className="text-[9px] text-slate-500 leading-normal line-clamp-2">{pkg.description}</p>
                        </div>
                        <div className="border-t pt-3 flex justify-between items-center">
                          <div>
                            <span className="text-[8px] text-slate-400 line-through block">₹{pkg.price.toLocaleString()}</span>
                            <span className="text-xs font-black text-slate-900 dark:text-white">₹{discountedPrice.toLocaleString()}</span>
                          </div>
                          <button
                            onClick={() => setSelectedPackage(pkg)}
                            className="px-3.5 py-1.5 text-white text-[9px] font-black uppercase rounded-lg border-none cursor-pointer"
                            style={{ backgroundColor: activeColor }}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[9px] font-extrabold uppercase tracking-widest" style={{ color: activeColor }}>Client Reviews</span>
                <h3 className="text-sm font-black">Trusted by Over 10,000+ Travelers</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {[
                  { name: 'Rohan Sharma', text: 'Outstanding visa consultation service! Guided us through every step and booking Seminyak resort was instant.', rating: '⭐⭐⭐⭐⭐' },
                  { name: 'Anjali Desai', text: 'Our honeymoon was planned perfectly. The romantic dinner inclusions and boat cruises were absolute highlights.', rating: '⭐⭐⭐⭐⭐' },
                  { name: 'Kabir Mehta', text: 'Very professional tour guides in Switzerland. We will definitely use ZATBIZ travel services again.', rating: '⭐⭐⭐⭐⭐' }
                ].map((t, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-950 p-4 rounded-2xl border space-y-2">
                    <span className="text-xs">{t.rating}</span>
                    <p className="text-[9px] text-slate-500 leading-normal">{t.text}</p>
                    <h5 className="text-[10px] font-black text-slate-900 dark:text-white">— {t.name}</h5>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PACKAGES */}
        {activeTab === 'packages' && (
          <div className="space-y-6 text-left">
            <h2 className="text-xl font-black">Explore Our Tour Packages</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Left sidebar filters */}
              <div className="md:col-span-1 bg-white dark:bg-slate-900 border rounded-2xl p-4 space-y-4 h-fit">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white border-b pb-2">Filter Packages</h4>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 uppercase">Destination search</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Enter city..."
                    className="w-full bg-slate-50 border rounded-lg px-2.5 py-1.5 text-xs outline-none dark:bg-slate-950 dark:border-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 uppercase">Max Budget: ₹{filterPriceRange.toLocaleString()}</label>
                  <input
                    type="range"
                    min="20000"
                    max="150000"
                    step="5000"
                    value={filterPriceRange}
                    onChange={e => setFilterPriceRange(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterPriceRange(150000);
                  }}
                  className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-950 dark:text-slate-350 text-[10px] font-bold rounded-lg"
                >
                  Clear Filters
                </button>
              </div>

              {/* Grid result list */}
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPackages.map(pkg => {
                  const discountedPrice = pkg.price * (1 - (pkg.discount / 100));
                  return (
                    <div key={pkg.id} className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                      <img src={pkg.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80'} className="h-40 w-full object-cover" />
                      <div className="p-4 space-y-2.5">
                        <div className="flex justify-between text-[8px] font-bold text-slate-400">
                          <span>📍 {pkg.destination}</span>
                          <span>⏳ {pkg.duration}</span>
                        </div>
                        <h4 className="text-[11px] font-black">{pkg.name}</h4>
                        <p className="text-[9px] text-slate-500 leading-tight line-clamp-2">{pkg.description}</p>
                        <div className="border-t pt-2 flex justify-between items-center">
                          <div>
                            <span className="text-[8px] text-slate-450 line-through block">₹{pkg.price.toLocaleString()}</span>
                            <span className="text-xs font-black">₹{discountedPrice.toLocaleString()}</span>
                          </div>
                          <button
                            onClick={() => setSelectedPackage(pkg)}
                            className="px-3 py-1 bg-slate-900 text-white dark:bg-slate-800 text-[9px] font-black uppercase rounded-lg"
                          >
                            View Itinerary
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: DESTINATIONS */}
        {activeTab === 'destinations' && (
          <div className="space-y-6 text-left">
            <h2 className="text-xl font-black">Browse Tourist Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {destinations.map(d => (
                <div key={d.id} className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm">
                  <img src={d.image} className="h-44 w-full object-cover" />
                  <div className="p-4 space-y-1">
                    <span className="text-[8px] uppercase tracking-wider font-extrabold" style={{ color: activeColor }}>{d.country}</span>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{d.city}</h4>
                    <p className="text-[9px] text-slate-500 leading-normal">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HOTELS */}
        {activeTab === 'hotels' && (
          <div className="space-y-6 text-left max-w-4xl mx-auto">
            <h2 className="text-xl font-black">Find Luxury Stays & Resort Bookings</h2>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={hotelCity}
                onChange={e => setHotelCity(e.target.value)}
                placeholder="Enter city (e.g. Bali, London...)"
                className="flex-grow bg-white border rounded-xl px-4 py-2.5 text-xs outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
              />
              <button
                onClick={handleSearchHotels}
                className="px-6 py-2.5 text-white text-xs font-black rounded-xl"
                style={{ backgroundColor: activeColor }}
              >
                Search Hotels
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {(hotelResults.length > 0 ? hotelResults : hotels).map(h => (
                <div key={h.id} className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm space-y-2 pb-3">
                  <img src={h.image} className="h-36 w-full object-cover" />
                  <div className="px-3 text-left space-y-1">
                    <div className="flex justify-between text-[9px] font-bold text-slate-400">
                      <span>📍 {h.city}</span>
                      <span className="text-amber-500">{h.rating}</span>
                    </div>
                    <h4 className="text-[10px] font-black text-slate-900 dark:text-white truncate">{h.name}</h4>
                    <div className="flex justify-between items-center pt-1 border-t">
                      <span className="text-xs font-black text-cyan-600">{h.price}</span>
                      <button onClick={() => addToast(`Hotel booking request sent!`, false)} className="px-2.5 py-1 bg-slate-950 text-white dark:bg-slate-800 text-[8px] font-bold rounded">
                        Book Room
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FLIGHTS */}
        {activeTab === 'flights' && (
          <div className="space-y-6 text-left max-w-4xl mx-auto">
            <h2 className="text-xl font-black">Search Airport Flights & Airfare</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 border p-4 rounded-2xl">
              <div>
                <label className="text-[9px] font-black uppercase text-slate-500">From (City)</label>
                <input
                  type="text"
                  value={flightFrom}
                  onChange={e => setFlightFrom(e.target.value)}
                  placeholder="Delhi"
                  className="w-full bg-slate-50 border rounded-lg px-3 py-2 text-xs outline-none dark:bg-slate-950 dark:border-slate-800"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-slate-500">To (City)</label>
                <input
                  type="text"
                  value={flightTo}
                  onChange={e => setFlightTo(e.target.value)}
                  placeholder="Bali"
                  className="w-full bg-slate-50 border rounded-lg px-3 py-2 text-xs outline-none dark:bg-slate-950 dark:border-slate-800"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSearchFlights}
                  className="w-full py-2.5 text-white text-xs font-black rounded-xl"
                  style={{ backgroundColor: activeColor }}
                >
                  Search Flights 🛫
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              {(flightResults.length > 0 ? flightResults : flights).map(f => (
                <div key={f.id} className="bg-white dark:bg-slate-900 border p-4 rounded-2xl flex flex-wrap justify-between items-center shadow-sm">
                  <div className="text-left space-y-1">
                    <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black uppercase">{f.airline}</span>
                    <div className="flex items-center gap-3 text-xs font-black">
                      <span>{f.from}</span>
                      <span className="text-slate-350">⟶</span>
                      <span>{f.to}</span>
                    </div>
                    <p className="text-[9px] text-slate-400">Schedule: {f.time}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <span className="text-xs font-black block text-emerald-600">₹{f.price.toLocaleString()}</span>
                    <button onClick={() => addToast('Flight ticket seat reserved!', false)} className="px-4 py-1.5 text-white text-[9px] font-black uppercase rounded-lg" style={{ backgroundColor: activeColor }}>
                      Select Seat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: VISA */}
        {activeTab === 'visa' && (
          <div className="max-w-2xl mx-auto text-left space-y-6">
            <h2 className="text-xl font-black">Visa Consultation & Application Intake</h2>
            <p className="text-xs text-slate-500 leading-relaxed">Submit your visa files online for pre-screening. Our agents review document compliance before booking consular appointments.</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              addToast('Visa application files successfully submitted for consul review!', false);
              setVisaDocsUploaded(true);
            }} className="bg-white dark:bg-slate-900 border p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Visa Category</label>
                  <select
                    value={visaType}
                    onChange={e => setVisaType(e.target.value)}
                    className="w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-950 dark:border-slate-800 cursor-pointer"
                  >
                    <option value="Tourist">Tourist Visa (C-type)</option>
                    <option value="Business">Business Entry Visa</option>
                    <option value="Student">Student/Academic Visa</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Consular Country</label>
                  <input
                    type="text"
                    value={visaCountry}
                    onChange={e => setVisaCountry(e.target.value)}
                    placeholder="Schengen Area / USA / UK"
                    className="w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-950 dark:border-slate-800"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase block">Passport Bio Page (PDF/JPG Mock)</label>
                  <div className="border border-dashed border-slate-300 dark:border-slate-700 p-4 rounded-xl text-center cursor-pointer hover:bg-slate-50/50">
                    <span className="text-lg">📄</span>
                    <p className="text-[9px] text-slate-400 font-bold mt-1">Click to simulate passport upload</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <div className="text-left">
                  <span className="text-[9px] text-slate-400 block">Estimated Consul Fee</span>
                  <span className="text-xs font-black text-slate-950 dark:text-white">₹8,500</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-white text-xs font-black rounded-xl shadow-lg border-none cursor-pointer"
                  style={{ backgroundColor: activeColor }}
                >
                  Submit Application for Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 7: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 text-left">
            <h2 className="text-xl font-black">Wanderlust Holiday Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=80'
              ].map((img, idx) => (
                <div key={idx} className="h-48 rounded-2xl overflow-hidden shadow-sm group">
                  <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: BLOG */}
        {activeTab === 'blog' && (
          <div className="space-y-6 text-left max-w-4xl mx-auto">
            <h2 className="text-xl font-black">Travel Logs & Vacation Diaries</h2>
            <div className="space-y-6">
              {[
                { title: '10 Essential Tips for Backpacking Europe Solo', date: 'June 18, 2026', desc: 'From train pass calculations to booking budget hostels, here is what you need to know before boarding.', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&auto=format&fit=crop&q=80' },
                { title: 'Choosing the Perfect Resort Stay in Seminyak Bali', date: 'May 24, 2026', desc: 'A comparative review of private pool villas vs oceanfront hotel suites near the beach markets.', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80' }
              ].map((b, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border rounded-3xl overflow-hidden shadow-sm flex flex-col sm:flex-row gap-4 p-4">
                  <img src={b.img} className="w-full sm:w-44 h-32 object-cover rounded-xl" />
                  <div className="space-y-2 flex flex-col justify-center">
                    <span className="text-[8px] font-bold text-slate-400">{b.date}</span>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white leading-snug">{b.title}</h4>
                    <p className="text-[9px] text-slate-500 leading-normal">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: CONTACT */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div className="space-y-5">
              <h2 className="text-xl font-black">Get in Touch with our Agents</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Contact our customer support desks for help with itinerary customizations, bulk booking flights, or visa appointment changes.
              </p>
              
              <div className="space-y-3 text-xs">
                <div>
                  <h5 className="font-extrabold text-slate-400 uppercase text-[9px]">🏢 Office Headquarters</h5>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{travelConfig?.address || '123 Travel Chambers, CP, Delhi'}</p>
                </div>
                <div>
                  <h5 className="font-extrabold text-slate-400 uppercase text-[9px]">📞 Phone Desk</h5>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{travelConfig?.phoneNo || '+91 98765 43210'}</p>
                </div>
                <div>
                  <h5 className="font-extrabold text-slate-400 uppercase text-[9px]">📧 Email Inbox</h5>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{travelConfig?.email || 'support@travelagency.com'}</p>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              addToast('Query message successfully sent to agents!', false);
            }} className="bg-white dark:bg-slate-900 border p-6 rounded-3xl space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider">Leave a Message</h4>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Your Name</label>
                <input type="text" required className="w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Your Email</label>
                <input type="email" required className="w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Message Inquiry</label>
                <textarea rows={3} required className="w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs outline-none resize-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>
              <button type="submit" className="w-full py-2.5 text-white text-xs font-black rounded-xl uppercase tracking-wider" style={{ backgroundColor: activeColor }}>
                Send Inquiry
              </button>
            </form>
          </div>
        )}

      </main>

      {/* 3. Package Detail Itinerary Modal overlay */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-950 border rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col text-left shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="font-black text-sm">{selectedPackage.name}</h3>
              <button onClick={() => setSelectedPackage(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full text-lg cursor-pointer bg-transparent border-none">✕</button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              <img src={selectedPackage.image} className="w-full h-56 object-cover rounded-2xl shadow-inner" />
              
              <div className="flex justify-between items-center text-xs border-b pb-3">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-black block">Price per tourist</span>
                  <span className="text-sm font-black text-emerald-600">₹{selectedPackage.price.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-black block">Duration</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">📅 {selectedPackage.duration}</span>
                </div>
                <div className="flex gap-2">
                  {selectedPackage.flightIncluded && <span className="bg-cyan-50 text-cyan-700 text-[8px] font-black uppercase px-2 py-1 rounded">✈️ Flight Included</span>}
                  {selectedPackage.guideIncluded && <span className="bg-emerald-50 text-emerald-700 text-[8px] font-black uppercase px-2 py-1 rounded">🗺️ Guide Included</span>}
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[10px] font-black uppercase text-slate-400">About Tour</h4>
                <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">{selectedPackage.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1.5">📦 Inclusions</h4>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">{selectedPackage.inclusions}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1.5">✕ Exclusions</h4>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">{selectedPackage.exclusions}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase text-slate-400">Day-wise Itinerary Map</h4>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-normal font-semibold whitespace-pre-line">{selectedPackage.itinerary}</p>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <button onClick={() => setSelectedPackage(null)} className="px-4 py-2 border rounded-xl text-xs font-bold">Cancel</button>
              <button
                onClick={() => {
                  handleBookNow(selectedPackage);
                  setSelectedPackage(null);
                }}
                className="px-6 py-2 text-white text-xs font-black rounded-xl uppercase tracking-wider"
                style={{ backgroundColor: activeColor }}
              >
                Book Package Now ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Checkout Payment Modal */}
      {isCheckoutOpen && bookingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleConfirmPayment} className="bg-white dark:bg-slate-950 border rounded-3xl w-full max-w-md overflow-hidden flex flex-col text-left shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="font-black text-sm">Secure Booking Checkout</h3>
              <button type="button" onClick={() => setIsCheckoutOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full text-lg cursor-pointer bg-transparent border-none">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border text-xs">
                <h4 className="font-extrabold text-[10px] text-slate-400">Selected Package</h4>
                <p className="font-black text-slate-800 dark:text-white">{bookingPackage.name}</p>
                <div className="flex justify-between items-center mt-2 border-t pt-2 font-black">
                  <span>Price per Head:</span>
                  <span className="text-cyan-600">₹{(bookingPackage.price * (1 - (bookingPackage.discount / 100))).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Lead Customer Name *</label>
                <input type="text" required value={bookingName} onChange={e => setBookingName(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Contact Email *</label>
                <input type="email" required value={bookingEmail} onChange={e => setBookingEmail(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Phone Number *</label>
                <input type="text" required value={bookingPhone} onChange={e => setBookingPhone(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Travel Date *</label>
                  <input type="date" required value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-2.5 py-1.5 text-xs outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white cursor-pointer" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Guests Count</label>
                  <input type="number" min="1" max="10" required value={guestsCount} onChange={e => setGuestsCount(parseInt(e.target.value, 10))} className="w-full bg-slate-50 border rounded-xl px-2.5 py-1.5 text-xs outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white" />
                </div>
              </div>

              {/* Mock Credit Card fields */}
              <div className="border-t pt-3 mt-2 space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase block">💳 Debit/Credit Card Info</label>
                <input type="text" placeholder="4111 2222 3333 4444" required className="w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs outline-none dark:bg-slate-900 dark:border-slate-800" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="MM/YY" required className="w-full bg-slate-50 border rounded-xl px-3 py-1.5 text-xs outline-none dark:bg-slate-900 dark:border-slate-800" />
                  <input type="password" placeholder="CVV" required className="w-full bg-slate-50 border rounded-xl px-3 py-1.5 text-xs outline-none dark:bg-slate-900 dark:border-slate-800" />
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-between items-center bg-slate-50 dark:bg-slate-900">
              <div className="text-left">
                <span className="text-[8px] text-slate-400 block font-bold">Total Payment</span>
                <span className="text-xs font-black text-slate-900 dark:text-white">₹{(bookingPackage.price * guestsCount * (1 - (bookingPackage.discount / 100))).toLocaleString()}</span>
              </div>
              <button
                type="submit"
                className="px-6 py-2 text-white text-xs font-black rounded-xl uppercase tracking-wider border-none cursor-pointer"
                style={{ backgroundColor: activeColor }}
              >
                Pay & Book Now
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t dark:border-slate-900 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p>© 2026 {travelConfig?.businessName || project.name} Agency. Powered by ZATBIZ Platform.</p>
          <p className="text-[9px] text-slate-500">Subcategory: {travelConfig?.subcategory || 'Domestic Travel'} | GST: {travelConfig?.gstNumber || 'N/A'}</p>
        </div>
      </footer>

    </div>
  );
}
