'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ModernLandingPage from '@/components/landing/ModernLandingPage';

export default function LandingPage() {
  return <ModernLandingPage />;

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const [simTheme, setSimTheme] = useState<'dining' | 'gym' | 'wedding'>('dining');

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userEmail', email || 'demo@zatbiz.com');
    router.push('/dashboard');
  };

  return (
    <div className="hero-theme relative min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-primary selection:text-on-primary blueprint-grid bg-pattern overflow-hidden">
      
      {/* Background Glowing Blobs & Floating 3D Spheres */}
      <div className="glowing-blobs">
        <div className="blob blob-violet animate-blob-complex top-[-100px] right-[-50px] w-[600px] h-[600px] opacity-75"></div>
        <div className="blob blob-rose animate-blob-complex bottom-[-150px] left-[-150px] w-[500px] h-[500px] opacity-75" style={{ animationDelay: '-7s' }}></div>
        <div className="blob blob-cyan animate-blob-complex top-[40%] left-[20%] w-[450px] h-[450px] opacity-75" style={{ animationDelay: '-14s' }}></div>
      </div>

      {/* Floating 3D Spheres (Aesthetic Accents) */}
      <div className="absolute top-[15%] left-[5%] w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500/30 to-purple-600/30 blur-[2px] float-slow pointer-events-none z-10 border border-white/10 shadow-lg" />
      <div className="absolute top-[35%] right-[8%] w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-[1px] float-medium pointer-events-none z-10 border border-white/10 shadow-lg" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-[65%] left-[8%] w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-400/20 to-indigo-500/20 blur-[3px] float-fast pointer-events-none z-10 border border-white/10 shadow-lg" style={{ animationDelay: '-5s' }} />
      <div className="absolute top-[85%] right-[12%] w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500/30 to-indigo-650/30 blur-[2px] float-slow pointer-events-none z-10 border border-white/10 shadow-lg" style={{ animationDelay: '-1s' }} />

      {/* Sticky Premium Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100/60 px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center select-none shadow-sm">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8.5 h-8.5 flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-650 rounded-xl shadow-md shadow-indigo-600/10">
            <span className="text-white text-base font-extrabold italic">Z</span>
          </div>
          <span className="text-primary font-bold text-xl tracking-tight">ZatBiz</span>
        </Link>

        {/* Center Nav Links */}
        <ul className="hidden md:flex gap-8 text-slate-650 font-semibold text-sm">
          <li>
            <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
          </li>
          <li>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Capabilities</a>
          </li>
          <li>
            <a href="#simulator" className="hover:text-indigo-600 transition-colors">3D Canvas</a>
          </li>
          <li>
            <a href="#templates" className="hover:text-indigo-600 transition-colors">Templates</a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </li>
        </ul>

        {/* Right Action Elements */}
        <div className="flex gap-4 items-center">
          {/* Language Picker Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold text-sm transition cursor-pointer"
            >
              <span>🌐 English</span>
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg p-1.5 flex flex-col gap-1 text-xs font-semibold text-slate-700 animate-slide-in">
                <button onClick={() => setLangOpen(false)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition cursor-pointer">English</button>
                <button onClick={() => setLangOpen(false)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition cursor-pointer">Español</button>
                <button onClick={() => setLangOpen(false)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition cursor-pointer">Français</button>
              </div>
            )}
          </div>

          <Link href="/login" className="text-slate-650 hover:text-slate-900 font-bold text-sm px-1.5 transition">
            Log in
          </Link>
          
          <Link href="/login" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-full text-xs font-bold transition shadow-md shadow-indigo-600/10 hover:translate-y-[-1px]">
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="w-full px-0 pt-0 pb-0 max-w-none flex flex-col items-center relative z-10">
        {/* Full-width edge-to-edge Video Showcase */}
        <div className="w-full relative z-10 flex justify-center">
          <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-black shadow-2xl">
            <video 
              src="/ZATBIZ_platform_business_ecosystem_202606301040.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
            {/* Cinematic Bottom Fade to Hide Watermarks */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
            
            {/* Brand Watermark Overlay to mask AI video watermark */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg select-none">
              <div className="w-5.5 h-5.5 flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-650 rounded-lg shadow-md">
                <span className="text-white text-[10px] font-black italic">Z</span>
              </div>
              <span className="text-white font-bold text-[10.5px] tracking-tight">ZatBiz</span>
            </div>
          </div>
        </div>
      </header>

      {/* Partners Grayscale Logobar */}
      <section className="bg-white border-y border-outline-variant/20 py-8 px-6 md:px-12 select-none relative z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-on-surface-variant font-bold text-sm md:text-base tracking-wider opacity-60">
          <span className="hover:text-primary transition">webflow</span>
          <span className="hover:text-primary transition">shopify</span>
          <span className="hover:text-primary transition">Squarespace</span>
          <span className="hover:text-primary transition">WooCommerce</span>
          <span className="hover:text-primary transition">Wix</span>
          <span className="hover:text-primary transition">BigCommerce</span>
          <span className="hover:text-primary transition">Magento</span>
        </div>
      </section>

      {/* 3D Capabilities Section */}
      <section id="features" className="px-6 md:px-12 lg:px-16 py-24 max-w-6xl mx-auto scroll-mt-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/20 px-3 py-1.5 rounded-full inline-block mb-3.5">
            ✦ Core Capabilities
          </span>
          <h2 className="text-3.5xl md:text-4.5xl font-black text-on-surface tracking-tight mb-3 font-serif">
            Launch High-Fidelity App Spaces
          </h2>
          <p className="text-slate-500 text-sm font-semibold max-w-lg mx-auto">
            Design premium client applications with high-fidelity components, dynamic styling engines, and immediate relational syncing.
          </p>
        </div>

        {/* 3D perspective cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
          
          {/* Card 1 */}
          <div className="card-3d-bistro rounded-3xl p-6.5 text-left flex flex-col justify-between min-h-[240px] bg-white border border-purple-100 relative group overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition duration-500" />
            <div className="depth-element-20">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-100 text-indigo-650 flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.015a2.993 2.993 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 2.44A1.5 1.5 0 015.378 2h13.243a1.5 1.5 0 011.06.44l3.19 3.19a3.004 3.004 0 01-.622 4.72m-16.5 0a3 3 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.015a2.993 2.993 0 003.75.614" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-extrabold text-sm mb-2 font-serif">01 / Visual Architecture</h3>
              <p className="text-slate-500 text-[11px] font-semibold leading-relaxed mb-4">
                Deploy elegant grid frameworks, dynamic light/dark cards, and interactive customer timelines without coding.
              </p>
            </div>
            <a href="#pricing" className="text-indigo-650 hover:text-indigo-800 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mt-auto">
              Learn More ➔
            </a>
          </div>

          {/* Card 2 */}
          <div className="card-3d-wedding rounded-3xl p-6.5 text-left flex flex-col justify-between min-h-[240px] bg-white border border-purple-100 relative group overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition duration-500" />
            <div className="depth-element-20">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-100 text-amber-600 flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-extrabold text-sm mb-2 font-serif">02 / Relational Table Sync</h3>
              <p className="text-slate-500 text-[11px] font-semibold leading-relaxed mb-4">
                Synchronize reservations, orders, and customized client drafts instantly with relational database schemas.
              </p>
            </div>
            <a href="#pricing" className="text-indigo-650 hover:text-indigo-800 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mt-auto">
              Learn More ➔
            </a>
          </div>

          {/* Card 3 */}
          <div className="card-3d-gym rounded-3xl p-6.5 text-left flex flex-col justify-between min-h-[240px] bg-white border border-purple-100 relative group overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition duration-500" />
            <div className="depth-element-20">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-100 text-purple-650 flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41a14.98 14.98 0 00-6.16 12.12A14.98 14.98 0 0015.59 14.37zm0 0L12 10.78M9.63 8.41a6 6 0 015.84-7.38v4.8M9.63 8.41L12 10.78" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-extrabold text-sm mb-2 font-serif">03 / Dual Contrast themes</h3>
              <p className="text-slate-500 text-[11px] font-semibold leading-relaxed mb-4">
                Toggle luxury dark mode or crisp light themes with responsive CSS styles, maintaining absolute contrast.
              </p>
            </div>
            <a href="#pricing" className="text-indigo-650 hover:text-indigo-800 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mt-auto">
              Learn More ➔
            </a>
          </div>

          {/* Card 4 */}
          <div className="card-3d-bistro rounded-3xl p-6.5 text-left flex flex-col justify-between min-h-[240px] bg-white border border-purple-100 relative group overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition duration-500" />
            <div className="depth-element-20">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-100 text-emerald-650 flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751A11.959 11.959 0 0112 2.714z" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-extrabold text-sm mb-2 font-serif">04 / Optimized Compiler</h3>
              <p className="text-slate-500 text-[11px] font-semibold leading-relaxed mb-4">
                Fast and lightweight builds powered by Next.js Turbopack to deliver optimized static performance.
              </p>
            </div>
            <a href="#pricing" className="text-indigo-650 hover:text-indigo-800 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mt-auto">
              Learn More ➔
            </a>
          </div>

        </div>
      </section>

      {/* 3D Interactive Visual Builder Simulator */}
      <section id="simulator" className="px-6 md:px-12 lg:px-16 py-24 max-w-6xl mx-auto border-t border-outline-variant/15 scroll-mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Details column */}
          <div className="lg:col-span-5 text-left flex flex-col items-start">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/20 px-3 py-1.5 rounded-full mb-4.5">
              Interactive 3D Workspace
            </span>
            <h2 className="text-on-surface font-black text-3.5xl leading-tight tracking-tight mb-4 font-serif">
              Visual Canvas Simulator
            </h2>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-8">
              Click the builder presets below. See the floating 3D screen tilt and adjust its styling elements, interfaces, and contrast rules in real-time.
            </p>
            
            {/* Interactive Tabs */}
            <div className="w-full flex flex-col gap-3 font-sans text-xs">
              {[
                { id: 'dining', label: '⚜️ Fine Dining Bistro', desc: 'Obsidian & Gold elegance with Sommelier features.' },
                { id: 'gym', label: '💪 Iron Temple Gym', desc: 'Charcoal & Acid Green high-performance logs.' },
                { id: 'wedding', label: '🌸 Vows & Floral Arches', desc: 'Pastel Rose & Gold romantic RSVP forms.' }
              ].map((tab) => {
                const isActive = simTheme === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSimTheme(tab.id as any)}
                    className={`w-full p-4.5 rounded-2xl border text-left transition duration-300 cursor-pointer flex flex-col gap-1 ${
                      isActive 
                        ? 'bg-indigo-650/10 border-indigo-500 shadow-md translate-x-2' 
                        : 'bg-white/50 border-slate-100 hover:bg-white hover:translate-x-1'
                    }`}
                  >
                    <span className={`font-black uppercase tracking-wider ${isActive ? 'text-indigo-650' : 'text-slate-700'}`}>
                      {tab.label}
                    </span>
                    <span className="text-[10px] text-slate-450 font-medium">{tab.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Simulator Screen (Tilted 3D floating window) */}
          <div className="lg:col-span-7 perspective-container py-10">
            <div className={`bg-slate-900 rounded-[36px] p-8 border border-slate-800 transition-all duration-700 relative min-h-[460px] flex flex-col justify-between text-left overflow-hidden ${
              simTheme === 'dining' ? 'card-3d-bistro' : simTheme === 'gym' ? 'card-3d-gym' : 'card-3d-wedding'
            }`}>
              
              {/* Decorative Ambient Backlights inside screen */}
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

              {/* Window controls */}
              <div className="flex justify-between items-center pb-4.5 border-b border-slate-800/80 mb-6.5 relative z-10">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[9px] font-mono text-slate-500 font-black tracking-widest">ZATBIZ_3D_ENGINE.HEX</span>
              </div>

              {/* Dynamic UI Content based on selected Simulator Theme */}
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                {simTheme === 'dining' && (
                  <div className="space-y-6 animate-fade-in-up">
                    {/* Simulated Header */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[9px] font-bold text-stone-400 uppercase tracking-widest leading-none">VIP DINER CONCIERGE</h4>
                        <h3 className="text-xl font-extrabold text-[#c5a880] mt-1 font-serif">HONORED GUEST: VIP</h3>
                      </div>
                      <span className="text-[10px] bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 px-3.5 py-1.5 rounded-full font-black uppercase tracking-wider">
                        ⚜️ PLATINUM CLUB
                      </span>
                    </div>

                    {/* Simulated Seating Area Card */}
                    <div className="bg-[#16171f] border border-[#c5a880]/20 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase text-[#c5a880]">
                        <span>🏛️ Bespoke Placement Seating</span>
                        <span className="text-emerald-500">✓ OPTIMAL STATUS</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-[#0d0e12] border border-[#c5a880] rounded-xl text-left shadow-lg">
                          <span className="text-[9px] font-black text-[#c5a880] block">GRAND SALON</span>
                          <span className="text-[10px] text-stone-400 font-medium">Piano acoustics & fireplace.</span>
                        </div>
                        <div className="p-3 bg-[#0d0e12] border border-stone-850 rounded-xl text-left opacity-60">
                          <span className="text-[9px] font-bold text-white block">SOMMELIER CELLAR</span>
                          <span className="text-[10px] text-stone-500 font-medium">Vintage wine collection.</span>
                        </div>
                      </div>
                    </div>

                    {/* Simulated Decanting Request */}
                    <div className="bg-[#16171f] border border-stone-850 rounded-2xl p-5 flex justify-between items-center">
                      <div className="text-left">
                        <span className="text-[9px] font-black text-[#c5a880] uppercase tracking-wider block">WINE PRE-DECANT SERVICE</span>
                        <p className="text-[10.5px] text-stone-400 font-semibold mt-0.5">Let red vintage wines breathe for 1.5 hours prior.</p>
                      </div>
                      <button className="px-4 py-2 bg-[#c5a880] text-black font-black text-[9px] uppercase rounded-xl">
                        REQUESTED ✓
                  </button>
                    </div>
                  </div>
                )}

                {simTheme === 'gym' && (
                  <div className="space-y-6 animate-fade-in-up">
                    {/* Simulated Header */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">MEMBER PORTAL</h4>
                        <h3 className="text-xl font-extrabold text-[#bef264] mt-1 font-mono">ATHLETE: ALEX RHEE</h3>
                      </div>
                      <span className="text-[10px] bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30 px-3.5 py-1.5 rounded-full font-mono uppercase tracking-wider">
                        ⚡ IRON MEMBER
                      </span>
                    </div>

                    {/* Simulated Work Routine */}
                    <div className="bg-[#18181b] border border-[#bef264]/20 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase text-[#bef264]">
                        <span>🏋️ Today's Training routine</span>
                        <span className="text-amber-500">🔥 HIGH INTENSITY</span>
                      </div>
                      <div className="space-y-2 text-xs text-zinc-300">
                        <div className="flex justify-between p-2.5 bg-zinc-900 border border-zinc-850 rounded-lg">
                          <span className="font-bold">Barbell Deadlift</span>
                          <span className="font-mono text-[#bef264]">5 Sets x 5 Reps (140kg)</span>
                        </div>
                        <div className="flex justify-between p-2.5 bg-zinc-900 border border-zinc-850 rounded-lg">
                          <span className="font-bold">Weighted Pullups</span>
                          <span className="font-mono text-[#bef264]">4 Sets x 8 Reps (20kg)</span>
                        </div>
                      </div>
                    </div>

                    {/* Simulated Progress tracker */}
                    <div className="bg-[#18181b] border border-zinc-850 rounded-2xl p-5 flex justify-between items-center">
                      <div className="text-left font-mono">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block">BODY FAT TARGET</span>
                        <p className="text-[10.5px] text-white mt-0.5">Progressing from 14.5% to 11.0%</p>
                      </div>
                      <span className="text-xs font-black text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/20 px-3.5 py-1.5 rounded-lg">
                        80% ACHIEVED
                      </span>
                    </div>
                  </div>
                )}

                {simTheme === 'wedding' && (
                  <div className="space-y-6 animate-fade-in-up">
                    {/* Simulated Header */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[9px] font-bold text-rose-350 uppercase tracking-widest leading-none">WEDDING GUEST RETAINER</h4>
                        <h3 className="text-xl font-extrabold text-[#fbcfe8] mt-1 font-serif">VOWS OF EMILY & NICK</h3>
                      </div>
                      <span className="text-[10px] bg-rose-500/15 text-rose-300 border border-rose-500/30 px-3.5 py-1.5 rounded-full font-serif uppercase tracking-wider">
                        🌸 RSVP CONTEST
                      </span>
                    </div>

                    {/* Simulated Catering */}
                    <div className="bg-[#241c21] border border-rose-500/20 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase text-rose-300">
                        <span>🍽️ Catering & Dinner Selections</span>
                        <span className="text-rose-450">✓ RESERVED</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-[#171014] border border-rose-500/40 rounded-xl text-left shadow-lg">
                          <span className="text-[9px] font-black text-rose-200 block">SEARED WAGYU FILET</span>
                          <span className="text-[10px] text-stone-400 font-medium">Truffle butter & asparagus.</span>
                        </div>
                        <div className="p-3 bg-[#171014] border border-stone-850 rounded-xl text-left opacity-60">
                          <span className="text-[9px] font-bold text-stone-300 block">HERBED HALIBUT</span>
                          <span className="text-[10px] text-stone-500 font-medium">Saffron broth reduction.</span>
                        </div>
                      </div>
                    </div>

                    {/* Simulated Floral arch selection */}
                    <div className="bg-[#241c21] border border-stone-850 rounded-2xl p-5 flex justify-between items-center">
                      <div className="text-left">
                        <span className="text-[9px] font-black text-rose-350 uppercase tracking-wider block">FLORAL ARCH SELECTOR</span>
                        <p className="text-[10.5px] text-rose-100 font-semibold mt-0.5">Assigned to: "Bohemian Sunset Orchids"</p>
                      </div>
                      <span className="text-xs font-black text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-lg">
                        STAGE PREP ACTIVE
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom code snippet */}
              <div className="mt-8 pt-4.5 border-t border-slate-800/80 flex justify-between items-center text-[9px] font-mono text-slate-500 relative z-10">
                <span>ACTIVE COMPILER: TURBOPACK</span>
                <span>3D MATRIX: ACTIVE</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3D Niche Templates Showcase */}
      <section id="templates" className="px-6 md:px-12 lg:px-16 py-24 max-w-6xl mx-auto border-t border-outline-variant/15 scroll-mt-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/20 px-3 py-1.5 rounded-full inline-block mb-3.5">
            ✦ Pre-built layouts
          </span>
          <h2 className="text-3.5xl md:text-4.5xl font-black text-on-surface tracking-tight mb-3 font-serif">
            Deploy Specialized Templates
          </h2>
          <p className="text-slate-500 text-sm font-semibold max-w-lg mx-auto">
            Choose from a catalog of specialized client templates. Each comes pre-equipped with responsive modules and database-linked forms.
          </p>
        </div>

        {/* 3D tilted template layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
          
          {/* Template 1 */}
          <div className="card-3d-bistro bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between group cursor-pointer">
            <div className="h-52 bg-[#0a0a0c] relative overflow-hidden flex items-center justify-center">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-xs font-mono font-bold text-[#c5a880] border border-[#c5a880]/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                ⚜️ Fine Dining Niche
              </span>
            </div>
            <div className="p-6.5 space-y-2.5">
              <h4 className="text-on-surface font-extrabold text-base font-serif">Luxury Haute Cuisine Portal</h4>
              <p className="text-slate-500 text-[11px] font-semibold leading-relaxed">
                Includes interactive bespoke floor plans, red wine decanting services, cellar sommelier catalogs, and guest loyalty account wallets.
              </p>
              <div className="pt-2 flex gap-4 text-[10px] font-black text-slate-450 uppercase">
                <span>✓ Seating Selector</span>
                <span>✓ Decant Form</span>
              </div>
            </div>
          </div>

          {/* Template 2 */}
          <div className="card-3d-wedding bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between group cursor-pointer">
            <div className="h-52 bg-slate-900 relative overflow-hidden flex items-center justify-center">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-xs font-mono font-bold text-[#bef264] border border-[#bef264]/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                🏋️ Fitness Gym Niche
              </span>
            </div>
            <div className="p-6.5 space-y-2.5">
              <h4 className="text-on-surface font-extrabold text-base font-serif">Iron Temple Member Hub</h4>
              <p className="text-slate-500 text-[11px] font-semibold leading-relaxed">
                Includes high-intensity workout routine planners, trainer scheduling sheets, active body composition charts, and card supplements.
              </p>
              <div className="pt-2 flex gap-4 text-[10px] font-black text-slate-450 uppercase">
                <span>✓ Routine Planner</span>
                <span>✓ Tracker logs</span>
              </div>
            </div>
          </div>

          {/* Template 3 */}
          <div className="card-3d-gym bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between group cursor-pointer">
            <div className="h-52 bg-rose-950 relative overflow-hidden flex items-center justify-center">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/45 to-transparent" />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-xs font-mono font-bold text-rose-300 border border-rose-300/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                🌸 Wedding Vows Niche
              </span>
            </div>
            <div className="p-6.5 space-y-2.5">
              <h4 className="text-on-surface font-extrabold text-base font-serif">Romantic Vows Guest Panel</h4>
              <p className="text-slate-500 text-[11px] font-semibold leading-relaxed">
                Includes digital RSVP attendance lists, floral theme selectors, customized catering options, and relative seat mapping modules.
              </p>
              <div className="pt-2 flex gap-4 text-[10px] font-black text-slate-450 uppercase">
                <span>✓ RSVP Registry</span>
                <span>✓ Food Selector</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section ("Simple, Transparent Pricing") */}
      <section id="pricing" className="px-6 md:px-12 lg:px-16 py-24 max-w-6xl mx-auto border-t border-outline-variant/15 scroll-mt-20 text-center relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/20 px-3 py-1.5 rounded-full inline-block mb-3.5">
            ✦ Pricing tiers
          </span>
          <h2 className="text-3.5xl md:text-4.5xl font-black text-on-surface tracking-tight mb-3 font-serif">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-500 text-sm font-semibold max-w-lg mx-auto">
            Choose the perfect plan for your business. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        {/* 3D Pricing Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch perspective-container">
          
          {/* Plan 1 */}
          <div className="card-3d-bistro bg-white border border-slate-100 rounded-3xl p-6.5 flex flex-col justify-between text-left relative shadow-sm">
            <div>
              <h3 className="text-slate-900 font-extrabold text-base font-serif">Starter</h3>
              <p className="text-slate-450 text-[10.5px] font-bold mt-0.5">For basic store needs.</p>
              <div className="my-6">
                <span className="text-slate-950 font-black text-3xl">$19</span>
                <span className="text-slate-400 text-xs font-bold ml-1">/ month</span>
              </div>
              <ul className="space-y-3.5 border-t border-slate-100 pt-5 text-slate-600 text-[11px] font-bold">
                <li className="flex items-center gap-2">✔ Up to 100 products</li>
                <li className="flex items-center gap-2">✔ 1 staff account</li>
                <li className="flex items-center gap-2">✔ Basic Analytics</li>
                <li className="flex items-center gap-2">✔ 24/7 Support</li>
              </ul>
            </div>
            <Link href="/login" className="w-full mt-8 py-3 text-center border border-indigo-650 hover:bg-indigo-50 text-indigo-650 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center uppercase tracking-wider">
              Get Started
            </Link>
          </div>

          {/* Plan 2: Highlighted */}
          <div className="card-3d-wedding bg-white border-2 border-indigo-600 rounded-3xl p-6.5 flex flex-col justify-between text-left relative shadow-xl hover:translate-y-[-4px]">
            <span className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Most Popular
            </span>
            <div>
              <h3 className="text-slate-950 font-extrabold text-base flex justify-between items-baseline font-serif">
                <span>Growth</span>
                <span className="text-[10px] text-indigo-650 font-bold bg-indigo-50 px-1.5 py-0.5 rounded-md">Best Value</span>
              </h3>
              <p className="text-slate-450 text-[10.5px] font-bold mt-0.5">For growing businesses.</p>
              <div className="my-6">
                <span className="text-slate-950 font-black text-3xl">$49</span>
                <span className="text-slate-400 text-xs font-bold ml-1">/ month</span>
              </div>
              <ul className="space-y-3.5 border-t border-slate-100 pt-5 text-slate-650 text-[11px] font-bold">
                <li className="flex items-center gap-2">✔ Up to 1,000 products</li>
                <li className="flex items-center gap-2">✔ 5 staff accounts</li>
                <li className="flex items-center gap-2">✔ Advanced Analytics</li>
                <li className="flex items-center gap-2">✔ Automated Marketing</li>
                <li className="flex items-center gap-2">✔ Priority Support</li>
              </ul>
            </div>
            <Link href="/login" className="w-full mt-8 py-3 text-center bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl text-xs font-black transition shadow-md shadow-indigo-600/10 cursor-pointer flex items-center justify-center uppercase tracking-wider">
              Get Started
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="card-3d-gym bg-white border border-slate-100 rounded-3xl p-6.5 flex flex-col justify-between text-left relative shadow-sm">
            <div>
              <h3 className="text-slate-900 font-extrabold text-base font-serif">Pro</h3>
              <p className="text-slate-450 text-[10.5px] font-bold mt-0.5">For established businesses.</p>
              <div className="my-6">
                <span className="text-slate-950 font-black text-3xl">$99</span>
                <span className="text-slate-400 text-xs font-bold ml-1">/ month</span>
              </div>
              <ul className="space-y-3.5 border-t border-slate-100 pt-5 text-slate-600 text-[11px] font-bold">
                <li className="flex items-center gap-2">✔ Up to 10,000 products</li>
                <li className="flex items-center gap-2">✔ 15 staff accounts</li>
                <li className="flex items-center gap-2">✔ Advanced Reporting</li>
                <li className="flex items-center gap-2">✔ Marketing Automation</li>
                <li className="flex items-center gap-2">✔ 24/7 Priority Support</li>
              </ul>
            </div>
            <Link href="/login" className="w-full mt-8 py-3 text-center border border-indigo-650 hover:bg-indigo-50 text-indigo-650 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center uppercase tracking-wider">
              Get Started
            </Link>
          </div>

          {/* Plan 4 */}
          <div className="card-3d-bistro bg-white border border-slate-100 rounded-3xl p-6.5 flex flex-col justify-between text-left relative shadow-sm">
            <div>
              <h3 className="text-slate-900 font-extrabold text-base font-serif">Enterprise</h3>
              <p className="text-slate-450 text-[10.5px] font-bold mt-0.5">For custom store needs.</p>
              <div className="my-6">
                <span className="text-slate-950 font-black text-3xl">Custom</span>
              </div>
              <ul className="space-y-3.5 border-t border-slate-100 pt-5 text-slate-600 text-[11px] font-bold">
                <li className="flex items-center gap-2">✔ Everything in Pro</li>
                <li className="flex items-center gap-2">✔ Custom Integrations</li>
                <li className="flex items-center gap-2">✔ Dedicated Account Manager</li>
                <li className="flex items-center gap-2">✔ SLA & Premium Support</li>
              </ul>
            </div>
            <Link href="/login" className="w-full mt-8 py-3 text-center border border-indigo-650 hover:bg-indigo-50 text-indigo-650 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center uppercase tracking-wider">
              Contact Sales
            </Link>
          </div>

        </div>

        <p className="text-[10px] font-bold text-slate-400 mt-10 select-none">
          All plans include free SSL certificate, secure hosting, and regular updates.
        </p>
      </section>

      {/* Blog Posts Grid Section ("Latest from Our Blog") */}
      <section className="px-6 md:px-12 lg:px-16 py-24 max-w-6xl mx-auto border-t border-outline-variant/15 text-center relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/20 px-3 py-1.5 rounded-full inline-block mb-3.5">
            ✦ Knowledge Base
          </span>
          <h2 className="text-3.5xl md:text-4.5xl font-black text-slate-900 tracking-tight mb-3 font-serif">
            Latest from Our Blog
          </h2>
          <p className="text-slate-500 text-sm font-semibold max-w-lg mx-auto">
            Tips, guides, and insights to help you grow your business online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
          {/* Blog 1 */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between hover:translate-y-[-2px] group">
            <div>
              {/* Decorative cover with abstract vector styling */}
              <div className="w-full h-44 bg-gradient-to-tr from-indigo-500/10 to-purple-500/20 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="w-24 h-16 bg-white rounded-lg shadow-md border border-slate-100 p-2.5 flex flex-col justify-between transform rotate-[-4deg] relative z-10">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  </div>
                  <div className="space-y-1">
                    <div className="w-12 h-1.5 bg-indigo-100 rounded" />
                    <div className="w-8 h-1 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <span className="text-[9px] font-black bg-indigo-50 text-indigo-650 px-2.5 py-0.5 rounded-md uppercase tracking-wider">Store Design</span>
                <h4 className="text-on-surface font-extrabold text-sm mt-3 leading-snug group-hover:text-indigo-650 transition">How to Set Up Your Online Store for Success</h4>
                <p className="text-slate-450 text-[10px] font-bold mt-2">May 10, 2026 • 5 min read</p>
              </div>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <span className="text-indigo-650 text-xs font-black inline-flex items-center gap-1.5 cursor-pointer">
                Read More ➔
              </span>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between hover:translate-y-[-2px] group">
            <div>
              {/* Decorative cover with abstract vector styling */}
              <div className="w-full h-44 bg-gradient-to-tr from-purple-500/10 to-pink-500/20 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:14px_24px]"></div>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center transform rotate-[8deg] relative z-10">
                  <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <span className="text-[9px] font-black bg-purple-50 text-purple-650 px-2.5 py-0.5 rounded-md uppercase tracking-wider">Marketing</span>
                <h4 className="text-on-surface font-extrabold text-sm mt-3 leading-snug group-hover:text-purple-600 transition">10 Marketing Strategies to Boost Your Sales</h4>
                <p className="text-slate-450 text-[10px] font-bold mt-2">May 12, 2026 • 7 min read</p>
              </div>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <span className="text-indigo-650 text-xs font-black inline-flex items-center gap-1.5 cursor-pointer">
                Read More ➔
              </span>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between hover:translate-y-[-2px] group">
            <div>
              {/* Decorative cover with abstract vector styling */}
              <div className="w-full h-44 bg-gradient-to-tr from-emerald-500/10 to-indigo-500/20 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div className="w-24 h-16 bg-white rounded-lg shadow-md border border-slate-100 p-2.5 flex items-center justify-between transform rotate-[-6deg] relative z-10">
                  <div className="space-y-1.5">
                    <div className="w-10 h-2 bg-emerald-500 rounded" />
                    <div className="w-12 h-1 bg-slate-200 rounded" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-emerald-500 text-xs font-black">
                    📈
                  </div>
                </div>
              </div>
              <div className="p-5">
                <span className="text-[9px] font-black bg-emerald-50 text-emerald-650 px-2.5 py-0.5 rounded-md uppercase tracking-wider">Business Growth</span>
                <h4 className="text-on-surface font-extrabold text-sm mt-3 leading-snug group-hover:text-emerald-650 transition">Scaling Your Business: Tips from Top Entrepreneurs</h4>
                <p className="text-slate-450 text-[10px] font-bold mt-2">May 15, 2026 • 8 min read</p>
              </div>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <span className="text-indigo-650 text-xs font-black inline-flex items-center gap-1.5 cursor-pointer">
                Read More ➔
              </span>
            </div>
          </div>
        </div>

        <button type="button" className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 mx-auto cursor-pointer shadow-md shadow-indigo-600/10 hover:translate-y-[-1px]">
          <span>View All Articles</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </section>

      {/* Full-width Purple CTA Banner */}
      <section id="footer-cta" className="px-6 md:px-12 lg:px-16 py-12 max-w-6xl mx-auto scroll-mt-16 relative z-10">
        <div className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-650 rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl text-white relative overflow-hidden group">
          <div className="absolute right-[-40px] top-[-40px] w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none group-hover:scale-125 transition duration-500" />
          <div className="text-left max-w-lg relative z-10">
            <h2 className="text-3xl md:text-4.5xl font-black mb-3.5 leading-tight tracking-tight font-serif">
              Ready to Build, Manage, and Grow Your Business?
            </h2>
            <p className="text-purple-100 text-xs md:text-sm font-semibold">
              Get started today and scale your business to the next level.
            </p>
          </div>
          <Link href="/login" className="px-7 py-4 bg-white hover:bg-slate-50 text-indigo-650 rounded-xl text-sm font-black transition flex items-center gap-1.5 shadow-lg cursor-pointer flex-shrink-0 hover:translate-y-[-1px] relative z-10">
            <span>Start Free Trial</span>
            <svg className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Directory Footer */}
      <footer className="bg-white border-t border-outline-variant/20 pt-16 pb-8 px-6 md:px-12 lg:px-16 text-xs text-on-surface-variant font-semibold select-none relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-left">
          
          {/* Logo & Intro column */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-650 rounded-xl shadow-md">
                <span className="text-white text-base font-extrabold italic">Z</span>
              </div>
              <span className="text-primary font-bold text-lg tracking-tight">ZatBiz</span>
            </Link>
            <p className="text-slate-450 text-[11px] leading-relaxed max-w-xs font-bold">
              The premium platform to build, manage, and scale your online business. Take control of your store layout, visual designs, database sync, and pages output.
            </p>
            {/* Socials - Premium Vector Icons */}
            <div className="flex gap-4.5 text-slate-400 mt-2">
              <a href="#" className="hover:text-indigo-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 00-2.11 2.107C0 8.021 0 12 0 12s0 3.979.502 5.837a3.001 3.001 0 002.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 002.11-2.107C24 15.979 24 12 24 12s0-3.979-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-extrabold text-slate-900 mb-4 tracking-wider uppercase text-[10px]">Product</h4>
            <ul className="space-y-3.5 text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition">Visual Editor</a></li>
              <li><a href="#" className="hover:text-primary transition">Block presets</a></li>
              <li><a href="#" className="hover:text-primary transition">Themes library</a></li>
              <li><a href="#" className="hover:text-primary transition">Static compiler</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-extrabold text-slate-900 mb-4 tracking-wider uppercase text-[10px]">Resources</h4>
            <ul className="space-y-3.5 text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition">Blog posts</a></li>
              <li><a href="#" className="hover:text-primary transition">Templates</a></li>
              <li><a href="#" className="hover:text-primary transition">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition">H2 database</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-extrabold text-slate-900 mb-4 tracking-wider uppercase text-[10px]">Company</h4>
            <ul className="space-y-3.5 text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition">About us</a></li>
              <li><a href="#" className="hover:text-primary transition">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Press kit</a></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="max-w-6xl mx-auto pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-on-surface-variant select-none">
          <div>&copy; 2026 ZatBiz. All rights reserved.</div>
          <div className="flex gap-6 items-center">
            <a href="#" className="hover:underline transition">Privacy Policy</a>
            <a href="#" className="hover:underline transition">Terms of Service</a>
            {/* Language picker */}
            <span className="text-slate-350 cursor-pointer hover:text-primary">🌐 English (US) ▾</span>
          </div>
        </div>
      </footer>
    </div>
  );
}