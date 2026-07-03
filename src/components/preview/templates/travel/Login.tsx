'use client';

import React, { useState, useEffect } from 'react';

interface LoginProps {
  projectId: number;
  isSignUp: boolean;
  setIsSignUp: (v: boolean) => void;
  companyName: string;
  logoUrl?: string;
  logoIcon?: string;
  errorMessage?: string;
  successMessage?: string;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  themePreset?: any;
}

const TRAVEL_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop&q=80', // Road trip camper van
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80', // Sunny beach
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop&q=80', // Lake boat mountains
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80', // Yosemite valley bridge
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop&q=80'  // Suitcase flight maps
];

export default function TravelLogin({
  projectId,
  isSignUp,
  setIsSignUp,
  companyName,
  logoUrl,
  logoIcon = '✈️',
  errorMessage,
  successMessage,
  handleLoginSubmit,
  themePreset
}: LoginProps) {
  const primaryColor = typeof themePreset === 'string' ? themePreset : '#06b6d4';
  const [bgIndex, setBgIndex] = useState(0);

  // Background rotater interval (every 2 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(prev => (prev + 1) % TRAVEL_BACKGROUNDS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans text-xs">
      
      {/* 1. Highly Visible Background Slideshow */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {TRAVEL_BACKGROUNDS.map((bgUrl, idx) => (
          <div 
            key={idx}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{ 
              backgroundImage: `url('${bgUrl}')`,
              opacity: idx === bgIndex ? 0.75 : 0 
            }}
          />
        ))}
        {/* Soft elegant vignette overlay to retain contrast */}
        <div className="absolute inset-0 bg-slate-950/25" />
      </div>

      {/* 2. Ambient glow filters behind glass */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: primaryColor }}
        />
      </div>

      {/* 3. Premium Glassmorphic (Frosted Glass) Card Wrapper */}
      <div className="relative z-10 w-full max-w-4xl min-h-[500px] mx-4 bg-white/25 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 text-left">
        
        {/* Left column: Visual brand showcase in frosted container */}
        <div className="p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-r border-white/20 bg-white/10">
          <div className="flex items-center gap-2.5 z-10">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-8 h-8 rounded-xl object-cover border border-white/50 shadow-sm" />
            ) : (
              <span className="text-2xl">{logoIcon}</span>
            )}
            <h1 className="text-sm font-black text-slate-950 tracking-wider uppercase drop-shadow-sm">{companyName || 'Wanderlust Agency'}</h1>
          </div>

          <div className="space-y-4 my-8 z-10">
            <span className="px-3 py-1 bg-white/40 border border-white/30 rounded-full text-[9px] font-black uppercase text-slate-900 tracking-wider inline-block">
              Exclusive Member Portal
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-950 leading-tight drop-shadow-sm">
              Unlock Extraordinary Journeys & Adventures.
            </h2>
            <p className="text-[10px] text-slate-900 leading-relaxed font-black">
              Log in to track your upcoming holiday itineraries, print boarding vouchers, manage visa approvals, or claim loyalty points instantly.
            </p>
          </div>

          <div className="text-[8px] text-slate-900 font-extrabold uppercase tracking-widest z-10 drop-shadow-sm">
            © {new Date().getFullYear()} {companyName} • Powered by ZATBIZ
          </div>

          {/* Ambient color bar on left pane border */}
          <div 
            className="absolute right-0 top-1/4 w-1 h-1/2 opacity-70 blur-[1px]"
            style={{ backgroundColor: primaryColor }}
          />
        </div>

        {/* Right column: Glassmorphic Auth Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white/15">
          <div className="space-y-1.5 mb-6 text-left">
            <h3 className="text-lg font-black text-slate-950 drop-shadow-sm">
              {isSignUp ? 'Create Traveler Account' : 'Sign In to Portal'}
            </h3>
            <p className="text-[9px] text-slate-900 font-extrabold uppercase tracking-wider">
              {isSignUp ? 'Register to start booking tours' : 'Enter your credentials below'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-650/20 border border-red-500/30 text-red-950 rounded-xl text-[10px] font-black text-center mb-4 backdrop-blur-md">
              ⚠️ {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-650/20 border border-emerald-500/30 text-emerald-950 rounded-xl text-[10px] font-black text-center mb-4 backdrop-blur-md">
              ✅ {successMessage}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-extrabold text-slate-900">
            {isSignUp && (
              <div className="space-y-1 text-left">
                <label className="text-[9px] font-black uppercase text-slate-900">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full bg-white/40 border border-white/50 text-slate-950 rounded-xl px-3.5 py-2.5 outline-none focus:border-white focus:bg-white/60 transition placeholder-slate-700 font-bold"
                />
              </div>
            )}

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black uppercase text-slate-900">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="traveler@gmail.com"
                required
                className="w-full bg-white/40 border border-white/50 text-slate-950 rounded-xl px-3.5 py-2.5 outline-none focus:border-white focus:bg-white/60 transition placeholder-slate-700 font-bold"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black uppercase text-slate-900">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full bg-white/40 border border-white/50 text-slate-950 rounded-xl px-3.5 py-2.5 outline-none focus:border-white focus:bg-white/60 transition placeholder-slate-700 font-bold"
              />
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-900">Mobile *</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+91 99999 99999"
                    required
                    className="w-full bg-white/40 border border-white/50 text-slate-950 rounded-xl px-2.5 py-2 outline-none focus:border-white focus:bg-white/60 transition placeholder-slate-700 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-900">City *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="New Delhi"
                    required
                    className="w-full bg-white/40 border border-white/50 text-slate-950 rounded-xl px-2.5 py-2 outline-none focus:border-white focus:bg-white/60 transition placeholder-slate-700 font-bold"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition cursor-pointer border-none shadow-lg mt-2 hover:brightness-105 active:scale-[0.99]"
              style={{ backgroundColor: primaryColor }}
            >
              {isSignUp ? 'Register Account ➔' : 'Access Traveler Portal ➔'}
            </button>
          </form>

          {/* Toggle login vs signup */}
          <div className="mt-5 text-center text-slate-950 font-black">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setIsSignUp(false)} 
                  className="bg-transparent border-none cursor-pointer font-black hover:underline ml-1"
                  style={{ color: primaryColor }}
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                First time traveling with us?{' '}
                <button 
                  type="button"
                  onClick={() => setIsSignUp(true)} 
                  className="bg-transparent border-none cursor-pointer font-black hover:underline ml-1"
                  style={{ color: primaryColor }}
                >
                  Create Account
                </button>
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
