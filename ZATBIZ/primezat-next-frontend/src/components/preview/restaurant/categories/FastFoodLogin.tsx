'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CategoryLoginProps } from './types';

export function FastFoodLogin({
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

  // Preset fast food color accents (orange)
  const colors = {
    textAccent: 'text-orange-500',
    bgAccent: 'bg-orange-500',
    hoverBgAccent: 'hover:bg-orange-600',
    btnBorderAccent: 'border-orange-500'
  };

  return (
    <main className="min-h-screen bg-[#0d0e12] flex items-center justify-center p-0 md:p-6 text-slate-100 font-sans">
      <div className="w-full max-w-5xl bg-[#14151b] md:rounded-3xl border border-orange-500/10 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left Side: Bold fast food banner */}
        <div className="hidden md:flex md:col-span-5 bg-neutral-900 text-white p-10 flex-col justify-between relative overflow-hidden"
             style={{
               backgroundImage: "linear-gradient(rgba(15, 15, 18, 0.8), rgba(15, 15, 18, 0.95)), url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80')",
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
          <div className="flex items-center gap-2">
            <span className="text-3xl select-none">🍔</span>
            <div className="text-left font-sans">
              <h1 className="text-base font-black tracking-tight text-white uppercase leading-none">
                {companyName.replace(" Site", "")}
              </h1>
              <p className={`text-[8px] ${colors.textAccent} font-extrabold uppercase tracking-widest mt-1`}>Super Fast, Extra Fresh</p>
            </div>
          </div>
          
          <div className="space-y-6 z-10 text-left my-auto">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">
              Fuel Your <br/><span className={colors.textAccent}>Cravings!</span>
            </h2>
            <p className="text-slate-400 text-xs font-semibold leading-relaxed">
              Login to customize your double beef patties, track hot deliveries in real-time, and grab exclusive midnight coupon deals.
            </p>
            {/* Fries & Burger picture frame */}
            <div className="rounded-2xl overflow-hidden border border-orange-500/10 shadow-2xl h-40 bg-neutral-800">
              <img 
                src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80" 
                alt="Crispy fries" 
                className="w-full h-full object-cover filter brightness-95 hover:scale-102 transition duration-500"
              />
            </div>
          </div>

          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
            © 2026 {companyName.replace(" Site", "")}. All rights reserved.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="col-span-1 md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-[#14151b]">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div className="text-left">
              <span className={`text-[9px] font-black uppercase tracking-widest ${colors.textAccent} block mb-2`}>Fast food terminal</span>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">
                {isSignUp ? 'Create Diner Account' : 'Sign In To Order'}
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                {isSignUp ? 'Register to start receiving super saver combo codes.' : 'Please enter your login details.'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/20 border border-red-800/30 rounded-xl text-xs text-red-400 font-bold select-none text-left">
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
              <div className="rounded-2xl border border-slate-800 bg-[#1a1c23] p-4 text-left">
                <p className={`text-[9px] font-black uppercase tracking-wider ${colors.textAccent}`}>
                  DEMO PASSWORDS
                </p>
                <div className="mt-2 space-y-1 text-xs text-slate-400">
                  <p>
                    <span className="font-bold text-white">Manager:</span>{' '}
                    <span className={`bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 font-mono text-[10px] ${colors.textAccent} font-bold`}>admin@gmail.com</span>
                  </p>
                  <p>
                    <span className="font-bold text-white">Customer:</span>{' '}
                    <span className={`bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 font-mono text-[10px] ${colors.textAccent} font-bold`}>customer@gmail.com</span>
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-850 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/10 transition"
                  />
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={isSignUp ? '' : 'customer@gmail.com'}
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-slate-850 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/10 transition"
                />
              </div>

              {isSignUp && (
                <>
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-xl border border-slate-850 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/10 transition"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Delivery Location address
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      placeholder="Enter street address"
                      className="w-full rounded-xl border border-slate-850 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/10 transition resize-none"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  {!isSignUp && (
                    <a href="#" className={`text-xs font-bold ${colors.textAccent} hover:text-orange-450 transition`}>
                      Forgot?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  defaultValue={isSignUp ? '' : 'password123'}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-slate-850 bg-[#0d0e12] px-4 py-3 text-xs text-white outline-none focus:border-[#f97316] focus:ring-4 focus:ring-[#f97316]/10 transition"
                />
              </div>

              <button
                type="submit"
                className={`w-full mt-4 rounded-xl py-3 px-4 text-xs font-black uppercase tracking-wider text-white ${colors.bgAccent} ${colors.hoverBgAccent} shadow-md shadow-orange-500/10 transition cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-none`}
              >
                {isSignUp ? 'Activate Account' : 'Login To Order'}
              </button>
            </form>

            {!isSignUp && (
              <div className="space-y-4 pt-2">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-4 text-[9px] text-slate-500 font-extrabold uppercase tracking-wider">or fast bypass</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => {
                    localStorage.setItem('clientEmail', 'customer@gmail.com');
                    localStorage.setItem('clientName', 'Hungry FastFoodie');
                    localStorage.setItem('clientId', '777');
                    router.push(`/preview/${projectId}/dashboard`);
                  }} className={`flex items-center justify-center gap-2 py-2.5 border border-slate-800 hover:bg-[#1a1c23] rounded-xl text-xs font-bold ${colors.textAccent} bg-transparent transition cursor-pointer`}>
                    ⚡ Instant Customer
                  </button>
                  <button type="button" onClick={() => {
                    localStorage.setItem('clientEmail', 'customer@gmail.com');
                    localStorage.setItem('clientName', 'Quick Eater');
                    localStorage.setItem('clientId', '778');
                    router.push(`/preview/${projectId}/dashboard`);
                  }} className="flex items-center justify-center gap-2 py-2.5 border border-slate-800 hover:bg-[#1a1c23] rounded-xl text-xs font-bold text-slate-300 bg-transparent transition cursor-pointer">
                    🍔 Combo Bypass
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
                className={`text-xs font-bold ${colors.textAccent} hover:text-orange-450 transition underline cursor-pointer bg-transparent border-0`}
              >
                {isSignUp ? 'Already registered? Sign In' : 'Create customer account'}
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-slate-850 pt-5 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <Link href={`/preview/${projectId}`} className={`hover:${colors.textAccent} transition`}>
                ← Back to Homepage
              </Link>
              <span className="text-[9px] text-orange-500/80 font-black">⚡ EXPRESS DELIVERY</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
