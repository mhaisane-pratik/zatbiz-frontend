'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Product, Project } from '@/types';
import { VestaCategory } from './categories/VestaCategory';
import FineDiningCategory from './categories/FineDiningCategory';
import FastFoodCategory from './categories/FastFoodCategory';
import { PizzaCategory } from './categories/PizzaCategory';
import { IndianCategory } from './categories/IndianCategory';
import { CafeCategory } from './categories/CafeCategory';
import { BakeryCategory } from './categories/BakeryCategory';
import { ChineseCategory } from './categories/ChineseCategory';
import { VeganCategory } from './categories/VeganCategory';
import { GeneralCategory } from './categories/GeneralCategory';
import ModernRestaurantLanding from './ModernRestaurantLanding';
import CartDrawer from './CartDrawer';
import BookingSeatMapModal from './BookingSeatMapModal';

interface RestaurantStorefrontProps {
  projectId: number;
  project: Project;
  dbProducts: Product[];
  cartCount: number;
  cart?: any[];
  onUpdateCartQuantity?: (idx: number, delta: number) => void;
  onRemoveFromCart?: (idx: number) => void;
  onCheckout?: () => void;
  onAddToCart: (p: Product) => void;
  onViewCart?: () => void;
  onViewMyOrders?: () => void;
  onProductClick?: (p: Product) => void;
  wishlist?: number[];
  onToggleWishlist?: (p: Product) => void;
  setIsBookingModalOpen: (open: boolean) => void;
  customerSession: any;
  onLogout: () => void;
  shopNiche: string | null;
  restaurantInfo?: any;
  activeBlockId?: string | null;
  setActiveBlockId?: (id: string | null) => void;
  // Inline editing (Theme Studio only)
  editMode?: boolean;
  onEdit?: (path: string, value: any) => void;
  onPickFile?: (path: string, file: File) => void;
  overrides?: any;
}

function extractTemplateCustomizations(project: Project) {
  let logoUrl = '';
  let logoIcon = '';
  let companyName = '';
  let heroImage = '';
  let heroTitle = '';
  let heroSubtitle = '';
  let themePreset = '';
  let fontFamily = '';
  let buttonStyle = '';
  let animationStyle = '';
  let headerStyle = '';

  if (!project || !project.blocksJson) {
    return { logoUrl, logoIcon, companyName, heroImage, heroTitle, heroSubtitle, themePreset, fontFamily, buttonStyle, animationStyle, headerStyle };
  }

  try {
    const parsed = JSON.parse(project.blocksJson);
    let blocks: any[] = [];

    if (parsed && typeof parsed === 'object') {
      if (Array.isArray(parsed)) {
        blocks = parsed;
        const bizConfig = parsed.find((b: any) => b.type === 'business_config');
        if (bizConfig?.content) {
          fontFamily = bizConfig.content.fontStyle || '';
          buttonStyle = bizConfig.content.buttonStyle || '';
          animationStyle = bizConfig.content.animationStyle || '';
          headerStyle = bizConfig.content.headerStyle || '';
        }
        // Wizard-generated projects persist blocksJson as a flat array and carry
        // the chosen theme preset on the block itself, not inside content.
        if (bizConfig?.theme) {
          themePreset = bizConfig.theme;
        }
      } else if (parsed.pages) {
        const homeBlocks = parsed.pages.home || [];
        const otherBlocks = Object.values(parsed.pages).flat();
        blocks = [...homeBlocks, ...otherBlocks];
        if (parsed.businessConfig?.themePreset) {
          themePreset = parsed.businessConfig.themePreset;
        }
        if (parsed.businessConfig) {
          fontFamily = parsed.businessConfig.fontStyle || '';
          buttonStyle = parsed.businessConfig.buttonStyle || '';
          animationStyle = parsed.businessConfig.animationStyle || '';
          headerStyle = parsed.businessConfig.headerStyle || '';
        }
      }
    }

    const headerBlock = blocks.find((b: any) => b.type === 'header');
    if (headerBlock?.content) {
      logoUrl = headerBlock.content.logoUrl || '';
      logoIcon = headerBlock.content.logoIcon || '';
      companyName = headerBlock.content.companyName || '';
      if (headerBlock.theme && !themePreset) {
        themePreset = headerBlock.theme;
      }
    }

    const heroBlock = blocks.find((b: any) => b.type === 'hero');
    if (heroBlock?.content) {
      heroImage = heroBlock.content.imageUrl || '';
      heroTitle = heroBlock.content.title || '';
      heroSubtitle = heroBlock.content.subtitle || '';
    }
  } catch (e) {
    console.error('Error extracting template customizations:', e);
  }

  return { logoUrl, logoIcon, companyName, heroImage, heroTitle, heroSubtitle, themePreset, fontFamily, buttonStyle, animationStyle, headerStyle };
}

