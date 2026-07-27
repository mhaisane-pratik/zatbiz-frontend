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
    <div className="bg-[#FAF9F6] text-slate-800 font-sans min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Light Background Decor Blobs - Modern Mesh Look */}
      <div className="absolute top-[2%] left-[-200px] w-[600px] h-[600px] rounded-full blur-[120px] -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 80%)" }}></div>
      <div className="absolute top-[40%] right-[-200px] w-[600px] h-[600px] rounded-full blur-[120px] -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 80%)" }}></div>
      <div className="absolute bottom-[10%] left-[-150px] w-[500px] h-[500px] rounded-full blur-[100px] -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168, 85, 247, 0.07) 0%, transparent 80%)" }}></div>

      {/* Header Bar - Glassmorphism */}
      <header className="w-full z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 transition-all duration-300">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-indigo-600 font-black text-2xl animate-pulse">sports_gymnastics</span>
            <span className="text-sm font-black tracking-[0.15em] text-slate-900 uppercase">
              {brandName.replace(/\s*(website|web application|app)\s*/gi, '')} <span className="text-indigo-650 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-black">FIT</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">
            <a href="#club" className="hover:text-indigo-600 transition-colors duration-250">The Club</a>
            <a href="#classes" className="hover:text-indigo-600 transition-colors duration-250">Classes</a>
            <a href="#trainers" className="hover:text-indigo-600 transition-colors duration-250">Coaches</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors duration-250">Membership</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors duration-250 font-black">Tour</a>
            {customerSession ? (
              <a href={`/preview/${projectId}/dashboard`} className="bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-full font-black text-[9px] tracking-widest transition-all duration-200 shadow-sm no-underline inline-block uppercase">
                Dashboard
              </a>
            ) : (
              <a href={`/preview/${projectId}/login`} className="bg-indigo-600 hover:bg-indigo-750 text-white px-4 py-2.5 rounded-full font-black text-[9px] tracking-widest transition-all duration-200 shadow-sm no-underline inline-block uppercase">
                Login
              </a>
            )}
          </div>

          <a href="#pricing" className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] uppercase tracking-widest px-6 py-3 rounded-full transition-all shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-[1px]">
            Join Club
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[85vh] relative">
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2.5 border border-indigo-100/80 px-4 py-2 rounded-full bg-indigo-50/60 backdrop-blur-sm shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-indigo-650 font-black">Luxury Biometric Training Suite</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-[70px] font-black tracking-tight text-slate-900 uppercase leading-[1.08] font-['Outfit']">
            Build Your <br />
            Ultimate Strength <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500">At {brandName}</span>
          </h1>

          <p className="text-slate-500 text-sm font-light leading-relaxed max-w-lg">
            Experience peak physiological conditioning inside a pristine, modern architectural space. We supply Olympic plates, custom biomechanical tracking bands, and premium hot-cold therapy rooms.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#pricing" className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_10px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_15px_30px_rgba(99,102,241,0.35)] transition-all duration-300 hover:-translate-y-[2px]">
              Claim Free Pass
            </a>
            <a href="#classes" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[1px]">
              Browse Classes
            </a>
          </div>
        </div>

        {/* Visual elements on right - Luxury Layout */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          {/* Main Hero Asset Container */}
          <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[36px] overflow-hidden border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.06)] p-2">
            <img 
              src="/gym_hero_interior.png" 
              alt="Luxury Gym Interior" 
              className="w-full h-full object-cover rounded-[30px]"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none rounded-[30px]"></div>
          </div>

          {/* Floating Heart Rate Telemetry Widget */}
          <div className="absolute top-12 -left-4 md:left-4 bg-white/90 border border-slate-200/60 p-4.5 rounded-2xl flex items-center gap-4.5 shadow-[0_15px_35px_rgba(15,23,42,0.08)] backdrop-blur-md hover:scale-105 transition-all duration-300 animate-bounce" style={{ animationDuration: '6s' }}>
            <div className="h-11 w-11 rounded-xl bg-rose-50 flex items-center justify-center border border-rose-100 shadow-inner">
              <span className="material-symbols-outlined text-rose-500 text-2xl font-bold animate-pulse">favorite</span>
            </div>
            <div>
              <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em]">Bio Telemetry</p>
              <h4 className="font-black text-sm text-slate-800">116 BPM</h4>
            </div>
          </div>

          {/* Floating Calories Burned Widget */}
          <div className="absolute bottom-12 -right-4 md:right-4 bg-white/90 border border-slate-200/60 p-4.5 rounded-2xl flex items-center gap-4.5 shadow-[0_15px_35px_rgba(15,23,42,0.08)] backdrop-blur-md hover:scale-105 transition-all duration-300">
            <div className="h-11 w-11 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100 shadow-inner">
              <span className="material-symbols-outlined text-amber-500 text-2xl font-bold">local_fire_department</span>
            </div>
            <div>
              <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em]">Active Energy</p>
              <h4 className="font-black text-sm text-slate-800">220 KCAL</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features / Overlapping Panel */}
      <section className="max-w-7xl mx-auto w-full px-6 relative z-10 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur border border-slate-200/60 rounded-3xl p-8 shadow-[0_15px_40px_rgba(15,23,42,0.03)] hover:shadow-[0_25px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-650 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-xl">domain</span>
            </div>
            <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 mt-6 font-['Outfit']">Premium Layout</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light mt-2">Bespoke functional zone planning, luxury lockers, and cold therapy lounge beds.</p>
          </div>

          <div className="bg-white/80 backdrop-blur border border-slate-200/60 rounded-3xl p-8 shadow-[0_15px_40px_rgba(15,23,42,0.03)] hover:shadow-[0_25px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-650 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-xl">badge</span>
            </div>
            <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 mt-6 font-['Outfit']">Elite Coaches</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light mt-2">Daily metrics feedback and direct coaching from certified Olympic strength trainers.</p>
          </div>

          <div className="bg-white/80 backdrop-blur border border-slate-200/60 rounded-3xl p-8 shadow-[0_15px_40px_rgba(15,23,42,0.03)] hover:shadow-[0_25px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-650 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-xl">schedule</span>
            </div>
            <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 mt-6 font-['Outfit']">Coordinated Schedules</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light mt-2">Dynamic cardio condition sweeps, strength classes, and kinetic flexibility runs.</p>
          </div>
        </div>
      </section>

      {/* The Club Details */}
      <section id="club" className="max-w-7xl mx-auto w-full px-6 py-28 space-y-20">
        <div className="text-center space-y-3.5">
          <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-600 font-black">Core Architecture</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-950 font-['Outfit']">High Performance Environment</h2>
          <div className="w-16 h-[2px] bg-indigo-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-['Outfit']">Purity in Training</h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              We design facilities that stimulate focus and visual calmness. We intentionally avoid noisy billboards and screens, building our experience around cold plunge tubs, sauna suites, and high-frequency acoustic engineering.
            </p>
            <ul className="space-y-4 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-lg font-bold">check_circle</span> Biometric Wristband Verification Gate</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-lg font-bold">check_circle</span> Contrast Therapy (Cold Plunge & Finnish Sauna)</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-lg font-bold">check_circle</span> Acoustic Spatial Audio Tuning</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 p-1.5 bg-white shadow-md hover:scale-[1.02] transition-transform duration-300">
              <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80" className="rounded-2xl object-cover aspect-[4/3] w-full" alt="Cycling Studio" />
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 p-1.5 bg-white shadow-md hover:scale-[1.02] transition-transform duration-300 mt-8">
              <img src="https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&auto=format&fit=crop&q=80" className="rounded-2xl object-cover aspect-[4/3] w-full" alt="Dumbbells Setup" />
            </div>
          </div>
        </div>
      </section>

      {/* Classes Timetable */}
      <section id="classes" className="bg-white py-24 px-6 border-y border-slate-200/60 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(99,102,241,0.02),_transparent_45%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center space-y-3.5 mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-600 font-black">Timetables</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-950 font-['Outfit']">Our Standard Class Routines</h2>
            <div className="w-16 h-[2px] bg-indigo-600 mx-auto"></div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['all', 'strength', 'cardio', 'recovery'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-6 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all duration-300 border rounded-full ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-[0_4px_12px_rgba(99,102,241,0.25)]' 
                    : 'bg-transparent text-slate-500 hover:text-slate-800 hover:border-slate-400 border-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </button>
            ))}
          </div>

          {/* Classes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes
              .filter(c => activeCategory === 'all' || c.category === activeCategory)
              .map(c => (
                <div key={c.id} className="bg-[#FAF9F6]/50 border border-slate-200/70 p-7 rounded-3xl hover:border-indigo-500/40 hover:bg-white hover:shadow-[0_20px_45px_rgba(15,23,42,0.04)] transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <span className={`text-[8px] border font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      c.category === 'strength' 
                        ? 'bg-rose-50 border-rose-100 text-rose-600'
                        : c.category === 'cardio'
                        ? 'bg-amber-50 border-amber-100 text-amber-600'
                        : 'bg-indigo-50 border-indigo-100 text-indigo-600'
                    }`}>{c.category}</span>
                    <h4 className="font-black text-base uppercase tracking-tight text-slate-900 pt-3 group-hover:text-indigo-650 transition-colors duration-300">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">schedule</span> {c.time}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-200/50 pt-5 mt-8 text-[9px] uppercase tracking-widest font-bold">
                    <span className="text-slate-400">Coach: {c.coach.split(' ')[0]}</span>
                    <span className="text-indigo-600">{c.level}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Trainers Profiles */}
      <section id="trainers" className="max-w-7xl mx-auto w-full px-6 py-28 space-y-20">
        <div className="text-center space-y-3.5">
          <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-600 font-black">Instructors</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-950 font-['Outfit']">Certified Specialists</h2>
          <div className="w-16 h-[2px] bg-indigo-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((t) => (
            <div key={t.name} className="bg-white border border-slate-200/70 p-8 rounded-3xl text-center shadow-[0_12px_30px_rgba(15,23,42,0.02)] hover:border-indigo-550 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.05)] transition-all duration-300 group">
              <div className="w-28 h-28 rounded-full overflow-hidden border border-slate-200 mx-auto mb-6 p-1 bg-slate-50 group-hover:scale-105 transition-transform duration-300">
                <img src={t.image} className="w-full h-full object-cover rounded-full" alt={t.name} />
              </div>
              <h4 className="font-black text-slate-900 uppercase text-base tracking-wide font-['Outfit']">{t.name}</h4>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1.5 font-bold">{t.specialty}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Options */}
      <section id="pricing" className="bg-white py-24 px-6 border-y border-slate-200/60 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.02),_transparent_40%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center space-y-3.5 mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-600 font-black">Rates</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-950 font-['Outfit']">Signature Access Plans</h2>
            <div className="w-16 h-[2px] bg-indigo-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1 */}
            <div className="bg-[#FAF9F6]/40 border border-slate-200 p-8.5 rounded-3xl flex flex-col justify-between hover:border-indigo-500/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(15,23,42,0.03)] transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <h3 className="font-black text-slate-450 text-slate-450/90 uppercase tracking-widest text-[10px] font-['Outfit']">Standard Floor</h3>
                  <p className="text-4xl font-black text-slate-900 mt-3 font-['Outfit']">$ 49<span className="text-xs text-slate-400 font-light"> / mo</span></p>
                </div>
                <ul className="space-y-4 text-xs text-slate-500 pt-5 border-t border-slate-200/60 font-light">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> Unlimited gym floor entry</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> Bio locker & shower access</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> 1 Free fitness assessment</li>
                </ul>
              </div>
              <button 
                onClick={() => setSelectedPlan('Standard Floor')}
                className="w-full bg-white hover:bg-indigo-600 hover:text-white text-slate-700 font-black text-[9px] uppercase tracking-widest py-4 rounded-xl border border-slate-200 hover:border-indigo-600 transition-all duration-300 mt-10 shadow-sm"
              >
                Select Plan
              </button>
            </div>

            {/* Plan 2 */}
            <div className="bg-white border-2 border-indigo-600 p-8.5 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(99,102,241,0.12)]">
              <div className="absolute right-[-14px] top-[14px] bg-indigo-600 text-white text-[7px] font-black uppercase tracking-[0.25em] px-6 py-2 rotate-45 shadow-sm">RECOMMENDED</div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-black text-indigo-600 uppercase tracking-widest text-[10px] font-['Outfit']">Elite Club</h3>
                  <p className="text-4xl font-black text-slate-900 mt-3 font-['Outfit']">$ 99<span className="text-xs text-slate-400 font-light"> / mo</span></p>
                </div>
                <ul className="space-y-4 text-xs text-slate-500 pt-5 border-t border-slate-200/60 font-light">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> Full standard floor privileges</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> Access to all daily group classes</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> Cold plunge & steam room recovery</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> 2 private coaching sessions / mo</li>
                </ul>
              </div>
              <button 
                onClick={() => setSelectedPlan('Elite Club')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[9px] uppercase tracking-widest py-4 rounded-xl transition-all duration-300 mt-10 shadow-[0_4px_14px_rgba(99,102,241,0.35)]"
              >
                Select Plan
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-[#FAF9F6]/40 border border-slate-200 p-8.5 rounded-3xl flex flex-col justify-between hover:border-indigo-500/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(15,23,42,0.03)] transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <h3 className="font-black text-slate-450 text-slate-450/90 uppercase tracking-widest text-[10px] font-['Outfit']">Signature VIP</h3>
                  <p className="text-4xl font-black text-slate-900 mt-3 font-['Outfit']">$ 199<span className="text-xs text-slate-400 font-light"> / mo</span></p>
                </div>
                <ul className="space-y-4 text-xs text-slate-500 pt-5 border-t border-slate-200/60 font-light">
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> Unlimited classes & floor entry</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> Daily cryo & steam recovery rooms</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> Unlimited private training sessions</li>
                  <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-sm font-bold">check</span> Biometric telemetry & custom diet plans</li>
                </ul>
              </div>
              <button 
                onClick={() => setSelectedPlan('Signature VIP')}
                className="w-full bg-white hover:bg-indigo-600 hover:text-white text-slate-700 font-black text-[9px] uppercase tracking-widest py-4 rounded-xl border border-slate-200 hover:border-indigo-600 transition-all duration-300 mt-10 shadow-sm"
              >
                Select Plan
              </button>
            </div>
          </div>

          {selectedPlan && (
            <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-center text-xs text-indigo-650 font-black tracking-wide animate-pulse">
              ✓ Registration started for {selectedPlan}. Mailbox invitation details dispatched.
            </div>
          )}
        </div>
      </section>

      {/* Tour Booking Form */}
      <section id="contact" className="max-w-4xl mx-auto w-full px-6 py-28 relative">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center shadow-[0_20px_50px_rgba(15,23,42,0.04)] relative z-10">
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-indigo-600 font-black">Experience Aesthetix</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 leading-tight font-['Outfit']">Book A Private Tour</h2>
            <p className="text-slate-500 text-xs font-light leading-relaxed">
              Submit your contact details to schedule an exclusive, 1-on-1 walkthrough of our luxury conditioning spaces.
            </p>
            <div className="space-y-3.5 text-slate-700 text-[9px] uppercase tracking-widest pt-2 font-bold">
              <p className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-lg font-bold">mail</span> info@aesthetixfit.com</p>
              <p className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-600 text-lg font-bold">schedule</span> Daily: 06:00 AM - 10:00 PM</p>
            </div>
          </div>

          <form onSubmit={handleTourSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-[#FAF9F6]/80 border border-slate-200/80 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-800 transition-all duration-200 placeholder-slate-400 font-medium" />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
              <input type="email" required placeholder="john@domain.com" className="w-full bg-[#FAF9F6]/80 border border-slate-200/80 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-800 transition-all duration-200 placeholder-slate-400 font-medium" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[9px] uppercase tracking-widest py-4 rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-[1px]">
              Schedule Walkthrough
            </button>
            {tourSuccess && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center text-xs text-emerald-650 font-bold animate-pulse">
                ✓ Booking confirmed! Check your inbox for confirmation.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/60 w-full py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-1">
            <h4 className="font-black text-slate-900 tracking-[0.25em] text-sm uppercase font-['Outfit']">
              {brandName.replace(/\s*(website|web application|app)\s*/gi, '')}
            </h4>
            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-medium">© 2026 {brandName}. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[9px] uppercase font-black tracking-widest text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
