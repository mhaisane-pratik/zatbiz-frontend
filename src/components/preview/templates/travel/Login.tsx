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
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop&q=80', // Positano, Amalfi Coast Sunset (Matches 2nd image)
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80', // Sunny beach
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop&q=80', // Lake boat mountains
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop&q=80', // Road trip camper van
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
  const primaryColor = typeof themePreset === 'string' ? themePreset : '#dfb76c';
  const [bgIndex, setBgIndex] = useState(0);

  // Background rotater interval (every 1 second as requested)
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(prev => (prev + 1) % TRAVEL_BACKGROUNDS.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans text-xs">
      {/* Dynamic Font Styling Overlay */}
      <style dangerouslySetInnerHTML={{ __html: `
        .serif-font {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .gold-glow-border {
          border: 1px solid rgba(223, 183, 108, 0.35);
          box-shadow: 0 0 40px rgba(223, 183, 108, 0.12), inset 0 0 20px rgba(255, 255, 255, 0.02);
        }
        .gold-text {
          color: #dfb76c;
        }
        .gold-border {
          border-color: rgba(223, 183, 108, 0.45);
        }
      `}} />
      
      {/* 1. Highly Visible Background Slideshow */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {TRAVEL_BACKGROUNDS.map((bgUrl, idx) => (
          <div 
            key={idx}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out"
            style={{ 
              backgroundImage: `url('${bgUrl}')`,
              opacity: idx === bgIndex ? 0.95 : 0 
            }}
          />
        ))}
        {/* Soft elegant vignette overlay to retain contrast */}
        <div className="absolute inset-0 bg-black/18" />
      </div>

      {/* 2. Ambient glow filters behind glass */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: '#dfb76c' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-15"
          style={{ backgroundColor: '#b8934d' }}
        />
      </div>

      {/* 3. Premium Gold-Trimmed Glassmorphic Card Wrapper */}
      <div className="relative z-10 w-full max-w-4xl min-h-[520px] mx-4 bg-white/[0.02] backdrop-blur-[8px] rounded-[32px] gold-glow-border overflow-hidden grid grid-cols-1 md:grid-cols-2 text-left shadow-2xl">
        
        {/* Left column: Visual brand showcase in frosted container */}
        <div className="p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-r border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent">
          
          {/* Header Row: Compass Logo & Jet Graphic */}
          <div className="flex items-center justify-between z-10 w-full">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-9 h-9 rounded-xl object-cover border border-[#dfb76c]/40 shadow-sm" />
              ) : (
                <div className="w-9 h-9 flex items-center justify-center">
                  {/* Detailed Golden Compass SVG */}
                  <svg viewBox="0 0 40 40" className="w-9 h-9 drop-shadow" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#dfb76c"/>
                        <stop offset="50%" stopColor="#f5e0a3"/>
                        <stop offset="100%" stopColor="#b8934d"/>
                      </linearGradient>
                      <linearGradient id="goldGradLight" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f5e0a3"/>
                        <stop offset="100%" stopColor="#dfb76c"/>
                      </linearGradient>
                      <linearGradient id="goldGradDark" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#b8934d"/>
                        <stop offset="100%" stopColor="#8a6f37"/>
                      </linearGradient>
                    </defs>
                    <circle cx="20" cy="20" r="17" stroke="url(#goldGrad)" strokeWidth="2.2" />
                    <circle cx="20" cy="20" r="13" stroke="url(#goldGrad)" strokeWidth="0.8" strokeDasharray="2 2" />
                    {/* Compass Rose Needle */}
                    <polygon points="20,5 23.5,20 20,18" fill="url(#goldGradLight)" />
                    <polygon points="20,5 16.5,20 20,18" fill="url(#goldGradDark)" />
                    <polygon points="20,35 16.5,20 20,22" fill="url(#goldGradLight)" />
                    <polygon points="20,35 23.5,20 20,22" fill="url(#goldGradDark)" />
                    <polygon points="35,20 20,16.5 22,20" fill="url(#goldGradLight)" />
                    <polygon points="35,20 20,23.5 22,20" fill="url(#goldGradDark)" />
                    <polygon points="5,20 20,23.5 18,20" fill="url(#goldGradLight)" />
                    <polygon points="5,20 20,16.5 18,20" fill="url(#goldGradDark)" />
                    <circle cx="20" cy="20" r="2.5" fill="#fff" />
                  </svg>
                </div>
              )}
              <h1 className="text-base font-semibold text-slate-100 tracking-widest serif-font uppercase">{companyName || 'ACER'}</h1>
            </div>
            
            {/* Flying Private Jet SVG Graphic */}
            <div className="opacity-90 select-none">
              <svg viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[105px] h-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                <path d="M10 26C15 25.5 25 24.5 35 23.5L55 12C57 11 58 11.5 57 13L42 23L75 20.5C80 20 85 19.5 90 19C92 18.8 95 18 97 19.5C98 20.5 97.5 21.5 95 22.5L78 27.5L88 38C89.5 39.5 89 40 87 39L72 29C62 30.5 45 32.5 30 34C15 35.5 10 34.5 9 32.5C8 30.5 8.5 27 10 26Z" fill="url(#silverGrad)" />
                <path d="M78 20L84 16C85 15.5 86 16 85.5 17L81 21L78 20Z" fill="url(#engineGrad)" />
                <path d="M76 22L82 18.5C83 18 84 18.5 83.5 19.5L79 23L76 22Z" fill="url(#engineGrad)" />
                <defs>
                  <linearGradient id="silverGrad" x1="10" y1="20" x2="90" y2="35" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#d1d5db" />
                    <stop offset="100%" stopColor="#9ca3af" />
                  </linearGradient>
                  <linearGradient id="engineGrad" x1="76" y1="16" x2="85" y2="23" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4b5563" />
                    <stop offset="100%" stopColor="#1f2937" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Center Brand Text */}
          <div className="space-y-4 my-8 z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#dfb76c] uppercase block mb-1">
              EXCLUSIVE MEMBER PORTAL
            </span>
            <h2 className="text-2xl md:text-[27px] font-light text-slate-50 leading-[1.2] serif-font drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Unlock Extraordinary Journeys & Adventures.
            </h2>
            <p className="text-[11px] text-slate-350 leading-relaxed font-sans font-light">
              Log in to track your upcoming holiday itineraries, print boarding vouchers, manage visa approvals, or claim loyalty points instantly.
            </p>
          </div>

          {/* Three Feature Badges Grid (Boarding, Visa, Loyalty) */}
          <div className="grid grid-cols-3 gap-2.5 pt-6 border-t border-white/10 z-10">
            {/* Boarding Vouchers */}
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#dfb76c] drop-shadow-sm flex-shrink-0">
                <path d="M4 8.5C4 7.67 4.67 7 5.5 7H18.5C19.33 7 20 7.67 20 8.5V10.5C19.17 10.5 18.5 11.17 18.5 12C18.5 12.83 19.17 13.5 20 13.5V15.5C20 16.33 19.33 17 18.5 17H5.5C4.67 17 4 16.33 4 15.5V13.5C4.83 13.5 5.5 12.83 5.5 12C5.5 11.17 4.83 10.5 4 10.5V8.5Z" fill="url(#goldGrad)" stroke="#dfb76c" strokeWidth="0.8" />
                <line x1="8" y1="9" x2="8" y2="15" stroke="#3b2b11" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
                <circle cx="14" cy="12" r="1.5" fill="#3b2b11" />
              </svg>
              <div className="leading-[1.1] font-sans">
                <div className="text-[10px] font-semibold text-slate-100">boarding</div>
                <div className="text-[9px] text-slate-400 font-light">vouchers</div>
              </div>
            </div>

            {/* Visa Approvals */}
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#dfb76c] drop-shadow-sm flex-shrink-0">
                <rect x="5" y="4" width="14" height="16" rx="2" fill="url(#goldGrad)" stroke="#dfb76c" strokeWidth="0.8" />
                <circle cx="12" cy="11" r="3.5" stroke="#3b2b11" strokeWidth="0.6" strokeDasharray="1 1" />
                <path d="M12 8.5V13.5M9.5 11H14.5" stroke="#3b2b11" strokeWidth="0.6" />
                <line x1="8" y1="16" x2="16" y2="16" stroke="#3b2b11" strokeWidth="0.8" />
              </svg>
              <div className="leading-[1.1] font-sans">
                <div className="text-[10px] font-semibold text-slate-100">visa</div>
                <div className="text-[9px] text-slate-400 font-light">approvals</div>
              </div>
            </div>

            {/* Loyalty Points */}
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#dfb76c] drop-shadow-sm flex-shrink-0">
                <path d="M12 3L16.5 8L12 13L7.5 8L12 3Z" fill="url(#goldGrad)" />
                <path d="M12 3L14.5 8L12 13L9.5 8L12 3Z" fill="url(#goldGradLight)" opacity="0.75" />
                <path d="M8 15L10.5 12.5L13 15L10.5 17.5L8 15Z" fill="url(#goldGrad)" />
                <path d="M14 16L16.5 13.5L19 16L16.5 18.5L14 16Z" fill="url(#goldGrad)" />
              </svg>
              <div className="leading-[1.1] font-sans">
                <div className="text-[10px] font-semibold text-slate-100">loyalty</div>
                <div className="text-[9px] text-slate-400 font-light">points</div>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-[0.2em] z-10 mt-8">
            © 2026 {companyName || 'ACER'} • Powered by ZATBIZ
          </div>
        </div>

        {/* Right column: Glassmorphic Auth Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-black/[0.10]">
          <div className="space-y-1 mb-7 text-left">
            <h3 className="text-2xl font-light text-slate-50 serif-font drop-shadow-sm">
              {isSignUp ? 'Create Traveler Account' : 'Sign In to Portal'}
            </h3>
            <p className="text-[9px] text-[#dfb76c] font-semibold uppercase tracking-[0.25em]">
              {isSignUp ? 'Register to start booking tours' : 'Enter your credentials below'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-650/20 border border-red-500/30 text-red-200 rounded-xl text-[10px] font-semibold text-center mb-4 backdrop-blur-md">
              ⚠️ {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-650/20 border border-emerald-500/30 text-emerald-200 rounded-xl text-[10px] font-semibold text-center mb-4 backdrop-blur-md">
              ✅ {successMessage}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4.5 text-xs font-semibold text-slate-100">
            {isSignUp && (
              <div className="space-y-1 text-left">
                <label className="text-[9px] font-bold uppercase tracking-wider text-[#dfb76c]">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full bg-white text-slate-900 border-none rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dfb76c] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] font-semibold transition-all text-xs"
                />
              </div>
            )}

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-bold uppercase tracking-wider text-[#dfb76c]">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="demo@zatbiz.com"
                required
                className="w-full bg-white text-slate-900 border-none rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dfb76c] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] font-semibold transition-all text-xs"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-bold uppercase tracking-wider text-[#dfb76c]">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full bg-white text-slate-900 border-none rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dfb76c] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] font-semibold transition-all text-xs"
              />
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-3.5 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-[#dfb76c]">Mobile *</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+91 99999 99999"
                    required
                    className="w-full bg-white text-slate-900 border-none rounded-xl px-3 py-2.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dfb76c] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] font-semibold transition-all text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-[#dfb76c]">City *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="New Delhi"
                    required
                    className="w-full bg-white text-slate-900 border-none rounded-xl px-3 py-2.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dfb76c] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] font-semibold transition-all text-xs"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-black/40 border border-[#dfb76c]/60 hover:border-[#dfb76c] text-[#dfb76c] hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(223,183,108,0.15)] hover:shadow-[0_0_25px_rgba(223,183,108,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 active:scale-[0.99]"
            >
              {isSignUp ? 'Register Account ➔' : 'Access Traveler Portal ➔'}
            </button>
          </form>

          {/* Toggle login vs signup */}
          <div className="mt-6 text-center text-slate-300 font-medium">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setIsSignUp(false)} 
                  className="bg-transparent border-none cursor-pointer font-bold hover:underline ml-1 text-[#dfb76c]"
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
                  className="bg-transparent border-none cursor-pointer font-bold hover:underline ml-1 text-[#dfb76c]"
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
