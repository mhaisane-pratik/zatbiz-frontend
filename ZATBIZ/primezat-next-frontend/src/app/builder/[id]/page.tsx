'use client';

import { useEffect, useState, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { useToast } from '@/hooks/useToast';
import { Block, Project, Product } from '@/types';
import ToastContainer from '@/components/common/ToastContainer';
import AiSidekick from '@/components/common/AiSidekick';
import BuilderHeader from '@/components/builder/BuilderHeader';
import BlockLibrary from '@/components/builder/BlockLibrary';
import PageOutline from '@/components/builder/PageOutline';
import CanvasContainer from '@/components/builder/CanvasContainer';
import BlockPreview from '@/components/builder/BlockPreview';
import { THEMES_30 } from '@/app/dashboard/themesData';
import ProductCatalog from '@/components/builder/ProductCatalog';
import ProductModal from '@/components/builder/ProductModal';
import ConfigSidebar from '@/components/builder/ConfigSidebar';
import SiteSettingsPanel from '@/components/builder/SiteSettingsPanel';

import { useBuilderProject } from '@/hooks/useBuilderProject';
import { useBuilderCanvas } from '@/hooks/useBuilderCanvas';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { useFormBuilderState } from '@/hooks/useFormBuilderState';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface DashboardTheme {
  mainBg: string;
  asideBg: string;
  headerBg: string;
  asideBorder: string;
  headerBorder: string;
  cardBg: string;
  cardBorder: string;
  primaryBtn: string;
  activeTab: string;
  accentText: string;
  accentBg: string;
  fontClass: string;
  decorIcon: string;
}

const getDashboardTheme = (opt: number): DashboardTheme => {
  const themes: Record<number, DashboardTheme> = {
    1: {
      mainBg: 'bg-gradient-to-tr from-purple-950/40 via-slate-950 to-indigo-950/30 text-slate-105',
      asideBg: 'bg-slate-950/90 backdrop-blur-xl',
      headerBg: 'bg-slate-950/40 backdrop-blur-md',
      asideBorder: 'border-r border-slate-900',
      headerBorder: 'border-b border-slate-900',
      cardBg: 'bg-slate-950/50 backdrop-blur-sm',
      cardBorder: 'border border-purple-900/30',
      primaryBtn: 'bg-gradient-to-r from-purple-650 to-indigo-650 hover:from-purple-750 hover:to-indigo-750 text-white',
      activeTab: 'bg-purple-600 text-white shadow-lg border-l-4 border-purple-500',
      accentText: 'text-purple-400',
      accentBg: 'bg-purple-500/10 border border-purple-500/25 text-purple-400',
      fontClass: 'font-sans',
      decorIcon: '💍'
    },
    2: {
      mainBg: 'bg-black text-slate-100',
      asideBg: 'bg-[#090514]',
      headerBg: 'bg-[#090514]/90',
      asideBorder: 'border-r border-purple-950',
      headerBorder: 'border-b border-purple-950',
      cardBg: 'bg-[#100b21]',
      cardBorder: 'border border-purple-950 hover:border-purple-800',
      primaryBtn: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white',
      activeTab: 'bg-purple-950/40 text-fuchsia-400 border-l-4 border-fuchsia-500 shadow-[0_0_15px_rgba(240,70,250,0.1)]',
      accentText: 'text-fuchsia-400',
      accentBg: 'bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400',
      fontClass: 'font-sans',
      decorIcon: '⚡'
    },
    3: {
      mainBg: 'bg-[#FCFAF7] text-[#3d3325]',
      asideBg: 'bg-[#FAF6F0]',
      headerBg: 'bg-[#FAF6F0]',
      asideBorder: 'border-r border-amber-900/15',
      headerBorder: 'border-b border-amber-900/15',
      cardBg: 'bg-white',
      cardBorder: 'border border-amber-900/20 shadow-sm',
      primaryBtn: 'bg-amber-955 hover:bg-amber-900 text-white font-serif',
      activeTab: 'bg-[#F5EFE6] text-amber-900 font-bold border-l-4 border-amber-800',
      accentText: 'text-amber-850',
      accentBg: 'bg-amber-100/50 border border-amber-200/50 text-amber-900',
      fontClass: 'font-serif',
      decorIcon: '👑'
    },
    4: {
      mainBg: 'bg-slate-50 text-slate-800',
      asideBg: 'bg-slate-900 text-slate-100',
      headerBg: 'bg-white',
      asideBorder: 'border-r border-slate-200',
      headerBorder: 'border-b border-slate-200',
      cardBg: 'bg-white',
      cardBorder: 'border border-slate-200 shadow-md',
      primaryBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
      activeTab: 'bg-slate-800 text-white border-l-4 border-blue-500 shadow-inner',
      accentText: 'text-blue-600',
      accentBg: 'bg-blue-50 border border-blue-100 text-blue-700',
      fontClass: 'font-sans',
      decorIcon: '📊'
    },
    5: {
      mainBg: 'bg-[#FFF9F9] text-[#4c0519]',
      asideBg: 'bg-rose-50',
      headerBg: 'bg-rose-50/70 backdrop-blur-md',
      asideBorder: 'border-r border-rose-150',
      headerBorder: 'border-b border-rose-150',
      cardBg: 'bg-white',
      cardBorder: 'border border-rose-100 shadow-sm rounded-3xl',
      primaryBtn: 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm',
      activeTab: 'bg-rose-500 text-white shadow border-l-4 border-rose-600',
      accentText: 'text-rose-600',
      accentBg: 'bg-rose-500/10 border border-rose-500/20 text-rose-600',
      fontClass: 'font-sans',
      decorIcon: '🌸'
    },
    6: {
      mainBg: 'bg-slate-50 text-slate-855',
      asideBg: 'bg-[#FAF8FF]',
      headerBg: 'bg-[#FAF8FF]/80 backdrop-blur',
      asideBorder: 'border-r border-purple-100',
      headerBorder: 'border-b border-purple-100',
      cardBg: 'bg-white',
      cardBorder: 'border border-purple-50 shadow-md rounded-[24px]',
      primaryBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      activeTab: 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500 font-bold',
      accentText: 'text-indigo-650',
      accentBg: 'bg-indigo-50 border border-indigo-100 text-indigo-700',
      fontClass: 'font-sans',
      decorIcon: '🕊️'
    },
    7: {
      mainBg: 'bg-[#FFFBF7] text-[#5C4533]',
      asideBg: 'bg-[#FFF0E6]',
      headerBg: 'bg-[#FFF5EE]',
      asideBorder: 'border-r border-orange-100',
      headerBorder: 'border-b border-orange-100',
      cardBg: 'bg-white',
      cardBorder: 'border border-orange-100 shadow-[0_8px_30px_rgba(255,240,230,0.3)] rounded-[28px]',
      primaryBtn: 'bg-orange-500 hover:bg-orange-600 text-white rounded-2xl',
      activeTab: 'bg-orange-500 text-white border-l-4 border-orange-600 rounded-xl',
      accentText: 'text-orange-600',
      accentBg: 'bg-orange-50 border border-orange-100 text-orange-755 font-bold',
      fontClass: 'font-sans',
      decorIcon: '🎈'
    },
    8: {
      mainBg: 'bg-slate-900 text-slate-105',
      asideBg: 'bg-slate-950',
      headerBg: 'bg-slate-950',
      asideBorder: 'border-r border-slate-800',
      headerBorder: 'border-b border-slate-800',
      cardBg: 'bg-slate-955',
      cardBorder: 'border border-slate-800 rounded-xl',
      primaryBtn: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold',
      activeTab: 'bg-slate-800 text-white border-l-4 border-slate-400 font-bold',
      accentText: 'text-slate-300',
      accentBg: 'bg-slate-800 border border-slate-700 text-slate-300',
      fontClass: 'font-sans',
      decorIcon: '📊'
    },
    9: {
      mainBg: 'bg-[#FAF8F5] text-slate-800',
      asideBg: 'bg-[#F5F1E9]',
      headerBg: 'bg-[#F5F1E9]',
      asideBorder: 'border-r border-purple-200/50',
      headerBorder: 'border-b border-purple-200/50',
      cardBg: 'bg-white',
      cardBorder: 'border border-purple-100 shadow-sm rounded-3xl',
      primaryBtn: 'bg-purple-600 hover:bg-purple-700 text-white font-bold',
      activeTab: 'bg-purple-500 text-white border-l-4 border-purple-600',
      accentText: 'text-purple-650',
      accentBg: 'bg-purple-50 border border-purple-100 text-purple-700',
      fontClass: 'font-sans',
      decorIcon: '🦄'
    },
    10: {
      mainBg: 'bg-[#040608] text-[#D8E6D8]',
      asideBg: 'bg-[#090D12]',
      headerBg: 'bg-[#090D12]',
      asideBorder: 'border-r-2 border-emerald-950',
      headerBorder: 'border-b-2 border-emerald-955',
      cardBg: 'bg-[#0B1218]',
      cardBorder: 'border-2 border-emerald-950 hover:border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.02)]',
      primaryBtn: 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black border-2 border-emerald-400 rounded-none shadow-[2px_2px_0_0_rgba(16,185,129,0.2)]',
      activeTab: 'bg-emerald-950/40 text-emerald-455 border-l-4 border-emerald-500',
      accentText: 'text-emerald-400 font-bold',
      accentBg: 'bg-emerald-950 border border-emerald-900 text-emerald-400',
      fontClass: 'font-mono',
      decorIcon: '👾'
    }
  };
  return themes[opt] || themes[1];
};

export default function BuilderPage({ params }: PageProps) {
  const router = useRouter();
  const { id: projectIdStr } = use(params);
  const projectId = parseInt(projectIdStr, 10);

  const { toasts, showToast, removeToast } = useToast();

  const [canvasWidth, setCanvasWidth] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePage, setActivePage] = useState<'landing' | 'login' | 'dashboard' | 'products' | 'settings'>('landing');
  const [sidebarTab, setSidebarTab] = useState<'pages' | 'components' | 'media' | 'forms' | 'seo' | 'theme' | 'publish'>('pages');
  const [dashboardView, setDashboardView] = useState<'user' | 'admin'>('user');
  const [userDashboardTab, setUserDashboardTab] = useState<'orders' | 'bookings' | 'wishlist' | 'addresses' | 'settings'>('orders');

  // Database product states
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // 1. Ref to break the circular dependency loop between useBuilderProject and useBuilderCanvas
  const onLoadSuccessRef = useRef<(
    pages: Record<string, Block[]>,
    activePages: string[],
    currentPage: string,
    config: any
  ) => void>(() => {});

  // 2. Project hook
  const projectProps = useBuilderProject({
    projectId,
    showToast,
    onLoadSuccess: (pages, activePages, currentPage, config) => {
      onLoadSuccessRef.current(pages, activePages, currentPage, config);
    }
  });

  const {
    project,
    setProject,
    projectName,
    setProjectName,
    status,
    setStatus,
    projectConfig,
    setProjectConfig,
    loading,
    setLoading,
    triggerAutosave,
    saveLayout,
  } = projectProps;

  // 3. Canvas hook
  const canvas = useBuilderCanvas({
    projectId,
    projectName,
    projectConfig,
    saveLayout,
    triggerAutosave,
    showToast,
  });

  const {
    pages,
    setPages,
    activePages,
    setActivePages,
    currentPage,
    setCurrentPage,
    blocks,
    setBlocks,
    activeBlockId,
    setActiveBlockId,
    syncBlocks,
    handleCreatePage,
    handleAddBlock,
    deleteBlock,
    handleOutlineDelete,
    handleReorderOutline,
    moveBlock,
    updateBlockContent,
    updateBlockTheme,
    handleAiAction,
  } = canvas;

  // Assign the ref handler to bridge asynchronous project load to canvas state
  onLoadSuccessRef.current = (loadedPages, loadedActivePages, loadedCurrentPage, loadedConfig) => {
    setPages(loadedPages);
    setActivePages(loadedActivePages);
    setCurrentPage(loadedCurrentPage);
    setBlocks(loadedPages[loadedCurrentPage] || []);
  };

  // 4. Media Library hook
  const { mediaAssets, setMediaAssets } = useMediaLibrary(projectId);

  // 5. Form Builder hook
  const {
    customForms,
    setCustomForms,
    mockFormSubmissions,
    setMockFormSubmissions
  } = useFormBuilderState();

  // Fetch products from backend H2 database
  const fetchDbProducts = () => {
    if (isNaN(projectId)) return;
    api.products
      .list(projectId)
      .then((data) => setDbProducts(data))
      .catch((err) => console.error('Error loading database products:', err));
  };

  useEffect(() => {
    fetchDbProducts();
  }, [projectId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const tab = searchParams.get('tab');
      if (tab === 'products') {
        setActivePage('products');
      } else if (tab === 'settings') {
        setActivePage('settings');
      } else if (tab === 'landing') {
        setActivePage('landing');
      }
    }
  }, []);

  const handleSaveDraft = () => {
    saveLayout(pages, activePages, currentPage, projectConfig, projectName, 'Draft', false);
  };

  const handlePublish = () => {
    saveLayout(pages, activePages, currentPage, projectConfig, projectName, 'Published', false);
  };

  // Product CRUD
  const handleProductSubmit = async (data: Omit<Product, 'projectId'>) => {
    const payload = {
      ...data,
      projectId: projectId,
    };

    try {
      if (editingProduct && editingProduct.id !== undefined) {
        await api.products.update(editingProduct.id, { ...payload, id: editingProduct.id });
        showToast('Product Updated!');
      } else {
        await api.products.create(payload);
        showToast('Product Created!');
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
      fetchDbProducts();
    } catch (err) {
      console.error('Product save error:', err);
      showToast('Failed to save product in database.', true);
    }
  };

  const handleProductDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.products.delete(id);
      showToast('Product deleted from catalog!');
      fetchDbProducts();
    } catch (err) {
      console.error('Delete product error:', err);
      showToast('Failed to delete product.', true);
    }
  };

  const handleOpenProductEdit = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleOpenProductAdd = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-6 h-6 border-2 border-indigo-650 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Loading workspace files...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm font-semibold text-rose-600">Website Project not found in database.</p>
      </div>
    );
  }

  const activeBlock = blocks.find((b) => b.id === activeBlockId);

  // Render Page Canvas Inside Simulator
  const renderPageCanvasContent = () => {
    if (activePage === 'landing') {
      const landingBlocks = blocks.filter(
        (b) => b.type !== 'login_config' && b.type !== 'dashboard_config'
      );
      if (landingBlocks.length === 0) {
        return (
          <div className="h-full min-h-[300px] flex items-center justify-center text-slate-450 text-xs border-2 border-dashed border-slate-200 rounded-xl m-8 p-12 text-center font-medium leading-relaxed">
            Click blocks in the left catalog library to add them to your page canvas.
          </div>
        );
      }
      return (
        <div className="divide-y divide-slate-100">
          {landingBlocks.map((block) => (
            <div
              key={block.id}
              onClick={() => setActiveBlockId(block.id)}
              className={`group relative border border-transparent hover:border-indigo-500/40 transition-colors cursor-pointer ${
                activeBlockId === block.id ? '!border-indigo-500 ring-1 ring-indigo-500/10' : ''
              }`}
            >
              <BlockPreview 
                block={block} 
                dbProducts={dbProducts} 
                buttonStyle={projectConfig.buttonStyle}
                fontStyle={projectConfig.fontStyle}
              />

              {/* Floating editor toolbar */}
              <div className="absolute top-3 right-3 bg-white border border-slate-200 rounded-md p-1 hidden group-hover:flex gap-1 shadow z-20">
                {block.type !== 'header' && block.type !== 'footer' && (
                  <>
                    <span className="w-6 h-6 flex items-center justify-center text-[10px] text-slate-350 cursor-grab select-none font-extrabold">
                      ⠿
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(block.id, -1);
                      }}
                      className="w-6 h-6 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 rounded hover:bg-slate-50 cursor-pointer font-bold"
                    >
                      ▲
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(block.id, 1);
                      }}
                      className="w-6 h-6 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 rounded hover:bg-slate-50 cursor-pointer font-bold"
                    >
                      ▼
                    </button>
                  </>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBlock(block.id);
                  }}
                  className="w-6 h-6 flex items-center justify-center text-xs text-rose-600 hover:bg-rose-50 rounded cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (activePage === 'login') {
      const loginBlock = blocks.find((b) => b.type === 'login_config') || {
        id: 'login-config-block',
        type: 'login_config',
        theme: 'slate',
        content: {
          title: 'Welcome back',
          subtitle: 'Enter your credentials',
          btnText: 'Sign In',
          logoIcon: '🛍️',
          illustrationUrl: '/images/login_illustration.png',
        },
      };
      const lc = loginBlock.content;

      // Dynamic template detection logic matching preview
      let detectedTemplate = 'storefront';
      const isRealEstate = blocks.some((b: any) =>
        (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('agent')) ||
        (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('broker')) ||
        (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('realty')) ||
        (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
        (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('realty')) ||
        (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
        (b.type === 'hero' && b.content?.title?.toLowerCase().includes('properties')) ||
        (b.type === 'hero' && b.content?.btn1Text?.toLowerCase().includes('property'))
      ) ||
      projectName?.toLowerCase().includes('real estate') ||
      projectName?.toLowerCase().includes('properties') ||
      projectName?.toLowerCase().includes('realty');

      const isRest = projectConfig?.businessType === 'restaurant' ||
                     projectName?.toLowerCase().includes('restaurant') ||
                     projectName?.toLowerCase().includes('dining') ||
                     blocks.some((b: any) => b.type === 'pricing' && b.content?.title?.toLowerCase().includes('chef')) ||
                     blocks.some((b: any) => b.type === 'login_config' && b.content?.title?.toLowerCase().includes('restaurant'));

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

      const isWedding = projectConfig?.businessType === 'wedding' ||
                        projectConfig?.businessType === 'event' ||
                        projectName?.toLowerCase().includes('wedding') ||
                        projectName?.toLowerCase().includes('event') ||
                        projectName?.toLowerCase().includes('planner') ||
                        blocks.some((b: any) =>
                          (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                          (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('event')) ||
                          (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                          (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                          (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('event')) ||
                          (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('planner'))
                        );

      if (isRealEstate) detectedTemplate = 'realestate';
      else if (isRest) detectedTemplate = 'restaurant';
      else if (isClinic) detectedTemplate = 'clinic';
      else if (isSchool) detectedTemplate = 'school';
      else if (isWedding) detectedTemplate = 'wedding';

      const themeStyles: Record<string, {
        mainBg: string;
        btn: string;
        themeColor: string;
        badgeBg: string;
        badgeText: string;
        textColor: string;
      }> = {
        emerald: {
          mainBg: 'bg-gradient-to-tr from-emerald-50 via-teal-50 to-emerald-50/50 text-slate-800',
          btn: 'bg-gradient-to-r from-emerald-600 to-teal-650 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-600/15',
          themeColor: '#059669',
          badgeBg: 'bg-emerald-50/70 border border-emerald-200/50',
          badgeText: 'text-emerald-700',
          textColor: '#065f46'
        },
        sunset: {
          mainBg: 'bg-gradient-to-tr from-amber-50 via-orange-50 to-rose-50 text-slate-800',
          btn: 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-md shadow-orange-500/15',
          themeColor: '#ea580c',
          badgeBg: 'bg-orange-50/70 border border-orange-200/50',
          badgeText: 'text-orange-750',
          textColor: '#9a3412'
        },
        deepblue: {
          mainBg: 'bg-gradient-to-tr from-sky-50 via-blue-50 to-indigo-50 text-slate-800',
          btn: 'bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-600/15',
          themeColor: '#2563eb',
          badgeBg: 'bg-indigo-50/70 border border-indigo-200/50',
          badgeText: 'text-indigo-700',
          textColor: '#0369a1'
        },
        purple: {
          mainBg: 'bg-gradient-to-tr from-purple-50 via-fuchsia-50 to-indigo-50 text-slate-800',
          btn: 'bg-gradient-to-r from-purple-600 to-indigo-650 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-600/15',
          themeColor: '#7c3aed',
          badgeBg: 'bg-purple-50/70 border border-purple-200/50',
          badgeText: 'text-purple-700',
          textColor: '#701a75'
        },
        slate: {
          mainBg: 'bg-gradient-to-tr from-slate-50 via-zinc-100 to-slate-100 text-slate-800',
          btn: 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-850 hover:to-slate-900 text-white shadow-md shadow-slate-700/15',
          themeColor: '#475569',
          badgeBg: 'bg-slate-100 border border-slate-200/50',
          badgeText: 'text-slate-700',
          textColor: '#1c1917'
        },
      };

      const TEMPLATE_DETAILS: Record<string, {
        title: string;
        image: string;
        features: { icon: string; title: string; desc: string }[];
      }> = {
        clinic: {
          title: 'Healthcare Network Portal',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
          features: [
            { icon: '🛡️', title: 'HIPAA Compliant Security', desc: 'Secure medical portal for safe transactions.' },
            { icon: '⚡', title: 'Real-time Consultations', desc: 'Manage slots, bookings, and patient queues.' },
            { icon: '👥', title: 'Doctor Coordination', desc: 'Collaborate with your medical staff seamlessly.' }
          ]
        },
        school: {
          title: 'Campus Intranet Console',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
          features: [
            { icon: '🎓', title: 'Academic Registries', desc: 'Check courses, admissions, and student schedules.' },
            { icon: '📝', title: 'Grade Report Cards', desc: 'Post marks, track student performance, and view transcripts.' },
            { icon: '💳', title: 'Tuition Payment Ledgers', desc: 'Check billing invoices, pending dues, and pay online.' }
          ]
        },
        restaurant: {
          title: 'Restaurant Staff & Diners Hub',
          image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80',
          features: [
            { icon: '🍽️', title: 'Table Reservations', desc: 'Instantly book tables, view reservations, and request seating.' },
            { icon: '🍕', title: 'Chef Special Menus', desc: 'Review daily special dishes and dynamic pricing.' },
            { icon: '📈', title: 'Kitchen Billing Ledger', desc: 'Fulfill orders, check table bills, and view revenue.' }
          ]
        },
        realestate: {
          title: 'Realty Leads & Escrow Console',
          image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80',
          features: [
            { icon: '🏠', title: 'Deed Listings Directory', desc: 'Browse verified listings, villas, and apartments.' },
            { icon: '🔑', title: 'Escrow Settlements', desc: 'Track agreements, deposits, and agent sign-offs.' },
            { icon: '📋', title: 'Client Appointments Log', desc: 'Track visits, client feedback, and lead conversion rates.' }
          ]
        },
        storefront: {
          title: 'Storefront Portal Console',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
          features: [
            { icon: '📦', title: 'Product Inventory Ledger', desc: 'Add clothing collections, sizes, and stock limits.' },
            { icon: '🚚', title: 'Orders Transit Tracking', desc: 'Track shipping status, delivery addresses, and customer receipts.' },
            { icon: '🎟️', title: 'Coupons campaigns', desc: 'Create coupon codes, discounts, and track usage rates.' }
          ]
        },
        wedding: {
          title: 'Wedding & Event Planner Portal',
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
          features: [
            { icon: '📅', title: 'Planner Schedule Board', desc: 'Coordinate wedding dates, guest tables, and locations.' },
            { icon: '🤝', title: 'Supplier Registry', desc: 'Manage photographers, caterers, florists, and music crews.' },
            { icon: '📋', title: 'Quotations & Invoices Ledger', desc: 'Track billing invoices, deposits, and client reviews.' }
          ]
        }
      };

      const activePreset = projectConfig.themePreset || 'slate';
      const loginStyle = themeStyles[activePreset] || themeStyles.slate;
      const loginDetails = TEMPLATE_DETAILS[detectedTemplate] || TEMPLATE_DETAILS.storefront;
      const illustrationUrl = lc.illustrationUrl && !lc.illustrationUrl.startsWith('/images/') ? lc.illustrationUrl : loginDetails.image;

      const selectedLoginOption = Number(lc.selectedLoginOption || 1);

      if (detectedTemplate === 'wedding') {
        const option = selectedLoginOption;
        const optionColors = ['#8B5CF6', '#EC4899', '#3B82F6', '#D97706', '#10B981', '#F472B6', '#991B1B', '#0D9488', '#0F766E', '#F59E0B'];
        const activeColor = optionColors[option - 1] || '#8B5CF6';
        
        return (
          <div 
            onClick={() => setActiveBlockId(loginBlock.id)}
            className={`min-h-[500px] w-full flex items-center justify-center p-6 cursor-pointer hover:border-indigo-500/40 border-2 border-transparent transition-all duration-300 ${activeBlockId === loginBlock.id ? '!border-indigo-500 ring-2 ring-indigo-500/10' : ''} bg-slate-900/10`}
          >
            <div className="bg-slate-800 text-white rounded-2xl p-4 text-xs max-w-lg w-full text-center space-y-3 shadow-md border border-slate-700">
              <span className="text-[10px] uppercase tracking-widest font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Wedding Login Template Preset
              </span>
              <h4 className="font-extrabold text-sm flex items-center justify-center gap-2">
                <span>Selected style: Option #{option}</span>
                <span className="w-3.5 h-3.5 rounded-full border border-slate-600" style={{ backgroundColor: activeColor }} />
              </h4>
              <p className="text-[10.5px] text-slate-400 leading-normal">
                {option === 1 && 'Frosted glassmorphism card floating over wedding ceremony background.'}
                {option === 2 && 'Clean split screen layout (Left: ballroom scenery, Right: login forms).'}
                {option === 3 && 'Midnight theme with charcoal panels and neon purple text highlights.'}
                {option === 4 && 'Pastel cream backdrop layered with watercolor rose themed boundaries.'}
                {option === 5 && 'Serif classic editorial print design featuring thin bronze golden lines.'}
                {option === 6 && 'Left sidebar login column with full-screen celebration background on the right.'}
                {option === 7 && 'Modern translucent card floating over colorful animated radial light spots.'}
                {option === 8 && 'Deep navy backdrop with double golden border lines and initials monogram.'}
                {option === 9 && 'Retro sunset gradient background (coral-rose to gold) with clean white fields.'}
                {option === 10 && 'Stark high-contrast layout using heavy solid black borders and yellow buttons.'}
              </p>
              <div className="pt-2">
                <button type="button" className="px-5 py-2 text-[10px] uppercase tracking-wider font-extrabold bg-indigo-650 hover:bg-indigo-700 text-white border-none rounded-xl cursor-pointer">
                  Simulation: Active Preview Match Option #{option}
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div 
          onClick={() => setActiveBlockId(loginBlock.id)}
          className={`min-h-[550px] w-full flex items-center justify-center p-4 cursor-pointer hover:border-indigo-500/40 transition-all duration-300 ${activeBlockId === loginBlock.id ? 'ring-2 ring-indigo-500 border-indigo-500' : ''} ${projectConfig.fontStyle || 'font-sans'} ${loginStyle.mainBg}`}
        >
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
            {/* Left Side: Brand & Feature Info */}
            <div 
              className="hidden md:flex md:col-span-5 text-white p-8 flex-col justify-between relative overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.78)), url('${illustrationUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="flex items-center gap-2 font-black tracking-tight text-white text-xs">
                <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-lg">{lc.logoIcon || '⚡'}</span>
                <span>{projectName}</span>
              </div>
              
              <div className="space-y-4 my-auto text-left">
                <h3 className="text-base font-extrabold tracking-tight text-white leading-tight">
                  {loginDetails.title}
                </h3>
                <p className="text-[10px] text-slate-300 font-semibold leading-relaxed max-w-[220px]">
                  Experience a state-of-the-art secure workspace. Fulfill all operations in one place.
                </p>
                <div className="space-y-2.5 pt-3 border-t border-white/10">
                  {loginDetails.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 text-xs font-bold mt-0.5">✓</span>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-105 leading-tight">{feat.title}</p>
                        <p className="text-[9px] text-slate-400 font-semibold leading-none mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-400">
                © 2026 {projectName}. All rights reserved.
              </span>
            </div>

            {/* Right Side: Form */}
            <div className="col-span-1 md:col-span-7 p-8 flex flex-col justify-center bg-white text-left">
              <div className="max-w-sm w-full mx-auto space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                    {lc.title || 'Welcome back'}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">
                    {lc.subtitle || 'Enter your credentials to access your account'}
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-450 uppercase mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="text"
                      disabled
                      placeholder="customer@example.com"
                      className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3.5 py-2 text-xs outline-none cursor-not-allowed font-medium text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-450 uppercase mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      disabled
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3.5 py-2 text-xs outline-none cursor-not-allowed font-medium text-slate-400"
                    />
                  </div>
                  <button 
                    type="button" 
                    className={`w-full py-2.5 text-[10px] font-extrabold uppercase tracking-wider ${loginStyle.btn}`}
                  >
                    {lc.btnText || 'Sign In'}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[9px] font-bold text-slate-400">
                    Don't have an account? <span className={`hover:underline cursor-pointer`} style={{ color: loginStyle.themeColor }}>Register</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const dashBlock = blocks.find((b) => b.type === 'dashboard_config') || {
        id: 'dashboard-config-block',
        type: 'dashboard_config',
        theme: 'slate',
        content: {
          title: 'Admin Summary',
          metric1Title: 'Revenue',
          metric1Value: '$0',
          metric1Trend: 'No dynamic metrics',
          metric2Title: 'Sales',
          metric2Value: '0',
          metric2Trend: 'Ready',
          metric3Title: 'Alerts',
          metric3Value: '0',
          metric3Trend: 'Stable',
        },
      };
      const dc = dashBlock.content;

      // Dynamic template detection logic matching preview
      let detectedTemplate = 'storefront';
      const isRealEstate = blocks.some((b: any) =>
        (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('agent')) ||
        (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('broker')) ||
        (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('realty')) ||
        (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
        (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('realty')) ||
        (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
        (b.type === 'hero' && b.content?.title?.toLowerCase().includes('properties')) ||
        (b.type === 'hero' && b.content?.btn1Text?.toLowerCase().includes('property'))
      ) ||
      projectName?.toLowerCase().includes('real estate') ||
      projectName?.toLowerCase().includes('properties') ||
      projectName?.toLowerCase().includes('realty');

      const isRest = projectConfig?.businessType === 'restaurant' ||
                     projectName?.toLowerCase().includes('restaurant') ||
                     projectName?.toLowerCase().includes('dining') ||
                     blocks.some((b: any) => b.type === 'pricing' && b.content?.title?.toLowerCase().includes('chef')) ||
                     blocks.some((b: any) => b.type === 'login_config' && b.content?.title?.toLowerCase().includes('restaurant'));

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

      const isWedding = projectConfig?.businessType === 'wedding' ||
                        projectConfig?.businessType === 'event' ||
                        projectName?.toLowerCase().includes('wedding') ||
                        projectName?.toLowerCase().includes('event') ||
                        projectName?.toLowerCase().includes('planner') ||
                        blocks.some((b: any) =>
                          (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                          (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('event')) ||
                          (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                          (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                          (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('event')) ||
                          (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('planner'))
                        );

      if (isRealEstate) detectedTemplate = 'realestate';
      else if (isRest) detectedTemplate = 'restaurant';
      else if (isClinic) detectedTemplate = 'clinic';
      else if (isSchool) detectedTemplate = 'school';
      else if (isWedding) detectedTemplate = 'wedding';

      const themeStyles: Record<string, {
        mainBg: string;
        btn: string;
        themeColor: string;
        badgeBg: string;
        badgeText: string;
        textColor: string;
      }> = {
        emerald: {
          mainBg: 'bg-gradient-to-tr from-emerald-50 via-teal-50 to-emerald-50/50 text-slate-800',
          btn: 'bg-gradient-to-r from-emerald-600 to-teal-650 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-600/15 border-none cursor-pointer rounded-xl',
          themeColor: '#059669',
          badgeBg: 'bg-emerald-50/70 border border-emerald-200/50',
          badgeText: 'text-emerald-700',
          textColor: '#065f46'
        },
        sunset: {
          mainBg: 'bg-gradient-to-tr from-amber-50 via-orange-50 to-rose-50 text-slate-800',
          btn: 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-md shadow-orange-500/15 border-none cursor-pointer rounded-xl',
          themeColor: '#ea580c',
          badgeBg: 'bg-orange-50/70 border border-orange-200/50',
          badgeText: 'text-orange-750',
          textColor: '#9a3412'
        },
        deepblue: {
          mainBg: 'bg-gradient-to-tr from-sky-50 via-blue-50 to-indigo-50 text-slate-800',
          btn: 'bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-600/15 border-none cursor-pointer rounded-xl',
          themeColor: '#2563eb',
          badgeBg: 'bg-indigo-50/70 border border-indigo-200/50',
          badgeText: 'text-indigo-700',
          textColor: '#0369a1'
        },
        purple: {
          mainBg: 'bg-gradient-to-tr from-purple-50 via-fuchsia-50 to-indigo-50 text-slate-800',
          btn: 'bg-gradient-to-r from-purple-600 to-indigo-650 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-600/15 border-none cursor-pointer rounded-xl',
          themeColor: '#7c3aed',
          badgeBg: 'bg-purple-50/70 border border-purple-200/50',
          badgeText: 'text-purple-700',
          textColor: '#701a75'
        },
        slate: {
          mainBg: 'bg-gradient-to-tr from-slate-50 via-zinc-100 to-slate-100 text-slate-800',
          btn: 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-850 hover:to-slate-900 text-white shadow-md shadow-slate-700/15 border-none cursor-pointer rounded-xl',
          themeColor: '#475569',
          badgeBg: 'bg-slate-100 border border-slate-200/50',
          badgeText: 'text-slate-700',
          textColor: '#1c1917'
        },
      };

      const activePreset = projectConfig.themePreset || 'slate';
      const loginStyle = themeStyles[activePreset] || themeStyles.slate;
      const logoIcon = blocks.find(b => b.type === 'header')?.content?.logoIcon || '⚡';

      const selectedDashboardOption = Number(dc.selectedDashboardOption || 1);

      if (detectedTemplate === 'wedding') {
        const option = selectedDashboardOption;
        const currentTheme = getDashboardTheme(option);
        const isLightTheme = [3, 4, 5, 6, 7, 9].includes(option);
        const themeClass = isLightTheme
          ? 'wedding-light-theme'
          : option === 1
          ? 'wedding-glass-theme'
          : option === 2
          ? 'wedding-neon-theme'
          : option === 8
          ? 'wedding-slate-theme'
          : 'wedding-cyber-theme';

        return (
          <div 
            onClick={() => setActiveBlockId(dashBlock.id)}
            className={`flex flex-col min-h-[600px] w-full bg-slate-50 border rounded-2xl cursor-pointer overflow-hidden hover:border-indigo-500/40 transition-colors duration-300 ${activeBlockId === dashBlock.id ? 'ring-2 ring-indigo-500 border-indigo-500' : ''} ${projectConfig.fontStyle || 'font-sans'}`}
          >
            {/* Simulator Controls Strip */}
            <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center border-b border-slate-800 select-none">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portal Simulator:</span>
                <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[9px] font-bold">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setDashboardView('user'); }} 
                    className={`px-3 py-1 rounded transition-all cursor-pointer border-none bg-transparent ${dashboardView === 'user' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    User/Client Side
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setDashboardView('admin'); }} 
                    className={`px-3 py-1 rounded transition-all cursor-pointer border-none bg-transparent ${dashboardView === 'admin' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Admin/Merchant Side
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded font-black tracking-widest uppercase">
                  Style Option: #{option} ({currentTheme.decorIcon})
                </span>
              </div>
            </div>

            {/* Scoped CSS Style Tag Overrides for Simulator Canvas Mockup */}
            <div className={`flex-1 flex flex-col ${currentTheme.mainBg} ${currentTheme.fontClass} ${themeClass} relative`}>
              <style dangerouslySetInnerHTML={{ __html: `
                .wedding-glass-theme .bg-slate-950 { background-color: rgba(255, 255, 255, 0.03) !important; backdrop-filter: blur(12px) !important; }
                .wedding-glass-theme .bg-slate-950.border-slate-200 { background-color: rgba(255, 255, 255, 0.03) !important; border-color: rgba(255,255,255,0.08) !important; }
                .wedding-neon-theme .bg-slate-950 { background-color: #070311 !important; }
                .wedding-neon-theme .bg-slate-950.border-slate-200 { background-color: #100b21 !important; border-color: #3b0764 !important; }
                .wedding-slate-theme .bg-slate-950 { background-color: #0f172a !important; }
                .wedding-slate-theme .bg-slate-950.border-slate-200 { background-color: #0f172a !important; border-color: #1e293b !important; }
                .wedding-cyber-theme .bg-slate-950 { background-color: #090d12 !important; }
                .wedding-cyber-theme .bg-slate-950.border-slate-200 { background-color: #0b1218 !important; border-color: #064e3b !important; }
                
                .wedding-light-theme .bg-slate-950 { background-color: #ffffff !important; color: #1e293b !important; }
                .wedding-light-theme .bg-slate-900 { background-color: #f1f5f9 !important; border-color: #e2e8f0 !important; color: #334155 !important; }
                .wedding-light-theme .bg-slate-50 { background-color: #f8fafc !important; border-color: #e2e8f0 !important; color: #1e293b !important; }
                .wedding-light-theme .bg-white { background-color: #ffffff !important; border-color: #e2e8f0 !important; color: #1e293b !important; }
                .wedding-light-theme .text-white { color: #0f172a !important; }
                .wedding-light-theme .text-slate-100 { color: #1e293b !important; }
                .wedding-light-theme .text-slate-800 { color: #1e293b !important; }
                .wedding-light-theme .text-slate-500 { color: #64748b !important; }
                .wedding-light-theme .text-slate-400 { color: #475569 !important; }
                .wedding-light-theme .border-slate-200 { border-color: #e2e8f0 !important; }
                .wedding-light-theme .border-slate-900 { border-color: #e2e8f0 !important; }
              `}} />

              {dashboardView === 'user' ? (
                /* Client side mock */
                <div className="flex-grow flex flex-col md:flex-row min-h-[480px]">
                  <aside className={`w-full md:w-48 ${currentTheme.asideBg} ${currentTheme.asideBorder} p-4 flex flex-col gap-4 justify-between`}>
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-2 font-extrabold text-xs">
                        <span className="text-base">{logoIcon}</span>
                        <span className="truncate">{projectName}</span>
                      </div>
                      <nav className="flex flex-col gap-1.5 text-[10px] font-bold text-left">
                        {[
                          { id: 'dashboard', label: '🏠 Dashboard Hub' },
                          { id: 'bookings', label: '📅 Reservations' },
                          { id: 'quotations', label: '📄 Quotes List' },
                          { id: 'payments', label: '💳 Pay Invoices' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            className={`w-full text-left px-3 py-2 rounded-xl border-none cursor-pointer transition ${tab.id === 'dashboard' ? currentTheme.activeTab : 'bg-transparent opacity-60'}`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </nav>
                    </div>
                    <div className="pt-3 border-t border-slate-800/10 text-[9px] font-bold opacity-50 text-left">
                      <span>Client Portal Mock</span>
                    </div>
                  </aside>
                  <main className="flex-1 p-6 text-left bg-transparent space-y-4">
                    <div className={`p-5 rounded-2xl ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
                      <h3 className="text-xs font-black uppercase tracking-wider mb-1">Emma & Rohan Wedding</h3>
                      <p className="text-[10px] opacity-70">Event Date: 25 November 2026</p>
                      <span className={`inline-block mt-2.5 text-[9px] font-black uppercase px-2 py-0.5 rounded ${currentTheme.accentBg}`}>
                        Status: Confirmed
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-xl ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
                        <p className="text-[9px] uppercase tracking-wider opacity-60">Bills Outbound</p>
                        <h4 className="text-lg font-black mt-1">₹5,00,000</h4>
                      </div>
                      <div className={`p-4 rounded-xl ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
                        <p className="text-[9px] uppercase tracking-wider opacity-60">Completed Checklist</p>
                        <h4 className="text-lg font-black mt-1">5 / 12 tasks</h4>
                      </div>
                    </div>
                  </main>
                </div>
              ) : (
                /* Admin side mock */
                <div className="flex-grow flex flex-col md:flex-row min-h-[480px]">
                  <aside className={`w-full md:w-48 ${currentTheme.asideBg} ${currentTheme.asideBorder} p-4 flex flex-col gap-4 justify-between`}>
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-2 font-extrabold text-xs">
                        <span className="text-base">{currentTheme.decorIcon}</span>
                        <span className="truncate">{projectName}</span>
                      </div>
                      <nav className="flex flex-col gap-1.5 text-[10px] font-bold text-left">
                        {[
                          { id: 'dashboard', label: '📊 Console Summary' },
                          { id: 'bookings', label: '💍 Bookings Board' },
                          { id: 'vendors', label: '🤝 Vendor Registry' },
                          { id: 'finance', label: '💸 Expense Ledgers' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            className={`w-full text-left px-3 py-1.5 rounded-xl border-none cursor-pointer transition ${tab.id === 'dashboard' ? currentTheme.activeTab : 'bg-transparent opacity-60'}`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </aside>
                  <main className="flex-1 p-6 text-left bg-transparent space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider">Console Summary: {dc.title || 'Control Panel'}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-xl ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
                        <p className="text-[9px] opacity-60 uppercase">{dc.metric1Title || 'Bookings Count'}</p>
                        <h4 className="text-base font-black mt-0.5">{dc.metric1Value || '28 active'}</h4>
                        <p className="text-[8.5px] text-emerald-500 mt-1">{dc.metric1Trend}</p>
                      </div>
                      <div className={`p-4 rounded-xl ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
                        <p className="text-[9px] opacity-60 uppercase">{dc.metric2Title || 'Invoiced Amount'}</p>
                        <h4 className="text-base font-black mt-0.5">{dc.metric2Value || '₹48,900.00'}</h4>
                        <p className="text-[8.5px] opacity-70 mt-1">{dc.metric2Trend}</p>
                      </div>
                    </div>
                  </main>
                </div>
              )}
            </div>
          </div>
        );
      }

      return (
        <div 
          onClick={() => setActiveBlockId(dashBlock.id)}
          className={`flex flex-col min-h-[600px] w-full bg-slate-50 border rounded-2xl cursor-pointer overflow-hidden hover:border-indigo-500/40 transition-colors duration-300 ${activeBlockId === dashBlock.id ? 'ring-2 ring-indigo-500 border-indigo-500' : ''} ${projectConfig.fontStyle || 'font-sans'}`}
        >
          {/* Simulator Controls Strip */}
          <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center border-b border-slate-800 select-none">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portal Simulator:</span>
              <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[9px] font-bold">
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setDashboardView('user'); }} 
                  className={`px-3 py-1 rounded transition-all cursor-pointer border-none bg-transparent ${dashboardView === 'user' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  User/Diner Side
                </button>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setDashboardView('admin'); }} 
                  className={`px-3 py-1 rounded transition-all cursor-pointer border-none bg-transparent ${dashboardView === 'admin' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Admin/Merchant Side
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-2.5 py-0.5 rounded font-black tracking-widest uppercase">
                Active Theme: {activePreset}
              </span>
            </div>
          </div>

          {/* Render Active View */}
          {dashboardView === 'user' ? (
            /* USER SIDE CUSTOMER PORTAL */
            <div className="flex-1 bg-white flex flex-col md:flex-row min-h-[500px]">
              {/* Customer Sidebar Navigation */}
              <aside className="w-full md:w-48 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-5 justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-extrabold text-xs text-slate-800">
                    <span className="text-base">{logoIcon}</span>
                    <span className="truncate">{projectName}</span>
                  </div>
                  <nav className="flex flex-col gap-1.5 text-[10px] font-bold text-left">
                    {[
                      { id: 'orders', label: '📦 Orders History' },
                      { id: 'bookings', label: '📅 Reservations' },
                      { id: 'wishlist', label: '❤️ My Wishlist' },
                      { id: 'addresses', label: '📍 Saved Addresses' },
                      { id: 'settings', label: '⚙️ Profile Settings' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setUserDashboardTab(tab.id as any); }}
                        className={`w-full text-left px-3 py-2 rounded-xl border-none cursor-pointer transition ${userDashboardTab === tab.id ? `${loginStyle.badgeBg} ${loginStyle.badgeText} font-black` : 'bg-transparent text-slate-500 hover:bg-slate-100'}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-[9px] font-bold text-slate-400">
                  <span>👤 Guest Client Portal</span>
                </div>
              </aside>

              {/* Customer Main Panel */}
              <main className="flex-1 p-6 text-left bg-slate-50/30">
                {userDashboardTab === 'orders' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Purchase History</h3>
                      <p className="text-[9.5px] font-semibold text-slate-400">Review your past orders status and receipts.</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-[10px] text-slate-700 border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 font-bold text-[9px] text-slate-450 uppercase text-left">
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Item Details</th>
                            <th className="p-3 text-right">Total Price</th>
                            <th className="p-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          <tr>
                            <td className="p-3 font-extrabold text-indigo-600">#ORD-9921</td>
                            <td className="p-3">1x Zen Denim Jacket (M / Black)</td>
                            <td className="p-3 text-right font-bold text-slate-900">₹2,499.00</td>
                            <td className="p-3 text-center"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[9px] font-black uppercase">Delivered</span></td>
                          </tr>
                          <tr>
                            <td className="p-3 font-extrabold text-indigo-600">#ORD-9922</td>
                            <td className="p-3">1x Knit Midi Dress (S / White)</td>
                            <td className="p-3 text-right font-bold text-slate-900">₹1,899.00</td>
                            <td className="p-3 text-center"><span className="px-2 py-0.5 bg-amber-50 text-amber-705 border border-amber-100 rounded text-[9px] font-black uppercase">Pending</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {userDashboardTab === 'bookings' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Active Reservations</h3>
                      <p className="text-[9.5px] font-semibold text-slate-400">Review your table slots, course intakes, or medical appointments.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-3">
                        <span className="text-2xl">📅</span>
                        <div>
                          <p className="text-[10px] font-black text-slate-900 uppercase">Table Reservation</p>
                          <p className="text-[9px] text-slate-450 mt-0.5 font-bold">2 Guests • 25 June, 7:00 PM</p>
                          <span className="inline-block mt-2 text-[8px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded font-black uppercase">Confirmed</span>
                        </div>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-3">
                        <span className="text-2xl">💪</span>
                        <div>
                          <p className="text-[10px] font-black text-slate-900 uppercase">Active Session</p>
                          <p className="text-[9px] text-slate-450 mt-0.5 font-bold">Cardio & Strength • 26 June, 8:00 AM</p>
                          <span className="inline-block mt-2 text-[8px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-1.5 py-0.5 rounded font-black uppercase">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userDashboardTab === 'wishlist' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">My Wishlist</h3>
                      <p className="text-[9.5px] font-semibold text-slate-400">Products saved for quick checkout.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                      {dbProducts && dbProducts.length > 0 ? (
                        dbProducts.slice(0, 2).map((p: Product) => (
                          <div key={p.id} className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex gap-3">
                            <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-1.5">
                              <img src={p.imageUrl} className="max-h-full max-w-full object-contain" alt={p.name} />
                            </div>
                            <div className="flex-1 min-w-0 text-[10px] flex flex-col justify-between">
                              <h4 className="font-extrabold text-slate-805 truncate leading-tight">{p.name}</h4>
                              <p className="font-extrabold text-slate-900 mt-1">${p.price?.toFixed(2)}</p>
                              <button type="button" className={`mt-1.5 py-1 text-[8px] font-black uppercase tracking-wider ${loginStyle.btn} border-none`}>
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full py-6 text-center text-slate-400 text-[10.5px]">No items saved. Add items in catalog tab!</div>
                      )}
                    </div>
                  </div>
                )}

                {userDashboardTab === 'addresses' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Saved Addresses</h3>
                      <p className="text-[9.5px] font-semibold text-slate-400">Manage your shipping and checkout addresses.</p>
                    </div>
                    <div className="space-y-3 max-w-md">
                      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <span className="text-[9px] bg-slate-105 text-slate-600 px-2 py-0.5 rounded font-black uppercase block w-max mb-2">Home Address</span>
                        <p className="text-[10px] font-bold text-slate-800">Flat 402, Skyline Towers, Sector 62, Noida, UP - 201301</p>
                      </div>
                      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <span className="text-[9px] bg-slate-105 text-slate-600 px-2 py-0.5 rounded font-black uppercase block w-max mb-2">Office Address</span>
                        <p className="text-[10px] font-bold text-slate-800">ZATBIZ Tech Labs, Block C, Phase 3, Bangalore, KA - 560001</p>
                      </div>
                    </div>
                  </div>
                )}

                {userDashboardTab === 'settings' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Profile Settings</h3>
                      <p className="text-[9.5px] font-semibold text-slate-400">Update your account detail profile specs.</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm max-w-md space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8px] font-bold text-slate-450 uppercase mb-1">Full Name</label>
                          <input type="text" disabled placeholder="Sarah Jenkins" className="w-full bg-slate-50 border border-slate-205 rounded-lg px-2.5 py-1.5 text-[10px] outline-none" />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-450 uppercase mb-1">Phone Number</label>
                          <input type="text" disabled placeholder="+91 98765 43210" className="w-full bg-slate-50 border border-slate-205 rounded-lg px-2.5 py-1.5 text-[10px] outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-450 uppercase mb-1">Email Address</label>
                        <input type="text" disabled placeholder="sarah.jenkins@gmail.com" className="w-full bg-slate-50 border border-slate-205 rounded-lg px-2.5 py-1.5 text-[10px] outline-none" />
                      </div>
                      <button type="button" className={`w-full py-2 text-[9px] font-black uppercase tracking-wider ${loginStyle.btn} border-none`}>
                        Save Profile Details
                      </button>
                    </div>
                  </div>
                )}
              </main>
            </div>
          ) : (
            /* ADMIN SIDE MERCHANT PANEL */
            <div className="flex-1 bg-slate-50 p-6 space-y-6">
              {/* Admin Panel Header */}
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div className="text-left">
                  <h3 className="text-sm font-black text-slate-900">{dc.title || 'Admin Summary Panel'}</h3>
                  <span className="text-[9px] font-bold text-indigo-650 uppercase tracking-wider">Business Intelligence Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-blue-55 text-blue-600 px-2 py-0.5 rounded font-black uppercase border border-blue-100">Live DB Connected</span>
                </div>
              </div>

              {/* Stats Summary Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-left hover:shadow-md transition">
                  <span className="text-[9px] font-bold text-slate-455 block uppercase mb-1">{dc.metric1Title || 'Total Revenue'}</span>
                  <span className="font-black text-slate-900 text-lg block">{dc.metric1Value || '₹2,48,930'}</span>
                  <span className="text-[8px] font-extrabold text-emerald-600 block mt-1">▲ 12.4% since last week</span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-left hover:shadow-md transition">
                  <span className="text-[9px] font-bold text-slate-455 block uppercase mb-1">{dc.metric2Title || 'Active Sales'}</span>
                  <span className="font-black text-slate-900 text-lg block">{dc.metric2Value || '244 units'}</span>
                  <span className="text-[8px] font-extrabold text-slate-455 block mt-1">Full PostgreSQL DB sync</span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-left hover:shadow-md transition">
                  <span className="text-[9px] font-bold text-slate-455 block uppercase mb-1">{dc.metric3Title || 'Inventory Alert'}</span>
                  <span className="font-black text-slate-900 text-lg block">{dc.metric3Value || '3 items low'}</span>
                  <span className="text-[8px] font-extrabold text-rose-600 block mt-1">Restock recommended</span>
                </div>
              </div>

              {/* Horizontal Split Layout: Analytics/Leads vs Ledger/Chat */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left Side: Chart & CRM leads */}
                <div className="lg:col-span-6 space-y-5">
                  {/* Simulated Sales Chart */}
                  <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider text-left">Daily Revenue Streams (7 Days)</h4>
                    <div className="h-32 flex items-end gap-2.5 justify-center pt-2">
                      {[45, 65, 52, 72, 94, 82, 100].map((bar, idx) => (
                        <div key={idx} className="flex-1 bg-slate-55 hover:bg-slate-100 rounded-t h-full flex items-end relative group">
                          <div className="w-full rounded-t transition-all duration-300" style={{ height: `${bar}%`, backgroundColor: loginStyle.themeColor }} />
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-850 text-white text-[7.5px] font-bold px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
                            ₹{bar * 25}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CRM Leads Pipeline */}
                  <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">CRM leads pipeline</h4>
                      <span className="text-[8px] bg-slate-100 text-slate-550 px-1.5 py-0.5 rounded font-black">4 active contracts</span>
                    </div>
                    <div className="space-y-2 text-left">
                      {[
                        { client: 'Royal Bistro Cafe', project: 'POS Menu Ordering', value: '₹45,000', stage: 'Won / Signed', stageBg: 'bg-emerald-50 text-emerald-700' },
                        { client: 'Spark Retail Store', project: 'Invoicing Setup', value: '₹89,000', stage: 'Proposal Sent', stageBg: 'bg-amber-50 text-amber-705' }
                      ].map((lead, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-[10px]">
                          <div>
                            <p className="font-extrabold text-slate-800">{lead.client}</p>
                            <p className="text-[8.5px] text-slate-455 font-bold">{lead.project}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-extrabold text-slate-900">{lead.value}</p>
                            <span className={`inline-block text-[7.5px] font-black uppercase px-1.5 py-0.2 rounded mt-1 ${lead.stageBg}`}>{lead.stage}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Ledger & Chat */}
                <div className="lg:col-span-6 space-y-5">
                  {/* Financial Ledger */}
                  <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider text-left">Financial ledger accounts</h4>
                    <div className="space-y-2 text-left">
                      {[
                        { desc: 'AWS Server Hosting', amount: '-₹1,200', type: 'Expense', date: '22 June' },
                        { desc: 'Consulting Income', amount: '+₹8,900', type: 'Income', date: '21 June' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[10px] py-1 border-b border-slate-100 last:border-0">
                          <div>
                            <p className="font-bold text-slate-800">{item.desc}</p>
                            <span className="text-[8px] text-slate-400 font-bold">{item.date}</span>
                          </div>
                          <span className={`font-black ${item.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {item.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team / Live Customer Chat */}
                  <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 text-left">
                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Live CRM customer chat</h4>
                    <div className="space-y-3 max-h-36 overflow-y-auto p-1.5 bg-slate-50 border border-slate-150 rounded-xl">
                      <div className="text-[10px] text-slate-800 space-y-0.5">
                        <p className="font-extrabold text-slate-900">Alice Merchant <span className="text-[7.5px] font-bold text-slate-400">10:30 AM</span></p>
                        <p className="bg-white border border-slate-200/50 p-2 rounded-r-xl rounded-bl-xl text-[9px] font-medium leading-tight">Hey admin! Is our POS catalog database synced properly?</p>
                      </div>
                      <div className="text-[10px] text-slate-800 space-y-0.5 text-right">
                        <p className="font-extrabold text-slate-900">You <span className="text-[7.5px] font-bold text-slate-400">10:32 AM</span></p>
                        <p className="bg-indigo-50 border border-indigo-150 p-2 rounded-l-xl rounded-br-xl text-[9px] font-medium leading-tight inline-block" style={{ backgroundColor: loginStyle.badgeBg, border: `1px solid ${loginStyle.themeColor}30`, color: loginStyle.textColor }}>Yes Alice, Spring Boot REST endpoints are fully operational.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100/50 text-slate-900 font-sans">
      {/* Top Header Controls Bar */}
      <BuilderHeader
        projectName={projectName}
        status={status}
        activePage={activePage}
        canvasWidth={canvasWidth}
        onSave={handleSaveDraft}
        onPublish={handlePublish}
        onChangePage={(page) => {
          setActivePage(page);
          setActiveBlockId(null);
        }}
        onChangeCanvasWidth={setCanvasWidth}
      />

      {/* Builder main workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar block manager (Only shown on Landing tab) */}
        {activePage === 'landing' && (
          <aside className="w-[370px] bg-white border-r border-slate-200 flex overflow-hidden shadow-sm z-20 flex-shrink-0">
            {/* Narrow Vertical Tabs Strip */}
            <div className="w-16 bg-slate-900 flex flex-col items-center py-4 gap-4 border-r border-slate-800 text-white flex-shrink-0">
              {[
                { id: 'pages', label: 'Pages', icon: '📄' },
                { id: 'components', label: 'Blocks', icon: '🧩' },
                { id: 'media', label: 'Media', icon: '📂' },
                { id: 'forms', label: 'Forms', icon: '📝' },
                { id: 'seo', label: 'SEO', icon: '🔍' },
                { id: 'theme', label: 'Theme', icon: '🎨' },
                { id: 'publish', label: 'Publish', icon: '🚀' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSidebarTab(tab.id as any)}
                  title={tab.label}
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    sidebarTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-455 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="text-[7.5px] font-black tracking-tight uppercase leading-none">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Active Tab Panel */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white">
              {sidebarTab === 'pages' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Pages Panel</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage existing pages and switch layouts or add new pages.</p>
                  </div>

                  {/* Active Page List */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block mb-1">Active Site Pages</span>
                    {activePages.map((page) => (
                      <div
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          setBlocks(pages[page] || []);
                          setActiveBlockId(null);
                        }}
                        className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition ${
                          currentPage === page
                            ? 'border-indigo-500 bg-indigo-50/10 font-bold text-indigo-700'
                            : 'border-slate-200 hover:border-slate-350 text-slate-650'
                        }`}
                      >
                        <span className="text-xs capitalize">📄 {page} Page</span>
                        {currentPage === page && (
                          <span className="text-[9px] bg-indigo-150 text-indigo-700 px-1.5 py-0.5 rounded font-black uppercase">
                            Editing
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Standard Pages */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block mb-1">Add Standard Pages</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'shop', icon: '🛍️' },
                        { name: 'services', icon: '🛠️' },
                        { name: 'gallery', icon: '🖼️' },
                        { name: 'blog', icon: '✍️' },
                        { name: 'faq', icon: '❓' },
                        { name: 'terms', icon: '📄' },
                        { name: 'privacy', icon: '🔒' }
                      ].map((std) => {
                        const exists = activePages.includes(std.name);
                        return (
                          <button
                            key={std.name}
                            disabled={exists}
                            onClick={() => handleCreatePage(std.name)}
                            className={`p-2.5 border rounded-xl text-left text-xs font-semibold flex items-center gap-1.5 transition ${
                              exists
                                ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                                : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/5 cursor-pointer text-slate-705'
                            }`}
                          >
                            <span>{std.icon}</span>
                            <span className="capitalize">{std.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add Custom Pages */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[9px] font-bold text-slate-455 uppercase tracking-widest block mb-1">Add Custom Page</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'career', icon: '💼' },
                        { name: 'events', icon: '📅' },
                        { name: 'team', icon: '👥' }
                      ].map((cust) => {
                        const exists = activePages.includes(cust.name);
                        return (
                          <button
                            key={cust.name}
                            disabled={exists}
                            onClick={() => handleCreatePage(cust.name)}
                            className={`p-2.5 border rounded-xl text-left text-xs font-semibold flex items-center gap-1.5 transition ${
                              exists
                                ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                                : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/5 cursor-pointer text-slate-755'
                            }`}
                          >
                            <span>{cust.icon}</span>
                            <span className="capitalize">{cust.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {sidebarTab === 'components' && (
                <div className="space-y-6">
                  <BlockLibrary onAddBlock={handleAddBlock} />
                  <div className="border-t border-slate-105 pt-6" />
                  <PageOutline
                    blocks={blocks}
                    activeBlockId={activeBlockId}
                    onSelectBlock={setActiveBlockId}
                    onDeleteBlock={handleOutlineDelete}
                    onReorderBlocks={handleReorderOutline}
                  />
                </div>
              )}

              {sidebarTab === 'media' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Media Library</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Upload asset graphics and copy their data URLs to use in block configurations.</p>
                  </div>

                  {/* Upload File */}
                  <div className="p-4 bg-slate-50 border border-slate-205 rounded-xl space-y-2">
                    <label className="block text-[9px] font-bold text-slate-450 uppercase mb-1">Upload Local Image/Document</label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const base64 = reader.result as string;
                            const newAsset = { name: file.name, url: base64, type: file.type };
                            const updated = [...mediaAssets, newAsset];
                            setMediaAssets(updated);
                            localStorage.setItem('zatbiz_media_library_' + projectId, JSON.stringify(updated));
                            showToast(`Uploaded: ${file.name}`);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-indigo-50 file:text-indigo-705 hover:file:bg-indigo-100 cursor-pointer"
                    />
                  </div>

                  {/* Media Grid */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block">Uploaded Assets ({mediaAssets.length})</span>
                    {mediaAssets.length === 0 ? (
                      <div className="text-center py-8 border border-dashed border-slate-205 rounded-xl text-slate-400 text-[10px] font-medium">
                        No assets in media library yet. Upload above!
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {mediaAssets.map((asset, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              navigator.clipboard.writeText(asset.url);
                              showToast('Asset Data URL copied to clipboard!');
                            }}
                            className="group p-2 border border-slate-200 rounded-xl hover:border-indigo-400 cursor-pointer transition bg-slate-50/50 flex flex-col justify-between"
                          >
                            <div className="h-20 bg-white border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden mb-1.5 p-1 relative">
                              {asset.type.startsWith('image/') ? (
                                <img src={asset.url} className="max-h-full max-w-full object-contain" alt={asset.name} />
                              ) : (
                                <span className="text-2xl">📄</span>
                              )}
                              <span className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-[8.5px] font-black text-white uppercase opacity-0 group-hover:opacity-100 transition duration-200">
                                📋 Copy URL
                              </span>
                            </div>
                            <span className="text-[8.5px] font-bold text-slate-700 truncate block text-center">{asset.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {sidebarTab === 'forms' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Form Builder</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage customizable contact or inquiry form inputs.</p>
                  </div>

                  {/* Standard Form list */}
                  <div className="space-y-3">
                    {customForms.map((form) => (
                      <div key={form.id} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-slate-850">{form.title}</h4>
                          <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase">Form ID: {form.id}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-slate-450 uppercase block">Form Fields</span>
                          <div className="flex flex-wrap gap-1.5">
                            {form.fields.map((f) => (
                              <span key={f} className="text-[9px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-655 font-semibold">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Submissions list */}
                        <div className="border-t border-slate-100 pt-3 space-y-2">
                          <span className="text-[8px] font-bold text-slate-450 uppercase block">Submissions Logs</span>
                          <div className="space-y-1.5 max-h-40 overflow-y-auto">
                            {mockFormSubmissions.filter(s => s.formId === form.id).length === 0 ? (
                              <div className="text-[8.5px] text-slate-400 italic">No submissions logs registered yet.</div>
                            ) : (
                              mockFormSubmissions.filter(s => s.formId === form.id).map((sub, sidx) => (
                                <div key={sidx} className="p-2 bg-white border border-slate-200 rounded-lg text-[9px] space-y-1">
                                  <div className="flex justify-between text-[7.5px] text-slate-400 font-bold">
                                    <span>Date: {sub.date}</span>
                                    <span># {sidx + 1}</span>
                                  </div>
                                  {Object.entries(sub.data).map(([key, val]) => (
                                    <div key={key}>
                                      <span className="font-bold text-slate-600">{key}: </span>
                                      <span className="text-slate-500 font-semibold">{val}</span>
                                    </div>
                                  ))}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sidebarTab === 'seo' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">SEO Settings</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Customize global search engine optimization metadata tags.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Meta Title Tag</label>
                      <input
                        type="text"
                        value={projectConfig.seoTitle || ''}
                        onChange={(e) => {
                          const updatedConfig = { ...projectConfig, seoTitle: e.target.value };
                          setProjectConfig(updatedConfig);
                          triggerAutosave(pages, activePages, currentPage, updatedConfig);
                        }}
                        placeholder="e.g. Vintage Apparel | Premium Clothing Store"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Meta Description</label>
                      <textarea
                        rows={3}
                        value={projectConfig.seoDescription || ''}
                        onChange={(e) => {
                          const updatedConfig = { ...projectConfig, seoDescription: e.target.value };
                          setProjectConfig(updatedConfig);
                          triggerAutosave(pages, activePages, currentPage, updatedConfig);
                        }}
                        placeholder="Write a brief overview for search engine listings..."
                        className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs outline-none transition resize-none font-semibold text-slate-700 leading-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Meta Keywords</label>
                      <input
                        type="text"
                        value={projectConfig.seoKeywords || ''}
                        onChange={(e) => {
                          const updatedConfig = { ...projectConfig, seoKeywords: e.target.value };
                          setProjectConfig(updatedConfig);
                          triggerAutosave(pages, activePages, currentPage, updatedConfig);
                        }}
                        placeholder="e.g. clothing, fashion, dresses, shop"
                        className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Favicon Shortcut Icon</label>
                      <input
                        type="text"
                        value={projectConfig.faviconUrl || ''}
                        onChange={(e) => {
                          const updatedConfig = { ...projectConfig, faviconUrl: e.target.value };
                          setProjectConfig(updatedConfig);
                          triggerAutosave(pages, activePages, currentPage, updatedConfig);
                        }}
                        placeholder="e.g. 🍕 / ⚡ / https://example.com/favicon.png"
                        className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {sidebarTab === 'theme' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Theme & Fonts</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Control global color presets, typography styles, and button alignments.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Theme color choices */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-450 uppercase mb-2">Preset Color Theme</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'slate', name: 'Charcoal', color: 'bg-slate-700' },
                          { id: 'deepblue', name: 'Navy Ocean', color: 'bg-indigo-900' },
                          { id: 'sunset', name: 'Sunset Warm', color: 'bg-amber-600' },
                          { id: 'purple', name: 'Cyber Neon', color: 'bg-purple-700' },
                        ].map((theme) => (
                          <button
                            type="button"
                            key={theme.id}
                            onClick={() => {
                              const updatedConfig = { ...projectConfig, themePreset: theme.id };
                              setProjectConfig(updatedConfig);
                              
                              // Propagate theme preset update to ALL blocks on ALL pages!
                              const updatedPages = { ...pages };
                              for (const pgKey in updatedPages) {
                                updatedPages[pgKey] = updatedPages[pgKey].map(b => ({
                                  ...b,
                                  theme: b.type === 'header' || b.type === 'footer' ? 'slate' : theme.id
                                }));
                              }
                              setPages(updatedPages);
                              setBlocks(updatedPages[currentPage] || []);
                              
                              saveLayout(updatedPages, activePages, currentPage, updatedConfig, projectName, 'Draft', true);
                              showToast(`Applied preset color: ${theme.name}`);
                            }}
                            className={`p-2.5 text-left rounded-xl border text-[10px] font-bold flex items-center gap-2 cursor-pointer transition ${
                              (projectConfig.themePreset || 'slate') === theme.id
                                ? 'border-indigo-500 bg-indigo-50/10 text-indigo-700 font-extrabold'
                                : 'border-slate-200 bg-white hover:border-slate-350 text-slate-600 font-semibold'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full ${theme.color} shadow-sm`} />
                            <span>{theme.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Font Family Selection */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-2">Typography Font Family</label>
                      <div className="space-y-1.5">
                        {[
                          { id: 'font-sans', name: 'Inter (Sans-serif)', desc: 'Clean, neutral, and readable.' },
                          { id: 'font-serif', name: 'Playfair Display (Serif)', desc: 'Elegant, classical editorial styling.' },
                          { id: 'font-outfit', name: 'Outfit (Geometric)', desc: 'Modern, visual brand aesthetics.' }
                        ].map((fnt) => (
                          <div
                            key={fnt.id}
                            onClick={() => {
                              const updatedConfig = { ...projectConfig, fontStyle: fnt.id };
                              setProjectConfig(updatedConfig);
                              triggerAutosave(pages, activePages, currentPage, updatedConfig);
                              showToast(`Applied typography: ${fnt.name}`);
                            }}
                            className={`p-2.5 border rounded-xl cursor-pointer transition text-xs ${
                              (projectConfig.fontStyle || 'font-sans') === fnt.id
                                ? 'border-indigo-500 bg-indigo-50/10 font-bold text-indigo-700'
                                : 'border-slate-200 hover:border-slate-350 text-slate-650 font-medium'
                            }`}
                          >
                            <div>{fnt.name}</div>
                            <div className="text-[8.5px] text-slate-400 font-semibold mt-0.5">{fnt.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Button Styling Selection */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-455 uppercase mb-2">Button Borders Alignment</label>
                      <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
                        {[
                          { id: 'rounded-md', label: 'Rounded' },
                          { id: 'rounded-full', label: 'Pill' },
                          { id: 'rounded-none', label: 'Sharp' },
                        ].map((btn) => (
                          <button
                            key={btn.id}
                            onClick={() => {
                              const updatedConfig = { ...projectConfig, buttonStyle: btn.id };
                              setProjectConfig(updatedConfig);
                              triggerAutosave(pages, activePages, currentPage, updatedConfig);
                            }}
                            className={`flex-1 py-1.5 rounded transition cursor-pointer ${
                              (projectConfig.buttonStyle || 'rounded-md') === btn.id
                                ? 'bg-white text-indigo-700 shadow-sm'
                                : 'text-slate-450 hover:text-slate-700'
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {sidebarTab === 'publish' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Publish Website</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Push your website layout changes live to the visitor preview portal.</p>
                  </div>

                  <div className="p-4 bg-indigo-50/10 border border-indigo-100/50 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-450 font-bold uppercase text-[9px]">Publish Status:</span>
                      <span className={`px-2 py-0.5 rounded-[4px] font-black uppercase text-[8px] tracking-wide ${
                        status === 'Published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={handlePublish}
                        className="w-full py-3 bg-indigo-650 hover:bg-indigo-755 text-white text-[10px] font-bold rounded-xl shadow-md cursor-pointer transition hover:scale-[1.01]"
                      >
                        🚀 Publish Live Site
                      </button>

                      <a
                        href={`/preview/${projectId}`}
                        target="_blank"
                        className="w-full py-2.5 border border-slate-205 hover:bg-slate-55 text-slate-650 text-[10px] font-bold rounded-xl transition block text-center shadow-sm"
                      >
                        🌐 Visit Visitor Storefront Preview
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Center Workspace Simulator */}
        <CanvasContainer canvasWidth={canvasWidth} activePage={activePage}>
          {activePage === 'products' ? (
            <ProductCatalog
              dbProducts={dbProducts}
              onAddProduct={handleOpenProductAdd}
              onEditProduct={handleOpenProductEdit}
              onDeleteProduct={handleProductDelete}
            />
          ) : activePage === 'settings' ? (
            <SiteSettingsPanel
              blocks={blocks}
              updateBlockContent={updateBlockContent}
            />
          ) : (
            renderPageCanvasContent()
          )}
        </CanvasContainer>

        {/* Right configuration sidebar (Shown only when block is active) */}
        {activeBlock && activePage !== 'products' && (
          <ConfigSidebar
            activeBlock={activeBlock}
            updateBlockContent={updateBlockContent}
            updateBlockTheme={updateBlockTheme}
            onDeselect={() => setActiveBlockId(null)}
          />
        )}
      </div>

      {/* AI Assistant Sidekick Drawer */}
      <AiSidekick
        context="builder"
        activeBlockType={activeBlock?.type || null}
        activeBlockId={activeBlock?.id || null}
        onExecuteAction={handleAiAction}
      />

      {/* Product edit/add modal */}
      {isProductModalOpen && (
        <ProductModal
          isOpen={isProductModalOpen}
          product={editingProduct}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleProductSubmit}
        />
      )}

      {/* Toast Alert Log Containers */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
