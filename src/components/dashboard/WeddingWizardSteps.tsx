'use client';

import React, { useState } from 'react';
import { generateTemplateBlocks } from '@/services/templates';
import { api } from '@/services/api';
import { useFileEncoder } from '@/hooks/useFileEncoder';
import { Project } from '@/types';

interface WeddingWizardStepsProps {
  step: number;
  setStep: (step: number) => void;
  selectedWeddingHomeOption: number;
  setSelectedWeddingHomeOption: (opt: number) => void;
  selectedWeddingLoginOption: number;
  setSelectedWeddingLoginOption: (opt: number) => void;
  selectedWeddingDashboardOption: number;
  setSelectedWeddingDashboardOption: (opt: number) => void;
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  slogan: string;
  setSlogan: (slogan: string) => void;
  contactEmail: string;
  setContactEmail: (email: string) => void;
  contactPhone: string;
  setContactPhone: (phone: string) => void;
  logoType: 'icon' | 'custom' | 'auto';
  setLogoType: (type: 'icon' | 'custom' | 'auto') => void;
  logoIcon: string;
  setLogoIcon: (icon: string) => void;
  customLogoUrl: string;
  setCustomLogoUrl: (url: string) => void;
  customHeroUrl: string;
  setCustomHeroUrl: (url: string) => void;
  domainType: 'subdomain' | 'custom';
  setDomainType: (type: 'subdomain' | 'custom') => void;
  subdomainPrefix: string;
  setSubdomainPrefix: (prefix: string) => void;
  customDomainName: string;
  setCustomDomainName: (name: string) => void;
  isRegistered: boolean;
  setIsRegistered: (reg: boolean) => void;
  isSigningUp: boolean;
  setIsSigningUp: (s: boolean) => void;
  isPublished: boolean;
  setIsPublished: (pub: boolean) => void;
  projectId: number | null;
  setProjectId: (id: number | null) => void;
  showToast: (text: string, isError?: boolean) => void;
  onClose: () => void;
  onComplete: (proj: any) => void;
  initialWeddingCategory?: string | null;
  gstin: string;
  currency: string;
  paymentGateway: string;
  stripeKey: string;
  sandboxMode: boolean;
  gstRate: number;
}

