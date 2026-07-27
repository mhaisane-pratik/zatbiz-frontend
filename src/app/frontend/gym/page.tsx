'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ClassItem {
  id: string;
  category: 'strength' | 'cardio' | 'recovery';
  name: string;
  time: string;
  coach: string;
  level: string;
}

export default function AesthetixGym() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'strength' | 'cardio' | 'recovery'>('all');
  const [tourSuccess, setTourSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const classes: ClassItem[] = [
    {
      id: 'c1',
      category: 'strength',
      name: 'Aesthetic Hypertrophy',
      time: 'Mon, Wed, Fri • 07:00 AM',
      coach: 'Dominic Vane',
      level: 'Advanced'
    },
    {
      id: 'c2',
      category: 'cardio',
      name: 'HIIT Conditioning',
      time: 'Tue, Thu • 09:00 AM',
      coach: 'Elena Rostova',
      level: 'All Levels'
    },
    {
      id: 'c3',
      category: 'recovery',
      name: 'Flexibility & Kinetic Flow',
      time: 'Daily • 05:30 PM',
      coach: 'Marcus Aurel',
      level: 'Beginner Friendly'
    },
    {
      id: 'c4',
      category: 'strength',
      name: 'Olympic Barbell Form',
      time: 'Saturday • 10:00 AM',
      coach: 'Dominic Vane',
      level: 'Intermediate'
    }
  ];

  const trainers = [
    {
      name: 'Dominic Vane',
      specialty: 'Kinetic & Strength Coach',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Elena Rostova',
      specialty: 'High Performance & Cardio',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Marcus Aurel',
      specialty: 'Myofascial Recovery & Yoga',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
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
    <div className="bg-[#0a0a0c] text-white font-sans min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-[#1b1b1f]">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Hub</span>
          </Link>
          
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-[0.25em] text-white uppercase font-sans">
              Aesthetix
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-stone-400">
            <a href="#club" className="hover:text-white transition-colors">Club</a>
            <span className="text-stone-700">|</span>
            <a href="#classes" className="hover:text-white transition-colors">Classes</a>
            <span className="text-stone-700">|</span>
            <a href="#trainers" className="hover:text-white transition-colors">Trainers</a>
            <span className="text-stone-700">|</span>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <span className="text-stone-700">|</span>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <a href="#pricing" className="bg-[#1c1c1e] hover:bg-[#2c2c2e] text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full border border-stone-800 transition-all">
            Join Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 text-center">
        {/* Background Image with Dark Linear Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center -z-20"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 12, 0.40), rgba(10, 10, 12, 0.90)), url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=80')` 
          }}
        ></div>

        {/* Hero Copy Content */}
        <div className="max-w-4xl mx-auto space-y-6 z-10 pt-12">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white uppercase font-sans leading-[1.1]">
            Elevate Your Fitness.<br />
            Embrace Aesthetix.
          </h1>
          <p className="text-stone-400 text-xs md:text-sm uppercase tracking-[0.2em] max-w-xl mx-auto font-light leading-relaxed">
            Experience the future of training in a sleek, minimalist environment.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <a href="#pricing" className="bg-[#1c1c1e] hover:bg-white hover:text-[#0a0a0c] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-md transition-all border border-stone-850">
              Start Your Journey
            </a>
            <a href="#club" className="bg-transparent hover:bg-white/5 text-white border border-stone-600 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-md transition-all">
              Explore The Club
            </a>
          </div>
        </div>

        {/* Spacing to allow overlapping horizontal panel */}
        <div className="h-20"></div>
      </section>

      {/* Overlapping Bottom Horizontal Bar */}
      <section className="relative z-20 max-w-5xl mx-auto w-full px-6 -mt-16">
        <div className="bg-white text-stone-900 rounded-xl shadow-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center">
          <div className="space-y-2 border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:pr-4 flex flex-col items-center">
            <span className="material-symbols-outlined text-stone-800 text-2xl font-bold">domain</span>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-stone-900 mt-1">Our Facilities</h4>
            <p className="text-[10px] text-stone-500 font-light max-w-xs">Sleek layout designs, wellness saunas, and biometric logins.</p>
          </div>
          
          <div className="space-y-2 border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:px-4 flex flex-col items-center">
            <span className="material-symbols-outlined text-stone-800 text-2xl font-bold">badge</span>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-stone-900 mt-1">Expert Trainers</h4>
            <p className="text-[10px] text-stone-500 font-light max-w-xs">Custom program design led by certified athletic coaches.</p>
          </div>

          <div className="space-y-2 pt-6 md:pt-0 md:pl-4 flex flex-col items-center">
            <span className="material-symbols-outlined text-stone-800 text-2xl font-bold">schedule</span>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-stone-900 mt-1">Classes</h4>
            <p className="text-[10px] text-stone-500 font-light max-w-xs">Daily HIIT conditioning, heavy weight lifting, and recovery tracks.</p>
          </div>
        </div>
      </section>

      {/* The Club section */}
      <section id="club" className="max-w-6xl mx-auto w-full px-6 py-28 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#e4e4e7] font-bold">Minimalist Standard</span>
          <h2 className="text-3xl font-bold uppercase tracking-wide">The Aesthetix Standard</h2>
          <div className="w-12 h-0.5 bg-stone-700 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wide">Designed for Peak Kinetic Performance</h3>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Every detail of AESTHETIX is engineered to minimize distraction and maximize focus. We provide a clutter-free fitness space equipped with premium training rigs, structured weight plates, and isolated sprint turf tracks.
            </p>
            <ul className="space-y-3 text-xs text-stone-300 font-medium">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-sm">check</span> High-End Biometric Access Keys</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-sm">check</span> Cryo-Recovery and Steam Lounges</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-sm">check</span> Curated Sensory Audio Environments</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80" className="rounded-xl border border-stone-850 object-cover aspect-[4/3]" alt="Cycling Room" />
            <img src="https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&auto=format&fit=crop&q=80" className="rounded-xl border border-stone-850 object-cover aspect-[4/3] mt-8" alt="Weights Stack" />
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes" className="bg-[#111115] py-24 px-6 border-y border-[#1b1b1f]">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Curated Tracks</span>
            <h2 className="text-3xl font-bold uppercase tracking-wide">Dynamic Daily Classes</h2>
            <div className="w-12 h-0.5 bg-stone-700 mx-auto"></div>
          </div>

          {/* Filter controls */}
          <div className="flex justify-center gap-4 mb-10">
            {['all', 'strength', 'cardio', 'recovery'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-wider transition-all border rounded-full ${
                  activeCategory === cat ? 'bg-white text-stone-900 border-white' : 'bg-transparent text-stone-400 hover:border-stone-700 border-stone-800'
                }`}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </button>
            ))}
          </div>

          {/* Classes grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes
              .filter(c => activeCategory === 'all' || c.category === activeCategory)
              .map(c => (
                <div key={c.id} className="bg-[#0a0a0c] border border-stone-850 p-6 rounded-xl hover:border-stone-750 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[8px] bg-stone-900 border border-stone-800 text-stone-300 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">{c.category}</span>
                    <h4 className="font-bold text-base uppercase tracking-tight text-white pt-2">{c.name}</h4>
                    <p className="text-[10px] text-stone-500">{c.time}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-stone-850 pt-4 mt-6 text-[10px]">
                    <span className="text-stone-400">Coach: {c.coach}</span>
                    <span className="text-stone-500 font-semibold">{c.level}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="max-w-6xl mx-auto w-full px-6 py-28">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Elite Directors</span>
          <h2 className="text-3xl font-bold uppercase tracking-wide">Expert Instructors</h2>
          <div className="w-12 h-0.5 bg-stone-700 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((t) => (
            <div key={t.name} className="bg-[#111115] border border-stone-850 p-6 rounded-xl text-center group hover:border-stone-700 transition-all">
              <div className="w-28 h-28 rounded-full overflow-hidden border border-stone-800 mx-auto mb-4">
                <img src={t.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={t.name} />
              </div>
              <h4 className="font-bold text-white uppercase text-base tracking-wide">{t.name}</h4>
              <p className="text-[9px] text-stone-400 uppercase tracking-widest mt-1 font-semibold">{t.specialty}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing / Plans Section */}
      <section id="pricing" className="bg-[#111115] py-24 px-6 border-y border-[#1b1b1f]">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Memberships</span>
            <h2 className="text-3xl font-bold uppercase tracking-wide">Signature Access Plans</h2>
            <div className="w-12 h-0.5 bg-stone-700 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1 */}
            <div className="bg-[#0a0a0c] border border-stone-850 p-8 rounded-2xl flex flex-col justify-between hover:border-stone-700 transition-all">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-stone-300 uppercase tracking-wider text-xs">Standard Access</h3>
                  <p className="text-4xl font-extrabold text-white mt-2">$ 49<span className="text-xs text-stone-500"> / mo</span></p>
                </div>
                <ul className="space-y-3 text-xs text-stone-400 pt-4 border-t border-stone-850">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-xs">check</span> Unlimited gym floor entry</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-xs">check</span> Locker room & shower access</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-xs">check</span> 1 Free fitness assessment</li>
                </ul>
              </div>
              <button 
                onClick={() => setSelectedPlan('Standard Access')}
                className="w-full bg-[#1c1c1e] hover:bg-white hover:text-stone-900 text-white font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl border border-stone-800 transition-all mt-8"
              >
                Select Plan
              </button>
            </div>

            {/* Plan 2 */}
            <div className="bg-[#0a0a0c] border-2 border-white p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-[-14px] top-[12px] bg-white text-stone-900 text-[8px] font-black uppercase tracking-widest px-6 py-1.5 rotate-45">RECOMMENDED</div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-white uppercase tracking-wider text-xs">Elite Club</h3>
                  <p className="text-4xl font-extrabold text-white mt-2">$ 99<span className="text-xs text-stone-500"> / mo</span></p>
                </div>
                <ul className="space-y-3 text-xs text-white/90 pt-4 border-t border-stone-850">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-white text-xs">check</span> Full standard privileges</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-white text-xs">check</span> Access to all daily group classes</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-white text-xs">check</span> Cryo & steam sauna recovery</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-white text-xs">check</span> 2 Private coaching sessions / mo</li>
                </ul>
              </div>
              <button 
                onClick={() => setSelectedPlan('Elite Club')}
                className="w-full bg-white hover:bg-stone-100 text-stone-900 font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl transition-all mt-8"
              >
                Select Plan
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-[#0a0a0c] border border-stone-850 p-8 rounded-2xl flex flex-col justify-between hover:border-stone-700 transition-all">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-stone-300 uppercase tracking-wider text-xs">Signature VIP</h3>
                  <p className="text-4xl font-extrabold text-white mt-2">$ 199<span className="text-xs text-stone-500"> / mo</span></p>
                </div>
                <ul className="space-y-3 text-xs text-stone-400 pt-4 border-t border-stone-850">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-xs">check</span> Unlimited group classes & floor entry</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-xs">check</span> Daily cryo & steam recovery rooms</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-xs">check</span> Unlimited private training sessions</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-500 text-xs">check</span> Custom diet & biometric telemetry</li>
                </ul>
              </div>
              <button 
                onClick={() => setSelectedPlan('Signature VIP')}
                className="w-full bg-[#1c1c1e] hover:bg-white hover:text-stone-900 text-white font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl border border-stone-800 transition-all mt-8"
              >
                Select Plan
              </button>
            </div>
          </div>

          {selectedPlan && (
            <p className="text-center text-xs text-white font-bold mt-6 animate-pulse">
              ✓ Initialized registration for {selectedPlan}. Private tour details sent to mailbox.
            </p>
          )}
        </div>
      </section>

      {/* Tour Booking Form */}
      <section id="contact" className="max-w-4xl mx-auto w-full px-6 py-28">
        <div className="bg-[#111115] border border-stone-850 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center shadow-xl">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Experience Aesthetix</span>
            <h2 className="text-3xl font-bold uppercase tracking-wide leading-tight text-white">Book A Private Tour</h2>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Submit your contact details below to schedule an exclusive, 1-on-1 walkthrough of our luxury training facilities with a member host.
            </p>
            <div className="space-y-2 text-stone-500 text-[10px] uppercase tracking-wider pt-2 font-bold">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-400 text-sm">mail</span> partner@aesthetixclub.com</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-stone-400 text-sm">schedule</span> Daily: 06:00 AM - 10:00 PM</p>
            </div>
          </div>

          <form onSubmit={handleTourSubmit} className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold uppercase text-stone-400 mb-1">Your Full Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-[#0a0a0c] border border-stone-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-stone-500 text-white placeholder-stone-700" />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase text-stone-400 mb-1">Email Address</label>
              <input type="email" required placeholder="name@domain.com" className="w-full bg-[#0a0a0c] border border-stone-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-stone-500 text-white placeholder-stone-700" />
            </div>
            <button type="submit" className="w-full bg-white hover:bg-stone-200 text-stone-900 font-bold text-[10px] uppercase tracking-widest py-3 rounded-lg transition-colors">
              Schedule Tour
            </button>
            {tourSuccess && (
              <p className="text-center text-xs text-white font-semibold pt-1">
                ✓ Booking confirmed! Check your inbox for tour scheduling.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0c] border-t border-[#111115] w-full py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-white tracking-[0.25em] text-base uppercase">Aesthetix</h4>
            <p className="text-[9px] uppercase tracking-widest text-stone-600 mt-1">© 2026 Aesthetix Luxury Club. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-wider text-stone-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
