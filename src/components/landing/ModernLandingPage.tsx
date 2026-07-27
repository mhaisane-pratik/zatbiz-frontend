'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type ThemeKey = 'dining' | 'gym' | 'wedding';

// Lightweight, dependency-free scroll-reveal wrapper.
// Fades + slides children up the first time they enter the viewport.
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

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
    <div className="hero-theme relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 selection:bg-indigo-150 selection:text-slate-950">
      <div className="glowing-blobs">
        <div className="blob blob-violet animate-blob-complex top-[-120px] right-[-120px] w-[620px] h-[620px] opacity-35" />
        <div className="blob blob-cyan animate-blob-complex top-[18%] left-[-160px] w-[520px] h-[520px] opacity-25" style={{ animationDelay: '-7s' }} />
        <div className="blob blob-rose animate-blob-complex bottom-[-160px] right-[12%] w-[460px] h-[460px] opacity-25" style={{ animationDelay: '-12s' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.06),_transparent_35%),radial-gradient(circle_at_75%_25%,_rgba(236,72,153,0.04),_transparent_25%),linear-gradient(180deg,_rgba(248,250,252,0)_0%,_rgba(248,250,252,0.8)_65%,_rgba(248,250,252,1)_100%)]" />

      <main className="relative z-10">
        <section className="w-full pb-12 pt-0">
          <div className="relative w-full">
            <div className="absolute left-[15%] top-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
            <div className="absolute right-[15%] top-20 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />
            
            <div className="w-full bg-white/40 backdrop-blur-xl border-y border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.05)] relative">
              {/* Subtle top/bottom neon line accents */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-450 to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-fuchsia-450 to-transparent opacity-60" />
              
              <div className="w-full pt-0">
                {/* Video container takes full screen width and is completely flush with the sides */}
                <div className="w-full mt-0">
                  <div className="relative overflow-hidden bg-black aspect-video w-full border-t border-slate-100">
                    <video
                      src="/Business_growth_collage_video_za_202607061245.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover opacity-95"
                    />

                    {/* Watermark Overlay */}
                    <div className="absolute top-3 right-3 md:top-6 md:right-6 z-10 flex items-center gap-2.5 bg-white/80 backdrop-blur-md px-3.5 py-1.5 md:px-5 md:py-2.5 rounded-full border border-slate-200/80 shadow-lg select-none">
                      <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-slate-500">ZatBiz Studio</span>
                      <div className="h-3 w-[1px] bg-slate-200" />
                      <Link href="/login" className="text-[10px] md:text-[11px] font-black text-indigo-650 hover:text-indigo-750 transition">
                        Log in ➔
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="options" className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16">
          {/* Ambient glow layer for depth */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-rose-300/20 blur-3xl" />
          </div>

          <Reveal className="mb-14 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-600">Business options</p>
            <h2 className="mt-3 text-3xl font-black leading-[1.05] tracking-[-0.04em] text-slate-900 md:text-5xl">
              Choose the{' '}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                restaurant experience
              </span>{' '}
              you want to sell.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base font-medium">
              The template should not feel locked to one layout. Give users clear paths for dining, delivery, catering, cafe, and event-led businesses.
            </p>
          </Reveal>

          {/* Horizontally scroll-snaps on mobile, 4-up grid on desktop */}
          <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {[
              {
                title: 'Fine dining',
                desc: 'Luxury menus, reservations, and premium storytelling for upscale restaurants.',
                accent: 'from-amber-300 to-orange-500',
                glow: 'group-hover:shadow-[0_30px_60px_-20px_rgba(249,115,22,0.45)]',
                img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
                tag: 'Upscale',
              },
              {
                title: 'Cafe and bakery',
                desc: 'Warm product cards, daily specials, and fast mobile ordering flows.',
                accent: 'from-cyan-400 to-blue-500',
                glow: 'group-hover:shadow-[0_30px_60px_-20px_rgba(37,99,235,0.45)]',
                img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
                tag: 'Everyday',
              },
              {
                title: 'Catering and events',
                desc: 'Inquiry forms, packages, venue galleries, and quote-based bookings.',
                accent: 'from-fuchsia-400 to-rose-500',
                glow: 'group-hover:shadow-[0_30px_60px_-20px_rgba(219,39,119,0.45)]',
                img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
                tag: 'Events',
              },
              {
                title: 'Delivery first',
                desc: 'Menus, delivery coverage, and instant call-to-action buttons for orders.',
                accent: 'from-emerald-400 to-teal-500',
                glow: 'group-hover:shadow-[0_30px_60px_-20px_rgba(16,185,129,0.45)]',
                img: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
                tag: 'On-demand',
              },
            ].map((option, i) => (
              <Reveal key={option.title} delay={i * 120} className="h-full min-w-[80%] snap-center sm:min-w-[45%] md:min-w-0">
                <a
                  href="/login"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/60 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-slate-300 ${option.glow}`}
                >
                  {/* Image header with zoom on hover */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={option.img}
                      alt={option.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <span aria-hidden className={`absolute inset-0 bg-gradient-to-t ${option.accent} opacity-25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40`} />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-800 backdrop-blur">
                      {option.tag}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="relative flex flex-1 flex-col p-6">
                    <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${option.accent} transition-all duration-500 group-hover:w-24`} />
                    <h3 className="mt-5 text-xl font-black text-slate-900">{option.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 font-medium">{option.desc}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-indigo-650 transition group-hover:text-indigo-850">
                      Explore this option
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Stats / social-proof band */}
        <section className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 rounded-[32px] border border-slate-200/70 bg-white/70 p-8 backdrop-blur-xl shadow-sm md:grid-cols-4">
              {[
                { value: '12k+', label: 'Pages launched' },
                { value: '98%', label: 'Loved the design' },
                { value: '30+', label: 'Ready templates' },
                { value: '4.9/5', label: 'Average rating' },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={i * 100} className="text-center">
                  <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-3xl font-black text-transparent md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-600">Core capabilities</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">A polished visual system for modern business pages.</h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Cinematic visuals',
                desc: 'Gradients, glow layers, and glass surfaces that make the homepage feel designed, not assembled.',
                accent: 'from-cyan-400 to-blue-500',
                icon: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
              },
              {
                title: 'Conversion-first CTA',
                desc: 'Focused buttons, proof cards, and quick onboarding paths that move users into the product fast.',
                accent: 'from-fuchsia-400 to-rose-500',
                icon: 'M13 2 3 14h7l-1 8 10-12h-7l1-8Z',
              },
              {
                title: 'Flexible business flows',
                desc: 'Templates for dining, fitness, and events give the site a premium, use-case-driven feel.',
                accent: 'from-amber-300 to-orange-500',
                icon: 'M4 4h6v6H4Z M14 4h6v6h-6Z M4 14h6v6H4Z M14 14h6v6h-6Z',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 120} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-[28px] border border-slate-200/60 bg-white/70 p-7 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-slate-300">
                  <span aria-hidden className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]`} />
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={card.icon} />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 font-medium">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="simulator" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-fuchsia-600">Interactive studio</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">Switch the mood, keep the same polished system.</h2>
              <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-base font-medium">
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
                      className={`w-full rounded-[22px] border p-4 text-left transition duration-305 ${isActive ? 'border-slate-300 bg-white shadow-sm' : 'border-slate-200 bg-white/40 hover:bg-white/70'}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className={`bg-gradient-to-r ${item.accent} bg-clip-text text-sm font-black text-transparent`}>
                            {item.title}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">{item.tag}</div>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${isActive ? 'border-indigo-100 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                          Select
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={150} className="relative overflow-hidden rounded-[36px] border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/40">
              <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-indigo-50/20 blur-3xl" />
              <div className="absolute -bottom-12 right-0 h-44 w-44 rounded-full bg-fuchsia-400/10 blur-3xl" />

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">Studio mode</div>
                  <div className={`mt-1 bg-gradient-to-r ${activeTheme.accent} bg-clip-text text-xl font-black text-transparent`}>
                    {activeTheme.title}
                  </div>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">
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
                  <div key={title} className="rounded-[24px] border border-slate-100 bg-slate-50/50 p-5">
                    <div className="text-sm font-black text-slate-900">{title}</div>
                    <div className="mt-2 text-sm leading-7 text-slate-600 font-medium">{desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="templates" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <Reveal className="mb-10 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-600">Templates</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">Ready-made looks that still feel custom.</h2>
          </Reveal>

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
              <Reveal key={template.title} delay={index * 130} className="h-full">
                <div className="group h-full overflow-hidden rounded-[30px] border border-slate-200/60 bg-white p-4 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-slate-300 transition-all duration-500">
                  <div className="relative h-56 overflow-hidden rounded-[24px]">
                    <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${template.image}')` }} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${index === 0 ? 'from-slate-950 via-slate-950/20 to-transparent' : index === 1 ? 'from-cyan-950 via-slate-950/20 to-transparent' : 'from-rose-950 via-slate-950/20 to-transparent'}`} />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-800 backdrop-blur opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      View template
                    </span>
                  </div>
                  <div className="p-2 pt-5">
                    <h3 className="text-xl font-black text-slate-900">{template.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 font-medium">{template.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose-600">Loved by teams</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">People feel the polish instantly.</h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                quote: 'Our launch page finally looks as premium as the food we serve. Bookings jumped in the first week.',
                name: 'Aisha Rahman',
                role: 'Owner, Saffron Table',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
              },
              {
                quote: 'Switched the whole site in an afternoon. The animations make it feel like a product, not a template.',
                name: 'Marco Silva',
                role: 'Founder, Crust & Co.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
              },
              {
                quote: 'Clients think we hired an agency. The scroll animations and imagery do all the heavy lifting.',
                name: 'Elena Rossi',
                role: 'Events Lead, Bloom & Vine',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
              },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 120} className="h-full">
                <figure className="group flex h-full flex-col rounded-[28px] border border-slate-200/60 bg-white/70 p-7 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-slate-300">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.8L12 17.5 5.7 20.5l1.6-6.8L2 9.1l7-.6L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-7 text-slate-700 font-medium">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} loading="lazy" className="h-11 w-11 rounded-full object-cover ring-2 ring-white" />
                    <div>
                      <div className="text-sm font-black text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
          <Reveal className="mb-10 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-650">Pricing</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">Simple plans with a premium feel.</h2>
          </Reveal>

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
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={i * 120} className="h-full">
              <div className={`h-full rounded-[30px] border p-6 transition-all duration-500 hover:-translate-y-2 ${plan.featured ? 'border-indigo-100 bg-white shadow-xl shadow-indigo-600/5 ring-1 ring-indigo-500/10 hover:shadow-2xl' : 'border-slate-250 bg-white/70 shadow-sm hover:shadow-lg hover:border-slate-300'}`}>
                {plan.featured && (
                  <div className="mb-4 inline-flex rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">Most popular</div>
                )}
                <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${plan.accent}`} />
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                    <p className="mt-2 text-sm text-slate-500">For teams that want a sharper presence.</p>
                  </div>
                  <div className="text-4xl font-black text-slate-900">{plan.price}</div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-600 font-medium">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${plan.accent}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-black transition ${plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/10' : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Choose plan
                </Link>
              </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-10 lg:px-16">
          <Reveal className="rounded-[36px] border border-slate-200/80 bg-gradient-to-r from-cyan-400/20 via-fuchsia-400/20 to-amber-400/20 p-[1px]">
            <div className="rounded-[35px] bg-white/90 px-6 py-10 text-center backdrop-blur-xl md:px-10 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-600">Ready to launch</p>
              <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">
                Give the homepage the same polish as the product.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base font-medium">
                Start with a vibrant first impression, then move users into a clean dashboard and a confident signup flow.
              </p>

              <form onSubmit={handleEmailSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="min-h-14 flex-1 rounded-full border border-slate-200 bg-slate-50 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-7 py-4 text-sm font-black text-white transition hover:translate-y-[-1px] shadow-md shadow-indigo-600/10"
                >
                  Go to dashboard
                </button>
              </form>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
