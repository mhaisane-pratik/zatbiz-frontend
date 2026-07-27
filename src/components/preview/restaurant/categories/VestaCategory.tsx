'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { CategoryProps } from './types';

type MenuItem = {
  id: string | number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  badge: string;
};

function toTitleCase(value: string) {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeRestaurantName(value: string) {
  const cleaned = value.replace(/\s*(site|website|web application|app)\s*$/i, '').trim();
  return toTitleCase(cleaned || value);
}

function inferCategory(name: string, description = ''): MenuItem['category'] {
  const merged = `${name} ${description}`.toLowerCase();
  if (
    merged.includes('dessert') ||
    merged.includes('cake') ||
    merged.includes('souffle') ||
    merged.includes('tart') ||
    merged.includes('ice cream') ||
    merged.includes('gelato') ||
    merged.includes('sweet')
  ) {
    return 'desserts';
  }
  if (
    merged.includes('drink') ||
    merged.includes('coffee') ||
    merged.includes('tea') ||
    merged.includes('wine') ||
    merged.includes('mocktail') ||
    merged.includes('cocktail')
  ) {
    return 'drinks';
  }
  if (
    merged.includes('starter') ||
    merged.includes('appetizer') ||
    merged.includes('salad') ||
    merged.includes('soup') ||
    merged.includes('tartare') ||
    merged.includes('carpaccio')
  ) {
    return 'starters';
  }
  return 'mains';
}

export function VestaCategory({
  projectId,
  project,
  dbProducts,
  onAddToCart,
  setIsBookingModalOpen,
  customerSession,
  onLogout,
  logoUrl,
  logoIcon,
  companyName,
  heroImage,
  heroTitle,
  heroSubtitle,
  restaurantInfo,
  activeBlockId,
  setActiveBlockId,
  headerBlockId,
  heroBlockId,
}: CategoryProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [parallaxShift, setParallaxShift] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [emberTop, setEmberTop] = useState(0);

  const heroImgRef = useRef<HTMLImageElement>(null);

  // Fallback dishes
  const fallbackMenu: MenuItem[] = [
    {
      id: 101,
      name: 'Charred Citrus Plate',
      price: 650,
      description: 'Charred winter citrus, fresh goats curd, wild honeycomb and rosemary wood smoke.',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80',
      category: 'starters',
      badge: 'Signature',
    },
    {
      id: 102,
      name: 'Ember Root Sauce',
      price: 950,
      description: 'Slow-roasted hearth root vegetables finished with an emulsion of wood embers and butter.',
      imageUrl: 'https://images.unsplash.com/photo-1676471932681-45fa972d848a?auto=format&fit=crop&w=1000&q=80',
      category: 'mains',
      badge: "Chef's finish",
    },
    {
      id: 103,
      name: 'Slow Fire Plate',
      price: 1850,
      description: 'Aged beef tenderloin cooked slowly over open flame with wild herbs and red wine reduction.',
      imageUrl: 'https://images.unsplash.com/photo-1750943082452-c714763f73b2?auto=format&fit=crop&w=1000&q=80',
      category: 'mains',
      badge: 'Table favorite',
    },
    {
      id: 104,
      name: 'Cellar Pairing',
      price: 220,
      description: 'A glass of natural red or white selected from our hearth cellar to pair with your evening.',
      imageUrl: 'https://images.unsplash.com/photo-1574966739987-65e38db0f7ce?auto=format&fit=crop&w=1000&q=80',
      category: 'drinks',
      badge: 'By the glass',
    },
  ];

  const menuItems: MenuItem[] =
    dbProducts && dbProducts.length > 0
      ? dbProducts.map((product, idx) => {
          const inferredCategory = inferCategory(product.name, product.description || '');
          const isVegetarian = /veg|vegetarian|salad|paneer|tofu|broccoli|mushroom/i.test(
            `${product.name} ${product.description || ''}`
          );
          const badge = inferredCategory === 'desserts'
            ? 'Sweet Finish'
            : inferredCategory === 'starters'
              ? 'Starter'
              : inferredCategory === 'drinks'
                ? 'Sip Pairing'
                : idx === 0
                  ? 'Chef Special'
                  : isVegetarian
                    ? 'Vegetarian'
                    : 'Signature';

          return {
            id: product.id ?? idx,
            name: product.name,
            price: Number(product.price || 0),
            description: product.description || 'Prepared fresh with premium wood fire heat and seasonal ingredients.',
            imageUrl: product.imageUrl || fallbackMenu[idx % fallbackMenu.length].imageUrl,
            category: inferredCategory,
            badge,
          };
        })
      : fallbackMenu;

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      const vh = window.innerHeight;

      if (y > 40) setNavScrolled(true); else setNavScrolled(false);

      // parallax translation
      const shift = Math.min(y * 0.25, 160);
      setParallaxShift(shift);

      // ember rail progress bar calculations
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(y / scrollable, 1) : 0;
      setScrollProgress(pct * 100);
      setEmberTop(pct * (window.innerHeight - 14));
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const revealEls = document.querySelectorAll('.vesta-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vesta-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealEls.forEach((el) => io.observe(el));

    return () => {
      revealEls.forEach((el) => io.unobserve(el));
    };
  }, [menuItems]);

  const displayName = normalizeRestaurantName(
    restaurantInfo?.restaurantName || companyName || project?.name || 'VESTA'
  );

  const displayHeroTitle = heroTitle || 'the fire, kept';
  const displayHeroSubtitle = heroSubtitle || 'An open kitchen, a slow flame, and a table that never rushes you.';
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1666032119084-82351976a922?auto=format&fit=crop&w=2000&q=80';

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-7 w-auto object-contain" />
  ) : (
    <span className="text-xl font-bold uppercase tracking-widest">{logoIcon || displayName}</span>
  );

  return (
    <div className="vesta-container font-sans bg-[#F7F4EE] text-[#2A2420] overflow-x-hidden min-h-screen selection:bg-[#495D42] selection:text-[#F7F4EE]">
      {/* Font imports and global scoped styling overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Manrope:wght@300;400;500;600;700&display=swap');
        
        .vesta-container {
          --cream: #F7F4EE;
          --cream-2: #F1ECE2;
          --ink: #2A2420;
          --ink-soft: #574E44;
          --olive: #495D42;
          --olive-deep: #384A32;
          --brass: #B08D57;
          --clay: #C98F7A;
          --line: #DDD6C9;
          --white: #FFFDF9;

          --serif: 'Fraunces', serif;
          --sans: 'Manrope', sans-serif;
          --ease: cubic-bezier(.16,.8,.24,1);
          font-family: var(--sans);
        }

        .vesta-serif { font-family: var(--serif); }
        .vesta-sans { font-family: var(--sans); }

        .vesta-eyebrow {
          font-family: var(--sans);
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--olive);
          font-weight: 600;
        }

        .vesta-ember-rail {
          position: fixed;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: transparent;
          z-index: 60;
          pointer-events: none;
        }
        .vesta-ember-fill {
          width: 100%;
          background: linear-gradient(180deg, var(--brass), var(--clay));
          transition: height 0.05s linear;
        }
        .vesta-ember-dot {
          position: fixed;
          left: -5px;
          width: 13px; height: 13px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #F4D9A8, var(--brass) 60%, var(--olive-deep) 130%);
          box-shadow: 0 0 12px 3px rgba(176,141,87,0.55);
          z-index: 61;
          pointer-events: none;
          transition: top 0.05s linear;
        }

        .vesta-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 26px 5vw;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          transition: background 0.4s ease, padding 0.4s ease, box-shadow .4s ease, color 0.4s ease;
          background: transparent;
          color: #FFFDF9;
        }
        .vesta-nav.vesta-scrolled {
          background: rgba(247,244,238,0.86);
          backdrop-filter: blur(10px);
          padding: 16px 5vw;
          box-shadow: 0 1px 0 var(--line);
          color: var(--ink);
        }
        
        .vesta-nav-mark {
          font-family: var(--serif);
          font-weight: 500;
          font-size: 1.25rem;
          letter-spacing: 0.06em;
          color: #FFFDF9;
          transition: color 0.4s ease;
        }
        .vesta-nav.vesta-scrolled .vesta-nav-mark {
          color: var(--ink);
        }

        .vesta-nav-links {
          display: flex;
          gap: 36px;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: #EFE3CE;
          transition: color 0.4s ease;
        }
        .vesta-nav.vesta-scrolled .vesta-nav-links {
          color: var(--ink-soft);
        }
        .vesta-nav-links a { position: relative; padding-bottom: 4px; }
        .vesta-nav-links a::after {
          content:'';
          position:absolute; left:0; bottom:0;
          width:0; height:1px;
          background: var(--brass);
          transition: width .35s var(--ease);
        }
        .vesta-nav.vesta-scrolled .vesta-nav-links a::after {
          background: var(--olive);
        }
        .vesta-nav-links a:hover::after { width:100%; }
        .vesta-nav-links a:hover { color: #FFFDF9; }
        .vesta-nav.vesta-scrolled .vesta-nav-links a:hover { color: var(--ink); }

        .vesta-nav-cta {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          border: 1px solid #FFFDF9;
          padding: 10px 20px;
          border-radius: 999px;
          transition: background .35s var(--ease), color .35s var(--ease), border-color .35s var(--ease);
          cursor: pointer;
          background: transparent;
          color: #FFFDF9;
        }
        .vesta-nav-cta:hover { background: #FFFDF9; color: var(--ink); }
        .vesta-nav.vesta-scrolled .vesta-nav-cta {
          border-color: var(--ink);
          color: var(--ink);
        }
        .vesta-nav.vesta-scrolled .vesta-nav-cta:hover {
          background: var(--ink);
          color: var(--cream);
        }

        .vesta-auth-btn {
          color: #EFE3CE;
          transition: color 0.4s ease;
        }
        .vesta-auth-btn:hover {
          color: #FFFDF9;
        }
        .vesta-nav.vesta-scrolled .vesta-auth-btn {
          color: var(--ink-soft);
        }
        .vesta-nav.vesta-scrolled .vesta-auth-btn:hover {
          color: var(--ink);
        }

        .vesta-hero {
          position: relative;
          height: 100vh;
          min-height: 560px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          isolation: isolate;
        }
        .vesta-hero-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 112%;
          object-fit: cover;
          object-position: center 40%;
          z-index: -2;
          will-change: transform;
        }
        .vesta-hero-veil {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(42,36,32,0.28) 0%, rgba(42,36,32,0.08) 32%, rgba(42,36,32,0.55) 100%);
          z-index: -1;
        }
        .vesta-hero-inner {
          position: relative;
          width: 100%;
          padding: 0 5vw 7vw;
          color: var(--white);
          text-align: left;
        }
        .vesta-hero-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: #EFE3CE;
          font-weight: 600;
          opacity: 0;
          animation: riseIn 0.9s var(--ease) 0.3s forwards;
        }
        .vesta-hero h1 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(3.4rem, 10vw, 8.5rem);
          line-height: 0.92;
          letter-spacing: -0.01em;
          margin-top: 14px;
          overflow: hidden;
        }
        .vesta-hero h1 span {
          display: block;
          transform: translateY(105%);
          animation: riseIn 1s var(--ease) forwards;
        }
        .vesta-hero h1 span:nth-child(1) { animation-delay: 0.45s; }
        .vesta-hero h1 span:nth-child(2) {
          font-style: italic;
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--white);
          animation-delay: 0.6s;
        }
        .vesta-hero-sub {
          margin-top: 26px;
          max-width: 420px;
          font-size: 1rem;
          line-height: 1.6;
          color: #F1E7D6;
          font-weight: 300;
          opacity: 0;
          animation: riseIn 0.9s var(--ease) 0.85s forwards;
        }
        @keyframes riseIn {
          to { transform: translateY(0); opacity: 1; }
        }

        .vesta-scroll-cue {
          position: absolute;
          bottom: 34px; left: 5vw;
          display: flex; align-items: center; gap: 10px;
          color: #EFE3CE;
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0;
          animation: riseIn 0.8s var(--ease) 1.2s forwards;
        }
        .vesta-scroll-cue .vesta-stem {
          width: 1px; height: 34px;
          background: #EFE3CE;
          position: relative;
          overflow: hidden;
        }
        .vesta-scroll-cue .vesta-stem::after {
          content:'';
          position:absolute; left:0; top:-100%;
          width:100%; height:100%;
          background: var(--brass);
          animation: pour 1.8s ease-in-out infinite;
        }
        @keyframes pour {
          0% { top:-100%; }
          60% { top:100%; }
          100% { top:100%; }
        }

        /* Reveal utility classes */
        .vesta-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
        }
        .vesta-reveal.vesta-in { opacity: 1; transform: translateY(0); }
        .vesta-reveal-delay-1 { transition-delay: 0.08s; }
        .vesta-reveal-delay-2 { transition-delay: 0.16s; }
        .vesta-reveal-delay-3 { transition-delay: 0.24s; }
        .vesta-reveal-delay-4 { transition-delay: 0.32s; }

        .vesta-statement {
          padding: min(22vw,240px) 8vw;
          text-align: center;
        }
        .vesta-statement p {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(1.7rem, 4.4vw, 3.4rem);
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: var(--ink);
          max-width: 15ch;
          margin: 0 auto;
        }
        .vesta-statement em {
          font-style: italic;
          color: var(--olive);
          font-weight: 400;
        }

        .vesta-section-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 24px;
          padding: 0 6vw;
          margin-bottom: 54px;
          flex-wrap: wrap;
          text-align: left;
        }
        .vesta-section-head h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          letter-spacing: -0.01em;
        }
        .vesta-section-note {
          max-width: 280px;
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--ink-soft);
          font-weight: 300;
          text-align: left;
        }

        .vesta-gallery-section { padding: 130px 0 150px; }
        .vesta-gallery-scroll {
          display: flex;
          gap: 22px;
          padding: 0 6vw 20px;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          scrollbar-width: none;
        }
        .vesta-gallery-scroll::-webkit-scrollbar { display:none; }
        
        .vesta-dish {
          scroll-snap-align: start;
          flex: 0 0 auto;
          width: min(72vw, 380px);
          position: relative;
        }
        .vesta-dish-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          overflow: hidden;
          border-radius: 4px;
        }
        .vesta-dish-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: scale(1.06);
          transition: transform 1.1s var(--ease);
        }
        .vesta-dish:hover .vesta-dish-frame img { transform: scale(1.16); }
        .vesta-dish-num {
          position: absolute;
          top: 16px; left: 16px;
          font-family: var(--serif);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--white);
          background: rgba(42,36,32,0.35);
          backdrop-filter: blur(4px);
          padding: 5px 12px;
          border-radius: 999px;
          z-index: 2;
        }
        
        .vesta-dish-caption {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--line);
          padding-top: 14px;
          text-align: left;
        }
        .vesta-dish-title-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          width: 100%;
        }
        .vesta-dish-caption h3 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: 1.2rem;
          color: var(--ink);
        }
        .vesta-dish-caption span {
          font-size: 0.78rem;
          color: var(--ink-soft);
          font-weight: 300;
          font-style: italic;
        }

        .vesta-split {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          min-height: 84vh;
        }
        .vesta-split.vesta-reverse { grid-template-columns: 0.9fr 1.1fr; }
        .vesta-split.vesta-reverse .vesta-split-media { order: 2; }
        .vesta-split-media {
          position: relative;
          overflow: hidden;
        }
        .vesta-split-media img {
          width: 100%; height: 100%;
          object-fit: cover;
          position: absolute; inset:0;
        }
        .vesta-split-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8vw;
          background: var(--cream-2);
          text-align: left;
        }
        .vesta-split-text h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3.1rem);
          line-height: 1.14;
          margin: 14px 0 22px;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .vesta-split-text p {
          font-size: 0.98rem;
          line-height: 1.75;
          color: var(--ink-soft);
          font-weight: 300;
          max-width: 40ch;
        }
        .vesta-split-text .vesta-quote-mark {
          font-family: var(--serif);
          font-style: italic;
          font-size: 3.4rem;
          color: var(--brass);
          line-height: 1;
          margin-bottom: 6px;
        }

        .vesta-chef {
          padding: 150px 6vw;
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 6vw;
          align-items: center;
        }
        .vesta-chef-portrait {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          border-radius: 4px;
        }
        .vesta-chef-portrait img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .vesta-chef-text {
          text-align: left;
        }
        .vesta-chef-name {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(2rem, 3.6vw, 3rem);
          margin: 16px 0 20px;
          color: var(--ink);
        }
        .vesta-chef-role {
          color: var(--olive);
          font-weight: 600;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .vesta-chef-text p {
          font-size: 1.06rem;
          line-height: 1.85;
          color: var(--ink-soft);
          font-weight: 300;
          max-width: 46ch;
        }

        .vesta-marquee-wrap {
          padding: 60px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          overflow: hidden;
          background: var(--cream-2);
        }
        .vesta-marquee {
          display: flex;
          width: max-content;
          animation: scrollLeft 34s linear infinite;
        }
        .vesta-marquee span {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.6rem, 3.4vw, 2.6rem);
          color: var(--ink);
          padding: 0 3vw;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 3vw;
          opacity: 0.82;
        }
        .vesta-marquee span::after {
          content: '✦';
          font-family: var(--sans);
          font-size: 0.9rem;
          color: var(--brass);
        }
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .vesta-reserve {
          padding: 150px 6vw;
          text-align: center;
          position: relative;
        }
        .vesta-reserve h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(2.6rem, 7vw, 5.5rem);
          line-height: 1.05;
          margin: 18px auto 40px;
          max-width: 16ch;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .vesta-reserve h2 em { font-style: italic; color: var(--olive); }
        
        .vesta-reserve-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--ink);
          color: var(--cream);
          padding: 20px 42px;
          border-radius: 999px;
          font-size: 0.82rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          position: relative;
          overflow: hidden;
          transition: transform .4s var(--ease), box-shadow .4s var(--ease);
          cursor: pointer;
          border: none;
        }
        .vesta-reserve-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 34px -10px rgba(42,36,32,0.4);
        }
        .vesta-reserve-btn .vesta-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--brass);
          animation: pulse 1.8s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: .4; transform: scale(1.4); }
        }

        .vesta-reserve-meta {
          margin-top: 56px;
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }
        .vesta-reserve-meta div { text-align: left; }
        .vesta-reserve-meta .vesta-label {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--olive);
          font-weight: 700;
          margin-bottom: 8px;
        }
        .vesta-reserve-meta .vesta-val {
          font-size: 0.95rem;
          color: var(--ink-soft);
          line-height: 1.6;
          font-weight: 300;
          white-space: pre-line;
        }

        .vesta-footer {
          padding: 46px 6vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--line);
          flex-wrap: wrap;
          gap: 18px;
        }
        .vesta-footer-mark {
          font-family: var(--serif);
          font-size: 1.1rem;
          color: var(--ink);
        }
        .vesta-footer-links {
          display: flex; gap: 26px;
          font-size: 0.76rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }
        .vesta-footer-links a { transition: color .3s ease; }
        .vesta-footer-links a:hover { color: var(--olive); }
        .vesta-footer-copy {
          font-size: 0.76rem;
          color: var(--ink-soft);
        }

        @media (max-width: 860px) {
          .vesta-split, .vesta-split.vesta-reverse { grid-template-columns: 1fr; }
          .vesta-split-media { height: 52vh; }
          .vesta-split.vesta-reverse .vesta-split-media { order: 0; }
          .vesta-split-text { padding: 12vw 8vw; }
          .vesta-chef { grid-template-columns: 1fr; gap: 40px; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
        }
      ` }} />

      {/* Ember Rail progress indicator */}
      <div className="vesta-ember-rail">
        <div className="vesta-ember-fill" style={{ height: `${scrollProgress}%` }} />
      </div>
      <div className="vesta-ember-dot" style={{ top: `${emberTop}px` }} />

      {/* Navigation */}
      <nav 
        className={`vesta-nav ${navScrolled ? 'vesta-scrolled' : ''}`}
        onClick={(e) => {
          if (setActiveBlockId && headerBlockId) {
            e.stopPropagation();
            setActiveBlockId(headerBlockId);
          }
        }}
      >
        <div className="vesta-nav-mark">{displayName}</div>
        <div className="vesta-nav-links">
          <a href="#table">The Table</a>
          <a href="#ambiance">Ambiance</a>
          <a href="#chef">Chef</a>
          <a href="#reserve">Reserve</a>
        </div>
        <div className="flex items-center gap-4">
          {customerSession ? (
            <>
              <Link
                href={`/preview/${projectId}/dashboard`}
                className="vesta-auth-btn text-[11px] font-bold uppercase tracking-[0.14em]"
              >
                Concierge
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="vesta-auth-btn text-[11px] font-bold uppercase tracking-[0.14em] bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href={`/preview/${projectId}/login`}
              className="vesta-auth-btn text-[11px] font-bold uppercase tracking-[0.14em]"
            >
              Sign In
            </Link>
          )}
          <button onClick={() => setIsBookingModalOpen(true)} className="vesta-nav-cta">Book a Table</button>
        </div>
      </nav>

      {/* HERO */}
      <section 
        className="vesta-hero"
        onClick={(e) => {
          if (setActiveBlockId && heroBlockId) {
            e.stopPropagation();
            setActiveBlockId(heroBlockId);
          }
        }}
      >
        <img
          ref={heroImgRef}
          className="vesta-hero-img"
          src={restaurantInfo?.layoutContent?.landing?.hero?.imageUrl || displayHeroImage}
          alt="Warm, softly lit dining room with wooden tables"
          style={{ transform: `translateY(${parallaxShift}px)` }}
        />
        <div className="vesta-hero-veil" />
        <div className="vesta-hero-inner">
          <div className="vesta-hero-eyebrow">{restaurantInfo?.layoutContent?.landing?.hero?.eyebrow || 'Modern Hearth Dining'}</div>
          <h1>
            <span>{displayName}</span>
            <span>{restaurantInfo?.layoutContent?.landing?.hero?.title || displayHeroTitle}</span>
          </h1>
          <p className="vesta-hero-sub">{restaurantInfo?.layoutContent?.landing?.hero?.subtitle || displayHeroSubtitle}</p>
        </div>
        <div className="vesta-scroll-cue">
          <div className="vesta-stem" />
          Scroll
        </div>
      </section>

      {/* CUSTOMIZABLE SECTIONS — order, visibility & content driven by Theme Studio Layout editor */}
      {(() => {
        const lc = restaurantInfo?.layoutContent?.landing || {};
        const sec = (k: string) => lc[k] || {};
        const isVisible = (k: string) => sec(k).visible !== false;
        const defaultOrder = ['statement', 'dishes', 'ambiance1', 'ambiance2', 'chef', 'marquee', 'reserve'];
        const order: string[] = Array.isArray(lc.sectionOrder) && lc.sectionOrder.length ? lc.sectionOrder : defaultOrder;

        const marqueeItems: string[] = (sec('marquee').items
          ? String(sec('marquee').items).split(',').map((s: string) => s.trim()).filter(Boolean)
          : ['Wood Fire', 'Seasonal Menu', 'Natural Wine', 'Open Kitchen']);

        const renderers: Record<string, () => React.ReactNode> = {
          statement: () => (
            <section className="vesta-statement" key="statement">
              {sec('statement').text ? (
                <p className="vesta-reveal">{sec('statement').text}</p>
              ) : (
                <p className="vesta-reveal">
                  Every dish begins with <em>fire</em> — and ends at your table, <em>unhurried</em>.
                </p>
              )}
            </section>
          ),
          dishes: () => (
            <section className="vesta-gallery-section" id="table" key="dishes">
              <div className="vesta-section-head">
                <div className="vesta-reveal">
                  <span className="vesta-eyebrow">{sec('dishes').eyebrow || 'The Table'}</span>
                  <h2>{sec('dishes').heading || 'Signature dishes'}</h2>
                </div>
                <p className="vesta-section-note vesta-reveal vesta-reveal-delay-1">
                  {sec('dishes').note || 'A seasonal menu built around the best fresh wood-fired creations.'}
                </p>
              </div>

              <div className="vesta-gallery-scroll">
                {menuItems.map((item, index) => (
                  <div key={item.id} className={`vesta-dish vesta-reveal vesta-reveal-delay-${index % 4}`}>
                    <div className="vesta-dish-frame">
                      <div className="vesta-dish-num">0{index + 1}</div>
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                    <div className="vesta-dish-caption">
                      <div className="vesta-dish-title-row">
                        <h3>{item.name}</h3>
                        <span>₹{item.price}</span>
                      </div>
                      <p className="text-[11px] text-[#574E44] font-light mt-1 min-h-[36px]">{item.description}</p>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => onAddToCart(item as any)}
                          className="flex-1 py-2 text-[9px] uppercase font-bold tracking-widest bg-[#2A2420] text-[#F7F4EE] hover:bg-[#B08D57] transition-colors rounded border-none cursor-pointer"
                        >
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ),
          ambiance1: () => (
            <section className="vesta-split" id="ambiance" key="ambiance1">
              <div className="vesta-split-media vesta-reveal">
                <img src={sec('ambiance1').imageUrl || 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1400&q=80'} alt="Warm canopy lighting over the dining room" />
              </div>
              <div className="vesta-split-text">
                <span className="vesta-eyebrow vesta-reveal">{sec('ambiance1').eyebrow || 'Ambiance'}</span>
                {sec('ambiance1').heading ? (
                  <h2 className="vesta-reveal vesta-reveal-delay-1">{sec('ambiance1').heading}</h2>
                ) : (
                  <h2 className="vesta-reveal vesta-reveal-delay-1">
                    Low light. <br />Long evenings.
                  </h2>
                )}
                <p className="vesta-reveal vesta-reveal-delay-2">
                  {sec('ambiance1').text || 'Candlelight, warm brass, and a room built to make three hours feel like one.'}
                </p>
              </div>
            </section>
          ),
          ambiance2: () => (
            <section className="vesta-split vesta-reverse" key="ambiance2">
              <div className="vesta-split-text">
                <span className="vesta-split-text vesta-quote-mark vesta-reveal">"</span>
                {sec('ambiance2').heading ? (
                  <h2 className="vesta-reveal vesta-reveal-delay-1">{sec('ambiance2').heading}</h2>
                ) : (
                  <h2 className="vesta-reveal vesta-reveal-delay-1">
                    A room that fills, <br />never fights.
                  </h2>
                )}
                <p className="vesta-reveal vesta-reveal-delay-2">
                  {sec('ambiance2').text || 'Every table is set apart — close enough to feel the room, far enough to hear only yours.'}
                </p>
              </div>
              <div className="vesta-split-media vesta-reveal">
                <img src={sec('ambiance2').imageUrl || 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1400&q=80'} alt="Guests seated at a softly lit restaurant" />
              </div>
            </section>
          ),
          chef: () => (
            <section className="vesta-chef" id="chef" key="chef">
              <div className="vesta-chef-portrait vesta-reveal">
                <img src={sec('chef').imageUrl || 'https://images.unsplash.com/photo-1750943082452-c714763f73b2?auto=format&fit=crop&w=1000&q=80'} alt="Chef presenting a finished plate" />
              </div>
              <div className="vesta-chef-text">
                <span className="vesta-chef-role vesta-reveal">{sec('chef').role || 'Head of Kitchen'}</span>
                <h2 className="vesta-chef-name vesta-reveal vesta-reveal-delay-1">{sec('chef').name || 'Elena Moretti'}</h2>
                <p className="vesta-reveal vesta-reveal-delay-2">
                  {sec('chef').bio || 'Fifteen years behind the flame taught her one thing: the fire does the talking. Her plates are built to get out of its way.'}
                </p>
              </div>
            </section>
          ),
          marquee: () => (
            <div className="vesta-marquee-wrap" key="marquee">
              <div className="vesta-marquee">
                {[...marqueeItems, ...marqueeItems].map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </div>
            </div>
          ),
          reserve: () => (
            <section className="vesta-reserve" id="reserve" key="reserve">
              <span className="vesta-eyebrow vesta-reveal">{sec('reserve').eyebrow || 'Reserve'}</span>
              {sec('reserve').heading ? (
                <h2 className="vesta-reveal vesta-reveal-delay-1">{sec('reserve').heading}</h2>
              ) : (
                <h2 className="vesta-reveal vesta-reveal-delay-1">
                  Come sit by <em>the fire</em>.
                </h2>
              )}
              <button onClick={() => setIsBookingModalOpen(true)} className="vesta-reserve-btn vesta-reveal vesta-reveal-delay-2">
                <span className="vesta-dot" />Book a Table
              </button>

              <div className="vesta-reserve-meta vesta-reveal vesta-reveal-delay-3">
                <div>
                  <div className="vesta-label">Hours</div>
                  <div className="vesta-val">
                    {sec('reserve').hours || restaurantInfo?.openingHours || 'Tue – Sun\n5:30pm – 11pm'}
                  </div>
                </div>
                <div>
                  <div className="vesta-label">Address</div>
                  <div className="vesta-val">
                    {sec('reserve').address || restaurantInfo?.address || '14 Kiln Row\nPune, Maharashtra'}
                  </div>
                </div>
                <div>
                  <div className="vesta-label">Contact</div>
                  <div className="vesta-val">
                    {sec('reserve').email || restaurantInfo?.email || 'hello@vesta-table.com'}{'\n'}
                    {sec('reserve').phone || restaurantInfo?.phone || '+91 20 4567 8900'}
                  </div>
                </div>
              </div>
            </section>
          ),
        };

        return order
          .filter(k => renderers[k] && isVisible(k))
          .map(k => renderers[k]());
      })()}

      {/* Footer */}
      <footer className="vesta-footer">
        <div className="vesta-footer-mark">{displayName}</div>
        <div className="vesta-footer-links">
          <a href="#table">Menu</a>
          <a href="#ambiance">Ambiance</a>
          <a href="#reserve">Reserve</a>
        </div>
        <div className="vesta-footer-copy">© 2026 {displayName}. All rights reserved.</div>
      </footer>
    </div>
  );
}
