'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { THEMES_30 } from '@/app/dashboard/themesData';

interface RealEstateCategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
  image: string;
}

export const REAL_ESTATE_CATEGORIES: RealEstateCategory[] = [
  {
    id: 'agency',
    name: 'Real Estate Agency',
    icon: '🏢',
    desc: 'Professional brokerage matching buyers and sellers with expert residential property consulting.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'dealer',
    name: 'Property Dealer',
    icon: '🤝',
    desc: 'Local property experts helping you buy, sell, or rent residential plots and apartments.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'builder',
    name: 'Property Builder',
    icon: '🏗️',
    desc: 'Leading real estate developers building state-of-the-art housing societies and residential complexes.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'construction',
    name: 'Construction Company',
    icon: '🧱',
    desc: 'End-to-end building, civil engineering, remodeling, structural foundation, and contracting.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'residential-projects',
    name: 'Residential Projects',
    icon: '🏘️',
    desc: 'New launching townships, premium housing apartments, duplex projects, and gated communities.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'commercial-re',
    name: 'Commercial Real Estate',
    icon: '🏙️',
    desc: 'Office structures, retail spaces, business plazas, shopping malls, and corporate properties.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'luxury-agency',
    name: 'Luxury Property Agency',
    icon: '💎',
    desc: 'Exclusive villas, penthouses, high-end mansions, waterfront properties, and elite estates.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'flat-dealer',
    name: 'Apartment & Flat Dealer',
    icon: '🏬',
    desc: 'Find your ideal studio, 2-BHK, 3-BHK apartments, or high-rise penthouse units.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'villa-dealer',
    name: 'Villa & Bungalow Dealer',
    icon: '🏡',
    desc: 'Standalone premium villas, luxury bungalows with private yards, lawns, and swimming pools.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'house-dealer',
    name: 'Independent House Dealer',
    icon: '🏠',
    desc: 'Standalone residential buildings, individual duplexes, and raw houses with land ownership.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'plot-dealer',
    name: 'Plot & Land Dealer',
    icon: '📐',
    desc: 'Residential layout plots, agricultural land, industrial zones, and commercial properties.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'farmhouse-dealer',
    name: 'Farm House Dealer',
    icon: '🌾',
    desc: 'Peaceful countryside farmhouse plots, organic retreats, and holiday farm bungalows.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'industrial-prop',
    name: 'Industrial Property',
    icon: '🏭',
    desc: 'Manufacturing plants, heavy industrial zones, distribution units, and chemical parks.',
    image: 'https://images.unsplash.com/photo-1530631676644-4c3d78d6f040?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'warehouse-factory',
    name: 'Warehouse & Factory',
    icon: '📦',
    desc: 'Logistics facilities, cold storage warehouses, factory sheds, and storage spaces.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'office-dealer',
    name: 'Office Space Dealer',
    icon: '💼',
    desc: 'Fully furnished business offices, corporate cabins, executive suites, and corporate floors.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'coworking-provider',
    name: 'Co-working Space Provider',
    icon: '💻',
    desc: 'Shared flexible desks, meeting rooms, high-speed internet, and hot-desks for freelancers.',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'rental-agency',
    name: 'Property Rental Agency',
    icon: '🔑',
    desc: 'Residential and commercial renting services, tenant verification, and lease management.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'vacation-rental',
    name: 'Vacation Rental Agency',
    icon: '🌴',
    desc: 'Holiday villas, short-term homestay booking, beach resorts, and cabin rental listings.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pg-hostel-mgmt',
    name: 'PG & Hostel Management',
    icon: '🛏️',
    desc: 'Paying guest accommodations, shared bunk rooms, mess food management, and student hosteling.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'student-accommodation',
    name: 'Student Accommodation',
    icon: '🎓',
    desc: 'Budget-friendly student rental flats, hostel networks, and flatshare services near colleges.',
    image: 'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 're-consultant',
    name: 'Real Estate Consultant',
    icon: '💡',
    desc: 'Advisory on asset acquisitions, tax structures, market trends, and legal property checks.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'investment-consultant',
    name: 'Property Investment Consultant',
    icon: '📈',
    desc: 'Maximize returns with real estate crowdfunding, high-yielding commercial shops, and REITs.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'property-mgmt',
    name: 'Property Management Company',
    icon: '🛠️',
    desc: 'Tenant management, rent collections, facility maintenance, and structural repair services.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'interior-design',
    name: 'Interior Design Company',
    icon: '🎨',
    desc: 'Aesthetic home renovations, customized kitchen design, space planning, and modern furniture.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'architecture-firm',
    name: 'Architecture Firm',
    icon: '📐',
    desc: 'Modern building blueprints, structural engineering, exterior facade designs, and blueprints.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loan-consultant',
    name: 'Home Loan Consultant',
    icon: '💵',
    desc: 'Low-interest home financing packages, documentation support, and swift bank approvals.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'valuation-company',
    name: 'Property Valuation Company',
    icon: '📋',
    desc: 'Certified property pricing checks, market value assessments, and bank mortgage checks.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 're-franchise',
    name: 'Real Estate Franchise',
    icon: '🏢',
    desc: 'Start your real estate consultancy franchise with verified leads and global branding.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'smartcity-developer',
    name: 'Smart City Developer',
    icon: '🌐',
    desc: 'Planning next-generation eco-friendly smart societies, IoT integrations, and grids.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&auto=format&fit=crop&q=80'
  }
];

