'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ALL_THEMES_160 } from '@/app/dashboard/themesData';

interface EcommerceCategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
  image: string;
}

export const ECOMMERCE_CATEGORIES: EcommerceCategory[] = [
  {
    id: 'fashion',
    name: 'Fashion & Boutique',
    icon: '👗',
    desc: 'Clothing apparel, streetwear, collections, garments, and active footwear.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'electronics',
    name: 'Electronics & Tech',
    icon: '💻',
    desc: 'Digital gadgets, mobile accessories, computer hardware, and smart appliances.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'grocery',
    name: 'Grocery & Organic Store',
    icon: '🍎',
    desc: 'Fresh farm produce, health foods, coffee roasters, and bakery sweets.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'furniture',
    name: 'Furniture & Decor',
    icon: '🛋️',
    desc: 'Scandinavian furniture, modern lightings, and minimalist interiors.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Luxury',
    icon: '💍',
    desc: 'Diamond rings, luxury gold chains, necklaces, and GIA-certified accessories.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'beauty',
    name: 'Cosmetics & Beauty',
    icon: '💄',
    desc: 'Nourishing skincare, cosmetic items, spa oils, and beauty products.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy & Wellness',
    icon: '⚕️',
    desc: 'First-aid, vitamins, daily supplements, and prescription medications.',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pet',
    name: 'Pet Supplies Store',
    icon: '🐕',
    desc: 'Pet food kibbles, chew toys, scratching posts, and grooming gear.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'books',
    name: 'Bookstore & Stationery',
    icon: '📚',
    desc: 'Novels, journals, calligraphy pens, notebooks, and school stationery.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'sports',
    name: 'Sporting & Outdoors',
    icon: '🚴',
    desc: 'Fitness trackers, sports cycles, running shoes, and active tracksuits.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Diner',
    icon: '🍔',
    desc: 'Bacon cheese burgers, pepperoni pizzas, French fries, and soda refreshments.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'bakery',
    name: 'Bakery & Sweets',
    icon: '🍰',
    desc: 'Fudge chocolate cakes, fresh warm croissants, and red velvet cupcakes.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cafe',
    name: 'Cafe & Roasters',
    icon: '☕',
    desc: 'Brewed drip coffee beans, espresso shots, iced caramel lattes, and teapots.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'home-decor',
    name: 'Home Decor & Crafts',
    icon: '🖼️',
    desc: 'Ceramic dried flower vases, geometric throw cushions, and scented soy candles.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'digital',
    name: 'Digital Products Store',
    icon: '💾',
    desc: 'Lightroom preset packs, SaaS admin templates, and Figma UI kits.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'flower',
    name: 'Flower Shop',
    icon: '💐',
    desc: 'Fresh premium rose bouquets, lilies, vases, and pre-assembled succulent gardens.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gift',
    name: 'Gift Shop',
    icon: '🎁',
    desc: 'Gourmet chocolate baskets, customized ceramic mugs, and scented candle sets.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'kids',
    name: 'Baby & Kids Store',
    icon: '🧸',
    desc: 'Organic cotton baby bodysuit packs, wooden stacking toys, and soft crib sheets.',
    image: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'mobile-accessories',
    name: 'Mobile Accessories',
    icon: '📱',
    desc: 'Clear magnetic phone cases, auto-clamp car chargers, and pro LED ring light tripods.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'computer-store',
    name: 'Computer & Laptop Store',
    icon: '🖥️',
    desc: 'Ultra-wide curved IPS monitors, ergonomic mesh task chairs, and USB-C docks.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'automotive',
    name: 'Automotive Parts',
    icon: '🚗',
    desc: 'Carnauba liquid car wax, OBD2 diagnostic scanners, and car air purifiers.',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    icon: '🍳',
    desc: 'Smart digital air fryers, ceramic non-stick fry pans, and Damascus steel chef knives.',
    image: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'footwear',
    name: 'Footwear Store',
    icon: '👟',
    desc: 'AeroCushion running sneakers, premium leather loafers, and comfort trail sandals.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'watches',
    name: 'Watches Store',
    icon: '⌚',
    desc: 'Chronograph leather sport watches, minimal quartz watches, and skeleton automatics.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'bags',
    name: 'Bags & Luggage',
    icon: '👜',
    desc: 'Vintage leather travel duffle bags, anti-theft laptop backpacks, and Saffiano crossbodies.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'musical',
    name: 'Musical Instruments',
    icon: '🎸',
    desc: 'Solid spruce acoustic guitars, digital arranger keyboards, and concert ukuleles.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'hardware',
    name: 'Hardware & Tools',
    icon: '🛠️',
    desc: 'Cordless drill sets, heavy duty steel tool chests, and precision magnetic kits.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    icon: '🤖',
    desc: 'STEM coding robots, wooden animal stacking puzzles, and offroad RC buggies.',
    image: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'furniture-premium',
    name: 'Furniture Premium',
    icon: '🛋️',
    desc: 'Velvet mid-century accent sofas, Carrara marble coffee tables, and orthopedic chairs.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'organic-farm',
    name: 'Organic Farm Store',
    icon: '🚜',
    desc: 'Fresh farm strawberry baskets, artisanal fresh goat cheese, and raw honeycombs.',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'courses',
    name: 'Online Courses',
    icon: '🎓',
    desc: 'React Next.js masterclass bootcamps, digital marketing strategies, and design system guides.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pod',
    name: 'Print On Demand',
    icon: '👕',
    desc: 'Custom graphic hoodies, sublimated tea mugs, and embroidered canvas tote bags.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'handmade',
    name: 'Handmade Crafts',
    icon: '🏺',
    desc: 'Hand-woven sunset tapestries, carved walnut salad bowls, and thrown ceramic mugs.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'art',
    name: 'Art Gallery',
    icon: '🎨',
    desc: 'Original oil landscape canvas paintings, abstract stone sculptures, and fine art prints.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'medical',
    name: 'Medical Equipment',
    icon: '🩺',
    desc: 'Digital pulse oximeters, compression leg socks, and pro first aid box cases.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'wholesale',
    name: 'B2B Wholesale',
    icon: '🏢',
    desc: 'Bulk cotton blank tees, bulk kraft paper shopping bags, and bulk LED light bulbs.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'marketplace',
    name: 'Multi Vendor Marketplace',
    icon: '🌐',
    desc: 'Multi-vendor smart tech bundles, local boutique packs, and farm fresh food boxes.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'scratch',
    name: 'Build From Scratch',
    icon: '🛠️',
    desc: 'Create a blank slate and build custom storefront themes.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=80'
  }
];

