'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { api } from '@/services/api';
import EcommerceLanding from './EcommerceLanding';
import EcommerceLogin from './EcommerceLogin';
import EcommerceAdminPortal from './EcommerceAdminPortal';
import EcommerceUserPortal from './EcommerceUserPortal';

interface EcommerceStorefrontProps {
  projectId: number;
  projectConfig: any;
  dbProducts?: Product[];
}

export default function EcommerceStorefront({
  projectId,
  projectConfig,
  dbProducts: initialDbProducts
}: EcommerceStorefrontProps) {
  const [activeView, setActiveView] = useState<string>('landing'); // 'landing' | 'login' | 'dashboard'
  const [dbProducts, setDbProducts] = useState<Product[]>(initialDbProducts || []);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [customerSession, setCustomerSession] = useState<any>(null);
  const [toasts, setToasts] = useState<{ id: number; message: string; isError?: boolean }[]>([]);

  // Theme Customizer States
  const [themeSettings, setThemeSettings] = useState({
    mode: 'dark', // 'dark' | 'light'
    color: projectConfig?.themeColor || '#6366f1',
    font: 'Inter', // 'Inter' | 'Outfit' | 'Roboto'
    logoIcon: projectConfig?.logoIcon || '🛍️',
    announceText: '✨ FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹1,500! ✨',
    slogan: projectConfig?.seoDescription || 'Shop premium curated products.',
    bannerUrl: projectConfig?.bannerImageUrl || ''
  });

  // Dynamic Categories state
  const [categoriesList, setCategoriesList] = useState<any[]>([
    { name: 'Apparel', banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600', isMegaMenu: true, seoTitle: 'Fashion Wear', seoDesc: 'Discover high-fashion wear.' },
    { name: 'Electronics', banner: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', isMegaMenu: true, seoTitle: 'Tech Devices', seoDesc: 'Smartphones and digital accessories.' },
    { name: 'Home & Kitchen', banner: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600', isMegaMenu: false, seoTitle: 'Furniture Decor', seoDesc: 'Scandinavian home items.' }
  ]);

  // Dynamic Coupons state
  const [couponsList, setCouponsList] = useState<any[]>([]);

  // Payments and Shipping Settings
  const [paymentConfig, setPaymentConfig] = useState({
    stripe: true,
    cod: true,
    upi: true,
    razorpay: false
  });

  const [shippingConfig, setShippingConfig] = useState({
    domesticCharge: 99,
    internationalCharge: 499,
    freeShippingMin: 1500
  });

  const addToast = (message: string, isError?: boolean) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, isError }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Restore Customer Session & Load Products
  useEffect(() => {
    // Restore Session
    try {
      const saved = localStorage.getItem(`customer_${projectId}`);
      if (saved) {
        setCustomerSession(JSON.parse(saved));
      }
    } catch (e) {}

    // Load Products
    api.products.list(projectId)
      .then((data) => {
        setDbProducts(data);
      })
      .catch((err) => {
        console.warn('Failed to load products from API:', err);
      });

    // Load Coupons
    api.coupons.list(projectId)
      .then((data) => {
        setCouponsList(data);
      })
      .catch((err) => {
        console.warn('Failed to load coupons from API:', err);
      });
  }, [projectId]);

  useEffect(() => {
    if (projectConfig) {
      setThemeSettings({
        mode: 'dark',
        color: projectConfig.selectedThemeData?.primaryColor || projectConfig.themeColor || '#6366f1',
        font: projectConfig.selectedThemeData?.fontFamily || projectConfig.selectedThemeData?.font || 'Inter',
        logoIcon: projectConfig.selectedThemeData?.icon || projectConfig.logoIcon || '🛍️',
        announceText: projectConfig.selectedThemeData?.announceText || projectConfig.announceText || '✨ FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹1,500! ✨',
        slogan: projectConfig.selectedThemeData?.tagline || projectConfig.slogan || projectConfig.seoDescription || 'Shop premium curated products.',
        bannerUrl: projectConfig.selectedThemeData?.bannerImageUrl || projectConfig.bannerUrl || '',
        cardStyle: projectConfig.selectedThemeData?.cardStyle || 'classic-bordered',
        layoutStyle: projectConfig.selectedThemeData?.layoutStyle || 'modern-grid',
        buttonRoundness: projectConfig.selectedThemeData?.buttonRoundness || 'rounded-lg',
        bannerStyle: projectConfig.selectedThemeData?.bannerStyle || 'gradient-mesh'
      });

      if (projectConfig.selectedThemeData?.category) {
        const cat = projectConfig.selectedThemeData.category;
        const capitalizedCat = cat.charAt(0).toUpperCase() + cat.slice(1);
        setCategoriesList([
          { name: capitalizedCat, banner: projectConfig.selectedThemeData.bannerImageUrl, isMegaMenu: true }
        ]);
      }
    }
  }, [projectConfig]);

  const handleToggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist((prev) => prev.filter((w) => w !== id));
      addToast('Removed from wishlist.');
    } else {
      setWishlist((prev) => [...prev, id]);
      addToast('Added to wishlist.');
    }
  };

  const handleLogout = () => {
    setCustomerSession(null);
    try {
      localStorage.removeItem(`customer_${projectId}`);
      localStorage.removeItem('clientEmail');
      localStorage.removeItem('clientId');
    } catch (e) {}
    addToast('Logged out successfully.');
    setActiveView('landing');
  };

  const renderContent = () => {
    const landingProps = {
      projectId,
      projectConfig: { ...projectConfig, themeColor: themeSettings.color, logoIcon: themeSettings.logoIcon, seoDescription: themeSettings.slogan },
      dbProducts,
      wishlist,
      customerSession,
      setActiveView,
      handleToggleWishlist,
      addToast,
      themeSettings,
      categoriesList,
      couponsList,
      paymentConfig,
      shippingConfig
    };

    switch (activeView) {
      case 'login':
        return (
          <EcommerceLogin
            projectId={projectId}
            projectConfig={projectConfig}
            setCustomerSession={setCustomerSession}
            setActiveView={setActiveView}
            addToast={addToast}
          />
        );
      case 'dashboard':
        if (!customerSession) {
          return (
            <EcommerceLogin
              projectId={projectId}
              projectConfig={projectConfig}
              setCustomerSession={setCustomerSession}
              setActiveView={setActiveView}
              addToast={addToast}
            />
          );
        }
        if (customerSession.role === 'Admin') {
          return (
            <EcommerceAdminPortal
              projectId={projectId}
              projectConfig={projectConfig}
              customerSession={customerSession}
              onLogout={handleLogout}
              setActiveView={setActiveView}
              addToast={addToast}
              dbProducts={dbProducts}
              setDbProducts={setDbProducts}
              themeSettings={themeSettings}
              setThemeSettings={setThemeSettings}
              categoriesList={categoriesList}
              setCategoriesList={setCategoriesList}
              couponsList={couponsList}
              setCouponsList={setCouponsList}
              paymentConfig={paymentConfig}
              setPaymentConfig={setPaymentConfig}
              shippingConfig={shippingConfig}
              setShippingConfig={setShippingConfig}
            />
          );
        } else {
          return (
            <EcommerceUserPortal
              projectId={projectId}
              projectConfig={projectConfig}
              customerSession={customerSession}
              onLogout={handleLogout}
              setActiveView={setActiveView}
              addToast={addToast}
              wishlist={wishlist}
              handleToggleWishlist={handleToggleWishlist}
            />
          );
        }
      case 'landing':
      default:
        return (
          <EcommerceLanding
            {...landingProps}
            cartCountQuantity={0}
            openProductDetail={() => {}}
            handleAddToCart={() => {}}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen relative font-sans ${themeSettings.mode === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'}`}>
      {renderContent()}

      {/* Floating Toast Notification Feed */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4.5 py-3 rounded-2xl border text-xs font-black tracking-wide shadow-2xl flex items-center gap-2 animate-slide-in backdrop-blur-md ${
              toast.isError
                ? 'bg-rose-500/90 border-rose-500 text-white'
                : 'bg-emerald-500/90 border-emerald-500 text-white'
            }`}
          >
            <span>{toast.isError ? '⚠️' : '✓'}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
