'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Project, Block, Product } from '@/types';
import ProductCard from '../ProductCard';

interface WeddingStorefrontProps {
  projectId: number;
  project: Project;
  currentPageBlocks: Block[];
  cartCount: number;
  onAddToCart: (p: Product) => void;
  onViewCart?: () => void;
  onViewMyOrders?: () => void;
  onProductClick?: (p: Product) => void;
  wishlist?: number[];
  onToggleWishlist?: (p: Product) => void;
  customerSession: any;
  onLogout: () => void;
  dbProducts: Product[];
  projectIdStr: string;
}

const WEDDING_HOME_PRESETS = [
  {
    themePreset: 'purple',
    title: 'Lavender Blossom Planners',
    slogan: 'Bespoke planning, delicate floral framing, and lilac themes.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
  },
  {
    themePreset: 'sunset',
    title: 'Rose Gold Romance Events',
    slogan: 'Warm blush pink, champagne trims, and ballroom magic.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
  },
  {
    themePreset: 'deepblue',
    title: 'Midnight Starry Celebrations',
    slogan: 'Deep indigo backing, fairy lights, and gold foil typography.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
  },
  {
    themePreset: 'sunset',
    title: 'Golden Palace Weddings',
    slogan: 'Ivory white, champagne gold accents, and palace grounds elegance.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80',
  },
  {
    themePreset: 'emerald',
    title: 'Sage & Botanical Planning',
    slogan: 'Sage green borders, organic leaf details, and floral Mandaps.',
    image: 'https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?w=800&auto=format&fit=crop&q=80',
  },
  {
    themePreset: 'purple',
    title: 'Blushing Bride Decor',
    slogan: 'Pastel pink lace borders, beautiful photo galleries, and elegant scripts.',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&auto=format&fit=crop&q=80',
  },
  {
    themePreset: 'sunset',
    title: 'Burgundy Royal Galas',
    slogan: 'Burgundy velvet vibes, gold trims, and reception details.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80',
  },
  {
    themePreset: 'deepblue',
    title: 'Ocean Coastline Destination',
    slogan: 'Aquamarine and beachside canopy setups for coastal weddings.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
  },
  {
    themePreset: 'deepblue',
    title: 'Teal & Modern Copper Events',
    slogan: 'Metallic copper details with a dark chic teal backdrop.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
  },
  {
    themePreset: 'sunset',
    title: 'Warm Champagne Dream',
    slogan: 'Warm ivory backdrops and neutral classy layouts.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80',
  },
] as const;

function getWeddingHomePreset(homeOption: number) {
  return WEDDING_HOME_PRESETS[homeOption - 1] || WEDDING_HOME_PRESETS[0];
}

