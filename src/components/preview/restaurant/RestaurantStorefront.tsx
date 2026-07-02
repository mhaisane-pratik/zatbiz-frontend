'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Product, Project } from '@/types';
import FineDiningCategory from './categories/FineDiningCategory';
import FastFoodCategory from './categories/FastFoodCategory';
import { PizzaCategory } from './categories/PizzaCategory';
import { IndianCategory } from './categories/IndianCategory';
import { CafeCategory } from './categories/CafeCategory';
import { BakeryCategory } from './categories/BakeryCategory';
import { ChineseCategory } from './categories/ChineseCategory';
import { VeganCategory } from './categories/VeganCategory';
import { GeneralCategory } from './categories/GeneralCategory';
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
}

function extractTemplateCustomizations(project: Project) {
  let logoUrl = '';
  let logoIcon = '';
  let companyName = '';
  let heroImage = '';
  let heroTitle = '';
  let heroSubtitle = '';
  let themePreset = '';

  if (!project || !project.blocksJson) {
    return { logoUrl, logoIcon, companyName, heroImage, heroTitle, heroSubtitle, themePreset };
  }

  try {
    const parsed = JSON.parse(project.blocksJson);
    let blocks: any[] = [];

    if (parsed && typeof parsed === 'object') {
      if (Array.isArray(parsed)) {
        blocks = parsed;
      } else if (parsed.pages) {
        const homeBlocks = parsed.pages.home || [];
        const otherBlocks = Object.values(parsed.pages).flat();
        blocks = [...homeBlocks, ...otherBlocks];
        if (parsed.businessConfig?.themePreset) {
          themePreset = parsed.businessConfig.themePreset;
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

  return { logoUrl, logoIcon, companyName, heroImage, heroTitle, heroSubtitle, themePreset };
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
  restaurantInfo
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
  const catLower = (shopNiche || restaurantInfo?.subcategory || '').toLowerCase();
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

  // Merge values: Parsed blocks (customizations) have priority (since they are edited in the layout editor),
  // followed by database profile (restaurantInfo), followed by project properties, then defaults.
  const resolvedLogoUrl = customizations.logoUrl || restaurantInfo?.logoUrl || '';
  const resolvedLogoIcon = customizations.logoIcon || '';
  const resolvedCompanyName = customizations.companyName || restaurantInfo?.restaurantName || project.name.replace(" Site", "");
  const resolvedHeroImage = rawHeroImage || '';
  const resolvedHeroTitle = rawHeroTitle || '';
  const resolvedHeroSubtitle = rawHeroSubtitle || restaurantInfo?.description || '';
  const resolvedThemePreset = customizations.themePreset || restaurantInfo?.themeColor || '';

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
    restaurantInfo,
    coupons,
    offers
  };

  const renderCategoryStorefront = () => {
    if (catLower.includes('fine dining') || catLower.includes('dining')) {
      return <FineDiningCategory {...props} />;
    }
    if (catLower.includes('fast food') || catLower.includes('burger')) {
      return <FastFoodCategory {...props} />;
    }
    if (catLower.includes('pizza')) {
      return <PizzaCategory {...props} />;
    }
    if (
      catLower.includes('indian') ||
      catLower.includes('punjabi') ||
      catLower.includes('biryani') ||
      catLower.includes('tandoori') ||
      catLower.includes('south indian') ||
      catLower.includes('gujarati') ||
      catLower.includes('rajasthani') ||
      catLower.includes('bengali') ||
      catLower.includes('hyderabadi') ||
      catLower.includes('kerala') ||
      catLower.includes('andhra') ||
      catLower.includes('tamil') ||
      catLower.includes('kashmiri')
    ) {
      return <IndianCategory {...props} />;
    }
    if (
      catLower.includes('cafe') ||
      catLower.includes('coffee') ||
      catLower.includes('tea') ||
      catLower.includes('roastery') ||
      catLower.includes('juice') ||
      catLower.includes('smoothie')
    ) {
      return <CafeCategory {...props} />;
    }
    if (
      catLower.includes('bakery') ||
      catLower.includes('cake') ||
      catLower.includes('bread') ||
      catLower.includes('pastry') ||
      catLower.includes('chocolate') ||
      catLower.includes('sweet') ||
      catLower.includes('ice cream') ||
      catLower.includes('parlour')
    ) {
      return <BakeryCategory {...props} />;
    }
    if (
      catLower.includes('chinese') ||
      catLower.includes('momo') ||
      catLower.includes('asian') ||
      catLower.includes('thai') ||
      catLower.includes('japanese') ||
      catLower.includes('korean')
    ) {
      return <ChineseCategory {...props} />;
    }
    if (
      catLower.includes('vegan') ||
      catLower.includes('vegetarian') ||
      catLower.includes('healthy') ||
      catLower.includes('salad') ||
      catLower.includes('organic')
    ) {
      return <VeganCategory {...props} />;
    }

    return <GeneralCategory {...props} />;
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
      case 'rose-vintage': return 'bg-pink-500 hover:bg-pink-650 text-white';
      case 'ruby-wine': return 'bg-rose-600 hover:bg-rose-700 text-white';
      case 'tangerine-peel': return 'bg-orange-500 hover:bg-orange-650 text-white';
      case 'forest-herbs': return 'bg-emerald-700 hover:bg-emerald-800 text-white';
      default: return 'bg-[#c5a880] hover:bg-[#d8c2a3] text-black';
    }
  };

  return (
    <div className="relative">
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
