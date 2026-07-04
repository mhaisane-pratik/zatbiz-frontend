'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { CategoryProps, getThemeColors } from './types';
import { FineDiningLogin } from './FineDiningLogin';
import { FineDiningDashboard } from './FineDiningDashboard';

export { FineDiningLogin, FineDiningDashboard };

type MenuItem = {
  id: string | number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  badge: string;
};

const MENU_FILTERS: Array<'All' | 'Starters' | 'Mains' | 'Desserts' | 'Drinks'> = [
  'All',
  'Starters',
  'Mains',
  'Desserts',
  'Drinks',
];

function toTitleCase(value: string) {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeRestaurantName(value: string) {
  const cleaned = value.replace(/\s*(site|website|web application|app)\s*$/i, '').trim();
  const trimmedSuffix = cleaned.replace(/(.*?)(I{3,})$/i, '$1').trim();
  return toTitleCase(trimmedSuffix || cleaned || value);
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

function isTemplateHero(value?: string) {
  if (!value) return false;
  return /exquisite gastronomy|refined service|fine dining|quiet luxury|sophisticated multi-course/i.test(value);
}

export default function FineDiningCategory({
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
  themePreset,
  restaurantInfo,
  activeBlockId,
  setActiveBlockId,
  headerBlockId,
  heroBlockId
}: CategoryProps) {
  const selectedHomepageLayout = restaurantInfo?.selectedHomepageLayout || 'menu-grid-focus';
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<(typeof MENU_FILTERS)[number]>('All');
  const [activeDiet, setActiveDiet] = React.useState<'All' | 'Vegetarian' | 'Signature'>('All');

  const defaultTheme = {
    bgAccent: 'bg-[#c59b6d]',
    textAccent: 'text-[#c59b6d]',
    hoverBgAccent: 'hover:bg-[#d7b48a]',
    borderAccent: 'border-[#c59b6d]/30',
    hoverBorderAccent: 'hover:border-[#c59b6d]/60',
    selectionBg: 'selection:bg-[#c59b6d]',
    btnBorderAccent: 'border-[#c59b6d]',
    btnTextAccent: 'text-[#c59b6d]',
    btnHoverBgAccent: 'hover:bg-[#c59b6d]',
  };

  const colors = getThemeColors(themePreset, defaultTheme);

  const displayLogo = logoUrl ? (
    <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
  ) : (
    <span className="text-3xl select-none text-[#c59b6d]">{logoIcon || 'local_dining'}</span>
  );

  const displayName = normalizeRestaurantName(
    restaurantInfo?.restaurantName || companyName || project.name || 'Fine Dining'
  );
  const displayHeroImage =
    heroImage || 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&auto=format&fit=crop&q=80';
  const displayHeroTitle = isTemplateHero(heroTitle)
    ? `${displayName} - Modern dining, beautifully plated`
    : heroTitle || `${displayName} - Modern dining, beautifully plated`;
  const displayHeroSubtitle = isTemplateHero(heroSubtitle)
    ? 'A refined food-first homepage with seasonal dishes, intimate tables, and a warm reservation experience.'
    : heroSubtitle ||
      'A refined food-first homepage with seasonal dishes, intimate tables, and a warm reservation experience.';

  const fallbackMenu: MenuItem[] = [
    {
      id: 101,
      name: 'Truffle Butter Tagliatelle',
      price: 650,
      description:
        'Hand-rolled pasta, black winter truffle, aged Parmigiano, and cultured butter finished with herbs.',
      imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&auto=format&fit=crop&q=80',
      category: 'mains',
      badge: 'Chef Special',
    },
    {
      id: 102,
      name: 'Pan-Seared Sea Bass',
      price: 950,
      description:
        'Wild-caught sea bass with saffron emulsion, heirloom carrots, and fresh dill oil.',
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
      category: 'mains',
      badge: 'Seasonal Plate',
    },
    {
      id: 103,
      name: 'Wagyu Beef Tenderloin',
      price: 1850,
      description:
        'A5 Wagyu with roasted marrow, charred pearl onions, and a deep red wine reduction.',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      category: 'mains',
      badge: 'Signature',
    },
    {
      id: 104,
      name: 'Grand Souffle',
      price: 450,
      description:
        'Madagascar vanilla bean souffle, warm chocolate ganache, and a delicate gold leaf finish.',
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
      category: 'desserts',
      badge: 'Sweet Finish',
    },
    {
      id: 105,
      name: 'Citrus Garden Salad',
      price: 320,
      description: 'Crisp greens, fennel, orange segments, toasted almonds, and herb vinaigrette.',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
      category: 'starters',
      badge: 'Fresh Start',
    },
    {
      id: 106,
      name: 'Sparkling Yuzu Spritz',
      price: 220,
      description: 'Yuzu, elderflower, soda, and a crisp citrus finish served over ice.',
      imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6d3a?w=800&auto=format&fit=crop&q=80',
      category: 'drinks',
      badge: 'Refresh',
    },
  ];

  const menuItems: MenuItem[] =
    dbProducts.length > 0
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
            description: product.description || 'Prepared fresh with premium seasonal ingredients.',
            imageUrl:
              product.imageUrl ||
              fallbackMenu[idx % fallbackMenu.length].imageUrl,
            category: inferredCategory,
            badge,
          };
        })
      : fallbackMenu;

  const filteredMenu = menuItems.filter((item) => {
    const search = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search);

    const matchesCategory = activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesDiet =
      activeDiet === 'All' ||
      (activeDiet === 'Vegetarian'
        ? /veg|vegetarian|salad|paneer|tofu|broccoli|mushroom/i.test(`${item.name} ${item.description}`)
        : item.badge === 'Chef Special' || item.badge === 'Signature');

    return matchesSearch && matchesCategory && matchesDiet;
  });

  const featuredStats = [
    { label: 'Chef-crafted dishes', value: '24+' },
    { label: 'Guest rating', value: '4.9/5' },
    { label: 'Private tables', value: '12' },
  ];

  const renderSupportingPanel = () => {
    if (selectedHomepageLayout === 'reservation-banner') {
      return (
        <div className="rounded-[28px] border border-[#e7ddd1] bg-[#14100d] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.4)] text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#d7b48a]">Reserve a table</p>
              <h3 className="mt-2 text-xl font-semibold">Dinner bookings</h3>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/70">
              Today
            </span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Date</span>
              <input type="date" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Time</span>
              <input type="time" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" />
            </label>
          </div>
          <button
            type="button"
            onClick={() => setIsBookingModalOpen(true)}
            className="mt-5 w-full rounded-2xl bg-[#c59b6d] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d7b48a]"
          >
            Select table and reserve
          </button>
        </div>
      );
    }

    if (selectedHomepageLayout === 'gallery-carousel') {
      const shots = [
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      ];

      return (
        <div className="rounded-[28px] border border-[#eadfd5] bg-white p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]">
          <div className="grid grid-cols-2 gap-4">
            {shots.map((shot, index) => (
              <div key={shot} className={`${index === 0 ? 'col-span-2' : ''} overflow-hidden rounded-2xl`}>
                <img src={shot} alt="Dining gallery" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedHomepageLayout === 'map-timings') {
      return (
        <div className="rounded-[28px] border border-[#eadfd5] bg-[#fffaf4] p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.14)]">
          <div className="space-y-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#c59b6d]">Visit us</p>
              <h3 className="mt-2 text-2xl font-semibold text-[#1f1712]">Hours and location</h3>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#1f1712]">12 Gourmet Boulevard</p>
              <p className="mt-1 text-sm text-[#6d6258]">Culinary District, Noida, Uttar Pradesh</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7f73]">Lunch</p>
                <p className="mt-2 font-semibold text-[#1f1712]">12:00 PM - 3:30 PM</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7f73]">Dinner</p>
                <p className="mt-2 font-semibold text-[#1f1712]">6:00 PM - 11:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-[28px] border border-[#eadfd5] bg-[#14100d] p-7 text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)]">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[#d7b48a]">Chef's philosophy</p>
        <h3 className="mt-3 text-2xl font-semibold">Fine dining with a warmer rhythm</h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">
          We keep the mood intimate and the menu seasonal, pairing polished service with dishes that feel thoughtful, fresh, and memorable.
        </p>
        <div className="mt-6 grid gap-3">
          {[
            'Seasonal ingredients sourced weekly',
            'Low-light dining rooms for evening service',
            'Private booking and special occasion tables',
          ].map((point) => (
            <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/82">
              <span className="h-2 w-2 rounded-full bg-[#d7b48a]" />
              <span>{point}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsBookingModalOpen(true)}
          className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#14100d] transition hover:bg-[#f2e6d9]"
        >
          Reserve a table
        </button>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[#fbf7f2] text-[#1f1712] ${colors.selectionBg} selection:text-white`}>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(197,155,109,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(25,17,14,0.06),_transparent_22%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(251,247,242,0.65))]" />

      <nav 
        onClick={(e) => {
          if (setActiveBlockId && headerBlockId) {
            e.stopPropagation();
            setActiveBlockId(headerBlockId);
          }
        }}
        className={`sticky top-0 z-50 border-b bg-[#fbf7f2]/90 backdrop-blur-xl transition-all duration-300 ${
          setActiveBlockId ? 'cursor-pointer hover:border-indigo-500/50' : 'border-[#e9dfd4]/80'
        } ${activeBlockId === headerBlockId ? 'ring-2 ring-indigo-500 border-indigo-500' : ''}`}
      >
        {setActiveBlockId && <div className="absolute inset-0 z-10 cursor-pointer" />}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            {displayLogo}
            <div className="min-w-0">
              <div className="truncate text-base font-semibold tracking-tight text-[#1f1712] sm:text-lg">
                {displayName}
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[#8d7f73]">
                Modern dining experience
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#786b61] lg:flex">
            <a href="#menu" className="transition hover:text-[#1f1712]">
              Menu
            </a>
            <a href="#story" className="transition hover:text-[#1f1712]">
              Story
            </a>
            <a href="#experience" className="transition hover:text-[#1f1712]">
              Experience
            </a>
            <a href="#testimonials" className="transition hover:text-[#1f1712]">
              Reviews
            </a>
          </div>

          <div className="flex items-center gap-3">
            {customerSession ? (
              <>
                <Link
                  href={`/preview/${projectId}/dashboard`}
                  className="rounded-full border border-[#e3d7cb] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e433c] transition hover:border-[#c59b6d] hover:text-[#1f1712]"
                >
                  Concierge
                </Link>
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-full bg-[#1f1712] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2c201a]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href={`/preview/${projectId}/login`}
                className="rounded-full border border-[#e3d7cb] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e433c] transition hover:border-[#c59b6d] hover:text-[#1f1712]"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main>
        <section 
          onClick={(e) => {
            if (setActiveBlockId && heroBlockId) {
              e.stopPropagation();
              setActiveBlockId(heroBlockId);
            }
          }}
          className={`relative overflow-hidden transition-all duration-300 ${
            setActiveBlockId ? 'cursor-pointer hover:ring-2 hover:ring-indigo-500/30' : ''
          } ${activeBlockId === heroBlockId ? 'ring-2 ring-indigo-500' : ''}`}
        >
          {setActiveBlockId && <div className="absolute inset-0 z-10 cursor-pointer" />}
          <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[1.04fr_0.96fr] lg:px-16 lg:py-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#e3d7cb] bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d7f73] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#c59b6d]" />
                Seasonal dining and private reservations
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] text-[#1f1712] sm:text-5xl lg:text-7xl">
                  {displayHeroTitle}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[#5f554c] sm:text-lg">
                  {displayHeroSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="rounded-full bg-[#1f1712] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d201b]"
                >
                  Book a table
                </button>
                <a
                  href="#menu"
                  className="rounded-full border border-[#e0d5c9] bg-white px-6 py-3 text-sm font-semibold text-[#1f1712] transition hover:border-[#c59b6d] hover:bg-[#fffaf4]"
                >
                  Explore the menu
                </a>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
                {featuredStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-[#eadfd5] bg-white/80 p-4 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.35)]"
                  >
                    <div className="text-2xl font-semibold text-[#1f1712]">{stat.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#8d7f73]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#c59b6d]/12 blur-3xl" />
              <div className="absolute -right-10 bottom-12 h-36 w-36 rounded-full bg-[#1f1712]/8 blur-3xl" />

              <div className="relative overflow-hidden rounded-[34px] border border-[#e8ddd1] bg-[#1b140f] shadow-[0_30px_90px_-32px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-transparent" />
                <img
                  src={displayHeroImage}
                  alt={displayName}
                  className="h-[620px] w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-black/35 p-5 text-white backdrop-blur-md sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.28em] text-[#e5c9a8]">
                        Chef's selection
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold">A table made for evenings that linger</h2>
                      <p className="mt-2 max-w-md text-sm leading-7 text-white/70">
                        Polished service, comforting textures, and a menu built around the kind of dishes guests remember.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsBookingModalOpen(true)}
                      className="rounded-full bg-[#c59b6d] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d7b48a]"
                    >
                      Reserve now
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 left-6 hidden rounded-[24px] border border-[#eadfd5] bg-white p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.3)] md:block">
                <div className="text-[10px] uppercase tracking-[0.24em] text-[#8d7f73]">Today</div>
                <div className="mt-1 text-lg font-semibold text-[#1f1712]">Open for dinner</div>
                <div className="text-sm text-[#6d6258]">6:00 PM - 11:30 PM</div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-16">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-[#eadfd5] bg-white p-7 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.25)] sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-[#f0e6dc] pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#c59b6d]">Why guests return</p>
                  <h2 className="mt-2 text-3xl font-semibold text-[#1f1712]">A modern food story with a calm, premium feel</h2>
                </div>
                <span className="hidden rounded-full bg-[#fff7ef] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d7f73] sm:inline-flex">
                  Open kitchen
                </span>
              </div>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f554c]">
                The homepage now reads like a proper restaurant site: one clear hero, polished imagery, featured dishes, and a reservation-led call to action.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  'Seasonal ingredients',
                  'Elegant private dining',
                  'Fast table reservations',
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-[#fffaf4] px-4 py-4 text-sm font-medium text-[#3b322b]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {renderSupportingPanel()}
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-6 border-b border-[#ebe0d5] pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#c59b6d]">Featured menu</p>
              <h2 className="text-3xl font-semibold text-[#1f1712] sm:text-4xl">Today's curated plates</h2>
              <p className="max-w-2xl text-sm leading-7 text-[#6d6258]">
                Browse a modern selection of starters, mains, desserts, and drinks. Use filters to keep the page clean and easy to explore.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 lg:max-w-3xl">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-full border border-[#e5dbcf] bg-white px-4 py-3">
                  <span className="material-symbols-outlined select-none text-[#8d7f73]">search</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes"
                    className="w-full border-0 bg-transparent p-0 text-sm outline-none placeholder:text-[#a19488]"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#e5dbcf] bg-white p-2">
                  {['All', 'Vegetarian', 'Signature'].map((diet) => (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => setActiveDiet(diet as typeof activeDiet)}
                      className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                        activeDiet === diet
                          ? 'bg-[#1f1712] text-white'
                          : 'text-[#6d6258] hover:bg-[#fff7ef]'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {MENU_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveCategory(filter)}
                    className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                      activeCategory === filter
                        ? 'bg-[#c59b6d] text-black'
                        : 'border border-[#e5dbcf] bg-white text-[#6d6258] hover:bg-[#fff7ef]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMenu.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[28px] border border-[#eadfd5] bg-white shadow-[0_18px_50px_-34px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-30px_rgba(0,0,0,0.3)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#c59b6d]">
                        {item.category}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-[#1f1712]">{item.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-[#1f1712]">Rs. {item.price}</div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#8d7f73]">Per plate</div>
                    </div>
                  </div>

                  <p className="min-h-[56px] text-sm leading-7 text-[#6d6258]">{item.description}</p>

                  <button
                    type="button"
                    onClick={() => onAddToCart(item as unknown as Product)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#1f1712] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2d201b]"
                  >
                    Add to order
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="mt-8 rounded-[28px] border border-dashed border-[#d9cec2] bg-white/60 px-6 py-16 text-center">
              <p className="text-sm font-semibold text-[#1f1712]">No dishes match your filters</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setActiveDiet('All');
                }}
                className="mt-4 rounded-full border border-[#e3d7cb] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6d6258] transition hover:bg-[#fff7ef]"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section id="story" className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-16">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[32px] border border-[#eadfd5] bg-[#14100d] p-7 text-white shadow-[0_18px_50px_-34px_rgba(0,0,0,0.4)] sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#d7b48a]">Our kitchen</p>
              <h2 className="mt-3 text-3xl font-semibold">Built for slow evenings and memorable plates</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                A modern restaurant homepage should feel calm, premium, and easy to act on. This version puts the food, photography, and reservations first.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  'Warm lighting, clean layouts, and soft contrast',
                  'Highlighted chef picks and signature dishes',
                  'Simple booking action with no clutter',
                ].map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div
              id="testimonials"
              className="rounded-[32px] border border-[#eadfd5] bg-white p-7 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.25)] sm:p-8"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#c59b6d]">Guest reviews</p>
                  <h2 className="mt-2 text-3xl font-semibold text-[#1f1712]">What diners say</h2>
                </div>
                <span className="rounded-full bg-[#fff7ef] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d7f73]">
                  Verified
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    quote:
                      'The menu feels polished and premium. The layout makes booking and exploring dishes feel effortless.',
                    author: 'Sophia V.',
                  },
                  {
                    quote:
                      'Warm, modern, and food-first. It looks like a real restaurant website, not a template demo.',
                    author: 'Marcus K.',
                  },
                  {
                    quote:
                      'Clean cards, beautiful photography, and the hero section finally feels inviting instead of crowded.',
                    author: 'Elena D.',
                  },
                ].map((testimonial) => (
                  <div key={testimonial.author} className="rounded-3xl border border-[#eee4d9] bg-[#fffaf4] p-5">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-[#c59b6d]">Guest note</div>
                    <p className="mt-3 text-sm leading-7 text-[#4a4038]">"{testimonial.quote}"</p>
                    <div className="mt-5 text-sm font-semibold text-[#1f1712]">{testimonial.author}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[26px] bg-[#1f1712] p-6 text-white">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#d7b48a]">Ready to dine</p>
                    <h3 className="mt-2 text-2xl font-semibold">Book a table for tonight</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    className="rounded-full bg-[#c59b6d] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d7b48a]"
                  >
                    Open reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#ebe0d5] bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#6d6258] sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#c59b6d]" />
            <span>{displayName}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.22em]">
            <span>Seasonal menu</span>
            <span>Private dining</span>
            <span>Reservations</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