// Helper to extract theme config and selections from blocks JSON
function extractWeddingCustomizations(project: Project, blocks: Block[]) {
  let logoUrl = '';
  let logoIcon = '✨';
  let companyName = '';
  let heroImage = '';
  let heroTitle = '';
  let heroSubtitle = '';
  let themePreset = 'purple';
  let homeOption = 0; // Initialize with 0 to detect if explicitly read from database config
  let contactEmail = '';
  let contactPhone = '';

  // Try to extract themePreset and weddingHomeOption from project.blocksJson's businessConfig
  try {
    if (project?.blocksJson) {
      const parsed = JSON.parse(project.blocksJson);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        if (parsed.businessConfig?.themePreset) {
          themePreset = parsed.businessConfig.themePreset;
        } else if (parsed.businessConfig?.themeColor) {
          themePreset = parsed.businessConfig.themeColor;
        }
        if (parsed.businessConfig?.weddingHomeOption) {
          homeOption = Number(parsed.businessConfig.weddingHomeOption);
        }
      } else if (Array.isArray(parsed)) {
        const bizBlock = parsed.find((b: any) => b.type === 'business_config');
        if (bizBlock?.content?.themeColor) {
          themePreset = bizBlock.content.themeColor;
        } else if (bizBlock?.theme) {
          themePreset = bizBlock.theme;
        }
        if (bizBlock?.content?.weddingHomeOption) {
          homeOption = Number(bizBlock.content.weddingHomeOption);
        }
      }
    }
  } catch (e) {
    console.error('Error parsing blocksJson in WeddingStorefront:', e);
  }

  const headerBlock = blocks.find((b: any) => b.type === 'header');
  if (headerBlock?.content) {
    logoUrl = headerBlock.content.logoUrl || '';
    logoIcon = headerBlock.content.logoIcon || '✨';
    companyName = headerBlock.content.companyName || '';
    // Only fallback to header block theme if config themePreset was not found or is default
    if (!themePreset || themePreset === 'purple') {
      themePreset = headerBlock.theme || 'purple';
    }
  }

  // Bulletproof fallback: search other blocks for any active custom theme color
  if (!themePreset || themePreset === 'purple' || themePreset === 'slate') {
    const nonDefaultBlock = blocks.find(
      (b: any) => b.theme && b.theme !== 'slate' && b.theme !== 'purple' && b.type !== 'header' && b.type !== 'footer'
    );
    if (nonDefaultBlock) {
      themePreset = nonDefaultBlock.theme;
    }
  }

  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  if (heroBlock?.content) {
    heroImage = heroBlock.content.imageUrl || '';
    heroTitle = heroBlock.content.title || '';
    heroSubtitle = heroBlock.content.subtitle || '';
  }

  const footerBlock = blocks.find((b: any) => b.type === 'footer');
  if (footerBlock?.content) {
    const txt = footerBlock.content.text || '';
    const emailMatch = txt.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = txt.match(/(?:\+?\d{1,3}[- ]?)?\d{10}/);
    if (emailMatch) contactEmail = emailMatch[0];
    if (phoneMatch) contactPhone = phoneMatch[0];
  }

  // Fallback to dynamic guessing heuristic only if homeOption was not explicitly loaded from the database config
  if (!homeOption) {
    const titleLower = (heroTitle || companyName || '').toLowerCase();
    if (titleLower.includes('lavender') || titleLower.includes('blossom')) homeOption = 1;
    else if (titleLower.includes('rose gold') || titleLower.includes('romance')) homeOption = 2;
    else if (titleLower.includes('midnight') || titleLower.includes('starry')) homeOption = 3;
    else if (titleLower.includes('golden palace') || titleLower.includes('castle')) homeOption = 4;
    else if (titleLower.includes('sage') || titleLower.includes('botanical')) homeOption = 5;
    else if (titleLower.includes('blushing') || titleLower.includes('bride')) homeOption = 6;
    else if (titleLower.includes('burgundy') || titleLower.includes('wine')) homeOption = 7;
    else if (titleLower.includes('ocean') || titleLower.includes('coastline') || titleLower.includes('beach')) homeOption = 8;
    else if (titleLower.includes('teal') || titleLower.includes('copper')) homeOption = 9;
    else if (titleLower.includes('champagne') || titleLower.includes('warm')) homeOption = 10;
    else {
      if (themePreset === 'purple') homeOption = 1;
      else if (themePreset === 'sunset') homeOption = 2;
      else if (themePreset === 'deepblue') homeOption = 3;
      else if (themePreset === 'emerald') homeOption = 5;
      else if (themePreset === 'slate') homeOption = 10;
      else homeOption = 1; // Absolute fallback
    }
  }

  const preset = getWeddingHomePreset(homeOption || 1);

  return {
    logoUrl,
    logoIcon,
    companyName,
    heroImage,
    heroTitle,
    heroSubtitle,
    themePreset,
    homeOption,
    presetTitle: preset.title,
    presetSubtitle: preset.slogan,
    presetHeroImage: preset.image,
    presetThemePreset: preset.themePreset,
    contactEmail,
    contactPhone,
  };
}

// Elegant decorative leaf divider
const LeafDivider = ({ color = 'currentColor' }: { color?: string }) => (
  <div className="flex items-center justify-center gap-4 my-6 opacity-60">
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-current" style={{ color }} />
    <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
      <path d="M12 22V12" />
      <path d="M12 12c1.8-1.8 3.5-1.8 5-3.5" />
      <path d="M12 15c1.2-1.2 2.5-1.2 3.8-2.5" />
      <path d="M12 12c-1.8-1.8-3.5-1.8-5-3.5" />
      <path d="M12 15c-1.2-1.2-2.5-1.2-3.8-2.5" />
    </svg>
    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-current" style={{ color }} />
  </div>
);

// Floating petals decorative SVG
const BotanicalSideDecor = ({ side = 'left', color = 'rgba(0,0,0,0.04)' }: { side?: 'left' | 'right'; color?: string }) => (
  <div className={`absolute top-1/4 pointer-events-none hidden lg:block select-none ${side === 'left' ? 'left-4' : 'right-4'}`}>
    <svg className="w-32 h-64" viewBox="0 0 100 200" fill="none" style={{ transform: side === 'right' ? 'scaleX(-1)' : undefined }}>
      <path d="M10,20 Q40,50 20,90 Q5,120 40,160" stroke={color} strokeWidth="1" />
      <path d="M20,90 Q50,70 65,40" stroke={color} strokeWidth="1" />
      <path d="M40,160 Q80,140 75,100" stroke={color} strokeWidth="1" />
      {/* Flower petals */}
      <path d="M65,40 C75,30 85,45 65,40 Z" fill={color} />
      <path d="M75,100 C85,90 95,105 75,100 Z" fill={color} />
      <path d="M20,25 C25,15 35,20 20,25 Z" fill={color} />
    </svg>
  </div>
);

