'use client';

import React, { useState, useEffect } from 'react';

interface ThemeOption {
  id: string;
  name: string;
  desc: string;
  color: string;
  bgColor: string;
  accentBg: string;
  text: string;
}

interface LayoutOption {
  id: string;
  name: string;
  desc: string;
  previewIcon: string;
}

// 10 Medical Shop Themes
export const MEDICAL_THEMES: ThemeOption[] = [
  { id: 'emerald-cure', name: 'Emerald Cure', desc: 'Classic pharmacy look. Trusted, clean, and organic green accents.', color: '#10b981', bgColor: 'bg-emerald-500', accentBg: 'bg-emerald-50', text: 'text-emerald-700' },
  { id: 'pulse-modern', name: 'Pulse Modern', desc: 'High-tech medical shop. Vivid teal and electric cyan styling.', color: '#0ea5e9', bgColor: 'bg-sky-500', accentBg: 'bg-sky-50', text: 'text-sky-700' },
  { id: 'clinical-blue', name: 'Clinical Blue', desc: 'Clinical precision. Calm royal blue and ice white detailing.', color: '#3b82f6', bgColor: 'bg-blue-500', accentBg: 'bg-blue-50', text: 'text-blue-700' },
  { id: 'wellness-green', name: 'Wellness Mint', desc: 'Mint & sage organic aesthetic. Best for natural and Ayurvedic remedies.', color: '#059669', bgColor: 'bg-emerald-600', accentBg: 'bg-emerald-100', text: 'text-emerald-800' },
  { id: 'emergency-red', name: 'Emergency Red', desc: 'High visibility. Deep red and light rose for quick-response setups.', color: '#ef4444', bgColor: 'bg-red-500', accentBg: 'bg-red-50', text: 'text-red-700' },
  { id: 'life-care', name: 'Life Care', desc: 'Premium lifestyle pharmacy. Rich violet and pinkish grape tones.', color: '#8b5cf6', bgColor: 'bg-violet-500', accentBg: 'bg-violet-50', text: 'text-violet-700' },
  { id: 'diabetes-orange', name: 'Vital Orange', desc: 'Highly visible, energetic warm orange theme for general wellness.', color: '#f97316', bgColor: 'bg-orange-500', accentBg: 'bg-orange-50', text: 'text-orange-700' },
  { id: 'pediatric-pastel', name: 'Pediatric Pastel', desc: 'Soft pastel pink and lavender, child-friendly apothecary look.', color: '#ec4899', bgColor: 'bg-pink-500', accentBg: 'bg-pink-50', text: 'text-pink-700' },
  { id: 'surgical-dark', name: 'Surgical Dark', desc: 'Sleek dark theme. Slate grey & navy for professional surgical supplies.', color: '#475569', bgColor: 'bg-slate-600', accentBg: 'bg-slate-100', text: 'text-slate-700' },
  { id: 'global-pharma', name: 'Global Pharma', desc: 'International supply chains. Indigo and ocean cyan colors.', color: '#4f46e5', bgColor: 'bg-indigo-600', accentBg: 'bg-indigo-50', text: 'text-indigo-750' },
];

// 10 Homepage Layout Options
export const HOMEPAGE_LAYOUTS: LayoutOption[] = [
  { id: 'search-centric', name: 'Search-Centric Banner', desc: 'Giant search bar dominates the hero section with quick category pills below.', previewIcon: '🔍' },
  { id: 'category-grid', name: 'Category Grid Focus', desc: 'Highlight major departments (Ayurvedic, Surgical) immediately below header.', previewIcon: '🗂️' },
  { id: 'emergency-contact', name: 'Emergency Hotline Focus', desc: 'Presents a bold emergency dialer block and a sticky prescription uploader.', previewIcon: '🚨' },
  { id: 'deals-showcase', name: 'Deals & Best Sellers', desc: 'Emphasizes today\'s discount banners and top trending pharmaceutical items.', previewIcon: '🏷️' },
  { id: 'consult-chatbot', name: 'Chatbot & Consult Focus', desc: 'Features a large doctor chat layout alongside regular ordering buttons.', previewIcon: '💬' },
  { id: 'blog-articles', name: 'Health Advisory Blog', desc: 'Highlights medical advice, wellness newsletters, and articles above the fold.', previewIcon: '📰' },
  { id: 'minimal-apothecary', name: 'Minimalist Apothecary', desc: 'Elegant, white-space heavy layout with a simple search box and catalog.', previewIcon: '🌿' },
  { id: 'deals-carousel', name: 'Interactive Banner Slides', desc: 'Rotates giant banners of active coupons and holiday medical packages.', previewIcon: '🎠' },
  { id: 'sidebar-shop', name: 'Sidebar Category Shop', desc: 'Splits homepage with a permanent left category side panel and right grid.', previewIcon: '🧱' },
  { id: 'store-locator', name: 'Store Locator Focus', desc: 'Embeds store schedules, Google Maps API block, and radius checkout guidelines.', previewIcon: '📍' },
];

