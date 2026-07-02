'use client';

import React from 'react';
import Link from 'next/link';

interface GymLoginProps {
  projectId: number;
  isSignUp: boolean;
  setIsSignUp: (s: boolean) => void;
  companyName: string;
  logoUrl: string;
  logoIcon: string;
  errorMessage: string;
  successMessage: string;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function GymLogin({
  projectId,
  isSignUp,
  setIsSignUp,
  companyName,
  logoUrl,
  logoIcon,
  errorMessage,
  successMessage,
  handleLoginSubmit,
}: GymLoginProps) {
  const illustrationUrl = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80';

  return (
    <main className="min-h-screen bg-slate-50 flex items-stretch text-slate-800 font-sans">
      {/* Left side: Gym Illustration */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative flex-col justify-between p-12 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(79, 70, 229, 0.4), rgba(15, 23, 42, 0.85)), url('${illustrationUrl}')`
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{logoIcon || '🏋️'}</span>
          <span className="text-xl font-black uppercase tracking-wider">{companyName || 'Iron Gym'}</span>
        </div>

        <div className="space-y-4 max-w-md text-left my-auto">
          <span className="bg-indigo-500/25 border border-indigo-400/20 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            Iron Gym Portal Gateway
          </span>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            Push Your Limits, Unleash Your Power
          </h2>
          <p className="text-xs text-slate-355 font-medium leading-relaxed">
            Log in to book fitness classes, browse gym merchandise collections, access trainer-guided workout sheets, and track active memberships.
          </p>
        </div>

        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-wider">
          © 2026 {companyName || 'Iron Gym'}. Fitness Systems.
        </p>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {isSignUp ? 'Join the Gym Team' : 'Sign In to Fitness Portal'}
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              {isSignUp ? 'Register to reserve training seats.' : 'Authenticate credentials to manage training sheets.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-600 font-bold select-none text-left">
              ⚠️ {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-600 font-bold select-none text-left">
              ✅ {successMessage}
            </div>
          )}

          {/* Quick Demo Credentials */}
          {!isSignUp && (
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/20 p-4 text-left">
              <p className="text-[9px] font-black uppercase tracking-wider text-indigo-650">
                Demo Accounts
              </p>
              <div className="mt-2 space-y-1 text-xs text-slate-600">
                <p>
                  <span className="font-bold text-slate-800">Admin Email:</span>{' '}
                  <span className="bg-white border border-indigo-100 rounded px-1.5 py-0.5 font-mono text-[10px] text-indigo-650 font-bold">admin@gmail.com</span>
                </p>
                <p>
                  <span className="font-bold text-slate-800">Member Email:</span>{' '}
                  <span className="bg-white border border-indigo-100 rounded px-1.5 py-0.5 font-mono text-[10px] text-indigo-650 font-bold">member@gmail.com</span>
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                />
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                defaultValue={isSignUp ? '' : 'member@gmail.com'}
                placeholder="Enter email address"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            {isSignUp && (
              <>
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                    Home Address
                  </label>
                  <textarea
                    name="address"
                    rows={2}
                    required
                    placeholder="Enter your home address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition resize-none"
                  />
                </div>
              </>
            )}

            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 rounded-xl py-3 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-750 cursor-pointer shadow-md shadow-indigo-500/15 uppercase tracking-wider transition-all"
            >
              {isSignUp ? 'Register Membership' : 'Sign In to Workspace'}
            </button>
          </form>

          <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-indigo-600 hover:underline bg-transparent border-0 cursor-pointer"
            >
              {isSignUp ? 'Already registered? Sign In' : 'New member? Join Team'}
            </button>
            <Link
              href={`/preview/${projectId}`}
              className="text-slate-400 hover:text-slate-700 transition"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
