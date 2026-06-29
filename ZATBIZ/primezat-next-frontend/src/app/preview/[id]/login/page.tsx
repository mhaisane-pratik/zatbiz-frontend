'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Project } from '@/types';
import { THEMES_30 } from '@/app/dashboard/themesData';

const GLOBAL_THEME_COLORS: Record<string, string> = {
  emerald: '#10B981',
  deepblue: '#3B82F6',
  purple: '#D97706',
  sunset: '#F97316',
  slate: '#475569',
  'realestate-elite': '#1e3a8a',
  'realestate-luxury-mansions': '#0f172a',
  'realestate-apex-builders': '#b45309',
  'realestate-vertex-commercial': '#0284c7',
  'realestate-urban-nest': '#0d9488',
  'realestate-horizon-advisors': '#4f46e5',
  'realestate-luxe-spaces': '#7c3aed',
  'realestate-nova-smartcity': '#2563eb',
  'realestate-heritage-homes': '#15803d',
  'realestate-modern-living': '#ea580c'
};

import { FineDiningLogin } from '@/components/preview/restaurant/categories/FineDiningCategory';
import { FastFoodLogin } from '@/components/preview/restaurant/categories/FastFoodCategory';
import { PizzaCategoryLogin } from '@/components/preview/restaurant/categories/PizzaCategory';
import { IndianCategoryLogin } from '@/components/preview/restaurant/categories/IndianCategory';
import { CafeCategoryLogin } from '@/components/preview/restaurant/categories/CafeCategory';
import { BakeryCategoryLogin } from '@/components/preview/restaurant/categories/BakeryCategory';
import { ChineseCategoryLogin } from '@/components/preview/restaurant/categories/ChineseCategory';
import { VeganCategoryLogin } from '@/components/preview/restaurant/categories/VeganCategory';
import { GeneralCategoryLogin } from '@/components/preview/restaurant/categories/GeneralCategory';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface HeaderContent {
  logoIcon?: string;
  logoUrl?: string;
  companyName?: string;
}

interface LoginConfigContent extends HeaderContent {
  title?: string;
  subtitle?: string;
  btnText?: string;
  illustrationUrl?: string;
}

interface BuilderBlock {
  type: string;
  theme?: string;
  content?: HeaderContent | LoginConfigContent;
}

const themeStyles: Record<string, {
  mainBg: string;
  blob1: string;
  blob2: string;
  logoBadge: string;
  btn: string;
  focusRing: string;
  badgeText: string;
  badgeBg: string;
}> = {
  emerald: {
    mainBg: 'bg-gradient-to-tr from-emerald-50 via-teal-50 to-emerald-50/50 text-slate-800',
    blob1: 'bg-emerald-400/10',
    blob2: 'bg-teal-400/10',
    logoBadge: 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-[0_8px_25px_rgba(16,185,129,0.25)]',
    btn: 'bg-gradient-to-r from-emerald-600 to-teal-650 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-600/15',
    focusRing: 'focus:border-emerald-500 focus:ring-emerald-100',
    badgeText: 'text-emerald-700',
    badgeBg: 'bg-emerald-50/50 border-emerald-200/50',
  },
  sunset: {
    mainBg: 'bg-gradient-to-tr from-amber-50 via-orange-50 to-rose-50 text-slate-800',
    blob1: 'bg-rose-400/10',
    blob2: 'bg-amber-400/10',
    logoBadge: 'bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow-[0_8px_25px_rgba(249,115,22,0.25)]',
    btn: 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-md shadow-orange-500/15',
    focusRing: 'focus:border-orange-500 focus:ring-orange-100',
    badgeText: 'text-orange-700',
    badgeBg: 'bg-orange-50/50 border-orange-200/50',
  },
  deepblue: {
    mainBg: 'bg-gradient-to-tr from-sky-50 via-blue-50 to-indigo-50 text-slate-800',
    blob1: 'bg-cyan-400/10',
    blob2: 'bg-indigo-400/10',
    logoBadge: 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_8px_25px_rgba(37,99,235,0.25)]',
    btn: 'bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-600/15',
    focusRing: 'focus:border-indigo-500 focus:ring-indigo-100',
    badgeText: 'text-indigo-700',
    badgeBg: 'bg-indigo-50/50 border-indigo-200/50',
  },
  purple: {
    mainBg: 'bg-gradient-to-tr from-purple-50 via-fuchsia-50 to-indigo-50 text-slate-800',
    blob1: 'bg-fuchsia-400/10',
    blob2: 'bg-indigo-400/10',
    logoBadge: 'bg-gradient-to-br from-purple-400 to-indigo-600 text-white shadow-[0_8px_25px_rgba(124,58,237,0.25)]',
    btn: 'bg-gradient-to-r from-purple-600 to-indigo-650 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-600/15',
    focusRing: 'focus:border-purple-500 focus:ring-purple-100',
    badgeText: 'text-purple-700',
    badgeBg: 'bg-purple-50/50 border-purple-200/50',
  },
  slate: {
    mainBg: 'bg-gradient-to-tr from-slate-50 via-zinc-100 to-slate-100 text-slate-800',
    blob1: 'bg-slate-300/20',
    blob2: 'bg-zinc-350/20',
    logoBadge: 'bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-[0_8px_25px_rgba(30,41,59,0.25)]',
    btn: 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-850 hover:to-slate-900 text-white shadow-md shadow-slate-700/15',
    focusRing: 'focus:border-slate-500 focus:ring-slate-100',
    badgeText: 'text-slate-700',
    badgeBg: 'bg-slate-100/50 border-slate-200/50',
  },
};

const TEMPLATE_PREVIEW_DETAILS: Record<string, {
  title: string;
  image: string;
  features: Array<{ icon: string; title: string; desc: string }>;
  accentColor: string;
}> = {
  clinic: {
    title: 'Healthcare Network',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    accentColor: 'text-teal-400',
    features: [
      { icon: 'shield', title: 'Secure & Compliant', desc: 'Enterprise-grade security with HIPAA compliance.' },
      { icon: 'bolt', title: 'Smart & Fast', desc: 'Quick access to critical data and tools.' },
      { icon: 'users', title: 'Team Collaboration', desc: 'Seamless communication with your care team.' },
      { icon: 'chart', title: 'Data Insights', desc: 'Real-time analytics for better decisions.' }
    ]
  },
  school: {
    title: 'Campus Intranet',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
    accentColor: 'text-indigo-400',
    features: [
      { icon: 'academic', title: 'Academic Registry', desc: 'Manage course curriculum intake and student directories.' },
      { icon: 'document', title: 'Transcript Control', desc: 'Securely post, track, and publish student grades.' },
      { icon: 'calendar', title: 'Class Timetable', desc: 'Review class schedules, lectures, and assigned teachers.' },
      { icon: 'card', title: 'Tuition Billing', desc: 'Track billing invoices and payments status.' }
    ]
  },
  restaurant: {
    title: 'Dining Workspace',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80',
    accentColor: 'text-orange-400',
    features: [
      { icon: 'utensils', title: 'Table Bookings', desc: 'Instantly confirm, cancel, or complete reservations.' },
      { icon: 'pizza', title: 'Wood-fired Menu', desc: 'Publish and update chef food items and pricing.' },
      { icon: 'document', title: 'Orders Fulfill', desc: 'Manage customer dining bills and kitchen queue lists.' },
      { icon: 'chart', title: 'Kitchen Analytics', desc: 'Track daily restaurant sales and low stock alerts.' }
    ]
  },
  realestate: {
    title: 'Realty Portal Control',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80',
    accentColor: 'text-emerald-400',
    features: [
      { icon: 'home', title: 'Verified Listings', desc: 'Structural properties listing complete with deed documents.' },
      { icon: 'user', title: 'Agent Console', desc: 'Assign inquiries to brokers and log client interactions.' },
      { icon: 'key', title: 'Secure Closings', desc: 'Fully track escrow agreements and digital contract signings.' },
      { icon: 'card', title: 'Invoices Ledger', desc: 'Monitor buyer booking deposits and broker commissions.' }
    ]
  },
  storefront: {
    title: 'Storefront Portal',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    accentColor: 'text-indigo-400',
    features: [
      { icon: 'tag', title: 'Product Inventory', desc: 'Add retail collections, colors, sizes, and stock limits.' },
      { icon: 'truck', title: 'Orders Shipping', desc: 'Fulfill customer shopping orders and update transit status.' },
      { icon: 'gift', title: 'Coupons Campaigns', desc: 'Generate discount codes and track promotion usage rates.' },
      { icon: 'chart', title: 'Sales Analytics', desc: 'Review daily revenue streams, checkout taxes, and top sellers.' }
    ]
  },
  wedding: {
    title: 'Wedding & Event Planner Portal',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    accentColor: 'text-fuchsia-400',
    features: [
      { icon: 'calendar', title: 'Planner Schedule', desc: 'Coordinate wedding dates, guest tables, and location details.' },
      { icon: 'users', title: 'Supplier Network', desc: 'Manage contracted photographers, caterers, florists, and DJs.' },
      { icon: 'document', title: 'Invoices & Receipts', desc: 'Review quotations, bills, advance deposits, and expenses.' },
      { icon: 'chart', title: 'Event Budgeting', desc: 'Track profit margins and crew availability.' }
    ]
  }
};

