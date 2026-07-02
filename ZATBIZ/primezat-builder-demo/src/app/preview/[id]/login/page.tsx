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

import RestaurantLogin from '@/components/preview/templates/restaurant/Login';
import HospitalLogin from '@/components/preview/templates/hospital/Login';
import SchoolLogin from '@/components/preview/templates/school/Login';
import GymLogin from '@/components/preview/templates/gym/Login';
import WeddingLogin from '@/components/preview/templates/wedding/Login';
import RealEstateLogin from '@/components/preview/templates/realestate/Login';
import MedicalShopLogin from '@/components/preview/templates/medical-shop/Login';
import StorefrontLogin from '@/components/preview/templates/storefront/Login';

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
          const blocks = (Array.isArray(parsed) ? parsed : Object.values(parsed.pages || {}).flat()) as any[];

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
                         data.name?.toLowerCase().includes('restaurant') ||
                         data.description?.toLowerCase().includes('restaurant') ||
                         blocks.some((b) => b.type === 'pricing' && b.content?.title?.toLowerCase().includes('chef')) ||
                         blocks.some((b) => b.type === 'login_config' && b.content?.title?.toLowerCase().includes('restaurant'));

          const isClinic = config.businessType === 'hospital' ||
                           config.businessType === 'clinic' ||
                           data.name?.toLowerCase().includes('hospital') ||
                           data.name?.toLowerCase().includes('clinic') ||
                           data.name?.toLowerCase().includes('health') ||
                           data.name?.toLowerCase().includes('hope care') ||
                           blocks.some((b) =>
                             (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('medical')) ||
                             (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('clinic')) ||
                             (b.type === 'features' && b.content?.title?.toLowerCase().includes('department'))
                           );

          const isSchool = config.businessType === 'school' ||
                           data.name?.toLowerCase().includes('school') ||
                           data.name?.toLowerCase().includes('academy') ||
                           data.name?.toLowerCase().includes('college') ||
                           blocks.some((b) =>
                             (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('academic')) ||
                             (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('school')) ||
                             (b.type === 'pricing' && b.content?.title?.toLowerCase().includes('tuition'))
                           );

          const isRealEstate = config.businessType === 'realestate' ||
            blocks.some((b) =>
              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('agent')) ||
              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('broker')) ||
              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('realty')) ||
              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('realty')) ||
              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
              (b.type === 'hero' && b.content?.title?.toLowerCase().includes('properties')) ||
              (b.type === 'hero' && b.content?.btn1Text?.toLowerCase().includes('property'))
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
                            blocks.some((b) =>
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('event')) ||
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('birthday')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('event')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('birthday'))
                            );

          const isMedicalShop = config.businessType === 'medical-shop' ||
            blocks.some((b) =>
              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('medical shop')) ||
              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('pharmacy')) ||
              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('apothecary')) ||
              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('pharmacy')) ||
              (b.type === 'business_config' && (b.content?.businessType === 'medical-shop' || b.content?.shopNiche === 'medical-shop'))
            ) ||
            data.name?.toLowerCase().includes('medical shop') ||
            data.name?.toLowerCase().includes('pharmacy') ||
            data.description?.toLowerCase().includes('medical shop') ||
            data.description?.toLowerCase().includes('pharmacy');

          const isGym = config.businessType === 'gym' ||
            blocks.some((b) =>
              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('gym')) ||
              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('fitness')) ||
              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('gym')) ||
              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('fitness')) ||
              (b.type === 'business_config' && (b.content?.businessType === 'gym' || b.content?.shopNiche === 'gym'))
            ) ||
            data.name?.toLowerCase().includes('gym') ||
            data.name?.toLowerCase().includes('fitness') ||
            data.description?.toLowerCase().includes('gym') ||
            data.description?.toLowerCase().includes('fitness');

          let detectedTemplate = 'storefront';
          if (config.businessType === 'hospital' || config.businessType === 'clinic') {
            detectedTemplate = 'clinic';
          } else if (config.businessType === 'school') {
            detectedTemplate = 'school';
          } else if (config.businessType === 'gym') {
            detectedTemplate = 'gym';
          } else if (config.businessType === 'restaurant') {
            detectedTemplate = 'restaurant';
          } else if (config.businessType === 'wedding' || config.businessType === 'event') {
            detectedTemplate = 'wedding';
          } else if (config.businessType === 'realestate') {
            detectedTemplate = 'realestate';
          } else if (config.businessType === 'medical-shop') {
            detectedTemplate = 'medical-shop';
          } else if (isMedicalShop) {
            detectedTemplate = 'medical-shop';
          } else if (isRealEstate) {
            detectedTemplate = 'realestate';
          } else if (isRest) {
            detectedTemplate = 'restaurant';
          } else if (isClinic) {
            detectedTemplate = 'clinic';
          } else if (isSchool) {
            detectedTemplate = 'school';
          } else if (isWedding) {
            detectedTemplate = 'wedding';
          } else if (isGym) {
            detectedTemplate = 'gym';
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

    const loginProps = {
    projectId,
    isSignUp,
    setIsSignUp,
    companyName,
    logoUrl,
    logoIcon,
    errorMessage,
    successMessage,
    handleLoginSubmit,
  };

  switch (templateId) {
    case 'restaurant':
      return <RestaurantLogin {...loginProps} shopNiche={shopNiche} themePreset={theme} />;
    case 'clinic':
      return <HospitalLogin {...loginProps} />;
    case 'school':
      return <SchoolLogin {...loginProps} />;
    case 'gym':
      return <GymLogin {...loginProps} />;
    case 'wedding':
      return <WeddingLogin {...loginProps} />;
    case 'realestate':
      return <RealEstateLogin {...loginProps} />;
    case 'medical-shop':
      return <MedicalShopLogin {...loginProps} />;
    default:
      return <StorefrontLogin {...loginProps} />;
  }
}
