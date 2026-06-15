'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-stone-50/40 text-stone-900 font-sans antialiased">
      {/* Background Glowing Blobs */}
      <div className="glowing-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200/40">
        <div className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-indigo-650 via-purple-650 to-orange-500 bg-clip-text text-transparent">
          <div className="w-3.5 h-3.5 bg-indigo-600 rounded-full shadow-[0_0_8px_#4f46e5]" />
          PrimeZat
        </div>
        
        <ul className="hidden md:flex gap-10 text-sm font-bold text-stone-500">
          <li><a href="#features" className="hover:text-indigo-600 transition">Features</a></li>
          <li><a href="#splits" className="hover:text-indigo-600 transition">Capabilities</a></li>
          <li><a href="#footer-cta" className="hover:text-indigo-600 transition">Get Started</a></li>
        </ul>

        <div className="flex gap-4 items-center">
          <Link href="/login" className="px-4.5 py-2 text-xs font-bold text-stone-700 rounded-full border border-stone-250 hover:bg-stone-50 transition shadow-sm">
            Log In
          </Link>
          <Link href="/dashboard" className="px-5 py-2.5 text-xs font-bold bg-indigo-650 hover:bg-indigo-700 text-white rounded-full transition shadow shadow-indigo-650/10 hover:translate-y-[-1px]">
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 md:px-16 pt-20 pb-20 max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-8 shadow-sm">
          Next.js + Spring Boot Visual Platform
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-stone-900 mb-6 tracking-tight font-heading max-w-3xl">
          The visual website platform to build your online presence
        </h1>
        
        <p className="text-base md:text-lg text-stone-500 mb-10 max-w-2xl leading-relaxed font-medium">
          Create layouts, customize block headers, choose color preset themes, and save project configurations to H2 database persistence. Start free trial today.
        </p>

        {/* Shopify-Style Email Input CTA */}
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row w-full max-w-lg gap-2 sm:gap-0 border border-stone-200 bg-white p-1.5 rounded-2xl sm:rounded-full shadow-md mb-16">
          <input 
            type="email" 
            required 
            placeholder="Enter your email address" 
            className="flex-1 bg-transparent px-4 py-3 text-sm outline-none text-stone-900 placeholder-stone-400 font-medium"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-indigo-650 hover:bg-indigo-750 text-white rounded-xl sm:rounded-full text-xs font-bold shadow-sm cursor-pointer whitespace-nowrap transition"
          >
            Start Free Trial
          </button>
        </form>

        {/* Large visual workspace mockup banner */}
        <div className="w-full relative hover:scale-[1.01] transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50/50 to-transparent pointer-events-none rounded-3xl z-10" />
          <img 
            src="/images/login_illustration.png" 
            alt="PrimeZat Builder Workspace Mockup" 
            className="w-full h-auto max-w-4xl mx-auto rounded-3xl border border-stone-200/50 shadow-2xl"
          />
        </div>
      </header>

      {/* Trusted By Logo Row */}
      <section className="py-12 border-y border-stone-200/40 bg-white/40 text-center">
        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">TRUSTED BY LEADING CREATIVE AGENTS</div>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 px-6 font-heading font-extrabold text-stone-400/70 select-none">
          <span className="text-sm tracking-wide">💼 ACME CORP</span>
          <span className="text-sm tracking-wide">⚡ INITECH</span>
          <span className="text-sm tracking-wide">📦 GLOBEX</span>
          <span className="text-sm tracking-wide">⚙️ CYBERDYNE</span>
          <span className="text-sm tracking-wide">🌐 ENCOM</span>
        </div>
      </section>

      {/* Alternating Split Sections */}
      <section id="splits" className="px-6 md:px-16 py-20 space-y-24 max-w-5xl mx-auto">
        
        {/* Split 1: Left Image, Right Text */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 w-full">
            <img 
              src="/images/builder_canvas.png" 
              alt="Visual canvas editor mockup" 
              className="w-full h-auto rounded-2xl border border-stone-200/40 shadow-xl hover:scale-102 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight font-heading">
              Design visually without coding boundaries
            </h2>
            <p className="text-sm text-stone-550 leading-relaxed font-medium">
              PrimeZat gives you modular canvas blocks to stack, edit in-place, and reorder. Choose between responsive layout viewports to immediately test presentations on mobile, tablet, and widescreen monitors.
            </p>
            <div className="pt-2">
              <Link href="/dashboard" className="text-xs font-bold text-indigo-650 hover:underline">
                Explore builder canvas ➔
              </Link>
            </div>
          </div>
        </div>

        {/* Split 2: Left Text, Right Image */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight font-heading">
              Headless Spring Boot JPA API Synchronization
            </h2>
            <p className="text-sm text-stone-550 leading-relaxed font-medium">
              We sync layout structures to the relational database backend automatically via clean, async fetch operations. Access details from the H2 console or deploy output components anywhere in a snap.
            </p>
            <div className="pt-2">
              <Link href="/dashboard" className="text-xs font-bold text-indigo-650 hover:underline">
                Verify H2 persistence ➔
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img 
              src="/images/database_sync.png" 
              alt="Database synchronization REST APIs mockup" 
              className="w-full h-auto rounded-2xl border border-stone-200/40 shadow-xl hover:scale-102 transition-transform duration-300"
            />
          </div>
        </div>

      </section>

      {/* Trio Grid Feature Section */}
      <section id="features" className="px-6 md:px-16 py-20 bg-stone-100/35 border-y border-stone-200/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight font-heading">Everything you need to grow</h2>
            <p className="text-stone-550 text-sm font-medium">Modular block architecture engineered to build, preview, and save site designs in seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-stone-200/50 rounded-2xl shadow-sm">
              <div className="text-2xl mb-4">📂</div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Pre-designed Blocks</h3>
              <p className="text-stone-550 text-xs leading-relaxed font-medium">
                Drag-free stack presets including Hero headers, pricing cards grids, split text-images, FAQ accordions, and Footers.
              </p>
            </div>
            
            <div className="p-8 bg-white border border-stone-200/50 rounded-2xl shadow-sm">
              <div className="text-2xl mb-4">🎨</div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Tailwind Styling</h3>
              <p className="text-stone-550 text-xs leading-relaxed font-medium">
                Visual block configurations compile directly to clean, utility-driven CSS structures which guarantee lightning fast static loading speeds.
              </p>
            </div>

            <div className="p-8 bg-white border border-stone-200/50 rounded-2xl shadow-sm">
              <div className="text-2xl mb-4">🔗</div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Instant Previews</h3>
              <p className="text-stone-550 text-xs leading-relaxed font-medium">
                Toggle a clean presentation layout previewing what your compiled page blocks look like on mobile and tablet without visual editor borders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA (Shopify Style) */}
      <section id="footer-cta" className="px-6 py-24 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-3 tracking-tight font-heading">
          Build your website with PrimeZat
        </h2>
        <p className="text-stone-500 text-sm md:text-base mb-8 font-medium">
          Create layout structures and verify database connectivity. Start free trial today.
        </p>

        {/* Bottom Horizontal Email Signup CTA */}
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row w-full max-w-lg gap-2 sm:gap-0 border border-stone-200 bg-white p-1.5 rounded-2xl sm:rounded-full shadow-md mx-auto">
          <input 
            type="email" 
            required 
            placeholder="Enter your email address" 
            className="flex-1 bg-transparent px-4 py-3 text-sm outline-none text-stone-900 placeholder-stone-400 font-medium"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-indigo-650 hover:bg-indigo-750 text-white rounded-xl sm:rounded-full text-xs font-bold shadow-sm cursor-pointer whitespace-nowrap transition"
          >
            Start Free Trial
          </button>
        </form>
      </section>

      {/* Rich Directory Footer */}
      <footer className="bg-white border-t border-stone-200/50 pt-16 pb-8 px-6 md:px-16 text-xs text-stone-500 font-medium">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-stone-900 mb-4 tracking-wider uppercase text-[10px]">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-stone-850">Visual Editor</a></li>
              <li><a href="#" className="hover:text-stone-850">Block presets</a></li>
              <li><a href="#" className="hover:text-stone-850">Themes library</a></li>
              <li><a href="#" className="hover:text-stone-850">Static compiler</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone-900 mb-4 tracking-wider uppercase text-[10px]">Platform</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-stone-850">Spring Boot REST</a></li>
              <li><a href="#" className="hover:text-stone-850">JPA persistence</a></li>
              <li><a href="#" className="hover:text-stone-850">Next.js App router</a></li>
              <li><a href="#" className="hover:text-stone-850">H2 database Console</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone-900 mb-4 tracking-wider uppercase text-[10px]">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-stone-850">About PrimeZat</a></li>
              <li><a href="#" className="hover:text-stone-850">Contact support</a></li>
              <li><a href="#" className="hover:text-stone-850">Release notes</a></li>
              <li><a href="#" className="hover:text-stone-850">Developer docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone-900 mb-4 tracking-wider uppercase text-[10px]">Security</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-stone-850">CORS policies</a></li>
              <li><a href="#" className="hover:text-stone-850">Privacy regulations</a></li>
              <li><a href="#" className="hover:text-stone-850">H2 database settings</a></li>
              <li><a href="#" className="hover:text-stone-850">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-8 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-400">
          <div>&copy; 2026 PrimeZat Builder. Decoupled Next.js + Tailwind + Spring Boot REST architecture.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
