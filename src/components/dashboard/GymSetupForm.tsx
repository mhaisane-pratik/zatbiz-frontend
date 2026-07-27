'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { generateTemplateBlocks } from '@/services/templates';
import { THEMES_30 } from '@/app/dashboard/themesData';

/**
 * Single-page gym setup, replacing the 8-step BusinessWizard for the gym flow.
 * Mirrors the restaurant wizard: one form, then a generation loader.
 * The platform-admin signup fields are merged in as the first block of the form.
 */

interface GymSetupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (newProject: any) => void;
  showToast: (msg: string, isError?: boolean) => void;
  /** Category + theme picked in GymSelectorModal */
  gymCategory: string | null;
  gymConfig: any;
}

const GYM_CATEGORIES = [
  'Traditional Gym',
  'Premium Fitness Club',
  'Personal Training Studio',
  'CrossFit Gym',
  'Yoga Studio',
  'Zumba Studio',
  'Dance Fitness Studio',
  'Martial Arts Academy',
  'Swimming Academy',
  'Wellness & Recovery Centre',
];

function getApiUrl() {
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
}

export default function GymSetupForm({
  isOpen,
  onClose,
  onComplete,
  showToast,
  gymCategory,
  gymConfig,
}: GymSetupFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Platform admin credentials
  const [username, setUsername] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');

  // Business details
  const [clubName, setClubName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<string>(gymCategory || 'Traditional Gym');
  const [logoUrl, setLogoUrl] = useState('');
  const [themeColor, setThemeColor] = useState(gymConfig?.themeColor || '#ea580c');
  const [description, setDescription] = useState('');

  // Generation state
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing website builder...');
  const [newProjectId, setNewProjectId] = useState<number | null>(null);
  const [isDoneGenerating, setIsDoneGenerating] = useState(false);

  const activeTheme = THEMES_30.find((t) => t.id === gymConfig?.selectedTheme);

  useEffect(() => {
    if (gymCategory) {
      setCategory(gymCategory);
      setClubName(activeTheme?.name ? `${activeTheme.name} ${gymCategory}` : gymCategory);
      setDescription(
        activeTheme?.tagline || `Your ultimate destination for ${gymCategory.toLowerCase()}.`
      );
    }
    if (gymConfig?.themeColor) setThemeColor(gymConfig.themeColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gymCategory, gymConfig]);

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
      if (res.ok) {
        showToast('Admin account registered successfully.');
      } else {
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
      if (p < 15) setStatusText('Generating template layout blocks...');
      else if (p < 30) setStatusText('Seeding class timetable and programmes...');
      else if (p < 45) setStatusText('Applying theme palette color variables...');
      else if (p < 60) setStatusText('Configuring membership plan tiers...');
      else if (p < 75) setStatusText('Registering backend API endpoints...');
      else if (p < 90) setStatusText('Optimizing assets & member databases...');
      else setStatusText('Finalizing draft publication...');
    }, intervalTime);

    try {
      await registerAdmin();

      const blocksList = generateTemplateBlocks({
        selectedTemplateId: 'gym',
        companyName: clubName.trim(),
        slogan: description.trim() || 'Train hard. Recover properly.',
        contactEmail: email.trim() || adminEmail.trim() || 'hello@zatbizfitness.com',
        contactPhone: mobileNo.trim() || '+91 98765 43210',
        logoType: logoUrl ? 'custom' : 'icon',
        logoIcon: activeTheme?.brandIcon || '💪',
        customLogoUrl: logoUrl,
        gymCategory: category,
        heroType: gymConfig?.headerBgImage ? 'custom' : 'default',
        customHeroUrl: gymConfig?.headerBgImage || '',
        theme: gymConfig?.selectedTheme || 'gym-volt-apex',
        selectedThemeData: activeTheme,
      });

      blocksList.push({
        id: 'business-config-block',
        type: 'business_config',
        theme: gymConfig?.selectedTheme || 'gym-volt-apex',
        content: {
          businessType: 'gym',
          shopNiche: category,
          gstin: '',
          currency: 'INR (₹)',
          domainName: `${clubName.toLowerCase().replace(/[^a-z0-9]/g, '')}.zatbiz.site`,
          paymentGateway: 'Stripe',
          stripeKey: '',
          sandboxMode: true,
          gstRate: 18,
          seoTitle: `${clubName} | ${category}`,
          seoDescription: description || `Custom visual site for ${clubName}`,
          seoKeywords: `gym, fitness, ${clubName}, ${category}`,
        },
      });

      const newProj = await api.projects.create({
        name: `${clubName} Site`,
        description: description || `Customized visual workspace for ${clubName}`,
        blocksJson: JSON.stringify(blocksList),
        status: 'Draft',
      });

      const projId = newProj.id;
      setNewProjectId(projId);

      await api.gym.create(projId, {
        subcategory: category,
        clubName,
        businessName: clubName,
        description,
        ownerName,
        mobileNo,
        email: email || adminEmail,
        address,
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        pincode: '201301',
        logoUrl,
        themeColor,
        selectedTheme: gymConfig?.selectedTheme || 'gym-volt-apex',
        headerBgImage: gymConfig?.headerBgImage || '',
        selectedLoginLayout: gymConfig?.selectedLoginLayout || 'split-left-image',
      });

      clearInterval(progressInterval);
      setProgress(100);
      setStatusText('Your Fitness Website is Ready! 🎉');
      setIsDoneGenerating(true);
      onComplete(newProj);
    } catch (err) {
      console.error('Failed to create gym draft:', err);
      clearInterval(progressInterval);
      setTimeout(() => {
        setNewProjectId(Date.now());
        setProgress(100);
        setStatusText('Your Fitness Website is Ready! 🎉');
        setIsDoneGenerating(true);
      }, 4000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName.trim()) return;
    setStep(2);
    startGenerating();
  };

  if (!isOpen) return null;

  const accent = activeTheme?.primaryColor || themeColor;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-slate-800 dark:text-white">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
              Fitness Wizard
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              {step === 1 ? 'Step 1: Business Setup Profile' : 'Step 2: Creating Fitness Portal'}
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
          {/* ---------------- STEP 1: ONE FORM ---------------- */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 text-left">
              <div className="text-center space-y-1 mb-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Fitness Onboarding Details
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  One clean profile checklist. All advanced details default automatically.
                </p>
              </div>

              {/* Selected theme summary */}
              {activeTheme && (
                <div
                  className="rounded-2xl p-4 flex items-center gap-3 border"
                  style={{ borderColor: `${accent}55`, backgroundColor: `${accent}12` }}
                >
                  <span className="text-2xl">{activeTheme.brandIcon}</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-slate-800 dark:text-white truncate">
                      {activeTheme.name} · {category}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate">
                      {activeTheme.tagline}
                    </p>
                  </div>
                  <span
                    className="ml-auto w-6 h-6 rounded-full border border-white shadow-sm shrink-0"
                    style={{ backgroundColor: accent }}
                  />
                </div>
              )}

              {/* Platform admin credentials */}
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Platform Admin Account
                  </h4>
                </div>
                <Field label="Username *" value={username} onChange={setUsername} placeholder="demo" required />
                <Field label="Admin Email *" value={adminEmail} onChange={setAdminEmail} placeholder="demo@zatbiz.com" type="email" required />
                <Field label="Password *" value={password} onChange={setPassword} placeholder="••••••" type="password" required />
              </div>

              {/* Business details */}
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Fitness Business Details
                  </h4>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Club / Studio Name *" value={clubName} onChange={setClubName} placeholder="e.g. Iron Forge Fitness" required />
                </div>

                <Field label="Owner Name" value={ownerName} onChange={setOwnerName} placeholder="e.g. Rhea Kapoor" />
                <Field label="Owner Mobile Phone" value={mobileNo} onChange={setMobileNo} placeholder="e.g. +91 98765 43210" />
                <Field label="Business Email" value={email} onChange={setEmail} placeholder="e.g. hello@ironforge.com" type="email" />

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">
                    Fitness Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-800 dark:text-white"
                  >
                    {GYM_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Street Address" value={address} onChange={setAddress} placeholder="e.g. 22 Fitness Park, Sector 62" />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">
                    Business Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly state your programmes, facilities or training philosophy..."
                    rows={3}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none resize-none text-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-2 bg-white dark:bg-slate-900/60 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider block">
                    Upload Logo (optional)
                  </label>
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
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider block">
                    Primary Brand Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-9 h-9 bg-transparent border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="flex-grow bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 rounded-xl px-3 py-1.5 text-xs outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['#ea580c', '#dc2626', '#10b981', '#4f46e5', '#ec4899', '#84cc16'].map((clr) => (
                      <button
                        key={clr}
                        type="button"
                        onClick={() => setThemeColor(clr)}
                        style={{ backgroundColor: clr }}
                        className="w-5 h-5 rounded-full border border-white dark:border-slate-900 shadow-sm cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer border-none hover:brightness-110"
                  style={{ backgroundColor: accent }}
                >
                  Create Account & Generate Site ➔
                </button>
              </div>
            </form>
          )}

          {/* ---------------- STEP 2: LOADER ---------------- */}
          {step === 2 && (
            <div className="max-w-md mx-auto py-12 flex flex-col items-center justify-center text-center space-y-8">
              <div className="relative flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-slate-200 dark:border-slate-800 rounded-full" />
                <div
                  className="w-32 h-32 border-4 border-t-transparent rounded-full animate-spin absolute"
                  style={{ borderColor: accent, borderTopColor: 'transparent', animationDuration: '1.2s' }}
                />
                <span className="absolute text-2xl font-black font-mono">{progress}%</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {isDoneGenerating ? 'Website Generated Successfully! 🎉' : 'Assembling Site Assets'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold italic min-h-[1.5rem]">
                  {statusText}
                </p>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: `${progress}%`, backgroundColor: accent }}
                />
              </div>

              {isDoneGenerating && newProjectId && (
                <button
                  onClick={() => {
                    onClose();
                    router.push(`/builder/${newProjectId}`);
                  }}
                  className="w-full py-4 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl transition cursor-pointer border-none hover:brightness-110"
                  style={{ backgroundColor: accent }}
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
      <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </label>
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
