'use client';

import React, { useState, useMemo } from 'react';

interface ThemeOption {
  id: string;
  name: string;
  desc: string;
  color: string;
  bgColor: string;
  accentBg: string;
  text: string;
  imageUrl?: string;
}

interface LayoutOption {
  id: string;
  name: string;
  desc: string;
  previewIcon: string;
  imageUrl: string;
}

// 20 Restaurant Themes
export const RESTAURANT_THEMES: ThemeOption[] = [
  { id: 'gold-luxury', name: 'Gourmet Gold', desc: 'Fine dining feel. Warm gold and rich champagne highlights.', color: '#c5a880', bgColor: 'bg-[#c5a880]', accentBg: 'bg-[#c5a880]/10', text: 'text-[#c5a880]', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80' },
  { id: 'rose-vintage', name: 'Vintage Rose', desc: 'Cozy cafes and bakeries. Soft dusty rose pink accents.', color: '#ec4899', bgColor: 'bg-pink-500', accentBg: 'bg-pink-50', text: 'text-pink-700', imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=80' },
  { id: 'emerald-mint', name: 'Emerald Mint', desc: 'Healthy & organic food. Clean, fresh mint green styling.', color: '#10b981', bgColor: 'bg-emerald-500', accentBg: 'bg-emerald-50', text: 'text-emerald-700', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80' },
  { id: 'ruby-wine', name: 'Ruby Wine', desc: 'Romantic pizzerias and lounges. Deep crimson red accents.', color: '#e11d48', bgColor: 'bg-rose-600', accentBg: 'bg-rose-50', text: 'text-rose-700', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop&q=80' },
  { id: 'amber-spiced', name: 'Amber Spiced', desc: 'Bustling bistros and grills. Vivid amber orange gradients.', color: '#d97706', bgColor: 'bg-amber-600', accentBg: 'bg-amber-50', text: 'text-amber-700', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80' },
  { id: 'indigo-ocean', name: 'Indigo Ocean', desc: 'Seafood and modern fusion. Classic navy blue shades.', color: '#4f46e5', bgColor: 'bg-indigo-600', accentBg: 'bg-indigo-50', text: 'text-indigo-700', imageUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&auto=format&fit=crop&q=80' },
  { id: 'charcoal-slate', name: 'Charcoal Slate', desc: 'Sleek gastropubs. Minimalist dark slate grey and off-white.', color: '#475569', bgColor: 'bg-slate-600', accentBg: 'bg-slate-100', text: 'text-slate-800', imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&auto=format&fit=crop&q=80' },
  { id: 'tangerine-peel', name: 'Tangerine Sprout', desc: 'Bright fast food. Energetic warm tangerine and lime.', color: '#f97316', bgColor: 'bg-orange-500', accentBg: 'bg-orange-50', text: 'text-orange-700', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80' },
  { id: 'forest-herbs', name: 'Forest Herbs', desc: 'Eco-conscious vegan cafes. Deep forest green branding.', color: '#047857', bgColor: 'bg-emerald-700', accentBg: 'bg-emerald-50', text: 'text-emerald-800', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80' },
  { id: 'velvet-plum', name: 'Velvet Plum', desc: 'Sweets, ice-cream, and dessert shops. Premium dark plum.', color: '#7c3aed', bgColor: 'bg-violet-600', accentBg: 'bg-violet-50', text: 'text-violet-750', imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop&q=80' },
  { id: 'terracotta-clay', name: 'Terracotta Bistro', desc: 'Earthy clays and brick. Great for wood-fired pizzerias.', color: '#c2410c', bgColor: 'bg-orange-700', accentBg: 'bg-orange-50', text: 'text-orange-800', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&auto=format&fit=crop&q=80' },
  { id: 'cyan-breeze', name: 'Cyan Breeze', desc: 'Coastal dining, juice bars, and modern sea grills.', color: '#06b6d4', bgColor: 'bg-cyan-500', accentBg: 'bg-cyan-50', text: 'text-cyan-750', imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&auto=format&fit=crop&q=80' },
  { id: 'sunset-gold', name: 'Sunset Grill', desc: 'High-energy steakhouse, grill and live smoke houses.', color: '#ea580c', bgColor: 'bg-orange-600', accentBg: 'bg-orange-50', text: 'text-orange-700', imageUrl: 'https://images.unsplash.com/photo-1555996273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80' },
  { id: 'matcha-zen', name: 'Matcha Zen', desc: 'Zen tea rooms, wellness cafes, and fresh sushi lounges.', color: '#84cc16', bgColor: 'bg-lime-500', accentBg: 'bg-lime-50', text: 'text-lime-750', imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80' },
  { id: 'chocolate-truffle', name: 'Cocoa Velvet', desc: 'Premium artisan chocolatier, bakeries and coffee spots.', color: '#451a03', bgColor: 'bg-amber-900', accentBg: 'bg-amber-50', text: 'text-amber-900', imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&auto=format&fit=crop&q=80' },
  { id: 'lavender-bliss', name: 'Lavender Pastry', desc: 'Whimsical high tea salons and boutique cupcake spaces.', color: '#a78bfa', bgColor: 'bg-violet-400', accentBg: 'bg-violet-50', text: 'text-violet-600', imageUrl: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?w=400&auto=format&fit=crop&q=80' },
  { id: 'crimson-blaze', name: 'Crimson Blaze', desc: 'Spicy Asian kitchens, hot-pots, and vibrant curries.', color: '#b91c1c', bgColor: 'bg-red-650', accentBg: 'bg-red-50', text: 'text-red-700', imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop&q=80' },
  { id: 'lemon-zest', name: 'Lemon Citron', desc: 'Crisp organic salads, breakfast spots, and citrus bars.', color: '#eab308', bgColor: 'bg-yellow-500', accentBg: 'bg-yellow-50', text: 'text-yellow-750', imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587caa90?w=400&auto=format&fit=crop&q=80' },
  { id: 'peach-blossom', name: 'Sweet Peach', desc: 'Brunch houses, waffle spots, and summer mocktail hubs.', color: '#fb923c', bgColor: 'bg-orange-400', accentBg: 'bg-orange-50', text: 'text-orange-705', imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&auto=format&fit=crop&q=80' },
  { id: 'royal-gold', name: 'Imperial Palace', desc: 'Upscale banquet dining and high-end oriental dining.', color: '#d97706', bgColor: 'bg-amber-500', accentBg: 'bg-amber-50', text: 'text-amber-705', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80' },
];

// 10 Homepage Layout Options
export const RESTAURANT_HOMEPAGES: LayoutOption[] = [
  { id: 'menu-grid-focus', name: 'Menu Grid Focus', desc: 'Highlights your dish items directly on the home banner.', previewIcon: '🍔', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80' },
  { id: 'reservation-banner', name: 'Table Booking Center', desc: 'Sticky booking calendar in the hero block for instant reservations.', previewIcon: '📅', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80' },
  { id: 'chef-specials', name: 'Chef Signature Slides', desc: 'Spotlights rotating signature recipes, wines, and chef interviews.', previewIcon: '👨‍🍳', imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=500&auto=format&fit=crop&q=80' },
  { id: 'category-circles', name: 'Visual Category Circles', desc: 'Renders circular cuisine selectors (Pizza, Cafe, Fast Food) on top.', previewIcon: '🍕', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80' },
  { id: 'deal-hero', name: 'Coupon & Offers Focus', desc: 'Prominent banner showcasing current happy hours and combo packages.', previewIcon: '🏷️', imageUrl: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=500&auto=format&fit=crop&q=80' },
  { id: 'blog-articles', name: 'Culinary Advisory Blog', desc: 'Highlight food recipe articles, team updates, and newsletter signups.', previewIcon: '📰', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80' },
  { id: 'gallery-carousel', name: 'Dining Room Photo Stream', desc: 'Features a large visual grid of plates and dining room atmospheres.', previewIcon: '📸', imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=80' },
  { id: 'sidebar-menu', name: 'Left Sidebar Categories', desc: 'Left categories scroll sidebar with right-side scrolling food items.', previewIcon: '🧱', imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=80' },
  { id: 'reviews-showcase', name: 'Client Testimonials Focus', desc: 'Displays social proofs, ratings, and critic write-ups prominently.', previewIcon: '⭐', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&auto=format&fit=crop&q=80' },
  { id: 'map-timings', name: 'Store Locator & Map', desc: 'Focuses on Google Maps coordinates, address, and live open status.', previewIcon: '📍', imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&auto=format&fit=crop&q=80' },
];

// 10 Login Layout Options
export const RESTAURANT_LOGINS: LayoutOption[] = [
  { id: 'left-illustration', name: 'Left Chef Illustration', desc: 'Gourmet Chef artwork on the left side, login inputs on the right.', previewIcon: '🎨', imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format&fit=crop&q=80' },
  { id: 'right-illustration', name: 'Right Buffet Vector', desc: 'Vibrant dining scene illustration on the right, form on the left.', previewIcon: '🖼', imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=80' },
  { id: 'floating-dishes', name: 'Floating Culinary Glassmorphism', desc: 'Form card floating over floating vector food ingredients.', previewIcon: '🍅', imageUrl: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=500&auto=format&fit=crop&q=80' },
  { id: 'minimal-logo', name: 'Minimal Emblem Card', desc: 'Simple centered login card with a clean restaurant crest on top.', previewIcon: '🍴', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=80' },
  { id: 'curved-wave', name: 'Curved Wave Divider', desc: 'Form separated from illustration with a curved wave design.', previewIcon: '🌊', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&auto=format&fit=crop&q=80' },
  { id: 'neon-dark', name: 'Vibrant Neon Dark Mode', desc: 'Deep slate grey backdrop with neon orange and gold borders.', previewIcon: '🌙', imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=80' },
  { id: 'double-banner', name: 'Laboratory Buffet Panels', desc: 'Centered login forms framed by gourmet vector illustrations.', previewIcon: '🍷', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80' },
  { id: 'chef-overlay', name: 'Gourmet Chef Overlay', desc: 'Inputs floating over a background chef illustration.', previewIcon: '🍳', imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=80' },
  { id: 'biological-grid', name: 'Dining Table Grid', desc: 'Inputs flanked by a structural pattern resembling restaurant seating.', previewIcon: '🪑', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80' },
  { id: 'delivery-scooter', name: 'Scooter Delivery Stand', desc: 'Delivery rider illustration beside a giant mobile login screen.', previewIcon: '🛵', imageUrl: 'https://images.unsplash.com/photo-1512152497639-6133999e9e40?w=500&auto=format&fit=crop&q=80' },
];

// 10 Dashboard Layout Options
export const RESTAURANT_DASHBOARDS: LayoutOption[] = [
  { id: 'metric-overview', name: 'Sales Metric Console', desc: 'Heavy on visual counters for sales totals, ticket entries, and reviews.', previewIcon: '📊', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80' },
  { id: 'menu-catalog', name: 'Menu CRUD Catalog Manager', desc: 'Immediate view of catalog status and category selectors.', previewIcon: '📦', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80' },
  { id: 'reservations-inbox', name: 'Table Reservation Log', desc: 'Highlights upcoming bookings and table assignment lists.', previewIcon: '📥', imageUrl: 'https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?w=500&auto=format&fit=crop&q=80' },
  { id: 'courier-tracking', name: 'Delivery Partners Dispatcher', desc: 'Focuses on driver status tracking and earnings summaries.', previewIcon: '🚚', imageUrl: 'https://images.unsplash.com/photo-1512152497639-6133999e9e40?w=500&auto=format&fit=crop&q=80' },
  { id: 'points-wallet', name: 'Points & Wallet Balances', desc: 'User-side screen displaying active loyalty cash and credits.', previewIcon: '✨', imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=80' },
  { id: 'simple-tables', name: 'Clean Table Logs', desc: 'Basic data tables omitting charts for fast, clean operations.', previewIcon: '📋', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=80' },
  { id: 'neon-dark-admin', name: 'Neon Admin Dark Mode', desc: 'Dark theme utilizing high-contrast gold and slate colors.', previewIcon: '🕶️', imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=80' },
  { id: 'compact-sidebar', name: 'Compact Icon-Only Menu', desc: 'Collapsible navigation sidebar suited for kitchen tablets.', previewIcon: '📱', imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=500&auto=format&fit=crop&q=80' },
  { id: 'dispatch-tracker', name: 'Gps Dispatch Tracker', desc: 'Focuses on active order delivery maps and route planning.', previewIcon: '🗺️', imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&auto=format&fit=crop&q=80' },
  { id: 'telemetry-hub', name: 'Monthly Telemetry & Analytics', desc: 'Provides comparison graphs, profit margins, and food waste.', previewIcon: '📉', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80' },
];

export interface RestaurantNiche {
  id: string;
  name: string;
  icon: string;
  img: string;
  desc: string;
}

export const RESTAURANT_NICHES: RestaurantNiche[] = [
  { id: 'Fine Dining', name: 'Fine Dining', icon: '⚜️', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80', desc: 'Gourmet plates & premium wine pairings' },
  { id: 'Fast Food', name: 'Fast Food', icon: '🍔', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80', desc: 'Flame-grilled burgers & crispy fries' },
  { id: 'Pizza', name: 'Pizza & Pasta', icon: '🍕', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80', desc: 'Wood-fired Neapolitan pizzas & pasta' },
  { id: 'Indian', name: 'Indian Cuisine', icon: '🍲', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop&q=80', desc: 'Aromatic biryanis & rich curries' },
  { id: 'Cafe', name: 'Cafe & Roastery', icon: '☕', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=80', desc: 'Specialty coffee, pastries & brunch' },
  { id: 'Sushi', name: 'Sushi & Japanese', icon: '🍣', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop&q=80', desc: 'Master-crafted rolls & ramen bowls' },
  { id: 'Chinese', name: 'Chinese Cuisine', icon: '🥡', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80', desc: 'Wok-fired noodles, dim sum & duck' },
  { id: 'Mexican', name: 'Mexican Taco Shop', icon: '🌮', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80', desc: 'Fresh street tacos, burritos & salsa' },
  { id: 'Steakhouse', name: 'Steakhouse & Grill', icon: '🥩', img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&auto=format&fit=crop&q=80', desc: 'Prime dry-aged steaks & smoked ribs' },
  { id: 'Seafood', name: 'Seafood Grill', icon: '🦞', img: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&auto=format&fit=crop&q=80', desc: 'Fresh catches & lobster rolls' },
  { id: 'Bakery', name: 'Bakery & Dessert', icon: '🍰', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&auto=format&fit=crop&q=80', desc: 'Artisanal cakes, macarons & sweets' },
  { id: 'Healthy', name: 'Healthy & Vegan', icon: '🥗', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80', desc: 'Organic salads & fresh vegan bowls' },
  { id: 'Bar', name: 'Bar & Gastropub', icon: '🍺', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&auto=format&fit=crop&q=80', desc: 'Craft draft beers & gourmet pub food' },
  { id: 'Middle Eastern', name: 'Middle Eastern', icon: '🥙', img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&auto=format&fit=crop&q=80', desc: 'Hummus, falafel & grilled kebabs' },
  { id: 'Korean BBQ', name: 'Korean BBQ & Hotpot', icon: '🥢', img: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=400&auto=format&fit=crop&q=80', desc: 'Tabletop grill meats & hotpots' },
  { id: 'Thai', name: 'Thai & Noodle Bar', icon: '🍜', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80', desc: 'Spicy pad thai & tom yum bowls' },
  { id: 'Mediterranean', name: 'Mediterranean', icon: '🫓', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80', desc: 'Olive oil grills & fresh Greek salads' },
  { id: 'Ice Cream', name: 'Ice Cream & Gelato', icon: '🍦', img: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?w=400&auto=format&fit=crop&q=80', desc: 'Hand-churned gelato & waffle cones' },
  { id: 'Juice Bar', name: 'Juice & Smoothies', icon: '🥤', img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&auto=format&fit=crop&q=80', desc: 'Cold-pressed juices & acai bowls' },
  { id: 'French Bistro', name: 'French Bistro', icon: '🥖', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&auto=format&fit=crop&q=80', desc: 'Classic baguettes, escargot & wine' }
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
  const [searchQuery, setSearchQuery] = useState('');

  // Branding States (Step 8)
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#c5a880');
  const [secondaryColor, setSecondaryColor] = useState('#1e293b');
  const [font, setFont] = useState('Inter');

  // Business Info Additional (Step 9)
  const [whatsappNo, setWhatsappNo] = useState('');
  const [address, setAddress] = useState('');
  const [openingHours, setOpeningHours] = useState('9:00 AM - 11:00 PM');
  const [gstNumber, setGstNumber] = useState('');
  
  // Social Links (Step 9)
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');

  const filteredNiches = useMemo(() => {
    return RESTAURANT_NICHES.filter(niche =>
      niche.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      niche.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Styling Selections
  const [selectedTheme, setSelectedTheme] = useState('gold-luxury');
  const [selectedHomepageLayout, setSelectedHomepageLayout] = useState('menu-grid-focus');
  const [selectedLoginLayout, setSelectedLoginLayout] = useState('left-illustration');
  const [selectedDashboardLayout, setSelectedDashboardLayout] = useState('metric-overview');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    const socialLinks = {
      instagram: instagramUrl.trim(),
      facebook: facebookUrl.trim(),
      twitter: twitterUrl.trim()
    };
    
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
      themeColor: primaryColor || '#c5a880',
      selectedTheme,
      selectedHomepageLayout,
      selectedLoginLayout,
      selectedDashboardLayout,
      logoUrl: logoUrl.trim() || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100',
      bannerUrl: bannerUrl.trim() || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      faviconUrl: faviconUrl.trim() || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=32',
      primaryColor,
      secondaryColor,
      font,
      whatsappNo: whatsappNo.trim() || mobileNo.trim() || '+91 98765 43210',
      address: address.trim() || 'Sector 62, Noida, UP',
      openingHours: openingHours.trim() || '9:00 AM - 11:00 PM',
      gstNumber: gstNumber.trim() || '09AAAAA1111A1Z1',
      socialLinksJson: JSON.stringify(socialLinks)
    };
    onSelectCategory('Restaurant', configData);
  };

  const getThemeColorClass = () => {
    return RESTAURANT_THEMES.find(t => t.id === selectedTheme) || RESTAURANT_THEMES[0];
  };

  const activeTheme = getThemeColorClass();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-white overflow-hidden animate-in fade-in duration-200">
      <div className="w-full h-full flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-900 flex justify-between items-center bg-slate-50/85 dark:bg-slate-950/80 backdrop-blur">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-[#c5a880]">Setup Wizard</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Configure Restaurant Storefront</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer bg-transparent border-none text-lg">✕</button>
        </div>

        {/* Step Progress bar */}
        <div className="px-8 py-3 bg-slate-100/50 dark:bg-slate-900/30 flex justify-between items-center text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
          {['Select Niche', 'Homepage Design', 'Login Page', 'Dashboard Design', 'Branding', 'Business Info'].map((label, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum;
            const isActive = step === stepNum;
            return (
              <div key={idx} className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border transition ${
                  isDone ? 'bg-indigo-650 border-indigo-650 text-white dark:bg-[#c5a880] dark:border-[#c5a880] dark:text-slate-950' :
                  isActive ? 'border-indigo-650 text-indigo-650 dark:border-[#c5a880] dark:text-[#c5a880] font-black' : 'border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-500'
                }`}>{isDone ? '✓' : stepNum}</span>
                <span className={isActive ? 'text-indigo-650 dark:text-white font-black' : 'hidden sm:inline'}>{label}</span>
                {idx < 5 && <span className="text-slate-300 dark:text-slate-800 ml-2 hidden sm:inline">⟶</span>}
              </div>
            );
          })}
        </div>

        {/* Form Body Content */}
        <div className="flex-grow p-8 overflow-y-auto min-h-0 scrollbar-thin">
          
          {/* Step 1: Select Restaurant Niche */}
          {step === 1 && (
            <div className="space-y-6 max-w-4xl mx-auto text-left">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Select Restaurant Niche</h3>
                    <p className="text-[11px] text-slate-500 mt-1">Choose a specialized menu style or category template to initialize your workspace.</p>
                  </div>
                  
                  {/* Niche Search bar */}
                  <div className="relative w-full sm:w-64">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search restaurant niche..."
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-650 rounded-xl pl-8 pr-7 py-1.5 text-xs outline-none text-slate-800 transition placeholder-slate-400 dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:focus:bg-slate-950"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-transparent border-none cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
                  {filteredNiches.map((cat) => {
                    const isSelected = subcategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSubcategory(cat.id);
                          handleNext();
                        }}                        className={`flex flex-col bg-slate-50 dark:bg-slate-900 border text-left overflow-hidden rounded-2xl group transition duration-300 ${
                          isSelected ? 'border-indigo-650 ring-1 ring-indigo-650 dark:border-[#c5a880] dark:ring-[#c5a880]' : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="h-24 w-full overflow-hidden relative">
                          <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          <span className="absolute top-2 right-2 w-6 h-6 bg-slate-950/80 backdrop-blur rounded-full flex items-center justify-center text-xs">{cat.icon}</span>
                        </div>
                        <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                          <h4 className="text-slate-900 dark:text-white font-extrabold text-[10px] uppercase truncate">{cat.name}</h4>
                          <p className="text-slate-500 dark:text-slate-400 text-[8px] leading-normal font-semibold line-clamp-2">{cat.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                  {filteredNiches.length === 0 && (
                    <div className="col-span-full py-8 text-center text-xs text-slate-400">
                      No matching niches found. Try searching something else!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Homepage Layout Selector */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Select Homepage Design</h3>
                <p className="text-[11px] text-slate-500 mt-1">Choose from our 10 professional layouts (Luxury, Modern, Classic, Minimal, Dark, and more).</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
                {RESTAURANT_HOMEPAGES.map((layoutOpt) => (
                  <button
                    key={layoutOpt.id}
                    type="button"
                    onClick={() => {
                      setSelectedHomepageLayout(layoutOpt.id);
                      handleNext();
                    }}
                    className={`p-4 border rounded-2xl flex flex-col justify-between transition cursor-pointer text-left ${
                      selectedHomepageLayout === layoutOpt.id ? 'border-indigo-650 bg-indigo-50/10 dark:border-[#c5a880] dark:bg-[#c5a880]/5 shadow-sm' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/20 hover:border-slate-300 dark:hover:border-slate-750'
                    }`}
                  >
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-slate-850 bg-slate-100 dark:bg-slate-950">
                      <img 
                        src={layoutOpt.imageUrl} 
                        alt={layoutOpt.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center text-xs select-none">
                        {layoutOpt.previewIcon}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">{layoutOpt.name}</h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{layoutOpt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Login Layout Selector */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Select Login Page</h3>
                <p className="text-[11px] text-slate-500 mt-1">Choose from our 10 client / administrator portal login page styles.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
                {RESTAURANT_LOGINS.map((layoutOpt) => (
                  <button
                    key={layoutOpt.id}
                    type="button"
                    onClick={() => {
                      setSelectedLoginLayout(layoutOpt.id);
                      handleNext();
                    }}
                    className={`p-4 border rounded-2xl flex flex-col justify-between transition cursor-pointer text-left ${
                      selectedLoginLayout === layoutOpt.id ? 'border-indigo-650 bg-indigo-50/10 dark:border-[#c5a880] dark:bg-[#c5a880]/5 shadow-sm' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/20 hover:border-slate-300 dark:hover:border-slate-750'
                    }`}
                  >
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-slate-850 bg-slate-100 dark:bg-slate-950">
                      <img 
                        src={layoutOpt.imageUrl} 
                        alt={layoutOpt.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center text-xs select-none">
                        {layoutOpt.previewIcon}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">{layoutOpt.name}</h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{layoutOpt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Dashboard Layout Selector */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Select Dashboard Design</h3>
                <p className="text-[11px] text-slate-500 mt-1">Choose from our 10 professional administration/kitchen panel dashboards.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
                {RESTAURANT_DASHBOARDS.map((layoutOpt) => (
                  <button
                    key={layoutOpt.id}
                    type="button"
                    onClick={() => {
                      setSelectedDashboardLayout(layoutOpt.id);
                      handleNext();
                    }}
                    className={`p-4 border rounded-2xl flex flex-col justify-between transition cursor-pointer text-left ${
                      selectedDashboardLayout === layoutOpt.id ? 'border-indigo-650 bg-indigo-50/10 dark:border-[#c5a880] dark:bg-[#c5a880]/5 shadow-sm' : 'border-slate-200 bg-slate-850 dark:border-slate-900 dark:bg-slate-900/20 hover:border-slate-350 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-slate-850 bg-slate-100 dark:bg-slate-950">
                      <img 
                        src={layoutOpt.imageUrl} 
                        alt={layoutOpt.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center text-xs select-none">
                        {layoutOpt.previewIcon}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">{layoutOpt.name}</h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{layoutOpt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Branding Settings */}
          {step === 5 && (
            <div className="space-y-6 max-w-2xl mx-auto text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Branding Settings</h3>
                <p className="text-[11px] text-slate-500 mt-1">Configure your logos, banners, primary colors, and website typography.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Logo Uploader */}
                <div className="space-y-2 border border-slate-150 dark:border-slate-850 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/10 text-left">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Restaurant Logo</label>
                    {logoUrl && <span className="text-[9px] text-emerald-600 font-bold">✓ Uploaded</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-white dark:bg-slate-900 overflow-hidden flex-shrink-0">
                      {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" /> : <span className="text-xl">🍳</span>}
                    </div>
                    <div className="flex-grow min-w-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileChange(e, setLogoUrl)}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-slate-800 dark:file:text-[#c5a880] cursor-pointer"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={e => setLogoUrl(e.target.value)}
                    placeholder="Or paste Logo URL..."
                    className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-650 rounded-xl px-3 py-1.5 text-[10px] text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white"
                  />
                </div>

                {/* Banner Uploader */}
                <div className="space-y-2 border border-slate-150 dark:border-slate-850 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/10 text-left">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Restaurant Banner</label>
                    {bannerUrl && <span className="text-[9px] text-emerald-600 font-bold">✓ Uploaded</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-white dark:bg-slate-900 overflow-hidden flex-shrink-0">
                      {bannerUrl ? <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" /> : <span className="text-xl">🌅</span>}
                    </div>
                    <div className="flex-grow min-w-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileChange(e, setBannerUrl)}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-slate-800 dark:file:text-[#c5a880] cursor-pointer"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    value={bannerUrl}
                    onChange={e => setBannerUrl(e.target.value)}
                    placeholder="Or paste Banner URL..."
                    className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-650 rounded-xl px-3 py-1.5 text-[10px] text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white"
                  />
                </div>

                {/* Favicon Uploader */}
                <div className="space-y-2 border border-slate-150 dark:border-slate-850 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/10 text-left">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Favicon</label>
                    {faviconUrl && <span className="text-[9px] text-emerald-600 font-bold">✓ Uploaded</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-white dark:bg-slate-900 overflow-hidden flex-shrink-0">
                      {faviconUrl ? <img src={faviconUrl} alt="Favicon" className="w-full h-full object-cover" /> : <span className="text-xl">✨</span>}
                    </div>
                    <div className="flex-grow min-w-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileChange(e, setFaviconUrl)}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-slate-800 dark:file:text-[#c5a880] cursor-pointer"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    value={faviconUrl}
                    onChange={e => setFaviconUrl(e.target.value)}
                    placeholder="Or paste Favicon URL..."
                    className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-650 rounded-xl px-3 py-1.5 text-[10px] text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Typography Font Family</label>
                  <select
                    value={font}
                    onChange={e => setFont(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white"
                  >
                    {['Inter', 'Roboto', 'Playfair Display', 'Montserrat', 'Merriweather', 'Outfit'].map(fName => (
                      <option key={fName} value={fName}>{fName}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Primary Color Preset</label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                    />
                    <span className="text-xs font-mono font-bold text-slate-650 dark:text-slate-300">{primaryColor}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Secondary Color Preset</label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={e => setSecondaryColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                    />
                    <span className="text-xs font-mono font-bold text-slate-650 dark:text-slate-300">{secondaryColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Restaurant Business Information */}
          {step === 6 && (
            <div className="space-y-6 max-w-2xl mx-auto text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Restaurant Business Information</h3>
                <p className="text-[11px] text-slate-500 mt-1">Provide contact details, operating hours, and registration information for your storefront.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Restaurant Name *</label>
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={e => setRestaurantName(e.target.value)}
                    placeholder="Gourourmet Kitchen"
                    className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Owner/Chef Name *</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="Chef Marcus"
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Contact Mobile *</label>
                  <input
                    type="text"
                    value={mobileNo}
                    onChange={e => setMobileNo(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">WhatsApp Number</label>
                  <input
                    type="text"
                    value={whatsappNo}
                    onChange={e => setWhatsappNo(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Business Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="chef@gourmet.com"
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Opening Hours</label>
                  <input
                    type="text"
                    value={openingHours}
                    onChange={e => setOpeningHours(e.target.value)}
                    placeholder="9:00 AM - 11:00 PM"
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">GST Number</label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={e => setGstNumber(e.target.value)}
                    placeholder="09AAAAA1111A1Z1"
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Pincode *</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                    placeholder="201301"
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Noida"
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder="UP"
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Storefront Address</label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Sector 62, Noida, Uttar Pradesh"
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-250 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none resize-none dark:bg-slate-900 dark:border-slate-800 dark:focus:border-[#c5a880] dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2 border-t border-slate-100 dark:border-slate-900 pt-3 mt-1">
                  <label className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase">Social Media Profiles</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1.5">
                    <input
                      type="text"
                      value={instagramUrl}
                      onChange={e => setInstagramUrl(e.target.value)}
                      placeholder="Instagram URL"
                      className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-650 rounded-xl px-3 py-2 text-[11px] text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                    />
                    <input
                      type="text"
                      value={facebookUrl}
                      onChange={e => setFacebookUrl(e.target.value)}
                      placeholder="Facebook URL"
                      className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-650 rounded-xl px-3 py-2 text-[11px] text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                    />
                    <input
                      type="text"
                      value={twitterUrl}
                      onChange={e => setTwitterUrl(e.target.value)}
                      placeholder="Twitter URL"
                      className="w-full bg-slate-50 border border-slate-205 focus:border-indigo-650 rounded-xl px-3 py-2 text-[11px] text-slate-900 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-900 flex justify-between bg-slate-50/85 dark:bg-slate-950/80 backdrop-blur">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-white text-xs font-bold rounded-xl transition cursor-pointer border-none"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white dark:bg-[#c5a880] dark:hover:bg-[#b0936b] dark:text-slate-950 text-xs font-black rounded-xl shadow-lg transition cursor-pointer border-none"
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
