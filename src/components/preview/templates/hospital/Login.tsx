'use client';

import React from 'react';
import Link from 'next/link';

interface HospitalLoginProps {
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

export default function HospitalLogin({
  projectId,
  isSignUp,
  setIsSignUp,
  companyName,
  logoUrl,
  logoIcon,
  errorMessage,
  successMessage,
  handleLoginSubmit,
}: HospitalLoginProps) {
  const illustrationUrl = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80';

  return (
    <main className="min-h-screen bg-slate-50 flex items-stretch text-slate-800 font-sans">
      {/* Left side: Clinical Illustration */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative flex-col justify-between p-12 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 148, 136, 0.4), rgba(15, 23, 42, 0.85)), url('${illustrationUrl}')`
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{logoIcon || '🏥'}</span>
          <span className="text-xl font-black uppercase tracking-wider">{companyName || 'Hope Care'}</span>
        </div>

        <div className="space-y-4 max-w-md text-left my-auto">
          <span className="bg-teal-500/25 border border-teal-400/20 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            Patient & Staff Gateway
          </span>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            Comprehensive Care & Health Monitoring
          </h2>
          <p className="text-xs text-slate-350 font-medium leading-relaxed">
            Securely access clinical appointment slots, consulting physician profiles, lab diagnostics history, and your electronic medical records.
          </p>
        </div>

        <p className="text-[10px] text-teal-400 font-black uppercase tracking-wider">
          © 2026 {companyName || 'Hope Care'}. Secure Health Portal.
        </p>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {isSignUp ? 'Register Patient Account' : 'Sign In to Health Portal'}
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              {isSignUp ? 'Sign up to request appointments and view medical logs.' : 'Enter your registered credentials to access your console.'}
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
            <div className="rounded-2xl border border-teal-100 bg-teal-50/20 p-4 text-left">
              <p className="text-[9px] font-black uppercase tracking-wider text-teal-600">
                Quick Portal Access
              </p>
              <div className="mt-2 space-y-1 text-xs text-slate-600">
                <p>
                  <span className="font-bold text-slate-800">Admin Email:</span>{' '}
                  <span className="bg-white border border-teal-100 rounded px-1.5 py-0.5 font-mono text-[10px] text-teal-600 font-bold">admin@gmail.com</span>
                </p>
                <p>
                  <span className="font-bold text-slate-800">Patient Email:</span>{' '}
                  <span className="bg-white border border-teal-100 rounded px-1.5 py-0.5 font-mono text-[10px] text-teal-600 font-bold">patient@gmail.com</span>
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition"
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
                defaultValue={isSignUp ? '' : 'patient@gmail.com'}
                placeholder="Enter email address"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition"
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                    Residential Address
                  </label>
                  <textarea
                    name="address"
                    rows={2}
                    required
                    placeholder="Enter your home address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition resize-none"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 rounded-xl py-3 px-4 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 cursor-pointer shadow-md shadow-teal-500/15 uppercase tracking-wider transition-all"
            >
              {isSignUp ? 'Create Patient Account' : 'Authenticate & Sign In'}
            </button>
          </form>

          <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-teal-600 hover:underline bg-transparent border-0 cursor-pointer"
            >
              {isSignUp ? 'Already registered? Sign In' : 'New patient? Register Account'}
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
