'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Dependency-free scroll-reveal wrapper shared by all medical niche pages.
 * Fades + slides children up the first time they enter the viewport.
 */
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
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

/** Small arrow icon used across CTAs. */
export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Top bar shown above every live niche landing/login preview. */
export function PreviewBar({
  nicheName,
  accent,
  onBack,
  right,
}: {
  nicheName: string;
  accent: string;
  onBack: () => void;
  right?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-white/10 bg-slate-950/80 px-4 py-2.5 backdrop-blur-md">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/20"
      >
        <span className="rotate-180"><ArrowIcon className="h-3.5 w-3.5" /></span>
        All themes
      </button>
      <div className="flex items-center gap-2 text-xs font-medium text-white/70">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: accent }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
        </span>
        Live preview · <span className="font-black text-white">{nicheName}</span>
      </div>
      <div>{right}</div>
    </div>
  );
}