export default function WeddingWizardSteps({
  step,
  setStep,
  selectedWeddingHomeOption,
  setSelectedWeddingHomeOption,
  selectedWeddingLoginOption,
  setSelectedWeddingLoginOption,
  selectedWeddingDashboardOption,
  setSelectedWeddingDashboardOption,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  companyName,
  setCompanyName,
  slogan,
  setSlogan,
  contactEmail,
  setContactEmail,
  contactPhone,
  setContactPhone,
  logoType,
  setLogoType,
  logoIcon,
  setLogoIcon,
  customLogoUrl,
  setCustomLogoUrl,
  customHeroUrl,
  setCustomHeroUrl,
  domainType,
  setDomainType,
  subdomainPrefix,
  setSubdomainPrefix,
  customDomainName,
  setCustomDomainName,
  isRegistered,
  setIsRegistered,
  isSigningUp,
  setIsSigningUp,
  isPublished,
  setIsPublished,
  projectId,
  setProjectId,
  showToast,
  onClose,
  onComplete,
  initialWeddingCategory,
  gstin,
  currency,
  paymentGateway,
  stripeKey,
  sandboxMode,
  gstRate
}: WeddingWizardStepsProps) {
  const { encodeFile } = useFileEncoder();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSigningUp) return;
    setIsSigningUp(true);
    const getApiUrl = () => {
      if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
      }
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('zatbizApiEndpoint');
        if (saved) return saved.replace(/\/$/, '');
        if (window.location.hostname !== 'localhost') {
          return 'https://zatbiz-backend.onrender.com';
        }
      }
      return 'http://localhost:8080';
    };
    const baseUrl = getApiUrl();
    try {
      await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      showToast('Account registered successfully via Spring Boot Auth!');
    } catch (err) {
      console.warn('Simulation Mode Active');
      showToast('Simulation: Account registered in sandbox memory.');
    } finally {
      setIsSigningUp(false);
    }
    setIsRegistered(true);
    setContactEmail(email);
    // Auto populate subdomain
    if (username && !subdomainPrefix) {
      setSubdomainPrefix(username.toLowerCase().replace(/[^a-z0-9-]/g, '') + '-event');
    }
    setStep(2);
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      showToast('Company Brand Name is required.', true);
      return;
    }
    setIsSubmitting(true);
    
    // Theme mapping
    const presets = ['purple', 'sunset', 'deepblue', 'sunset', 'emerald', 'purple', 'sunset', 'deepblue', 'deepblue', 'sunset'];
    const chosenColor = presets[selectedWeddingHomeOption - 1] || 'purple';

    const blocksList = generateTemplateBlocks({
      selectedTemplateId: 'wedding',
      companyName: companyName.trim(),
      slogan: slogan.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      logoType: logoType === 'custom' ? 'custom' : 'icon',
      logoIcon,
      customLogoUrl,
      heroType: customHeroUrl ? 'custom' : 'default',
      customHeroUrl,
      weddingCategory: initialWeddingCategory || undefined,
      weddingHomeOption: selectedWeddingHomeOption,
      weddingLoginOption: selectedWeddingLoginOption,
      weddingDashboardOption: selectedWeddingDashboardOption,
    });

    blocksList.push({
      id: 'business-config-block',
      type: 'business_config',
      theme: chosenColor,
      content: {
        businessType: 'wedding',
        weddingCategory: initialWeddingCategory || undefined,
        weddingHomeOption: selectedWeddingHomeOption,
        weddingLoginOption: selectedWeddingLoginOption,
        weddingDashboardOption: selectedWeddingDashboardOption,
        gstin: gstin.trim(),
        currency,
        domainName: domainType === 'subdomain' ? `${subdomainPrefix || 'event'}.zatbiz.site` : customDomainName,
        paymentGateway,
        stripeKey,
        sandboxMode,
        gstRate,
        seoTitle: `${companyName} | Premium Wedding & Event Planner`,
        seoDescription: slogan || `Custom visual site for ${companyName}`,
        seoKeywords: 'wedding, event, planner, services',
      },
    });

    const payload = {
      name: `${companyName} Site`,
      description: slogan || `Customized Wedding & Event planning for ${companyName}`,
      blocksJson: JSON.stringify(blocksList),
      status: 'Draft',
    };

    try {
      const newProj = await api.projects.create(payload);
      setProjectId(newProj.id);
      showToast(`Website project initialized (ID: ${newProj.id})`);
      setStep(6);
    } catch (err) {
      console.error(err);
      const tempId = Date.now();
      setProjectId(tempId);
      showToast('Simulation: Project generated in sandbox memory.');
      setStep(6);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishLive = async () => {
    const presets = ['purple', 'sunset', 'deepblue', 'sunset', 'emerald', 'purple', 'sunset', 'deepblue', 'deepblue', 'sunset'];
    const chosenColor = presets[selectedWeddingHomeOption - 1] || 'purple';
    
    const blocksList = generateTemplateBlocks({
      selectedTemplateId: 'wedding',
      companyName: companyName.trim(),
      slogan: slogan.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      logoType: logoType === 'custom' ? 'custom' : 'icon',
      logoIcon,
      customLogoUrl,
      heroType: customHeroUrl ? 'custom' : 'default',
      customHeroUrl,
      weddingCategory: initialWeddingCategory || undefined,
      weddingHomeOption: selectedWeddingHomeOption,
      weddingLoginOption: selectedWeddingLoginOption,
      weddingDashboardOption: selectedWeddingDashboardOption,
    });

    blocksList.push({
      id: 'business-config-block',
      type: 'business_config',
      theme: chosenColor,
      content: {
        businessType: 'wedding',
        weddingCategory: initialWeddingCategory || undefined,
        weddingHomeOption: selectedWeddingHomeOption,
        weddingLoginOption: selectedWeddingLoginOption,
        weddingDashboardOption: selectedWeddingDashboardOption,
        gstin: gstin.trim(),
        currency,
        domainName: domainType === 'subdomain' ? `${subdomainPrefix || 'event'}.zatbiz.site` : customDomainName,
        paymentGateway,
        stripeKey,
        sandboxMode,
        gstRate,
        seoTitle: `${companyName} | Premium Wedding & Event Planner`,
        seoDescription: slogan || `Custom visual site for ${companyName}`,
        seoKeywords: 'wedding, event, planner, services',
      },
    });

    const payload = {
      name: `${companyName} Site`,
      description: slogan || `Customized Wedding & Event planning for ${companyName}`,
      blocksJson: JSON.stringify(blocksList),
      status: 'Published',
    };

    try {
      if (projectId) {
        const updated = await api.projects.update(projectId, { ...payload, id: projectId } as Project);
        onComplete(updated);
      } else {
        const newP = await api.projects.create(payload);
        setProjectId(newP.id);
        onComplete(newP);
      }
      setIsPublished(true);
      showToast('Website Published Live!');
    } catch (err) {
      console.error(err);
      setIsPublished(true);
      showToast('Published website in simulation mode.');
      onComplete({
        id: projectId || 999,
        name: companyName,
        description: slogan,
        blocksJson: JSON.stringify(blocksList),
        status: 'Published'
      });
    }
  };

  return (
    <>
      {step === 1 && (
        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="text-center max-w-sm mx-auto mb-6">
            <span className="text-4xl block mb-2">👋</span>
            <h4 className="text-base font-extrabold">Let's create your platform account</h4>
            <p className="text-xs text-slate-450 mt-1">
              First step is registering your primary administrator credentials to secure your workspace.
            </p>
          </div>
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Username</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. admin_merchant" className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. merchant@zatbiz.com" className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition" />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-800 max-w-md mx-auto">
            <button type="submit" disabled={isSigningUp} className="px-6 py-3 bg-indigo-650 hover:bg-indigo-755 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer border-none font-bold">
              {isSigningUp && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Register & Continue ➔
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center max-w-sm mx-auto mb-4">
            <span className="text-4xl block mb-2">🎨</span>
            <h4 className="text-sm font-extrabold text-white">Select Homepage Visual Layout</h4>
            <p className="text-xs text-slate-455 mt-1">Choose one of our 10 curated visual designs and homepage color themes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
            {[
              { id: 1, name: 'Lavender Blossom', theme: 'purple', color: '#8B5CF6', desc: 'Soft lilac palette, floral backdrop, hand-tied bouquet focus.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80' },
              { id: 2, name: 'Rose Gold Romance', theme: 'pink-gold', color: '#EC4899', desc: 'Blush pink, champagne borders, and premium ballroom vibes.', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=80' },
              { id: 3, name: 'Midnight Starry Night', theme: 'indigo-gold', color: '#3B82F6', desc: 'Deep indigo theme, glowing fairy lights, starlight overlays.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&auto=format&fit=crop&q=80' },
              { id: 4, name: 'Golden Palace Elegance', theme: 'gold', color: '#D97706', desc: 'Champagne gold accents, ivory borders, luxury castle lawns.', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=80' },
              { id: 5, name: 'Sage & Botanical Garden', theme: 'emerald', color: '#10B981', desc: 'Botanical sage green, organic leaf grids, fresh floral mandap.', image: 'https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?w=500&auto=format&fit=crop&q=80' },
              { id: 6, name: 'Blushing Bride Pastel', theme: 'pastel-pink', color: '#F472B6', desc: 'Classic pastel pink, white lace outlines, clean photo grids.', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&auto=format&fit=crop&q=80' },
              { id: 7, name: 'Burgundy & Wine Royal', theme: 'burgundy', color: '#991B1B', desc: 'Burgundy velvet tone, vintage gold borders, rich photo frames.', image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&auto=format&fit=crop&q=80' },
              { id: 8, name: 'Ocean Coastline Breeze', theme: 'teal-silver', color: '#0D9488', desc: 'Ocean aquamarine palette, silver highlights, beachside canopies.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80' },
              { id: 9, name: 'Teal & Modern Copper', theme: 'teal-copper', color: '#0F766E', desc: 'Sleek dark teal, metallic copper text, geometric layout.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=80' },
              { id: 10, name: 'Warm Champagne Dream', theme: 'champagne', color: '#F59E0B', desc: 'Ivory background, pearl borders, neutral clean headers.', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop&q=80' }
            ].map((opt) => {
              const isSelected = selectedWeddingHomeOption === opt.id;
              return (
                <div 
                  key={opt.id} 
                  onClick={() => setSelectedWeddingHomeOption(opt.id)}
                  className={`p-3 bg-slate-950 border rounded-2xl text-left cursor-pointer transition hover:scale-[1.01] hover:shadow-lg flex gap-4 ${isSelected ? 'border-indigo-500 shadow-md shadow-indigo-500/15' : 'border-slate-800 hover:border-slate-700'}`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-extrabold text-xs text-white flex items-center justify-between gap-2">
                      <span>{opt.name}</span>
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-700 flex items-center justify-center text-[8px]" style={{ backgroundColor: opt.color }} />
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed line-clamp-2">{opt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setStep(1)} className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 cursor-pointer">← Back</button>
            <button type="button" onClick={() => setStep(3)} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl cursor-pointer border-none">Select & Continue ➔</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center max-w-sm mx-auto mb-4">
            <span className="text-4xl block mb-2">🔒</span>
            <h4 className="text-sm font-extrabold text-white">Select Login Page Design</h4>
            <p className="text-xs text-slate-455 mt-1">Select one of our 10 premium portal login layout templates.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
            {[
              { id: 1, name: 'Glassmorphic Overlay', desc: 'Frosted transparent glass card floating over a blurred wedding ceremony.' },
              { id: 2, name: 'Split Screen Left Image', desc: 'Left half features an elegant ballroom photo; right half has clean white inputs.' },
              { id: 3, name: 'Minimalist Dark Purple', desc: 'Sleek dark charcoal page backdrop with glowing purple accents.' },
              { id: 4, name: 'Watercolor Rose Card', desc: 'Watercolor rose patterns framing the login form borders.' },
              { id: 5, name: 'Serif Classic Editorial', desc: 'Ivory background, high-contrast serif typography, and elegant thin borders.' },
              { id: 6, name: 'Clean Left Sidebar', desc: 'Login form sits in a left sidebar; right side displays full-screen visual.' },
              { id: 7, name: 'Luminous Glow Card', desc: 'Floating blurred card with glowing light orbs background.' },
              { id: 8, name: 'Royal Golden Crest', desc: 'Double gold borders enclosing a centered royal initials crest.' },
              { id: 9, name: 'Retro Sunset Gradient', desc: 'Coral pink to golden orange gradient background with clean borderless fields.' },
              { id: 10, name: 'Stark High-Contrast', desc: 'Pure white card, bold black outlines, and heavy headers.' }
            ].map((opt) => {
              const isSelected = selectedWeddingLoginOption === opt.id;
              return (
                <div 
                  key={opt.id} 
                  onClick={() => setSelectedWeddingLoginOption(opt.id)}
                  className={`p-4 bg-slate-950 border rounded-2xl text-left cursor-pointer transition hover:scale-[1.01] flex flex-col justify-between ${isSelected ? 'border-indigo-500 shadow-md shadow-indigo-500/15' : 'border-slate-800 hover:border-slate-700'}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-400 font-extrabold uppercase">Option #{opt.id}</span>
                    {isSelected && <span className="text-[10px] text-indigo-400 font-bold font-black">✓ Selected</span>}
                  </div>
                  <h5 className="font-extrabold text-xs text-white">{opt.name}</h5>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setStep(2)} className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 cursor-pointer">← Back</button>
            <button type="button" onClick={() => setStep(4)} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl cursor-pointer border-none">Select & Continue ➔</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center max-w-sm mx-auto mb-4">
            <span className="text-4xl block mb-2">📊</span>
            <h4 className="text-sm font-extrabold text-white">Select Dashboard Design</h4>
            <p className="text-xs text-slate-455 mt-1">Select one of our 10 dashboard layouts for user-side (client) and admin-side.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
            {[
              { id: 1, name: 'Glassmorphic Royale', desc: 'Frosted glass sidebar and card panels layered over purple gradients.' },
              { id: 2, name: 'Dark Purple Neon', desc: 'Pitch black backdrop, violet sidebar, and bright neon indicator graphs.' },
              { id: 3, name: 'Warm Gold Minimalist', desc: 'Ivory white backing, gold border buttons, serif fonts, and elegant headers.' },
              { id: 4, name: 'Grid-based Dashboard', desc: 'Strict grid alignment, drop shadows, and modern business cards.' },
              { id: 5, name: 'Modern Rose Sidebar', desc: 'Curved rose-pink left sidebar, soft background layout grids.' },
              { id: 6, name: 'Classic Floating Panels', desc: 'Separated floating card blocks over a light lavender canvas.' },
              { id: 7, name: 'Coral Pastel Sweet', desc: 'Bubbly rounded buttons, coral accents, soft layouts for birthdays.' },
              { id: 8, name: 'Dark Slate Technical', desc: 'Technical density metrics, charcoal panels, data layouts.' },
              { id: 9, name: 'Lavender Elegant Cream', desc: 'Lavender highlights, cream backgrounds, and premium borders.' },
              { id: 10, name: 'Cyber Neon Emerald', desc: 'Glowing green telemetry bars and clean dark tech frameworks.' }
            ].map((opt) => {
              const isSelected = selectedWeddingDashboardOption === opt.id;
              return (
                <div 
                  key={opt.id} 
                  onClick={() => setSelectedWeddingDashboardOption(opt.id)}
                  className={`p-4 bg-slate-950 border rounded-2xl text-left cursor-pointer transition hover:scale-[1.01] flex flex-col justify-between ${isSelected ? 'border-indigo-500 shadow-md shadow-indigo-500/15' : 'border-slate-800 hover:border-slate-700'}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-400 font-extrabold uppercase">Option #{opt.id}</span>
                    {isSelected && <span className="text-[10px] text-indigo-400 font-bold font-black">✓ Selected</span>}
                  </div>
                  <h5 className="font-extrabold text-xs text-white">{opt.name}</h5>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setStep(3)} className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 cursor-pointer">← Back</button>
            <button type="button" onClick={() => setStep(5)} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl cursor-pointer border-none font-bold">Select & Continue ➔</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <form onSubmit={handleDetailsSubmit} className="space-y-6">
          <div className="text-center max-w-sm mx-auto mb-4">
            <span className="text-4xl block mb-2">📋</span>
            <h4 className="text-sm font-extrabold text-white">Fill Brand Information</h4>
            <p className="text-xs text-slate-450 mt-1">Configure company name, logo, banner, and contact details.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[320px] overflow-y-auto pr-1 text-left">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Company / Brand Name *</label>
              <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Royal Wedding Planner" className="w-full bg-slate-955 border border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Brand Slogan / Line</label>
              <input type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} placeholder="e.g. Making wedding dreams come true" className="w-full bg-slate-955 border border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Email *</label>
              <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="e.g. planner@mail.com" className="w-full bg-slate-955 border border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Phone</label>
              <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="e.g. +91 99000 88221" className="w-full bg-slate-955 border border-slate-850 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition" />
            </div>

            <div className="md:col-span-2 bg-slate-955 border border-slate-850 p-4 rounded-2xl space-y-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Logo Upload</span>
              <div className="flex gap-4 text-xs text-slate-400 mb-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="logoOption" checked={logoType !== 'custom'} onChange={() => setLogoType('icon')} className="text-indigo-650" />
                  Initials / Auto-icon
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="logoOption" checked={logoType === 'custom'} onChange={() => setLogoType('custom')} className="text-indigo-650" />
                  Upload Graphics File
                </label>
              </div>
              {logoType === 'custom' ? (
                <div className="space-y-2">
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const base = await encodeFile(file);
                        setCustomLogoUrl(base);
                      } catch (err) { console.error(err); }
                    }
                  }} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-indigo-950 file:text-indigo-400 cursor-pointer" />
                  {customLogoUrl && <img src={customLogoUrl} className="w-12 h-12 object-contain bg-white rounded border" alt="logo preview" />}
                </div>
              ) : (
                <input type="text" value={logoIcon} onChange={(e) => setLogoIcon(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none" placeholder="Emoji icon (e.g. 💍)" />
              )}
            </div>

            <div className="md:col-span-2 bg-slate-955 border border-slate-850 p-4 rounded-2xl space-y-2">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Custom Hero Background Cover Image</span>
              <input type="file" accept="image/*" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const base = await encodeFile(file);
                    setCustomHeroUrl(base);
                  } catch (err) { console.error(err); }
                }
              }} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-indigo-950 file:text-indigo-400 cursor-pointer" />
              {customHeroUrl ? (
                <img src={customHeroUrl} className="w-24 h-12 object-cover rounded border" alt="cover preview" />
              ) : (
                <p className="text-[10px] text-slate-500">No custom background image uploaded. Curated theme photo will be used.</p>
              )}
            </div>
          </div>
          <div className="flex justify-between pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setStep(4)} className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 cursor-pointer font-bold">← Back</button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-750 disabled:opacity-50 text-white text-xs font-bold rounded-xl cursor-pointer border-none flex items-center gap-2 font-bold">
              {isSubmitting && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Generate Website ➔
            </button>
          </div>
        </form>
      )}

      {step === 6 && (
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            setStep(7);
          }}
          className="space-y-6"
        >
          <div className="text-center max-w-sm mx-auto mb-4">
            <span className="text-4xl block mb-2">🌐</span>
            <h4 className="text-sm font-extrabold text-white">Setup Web Domain</h4>
            <p className="text-xs text-slate-455 mt-1">Configure the address where users can open your public event planner site.</p>
          </div>
          <div className="space-y-4 max-w-md mx-auto text-left">
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850">
              <button type="button" onClick={() => setDomainType('subdomain')} className={`flex-1 py-2 text-[10px] font-bold rounded-lg cursor-pointer border-none bg-transparent ${domainType === 'subdomain' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>ZATBIZ Subdomain</button>
              <button type="button" onClick={() => setDomainType('custom')} className={`flex-1 py-2 text-[10px] font-bold rounded-lg cursor-pointer border-none bg-transparent ${domainType === 'custom' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Custom Domain</button>
            </div>

            {domainType === 'subdomain' ? (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Subdomain Prefix *</label>
                <div className="flex items-center bg-slate-950 border border-slate-800 focus-within:border-indigo-500 rounded-xl overflow-hidden px-4 py-3">
                  <input type="text" required value={subdomainPrefix} onChange={(e) => setSubdomainPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} placeholder="my-events" className="bg-transparent border-none outline-none text-xs text-white w-full pr-1 font-bold" />
                  <span className="text-xs text-slate-500 font-bold">.zatbiz.site</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Custom Domain URL *</label>
                <input type="text" required value={customDomainName} onChange={(e) => setCustomDomainName(e.target.value)} placeholder="e.g. www.royalevents.com" className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition font-bold" />
              </div>
            )}
          </div>
          <div className="flex justify-between pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setStep(5)} className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 cursor-pointer font-bold">← Back</button>
            <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl cursor-pointer border-none font-bold">Save & Continue ➔</button>
          </div>
        </form>
      )}

      {step === 7 && (
        <div className="space-y-6 animate-fade-in text-center">
          <div className="text-center max-w-sm mx-auto mb-4">
            <span className="text-4xl block mb-2 animate-bounce">🚀</span>
            <h4 className="text-sm font-extrabold text-white">{isPublished ? 'Your Site is Live!' : 'Ready to Launch'}</h4>
            <p className="text-xs text-slate-455 mt-1">Publish the planner portal and homepage to make it accessible to everyone.</p>
          </div>
          
          {isPublished ? (
            <div className="space-y-4 max-w-md mx-auto bg-slate-950/80 border border-slate-850 p-6 rounded-3xl text-left">
              <span className="text-xs text-emerald-450 font-black tracking-widest uppercase block mb-1">🎉 Launch Successful</span>
              <h4 className="text-sm font-extrabold text-white">Public Links:</h4>
              <div className="space-y-2 mt-3 text-xs font-semibold">
                <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Homepage:</span>
                  <a href={`/preview/${projectId}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">/preview/{projectId}</a>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Login Portal:</span>
                  <a href={`/preview/${projectId}/login`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">/preview/{projectId}/login</a>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Dashboard Panel:</span>
                  <a href={`/preview/${projectId}/dashboard`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">/preview/{projectId}/dashboard</a>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-850 flex flex-col gap-2">
                <div className="text-[10px] text-slate-500 font-bold leading-normal uppercase">
                  🔐 Admin Portal Credentials:<br />
                  Email: <span className="text-white">admin@gmail.com</span> | Password: <span className="text-white">any password</span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold leading-normal uppercase">
                  👤 Client Portal Credentials:<br />
                  Email: <span className="text-white">{contactEmail || 'your email'}</span> | Password: <span className="text-white">any password</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button 
                  onClick={() => {
                    onComplete({
                      id: projectId || 999,
                      name: companyName,
                      description: slogan,
                      blocksJson: '[]',
                      status: 'Published'
                    });
                  }}
                  className="px-6 py-2.5 bg-indigo-650 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl cursor-pointer border-none shadow-md"
                >
                  Edit Website ➔
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-slate-950 border border-slate-850 rounded-3xl text-center max-w-sm mx-auto space-y-4">
              <span className="text-xs text-slate-450 block font-semibold leading-relaxed">Click below to change status to live and make your Wedding & Event Planner site public!</span>
              <button 
                type="button" 
                onClick={handlePublishLive} 
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer border-none shadow-md transition hover:scale-[1.01]"
              >
                🚀 Publish Live Site
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