function getPreviewIcon(iconName: string, colorClass: string) {
  switch (iconName) {
    case 'shield':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'users':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'chart':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'academic':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      );
    case 'document':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'card':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case 'utensils':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      );
    case 'pizza':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'home':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'user':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'key':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m-5 4a5 5 0 01-4.655 5.247A3 3 0 114 14c.647-.006 1.807-.123 2.5-.407a12.09 12.09 0 01.176-.17L12 8a5 5 0 117.5 7.5l-2.001 2.001a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 010-1.414l1.086-1.086a5 5 0 01-.17-5.247" />
        </svg>
      );
    case 'tag':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'truck':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm11 0a2 2 0 11-4 0 2 2 0 014 0zM20 12h-2m0 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v7m11 0a2 2 0 012 2v3h-2M1 10h4m-4 3h2" />
        </svg>
      );
    case 'gift':
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm0 0H4v13a2 2 0 002 2h12a2 2 0 002-2V8h-8z" />
        </svg>
      );
    default:
      return (
        <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

interface GymLoginProps {
  projectId: number;
  companyName: string;
  logoIcon: string;
  logoUrl: string;
  gymBgImage: string;
  loginLayout: string;
  themeColor: string;
  isSignUp: boolean;
  setIsSignUp: (s: boolean) => void;
  errorMessage: string;
  successMessage: string;
  handleLoginSubmit: (e: any) => void;
}

function GymLogin({
  projectId,
  companyName,
  logoIcon,
  logoUrl,
  gymBgImage,
  loginLayout,
  themeColor,
  isSignUp,
  setIsSignUp,
  errorMessage,
  successMessage,
  handleLoginSubmit
}: GymLoginProps) {
  const isSplitLeft = loginLayout === 'split-left-image';
  const isSplitRight = loginLayout === 'split-right-image';
  const isCenteredCard = loginLayout === 'centered-card';
  const isDarkModeMinimal = loginLayout === 'dark-mode-minimal';
  const isTrainerIllustration = loginLayout === 'left-trainer-illustration';
  const isMinimalLogo = loginLayout === 'minimal-logo-focus';
  const isGradientMesh = loginLayout === 'gradient-mesh-bg';
  const isCleanSidePanel = loginLayout === 'clean-side-panel';
  const isGeometric = loginLayout === 'geometric-patterns';
  const isTransparentBlurred = loginLayout === 'transparent-blurred';

  const renderForm = () => (
    <div className="space-y-6">
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[11px] text-red-650 font-bold select-none text-left">
          ⚠️ {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] text-emerald-655 font-bold select-none text-left">
          ✅ {successMessage}
        </div>
      )}

      {!isSignUp && (
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 text-left text-xs font-semibold text-slate-500">
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Quick Demo Login</p>
          <p>Email: <span className="text-slate-800 font-bold">admin@gmail.com</span></p>
          <p>Password: <span className="text-slate-800 font-bold">password123</span></p>
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
        {isSignUp && (
          <div className="space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Full Name *</label>
            <input type="text" name="name" required placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-slate-400 focus:bg-white transition text-slate-805" />
          </div>
        )}
        <div className="space-y-1">
          <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Email Address *</label>
          <input type="email" name="email" required defaultValue={isSignUp ? '' : 'admin@gmail.com'} placeholder="name@domain.com" className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-slate-400 focus:bg-white transition text-slate-805" />
        </div>
        <div className="space-y-1">
          <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Password *</label>
          <input type="password" name="password" required defaultValue={isSignUp ? '' : 'password123'} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-slate-400 focus:bg-white transition text-slate-850" />
        </div>
        {isSignUp && (
          <>
            <div className="space-y-1">
              <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Phone Number</label>
              <input type="tel" name="phone" placeholder="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-slate-400 focus:bg-white transition text-slate-805" />
            </div>
            <div className="space-y-1">
              <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Address</label>
              <input type="text" name="address" placeholder="Mumbai, Maharashtra" className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-slate-400 focus:bg-white transition text-slate-805" />
            </div>
          </>
        )}
        <button type="submit" className="w-full py-3 text-white text-xs font-black rounded-xl shadow-lg transition active:scale-[0.99] border-none cursor-pointer uppercase tracking-wider" style={{ backgroundColor: themeColor }}>
          {isSignUp ? 'Register Member' : 'Access Gym Portal'}
        </button>
      </form>

      <div className="text-center pt-2">
        <button onClick={() => setIsSignUp(!isSignUp)} className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition bg-transparent border-none cursor-pointer">
          {isSignUp ? 'Already registered? Sign In' : 'New member? Sign Up / Register'}
        </button>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
        <Link href={`/preview/${projectId}`} className="text-slate-450 hover:text-slate-650 transition font-bold">
          ← Back to Site
        </Link>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active portal layout</span>
      </div>
    </div>
  );

  if (isSplitLeft) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 text-slate-800 font-sans w-full">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] border border-slate-100">
          <div className="hidden md:flex md:col-span-6 bg-cover bg-center p-10 flex-col justify-between relative text-white" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.80)), url(${gymBgImage})` }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{logoIcon || '💪'}</span>
              <span className="font-black text-sm uppercase tracking-wider">{companyName}</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-black leading-tight uppercase">Push Your Gym Limits</h2>
              <p className="text-white/80 text-xs font-semibold leading-relaxed max-w-xs">Access scheduled workout sessions, member trackers, and visual logs instantly.</p>
            </div>
            <p className="text-[9px] text-white/50 font-bold uppercase tracking-wider">© 2026 {companyName}. Powered by ZATBIZ</p>
          </div>
          <div className="col-span-1 md:col-span-6 p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-sm w-full mx-auto">
              <h3 className="text-xl font-black text-slate-900 tracking-tight text-left mb-6 uppercase">Member Sign In</h3>
              {renderForm()}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isSplitRight) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 text-slate-800 font-sans w-full">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] border border-slate-100">
          <div className="col-span-1 md:col-span-6 p-8 md:p-12 flex flex-col justify-center bg-white order-2 md:order-1">
            <div className="max-w-sm w-full mx-auto">
              <h3 className="text-xl font-black text-slate-900 tracking-tight text-left mb-6 uppercase">Member Sign In</h3>
              {renderForm()}
            </div>
          </div>
          <div className="hidden md:flex md:col-span-6 bg-cover bg-center p-10 flex-col justify-between relative text-white order-1 md:order-2" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.80)), url(${gymBgImage})` }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{logoIcon || '💪'}</span>
              <span className="font-black text-sm uppercase tracking-wider">{companyName}</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-black leading-tight uppercase">Shatter Fitness Limits</h2>
              <p className="text-white/80 text-xs font-semibold leading-relaxed max-w-xs">Track routines, monitor calories, and sync schedule updates instantly.</p>
            </div>
            <p className="text-[9px] text-white/50 font-bold uppercase tracking-wider">© 2026 {companyName}. Powered by ZATBIZ</p>
          </div>
        </div>
      </main>
    );
  }

  if (isCenteredCard) {
    return (
      <main className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative w-full" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.7)), url(${gymBgImage})` }}>
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-white">
          <div className="flex flex-col items-center mb-6">
            <span className="text-3xl p-2.5 bg-white/20 rounded-full border border-white/20 mb-2">{logoIcon || '💪'}</span>
            <h2 className="text-lg font-black uppercase tracking-wider">{companyName}</h2>
          </div>
          {renderForm()}
        </div>
      </main>
    );
  }

  if (isDarkModeMinimal) {
    return (
      <main className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <span className="text-3xl block mb-2">{logoIcon || '💪'}</span>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">{companyName}</h2>
            <p className="text-[10px] text-zinc-550 font-bold mt-1 uppercase">Stealth Member Portal</p>
          </div>
          {renderForm()}
        </div>
      </main>
    );
  }

  if (isTrainerIllustration) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 text-slate-800 font-sans w-full">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] border border-slate-100">
          <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 p-10 flex-col justify-between text-white relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">{logoIcon || '💪'}</span>
              <span className="font-black text-sm uppercase tracking-wider">{companyName}</span>
            </div>
            <div className="space-y-6 z-10 text-left">
              <span className="text-5xl block">🏃</span>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">Sync With Your Trainer</h2>
              <p className="text-slate-350 text-xs font-semibold leading-relaxed">Select schedules, check meal guides, and verify credentials on the fly.</p>
            </div>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">© 2026 {companyName}. Powered by ZATBIZ</p>
          </div>
          <div className="col-span-1 md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-sm w-full mx-auto">
              <h3 className="text-xl font-black text-slate-900 tracking-tight text-left mb-6 uppercase">Member Sign In</h3>
              {renderForm()}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isMinimalLogo) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="space-y-3">
            <div className="w-20 h-20 rounded-full bg-white border border-slate-200/80 shadow-md flex items-center justify-center text-4xl mx-auto">
              {logoIcon || '💪'}
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">{companyName}</h2>
          </div>
          <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-xl">
            {renderForm()}
          </div>
        </div>
      </main>
    );
  }

  if (isGradientMesh) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden w-full">
        <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full filter blur-[120px] opacity-20" style={{ backgroundColor: themeColor }} />
        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full filter blur-[120px] opacity-20" style={{ backgroundColor: themeColor }} />
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-6">
            <span className="text-3xl p-2 bg-slate-50 rounded-2xl border border-slate-100 mb-2">{logoIcon || '💪'}</span>
            <h2 className="text-lg font-black uppercase text-slate-800 tracking-wider">{companyName}</h2>
          </div>
          {renderForm()}
        </div>
      </main>
    );
  }

  if (isCleanSidePanel) {
    return (
      <main className="min-h-screen bg-cover bg-center flex justify-end relative w-full" style={{ backgroundImage: `url(${gymBgImage})` }}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-0" />
        <div className="w-full max-w-md bg-white min-h-screen shadow-2xl p-8 flex flex-col justify-center relative z-10 border-l border-slate-205">
          <div className="max-w-sm w-full mx-auto space-y-6">
            <div className="text-left space-y-2">
              <span className="text-3xl block">{logoIcon || '💪'}</span>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide">{companyName}</h2>
              <p className="text-xs text-slate-400 font-semibold">Welcome back! Please access your portal credentials.</p>
            </div>
            {renderForm()}
          </div>
        </div>
      </main>
    );
  }

  if (isGeometric) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4 relative w-full" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
        backgroundSize: '16px 16px'
      }}>
        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <span className="text-3xl block mb-2">{logoIcon || '💪'}</span>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">{companyName}</h2>
          </div>
          {renderForm()}
        </div>
      </main>
    );
  }

  if (isTransparentBlurred) {
    return (
      <main className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 w-full" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.6)), url(${gymBgImage})` }}>
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl text-white">
          <div className="flex flex-col items-center mb-6">
            <span className="text-3xl p-2 bg-white/10 rounded-2xl border border-white/20 mb-2">{logoIcon || '💪'}</span>
            <h2 className="text-lg font-black uppercase tracking-wider">{companyName}</h2>
          </div>
          {renderForm()}
        </div>
      </main>
    );
  }

  return null;
}