// 10 Login Layout Options (with illustration)
export const LOGIN_LAYOUTS: LayoutOption[] = [
  { id: 'left-vector', name: 'Left Vector Split', desc: 'Stunning pharmacist illustration on the left, login form on the right.', previewIcon: '🎨' },
  { id: 'right-vector', name: 'Right Vector Split', desc: 'Illustrative pharmacy scene on the right side, form on the left.', previewIcon: '🖼️' },
  { id: 'floating-pills', name: 'Floating Pills Glassmorphism', desc: 'Centered card floating over a dynamic background of vector medicine pills.', previewIcon: '💊' },
  { id: 'top-logo-card', name: 'Minimal Card & Logo', desc: 'Elegant centered login card with a clean hospital emblem on top.', previewIcon: '🛡️' },
  { id: 'wave-divider', name: 'Curved Wave Split', desc: 'Separates illustration and inputs with a gorgeous brand-colored curve.', previewIcon: '🌊' },
  { id: 'neon-dark-split', name: 'High-Contrast Dark Split', desc: 'Sophisticated night mode layout with vibrant neon green accent lines.', previewIcon: '🌙' },
  { id: 'double-banner', name: 'Double Side Illustration', desc: 'Centered login forms framed by premium medical laboratory illustrations.', previewIcon: '🔬' },
  { id: 'glassmorphism-doctor', name: 'Glass Doctor Overlay', desc: 'Semi-transparent container floating over a consultation illustration.', previewIcon: '🩺' },
  { id: 'biological-grid', name: 'Chemical Bond Grid', desc: 'Login form flanked by a 3D structural grid of chemical bonds.', previewIcon: '🧬' },
  { id: 'pharmacist-stand', name: 'Pharmacist Smartphone Stand', desc: 'Sleek illustration of a pharmacist pointing at a giant login screen.', previewIcon: '📱' },
];

// 10 Dashboard Layout Options (User + Admin representation)
export const DASHBOARD_LAYOUTS: LayoutOption[] = [
  { id: 'metric-console', name: 'Metric-Heavy Dashboard', desc: 'Focuses on visual counters for sales, pending prescriptions, and orders.', previewIcon: '📊' },
  { id: 'split-inventory', name: 'Split Inventory Console', desc: 'Provides active low-stock alerts directly on the dashboard home screen.', previewIcon: '📦' },
  { id: 'prescription-inbox', name: 'Prescription Inbox Focus', desc: 'Admin layout featuring a giant feed of uploaded prescription documents.', previewIcon: '📥' },
  { id: 'customer-portal', name: 'Order Tracking Stepper', desc: 'User-side dashboard focusing on active delivery status pathways.', previewIcon: '🚚' },
  { id: 'loyalty-coupons', name: 'Loyalty Points Hub', desc: 'User-side layout showing points balance and redeemable coupon codes.', previewIcon: '✨' },
  { id: 'clean-lists', name: 'Clean List Panel', desc: 'Simple list-based interface with a left menu, omitting visual charts.', previewIcon: '📋' },
  { id: 'neon-admin-dark', name: 'Neon Admin Dark Mode', desc: 'Sleek administrative panel utilizing deep dark blues and emerald borders.', previewIcon: '🕶️' },
  { id: 'compact-tablet', name: 'Compact Tablet View', desc: 'Icon-only collapsible sidebars optimized for handheld pharmacy terminals.', previewIcon: '📱' },
  { id: 'delivery-map-tracker', name: 'Delivery Agent Map', desc: 'Embeds a map showing dispatch routes directly on the dashboard home.', previewIcon: '🗺️' },
  { id: 'reports-hub', name: 'Analytics & Reports Hub', desc: 'Shows detailed monthly comparisons, customer feedback ratings, and returns.', previewIcon: '📉' },
];

interface MedicalShopSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string, configData: any) => void;
}

