'use client';

import React from 'react';
import Link from 'next/link';

interface StorefrontLoginProps {
  projectId: number;
  isSignUp: boolean;
  setIsSignUp: (s: boolean) => void;
  companyName: string;
  logoUrl: string;
  logoIcon: string;
  errorMessage: string;
  successMessage: string;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  illustrationUrl?: string;
  title?: string;
  subtitle?: string;
  btnText?: string;
  themePreset?: string;
}

export default function StorefrontLogin({
  projectId,
  isSignUp,
  setIsSignUp,
  companyName,
  logoUrl,
  logoIcon,
  errorMessage,
  successMessage,
  handleLoginSubmit,
  illustrationUrl,
  title,
  subtitle,
  btnText,
  themePreset,
}: StorefrontLoginProps) {
  const activeIllustrationUrl = illustrationUrl && !illustrationUrl.startsWith('/images/') 
    ? illustrationUrl 
    : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80';

  const activeTitle = title || 'Explore Curated Collections & Deals';
  const activeSubtitle = subtitle || 'Log in to manage your shopping cart, apply promotional discount coupons, checkout securely, and track delivery shipments in real-time.';
  const activeBtnText = btnText || 'Sign In to Store';

  const themeStyles: Record<string, {
    overlay: string;
    badge: string;
    btn: string;
    link: string;
    ring: string;
  }> = {
    emerald: {
      overlay: 'linear-gradient(rgba(16, 185, 129, 0.45), rgba(15, 23, 42, 0.88))',
      badge: 'bg-emerald-500/25 border-emerald-400/20 text-emerald-300',
      btn: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/15',
      link: 'text-emerald-600 hover:text-emerald-700',
      ring: 'focus:border-emerald-500 focus:ring-emerald-500/10'
    },
    sunset: {
      overlay: 'linear-gradient(rgba(249, 115, 22, 0.45), rgba(15, 23, 42, 0.88))',
      badge: 'bg-orange-500/25 border-orange-400/20 text-orange-300',
      btn: 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/15',
      link: 'text-orange-650 hover:text-orange-700',
      ring: 'focus:border-orange-500 focus:ring-orange-500/10'
    },
    deepblue: {
      overlay: 'linear-gradient(rgba(59, 130, 246, 0.45), rgba(15, 23, 42, 0.88))',
      badge: 'bg-indigo-500/25 border-indigo-400/20 text-indigo-300',
      btn: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/15',
      link: 'text-indigo-650 hover:text-indigo-700',
      ring: 'focus:border-indigo-500 focus:ring-indigo-500/10'
    },
    purple: {
      overlay: 'linear-gradient(rgba(139, 92, 246, 0.45), rgba(15, 23, 42, 0.88))',
      badge: 'bg-purple-500/25 border-purple-400/20 text-purple-300',
      btn: 'bg-purple-650 hover:bg-purple-700 shadow-purple-650/15',
      link: 'text-purple-650 hover:text-purple-700',
      ring: 'focus:border-purple-500 focus:ring-purple-500/10'
    },
    slate: {
      overlay: 'linear-gradient(rgba(71, 85, 105, 0.45), rgba(15, 23, 42, 0.88))',
      badge: 'bg-slate-500/25 border-slate-400/20 text-slate-300',
      btn: 'bg-slate-700 hover:bg-slate-800 shadow-slate-700/15',
      link: 'text-slate-700 hover:text-slate-800',
      ring: 'focus:border-slate-500 focus:ring-slate-500/10'
    }
  };

  const style = themeStyles[themePreset || 'slate'] || themeStyles.slate;

  return (
    <main className="min-h-screen bg-slate-50 flex items-stretch text-slate-800 font-sans">
      {/* Left side: E-commerce Illustration */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative flex-col justify-between p-12 text-white"
        style={{
          backgroundImage: `${style.overlay}, url('${activeIllustrationUrl}')`
        }}
      >
        <div className="flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-white/10" />
          ) : (
            <span className="text-2xl">{logoIcon || '👜'}</span>
          )}
          <span className="text-xl font-black uppercase tracking-wider">{companyName || 'Retail Shop'}</span>
        </div>

        <div className="space-y-4 max-w-md text-left my-auto">
          <span className={`border px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${style.badge}`}>
            Ecommerce Catalog Storefront
          </span>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            {activeTitle}
          </h2>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {activeSubtitle}
          </p>
        </div>

        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
          © 2026 {companyName || 'Retail Shop'}. All rights reserved.
        </p>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {isSignUp ? 'Create Customer Profile' : activeBtnText}
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              {isSignUp 
                ? 'Register to apply discounts and place orders.' 
                : (activeSubtitle.length > 80 ? 'Sign in to access your shopping dashboard.' : activeSubtitle)}
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
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-left">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Demo Accounts
              </p>
              <div className="mt-2 space-y-1 text-xs text-slate-600">
                <p>
                  <span className="font-bold text-slate-800">Admin Email:</span>{' '}
                  <span className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-[10px] text-slate-600 font-bold">admin@gmail.com</span>
                </p>
                <p>
                  <span className="font-bold text-slate-800">Customer Email:</span>{' '}
                  <span className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-[10px] text-slate-600 font-bold">customer@gmail.com</span>
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
                  className={`w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:ring-4 transition ${style.ring}`}
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
                defaultValue={isSignUp ? '' : 'customer@gmail.com'}
                placeholder="Enter email address"
                className={`w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:ring-4 transition ${style.ring}`}
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
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:ring-4 transition ${style.ring}`}
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                    Shipping Address
                  </label>
                  <textarea
                    name="address"
                    rows={2}
                    required
                    placeholder="Enter your delivery address"
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:ring-4 transition resize-none ${style.ring}`}
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
                className={`w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:ring-4 transition ${style.ring}`}
              />
            </div>

            <button
              type="submit"
              className={`w-full mt-4 rounded-xl py-3 px-4 text-xs font-bold text-white cursor-pointer uppercase tracking-wider transition-all border-none ${style.btn}`}
            >
              {isSignUp ? 'Create Customer Profile' : activeBtnText}
            </button>
          </form>

          <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`font-bold bg-transparent border-0 cursor-pointer ${style.link} hover:underline`}
            >
              {isSignUp ? 'Already registered? Sign In' : 'New customer? Create Profile'}
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
