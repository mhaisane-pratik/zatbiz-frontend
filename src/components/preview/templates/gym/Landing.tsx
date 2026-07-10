'use client';

import React, { useState } from 'react';
import { Project, Block, Product } from '@/types';

interface GymLandingProps {
  projectId: number;
  project: Project;
  currentPageBlocks: Block[];
  dbProducts: Product[];
  cartCountQuantity: number;
  customerSession: any;
  openProductDetail: (p: Product) => void;
  handleAddToCart: (p: Product, size?: string, color?: string, qty?: number) => void;
  gymInfo?: any;
}

interface ClassItem {
  id: string;
  category: 'strength' | 'cardio' | 'recovery';
  name: string;
  time: string;
  coach: string;
  level: string;
}

export default function GymLanding({
  projectId,
  project,
  currentPageBlocks,
  dbProducts,
  cartCountQuantity,
  customerSession,
  openProductDetail,
  handleAddToCart,
  gymInfo,
}: GymLandingProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'strength' | 'cardio' | 'recovery'>('all');
  const [tourSuccess, setTourSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const brandName = project?.name || 'Premium Fitness Club';

  const classes: ClassItem[] = [
    {
      id: 'c1',
      category: 'strength',
      name: 'Power Lift & Hypertrophy',
      time: 'Mon, Wed, Fri • 07:00 AM',
      coach: 'Dominic Vane',
      level: 'Advanced'
    },
    {
      id: 'c2',
      category: 'cardio',
      name: 'HIIT Energy Conditioning',
      time: 'Tue, Thu • 09:00 AM',
      coach: 'Elena Rostova',
      level: 'All Levels'
    },
    {
      id: 'c3',
      category: 'recovery',
      name: 'Kinetic Flow & Mobility',
      time: 'Daily • 05:30 PM',
      coach: 'Marcus Aurel',
      level: 'Beginner Friendly'
    },
    {
      id: 'c4',
      category: 'strength',
      name: 'Olympic Lifting Techniques',
      time: 'Saturday • 10:00 AM',
      coach: 'Dominic Vane',
      level: 'Intermediate'
    }
  ];

  const trainers = [
    {
      name: 'Dominic Vane',
      specialty: 'Strength & Kinetics Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
    },
    {
      name: 'Elena Rostova',
      specialty: 'High Performance HIIT Coach',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
    },
    {
      name: 'Marcus Aurel',
      specialty: 'Kinetic Flex & Mobility',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'
    }
  ];

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourSuccess(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setTourSuccess(false), 5000);
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Light Background Decor Blobs */}
      <div className="absolute top-[5%] left-[-150px] w-[500px] h-[500px] rounded-full blur-[100px] -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 100%)" }}></div>
      <div className="absolute bottom-[20%] right-[-150px] w-[500px] h-[500px] rounded-full blur-[100px] -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 100%)" }}></div>

      {/* Header Bar */}
      <header className="w-full z-45 bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-650 text-indigo-600 font-bold text-2xl">sports_gymnastics</span>
            <span className="text-lg font-black tracking-tight text-slate-900 uppercase">
              {brandName.replace(/\s*(website|web application|app)\s*/gi, '')} <span className="text-indigo-600 font-light">FIT</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <a href="#club" className="hover:text-indigo-600 transition-colors">Club Details</a>
            <span className="text-slate-200">|</span>
            <a href="#classes" className="hover:text-indigo-600 transition-colors">Classes</a>
            <span className="text-slate-200">|</span>
            <a href="#trainers" className="hover:text-indigo-600 transition-colors">Instructors</a>
            <span className="text-slate-200">|</span>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Membership</a>
            <span className="text-slate-200">|</span>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>

          <a href="#pricing" className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md">
            Join Club
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 border border-indigo-100 px-3.5 py-1.5 rounded-full bg-indigo-50/50">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest text-indigo-600 font-black">THE AESTHETIX FITNESS PLATFORM</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 uppercase leading-[1.15]">
            Build Your <br />
            Ultimate Strength <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">At {brandName}</span>
          </h1>

          <p className="text-slate-500 text-sm font-light leading-relaxed max-w-lg">
            Experience the future of fitness in a clean, modern, and minimalist environment. We provide custom biometric metrics, Olympic weights, and recovery saunas.
          </p>

          <div className="flex gap-4 pt-2">
            <a href="#pricing" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all">
              Claim Free Pass
            </a>
            <a href="#classes" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all">
              Browse Classes
            </a>
          </div>
        </div>

        {/* Visual elements on right */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Athlete photo */}
          <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xl p-1.5">
            <img 
              src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80" 
              alt="Athlete lifting" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Floating Heart Rate Widget */}
          <div className="absolute top-12 left-0 md:left-6 bg-white/95 border border-slate-200/80 p-4 rounded-xl flex items-center gap-4 shadow-xl backdrop-blur-md animate-bounce" style={{ animationDuration: '6s' }}>
            <span className="material-symbols-outlined text-rose-500 text-3xl font-bold animate-pulse">favorite</span>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Heart Rate</p>
              <h4 className="font-extrabold text-base text-slate-800">116 bpm</h4>
            </div>
          </div>

          {/* Floating Calories Burned Widget */}
          <div className="absolute bottom-12 right-0 md:right-6 bg-white/95 border border-slate-200/80 p-4 rounded-xl flex items-center gap-4 shadow-xl backdrop-blur-md">
            <span className="material-symbols-outlined text-amber-500 text-3xl font-bold">local_fire_department</span>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Calories Burned</p>
              <h4 className="font-extrabold text-base text-slate-800">220 kcal</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Overlapping Info panel */}
      <section className="max-w-5xl mx-auto w-full px-6 relative z-10 -mt-8">
        <div className="bg-white text-slate-900 rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center border border-slate-200/50">
          <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-4 flex flex-col items-center">
            <span className="material-symbols-outlined text-indigo-600 text-2xl font-bold">domain</span>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-850 mt-1">Our Facilities</h4>
            <p className="text-[10px] text-slate-500 font-light max-w-xs">Premium gym layout grids, steam baths, and bio entry lockers.</p>
          </div>
          
          <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:px-4 flex flex-col items-center">
            <span className="material-symbols-outlined text-indigo-600 text-2xl font-bold">badge</span>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-850 mt-1">Expert Trainers</h4>
            <p className="text-[10px] text-slate-500 font-light max-w-xs">Daily progress metrics managed by Olympic weightlifters.</p>
          </div>

          <div className="space-y-2 pt-6 md:pt-0 md:pl-4 flex flex-col items-center">
            <span className="material-symbols-outlined text-indigo-600 text-2xl font-bold">schedule</span>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-850 mt-1">Classes</h4>
            <p className="text-[10px] text-slate-500 font-light max-w-xs">Cardio shred interval schedules, power squats, and recover cycles.</p>
          </div>
        </div>
      </section>

      {/* The Club details */}
      <section id="club" className="max-w-6xl mx-auto w-full px-6 py-28 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-indigo-600 font-bold">The Standard</span>
          <h2 className="text-3xl font-bold uppercase tracking-wide text-slate-900">Modern Training Standard</h2>
          <div className="w-12 h-0.5 bg-indigo-650 bg-indigo-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wide text-slate-800">Peak Performance Mindset</h3>
            <p className="text-slate-500 text-xs font-light leading-relaxed">
              We design spaces that trigger hyper-focus. We exclude unnecessary advertising display panels, supplying only structured weights, turf tracks, and high-frequency sound setups.
            </p>
            <ul className="space-y-3 text-xs text-slate-650 font-medium">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-sm">check</span> Secure Biometric Wrist Access</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-sm">check</span> Cold Plunge & Thermal Finnish Sauna</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-sm">check</span> Custom Beats Audio Environments</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80" className="rounded-xl border border-slate-200 object-cover aspect-[4/3] shadow-md" alt="Cycling room" />
            <img src="https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&auto=format&fit=crop&q=80" className="rounded-xl border border-slate-200 object-cover aspect-[4/3] mt-8 shadow-md" alt="Dumbbells" />
          </div>
        </div>
      </section>

      {/* Classes Timetable */}
      <section id="classes" className="bg-white py-24 px-6 border-y border-slate-200">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-600 font-bold">Timetables</span>
            <h2 className="text-3xl font-bold uppercase tracking-wide text-slate-900">Dynamic Daily Classes</h2>
            <div className="w-12 h-0.5 bg-indigo-650 bg-indigo-600 mx-auto"></div>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-3 mb-10">
            {['all', 'strength', 'cardio', 'recovery'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-wider transition-all border rounded-full ${
                  activeCategory === cat ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-transparent text-slate-500 hover:border-slate-350 border-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </button>
            ))}
          </div>

          {/* Classes Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes
              .filter(c => activeCategory === 'all' || c.category === activeCategory)
              .map(c => (
                <div key={c.id} className="bg-slate-50 border border-slate-200 p-6 rounded-xl hover:border-indigo-500/30 transition-all flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <span className="text-[8px] bg-indigo-550 bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">{c.category}</span>
                    <h4 className="font-bold text-base uppercase tracking-tight text-slate-800 pt-2">{c.name}</h4>
                    <p className="text-[10px] text-slate-500">{c.time}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-6 text-[10px]">
                    <span className="text-slate-400">Coach: {c.coach}</span>
                    <span className="text-indigo-600 font-semibold">{c.level}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Trainers Profiles */}
      <section id="trainers" className="max-w-6xl mx-auto w-full px-6 py-28">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-600 font-bold">Our Coaches</span>
          <h2 className="text-3xl font-bold uppercase tracking-wide text-slate-900">Certified Instructors</h2>
          <div className="w-12 h-0.5 bg-indigo-650 bg-indigo-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((t) => (
            <div key={t.name} className="bg-white border border-slate-200 p-6 rounded-xl text-center shadow-sm hover:border-indigo-500/30 transition-all">
              <div className="w-28 h-28 rounded-full overflow-hidden border border-slate-200 mx-auto mb-4">
                <img src={t.image} className="w-full h-full object-cover" alt={t.name} />
              </div>
              <h4 className="font-bold text-slate-800 uppercase text-base tracking-wide">{t.name}</h4>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">{t.specialty}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Options */}
      <section id="pricing" className="bg-white py-24 px-6 border-y border-slate-200">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-600 font-bold">Rates</span>
            <h2 className="text-3xl font-bold uppercase tracking-wide text-slate-900">Signature Access Plans</h2>
            <div className="w-12 h-0.5 bg-indigo-650 bg-indigo-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1 */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 transition-all">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-500 uppercase tracking-wider text-xs">Standard Access</h3>
                  <p className="text-4xl font-extrabold text-slate-900 mt-2">$ 49<span className="text-xs text-slate-400"> / mo</span></p>
                </div>
                <ul className="space-y-3 text-xs text-slate-500 pt-4 border-t border-slate-200">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> Unlimited gym floor entry</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> Locker room & shower access</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> 1 Free fitness assessment</li>
                </ul>
              </div>
              <button 
                onClick={() => setSelectedPlan('Standard Access')}
                className="w-full bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl border border-slate-200 transition-all mt-8"
              >
                Select Plan
              </button>
            </div>

            {/* Plan 2 */}
            <div className="bg-white border-2 border-indigo-600 p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-lg shadow-indigo-100">
              <div className="absolute right-[-14px] top-[12px] bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest px-6 py-1.5 rotate-45">RECOMMENDED</div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-indigo-600 uppercase tracking-wider text-xs">Elite Club</h3>
                  <p className="text-4xl font-extrabold text-slate-900 mt-2">$ 99<span className="text-xs text-slate-450 text-slate-400"> / mo</span></p>
                </div>
                <ul className="space-y-3 text-xs text-slate-500 pt-4 border-t border-slate-200">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> Full standard privileges</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> Access to all daily group classes</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> Cryo & steam sauna recovery</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> 2 Private coaching sessions / mo</li>
                </ul>
              </div>
              <button 
                onClick={() => setSelectedPlan('Elite Club')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl transition-all mt-8 shadow"
              >
                Select Plan
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 transition-all">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-500 uppercase tracking-wider text-xs">Signature VIP</h3>
                  <p className="text-4xl font-extrabold text-slate-900 mt-2">$ 199<span className="text-xs text-slate-400"> / mo</span></p>
                </div>
                <ul className="space-y-3 text-xs text-slate-500 pt-4 border-t border-slate-200">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> Unlimited group classes & floor entry</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> Daily cryo & steam recovery rooms</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> Unlimited private training sessions</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-600 text-xs">check</span> Custom diet & biometric telemetry</li>
                </ul>
              </div>
              <button 
                onClick={() => setSelectedPlan('Signature VIP')}
                className="w-full bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl border border-slate-200 transition-all mt-8"
              >
                Select Plan
              </button>
            </div>
          </div>

          {selectedPlan && (
            <p className="text-center text-xs text-indigo-600 font-bold mt-6 animate-pulse">
              ✓ Initialized registration for {selectedPlan}. Host walkthrough details sent to mailbox.
            </p>
          )}
        </div>
      </section>

      {/* Tour Booking Form */}
      <section id="contact" className="max-w-4xl mx-auto w-full px-6 py-28">
        <div className="bg-white border border-slate-250 border-slate-200 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center shadow-lg">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-indigo-600 font-bold">Experience Aesthetix</span>
            <h2 className="text-3xl font-bold uppercase tracking-wide leading-tight text-slate-900">Book A Private Tour</h2>
            <p className="text-slate-500 text-xs font-light leading-relaxed">
              Submit your contact details below to schedule an exclusive, 1-on-1 walkthrough of our luxury training facilities.
            </p>
            <div className="space-y-2 text-slate-550 text-[10px] uppercase tracking-wider pt-2 font-bold">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-slate-500 text-sm">mail</span> partner@aesthetixclub.com</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-slate-500 text-sm">schedule</span> Daily: 06:00 AM - 10:00 PM</p>
            </div>
          </div>

          <form onSubmit={handleTourSubmit} className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">Your Full Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 placeholder-slate-400" />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-500 mb-1">Email Address</label>
              <input type="email" required placeholder="name@domain.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 placeholder-slate-400" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] uppercase tracking-widest py-3 rounded-lg transition-colors shadow">
              Schedule Tour
            </button>
            {tourSuccess && (
              <p className="text-center text-xs text-indigo-600 font-semibold pt-1">
                ✓ Booking confirmed! Check your inbox for details.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 w-full py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-slate-850 tracking-[0.25em] text-base uppercase">
              {brandName.replace(/\s*(website|web application|app)\s*/gi, '')}
            </h4>
            <p className="text-[9px] uppercase tracking-widest text-slate-400 mt-1">© 2026 {brandName}. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
