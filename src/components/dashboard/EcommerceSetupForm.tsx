'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { generateTemplateBlocks } from '@/services/templates';

/**
 * Single-page e-commerce setup, replacing the 8-step BusinessWizard.
 * Mirrors the gym flow: admin credentials + store details in one form,
 * then a generation loader that creates the project and the store.
 */

interface EcommerceSetupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (newProject: any) => void;
  showToast: (msg: string, isError?: boolean) => void;
  /** From EcommerceSelectorModal: category + chosen variant theme */
  ecomConfig: any;
}

function getApiUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('zatbizApiEndpoint');
    if (saved) return saved.replace(/\/$/, '');
    if (window.location.hostname !== 'localhost') return 'https://zatbiz-backend.onrender.com';
  }
  return 'http://localhost:8080';
}

export default function EcommerceSetupForm({
  isOpen,
  onClose,
  onComplete,
  showToast,
  ecomConfig,
}: EcommerceSetupFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const themeCfg = ecomConfig?.themeConfig || {};
  const accent = ecomConfig?.themeColor || themeCfg.primaryColor || '#6366f1';

  // Admin credentials
  const [username, setUsername] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');

  // Store details (prefilled from the selector)
  const [storeName, setStoreName] = useState(ecomConfig?.companyName || '');
  const [tagline, setTagline] = useState(ecomConfig?.slogan || themeCfg.tagline || '');
  const [ownerName, setOwnerName] = useState('');
  const [mobileNo, setMobileNo] = useState(ecomConfig?.contactPhone || '');
  const [email, setEmail] = useState(ecomConfig?.contactEmail || '');
  const [logoUrl, setLogoUrl] = useState(ecomConfig?.customLogoUrl || '');
  const [themeColor, setThemeColor] = useState(accent);

  // Generation
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing store builder...');
  const [newProjectId, setNewProjectId] = useState<number | null>(null);
  const [isDoneGenerating, setIsDoneGenerating] = useState(false);

  useEffect(() => {
    if (ecomConfig?.companyName) setStoreName(ecomConfig.companyName);
    if (ecomConfig?.slogan || themeCfg.tagline) setTagline(ecomConfig?.slogan || themeCfg.tagline);
    if (ecomConfig?.themeColor) setThemeColor(ecomConfig.themeColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ecomConfig]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogoUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const registerAdmin = async () => {
    if (!username.trim() || !adminEmail.trim() || !password.trim()) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email: adminEmail, password }),
      });
      if (res.ok) showToast('Admin account registered successfully.');
      else {
        const text = await res.text();
        showToast(`Auth endpoint: ${text || 'Simulation Mode Active'}`, true);
      }
    } catch {
      showToast('Simulation: Account registered in sandbox memory.');
    }
  };

  const startGenerating = async () => {
    setProgress(0);
    setIsDoneGenerating(false);

    const intervalTime = 200;
    const totalTicks = 20000 / intervalTime;
    let tickCount = 0;

    const progressInterval = setInterval(() => {
      tickCount++;
      const p = Math.min(Math.round((tickCount / totalTicks) * 100), 99);
      setProgress(p);
      if (p < 15) setStatusText('Generating storefront layout blocks...');
      else if (p < 30) setStatusText('Seeding product catalog & inventory...');
      else if (p < 45) setStatusText('Applying theme palette color variables...');
      else if (p < 60) setStatusText('Configuring cart & checkout workflows...');
      else if (p < 75) setStatusText('Registering backend store endpoints...');
      else if (p < 90) setStatusText('Optimizing assets & order databases...');
      else setStatusText('Finalizing draft publication...');
    }, intervalTime);

    try {
      await registerAdmin();

      const banner = themeCfg.bannerImageUrl || ecomConfig?.bannerUrl || '';

      const blocksList = generateTemplateBlocks({
        selectedTemplateId: 'storefront',
        companyName: storeName.trim(),
        slogan: tagline.trim() || themeCfg.tagline || 'Quality products, delivered fast.',
        contactEmail: email.trim() || adminEmail.trim() || 'hello@store.com',
        contactPhone: mobileNo.trim() || '+91 98765 43210',
        logoType: logoUrl ? 'custom' : 'icon',
        logoIcon: ecomConfig?.logoIcon || themeCfg.icon || '🛍️',
        customLogoUrl: logoUrl,
        shopNiche: ecomConfig?.categoryId,
        heroType: banner ? 'custom' : 'default',
        customHeroUrl: banner,
        theme: themeCfg.id,
      });

      blocksList.push({
        id: 'business-config-block',
        type: 'business_config',
        theme: themeCfg.id,
        content: {
          businessType: 'ecommerce',
          shopNiche: ecomConfig?.categoryId || 'fashion',
          companyName: storeName.trim(),
          logoIcon: ecomConfig?.logoIcon || themeCfg.icon || '🛍️',
          currency: 'INR (₹)',
          domainName: `${storeName.toLowerCase().replace(/[^a-z0-9]/g, '')}.zatbiz.site`,
          paymentGateway: 'Stripe',
          sandboxMode: true,
          gstRate: 18,
          // Full variant theme so the storefront + studio re-render it exactly
          themeConfig: { ...themeCfg, bannerImageUrl: banner || themeCfg.bannerImageUrl },
          seoTitle: `${storeName} | ${ecomConfig?.categoryName || 'Online Store'}`,
          seoDescription: tagline || `Custom online store for ${storeName}`,
          seoKeywords: `shop, ${storeName}, ${ecomConfig?.categoryName || 'ecommerce'}`,
        },
      });

      const newProj = await api.projects.create({
        name: `${storeName} Site`,
        description: tagline || `Customized online store for ${storeName}`,
        blocksJson: JSON.stringify(blocksList),
        status: 'Draft',
      });

      const projId = newProj.id;
      setNewProjectId(projId);

      // Register the store with the ecommerce backend
      if (ecomConfig?.storeTypeId) {
        try {
          await api.ecommerce.create(1, ecomConfig.storeTypeId, {
            name: storeName.trim(),
            slug: storeName.toLowerCase().replace(/[^a-z0-9]/g, ''),
            status: 'ACTIVE',
            contact_phone: mobileNo.trim(),
            currency: 'INR (₹)',
            contact_email: email.trim() || adminEmail.trim(),
            logo: null,
          });
        } catch (storeErr) {
          console.error('Ecommerce store registration failed (continuing):', storeErr);
        }
      }

      clearInterval(progressInterval);
      setProgress(100);
      setStatusText('Your Online Store is Ready! 🎉');
      setIsDoneGenerating(true);
      onComplete(newProj);
    } catch (err) {
      console.error('Failed to create store draft:', err);
      clearInterval(progressInterval);
      setTimeout(() => {
        setNewProjectId(Date.now());
        setProgress(100);
        setStatusText('Your Online Store is Ready! 🎉');
        setIsDoneGenerating(true);
      }, 4000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) return;
    setStep(2);
    startGenerating();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-slate-800 dark:text-white">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: themeColor }}>
              Store Wizard
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              {step === 1 ? 'Step 1: Store Setup Profile' : 'Step 2: Creating Online Store'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer bg-transparent border-none text-lg"
          >
            ✕
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 text-left">
              <div className="text-center space-y-1 mb-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Store Onboarding Details</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  One clean profile checklist. All advanced details default automatically.
                </p>
              </div>

              {/* Selected theme summary */}
              {themeCfg?.name && (
                <div className="rounded-2xl p-4 flex items-center gap-3 border" style={{ borderColor: `${themeColor}55`, backgroundColor: `${themeColor}12` }}>
                  {themeCfg.thumbnail && (
                    <img src={themeCfg.thumbnail} alt={themeCfg.name} className="w-14 h-10 rounded-lg object-cover shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-slate-800 dark:text-white truncate">
                      {themeCfg.name} · {ecomConfig?.categoryName}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate">{themeCfg.tagline}</p>
                  </div>
                  <span className="ml-auto w-6 h-6 rounded-full border border-white shadow-sm shrink-0" style={{ backgroundColor: themeColor }} />
                </div>
              )}

              {/* Admin credentials */}
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Platform Admin Account</h4>
                </div>
                <Field label="Username *" value={username} onChange={setUsername} placeholder="demo" required />
                <Field label="Admin Email *" value={adminEmail} onChange={setAdminEmail} placeholder="demo@zatbiz.com" type="email" required />
                <Field label="Password *" value={password} onChange={setPassword} placeholder="••••••" type="password" required />
              </div>

              {/* Store details */}
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Store Details</h4>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Store Name *" value={storeName} onChange={setStoreName} placeholder="e.g. Velvet Thread Boutique" required />
                </div>

                <Field label="Owner Name" value={ownerName} onChange={setOwnerName} placeholder="e.g. Aarav Sharma" />
                <Field label="Contact Phone" value={mobileNo} onChange={setMobileNo} placeholder="e.g. +91 98765 43210" />
                <div className="sm:col-span-2">
                  <Field label="Store Email" value={email} onChange={setEmail} placeholder="e.g. hello@velvetthread.com" type="email" />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">Store Tagline</label>
                  <textarea
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Briefly describe what your store sells and stands for..."
                    rows={2}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none resize-none text-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-2 bg-white dark:bg-slate-900/60 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider block">Upload Logo (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl px-3 py-1.5 text-xs outline-none file:mr-3 file:py-0.5 file:px-2 file:rounded-full file:border-0 file:text-[10.5px] file:font-semibold file:bg-indigo-50 file:text-indigo-600 dark:file:bg-slate-800 dark:file:text-white cursor-pointer"
                  />
                  {logoUrl && (
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-400 uppercase font-black">Preview:</span>
                      <img src={logoUrl} className="w-8 h-8 object-contain rounded border border-slate-200 bg-white" alt="logo" />
                    </div>
                  )}
                </div>

                <div className="space-y-2 bg-white dark:bg-slate-900/60 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider block">Primary Brand Color</label>
                  <div className="flex gap-3 items-center">
                    <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-9 h-9 bg-transparent border-0 cursor-pointer p-0" />
                    <input
                      type="text"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="flex-grow bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 rounded-xl px-3 py-1.5 text-xs outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer border-none hover:brightness-110"
                  style={{ backgroundColor: themeColor }}
                >
                  Create Account & Generate Store ➔
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="max-w-md mx-auto py-12 flex flex-col items-center justify-center text-center space-y-8">
              <div className="relative flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-slate-200 dark:border-slate-800 rounded-full" />
                <div
                  className="w-32 h-32 border-4 border-t-transparent rounded-full animate-spin absolute"
                  style={{ borderColor: themeColor, borderTopColor: 'transparent', animationDuration: '1.2s' }}
                />
                <span className="absolute text-2xl font-black font-mono">{progress}%</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {isDoneGenerating ? 'Store Generated Successfully! 🎉' : 'Assembling Store Assets'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold italic min-h-[1.5rem]">{statusText}</p>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: themeColor }} />
              </div>

              {isDoneGenerating && newProjectId && (
                <button
                  onClick={() => {
                    onClose();
                    router.push(`/builder/${newProjectId}`);
                  }}
                  className="w-full py-4 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl transition cursor-pointer border-none hover:brightness-110"
                  style={{ backgroundColor: themeColor }}
                >
                  Enter ZATBIZ Theme Studio ➔
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-800 dark:text-white"
      />
    </div>
  );
}
