'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Project, Block } from '@/types';
import RestaurantStorefront from '../preview/restaurant/RestaurantStorefront';
import { CategoryLoginTemplate } from '../preview/restaurant/categories/CategoryLoginTemplate';
import { CategoryDashboardTemplate } from '../preview/restaurant/categories/CategoryDashboardTemplate';
import { api } from '@/services/api';

interface RestaurantThemeStudioProps {
  projectId: number;
  project: Project;
  projectConfig: any;
  setProjectConfig: (config: any) => void;
  projectName: string;
  setProjectName: (name: string) => void;
  status: string;
  setStatus: (status: string) => void;
  pages: Record<string, Block[]>;
  setPages: (pages: Record<string, Block[]>) => void;
  activePages: string[];
  setActivePages: (pages: string[]) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  dbProducts: Product[];
  fetchDbProducts: () => void;
  restaurantInfo: any;
  setRestaurantInfo: (info: any) => void;
  saveLayout: (
    pages: Record<string, Block[]>,
    activePages: string[],
    currentPage: string,
    config: any,
    name: string,
    status: string,
    isAutosave?: boolean
  ) => void;
  showToast: (message: string, isError?: boolean) => void;
  toasts: any[];
  removeToast: (id: number) => void;
}

export default function RestaurantThemeStudio({
  projectId,
  project,
  projectConfig,
  setProjectConfig,
  projectName,
  setProjectName,
  status,
  setStatus,
  pages,
  setPages,
  activePages,
  setActivePages,
  currentPage,
  setCurrentPage,
  blocks,
  setBlocks,
  dbProducts,
  fetchDbProducts,
  restaurantInfo,
  setRestaurantInfo,
  saveLayout,
  showToast,
  toasts,
  removeToast
}: RestaurantThemeStudioProps) {
  const router = useRouter();

  // Sidebar Tabs
  const [editorSection, setEditorSection] = useState<'theme' | 'layout' | 'fonts' | 'elements' | 'layouts' | 'menu' | 'publish'>('theme');

  // FlowCV-style Layout Editor state
  const [layoutPage, setLayoutPage] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [layoutContent, setLayoutContent] = useState<any>(
    projectConfig?.layoutContent || restaurantInfo?.layoutContent || {}
  );

  const updateSectionField = (page: string, sectionKey: string, field: string, value: any) => {
    setLayoutContent((prev: any) => ({
      ...prev,
      [page]: {
        ...(prev?.[page] || {}),
        [sectionKey]: {
          ...(prev?.[page]?.[sectionKey] || {}),
          [field]: value
        }
      }
    }));
  };

  const toggleSectionVisibility = (page: string, sectionKey: string) => {
    const current = layoutContent?.[page]?.[sectionKey]?.visible;
    updateSectionField(page, sectionKey, 'visible', current === false ? true : false);
  };

  const moveSection = (sectionKey: string, direction: -1 | 1) => {
    const defaultOrder = ['statement', 'dishes', 'ambiance1', 'ambiance2', 'chef', 'marquee', 'reserve'];
    const currentOrder: string[] =
      (Array.isArray(layoutContent?.landing?.sectionOrder) && layoutContent.landing.sectionOrder.length
        ? layoutContent.landing.sectionOrder
        : defaultOrder).slice();
    const idx = currentOrder.indexOf(sectionKey);
    const target = idx + direction;
    if (idx === -1 || target < 0 || target >= currentOrder.length) return;
    [currentOrder[idx], currentOrder[target]] = [currentOrder[target], currentOrder[idx]];
    setLayoutContent((prev: any) => ({
      ...prev,
      landing: { ...(prev?.landing || {}), sectionOrder: currentOrder }
    }));
  };

  const handleLayoutImageUpload = async (page: string, sectionKey: string, field: string, file: File) => {
    try {
      showToast('Uploading image…');
      const url = await api.media.uploadImage(file);
      updateSectionField(page, sectionKey, field, url);
      showToast('Image updated!');
    } catch {
      showToast('Image upload failed.', true);
    }
  };

  // Preview States
  const [previewTab, setPreviewTab] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [viewportWidth, setViewportWidth] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Local Customizer Styling State (Loaded from project/restaurantInfo)
  const [selectedTheme, setSelectedTheme] = useState(projectConfig?.themePreset || restaurantInfo?.selectedTheme || 'gold-luxury');
  const [themeColor, setThemeColor] = useState(restaurantInfo?.themeColor || '#c5a880');
  const [selectedFont, setSelectedFont] = useState(projectConfig?.fontStyle || restaurantInfo?.fontStyle || 'inter');
  const [selectedButton, setSelectedButton] = useState(projectConfig?.buttonStyle || restaurantInfo?.buttonStyle || 'rounded');
  const [selectedAnimation, setSelectedAnimation] = useState(projectConfig?.animationStyle || restaurantInfo?.animationStyle || 'fade');
  const [selectedHeader, setSelectedHeader] = useState(projectConfig?.headerStyle || restaurantInfo?.headerStyle || 'sticky');
  const [selectedHomepageLayout, setSelectedHomepageLayout] = useState(restaurantInfo?.selectedHomepageLayout || 'menu-grid-focus');
  const [selectedLoginLayout, setSelectedLoginLayout] = useState(restaurantInfo?.selectedLoginLayout || 'left-illustration');
  const [selectedDashboardLayout, setSelectedDashboardLayout] = useState(restaurantInfo?.selectedDashboardLayout || 'metric-overview');

  // Business Profile Info
  const [companyName, setCompanyName] = useState(restaurantInfo?.restaurantName || project.name.replace(" Site", ""));
  const [description, setDescription] = useState(restaurantInfo?.description || 'A premium dining experience.');
  const [logoUrl, setLogoUrl] = useState(restaurantInfo?.logoUrl || '');
  const [logoIcon, setLogoIcon] = useState('🍳');
  const [subdomain, setSubdomain] = useState(projectName.toLowerCase().replace(/[^a-z0-9]/g, ''));

  // Hero selectors
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>('');
  const heroStockImages = [
    { id: 'hero1', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600', name: 'Fine Dining Table' },
    { id: 'hero2', url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600', name: 'Restaurant Interior' },
    { id: 'hero3', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600', name: 'Chef Preparing Food' },
    { id: 'hero4', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600', name: 'Gourmet Dish' }
  ];

  // Map theme preset to hex code
  const presetHexes: Record<string, string> = {
    'gold-luxury': '#c5a880',
    'rose-vintage': '#ec4899',
    'emerald-mint': '#10b981',
    'ruby-wine': '#e11d48',
    'amber-spiced': '#d97706',
    'indigo-ocean': '#4f46e5',
    'charcoal-slate': '#475569',
    'tangerine-sprout': '#f97316',
    'forest-herbs': '#047857',
    'velvet-plum': '#7c3aed',
    'terracotta-clay': '#c2410c',
    'cyan-breeze': '#06b6d4',
    'sunset-gold': '#ea580c',
    'matcha-zen': '#84cc16',
    'chocolate-truffle': '#451a03',
    'lavender-bliss': '#a78bfa',
    'crimson-blaze': '#b91c1c',
    'lemon-zest': '#eab308',
    'peach-blossom': '#fb923c',
    'royal-gold': '#d97706'
  };

  // Sync preset hex colors when theme changes
  useEffect(() => {
    if (presetHexes[selectedTheme]) {
      setThemeColor(presetHexes[selectedTheme]);
    }
  }, [selectedTheme]);

  // Instant local updates save loop (Debounced)
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const handler = setTimeout(() => {
      handleSyncAndAutosave();
    }, 1000);

    return () => clearTimeout(handler);
  }, [
    selectedTheme,
    themeColor,
    selectedFont,
    selectedButton,
    selectedAnimation,
    selectedHeader,
    selectedHomepageLayout,
    selectedLoginLayout,
    selectedDashboardLayout,
    companyName,
    description,
    logoUrl,
    selectedHeroImage,
    layoutContent
  ]);

  const handleSyncAndAutosave = async () => {
    // 1. Compile configurations
    const updatedConfig = {
      ...projectConfig,
      businessType: 'restaurant',
      shopNiche: restaurantInfo?.subcategory || 'General',
      themePreset: selectedTheme,
      fontStyle: selectedFont,
      buttonStyle: selectedButton,
      animationStyle: selectedAnimation,
      headerStyle: selectedHeader,
      logoUrl: logoUrl,
      companyName: companyName,
      layoutContent: layoutContent
    };

    setProjectConfig(updatedConfig);

    // Update restaurantInfo properties in local memory
    const updatedRestaurantInfo = {
      ...restaurantInfo,
      restaurantName: companyName,
      businessName: companyName,
      description: description,
      logoUrl: logoUrl,
      themeColor: themeColor,
      selectedTheme: selectedTheme,
      selectedHomepageLayout,
      selectedLoginLayout,
      selectedDashboardLayout,
      layoutContent: layoutContent
    };
    setRestaurantInfo(updatedRestaurantInfo);

    // Propagate variables through pages blocksJson
    const updatedPages = { ...pages };
    for (const pgKey in updatedPages) {
      updatedPages[pgKey] = updatedPages[pgKey].map(block => {
        // Update header block properties
        if (block.type === 'header') {
          return {
            ...block,
            theme: selectedTheme,
            content: {
              ...block.content,
              companyName: companyName,
              logoUrl: logoUrl,
            }
          };
        }
        // Update hero block properties
        if (block.type === 'hero') {
          return {
            ...block,
            theme: selectedTheme,
            content: {
              ...block.content,
              title: `${companyName} - Fine Dining`,
              subtitle: description,
              imageUrl: selectedHeroImage || block.content.imageUrl,
            }
          };
        }
        // Update config block properties
        if (block.type === 'business_config') {
          return {
            ...block,
            theme: selectedTheme,
            content: {
              ...block.content,
              shopNiche: restaurantInfo?.subcategory || 'General',
              themePreset: selectedTheme,
              fontStyle: selectedFont,
              buttonStyle: selectedButton,
              animationStyle: selectedAnimation,
              headerStyle: selectedHeader,
              logoUrl: logoUrl,
              companyName: companyName
            }
          };
        }
        return { ...block, theme: selectedTheme };
      });
    }
    setPages(updatedPages);
    if (updatedPages[currentPage]) {
      setBlocks(updatedPages[currentPage]);
    }

    try {
      // Save local draft changes to the Spring Boot REST API
      await api.restaurant.update(projectId, updatedRestaurantInfo);
      saveLayout(updatedPages, activePages, currentPage, updatedConfig, `${companyName} Site`, 'Draft', true);
    } catch (e) {
      console.warn('Autosave sync failed:', e);
    }
  };

  const handlePublishTheme = async () => {
    handleSyncAndAutosave();
    
    const updatedConfig = {
      ...projectConfig,
      businessType: 'restaurant',
      themePreset: selectedTheme,
      fontStyle: selectedFont,
      buttonStyle: selectedButton,
      animationStyle: selectedAnimation,
      headerStyle: selectedHeader,
      layoutContent: layoutContent,
    };

    const updatedRestaurantInfo = {
      ...restaurantInfo,
      restaurantName: companyName,
      businessName: companyName,
      description: description,
      logoUrl: logoUrl,
      themeColor: themeColor,
      selectedTheme: selectedTheme,
      selectedHomepageLayout,
      selectedLoginLayout,
      selectedDashboardLayout,
      layoutContent: layoutContent
    };

    try {
      setStatus('Published');
      await api.restaurant.update(projectId, updatedRestaurantInfo);
      saveLayout(pages, activePages, currentPage, updatedConfig, `${companyName} Site`, 'Published', false);
      showToast('ZATBIZ Theme Studio: Changes published live! 🚀');
    } catch (err) {
      console.error(err);
      showToast('Failed to publish changes.', true);
    }
  };

  // Compile resolved props to preview components
  const resolvedProject = {
    ...project,
    blocksJson: JSON.stringify({
      pages: pages,
      activePages: activePages,
      currentPage: currentPage,
      businessConfig: {
        ...projectConfig,
        themePreset: selectedTheme,
        fontStyle: selectedFont,
        buttonStyle: selectedButton,
        animationStyle: selectedAnimation,
        headerStyle: selectedHeader,
        logoUrl: logoUrl,
        companyName: companyName,
        layoutContent: layoutContent
      }
    })
  };

  const resolvedRestaurantInfo = {
    ...restaurantInfo,
    subcategory: restaurantInfo?.subcategory || 'Fine Dining',
    restaurantName: companyName,
    businessName: companyName,
    description: description,
    logoUrl: logoUrl,
    themeColor: themeColor,
    selectedTheme: selectedTheme,
    selectedHomepageLayout: selectedHomepageLayout,
    selectedLoginLayout: selectedLoginLayout,
    selectedDashboardLayout: selectedDashboardLayout,
    layoutContent: layoutContent
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* LEFT DRAWER PANEL: Visual Shopify customizer */}
      <aside className="w-96 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-full select-none z-20">
        
        {/* Workspace Brand details */}
        <div className="p-4 border-b border-slate-800/70 flex justify-between items-center">
          <div className="flex items-center gap-2.5 text-left">
            <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-500/15 text-base">🎨</span>
            <div className="leading-tight">
              <span className="text-[10px] font-medium text-indigo-400 tracking-wide">Theme Studio</span>
              <h2 className="text-[13px] font-semibold text-white truncate max-w-[170px]">{companyName}</h2>
            </div>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-3 py-1.5 bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-medium transition cursor-pointer border-none"
          >
            ← Exit
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="grid grid-cols-7 gap-1 px-2 py-2 border-b border-slate-800/70 text-[10px] font-medium text-center text-slate-400">
          {[
            { id: 'theme', label: 'Theme', icon: '🎨' },
            { id: 'layout', label: 'Layout', icon: '✏️' },
            { id: 'fonts', label: 'Font', icon: '🔤' },
            { id: 'elements', label: 'Shape', icon: '🧱' },
            { id: 'layouts', label: 'Pages', icon: '📱' },
            { id: 'menu', label: 'Menu', icon: '🍔' },
            { id: 'publish', label: 'Pub', icon: '🚀' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setEditorSection(tab.id as any)}
              className={`py-2 rounded-lg flex flex-col items-center gap-1 border-none cursor-pointer transition ${editorSection === tab.id ? 'bg-indigo-500/15 text-indigo-300 font-semibold' : 'bg-transparent hover:bg-slate-800/60 hover:text-white'}`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Editor controls scroll area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-left scrollbar-thin">
          
          {/* SECTION: Theme color presets */}
          {editorSection === 'theme' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Color Presets</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Select a premium curated swatch or choose a custom hex color.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'gold-luxury', name: 'Luxury Gold', color: '#c5a880', desc: 'Champagne & Gold' },
                  { id: 'charcoal-slate', name: 'Modern Black', color: '#475569', desc: 'Minimalist Slate' },
                  { id: 'forest-herbs', name: 'Forest Herbs', color: '#047857', desc: 'Eco Green' },
                  { id: 'indigo-ocean', name: 'Ocean Blue', color: '#4f46e5', desc: 'Sea Navy' },
                  { id: 'sunset-gold', name: 'Sunset Orange', color: '#ea580c', desc: 'Vivid Spiced' },
                  { id: 'velvet-plum', name: 'Velvet Plum', desc: 'Artisan Purple', color: '#7c3aed' },
                  { id: 'terracotta-clay', name: 'Terracotta Bistro', desc: 'Clay Brick', color: '#c2410c' }
                ].map(themeOpt => (
                  <button
                    key={themeOpt.id}
                    onClick={() => setSelectedTheme(themeOpt.id)}
                    className={`p-3 border rounded-xl flex flex-col gap-1.5 cursor-pointer transition text-left ${selectedTheme === themeOpt.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: themeOpt.color }} />
                      <span className="text-[11px] font-medium text-white">{themeOpt.name}</span>
                    </div>
                    <span className="text-[9.5px] text-slate-400 leading-tight">{themeOpt.desc}</span>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <label className="text-[11px] font-medium text-slate-300 block">Custom accent hex</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={themeColor}
                    onChange={e => {
                      setThemeColor(e.target.value);
                      setSelectedTheme(e.target.value);
                    }}
                    className="w-8 h-8 bg-transparent border-0 cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={themeColor}
                    onChange={e => {
                      setThemeColor(e.target.value);
                      setSelectedTheme(e.target.value);
                    }}
                    className="flex-grow bg-slate-900 border border-slate-800 rounded-lg text-xs px-2.5 outline-none text-white focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Typography Fonts */}
          {editorSection === 'fonts' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Typography Studio</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Choose a visual font family to override layout headings.</p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'inter', name: 'Inter (Sans-serif)', desc: 'Clean, modern and visual reader' },
                  { id: 'poppins', name: 'Poppins (Geometric)', desc: 'Bold, friendly and contemporary aesthetic' },
                  { id: 'montserrat', name: 'Montserrat (Classical)', desc: 'Urban, structured architectural text' },
                  { id: 'playfair', name: 'Playfair Display (Serif)', desc: 'Elegant dining and classical editorial cursive' },
                  { id: 'manrope', name: 'Manrope (High tech)', desc: 'Sleek, legible modern branding' }
                ].map(fnt => (
                  <button
                    key={fnt.id}
                    onClick={() => setSelectedFont(fnt.id)}
                    className={`w-full p-3.5 border rounded-xl flex flex-col text-left cursor-pointer transition ${selectedFont === fnt.id ? 'border-indigo-500 bg-indigo-950/20 font-bold' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}`}
                  >
                    <span className="text-xs text-white">{fnt.name}</span>
                    <span className="text-[8.5px] text-slate-400 mt-1">{fnt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: Buttons & Animations shapes */}
          {editorSection === 'elements' && (
            <div className="space-y-6">
              
              {/* Button Shape */}
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Buttons Borders</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Select the edge alignment variables for buttons.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'rounded', name: 'Rounded (8px)' },
                    { id: 'pill', name: 'Pill Shape' },
                    { id: 'sharp', name: 'Sharp Edge' },
                    { id: '3d', name: '3D Action Button' },
                    { id: 'gradient', name: 'Linear Gradient' }
                  ].map(btn => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedButton(btn.id)}
                      className={`p-3 border rounded-xl text-center text-[10px] font-black cursor-pointer transition ${selectedButton === btn.id ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400' : 'border-slate-800 bg-slate-950 hover:border-slate-750 text-slate-300'}`}
                    >
                      {btn.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animations */}
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Transitions & Animations</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Define load effects and scrolling transitions.</p>
                </div>
                <div className="space-y-2">
                  {[
                    { id: 'fade', name: 'Smooth Fade In', desc: 'Gradually fades page layouts on arrival.' },
                    { id: 'slide', name: 'Bottom Slide Up', desc: 'Slides sections vertically on entry.' },
                    { id: 'zoom', name: 'Scale Zoom In', desc: 'Zooms layout grids smoothly for organic appeal.' },
                    { id: 'glass', name: 'Frosted Glassmorphism', desc: 'Adds high-blur backdrops to overlays.' }
                  ].map(anim => (
                    <button
                      key={anim.id}
                      onClick={() => setSelectedAnimation(anim.id)}
                      className={`w-full p-3 border rounded-xl flex flex-col text-left cursor-pointer transition ${selectedAnimation === anim.id ? 'border-indigo-500 bg-indigo-950/20 text-white' : 'border-slate-800 bg-slate-955 hover:border-slate-700'}`}
                    >
                      <span className="text-[10px] font-black text-white">{anim.name}</span>
                      <span className="text-[8.5px] text-slate-400 mt-0.5">{anim.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Page & Headers layouts */}
          {editorSection === 'layouts' && (
            <div className="space-y-6">
              
              {/* Headers layout */}
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Headers Alignment</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Configure sticky positioning, absolute overlays or modern headers.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'classic', name: 'Classic' },
                    { id: 'sticky', name: 'Sticky Pin' },
                    { id: 'transparent', name: 'Absolute Overlay' },
                    { id: 'floating', name: 'Floating Capsule' },
                    { id: 'modern', name: 'Modern Border' }
                  ].map(hdr => (
                    <button
                      key={hdr.id}
                      onClick={() => setSelectedHeader(hdr.id)}
                      className={`p-3 border rounded-xl text-center text-[10px] font-black cursor-pointer transition ${selectedHeader === hdr.id ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400' : 'border-slate-800 bg-slate-950 hover:border-slate-750 text-slate-300'}`}
                    >
                      {hdr.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Homepage Template layout */}
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Homepage Sections Layout</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Toggle custom visual layout categories.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'menu-grid-focus', name: 'Modern Menu Grid' },
                    { id: 'reservation-banner', name: 'Minimal Booking' },
                    { id: 'chef-specials', name: 'Luxury Specials' },
                    { id: 'reviews-showcase', name: 'Classic Reviews' }
                  ].map(layout => (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedHomepageLayout(layout.id)}
                      className={`p-3 border rounded-xl text-center text-[10px] font-black cursor-pointer transition ${selectedHomepageLayout === layout.id ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400' : 'border-slate-800 bg-slate-950 hover:border-slate-750 text-slate-300'}`}
                    >
                      {layout.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Template layout */}
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Login Page Layout</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Customize the portal access page grid layout.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'left-illustration', name: 'Split Image Left' },
                    { id: 'right-illustration', name: 'Split Image Right' },
                    { id: 'floating-dishes', name: 'Glass Overlay' },
                    { id: 'minimal-logo', name: 'Minimal Card' }
                  ].map(layout => (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedLoginLayout(layout.id)}
                      className={`p-3 border rounded-xl text-center text-[10px] font-black cursor-pointer transition ${selectedLoginLayout === layout.id ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400' : 'border-slate-800 bg-slate-950 hover:border-slate-750 text-slate-300'}`}
                    >
                      {layout.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dashboard Layout */}
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Admin Dashboard Console</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Configure layout styles for reservations summaries.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'metric-overview', name: 'Modern Dark Console' },
                    { id: 'menu-catalog', name: 'Light Inventory' },
                    { id: 'reservations-inbox', name: 'Glass Inbox Panel' }
                  ].map(layout => (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedDashboardLayout(layout.id)}
                      className={`p-3 border rounded-xl text-center text-[10px] font-black cursor-pointer transition ${selectedDashboardLayout === layout.id ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400' : 'border-slate-800 bg-slate-950 hover:border-slate-750 text-slate-300'}`}
                    >
                      {layout.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Menu Catalog Product Lists */}
          {/* SECTION: FlowCV-style Layout editor */}
          {editorSection === 'layout' && (() => {
            const landingSections: { key: string; label: string; icon: string; fields: { field: string; label: string; type: 'text' | 'textarea' | 'image' }[] }[] = [
              { key: 'hero', label: 'Hero Banner', icon: '🖼️', fields: [
                { field: 'eyebrow', label: 'Eyebrow Tag', type: 'text' },
                { field: 'title', label: 'Headline', type: 'text' },
                { field: 'subtitle', label: 'Subheadline', type: 'textarea' },
                { field: 'imageUrl', label: 'Background Image', type: 'image' },
              ]},
              { key: 'statement', label: 'Statement Quote', icon: '💬', fields: [
                { field: 'text', label: 'Quote Text', type: 'textarea' },
              ]},
              { key: 'dishes', label: 'Signature Dishes', icon: '🍽️', fields: [
                { field: 'eyebrow', label: 'Eyebrow Tag', type: 'text' },
                { field: 'heading', label: 'Section Heading', type: 'text' },
                { field: 'note', label: 'Side Note', type: 'textarea' },
              ]},
              { key: 'ambiance1', label: 'Ambiance Block 1', icon: '🕯️', fields: [
                { field: 'eyebrow', label: 'Eyebrow Tag', type: 'text' },
                { field: 'heading', label: 'Heading', type: 'text' },
                { field: 'text', label: 'Description', type: 'textarea' },
                { field: 'imageUrl', label: 'Photo', type: 'image' },
              ]},
              { key: 'ambiance2', label: 'Ambiance Block 2', icon: '🪑', fields: [
                { field: 'heading', label: 'Heading', type: 'text' },
                { field: 'text', label: 'Description', type: 'textarea' },
                { field: 'imageUrl', label: 'Photo', type: 'image' },
              ]},
              { key: 'chef', label: 'Chef Spotlight', icon: '👨‍🍳', fields: [
                { field: 'role', label: 'Role Tag', type: 'text' },
                { field: 'name', label: 'Chef Name', type: 'text' },
                { field: 'bio', label: 'Bio', type: 'textarea' },
                { field: 'imageUrl', label: 'Portrait Photo', type: 'image' },
              ]},
              { key: 'marquee', label: 'Scrolling Marquee', icon: '🎞️', fields: [
                { field: 'items', label: 'Items (comma separated)', type: 'text' },
              ]},
              { key: 'reserve', label: 'Reservation Footer', icon: '📅', fields: [
                { field: 'eyebrow', label: 'Eyebrow Tag', type: 'text' },
                { field: 'heading', label: 'Heading', type: 'text' },
                { field: 'hours', label: 'Opening Hours', type: 'text' },
                { field: 'address', label: 'Address', type: 'text' },
                { field: 'email', label: 'Email', type: 'text' },
                { field: 'phone', label: 'Phone', type: 'text' },
              ]},
            ];
            const loginSections: typeof landingSections = [
              { key: 'panel', label: 'Welcome Panel', icon: '🔑', fields: [
                { field: 'subtitle', label: 'Welcome Text', type: 'textarea' },
                { field: 'imageUrl', label: 'Side Illustration', type: 'image' },
              ]},
              { key: 'slide1', label: 'Loyalty Slide 1', icon: '1️⃣', fields: [
                { field: 'title', label: 'Title', type: 'text' },
                { field: 'highlight', label: 'Highlight Word', type: 'text' },
                { field: 'desc', label: 'Description', type: 'textarea' },
              ]},
              { key: 'slide2', label: 'Loyalty Slide 2', icon: '2️⃣', fields: [
                { field: 'title', label: 'Title', type: 'text' },
                { field: 'highlight', label: 'Highlight Word', type: 'text' },
                { field: 'desc', label: 'Description', type: 'textarea' },
              ]},
              { key: 'slide3', label: 'Loyalty Slide 3', icon: '3️⃣', fields: [
                { field: 'title', label: 'Title', type: 'text' },
                { field: 'highlight', label: 'Highlight Word', type: 'text' },
                { field: 'desc', label: 'Description', type: 'textarea' },
              ]},
            ];
            const activeSections = layoutPage === 'landing' ? landingSections : layoutPage === 'login' ? loginSections : [];
            const defaultOrder = ['statement', 'dishes', 'ambiance1', 'ambiance2', 'chef', 'marquee', 'reserve'];
            const order: string[] = Array.isArray(layoutContent?.landing?.sectionOrder) && layoutContent.landing.sectionOrder.length
              ? layoutContent.landing.sectionOrder
              : defaultOrder;
            const sortedSections = layoutPage === 'landing'
              ? [landingSections[0], ...order.map(k => landingSections.find(s => s.key === k)!).filter(Boolean)]
              : activeSections;

            return (
              <div className="space-y-5">
                <div>
                  <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Layout Editor</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Click a section to edit its text and images. Use the eye to hide it, arrows to reorder. Everything autosaves and shows live in the preview.</p>
                </div>

                {/* Page selector pills */}
                <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px] font-black uppercase">
                  {([
                    { id: 'landing', label: '🌐 Landing' },
                    { id: 'login', label: '🔑 Login' },
                    { id: 'dashboard', label: '📊 Dashboard' }
                  ] as const).map(pg => (
                    <button
                      key={pg.id}
                      onClick={() => { setLayoutPage(pg.id); setPreviewTab(pg.id); setExpandedSection(null); }}
                      className={`flex-1 px-2 py-2 rounded-md cursor-pointer border-none transition ${layoutPage === pg.id ? 'bg-indigo-600 text-white' : 'bg-transparent text-slate-500 hover:text-white'}`}
                    >
                      {pg.label}
                    </button>
                  ))}
                </div>

                {layoutPage === 'dashboard' ? (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <p className="text-[10px] text-slate-400 font-bold">📊 The staff dashboard renders live business data (orders, bookings, menu items), so its content is not text-editable.</p>
                    <p className="text-[10px] text-slate-500">You can change its layout style in the <button onClick={() => setEditorSection('layouts')} className="text-indigo-400 underline bg-transparent border-none cursor-pointer p-0 text-[10px] font-bold">Pages tab</button>, and its branding follows your Theme &amp; Font settings.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sortedSections.map((section) => {
                      const secData = layoutContent?.[layoutPage]?.[section.key] || {};
                      const isHidden = secData.visible === false;
                      const isExpanded = expandedSection === section.key;
                      const canReorder = layoutPage === 'landing' && section.key !== 'hero';
                      return (
                        <div key={section.key} className={`bg-slate-950 border rounded-xl overflow-hidden transition ${isExpanded ? 'border-indigo-500/50' : 'border-slate-800'} ${isHidden ? 'opacity-50' : ''}`}>
                          {/* Section row header */}
                          <div className="flex items-center gap-2 px-3 py-2.5">
                            <span className="text-slate-600 cursor-grab text-xs">⠿</span>
                            <button
                              onClick={() => setExpandedSection(isExpanded ? null : section.key)}
                              className="flex-1 flex items-center gap-2 bg-transparent border-none cursor-pointer text-left"
                            >
                              <span className="text-sm">{section.icon}</span>
                              <span className="text-[11px] font-bold text-slate-200">{section.label}</span>
                            </button>
                            {canReorder && (
                              <>
                                <button onClick={() => moveSection(section.key, -1)} title="Move up" className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-none cursor-pointer text-[10px]">↑</button>
                                <button onClick={() => moveSection(section.key, 1)} title="Move down" className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-none cursor-pointer text-[10px]">↓</button>
                              </>
                            )}
                            {section.key !== 'hero' && section.key !== 'panel' && (
                              <button
                                onClick={() => toggleSectionVisibility(layoutPage, section.key)}
                                title={isHidden ? 'Show section' : 'Hide section'}
                                className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800 border-none cursor-pointer text-[10px]"
                              >
                                {isHidden ? '🚫' : '👁️'}
                              </button>
                            )}
                            <button
                              onClick={() => setExpandedSection(isExpanded ? null : section.key)}
                              className="w-6 h-6 flex items-center justify-center rounded-md bg-transparent text-slate-500 border-none cursor-pointer text-[9px]"
                            >
                              {isExpanded ? '▲' : '▼'}
                            </button>
                          </div>

                          {/* Expanded editor form */}
                          {isExpanded && (
                            <div className="px-3 pb-3 pt-1 space-y-3 border-t border-slate-800/60">
                              {section.fields.map(f => (
                                <div key={f.field} className="space-y-1">
                                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-500">{f.label}</label>
                                  {f.type === 'textarea' ? (
                                    <textarea
                                      rows={2}
                                      value={secData[f.field] || ''}
                                      onChange={(e) => updateSectionField(layoutPage, section.key, f.field, e.target.value)}
                                      placeholder="Default content shown until you type…"
                                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-[11px] text-white placeholder-slate-600 outline-none transition resize-none"
                                    />
                                  ) : f.type === 'image' ? (
                                    <div className="space-y-1.5">
                                      {secData[f.field] && (
                                        <img src={secData[f.field]} alt="preview" className="w-full h-20 object-cover rounded-lg border border-slate-800" />
                                      )}
                                      <input
                                        type="text"
                                        value={secData[f.field] || ''}
                                        onChange={(e) => updateSectionField(layoutPage, section.key, f.field, e.target.value)}
                                        placeholder="Paste image URL…"
                                        className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-[11px] text-white placeholder-slate-600 outline-none transition"
                                      />
                                      <label className="flex items-center justify-center gap-1.5 w-full py-2 bg-slate-900 hover:bg-slate-800 border border-dashed border-slate-700 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white cursor-pointer transition">
                                        📤 Upload image
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleLayoutImageUpload(layoutPage, section.key, f.field, file);
                                          }}
                                        />
                                      </label>
                                    </div>
                                  ) : (
                                    <input
                                      type="text"
                                      value={secData[f.field] || ''}
                                      onChange={(e) => updateSectionField(layoutPage, section.key, f.field, e.target.value)}
                                      placeholder="Default content shown until you type…"
                                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-[11px] text-white placeholder-slate-600 outline-none transition"
                                    />
                                  )}
                                </div>
                              ))}
                              <button
                                onClick={() => {
                                  setLayoutContent((prev: any) => {
                                    const pageCopy = { ...(prev?.[layoutPage] || {}) };
                                    delete pageCopy[section.key];
                                    return { ...prev, [layoutPage]: pageCopy };
                                  });
                                }}
                                className="w-full py-1.5 bg-transparent hover:bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-bold text-slate-500 hover:text-rose-400 cursor-pointer transition"
                              >
                                ↺ Reset section to default
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {editorSection === 'menu' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Food Menu Catalog</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Manage dishes visible on your digital menu.</p>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {dbProducts.map(prod => (
                  <div key={prod.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex justify-between items-center gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={prod.imageUrl} className="w-10 h-10 object-cover rounded-lg border border-slate-800" alt="dish" />
                      <div className="min-w-0">
                        <span className="block text-[11px] font-bold text-white truncate leading-tight">{prod.name}</span>
                        <span className="block text-[9px] text-slate-450 uppercase mt-0.5">{prod.category}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-black text-indigo-400">₹{prod.price}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => router.push(`/builder/${projectId}?tab=products`)}
                className="w-full py-3 bg-indigo-650 hover:bg-indigo-755 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition cursor-pointer border-none shadow-md"
              >
                📊 Open Catalog CRUD Manager
              </button>
            </div>
          )}

          {/* SECTION: Domain publication settings */}
          {editorSection === 'publish' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-[13px] font-semibold tracking-tight text-slate-100">Secure site subdomain</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Configure your online presence URL prefix.</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 block text-left">Custom Subdomain Prefix</label>
                  <div className="flex bg-slate-900 border border-slate-800 rounded-lg overflow-hidden p-1 focus-within:border-indigo-500 transition">
                    <input
                      type="text"
                      value={subdomain}
                      onChange={e => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      placeholder="my-cafe"
                      className="flex-grow bg-transparent px-3 py-1.5 text-xs text-white outline-none"
                    />
                    <span className="bg-slate-950 border border-slate-850 px-3 py-1.5 text-[10px] font-bold text-slate-400 rounded-md flex items-center">
                      .zatbiz.site
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-950/20 border border-indigo-900/30 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-400">Current Status:</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    {status}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePublishTheme}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-indigo-650 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg transition hover:scale-[1.01] cursor-pointer border-none"
                >
                  🚀 Publish Live Customizations
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer publisher summary */}
        <div className="p-3.5 border-t border-slate-800/70 text-[10px] font-medium text-slate-500 flex justify-between items-center">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Autosave active</span>
          <span>H2 sync</span>
        </div>

      </aside>

      {/* RIGHT WORKSPACE PANELS: Viewport preview */}
      <main className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden relative">
        
        {/* Viewport Control Bar */}
        <div className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex justify-between items-center z-10 select-none">
          
          {/* Responsive viewport switchers */}
          <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-850 text-[10px] font-black uppercase">
            {[
              { id: 'desktop', label: '🖥️ Desktop' },
              { id: 'tablet', label: '📱 Tablet' },
              { id: 'mobile', label: '📞 Mobile' }
            ].map(vp => (
              <button
                key={vp.id}
                onClick={() => setViewportWidth(vp.id as any)}
                className={`px-3 py-1.5 rounded-md cursor-pointer border-none transition ${viewportWidth === vp.id ? 'bg-slate-800 text-white font-black shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-300'}`}
              >
                {vp.label}
              </button>
            ))}
          </div>

          {/* Page switch tabs */}
          <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-855 text-[10px] font-black uppercase">
            {[
              { id: 'landing', label: '🌐 Diner Storefront' },
              { id: 'login', label: '🔑 Access Login' },
              { id: 'dashboard', label: '📊 Staff Dashboard' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPreviewTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-md cursor-pointer border-none transition ${previewTab === tab.id ? 'bg-indigo-650 text-white font-black shadow-sm' : 'bg-transparent text-slate-450 hover:text-slate-305'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Publish trigger shortcut */}
          <button
            onClick={handlePublishTheme}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer border-none"
          >
            Publish changes
          </button>
        </div>

        {/* Viewport container scroll view */}
        <div className="flex-grow overflow-auto p-8 flex items-start justify-center bg-[#07090e]">
          <style>{`
            .zb-canvas [data-section]{outline:2px solid transparent;outline-offset:-2px;cursor:pointer;transition:outline-color .15s}
            .zb-canvas [data-section]:hover{outline-color:${themeColor}}
          `}</style>
          <div
            className="zb-canvas transition-all duration-300 bg-black shadow-2xl rounded-3xl overflow-hidden min-h-[500px] border border-slate-850"
            style={{
              width: viewportWidth === 'desktop' ? '100%' : viewportWidth === 'tablet' ? '768px' : '390px'
            }}
            onClickCapture={(e) => {
              const target = e.target as HTMLElement;
              // Let inline text fields and the image-replace button work normally.
              if (target.closest('.zb-ed') || target.closest('.zb-img-btn')) return;

              const el = target.closest('[data-section]');
              // Any click on the live preview jumps into the Layout editor…
              setEditorSection('layout');
              if (el) {
                const key = el.getAttribute('data-section');
                if (key) {
                  setLayoutPage(previewTab === 'dashboard' ? 'landing' : previewTab);
                  setExpandedSection(key);
                }
              }
              // Block navigation/booking buttons while editing on the canvas.
              if (target.closest('a, button')) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {/* Viewport content */}
            {previewTab === 'landing' ? (
              <RestaurantStorefront
                projectId={projectId}
                project={resolvedProject}
                dbProducts={dbProducts}
                cartCount={0}
                onAddToCart={() => {}}
                setIsBookingModalOpen={() => {}}
                customerSession={null}
                onLogout={() => {}}
                shopNiche={restaurantInfo?.subcategory || 'Fine Dining'}
                restaurantInfo={resolvedRestaurantInfo}
                editMode
                overrides={layoutContent?.landing}
                onEdit={(path, value) => {
                  const [section, field] = path.split('.');
                  updateSectionField('landing', section, field, value);
                }}
                onPickFile={(path, file) => {
                  const [section, field] = path.split('.');
                  handleLayoutImageUpload('landing', section, field, file);
                }}
              />
            ) : previewTab === 'login' ? (
              <CategoryLoginTemplate
                projectId={projectId}
                companyName={companyName}
                logoIcon={logoIcon}
                logoUrl={logoUrl}
                isSignUp={false}
                setIsSignUp={() => {}}
                errorMessage=""
                successMessage=""
                handleLoginSubmit={() => {}}
                niche={restaurantInfo?.subcategory || 'Fine Dining'}
                themeColor={themeColor}
                img={layoutContent?.login?.panel?.imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?w=800"}
                desc={layoutContent?.login?.panel?.subtitle || description}
                emoji={logoIcon}
                restaurantInfo={resolvedRestaurantInfo}
                editMode
                onEdit={(path, value) => {
                  const [section, field] = path.split('.');
                  updateSectionField('login', section, field, value);
                }}
                onPickFile={(path, file) => {
                  const [section, field] = path.split('.');
                  handleLayoutImageUpload('login', section, field, file);
                }}
              />
            ) : (
              <CategoryDashboardTemplate
                projectId={projectId}
                project={resolvedProject}
                clientEmail="diner@test.com"
                theme={{}}
                onLogout={() => {}}
                companyName={companyName}
                setCompanyName={setCompanyName}
                logoIcon={logoIcon}
                logoUrl={logoUrl}
                shopNiche={restaurantInfo?.subcategory || 'Fine Dining'}
                niche={restaurantInfo?.subcategory || 'Fine Dining'}
                primaryColor={themeColor}
                accentBg="bg-indigo-50"
                emoji={logoIcon}
                metrics={[]}
              />
            )}
          </div>
        </div>

      </main>

    </div>
  );
}