export default function WeddingStorefront({
  projectId,
  project,
  currentPageBlocks,
  cartCount,
  onAddToCart,
  onViewCart,
  onViewMyOrders,
  onProductClick,
  wishlist = [],
  onToggleWishlist,
  customerSession,
  onLogout,
  dbProducts,
  projectIdStr
}: WeddingStorefrontProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!customerSession);
  }, [customerSession]);

  const customizations = extractWeddingCustomizations(project, currentPageBlocks);

  // Define color palette metadata based on the detected template preset option
  const getThemePalette = (opt: number) => {
    switch (opt) {
      case 1: // Lavender Blossom
        return {
          name: 'Lavender Blossom',
          bodyBg: 'bg-gradient-to-b from-[#faf5ff] via-[#fdfbfe] to-[#faf5ff]',
          accent: 'text-violet-700',
          accentBg: 'bg-violet-600',
          accentHover: 'hover:bg-violet-700',
          accentBorder: 'border-violet-200',
          accentText: 'text-violet-600',
          pillBg: 'bg-violet-50 text-violet-700 border-violet-100',
          cardBorder: 'border-violet-100/60',
          cardBg: 'bg-white/70 backdrop-blur-md',
          textColor: 'text-violet-950',
          mutedText: 'text-violet-700/70',
          gradientHex: 'from-[#faf5ff] to-[#f5ebff]',
          themeColor: '#7C3AED',
          accentLight: 'rgba(124, 58, 237, 0.08)',
        };
      case 2: // Rose Gold Romance
        return {
          name: 'Rose Gold Romance',
          bodyBg: 'bg-gradient-to-b from-[#fff5f6] via-[#fffdfb] to-[#fff5f6]',
          accent: 'text-pink-700',
          accentBg: 'bg-pink-600',
          accentHover: 'hover:bg-pink-700',
          accentBorder: 'border-pink-200',
          accentText: 'text-pink-600',
          pillBg: 'bg-pink-50 text-pink-700 border-pink-100',
          cardBorder: 'border-pink-100/60',
          cardBg: 'bg-white/70 backdrop-blur-md',
          textColor: 'text-pink-950',
          mutedText: 'text-pink-700/70',
          gradientHex: 'from-[#fff5f6] to-[#ffebeb]',
          themeColor: '#DB2777',
          accentLight: 'rgba(219, 39, 119, 0.08)',
        };
      case 3: // Midnight Starry Night (Lightened for "Starlit Dawn" light color requirement)
        return {
          name: 'Starlit Dawn',
          bodyBg: 'bg-gradient-to-b from-[#f0f4ff] via-[#fafbff] to-[#f4f7ff]',
          accent: 'text-indigo-700',
          accentBg: 'bg-indigo-600',
          accentHover: 'hover:bg-indigo-700',
          accentBorder: 'border-indigo-200',
          accentText: 'text-indigo-600',
          pillBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
          cardBorder: 'border-indigo-100/60',
          cardBg: 'bg-white/80 backdrop-blur-md',
          textColor: 'text-indigo-950',
          mutedText: 'text-indigo-650/70',
          gradientHex: 'from-[#f0f4ff] to-[#e0ebff]',
          themeColor: '#4F46E5',
          accentLight: 'rgba(79, 70, 229, 0.08)',
        };
      case 4: // Golden Palace Elegance
        return {
          name: 'Golden Palace Elegance',
          bodyBg: 'bg-gradient-to-b from-[#fffbf2] via-[#fffefc] to-[#fffbf2]',
          accent: 'text-amber-800',
          accentBg: 'bg-amber-700',
          accentHover: 'hover:bg-amber-800',
          accentBorder: 'border-amber-200',
          accentText: 'text-amber-700',
          pillBg: 'bg-amber-50 text-amber-900 border-amber-100',
          cardBorder: 'border-amber-100/60',
          cardBg: 'bg-white/70 backdrop-blur-md',
          textColor: 'text-amber-955',
          mutedText: 'text-amber-800/70',
          gradientHex: 'from-[#fffbf2] to-[#fef3c7]',
          themeColor: '#B45309',
          accentLight: 'rgba(180, 83, 9, 0.08)',
        };
      case 5: // Sage & Botanical Garden
        return {
          name: 'Sage & Botanical Garden',
          bodyBg: 'bg-gradient-to-b from-[#f2faf5] via-[#fafdfb] to-[#f2faf5]',
          accent: 'text-emerald-800',
          accentBg: 'bg-emerald-700',
          accentHover: 'hover:bg-emerald-800',
          accentBorder: 'border-emerald-200',
          accentText: 'text-emerald-700',
          pillBg: 'bg-emerald-50 text-emerald-800 border-emerald-100',
          cardBorder: 'border-emerald-100/60',
          cardBg: 'bg-white/75 backdrop-blur-md',
          textColor: 'text-emerald-950',
          mutedText: 'text-emerald-750/75',
          gradientHex: 'from-[#f2faf5] to-[#defce9]',
          themeColor: '#047857',
          accentLight: 'rgba(4, 120, 87, 0.08)',
        };
      case 6: // Blushing Bride Pastel
        return {
          name: 'Blushing Bride Pastel',
          bodyBg: 'bg-gradient-to-b from-[#fff6fa] via-[#fffbfd] to-[#fff6fa]',
          accent: 'text-rose-700',
          accentBg: 'bg-rose-600',
          accentHover: 'hover:bg-rose-700',
          accentBorder: 'border-rose-200',
          accentText: 'text-rose-600',
          pillBg: 'bg-rose-50 text-rose-700 border-rose-100',
          cardBorder: 'border-rose-100/60',
          cardBg: 'bg-white/70 backdrop-blur-md',
          textColor: 'text-rose-950',
          mutedText: 'text-rose-700/70',
          gradientHex: 'from-[#fff6fa] to-[#ffe4e6]',
          themeColor: '#E11D48',
          accentLight: 'rgba(225, 29, 72, 0.08)',
        };
      case 7: // Burgundy & Wine Royal (Lightened backdrop, using burgundy as luxury accents)
        return {
          name: 'Burgundy & Wine Royal',
          bodyBg: 'bg-gradient-to-b from-[#fff8f8] via-[#fffdfd] to-[#fff8f8]',
          accent: 'text-red-800',
          accentBg: 'bg-red-800',
          accentHover: 'hover:bg-red-900',
          accentBorder: 'border-red-200',
          accentText: 'text-red-800',
          pillBg: 'bg-red-50 text-red-850 border-red-100',
          cardBorder: 'border-red-150/60',
          cardBg: 'bg-white/70 backdrop-blur-md',
          textColor: 'text-red-950',
          mutedText: 'text-red-800/70',
          gradientHex: 'from-[#fff8f8] to-[#fee2e2]',
          themeColor: '#991B1B',
          accentLight: 'rgba(153, 27, 27, 0.08)',
        };
      case 8: // Ocean Coastline Breeze
        return {
          name: 'Ocean Coastline Breeze',
          bodyBg: 'bg-gradient-to-b from-[#f0fdfa] via-[#fbfefe] to-[#f0fdfa]',
          accent: 'text-teal-700',
          accentBg: 'bg-teal-600',
          accentHover: 'hover:bg-teal-700',
          accentBorder: 'border-teal-200',
          accentText: 'text-teal-600',
          pillBg: 'bg-teal-50 text-teal-700 border-teal-100',
          cardBorder: 'border-teal-100/60',
          cardBg: 'bg-white/70 backdrop-blur-md',
          textColor: 'text-teal-950',
          mutedText: 'text-teal-700/70',
          gradientHex: 'from-[#f0fdfa] to-[#ccfbf1]',
          themeColor: '#0D9488',
          accentLight: 'rgba(13, 148, 136, 0.08)',
        };
      case 9: // Teal & Modern Copper (Lightened mint base with warm copper buttons/borders)
        return {
          name: 'Teal & Modern Copper',
          bodyBg: 'bg-gradient-to-b from-[#f0fcfc] via-[#fbfefe] to-[#f0fcfc]',
          accent: 'text-cyan-800',
          accentBg: 'bg-[#b45309]', // Warm copper button
          accentHover: 'hover:bg-[#92400e]',
          accentBorder: 'border-cyan-200',
          accentText: 'text-[#b45309]',
          pillBg: 'bg-cyan-55 text-cyan-850 border-cyan-100',
          cardBorder: 'border-amber-200/50',
          cardBg: 'bg-white/70 backdrop-blur-md',
          textColor: 'text-cyan-950',
          mutedText: 'text-cyan-800/70',
          gradientHex: 'from-[#f0fcfc] to-[#cffafe]',
          themeColor: '#0E7490',
          accentLight: 'rgba(14, 116, 144, 0.08)',
        };
      case 10: // Warm Champagne Dream
      default:
        return {
          name: 'Warm Champagne Dream',
          bodyBg: 'bg-gradient-to-b from-[#fffaf4] via-[#fffefe] to-[#fffaf4]',
          accent: 'text-amber-705',
          accentBg: 'bg-[#d97706]',
          accentHover: 'hover:bg-[#b45309]',
          accentBorder: 'border-amber-250',
          accentText: 'text-[#d97706]',
          pillBg: 'bg-amber-50 text-amber-800 border-amber-100',
          cardBorder: 'border-amber-200/40',
          cardBg: 'bg-white/80 backdrop-blur-md',
          textColor: 'text-amber-950',
          mutedText: 'text-amber-800/70',
          gradientHex: 'from-[#fffaf4] to-[#fef3c7]',
          themeColor: '#D97706',
          accentLight: 'rgba(217, 119, 6, 0.08)',
        };
    }
  };

  const p = getThemePalette(customizations.homeOption);
  const weddingHeroTitle = customizations.presetTitle || customizations.heroTitle || 'Luxury Wedding Experiences';
  const weddingHeroSubtitle = customizations.presetSubtitle || customizations.heroSubtitle || 'Delicately crafted, planned, and styled celebrations.';
  const weddingHeroImage = customizations.presetHeroImage || customizations.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80';

  return (
    <div className={`min-h-screen ${p.bodyBg} text-slate-800 selection:bg-rose-100 selection:text-rose-900 transition-colors duration-500`}>
      
      {/* Import Premium Serif and Script Google Fonts dynamically */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,450;0,600;0,700;1,400&family=Alex+Brush&display=swap');
        
        .wedding-serif-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .wedding-serif-body {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          line-height: 1.6;
        }
        .wedding-script {
          font-family: 'Alex Brush', cursive;
          font-size: 2.25rem;
          line-height: 1;
        }
        
        .wedding-card-glow {
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.03), 0 1px 1px 0 rgba(0, 0, 0, 0.01);
        }
        .wedding-card-glow:hover {
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.02);
        }
      `}} />

      {/* HEADER SECTION */}
      {(() => {
        const header = currentPageBlocks.find((b) => b.type === 'header');
        if (!header) return null;
        const c = header.content;
        return (
          <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-stone-200/40 px-6 sm:px-12 py-4 flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-3">
              {c.logoUrl ? (
                <img src={c.logoUrl} className="w-9 h-9 object-contain rounded-full border border-stone-200/50 shadow-sm" alt="logo" />
              ) : (
                <span className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-lg shadow-sm">
                  {c.logoIcon || '✨'}
                </span>
              )}
              <div className="flex flex-col text-left">
                <span className="wedding-serif-title text-sm tracking-widest uppercase text-stone-850 font-bold">
                  {c.companyName || project.name}
                </span>
                {project.description && (
                  <span className="wedding-serif-body text-[10px] text-stone-400 font-medium italic -mt-0.5">
                    {project.description}
                  </span>
                )}
              </div>
            </div>

            {/* Nav Menu */}
            <ul className="hidden md:flex gap-8 text-[11px] font-semibold text-stone-600 uppercase tracking-widest">
              {c.links && c.links.length > 0 ? (
                c.links.map((link: any, idx: number) => (
                  <li key={idx}>
                    <a href={link.url || '#'} className="hover:text-stone-900 transition relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-800 after:transition-all hover:after:w-full">
                      {link.label}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li><span className="hover:text-stone-900 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-800 after:transition-all hover:after:w-full">Portfolio</span></li>
                  <li><span className="hover:text-stone-900 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-800 after:transition-all hover:after:w-full">Services</span></li>
                  <li><span className="hover:text-stone-900 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-800 after:transition-all hover:after:w-full">Reviews</span></li>
                </>
              )}
            </ul>

            {/* CTA / Auth Actions */}
            <div className="flex items-center gap-3">
              {isLoggedIn && onViewMyOrders && (
                <button
                  type="button"
                  onClick={onViewMyOrders}
                  className="px-3.5 py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-full text-[10px] uppercase font-bold tracking-wider transition shadow-sm cursor-pointer"
                >
                  📦 Orders
                </button>
              )}
              {isLoggedIn ? (
                <Link
                  href={`/preview/${projectId}/dashboard`}
                  className="px-4 py-1.5 border border-stone-800 text-stone-850 hover:bg-stone-900 hover:text-white rounded-full text-[10px] uppercase font-bold tracking-wider transition shadow-sm"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={`/preview/${projectId}/login`}
                  className="px-4 py-1.5 border border-stone-200 hover:border-stone-400 text-stone-650 hover:text-stone-900 rounded-full text-[10px] uppercase font-bold tracking-wider transition"
                >
                  Client Portal
                </Link>
              )}
              {cartCount > 0 && onViewCart && (
                <button
                  type="button"
                  onClick={onViewCart}
                  className={`px-4 py-1.5 ${p.accentBg} ${p.accentHover} text-white rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm transition cursor-pointer border-0`}
                >
                  Cart ({cartCount})
                </button>
              )}
            </div>
          </header>
        );
      })()}

      {/* DYNAMIC BLOCKS PARSER */}
      <main className="relative py-4 space-y-24 md:space-y-36 pb-32">
        {currentPageBlocks.map((block, bIdx) => {
          const c = block.content;
          
          switch (block.type) {
            
            // HERO BLOCK
            case 'hero': {
              return (
                <section key={block.id} className="relative min-h-[75vh] flex items-center justify-center px-6 sm:px-12 md:px-20 py-20 overflow-hidden rounded-[2.5rem] shadow-lg mx-6 border border-stone-200/30">
                  {/* Full-width background image with smooth parallax feel */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={weddingHeroImage} 
                      className="w-full h-full object-cover object-center filter brightness-[0.7] scale-102 transition-transform duration-1000" 
                      alt="Banner background" 
                    />
                    {/* Modern gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-950/75 via-stone-950/50 to-stone-900/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-stone-900/30" />
                  </div>

                  <BotanicalSideDecor side="left" color="rgba(255,255,255,0.06)" />
                  <BotanicalSideDecor side="right" color="rgba(255,255,255,0.06)" />

                  <div className="max-w-6xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left glassmorphic text box */}
                    <div className="lg:col-span-8 text-left space-y-8 bg-stone-900/40 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl animate-fade-in">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="wedding-script text-white text-lg">Bespoke Event Styling</span>
                      </div>
                      
                      <div className="space-y-4">
                        <h1 className="wedding-serif-title text-4xl sm:text-5xl lg:text-6xl text-white leading-tight font-extrabold tracking-tight drop-shadow-md">
                          {weddingHeroTitle}
                        </h1>
                        
                        <p className="wedding-serif-body text-stone-200/90 font-light text-lg md:text-xl max-w-xl leading-relaxed">
                          {weddingHeroSubtitle}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 pt-2">
                        {c.btn1Text && (
                          <a
                            href={c.btn1Url || '#'}
                            className={`px-8 py-4 text-[11px] font-black tracking-widest uppercase ${p.accentBg} ${p.accentHover} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]`}
                          >
                            {c.btn1Text}
                          </a>
                        )}
                        {c.btn2Text && (
                          <a
                            href={c.btn2Url || '#'}
                            className="px-8 py-4 text-[11px] font-black tracking-widest uppercase bg-white/95 hover:bg-white text-stone-850 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                          >
                            {c.btn2Text}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right overlapping micro-layout */}
                    <div className="hidden lg:flex lg:col-span-4 h-full items-center justify-end relative">
                      {/* Floating customer count card */}
                      <div className="bg-white/90 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-xl w-60 absolute right-0 bottom-[-40px] z-20 animate-bounce-slow text-stone-855 text-left">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">✨</span>
                          <div>
                            <span className="block font-black text-stone-900 text-sm">150+ Events Planned</span>
                            <span className="block text-[9px] text-stone-500 font-bold uppercase mt-0.5">Weddings & Galas</span>
                          </div>
                        </div>
                      </div>

                      {/* Small floating detail card */}
                      <div className="bg-white/80 backdrop-blur-md border border-white/25 px-5 py-3 rounded-xl shadow-lg absolute right-0 top-[-60px] z-20 text-[10px] uppercase font-bold tracking-wider text-stone-700">
                        📍 Premium Specialist
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            // FEATURES BLOCK
            case 'features': {
              return (
                <section key={block.id} className="relative px-6 sm:px-12 md:px-20">
                  <div className="max-w-5xl mx-auto text-center space-y-4">
                    <span className={`wedding-script ${p.accent}`}>Our Offerings</span>
                    <h2 className="wedding-serif-title text-3xl sm:text-4xl text-stone-900">
                      {c.title || 'Wedding Services'}
                    </h2>
                    <p className="wedding-serif-body text-stone-400 max-w-md mx-auto text-sm">
                      {c.subtitle || 'Every detail of your ceremony and staging customized to perfection.'}
                    </p>
                    
                    <LeafDivider color={p.themeColor} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                      {c.items?.map((item: any, i: number) => (
                        <div
                          key={i}
                          className={`${p.cardBg} border ${p.cardBorder} p-7 rounded-3xl text-left wedding-card-glow transition-all duration-300 flex flex-col justify-between`}
                        >
                          <div>
                            <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-sm" style={{ backgroundColor: p.accentLight }}>
                              {item.icon || '✨'}
                            </span>
                            <h3 className="wedding-serif-title text-base text-stone-850 mb-3 font-semibold">{item.title}</h3>
                            <p className="wedding-serif-body text-xs text-stone-500 leading-relaxed font-light">{item.desc}</p>
                          </div>
                          <div className={`h-[1px] w-8 bg-current opacity-20 mt-6`} style={{ color: p.themeColor }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }

            // TEXT IMAGE BLOCK
            case 'text-image': {
              const isRight = c.align === 'right';
              return (
                <section key={block.id} className="relative px-6 sm:px-12 md:px-20 overflow-hidden">
                  <div
                    className={`max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16`}
                    style={{ flexDirection: isRight ? 'row-reverse' : 'row' }}
                  >
                    <div className="flex-1 space-y-5 text-left">
                      <span className={`wedding-script ${p.accent}`}>The Planning Journey</span>
                      <h2 className="wedding-serif-title text-3xl sm:text-4xl text-stone-900 leading-tight">
                        {c.title}
                      </h2>
                      <p className="wedding-serif-body text-stone-500 leading-relaxed font-light text-base">
                        {c.text}
                      </p>
                    </div>
                    {c.imageUrl && (
                      <div className="flex-1 w-full max-w-md relative">
                        <div className={`absolute -inset-3 rounded-2xl border border-double ${p.accentBorder} opacity-60`} />
                        <div className="h-64 sm:h-80 bg-stone-50 rounded-2xl overflow-hidden shadow-lg border border-stone-200/50 z-10 relative">
                          <img src={c.imageUrl} className="w-full h-full object-cover hover:scale-102 transition-transform duration-500" alt={c.title} />
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            // GALLERY BLOCK
            case 'gallery': {
              return (
                <section key={block.id} className="relative px-6 sm:px-12 md:px-20">
                  <BotanicalSideDecor side="left" color={p.themeColor + '08'} />
                  
                  <div className="max-w-5xl mx-auto text-center space-y-4">
                    <span className={`wedding-script ${p.accent}`}>Visual Staging Gallery</span>
                    <h2 className="wedding-serif-title text-3xl sm:text-4xl text-stone-900">
                      {c.title || 'Staging Staggered Gallery'}
                    </h2>
                    
                    <LeafDivider color={p.themeColor} />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-6">
                      {c.images?.map((img: string, i: number) => {
                        // Stagger layout styles
                        const isEven = i % 2 === 0;
                        return (
                          <div
                            key={i}
                            className={`group relative overflow-hidden rounded-2xl border border-stone-200/40 shadow-sm ${
                              isEven ? 'h-52 md:h-64' : 'h-60 md:h-80'
                            }`}
                          >
                            <img
                              src={img}
                              alt="Gallery Preview"
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80';
                              }}
                            />
                            <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-white backdrop-blur-sm bg-black/10 px-3 py-1 rounded-full">
                                Staging Detail
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            }

            // PRICING BLOCK
            case 'pricing': {
              return (
                <section key={block.id} className="relative px-6 sm:px-12 md:px-20">
                  <div className="max-w-5xl mx-auto text-center space-y-4">
                    <span className={`wedding-script ${p.accent}`}>Staging Investment</span>
                    <h2 className="wedding-serif-title text-3xl sm:text-4xl text-stone-900">
                      {c.title || 'Investment Plans'}
                    </h2>
                    {c.subtitle && (
                      <p className="wedding-serif-body text-stone-400 max-w-md mx-auto text-sm">{c.subtitle}</p>
                    )}
                    
                    <LeafDivider color={p.themeColor} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 items-start">
                      {c.plans?.map((plan: any, i: number) => {
                        const isFeatured = plan.name.toLowerCase().includes('gold') || i === 1;
                        return (
                          <div
                            key={i}
                            className={`p-8 rounded-[2rem] border text-left flex flex-col justify-between shadow-sm relative transition-all duration-300 ${
                              isFeatured
                                ? `${p.cardBorder} bg-gradient-to-br ${p.gradientHex} ring-1 ring-offset-2 ring-current border-double`
                                : `border-stone-200 bg-white/70`
                            } ${isFeatured ? 'scale-105 z-10 shadow-md' : 'hover:scale-[1.01]'}`}
                            style={{ color: isFeatured ? p.themeColor : undefined }}
                          >
                            {isFeatured && (
                              <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-stone-900 text-white shadow-sm border border-stone-850">
                                Most Popular
                              </span>
                            )}
                            
                            <div className="space-y-6">
                              <div>
                                <h3 className="wedding-serif-title text-lg text-stone-850 mb-1 font-bold">{plan.name}</h3>
                                <p className="wedding-serif-body text-xs text-stone-450 leading-relaxed font-light">{plan.desc}</p>
                              </div>
                              
                              <div className="border-b border-stone-200/50 pb-4">
                                <span className="wedding-serif-title text-3xl font-extrabold text-stone-900">{plan.price}</span>
                                <span className="text-[10px] text-stone-400 uppercase tracking-wider ml-1">/ {plan.period || 'flat fee'}</span>
                              </div>
                              
                              <ul className="space-y-3 text-xs text-stone-500 font-light wedding-serif-body">
                                {plan.features?.map((f: string, j: number) => (
                                  <li key={j} className="flex items-start gap-2.5">
                                    <span className={`text-xs mt-0.5`} style={{ color: p.themeColor }}>✓</span>
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <a
                              href="#contact"
                              className={`mt-8 py-3 text-center text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm border border-stone-200 bg-white hover:bg-stone-50 text-stone-700`}
                            >
                              Inquire Package
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            }

            // TESTIMONIALS BLOCK
            case 'testimonials': {
              return (
                <section key={block.id} className="relative px-6 sm:px-12 md:px-20 overflow-hidden">
                  <div className="max-w-5xl mx-auto text-center space-y-4">
                    <span className={`wedding-script ${p.accent}`}>Love Letters</span>
                    <h2 className="wedding-serif-title text-3xl sm:text-4xl text-stone-900">
                      {c.title || 'Client Notes & Reviews'}
                    </h2>
                    
                    <LeafDivider color={p.themeColor} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                      {c.items?.map((item: any, i: number) => (
                        <div
                          key={i}
                          className={`${p.cardBg} border ${p.cardBorder} p-8 rounded-3xl relative shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between`}
                        >
                          <span className="absolute -top-3.5 left-8 text-5xl font-serif text-stone-250 italic">“</span>
                          <p className="wedding-serif-body text-stone-600 leading-relaxed font-light text-base pt-4 italic relative z-10">
                            {item.quote}
                          </p>
                          <div className="mt-6 flex items-center justify-between border-t border-stone-200/50 pt-4">
                            <span className={`wedding-script text-2xl ${p.accent}`}>
                              {item.author}
                            </span>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400">Verified Couple</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }

            // FAQ BLOCK
            case 'faq': {
              return (
                <section key={block.id} className="relative px-6 sm:px-12 md:px-20">
                  <div className="max-w-3xl mx-auto text-center space-y-4">
                    <span className={`wedding-script ${p.accent}`}>FAQ Accordion</span>
                    <h2 className="wedding-serif-title text-3xl sm:text-4xl text-stone-900">
                      {c.title || 'Planning FAQs'}
                    </h2>
                    
                    <LeafDivider color={p.themeColor} />
                    
                    <div className="space-y-4 pt-8 text-left">
                      {c.items?.map((item: any, i: number) => {
                        const isOpen = activeFaq === i;
                        return (
                          <div
                            key={i}
                            className={`border ${p.cardBorder} rounded-2xl overflow-hidden transition-all duration-300 bg-white/60`}
                          >
                            <button
                              type="button"
                              onClick={() => setActiveFaq(isOpen ? null : i)}
                              className="w-full px-6 py-4 flex items-center justify-between font-medium text-stone-800 text-sm hover:bg-stone-50/50 transition cursor-pointer text-left border-0 bg-transparent"
                            >
                              <span className="wedding-serif-title text-sm sm:text-base font-semibold">{item.question}</span>
                              <span className={`text-stone-400 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''}`}>
                                ▾
                              </span>
                            </button>
                            {isOpen && (
                              <div className="px-6 pb-5 pt-1 text-xs text-stone-500 font-light border-t border-stone-100/50 wedding-serif-body animate-slide-down">
                                {item.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            }

            // CONTACT FORM BLOCK
            case 'contact_form': {
              return (
                <section key={block.id} id="contact" className="relative px-6 sm:px-12 md:px-20">
                  <div className="max-w-md mx-auto text-center space-y-4">
                    <span className={`wedding-script ${p.accent}`}>Connect With Us</span>
                    <h2 className="wedding-serif-title text-3xl sm:text-4xl text-stone-900">
                      {c.title || 'Consultation Request'}
                    </h2>
                    <p className="wedding-serif-body text-stone-400 text-sm">
                      {c.subtitle || 'Reserve your event date and design a personalized planner arrangement.'}
                    </p>
                    
                    <div className={`border ${p.cardBorder} p-8 rounded-3xl shadow-lg mt-8 text-left bg-white/80 backdrop-blur-md`}>
                      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("📅 Wedding consultation requested successfully!"); }}>
                        <div>
                          <label className="block text-[9px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Alex & Sam"
                            className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 rounded-xl px-4 py-3 text-xs outline-none transition font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder={c.emailPlaceholder || 'couple@love.com'}
                            className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 rounded-xl px-4 py-3 text-xs outline-none transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">Proposed Event Date</label>
                          <input
                            type="date"
                            className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 rounded-xl px-4 py-3 text-xs outline-none transition text-stone-500 font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">Message / Details</label>
                          <textarea
                            rows={3}
                            placeholder={c.messagePlaceholder || 'Tell us about your event guest count, theme ideas, or budget...'}
                            className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 rounded-xl px-4 py-3 text-xs outline-none transition resize-none"
                          />
                        </div>
                        
                        <button
                          type="submit"
                          className={`w-full py-3.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-full ${p.accentBg} ${p.accentHover} shadow-md transition-transform active:scale-[0.98] cursor-pointer border-0 mt-4`}
                        >
                          Request Consultation
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              );
            }

            // PRODUCTS BLOCK (Fallback support if custom wedding catalogs or boutique items are added)
            case 'products': {
              return (
                <section key={block.id} className="relative px-6 sm:px-12 md:px-20">
                  <div className="max-w-5xl mx-auto text-center space-y-4">
                    <span className={`wedding-script ${p.accent}`}>Boutique Catalog</span>
                    <h2 className="wedding-serif-title text-3xl sm:text-4xl text-stone-900">
                      {c.title || 'Wedding Accessories & Decor'}
                    </h2>
                    
                    <LeafDivider color={p.themeColor} />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
                      {dbProducts.map((prod) => (
                        <div key={prod.id} className="bg-white/70 border border-stone-100 rounded-3xl p-3 shadow-sm hover:shadow-md transition-shadow relative group">
                          <div className="h-48 rounded-2xl overflow-hidden bg-stone-50 relative">
                            <img src={prod.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={prod.name} />
                          </div>
                          <div className="p-3 text-left space-y-2">
                            <h4 className="wedding-serif-title text-sm text-stone-850 font-bold truncate">{prod.name}</h4>
                            <div className="flex justify-between items-center pt-1">
                              <span className="wedding-serif-body text-stone-900 font-extrabold">₹{prod.price}</span>
                              <button
                                type="button"
                                onClick={() => onAddToCart(prod)}
                                className={`px-3 py-1.5 rounded-full text-[9px] uppercase font-bold tracking-widest text-white border-0 ${p.accentBg} ${p.accentHover} transition cursor-pointer`}
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }

            // DEFAULT / UNKNOWN BLOCKS
            default:
              return null;
          }
        })}
      </main>

      {/* FOOTER SECTION */}
      {(() => {
        const footer = currentPageBlocks.find((b) => b.type === 'footer');
        if (!footer) return null;
        const c = footer.content;
        return (
          <footer className="border-t border-stone-200/40 bg-white py-12 px-6 sm:px-12 text-center text-stone-500 relative z-20">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                {c.socials?.map((soc: any, idx: number) => (
                  <a key={idx} href={soc.url || '#'} className="hover:text-stone-900 transition flex items-center gap-1">
                    <span>{soc.icon}</span>
                    <span>{soc.label}</span>
                  </a>
                ))}
              </div>
              
              <div className="h-[1px] w-24 bg-stone-200 mx-auto" />
              
              <p className="wedding-serif-body text-xs tracking-wider">
                {c.text || `© 2026 ${customizations.companyName}. All Rights Reserved.`}
              </p>
              
              <p className="text-[9px] text-stone-300 uppercase tracking-widest">
                Staged & Orchestrated with ZatBiz Templates
              </p>
            </div>
          </footer>
        );
      })()}

    </div>
  );
}
