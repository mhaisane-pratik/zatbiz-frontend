import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoginTemplateProps } from './types';

export function CategoryLoginTemplate({
  projectId,
  companyName,
  logoIcon,
  logoUrl,
  isSignUp,
  setIsSignUp,
  errorMessage,
  successMessage,
  handleLoginSubmit,
  niche,
  themeColor,
  img,
  desc,
  emoji
}: LoginTemplateProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-0 md:p-6 text-slate-800 font-sans">
      <div className="w-full max-w-5xl bg-white md:rounded-3xl border border-stone-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left Banner */}
        <div className="hidden md:flex md:col-span-5 bg-neutral-900 text-white p-10 flex-col justify-between relative overflow-hidden"
             style={{
               backgroundImage: `linear-gradient(rgba(15, 15, 18, 0.75), rgba(15, 15, 18, 0.9)), url('${img}')`,
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
          <div className="flex items-center gap-2">
            <span className="text-3xl select-none">{emoji}</span>
            <div className="text-left font-sans">
              <h1 className="text-base font-black tracking-tight text-white uppercase leading-none">
                {companyName.replace(" Site", "")}
              </h1>
              <p className="text-[8px] font-extrabold uppercase tracking-widest mt-1" style={{ color: themeColor }}>Premium {niche}</p>
            </div>
          </div>
          
          <div className="space-y-6 z-10 text-left my-auto">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight font-serif">
              Fresh Food <br/><span style={{ color: themeColor }}>Awaits.</span>
            </h2>
            <p className="text-slate-300 text-xs font-semibold leading-relaxed">
              Login to access your diner dashboard, schedule table bookings, review items, and unlock special catalog discounts.
            </p>
            <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl h-40 bg-neutral-800">
              <img 
                src={img} 
                alt="Delicious food" 
                className="w-full h-full object-cover filter brightness-95 hover:scale-102 transition duration-500"
              />
            </div>
          </div>

          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            © 2026 {companyName.replace(" Site", "")}. All rights reserved.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="col-span-1 md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div className="text-left">
              <span className="text-[9px] font-black uppercase tracking-widest block mb-2" style={{ color: themeColor }}>Secure Portal</span>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase font-serif">
                {isSignUp ? 'Create Diner Account' : 'Sign In To Order'}
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                {isSignUp ? 'Register to reserve seating and customize dining orders.' : 'Please enter your login details.'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-bold select-none text-left">
                ⚠️ {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-600 font-bold select-none text-left">
                ✅ {successMessage}
              </div>
            )}

            {/* Quick Credentials Card */}
            {!isSignUp && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-4 text-left">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">
                  DEMO PASSWORDS
                </p>
                <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                  <p>
                    <span className="font-bold text-slate-700">Manager:</span>{' '}
                    <span className="bg-stone-100 border border-stone-200 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold" style={{ color: themeColor }}>admin@gmail.com</span>
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Customer:</span>{' '}
                    <span className="bg-stone-100 border border-stone-200 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold" style={{ color: themeColor }}>customer@gmail.com</span>
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-xs text-slate-800 outline-none focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-opacity-10 transition"
                    style={{ '--tw-ring-color': themeColor } as any}
                  />
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={isSignUp ? '' : 'customer@gmail.com'}
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-xs text-slate-800 outline-none focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-opacity-10 transition"
                  style={{ '--tw-ring-color': themeColor } as any}
                />
              </div>

              {isSignUp && (
                <>
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-xs text-slate-800 outline-none focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-opacity-10 transition"
                      style={{ '--tw-ring-color': themeColor } as any}
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Delivery Address
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      placeholder="Enter street address"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-xs text-slate-800 outline-none focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-opacity-10 transition resize-none"
                      style={{ '--tw-ring-color': themeColor } as any}
                    />
                  </div>
                </>
              )}

              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Password
                  </label>
                  {!isSignUp && (
                    <a href="#" className="text-xs font-bold transition" style={{ color: themeColor }}>
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
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-xs text-slate-800 outline-none focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-opacity-10 transition"
                  style={{ '--tw-ring-color': themeColor } as any}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 rounded-xl py-3 px-4 text-xs font-black uppercase tracking-wider text-white transition cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-none shadow-md"
                style={{ backgroundColor: themeColor }}
              >
                {isSignUp ? 'Create Diner Account' : 'Sign In To Order'}
              </button>
            </form>

            {!isSignUp && (
              <div className="space-y-4 pt-2">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-stone-200"></div>
                  <span className="flex-shrink mx-4 text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">or fast bypass</span>
                  <div className="flex-grow border-t border-stone-200"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => {
                    localStorage.setItem('clientEmail', 'customer@gmail.com');
                    localStorage.setItem('clientName', 'Gourmet Diner');
                    localStorage.setItem('clientId', '666');
                    router.push(`/preview/${projectId}/dashboard`);
                  }} className="flex items-center justify-center gap-2 py-2.5 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-bold bg-transparent transition cursor-pointer" style={{ color: themeColor }}>
                    ⚡ Instant Diner
                  </button>
                  <button type="button" onClick={() => {
                    localStorage.setItem('clientEmail', 'customer@gmail.com');
                    localStorage.setItem('clientName', 'Quick Eater');
                    localStorage.setItem('clientId', '667');
                    router.push(`/preview/${projectId}/dashboard`);
                  }} className="flex items-center justify-center gap-2 py-2.5 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-bold text-slate-600 bg-transparent transition cursor-pointer">
                    🍗 Taste Bypass
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
                className="text-xs font-bold transition underline cursor-pointer bg-transparent border-0 font-sans"
                style={{ color: themeColor }}
              >
                {isSignUp ? 'Already registered? Sign In' : 'Create customer account'}
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-5 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <Link href={`/preview/${projectId}`} className="hover:text-slate-800 transition">
                ← Back to Site
              </Link>
              <span className="text-[9px] font-black" style={{ color: themeColor }}>⚡ AUTHENTIC KITCHENS</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
