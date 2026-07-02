'use client';

import React from 'react';
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

interface RestaurantStorefrontProps {
  projectId: number;
  project: Project;
  dbProducts: Product[];
  cartCount: number;
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

  // Merge values: Parsed blocks (customizations) have priority (since they are edited in the layout editor),
  // followed by database profile (restaurantInfo), followed by project properties, then defaults.
  const resolvedLogoUrl = customizations.logoUrl || restaurantInfo?.logoUrl || '';
  const resolvedLogoIcon = customizations.logoIcon || '';
  const resolvedCompanyName = customizations.companyName || restaurantInfo?.restaurantName || project.name.replace(" Site", "");
  const resolvedHeroImage = customizations.heroImage || '';
  const resolvedHeroTitle = customizations.heroTitle || '';
  const resolvedHeroSubtitle = customizations.heroSubtitle || restaurantInfo?.description || '';
  const resolvedThemePreset = customizations.themePreset || restaurantInfo?.themeColor || '';

  // Normalize the category name
  const catLower = (shopNiche || restaurantInfo?.subcategory || '').toLowerCase();

  const props = {
    projectId,
    project,
    dbProducts,
    cartCount,
    onAddToCart,
    onViewCart,
    onViewMyOrders,
    onProductClick,
    wishlist,
    onToggleWishlist,
    setIsBookingModalOpen,
    customerSession,
    onLogout,
    // Customizations
    logoUrl: resolvedLogoUrl,
    logoIcon: resolvedLogoIcon,
    companyName: resolvedCompanyName,
    heroImage: resolvedHeroImage,
    heroTitle: resolvedHeroTitle,
    heroSubtitle: resolvedHeroSubtitle,
    themePreset: resolvedThemePreset
  };

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
}
