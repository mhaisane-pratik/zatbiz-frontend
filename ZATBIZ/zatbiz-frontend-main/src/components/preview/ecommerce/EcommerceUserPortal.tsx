'use client';
import React from 'react';

import FashionCustomerDashboard from './niches/fashion/CustomerDashboard';
import ElectronicsCustomerDashboard from './niches/electronics/CustomerDashboard';
import FurnitureCustomerDashboard from './niches/furniture/CustomerDashboard';
import BeautyCustomerDashboard from './niches/beauty/CustomerDashboard';
import RestaurantCustomerDashboard from './niches/restaurant/CustomerDashboard';
import PharmacyCustomerDashboard from './niches/pharmacy/CustomerDashboard';
import PetCustomerDashboard from './niches/pet/CustomerDashboard';
import JewelryCustomerDashboard from './niches/jewelry/CustomerDashboard';
import GroceryCustomerDashboard from './niches/grocery/CustomerDashboard';
import ScratchCustomerDashboard from './niches/scratch/CustomerDashboard';

interface EcommerceUserPortalProps {
  projectId: number;
  projectConfig: any;
  customerSession: any;
  onLogout: () => void;
  setActiveView: (view: string) => void;
  addToast: (msg: string, isError?: boolean) => void;
  wishlist?: number[];
  handleToggleWishlist?: (id: number) => void;
}

export default function EcommerceUserPortal(props: EcommerceUserPortalProps) {
  const categoryName = (props.projectConfig?.selectedCategory || 'fashion').toLowerCase();

  const getCustomerDashboardComponent = () => {
    if (categoryName.includes('furniture') || categoryName.includes('kitchen') || categoryName.includes('decor')) return FurnitureCustomerDashboard;
    if (categoryName.includes('electronics') || categoryName.includes('mobile') || categoryName.includes('computer') || categoryName.includes('gadgets')) return ElectronicsCustomerDashboard;
    if (categoryName.includes('beauty') || categoryName.includes('cosmetics')) return BeautyCustomerDashboard;
    if (categoryName.includes('restaurant') || categoryName.includes('cafe') || categoryName.includes('bakery') || categoryName.includes('food')) return RestaurantCustomerDashboard;
    if (categoryName.includes('pharmacy') || categoryName.includes('medical') || categoryName.includes('health')) return PharmacyCustomerDashboard;
    if (categoryName.includes('pet')) return PetCustomerDashboard;
    if (categoryName.includes('jewelry') || categoryName.includes('luxury')) return JewelryCustomerDashboard;
    if (categoryName.includes('grocery') || categoryName.includes('organic') || categoryName.includes('supermarket')) return GroceryCustomerDashboard;
    if (categoryName.includes('scratch')) return ScratchCustomerDashboard;
    return FashionCustomerDashboard;
  };

  const CustomerComp = getCustomerDashboardComponent();

  return (
    <CustomerComp
      projectId={props.projectId}
      projectConfig={props.projectConfig}
      customerSession={props.customerSession}
      onLogout={props.onLogout}
      setActiveView={props.setActiveView}
      addToast={props.addToast}
      wishlist={props.wishlist}
      handleToggleWishlist={props.handleToggleWishlist}
    />
  );
}
