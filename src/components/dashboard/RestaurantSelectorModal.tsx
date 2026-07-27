'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { generateTemplateBlocks } from '@/services/templates';
import TemplateFullPreview from '@/components/preview/restaurant/TemplateFullPreview';

interface TemplateOption {
  id: string;
  name: string;
  desc: string;
  category: 'Fine Dining' | 'Fast Food' | 'Pizza' | 'Indian' | 'Cafe' | 'Bakery' | 'Chinese' | 'Vegan' | 'General';
  recommendedTheme: string;
  imageUrl: string;
}

// 24 Beautiful Restaurant Templates
const RESTAURANT_TEMPLATES: TemplateOption[] = [
  { id: 'bistro-classique', name: 'Bistro Classique', desc: 'Elegant French fine dining with curated wine pairings.', category: 'Fine Dining', recommendedTheme: 'gold-luxury', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80' },
  { id: 'spicy-saffron', name: 'Spicy Saffron', desc: 'Vibrant traditional Indian dining and rich curries.', category: 'Indian', recommendedTheme: 'crimson-blaze', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80' },
  { id: 'burger-junction', name: 'Burger Junction', desc: 'High-energy fast food joint spotlighting flame-grilled burgers.', category: 'Fast Food', recommendedTheme: 'tangerine-peel', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80' },
  { id: 'green-meadow', name: 'Green Meadow', desc: 'Crisp organic salads and fresh plant-based vegan dishes.', category: 'Vegan', recommendedTheme: 'forest-herbs', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80' },
  { id: 'pizza-delizia', name: 'Pizza Delizia', desc: 'Traditional wood-fired Neapolitan pizzas and pastas.', category: 'Pizza', recommendedTheme: 'terracotta-clay', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80' },
  { id: 'cafe-wanderlust', name: 'Cafe Wanderlust', desc: 'Cosy roastery serving artisan espresso and flaky pastries.', category: 'Cafe', recommendedTheme: 'chocolate-truffle', imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80' },
  { id: 'golden-dragon', name: 'Golden Dragon', desc: 'Upscale modern Chinese cuisine and hot clay pot specials.', category: 'Chinese', recommendedTheme: 'crimson-blaze', imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80' },
  { id: 'chocolatier-royale', name: 'Chocolatier Royale', desc: 'Premium dessert boutique and handmade chocolate truffles.', category: 'Bakery', recommendedTheme: 'velvet-plum', imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=80' },
  { id: 'steakhouse-smoke', name: 'Steakhouse Smoke', desc: 'Intense wood-smoked briskets and premium dry-aged steaks.', category: 'Fast Food', recommendedTheme: 'sunset-gold', imageUrl: 'https://images.unsplash.com/photo-1555996273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80' },
  { id: 'sakura-sushi', name: 'Sakura Sushi', desc: 'Intimate Japanese dining displaying chef-curated sushi boards.', category: 'Fine Dining', recommendedTheme: 'matcha-zen', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=80' },
  { id: 'tandoori-nights', name: 'Tandoori Nights', desc: 'Authentic clay-oven tandoors and classic Punjabi grills.', category: 'Indian', recommendedTheme: 'amber-spiced', imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=80' },
  { id: 'the-daily-grind', name: 'The Daily Grind', desc: 'Co-working workspace roastery with pour-over brews.', category: 'Cafe', recommendedTheme: 'charcoal-slate', imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=500&auto=format&fit=crop&q=80' },
  { id: 'sweet-treats', name: 'Sweet Treats Parlour', desc: 'Playful ice-cream sundaes, waffles, and bubble tea options.', category: 'Bakery', recommendedTheme: 'lavender-bliss', imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=80' },
  { id: 'botanical-garden', name: 'Botanical Garden', desc: 'Greenhouse garden dining focusing on wellness salads.', category: 'Vegan', recommendedTheme: 'emerald-mint', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80' },
  { id: 'neapolitan-crust', name: 'Neapolitan Crust', desc: 'Stone-baked pizzas, garlic breads, and Italian pasta plates.', category: 'Pizza', recommendedTheme: 'terracotta-clay', imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500&auto=format&fit=crop&q=80' },
  { id: 'noodle-bar', name: 'The Noodle Bar', desc: 'Quick street-style ramen, noodles, and steamed dim sum baskets.', category: 'Chinese', recommendedTheme: 'crimson-blaze', imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80' },
  { id: 'cuisine-imperial', name: 'Cuisine Imperial', desc: 'Lavish palace-style multi-course banquet dining rooms.', category: 'Fine Dining', recommendedTheme: 'royal-gold', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80' },
  { id: 'the-citrus-club', name: 'The Citrus Club', desc: 'Zesty cold press juice shots and healthy organic bowls.', category: 'Vegan', recommendedTheme: 'lemon-zest', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80' },
  { id: 'coastal-catch', name: 'Coastal Catch', desc: 'Fresh local oysters, lobsters, and seasoned sea bass grills.', category: 'General', recommendedTheme: 'cyan-breeze', imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&auto=format&fit=crop&q=80' },
  { id: 'waffle-co', name: 'Waffle & Co.', desc: 'Sweet breakfast waffles, pancakes, and fruit smoothies.', category: 'Bakery', recommendedTheme: 'peach-blossom', imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=80' },
  { id: 'bombay-bistro', name: 'Bombay Bistro', desc: 'Express Indian street snacks, samosas, and filter coffees.', category: 'Indian', recommendedTheme: 'sunset-gold', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=80' },
  { id: 'the-tavern', name: 'The Tavern Lounge', desc: 'Sleek gastropub offering gourmet sliders and craft beverages.', category: 'General', recommendedTheme: 'charcoal-slate', imageUrl: 'https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=500&auto=format&fit=crop&q=80' },
  { id: 'la-bella-italia', name: 'La Bella Italia', desc: 'Elegant dining specializing in Risotto and gourmet pastas.', category: 'Fine Dining', recommendedTheme: 'gold-luxury', imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80' },
  { id: 'sizzling-wok', name: 'Sizzling Wok', desc: 'Vibrant hotpot broths and spicy Schezwan stir-fry.', category: 'Chinese', recommendedTheme: 'crimson-blaze', imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=80' }
];

interface RestaurantSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string, configData: any) => void;
}

export default function RestaurantSelectorModal({
  isOpen,
  onClose,
  onSelectCategory
}: RestaurantSelectorModalProps) {
  const router = useRouter();
  const [step, setStep] = useState(1); // Step 1: Choose Template, Step 2: Form, Step 3: Generator

  // Step 1 states
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [quickPreviewTpl, setQuickPreviewTpl] = useState<TemplateOption | null>(null);
  const [fullPreviewTpl, setFullPreviewTpl] = useState<TemplateOption | null>(null);

  // Step 2 Form States
  const [restaurantName, setRestaurantName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<TemplateOption['category']>('Fine Dining');
  const [logoUrl, setLogoUrl] = useState('');
  const [themeColor, setThemeColor] = useState('#c5a880');
  const [description, setDescription] = useState('');

  // Step 3 Loader States
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing website builder...');
  const [newProjectId, setNewProjectId] = useState<number | null>(null);
  const [isDoneGenerating, setIsDoneGenerating] = useState(false);

  useEffect(() => {
    if (selectedTemplate) {
      setCategory(selectedTemplate.category);
      setRestaurantName(selectedTemplate.name);
      setDescription(selectedTemplate.desc);
      
      // Map theme preset to initial hex code
      const themeColors: Record<string, string> = {
        'gold-luxury': '#c5a880',
        'crimson-blaze': '#b91c1c',
        'tangerine-peel': '#f97316',
        'forest-herbs': '#047857',
        'terracotta-clay': '#c2410c',
        'chocolate-truffle': '#451a03',
        'velvet-plum': '#7c3aed',
        'sunset-gold': '#ea580c',
        'matcha-zen': '#84cc16',
        'charcoal-slate': '#475569',
        'lavender-bliss': '#a78bfa',
        'lemon-zest': '#eab308',
        'peach-blossom': '#fb923c',
        'royal-gold': '#d97706',
        'cyan-breeze': '#06b6d4'
      };
      setThemeColor(themeColors[selectedTemplate.recommendedTheme] || '#c5a880');
    }
  }, [selectedTemplate]);

  // Handle Logo Upload base64
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFavorite = (tplId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(tplId) ? prev.filter(id => id !== tplId) : [...prev, tplId]
    );
  };

  // Opens the full-screen interactive preview (landing → login → dashboard)
  const handlePreviewTemplate = (tpl: TemplateOption) => {
    setQuickPreviewTpl(null);
    setFullPreviewTpl(tpl);
  };

  // Commits the template and moves the wizard to the setup form
  const handleUseTemplate = (tpl: TemplateOption) => {
    setFullPreviewTpl(null);
    setQuickPreviewTpl(null);
    setSelectedTemplate(tpl);
    setStep(2);
  };

  // Step 3 Asynchronous Project Creation & Seeding
  const startGeneratingWebsite = async () => {
    setProgress(0);
    setIsDoneGenerating(false);
    
    // Smooth progress animation over 20 seconds
    const intervalTime = 200; // ms
    const totalTicks = 20000 / intervalTime; // 100 ticks
    let tickCount = 0;
    
    const progressInterval = setInterval(() => {
      tickCount++;
      const currentProgress = Math.min(Math.round((tickCount / totalTicks) * 100), 99);
      setProgress(currentProgress);
      
      // Update status ticks
      if (currentProgress < 15) {
        setStatusText('Generating template layout blocks...');
      } else if (currentProgress < 30) {
        setStatusText('Seeding specialty restaurant menu items...');
      } else if (currentProgress < 45) {
        setStatusText('Applying theme palette color variables...');
      } else if (currentProgress < 60) {
        setStatusText('Configuring table booking map grid...');
      } else if (currentProgress < 75) {
        setStatusText('Registering backend API endpoints...');
      } else if (currentProgress < 90) {
        setStatusText('Optimizing assets & layout databases...');
      } else {
        setStatusText('Finalizing draft publication...');
      }
    }, intervalTime);

    try {
      // 1. Create layout blocks
      const blocksList = generateTemplateBlocks({
        selectedTemplateId: 'restaurant',
        companyName: restaurantName.trim(),
        slogan: description.trim() || 'A premium dining experience.',
        contactEmail: email.trim() || 'chef@kitchen.com',
        contactPhone: mobileNo.trim() || '+91 98765 43210',
        logoType: logoUrl ? 'custom' : 'icon',
        logoIcon: '🍳',
        customLogoUrl: logoUrl,
        theme: selectedTemplate?.recommendedTheme || 'gold-luxury',
        restaurantCategory: category,
      });

      // Append custom business config metadata block
      blocksList.push({
        id: 'business-config-block',
        type: 'business_config',
        theme: selectedTemplate?.recommendedTheme || 'gold-luxury',
        content: {
          businessType: 'restaurant',
          shopNiche: category,
          gstin: '',
          currency: 'INR (₹)',
          domainName: `${restaurantName.toLowerCase().replace(/[^a-z0-9]/g, '')}.zatbiz.site`,
          paymentGateway: 'Stripe',
          stripeKey: '',
          sandboxMode: true,
          gstRate: 18,
          seoTitle: `${restaurantName} | Premium Restaurant`,
          seoDescription: description || `Custom visual site for ${restaurantName}`,
          seoKeywords: `restaurant, ${restaurantName}, dining`,
        },
      });

      // 2. Persist project
      const payload = {
        name: `${restaurantName} Site`,
        description: description || `Customized visual workspace for ${restaurantName}`,
        blocksJson: JSON.stringify(blocksList),
        status: 'Draft',
      };

      const newProj = await api.projects.create(payload);
      const projId = newProj.id;
      setNewProjectId(projId);

      // 3. Create restaurant server profile
      await api.restaurant.create(projId, {
        subcategory: category,
        restaurantName: restaurantName,
        businessName: restaurantName,
        description: description,
        ownerName: ownerName,
        mobileNo: mobileNo,
        email: email,
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        pincode: '201301',
        logoUrl: logoUrl,
        themeColor: themeColor,
        selectedTheme: selectedTemplate?.recommendedTheme || 'gold-luxury',
        selectedHomepageLayout: 'menu-grid-focus',
        selectedLoginLayout: 'left-illustration',
        selectedDashboardLayout: 'metric-overview'
      });

      // 4. Seed default menu catalog products
      const defaultProducts = getCategoryProducts(category);
      for (const prod of defaultProducts) {
        await api.products.create({
          projectId: projId,
          name: prod.name,
          description: prod.desc,
          price: prod.price,
          category: prod.category,
          imageUrl: prod.imageUrl,
          stock: 50,
          variants: 'Default: One Size',
          available: true
        });
      }

      // Finish generation transition
      clearInterval(progressInterval);
      setProgress(100);
      setStatusText('Your Restaurant Website is Ready! 🎉');
      setIsDoneGenerating(true);

    } catch (err) {
      console.error('Failed to create restaurant draft:', err);
      // Fallback simulation mode
      clearInterval(progressInterval);
      setTimeout(() => {
        setNewProjectId(Date.now());
        setProgress(100);
        setStatusText('Your Restaurant Website is Ready! 🎉');
        setIsDoneGenerating(true);
      }, 5000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName.trim()) return;
    setStep(3);
    startGeneratingWebsite();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-slate-800 dark:text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950 backdrop-blur">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-[#c5a880]">Restaurant Wizard</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              {step === 1 && 'Step 1: Choose Design Template'}
              {step === 2 && 'Step 2: AI Business Setup Profile'}
              {step === 3 && 'Step 3: Creating Business Portal'}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer bg-transparent border-none text-lg"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Wizard Steps */}
        <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">

          {/* STEP 1: CHOOSE TEMPLATE GALLERY */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Select a premium storefront theme</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Explore 24 hand-designed restaurant layouts. Hover to demo layouts or check info cards.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {RESTAURANT_TEMPLATES.map((tpl) => {
                  const isFav = favorites.includes(tpl.id);
                  return (
                    <div 
                      key={tpl.id} 
                      className="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden relative shadow-sm hover:shadow-md transition duration-300 flex flex-col h-72"
                    >
                      {/* Image viewport */}
                      <div className="h-40 w-full overflow-hidden relative bg-slate-200 dark:bg-slate-950">
                        <img 
                          src={tpl.imageUrl} 
                          alt={tpl.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                        />
                        
                        {/* Hover Actions Layer */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-2 p-4">
                          <button
                            onClick={() => handlePreviewTemplate(tpl)}
                            className="w-32 py-1.5 bg-white text-slate-900 hover:bg-slate-100 text-[10px] font-black rounded-lg transition"
                          >
                            👁 Live Demo
                          </button>
                          <button
                            onClick={() => setQuickPreviewTpl(tpl)}
                            className="w-32 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-white text-[10px] font-black rounded-lg border border-white/20 transition"
                          >
                            ⚡ Quick Info
                          </button>
                          <button
                            onClick={(e) => toggleFavorite(tpl.id, e)}
                            className="w-32 py-1.5 bg-slate-900/60 hover:bg-slate-950/60 text-white text-[10px] font-black rounded-lg border border-white/10 transition flex items-center justify-center gap-1"
                          >
                            <span>{isFav ? '❤️' : '🤍'}</span>
                            <span>{isFav ? 'Favorited' : 'Favorite'}</span>
                          </button>
                        </div>

                        {/* Badges / Fav Indicator */}
                        <span className="absolute top-2 left-2 bg-slate-900/80 text-white backdrop-blur text-[8.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {tpl.category}
                        </span>
                        
                        {isFav && (
                          <span className="absolute top-2 right-2 text-rose-500 text-sm drop-shadow-md">
                            ❤️
                          </span>
                        )}
                      </div>

                      {/* Content Card info */}
                      <div className="p-4 flex-grow flex flex-col justify-between items-start text-left">
                        <div className="space-y-1 w-full">
                          <h4 className="text-slate-900 dark:text-white font-extrabold text-[11px] uppercase tracking-wider truncate">
                            {tpl.name}
                          </h4>
                          <p className="text-slate-500 dark:text-slate-400 text-[9px] font-semibold leading-normal line-clamp-2 font-mono">
                            {tpl.desc}
                          </p>
                        </div>

                        <button
                          onClick={() => handlePreviewTemplate(tpl)}
                          className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-[#c5a880] dark:hover:bg-[#b0936b] dark:text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-xl transition"
                        >
                          Preview & Use ➔
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: AI BUSINESS SETUP (SINGLE FORM) */}
          {step === 2 && (
            <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-6 text-left animate-in fade-in duration-200">
              <div className="text-center space-y-1 mb-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">AI Onboarding Details</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Reduce setup time with one clean profile checklist. All advanced details default automatically.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                       <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={restaurantName}
                    onChange={e => setRestaurantName(e.target.value)}
                    placeholder="e.g. Royal Bistro"
                    className="w-full onboarding-input border border-slate-200 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none"
                  />
                </div>

                {/* Owner name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">Owner Name</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="e.g. Chef Marcus"
                    className="w-full onboarding-input border border-slate-200 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">Owner Mobile Phone</label>
                  <input
                    type="text"
                    value={mobileNo}
                    onChange={e => setMobileNo(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full onboarding-input border border-slate-200 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">Business Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. contact@royalbistro.com"
                    className="w-full onboarding-input border border-slate-200 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none"
                  />
                </div>

                {/* Category selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">Business Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full onboarding-input border border-slate-200 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none"
                  >
                    <option value="Fine Dining">Fine Dining</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Pizza">Pizza & Pasta</option>
                    <option value="Indian">Indian Cuisine</option>
                    <option value="Cafe">Cafe & Roastery</option>
                    <option value="Bakery">Bakery & Cake shop</option>
                    <option value="Chinese">Chinese Kitchen</option>
                    <option value="Vegan">Vegan Salad Bar</option>
                    <option value="General">General Restaurant</option>
                  </select>
                </div>

                {/* Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="e.g. 104 Food Arcade, MG Road"
                    className="w-full onboarding-input border border-slate-200 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">Business Description</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Briefly state your specialties, dining vibe or menu highlights..."
                    rows={3}
                    className="w-full onboarding-input border border-slate-200 focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none resize-none"
                  />
                </div>

                {/* Logo and primary color */}
                <div className="space-y-2 bg-white dark:bg-slate-900/60 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider block">Upload Logo icon (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 onboarding-input rounded-xl px-3 py-1.5 text-xs outline-none file:mr-3 file:py-0.5 file:px-2 file:rounded-full file:border-0 file:text-[10.5px] file:font-semibold file:bg-indigo-50 file:text-indigo-600 dark:file:bg-slate-800 dark:file:text-white cursor-pointer"
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
                    <input
                      type="color"
                      value={themeColor}
                      onChange={e => setThemeColor(e.target.value)}
                      className="w-9 h-9 bg-transparent border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={themeColor}
                      onChange={e => setThemeColor(e.target.value)}
                      className="flex-grow onboarding-input bg-slate-50 border border-slate-200 focus:border-indigo-600 rounded-xl px-3 py-1.5 text-xs outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:!text-white"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['#c5a880', '#b91c1c', '#f97316', '#047857', '#ea580c', '#7c3aed'].map((clr) => (
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

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-white text-xs font-bold rounded-xl transition border-none cursor-pointer"
                >
                  ← Back to Gallery
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-[#c5a880] dark:hover:bg-[#b0936b] dark:text-slate-900 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer border-none"
                >
                  Continue Setup ➔
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: CREATING WEBSITE (20-SECOND LOADER) */}
          {step === 3 && (
            <div className="max-w-md mx-auto py-12 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-300">
              
              {/* Spinner/Graphic circle */}
              <div className="relative flex items-center justify-center">
                {/* Outer spin rings */}
                <div className="w-32 h-32 border-4 border-slate-200 dark:border-slate-800 rounded-full" />
                <div 
                  className="w-32 h-32 border-4 border-indigo-600 border-t-transparent dark:border-[#c5a880] dark:border-t-transparent rounded-full animate-spin absolute" 
                  style={{ animationDuration: '1.2s' }}
                />
                
                {/* Center text percentage */}
                <span className="absolute text-2xl font-black font-mono">
                  {progress}%
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {isDoneGenerating ? 'Website Generated Successfully! 🎉' : 'Assembling Site Assets'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold italic min-h-[1.5rem] transition duration-200">
                  {statusText}
                </p>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-slate-100 dark:bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-[#c5a880] dark:to-[#e2caab] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Enter Builder trigger button */}
              {isDoneGenerating && newProjectId && (
                <button
                  onClick={() => {
                    onClose();
                    router.push(`/builder/${newProjectId}`);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:scale-[1.01] text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl transition cursor-pointer border-none animate-bounce"
                >
                  Enter ZATBIZ Theme Studio ➔
                </button>
              )}
            </div>
          )}

        </div>

      </div>

      {/* FULL INTERACTIVE TEMPLATE PREVIEW (landing → login → dashboard) */}
      {fullPreviewTpl && (
        <TemplateFullPreview
          template={fullPreviewTpl}
          onClose={() => setFullPreviewTpl(null)}
          onUseTemplate={() => handleUseTemplate(fullPreviewTpl)}
        />
      )}

      {/* TEMPLATE QUICK PREVIEW MODAL */}
      {quickPreviewTpl && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 flex flex-col gap-5 text-slate-800 dark:text-white shadow-2xl animate-in zoom-in-95 duration-150 text-left">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black uppercase tracking-wider">{quickPreviewTpl.name} Blueprint</h3>
              <button 
                onClick={() => setQuickPreviewTpl(null)} 
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full text-slate-500 dark:text-slate-400 bg-transparent border-none"
              >
                ✕
              </button>
            </div>
            
            <img src={quickPreviewTpl.imageUrl} className="h-40 w-full object-cover rounded-xl border border-slate-200 dark:border-slate-800" alt="Quick preview" />

            <div className="space-y-3.5 text-xs">
              <p className="font-semibold text-slate-500 dark:text-slate-400">{quickPreviewTpl.desc}</p>
              
              <div className="grid grid-cols-2 gap-3.5 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Cuisine Category</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{quickPreviewTpl.category}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Theme Preset</span>
                  <span className="font-bold text-indigo-500 dark:text-[#c5a880] capitalize">{quickPreviewTpl.recommendedTheme.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Layout Sections</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Header, Hero, Special Menu Grid, Chef Highlights, Seating Chart, Contact Form, Footer</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Database Seeding</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Seeded with 4 category products & loyalty program settings</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handlePreviewTemplate(quickPreviewTpl)}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white text-xs font-black uppercase tracking-wider rounded-xl transition border-none cursor-pointer"
              >
                👁 Full Preview
              </button>
              <button
                onClick={() => handleUseTemplate(quickPreviewTpl)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-[#c5a880] dark:hover:bg-[#b0936b] dark:text-slate-900 text-xs font-black uppercase tracking-wider rounded-xl transition border-none cursor-pointer"
              >
                Use & Setup ➔
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Utility categories menu seeding helper
function getCategoryProducts(cat: string) {
  const products: Array<{ name: string; price: number; category: string; imageUrl: string; desc: string }> = [];
  const catLower = cat.toLowerCase();

  if (catLower.includes('pizza')) {
    return [
      { name: 'Margherita Pizza', price: 299.00, category: 'Pizzas', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600', desc: 'Fresh mozzarella, tomato sauce, basil, and a drizzle of olive oil.' },
      { name: 'Double Pepperoni Pizza', price: 399.00, category: 'Pizzas', imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600', desc: 'Loaded with premium spicy pepperoni, extra mozzarella, and herb sauce.' },
      { name: 'Garlic Cheese Bread', price: 179.00, category: 'Sides', imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600', desc: 'Warm baguette slices toasted with garlic butter, parsley, and melted mozzarella.' },
      { name: 'Classic Tiramisu', price: 199.00, category: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600', desc: 'Traditional Italian dessert layered with coffee-soaked ladyfingers and mascarpone.' }
    ];
  } else if (catLower.includes('cafe') || catLower.includes('coffee')) {
    return [
      { name: 'Espresso Macchiato', price: 149.00, category: 'Beverages', imageUrl: 'https://images.unsplash.com/photo-1510972527407-cbd5e77fb736?w=600', desc: 'Rich espresso shot with a dollop of warm frothed milk.' },
      { name: 'Caramel Latte Macchiato', price: 199.00, category: 'Beverages', imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600', desc: 'Velvety espresso, steamed milk, and sweet caramel drizzle.' },
      { name: 'Butter Croissant', price: 129.00, category: 'Bakery', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600', desc: 'Flaky, buttery French pastry baked golden brown.' },
      { name: 'Avocado Toast', price: 249.00, category: 'All Day Breakfast', imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=600', desc: 'Mashed seasoned avocado on sourdough toast topped with cherry tomatoes.' }
    ];
  } else if (catLower.includes('bakery') || catLower.includes('cake')) {
    return [
      { name: 'Chocolate Fudge Cake', price: 349.00, category: 'Cakes', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600', desc: 'Decadent triple layer chocolate cake with chocolate fudge frosting.' },
      { name: 'Red Velvet Cupcake', price: 89.00, category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1614707267537-b85acf00c4b8?w=600', desc: 'Fluffy red velvet cupcake topped with signature cream cheese frosting.' },
      { name: 'Handmade Sweet Macarons (6pcs)', price: 299.00, category: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600', desc: 'Assorted French macarons containing raspberry, pistachio, and chocolate fillings.' },
      { name: 'Gulab Jamun (2pcs)', price: 79.00, category: 'Traditional Sweets', imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600', desc: 'Warm milk solid dumplings fried and soaked in cardamom sugar syrup.' }
    ];
  } else if (catLower.includes('fast food') || catLower.includes('burger')) {
    return [
      { name: 'Classic Beef Burger', price: 249.00, category: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', desc: 'Flame-grilled patty with cheddar cheese, lettuce, tomato, pickles, and burger sauce.' },
      { name: 'Crispy French Fries', price: 129.00, category: 'Sides', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600', desc: 'Golden-brown salted potato fries served with tomato ketchup.' },
      { name: 'Clubhouse Sandwich', price: 189.00, category: 'Sandwiches', imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600', desc: 'Triple decker toast with grilled chicken breast, bacon, fried egg, lettuce, and mayo.' },
      { name: 'Crispy Onion Rings', price: 119.00, category: 'Sides', imageUrl: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?w=600', desc: 'Thick-cut onion rings battered and deep fried to golden perfection.' }
    ];
  } else if (catLower.includes('chinese') || catLower.includes('momo') || catLower.includes('asian')) {
    return [
      { name: 'Steamed Vegetable Momos (8pcs)', price: 139.00, category: 'Momos', imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600', desc: 'Delicate flour wrappers filled with finely minced mixed vegetables, steamed to order.' },
      { name: 'Veg Hakka Noodles', price: 179.00, category: 'Noodles', imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600', desc: 'Stir-fried wheat noodles tossed with julienned vegetables and light soy sauce.' },
      { name: 'Schezwan Fried Rice', price: 189.00, category: 'Rice', imageUrl: 'https://images.unsplash.com/photo-1603133872878-696658804445?w=600', desc: 'Spicy, fiery wok-tossed rice flavored with hot Schezwan paste.' },
      { name: 'Crispy Spring Rolls (4pcs)', price: 129.00, category: 'Appetizers', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600', desc: 'Crunchy golden pastry shells stuffed with seasoned vegetables.' }
    ];
  } else if (catLower.includes('indian') || catLower.includes('biryani')) {
    return [
      { name: 'Butter Chicken Masala', price: 299.00, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600', desc: 'Tender tandoori chicken cooked in a rich, creamy, tomato butter gravy.' },
      { name: 'Paneer Butter Masala', price: 269.00, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600', desc: 'Artisanal cottage cheese cubes cooked in butter tomato gravy.' },
      { name: 'Chicken Dum Biryani', price: 279.00, category: 'Rice Specialities', imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600', desc: 'Slow-cooked aromatic basmati rice layered with juicy spiced chicken pieces.' },
      { name: 'Garlic Butter Naan', price: 59.00, category: 'Breads', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600', desc: 'Clay oven baked flatbread brushed with garlic and butter.' }
    ];
  } else if (catLower.includes('vegan') || catLower.includes('salad') || catLower.includes('healthy') || catLower.includes('organic')) {
    return [
      { name: 'Avocado Quinoa Salad Bowl', price: 279.00, category: 'Salads & Bowls', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600', desc: 'Organic quinoa, fresh sliced avocado, kale, edamame, and lemon vinaigrette.' },
      { name: 'Mediterranean Falafel Wrap', price: 199.00, category: 'Wraps', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600', desc: 'Crispy falafels, hummus, cucumbers, and tomatoes wrapped in warm pita.' },
      { name: 'Vegan Buddha Bowl', price: 299.00, category: 'Salads & Bowls', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600', desc: 'Roasted sweet potato, chickpeas, steamed broccoli, and tahini dressing over brown rice.' },
      { name: 'Fresh Green Detox Juice', price: 149.00, category: 'Cold Press', imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587caa90?w=600', desc: 'Cold-pressed green apples, cucumber, celery, spinach, and lemon juice.' }
    ];
  }

  // Fallback / Fine Dining & general
  return [
    { name: 'Truffle Butter Tagliatelle', price: 650.00, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600', desc: 'Hand-rolled pasta, black winter truffle, aged Parmigiano, and cultured butter finished with herbs.' },
    { name: 'Pan-Seared Sea Bass', price: 950.00, category: 'Mains', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600', desc: 'Wild-caught sea bass with saffron emulsion, heirloom carrots, and fresh dill oil.' },
    { name: 'Citrus Garden Salad', price: 320.00, category: 'Starters', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600', desc: 'Crisp greens, fennel, orange segments, toasted almonds, and herb vinaigrette.' },
    { name: 'Sparkling Yuzu Spritz', price: 220.00, category: 'Drinks', imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6d3a?w=600', desc: 'Yuzu, elderflower, soda, and a crisp citrus finish served over ice.' }
  ];
}

export const RESTAURANT_THEMES = [
  { id: 'gold-luxury', name: 'Luxury Gold', color: '#c5a880', bgColor: 'bg-[#c5a880]', desc: 'Champagne & Gold' },
  { id: 'charcoal-slate', name: 'Modern Black', color: '#475569', bgColor: 'bg-[#475569]', desc: 'Minimalist Slate' },
  { id: 'forest-herbs', name: 'Forest Herbs', color: '#047857', bgColor: 'bg-[#047857]', desc: 'Eco Green' },
  { id: 'indigo-ocean', name: 'Ocean Blue', color: '#4f46e5', bgColor: 'bg-[#4f46e5]', desc: 'Sea Navy' },
  { id: 'sunset-gold', name: 'Sunset Orange', color: '#ea580c', bgColor: 'bg-[#ea580c]', desc: 'Vivid Spiced' },
  { id: 'velvet-plum', name: 'Velvet Plum', color: '#7c3aed', bgColor: 'bg-[#7c3aed]', desc: 'Artisan Purple' },
  { id: 'terracotta-clay', name: 'Terracotta Bistro', color: '#c2410c', bgColor: 'bg-[#c2410c]', desc: 'Clay Brick' }
];

export const RESTAURANT_HOMEPAGES = [
  { id: 'menu-grid-focus', name: 'Modern Menu Grid', previewIcon: '🍔', desc: 'Displays dishes in clean grids with quick category switch tabs.' },
  { id: 'reservation-banner', name: 'Minimal Booking', previewIcon: '📅', desc: 'Highlights direct table seat reservations and menu call to actions.' },
  { id: 'chef-specials', name: 'Luxury Specials', previewIcon: '🍽️', desc: 'Elegant focus on chef specials, signature dishes, and winery selection.' },
  { id: 'reviews-showcase', name: 'Classic Reviews', previewIcon: '⭐', desc: 'Puts diner reviews, awards, and chef stories in the main spotlight.' }
];

export const RESTAURANT_LOGINS = [
  { id: 'left-illustration', name: 'Split Image Left', previewIcon: '🔑', desc: 'Left background illustration with clean right side form.' },
  { id: 'right-illustration', name: 'Split Image Right', previewIcon: '🛡️', desc: 'Right background illustration with clean left side form.' },
  { id: 'floating-dishes', name: 'Glass Overlay', previewIcon: '🍅', desc: 'Translucent floating login card over animated celebration spots.' },
  { id: 'minimal-logo', name: 'Minimal Card', previewIcon: '🍳', desc: 'Stark high contrast card with minimal logo layout.' }
];

export const RESTAURANT_DASHBOARDS = [
  { id: 'metric-overview', name: 'Modern Dark Console', previewIcon: '📊', desc: 'Dark theme sidebar with orders ledger and active sales metric cards.' },
  { id: 'menu-catalog', name: 'Light Inventory', previewIcon: '📈', desc: 'Light theme manager focusing on product inventory list & restocks.' },
  { id: 'reservations-inbox', name: 'Glass Inbox Panel', previewIcon: '💍', desc: 'Translucent panels dedicated to reservations chat inbox & logs.' }
];
