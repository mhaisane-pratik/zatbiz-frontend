'use client';
import React from 'react';
import { Product } from '@/types';

import FashionCustomerDashboard from './FashionCustomerDashboard';
import ElectronicsCustomerDashboard from './ElectronicsCustomerDashboard';
import FurnitureCustomerDashboard from './FurnitureCustomerDashboard';
import BeautyCustomerDashboard from './BeautyCustomerDashboard';
import RestaurantCustomerDashboard from './RestaurantCustomerDashboard';
import PharmacyCustomerDashboard from './PharmacyCustomerDashboard';
import PetCustomerDashboard from './PetCustomerDashboard';
import JewelryCustomerDashboard from './JewelryCustomerDashboard';
import GroceryCustomerDashboard from './GroceryCustomerDashboard';
import ScratchCustomerDashboard from './ScratchCustomerDashboard';

interface EcommerceUserPortalProps {
  projectId: number;
  projectConfig: any;
  customerSession: any;
  onLogout: () => void;
  setActiveView: (view: string) => void;
  addToast?: (msg: string, isError?: boolean) => void;
  dbProducts?: Product[];
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

  const CustComp = getCustomerDashboardComponent();

  return (
    <CustComp
      projectId={props.projectId}
      projectConfig={props.projectConfig}
      customerSession={props.customerSession}
      onLogout={props.onLogout}
      setActiveView={props.setActiveView}
      addToast={props.addToast}
      dbProducts={props.dbProducts}
      wishlist={props.wishlist}
      handleToggleWishlist={props.handleToggleWishlist}
    />
  );
}
