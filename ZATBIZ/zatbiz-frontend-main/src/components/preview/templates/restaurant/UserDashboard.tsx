'use client';

import React from 'react';
import { Project } from '@/types';
import { FineDiningDashboard } from '../../restaurant/categories/FineDiningDashboard';
import { FastFoodDashboard } from '../../restaurant/categories/FastFoodDashboard';
import { PizzaCategoryDashboard } from '../../restaurant/categories/PizzaCategory';
import { IndianCategoryDashboard } from '../../restaurant/categories/IndianCategory';
import { CafeCategoryDashboard } from '../../restaurant/categories/CafeCategory';
import { BakeryCategoryDashboard } from '../../restaurant/categories/BakeryCategory';
import { ChineseCategoryDashboard } from '../../restaurant/categories/ChineseCategory';
import { VeganCategoryDashboard } from '../../restaurant/categories/VeganCategory';
import { GeneralCategoryDashboard } from '../../restaurant/categories/GeneralCategory';

interface RestaurantUserDashboardProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  setCompanyName?: (name: string) => void;
  logoIcon: string;
  logoUrl: string;
  shopNiche: string | null;
}

export default function RestaurantUserDashboard(props: RestaurantUserDashboardProps) {
  const catLower = (props.shopNiche || '').toLowerCase();
  const dashboardProps = {
    projectId: props.projectId,
    project: props.project,
    clientEmail: props.clientEmail,
    theme: props.theme,
    onLogout: props.onLogout,
    companyName: props.companyName,
    setCompanyName: props.setCompanyName || (() => {}),
    logoIcon: props.logoIcon,
    logoUrl: props.logoUrl,
    shopNiche: props.shopNiche
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