export default function MedicalShopSelectorModal({
  isOpen,
  onClose,
  onSelectCategory
}: MedicalShopSelectorModalProps) {
  const [step, setStep] = useState(1);

  // Business Information States
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [description, setDescription] = useState('');

  // Step selections
  const [selectedTheme, setSelectedTheme] = useState(MEDICAL_THEMES[0].id);
  const [selectedHomepage, setSelectedHomepage] = useState(HOMEPAGE_LAYOUTS[0].id);
  const [selectedLogin, setSelectedLogin] = useState(LOGIN_LAYOUTS[0].id);
  const [selectedDashboard, setSelectedDashboard] = useState(DASHBOARD_LAYOUTS[0].id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTheme = MEDICAL_THEMES.find(t => t.id === selectedTheme) || MEDICAL_THEMES[0];

  const handleNext = () => {
    if (step === 1) {
      if (!businessName.trim()) {
        alert('Please enter a Medical Shop Name.');
        return;
      }
      if (!email.trim() || !phone.trim()) {
        alert('Please fill out the contact phone and email.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleGenerate = () => {
    const configData = {
      businessName: businessName.trim(),
      ownerName: ownerName.trim() || 'Pharmacist Director',
      mobileNo: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      companyDescription: description.trim() || 'Trusted local pharmacy offering rapid prescription fulfillment, genuine medications, and expert consultation.',
      selectedTheme,
      themeColor: currentTheme.color,
      selectedHomepageLayout: selectedHomepage,
      selectedLoginLayout: selectedLogin,
      selectedDashboardLayout: selectedDashboard
    };
    onSelectCategory('medical-shop', configData);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in text-slate-800">
      <div 
        className="bg-white border border-slate-200 text-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer z-10 font-bold"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <span>💊</span> Medical Shop Setup Wizard
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Step {step} of 5 — {step === 1 && 'Fill Business details'}
              {step === 2 && 'Select theme color and palette'}
              {step === 3 && 'Choose Homepage structure'}
              {step === 4 && 'Choose login screen with illustrations'}
              {step === 5 && 'Choose Admin & Customer Dashboard styles'}
            </p>
          </div>

          {/* Stepper indicators */}
          <div className="flex items-center gap-1.5 self-center">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s} 
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  s === step 
                    ? 'w-8 bg-emerald-600' 
                    : s < step 
                      ? 'w-2.5 bg-emerald-300' 
                      : 'w-2.5 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/20">
          
          {/* STEP 1: Business Info Form */}
          {step === 1 && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 px-5 py-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <span>🛡️</span> Let's collect your pharmacy details. This profile data is stored in Supabase and seeds your catalog.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-black text-slate-700">Medical Shop / Pharmacy Name *</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. LifeCare Pharmacy"
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-800 transition"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-black text-slate-700">Pharmacist Owner Name</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe (R.Ph.)"
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-800 transition"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-black text-slate-700">Emergency Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 99999 88888"
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-800 transition"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-black text-slate-700">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. contact@lifecare.com"
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-800 transition"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5 text-left">
                  <label className="text-xs font-black text-slate-700">Pharmacy Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your drugstore mission, licensing, delivery policies..."
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-800 transition resize-none"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-black text-slate-700">Store Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Shop 12, Medical Plaza"
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-800 transition"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 md:col-span-1">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-slate-700">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-lg px-2.5 py-2.5 text-[11px] outline-none text-slate-800 transition"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-slate-700">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-lg px-2.5 py-2.5 text-[11px] outline-none text-slate-800 transition"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-slate-700">Pin Code</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Pin"
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-lg px-2.5 py-2.5 text-[11px] outline-none text-slate-800 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Theme Selection (Big Screen layout) */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-sm font-extrabold text-slate-800">Select color theme style</h3>
                <p className="text-[11px] text-slate-500 mt-1">This sets the primary styling colors across all user and admin panels.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {MEDICAL_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`flex flex-col bg-white border rounded-2xl p-4 text-left shadow-sm hover:shadow-md transition cursor-pointer text-xs relative ${
                      selectedTheme === theme.id 
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                        : 'border-slate-200 hover:border-slate-350'
                    }`}
                  >
                    {/* Color display banner */}
                    <div className={`h-16 w-full rounded-xl ${theme.bgColor} flex items-center justify-center mb-3 relative`}>
                      <span className="text-white text-lg">💊</span>
                      <div className="absolute bottom-1.5 right-1.5 bg-white px-2 py-0.5 rounded text-[8px] font-black uppercase text-slate-800 shadow-sm border border-slate-100">
                        {theme.color}
                      </div>
                    </div>
                    
                    <h4 className="font-extrabold text-slate-800 mb-1">{theme.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-normal line-clamp-3">{theme.desc}</p>
                    
                    {selectedTheme === theme.id && (
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Homepage Layout Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-sm font-extrabold text-slate-800">Choose Homepage Layout</h3>
                <p className="text-[11px] text-slate-500 mt-1">Select the main structural flow of your storefront landing page.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {HOMEPAGE_LAYOUTS.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedHomepage(layout.id)}
                    className={`flex flex-col justify-between bg-white border rounded-2xl p-4 text-left shadow-sm hover:shadow-md transition cursor-pointer text-xs relative ${
                      selectedHomepage === layout.id 
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                        : 'border-slate-200 hover:border-slate-350'
                    }`}
                  >
                    <div className="space-y-2">
                      {/* Fake layout representation */}
                      <div className="h-20 w-full rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between p-2 relative overflow-hidden">
                        {/* Header bar */}
                        <div className="flex justify-between items-center w-full">
                          <div className="h-1.5 w-6 bg-slate-300 rounded" />
                          <div className="flex gap-1">
                            <div className="h-1.5 w-3 bg-slate-200 rounded" />
                            <div className="h-1.5 w-3 bg-slate-200 rounded" />
                          </div>
                        </div>
                        
                        {/* Custom content display based on option */}
                        <div className="flex-1 flex items-center justify-center text-2xl">
                          {layout.previewIcon}
                        </div>

                        {/* Footer bar */}
                        <div className="h-1.5 w-full bg-slate-200 rounded" />
                      </div>

                      <h4 className="font-extrabold text-slate-800">{layout.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold leading-normal line-clamp-3">{layout.desc}</p>
                    </div>

                    {selectedHomepage === layout.id && (
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black z-10">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Login Page Layout Selection */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-sm font-extrabold text-slate-800">Select Login Layout with Illustration</h3>
                <p className="text-[11px] text-slate-500 mt-1">Select the landing style for your admin and customer login pages.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {LOGIN_LAYOUTS.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLogin(layout.id)}
                    className={`flex flex-col justify-between bg-white border rounded-2xl p-4 text-left shadow-sm hover:shadow-md transition cursor-pointer text-xs relative ${
                      selectedLogin === layout.id 
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                        : 'border-slate-200 hover:border-slate-350'
                    }`}
                  >
                    <div className="space-y-2">
                      {/* Fake layout */}
                      <div className="h-20 w-full rounded-xl bg-slate-50 border border-slate-200 p-2 flex gap-1 items-center justify-center relative overflow-hidden">
                        {layout.id === 'left-vector' && (
                          <>
                            <div className="w-1/2 h-full bg-emerald-100 rounded-md flex items-center justify-center text-sm">🎨</div>
                            <div className="w-1/2 flex flex-col gap-1.5">
                              <div className="h-1 w-full bg-slate-300 rounded" />
                              <div className="h-2 w-full bg-slate-200 rounded" />
                              <div className="h-2 w-1/2 bg-emerald-500 rounded" />
                            </div>
                          </>
                        )}
                        {layout.id === 'right-vector' && (
                          <>
                            <div className="w-1/2 flex flex-col gap-1.5">
                              <div className="h-1 w-full bg-slate-300 rounded" />
                              <div className="h-2 w-full bg-slate-200 rounded" />
                              <div className="h-2 w-1/2 bg-emerald-500 rounded" />
                            </div>
                            <div className="w-1/2 h-full bg-emerald-100 rounded-md flex items-center justify-center text-sm">🖼️</div>
                          </>
                        )}
                        {layout.id !== 'left-vector' && layout.id !== 'right-vector' && (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xl">{layout.previewIcon}</span>
                            <div className="h-2.5 w-16 bg-slate-200 rounded-full" />
                          </div>
                        )}
                      </div>

                      <h4 className="font-extrabold text-slate-800">{layout.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold leading-normal line-clamp-3">{layout.desc}</p>
                    </div>

                    {selectedLogin === layout.id && (
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black z-10">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Dashboard Layout Selection */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-sm font-extrabold text-slate-800">Select Dashboard Structure</h3>
                <p className="text-[11px] text-slate-500 mt-1">Configure layout structures for User accounts and Admin control panels.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {DASHBOARD_LAYOUTS.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedDashboard(layout.id)}
                    className={`flex flex-col justify-between bg-white border rounded-2xl p-4 text-left shadow-sm hover:shadow-md transition cursor-pointer text-xs relative ${
                      selectedDashboard === layout.id 
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                        : 'border-slate-200 hover:border-slate-350'
                    }`}
                  >
                    <div className="space-y-2">
                      {/* Fake layout */}
                      <div className="h-20 w-full rounded-xl bg-slate-50 border border-slate-200 p-2 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex gap-1.5 items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <div className="h-1.5 w-10 bg-slate-300 rounded" />
                        </div>
                        <div className="flex-1 flex items-center justify-center text-lg">
                          {layout.previewIcon}
                        </div>
                        <div className="h-1 w-full bg-slate-200 rounded" />
                      </div>

                      <h4 className="font-extrabold text-slate-800">{layout.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold leading-normal line-clamp-3">{layout.desc}</p>
                    </div>

                    {selectedDashboard === layout.id && (
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black z-10">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <button
            onClick={step === 1 ? onClose : handleBack}
            className="px-5 py-2.5 text-xs font-black bg-white hover:bg-slate-150 text-slate-700 rounded-xl transition border border-slate-200 cursor-pointer"
          >
            {step === 1 ? 'Cancel' : '➔ Back'}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              STEP {step} / 5
            </span>

            {step < 5 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition cursor-pointer"
              >
                Continue ➔
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="px-6 py-2.5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition cursor-pointer animate-pulse"
              >
                Generate Medical Shop Website ➔
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
