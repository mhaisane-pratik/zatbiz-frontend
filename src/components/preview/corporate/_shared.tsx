'use client';

import React, { useEffect, useRef, useState } from 'react';

export type CorpView = 'landing' | 'login' | 'dashboard';

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
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
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, transform: shown ? 'none' : `translateY(${y}px)` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${shown ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}

export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Top preview bar with a Landing / Login / Dashboard segmented switcher. */
export function CorpPreviewBar({
  label,
  accent,
  view,
  onView,
  onBack,
}: {
  label: string;
  accent: string;
  view: CorpView;
  onView: (v: CorpView) => void;
  onBack: () => void;
}) {
  const tabs: CorpView[] = ['landing', 'login', 'dashboard'];
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-white/10 bg-slate-950/85 px-4 py-2.5 backdrop-blur-md">
      <button onClick={onBack} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/20">
        <span className="rotate-180"><ArrowIcon className="h-3.5 w-3.5" /></span>
        Back
      </button>

      <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => { onView(t); window.scrollTo({ top: 0 }); }}
            className={`rounded-full px-4 py-1.5 text-xs font-black capitalize transition ${view === t ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
            style={view === t ? { backgroundColor: accent } : undefined}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="hidden items-center gap-2 text-xs font-medium text-white/60 sm:flex">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: accent }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
        </span>
        <span className="font-black text-white">{label}</span>
      </div>
    </div>
  );
}
