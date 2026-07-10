'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { THEMES_30 } from '@/app/dashboard/themesData';

interface GymCategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
  image: string;
}

export const GYM_CATEGORIES: GymCategory[] = [
  {
    id: 'traditional-gym',
    name: 'Traditional Gym',
    icon: '🏋️‍♂️',
    desc: 'Classic weightlifting, strength training machines, free weights, and cardio decks.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'premium-fitness-club',
    name: 'Premium Fitness Club',
    icon: '💎',
    desc: 'Luxury wellness amenities, steam/sauna, personal training, and group classes.',
    image: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'personal-training-studio',
    name: 'Personal Training Studio',
    icon: '🤝',
    desc: 'One-on-one tailored fitness coaching, private workout spaces, and nutrition advice.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'crossfit-gym',
    name: 'CrossFit Gym',
    icon: '🔥',
    desc: 'High-intensity functional movements, Olympic lifts, rowing, and community WODs.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'yoga-studio',
    name: 'Yoga Studio',
    icon: '🧘‍♀️',
    desc: 'Mindfulness, Vinyasa, Hatha, flexibility flows, and hot yoga sessions.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'zumba-studio',
    name: 'Zumba Studio',
    icon: '💃',
    desc: 'Energetic Latin dance cardio, high-beat music, and dynamic group fitness.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'dance-fitness-studio',
    name: 'Dance Fitness Studio',
    icon: '🎵',
    desc: 'Hip-hop aerobic sessions, cardio-dance choreographies, and rhythmic workouts.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'martial-arts-academy',
    name: 'Martial Arts Academy',
    icon: '🥋',
    desc: 'Traditional discipline, Karate, Taekwondo, self-defense classes, and junior belts.',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'boxing-academy',
    name: 'Boxing Academy',
    icon: '🥊',
    desc: 'Ring sparring, heavy bag cardio drills, mitt work, footwork, and strength conditioning.',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'mma-training-center',
    name: 'MMA Training Center',
    icon: '🤼‍♂️',
    desc: 'Mixed Martial Arts, Brazilian Jiu-Jitsu, grappling, wrestling, and kickboxing.',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c07750d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'bodybuilding-gym',
    name: 'Bodybuilding Gym',
    icon: '💪',
    desc: 'Heavy iron plates, dumbbells, specialized isolate machines, and contest prep advice.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'womens-fitness-center',
    name: "Women's Fitness Center",
    icon: '👩',
    desc: 'All-women training programs, supportive coaching, spin cycles, and core workouts.',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'weight-loss-center',
    name: 'Weight Loss Center',
    icon: '⚖️',
    desc: 'Custom diet plans, cardio regimens, body-composition scans, and wellness checkups.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'functional-training-center',
    name: 'Functional Training Center',
    icon: '⚙️',
    desc: 'Kettlebells, battle ropes, slam balls, trx suspension, and athletic performance.',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'sports-performance-center',
    name: 'Sports Performance Center',
    icon: '🏃‍♂️',
    desc: 'Speed development, agility drills, sports-specific training, and injury prevention.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'swimming-academy',
    name: 'Swimming Academy',
    icon: '🏊‍♂️',
    desc: 'Lap pool swimming classes, professional coaching, lifeguards, and water exercises.',
    image: 'https://images.unsplash.com/photo-1476490829079-bfa195177f02?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'fitness-franchise',
    name: 'Fitness Franchise',
    icon: '🏢',
    desc: 'Global membership options, standard templates, 24/7 access control, and retail gear.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'home-workout-coach',
    name: 'Home Workout Coach',
    icon: '🏠',
    desc: 'Minimal equipment workouts, bodyweight calisthenics, and virtual home routines.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'online-fitness-coaching',
    name: 'Online Fitness Coaching',
    icon: '📱',
    desc: 'Digital checkins, personalized app workouts, video posture correction, and diet tracking.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80'
  }
];

