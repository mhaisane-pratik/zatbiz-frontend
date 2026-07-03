'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ThemeKey = 'dining' | 'gym' | 'wedding';

const themeDetails: Record<ThemeKey, {
  title: string;
  tag: string;
  accent: string;
  stats: Array<{ label: string; value: string }>;
}> = {
  dining: {
    title: 'Fine Dining Bistro',
    tag: 'Luxury operations suite',
    accent: 'from-amber-300 via-orange-400 to-rose-400',
    stats: [
      { label: 'Table fills', value: '98%' },
      { label: 'Avg. spend', value: '$240' },
    ],
  },
  gym: {
    title: 'Iron Temple Gym',
    tag: 'High-performance membership flow',
    accent: 'from-lime-300 via-emerald-400 to-cyan-400',
    stats: [
      { label: 'Active members', value: '1.2k' },
      { label: 'Renewal rate', value: '92%' },
    ],
  },
  wedding: {
    title: 'Vows & Floral Arch',
    tag: 'Romantic RSVP experience',
    accent: 'from-rose-300 via-fuchsia-400 to-violet-400',
    stats: [
      { label: 'Guests confirmed', value: '184' },
      { label: 'Design matches', value: '24' },
    ],
  },
};

export default function ModernLandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [simTheme, setSimTheme] = useState<ThemeKey>('dining');

  const activeTheme = themeDetails[simTheme];

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userEmail', email || 'demo@zatbiz.com');
    router.push('/dashboard');
  };

  return (
    <div className="hero-theme relative min-h-screen overflow-hidden bg-[#050816] text-white selection:bg-cyan-300 selection:text-slate-950">
      <div className="glowing-blobs">
        <div className="blob blob-violet animate-blob-complex top-[-120px] right-[-120px] w-[620px] h-[620px] opacity-90" />
        <div className="blob blob-cyan animate-blob-complex top-[18%] left-[-160px] w-[520px] h-[520px] opacity-80" style={{ animationDelay: '-7s' }} />
        <div className="blob blob-rose animate-blob-complex bottom-[-160px] right-[12%] w-[460px] h-[460px] opacity-80" style={{ animationDelay: '-12s' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_75%_25%,_rgba(168,85,247,0.18),_transparent_20%),linear-gradient(180deg,_rgba(8,11,20,0)_0%,_rgba(8,11,20,0.85)_65%,_rgba(5,8,22,1)_100%)]" />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 px-6 py-4 backdrop-blur-xl md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-amber-300 shadow-[0_14px_40px_-14px_rgba(34,211,238,0.75)]">
              <span className="text-sm font-black text-slate-950">Z</span>
            </div>
            <div>
              <span className="block text-lg font-black tracking-tight text-white">ZatBiz</span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-slate-400">Visual business builder</span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#options" className="transition hover:text-white">Options</a>
            <a href="#simulator" className="transition hover:text-white">Studio</a>
            <a href="#templates" className="transition hover:text-white">Templates</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/5">
              Log in
            </Link>
            <Link href="/login" className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:translate-y-[-1px] hover:bg-cyan-100">
              Start free
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="w-full pb-12 pt-0">
          <div className="relative w-full">
            <div className="absolute left-[15%] top-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
            <div className="absolute right-[15%] top-20 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />
            
            <div className="w-full bg-[#080d24]/60 backdrop-blur-xl border-y border-white/10 shadow-[0_45px_130px_-40px_rgba(14,165,233,0.3)] relative">
              {/* Subtle top/bottom neon line accents */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-60" />
              
              <div className="w-full pt-4">
                {/* Browser Mock Navigation Bar */}
                <div className="mx-auto max-w-7xl flex items-center justify-between border-b border-white/10 pb-3 px-6 md:px-10 lg:px-16">
                  <div className="flex items-center gap-2">
                    <span className="mockup-dot-red h-3.5 w-3.5 rounded-full" />
                    <span className="mockup-dot-yellow h-3.5 w-3.5 rounded-full" />
                    <span className="mockup-dot-green h-3.5 w-3.5 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-400">Live preview</span>
                  </div>
                </div>

                {/* Video container takes full screen width and is completely flush with the sides */}
                <div className="w-full mt-0">
                  <div className="relative overflow-hidden bg-black aspect-video md:aspect-[21/9] w-full border-t border-white/5">
                    <video
                      src="/ZATBIZ_platform_business_ecosystem_202606301040.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover opacity-95"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="options" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-200">Business options</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">Choose the restaurant experience you want to sell.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
              The template should not feel locked to one layout. Give users clear paths for dining, delivery, catering, cafe, and event-led businesses.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: 'Fine dining',
                desc: 'Luxury menus, reservations, and premium storytelling for upscale restaurants.',
                accent: 'from-amber-300 to-orange-500',
              },
              {
                title: 'Cafe and bakery',
                desc: 'Warm product cards, daily specials, and fast mobile ordering flows.',
                accent: 'from-cyan-400 to-blue-500',
              },
              {
                title: 'Catering and events',
                desc: 'Inquiry forms, packages, venue galleries, and quote-based bookings.',
                accent: 'from-fuchsia-400 to-rose-500',
              },
              {
                title: 'Delivery first',
                desc: 'Menus, delivery coverage, and instant call-to-action buttons for orders.',
                accent: 'from-emerald-400 to-teal-500',
              },
            ].map((option) => (
              <div key={option.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-white/20">
                <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${option.accent}`} />
                <h3 className="mt-5 text-xl font-black text-white">{option.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{option.desc}</p>
                <a href="/login" className="mt-5 inline-flex text-sm font-black uppercase tracking-[0.22em] text-cyan-200 transition hover:text-white">
                  Explore this option
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-200">Core capabilities</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">A polished visual system for modern business pages.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Cinematic visuals',
                desc: 'Gradients, glow layers, and glass surfaces that make the homepage feel designed, not assembled.',
                accent: 'from-cyan-400 to-blue-500',
              },
              {
                title: 'Conversion-first CTA',
                desc: 'Focused buttons, proof cards, and quick onboarding paths that move users into the product fast.',
                accent: 'from-fuchsia-400 to-rose-500',
              },
              {
                title: 'Flexible business flows',
                desc: 'Templates for dining, fitness, and events give the site a premium, use-case-driven feel.',
                accent: 'from-amber-300 to-orange-500',
              },
            ].map((card) => (
              <div key={card.title} className="glass-card-premium group rounded-[28px] p-6 text-slate-900 transition hover:-translate-y-1">
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${card.accent} shadow-lg`} />
                <h3 className="mt-5 text-xl font-black text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="simulator" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-fuchsia-200">Interactive studio</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">Switch the mood, keep the same polished system.</h2>
              <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-base">
                The preview updates instantly so the homepage can tell a different story for hospitality, fitness, or events without looking generic.
              </p>

              <div className="space-y-3">
                {(Object.keys(themeDetails) as ThemeKey[]).map((key) => {
                  const item = themeDetails[key];
                  const isActive = simTheme === key;

                  return (
                    <button
                      key={key}
                      onClick={() => setSimTheme(key)}
                      className={`w-full rounded-[22px] border p-4 text-left transition duration-300 ${isActive ? 'border-white/20 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/8'}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className={`bg-gradient-to-r ${item.accent} bg-clip-text text-sm font-black text-transparent`}>
                            {item.title}
                          </div>
                          <div className="mt-1 text-xs text-slate-400">{item.tag}</div>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${isActive ? 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-300'}`}>
                          Select
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.65)]">
              <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-12 right-0 h-44 w-44 rounded-full bg-fuchsia-400/10 blur-3xl" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">Studio mode</div>
                  <div className={`mt-1 bg-gradient-to-r ${activeTheme.accent} bg-clip-text text-xl font-black text-transparent`}>
                    {activeTheme.title}
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">
                  {activeTheme.tag}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ['Design system', 'Ready for dark, vivid, and premium light surfaces'],
                  ['Live commerce', 'Made for conversion, reservation, and onboarding flows'],
                  ['Motion layer', 'Soft orbiting gradients and subtle depth cues'],
                  ['Brand fit', 'Adapts to luxury, athletic, and romantic positioning'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-black text-white">{title}</div>
                    <div className="mt-2 text-sm leading-7 text-slate-300">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="templates" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-200">Templates</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">Ready-made looks that still feel custom.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Luxury dining',
                desc: 'Warm metallic accents, elegant booking flows, and premium menu presentation.',
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
              },
              {
                title: 'Fitness club',
                desc: 'Bold energy, progress metrics, and a crisp membership journey with impact.',
                image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
              },
              {
                title: 'Wedding experience',
                desc: 'Soft glow, refined typography, and an RSVP flow that feels beautifully personal.',
                image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
              },
            ].map((template, index) => (
              <div key={template.title} className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="relative h-56 overflow-hidden rounded-[24px]">
                  <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${template.image}')` }} />
                  <div className={`absolute inset-0 bg-gradient-to-t ${index === 0 ? 'from-slate-950 via-slate-950/20 to-transparent' : index === 1 ? 'from-cyan-950 via-slate-950/20 to-transparent' : 'from-rose-950 via-slate-950/20 to-transparent'}`} />
                </div>
                <div className="p-2 pt-5">
                  <h3 className="text-xl font-black text-white">{template.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{template.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-200">Pricing</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">Simple plans with a premium feel.</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                name: 'Starter',
                price: '$19',
                features: ['1 project', 'Fast launch setup', 'Email support'],
                accent: 'from-cyan-400 to-blue-500',
              },
              {
                name: 'Professional',
                price: '$49',
                features: ['Unlimited projects', 'Priority support', 'Advanced themes'],
                accent: 'from-fuchsia-400 to-rose-500',
                featured: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['White-glove onboarding', 'Dedicated support', 'Security review'],
                accent: 'from-amber-300 to-orange-500',
              },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-[30px] border p-6 ${plan.featured ? 'border-white/20 bg-white/10 shadow-[0_20px_70px_-30px_rgba(236,72,153,0.55)]' : 'border-white/10 bg-white/5'}`}>
                <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${plan.accent}`} />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                    <p className="mt-2 text-sm text-slate-400">For teams that want a sharper presence.</p>
                  </div>
                  <div className="text-4xl font-black text-white">{plan.price}</div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${plan.accent}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-black transition ${plan.featured ? 'bg-white text-slate-950 hover:bg-cyan-100' : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'}`}
                >
                  Choose plan
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-10 lg:px-16">
          <div className="rounded-[36px] border border-white/10 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-amber-300/20 p-[1px]">
            <div className="rounded-[35px] bg-slate-950/80 px-6 py-10 text-center backdrop-blur-xl md:px-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-100">Ready to launch</p>
              <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
                Give the homepage the same polish as the product.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                Start with a vibrant first impression, then move users into a clean dashboard and a confident signup flow.
              </p>

              <form onSubmit={handleEmailSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="min-h-14 flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300/40 focus:bg-white/8"
                />
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-300 px-7 py-4 text-sm font-black text-slate-950 transition hover:translate-y-[-1px]"
                >
                  Go to dashboard
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
