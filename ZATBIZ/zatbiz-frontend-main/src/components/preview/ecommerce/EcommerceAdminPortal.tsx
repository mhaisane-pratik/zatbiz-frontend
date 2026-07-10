'use client';
import React from 'react';
import { Product } from '@/types';

import FashionAdminDashboard from './niches/fashion/AdminDashboard';
import ElectronicsAdminDashboard from './niches/electronics/AdminDashboard';
import FurnitureAdminDashboard from './niches/furniture/AdminDashboard';
import BeautyAdminDashboard from './niches/beauty/AdminDashboard';
import RestaurantAdminDashboard from './niches/restaurant/AdminDashboard';
import PharmacyAdminDashboard from './niches/pharmacy/AdminDashboard';
import PetAdminDashboard from './niches/pet/AdminDashboard';
import JewelryAdminDashboard from './niches/jewelry/AdminDashboard';
import GroceryAdminDashboard from './niches/grocery/AdminDashboard';
import ScratchAdminDashboard from './niches/scratch/AdminDashboard';

interface EcommerceAdminPortalProps {
  projectId: number;
  projectConfig: any;
  customerSession: any;
  onLogout: () => void;
  setActiveView: (view: string) => void;
  addToast?: (msg: string, isError?: boolean) => void;
  dbProducts: Product[];
  setDbProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  themeSettings?: any;
  setThemeSettings?: React.Dispatch<React.SetStateAction<any>>;
  categoriesList?: any[];
  setCategoriesList?: React.Dispatch<React.SetStateAction<any[]>>;
  couponsList?: any[];
  setCouponsList?: React.Dispatch<React.SetStateAction<any[]>>;
  paymentConfig?: any;
  setPaymentConfig?: React.Dispatch<React.SetStateAction<any>>;
  shippingConfig?: any;
  setShippingConfig?: React.Dispatch<React.SetStateAction<any>>;
}

export default function EcommerceAdminPortal(props: EcommerceAdminPortalProps) {
  const categoryName = (props.projectConfig?.selectedCategory || 'fashion').toLowerCase();

  const getAdminDashboardComponent = () => {
    if (categoryName.includes('furniture') || categoryName.includes('kitchen') || categoryName.includes('decor')) return FurnitureAdminDashboard;
    if (categoryName.includes('electronics') || categoryName.includes('mobile') || categoryName.includes('computer') || categoryName.includes('gadgets')) return ElectronicsAdminDashboard;
    if (categoryName.includes('beauty') || categoryName.includes('cosmetics')) return BeautyAdminDashboard;
    if (categoryName.includes('restaurant') || categoryName.includes('cafe') || categoryName.includes('bakery') || categoryName.includes('food')) return RestaurantAdminDashboard;
    if (categoryName.includes('pharmacy') || categoryName.includes('medical') || categoryName.includes('health')) return PharmacyAdminDashboard;
    if (categoryName.includes('pet')) return PetAdminDashboard;
    if (categoryName.includes('jewelry') || categoryName.includes('luxury')) return JewelryAdminDashboard;
    if (categoryName.includes('grocery') || categoryName.includes('organic') || categoryName.includes('supermarket')) return GroceryAdminDashboard;
    if (categoryName.includes('scratch')) return ScratchAdminDashboard;
    return FashionAdminDashboard;
  };

  const AdminComp = getAdminDashboardComponent();

  return (
    <AdminComp
      projectId={props.projectId}
      projectConfig={props.projectConfig}
      customerSession={props.customerSession}
      onLogout={props.onLogout}
      setActiveView={props.setActiveView}
      addToast={props.addToast}
      dbProducts={props.dbProducts}
      setDbProducts={props.setDbProducts}
      themeSettings={props.themeSettings}
      setThemeSettings={props.setThemeSettings}
      categoriesList={props.categoriesList}
      setCategoriesList={props.setCategoriesList}
      couponsList={props.couponsList}
      setCouponsList={props.setCouponsList}
      paymentConfig={props.paymentConfig}
      setPaymentConfig={props.setPaymentConfig}
      shippingConfig={props.shippingConfig}
      setShippingConfig={props.setShippingConfig}
    />
  );
}
