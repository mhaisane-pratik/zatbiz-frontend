'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Destination {
  id: string;
  title: string;
  price: number;
  duration: string;
  region: 'europe' | 'asia' | 'america';
  image: string;
}

export default function TravelTemplate() {
  const [filterRegion, setFilterRegion] = useState<'all' | 'europe' | 'asia' | 'america'>('all');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const destinations: Destination[] = [
    {
      id: 'd1',
      title: 'Romantic Amalfi Coast',
      price: 1299,
      duration: '7 Days',
      region: 'europe',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'd2',
      title: 'Kyoto Saffron Temples',
      price: 1450,
      duration: '9 Days',
      region: 'asia',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'd3',
      title: 'Patagonia Hiking Trails',
      price: 1899,
      duration: '10 Days',
      region: 'america',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="bg-[#f0f9ff] text-[#0369a1] min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-sky-100">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-sky-650 hover:opacity-90 font-medium text-sky-650 text-sky-600">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500 font-bold">explore</span>
            <span className="text-xl font-bold tracking-tight text-slate-800">Terra Travel</span>
          </div>
          <a href="#booking" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-all">
            Plan A Trip
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1 rounded text-orange-600 font-semibold text-xs uppercase tracking-wider">
            Adventure Awaits
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Explore the World <br />
            <span className="text-orange-500">With Experienced Guides</span>
          </h1>
          <p className="text-slate-500 font-light leading-relaxed max-w-lg">
            Create memorable stories with our custom travel packages. From private beachfront villas in Italy to temple walks in Japan and high-altitude hiking paths in Argentina.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#destinations" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded shadow-lg shadow-orange-500/20 transition-all">
              See Packages
            </a>
            <a href="#booking" className="bg-white hover:bg-slate-50 text-sky-650 border border-sky-200 font-semibold text-sm px-6 py-3 rounded transition-all text-sky-600">
              Get Custom Quote
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-sky-200 rounded blur-3xl -z-10 opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80" 
            alt="Scenic tropical beach" 
            className="w-full max-w-[500px] mx-auto rounded shadow-xl object-cover aspect-[4/3] border border-sky-100"
          />
        </div>
      </section>

      {/* Destinations Filter */}
      <section id="destinations" className="bg-white py-20 px-6 border-y border-sky-100">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-orange-500 font-semibold">Special Packages</span>
            <h2 className="text-3xl font-bold text-slate-900">Popular Destinations</h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded"></div>
          </div>

          <div className="flex justify-center gap-4 mb-10">
            {['all', 'europe', 'asia', 'america'].map((reg) => (
              <button 
                key={reg}
                onClick={() => setFilterRegion(reg as any)}
                className={`px-5 py-2 rounded text-xs font-bold uppercase transition-all border ${
                  filterRegion === reg ? 'bg-orange-500 text-white border-orange-500' : 'bg-transparent text-sky-600 hover:bg-sky-50 border-sky-200'
                }`}
              >
                {reg === 'all' ? 'All regions' : reg}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations
              .filter(d => filterRegion === 'all' || d.region === filterRegion)
              .map(d => (
                <div key={d.id} className="bg-sky-50/50 border border-sky-100 rounded overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
                  <div className="aspect-[4/3] bg-sky-200 overflow-hidden relative">
                    <img src={d.image} alt={d.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-103" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-orange-500 uppercase font-bold tracking-wider">{d.region} • {d.duration}</p>
                      <h4 className="font-bold text-base text-slate-800 leading-tight">{d.title}</h4>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-800 text-lg">${d.price}</span>
                      <a href="#booking" className="bg-sky-600 text-white hover:bg-sky-700 text-[10px] font-bold uppercase py-2.5 px-4 rounded transition-colors">
                        Book Package
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="max-w-4xl mx-auto w-full px-6 py-24">
        <div className="bg-white border border-sky-100 shadow-xl rounded p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-orange-500 font-semibold">Custom Packages</span>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">Request Dynamic Pricing</h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              Tell us your target region and guest count. Our concierge will curate a private itinerary draft.
            </p>
            <div className="space-y-2 text-xs text-slate-650 pt-2 font-light">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-orange-500 text-sm">mail</span> info@terratravel.com</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-orange-500 text-sm">schedule</span> Concierge availability: 24/7</p>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-650 mb-1">Your Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-slate-55 border border-sky-100 rounded py-2 px-3 text-sm focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 text-slate-700 bg-sky-50/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-650 mb-1">Diners / Guests</label>
                <select className="w-full bg-slate-55 border border-sky-100 rounded py-2 px-3 text-sm focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 text-slate-700 bg-sky-50/20">
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="4">4+ Travelers</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-650 mb-1">Target Region</label>
                <select className="w-full bg-slate-55 border border-sky-100 rounded py-2 px-3 text-sm focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 text-slate-700 bg-sky-50/20">
                  <option value="europe">Europe Tour</option>
                  <option value="asia">Asia Discovery</option>
                  <option value="america">Patagonia Adventure</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors">
              Submit Request
            </button>
            {bookingSuccess && (
              <p className="text-center text-xs text-emerald-600 font-semibold pt-1">
                ✓ Request received! We will email you the custom offer shortly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-stone-400 border-t border-slate-800 py-12 w-full mt-auto text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-bold text-white tracking-wide text-base">Terra Travel</h4>
            <p className="text-xs text-slate-500 mt-1">© 2026 Terra Travel Agency. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Concierge</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
