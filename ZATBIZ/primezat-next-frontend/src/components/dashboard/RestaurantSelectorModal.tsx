'use client';

import React, { useState } from 'react';

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

// 10 Restaurant Themes
export const RESTAURANT_THEMES: ThemeOption[] = [
  { id: 'gold-luxury', name: 'Gourmet Gold', desc: 'Fine dining feel. Warm gold and rich champagne highlights.', color: '#c5a880', bgColor: 'bg-[#c5a880]', accentBg: 'bg-[#c5a880]/10', text: 'text-[#c5a880]' },
  { id: 'rose-vintage', name: 'Vintage Rose', desc: 'Cozy cafes and bakeries. Soft dusty rose pink accents.', color: '#ec4899', bgColor: 'bg-pink-500', accentBg: 'bg-pink-50', text: 'text-pink-700' },
  { id: 'emerald-mint', name: 'Emerald Mint', desc: 'Healthy & organic food. Clean, fresh mint green styling.', color: '#10b981', bgColor: 'bg-emerald-500', accentBg: 'bg-emerald-50', text: 'text-emerald-700' },
  { id: 'ruby-wine', name: 'Ruby Wine', desc: 'Romantic pizzerias and lounges. Deep crimson red accents.', color: '#e11d48', bgColor: 'bg-rose-600', accentBg: 'bg-rose-50', text: 'text-rose-700' },
  { id: 'amber-spiced', name: 'Amber Spiced', desc: 'Bustling bistros and grills. Vivid amber orange gradients.', color: '#d97706', bgColor: 'bg-amber-600', accentBg: 'bg-amber-50', text: 'text-amber-700' },
  { id: 'indigo-ocean', name: 'Indigo Ocean', desc: 'Seafood and modern fusion. Classic navy blue shades.', color: '#4f46e5', bgColor: 'bg-indigo-600', accentBg: 'bg-indigo-50', text: 'text-indigo-700' },
  { id: 'charcoal-slate', name: 'Charcoal Slate', desc: 'Sleek gastropubs. Minimalist dark slate grey and off-white.', color: '#475569', bgColor: 'bg-slate-650', accentBg: 'bg-slate-100', text: 'text-slate-800' },
  { id: 'tangerine-peel', name: 'Tangerine Sprout', desc: 'Bright fast food. Energetic warm tangerine and lime.', color: '#f97316', bgColor: 'bg-orange-500', accentBg: 'bg-orange-50', text: 'text-orange-700' },
  { id: 'forest-herbs', name: 'Forest Herbs', desc: 'Eco-conscious vegan cafes. Deep forest green branding.', color: '#047857', bgColor: 'bg-emerald-700', accentBg: 'bg-emerald-50', text: 'text-emerald-800' },
  { id: 'velvet-plum', name: 'Velvet Plum', desc: 'Sweets, ice-cream, and dessert shops. Premium dark plum.', color: '#7c3aed', bgColor: 'bg-violet-600', accentBg: 'bg-violet-50', text: 'text-violet-750' },
];

// 10 Homepage Layout Options
export const RESTAURANT_HOMEPAGES: LayoutOption[] = [
  { id: 'menu-grid-focus', name: 'Menu Grid Focus', desc: 'Highlights your dish items directly on the home banner.', previewIcon: '🍔' },
  { id: 'reservation-banner', name: 'Table Booking Center', desc: 'Sticky booking calendar in the hero block for instant reservations.', previewIcon: '📅' },
  { id: 'chef-specials', name: 'Chef Signature Slides', desc: 'Spotlights rotating signature recipes, wines, and chef interviews.', previewIcon: '👨‍🍳' },
  { id: 'category-circles', name: 'Visual Category Circles', desc: 'Renders circular cuisine selectors (Pizza, Cafe, Fast Food) on top.', previewIcon: '🍕' },
  { id: 'deal-hero', name: 'Coupon & Offers Focus', desc: 'Prominent banner showcasing current happy hours and combo packages.', previewIcon: '🏷️' },
  { id: 'blog-articles', name: 'Culinary Advisory Blog', desc: 'Highlight food recipe articles, team updates, and newsletter signups.', previewIcon: '📰' },
  { id: 'gallery-carousel', name: 'Dining Room Photo Stream', desc: 'Features a large visual grid of plates and dining room atmospheres.', previewIcon: '📸' },
  { id: 'sidebar-menu', name: 'Left Sidebar Categories', desc: 'Left categories scroll sidebar with right-side scrolling food items.', previewIcon: '🧱' },
  { id: 'reviews-showcase', name: 'Client Testimonials Focus', desc: 'Displays social proofs, ratings, and critic write-ups prominently.', previewIcon: '⭐' },
  { id: 'map-timings', name: 'Store Locator & Map', desc: 'Focuses on Google Maps coordinates, address, and live open status.', previewIcon: '📍' },
];

