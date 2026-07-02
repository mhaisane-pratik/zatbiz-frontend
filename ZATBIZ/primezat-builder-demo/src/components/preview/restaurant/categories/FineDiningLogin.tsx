'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CategoryLoginProps } from './types';

export function FineDiningLogin({
  projectId,
  companyName,
  logoIcon,
  logoUrl,
  isSignUp,
  setIsSignUp,
  errorMessage,
  successMessage,
  handleLoginSubmit
}: CategoryLoginProps) {
  const router = useRouter();

  const colors = {
    textAccent: 'text-[#c5a880]',
    bgAccent: 'bg-[#c5a880]',
    hoverBgAccent: 'hover:bg-[#d8c2a3]'
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-0 md:p-6 text-[#e2e8f0] font-serif">
      <div className="w-full max-w-5xl bg-[#111217] md:rounded-3xl border border-[#2a2c35]/50 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left Side: Luxury Illustration & Brand */}
        <div className="hidden md:flex md:col-span-5 bg-neutral-900 text-white p-10 flex-col justify-between relative overflow-hidden"
             style={{
               backgroundImage: "linear-gradient(rgba(13, 14, 18, 0.85), rgba(13, 14, 18, 0.9)), url('https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80')",
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
          <div className="flex items-center gap-2">
            <span className={`text-3xl ${colors.textAccent} select-none`}>⚜️</span>
            <div className="text-left font-sans">
              <h1 className={`text-base font-black tracking-widest ${colors.textAccent} uppercase leading-none`}>
                {companyName.replace(" Site", "")}
              </h1>
              <p className="text-[8px] text-stone-400 font-extrabold uppercase tracking-widest mt-1">Haute Cuisine & Cellar</p>
            </div>
          </div>
          
          <div className="space-y-6 z-10 text-left my-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight font-serif">
              An Exquisite <br/>Experience Awaits.
            </h2>
            <p className="text-stone-400 text-xs font-sans leading-relaxed">
              Log in to confirm your dining reservations, review sommelier recommendations, or preview tonight's chef menu.
            </p>
            {/* Custom Plating image frame */}
            <div className="rounded-xl overflow-hidden border border-[#c5a880]/30 shadow-2xl h-40 bg-neutral-955">
              <img 
                src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=80" 
                alt="Exquisite plating" 
                className="w-full h-full object-cover filter brightness-90 hover:scale-102 transition duration-500"
              />
            </div>
          </div>

          <p className="text-[9px] text-stone-600 font-sans font-bold uppercase tracking-widest">
            © 2026 {companyName.replace(" Site", "")}. All rights reserved.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="col-span-1 md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-[#111217]">
          <div className="max-w-md w-full mx-auto space-y-8 font-sans">
            <div className="text-left">
              <span className={`text-[9px] font-black uppercase tracking-widest ${colors.textAccent} block mb-2`}>Secure Gateway</span>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase font-serif">
                {isSignUp ? 'Create Guest Account' : 'Diner Console Sign In'}
              </h2>
              <p className="text-xs text-stone-400 font-semibold mt-1">
                {isSignUp ? 'Register to reserve prime seating and access cellar vintages.' : 'Please enter your guest credentials.'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950 border border-red-100 rounded-xl text-xs text-red-400 font-bold select-none text-left">
                ⚠️ {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-850/30 rounded-xl text-xs text-emerald-400 font-bold select-none text-left">
                ✅ {successMessage}
              </div>
            )}

            {/* Quick Credentials Card */}
            {!isSignUp && (
              <div className="rounded-2xl border border-stone-800/80 bg-stone-900/30 p-4 text-left">
                <p className={`text-[9px] font-black uppercase tracking-wider ${colors.textAccent}`}>
                  GUEST SEED ACCESS
                </p>
                <div className="mt-2 space-y-1 text-xs text-stone-400">
                  <p>
                    <span className="font-bold text-white">Admin Console:</span>{' '}
                    <span className={`bg-stone-950 border border-stone-800 rounded px-1.5 py-0.5 font-mono text-[10px] ${colors.textAccent} font-bold`}>admin@gmail.com</span>
                  </p>
                  <p>
                    <span className="font-bold text-white">Diner Console:</span>{' '}
                    <span className={`bg-stone-950 border border-stone-800 rounded px-1.5 py-0.5 font-mono text-[10px] ${colors.textAccent} font-bold`}>customer@gmail.com</span>
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-stone-800 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#c5a880] focus:ring-4 focus:ring-[#c5a880]/10 transition font-sans"
                  />
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={isSignUp ? '' : 'customer@gmail.com'}
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-stone-800 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#c5a880] focus:ring-4 focus:ring-[#c5a880]/10 transition font-sans"
                />
              </div>

              {isSignUp && (
                <>
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-xl border border-stone-800 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#c5a880] focus:ring-4 focus:ring-[#c5a880]/10 transition font-sans"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                      Address (For Private Events)
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      placeholder="Enter street address"
                      className="w-full rounded-xl border border-stone-800 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#c5a880] focus:ring-4 focus:ring-[#c5a880]/10 transition resize-none font-sans"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Password
                  </label>
                  {!isSignUp && (
                    <a href="#" className={`text-xs font-bold ${colors.textAccent} hover:text-[#d8c2a3] transition`}>
                      Forgot?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  defaultValue={isSignUp ? '' : 'password123'}
                  placeholder="Enter guest password"
                  className="w-full rounded-xl border border-stone-800 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#c5a880] focus:ring-4 focus:ring-[#c5a880]/10 transition font-sans"
                />
              </div>

              <button
                type="submit"
                className={`w-full mt-4 rounded-xl py-3 px-4 text-xs font-black uppercase tracking-widest text-black bg-[#c5a880] ${colors.hoverBgAccent} shadow-md shadow-[#c5a880]/10 transition cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-none font-sans`}
              >
                {isSignUp ? 'Create Guest Account' : 'Authenticate Credentials'}
              </button>
            </form>

            {!isSignUp && (
              <div className="space-y-4 pt-2">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-stone-800"></div>
                  <span className="flex-shrink mx-4 text-[9px] text-stone-500 font-extrabold uppercase tracking-widest">or guest bypass</span>
                  <div className="flex-grow border-t border-stone-800"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => {
                    localStorage.setItem('clientEmail', 'customer@gmail.com');
                    localStorage.setItem('clientName', 'Platinum Diner');
                    localStorage.setItem('clientId', '888');
                    router.push(`/preview/${projectId}/dashboard`);
                  }} className={`flex items-center justify-center gap-2 py-2.5 border border-stone-800 hover:bg-stone-900 rounded-xl text-xs font-bold ${colors.textAccent} bg-transparent transition cursor-pointer`}>
                    👑 Premium VIP
                  </button>
                  <button type="button" onClick={() => {
                    localStorage.setItem('clientEmail', 'customer@gmail.com');
                    localStorage.setItem('clientName', 'Reserve Diner');
                    localStorage.setItem('clientId', '889');
                    router.push(`/preview/${projectId}/dashboard`);
                  }} className="flex items-center justify-center gap-2 py-2.5 border border-stone-800 hover:bg-stone-900 rounded-xl text-xs font-bold text-stone-300 bg-transparent transition cursor-pointer">
                    🍽️ Direct Reserve
                  </button>
                </div>
              </div>
            )}

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                }}
                className={`text-xs font-bold ${colors.textAccent} hover:text-[#d8c2a3] transition underline cursor-pointer bg-transparent border-0 font-sans`}
              >
                {isSignUp ? 'Already registered? Sign In' : 'Create guest account'}
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-stone-850 pt-5 text-xs text-stone-500 font-bold uppercase tracking-wider font-sans">
              <Link href={`/preview/${projectId}`} className={`hover:${colors.textAccent} transition font-sans`}>
                ← Return to Site
              </Link>
              <span className={`text-[9px] ${colors.textAccent} font-black`}>⚜️ EXQUISITE SERVICE</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
