import React from 'react';
import { Product, Project } from '@/types';

export interface CategoryProps {
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
  logoUrl?: string;
  logoIcon?: string;
  companyName?: string;
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  themePreset?: string;
}

export interface CategoryLoginProps {
  projectId: number;
  companyName: string;
  logoIcon: string;
  logoUrl: string;
  isSignUp: boolean;
  setIsSignUp: (s: boolean) => void;
  errorMessage: string;
  successMessage: string;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface RestaurantDashboardProps {
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

export interface LoginTemplateProps extends CategoryLoginProps {
  niche: string;
  themeColor: string;
  img: string;
  desc: string;
  emoji: string;
}

export interface DashboardTemplateProps extends RestaurantDashboardProps {
  niche: string;
  primaryColor: string;
  accentBg: string;
  emoji: string;
  metrics: Array<{ title: string; value: string; desc: string }>;
}

export function getThemeColors(themePreset: string | undefined, defaultTheme: any) {
  const themes: Record<string, any> = {
    slate: {
      bgAccent: 'bg-slate-700',
      textAccent: 'text-slate-400',
      hoverBgAccent: 'hover:bg-slate-800',
      borderAccent: 'border-slate-800',
      hoverBorderAccent: 'hover:border-slate-650',
      selectionBg: 'selection:bg-slate-700',
      btnBorderAccent: 'border-slate-700',
      btnTextAccent: 'text-slate-400',
      btnHoverBgAccent: 'hover:bg-slate-700'
    },
    deepblue: {
      bgAccent: 'bg-indigo-650',
      textAccent: 'text-indigo-400',
      hoverBgAccent: 'hover:bg-indigo-755',
      borderAccent: 'border-indigo-900',
      hoverBorderAccent: 'hover:border-indigo-500',
      selectionBg: 'selection:bg-indigo-600',
      btnBorderAccent: 'border-indigo-600',
      btnTextAccent: 'text-indigo-600',
      btnHoverBgAccent: 'hover:bg-indigo-600'
    },
    sunset: {
      bgAccent: 'bg-orange-600',
      textAccent: 'text-orange-400',
      hoverBgAccent: 'hover:bg-orange-700',
      borderAccent: 'border-orange-900',
      hoverBorderAccent: 'hover:border-orange-500',
      selectionBg: 'selection:bg-orange-600',
      btnBorderAccent: 'border-orange-600',
      btnTextAccent: 'text-orange-600',
      btnHoverBgAccent: 'hover:bg-orange-600'
    },
    purple: {
      bgAccent: 'bg-purple-650',
      textAccent: 'text-purple-400',
      hoverBgAccent: 'hover:bg-purple-700',
      borderAccent: 'border-purple-900',
      hoverBorderAccent: 'hover:border-purple-500',
      selectionBg: 'selection:bg-purple-650',
      btnBorderAccent: 'border-purple-600',
      btnTextAccent: 'text-purple-600',
      btnHoverBgAccent: 'hover:bg-purple-650'
    },
    emerald: {
      bgAccent: 'bg-emerald-600',
      textAccent: 'text-emerald-400',
      hoverBgAccent: 'hover:bg-emerald-700',
      borderAccent: 'border-emerald-900',
      hoverBorderAccent: 'hover:border-emerald-500',
      selectionBg: 'selection:bg-emerald-600',
      btnBorderAccent: 'border-emerald-600',
      btnTextAccent: 'text-emerald-600',
      btnHoverBgAccent: 'hover:bg-emerald-600'
    }
  };
  return (themePreset && themes[themePreset]) ? themes[themePreset] : defaultTheme;
}
