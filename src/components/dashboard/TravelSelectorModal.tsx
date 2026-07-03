'use client';

import React, { useState } from 'react';

interface NicheCategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
  image: string;
}

export const TRAVEL_CATEGORIES: NicheCategory[] = [
  {
    id: 'Domestic Travel',
    name: 'Domestic Travel',
    icon: '🏨',
    desc: 'Local resort escapes, heritage stays, and regional sightseeing packages.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'International Travel',
    name: 'International Travel',
    icon: '✈️',
    desc: 'Global tourism itineraries, exotic getaways, and cross-border explorations.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Visa Consultant',
    name: 'Visa Consultant',
    icon: '📄',
    desc: 'Professional visa applications, documentation reviews, and immigration guidance.',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Tour Operator',
    name: 'Tour Operator',
    icon: '🚌',
    desc: 'Curated guided group tours, transport coordination, and sightseeing itineraries.',
    image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Hotel Booking',
    name: 'Hotel Booking',
    icon: '🏢',
    desc: 'Luxury hotel stays, boutique villa rentals, and pocket-friendly accommodations.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Flight Booking',
    name: 'Flight Booking',
    icon: '🛫',
    desc: 'Instant flight bookings, group airfare deals, and airline reservation support.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Adventure Tours',
    name: 'Adventure Tours',
    icon: '🧗‍♂️',
    desc: 'Trekking expeditions, white-water rafting, skydiving, and extreme sports.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Cruise',
    name: 'Cruise Packages',
    icon: '🚢',
    desc: 'Ocean liners, luxury cruise liners, and scenic river cruise bookings.',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Corporate Travel',
    name: 'Corporate Travel',
    icon: '💼',
    desc: 'Business itineraries, conference logistics, team retreats, and expense sync.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Honeymoon',
    name: 'Honeymoon Deals',
    icon: '💖',
    desc: 'Romantic couples retreats, private candle-lit dinners, and beachside suites.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Pilgrimage',
    name: 'Pilgrimage Tours',
    icon: '🕌',
    desc: 'Spiritual pathways, sacred shrines, temple listings, and religious guides.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'Cab Services',
    name: 'Cab Services',
    icon: '🚕',
    desc: 'Local taxi hires, airport pick-ups, outstation drops, and chauffeur rentals.',
    image: 'https://images.unsplash.com/photo-1492664738948-2ec93a5c0942?w=500&auto=format&fit=crop&q=80'
  }
];

const THEME_PRESETS = [
  { id: 'Blue', name: 'Ocean Blue', primary: '#0284c7', accent: '#e0f2fe', hover: '#0369a1' },
  { id: 'Green', name: 'Forest Green', primary: '#16a34a', accent: '#dcfce7', hover: '#15803d' },
  { id: 'Purple', name: 'Royal Purple', primary: '#9333ea', accent: '#f3e8ff', hover: '#7e22ce' },
  { id: 'Orange', name: 'Sunset Orange', primary: '#ea580c', accent: '#ffedd5', hover: '#c2410c' },
  { id: 'Dark', name: 'Obsidian Dark', primary: '#1e293b', accent: '#e2e8f0', hover: '#0f172a' },
  { id: 'Custom', name: 'Custom Color', primary: '#0d9488', accent: '#ccfbf1', hover: '#0f766e' }
];

interface TravelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string, configData: any) => void;
}