// 10 Login Layout Options
export const RESTAURANT_LOGINS: LayoutOption[] = [
  { id: 'left-illustration', name: 'Left Chef Illustration', desc: 'Gourmet Chef artwork on the left side, login inputs on the right.', previewIcon: '🎨' },
  { id: 'right-illustration', name: 'Right Buffet Vector', desc: 'Vibrant dining scene illustration on the right, form on the left.', previewIcon: '🖼' },
  { id: 'floating-dishes', name: 'Floating Culinary Glassmorphism', desc: 'Form card floating over floating vector food ingredients.', previewIcon: '🍅' },
  { id: 'minimal-logo', name: 'Minimal Emblem Card', desc: 'Simple centered login card with a clean restaurant crest on top.', previewIcon: '🍴' },
  { id: 'curved-wave', name: 'Curved Wave Divider', desc: 'Form separated from illustration with a curved wave design.', previewIcon: '🌊' },
  { id: 'neon-dark', name: 'Vibrant Neon Dark Mode', desc: 'Deep slate grey backdrop with neon orange and gold borders.', previewIcon: '🌙' },
  { id: 'double-banner', name: 'Laboratory Buffet Panels', desc: 'Centered login forms framed by gourmet vector illustrations.', previewIcon: '🍷' },
  { id: 'chef-overlay', name: 'Gourmet Chef Overlay', desc: 'Inputs floating over a background chef illustration.', previewIcon: '🍳' },
  { id: 'biological-grid', name: 'Dining Table Grid', desc: 'Inputs flanked by a structural pattern resembling restaurant seating.', previewIcon: '🪑' },
  { id: 'delivery-scooter', name: 'Scooter Delivery Stand', desc: 'Delivery rider illustration beside a giant mobile login screen.', previewIcon: '🛵' },
];

