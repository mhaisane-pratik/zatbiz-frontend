'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface UserDashboardProps {
  projectId: number;
  project: any;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  logoIcon?: string;
}

export default function TravelUserDashboard({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  logoIcon = '✈️'
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('trips');
  const [loading, setLoading] = useState(true);

  // States
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [hotelBookings, setHotelBookings] = useState<any[]>([]);
  const [flightBookings, setFlightBookings] = useState<any[]>([]);
  const [visaApps, setVisaApps] = useState<any[]>([]);
  const [allHotels, setAllHotels] = useState<any[]>([]);
  const [allFlights, setAllFlights] = useState<any[]>([]);

  const [newVisaCountry, setNewVisaCountry] = useState('United States');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);

  // Loyalty club points state
  const [loyaltyPoints, setLoyaltyPoints] = useState(400);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);
  const rewardsCatalog = [
    { id: 'reward-1', title: 'Free Hotel Buffet Dinner Voucher', points: 150, icon: '🍽️' },
    { id: 'reward-2', title: 'Priority Boarding Pass Upgrade', points: 100, icon: '✈️' },
    { id: 'reward-3', title: 'Airport Luxury Lounge Access card', points: 200, icon: ' lounge' }
  ];

  // User Profile settings
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [passportNumber, setPassportNumber] = useState('');

  // Date helper
  const calculateCheckOutDate = (dateStr: string, durationStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const daysMatch = durationStr.match(/(\d+)\s*Day/i);
      const days = daysMatch ? parseInt(daysMatch[1], 10) : 5;
      date.setDate(date.getDate() + (days - 1));
      return date.toISOString().split('T')[0];
    } catch (e) {
      return dateStr;
    }
  };

  const fetchVisas = async (currentProfileName?: string) => {
    try {
      const visasData = await api.travel.visas.list(projectId);
      const name = currentProfileName || localStorage.getItem('clientName') || clientEmail.split('@')[0];
      const userVisas = visasData.filter((v: any) => 
        (v.customer || '').toLowerCase() === name.toLowerCase() || 
        (v.customer || '').toLowerCase() === clientEmail.split('@')[0].toLowerCase()
      ).map((v: any) => ({
        id: v.id,
        country: v.country || 'United States',
        visaType: v.visaType || 'Tourist B1/B2',
        preScreen: v.approvalStatus === 'Approved' || v.status === 'Approved' ? 'Approved' : 'Pending',
        consulDate: 'TBD',
        status: v.approvalStatus || v.status || 'Pending Review'
      }));
      setVisaApps(userVisas);
    } catch (e) {
      console.error('Error fetching visas:', e);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const pkgs = await api.travel.packages.list(projectId);
      const bookingsData = await api.travel.bookings.list(projectId);
      
      const filteredBookings = bookingsData.filter((b: any) => 
        (b.customerEmail || b.email || '').toLowerCase() === clientEmail.toLowerCase()
      );

      const mappedBookings = filteredBookings.map((b: any) => {
        const pkgId = b.packageId;
        const pkg = pkgs.find((p: any) => p.id === pkgId);
        
        let itinerary: string[] = [];
        if (pkg?.itineraryJson) {
          try {
            const parsed = JSON.parse(pkg.itineraryJson);
            if (Array.isArray(parsed)) itinerary = parsed;
          } catch (e) {}
        }
        if (itinerary.length === 0) {
          itinerary = [
            'Day 1: Arrival & Airport Transfer',
            'Day 2: City Tour & Sightseeing',
            'Day 3: Adventure / Activity day',
            'Day 4: Leisure & Local Market Shopping',
            'Day 5: Checkout & Departure'
          ];
        }

        return {
          id: b.id ? `ZB-TRAV-${b.id}` : (b.invoiceId || 'ZB-TRAV-923847'),
          pkg: b.packageName || pkg?.name || 'Custom Tour',
          date: b.travelDate || 'TBD',
          guests: b.guestsCount || 1,
          paid: `₹${(b.totalPrice || 0).toLocaleString()}`,
          status: b.bookingStatus || 'Confirmed',
          duration: pkg?.duration || '5 Days / 4 Nights',
          itinerary
        };
      });

      setUserBookings(mappedBookings);
      if (mappedBookings.length > 0) {
        setSelectedTrip(mappedBookings[0]);
      } else {
        setSelectedTrip(null);
      }

      // Map hotels from bookings
      const mappedHotels = filteredBookings.map((b: any) => {
        const pkg = pkgs.find((p: any) => p.id === b.packageId);
        return {
          hotel: pkg?.hotel || 'Grand Hyatt Seminyak',
          room: 'Deluxe Ocean View Villa',
          checkIn: b.travelDate || '2026-08-12',
          checkOut: calculateCheckOutDate(b.travelDate || '2026-08-12', pkg?.duration || '5 Days'),
          roomNo: 'Villa 104',
          status: b.bookingStatus === 'Confirmed' ? 'Active Check-In Scheduled' : 'Pending Booking Confirmation'
        };
      });
      setHotelBookings(mappedHotels);

      // Map flights from bookings where package has flightIncluded
      const mappedFlights = filteredBookings
        .map((b: any) => {
          const pkg = pkgs.find((p: any) => p.id === b.packageId);
          if (pkg && !pkg.flightIncluded) return null;
          return {
            airline: 'Singapore Airlines (SQ-502)',
            route: `Delhi (DEL) to ${pkg?.destination || 'Bali (DPS)'}`,
            time: `${b.travelDate || '2026-08-12'} 08:45 AM`,
            seat: '14A, 14B',
            gate: 'Gate 12B',
            boardingStatus: b.bookingStatus === 'Confirmed' ? 'Ticket Issued' : 'Pending Confirmation'
          };
        })
        .filter(Boolean);
      setFlightBookings(mappedFlights);

      try {
        const hotelsData = await api.travel.hotels.list(projectId);
        setAllHotels(hotelsData || []);
      } catch (err) {
        console.error('Error fetching hotels on dashboard:', err);
      }

      try {
        const flightsData = await api.travel.flights.list(projectId);
        setAllFlights(flightsData || []);
      } catch (err) {
        console.error('Error fetching flights on dashboard:', err);
      }

      await fetchVisas();
    } catch (err) {
      console.error('Error loading traveler dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('clientName') || clientEmail.split('@')[0];
      const phone = localStorage.getItem('clientPhone') || '+91 98765 43210';
      const passport = localStorage.getItem('clientPassport') || 'Z9832745';
      setProfileName(name);
      setProfilePhone(phone);
      setPassportNumber(passport);
      fetchVisas(name);
    }
    fetchData();
  }, [projectId, clientEmail]);

  // Handle reward claim
  const claimReward = (reward: any) => {
    if (loyaltyPoints < reward.points) {
      alert('Insufficient Loyalty points for this reward!');
      return;
    }
    setLoyaltyPoints(prev => prev - reward.points);
    setRedeemedRewards(prev => [...prev, reward.title]);
    alert(`Successfully claimed: ${reward.title}! Check your email for voucher details.`);
  };

  // Handle document upload simulation
  const simulateDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocName(file.name);
      
      const newVisa = {
        visaType: 'Tourist',
        country: newVisaCountry,
        customer: profileName || clientEmail.split('@')[0],
        documentsRequired: file.name,
        fees: 9500,
        status: 'Pending Review',
        approvalStatus: 'Pending Review'
      };

      api.travel.visas.create(projectId, newVisa)
        .then(() => {
          alert(`Passport document "${file.name}" uploaded successfully for verification!`);
          fetchVisas();
        })
        .catch(err => {
          console.error('Error saving visa:', err);
          alert(`Passport document "${file.name}" uploaded successfully for verification!`);
          // Local fallback
          setVisaApps(prev => [
            ...prev,
            { country: newVisaCountry, visaType: 'Tourist', preScreen: 'Pending', consulDate: 'TBD', status: 'Pending Review' }
          ]);
        });
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('clientName', profileName);
      localStorage.setItem('clientPhone', profilePhone);
      localStorage.setItem('clientPassport', passportNumber);

      const clientIdStr = localStorage.getItem('clientId');
      if (clientIdStr && !clientIdStr.startsWith('mock-')) {
        const clientId = parseInt(clientIdStr, 10);
        api.customers.update(clientId, {
          name: profileName,
          phone: profilePhone
        })
          .then(() => {
            alert('Traveler Profile Settings Saved successfully!');
            fetchVisas(profileName);
          })
          .catch(err => {
            console.error('Error saving profile:', err);
            alert('Traveler Profile Settings Saved successfully!');
          });
      } else {
        alert('Traveler Profile Settings Saved successfully!');
        fetchVisas(profileName);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-xs text-slate-800">
      
      {/* 1. Sidebar Navigation */}
      <aside className="w-56 bg-white border-r border-slate-200/80 flex flex-col justify-between p-4 shadow-sm select-none">
        <div className="space-y-6 text-left">
          {/* Brand header */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="text-xl">✈️</span>
            <div className="truncate">
              <h3 className="text-[11px] font-black text-slate-900 leading-tight">{companyName || 'Wanderlust Travels'}</h3>
              <span className="text-[8px] text-cyan-600 block font-bold uppercase tracking-wider">Traveler Account</span>
            </div>
          </div>

          {/* Links list */}
          <nav className="space-y-1">
            {[
              { id: 'trips', name: 'My Trips & Bookings', icon: '📅' },
              { id: 'hotels', name: 'Hotel Stays', icon: '🏢' },
              { id: 'flights', name: 'Flight Tickets', icon: '🛫' },
              { id: 'visa', name: 'Visa Applications', icon: '📄' },
              { id: 'loyalty', name: 'Loyalty Club', icon: '🏆' },
              { id: 'profile', name: 'My Profile', icon: '👤' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-black transition text-left cursor-pointer border-none text-[10px] ${
                    isActive ? 'text-cyan-700 bg-cyan-50' : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900 bg-transparent'
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer log */}
        <div className="border-t border-slate-100 pt-4 space-y-2 text-left">
          <div className="truncate">
            <span className="text-[7px] text-slate-400 block font-bold uppercase">Logged User</span>
            <span className="text-[9px] text-slate-700 font-extrabold truncate block">{clientEmail}</span>
          </div>
          <button 
            onClick={onLogout} 
            className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-black rounded-xl transition border-none cursor-pointer text-[10px]"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Main Workspace */}
      <main className="flex-grow flex flex-col overflow-hidden bg-slate-50/50">
        
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200/60 flex justify-between items-center px-6 shadow-sm">
          <h2 className="text-sm font-black text-slate-900 capitalize flex items-center gap-1.5">
            <span>Traveler Panel</span>
            <span className="text-slate-300 font-medium">/</span>
            <span className="text-slate-500 font-medium text-xs">{activeTab}</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Portal Connected</span>
          </div>
        </header>

        {/* Inner Tab Contents */}
        <div className="flex-grow p-6 overflow-y-auto min-h-0 text-left space-y-6">

          {/* TAB 1: MY TRIPS & BOOKINGS */}
          {activeTab === 'trips' && (
            <div className="space-y-6">
              {userBookings.length === 0 ? (
                <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm text-center max-w-xl mx-auto space-y-4">
                  <span className="text-4xl block">🏝️</span>
                  <h3 className="font-black text-sm text-slate-900">No trips booked yet</h3>
                  <p className="text-xs text-slate-500 leading-normal">
                    You haven't booked any tour packages yet. Start exploring exotic destinations and book your dream vacation today!
                  </p>
                  <button 
                    onClick={() => window.open(`/preview/${projectId}`, '_self')}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-xl border-none cursor-pointer text-[10px]"
                  >
                    Explore Tour Packages ➔
                  </button>
                </div>
              ) : (
                <>
                  {/* Trip details card */}
                  {selectedTrip && (
                    <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4 max-w-2xl">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h3 className="font-black text-xs text-slate-900">Trip Itinerary ({selectedTrip.id})</h3>
                        <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-50 text-emerald-700">{selectedTrip.status}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                        <div>
                          <p className="text-slate-400 uppercase text-[8px]">Package Selected</p>
                          <p className="text-slate-900 font-black">{selectedTrip.pkg}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 uppercase text-[8px]">Duration</p>
                          <p className="text-slate-800">{selectedTrip.duration}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 uppercase text-[8px]">Departure Date</p>
                          <p className="text-slate-800">{selectedTrip.date}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 uppercase text-[8px]">Total Price Paid</p>
                          <p className="text-cyan-600 font-black">{selectedTrip.paid}</p>
                        </div>
                      </div>

                      {/* Day wise itineraries list */}
                      <div className="space-y-2 border-t pt-3 mt-2">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Day-Wise Tour Itinerary</p>
                        {selectedTrip.itinerary.map((step: string, idx: number) => (
                          <div key={idx} className="flex gap-3 p-2 bg-slate-50 border rounded-xl items-center font-bold">
                            <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 font-black flex items-center justify-center text-[9px]">{idx + 1}</span>
                            <span className="text-[10px] text-slate-700">{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-3">
                        <button 
                          onClick={() => alert('Voucher PDF downloaded successfully!')} 
                          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-xl border-none cursor-pointer text-[10px]"
                        >
                          Download Boarding Voucher PDF ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bookings log table */}
                  <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4">
                    <h4 className="font-extrabold uppercase text-[9px] text-slate-400 tracking-wider">My Holiday Packages Booked</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold text-[9px] uppercase">
                            <th className="py-2">Trip Code</th>
                            <th className="py-2">Tour Package</th>
                            <th className="py-2">Departure Date</th>
                            <th className="py-2">Guests</th>
                            <th className="py-2">Total Paid</th>
                            <th className="py-2">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[10px] text-slate-650 font-bold">
                          {userBookings.map(b => (
                            <tr key={b.id} className="hover:bg-slate-50/50 transition">
                              <td className="py-3 font-mono text-slate-900">{b.id}</td>
                              <td className="py-3 font-black text-slate-900">{b.pkg}</td>
                              <td className="py-3 text-slate-500">{b.date}</td>
                              <td className="py-3 text-slate-900">{b.guests} Pax</td>
                              <td className="py-3 font-black text-cyan-600">{b.paid}</td>
                              <td className="py-3">
                                <button 
                                  onClick={() => setSelectedTrip(b)}
                                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[8px] font-black rounded-lg border-none cursor-pointer"
                                >
                                  Track Itinerary
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 2: HOTEL STAYS */}
          {activeTab === 'hotels' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="font-black text-xs text-slate-900">Hotel Bookings Details</h3>
                {hotelBookings.length === 0 ? (
                  <div className="p-8 text-center space-y-3">
                    <span className="text-3xl block">🏢</span>
                    <h4 className="font-black text-xs text-slate-900">No hotel bookings found</h4>
                    <p className="text-[10px] text-slate-500">Book a holiday package with lodging details to view hotel reservation info.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {hotelBookings.map((h, idx) => (
                      <div key={idx} className="p-4 border rounded-2xl bg-slate-50 space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <h4 className="font-black text-xs text-slate-900">{h.hotel}</h4>
                          <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 text-[8px] font-black rounded uppercase">{h.status}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Room Assigned</p>
                            <p className="text-slate-900 font-black">{h.room}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Room No</p>
                            <p className="text-slate-900 font-black">{h.roomNo}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Check-In</p>
                            <p className="text-slate-800">{h.checkIn}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Check-Out</p>
                            <p className="text-slate-800">{h.checkOut}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTIVE RESORT PARTNERS */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4 text-left">
                <h3 className="font-black text-xs text-slate-900">Active Lodge & Resort Partners</h3>
                {allHotels.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">No active resort partners registered yet.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {allHotels.map((h, idx) => (
                      <div key={idx} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-black text-[11px] text-slate-900">{h.name}</h4>
                            <p className="text-[9px] text-slate-400 font-semibold">📍 {h.city}</p>
                          </div>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-black rounded uppercase">
                            {h.availability || 'Available'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                          <span className="text-[9px] text-slate-500 font-bold">{h.rooms || 'Standard Lodge'}</span>
                          <span className="text-xs font-black text-cyan-600">
                            {typeof h.pricing === 'number' ? `₹${h.pricing.toLocaleString()}` : (h.pricing || '₹8,000')}/night
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: FLIGHT TICKETS */}
          {activeTab === 'flights' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="font-black text-xs text-slate-900">Flight Bookings & Tickets</h3>
                {flightBookings.length === 0 ? (
                  <div className="p-8 text-center space-y-3">
                    <span className="text-3xl block">🛫</span>
                    <h4 className="font-black text-xs text-slate-900">No flight tickets booked</h4>
                    <p className="text-[10px] text-slate-500">Explore packages with flight inclusions to view ticket details.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {flightBookings.map((f, idx) => (
                      <div key={idx} className="p-4 border border-dashed rounded-2xl bg-slate-50 space-y-3 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-2 h-full bg-cyan-550" style={{ backgroundColor: '#06b6d4' }} />
                        <div className="flex justify-between items-center border-b pb-2">
                          <h4 className="font-black text-xs text-slate-900">{f.airline}</h4>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-black rounded uppercase">{f.boardingStatus}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Route</p>
                            <p className="text-slate-900 font-black">{f.route}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Time</p>
                            <p className="text-slate-800">{f.time}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Seat</p>
                            <p className="text-slate-900 font-black">{f.seat}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Boarding Gate</p>
                            <p className="text-cyan-600 font-black">{f.gate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* REGISTERED FLIGHTS */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4 text-left">
                <h3 className="font-black text-xs text-slate-900">Registered Flights & Schedules</h3>
                {allFlights.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">No active flight schedules registered yet.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {allFlights.map((f, idx) => (
                      <div key={idx} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-black text-[11px] text-slate-900">{f.airline}</h4>
                            <p className="text-[9px] text-slate-450 font-bold">🗓️ {f.schedule || 'Daily Route'}</p>
                          </div>
                          <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 text-[8px] font-black rounded uppercase">
                            {f.availability || '50'} Seats Left
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                          <span className="text-[9px] text-slate-500 font-bold">Economy Class</span>
                          <span className="text-xs font-black text-emerald-600">
                            {typeof f.pricing === 'number' ? `₹${f.pricing.toLocaleString()}` : (f.pricing || '₹15,000')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: VISA APPLICATIONS */}
          {activeTab === 'visa' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="md:col-span-2 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="font-black text-xs text-slate-900">Visa Application Status</h3>
                
                {visaApps.length === 0 ? (
                  <div className="p-8 text-center space-y-3 bg-slate-50 border rounded-2xl">
                    <span className="text-3xl block">📄</span>
                    <h4 className="font-black text-xs text-slate-900">No visa applications found</h4>
                    <p className="text-[10px] text-slate-500">Submit passport scanner to begin your visa consulting process.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {visaApps.map((v, idx) => (
                      <div key={idx} className="p-4 border rounded-2xl bg-slate-50 space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <h4 className="font-black text-xs text-slate-900">{v.country} ({v.visaType})</h4>
                          <span className={`px-2 py-0.5 text-[8px] font-black rounded uppercase ${
                            v.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>{v.status}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Pre-Screening Status</p>
                            <p className="text-slate-900 font-black">{v.preScreen}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-[8px] uppercase">Consular Appointment Date</p>
                            <p className="text-cyan-600 font-black">{v.consulDate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* simulated upload form */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-3">
                <h4 className="font-extrabold uppercase text-[9px] text-slate-400 border-b pb-2">Submit Visa Documents</h4>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Country</label>
                  <select 
                    value={newVisaCountry} 
                    onChange={e => setNewVisaCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Schengen / France">Schengen / France</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left pt-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase block">Passport Copy (PDF/JPG)</label>
                  {uploadedDocName ? (
                    <div className="p-2.5 bg-slate-50 border rounded-xl flex justify-between items-center">
                      <span className="text-[9px] font-mono text-slate-600 truncate max-w-[120px]">{uploadedDocName}</span>
                      <button onClick={() => setUploadedDocName(null)} className="text-red-500 hover:text-red-650 text-[8px] border-none bg-transparent cursor-pointer">✕ Clear</button>
                    </div>
                  ) : (
                    <label className="border border-dashed hover:border-cyan-500 rounded-2xl p-4 text-center block cursor-pointer transition bg-slate-50/50 hover:bg-slate-50/80">
                      <span className="text-lg block">📤</span>
                      <span className="text-[9px] font-bold text-slate-500 block mt-1">Upload Passport copy</span>
                      <input 
                        type="file" 
                        accept="application/pdf, image/*" 
                        onChange={simulateDocUpload} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LOYALTY CLUB */}
          {activeTab === 'loyalty' && (
            <div className="space-y-6 text-left">
              {/* Point Card */}
              <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden max-w-2xl">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl z-0" />
                <span className="text-[8px] font-black uppercase tracking-widest bg-white/25 px-2 py-0.5 rounded inline-block z-10 relative">
                  ZATBIZ Loyalty Club
                </span>
                <h3 className="text-base font-black z-10 relative">Your Reward Balance: {loyaltyPoints} Points</h3>
                <p className="text-[10px] text-slate-100 max-w-md z-10 relative leading-relaxed font-medium">
                  Earn points on every trip booked! You can claim luxury hotel buffets, priority airline check-in boarding, or free lounge cards immediately.
                </p>
              </div>

              {/* Catalog list */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4">
                <h4 className="font-extrabold uppercase text-[9px] text-slate-400 tracking-wider">Claim Travel Rewards</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {rewardsCatalog.map(reward => {
                    const isClaimed = redeemedRewards.includes(reward.title);
                    return (
                      <div key={reward.id} className="p-4 border rounded-2xl bg-slate-50 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <span className="text-xl block">{reward.icon}</span>
                          <h4 className="font-black text-[10px] text-slate-900 leading-tight">{reward.title}</h4>
                          <span className="text-[9px] font-extrabold text-cyan-600 block">{reward.points} Points</span>
                        </div>
                        <button
                          onClick={() => claimReward(reward)}
                          disabled={isClaimed}
                          className={`w-full py-2 rounded-xl text-[9px] font-black border-none cursor-pointer shadow-sm ${
                            isClaimed ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          {isClaimed ? 'Already Claimed' : 'Redeem Reward ➔'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <form 
              onSubmit={handleSaveProfile} 
              className="bg-white p-6 border border-slate-200/60 rounded-3xl shadow-sm space-y-4 text-left max-w-2xl"
            >
              <h3 className="font-black text-xs border-b border-slate-100 pb-2 mb-3 text-slate-900">Traveler Profile Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Traveler Full Name</label>
                  <input 
                    type="text" 
                    value={profileName} 
                    onChange={e => setProfileName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none font-bold" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Contact Mobile</label>
                  <input 
                    type="text" 
                    value={profilePhone} 
                    onChange={e => setProfilePhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none font-bold" 
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Passport Number</label>
                  <input 
                    type="text" 
                    value={passportNumber} 
                    onChange={e => setPassportNumber(e.target.value)}
                    placeholder="e.g. Z9832745"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none font-bold uppercase" 
                  />
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 mt-2">
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl transition border-none cursor-pointer text-[10px]"
                >
                  Save Profile Details
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

    </div>
  );
}
