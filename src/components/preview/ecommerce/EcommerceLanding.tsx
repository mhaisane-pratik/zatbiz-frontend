'use client';
import React from 'react';
import { Product } from '@/types';

import FashionLanding from './niches/fashion/Landing';
import ElectronicsLanding from './niches/electronics/Landing';
import FurnitureLanding from './niches/furniture/Landing';
import BeautyLanding from './niches/beauty/Landing';
import RestaurantLanding from './niches/restaurant/Landing';
import PharmacyLanding from './niches/pharmacy/Landing';
import PetLanding from './niches/pet/Landing';
import JewelryLanding from './niches/jewelry/Landing';
import GroceryLanding from './niches/grocery/Landing';
import ScratchLanding from './niches/scratch/Landing';

interface EcommerceLandingProps {
  projectId: number;
  projectConfig: any;
  dbProducts: Product[];
  wishlist: number[];
  customerSession: any;
  setActiveView: (view: string) => void;
  handleToggleWishlist: (id: number) => void;
  addToast: (msg: string, isError?: boolean) => void;
  themeSettings: any;
  categoriesList: any[];
  couponsList: any[];
  paymentConfig: any;
  shippingConfig: any;
}

export default function EcommerceLanding(props: EcommerceLandingProps) {
  const categoryName = (props.projectConfig?.selectedCategory || 'fashion').toLowerCase();

  const getLandingComponent = () => {
    if (categoryName.includes('furniture') || categoryName.includes('kitchen') || categoryName.includes('decor')) return FurnitureLanding;
    if (categoryName.includes('electronics') || categoryName.includes('mobile') || categoryName.includes('computer') || categoryName.includes('gadgets')) return ElectronicsLanding;
    if (categoryName.includes('beauty') || categoryName.includes('cosmetics')) return BeautyLanding;
    if (categoryName.includes('restaurant') || categoryName.includes('cafe') || categoryName.includes('bakery') || categoryName.includes('food')) return RestaurantLanding;
    if (categoryName.includes('pharmacy') || categoryName.includes('medical') || categoryName.includes('health')) return PharmacyLanding;
    if (categoryName.includes('pet')) return PetLanding;
    if (categoryName.includes('jewelry') || categoryName.includes('luxury')) return JewelryLanding;
    if (categoryName.includes('grocery') || categoryName.includes('organic') || categoryName.includes('supermarket')) return GroceryLanding;
    if (categoryName.includes('scratch')) return ScratchLanding;
    return FashionLanding;
  };

  const LandingComp = getLandingComponent();

  return (
    <LandingComp
      projectId={props.projectId}
      projectConfig={props.projectConfig}
      products={props.dbProducts}
      onProductClick={(p: any) => props.addToast(`Opened product details: ${p.name}`)}
      cart={[]} 
      handleAddToCart={(p: any) => props.addToast(`Added ${p.name} to cart.`)}
      activeView="landing"
      setActiveView={props.setActiveView}
      handleToggleWishlist={props.handleToggleWishlist}
      wishlist={props.wishlist}
      handleCheckout={() => props.addToast('Simulating secure stripe checkout...')}
    />
  );
}
