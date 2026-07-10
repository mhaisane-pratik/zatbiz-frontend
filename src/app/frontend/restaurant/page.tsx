'use client';

import { useState } from 'react';
import RestaurantStorefront from '@/components/preview/restaurant/RestaurantStorefront';
import type { Product, Project } from '@/types';

export default function RestaurantFrontendDemo() {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const demoProject: Project = {
    id: 1,
    name: 'South Indian Restaurant',
    description: 'Demo restaurant landing page',
    blocksJson: JSON.stringify({
      businessConfig: {
        businessType: 'restaurant',
        shopNiche: 'south indian',
        themePreset: 'sunset',
      },
      pages: {
        home: [],
      },
      activePages: ['home'],
    }),
    status: 'published',
    updatedAt: '',
  };

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    setCart((prev) => [...prev, { product, quantity: 1, size: 'M', color: 'Black' }]);
  };

  const handleToggleWishlist = (product: Product) => {
    if (product.id == null) return;
    const productId = product.id;
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <RestaurantStorefront
      projectId={demoProject.id}
      project={demoProject}
      dbProducts={[]}
      cartCount={cartCount}
      cart={cart}
      onUpdateCartQuantity={() => {}}
      onRemoveFromCart={() => {}}
      onCheckout={() => {}}
      onAddToCart={handleAddToCart}
      onViewCart={() => {}}
      onViewMyOrders={() => {}}
      onProductClick={() => {}}
      wishlist={wishlist}
      onToggleWishlist={handleToggleWishlist}
      setIsBookingModalOpen={() => {}}
      customerSession={null}
      onLogout={() => {}}
      shopNiche="south indian"
      restaurantInfo={null}
    />
  );
}
