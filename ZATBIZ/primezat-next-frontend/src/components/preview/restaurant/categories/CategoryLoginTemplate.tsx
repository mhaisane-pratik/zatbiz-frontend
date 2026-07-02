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
  emoji,
  restaurantInfo
}: LoginTemplateProps) {
  const router = useRouter();
  const [slideIndex, setSlideIndex] = React.useState(0);
  const loyaltySlides = [
    { title: "Fresh Food", highlight: "Awaits.", desc: "Login to access your diner dashboard, schedule table bookings, and order premium dishes." },
    { title: "Earn 10%", highlight: "Cash Back.", desc: "Collect reward points on every table reservation or delivery order to redeem on your next visit." },
    { title: "Priority Table", highlight: "Bookings.", desc: "Enjoy instant dining slot allocations and bypass long queues during peak operational hours." }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % loyaltySlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const selectedLoginLayout = restaurantInfo?.selectedLoginLayout || 'left-illustration';
  
  const isMinimal = selectedLoginLayout === 'minimal-logo';
  const isRightIllust = selectedLoginLayout === 'right-illustration';
  const isNeonDark = selectedLoginLayout === 'neon-dark';
  const isFloating = selectedLoginLayout === 'floating-dishes';
  const isCurved = selectedLoginLayout === 'curved-wave';

  // Base background and text colors
  const mainBgClass = isNeonDark 
    ? 'bg-[#090a0f] text-[#f1f5f9] font-sans' 
    : isFloating 
    ? 'bg-[#0d0e12] text-[#f1f5f9] font-sans relative overflow-hidden' 
    : 'bg-[#faf8f5] text-slate-800 font-sans';

  const cardClass = isMinimal
    ? (isNeonDark ? 'w-full max-w-md bg-[#12131a] border border-orange-500/20 shadow-2xl rounded-3xl p-8' : 'w-full max-w-md bg-white border border-stone-200/80 shadow-2xl rounded-3xl p-8')
    : isNeonDark
    ? 'w-full max-w-5xl bg-[#12131a] md:rounded-3xl border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]'
    : isFloating
    ? 'w-full max-w-5xl bg-white/5 backdrop-blur-xl md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]'
    : 'w-full max-w-5xl bg-white md:rounded-3xl border border-stone-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]';

  // Form block style classes
  const formBlockClass = isMinimal
    ? 'space-y-6'
    : isNeonDark
    ? 'col-span-12 md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-[#12131a] text-white'
    : isFloating
    ? 'col-span-12 md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-transparent text-white'
    : 'col-span-12 md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white';

  const textLabelClass = (isNeonDark || isFloating)
    ? 'block text-[10px] font-black uppercase tracking-wider text-slate-400'
    : 'block text-[10px] font-black uppercase tracking-wider text-slate-505';

  const inputClass = (isNeonDark || isFloating)
    ? 'w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-xs text-white outline-none focus:border-orange-500 focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 transition'
    : 'w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-xs text-slate-805 outline-none focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-opacity-10 transition';

  const titleClass = (isNeonDark || isFloating)
    ? 'text-2xl font-black text-white tracking-tight uppercase font-serif'
    : 'text-2xl font-black text-slate-800 tracking-tight uppercase font-serif';

  const subtitleClass = (isNeonDark || isFloating)
    ? 'text-xs text-slate-400 font-semibold mt-1'
    : 'text-xs text-slate-500 font-semibold mt-1';

  const demoCardClass = (isNeonDark || isFloating)
    ? 'rounded-2xl border border-slate-800 bg-slate-900/30 p-4 text-left'
    : 'rounded-2xl border border-stone-200 bg-stone-50/50 p-4 text-left';

  const demoLabelClass = (isNeonDark || isFloating)
    ? 'font-bold text-slate-300'
    : 'font-bold text-slate-700';

  const demoSpanClass = (isNeonDark || isFloating)
    ? 'bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold text-orange-400'
    : 'bg-stone-100 border border-stone-200 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold';

  const fastBypassBtnClass = (isNeonDark || isFloating)
    ? 'flex items-center justify-center gap-2 py-2.5 border border-slate-800 hover:bg-slate-900 rounded-xl text-xs font-bold bg-transparent transition cursor-pointer text-white'
    : 'flex items-center justify-center gap-2 py-2.5 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-bold text-slate-650 bg-transparent transition cursor-pointer';

  return (
    <main className={`min-h-screen flex items-center justify-center p-0 md:p-6 ${mainBgClass}`}>
      {/* Background Floating Dishes decoration overlay */}
      {isFloating && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 text-9xl animate-pulse">🍅</div>
          <div className="absolute bottom-20 right-10 text-9xl animate-bounce">🌿</div>
          <div className="absolute top-1/2 right-1/4 text-9xl">🍋</div>
          <div className="absolute bottom-10 left-1/3 text-9xl">🧅</div>
        </div>
      )}

      <div className={cardClass}>
        {/* Left/Right Banner (hides on isMinimal) */}
        {!isMinimal && (
          <div className={`hidden md:flex md:col-span-5 bg-neutral-950 text-white p-10 flex-col justify-between relative overflow-hidden ${
            isRightIllust ? 'order-1 md:order-last border-l border-white/10' : 'order-2 md:order-first'
          } ${isCurved ? 'md:rounded-r-[80px]' : ''}`}>
            {/* Ken Burns Animated Background Image */}
            <div 
              className="absolute inset-0 z-0 animate-kenburns scale-110"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 15, 18, 0.8), rgba(15, 15, 18, 0.95)), url('${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <div className="flex items-center gap-2 z-10">
              <span className="text-3xl select-none">{emoji}</span>
              <div className="text-left font-sans">
                <h1 className="text-base font-black tracking-tight text-white uppercase leading-none">
                  {companyName.replace(" Site", "")}
                </h1>
                <p className="text-[8px] font-extrabold uppercase tracking-widest mt-1" style={{ color: themeColor }}>Premium {niche}</p>
              </div>
            </div>
            
            <div className="space-y-6 z-10 text-left my-auto transition-all duration-500">
              <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight font-serif min-h-[72px]">
                {loyaltySlides[slideIndex].title} <br/><span style={{ color: themeColor }}>{loyaltySlides[slideIndex].highlight}</span>
              </h2>
              <p className="text-slate-300 text-xs font-semibold leading-relaxed min-h-[48px]">
                {loyaltySlides[slideIndex].desc}
              </p>
              <div className="rounded-2xl overflow-hidden border border-neutral-850 shadow-2xl h-40 bg-neutral-900">
                <img 
                  src={img} 
                  alt="Delicious food" 
                  className="w-full h-full object-cover filter brightness-95 hover:scale-102 transition duration-500"
                />
              </div>
            </div>

            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider z-10 font-sans">
              © 2026 {companyName.replace(" Site", "")}. All rights reserved.
            </p>

            <style>{`
              @keyframes kenburns {
                0% { transform: scale(1.08) translate(0, 0); }
                50% { transform: scale(1.18) translate(-1%, -1%); }
                100% { transform: scale(1.08) translate(0, 0); }
              }
              .animate-kenburns {
                animation: kenburns 20s ease-in-out infinite;
              }
            `}</style>
          </div>
        )}

        {/* Form Side */}
        <div className={formBlockClass}>
          <div className="max-w-md w-full mx-auto space-y-8">
            <div className="text-left">
              <span className="text-[9px] font-black uppercase tracking-widest block mb-2" style={{ color: isNeonDark ? '#f97316' : themeColor }}>Secure Portal</span>
              <h2 className={titleClass}>
                {isSignUp ? 'Create Diner Account' : 'Sign In To Order'}
              </h2>
              <p className={subtitleClass}>
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
              <div className={demoCardClass}>
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  DEMO PASSWORDS
                </p>
                <div className="mt-2 space-y-1.5 text-xs">
                  <p>
                    <span className={demoLabelClass}>Manager:</span>{' '}
                    <span className={demoSpanClass}>admin@gmail.com</span>
                  </p>
                  <p>
                    <span className={demoLabelClass}>Customer:</span>{' '}
                    <span className={demoSpanClass}>customer@gmail.com</span>
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5 text-left">
                  <label className={textLabelClass}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className={inputClass}
                    style={{ '--tw-ring-color': themeColor } as any}
                  />
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className={textLabelClass}>
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={isSignUp ? '' : 'customer@gmail.com'}
                  placeholder="Enter email address"
                  className={inputClass}
                  style={{ '--tw-ring-color': themeColor } as any}
                />
              </div>

              {isSignUp && (
                <>
                  <div className="space-y-1.5 text-left">
                    <label className={textLabelClass}>
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className={inputClass}
                      style={{ '--tw-ring-color': themeColor } as any}
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className={textLabelClass}>
                      Delivery Address
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      placeholder="Enter street address"
                      className={`${inputClass} resize-none`}
                      style={{ '--tw-ring-color': themeColor } as any}
                    />
                  </div>
                </>
              )}

              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label className={textLabelClass}>
                    Password
                  </label>
                  {!isSignUp && (
                    <a href="#" className="text-xs font-bold transition" style={{ color: isNeonDark ? '#f97316' : themeColor }}>
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
                  className={inputClass}
                  style={{ '--tw-ring-color': themeColor } as any}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 rounded-xl py-3 px-4 text-xs font-black uppercase tracking-wider text-white transition cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-none shadow-md"
                style={{ backgroundColor: isNeonDark ? '#f97316' : themeColor }}
              >
                {isSignUp ? 'Create Diner Account' : 'Sign In To Order'}
              </button>
            </form>

            {!isSignUp && (
              <div className="space-y-4 pt-2">
                <div className="relative flex py-2 items-center">
                  <div className={`flex-grow border-t ${(isNeonDark || isFloating) ? 'border-slate-800' : 'border-stone-200'}`}></div>
                  <span className="flex-shrink mx-4 text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">or fast bypass</span>
                  <div className={`flex-grow border-t ${(isNeonDark || isFloating) ? 'border-slate-800' : 'border-stone-200'}`}></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => {
                    localStorage.setItem('clientEmail', 'customer@gmail.com');
                    localStorage.setItem('clientName', 'Gourmet Diner');
                    localStorage.setItem('clientId', '666');
                    router.push(`/preview/${projectId}/dashboard`);
                  }} className={fastBypassBtnClass} style={{ color: isNeonDark ? '#f97316' : (isFloating ? '#ffffff' : themeColor) }}>
                    ⚡ Instant Diner
                  </button>
                  <button type="button" onClick={() => {
                    localStorage.setItem('clientEmail', 'customer@gmail.com');
                    localStorage.setItem('clientName', 'Quick Eater');
                    localStorage.setItem('clientId', '667');
                    router.push(`/preview/${projectId}/dashboard`);
                  }} className={fastBypassBtnClass}>
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
                style={{ color: isNeonDark ? '#f97316' : themeColor }}
              >
                {isSignUp ? 'Already registered? Sign In' : 'Create customer account'}
              </button>
            </div>

            <div className={`flex items-center justify-between border-t ${(isNeonDark || isFloating) ? 'border-slate-800 pt-5' : 'border-stone-100 pt-5'} text-xs text-slate-500 font-bold uppercase tracking-wider`}>
              <Link href={`/preview/${projectId}`} className="hover:text-slate-350 transition">
                ← Back to Site
              </Link>
              <span className="text-[9px] font-black" style={{ color: isNeonDark ? '#f97316' : themeColor }}>⚡ AUTHENTIC KITCHENS</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