export default function UserWebsiteLoginPage({ params }: PageProps) {
  const { id: projectIdStr } = use(params);
  const projectId = parseInt(projectIdStr, 10);
  const router = useRouter();

  const [theme, setTheme] = useState('slate');
  const [logoIcon, setLogoIcon] = useState('P');
  const [companyName, setCompanyName] = useState('My Brand');
  const [title, setTitle] = useState('Welcome back');
  const [subtitle, setSubtitle] = useState('Enter your credentials to enter the workspace portal');
  const [btnText, setBtnText] = useState('Sign In to Dashboard');
  const [illustrationUrl, setIllustrationUrl] = useState('/images/login_illustration.png');
  const [logoUrl, setLogoUrl] = useState('');
  const [templateId, setTemplateId] = useState('storefront');
  const [loading, setLoading] = useState(true);
  const [shopNiche, setShopNiche] = useState<string | null>(null);
  const [selectedLoginOption, setSelectedLoginOption] = useState<number>(1);

  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [gymInfo, setGymInfo] = useState<any>(null);

  useEffect(() => {
    if (isNaN(projectId)) return;

    // Fetch gym custom layouts
    api.gym.get(projectId)
      .then((gymData) => {
        if (gymData && gymData.projectId) {
          setGymInfo(gymData);
        }
      })
      .catch((e) => console.log('Not gym or offline:', e));

    api.projects
      .get(projectId)
      .then((data: Project) => {
        try {
          const parsed = JSON.parse(data.blocksJson || '[]');
          const blocks = (Array.isArray(parsed) ? parsed : Object.values(parsed.pages || {}).flat()) as BuilderBlock[];

          const headerBlock = blocks.find((block) => block.type === 'header');
          const headerContent = headerBlock?.content as HeaderContent | undefined;
          if (headerContent) {
            if (headerContent.logoIcon) setLogoIcon(headerContent.logoIcon);
            if (headerContent.logoUrl) setLogoUrl(headerContent.logoUrl);
            if (headerContent.companyName) setCompanyName(headerContent.companyName);
          } else {
            setCompanyName(data.name);
          }

          const loginBlock = blocks.find((block) => block.type === 'login_config');
          const lc = loginBlock?.content as LoginConfigContent | undefined;
          if (loginBlock?.theme) {
            setTheme(loginBlock.theme);
          }
          if (lc) {
            if (lc.title) setTitle(lc.title);
            if (lc.subtitle) setSubtitle(lc.subtitle);
            if (lc.btnText) setBtnText(lc.btnText);
            if (lc.illustrationUrl) setIllustrationUrl(lc.illustrationUrl);
            if (lc.logoIcon) setLogoIcon(lc.logoIcon);
            if (lc.logoUrl) setLogoUrl(lc.logoUrl);
            if (lc.companyName) setCompanyName(lc.companyName);
            if ((lc as any).selectedLoginOption) {
              setSelectedLoginOption(Number((lc as any).selectedLoginOption));
            }

            // Determine if illustration is a placeholder, and override with premium Unsplash image
            let finalIllustration = lc.illustrationUrl || '/images/login_illustration.png';
            if (finalIllustration.startsWith('/images/')) {
              const lowerTitle = (lc.title || '').toLowerCase();
              const lowerSubtitle = (lc.subtitle || '').toLowerCase();
              if (lowerTitle.includes('wedding') || lowerSubtitle.includes('wedding') || lowerTitle.includes('event') || lowerSubtitle.includes('event')) {
                finalIllustration = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'; // Wedding / Event
              } else if (lowerTitle.includes('medical') || lowerSubtitle.includes('patient') || lowerSubtitle.includes('clinical') || lowerSubtitle.includes('health')) {
                finalIllustration = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80'; // Clinic/Hospital
              } else if (lowerTitle.includes('academic') || lowerSubtitle.includes('campus') || lowerSubtitle.includes('school')) {
                finalIllustration = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80'; // School
              } else if (lowerTitle.includes('restaurant') || lowerSubtitle.includes('dining') || lowerTitle.includes('kitchen') || lowerTitle.includes('staff portal')) {
                finalIllustration = 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80'; // Restaurant
              } else if (lowerTitle.includes('gym') || lowerSubtitle.includes('workout') || lowerTitle.includes('fitness') || lowerTitle.includes('pass')) {
                finalIllustration = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80'; // Gym
              } else if (lowerTitle.includes('estate') || lowerSubtitle.includes('property') || lowerTitle.includes('broker') || lowerTitle.includes('agent')) {
                finalIllustration = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80'; // Real Estate
              } else {
                finalIllustration = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80'; // Default E-commerce
              }
            }
            setIllustrationUrl(finalIllustration);
          }

          // Retrieve config (self-healing for all templates structure layouts)
          let config: any = {};
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            config = parsed.businessConfig || {};
          } else if (Array.isArray(parsed)) {
            const bizBlock = parsed.find((b: any) => b.type === 'business_config');
            config = bizBlock?.content || {};
          }

          if ((!config.shopNiche || !config.businessType) && parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.pages) {
            for (const pageName of Object.keys(parsed.pages)) {
              const bizBlock = parsed.pages[pageName]?.find((b: any) => b.type === 'business_config');
              if (bizBlock?.content) {
                config = { ...config, ...bizBlock.content };
                break;
              }
            }
          }

          if (config.weddingLoginOption && !((lc as any)?.selectedLoginOption)) {
            setSelectedLoginOption(Number(config.weddingLoginOption));
          }

          const activeNiche = config.shopNiche || null;
          setShopNiche(activeNiche);
          if (activeNiche === 'fashion_men') {
            setIllustrationUrl('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80');
          } else if (activeNiche === 'fashion_women') {
            setIllustrationUrl('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80');
          } else if (activeNiche === 'fashion_kids') {
            setIllustrationUrl('https://images.unsplash.com/photo-1471286174240-e7a8853b5e40?w=600&auto=format&fit=crop&q=80');
          } else if (activeNiche === 'fashion_footwear') {
            setIllustrationUrl('https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80');
          }

          const isRest = config.businessType === 'restaurant' ||
            blocks.some((b: any) => 
              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('restaurant')) ||
              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('restaurant'))
            ) || data.name?.toLowerCase().includes('restaurant') || data.description?.toLowerCase().includes('restaurant');

          const isClinic = blocks.some((b: any) =>
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('medical')) ||
            (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('clinic')) ||
            (b.type === 'features' && b.content?.title?.toLowerCase().includes('department'))
          );

          const isSchool = blocks.some((b: any) =>
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('academic')) ||
            (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('school')) ||
            (b.type === 'pricing' && b.content?.title?.toLowerCase().includes('tuition'))
          );

          const isRealEstate = blocks.some((b: any) =>
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('agent')) ||
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('broker')) ||
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('realty')) ||
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
            (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('realty')) ||
            (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
            (b.type === 'hero' && b.content?.title?.toLowerCase().includes('properties')) ||
            (b.type === 'hero' && (b.content as any)?.btn1Text?.toLowerCase().includes('property'))
          ) ||
          data.name?.toLowerCase().includes('real estate') ||
          data.name?.toLowerCase().includes('properties') ||
          data.name?.toLowerCase().includes('realty') ||
          data.description?.toLowerCase().includes('real estate') ||
          data.description?.toLowerCase().includes('properties');

          const isWedding = config.businessType === 'wedding' ||
                            config.businessType === 'event' ||
                            data.name?.toLowerCase().includes('wedding') ||
                            data.name?.toLowerCase().includes('event') ||
                            data.name?.toLowerCase().includes('planner') ||
                            data.name?.toLowerCase().includes('birthday') ||
                            data.name?.toLowerCase().includes('marriage') ||
                            data.name?.toLowerCase().includes('party') ||
                            data.name?.toLowerCase().includes('celebration') ||
                            data.name?.toLowerCase().includes('ceremony') ||
                            data.name?.toLowerCase().includes('banquet') ||
                            data.name?.toLowerCase().includes('anniversary') ||
                            data.description?.toLowerCase().includes('wedding') ||
                            data.description?.toLowerCase().includes('event') ||
                            data.description?.toLowerCase().includes('planner') ||
                            data.description?.toLowerCase().includes('birthday') ||
                            data.description?.toLowerCase().includes('party') ||
                            data.description?.toLowerCase().includes('celebration') ||
                            blocks.some((b: any) =>
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('event')) ||
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('birthday')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('event')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('birthday'))
                            );

          let detectedTemplate = 'storefront';
          if (isRealEstate) {
            detectedTemplate = 'realestate';
          } else if (isRest) {
            detectedTemplate = 'restaurant';
          } else if (isClinic) {
            detectedTemplate = 'clinic';
          } else if (isSchool) {
            detectedTemplate = 'school';
          } else if (isWedding) {
            detectedTemplate = 'wedding';
          }

          setTemplateId(detectedTemplate);

          setIllustrationUrl((prev) => {
            if (!prev || prev === '/images/login_illustration.png' || prev.startsWith('/images/')) {
              return TEMPLATE_PREVIEW_DETAILS[detectedTemplate]?.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80';
            }
            return prev;
          });

          if (isRealEstate) {
            // Check for real estate
            api.realEstate.get(projectId)
              .then((reData) => {
                if (reData && reData.projectId) {
                  if (reData.themeColor) setTheme(reData.themeColor);
                  if (reData.companyName) setCompanyName(reData.companyName);
                  if (reData.logoUrl) setLogoUrl(reData.logoUrl);
                  if (reData.brandImageUrl) {
                    setIllustrationUrl(reData.brandImageUrl);
                  } else {
                    setIllustrationUrl('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80');
                  }
                }
              })
              .catch((e) => console.log('Not real estate or offline:', e));
          }
        } catch {
          setCompanyName(data.name);
        }
      })
      .catch((err) => {
        console.error('Login page details load error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId]);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const password = (formData.get('password') as string || '');

    if (email === 'admin@gmail.com' || email === 'agent@gmail.com' || email === 'broker@gmail.com') {
      localStorage.setItem('clientEmail', email);
      localStorage.removeItem('clientId');
      router.push(`/preview/${projectId}/dashboard`);
      return;
    }

    if (isSignUp) {
      const name = (formData.get('name') as string || '').trim();
      const phone = (formData.get('phone') as string || '').trim();
      const address = (formData.get('address') as string || '').trim();

      if (!name) {
        setErrorMessage('Full name is required.');
        return;
      }

      try {
        if (templateId === 'restaurant') {
          await api.restaurant.users.register({
            name,
            email,
            password,
            phone,
            address,
            projectId
          });
        } else {
          await api.customers.register({
            name,
            email,
            password,
            phone,
            address,
            projectId
          });
        }
        setSuccessMessage('Account registered successfully! Please sign in.');
        setIsSignUp(false);
      } catch (err: any) {
        console.error(err);
        setErrorMessage(err.message || 'Failed to register account.');
      }
    } else {
      try {
        let res;
        if (templateId === 'restaurant') {
          res = await api.restaurant.users.login({
            email,
            password,
            projectId
          });
        } else {
          res = await api.customers.login({
            email,
            password,
            projectId
          });
        }
        localStorage.setItem('clientEmail', res.email);
        localStorage.setItem('clientId', String(res.id));
        if (res.name) localStorage.setItem('clientName', res.name);
        if (res.phone) localStorage.setItem('clientPhone', res.phone);
        if (res.address) localStorage.setItem('clientAddress', res.address);
        
        router.push(`/preview/${projectId}/dashboard`);
      } catch (err: any) {
        console.warn('Customer login via API failed, falling back to mock session for preview:', err);
        localStorage.setItem('clientEmail', email);
        localStorage.setItem('clientId', 'mock-' + Math.random().toString(36).substring(2, 11));
        localStorage.setItem('clientName', email.split('@')[0]);
        localStorage.setItem('clientPhone', '+91 98765 43210');
        localStorage.setItem('clientAddress', 'Demo Customer Address, Preview Mode');
        
        router.push(`/preview/${projectId}/dashboard`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <span className="h-6 w-6 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Loading secure portal...</p>
        </div>
      </div>
    );
  }

  // Get active styling details
  const activeStyle = themeStyles[theme] || themeStyles.slate;

  if (templateId === 'storefront' && shopNiche === 'fashion_men') {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-0 md:p-6 text-slate-800 font-sans">
        <div className="w-full max-w-5xl bg-white md:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[650px]">
          {/* Left Side: Closet Brand & Illustration */}
          <div className="hidden md:flex md:col-span-5 bg-neutral-900 text-white p-10 flex-col justify-between relative overflow-hidden"
               style={{
                 backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80')",
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight leading-none text-white">
                Closet<span className="text-[#6366f1]">.</span>
              </span>
            </div>
            
            <div className="space-y-6 z-10 text-left my-auto">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">
                🛍️
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-white leading-tight">
                  Welcome Back!
                </h2>
                <p className="text-slate-300 text-xs font-medium leading-relaxed max-w-xs">
                  Login to your account and explore the latest fashion.
                </p>
              </div>
              
              {/* Checkmarks list */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {[
                  { title: 'Fast & Secure Login', desc: 'Secure encryption' },
                  { title: 'Easy Returns', desc: '30-day money-back guarantee' },
                  { title: 'Exclusive Offers', desc: 'Custom seasonal discounts' }
                ].map((chk, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm">✓</span>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-105">{chk.title}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{chk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
              © 2026 Closet. All rights reserved.
            </p>
          </div>

          {/* Right Side: Form */}
          <div className="col-span-1 md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto space-y-8">
              <div className="text-left">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isSignUp ? 'Create Your Account' : 'Login to Your Account'}
                </h2>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {isSignUp ? 'Sign up to register a customer account' : 'Welcome back! Please enter your details.'}
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-bold select-none text-left">
                  ⚠️ {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-600 font-bold select-none text-left">
                  ✅ {successMessage}
                </div>
              )}

              {/* Quick Credentials Card */}
              {!isSignUp && (
                <div className="rounded-2xl border border-slate-100 bg-[#6366f1]/5 p-4 text-left">
                  <p className="text-[9px] font-black uppercase tracking-wider text-[#6366f1]">
                    Quick demo sign in
                  </p>
                  <div className="mt-2 space-y-1 text-xs text-slate-650">
                    <p>
                      <span className="font-bold text-slate-800">Admin Email:</span>{' '}
                      <span className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-[10px] text-[#6366f1] font-bold">admin@gmail.com</span>
                    </p>
                    <p>
                      <span className="font-bold text-slate-800">Customer Email:</span>{' '}
                      <span className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-[10px] text-[#6366f1] font-bold">customer@gmail.com</span>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10 transition"
                    />
                  </div>
                )}

                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    defaultValue={isSignUp ? '' : 'customer@gmail.com'}
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10 transition"
                  />
                </div>

                {isSignUp && (
                  <>
                    <div className="space-y-1.5 text-left">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10 transition"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                        Delivery Address
                      </label>
                      <textarea
                        name="address"
                        rows={2}
                        required
                        placeholder="Enter your street address"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10 transition resize-none"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-450">
                      Password
                    </label>
                    {!isSignUp && (
                      <a href="#" className="text-xs font-bold text-[#6366f1] hover:text-[#4f46e5] transition">
                        Forgot Password?
                      </a>
                    )}
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    defaultValue={isSignUp ? '' : 'password123'}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none focus:bg-white focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 rounded-xl py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-lg shadow-[#6366f1]/10 transition cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-none"
                >
                  {isSignUp ? 'Sign Up' : 'Login'}
                </button>
              </form>

              {/* Social Login Section */}
              {!isSignUp && (
                <div className="space-y-4 pt-2">
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-100"></div>
                    <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">or login with</span>
                    <div className="flex-grow border-t border-slate-100"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => {
                      localStorage.setItem('clientEmail', 'customer@gmail.com');
                      localStorage.setItem('clientName', 'John Doe');
                      localStorage.setItem('clientId', '999');
                      router.push(`/preview/${projectId}/dashboard`);
                    }} className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 bg-white transition cursor-pointer">
                      <span className="text-[#6366f1] font-bold">G</span> Google
                    </button>
                    <button type="button" onClick={() => {
                      localStorage.setItem('clientEmail', 'customer@gmail.com');
                      localStorage.setItem('clientName', 'John Doe');
                      localStorage.setItem('clientId', '999');
                      router.push(`/preview/${projectId}/dashboard`);
                    }} className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 bg-white transition cursor-pointer">
                      <span className="text-[#6366f1] font-bold">F</span> Facebook
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-xs font-extrabold text-[#6366f1] hover:text-[#4f46e5] bg-transparent border-none cursor-pointer"
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (templateId === 'restaurant') {
    const catLower = (shopNiche || '').toLowerCase();
    const loginProps = {
      projectId,
      companyName,
      logoIcon,
      logoUrl,
      isSignUp,
      setIsSignUp,
      errorMessage,
      successMessage,
      handleLoginSubmit
    };

    if (catLower.includes('fine dining') || catLower.includes('dining')) {
      return <FineDiningLogin {...loginProps} />;
    }
    if (catLower.includes('fast food') || catLower.includes('burger')) {
      return <FastFoodLogin {...loginProps} />;
    }
    if (catLower.includes('pizza')) {
      return <PizzaCategoryLogin {...loginProps} />;
    }
    if (
      catLower.includes('indian') ||
      catLower.includes('punjabi') ||
      catLower.includes('biryani') ||
      catLower.includes('tandoori') ||
      catLower.includes('south indian')
    ) {
      return <IndianCategoryLogin {...loginProps} />;
    }
    if (
      catLower.includes('cafe') ||
      catLower.includes('coffee') ||
      catLower.includes('tea') ||
      catLower.includes('roastery')
    ) {
      return <CafeCategoryLogin {...loginProps} />;
    }
    if (
      catLower.includes('bakery') ||
      catLower.includes('cake') ||
      catLower.includes('bread') ||
      catLower.includes('pastry')
    ) {
      return <BakeryCategoryLogin {...loginProps} />;
    }
    if (
      catLower.includes('chinese') ||
      catLower.includes('momo') ||
      catLower.includes('asian') ||
      catLower.includes('thai') ||
      catLower.includes('japanese')
    ) {
      return <ChineseCategoryLogin {...loginProps} />;
    }
    if (
      catLower.includes('vegan') ||
      catLower.includes('vegetarian') ||
      catLower.includes('healthy') ||
      catLower.includes('salad') ||
      catLower.includes('organic')
    ) {
      return <VeganCategoryLogin {...loginProps} />;
    }

    return <GeneralCategoryLogin {...loginProps} />;
  }

  if (templateId === 'gym' || theme.startsWith('gym-') || (gymInfo && gymInfo.projectId)) {
    const gymBgImage = gymInfo?.headerBgImage || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80';
    const loginLayout = gymInfo?.selectedLoginLayout || 'split-left-image';
    const themeColor = GLOBAL_THEME_COLORS[theme] || (THEMES_30.find(t => t.id === theme)?.primaryColor) || gymInfo?.themeColor || '#ea580c';

    return (
      <GymLogin
        projectId={projectId}
        companyName={companyName}
        logoIcon={logoIcon}
        logoUrl={logoUrl}
        gymBgImage={gymBgImage}
        loginLayout={loginLayout}
        themeColor={themeColor}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleLoginSubmit={handleLoginSubmit}
      />
    );
  }

  if (templateId === 'wedding') {
    return (
      <WeddingLogin
        projectId={projectId}
        companyName={companyName}
        logoIcon={logoIcon}
        logoUrl={logoUrl}
        selectedLoginOption={selectedLoginOption}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleLoginSubmit={handleLoginSubmit}
      />
    );
  }

  return (
    <main className={`relative min-h-screen overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${activeStyle.mainBg}`}>
      {/* Background Soft Pastel Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full filter blur-[100px] transition-colors duration-500 ${activeStyle.blob1}`} />
        <div className={`absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full filter blur-[100px] transition-colors duration-500 ${activeStyle.blob2}`} />
      </div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side: Brand & Form Card */}
        <section className="lg:col-span-5 w-full flex flex-col justify-center">
          <div className="glass-panel rounded-3xl p-8 shadow-xl bg-white/85 backdrop-blur-xl border border-slate-200/50">
            {/* Logo and Company Details */}
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl text-base font-black transition-all ${activeStyle.logoBadge}`}>
                  {logoUrl ? (
                    <img src={logoUrl} className="h-full w-full object-contain bg-white/90 p-1.5" alt={`${companyName} logo`} />
                  ) : (
                    <span>{logoIcon}</span>
                  )}
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Preview portal
                  </p>
                  <p className="text-sm font-black text-slate-800 leading-tight">{companyName}</p>
                </div>
              </div>
              <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${activeStyle.badgeText} ${activeStyle.badgeBg}`}>
                Demo access
              </span>
            </div>

            {/* Headers */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-500 mb-3 select-none">
                📍 Branded client login flow
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                {isSignUp ? 'Create your account' : title}
              </h1>
              <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                {isSignUp ? 'Register to manage orders and view profile' : subtitle}
              </p>
            </div>

            {/* Error / Success Alerts */}
            {errorMessage && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-600 font-bold select-none">
                ⚠️ {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-600 font-bold select-none">
                ✅ {successMessage}
              </div>
            )}

            {/* Quick Credentials Info */}
            {!isSignUp && (
              <div className="mb-6 rounded-2xl border border-slate-200/50 bg-slate-50/50 p-4">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Preview credentials
                </p>
                <div className="mt-2 space-y-1 text-xs text-slate-600">
                  <p>
                    <span className="font-bold text-slate-800">Admin email:</span>{' '}
                    <span className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 font-bold text-slate-700">admin@gmail.com</span>
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">Broker email:</span>{' '}
                    <span className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 font-bold text-slate-700">broker@gmail.com</span>
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">Customer email:</span> Any registered email (or click Sign Up below).
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className={`w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${activeStyle.focusRing}`}
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={isSignUp ? '' : "customer@example.com"}
                  className={`w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${activeStyle.focusRing}`}
                  placeholder="customer@example.com"
                />
              </div>

              {isSignUp && (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Contact Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className={`w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${activeStyle.focusRing}`}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Shipping Address
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      className={`w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${activeStyle.focusRing}`}
                      placeholder="Enter delivery address"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  {!isSignUp && (
                    <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-950 transition">
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  defaultValue={isSignUp ? '' : "password123"}
                  className={`w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${activeStyle.focusRing}`}
                  placeholder="Enter your password"
                />
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-slate-350 text-slate-655 cursor-pointer focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="font-semibold">Remember me</span>
                  </label>
                  <span className="text-[10px] font-medium text-slate-400">Fast preview routing</span>
                </div>
              )}

              <button
                type="submit"
                className={`w-full mt-2 rounded-xl py-3 px-4 text-sm font-bold transition cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${activeStyle.btn}`}
              >
                {isSignUp ? 'Sign Up New Account' : btnText}
              </button>
            </form>

            {/* Toggle Sign Up / Log In */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="text-xs font-bold text-slate-500 hover:text-indigo-650 transition underline cursor-pointer bg-transparent border-0"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Back Links */}
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-150 pt-5 text-xs text-slate-500 font-bold">
              <Link href={`/preview/${projectId}`} className="hover:text-slate-800 transition">
                ← Back to Site
              </Link>
              <span className="text-[9px] uppercase tracking-wider text-slate-400">Powered by ZATBIZ</span>
            </div>
          </div>
        </section>

        {/* Right Side: Visual Canvas Frame */}
        <section className="hidden lg:block lg:col-span-7 pl-6">
          <div className="relative w-full max-w-[640px] mx-auto">
            {/* Soft decorative background glow */}
            <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-tr from-white/20 to-white/10 opacity-70 blur-xl" />

            <div className="relative rounded-[36px] border border-slate-200/80 bg-white/95 p-8 shadow-2xl transition duration-500 hover:scale-[1.01] space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 ml-2 select-none uppercase tracking-wider">
                    {companyName.toUpperCase()} AUTHENTICATION PORTAL
                  </span>
                </div>
                <span className="rounded-full bg-emerald-50 border border-emerald-250 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  Active Demo
                </span>
              </div>

              {/* Dynamic Illustration */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 p-2 shadow-inner h-[380px]">
                <img
                  src={illustrationUrl}
                  alt="Custom authentication illustration"
                  className="w-full h-full rounded-xl object-cover select-none"
                  onError={(e) => {
                    e.currentTarget.src = '/images/login_illustration.png';
                  }}
                />
              </div>

              {/* Features dark blue panel */}
              <div className="bg-[#0b2545] text-white rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                {TEMPLATE_PREVIEW_DETAILS[templateId]?.features.map((feat, idx) => (
                  <div key={idx} className="space-y-1 text-left">
                    <div className="flex items-center gap-1.5">
                      {getPreviewIcon(feat.icon, TEMPLATE_PREVIEW_DETAILS[templateId]?.accentColor || 'text-indigo-400')}
                      <span className="font-extrabold text-[9px] tracking-wide uppercase text-slate-100">{feat.title}</span>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-normal font-medium">{feat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Bottom info section */}
              <div className="flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[10px] text-slate-500 font-semibold">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-black">i</span>
                  <p className="leading-relaxed">
                    The authentication portal adapts to your brand with dynamic colors, logos, and context-aware UI components.
                  </p>
                </div>
                <button type="button" className="shrink-0 px-4 py-2 border border-slate-200 hover:bg-slate-100/50 rounded-xl font-extrabold transition cursor-pointer flex items-center gap-1.5 text-[9px] bg-white text-slate-700 shadow-sm">
                  Customize Portal
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// -------------------------------------------------------------
// Wedding & Event Planner: 10 Custom Premium Login Designs
// -------------------------------------------------------------

interface WeddingLoginProps {
  projectId: number;
  companyName: string;
  logoIcon: string;
  logoUrl: string;
  selectedLoginOption: number;
  isSignUp: boolean;
  setIsSignUp: (s: boolean) => void;
  errorMessage: string;
  successMessage: string;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function WeddingLogin({
  projectId,
  companyName,
  logoIcon,
  logoUrl,
  selectedLoginOption,
  isSignUp,
  setIsSignUp,
  errorMessage,
  successMessage,
  handleLoginSubmit
}: WeddingLoginProps) {
  const loginProps = {
    projectId,
    isSignUp,
    setIsSignUp,
    errorMessage,
    successMessage,
    handleLoginSubmit
  };

  // Logo rendering block helper
  const renderLogo = (lightTheme = false) => (
    <div className="flex items-center gap-3 mb-6">
      <div className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl text-base font-black transition-all ${
        lightTheme ? 'bg-indigo-50 text-indigo-650' : 'bg-white/10 text-white border border-white/20'
      }`}>
        {logoUrl ? (
          <img src={logoUrl} className="h-full w-full object-contain bg-white/90 p-1.5" alt="logo" />
        ) : (
          <span>{logoIcon || '💍'}</span>
        )}
      </div>
      <div className="text-left">
        <p className={`text-[9px] font-bold uppercase tracking-wider ${lightTheme ? 'text-slate-400' : 'text-white/50'}`}>Event Portal</p>
        <p className={`text-sm font-black leading-tight ${lightTheme ? 'text-slate-800' : 'text-white'}`}>{companyName}</p>
      </div>
    </div>
  );

  // Option 1: Glassmorphic Overlay
  if (selectedLoginOption === 1) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative font-sans"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80')" }}>
        <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-md z-0" />
        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-white">
          {renderLogo(false)}
          <h2 className="text-2xl font-black text-white text-left tracking-tight mb-2">
            {isSignUp ? 'Join the Celebration' : 'Welcome to event workspace'}
          </h2>
          <p className="text-xs text-white/70 text-left mb-6 leading-relaxed">
            {isSignUp ? 'Register below to access your guest list planner.' : 'Sign in to access vendor checklists, catering selections, and seating charts.'}
          </p>
          <LoginForm
            {...loginProps}
            inputClass="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:bg-white/20 focus:border-white focus:ring-2 focus:ring-white/10"
            labelClass="text-white/80"
            btnClass="w-full mt-4 rounded-xl py-3 px-4 text-sm font-bold text-purple-950 bg-white hover:bg-slate-100 shadow-lg cursor-pointer transition"
            toggleBtnClass="text-xs font-bold text-white hover:underline bg-transparent border-0 cursor-pointer"
            credentialsClass="bg-white/5 border-white/10 text-white/95"
            backLinkClass="text-white/70 hover:text-white transition"
          />
        </div>
      </main>
    );
  }

  // Option 2: Split Screen Left Image
  if (selectedLoginOption === 2) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-stretch text-slate-800 font-sans">
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
             style={{ backgroundImage: "linear-gradient(rgba(139, 92, 246, 0.25), rgba(236, 72, 153, 0.3)), url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80')" }}>
          <div className="absolute bottom-12 left-12 right-12 text-left text-white z-10">
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/10">Premium Ballroom</span>
            <h1 className="text-3xl font-black mt-3 leading-tight">Crafting Unforgettable Moments</h1>
            <p className="text-xs text-white/85 mt-2 leading-relaxed max-w-sm">Access your wedding scheduling board, vendor invoices, and attendee sheets in one single place.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="max-w-md w-full">
            {renderLogo(true)}
            <h2 className="text-2xl font-black text-slate-900 text-left tracking-tight mb-1">
              {isSignUp ? 'Create your planner account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-slate-400 font-semibold text-left mb-6">
              Please enter your details below.
            </p>
            <LoginForm
              {...loginProps}
              inputClass="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              labelClass="text-slate-450"
              btnClass="w-full mt-4 rounded-xl py-3 px-4 text-sm font-bold text-white bg-indigo-650 hover:bg-indigo-700 cursor-pointer shadow-md shadow-indigo-500/15"
              toggleBtnClass="text-xs font-bold text-indigo-650 hover:underline bg-transparent border-0 cursor-pointer"
              credentialsClass="bg-slate-50 border-slate-100 text-slate-600"
              backLinkClass="text-slate-500 hover:text-slate-800 transition"
            />
          </div>
        </div>
      </main>
    );
  }

  // Option 3: Minimalist Dark Purple
  if (selectedLoginOption === 3) {
    return (
      <main className="min-h-screen bg-[#070210] flex items-center justify-center p-4 overflow-hidden relative font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/15 blur-[120px] pointer-events-none z-0" />
        <div className="relative z-10 w-full max-w-md bg-[#120822]/95 border border-purple-900/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.12)] text-slate-300">
          {renderLogo(false)}
          <h2 className="text-2xl font-black text-purple-100 text-left tracking-tight mb-2">
            {isSignUp ? 'Register Portal Account' : 'Portal Command'}
          </h2>
          <p className="text-xs text-purple-400 text-left mb-6 leading-relaxed">
            Enter administrative parameters to monitor checklist telemetry.
          </p>
          <LoginForm
            {...loginProps}
            inputClass="w-full rounded-xl border border-purple-900/60 bg-[#160d29] px-4 py-3 text-sm text-purple-100 outline-none transition focus:bg-[#1a0f30] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            labelClass="text-purple-400"
            btnClass="w-full mt-4 rounded-xl py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 cursor-pointer shadow-lg shadow-purple-950/20"
            toggleBtnClass="text-xs font-bold text-purple-400 hover:underline bg-transparent border-0 cursor-pointer"
            credentialsClass="bg-purple-950/25 border-purple-900/40 text-purple-300"
            backLinkClass="text-purple-400/80 hover:text-purple-300 transition"
          />
        </div>
      </main>
    );
  }

  // Option 4: Watercolor Rose Card
  if (selectedLoginOption === 4) {
    return (
      <main className="min-h-screen bg-[#fff9f9] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white border border-rose-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(244,63,94,0.04)] text-slate-800 relative overflow-hidden">
          {/* Decorative watercolor pink circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
          
          <div className="relative z-10">
            {renderLogo(true)}
            <h2 className="text-2xl font-black text-rose-950 text-left tracking-tight mb-1">
              {isSignUp ? 'Create your Account' : 'Couples Workspace'}
            </h2>
            <p className="text-xs text-rose-600/70 text-left mb-6 font-medium">
              Access your digital floral grids and timeline arrangements.
            </p>
            <LoginForm
              {...loginProps}
              inputClass="w-full rounded-xl border border-rose-200 bg-rose-50/20 px-4 py-3 text-sm text-rose-950 outline-none transition focus:bg-white focus:border-rose-450 focus:ring-4 focus:ring-rose-400/10"
              labelClass="text-rose-500"
              btnClass="w-full mt-4 rounded-xl py-3 px-4 text-sm font-bold text-white bg-rose-500 hover:bg-rose-650 cursor-pointer shadow-md shadow-rose-500/15"
              toggleBtnClass="text-xs font-bold text-rose-500 hover:underline bg-transparent border-0 cursor-pointer"
              credentialsClass="bg-rose-50/50 border-rose-100 text-rose-800"
              backLinkClass="text-rose-450 hover:text-rose-700 transition"
            />
          </div>
        </div>
      </main>
    );
  }

  // Option 5: Serif Classic Editorial
  if (selectedLoginOption === 5) {
    return (
      <main className="min-h-screen bg-[#FCFAF7] flex items-center justify-center p-4 font-serif text-[#3D3325]">
        <div className="w-full max-w-md bg-white border border-[#3D3325]/15 rounded-none p-10 shadow-md relative">
          <div className="absolute inset-2 border border-[#3D3325]/5 pointer-events-none" />
          <div className="relative z-10">
            {renderLogo(true)}
            <h2 className="text-2xl font-black text-[#3D3325] text-left tracking-tight mb-2">
              {isSignUp ? 'Register Credentials' : 'Access the Portal'}
            </h2>
            <p className="text-xs text-[#3D3325]/75 text-left mb-8 font-sans uppercase tracking-widest text-[9px] leading-relaxed">
              Verify administrative signature to manage catering ledgers.
            </p>
            <LoginForm
              {...loginProps}
              isSerif={true}
              inputClass="w-full rounded-none border-b border-[#3D3325]/25 bg-transparent px-0 py-2.5 text-sm text-[#3D3325] outline-none transition focus:border-[#3D3325]/80 focus:ring-0"
              labelClass="text-[#3D3325]/70 uppercase tracking-widest text-[8px] font-sans font-bold"
              btnClass="w-full mt-6 rounded-none py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#3D3325] hover:bg-[#3D3325]/90 transition cursor-pointer font-sans"
              toggleBtnClass="text-xs font-bold uppercase tracking-wide text-[#3D3325]/70 hover:text-[#3D3325] bg-transparent border-0 cursor-pointer font-sans mt-2"
              credentialsClass="bg-[#FAF6F0] border-[#3D3325]/10 text-[#3D3325]/85 font-sans"
              backLinkClass="text-[#3D3325]/60 hover:text-[#3D3325] transition font-sans"
            />
          </div>
        </div>
      </main>
    );
  }

  // Option 6: Clean Left Sidebar
  if (selectedLoginOption === 6) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-stretch text-slate-800 font-sans">
        <div className="w-full md:w-[460px] flex-shrink-0 bg-white shadow-2xl p-8 md:p-12 flex flex-col justify-between relative z-10">
          <div className="my-auto py-8">
            {renderLogo(true)}
            <h2 className="text-2xl font-black text-slate-900 text-left tracking-tight mb-1">
              {isSignUp ? 'Create your Account' : 'Portal Log In'}
            </h2>
            <p className="text-xs text-slate-400 font-semibold text-left mb-6">
              Enter your credential parameters to enter.
            </p>
            <LoginForm
              {...loginProps}
              inputClass="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              labelClass="text-slate-450"
              btnClass="w-full mt-4 rounded-xl py-3 px-4 text-sm font-bold text-white bg-indigo-650 hover:bg-indigo-700 cursor-pointer shadow-md shadow-indigo-500/15"
              toggleBtnClass="text-xs font-bold text-indigo-650 hover:underline bg-transparent border-0 cursor-pointer"
              credentialsClass="bg-slate-50 border-slate-100 text-slate-600"
              backLinkClass="text-slate-500 hover:text-slate-800 transition"
            />
          </div>
          <p className="text-[10px] text-slate-400 text-left">© 2026 {companyName}. Sidebar Style.</p>
        </div>
        <div className="hidden md:block md:flex-1 bg-cover bg-center"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225495810-7512c696505a?w=1200&auto=format&fit=crop&q=80')" }} />
      </main>
    );
  }

  // Option 7: Luminous Glow Card
  if (selectedLoginOption === 7) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative font-sans">
        {/* Animated ambient glow spots */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-650/20 blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-500/15 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl text-slate-200">
          {renderLogo(false)}
          <h2 className="text-2xl font-black text-white text-left tracking-tight mb-2">
            {isSignUp ? 'Sign Up for Access' : 'Luminous Portal'}
          </h2>
          <p className="text-xs text-slate-400 text-left mb-6 leading-relaxed">
            Verify credentials to sync vendor registries and attendee channels.
          </p>
          <LoginForm
            {...loginProps}
            inputClass="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:bg-white/10 focus:border-indigo-400"
            labelClass="text-slate-400"
            btnClass="w-full mt-4 rounded-xl py-3.5 px-4 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-650 cursor-pointer shadow-lg shadow-indigo-550/15"
            toggleBtnClass="text-xs font-bold text-slate-350 hover:underline bg-transparent border-0 cursor-pointer"
            credentialsClass="bg-white/5 border-white/10 text-slate-300"
            backLinkClass="text-slate-400 hover:text-white transition"
          />
        </div>
      </main>
    );
  }

  // Option 8: Royal Golden Crest
  if (selectedLoginOption === 8) {
    return (
      <main className="min-h-screen bg-[#070e24] flex items-center justify-center p-4 font-sans text-slate-250">
        <div className="w-full max-w-md bg-[#0b1432]/95 border-2 border-amber-500/30 rounded-3xl p-8 shadow-2xl relative">
          <div className="absolute inset-1.5 border border-amber-500/10 rounded-[22px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Golden Crest Header */}
            <div className="w-16 h-16 border-2 border-amber-500/40 rounded-full flex items-center justify-center bg-[#070e24] text-amber-400 text-2xl font-serif mb-4 shadow-md shadow-amber-500/5">
              👑
            </div>
            
            {renderLogo(false)}
            
            <h2 className="text-xl font-bold text-amber-100 text-center tracking-tight mb-1 font-serif">
              {isSignUp ? 'Establish Royal Access' : 'Royal Concierge'}
            </h2>
            <p className="text-[10px] text-amber-500/80 text-center uppercase tracking-widest mb-6">
              Wedding & Event Planner Command Console
            </p>
            
            <LoginForm
              {...loginProps}
              inputClass="w-full rounded-xl border border-amber-500/25 bg-[#0f1b42] px-4 py-3 text-sm text-amber-100 outline-none transition focus:border-amber-400 focus:bg-[#132252]"
              labelClass="text-amber-400/80"
              btnClass="w-full mt-4 rounded-xl py-3.5 px-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 cursor-pointer shadow-md shadow-amber-500/10"
              toggleBtnClass="text-xs font-bold text-amber-450 hover:underline bg-transparent border-0 cursor-pointer"
              credentialsClass="bg-[#0f1b42] border-amber-500/20 text-amber-300"
              backLinkClass="text-amber-400/60 hover:text-amber-400 transition"
            />
          </div>
        </div>
      </main>
    );
  }

  // Option 9: Retro Sunset Gradient
  if (selectedLoginOption === 9) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-450 via-orange-450 to-amber-300 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white border-none rounded-[32px] p-8 shadow-2xl text-slate-800">
          {renderLogo(true)}
          <h2 className="text-2xl font-black text-rose-950 text-left tracking-tight mb-1">
            {isSignUp ? 'Create Planner Profile' : 'Access your Dashboard'}
          </h2>
          <p className="text-xs text-slate-400 font-semibold text-left mb-6">
            Enter details to open sunset party timelines.
          </p>
          <LoginForm
            {...loginProps}
            inputClass="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:border-rose-450 focus:ring-4 focus:ring-rose-400/10"
            labelClass="text-slate-450"
            btnClass="w-full mt-4 rounded-xl py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 cursor-pointer shadow-md shadow-rose-500/15"
            toggleBtnClass="text-xs font-bold text-rose-500 hover:underline bg-transparent border-0 cursor-pointer"
            credentialsClass="bg-slate-50 border-slate-100 text-slate-600"
            backLinkClass="text-rose-500 hover:text-rose-700 transition"
          />
        </div>
      </main>
    );
  }

  // Option 10: Stark High-Contrast
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-mono text-black">
      <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left">
        {renderLogo(true)}
        <h2 className="text-2xl font-black uppercase text-black tracking-tight mb-1">
          {isSignUp ? 'REGISTER ACCOUNT' : 'SECURE LOG IN'}
        </h2>
        <p className="text-[10px] text-slate-500 font-extrabold uppercase mb-6 leading-relaxed">
          [ STARK HIGH-CONTRAST WEDDING PORTAL TEMPLATE ]
        </p>
        <LoginForm
          {...loginProps}
          isMono={true}
          inputClass="w-full rounded-none border-2 border-black bg-white px-4 py-2.5 text-sm text-black outline-none font-bold focus:bg-yellow-50"
          labelClass="text-black font-black uppercase text-[10px]"
          btnClass="w-full mt-4 rounded-none py-3.5 px-4 text-sm font-black uppercase tracking-wider text-black bg-yellow-350 hover:bg-yellow-400 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          toggleBtnClass="text-xs font-black uppercase underline text-black bg-transparent border-0 cursor-pointer mt-2"
          credentialsClass="bg-white border-2 border-black text-black"
          backLinkClass="text-black font-bold underline hover:text-slate-800 transition"
        />
      </div>
    </main>
  );
}

// -------------------------------------------------------------
// Shared Login Form Sub-Component for Wedding Template
// -------------------------------------------------------------

interface LoginFormProps {
  projectId: number;
  isSignUp: boolean;
  setIsSignUp: (s: boolean) => void;
  errorMessage: string;
  successMessage: string;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputClass: string;
  labelClass: string;
  btnClass: string;
  toggleBtnClass: string;
  credentialsClass: string;
  backLinkClass: string;
  isMono?: boolean;
  isSerif?: boolean;
}

function LoginForm({
  projectId,
  isSignUp,
  setIsSignUp,
  errorMessage,
  successMessage,
  handleLoginSubmit,
  inputClass,
  labelClass,
  btnClass,
  toggleBtnClass,
  credentialsClass,
  backLinkClass,
  isMono = false,
  isSerif = false
}: LoginFormProps) {
  return (
    <div className={`w-full ${isSerif ? 'font-serif' : isMono ? 'font-mono' : 'font-sans'}`}>
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-650 font-bold select-none text-left">
          ⚠️ {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-650 font-bold select-none text-left">
          ✅ {successMessage}
        </div>
      )}

      {/* Quick Credentials Card */}
      {!isSignUp && (
        <div className={`mb-4 p-3 rounded-xl text-left border ${credentialsClass}`}>
          <p className="text-[9px] font-black uppercase tracking-wider opacity-60">
            Quick demo credentials
          </p>
          <div className="mt-2 space-y-1 text-xs">
            <p>
              <span className="font-bold">Admin:</span>{' '}
              <span className="bg-white/10 border border-white/20 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold">admin@gmail.com</span>
            </p>
            <p>
              <span className="font-bold">Customer:</span>{' '}
              <span className="bg-white/10 border border-white/20 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold">customer@gmail.com</span>
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        {isSignUp && (
          <div className="space-y-1.5 text-left">
            <label className={`block text-[10px] font-black uppercase tracking-wider ${labelClass}`}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. John Doe"
              className={inputClass}
            />
          </div>
        )}

        <div className="space-y-1.5 text-left">
          <label className={`block text-[10px] font-black uppercase tracking-wider ${labelClass}`}>
            Email address
          </label>
          <input
            type="email"
            name="email"
            required
            defaultValue={isSignUp ? '' : 'customer@gmail.com'}
            placeholder="Enter email address"
            className={inputClass}
          />
        </div>

        {isSignUp && (
          <>
            <div className="space-y-1.5 text-left">
              <label className={`block text-[10px] font-black uppercase tracking-wider ${labelClass}`}>
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                required
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className={`block text-[10px] font-black uppercase tracking-wider ${labelClass}`}>
                Delivery Address
              </label>
              <textarea
                name="address"
                rows={2}
                required
                placeholder="Enter your street address"
                className={`${inputClass} resize-none`}
              />
            </div>
          </>
        )}

        <div className="space-y-1.5 text-left">
          <div className="flex justify-between items-center">
            <label className={`block text-[10px] font-black uppercase tracking-wider ${labelClass}`}>
              Password
            </label>
            {!isSignUp && (
              <a href="#" className={`text-xs font-semibold ${backLinkClass}`}>
                Forgot Password?
              </a>
            )}
          </div>
          <input
            type="password"
            name="password"
            required
            defaultValue={isSignUp ? '' : 'password123'}
            placeholder="Enter your password"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className={btnClass}
        >
          {isSignUp ? 'Sign Up' : 'Login to Portal'}
        </button>
      </form>

      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className={toggleBtnClass}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs">
        <Link href={`/preview/${projectId}`} className={backLinkClass}>
          ← Back to Site
        </Link>
        <span className="text-[9px] uppercase tracking-wider opacity-50 font-semibold">Powered by ZATBIZ</span>
      </div>
    </div>
  );
}


