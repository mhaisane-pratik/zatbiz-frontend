'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [langOpen, setLangOpen] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userEmail', email || 'demo@zatbiz.com');
    router.push('/dashboard');
  };

  return (
    <div className="hero-theme relative min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-primary selection:text-on-primary blueprint-grid bg-pattern">
      
      {/* Background Glowing Blobs */}
      <div className="glowing-blobs">
        <div className="blob blob-violet animate-blob-complex top-[-100px] right-[-50px] w-[600px] h-[600px]"></div>
        <div className="blob blob-rose animate-blob-complex bottom-[-150px] left-[-150px] w-[500px] h-[500px]" style={{ animationDelay: '-7s' }}></div>
        <div className="blob blob-cyan animate-blob-complex top-[40%] left-[20%] w-[450px] h-[450px]" style={{ animationDelay: '-14s' }}></div>
      </div>

      {/* Sticky Premium Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100/80 px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center select-none shadow-sm">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8.5 h-8.5 flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-650 rounded-xl shadow-md shadow-indigo-600/10">
            <span className="text-white text-base font-extrabold italic">Z</span>
          </div>
          <span className="text-primary font-bold text-xl tracking-tight">ZatBiz</span>
        </Link>

        {/* Center Nav Links */}
        <ul className="hidden md:flex gap-8 text-slate-600 font-semibold text-sm">
          <li>
            <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
          </li>
          <li>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </li>
          <li>
            <a href="#blog" className="hover:text-indigo-600 transition-colors">Resources</a>
          </li>
          <li>
            <a href="#footer-cta" className="hover:text-indigo-600 transition-colors">About us</a>
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
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 bg-secondary-container text-slate-950 rounded-full p-4 shadow-lg animate-bounce flex items-center justify-center z-20">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
        </div>
      </header>

      {/* Partners Grayscale Logobar */}
      <section className="bg-white border-y border-outline-variant/20 py-8 px-6 md:px-12 select-none">
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

      {/* Feature Grid ("Everything You Need to Succeed") */}
      <section id="features" className="px-6 md:px-12 lg:px-16 py-20 max-w-6xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
            Everything You Need to Succeed
          </h2>
          <p className="text-slate-500 text-sm font-semibold max-w-lg mx-auto">
            Powerful features to build, manage, and grow your business — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glass-panel rounded-2xl p-6.5 aura-shadow-purple hover:border-primary/50 transition duration-300 text-left flex flex-col justify-between min-h-[210px] hover:translate-y-[-2px]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-100 text-blue-600 flex items-center justify-center mb-5 shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.015a2.993 2.993 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 2.44A1.5 1.5 0 015.378 2h13.243a1.5 1.5 0 011.06.44l3.19 3.19a3.004 3.004 0 01-.622 4.72m-16.5 0a3 3 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.015a2.993 2.993 0 003.75.614" />
                </svg>
              </div>
              <h3 className="text-on-surface font-extrabold text-sm mb-2">Powerful Store Builder</h3>
              <p className="text-on-surface-variant text-[11px] font-semibold leading-relaxed mb-4">
                Create stunning online stores without easy drag and drop builder. No coding required.
              </p>
            </div>
            <a href="#pricing" className="text-indigo-650 hover:text-indigo-800 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mt-auto">
              Learn More ➔
            </a>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-2xl p-6.5 aura-shadow-purple hover:border-primary/50 transition duration-300 text-left flex flex-col justify-between min-h-[210px] hover:translate-y-[-2px]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-100 text-orange-600 flex items-center justify-center mb-5 shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              </div>
              <h3 className="text-on-surface font-extrabold text-sm mb-2">Everything in One Place</h3>
              <p className="text-on-surface-variant text-[11px] font-semibold leading-relaxed mb-4">
                Manage products, orders, customers, and workflows in a single, intuitive dashboard.
              </p>
            </div>
            <a href="#pricing" className="text-indigo-650 hover:text-indigo-800 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mt-auto">
              Learn More ➔
            </a>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-2xl p-6.5 aura-shadow-purple hover:border-primary/50 transition duration-300 text-left flex flex-col justify-between min-h-[210px] hover:translate-y-[-2px]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-100 text-purple-650 flex items-center justify-center mb-5 shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41a14.98 14.98 0 00-6.16 12.12A14.98 14.98 0 0015.59 14.37zm0 0L12 10.78M9.63 8.41a6 6 0 015.84-7.38v4.8M9.63 8.41L12 10.78" />
                </svg>
              </div>
              <h3 className="text-on-surface font-extrabold text-sm mb-2">Grow Without Limits</h3>
              <p className="text-on-surface-variant text-[11px] font-semibold leading-relaxed mb-4">
                Advanced marketing, analytics, and SEO tools to scale your business faster.
              </p>
            </div>
            <a href="#pricing" className="text-indigo-650 hover:text-indigo-800 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mt-auto">
              Learn More ➔
            </a>
          </div>

          {/* Card 4 */}
          <div className="glass-panel rounded-2xl p-6.5 aura-shadow-purple hover:border-primary/50 transition duration-300 text-left flex flex-col justify-between min-h-[210px] hover:translate-y-[-2px]">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-100 text-emerald-650 flex items-center justify-center mb-5 shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751A11.959 11.959 0 0112 2.714z" />
                </svg>
              </div>
              <h3 className="text-on-surface font-extrabold text-sm mb-2">Secure & Reliable</h3>
              <p className="text-on-surface-variant text-[11px] font-semibold leading-relaxed mb-4">
                Enterprise-grade security and 99.9% uptime keep your business online always.
              </p>
            </div>
            <a href="#pricing" className="text-indigo-650 hover:text-indigo-800 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mt-auto">
              Learn More ➔
            </a>
          </div>
        </div>
      </section>

      {/* Detailed Spotlight Spotlight Section ("A Platform That Grows With You") */}
      <section className="px-6 md:px-12 lg:px-16 py-20 max-w-6xl mx-auto border-t border-outline-variant/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Details column */}
          <div className="lg:col-span-6 text-left flex flex-col items-start animate-fade-in">
            <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4.5 font-sans">
              Built for Modern Business
            </span>
            <h2 className="text-on-surface font-black text-3xl md:text-4xl leading-tight tracking-tight mb-4 max-w-md">
              A Platform That Grows With You
            </h2>
            
            <div className="space-y-4 my-6">
              {[
                'Available and platform on any browser/device',
                'Powerful dashboard features for storefronts',
                'Real-time analytics and actionable insights',
                'Automated sync with relational sales database'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-on-surface-variant font-bold text-xs md:text-sm">
                  <div className="w-5.5 h-5.5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link href="/login" className="mt-2.5 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-indigo-650/10 cursor-pointer hover:translate-y-[-1px]">
              <span>Explore All Features</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Right Showcase graphics column */}
          <div className="lg:col-span-6 relative h-[380px] bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 rounded-3xl p-6 border border-slate-100/60 hidden md:block">
            
            {/* Clothing shop preview screen */}
            <div className="w-full bg-white rounded-2xl p-4 shadow-xl border border-slate-100 text-left">
              <h4 className="text-xs font-black text-slate-900 border-b border-slate-100 pb-2 mb-3">Summer Collection New Arrivals</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Casual T-Shirt', price: '$29', col: 'bg-indigo-50' },
                  { name: 'Slim Fit Denim', price: '$59', col: 'bg-blue-50' },
                  { name: 'Light Jacket', price: '$79', col: 'bg-purple-50' }
                ].map((prod, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex flex-col justify-between text-left hover:scale-[1.02] transition">
                    <div className={`w-full h-16 rounded-lg ${prod.col} mb-2.5 flex items-center justify-center text-xl`}>👕</div>
                    <span className="text-[9px] font-bold text-slate-700 truncate">{prod.name}</span>
                    <span className="text-indigo-650 text-[9px] font-black mt-0.5">{prod.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlap sales trend pill */}
            <div 
              className="absolute bottom-6 left-12 w-48 bg-white rounded-xl p-3 shadow-lg border border-slate-100 text-left"
              style={{ transform: 'translateY(20px)' }}
            >
              <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Store Sales Trend</div>
              <div className="text-slate-800 text-sm font-black mt-0.5">$12,545</div>
              {/* Tiny graph */}
              <div className="h-6 w-full mt-1.5">
                <svg viewBox="0 0 100 20" className="w-full h-full">
                  <path d="M0,15 L25,12 L50,16 L75,8 L100,2" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section ("What Our Customers Say") */}
      <section className="bg-white border-y border-outline-variant/20 py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
              What Our Customers Say
            </h2>
            <p className="text-slate-500 text-sm font-semibold max-w-lg mx-auto">
              Join thousands of happy business owners using ZatBiz to grow their brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6.5 shadow-sm text-left flex flex-col justify-between hover:translate-y-[-2px] transition duration-300">
              <div>
                <div className="flex gap-1 mb-4 select-none">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-on-surface-variant text-xs font-semibold leading-relaxed mb-6">
                  "ZatBiz solved all my database sync problems! It's so easy to use. Highly recommended!"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-550 to-purple-550 flex items-center justify-center text-white text-xs font-black">
                  SJ
                </div>
                <div>
                  <h4 className="text-on-surface font-extrabold text-xs">Sarah Johnson</h4>
                  <p className="text-slate-400 text-[10px] font-bold mt-0.5">Founder, Bloom Floral</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6.5 shadow-sm text-left flex flex-col justify-between hover:translate-y-[-2px] transition duration-300">
              <div>
                <div className="flex gap-1 mb-4 select-none">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-on-surface-variant text-xs font-semibold leading-relaxed mb-6">
                  "The best platform I've used. Periodic sync to database works like magic."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-650 flex items-center justify-center text-white text-xs font-black">
                  MC
                </div>
                <div>
                  <h4 className="text-on-surface font-extrabold text-xs">Michael Chen</h4>
                  <p className="text-slate-400 text-[10px] font-bold mt-0.5">Tech Lead, Apex Co.</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6.5 shadow-sm text-left flex flex-col justify-between hover:translate-y-[-2px] transition duration-300">
              <div>
                <div className="flex gap-1 mb-4 select-none">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-on-surface-variant text-xs font-semibold leading-relaxed mb-6">
                  "Excellent support and amazing features. ZatBiz helped me scale my business without worries."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-black">
                  ER
                </div>
                <div>
                  <h4 className="text-on-surface font-extrabold text-xs">Emily Rodriguez</h4>
                  <p className="text-slate-400 text-[10px] font-bold mt-0.5">Owner, Deco Home</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section ("Simple, Transparent Pricing") */}
      <section id="pricing" className="px-6 md:px-12 lg:px-16 py-20 max-w-6xl mx-auto scroll-mt-20 text-center">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-500 text-sm font-semibold max-w-lg mx-auto">
            Choose the perfect plan for your business. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Plan 1 */}
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 flex flex-col justify-between text-left relative transition duration-300 hover:border-slate-300 hover:translate-y-[-2px]">
            <div>
              <h3 className="text-on-surface font-black text-base">Starter</h3>
              <p className="text-slate-400 text-[10.5px] font-bold mt-0.5">For basic store needs.</p>
              <div className="my-6">
                <span className="text-on-surface font-black text-3xl">$19</span>
                <span className="text-slate-400 text-xs font-bold ml-1">/ month</span>
              </div>
              <ul className="space-y-3 border-t border-slate-100 pt-5 text-on-surface-variant text-[11px] font-bold">
                <li className="flex items-center gap-2">✔ Up to 100 products</li>
                <li className="flex items-center gap-2">✔ 1 staff account</li>
                <li className="flex items-center gap-2">✔ Basic Analytics</li>
                <li className="flex items-center gap-2">✔ 24/7 Support</li>
              </ul>
            </div>
            <Link href="/login" className="w-full mt-8 py-3.5 text-center border border-indigo-650 hover:bg-indigo-50 text-indigo-650 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center">
              Get Started
            </Link>
          </div>

          {/* Plan 2: Highlighted */}
          <div className="bg-white border-2 border-primary rounded-2xl p-6 flex flex-col justify-between text-left relative transition duration-300 shadow-lg shadow-indigo-650/5 hover:translate-y-[-2px]">
            <span className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Most Popular
            </span>
            <div>
              <h3 className="text-on-surface font-black text-base flex justify-between items-baseline">
                <span>Growth</span>
                <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded-md">Best Value</span>
              </h3>
              <p className="text-slate-400 text-[10.5px] font-bold mt-0.5">For growing businesses.</p>
              <div className="my-6">
                <span className="text-slate-950 font-black text-3xl">$49</span>
                <span className="text-slate-400 text-xs font-bold ml-1">/ month</span>
              </div>
              <ul className="space-y-3 border-t border-slate-100 pt-5 text-on-surface-variant text-[11px] font-bold">
                <li className="flex items-center gap-2">✔ Up to 1,000 products</li>
                <li className="flex items-center gap-2">✔ 5 staff accounts</li>
                <li className="flex items-center gap-2">✔ Advanced Analytics</li>
                <li className="flex items-center gap-2">✔ Automated Marketing</li>
                <li className="flex items-center gap-2">✔ Priority Support</li>
              </ul>
            </div>
            <Link href="/login" className="w-full mt-8 py-3.5 text-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition shadow-md shadow-indigo-650/10 cursor-pointer flex items-center justify-center">
              Get Started
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 flex flex-col justify-between text-left relative transition duration-300 hover:border-slate-300 hover:translate-y-[-2px]">
            <div>
              <h3 className="text-on-surface font-black text-base">Pro</h3>
              <p className="text-slate-400 text-[10.5px] font-bold mt-0.5">For established businesses.</p>
              <div className="my-6">
                <span className="text-slate-950 font-black text-3xl">$99</span>
                <span className="text-slate-400 text-xs font-bold ml-1">/ month</span>
              </div>
              <ul className="space-y-3 border-t border-slate-100 pt-5 text-on-surface-variant text-[11px] font-bold">
                <li className="flex items-center gap-2">✔ Up to 10,000 products</li>
                <li className="flex items-center gap-2">✔ 15 staff accounts</li>
                <li className="flex items-center gap-2">✔ Advanced Reporting</li>
                <li className="flex items-center gap-2">✔ Marketing Automation</li>
                <li className="flex items-center gap-2">✔ 24/7 Priority Support</li>
              </ul>
            </div>
            <Link href="/login" className="w-full mt-8 py-3.5 text-center border border-indigo-650 hover:bg-indigo-50 text-indigo-650 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center">
              Get Started
            </Link>
          </div>

          {/* Plan 4 */}
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 flex flex-col justify-between text-left relative transition duration-300 hover:border-slate-300 hover:translate-y-[-2px]">
            <div>
              <h3 className="text-on-surface font-black text-base">Enterprise</h3>
              <p className="text-slate-400 text-[10.5px] font-bold mt-0.5">For custom store needs.</p>
              <div className="my-6">
                <span className="text-slate-950 font-black text-3xl">Custom</span>
              </div>
              <ul className="space-y-3 border-t border-slate-100 pt-5 text-on-surface-variant text-[11px] font-bold">
                <li className="flex items-center gap-2">✔ Everything in Pro</li>
                <li className="flex items-center gap-2">✔ Custom Integrations</li>
                <li className="flex items-center gap-2">✔ Dedicated Account Manager</li>
                <li className="flex items-center gap-2">✔ SLA & Premium Support</li>
              </ul>
            </div>
            <Link href="/login" className="w-full mt-8 py-3.5 text-center border border-indigo-650 hover:bg-indigo-50 text-indigo-650 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center">
              Contact Sales
            </Link>
          </div>

        </div>

        <p className="text-[10px] font-bold text-slate-400 mt-10 select-none">
          All plans include free SSL certificate, secure hosting, and regular updates.
        </p>
      </section>

      {/* Blog Posts Grid Section ("Latest from Our Blog") */}
      <section id="blog" className="px-6 md:px-12 lg:px-16 py-20 max-w-6xl mx-auto border-t border-outline-variant/20 scroll-mt-20 text-center">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Latest from Our Blog
          </h2>
          <p className="text-slate-500 text-sm font-semibold max-w-lg mx-auto">
            Tips, guides, and insights to help you grow your business online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
          {/* Blog 1 */}
          <div className="bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between hover:translate-y-[-2px]">
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
                <span className="text-[9px] font-black bg-indigo-55/60 text-indigo-600 px-2.5 py-0.5 rounded-md uppercase tracking-wider">Store Design</span>
                <h4 className="text-on-surface font-extrabold text-sm mt-3 leading-snug">How to Set Up Your Online Store for Success</h4>
                <p className="text-slate-400 text-[10px] font-bold mt-2">May 10, 2026 • 5 min read</p>
              </div>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <a href="#blog" className="text-indigo-650 hover:text-indigo-850 text-xs font-black inline-flex items-center gap-1.5">
                Read More ➔
              </a>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between hover:translate-y-[-2px]">
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
                <span className="text-[9px] font-black bg-purple-55/60 text-purple-650 px-2.5 py-0.5 rounded-md uppercase tracking-wider">Marketing</span>
                <h4 className="text-on-surface font-extrabold text-sm mt-3 leading-snug">10 Marketing Strategies to Boost Your Sales</h4>
                <p className="text-slate-400 text-[10px] font-bold mt-2">May 12, 2026 • 7 min read</p>
              </div>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <a href="#blog" className="text-indigo-650 hover:text-indigo-850 text-xs font-black inline-flex items-center gap-1.5">
                Read More ➔
              </a>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between hover:translate-y-[-2px]">
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
                <h4 className="text-on-surface font-extrabold text-sm mt-3 leading-snug">Scaling Your Business: Tips from Top Entrepreneurs</h4>
                <p className="text-slate-400 text-[10px] font-bold mt-2">May 15, 2026 • 8 min read</p>
              </div>
            </div>
            <div className="p-5 pt-0 mt-auto">
              <a href="#blog" className="text-indigo-650 hover:text-indigo-850 text-xs font-black inline-flex items-center gap-1.5">
                Read More ➔
              </a>
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
      <section id="footer-cta" className="px-6 md:px-12 lg:px-16 py-12 max-w-6xl mx-auto scroll-mt-16">
        <div className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-650 rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl text-white">
          <div className="text-left max-w-lg">
            <h2 className="text-3xl md:text-4.5xl font-black mb-3.5 leading-tight tracking-tight">
              Ready to Build, Manage, and Grow Your Business?
            </h2>
            <p className="text-purple-100 text-xs md:text-sm font-semibold">
              Get started today and scale your business to the next level.
            </p>
          </div>
          <Link href="/login" className="px-7 py-4 bg-white hover:bg-slate-50 text-indigo-650 rounded-xl text-sm font-black transition flex items-center gap-1.5 shadow-lg cursor-pointer flex-shrink-0 hover:translate-y-[-1px]">
            <span>Start Free Trial</span>
            <svg className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Directory Footer */}
      <footer className="bg-white border-t border-outline-variant/20 pt-16 pb-8 px-6 md:px-12 lg:px-16 text-xs text-on-surface-variant font-semibold select-none">
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