export default function TravelSelectorModal({
  isOpen,
  onClose,
  onSelectCategory
}: TravelSelectorModalProps) {
  const [step, setStep] = useState(1);

  // Step 2: Business Profile States
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNo, setWhatsappNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  // Step 3: Niche Category Selection
  const [selectedNiche, setSelectedNiche] = useState('Domestic Travel');

  // Step 4: Theme Settings
  const [themeColor, setThemeColor] = useState('Blue');
  const [customColorHex, setCustomColorHex] = useState('#0d9488');

  // Step 5: Asset Uploads
  const [logoUrl, setLogoUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [companyImages, setCompanyImages] = useState<string[]>([]);
  const [tempGalleryInput, setTempGalleryInput] = useState('');

  // Step 6: Domain Setup
  const [domainType, setDomainType] = useState<'subdomain' | 'custom'>('subdomain');
  const [subdomainName, setSubdomainName] = useState('');
  const [customDomainName, setCustomDomainName] = useState('');

  // Step 7: Booking Settings
  const [approvalMode, setApprovalMode] = useState<'instant' | 'manual'>('instant');
  const [paymentMode, setPaymentMode] = useState<'full' | 'partial'>('full');
  const [cancellationPolicy, setCancellationPolicy] = useState('Cancel up to 24 hours in advance for a full refund.');
  const [refundPolicy, setRefundPolicy] = useState('Refunds processed within 5-7 business days.');

  // Step 8: Add First Package Form
  const [packageName, setPackageName] = useState('');
  const [packageDestination, setPackageDestination] = useState('');
  const [packageCountry, setPackageCountry] = useState('India');
  const [packageDuration, setPackageDuration] = useState('5 Days / 4 Nights');
  const [packagePrice, setPackagePrice] = useState('');
  const [packageDiscount, setPackageDiscount] = useState('10');
  const [packageDesc, setPackageDesc] = useState('');
  const [packageInclusions, setPackageInclusions] = useState('Luxury hotel stay, Buffet breakfast, Local guide transfers');
  const [packageExclusions, setPackageExclusions] = useState('Flight tickets, Personal tips, Extra sightseeing entrance fees');
  const [packageItinerary, setPackageItinerary] = useState('Day 1: Arrival & Hotel Check-in. Day 2: Guided City Tour. Day 3: Leisure activity day. Day 4: Scenic cruise excursion. Day 5: Airport dropoff.');
  const [flightIncluded, setFlightIncluded] = useState(false);
  const [guideIncluded, setGuideIncluded] = useState(true);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setter(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setGalleryImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  if (!isOpen) return null;

  const handleStart = () => setStep(2);
  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    // Generate theme colors
    const activePreset = THEME_PRESETS.find(t => t.id === themeColor) || THEME_PRESETS[0];
    const finalPrimary = themeColor === 'Custom' ? customColorHex : activePreset.primary;
    const finalHover = themeColor === 'Custom' ? customColorHex : activePreset.hover;

    // Package structure
    const firstPackage = packageName ? {
      name: packageName,
      destination: packageDestination || 'Delhi NCR',
      country: packageCountry,
      duration: packageDuration,
      price: parseFloat(packagePrice) || 499,
      discount: parseInt(packageDiscount, 10) || 0,
      description: packageDesc || 'Premium holiday tour package.',
      inclusions: packageInclusions,
      exclusions: packageExclusions,
      itinerary: packageItinerary,
      flightIncluded,
      guideIncluded,
      status: 'Published'
    } : null;

    const configData = {
      businessName: businessName.trim() || 'Wanderlust Travel',
      ownerName: ownerName.trim() || 'Travel Agent',
      email: email.trim() || 'agent@wanderlust.com',
      whatsappNo: whatsappNo.trim() || '+91 98765 43210',
      phoneNo: phoneNo.trim() || '+91 98765 43210',
      gstNumber: gstNumber.trim() || '',
      websiteName: subdomainName.trim() || 'wanderlust',
      country,
      state: state.trim() || 'Delhi',
      address: address.trim() || '123 Travel Street',
      description: description.trim() || 'A professional travel booking agency.',
      logoUrl: logoUrl.trim() || '',
      subcategory: selectedNiche,
      themeColor: themeColor,
      customColorHex: finalPrimary,
      customHoverHex: finalHover,
      faviconUrl,
      bannerUrl,
      heroVideoUrl,
      galleryImages,
      companyImages,
      domainType,
      subdomainName: subdomainName || 'dreamholiday',
      customDomainName,
      approvalMode,
      paymentMode,
      cancellationPolicy,
      refundPolicy,
      firstPackage
    };

    onSelectCategory('Travel', configData);
  };

  const getThemeHex = () => {
    if (themeColor === 'Custom') return customColorHex;
    return (THEME_PRESETS.find(t => t.id === themeColor) || THEME_PRESETS[0]).primary;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-slate-800 dark:text-white">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-900 flex justify-between items-center bg-slate-50/85 dark:bg-slate-950/80 backdrop-blur">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Shopify-Style Travel setup</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Configure Travel Agency Portal</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer bg-transparent border-none text-lg">✕</button>
        </div>

        {/* Step Progress indicators */}
        {step > 1 && (
          <div className="px-6 py-2.5 bg-slate-100/50 dark:bg-slate-900/30 flex flex-wrap gap-2 justify-between items-center text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider border-b border-slate-100 dark:border-slate-900">
            {['Profile', 'Niche', 'Themes', 'Assets', 'Domain', 'Policies', 'First Tour'].map((label, idx) => {
              const stepNum = idx + 2;
              const isDone = step > stepNum;
              const isActive = step === stepNum;
              return (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border transition ${
                    isDone ? 'bg-cyan-600 border-cyan-600 text-white dark:bg-cyan-500 dark:border-cyan-500' :
                    isActive ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-bold' : 'border-slate-200 text-slate-350 dark:border-slate-800'
                  }`}>{isDone ? '✓' : idx + 1}</span>
                  <span className={isActive ? 'text-cyan-600 dark:text-white font-bold' : 'hidden lg:inline'}>{label}</span>
                  {idx < 6 && <span className="text-slate-200 dark:text-slate-800 ml-1 hidden lg:inline">⟶</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Form Body Content */}
        <div className="flex-grow p-6 overflow-y-auto min-h-0 scrollbar-thin">
          
          {/* Step 1: Welcome Screen */}
          {step === 1 && (
            <div className="flex flex-col items-center justify-center py-10 text-center max-w-lg mx-auto space-y-5">
              <span className="text-6xl animate-bounce">✈️</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Let's build your travel agency webapplication
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                Build a professional Shopify-style travel catalog site complete with search filters, destination grids, hotel bookings, visa applications, and packages management.
              </p>
              <button
                onClick={handleStart}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-650 dark:text-slate-950 text-xs font-black rounded-xl shadow-lg transition cursor-pointer border-none uppercase tracking-widest"
              >
                Startup
              </button>
            </div>
          )}

          {/* Step 2: Business Profile Form */}
          {step === 2 && (
            <div className="space-y-4 max-w-3xl mx-auto text-left">
              <h3 className="text-sm font-black text-slate-850 dark:text-white border-b pb-2 mb-3">1. Business Profile Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Agency / Website Name *</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="Dream Holidays Ltd"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-cyan-400 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Owner Name *</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="Pratik Mhaisane"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-cyan-400 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Business Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="bookings@dreamholiday.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-cyan-400 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Phone Number *</label>
                  <input
                    type="text"
                    value={phoneNo}
                    onChange={e => setPhoneNo(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-cyan-400 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">WhatsApp Number *</label>
                  <input
                    type="text"
                    value={whatsappNo}
                    onChange={e => setWhatsappNo(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-cyan-400 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">GST Number (Optional)</label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={e => setGstNumber(e.target.value)}
                    placeholder="27ABCDE1234F1Z1"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Country *</label>
                  <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-cyan-400 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder="Maharashtra"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Business Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="402, ZATBIZ Chambers, CP, New Delhi"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Business Description *</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe your tour packages, flight bookings, and travel highlights..."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none resize-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Category / Niche Selection */}
          {step === 3 && (
            <div className="space-y-4 text-left">
              <h3 className="text-sm font-black text-slate-850 dark:text-white border-b pb-2 mb-3 text-center">2. Select Travel Niche Category</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {TRAVEL_CATEGORIES.map((cat) => {
                  const isSelected = selectedNiche === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedNiche(cat.id)}
                      className={`flex flex-col bg-slate-50 dark:bg-slate-900 border text-left overflow-hidden rounded-2xl group transition duration-300 ${
                        isSelected ? 'border-cyan-600 ring-1 ring-cyan-600 dark:border-cyan-400 dark:ring-cyan-400' : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="h-20 w-full overflow-hidden relative">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <span className="absolute top-2 right-2 w-5 h-5 bg-slate-950/80 backdrop-blur rounded-full flex items-center justify-center text-[10px]">{cat.icon}</span>
                      </div>
                      <div className="p-2.5 space-y-1">
                        <h4 className="text-slate-900 dark:text-white font-extrabold text-[10px] uppercase truncate">{cat.name}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-[8px] leading-tight font-semibold line-clamp-2">{cat.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Theme Selector */}
          {step === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              <div className="md:col-span-1 space-y-4">
                <h3 className="text-sm font-black text-slate-850 dark:text-white border-b pb-2">3. Shopify-style Themes</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Select a storefront brand palette for your booking portal.</p>
                
                <div className="space-y-2.5">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = themeColor === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setThemeColor(preset.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition ${
                          isSelected ? 'border-slate-900 bg-slate-50 dark:border-white dark:bg-slate-900' : 'border-slate-150 hover:bg-slate-50 dark:border-slate-800'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: preset.primary }} />
                        <div className="flex-grow">
                          <h4 className="text-[11px] font-black text-slate-900 dark:text-white">{preset.name}</h4>
                        </div>
                        {isSelected && <span className="text-xs text-cyan-600">✓</span>}
                      </button>
                    );
                  })}
                </div>

                {themeColor === 'Custom' && (
                  <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-850">
                    <label className="text-[9px] font-bold uppercase text-slate-500">Pick Custom Color</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={customColorHex}
                        onChange={e => setCustomColorHex(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                      />
                      <input
                        type="text"
                        value={customColorHex}
                        onChange={e => setCustomColorHex(e.target.value)}
                        className="flex-grow text-xs uppercase px-2 py-1 bg-white border dark:bg-slate-950 dark:border-slate-800 rounded font-mono text-center"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Side-by-side Live Preview Mock */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Storefront Theme Preview</label>
                <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-slate-950 flex flex-col h-[400px]">
                  {/* Browser Header Bar */}
                  <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 border-b flex items-center justify-between select-none">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block"></span>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-800 px-3 py-0.5 rounded text-[8px] font-mono text-slate-500 w-1/2 text-center truncate">
                      {businessName ? `${businessName.toLowerCase().replace(/\s+/g, '-')}.zatbiz.com` : 'dream-holiday.zatbiz.com'}
                    </div>
                    <span className="text-[10px] opacity-40">🔄</span>
                  </div>

                  {/* Scrollable Viewport */}
                  <div className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300">
                    
                    {/* Header Nav */}
                    <div className="flex justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border shadow-sm sticky top-0 z-30">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">✈️</span>
                        <span className="text-[10px] font-black text-slate-800 dark:text-white truncate max-w-[85px]">{businessName || 'Wanderlust'}</span>
                      </div>
                      <div className="flex gap-2.5 text-[8px] font-black text-slate-500">
                        <span className="hover:text-slate-900 cursor-pointer">Tours</span>
                        <span className="hover:text-slate-900 cursor-pointer">Destinations</span>
                        <span className="hover:text-slate-900 cursor-pointer">Visas</span>
                      </div>
                      <button className="px-3 py-1 text-[8px] font-black text-white rounded-lg transition" style={{ backgroundColor: getThemeHex() }}>
                        Sign In
                      </button>
                    </div>

                    {/* Hero Section */}
                    <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 text-white flex items-center justify-center p-4 text-center">
                      <img 
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80" 
                        alt="Hero Bg" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/20" />
                      <div className="relative space-y-2 max-w-xs">
                        <h4 className="text-sm font-black leading-tight text-white shadow-sm">Explore The World With Us</h4>
                        <p className="text-[8px] text-slate-200 line-clamp-2 leading-relaxed">{description || 'Tailored tourist packages and premium visa consulting services.'}</p>
                        <button className="px-4 py-1.5 text-[8px] font-black rounded-lg text-white shadow-lg transition transform hover:scale-105" style={{ backgroundColor: getThemeHex() }}>
                          Find Holiday Package
                        </button>
                      </div>
                    </div>

                    {/* Search & Filter Bar widget */}
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border shadow-sm grid grid-cols-3 gap-2 text-left">
                      <div className="space-y-0.5">
                        <span className="text-[7px] text-slate-400 font-extrabold uppercase">Destination</span>
                        <div className="text-[9px] font-black text-slate-700 dark:text-slate-300">Bali, Indonesia</div>
                      </div>
                      <div className="space-y-0.5 border-l pl-2">
                        <span className="text-[7px] text-slate-400 font-extrabold uppercase">Budget Limit</span>
                        <div className="text-[9px] font-black text-slate-700 dark:text-slate-300">Under ₹50,000</div>
                      </div>
                      <div className="space-y-0.5 border-l pl-2">
                        <span className="text-[7px] text-slate-400 font-extrabold uppercase">Duration</span>
                        <div className="text-[9px] font-black text-slate-700 dark:text-slate-300">5-7 Days</div>
                      </div>
                    </div>

                    {/* Popular Destinations catalog */}
                    <div className="space-y-2.5 text-left">
                      <div className="flex justify-between items-center">
                        <h5 className="text-[10px] font-black text-slate-950 dark:text-white uppercase tracking-wider">Dream Destinations</h5>
                        <span className="text-[8px] font-extrabold" style={{ color: getThemeHex() }}>View All ➔</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="relative h-20 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                          <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&auto=format&fit=crop&q=80" alt="Bali" className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                          <span className="absolute bottom-2 left-2 text-[9px] font-black text-white">Bali, Indonesia</span>
                        </div>
                        <div className="relative h-20 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                          <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&auto=format&fit=crop&q=80" alt="Paris" className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                          <span className="absolute bottom-2 left-2 text-[9px] font-black text-white">Paris, France</span>
                        </div>
                      </div>
                    </div>

                    {/* Featured Package tour item */}
                    <div className="space-y-2.5 text-left">
                      <h5 className="text-[10px] font-black text-slate-950 dark:text-white uppercase tracking-wider">Top Selling Package</h5>
                      <div className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm flex flex-col">
                        <div className="h-28 relative">
                          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=80" alt="Hotel Room" className="w-full h-full object-cover" />
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[7px] font-black uppercase text-white shadow" style={{ backgroundColor: getThemeHex() }}>
                            Bestseller
                          </span>
                        </div>
                        <div className="p-3.5 space-y-2">
                          <div className="flex justify-between items-start">
                            <h6 className="text-[10px] font-black text-slate-900 dark:text-white leading-tight">Ultimate Bali Tropical Resort</h6>
                            <span className="text-[10px] font-black text-cyan-600">₹42,000</span>
                          </div>
                          <p className="text-[8px] text-slate-400 leading-normal">Enjoy a 5-day luxurious stay in Ubud, with private pool villa options and snorkeling trips included.</p>
                          <div className="flex justify-between items-center border-t pt-2 mt-1">
                            <span className="text-[8px] font-bold text-slate-500">📅 5 Days / 4 Nights</span>
                            <button className="px-3 py-1 text-[8px] font-black text-white rounded-lg transition" style={{ backgroundColor: getThemeHex() }}>
                              View Deal
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testimonials */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl border text-center space-y-2 shadow-inner">
                      <span className="text-[14px]">⭐️⭐️⭐️⭐️⭐️</span>
                      <p className="text-[8px] italic text-slate-500 leading-normal">"The custom booking settings made slot scheduling super smooth. Best tour ever!"</p>
                      <span className="text-[7px] font-extrabold uppercase tracking-widest text-slate-400 block">- Rahul M. (Verified Traveler)</span>
                    </div>

                    {/* Niche Tag Badge */}
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border flex justify-between items-center shadow-sm text-left">
                      <div className="space-y-0.5">
                        <span className="text-[7px] uppercase tracking-wider font-extrabold" style={{ color: getThemeHex() }}>Selected Agency Category</span>
                        <h5 className="text-[10px] font-black text-slate-900 dark:text-white">{selectedNiche || 'International Travel'}</h5>
                      </div>
                      <span className="text-lg">🏕️</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Asset Uploads */}
          {step === 5 && (
            <div className="max-w-3xl mx-auto text-left space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-850 dark:text-white border-b pb-2">4. Media Assets & Video Uploads</h3>
                <p className="text-[10px] text-slate-400 mt-1">Upload your brand assets directly from your device. They will be rendered live on your storefront instantly.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Agency Logo */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Agency Logo</label>
                  {logoUrl ? (
                    <div className="relative border rounded-2xl p-2.5 bg-slate-50 dark:bg-slate-900 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <img src={logoUrl} className="w-10 h-10 object-cover rounded-lg border shadow-inner" />
                        <span className="text-[9px] font-mono text-slate-400 truncate max-w-[120px]">Uploaded Logo</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setLogoUrl('')} 
                        className="p-1 px-2.5 bg-red-50 hover:bg-red-100 text-red-500 text-[10px] font-black border-none rounded-lg cursor-pointer"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-cyan-500 rounded-2xl p-4 text-center block cursor-pointer transition bg-slate-50/50 hover:bg-slate-50/80 dark:bg-slate-900/30">
                      <span className="text-xl block">🖼️</span>
                      <span className="text-[9px] font-bold text-slate-500 block mt-1">Click to Upload Logo</span>
                      <span className="text-[7px] text-slate-400 block uppercase">PNG, JPG under 2MB</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => handleFileUpload(e, setLogoUrl)} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>

                {/* 2. Favicon Link */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Site Favicon</label>
                  {faviconUrl ? (
                    <div className="relative border rounded-2xl p-2.5 bg-slate-50 dark:bg-slate-900 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <img src={faviconUrl} className="w-10 h-10 object-cover rounded-lg border shadow-inner" />
                        <span className="text-[9px] font-mono text-slate-400 truncate max-w-[120px]">Uploaded Favicon</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setFaviconUrl('')} 
                        className="p-1 px-2.5 bg-red-50 hover:bg-red-100 text-red-500 text-[10px] font-black border-none rounded-lg cursor-pointer"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-cyan-500 rounded-2xl p-4 text-center block cursor-pointer transition bg-slate-50/50 hover:bg-slate-50/80 dark:bg-slate-900/30">
                      <span className="text-xl block">🌐</span>
                      <span className="text-[9px] font-bold text-slate-500 block mt-1">Click to Upload Favicon</span>
                      <span className="text-[7px] text-slate-400 block uppercase">ICO, PNG (16x16 / 32x32)</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => handleFileUpload(e, setFaviconUrl)} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>

                {/* 3. Cover Banner Image */}
                <div className="space-y-1.5 sm:col-span-2 text-left">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Cover Banner Image</label>
                  {bannerUrl ? (
                    <div className="relative border rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-sm">
                      <img src={bannerUrl} className="w-full h-32 object-cover opacity-90" />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <span className="px-2 py-0.5 bg-slate-900/80 text-white text-[7px] font-black uppercase rounded backdrop-blur-md">Active Banner</span>
                        <button 
                          type="button" 
                          onClick={() => setBannerUrl('')} 
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[8px] font-black border-none rounded-lg cursor-pointer shadow"
                        >
                          ✕ Remove Banner
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-cyan-500 rounded-2xl p-6 text-center block cursor-pointer transition bg-slate-50/50 hover:bg-slate-50/80 dark:bg-slate-900/30">
                      <span className="text-2xl block">🏔️</span>
                      <span className="text-[9px] font-bold text-slate-500 block mt-1">Upload Portal Landing Banner</span>
                      <span className="text-[7px] text-slate-400 block uppercase">Landscape Ratio (Recommended 1920x1080)</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => handleFileUpload(e, setBannerUrl)} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>

                {/* 4. Hero Video */}
                <div className="space-y-1.5 sm:col-span-2 text-left">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Hero Background Video (Optional MP4)</label>
                  {heroVideoUrl ? (
                    <div className="relative border rounded-2xl overflow-hidden bg-slate-950 shadow-sm h-32 flex items-center justify-center">
                      <video src={heroVideoUrl} controls autoPlay muted loop className="w-full h-full object-cover opacity-80" />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button 
                          type="button" 
                          onClick={() => setHeroVideoUrl('')} 
                          className="px-2.5 py-1 bg-red-650/90 hover:bg-red-700 text-white text-[8px] font-black border-none rounded-lg cursor-pointer shadow"
                        >
                          ✕ Remove Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-cyan-500 rounded-2xl p-6 text-center block cursor-pointer transition bg-slate-50/50 hover:bg-slate-50/80 dark:bg-slate-900/30">
                      <span className="text-2xl block">🎬</span>
                      <span className="text-[9px] font-bold text-slate-500 block mt-1">Upload Atmospheric Background Video</span>
                      <span className="text-[7px] text-slate-400 block uppercase">MP4 Format under 10MB</span>
                      <input 
                        type="file" 
                        accept="video/mp4" 
                        onChange={e => handleFileUpload(e, setHeroVideoUrl)} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>

                {/* 5. Gallery Portfolio Images */}
                <div className="space-y-2 sm:col-span-2 border-t pt-4 mt-2 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase block">Gallery Portfolio Images</label>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">{galleryImages.length} Image(s) Uploaded</span>
                  </div>
                  
                  <label className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-cyan-500 rounded-2xl p-6 text-center block cursor-pointer transition bg-slate-50/50 hover:bg-slate-50/80 dark:bg-slate-900/30 mb-3">
                    <span className="text-xl block">📸</span>
                    <span className="text-[9px] font-bold text-slate-500 block mt-1">Select Multiple Gallery Images</span>
                    <span className="text-[7px] text-slate-400 block uppercase">Choose one or more photos from your device</span>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleMultipleFileUpload} 
                      className="hidden" 
                    />
                  </label>

                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 p-3.5 bg-slate-550/5 dark:bg-slate-900/50 rounded-2xl border">
                      {galleryImages.map((img, idx) => (
                        <div key={idx} className="relative group aspect-square border rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm">
                          <img src={img} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 w-5 h-5 bg-red-600/90 text-white rounded-full flex items-center justify-center text-[9px] font-black border-none cursor-pointer shadow hover:bg-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* Step 6: Domain Configurations */}
          {step === 6 && (
            <div className="max-w-2xl mx-auto text-left space-y-6">
              <h3 className="text-sm font-black text-slate-850 dark:text-white border-b pb-2 mb-3">5. Domain Connectivity settings</h3>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setDomainType('subdomain')}
                  className={`flex-1 p-4 border rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition ${
                    domainType === 'subdomain' ? 'border-cyan-600 bg-cyan-50/20 dark:border-cyan-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-xl">🌐</span>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Choose ZATBIZ Subdomain</h4>
                  <p className="text-[8px] text-slate-500 leading-normal font-semibold">Free subdomain hosting under *.zatbiz.com.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDomainType('custom')}
                  className={`flex-1 p-4 border rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition ${
                    domainType === 'custom' ? 'border-cyan-600 bg-cyan-50/20 dark:border-cyan-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-xl">🔗</span>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Connect Custom Domain</h4>
                  <p className="text-[8px] text-slate-500 leading-normal font-semibold">Map your personal purchased domain to ZATBIZ.</p>
                </button>
              </div>

              {domainType === 'subdomain' ? (
                <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-850">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Subdomain Prefix *</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={subdomainName}
                      onChange={e => setSubdomainName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      placeholder="dreamholiday"
                      className="bg-white border rounded-l-xl px-4 py-2.5 text-xs text-slate-900 outline-none w-2/3 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-right font-bold pr-2"
                    />
                    <span className="bg-slate-100 dark:bg-slate-850 border border-l-0 rounded-r-xl px-4 py-2.5 text-xs text-slate-500 font-bold w-1/3 text-left">
                      .zatbiz.com
                    </span>
                  </div>
                  <span className="text-[8px] text-slate-450 block font-semibold">Your site will live at: https://{subdomainName || 'dreamholiday'}.zatbiz.com</span>
                </div>
              ) : (
                <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-850">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Custom Domain Name *</label>
                  <input
                    type="text"
                    value={customDomainName}
                    onChange={e => setCustomDomainName(e.target.value.toLowerCase().replace(/\s/g, ''))}
                    placeholder="www.dreamholiday.com"
                    className="w-full bg-white border focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white font-bold"
                  />
                  <div className="bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900 p-3 rounded-xl space-y-1 mt-3">
                    <h5 className="text-[10px] font-black text-amber-800 dark:text-amber-400">⚠️ DNS Setup Instructions</h5>
                    <p className="text-[8px] text-slate-600 dark:text-slate-400 leading-normal font-semibold">To map your domain, configure your DNS provider settings to point an **A record** to `104.21.78.223` or a **CNAME** to `domains.zatbiz.com`.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 7: Booking Settings */}
          {step === 7 && (
            <div className="max-w-2xl mx-auto text-left space-y-5">
              <h3 className="text-sm font-black text-slate-850 dark:text-white border-b pb-2 mb-3">6. Booking & Payment Policies Settings</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase block">Booking Approval Mode</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setApprovalMode('instant')}
                      className={`flex-1 py-3 text-xs font-black rounded-xl border transition ${
                        approvalMode === 'instant' ? 'bg-cyan-600 border-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950' : 'bg-transparent border-slate-200 hover:bg-slate-50 dark:border-slate-850'
                      }`}
                    >
                      Instant Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setApprovalMode('manual')}
                      className={`flex-1 py-3 text-xs font-black rounded-xl border transition ${
                        approvalMode === 'manual' ? 'bg-cyan-600 border-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950' : 'bg-transparent border-slate-200 hover:bg-slate-50 dark:border-slate-850'
                      }`}
                    >
                      Manual Approval
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase block">Payment collection policy</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('full')}
                      className={`flex-1 py-3 text-xs font-black rounded-xl border transition ${
                        paymentMode === 'full' ? 'bg-cyan-600 border-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950' : 'bg-transparent border-slate-200 hover:bg-slate-50 dark:border-slate-850'
                      }`}
                    >
                      Full Pre-payment
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode('partial')}
                      className={`flex-1 py-3 text-xs font-black rounded-xl border transition ${
                        paymentMode === 'partial' ? 'bg-cyan-600 border-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950' : 'bg-transparent border-slate-200 hover:bg-slate-50 dark:border-slate-850'
                      }`}
                    >
                      Partial/Deposit
                    </button>
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Cancellation Policy</label>
                  <input
                    type="text"
                    value={cancellationPolicy}
                    onChange={e => setCancellationPolicy(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Refund Policy</label>
                  <input
                    type="text"
                    value={refundPolicy}
                    onChange={e => setRefundPolicy(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Add First Package Form */}
          {step === 8 && (
            <div className="max-w-3xl mx-auto text-left space-y-4">
              <h3 className="text-sm font-black text-slate-850 dark:text-white border-b pb-2 mb-3">7. Add First Holiday Tour Package</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Tour Package Name *</label>
                  <input
                    type="text"
                    value={packageName}
                    onChange={e => setPackageName(e.target.value)}
                    placeholder="Ultimate Bali Tropical Getaway"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Duration (days) *</label>
                  <input
                    type="text"
                    value={packageDuration}
                    onChange={e => setPackageDuration(e.target.value)}
                    placeholder="5 Days / 4 Nights"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Destination *</label>
                  <input
                    type="text"
                    value={packageDestination}
                    onChange={e => setPackageDestination(e.target.value)}
                    placeholder="Bali / Ubud"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Package Country *</label>
                  <input
                    type="text"
                    value={packageCountry}
                    onChange={e => setPackageCountry(e.target.value)}
                    placeholder="Indonesia"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Base Price (INR) *</label>
                  <input
                    type="number"
                    value={packagePrice}
                    onChange={e => setPackagePrice(e.target.value)}
                    placeholder="45000"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
                
                <div className="space-y-1 sm:col-span-3">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Short Package Description</label>
                  <textarea
                    value={packageDesc}
                    onChange={e => setPackageDesc(e.target.value)}
                    placeholder="Enjoy scenic beach sunsets, guided volcano trekking, luxury spa treatments, and local market explorations."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs text-slate-900 outline-none resize-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-3 flex gap-6 py-2 border-y border-slate-100 dark:border-slate-900">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flightIncluded}
                      onChange={e => setFlightIncluded(e.target.checked)}
                      className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                    />
                    Flight Tickets Included
                  </label>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guideIncluded}
                      onChange={e => setGuideIncluded(e.target.checked)}
                      className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                    />
                    Local Tour Guide Included
                  </label>
                </div>

                <div className="space-y-1 sm:col-span-3">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Package Inclusions (comma separated)</label>
                  <input
                    type="text"
                    value={packageInclusions}
                    onChange={e => setPackageInclusions(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-3">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Package Exclusions (comma separated)</label>
                  <input
                    type="text"
                    value={packageExclusions}
                    onChange={e => setPackageExclusions(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-3">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Tour Itinerary Details</label>
                  <textarea
                    value={packageItinerary}
                    onChange={e => setPackageItinerary(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 outline-none resize-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        {step > 1 && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-900 flex justify-between bg-slate-50/85 dark:bg-slate-950/80 backdrop-blur">
            <button
              onClick={handleBack}
              className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-white text-xs font-bold rounded-xl transition cursor-pointer border-none"
            >
              Back
            </button>

            {step < 8 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-650 dark:text-slate-950 text-xs font-black rounded-xl shadow-lg transition cursor-pointer border-none"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-lg transition cursor-pointer border-none animate-bounce"
              >
                Generate Travel Workspace ✓
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