interface EcommerceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string, config: any) => void;
  onBuildFromScratch: () => void;
}

export default function EcommerceSelectorModal({
  isOpen,
  onClose,
  onSelectCategory,
  onBuildFromScratch
}: EcommerceSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EcommerceCategory | null>(null);
  const [wizardStep, setWizardStep] = useState<'niche' | 'theme'>('niche');
  const [selectedTheme, setSelectedTheme] = useState<any>(null);

  // Fullscreen Theme Preview Modal state
  const [previewTheme, setPreviewTheme] = useState<any>(null);
  // Preview aspect mode: 'desktop' | 'tablet' | 'mobile'
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewTheme) setPreviewTheme(null);
        else onClose();
      }
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, previewTheme]);

  const filteredCategories = useMemo(() => {
    const list = ECOMMERCE_CATEGORIES.filter((cat) => cat.id !== 'scratch');
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase().trim();
    return list.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.desc.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const themesForCategory = useMemo(() => {
    if (!selectedCategory) return [];
    return ALL_THEMES_160.filter(
      (t) => t.category.toLowerCase() === selectedCategory.id.toLowerCase()
    );
  }, [selectedCategory]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (wizardStep === 'niche' && selectedCategory) {
      const available = themesForCategory;
      if (available.length > 0) {
        setSelectedTheme(available[0]);
      }
      setWizardStep('theme');
    }
  };

  const handleBackStep = () => {
    if (wizardStep === 'theme') {
      setWizardStep('niche');
    }
  };

  const handleCompleteSetup = (themeToUse?: any) => {
    const theme = themeToUse || selectedTheme;
    if (selectedCategory && theme) {
      onSelectCategory(selectedCategory.name, {
        themeId: theme.id,
        themeColor: theme.primaryColor,
        themeConfig: theme
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-955/65 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in font-sans">
      <div 
        className="bg-slate-900 border border-white/10 text-white rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-white/10 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>🛍️</span>{' '}
              {wizardStep === 'niche'
                ? 'Select E-commerce Category'
                : `Choose Theme for ${selectedCategory?.name}`}
            </h2>
            <p className="text-xs text-slate-400">
              {wizardStep === 'niche'
                ? 'Select a business template category to seed product catalogs & inventory automatically.'
                : 'Choose from professional, responsive theme designs tailored to your online store.'}
            </p>
          </div>

          {wizardStep === 'niche' && (
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-455 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8">
          {wizardStep === 'niche' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Build from Scratch Option */}
              <div
                onClick={() => {
                  const scratchCat = ECOMMERCE_CATEGORIES.find(c => c.id === 'scratch')!;
                  setSelectedCategory(scratchCat);
                  setWizardStep('theme');
                }}
                className="group relative rounded-2xl overflow-hidden border border-dashed border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500 transition cursor-pointer flex flex-col justify-center items-center text-center p-6 min-h-[180px]"
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition duration-300">⚙️</span>
                <h3 className="font-bold text-sm text-indigo-400 group-hover:text-indigo-300">Build from Scratch</h3>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] leading-relaxed">Create a blank slate and build custom storefront themes.</p>
              </div>

              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group relative rounded-2xl overflow-hidden border transition cursor-pointer flex flex-col min-h-[180px] ${
                    selectedCategory?.id === cat.id
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="h-28 relative overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-slate-900/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 border border-white/10 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 shadow-sm text-white">
                      <span>{cat.icon}</span> {cat.name}
                    </span>
                  </div>
                  <div className="p-3.5 flex-grow flex flex-col justify-between">
                    <p className="text-[10px] text-slate-350 leading-relaxed font-semibold">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {wizardStep === 'theme' && (
            <div className="space-y-6">
              {/* Premium Theme Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themesForCategory.map((theme) => (
                  <div
                    key={theme.id}
                    className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition duration-300 ${
                      selectedTheme?.id === theme.id
                        ? 'border-indigo-500 bg-indigo-500/5 shadow-2xl shadow-indigo-500/10'
                        : 'border-white/10 bg-slate-900 hover:border-white/20'
                    }`}
                  >
                    {/* Large preview image */}
                    <div className="h-48 relative overflow-hidden bg-slate-955 border-b border-white/5">
                      <img 
                        src={theme.thumbnail} 
                        alt={theme.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
                      
                      {/* Premium Badge */}
                      {theme.isPremium && (
                        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded shadow-lg uppercase">
                          Premium Theme
                        </span>
                      )}
                    </div>

                    {/* Theme Content */}
                    <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <h4 className="font-black text-sm text-white">{theme.name}</h4>
                          <div className="flex gap-1.5 items-center">
                            <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: theme.primaryColor }} title="Primary Accent" />
                            <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: theme.secondaryColor }} title="Secondary Accent" />
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                          {theme.desc}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                        <button
                          onClick={() => setPreviewTheme(theme)}
                          className="flex-1 py-2 border border-white/15 hover:bg-white/5 text-[10px] font-bold rounded-xl transition cursor-pointer text-slate-300"
                        >
                          👁️ Preview Theme
                        </button>
                        <button
                          onClick={() => handleCompleteSetup(theme)}
                          className="flex-1 py-2 text-[10px] font-bold text-white rounded-xl transition hover:scale-105 cursor-pointer shadow-lg"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          ✓ Use Theme
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/10 bg-white/[0.01] flex justify-between items-center">
          <div>
            {wizardStep === 'theme' && (
              <button
                onClick={handleBackStep}
                className="px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                ← Back
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-bold rounded-xl transition cursor-pointer text-slate-400"
            >
              Cancel
            </button>
            {wizardStep === 'niche' && (
              <button
                disabled={!selectedCategory}
                onClick={handleNextStep}
                className="px-5 py-2 bg-indigo-650 hover:bg-indigo-700 disabled:opacity-50 text-xs font-bold rounded-xl text-white transition cursor-pointer shadow-lg"
              >
                Choose Theme →
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Fullscreen Theme Live Preview Mockup Modal */}
      {previewTheme && (
        <div className="fixed inset-0 z-50 bg-slate-955 flex flex-col animate-fade-in font-sans">
          {/* Top Preview Control Bar */}
          <div className="bg-slate-900 border-b border-white/10 px-6 py-3.5 flex items-center justify-between z-10 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl p-1 bg-white/5 border border-white/10 rounded-lg">{previewTheme.icon}</span>
              <div>
                <h3 className="text-xs font-black text-white">{previewTheme.name}</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Store Mockup Preview</p>
              </div>
            </div>

            {/* Desktop / Tablet / Mobile Switcher */}
            <div className="flex gap-1 bg-slate-950 p-1 border border-white/10 rounded-xl">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition cursor-pointer ${
                  previewMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-350'
                }`}
              >
                🖥️ Desktop
              </button>
              <button
                onClick={() => setPreviewMode('tablet')}
                className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition cursor-pointer ${
                  previewMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-350'
                }`}
              >
                📟 Tablet
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition cursor-pointer ${
                  previewMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-350'
                }`}
              >
                📱 Mobile
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCompleteSetup(previewTheme)}
                className="px-4 py-2 bg-emerald-650 hover:bg-emerald-700 text-xs font-bold rounded-xl text-white transition cursor-pointer shadow-md"
              >
                Use This Theme
              </button>
              <button
                onClick={() => setPreviewTheme(null)}
                className="text-slate-400 hover:text-white text-sm bg-white/5 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Preview Canvas Container */}
          <div className="flex-grow p-6 flex justify-center items-center overflow-auto bg-slate-950">
            <div 
              className={`bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-350 relative ${
                previewMode === 'mobile' ? 'w-[375px] h-[667px]' : previewMode === 'tablet' ? 'w-[768px] h-[800px]' : 'w-full max-w-5xl h-full'
              }`}
            >
              {/* Simulated browser window wrapper */}
              <div className="bg-slate-950 px-4 py-2 flex items-center gap-1.5 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="flex-grow text-center text-[9px] text-slate-600 font-semibold bg-slate-900/60 py-0.5 rounded mx-6 truncate">
                  https://preview.zatbiz.site/{previewTheme.id}
                </div>
              </div>

              {/* Iframe mockup mockup graphic */}
              <div className="absolute inset-0 top-6 overflow-y-auto flex flex-col bg-slate-900">
                {/* Header preview */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-slate-950/40">
                  <span className="font-black text-xs text-white">{previewTheme.name}</span>
                  <div className="flex gap-3 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    <span>Shop</span>
                    <span>Collections</span>
                    <span>Story</span>
                  </div>
                  <span className="text-xs">🛒</span>
                </div>

                {/* Banner preview */}
                <div className="h-44 relative overflow-hidden flex items-center justify-center p-6 text-center border-b border-white/5">
                  <img src={previewTheme.previewImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                  <div className="relative z-10 space-y-2">
                    <h3 className="text-sm font-black text-white">{previewTheme.tagline}</h3>
                    <p className="text-[8px] text-slate-400 font-semibold">{previewTheme.desc}</p>
                    <button className="px-3 py-1 text-[8px] font-bold rounded-lg text-white" style={{ backgroundColor: previewTheme.primaryColor }}>Shop Now</button>
                  </div>
                </div>

                {/* Products preview */}
                <div className="p-6 space-y-4">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-550">Featured Seeding Items</h4>
                  <div className={`grid gap-4 ${previewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    {(previewTheme.products || []).map((p: any, idx: number) => (
                      <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-3">
                        <img src={p.imageUrl} alt={p.name} className="h-24 w-full object-cover rounded-lg bg-slate-950 border border-white/10" />
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-slate-500 uppercase">{p.category}</span>
                          <h5 className="font-bold text-[10px] text-white truncate">{p.name}</h5>
                          <div className="flex justify-between items-center pt-1 border-t border-white/5">
                            <span className="text-[10px] font-black text-white">₹{p.price.toLocaleString()}</span>
                            <span className="text-[9px]" style={{ color: previewTheme.primaryColor }}>★ 4.8</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instagram Gallery & Footer preview */}
                <div className="p-6 border-t border-white/5 space-y-4">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500">Instagram Gallery</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200',
                      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
                      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200'
                    ].map((img, idx) => (
                      <img key={idx} src={img} alt="Insta preview" className="aspect-square w-full object-cover rounded-lg bg-slate-950 border border-white/10" />
                    ))}
                  </div>
                </div>

                <div className="mt-auto px-6 py-6 border-t border-white/5 bg-slate-950/60 text-center text-[8px] text-slate-500 font-bold space-y-2">
                  <p>© 2026 {previewTheme.name} Corp. All rights reserved.</p>
                  <p className="text-[7px]">Shopify-inspired multi-tenant premium storefront engine.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
