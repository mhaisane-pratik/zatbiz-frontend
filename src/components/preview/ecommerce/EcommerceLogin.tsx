'use client';
import React from 'react';

import FashionLogin from './niches/fashion/Login';
import ElectronicsLogin from './niches/electronics/Login';
import FurnitureLogin from './niches/furniture/Login';
import BeautyLogin from './niches/beauty/Login';
import RestaurantLogin from './niches/restaurant/Login';
import PharmacyLogin from './niches/pharmacy/Login';
import PetLogin from './niches/pet/Login';
import JewelryLogin from './niches/jewelry/Login';
import GroceryLogin from './niches/grocery/Login';
import ScratchLogin from './niches/scratch/Login';

interface EcommerceLoginProps {
  projectId: number;
  projectConfig: any;
  setCustomerSession?: (session: any) => void;
  setActiveView?: (view: string) => void;
  addToast?: (msg: string, isError?: boolean) => void;
}

export default function EcommerceLogin(props: EcommerceLoginProps) {
  const categoryName = (props.projectConfig?.selectedCategory || 'fashion').toLowerCase();

  const getLoginComponent = () => {
    if (categoryName.includes('furniture') || categoryName.includes('kitchen') || categoryName.includes('decor')) return FurnitureLogin;
    if (categoryName.includes('electronics') || categoryName.includes('mobile') || categoryName.includes('computer') || categoryName.includes('gadgets')) return ElectronicsLogin;
    if (categoryName.includes('beauty') || categoryName.includes('cosmetics')) return BeautyLogin;
    if (categoryName.includes('restaurant') || categoryName.includes('cafe') || categoryName.includes('bakery') || categoryName.includes('food')) return RestaurantLogin;
    if (categoryName.includes('pharmacy') || categoryName.includes('medical') || categoryName.includes('health')) return PharmacyLogin;
    if (categoryName.includes('pet')) return PetLogin;
    if (categoryName.includes('jewelry') || categoryName.includes('luxury')) return JewelryLogin;
    if (categoryName.includes('grocery') || categoryName.includes('organic') || categoryName.includes('supermarket')) return GroceryLogin;
    if (categoryName.includes('scratch')) return ScratchLogin;
    return FashionLogin;
  };

  const LoginComp = getLoginComponent();

  return (
    <LoginComp
      projectId={props.projectId}
      projectConfig={props.projectConfig}
      setCustomerSession={props.setCustomerSession}
      setActiveView={props.setActiveView}
      addToast={props.addToast}
      handleLoginSubmit={(props as any).handleLoginSubmit}
    />
  );
}