export default function RestaurantStorefront({
  projectId,
  project,
  dbProducts,
  cartCount,
  cart = [],
  onUpdateCartQuantity,
  onRemoveFromCart,
  onCheckout,
  onAddToCart,
  onViewCart,
  onViewMyOrders,
  onProductClick,
  wishlist = [],
  onToggleWishlist,
  setIsBookingModalOpen,
  customerSession,
  onLogout,
  shopNiche,
  restaurantInfo,
  activeBlockId,
  setActiveBlockId,
  editMode,
  onEdit,
  onPickFile,
  overrides
}: RestaurantStorefrontProps) {
  const customizations = extractTemplateCustomizations(project);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSeatBookingModalOpen, setIsSeatBookingModalOpen] = useState(false);

  const [coupons, setCoupons] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    api.coupons.list(projectId).then(setCoupons).catch(console.error);
    api.restaurantData.list(projectId, 'offer').then(setOffers).catch(console.error);
  }, [projectId]);

  // Normalize the category name
  const catLower = (shopNiche || restaurantInfo?.subcategory || project?.name || '').toLowerCase();
  const isCustomNiche = catLower.includes('fine dining') || catLower.includes('fast food') || catLower.includes('pizza') || catLower.includes('cafe') || catLower.includes('coffee') || catLower.includes('burger');

  let rawHeroTitle = customizations.heroTitle || '';
  let rawHeroSubtitle = customizations.heroSubtitle || '';
  let rawHeroImage = customizations.heroImage || '';

  // If showing a custom niche, clear the generic layout builder placeholders so custom category defaults shine through
  if (isCustomNiche) {
    const projLower = project.name.replace(" Site", "").toLowerCase();
    if (rawHeroTitle.toLowerCase().includes('welcome to') && (rawHeroTitle.toLowerCase().includes('gourmet dining') || rawHeroTitle.toLowerCase().includes(projLower))) {
      rawHeroTitle = '';
    }
    if (rawHeroSubtitle.toLowerCase().includes('gourmet plates') && rawHeroSubtitle.toLowerCase().includes('wood-fired')) {
      rawHeroSubtitle = '';
    }
    if (rawHeroSubtitle.toLowerCase().includes('custom website created from scratch')) {
      rawHeroSubtitle = '';
    }
    if (rawHeroImage.includes('photo-1517248135467-4c7edcad34c4') || rawHeroImage.includes('photo-1441986300917-64674bd600d8')) {
      rawHeroImage = '';
    }
  }

  // Merge values: Parsed blocks (customizations) have priority,
  // followed by database profile (restaurantInfo), followed by project properties, then defaults.
  const resolvedLogoUrl = customizations.logoUrl || restaurantInfo?.logoUrl || '';
  const resolvedLogoIcon = customizations.logoIcon || '';
  const resolvedCompanyName = customizations.companyName || restaurantInfo?.restaurantName || project.name.replace(" Site", "");
  const isFoodImage =
    rawHeroImage &&
    (rawHeroImage.includes('food') ||
     rawHeroImage.includes('dish') ||
     rawHeroImage.includes('plate') ||
     rawHeroImage.includes('dining') ||
     rawHeroImage.includes('restaurant') ||
     rawHeroImage.includes('cook') ||
     rawHeroImage.includes('chef') ||
     rawHeroImage.includes('eat') ||
     rawHeroImage.includes('pizza') ||
     rawHeroImage.includes('pasta') ||
     rawHeroImage.includes('burger') ||
     rawHeroImage.includes('salad') ||
     rawHeroImage.includes('cake') ||
     rawHeroImage.includes('dessert') ||
     rawHeroImage.includes('wine') ||
     rawHeroImage.includes('spritz') ||
     rawHeroImage.includes('restaurant_hero_gourmet') ||
     !rawHeroImage.startsWith('http'));

  const resolvedHeroImage = isFoodImage ? rawHeroImage : '/restaurant_hero_gourmet.png';
  const resolvedHeroTitle = rawHeroTitle || '';
  const resolvedHeroSubtitle = rawHeroSubtitle || restaurantInfo?.description || '';
  
  // Customizer styling variables merged
  const resolvedThemePreset = customizations.themePreset || restaurantInfo?.selectedTheme || restaurantInfo?.themeColor || 'slate';
  const resolvedFontFamily = customizations.fontFamily || restaurantInfo?.fontStyle || 'inter';
  const resolvedButtonStyle = customizations.buttonStyle || restaurantInfo?.buttonStyle || 'rounded';
  const resolvedAnimationStyle = customizations.animationStyle || restaurantInfo?.animationStyle || 'fade';
  const resolvedHeaderStyle = customizations.headerStyle || restaurantInfo?.headerStyle || 'classic';

  // Extract header and hero block ids for builder selection
  let blocks: any[] = [];
  if (project?.blocksJson) {
    try {
      const parsed = JSON.parse(project.blocksJson);
      if (parsed && typeof parsed === 'object') {
        if (Array.isArray(parsed)) {
          blocks = parsed;
        } else if (parsed.pages?.home) {
          blocks = parsed.pages.home;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  const headerBlock = blocks.find((b: any) => b.type === 'header');
  const heroBlock = blocks.find((b: any) => b.type === 'hero');

  // Layout editor content: prefer live restaurantInfo, fall back to persisted blocksJson businessConfig
  let persistedLayoutContent: any = null;
  if (project?.blocksJson) {
    try {
      const parsedForLayout = JSON.parse(project.blocksJson);
      persistedLayoutContent = parsedForLayout?.businessConfig?.layoutContent || null;
    } catch {}
  }
  const mergedRestaurantInfo = restaurantInfo?.layoutContent
    ? restaurantInfo
    : { ...(restaurantInfo || {}), layoutContent: persistedLayoutContent };

  const props = {
    projectId,
    project,
    dbProducts,
    cartCount,
    onAddToCart,
    onViewCart: () => setIsCartDrawerOpen(true),
    onViewMyOrders,
    onProductClick,
    wishlist,
    onToggleWishlist,
    setIsBookingModalOpen: setIsSeatBookingModalOpen,
    customerSession,
    onLogout,
    // Customizations
    logoUrl: resolvedLogoUrl,
    logoIcon: resolvedLogoIcon,
    companyName: resolvedCompanyName,
    heroImage: resolvedHeroImage,
    heroTitle: resolvedHeroTitle,
    heroSubtitle: resolvedHeroSubtitle,
    themePreset: resolvedThemePreset,
    restaurantInfo: mergedRestaurantInfo,
    coupons,
    offers,
    activeBlockId,
    setActiveBlockId,
    headerBlockId: headerBlock?.id || null,
    heroBlockId: heroBlock?.id || null,
    // Inline editing passthrough (Theme Studio)
    editMode,
    onEdit,
    onPickFile,
    overrides,
  };

  const renderCategoryStorefront = () => {
    // Legacy single-section layouts, still reachable by explicit opt-in so
    // existing projects can be pinned to them if needed.
    if (catLower.includes('vesta')) return <VestaCategory {...props} />;
    if (catLower.includes('legacy-fine-dining')) return <FineDiningCategory {...props} />;
    if (catLower.includes('legacy-fast-food')) return <FastFoodCategory {...props} />;
    if (catLower.includes('legacy-pizza')) return <PizzaCategory {...props} />;
    if (catLower.includes('legacy-indian')) return <IndianCategory {...props} />;
    if (catLower.includes('legacy-cafe')) return <CafeCategory {...props} />;
    if (catLower.includes('legacy-bakery')) return <BakeryCategory {...props} />;
    if (catLower.includes('legacy-chinese')) return <ChineseCategory {...props} />;
    if (catLower.includes('legacy-vegan')) return <VeganCategory {...props} />;
    if (catLower.includes('legacy-general')) return <GeneralCategory {...props} />;

    // Default: one modern, fully scrollable landing page for every restaurant
    // template. Copy, imagery and accent colour are derived from the niche and
    // theme preset, so each of the 24 templates still renders distinctly.
    return <ModernRestaurantLanding {...props} />;
  };

  const getThemeColorClass = () => {
    switch (resolvedThemePreset) {
      case 'slate':
      case 'charcoal-slate': return 'bg-slate-700 hover:bg-slate-800 text-white';
      case 'deepblue':
      case 'indigo-ocean': return 'bg-indigo-600 hover:bg-indigo-700 text-white';
      case 'sunset':
      case 'amber-spiced': return 'bg-orange-600 hover:bg-orange-700 text-white';
      case 'purple':
      case 'velvet-plum': return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'emerald':
      case 'emerald-mint': return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      case 'rose-vintage': return 'bg-pink-50 hover:bg-pink-650 text-white';
      case 'ruby-wine': return 'bg-rose-600 hover:bg-rose-700 text-white';
      case 'tangerine-peel': return 'bg-orange-500 hover:bg-orange-650 text-white';
      case 'forest-herbs': return 'bg-emerald-700 hover:bg-emerald-800 text-white';
      default: return 'bg-[#c5a880] hover:bg-[#d8c2a3] text-black';
    }
  };

  // Preset hex mapper for gradients
  const presetHexes: Record<string, string> = {
    'gold-luxury': '#c5a880',
    'rose-vintage': '#ec4899',
    'emerald-mint': '#10b981',
    'ruby-wine': '#e11d48',
    'amber-spiced': '#d97706',
    'indigo-ocean': '#4f46e5',
    'charcoal-slate': '#475569',
    'tangerine-sprout': '#f97316',
    'forest-herbs': '#047857',
    'velvet-plum': '#7c3aed',
    'terracotta-clay': '#c2410c',
    'cyan-breeze': '#06b6d4',
    'sunset-gold': '#ea580c',
    'matcha-zen': '#84cc16',
    'chocolate-truffle': '#451a03',
    'lavender-bliss': '#a78bfa',
    'crimson-blaze': '#b91c1c',
    'lemon-zest': '#eab308',
    'peach-blossom': '#fb923c',
    'royal-gold': '#d97706',
    'slate': '#475569',
    'deepblue': '#4f46e5',
    'sunset': '#ea580c',
    'purple': '#7c3aed',
    'emerald': '#10b981'
  };
  const resolvedHex = presetHexes[resolvedThemePreset] || resolvedThemePreset || '#c5a880';

  const fontStyleClass = `custom-font-${resolvedFontFamily}`;
  const buttonStyleClass = `custom-btn-${resolvedButtonStyle}`;
  const animationStyleClass = `custom-anim-${resolvedAnimationStyle}`;
  const headerStyleClass = `custom-header-${resolvedHeaderStyle}`;

  return (
    <div className={`relative ${fontStyleClass} ${buttonStyleClass} ${animationStyleClass} ${headerStyleClass}`}>
      
      {/* Global Scoped Style overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Dynamic Typography overrides */
        .custom-font-montserrat, .custom-font-montserrat * { font-family: 'Montserrat', sans-serif !important; }
        .custom-font-poppins, .custom-font-poppins * { font-family: 'Poppins', sans-serif !important; }
        .custom-font-playfair, .custom-font-playfair * { font-family: 'Playfair Display', serif !important; }
        .custom-font-inter, .custom-font-inter * { font-family: 'Inter', sans-serif !important; }
        .custom-font-manrope, .custom-font-manrope * { font-family: 'Manrope', sans-serif !important; }

        /* Dynamic Button shape overrides */
        .custom-btn-rounded button, .custom-btn-rounded .btn, .custom-btn-rounded [role="button"] { border-radius: 8px !important; }
        .custom-btn-pill button, .custom-btn-pill .btn, .custom-btn-pill [role="button"] { border-radius: 9999px !important; }
        .custom-btn-sharp button, .custom-btn-sharp .btn, .custom-btn-sharp [role="button"] { border-radius: 0px !important; }
        
        .custom-btn-3d button, .custom-btn-3d .btn, .custom-btn-3d [role="button"] {
          border-radius: 8px !important;
          border-bottom: 4px solid rgba(0, 0, 0, 0.4) !important;
          transform: translateY(0px) !important;
          transition: transform 0.1s, border-bottom-width 0.1s !important;
        }
        .custom-btn-3d button:active, .custom-btn-3d .btn:active, .custom-btn-3d [role="button"]:active {
          transform: translateY(2px) !important;
          border-bottom-width: 1px !important;
        }

        .custom-btn-gradient button, .custom-btn-gradient .btn, .custom-btn-gradient [role="button"] {
          border-radius: 8px !important;
          background-image: linear-gradient(135deg, ${resolvedHex} 0%, #3b82f6 100%) !important;
          color: white !important;
          border: none !important;
        }

        /* Dynamic Animations overrides */
        .custom-anim-fade { animation: customFadeIn 0.8s ease-in-out; }
        .custom-anim-slide { animation: customSlideIn 0.8s ease-out; }
        .custom-anim-zoom { animation: customZoomIn 0.8s ease-out; }
        .custom-anim-glass { backdrop-filter: blur(12px) !important; }

        @keyframes customFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes customSlideIn {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes customZoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Dynamic Header style overrides */
        .custom-header-sticky header, .custom-header-sticky nav {
          position: sticky !important;
          top: 0 !important;
          z-index: 50 !important;
          background-color: rgba(15, 23, 42, 0.9) !important;
          backdrop-filter: blur(8px) !important;
        }
        .custom-header-transparent header, .custom-header-transparent nav {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          background-color: transparent !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }
        .custom-header-floating header, .custom-header-floating nav {
          position: fixed !important;
          top: 16px !important;
          left: 16px !important;
          right: 16px !important;
          border-radius: 16px !important;
          z-index: 50 !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          background-color: rgba(15, 23, 42, 0.85) !important;
          backdrop-filter: blur(12px) !important;
        }
        .custom-header-modern header, .custom-header-modern nav {
          padding: 20px 24px !important;
          border-bottom: 2.5px solid ${resolvedHex} !important;
        }
      ` }} />

      {renderCategoryStorefront()}

      {/* Floating Cart FAB */}
      {cart && cart.length > 0 && (
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className={`fixed bottom-6 right-6 z-[90] flex items-center gap-2 px-5 py-4 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border-0 font-sans font-black uppercase text-xs tracking-wider ${getThemeColorClass()}`}
          type="button"
        >
          <span className="material-symbols-outlined text-base select-none">shopping_cart</span>
          <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
        </button>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={onUpdateCartQuantity || (() => {})}
        onRemoveItem={onRemoveFromCart || (() => {})}
        onCheckout={onCheckout || (() => {})}
        themePreset={resolvedThemePreset}
      />

      {/* Seat Booking Modal */}
      <BookingSeatMapModal
        isOpen={isSeatBookingModalOpen}
        onClose={() => setIsSeatBookingModalOpen(false)}
        projectId={projectId}
        themePreset={resolvedThemePreset}
        customerSession={customerSession}
      />
    </div>
  );
}