// 10 Dashboard Layout Options
export const RESTAURANT_DASHBOARDS: LayoutOption[] = [
  { id: 'metric-overview', name: 'Sales Metric Console', desc: 'Heavy on visual counters for sales totals, ticket entries, and reviews.', previewIcon: '📊' },
  { id: 'menu-catalog', name: 'Menu CRUD Catalog Manager', desc: 'Immediate view of catalog status and category selectors.', previewIcon: '📦' },
  { id: 'reservations-inbox', name: 'Table Reservation Log', desc: 'Highlights upcoming bookings and table assignment lists.', previewIcon: '📥' },
  { id: 'courier-tracking', name: 'Delivery Partners Dispatcher', desc: 'Focuses on driver status tracking and earnings summaries.', previewIcon: '🚚' },
  { id: 'points-wallet', name: 'Points & Wallet Balances', desc: 'User-side screen displaying active loyalty cash and credits.', previewIcon: '✨' },
  { id: 'simple-tables', name: 'Clean Table Logs', desc: 'Basic data tables omitting charts for fast, clean operations.', previewIcon: '📋' },
  { id: 'neon-dark-admin', name: 'Neon Admin Dark Mode', desc: 'Dark theme utilizing high-contrast gold and slate colors.', previewIcon: '🕶️' },
  { id: 'compact-sidebar', name: 'Compact Icon-Only Menu', desc: 'Collapsible navigation sidebar suited for kitchen tablets.', previewIcon: '📱' },
  { id: 'dispatch-tracker', name: 'Gps Dispatch Tracker', desc: 'Focuses on active order delivery maps and route planning.', previewIcon: '🗺️' },
  { id: 'telemetry-hub', name: 'Monthly Telemetry & Analytics', desc: 'Provides comparison graphs, profit margins, and food waste.', previewIcon: '📉' },
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
  const [step, setStep] = useState(1);

  // Business Information States
  const [restaurantName, setRestaurantName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [subcategory, setSubcategory] = useState('Fine Dining');
  const [description, setDescription] = useState('');

  // Styling Selections
  const [selectedTheme, setSelectedTheme] = useState('gold-luxury');
  const [selectedHomepageLayout, setSelectedHomepageLayout] = useState('menu-grid-focus');
  const [selectedLoginLayout, setSelectedLoginLayout] = useState('left-illustration');
  const [selectedDashboardLayout, setSelectedDashboardLayout] = useState('metric-overview');

  if (!isOpen) return null;

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    const configData = {
      restaurantName: restaurantName.trim() || 'Gourmet Kitchen',
      ownerName: ownerName.trim() || 'Head Chef',
      mobileNo: mobileNo.trim() || '+91 98765 43210',
      email: email.trim() || 'chef@gourmet.com',
      city: city.trim() || 'Noida',
      state: state.trim() || 'UP',
      country: 'India',
      pincode: pincode.trim() || '201301',
      subcategory,
      description: description.trim() || 'A premium dining experience.',
      themeColor: RESTAURANT_THEMES.find(t => t.id === selectedTheme)?.color || '#c5a880',
      selectedTheme,
      selectedHomepageLayout,
      selectedLoginLayout,
      selectedDashboardLayout
    };
    onSelectCategory('Restaurant', configData);
  };

  const getThemeColorClass = () => {
    return RESTAURANT_THEMES.find(t => t.id === selectedTheme) || RESTAURANT_THEMES[0];
  };

  const activeTheme = getThemeColorClass();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-950 border border-slate-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/80 backdrop-blur">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#c5a880]">Setup Wizard</span>
            <h2 className="text-xl font-bold text-white mt-1">Configure Restaurant Storefront</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-900 rounded-full text-slate-400 hover:text-white transition cursor-pointer bg-transparent border-none text-lg">✕</button>
        </div>

        {/* Step Progress bar */}
        <div className="px-8 py-3 bg-slate-900/30 flex justify-between items-center text-[10px] font-black uppercase text-slate-400 tracking-wider">
          {['Profile info', 'Branding Color', 'Homepage Layout', 'Login Layout', 'Dashboard Layout'].map((label, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum;
            const isActive = step === stepNum;
            return (
              <div key={idx} className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border transition ${
                  isDone ? 'bg-[#c5a880] border-[#c5a880] text-slate-950' :
                  isActive ? 'border-[#c5a880] text-[#c5a880] font-black' : 'border-slate-800 text-slate-500'
                }`}>{isDone ? '✓' : stepNum}</span>
                <span className={isActive ? 'text-white' : 'hidden sm:inline'}>{label}</span>
                {idx < 4 && <span className="text-slate-800 ml-2 hidden sm:inline">⟶</span>}
              </div>
            );
          })}
        </div>

        {/* Form Body Content */}
        <div className="flex-grow p-8 overflow-y-auto min-h-[400px]">
          
          {/* Step 1: Restaurant Info */}
          {step === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Restaurant Name *</label>
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={e => setRestaurantName(e.target.value)}
                    placeholder="Gourmet Kitchen"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Owner/Chef Name *</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="Chef Marcus"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Niche subcategory *</label>
                  <select
                    value={subcategory}
                    onChange={e => setSubcategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  >
                    {['Fine Dining', 'Fast Food', 'Pizza', 'Indian', 'Cafe', 'Bakery', 'Chinese', 'Vegan', 'General Restaurant'].map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Contact Mobile *</label>
                  <input
                    type="text"
                    value={mobileNo}
                    onChange={e => setMobileNo(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Business Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="chef@gourmet.com"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Pincode *</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                    placeholder="201301"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Noida"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder="UP"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Restaurant Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your kitchen dining experience, ambiance and specialization..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a880] rounded-xl px-4 py-2.5 text-xs text-white outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Theme Selector */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Big Screen Mockup */}
              <div className="md:col-span-2 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 flex flex-col justify-between min-h-[300px]">
                <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">Live Mockup Preview</span>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                    <span className="text-4xl">🍳</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-white">{restaurantName || 'Gourmet Kitchen'}</h3>
                  <div className="flex gap-2">
                    <span className={`px-4 py-1.5 ${activeTheme.bgColor} text-slate-950 text-[10px] font-black rounded-lg shadow-lg`}>Book Table</span>
                    <span className={`px-4 py-1.5 ${activeTheme.accentBg} ${activeTheme.text} text-[10px] font-black rounded-lg border border-slate-900`}>View Menu</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 text-center font-bold">
                  Active Brand Color Code: <span className="font-mono text-white">{activeTheme.color}</span>
                </div>
              </div>

              {/* Theme swatches list */}
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {RESTAURANT_THEMES.map((themeOpt) => (
                  <button
                    key={themeOpt.id}
                    onClick={() => setSelectedTheme(themeOpt.id)}
                    className={`w-full p-4 border rounded-2xl flex items-center gap-3 transition cursor-pointer text-left ${
                      selectedTheme === themeOpt.id ? 'border-[#c5a880] bg-[#c5a880]/5' : 'border-slate-900 bg-slate-900/20 hover:border-slate-800'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full ${themeOpt.bgColor} flex-shrink-0 border border-white/10`} />
                    <div>
                      <h4 className="text-xs font-bold text-white">{themeOpt.name}</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">{themeOpt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Homepage Layout Selector */}
          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {RESTAURANT_HOMEPAGES.map((layoutOpt) => (
                <button
                  key={layoutOpt.id}
                  onClick={() => setSelectedHomepageLayout(layoutOpt.id)}
                  className={`p-5 border rounded-2xl flex flex-col justify-between min-h-[120px] transition cursor-pointer text-left ${
                    selectedHomepageLayout === layoutOpt.id ? 'border-[#c5a880] bg-[#c5a880]/5' : 'border-slate-900 bg-slate-900/20 hover:border-slate-800'
                  }`}
                >
                  <span className="text-3xl">{layoutOpt.previewIcon}</span>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-white">{layoutOpt.name}</h4>
                    <p className="text-[9px] text-slate-500 mt-1 line-clamp-2">{layoutOpt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Login Layout Selector */}
          {step === 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {RESTAURANT_LOGINS.map((layoutOpt) => (
                <button
                  key={layoutOpt.id}
                  onClick={() => setSelectedLoginLayout(layoutOpt.id)}
                  className={`p-5 border rounded-2xl flex flex-col justify-between min-h-[120px] transition cursor-pointer text-left ${
                    selectedLoginLayout === layoutOpt.id ? 'border-[#c5a880] bg-[#c5a880]/5' : 'border-slate-900 bg-slate-900/20 hover:border-slate-800'
                  }`}
                >
                  <span className="text-3xl">{layoutOpt.previewIcon}</span>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-white">{layoutOpt.name}</h4>
                    <p className="text-[9px] text-slate-500 mt-1 line-clamp-2">{layoutOpt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 5: Dashboard Layout Selector */}
          {step === 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {RESTAURANT_DASHBOARDS.map((layoutOpt) => (
                <button
                  key={layoutOpt.id}
                  onClick={() => setSelectedDashboardLayout(layoutOpt.id)}
                  className={`p-5 border rounded-2xl flex flex-col justify-between min-h-[120px] transition cursor-pointer text-left ${
                    selectedDashboardLayout === layoutOpt.id ? 'border-[#c5a880] bg-[#c5a880]/5' : 'border-slate-900 bg-slate-900/20 hover:border-slate-800'
                  }`}
                >
                  <span className="text-3xl">{layoutOpt.previewIcon}</span>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-white">{layoutOpt.name}</h4>
                    <p className="text-[9px] text-slate-500 mt-1 line-clamp-2">{layoutOpt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-6 border-t border-slate-900 flex justify-between bg-slate-950/80 backdrop-blur">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition cursor-pointer border-none"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-[#c5a880] hover:bg-[#b0936b] text-slate-950 text-xs font-black rounded-xl shadow-lg transition cursor-pointer border-none"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-lg transition cursor-pointer border-none animate-bounce"
            >
              Generate Restaurant Workspace ✓
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
