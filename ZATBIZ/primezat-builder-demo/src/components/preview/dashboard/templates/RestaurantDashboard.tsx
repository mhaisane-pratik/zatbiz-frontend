'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { api } from '@/services/api';

import RestaurantAdminDashboard from './RestaurantAdminDashboard';
import { FineDiningDashboard } from '../../restaurant/categories/FineDiningCategory';
import { FastFoodDashboard } from '../../restaurant/categories/FastFoodCategory';
import { PizzaCategoryDashboard } from '../../restaurant/categories/PizzaCategory';
import { IndianCategoryDashboard } from '../../restaurant/categories/IndianCategory';
import { CafeCategoryDashboard } from '../../restaurant/categories/CafeCategory';
import { BakeryCategoryDashboard } from '../../restaurant/categories/BakeryCategory';
import { ChineseCategoryDashboard } from '../../restaurant/categories/ChineseCategory';
import { VeganCategoryDashboard } from '../../restaurant/categories/VeganCategory';
import { GeneralCategoryDashboard } from '../../restaurant/categories/GeneralCategory';

interface RestaurantDashboardProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  logoIcon: string;
  logoUrl: string;
  shopNiche: string | null;
}

export default function RestaurantDashboard({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  setCompanyName,
  logoIcon,
  logoUrl,
  shopNiche,
}: RestaurantDashboardProps) {
  const [restaurantInfo, setRestaurantInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.restaurant.get(projectId)
      .then((data) => {
        if (data && data.projectId) {
          setRestaurantInfo(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-950 items-center justify-center text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#c5a880] border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Restaurant Details...</p>
        </div>
      </div>
    );
  }

  const activeThemeColor = restaurantInfo?.themeColor || theme?.color || '#c5a880';
  const activeCompanyName = restaurantInfo?.restaurantName || companyName;
  const activeNiche = restaurantInfo?.subcategory || shopNiche || 'General';
  const activeLogoUrl = restaurantInfo?.logoUrl || logoUrl;

  const activeTheme = {
    ...theme,
    color: activeThemeColor
  };

  if (clientEmail === 'admin@gmail.com') {
    return (
      <RestaurantAdminDashboard
        projectId={projectId}
        project={project}
        clientEmail={clientEmail}
        theme={activeTheme}
        onLogout={onLogout}
        companyName={activeCompanyName}
        logoIcon={logoIcon}
      />
    );
  }

  const catLower = activeNiche.toLowerCase();
  const dashboardProps = {
    projectId,
    project,
    clientEmail,
    theme: activeTheme,
    onLogout,
    companyName: activeCompanyName,
    setCompanyName,
    logoIcon,
    logoUrl: activeLogoUrl,
    shopNiche: activeNiche
  };

  if (catLower.includes('fine dining') || catLower.includes('dining')) {
    return <FineDiningDashboard {...dashboardProps} />;
  }
  if (catLower.includes('fast food') || catLower.includes('burger')) {
    return <FastFoodDashboard {...dashboardProps} />;
  }
  if (catLower.includes('pizza')) {
    return <PizzaCategoryDashboard {...dashboardProps} />;
  }
  if (
    catLower.includes('indian') ||
    catLower.includes('punjabi') ||
    catLower.includes('biryani') ||
    catLower.includes('tandoori') ||
    catLower.includes('south indian')
  ) {
    return <IndianCategoryDashboard {...dashboardProps} />;
  }
  if (
    catLower.includes('cafe') ||
    catLower.includes('coffee') ||
    catLower.includes('tea') ||
    catLower.includes('roastery')
  ) {
    return <CafeCategoryDashboard {...dashboardProps} />;
  }
  if (
    catLower.includes('bakery') ||
    catLower.includes('cake') ||
    catLower.includes('bread') ||
    catLower.includes('pastry')
  ) {
    return <BakeryCategoryDashboard {...dashboardProps} />;
  }
  if (
    catLower.includes('chinese') ||
    catLower.includes('momo') ||
    catLower.includes('asian') ||
    catLower.includes('thai') ||
    catLower.includes('japanese')
  ) {
    return <ChineseCategoryDashboard {...dashboardProps} />;
  }
  if (
    catLower.includes('vegan') ||
    catLower.includes('vegetarian') ||
    catLower.includes('healthy') ||
    catLower.includes('salad') ||
    catLower.includes('organic')
  ) {
    return <VeganCategoryDashboard {...dashboardProps} />;
  }

  return <GeneralCategoryDashboard {...dashboardProps} />;
}