export const GYM_BG_IMAGES = [
  { id: 'img-1', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80', label: 'CrossFit Power' },
  { id: 'img-2', url: 'https://images.unsplash.com/photo-1517838476312-10d79c07750d?w=800&auto=format&fit=crop&q=80', label: 'Heavy Dumbbells' },
  { id: 'img-3', url: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=80', label: 'Cardio Engine' },
  { id: 'img-4', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80', label: 'Zen Yoga Stretch' },
  { id: 'img-5', url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&auto=format&fit=crop&q=80', label: 'Heavy Bag Boxing' },
  { id: 'img-6', url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=80', label: 'Active Gym Workout' },
  { id: 'img-7', url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80', label: 'Iron Bodybuilding' },
  { id: 'img-8', url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80', label: 'Athletic Running' },
  { id: 'img-9', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80', label: 'Spin Cycle HIIT' },
  { id: 'img-10', url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80', label: 'Elite Gym Interior' }
];

export const GYM_LOGINS = [
  { id: 'split-left-image', name: 'Split Left Image', desc: 'Fitness graphic on the left, inputs on the right.', previewIcon: '👨‍🍳' },
  { id: 'split-right-image', name: 'Split Right Image', desc: 'Inputs on the left, high-energy photo on the right.', previewIcon: '🏋️‍♂️' },
  { id: 'centered-card', name: 'Centered Glass Card', desc: 'Centered frosted glass card overlaid on full-screen gym photo.', previewIcon: '🔒' },
  { id: 'dark-mode-minimal', name: 'Stealth Midnight Minimal', desc: 'Clean dark background with high-contrast active inputs.', previewIcon: '🕶️' },
  { id: 'left-trainer-illustration', name: 'Trainer Illustration Layout', desc: 'Illustrated trainer vector layout alongside login panels.', previewIcon: '🏃' },
  { id: 'minimal-logo-focus', name: 'Centered Brand Logo', desc: 'Focus is completely on your gym brand logo above fields.', previewIcon: '🏷️' },
  { id: 'gradient-mesh-bg', name: 'Neon Gradient Mesh', desc: 'Dynamic flowing gradient mesh backings for active centers.', previewIcon: '🎨' },
  { id: 'clean-side-panel', name: 'Clean Right Sidebar', desc: 'Clean white sidebar login panel with floating visuals.', previewIcon: '📅' },
  { id: 'geometric-patterns', name: 'Geometric Pattern Base', desc: 'Sporty high-energy grid patterns for fitness enthusiasts.', previewIcon: '🏁' },
  { id: 'transparent-blurred', name: 'Blurred Backdrop Mask', desc: 'Blurred atmospheric backdrop with glowing active input masks.', previewIcon: '✨' }
];

interface GymSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string, config: any) => void;
  onBuildFromScratch: () => void;
}

export default function GymSelectorModal({
  isOpen,
  onClose,
  onSelectCategory,
  onBuildFromScratch
}: GymSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [wizardStep, setWizardStep] = useState<'niche' | 'theme' | 'bg-image' | 'login-layout' | 'preview'>('niche');
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [selectedBg, setSelectedBg] = useState<string>('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80');
  const [selectedLogin, setSelectedLogin] = useState<string>('split-left-image');

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
    if (!searchQuery.trim()) return GYM_CATEGORIES;
    const query = searchQuery.toLowerCase().trim();
    return GYM_CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.desc.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const gymThemes = useMemo(() => {
    return THEMES_30.filter((t) => t.id.startsWith('gym-'));
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
              <span>💪</span>{' '}
              {wizardStep === 'niche'
                ? 'Fitness & Gym Niche Categories'
                : wizardStep === 'theme'
                ? `Choose Theme for ${selectedCategory}`
                : wizardStep === 'bg-image'
                ? 'Choose Home Page Background Image'
                : wizardStep === 'login-layout'
                ? 'Choose Member Portal Login Style'
                : `Live Website Preview: ${selectedTheme?.name}`}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {wizardStep === 'niche'
                ? 'Select a specialized athletic or gym center theme to initialize your workout workspace.'
                : wizardStep === 'theme'
                ? `Pick an aesthetic layout style for your ${selectedCategory} website.`
                : wizardStep === 'bg-image'
                ? 'Select from 10 real fitness background images to make your site header look amazing.'
                : wizardStep === 'login-layout'
                ? 'Pick one of the 10 custom login layout options styled with your chosen theme colors.'
                : 'Verify your header background image, login style, and theme colors before continuing.'}
            </p>
          </div>

          {/* Search bar (Only show in step 1) */}
          {wizardStep === 'niche' && (
            <div className="relative w-full md:w-80">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fitness subcategory..."
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

          {/* Back button */}
          {wizardStep !== 'niche' && (
            <button
              onClick={() => {
                if (wizardStep === 'theme') {
                  setSelectedCategory(null);
                  setWizardStep('niche');
                } else if (wizardStep === 'bg-image') {
                  setWizardStep('theme');
                } else if (wizardStep === 'login-layout') {
                  setWizardStep('bg-image');
                } else if (wizardStep === 'preview') {
                  setWizardStep('login-layout');
                }
              }}
              className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition flex items-center gap-1 cursor-pointer"
            >
              ← Back
            </button>
          )}
        </div>

        {/* Categories Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-slate-50/20">
          {wizardStep === 'niche' && (
            /* STEP 1: Categories list */
            filteredCategories.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-4xl block mb-4">🔍</span>
                <h3 className="text-sm font-extrabold text-slate-800">No matching gym niches found</h3>
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
                  <div className="w-full h-32 bg-slate-50/85 flex flex-col items-center justify-center relative flex-shrink-0 border-b border-slate-100">
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
                        Skip pre-configured fitness configurations and start with a clean site builder interface.
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
                        <h3 className="text-xs font-black text-slate-850 group-hover:text-indigo-600 transition tracking-tight">
                          {cat.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-semibold line-clamp-2">
                          {cat.desc}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setWizardStep('theme');
                        }}
                        className="w-full py-2.5 text-[10px] font-black bg-slate-50 border border-slate-200/80 hover:bg-indigo-650 hover:border-indigo-600 hover:text-white text-slate-650 rounded-xl transition uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Select & View Themes ➔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {wizardStep === 'theme' && (
            /* STEP 2: Theme selection grid (10 themes) */
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-left">
                <p className="text-[11px] text-indigo-850 font-bold leading-normal">
                  🚀 Selected Gym Niche: <span className="underline decoration-indigo-500 decoration-2">{selectedCategory}</span>. 
                  Now select from one of our 10 curated layout templates below to apply specialized colors, fonts, and blocks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gymThemes.map((theme) => {
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
                          onClick={() => {
                            setSelectedTheme(theme);
                            setWizardStep('bg-image');
                          }}
                          className="w-full py-2.5 text-[10px] font-black bg-slate-50 border border-slate-200/80 hover:bg-indigo-650 hover:border-indigo-600 hover:text-white text-slate-650 rounded-xl transition uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border-none"
                        >
                          Choose Theme & Continue ➔
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {wizardStep === 'bg-image' && (
            /* STEP 3: Homepage Header Background Image (10 real fitness images) */
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-150 p-5 rounded-2xl text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-sm font-black text-slate-850 flex items-center gap-1.5">
                    📸 Step 3: Choose Home Page Background
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1">
                    Select one of the 10 real fitness background images to make your site header look amazing and professional.
                  </p>
                </div>
                <button
                  onClick={() => setWizardStep('login-layout')}
                  className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer border-none flex-shrink-0"
                >
                  Continue to Login Layout ➔
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {GYM_BG_IMAGES.map((img) => {
                  const isSelected = selectedBg === img.url;
                  return (
                    <button
                      key={img.id}
                      onClick={() => setSelectedBg(img.url)}
                      className={`flex flex-col bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 text-left ${
                        isSelected ? 'border-indigo-600 ring-2 ring-indigo-600/35 scale-[1.02] shadow-md' : 'border-slate-200 hover:border-slate-350 hover:scale-[1.01]'
                      }`}
                    >
                      <div className="w-full h-24 overflow-hidden relative">
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center">
                            <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="p-2 bg-slate-50/50 flex-1 flex items-center border-t border-slate-100">
                        <span className="text-[10px] font-black text-slate-700 truncate block w-full uppercase tracking-wider">{img.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {wizardStep === 'login-layout' && (
            /* STEP 4: Choose Member Portal Login Style (10 options) */
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-150 p-5 rounded-2xl text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-sm font-black text-slate-850 flex items-center gap-1.5">
                    🔐 Step 4: Choose Member Login Page Layout
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1">
                    Select one of the 10 login layouts. The color palette of {selectedTheme?.name} will be applied cleanly to it.
                  </p>
                </div>
                <button
                  onClick={() => setWizardStep('preview')}
                  className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer border-none flex-shrink-0"
                >
                  Continue to Preview ➔
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {GYM_LOGINS.map((login) => {
                  const isSelected = selectedLogin === login.id;
                  return (
                    <button
                      key={login.id}
                      onClick={() => setSelectedLogin(login.id)}
                      className={`flex items-start gap-4 p-5 bg-white border rounded-2xl cursor-pointer text-left transition-all duration-300 ${
                        isSelected ? 'border-indigo-600 ring-2 ring-indigo-600/35 scale-[1.01] shadow-md' : 'border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      <span className="text-2xl p-2.5 bg-slate-50 rounded-xl border border-slate-100">{login.previewIcon}</span>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-slate-900">{login.name}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">{login.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {wizardStep === 'preview' && selectedTheme && (
            /* STEP 5: Live Theme Preview & Save */
            <div className="space-y-6 text-left">
              {/* Info Banner */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-sm font-black text-slate-850 flex items-center gap-1.5">
                    <span>{selectedTheme.brandIcon}</span> Live Theme Preview: {selectedTheme.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1">
                    Aesthetic home header background applied. Selected login layout style: <span className="text-indigo-600 font-black">{GYM_LOGINS.find(l => l.id === selectedLogin)?.name}</span>.
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      onSelectCategory(selectedCategory!, {
                        selectedTheme: selectedTheme.id,
                        themeColor: selectedTheme.primaryColor,
                        headerBgImage: selectedBg,
                        selectedLoginLayout: selectedLogin
                      });
                    }}
                    className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer border-none flex items-center gap-1.5"
                  >
                    Use Theme & Generate Site ➔
                  </button>
                </div>
              </div>

              {/* Browser Preview Frame */}
              <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-xl max-w-4xl mx-auto">
                {/* Browser Title Bar */}
                <div className="bg-slate-100/80 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="bg-white/80 border border-slate-200 rounded-lg px-8 py-1 text-[10px] text-slate-400 font-mono tracking-tight select-none">
                    https://{selectedCategory?.toLowerCase().replace(/[^a-z0-9]+/g, '') || 'gym'}.zatbiz.com/preview
                  </div>
                  <div className="w-8" />
                </div>

                {/* Mock Website Canvas */}
                <div className="font-sans text-slate-800">
                  {/* Header */}
                  <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{selectedTheme.brandIcon || '💪'}</span>
                      <span className="font-black text-sm uppercase tracking-wider">{selectedTheme.name || 'Iron Forge'}</span>
                    </div>
                    <nav className="hidden sm:flex gap-6 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                      <span className="hover:text-slate-850 cursor-pointer">Classes</span>
                      <span className="hover:text-slate-850 cursor-pointer">Schedule</span>
                      <span className="hover:text-slate-850 cursor-pointer">Coaches</span>
                      <span className="hover:text-slate-850 cursor-pointer">Pricing</span>
                    </nav>
                    <button 
                      className="px-4 py-1.5 text-[10px] font-black rounded-lg border uppercase tracking-wider bg-transparent"
                      style={{ color: selectedTheme.primaryColor, borderColor: selectedTheme.primaryColor }}
                    >
                      Member Portal
                    </button>
                  </header>

                  {/* Hero Banner with Selected Real Fitness Image Background */}
                  <section 
                    className="text-white px-8 py-20 text-center space-y-6 relative overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.70), rgba(15, 23, 42, 0.85)), url(${selectedBg})` }}
                  >
                    <div className="absolute inset-0 opacity-5 bg-grid-pattern" />
                    <span 
                      className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest inline-block border border-white/20"
                    >
                      Premium Fitness Experience
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-serif max-w-2xl mx-auto leading-tight">
                      PUSH YOUR LIMITS WITH {selectedTheme.name.toUpperCase()}
                    </h1>
                    <p className="text-white/80 text-xs font-semibold max-w-lg mx-auto leading-relaxed">
                      {selectedTheme.tagline} Discover state of the art equipment, certified athletic coaches, and customized workout regimens.
                    </p>
                    <div className="flex justify-center gap-3 pt-2">
                      <button 
                        className="px-6 py-2.5 text-xs font-black rounded-xl shadow-lg border-none cursor-default"
                        style={{ backgroundColor: selectedTheme.primaryColor, color: '#ffffff' }}
                      >
                        Start Free Trial
                      </button>
                      <button 
                        className="px-6 py-2.5 text-xs font-black rounded-xl bg-white/10 border border-white/20 text-white cursor-default"
                      >
                        Explore Classes
                      </button>
                    </div>
                  </section>

                  {/* Highlight Cards Section */}
                  <section className="p-8 bg-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { icon: '🏋️‍♂️', title: 'Strength Training', desc: 'Isolate and compound lifts overseen by personal coaches.' },
                      { icon: '🚴‍♂️', title: 'Spin & Cardio HIIT', desc: 'Shatter calorie targets with intense indoor cycling sessions.' },
                      { icon: '🧘', title: 'Flexibility & Yoga', desc: 'Enhance mobility, stretch post-workout, and align core groups.' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-2 text-left shadow-sm">
                        <span className="text-3xl">{item.icon}</span>
                        <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                        <p className="text-[10px] text-slate-450 font-semibold leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-150 text-center text-[10px] text-slate-450 font-bold uppercase tracking-wider">
          {wizardStep === 'niche'
            ? 'Chosen gym subcategories initialize customized service guidelines and templates.'
            : `Step ${
                wizardStep === 'theme'
                  ? '2 of 5: Choose aesthetic layout styling'
                  : wizardStep === 'bg-image'
                  ? '3 of 5: Choose header background image'
                  : wizardStep === 'login-layout'
                  ? '4 of 5: Choose member login style'
                  : '5 of 5: Review layout configuration before generating'
              }`}
        </div>
      </div>
    </div>
  );
}