interface RealEstateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string, themeId: string, themeColor: string) => void;
  onBuildFromScratch: () => void;
}

export default function RealEstateSelectorModal({
  isOpen,
  onClose,
  onSelectCategory,
  onBuildFromScratch
}: RealEstateSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return REAL_ESTATE_CATEGORIES;
    const query = searchQuery.toLowerCase().trim();
    return REAL_ESTATE_CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.desc.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const realEstateThemes = useMemo(() => {
    return THEMES_30.filter((t) => t.id.startsWith('realestate-'));
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div 
        className="bg-white border border-slate-200 text-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer z-10"
          title="Close Selector"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <span>🏡</span> {selectedCategory ? `Choose Theme for ${selectedCategory}` : 'Real Estate Niche Categories'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {selectedCategory 
                ? `Pick an aesthetic layout style for your ${selectedCategory} website.`
                : 'Select a specialized property or construction agency category to initialize your builder workspace.'}
            </p>
          </div>

          {/* Search bar (Only show in step 1) */}
          {!selectedCategory && (
            <div className="relative w-full md:w-80">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search real estate subcategory..."
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-650 rounded-xl pl-9 pr-8 py-2.5 text-xs outline-none text-slate-800 transition placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-655 text-xs bg-transparent border-none cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Back button (Only show in step 2) */}
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 text-xs font-bold bg-slate-105 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition flex items-center gap-1 cursor-pointer"
            >
              ← Back to Categories
            </button>
          )}
        </div>

        {/* Categories Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-slate-50/20">
          {!selectedCategory ? (
            /* STEP 1: Categories list */
            filteredCategories.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-4xl block mb-4">🔍</span>
                <h3 className="text-sm font-extrabold text-slate-800">No matching real estate niches found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto mb-6">
                  We couldn't find a category matching "{searchQuery}". You can try another search or start with a blank slate.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-5 py-2.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition border border-slate-200 cursor-pointer"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={onBuildFromScratch}
                    className="px-5 py-2.5 text-xs font-bold bg-indigo-650 hover:bg-indigo-755 text-white rounded-xl shadow-md transition cursor-pointer border-none"
                  >
                    Build from Scratch ➔
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Build from Scratch Card */}
                <div className="flex flex-col bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 border border-dashed border-indigo-300 rounded-2xl overflow-hidden hover:border-indigo-500 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-full h-32 bg-slate-50/80 flex flex-col items-center justify-center relative flex-shrink-0 border-b border-slate-100">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <span className="text-4xl group-hover:scale-110 group-hover:rotate-6 transition duration-300 z-10 select-none">✨</span>
                    <span className="absolute top-2.5 left-2.5 bg-indigo-50 border border-indigo-250 text-indigo-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                      Blank Slate
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5 mb-4 text-left font-sans">
                      <h3 className="text-xs font-black text-indigo-600 uppercase tracking-wider">Build from Scratch</h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                        Skip pre-configured real estate layouts and start with a clean site builder interface.
                      </p>
                    </div>
                    <button
                      onClick={onBuildFromScratch}
                      className="w-full py-2.5 text-[10px] font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition shadow-md uppercase tracking-wider cursor-pointer border-none"
                    >
                      Start Blank Canvas ➔
                    </button>
                  </div>
                </div>

                {/* Dynamic Categories */}
                {filteredCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group"
                  >
                    <div className="w-full h-32 overflow-hidden relative flex-shrink-0 border-b border-slate-100">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-80" />
                      
                      {/* Floating emoji icon */}
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-150 flex items-center justify-center text-base absolute bottom-2 right-2.5 z-10 shadow-md">
                        {cat.icon}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between text-left font-sans">
                      <div className="space-y-1.5 mb-4">
                        <h3 className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition tracking-tight">
                          {cat.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-semibold line-clamp-2">
                          {cat.desc}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedCategory(cat.name)}
                        className="w-full py-2.5 text-[10px] font-black bg-slate-50 border border-slate-200/80 hover:bg-indigo-650 hover:border-indigo-600 hover:text-white text-slate-650 rounded-xl transition uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Select & View Themes ➔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* STEP 2: Theme selection grid (10 themes) */
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-left">
                <p className="text-[11px] text-indigo-850 font-bold leading-normal">
                  🚀 Selected Real Estate Niche: <span className="underline decoration-indigo-500 decoration-2">{selectedCategory}</span>. 
                  Now select from one of our 10 curated layout templates below to apply specialized colors, fonts, and blocks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {realEstateThemes.map((theme) => {
                  const isDarkTheme = theme.bgColor === '#09090b' || theme.bgColor === '#020617' || theme.bgColor === '#18181b';
                  
                  return (
                    <div
                      key={theme.id}
                      className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-500/50 hover:scale-[1.02] transition-all duration-300 group text-left"
                    >
                      {/* Theme Preview Header */}
                      <div className={`w-full h-28 relative flex-shrink-0 border-b border-slate-100 bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                        <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-xl shadow-lg animate-pulse">
                          {theme.icon}
                        </div>
                        
                        {/* Light/Dark mode pill */}
                        <span className={`absolute top-3 right-3 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isDarkTheme ? 'bg-zinc-950 text-zinc-350 border border-zinc-800' : 'bg-white text-slate-700 border border-slate-200'
                        }`}>
                          {isDarkTheme ? '🕶️ Dark Mode' : '☀️ Light Mode'}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition tracking-tight flex items-center gap-1.5">
                            <span>{theme.brandIcon}</span> {theme.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                            {theme.tagline} Perfect for a premium {selectedCategory}.
                          </p>

                          {/* Color Palette Previews */}
                          <div className="pt-2 flex items-center gap-3">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Colors:</span>
                            <div className="flex items-center gap-1.5">
                              <span 
                                className="w-3 h-3 rounded-full border border-slate-200 shadow-sm" 
                                style={{ backgroundColor: theme.primaryColor }}
                                title={`Primary: ${theme.primaryColor}`}
                              />
                              <span 
                                className="w-3 h-3 rounded-full border border-slate-200 shadow-sm" 
                                style={{ backgroundColor: theme.secondaryColor }}
                                title={`Secondary: ${theme.secondaryColor}`}
                              />
                              <span 
                                className="w-3 h-3 rounded-full border border-slate-200 shadow-sm" 
                                style={{ backgroundColor: theme.bgColor }}
                                title={`Background: ${theme.bgColor}`}
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectCategory(selectedCategory, theme.id, theme.primaryColor)}
                          className="w-full py-2.5 text-[10px] font-black bg-slate-55 border border-slate-200/80 hover:bg-indigo-650 hover:border-indigo-600 hover:text-white text-slate-650 rounded-xl transition uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Use Theme & Continue ➔
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-150 text-center text-[10px] text-slate-450 font-bold uppercase tracking-wider">
          {selectedCategory 
            ? `Select one of the 10 custom designed real estate themes to apply to your ${selectedCategory} website.`
            : 'Chosen real estate subcategories initialize customized service guidelines and templates.'}
        </div>
      </div>
    </div>
  );
}
