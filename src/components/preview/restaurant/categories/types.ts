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
  restaurantInfo?: any;
  activeBlockId?: string | null;
  setActiveBlockId?: (id: string | null) => void;
  headerBlockId?: string | null;
  heroBlockId?: string | null;
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
  restaurantInfo?: any;
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
    'charcoal-slate': {
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
    'indigo-ocean': {
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
    'amber-spiced': {
      bgAccent: 'bg-amber-600',
      textAccent: 'text-amber-500',
      hoverBgAccent: 'hover:bg-amber-700',
      borderAccent: 'border-amber-955',
      hoverBorderAccent: 'hover:border-amber-500',
      selectionBg: 'selection:bg-amber-600',
      btnBorderAccent: 'border-amber-600',
      btnTextAccent: 'text-amber-600',
      btnHoverBgAccent: 'hover:bg-amber-600'
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
    'velvet-plum': {
      bgAccent: 'bg-violet-600',
      textAccent: 'text-violet-500',
      hoverBgAccent: 'hover:bg-violet-700',
      borderAccent: 'border-violet-900',
      hoverBorderAccent: 'hover:border-violet-500',
      selectionBg: 'selection:bg-violet-650',
      btnBorderAccent: 'border-violet-600',
      btnTextAccent: 'text-violet-600',
      btnHoverBgAccent: 'hover:bg-violet-600'
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
    },
    'emerald-mint': {
      bgAccent: 'bg-emerald-650',
      textAccent: 'text-emerald-500',
      hoverBgAccent: 'hover:bg-emerald-700',
      borderAccent: 'border-emerald-900',
      hoverBorderAccent: 'hover:border-emerald-500',
      selectionBg: 'selection:bg-emerald-650',
      btnBorderAccent: 'border-emerald-600',
      btnTextAccent: 'text-emerald-600',
      btnHoverBgAccent: 'hover:bg-emerald-650'
    },
    'rose-vintage': {
      bgAccent: 'bg-pink-500',
      textAccent: 'text-pink-600',
      hoverBgAccent: 'hover:bg-pink-600',
      borderAccent: 'border-pink-900',
      hoverBorderAccent: 'hover:border-pink-500',
      selectionBg: 'selection:bg-pink-500',
      btnBorderAccent: 'border-pink-600',
      btnTextAccent: 'text-pink-600',
      btnHoverBgAccent: 'hover:bg-pink-600'
    },
    'ruby-wine': {
      bgAccent: 'bg-rose-600',
      textAccent: 'text-rose-600',
      hoverBgAccent: 'hover:bg-rose-700',
      borderAccent: 'border-rose-900',
      hoverBorderAccent: 'hover:border-rose-500',
      selectionBg: 'selection:bg-rose-600',
      btnBorderAccent: 'border-rose-650',
      btnTextAccent: 'text-rose-600',
      btnHoverBgAccent: 'hover:bg-rose-650'
    },
    'tangerine-peel': {
      bgAccent: 'bg-orange-500',
      textAccent: 'text-orange-500',
      hoverBgAccent: 'hover:bg-orange-600',
      borderAccent: 'border-orange-900',
      hoverBorderAccent: 'hover:border-orange-500',
      selectionBg: 'selection:bg-orange-500',
      btnBorderAccent: 'border-orange-500',
      btnTextAccent: 'text-orange-500',
      btnHoverBgAccent: 'hover:bg-orange-500'
    },
    'forest-herbs': {
      bgAccent: 'bg-emerald-700',
      textAccent: 'text-emerald-700',
      hoverBgAccent: 'hover:bg-emerald-800',
      borderAccent: 'border-emerald-900',
      hoverBorderAccent: 'hover:border-emerald-600',
      selectionBg: 'selection:bg-emerald-700',
      btnBorderAccent: 'border-emerald-700',
      btnTextAccent: 'text-emerald-700',
      btnHoverBgAccent: 'hover:bg-emerald-700'
    },
    'gold-luxury': {
      bgAccent: 'bg-[#c5a880]',
      textAccent: 'text-[#c5a880]',
      hoverBgAccent: 'hover:bg-amber-800',
      borderAccent: 'border-[#c5a880]',
      hoverBorderAccent: 'hover:border-amber-500',
      selectionBg: 'selection:bg-[#c5a880]',
      btnBorderAccent: 'border-[#c5a880]',
      btnTextAccent: 'text-[#c5a880]',
      btnHoverBgAccent: 'hover:bg-[#c5a880]'
    },
    'terracotta-clay': {
      bgAccent: 'bg-orange-700',
      textAccent: 'text-orange-600',
      hoverBgAccent: 'hover:bg-orange-850',
      borderAccent: 'border-orange-800',
      hoverBorderAccent: 'hover:border-orange-500',
      selectionBg: 'selection:bg-orange-700',
      btnBorderAccent: 'border-orange-700',
      btnTextAccent: 'text-orange-600',
      btnHoverBgAccent: 'hover:bg-orange-705'
    },
    'cyan-breeze': {
      bgAccent: 'bg-cyan-600',
      textAccent: 'text-cyan-500',
      hoverBgAccent: 'hover:bg-cyan-700',
      borderAccent: 'border-cyan-800',
      hoverBorderAccent: 'hover:border-cyan-500',
      selectionBg: 'selection:bg-cyan-600',
      btnBorderAccent: 'border-cyan-600',
      btnTextAccent: 'text-cyan-600',
      btnHoverBgAccent: 'hover:bg-cyan-600'
    },
    'sunset-gold': {
      bgAccent: 'bg-orange-600',
      textAccent: 'text-orange-500',
      hoverBgAccent: 'hover:bg-orange-700',
      borderAccent: 'border-orange-800',
      hoverBorderAccent: 'hover:border-orange-500',
      selectionBg: 'selection:bg-orange-600',
      btnBorderAccent: 'border-orange-600',
      btnTextAccent: 'text-orange-600',
      btnHoverBgAccent: 'hover:bg-orange-600'
    },
    'matcha-zen': {
      bgAccent: 'bg-lime-600',
      textAccent: 'text-lime-500',
      hoverBgAccent: 'hover:bg-lime-700',
      borderAccent: 'border-lime-800',
      hoverBorderAccent: 'hover:border-lime-500',
      selectionBg: 'selection:bg-lime-650',
      btnBorderAccent: 'border-lime-600',
      btnTextAccent: 'text-lime-600',
      btnHoverBgAccent: 'hover:bg-lime-600'
    },
    'chocolate-truffle': {
      bgAccent: 'bg-amber-900',
      textAccent: 'text-amber-805',
      hoverBgAccent: 'hover:bg-amber-950',
      borderAccent: 'border-amber-950',
      hoverBorderAccent: 'hover:border-amber-800',
      selectionBg: 'selection:bg-amber-900',
      btnBorderAccent: 'border-amber-900',
      btnTextAccent: 'text-amber-900',
      btnHoverBgAccent: 'hover:bg-amber-900'
    },
    'lavender-bliss': {
      bgAccent: 'bg-violet-400',
      textAccent: 'text-violet-500',
      hoverBgAccent: 'hover:bg-violet-500',
      borderAccent: 'border-violet-300',
      hoverBorderAccent: 'hover:border-violet-500',
      selectionBg: 'selection:bg-violet-400',
      btnBorderAccent: 'border-violet-400',
      btnTextAccent: 'text-violet-500',
      btnHoverBgAccent: 'hover:bg-violet-405'
    },
    'crimson-blaze': {
      bgAccent: 'bg-red-700',
      textAccent: 'text-red-650',
      hoverBgAccent: 'hover:bg-red-800',
      borderAccent: 'border-red-800',
      hoverBorderAccent: 'hover:border-red-500',
      selectionBg: 'selection:bg-red-700',
      btnBorderAccent: 'border-red-700',
      btnTextAccent: 'text-red-600',
      btnHoverBgAccent: 'hover:bg-red-700'
    },
    'lemon-zest': {
      bgAccent: 'bg-yellow-500',
      textAccent: 'text-yellow-500',
      hoverBgAccent: 'hover:bg-yellow-600',
      borderAccent: 'border-yellow-700',
      hoverBorderAccent: 'hover:border-yellow-500',
      selectionBg: 'selection:bg-yellow-500',
      btnBorderAccent: 'border-yellow-500',
      btnTextAccent: 'text-yellow-605',
      btnHoverBgAccent: 'hover:bg-yellow-500'
    },
    'peach-blossom': {
      bgAccent: 'bg-orange-400',
      textAccent: 'text-orange-500',
      hoverBgAccent: 'hover:bg-orange-500',
      borderAccent: 'border-orange-300',
      hoverBorderAccent: 'hover:border-orange-500',
      selectionBg: 'selection:bg-orange-400',
      btnBorderAccent: 'border-orange-400',
      btnTextAccent: 'text-orange-500',
      btnHoverBgAccent: 'hover:bg-orange-400'
    },
    'royal-gold': {
      bgAccent: 'bg-amber-600',
      textAccent: 'text-amber-500',
      hoverBgAccent: 'hover:bg-amber-700',
      borderAccent: 'border-amber-800',
      hoverBorderAccent: 'hover:border-amber-500',
      selectionBg: 'selection:bg-amber-650',
      btnBorderAccent: 'border-amber-600',
      btnTextAccent: 'text-amber-600',
      btnHoverBgAccent: 'hover:bg-amber-600'
    }
  };
  return (themePreset && themes[themePreset]) ? themes[themePreset] : defaultTheme;
}
