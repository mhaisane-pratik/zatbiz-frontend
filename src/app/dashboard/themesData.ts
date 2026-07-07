'use client';

export interface ThemeDef {
  id: string;
  name: string;
  industry: string;
  desc: string;
  icon: string;
  brandIcon: string;
  tagline: string;
  primaryColor: string; // hex
  secondaryColor: string;
  bgColor: string;
  textColor: string;
  accentBg: string;
  gradient: string;
  bgGradClass: string;
  textColorClass: string;
  primaryBtnClass: string;
  sidebarBgClass: string;
  heroImageUrl: string;
  bannerImageUrl: string;
  products: {
    name: string;
    description: string;
    price: number;
    category: string;
    icon: string;
    imageUrl: string;
  }[];
}

export const THEMES_30: ThemeDef[] = [
  // 1. Fashion & Apparel
  {
    id: 'fashion-boutique',
    name: 'Zenith Boutique',
    industry: 'Fashion',
    desc: 'Minimalist high-fashion catalog featuring elegant layouts, refined editorial typography, and full-screen image cards.',
    icon: '🧥',
    brandIcon: '✨',
    tagline: 'Refining modern style with curated apparel.',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ec4899',
    bgColor: '#fafafa',
    textColor: '#18181b',
    accentBg: '#f5f3ff',
    gradient: 'from-purple-500 to-pink-500',
    bgGradClass: 'from-zinc-900 via-purple-950 to-zinc-955',
    textColorClass: 'text-purple-650',
    primaryBtnClass: 'bg-purple-600 hover:bg-purple-755 text-white',
    sidebarBgClass: 'bg-purple-950 text-purple-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80',
    products: [
      { name: 'Oversized Denim Jacket', description: 'Premium heavy washed cotton denim jacket with utility chest pockets.', price: 2499, category: 'Outwear', icon: '🧥', imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500' },
      { name: 'Ribbed Knit Midi Dress', description: 'Slim fit stretchy knit fabric dress with an elegant side slit detail.', price: 1899, category: 'Dresses', icon: '👗', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500' },
      { name: 'Minimalist Leather Sneakers', description: 'Full grain leather sneakers with vulcanized rubber soles and padded collar.', price: 3499, category: 'Footwear', icon: '👟', imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500' }
    ]
  },
  {
    id: 'streetwear-urban',
    name: 'Urban Grind',
    industry: 'Fashion',
    desc: 'Edgy streetwear layout designed for drop culture, bold text, neon buttons, and high contrast dark modes.',
    icon: '👟',
    brandIcon: '⚡',
    tagline: 'Concrete jungle aesthetics for the bold.',
    primaryColor: '#f43f5e',
    secondaryColor: '#f59e0b',
    bgColor: '#09090b',
    textColor: '#f4f4f5',
    accentBg: '#27272a',
    gradient: 'from-rose-500 to-amber-500',
    bgGradClass: 'from-rose-955 via-zinc-900 to-black',
    textColorClass: 'text-rose-500',
    primaryBtnClass: 'bg-rose-605 hover:bg-rose-700 text-white',
    sidebarBgClass: 'bg-zinc-905 text-zinc-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1000',
    products: [
      { name: 'Grind Heavyweight Hoodie', description: '450GSM loopback cotton hoodie with signature screen print logo.', price: 2999, category: 'Hoodies', icon: '👕', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' },
      { name: 'Cargo Parachute Pants', description: 'Relaxed fit nylon parachute pants with elastic adjustable cuffs.', price: 2299, category: 'Pants', icon: '👖', imageUrl: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=500' },
      { name: 'Graphic Drop Tee', description: 'Garment dyed vintage wash graphic tee with boxy casual fit.', price: 1299, category: 'Tees', icon: '👕', imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500' }
    ]
  },
  {
    id: 'activewear-fit',
    name: 'Pulse Athletic',
    industry: 'Fashion',
    desc: 'Clean, athletic apparel storefront with performance grids, bold brand headers, and swift checkout controls.',
    icon: '🏃',
    brandIcon: '💪',
    tagline: 'Performance apparel engineered for movement.',
    primaryColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    bgColor: '#f8fafc',
    textColor: '#0f172a',
    accentBg: '#ecfeff',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradClass: 'from-cyan-955 via-slate-900 to-slate-955',
    textColorClass: 'text-cyan-600',
    primaryBtnClass: 'bg-cyan-605 hover:bg-cyan-700 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000',
    products: [
      { name: 'DryFit Compression Tee', description: 'Sweat-wicking lightweight stretch fabric built for heavy gym workouts.', price: 1199, category: 'Tees', icon: '👕', imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500' },
      { name: 'AeroShell Running Shorts', description: 'Breathable running shorts with integrated liner and reflective trims.', price: 999, category: 'Shorts', icon: '🩳', imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500' },
      { name: 'FlexHold Grip Leggings', description: 'High-waisted squat-proof leggings with flatlock seams and phone pockets.', price: 1599, category: 'Leggings', icon: '👖', imageUrl: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500' }
    ]
  },
  {
    id: 'jewelry-luxury',
    name: 'Aura Fine Jewelry',
    industry: 'Fashion',
    desc: 'Champagne gold accents, serif typography, and luxury item grids built for premium jewelry boutiques.',
    icon: '💍',
    brandIcon: '👑',
    tagline: 'Timeless elegance handcrafted in precious metals.',
    primaryColor: '#b45309',
    secondaryColor: '#10b981',
    bgColor: '#fffbeb',
    textColor: '#451a03',
    accentBg: '#fef3c7',
    gradient: 'from-amber-500 to-yellow-600',
    bgGradClass: 'from-amber-955 via-stone-900 to-stone-955',
    textColorClass: 'text-amber-705',
    primaryBtnClass: 'bg-amber-700 hover:bg-amber-800 text-white',
    sidebarBgClass: 'bg-stone-900 text-stone-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000',
    products: [
      { name: '18k Solitaire Diamond Ring', description: 'GIA certified 1-carat round brilliant cut diamond on solid gold band.', price: 74999, category: 'Rings', icon: '💍', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500' },
      { name: 'Aura Chain Necklace', description: 'Handcrafted solid gold cuban link necklace with heavy lock clasp.', price: 42999, category: 'Necklaces', icon: '📿', imageUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500' },
      { name: 'Pearl Drop Earrings', description: 'Natural freshwater white pearls suspended from sleek 14k gold hoops.', price: 18999, category: 'Earrings', icon: '💎', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' }
    ]
  },

  // 2. Electronics & Tech
  {
    id: 'tech-gadgets',
    name: 'Volt Cyber Store',
    industry: 'Electronics',
    desc: 'Dark theme layout with neon cyan borders, technical spec grids, and inventory trackers for peripheral stores.',
    icon: '💻',
    brandIcon: '🔌',
    tagline: 'Next-gen peripherals and computing gear.',
    primaryColor: '#14b8a6',
    secondaryColor: '#06b6d4',
    bgColor: '#020617',
    textColor: '#f8fafc',
    accentBg: '#0f172a',
    gradient: 'from-teal-400 to-cyan-500',
    bgGradClass: 'from-teal-955 via-slate-900 to-slate-955',
    textColorClass: 'text-teal-450',
    primaryBtnClass: 'bg-teal-500 hover:bg-teal-650 text-slate-950 font-black',
    sidebarBgClass: 'bg-slate-955 text-slate-205 border-r border-slate-800',
    heroImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000',
    products: [
      { name: 'Volt Mechanical Keyboard', description: '65% form factor hot-swappable keyboard with linear yellow switches.', price: 5499, category: 'Peripherals', icon: '⌨️', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500' },
      { name: 'CyberTrack Wireless Mouse', description: 'Superlight 54g gaming mouse with 26K DPI optical sensor.', price: 4500, category: 'Peripherals', icon: '🖱️', imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500' },
      { name: 'ANC Pro Audio Headset', description: 'Wireless headphones with active noise cancellation and spatial sound.', price: 8999, category: 'Audio', icon: '🎧', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' }
    ]
  },
  {
    id: 'smarthome-iot',
    name: 'Smart IQ Home',
    industry: 'Electronics',
    desc: 'Sleek eco-green aesthetic, user-friendly control indicators, and smart device specification sheets.',
    icon: '🏠',
    brandIcon: '💡',
    tagline: 'Automate your environment intelligently.',
    primaryColor: '#10b981',
    secondaryColor: '#3b82f6',
    bgColor: '#fafafa',
    textColor: '#1f2937',
    accentBg: '#ecfdf5',
    gradient: 'from-emerald-505 to-blue-500',
    bgGradClass: 'from-emerald-955 via-zinc-900 to-slate-955',
    textColorClass: 'text-emerald-600',
    primaryBtnClass: 'bg-emerald-605 hover:bg-emerald-700 text-white',
    sidebarBgClass: 'bg-zinc-900 text-zinc-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000',
    products: [
      { name: 'Hub IQ Central Screen', description: '8-inch smart display to monitor and control lighting, locks, and cameras.', price: 8999, category: 'Hubs', icon: '📱', imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=500' },
      { name: 'Smart RGB Bulb Pack', description: 'Wi-Fi enabled smart LED bulbs with 16 million colors and voice sync.', price: 1499, category: 'Lighting', icon: '💡', imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=500' },
      { name: 'IQ Wi-Fi Security Camera', description: '1080p indoor security camera with motion detection and two-way talk.', price: 2999, category: 'Security', icon: '📹', imageUrl: 'https://images.unsplash.com/photo-1557324260-b491766a9afc?w=500' }
    ]
  },
  {
    id: 'audio-pro',
    name: 'Soundwave Acoustics',
    industry: 'Electronics',
    desc: 'Dark orange accent and clean sound bars showcase design, tailored for headphones, speakers, and studio gear.',
    icon: '🎧',
    brandIcon: '🔊',
    tagline: 'True-to-life studio sound engineering.',
    primaryColor: '#f97316',
    secondaryColor: '#e11d48',
    bgColor: '#0c0a09',
    textColor: '#fafaf9',
    accentBg: '#1c1917',
    gradient: 'from-orange-500 to-rose-600',
    bgGradClass: 'from-orange-955 via-stone-900 to-stone-955',
    textColorClass: 'text-orange-505',
    primaryBtnClass: 'bg-orange-600 hover:bg-orange-700 text-white',
    sidebarBgClass: 'bg-stone-900 text-stone-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000',
    products: [
      { name: 'Wave Studio Monitors (Pair)', description: 'Bi-amplified studio monitor speakers with 5-inch Kevlar woofers.', price: 21999, category: 'Speakers', icon: '🔊', imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500' },
      { name: 'Soundwave USB Condenser Mic', description: 'Cardioid studio condenser microphone with tap-to-mute and gain control.', price: 6999, category: 'Microphones', icon: '🎙️', imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500' },
      { name: 'Wireless ANC Earbuds', description: 'Hi-Fi bluetooth earbuds with adaptive sound control and 24h battery.', price: 4999, category: 'Audio', icon: '🎧', imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500' }
    ]
  },

  // 3. Grocery & Food
  {
    id: 'grocery-organic',
    name: 'Verde Organic',
    industry: 'Grocery',
    desc: 'Emerald green color blocks, clean list filters, and organic certifications badge layouts for fresh grocers.',
    icon: '🥦',
    brandIcon: '🌱',
    tagline: '100% certified organic groceries to your door.',
    primaryColor: '#16a34a',
    secondaryColor: '#eab308',
    bgColor: '#f0fdf4',
    textColor: '#14532d',
    accentBg: '#dcfce7',
    gradient: 'from-green-500 to-yellow-500',
    bgGradClass: 'from-green-955 via-teal-955 to-slate-955',
    textColorClass: 'text-green-705',
    primaryBtnClass: 'bg-green-605 hover:bg-green-750 text-white',
    sidebarBgClass: 'bg-green-955 text-green-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1000',
    products: [
      { name: 'Organic Fresh Gala Apples (1kg)', description: 'Crisp and sweet organic apples harvested from sustainable orchards.', price: 280, category: 'Fruits', icon: '🍎', imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500' },
      { name: 'Hydroponic Leaf Lettuce', description: 'Fresh, soil-free grown premium lettuce head, crisp and nutrient dense.', price: 95, category: 'Vegetables', icon: '🥬', imageUrl: 'https://images.unsplash.com/photo-1556781366-336f83530004?w=500' },
      { name: 'Extra Virgin Cold Pressed Oil', description: 'Unrefined cold-pressed organic olives from family-owned estates.', price: 850, category: 'Pantry', icon: '🫙', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500' }
    ]
  },
  {
    id: 'bakery-bake',
    name: 'Crumb & Crust',
    industry: 'Grocery',
    desc: 'Soft pastel pink & warm wheat shades showcase artisan sourdough loaves, cupcakes, and bakery menus.',
    icon: '🍞',
    brandIcon: '🍰',
    tagline: 'Sourdough, pastries, and cakes baked fresh daily.',
    primaryColor: '#d97706',
    secondaryColor: '#f43f5e',
    bgColor: '#fffbeb',
    textColor: '#78350f',
    accentBg: '#fef3c7',
    gradient: 'from-amber-500 to-rose-400',
    bgGradClass: 'from-amber-955 via-amber-900 to-stone-955',
    textColorClass: 'text-amber-700',
    primaryBtnClass: 'bg-amber-605 hover:bg-amber-700 text-white',
    sidebarBgClass: 'bg-amber-955 text-amber-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=1000',
    products: [
      { name: 'Artisan Country Sourdough', description: 'Slow fermented flour, water, and salt loaf with a thick crunchy crust.', price: 180, category: 'Bread', icon: '🍞', imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500' },
      { name: 'Flaky Butter Croissants (Pack of 4)', description: 'French-style laminated butter pastry baked to golden perfection.', price: 240, category: 'Pastries', icon: '🥐', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500' },
      { name: 'Red Velvet Cupcake Duo', description: 'Fluffy cocoa-infused sponge cupcakes topped with rich cream cheese frosting.', price: 160, category: 'Cakes', icon: '🧁', imageUrl: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500' }
    ]
  },
  {
    id: 'coffee-roasters',
    name: 'Java Grind Co.',
    industry: 'Grocery',
    desc: 'Espresso brown themes, beans grading stats, and subscription order configurations for coffee roasters.',
    icon: '☕',
    brandIcon: '🫘',
    tagline: 'Single-origin specialty coffee beans roasted weekly.',
    primaryColor: '#7c2d12',
    secondaryColor: '#d97706',
    bgColor: '#fafaf9',
    textColor: '#441507',
    accentBg: '#ffedd5',
    gradient: 'from-amber-700 to-orange-950',
    bgGradClass: 'from-stone-900 via-orange-955 to-stone-955',
    textColorClass: 'text-amber-808',
    primaryBtnClass: 'bg-amber-850 hover:bg-amber-900 text-white',
    sidebarBgClass: 'bg-orange-955 text-orange-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1000',
    products: [
      { name: 'Ethiopian Yirgacheffe (250g)', description: 'Light roast single origin beans with floral notes and citrus acidity.', price: 650, category: 'Whole Beans', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500' },
      { name: 'Dark Sumatra Blend (250g)', description: 'Dark roast organic beans featuring earthy profiles and dark chocolate notes.', price: 580, category: 'Whole Beans', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500' },
      { name: 'Cold Brew Travel Concentrate', description: '10x coffee extract to prepare refreshing cold brew instantly.', price: 420, category: 'Brew Kit', icon: '🫙', imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500' }
    ]
  },

  // 4. Health & Beauty
  {
    id: 'beauty-glow',
    name: 'Glow Skincare',
    industry: 'Health & Beauty',
    desc: 'Blush pink aesthetics, serum bottle graphic blocks, and ingredients checklist layout for cosmetics shops.',
    icon: '🧴',
    brandIcon: '💄',
    tagline: 'Clean, botanical, and dermatologically tested cosmetics.',
    primaryColor: '#ec4899',
    secondaryColor: '#f43f5e',
    bgColor: '#fff1f2',
    textColor: '#881337',
    accentBg: '#ffe4e6',
    gradient: 'from-pink-400 to-rose-500',
    bgGradClass: 'from-pink-955 via-rose-955 to-stone-955',
    textColorClass: 'text-pink-605',
    primaryBtnClass: 'bg-pink-605 hover:bg-pink-700 text-white',
    sidebarBgClass: 'bg-rose-955 text-rose-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000',
    products: [
      { name: 'Hyaluronic Acid Serum', description: 'Deeply moisturizes skin with a non-sticky 2% multi-molecular acid formula.', price: 699, category: 'Serums', icon: '🧴', imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500' },
      { name: 'Mineral Sunscreen SPF 50', description: 'Broad-spectrum zinc oxide screen offering matte finish and zero white cast.', price: 550, category: 'Sunscreen', icon: '🧴', imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500' },
      { name: 'Organic Matcha Clay Mask', description: 'Purifies skin pores and brightens skin tone with Japanese green tea extracts.', price: 480, category: 'Face Masks', icon: '🫙', imageUrl: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=500' }
    ]
  },
  {
    id: 'spa-wellness',
    name: 'Zen Oasis Spa',
    industry: 'Health & Beauty',
    desc: 'Pale teal and soft sand gradients with therapeutic service listings, massage options, and botanical accents.',
    icon: '🧘',
    brandIcon: '🕯️',
    tagline: 'Restore harmony to your body, mind, and spirit.',
    primaryColor: '#0d9488',
    secondaryColor: '#14b8a6',
    bgColor: '#f0fdfa',
    textColor: '#115e59',
    accentBg: '#ccfbf1',
    gradient: 'from-teal-500 to-emerald-500',
    bgGradClass: 'from-teal-955 via-emerald-955 to-slate-955',
    textColorClass: 'text-teal-700',
    primaryBtnClass: 'bg-teal-605 hover:bg-teal-700 text-white',
    sidebarBgClass: 'bg-teal-955 text-teal-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1000',
    products: [
      { name: 'Lavender Massage Oil', description: 'Soothing organic grape seed base infused with high altitude French lavender.', price: 650, category: 'Aromatherapy', icon: '🫙', imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500' },
      { name: 'Aromatic Jasmine Candle', description: 'Soy wax candle blended with natural oils, providing 45 hours burn time.', price: 450, category: 'Aromatherapy', icon: '🕯️', imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500' },
      { name: 'Sandalwood Bath Salts (500g)', description: 'Mineral rich Epsom salts mixed with pure Mysore sandalwood powder.', price: 380, category: 'Bath Salts', icon: '🫙', imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500' }
    ]
  },
  {
    id: 'dental-care',
    name: 'Dr. Smile Clinic',
    industry: 'Health & Beauty',
    desc: 'Medical blue and clean white layouts containing doctor profiles, pricing catalogs, and consultation bookings.',
    icon: '🏥',
    brandIcon: '🩺',
    tagline: 'Professional dental treatment and care for all ages.',
    primaryColor: '#0284c7',
    secondaryColor: '#3b82f6',
    bgColor: '#f0f9ff',
    textColor: '#0369a1',
    accentBg: '#e0f2fe',
    gradient: 'from-sky-500 to-blue-500',
    bgGradClass: 'from-sky-955 via-slate-900 to-slate-955',
    textColorClass: 'text-sky-600',
    primaryBtnClass: 'bg-sky-600 hover:bg-sky-700 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1000',
    products: [
      { name: 'Sonic Dental Toothbrush', description: 'Advanced electric toothbrush producing 40,000 vibrations per minute.', price: 2999, category: 'Devices', icon: '🪥', imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500' },
      { name: 'Organic Herbal Toothpaste', description: 'Fluoride-free natural toothpaste made with clove, neem, and baking soda.', price: 180, category: 'Pantry', icon: '🧴', imageUrl: 'https://images.unsplash.com/photo-1559599101-30900414859c?w=500' },
      { name: 'Dental Floss Pick Set (100pcs)', description: 'Tough, shred-resistant floss picks featuring mint oil and toothpick tips.', price: 120, category: 'Pantry', icon: '🧵', imageUrl: 'https://images.unsplash.com/photo-1593005510509-505b899f1ab4?w=500' }
    ]
  },

  // 5. Pets & Supplies
  {
    id: 'pet-supplies',
    name: 'Bark & Meow',
    industry: 'Pets',
    desc: 'Sunny yellow & warm orange layouts showing chew toys, cat scratchers, and premium pet foods.',
    icon: '🐶',
    brandIcon: '🐾',
    tagline: 'Healthy treats and supplies for your furry family.',
    primaryColor: '#f97316',
    secondaryColor: '#fbbf24',
    bgColor: '#fffbeb',
    textColor: '#7c2d12',
    accentBg: '#ffedd5',
    gradient: 'from-orange-400 to-amber-500',
    bgGradClass: 'from-orange-955 via-stone-900 to-stone-955',
    textColorClass: 'text-orange-600',
    primaryBtnClass: 'bg-orange-600 hover:bg-orange-700 text-white',
    sidebarBgClass: 'bg-orange-955 text-orange-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1000',
    products: [
      { name: 'Premium Salmon Dog Food (3kg)', description: 'Grain-free kibbles rich in omega fatty acids for shiny coat health.', price: 1450, category: 'Dog Food', icon: '🍖', imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500' },
      { name: 'Interactive Cat Laser Toy', description: 'Automatic rotating laser pointer featuring smart timer off controls.', price: 890, category: 'Toys', icon: '🧶', imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500' },
      { name: 'Orthopedic memory foam Bed', description: 'Soft plush bed providing therapeutic joint relief for senior dogs.', price: 2450, category: 'Beds', icon: '🛌', imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=500' }
    ]
  },
  {
    id: 'aquatics-life',
    name: 'Coral Reef Aquariums',
    industry: 'Pets',
    desc: 'Ocean blue styling with aquarium tanks, filters, reef lights, and marine life details.',
    icon: '🐠',
    brandIcon: '🌊',
    tagline: 'Everything you need to sustain a beautiful marine reef.',
    primaryColor: '#0284c7',
    secondaryColor: '#06b6d4',
    bgColor: '#f0fdfa',
    textColor: '#0f172a',
    accentBg: '#e0f2fe',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradClass: 'from-blue-955 via-teal-955 to-slate-955',
    textColorClass: 'text-blue-600',
    primaryBtnClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000',
    products: [
      { name: 'LED Reef Light System', description: 'Programmable full spectrum aquarium light built for coral growth.', price: 12500, category: 'Lighting', icon: '💡', imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500' },
      { name: 'Nano Hang-on Water Filter', description: 'Ultra quiet biochemical water filter featuring multi-stage media cartridges.', price: 1850, category: 'Filters', icon: '⚙️', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500' },
      { name: 'Premium Marine Salt Mix (5kg)', description: 'Synthetic sea salt enriched with calcium and trace minerals.', price: 1450, category: 'Additives', icon: '🧂', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500' }
    ]
  },

  // 6. Books & Media
  {
    id: 'books-literature',
    name: 'Literature Nest',
    industry: 'Books & Media',
    desc: 'Classic book list layout with sepia paper-white background, book cover previews, and author quotes.',
    icon: '📖',
    brandIcon: '📚',
    tagline: 'Curating world literature and independent publications.',
    primaryColor: '#7c2d12',
    secondaryColor: '#854d0e',
    bgColor: '#faf8f5',
    textColor: '#3f1a04',
    accentBg: '#fef3c7',
    gradient: 'from-amber-800 to-yellow-600',
    bgGradClass: 'from-stone-900 via-stone-950 to-black',
    textColorClass: 'text-amber-800',
    primaryBtnClass: 'bg-amber-800 hover:bg-amber-900 text-white',
    sidebarBgClass: 'bg-stone-900 text-stone-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1000',
    products: [
      { name: 'The Art of Writing (Hardcover)', description: 'Classic guide to storytelling and literary techniques by award-winning authors.', price: 599, category: 'Literature', icon: '📘', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500' },
      { name: 'Quiet Solitude (Poetry Anthology)', description: 'Beautiful collection of minimalist poems reflecting on nature and city life.', price: 299, category: 'Poetry', icon: '📕', imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=500' },
      { name: 'A History of the World (Audiobook)', description: 'Immersive 12-hour narration detailing social and technological shifts across history.', price: 450, category: 'Audiobooks', icon: '🎧', imageUrl: 'https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=500' }
    ]
  },
  {
    id: 'music-heaven',
    name: 'Guitar Heaven',
    industry: 'Books & Media',
    desc: 'Vibrant sunburst orange styling with guitar collections, amplifiers, pedals, and musician accessories.',
    icon: '🎸',
    brandIcon: '🤘',
    tagline: 'Premium guitars, instruments, and audio components.',
    primaryColor: '#ea580c',
    secondaryColor: '#f97316',
    bgColor: '#0f0c0a',
    textColor: '#fafaf9',
    accentBg: '#1c1917',
    gradient: 'from-orange-600 to-amber-800',
    bgGradClass: 'from-orange-955 via-stone-900 to-stone-955',
    textColorClass: 'text-orange-500',
    primaryBtnClass: 'bg-orange-600 hover:bg-orange-700 text-white',
    sidebarBgClass: 'bg-stone-900 text-stone-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1485672148400-f54bed99fcfd?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?w=1000',
    products: [
      { name: 'Retro Sunburst Electric Guitar', description: 'Solid mahogany body with maple neck and dual vintage humbucker pickups.', price: 34999, category: 'Guitars', icon: '🎸', imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21be5277f?w=500' },
      { name: '40W Bass Combo Amplifier', description: 'Compact bass practice amplifier featuring 10-inch driver and 3-band EQ.', price: 11999, category: 'Amplifiers', icon: '🔊', imageUrl: 'https://images.unsplash.com/photo-1572295210742-9745707c6847?w=500' },
      { name: 'Overdrive Analog Pedal', description: 'Classic warm tube-like saturation guitar effects pedal in aluminum chassis.', price: 4500, category: 'Pedals', icon: '🎛️', imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500' }
    ]
  },

  // 7. Real Estate & Home
  {
    id: 'realestate-elite',
    name: 'Metro Realty',
    industry: 'Real Estate',
    desc: 'Brass accents, estate listings grid cards, broker profile bars, and consultation scheduler layouts.',
    icon: '🏡',
    brandIcon: '🏢',
    tagline: 'Modern residential and commercial real estate brokers.',
    primaryColor: '#1e3a8a',
    secondaryColor: '#ca8a04',
    bgColor: '#f8fafc',
    textColor: '#1e293b',
    accentBg: '#eff6ff',
    gradient: 'from-blue-900 to-amber-600',
    bgGradClass: 'from-blue-955 via-slate-900 to-slate-955',
    textColorClass: 'text-blue-700',
    primaryBtnClass: 'bg-blue-800 hover:bg-blue-900 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000',
    products: [
      { name: 'Luxury 3-BHK Apartment', description: 'Spacious 2400 sq.ft apartment with sea views, modular kitchen, and smart automation.', price: 28000000, category: 'Apartments', icon: '🏢', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500' },
      { name: 'Modern Suburban Villa', description: '4-BHK gated villa featuring private garden, swimming pool, and solar panel grid.', price: 42000000, category: 'Villas', icon: '🏡', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500' },
      { name: 'Premium Office Space', description: 'Fully furnished 1200 sq.ft IT office space with meeting rooms and server cabins.', price: 15000000, category: 'Commercial', icon: '🏢', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500' }
    ]
  },
  {
    id: 'furniture-decor',
    name: 'Skov Danish Design',
    industry: 'Real Estate',
    desc: 'Light beige backgrounds with minimalist Scandinavian chairs, lounge tables, and catalog layouts.',
    icon: '🪑',
    brandIcon: '🛋️',
    tagline: 'Minimalist Danish furniture designed for modern spaces.',
    primaryColor: '#4f46e5',
    secondaryColor: '#10b981',
    bgColor: '#fafaf9',
    textColor: '#292524',
    accentBg: '#f5f3ff',
    gradient: 'from-indigo-500 to-emerald-500',
    bgGradClass: 'from-zinc-900 via-stone-900 to-zinc-955',
    textColorClass: 'text-indigo-600',
    primaryBtnClass: 'bg-indigo-650 hover:bg-indigo-700 text-white',
    sidebarBgClass: 'bg-zinc-900 text-zinc-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000',
    products: [
      { name: 'Artisan Oak Lounge Chair', description: 'Handcrafted solid white oak frame with natural paper cord woven seat.', price: 14500, category: 'Chairs', icon: '🪑', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500' },
      { name: 'Minimalist Wood Coffee Table', description: 'Sleek round ash veneer coffee table featuring three tapered legs.', price: 8900, category: 'Tables', icon: '🪵', imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500' },
      { name: 'Linen 3-Seater Sofa', description: 'Deep seated comfort sofa upholstered in breathable Belgian linen fabric.', price: 48900, category: 'Sofas', icon: '🛋️', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500' }
    ]
  },

  // 8. Automotive & Travel
  {
    id: 'auto-parts',
    name: 'AutoSphere Parts',
    industry: 'Automotive',
    desc: 'Carbon fiber dark accents, product code tables, and technical specs built for auto garage stores.',
    icon: '🚗',
    brandIcon: '⚙️',
    tagline: 'Certified auto parts and performance upgrades.',
    primaryColor: '#dc2626',
    secondaryColor: '#4b5563',
    bgColor: '#0f172a',
    textColor: '#f1f5f9',
    accentBg: '#1e293b',
    gradient: 'from-red-650 to-slate-700',
    bgGradClass: 'from-red-955 via-slate-900 to-slate-955',
    textColorClass: 'text-red-505',
    primaryBtnClass: 'bg-red-600 hover:bg-red-700 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000',
    products: [
      { name: 'Brembo Brake Pads Set', description: 'Ceramic composite brake pads offering high thermal stability and low dust.', price: 4200, category: 'Brakes', icon: '⚙️', imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500' },
      { name: '12V Sealed AGM Battery', description: 'Maintenance free 75Ah deep cycle automotive engine start battery.', price: 8500, category: 'Electrical', icon: '🔋', imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500' },
      { name: 'High-Flow Cold Air Intake', description: 'Aluminum air intake tube with washable cotton cone filter for BHP boost.', price: 12500, category: 'Engine', icon: '⚙️', imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500' }
    ]
  },
  {
    id: 'travel-agency',
    name: 'Wanderlust Journeys',
    industry: 'Travel',
    desc: 'Ocean teal styling showing exotic travel tour packages, guide listings, and booking details.',
    icon: '✈️',
    brandIcon: '🌴',
    tagline: 'Curated escape packages to the worlds finest shores.',
    primaryColor: '#0d9488',
    secondaryColor: '#f59e0b',
    bgColor: '#f0fdfa',
    textColor: '#115e59',
    accentBg: '#ccfbf1',
    gradient: 'from-teal-500 to-amber-500',
    bgGradClass: 'from-teal-955 via-sky-955 to-slate-955',
    textColorClass: 'text-teal-600',
    primaryBtnClass: 'bg-teal-605 hover:bg-teal-700 text-white',
    sidebarBgClass: 'bg-teal-955 text-teal-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1506929113444-46686eac8d58?w=1000',
    products: [
      { name: 'Maldives Water Villa Escape', description: 'All-inclusive premium villa stay featuring water sports, food, and airport speedboats.', price: 68000, category: 'Island Tours', icon: '🏝️', imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500' },
      { name: 'Himalayan Backpacking Trek', description: 'Guided group trekking trip across high passes, camping tents and foods included.', price: 14500, category: 'Adventure', icon: '⛰️', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500' },
      { name: 'Heritage Jaipur Royal Tour', description: 'Heritage hotel stay with royal dinner, local guides and entry tickets.', price: 12500, category: 'Cultural', icon: '🏰', imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500' }
    ]
  },

  // 9. Sports & Fitness
  {
    id: 'sports-gym',
    name: 'Apex Fitness Gear',
    industry: 'Sports & Fitness',
    desc: 'High-energy crimson red & charcoal grids displaying dumbbells, kettlebells, and protein powders.',
    icon: '💪',
    brandIcon: '🔥',
    tagline: 'Heavy-duty equipment to forge your peak potential.',
    primaryColor: '#e11d48',
    secondaryColor: '#18181b',
    bgColor: '#fafafa',
    textColor: '#09090b',
    accentBg: '#fff1f2',
    gradient: 'from-rose-500 to-zinc-800',
    bgGradClass: 'from-rose-955 via-zinc-900 to-zinc-955',
    textColorClass: 'text-rose-600',
    primaryBtnClass: 'bg-rose-600 hover:bg-rose-700 text-white',
    sidebarBgClass: 'bg-zinc-950 text-zinc-200 border-r border-zinc-850',
    heroImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000',
    products: [
      { name: 'Cast Iron Hex Dumbbells (10kg)', description: 'Premium solid cast iron core dumbbells coated in protective rubber.', price: 2990, category: 'Weights', icon: '🏋️', imageUrl: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500' },
      { name: 'Cast Iron Kettlebell (16kg)', description: 'Standard dimensions cast iron kettlebell finished with flat powder coat.', price: 3450, category: 'Weights', icon: '🏋️', imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500' },
      { name: 'Pure Whey Isolate Protein (1kg)', description: 'Fast digesting micro-filtered grass-fed whey isolate delivering 27g protein.', price: 3890, category: 'Supplements', icon: '🍼', imageUrl: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500' }
    ]
  },
  {
    id: 'sports-cycling',
    name: 'Velo Wheels',
    industry: 'Sports & Fitness',
    desc: 'Electric neon-yellow accents and cycling paths, tailored for road bikes, locks, and helmet brands.',
    icon: '🚲',
    brandIcon: '🏁',
    tagline: 'Aerodynamic road bikes and off-road cycles.',
    primaryColor: '#84cc16',
    secondaryColor: '#0f172a',
    bgColor: '#fcfdf5',
    textColor: '#1e293b',
    accentBg: '#f4fccf',
    gradient: 'from-lime-505 to-slate-900',
    bgGradClass: 'from-lime-955 via-slate-900 to-black',
    textColorClass: 'text-lime-700',
    primaryBtnClass: 'bg-lime-600 hover:bg-lime-700 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=1000',
    products: [
      { name: 'Velo Carbon Road Bike', description: 'Superlight T700 carbon frame bike equipped with Shimano 105 groupset.', price: 124999, category: 'Bicycles', icon: '🚲', imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500' },
      { name: 'MIPS Certified Aero Helmet', description: 'Advanced aerodynamics cycling helmet featuring multi-directional impact protection.', price: 6500, category: 'Helmets', icon: '🪖', imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500' },
      { name: 'Smart Bluetooth Cycle GPS', description: 'Compact bike computer detailing real-time speed, altimeter, and maps sync.', price: 8900, category: 'Gadgets', icon: '📟', imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=500' }
    ]
  },

  // 10. Restaurants & Food
  {
    id: 'food-pizza',
    name: 'Bellissimo Pizzeria',
    industry: 'Restaurants/Food',
    desc: 'Warm red and wood shades featuring pizza menu listings, customizable ingredients, and reservation buttons.',
    icon: '🍕',
    brandIcon: '🍅',
    tagline: 'Neapolitan wood-fired pizzas baked in brick ovens.',
    primaryColor: '#ea580c',
    secondaryColor: '#854d0e',
    bgColor: '#fffaf8',
    textColor: '#431407',
    accentBg: '#ffedd5',
    gradient: 'from-orange-500 to-yellow-600',
    bgGradClass: 'from-orange-955 via-stone-900 to-stone-955',
    textColorClass: 'text-orange-700',
    primaryBtnClass: 'bg-orange-600 hover:bg-orange-700 text-white',
    sidebarBgClass: 'bg-orange-955 text-orange-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
    products: [
      { name: 'Classic Margherita Pizza', description: 'San Marzano tomatoes, fresh buffalo mozzarella, fresh basil, and extra virgin olive oil.', price: 420, category: 'Wood-fired Pizza', icon: '🍕', imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500' },
      { name: 'Pepperoni & Hot Honey', description: 'Italian pepperoni slices, smoked mozzarella, and a drizzle of hot chili-infused organic honey.', price: 580, category: 'Wood-fired Pizza', icon: '🍕', imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500' },
      { name: 'Truffle Mushroom Pizza', description: 'Creamy garlic white sauce, wild mushrooms, fresh rosemary, and premium black truffle oil.', price: 650, category: 'Wood-fired Pizza', icon: '🍕', imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500' }
    ]
  },
  {
    id: 'food-vegan',
    name: 'Vegan Delights',
    industry: 'Restaurants/Food',
    desc: 'Olive green & sand color palettes showcasing organic smoothies, healthy salads, and raw dessert options.',
    icon: '🥗',
    brandIcon: '🥑',
    tagline: 'Plant-based delicious creations packed with nutrients.',
    primaryColor: '#65a30d',
    secondaryColor: '#ca8a04',
    bgColor: '#f7fee7',
    textColor: '#1a2e05',
    accentBg: '#ecfccb',
    gradient: 'from-lime-500 to-amber-500',
    bgGradClass: 'from-lime-955 via-stone-900 to-stone-955',
    textColorClass: 'text-lime-700',
    primaryBtnClass: 'bg-lime-600 hover:bg-lime-700 text-white',
    sidebarBgClass: 'bg-stone-900 text-stone-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000',
    products: [
      { name: 'Avocado Crunch Buddha Bowl', description: 'Organic quinoa, sliced avocados, chickpeas, purple cabbage, and tahini ginger dressing.', price: 340, category: 'Salad Bowls', icon: '🥗', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500' },
      { name: 'Berry Power Smoothie', description: 'Blended organic blueberries, raspberries, strawberries, almond milk, and hemp seeds.', price: 220, category: 'Smoothies', icon: '🥤', imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500' },
      { name: 'Raw Vegan Matcha Cake', description: 'Creamy cashew and coconut cream base flavored with Japanese matcha on almond-date crust.', price: 260, category: 'Desserts', icon: '🍰', imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500' }
    ]
  },

  // 11. Custom & Extra Themes
  {
    id: 'education-school',
    name: 'Coders Academy',
    industry: 'Education',
    desc: 'Indigo academic styling with course cards, coding syllabus outlines, instructor profiles, and registration forms.',
    icon: '🎓',
    brandIcon: '💻',
    tagline: 'Learn full-stack software development from experts.',
    primaryColor: '#4f46e5',
    secondaryColor: '#3b82f6',
    bgColor: '#f5f3ff',
    textColor: '#1e1b4b',
    accentBg: '#ede9fe',
    gradient: 'from-indigo-500 to-blue-500',
    bgGradClass: 'from-indigo-955 via-slate-900 to-slate-955',
    textColorClass: 'text-indigo-700',
    primaryBtnClass: 'bg-indigo-605 hover:bg-indigo-700 text-white',
    sidebarBgClass: 'bg-indigo-955 text-indigo-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000',
    products: [
      { name: 'Full Stack Java Bootcamp', description: '12-week comprehensive course covering Spring Boot, JPA, Postgres, and React.', price: 45000, category: 'Bootcamps', icon: '🎓', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500' },
      { name: 'Responsive Web Design', description: 'Learn modern CSS layouts, flexbox, grid, Tailwind, and accessibilities.', price: 9990, category: 'Courses', icon: '💻', imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500' },
      { name: 'Data Structures Bootcamp', description: 'Master sorting, trees, graphs, dynamic programming, and interview questions.', price: 14500, category: 'Courses', icon: '⚙️', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500' }
    ]
  },
  {
    id: 'florist-bloom',
    name: 'Bloom Florals',
    industry: 'Florist/Gifts',
    desc: 'Soft lilac & lavender palette showing fresh hand-tied bouquets, wedding florist packages, and flower boxes.',
    icon: '💐',
    brandIcon: '🌸',
    tagline: 'Fresh hand-picked seasonal flowers and custom bouquets.',
    primaryColor: '#d946ef',
    secondaryColor: '#f43f5e',
    bgColor: '#fdf4ff',
    textColor: '#701a75',
    accentBg: '#fae8ff',
    gradient: 'from-fuchsia-400 to-rose-500',
    bgGradClass: 'from-fuchsia-955 via-rose-955 to-stone-955',
    textColorClass: 'text-fuchsia-600',
    primaryBtnClass: 'bg-fuchsia-605 hover:bg-fuchsia-700 text-white',
    sidebarBgClass: 'bg-fuchsia-955 text-fuchsia-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1000',
    products: [
      { name: 'Blushing Rose Bouquet', description: '12 premium pink roses mixed with white baby-breaths and eucalyptus greens.', price: 1290, category: 'Bouquets', icon: '💐', imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500' },
      { name: 'Pastel Meadow Box', description: 'Freshly arranged hydrangeas, lisianthuses, and carnations in a luxurious gift box.', price: 1850, category: 'Flower Boxes', icon: '📦', imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500' },
      { name: 'Elegance Orchids Ceramic Pot', description: 'Beautiful double-stem white phalaenopsis orchid in a premium ceramic planter.', price: 2450, category: 'Plants', icon: '🪴', imageUrl: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500' }
    ]
  },
  {
    id: 'toys-kids',
    name: 'KidZone Playlands',
    industry: 'Toys & Kids',
    desc: 'Bright sky-blue and orange playful theme with wooden toys, puzzle blocks, and children board games.',
    icon: '🧸',
    brandIcon: '🪁',
    tagline: 'Educational wooden toys and interactive kids games.',
    primaryColor: '#0ea5e9',
    secondaryColor: '#f97316',
    bgColor: '#f0f9ff',
    textColor: '#0c4a6e',
    accentBg: '#e0f2fe',
    gradient: 'from-sky-400 to-orange-400',
    bgGradClass: 'from-sky-955 via-orange-955 to-slate-955',
    textColorClass: 'text-sky-600',
    primaryBtnClass: 'bg-sky-605 hover:bg-sky-700 text-white',
    sidebarBgClass: 'bg-sky-900 text-sky-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1537655780520-1e392edd816a?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=1000',
    products: [
      { name: 'Artisan Wooden Train Set', description: 'Handcrafted solid beechwood magnetic train cars with wooden tracks.', price: 1490, category: 'Wooden Toys', icon: '🚂', imageUrl: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=500' },
      { name: 'Animals 3D Wooden Puzzle', description: 'Eco-friendly non-toxic paint layered puzzle blocks to build toddler motor skills.', price: 490, category: 'Puzzles', icon: '🧩', imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500' },
      { name: 'Family Board Game of Quests', description: 'Fun strategy card-collecting quest board game suitable for ages 6 and up.', price: 990, category: 'Board Games', icon: '🎲', imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500' }
    ]
  },
  {
    id: 'daycare-sprout',
    name: 'Little Sprouts Daycare',
    industry: 'Toys & Kids',
    desc: 'Gentle pastel green & yellow themed daycare layout with classrooms schedules, staff profiles, and registration widgets.',
    icon: '🌱',
    brandIcon: '👶',
    tagline: 'A safe, nurturing, and creative preschool academy.',
    primaryColor: '#10b981',
    secondaryColor: '#facc15',
    bgColor: '#f0fdf4',
    textColor: '#064e3b',
    accentBg: '#dcfce7',
    gradient: 'from-emerald-400 to-yellow-400',
    bgGradClass: 'from-emerald-955 via-zinc-900 to-zinc-955',
    textColorClass: 'text-emerald-700',
    primaryBtnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    sidebarBgClass: 'bg-emerald-950 text-emerald-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1587554801471-37976a256db0?w=1000',
    products: [
      { name: 'Preschool Full-Day Program', description: 'All-inclusive early education program with sensory plays, meals, and nap slots.', price: 12000, category: 'Monthly Program', icon: '👶', imageUrl: 'https://images.unsplash.com/photo-1587554801471-37976a256db0?w=500' },
      { name: 'Infant Daycare Care Slot', description: 'Nurturing daycare slots with dedicated nurse care and custom baby meals.', price: 15000, category: 'Monthly Program', icon: '👶', imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500' },
      { name: 'Art & Music Weekend Workshop', description: '4-session weekend creative painting and musical instruments workshops for kids.', price: 2500, category: 'Workshops', icon: '🎨', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500' }
    ]
  },
  {
    id: 'decor-interior',
    name: 'Decora Interiors',
    industry: 'Real Estate',
    desc: 'Beige theme showcasing aesthetic ceramic vases, linen curtains, brass lamps, and interior studio design packages.',
    icon: '🏺',
    brandIcon: '🛋️',
    tagline: 'Curated home accessories and interior consultancy.',
    primaryColor: '#d97706',
    secondaryColor: '#78350f',
    bgColor: '#fafaf9',
    textColor: '#44403c',
    accentBg: '#fffbeb',
    gradient: 'from-amber-600 to-stone-900',
    bgGradClass: 'from-stone-900 via-amber-955 to-stone-955',
    textColorClass: 'text-amber-800',
    primaryBtnClass: 'bg-amber-605 hover:bg-amber-700 text-white',
    sidebarBgClass: 'bg-stone-955 text-stone-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000',
    products: [
      { name: 'Aesthetic Ribbed Vase', description: 'Hand-thrown clay vase featuring matte beige textured stripes.', price: 1250, category: 'Vases', icon: '🏺', imageUrl: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500' },
      { name: 'Brass Swing Arm Desk Lamp', description: 'Minimalist golden brass desk lamp with adjustable joints and cloth cord.', price: 3450, category: 'Lighting', icon: '💡', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500' },
      { name: 'Linen Curtain Pair', description: 'Breathable heavy textured pure linen curtains with hidden tabs.', price: 4850, category: 'Textiles', icon: '🧵', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500' }
    ]
  },
  {
    id: 'antiques-retro',
    name: 'Vintique Collect',
    industry: 'Automotive',
    desc: 'Sepia and wood aesthetics, displaying vintage pocket watches, typewriters, old cameras, and antiquities.',
    icon: '⏳',
    brandIcon: '🗝️',
    tagline: 'Rare antique collectibles and vintage treasures.',
    primaryColor: '#b45309',
    secondaryColor: '#7c2d12',
    bgColor: '#faf7f2',
    textColor: '#451a03',
    accentBg: '#fef3c7',
    gradient: 'from-amber-600 to-stone-800',
    bgGradClass: 'from-amber-955 via-stone-900 to-black',
    textColorClass: 'text-amber-800',
    primaryBtnClass: 'bg-amber-705 hover:bg-amber-800 text-white',
    sidebarBgClass: 'bg-stone-955 text-stone-200',
    heroImageUrl: 'https://images.unsplash.com/photo-1442120107412-19e8b1e89857?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=1000',
    products: [
      { name: 'Brass Pocket Watch', description: 'Working 1920s vintage hand-wound mechanical movement pocket watch.', price: 8500, category: 'Watches', icon: '⌚', imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500' },
      { name: 'Retro Ribbon Typewriter', description: 'Fully restored 1960s portable mechanical typewriter in original carrying case.', price: 14500, category: 'Typewriters', icon: '⌨️', imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500' },
      { name: 'Vintage Bellows Camera', description: 'Folding bellows manual camera with original glass lens, for display.', price: 5800, category: 'Cameras', icon: '📷', imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500' }
    ]
  },
  // Gym Specific Themes (10 Options)
  {
    id: 'gym-volt-apex',
    name: 'Volt Apex',
    industry: 'Gym & Fitness',
    desc: 'High-intensity athletic theme with energetic orange and deep navy accents.',
    icon: '⚡',
    brandIcon: '💪',
    tagline: 'High-intensity training and athletic excellence.',
    primaryColor: '#f97316',
    secondaryColor: '#1e3a8a',
    bgColor: '#09090b',
    textColor: '#f8fafc',
    accentBg: '#1e293b',
    gradient: 'from-orange-500 to-blue-700',
    bgGradClass: 'from-orange-950 via-slate-900 to-blue-950',
    textColorClass: 'text-orange-505',
    primaryBtnClass: 'bg-orange-600 hover:bg-orange-700 text-white',
    sidebarBgClass: 'bg-slate-950 text-slate-200 border-r border-slate-800',
    heroImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000',
    products: [
      { name: 'Elite Performance Pass', description: 'Access to all high-intensity training zones and performance coaching.', price: 2999, category: 'Passes', icon: '🎫', imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500' },
      { name: 'Liquid Hydration Shaker', description: 'Leak-proof BPA-free shaker bottle with stainless steel wire whisk.', price: 499, category: 'Accessories', icon: '🍼', imageUrl: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500' }
    ]
  },
  {
    id: 'gym-stealth-carbon',
    name: 'Carbon Stealth',
    industry: 'Gym & Fitness',
    desc: 'Matte-black dark theme with stealth zinc accents for hardcore training spaces.',
    icon: '🖤',
    brandIcon: '⛓️',
    tagline: 'Matte-black aesthetics for heavy lifters.',
    primaryColor: '#3f3f46',
    secondaryColor: '#18181b',
    bgColor: '#09090b',
    textColor: '#fafafa',
    accentBg: '#27272a',
    gradient: 'from-zinc-700 to-zinc-950',
    bgGradClass: 'from-zinc-955 via-zinc-900 to-black',
    textColorClass: 'text-zinc-400',
    primaryBtnClass: 'bg-zinc-700 hover:bg-zinc-800 text-white',
    sidebarBgClass: 'bg-zinc-950 text-zinc-200 border-r border-zinc-900',
    heroImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1000',
    products: [
      { name: 'Stealth Power Rack Access', description: 'Lifting platforms, safety pins, multi-grip pull up bar, and chalk access.', price: 1999, category: 'Access', icon: '🏋️', imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500' }
    ]
  },
  {
    id: 'gym-zen-essence',
    name: 'Zen Essence',
    industry: 'Gym & Fitness',
    desc: 'Serene light theme with soft emerald green accents, tailored for yoga and wellness.',
    icon: '🧘‍♂️',
    brandIcon: '🍃',
    tagline: 'Serene flows and mindfulness spaces.',
    primaryColor: '#10b981',
    secondaryColor: '#064e3b',
    bgColor: '#f0fdf4',
    textColor: '#064e3b',
    accentBg: '#d1fae5',
    gradient: 'from-emerald-400 to-teal-700',
    bgGradClass: 'from-emerald-950 via-teal-900 to-slate-950',
    textColorClass: 'text-emerald-600',
    primaryBtnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    sidebarBgClass: 'bg-emerald-950 text-emerald-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000',
    products: [
      { name: 'Premium Eco Yoga Mat', description: 'Non-slip biodegradable natural tree rubber mat with alignment markings.', price: 3499, category: 'Gear', icon: '🧘', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500' }
    ]
  },
  {
    id: 'gym-iron-forge',
    name: 'Iron Forge',
    industry: 'Gym & Fitness',
    desc: 'Aggressive red and charcoal steel theme for raw power bodybuilding clubs.',
    icon: '🏋️‍♂️',
    brandIcon: '🔥',
    tagline: 'Raw power, classic plates, pure strength.',
    primaryColor: '#dc2626',
    secondaryColor: '#7f1d1d',
    bgColor: '#18181b',
    textColor: '#fafafa',
    accentBg: '#2d2d30',
    gradient: 'from-red-650 to-zinc-900',
    bgGradClass: 'from-zinc-950 via-red-950 to-zinc-900',
    textColorClass: 'text-red-500',
    primaryBtnClass: 'bg-red-600 hover:bg-red-700 text-white',
    sidebarBgClass: 'bg-zinc-955 text-zinc-200 border-r border-zinc-850',
    heroImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000',
    products: [
      { name: 'Heavy Cast Iron Kettlebell (24kg)', description: 'Powder-coated solid steel kettlebell for explosive power WODs.', price: 4499, category: 'Weights', icon: '🏋️', imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500' }
    ]
  },
  {
    id: 'gym-sunset-zumba',
    name: 'Sunset Zumba',
    industry: 'Gym & Fitness',
    desc: 'Fun, bright pink-to-orange gradient theme for aerobics and group dance classes.',
    icon: '💃',
    brandIcon: '🎵',
    tagline: 'Dance your way to high-energy fitness.',
    primaryColor: '#ec4899',
    secondaryColor: '#f59e0b',
    bgColor: '#fff0f6',
    textColor: '#500724',
    accentBg: '#fce7f3',
    gradient: 'from-pink-500 to-amber-500',
    bgGradClass: 'from-pink-950 via-purple-950 to-amber-950',
    textColorClass: 'text-pink-650',
    primaryBtnClass: 'bg-pink-600 hover:bg-pink-700 text-white',
    sidebarBgClass: 'bg-pink-950 text-pink-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1000',
    products: [
      { name: 'Unlimited Zumba Monthly Class Pass', description: 'Join all daily sessions and virtual recordings with top choreographers.', price: 1499, category: 'Passes', icon: '🎫', imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500' }
    ]
  },
  {
    id: 'gym-cyberpunk',
    name: 'Neon Grid',
    industry: 'Gym & Fitness',
    desc: 'Futuristic theme featuring neon-lime details on dark blue layouts.',
    icon: '📟',
    brandIcon: '👾',
    tagline: 'Futuristic gym laboratory.',
    primaryColor: '#84cc16',
    secondaryColor: '#020617',
    bgColor: '#020617',
    textColor: '#f8fafc',
    accentBg: '#0f172a',
    gradient: 'from-lime-400 to-slate-900',
    bgGradClass: 'from-lime-955 via-slate-900 to-black',
    textColorClass: 'text-lime-500',
    primaryBtnClass: 'bg-lime-550 hover:bg-lime-600 text-black font-extrabold',
    sidebarBgClass: 'bg-slate-950 text-slate-200 border-r border-slate-850',
    heroImageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000',
    products: [
      { name: 'Cybernetic Pre-Workout Formula', description: 'Lime-flavored intense cognitive focus & endurance booster.', price: 2199, category: 'Supplements', icon: '🍼', imageUrl: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500' }
    ]
  },
  {
    id: 'gym-royal-martial',
    name: 'Royal Crest MMA',
    industry: 'Gym & Fitness',
    desc: 'Royal blue and gold structured theme for martial arts training camps.',
    icon: '🥊',
    brandIcon: '🥋',
    tagline: 'Discipline, honor, and martial perfection.',
    primaryColor: '#1e40af',
    secondaryColor: '#d97706',
    bgColor: '#f8fafc',
    textColor: '#1e293b',
    accentBg: '#dbeafe',
    gradient: 'from-blue-700 to-amber-500',
    bgGradClass: 'from-blue-950 via-zinc-900 to-amber-955',
    textColorClass: 'text-blue-700',
    primaryBtnClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    sidebarBgClass: 'bg-blue-950 text-blue-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000',
    products: [
      { name: 'Genuine Leather Sparring Gloves', description: '14oz heavy leather boxing gloves with multi-layer gel padding.', price: 3999, category: 'Gear', icon: '🥊', imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500' }
    ]
  },
  {
    id: 'gym-aqua-swim',
    name: 'Aqua Wave',
    industry: 'Gym & Fitness',
    desc: 'Refreshing cyan and water blue theme for swimming academies and pools.',
    icon: '🏊‍♂️',
    brandIcon: '🌊',
    tagline: 'Dive into elite performance.',
    primaryColor: '#06b6d4',
    secondaryColor: '#0369a1',
    bgColor: '#ecfeff',
    textColor: '#083344',
    accentBg: '#cffafe',
    gradient: 'from-cyan-400 to-blue-600',
    bgGradClass: 'from-cyan-950 via-blue-950 to-slate-900',
    textColorClass: 'text-cyan-600',
    primaryBtnClass: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    sidebarBgClass: 'bg-cyan-950 text-cyan-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1476490829079-bfa195177f02?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000',
    products: [
      { name: 'Anti-Fog Racing Goggles', description: 'Mirrored UV-protected lenses with custom silicone bridge seals.', price: 1299, category: 'Gear', icon: '👓', imageUrl: 'https://images.unsplash.com/photo-1476490829079-bfa195177f02?w=500' }
    ]
  },
  {
    id: 'gym-minimal-wellness',
    name: 'Minimalist Wellness',
    industry: 'Gym & Fitness',
    desc: 'Pristine white and indigo theme for premium health clubs.',
    icon: '🏥',
    brandIcon: '💎',
    tagline: 'Clean structure, state-of-the-art results.',
    primaryColor: '#4f46e5',
    secondaryColor: '#1e1b4b',
    bgColor: '#ffffff',
    textColor: '#0f172a',
    accentBg: '#e0e7ff',
    gradient: 'from-indigo-500 to-slate-900',
    bgGradClass: 'from-indigo-950 via-slate-900 to-zinc-900',
    textColorClass: 'text-indigo-650',
    primaryBtnClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000',
    products: [
      { name: 'Individual Platinum Annual Pass', description: 'Full access to weights, steam sauna, pool, and 4 personal training scans.', price: 34999, category: 'Passes', icon: '💳', imageUrl: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500' }
    ]
  },
  {
    id: 'gym-digital-coach',
    name: 'Digital Coach Pro',
    industry: 'Gym & Fitness',
    desc: 'Fuchsia and violet digital aesthetic for online trainers and home workouts.',
    icon: '📱',
    brandIcon: '💡',
    tagline: 'Video-guided virtual workout ecosystem.',
    primaryColor: '#d946ef',
    secondaryColor: '#4c1d95',
    bgColor: '#faf5ff',
    textColor: '#3b0764',
    accentBg: '#f3e8ff',
    gradient: 'from-fuchsia-500 to-violet-700',
    bgGradClass: 'from-fuchsia-950 via-violet-900 to-black',
    textColorClass: 'text-fuchsia-600',
    primaryBtnClass: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white',
    sidebarBgClass: 'bg-purple-950 text-purple-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000',
    products: [
      { name: 'Virtual Video Training Subscription', description: '100+ high definition guided exercise routines updated weekly.', price: 999, category: 'Sub', icon: '📺', imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500' }
    ]
  },
  {
    id: 'realestate-luxury-mansions',
    name: 'Aura Premium Estates',
    industry: 'Real Estate',
    desc: 'Deep charcoal background, elegant gold borders, luxury listings cards, and waterfront mansion layouts.',
    icon: '🏰',
    brandIcon: '💎',
    tagline: 'Exclusive, elite mansions and waterfront properties.',
    primaryColor: '#0f172a',
    secondaryColor: '#b45309',
    bgColor: '#fafafa',
    textColor: '#0f172a',
    accentBg: '#fef3c7',
    gradient: 'from-slate-900 to-amber-700',
    bgGradClass: 'from-slate-950 via-slate-900 to-stone-900',
    textColorClass: 'text-amber-700',
    primaryBtnClass: 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700',
    sidebarBgClass: 'bg-slate-955 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000',
    products: [
      { name: 'The Sapphire Estate Mansion', description: 'Exquisite 6 BHK luxury mansion, private swimming pool, landscaped lawn garden, home theatre room.', price: 85000000, category: 'Luxury', icon: '🏰', imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500' },
      { name: 'Oceanview Panoramic Penthouse', description: 'Elite 4 BHK penthouse, rooftop terrace deck, automated smart home systems, gorgeous ocean panoramas.', price: 62000000, category: 'Luxury', icon: '🏢', imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500' }
    ]
  },
  {
    id: 'realestate-apex-builders',
    name: 'Apex Builders',
    industry: 'Real Estate',
    desc: 'Rust orange accents, construction site project layouts, architectural design banners, and foundation plans.',
    icon: '🏗️',
    brandIcon: '🛠️',
    tagline: 'Leading residential developers and commercial builders.',
    primaryColor: '#ea580c',
    secondaryColor: '#475569',
    bgColor: '#f1f5f9',
    textColor: '#1e293b',
    accentBg: '#ffedd5',
    gradient: 'from-orange-600 to-slate-700',
    bgGradClass: 'from-orange-955 via-slate-900 to-slate-955',
    textColorClass: 'text-orange-605',
    primaryBtnClass: 'bg-orange-600 hover:bg-orange-700 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000',
    products: [
      { name: 'Custom House Construction Package', description: 'A-Grade building materials, structural design, civil contracting, and interior layout setup.', price: 4500000, category: 'Construction', icon: '🧱', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500' },
      { name: 'Modular Kitchen & Interior Setup', description: 'Modern sleek cabinets, quartz countertops, premium fittings, and space-saving layouts.', price: 350000, category: 'Interior', icon: '🍳', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500' }
    ]
  },
  {
    id: 'realestate-vertex-commercial',
    name: 'Vertex Commercial',
    industry: 'Real Estate',
    desc: 'Eco-blue accents, professional corporate office buildings, and retail showroom list layouts.',
    icon: '🏙️',
    brandIcon: '🏢',
    tagline: 'Premium commercial structures and corporate spaces.',
    primaryColor: '#0369a1',
    secondaryColor: '#1e293b',
    bgColor: '#f8fafc',
    textColor: '#0f172a',
    accentBg: '#e0f2fe',
    gradient: 'from-sky-600 to-slate-800',
    bgGradClass: 'from-sky-955 via-slate-900 to-slate-955',
    textColorClass: 'text-sky-700',
    primaryBtnClass: 'bg-sky-700 hover:bg-sky-805 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000',
    products: [
      { name: 'Grade-A Corporate Office Building', description: 'Multi-office commercial floor, centralized AC, security surveillance, located in business hub.', price: 25000000, category: 'Corporate', icon: '🏢', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500' },
      { name: 'Metropolitan Retail Showroom Outlet', description: 'High footfall street-level retail shop outlet, glass display front, perfect for luxury stores.', price: 18000000, category: 'Retail', icon: '🛍️', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500' }
    ]
  },
  {
    id: 'realestate-urban-nest',
    name: 'Urban Nest Rentals',
    industry: 'Real Estate',
    desc: 'Indigo and cyan themes displaying rental flats, PG hostels, and student rooms.',
    icon: '🔑',
    brandIcon: '🏠',
    tagline: 'Simplified renting and property management.',
    primaryColor: '#4f46e5',
    secondaryColor: '#06b6d4',
    bgColor: '#fafaf9',
    textColor: '#1c1917',
    accentBg: '#e0e7ff',
    gradient: 'from-indigo-600 to-cyan-500',
    bgGradClass: 'from-indigo-950 via-zinc-900 to-slate-950',
    textColorClass: 'text-indigo-600',
    primaryBtnClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    sidebarBgClass: 'bg-zinc-905 text-zinc-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1000',
    products: [
      { name: 'Student Studio Room (Shared PG)', description: 'Fully furnished, high-speed Wi-Fi, laundry facilities, study desks, near university campus.', price: 8500, category: 'Student Room', icon: '🎓', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500' },
      { name: 'Suburban 2-BHK Rental Apartment', description: 'Semi-furnished rental flat with modular kitchen fittings, lift service, 24/7 security.', price: 25000, category: 'Rental Flat', icon: '🏢', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500' }
    ]
  },
  {
    id: 'realestate-horizon-advisors',
    name: 'Horizon Advisors',
    industry: 'Real Estate',
    desc: 'Forest green theme for property investment consultancy, legal reviews, and valuations.',
    icon: '📈',
    brandIcon: '💼',
    tagline: 'Expert real estate investment advisory.',
    primaryColor: '#047857',
    secondaryColor: '#ca8a04',
    bgColor: '#f0fdf4',
    textColor: '#064e3b',
    accentBg: '#d1fae5',
    gradient: 'from-emerald-700 to-amber-600',
    bgGradClass: 'from-emerald-955 via-slate-900 to-slate-950',
    textColorClass: 'text-emerald-700',
    primaryBtnClass: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    sidebarBgClass: 'bg-emerald-950 text-emerald-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1000',
    products: [
      { name: 'Property Investment Consult', description: '1-on-1 strategic portfolio analysis, market value assessment, and risk advisory.', price: 1500, category: 'Consulting', icon: '📋', imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=500' },
      { name: 'Legal Document Verification Service', description: 'Comprehensive registry checks, clear title deeds validation, and mutation assistance.', price: 5000, category: 'Legal Check', icon: '📝', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500' }
    ]
  },
  {
    id: 'realestate-luxe-spaces',
    name: 'Luxe Spaces Design',
    industry: 'Real Estate',
    desc: 'Terracotta theme presenting home renovations, kitchen interior layouts, and blueprints.',
    icon: '🎨',
    brandIcon: '🛋️',
    tagline: 'Modern interior design and architecture blueprints.',
    primaryColor: '#7c2d12',
    secondaryColor: '#d97706',
    bgColor: '#fafaf9',
    textColor: '#431407',
    accentBg: '#ffedd5',
    gradient: 'from-orange-850 to-amber-700',
    bgGradClass: 'from-stone-955 via-stone-900 to-orange-950',
    textColorClass: 'text-orange-800',
    primaryBtnClass: 'bg-orange-805 hover:bg-orange-900 text-white',
    sidebarBgClass: 'bg-stone-900 text-stone-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000',
    products: [
      { name: 'Full Home Interior Consultation', description: 'Aesthetic mood boarding, space planning, custom cabinetry, material selection guidelines.', price: 10000, category: 'Interior', icon: '🛋️', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500' },
      { name: '3D Architectural Blueprint Model', description: 'Custom structural floor plan modeling, exterior facade designs, and CAD files.', price: 25000, category: 'Architecture', icon: '📐', imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500' }
    ]
  },
  {
    id: 'realestate-nova-smartcity',
    name: 'Nova Smart City',
    industry: 'Real Estate',
    desc: 'Dark theme layout with vibrant neon blue highlights, connected grids, and IoT smart residency slots.',
    icon: '🌐',
    brandIcon: '⚡',
    tagline: 'Eco-friendly futuristic smart residency projects.',
    primaryColor: '#2563eb',
    secondaryColor: '#10b981',
    bgColor: '#09090b',
    textColor: '#f8fafc',
    accentBg: '#1e293b',
    gradient: 'from-blue-600 to-emerald-500',
    bgGradClass: 'from-blue-955 via-slate-900 to-black',
    textColorClass: 'text-blue-500',
    primaryBtnClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    sidebarBgClass: 'bg-zinc-950 text-zinc-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000',
    products: [
      { name: 'Eco-Smart Connected Villa', description: '4 BHK villa with solar panels, smart smart-lock system, greywater recycling, and energy grid.', price: 55000000, category: 'Smart Villa', icon: '🏡', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500' },
      { name: 'Smart IoT Studio Apartment', description: 'Furnished high-tech studio flat with integrated Alexa controls, smart lighting, automated blinds.', price: 12000000, category: 'Smart Studio', icon: '🏢', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500' }
    ]
  },
  {
    id: 'realestate-heritage-homes',
    name: 'Heritage Farms',
    industry: 'Real Estate',
    desc: 'Warm beige and olive theme for independent farm houses, rural plots, and countryside bungalows.',
    icon: '🏡',
    brandIcon: '🌾',
    tagline: 'Reconnect with nature in peaceful estates.',
    primaryColor: '#15803d',
    secondaryColor: '#854d0e',
    bgColor: '#fffbeb',
    textColor: '#14532d',
    accentBg: '#dcfce7',
    gradient: 'from-green-700 to-yellow-700',
    bgGradClass: 'from-green-955 via-stone-900 to-stone-955',
    textColorClass: 'text-green-700',
    primaryBtnClass: 'bg-green-700 hover:bg-green-800 text-white',
    sidebarBgClass: 'bg-stone-900 text-stone-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000',
    products: [
      { name: 'Rustic Organic Farmhouse Estate', description: 'Peaceful farmhouse retreat with modular kitchen, private pool, and 1 acre cultivated garden.', price: 12500000, category: 'Farmhouse', icon: '🌾', imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500' },
      { name: 'Cultivated Plantation Land Plot', description: 'Clear title agricultural plot with fertile soil, water boring setup, and perimeter fencing.', price: 4000000, category: 'Plots', icon: '📐', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500' }
    ]
  },
  {
    id: 'realestate-modern-living',
    name: 'Modernist Living',
    industry: 'Real Estate',
    desc: 'Minimalist clean design featuring bold typography and elegant visual spacing for modern apartments.',
    icon: '🏠',
    brandIcon: '📐',
    tagline: 'Curated modern apartments and residential units.',
    primaryColor: '#4f46e5',
    secondaryColor: '#ec4899',
    bgColor: '#ffffff',
    textColor: '#1e293b',
    accentBg: '#f5f3ff',
    gradient: 'from-indigo-600 to-pink-500',
    bgGradClass: 'from-indigo-950 via-slate-900 to-slate-950',
    textColorClass: 'text-indigo-600',
    primaryBtnClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    sidebarBgClass: 'bg-slate-900 text-slate-100',
    heroImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000',
    bannerImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000',
    products: [
      { name: 'Luxury Penthouse Suite', description: 'Spacious penthouse with skyline view, private balcony, marble bathrooms, and smart home systems.', price: 85000000, category: 'Penthouse', icon: '🏢', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500' },
      { name: 'Urban Loft Apartment', description: 'Industrial loft featuring exposed brick walls, high ceilings, large windows, and open concept kitchen.', price: 18000000, category: 'Loft', icon: '🏠', imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=500' }
    ]
  }
];

export interface StoreTheme {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  previewImage: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  isPremium: boolean;
  icon: string;
  desc: string;
  bgColor: string;
  textColor: string;
  accentBg: string;
  gradient: string;
  bgGradClass: string;
  textColorClass: string;
  primaryBtnClass: string;
  sidebarBgClass: string;
  heroImageUrl: string;
  bannerImageUrl: string;
  tagline: string;
  products: {
    name: string;
    description: string;
    price: number;
    category: string;
    icon: string;
    imageUrl: string;
  }[];
  fontFamily?: string;
  cardStyle?: string;
  layoutStyle?: string;
  buttonRoundness?: string;
  bannerStyle?: string;
}

const themeAdjectives = ["Apex", "Zenith", "Vibe", "Classic", "Prime", "Elite", "Urban", "Sleek", "Minimal", "Pulse"];

const categoryColors: Record<string, [string, string][]> = {
  furniture: [
    ['#b45309', '#f59e0b'], ['#78350f', '#d97706'], ['#7c2d12', '#ea580c'], ['#1e293b', '#64748b'], ['#15803d', '#4ade80'],
    ['#0369a1', '#38bdf8'], ['#4338ca', '#818cf8'], ['#6d28d9', '#a78bfa'], ['#be185d', '#f472b6'], ['#0f172a', '#cbd5e1']
  ],
  fashion: [
    ['#ec4899', '#f472b6'], ['#db2777', '#f43f5e'], ['#9333ea', '#c084fc'], ['#be185d', '#fda4af'], ['#4f46e5', '#818cf8'],
    ['#0f172a', '#e2e8f0'], ['#1e1b4b', '#6366f1'], ['#312e81', '#a5b4fc'], ['#065f46', '#34d399'], ['#111827', '#9ca3af']
  ],
  electronics: [
    ['#3b82f6', '#93c5fd'], ['#2563eb', '#60a5fa'], ['#1d4ed8', '#3b82f6'], ['#06b6d4', '#67e8f9'], ['#0891b2', '#22d3ee'],
    ['#0f172a', '#94a3b8'], ['#0f766e', '#2dd4bf'], ['#4338ca', '#a5b4fc'], ['#0284c7', '#38bdf8'], ['#1e293b', '#cbd5e1']
  ],
  beauty: [
    ['#f472b6', '#fbcfe8'], ['#db2777', '#f472b6'], ['#be185d', '#fce7f3'], ['#ec4899', '#fda4af'], ['#a855f7', '#d8b4fe'],
    ['#d97706', '#fef08a'], ['#b45309', '#fde047'], ['#0f172a', '#cbd5e1'], ['#059669', '#6ee7b7'], ['#6366f1', '#c7d2fe']
  ],
  jewelry: [
    ['#d97706', '#fef08a'], ['#b45309', '#fde047'], ['#ca8a04', '#fef9c3'], ['#a16207', '#fde047'], ['#0f172a', '#e2e8f0'],
    ['#4338ca', '#818cf8'], ['#be185d', '#fbcfe8'], ['#0d9488', '#5eead4'], ['#65a30d', '#bef264'], ['#1e293b', '#94a3b8']
  ],
  books: [
    ['#6366f1', '#a5b4fc'], ['#4f46e5', '#c7d2fe'], ['#3730a3', '#818cf8'], ['#0f172a', '#e2e8f0'], ['#15803d', '#86efac'],
    ['#0369a1', '#7dd3fc'], ['#b45309', '#fde047'], ['#be185d', '#fbcfe8'], ['#6d28d9', '#c084fc'], ['#1e293b', '#cbd5e1']
  ],
  restaurant: [
    ['#ea580c', '#ffedd5'], ['#dc2626', '#fee2e2'], ['#b91c1c', '#fca5a5'], ['#ca8a04', '#fef9c3'], ['#15803d', '#dcfce7'],
    ['#0f172a', '#e2e8f0'], ['#4338ca', '#e0e7ff'], ['#0d9488', '#ccfbf1'], ['#65a30d', '#f1f8e9'], ['#1e293b', '#cbd5e1']
  ],
  pet: [
    ['#0284c7', '#e0f2fe'], ['#0369a1', '#bae6fd'], ['#0f766e', '#ccfbf1'], ['#15803d', '#dcfce7'], ['#b45309', '#fef3c7'],
    ['#d97706', '#ffedd5'], ['#6d28d9', '#f3e8ff'], ['#db2777', '#fce7f3'], ['#0f172a', '#f1f5f9'], ['#1e293b', '#cbd5e1']
  ],
  sports: [
    ['#dc2626', '#fca5a5'], ['#ea580c', '#fdba74'], ['#ca8a04', '#fde047'], ['#16a34a', '#86efac'], ['#2563eb', '#93c5fd'],
    ['#0f172a', '#e2e8f0'], ['#4338ca', '#c7d2fe'], ['#be185d', '#fda4af'], ['#0d9488', '#99f6e4'], ['#1e293b', '#cbd5e1']
  ],
  pharmacy: [
    ['#0d9488', '#ccfbf1'], ['#0f766e', '#99f6e4'], ['#0284c7', '#e0f2fe'], ['#2563eb', '#dbeafe'], ['#16a34a', '#dcfce7'],
    ['#0f172a', '#f1f5f9'], ['#4338ca', '#e0e7ff'], ['#6d28d9', '#f3e8ff'], ['#db2777', '#fce7f3'], ['#1e293b', '#cbd5e1']
  ],
  bakery: [
    ['#ca8a04', '#fef9c3'], ['#b45309', '#fef3c7'], ['#d97706', '#ffedd5'], ['#ea580c', '#ffedd5'], ['#be185d', '#fce7f3'],
    ['#0f172a', '#f1f5f9'], ['#15803d', '#dcfce7'], ['#6d28d9', '#f3e8ff'], ['#4338ca', '#e0e7ff'], ['#1e293b', '#cbd5e1']
  ],
  cafe: [
    ['#b45309', '#fde047'], ['#78350f', '#ffedd5'], ['#7c2d12', '#ffedd5'], ['#ca8a04', '#fef9c3'], ['#0f172a', '#e2e8f0'],
    ['#15803d', '#dcfce7'], ['#4338ca', '#e0e7ff'], ['#0d9488', '#ccfbf1'], ['#65a30d', '#f1f8e9'], ['#1e293b', '#cbd5e1']
  ],
  grocery: [
    ['#16a34a', '#dcfce7'], ['#15803d', '#bbf7d0'], ['#166534', '#86efac'], ['#65a30d', '#f1f8e9'], ['#ca8a04', '#fef9c3'],
    ['#0f172a', '#f1f5f9'], ['#0d9488', '#ccfbf1'], ['#0284c7', '#e0f2fe'], ['#4338ca', '#e0e7ff'], ['#1e293b', '#cbd5e1']
  ],
  'home-decor': [
    ['#b45309', '#fde047'], ['#78350f', '#ffedd5'], ['#475569', '#cbd5e1'], ['#0f172a', '#e2e8f0'], ['#15803d', '#dcfce7'],
    ['#4338ca', '#e0e7ff'], ['#0d9488', '#ccfbf1'], ['#be185d', '#fce7f3'], ['#6d28d9', '#f3e8ff'], ['#1e293b', '#cbd5e1']
  ],
  digital: [
    ['#2563eb', '#dbeafe'], ['#0284c7', '#e0f2fe'], ['#0891b2', '#cffafe'], ['#6d28d9', '#f3e8ff'], ['#4338ca', '#e0e7ff'],
    ['#0f172a', '#f1f5f9'], ['#16a34a', '#dcfce7'], ['#0d9488', '#ccfbf1'], ['#db2777', '#fce7f3'], ['#1e293b', '#cbd5e1']
  ],
  flower: [
    ['#e11d48', '#fecdd3'], ['#be185d', '#fbcfe8'], ['#059669', '#d1fae5'], ['#ca8a04', '#fef9c3'], ['#8b5cf6', '#ddd6fe'],
    ['#0f172a', '#e2e8f0'], ['#1e293b', '#cbd5e1'], ['#0891b2', '#cffafe'], ['#b45309', '#fef3c7'], ['#475569', '#e2e8f0']
  ],
  gift: [
    ['#d946ef', '#fdf4ff'], ['#db2777', '#fce7f3'], ['#ca8a04', '#fef9c3'], ['#10b981', '#d1fae5'], ['#2563eb', '#dbeafe'],
    ['#0f172a', '#f1f5f9'], ['#4f46e5', '#e0e7ff'], ['#e11d48', '#ffe4e6'], ['#7c2d12', '#ffedd5'], ['#3b82f6', '#eff6ff']
  ],
  kids: [
    ['#f43f5e', '#ffe4e6'], ['#06b6d4', '#ecfeff'], ['#eab308', '#fef9c3'], ['#10b981', '#d1fae5'], ['#8b5cf6', '#f3e8ff'],
    ['#ec4899', '#fdf2f8'], ['#f97316', '#ffedd5'], ['#3b82f6', '#eff6ff'], ['#14b8a6', '#f0fdfa'], ['#6366f1', '#e0e7ff']
  ],
  'mobile-accessories': [
    ['#3b82f6', '#eff6ff'], ['#14b8a6', '#f0fdfa'], ['#f59e0b', '#fef3c7'], ['#ef4444', '#fef2f2'], ['#8b5cf6', '#f3e8ff'],
    ['#0f172a', '#f8fafc'], ['#1e293b', '#cbd5e1'], ['#4b5563', '#f3f4f6'], ['#06b6d4', '#ecfeff'], ['#0891b2', '#cffafe']
  ],
  'computer-store': [
    ['#1d4ed8', '#dbeafe'], ['#0f766e', '#ccfbf1'], ['#4338ca', '#e0e7ff'], ['#1e293b', '#f3f4f6'], ['#0f172a', '#e2e8f0'],
    ['#b45309', '#ffedd5'], ['#be185d', '#fce7f3'], ['#0284c7', '#e0f2fe'], ['#6d28d9', '#f3e8ff'], ['#09090b', '#27272a']
  ],
  automotive: [
    ['#dc2626', '#ffe4e6'], ['#2563eb', '#dbeafe'], ['#1e293b', '#f3f4f6'], ['#0f172a', '#e2e8f0'], ['#ca8a04', '#fef9c3'],
    ['#15803d', '#dcfce7'], ['#475569', '#cbd5e1'], ['#7c2d12', '#ffedd5'], ['#0284c7', '#e0f2fe'], ['#06b6d4', '#ecfeff']
  ],
  'home-kitchen': [
    ['#f97316', '#ffedd5'], ['#ef4444', '#fef2f2'], ['#10b981', '#d1fae5'], ['#3b82f6', '#eff6ff'], ['#6b7280', '#f3f4f6'],
    ['#0f172a', '#e2e8f0'], ['#7c2d12', '#ffedd5'], ['#ca8a04', '#fef9c3'], ['#4338ca', '#e0e7ff'], ['#0d9488', '#ccfbf1']
  ],
  footwear: [
    ['#1e293b', '#f3f4f6'], ['#dc2626', '#ffe4e6'], ['#2563eb', '#dbeafe'], ['#0f172a', '#e2e8f0'], ['#b45309', '#ffedd5'],
    ['#db2777', '#fce7f3'], ['#10b981', '#d1fae5'], ['#4f46e5', '#e0e7ff'], ['#0891b2', '#cffafe'], ['#6366f1', '#e0e7ff']
  ],
  watches: [
    ['#b45309', '#fef3c7'], ['#1e293b', '#f3f4f6'], ['#0f172a', '#e2e8f0'], ['#15803d', '#dcfce7'], ['#0369a1', '#e0f2fe'],
    ['#4f46e5', '#e0e7ff'], ['#be185d', '#fce7f3'], ['#475569', '#cbd5e1'], ['#09090b', '#27272a'], ['#0d9488', '#ccfbf1']
  ],
  bags: [
    ['#7c2d12', '#ffedd5'], ['#b45309', '#fef3c7'], ['#1e293b', '#f3f4f6'], ['#0f172a', '#e2e8f0'], ['#0284c7', '#e0f2fe'],
    ['#db2777', '#fce7f3'], ['#4f46e5', '#e0e7ff'], ['#10b981', '#d1fae5'], ['#78350f', '#ffedd5'], ['#4b5563', '#f3f4f6']
  ],
  musical: [
    ['#b45309', '#fef3c7'], ['#7c2d12', '#ffedd5'], ['#4338ca', '#e0e7ff'], ['#1e293b', '#f3f4f6'], ['#0f172a', '#e2e8f0'],
    ['#0d9488', '#ccfbf1'], ['#be185d', '#fce7f3'], ['#10b981', '#d1fae5'], ['#6d28d9', '#f3e8ff'], ['#0891b2', '#cffafe']
  ],
  hardware: [
    ['#f59e0b', '#fef3c7'], ['#ef4444', '#fef2f2'], ['#1e293b', '#f3f4f6'], ['#0f172a', '#e2e8f0'], ['#3b82f6', '#eff6ff'],
    ['#10b981', '#d1fae5'], ['#6b7280', '#f3f4f6'], ['#7c2d12', '#ffedd5'], ['#0d9488', '#ccfbf1'], ['#4f46e5', '#e0e7ff']
  ],
  toys: [
    ['#f43f5e', '#ffe4e6'], ['#3b82f6', '#eff6ff'], ['#eab308', '#fef9c3'], ['#10b981', '#d1fae5'], ['#8b5cf6', '#f3e8ff'],
    ['#ec4899', '#fdf2f8'], ['#f97316', '#ffedd5'], ['#06b6d4', '#ecfeff'], ['#14b8a6', '#f0fdfa'], ['#6366f1', '#e0e7ff']
  ],
  'furniture-premium': [
    ['#1e293b', '#f3f4f6'], ['#b45309', '#fef3c7'], ['#7c2d12', '#ffedd5'], ['#0f172a', '#e2e8f0'], ['#4f46e5', '#e0e7ff'],
    ['#0d9488', '#ccfbf1'], ['#be185d', '#fce7f3'], ['#10b981', '#d1fae5'], ['#78350f', '#ffedd5'], ['#4b5563', '#f3f4f6']
  ],
  'organic-farm': [
    ['#16a34a', '#dcfce7'], ['#15803d', '#bbf7d0'], ['#ca8a04', '#fef9c3'], ['#65a30d', '#f1f8e9'], ['#0d9488', '#ccfbf1'],
    ['#0f172a', '#f1f5f9'], ['#b45309', '#fef3c7'], ['#e11d48', '#ffe4e6'], ['#7c2d12', '#ffedd5'], ['#3b82f6', '#eff6ff']
  ],
  courses: [
    ['#6366f1', '#e0e7ff'], ['#4f46e5', '#c7d2fe'], ['#06b6d4', '#ecfeff'], ['#1e293b', '#f3f4f6'], ['#0f172a', '#e2e8f0'],
    ['#10b981', '#d1fae5'], ['#d946ef', '#fdf4ff'], ['#f43f5e', '#ffe4e6'], ['#f59e0b', '#fef3c7'], ['#3b82f6', '#eff6ff']
  ],
  pod: [
    ['#ec4899', '#fdf2f8'], ['#10b981', '#d1fae5'], ['#3b82f6', '#eff6ff'], ['#f97316', '#ffedd5'], ['#8b5cf6', '#f3e8ff'],
    ['#ef4444', '#fef2f2'], ['#06b6d4', '#ecfeff'], ['#0f172a', '#e2e8f0'], ['#1e293b', '#cbd5e1'], ['#6366f1', '#e0e7ff']
  ],
  handmade: [
    ['#b45309', '#fef3c7'], ['#7c2d12', '#ffedd5'], ['#d97706', '#ffedd5'], ['#10b981', '#d1fae5'], ['#6d28d9', '#f3e8ff'],
    ['#0f172a', '#f1f5f9'], ['#e11d48', '#ffe4e6'], ['#ca8a04', '#fef9c3'], ['#0891b2', '#cffafe'], ['#475569', '#cbd5e1']
  ],
  art: [
    ['#7f1d1d', '#fca5a5'], ['#4f46e5', '#e0e7ff'], ['#0f172a', '#e2e8f0'], ['#6d28d9', '#f3e8ff'], ['#ca8a04', '#fef9c3'],
    ['#0d9488', '#ccfbf1'], ['#be185d', '#fce7f3'], ['#1e293b', '#cbd5e1'], ['#09090b', '#27272a'], ['#b45309', '#fef3c7']
  ],
  medical: [
    ['#0284c7', '#e0f2fe'], ['#0d9488', '#ccfbf1'], ['#16a34a', '#dcfce7'], ['#2563eb', '#dbeafe'], ['#0f172a', '#f1f5f9'],
    ['#4338ca', '#e0e7ff'], ['#6d28d9', '#f3e8ff'], ['#db2777', '#fce7f3'], ['#1e293b', '#cbd5e1'], ['#6366f1', '#e0e7ff']
  ],
  wholesale: [
    ['#1e293b', '#f3f4f6'], ['#475569', '#cbd5e1'], ['#3b82f6', '#eff6ff'], ['#10b981', '#d1fae5'], ['#0f172a', '#e2e8f0'],
    ['#7c2d12', '#ffedd5'], ['#ca8a04', '#fef9c3'], ['#2563eb', '#dbeafe'], ['#0d9488', '#ccfbf1'], ['#6b7280', '#f3f4f6']
  ],
  marketplace: [
    ['#6366f1', '#e0e7ff'], ['#8b5cf6', '#f3e8ff'], ['#3b82f6', '#eff6ff'], ['#0f172a', '#e2e8f0'], ['#10b981', '#d1fae5'],
    ['#ec4899', '#fdf2f8'], ['#f97316', '#ffedd5'], ['#0d9488', '#ccfbf1'], ['#1e293b', '#cbd5e1'], ['#ca8a04', '#fef9c3']
  ],
  scratch: [
    ['#475569', '#cbd5e1'], ['#1e293b', '#94a3b8'], ['#0f172a', '#64748b'], ['#334155', '#475569'], ['#000000', '#ffffff'],
    ['#64748b', '#cbd5e1'], ['#94a3b8', '#e2e8f0'], ['#cbd5e1', '#f1f5f9'], ['#cbd5e1', '#f8fafc'], ['#e2e8f0', '#ffffff']
  ]
};

const categoryProducts: Record<string, { name: string; description: string; price: number; category: string; icon: string; imageUrl: string }[]> = {
  fashion: [
    { name: 'Oversized Denim Jacket', description: 'Premium heavy washed cotton denim jacket with utility chest pockets.', price: 2499, category: 'Outwear', icon: '🧥', imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400' },
    { name: 'Ribbed Knit Midi Dress', description: 'Slim fit stretchy knit fabric dress with an elegant side slit detail.', price: 1899, category: 'Dresses', icon: '👗', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
    { name: 'Minimalist Leather Sneakers', description: 'Full grain leather sneakers with vulcanized rubber soles.', price: 3499, category: 'Footwear', icon: '👟', imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' }
  ],
  electronics: [
    { name: 'Wireless Noise-Cancelling Headphones', description: 'Smart ambient sound profile, high-res audio drivers.', price: 8999, category: 'Audio', icon: '🎧', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
    { name: 'Smart Fitness Band v5', description: 'Tracks oxygen levels, sleep monitoring, heart rate telemetry.', price: 2999, category: 'Wearables', icon: '⌚', imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
    { name: 'Mechanical Gaming Keyboard', description: 'Cherry MX Red switches, full dynamic RGB backlight layout.', price: 4499, category: 'Peripherals', icon: '⌨️', imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400' }
  ],
  grocery: [
    { name: 'Organic Raw Honey', description: 'Directly sourced from organic bee farms, unfiltered and raw.', price: 450, category: 'Pantry', icon: '🍯', imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400' },
    { name: 'Fresh Organic Avocados', description: 'Rich in healthy fats, fresh and ready for guacamole dishes.', price: 350, category: 'Produce', icon: '🥑', imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400' },
    { name: 'Whole Grain Sourdough Bread', description: 'Freshly baked using traditional wild starters, rich texture.', price: 180, category: 'Bakery', icon: '🍞', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' }
  ],
  furniture: [
    { name: 'Scandinavian Lounge Chair', description: 'Solid oak wood frame, premium fabric upholstery seat cushions.', price: 8999, category: 'Living Room', icon: '🛋️', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400' },
    { name: 'Minimalist Wooden Desk', description: 'Sleek tabletop workspace, integrated storage drawer panels.', price: 12999, category: 'Office', icon: '💻', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400' },
    { name: 'Modern Brass Floor Lamp', description: 'Adjustable light projection angle, heavy marble base.', price: 3499, category: 'Lighting', icon: '💡', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400' }
  ],
  jewelry: [
    { name: 'Solitaire Diamond Ring', price: 49999, description: 'GIA-certified 0.5-carat round brilliant cut diamond on platinum band.', category: 'Rings', icon: '💍', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400' },
    { name: '18k Gold Chain Necklace', price: 18999, description: 'Classic link chain design in premium solid yellow gold styling.', category: 'Necklaces', icon: '📿', imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' },
    { name: 'Pearl Drop Earrings', price: 7499, description: 'Cultured fresh-water pearls on sterling silver drop backings.', category: 'Earrings', icon: '💎', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' }
  ],
  beauty: [
    { name: 'Hydrating Face Serum', price: 1299, description: 'Infused with double hyaluronic acid and vitamin B5 matrices.', category: 'Skincare', icon: '🧴', imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400' },
    { name: 'Matte Liquid Lipstick', price: 899, description: 'Long-wear transfer-proof formulation in classic rouge pink.', category: 'Makeup', icon: '💄', imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400' },
    { name: 'Clay Detox Face Mask', price: 799, description: 'Bentonite clay and active green tea extracts for pores.', category: 'Skincare', icon: '🧖‍♀️', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' }
  ],
  pharmacy: [
    { name: 'Premium Multi-Vitamins', price: 950, description: 'Daily organic supplements for general energy and defense support.', category: 'Wellness', icon: '💊', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    { name: 'Digital Blood Pressure Monitor', price: 2499, description: 'Fully automatic oscillometric inflation, memory logs.', category: 'Devices', icon: '🩺', imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400' },
    { name: 'Infrared Thermometer', price: 1899, description: 'Instant forehead non-contact sensor readings.', category: 'Devices', icon: '🌡️', imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400' }
  ],
  pet: [
    { name: 'Premium Grain-Free Dog Kibble', price: 1499, description: 'Real deboned chicken recipe, high protein active energy.', category: 'Food', icon: '🍖', imageUrl: 'https://images.unsplash.com/photo-1589722254388-912c70030588?w=400' },
    { name: 'Interactive Cat Laser Toy', price: 499, description: 'Automated rotation program to keep cats physically active.', category: 'Toys', icon: '🐭', imageUrl: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400' },
    { name: 'Memory Foam Pet Bed', price: 2999, description: 'Pressure-relieving orthopedic foam core with washable cover.', category: 'Beds', icon: '🛏️', imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=400' }
  ],
  books: [
    { name: 'The Art of Typography', price: 699, description: 'A comprehensive study of editorial layouts and print design history.', category: 'Books', icon: '📖', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
    { name: 'Leather Hardcover Journal', price: 499, description: 'Unlined parchment sheets bound in handmade leather wraps.', category: 'Stationery', icon: '📓', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400' },
    { name: 'Calligraphy Set with Ink', price: 1299, description: 'Handcrafted wood holder, 5 brass nib varieties, black ink.', category: 'Stationery', icon: '✒️', imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400' }
  ],
  sports: [
    { name: 'Smart GPS Sports Watch', price: 14999, description: 'Barometric altimeter, optical heart sensor, dynamic workout tracking.', category: 'Gear', icon: '⌚', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400' },
    { name: 'Trail Running Shoes', price: 4500, description: 'Waterproof gore-tex membrane, heavy lugged carbon rubber outsoles.', category: 'Footwear', icon: '👟', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
    { name: 'Adjustable Dumbbell Pair (20kg)', price: 6999, description: 'Steel plate selectors, textured rubber anti-slip grip handle bar.', category: 'Gear', icon: '🏋️‍♂️', imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400' }
  ],
  restaurant: [
    { name: 'Double Cheese Grilled Burger', price: 250, description: 'Flame grilled double chicken patties, premium cheddar cheese, sesame buns.', category: 'Burgers', icon: '🍔', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
    { name: 'Wood-fired Pepperoni Pizza', price: 450, description: 'Classic Neapolitan sourdough crust, marinara, beef pepperoni, fresh basil.', category: 'Pizza', icon: '🍕', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
    { name: 'Crispy Peri Peri Fries', price: 150, description: 'Fresh cut potato wedges fried crisp, tossed in hot peri peri spices.', category: 'Sides', icon: '🍟', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400' }
  ],
  bakery: [
    { name: 'Belgian Chocolate Fudge Cake', price: 850, description: 'Rich layers of dark chocolate sponge and silky chocolate ganache frosting.', category: 'Cakes', icon: '🎂', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
    { name: 'Butter Croissants pack', price: 220, description: 'Golden flaky layered puff pastry baked fresh using premium French butter.', category: 'Pastry', icon: '🥐', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
    { name: 'Red Velvet cupcakes', price: 300, description: 'Classic red cocoa cupcakes topped with silky vanilla cream cheese swirl.', category: 'Cupcakes', icon: '🧁', imageUrl: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400' }
  ],
  cafe: [
    { name: 'House Blend Espresso Roast', price: 450, description: 'Medium-dark roast whole beans with tasting notes of hazelnut and cacao.', category: 'Beans', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400' },
    { name: 'Iced Salted Caramel Latte', price: 280, description: 'Espresso pulled over cold milk and sweet caramel, served over ice.', category: 'Drinks', icon: '🥤', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400' },
    { name: 'Ceramic Pour Over Dripper', price: 1200, description: 'Traditional ceramic V60 design for manual slow drip coffee brewing.', category: 'Gear', icon: '🏺', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400' }
  ],
  'home-decor': [
    { name: 'Ceramic Dried Flower Vase', price: 890, description: 'Handcrafted stoneware vase with a rustic textured white glaze.', category: 'Vases', icon: '🏺', imageUrl: 'https://images.unsplash.com/photo-1581781870027-04212e231e96?w=400' },
    { name: 'Geometric Throw Cushion', price: 450, description: 'Cotton linen cushion cover featuring minimalist modern print panels.', category: 'Cushions', icon: '🛋️', imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400' },
    { name: 'Scented Soy Wax Candle', price: 650, description: 'Natural soy wax candle infused with lavender and amber essential oils.', category: 'Candles', icon: '🕯️', imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400' }
  ],
  flower: [
    { name: 'Red Rose Romance Bouquet', price: 999, description: 'A bouquet of 12 fresh premium red roses wrapped in dynamic mesh.', category: 'Bouquets', icon: '🌹', imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500' },
    { name: 'Desert Succulent Garden', price: 599, description: 'Pre-assembled miniature indoor desert succulents in a marble bowl.', category: 'Plants', icon: '🌵', imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=500' },
    { name: 'White Lily Glass Vase', price: 1299, description: 'Stunning white lilies set in a transparent hand-blown glass vase.', category: 'Vases', icon: '🏺', imageUrl: 'https://images.unsplash.com/photo-1581781870027-04212e231e96?w=500' }
  ],
  gift: [
    { name: 'Gourmet Chocolate Basket', price: 1999, description: 'Curated premium chocolates, wafers, and nuts in a woven wicker basket.', category: 'Baskets', icon: '🧺', imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500' },
    { name: 'Customized Ceramic Mug Set', price: 799, description: 'Pair of custom monogrammed matte finish coffee mugs.', category: 'Mugs', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500' },
    { name: 'Amber Glow Scented Candle Set', price: 1499, description: 'Three organic soy wax candles infused with premium botanical oils.', category: 'Candles', icon: '🕯️', imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500' }
  ],
  kids: [
    { name: 'Baby Cotton Bodysuit Pack', price: 899, description: 'Three breathable organic cotton bodysuits with lap shoulders.', category: 'Apparel', icon: '👶', imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=500' },
    { name: 'Wooden Rainbow Stacking Toy', price: 699, description: 'Safe non-toxic wooden stacking arches for cognitive coordination.', category: 'Toys', icon: '🧸', imageUrl: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=500' },
    { name: 'Stars & Clouds Crib Sheets', price: 1299, description: 'Soft, fitted cotton sheets designed for standard nursery crib sizes.', category: 'Nursery', icon: '🛏️', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500' }
  ],
  'mobile-accessories': [
    { name: 'Clear Magnetic Phone Case', price: 999, description: 'High-impact clear case with integrated magnets for wireless charging.', category: 'Cases', icon: '📱', imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500' },
    { name: 'Fast Auto-Clamp Car Charger', price: 1899, description: 'Dashboard mounted wireless charging dock with automatic locking sensor.', category: 'Chargers', icon: '🔌', imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500' },
    { name: 'Pro LED Ring Light Tripod', price: 2499, description: '10-inch desktop ring light with 3 modes and an adjustable tripod stand.', category: 'Studio', icon: '📸', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500' }
  ],
  'computer-store': [
    { name: 'Ultra-Wide Curved IPS Monitor', price: 28999, description: '34-inch curved screen featuring 144Hz refresh rate and HDR10 support.', category: 'Monitors', icon: '🖥️', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500' },
    { name: 'Ergonomic Mesh Task Chair', price: 14999, description: 'Adjustable 3D lumbar support, mesh backing, and padded headrest.', category: 'Furniture', icon: '🪑', imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500' },
    { name: 'Dual-Screen USB-C Docking Station', price: 4999, description: 'Aluminum hub with dual HDMI ports, Ethernet, and card reader.', category: 'Hubs', icon: '💻', imageUrl: 'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=500' }
  ],
  automotive: [
    { name: 'Elite Carnauba Liquid Wax', price: 799, description: 'Premium grade carnauba wax providing long-lasting mirror shine.', category: 'Care', icon: '🧼', imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=500' },
    { name: 'OBD2 Pro Diagnostic Scanner', price: 3499, description: 'Reads and clears engine trouble codes, checks emission readiness.', category: 'Tools', icon: '⚙️', imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500' },
    { name: 'HEPA Smart Car Air Purifier', price: 1899, description: 'Compact cup-holder size purifier with active carbon odor filters.', category: 'Accessories', icon: '🍃', imageUrl: 'https://images.unsplash.com/photo-1504215680048-db15dd059536?w=500' }
  ],
  'home-kitchen': [
    { name: 'Smart Digital XL Air Fryer', price: 7999, description: '6-liter capacity with 8 one-touch cooking presets and recipe books.', category: 'Appliances', icon: '🍳', imageUrl: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=500' },
    { name: 'Ceramic Non-Stick Fry Pan', price: 1899, description: 'Eco-friendly chemical-free ceramic non-stick layer on aluminum core.', category: 'Cookware', icon: '🍳', imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500' },
    { name: 'Damascus Steel Chef Knife Set', price: 4499, description: 'Three piece razor-sharp professional knives with pakkawood handles.', category: 'Cutlery', icon: '🔪', imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500' }
  ],
  footwear: [
    { name: 'AeroCushion Running Sneakers', price: 3999, description: 'Breathable knit mesh upper, thick responsive foam footbed.', category: 'Athletic', icon: '👟', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
    { name: 'Premium Leather Penny Loafers', price: 4999, description: 'Hand-stitched genuine leather loafers with cushioned orthotic soles.', category: 'Formal', icon: '👞', imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500' },
    { name: 'Urban Trail Comfort Sandals', price: 1899, description: 'Adjustable velcro straps, contoured rubber grip sole panels.', category: 'Casual', icon: '👡', imageUrl: 'https://images.unsplash.com/photo-1603487988353-c8e4b3e68a9a?w=500' }
  ],
  watches: [
    { name: 'Chronograph Leather Sport Watch', price: 7999, description: 'Waterproof tachymeter watch with genuine calfskin strap loops.', category: 'Sports', icon: '⌚', imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500' },
    { name: 'Classic Minimalist Quartz Watch', price: 4599, description: 'Sleek white dial watch with mesh stainless steel strap design.', category: 'Classic', icon: '⌚', imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500' },
    { name: 'Skeleton Automatic Mechanical Watch', price: 18999, description: 'Intricate visible gear movement, self-winding premium luxury.', category: 'Luxury', icon: '⌚', imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500' }
  ],
  bags: [
    { name: 'Vintage Leather Travel Duffle', price: 5499, description: 'Spacious main compartment made from full-grain vegetable-tanned leather.', category: 'Travel', icon: '💼', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
    { name: 'Anti-Theft Laptop Backpack', price: 2999, description: 'Hidden zipper layouts, TSA locks, built-in USB portal access.', category: 'Backpacks', icon: '🎒', imageUrl: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500' },
    { name: 'Minimalist Saffiano Crossbody', price: 3499, description: 'Textured scratch-resistant leather bag with adjustable gold chain.', category: 'Handbags', icon: '👜', imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500' }
  ],
  musical: [
    { name: 'Solid Spruce Acoustic Guitar', price: 8999, description: 'Dreadnought body shape with spruce top, rich warm acoustic resonance.', category: 'String', icon: '🎸', imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500' },
    { name: '61-Key Digital Arranger Keyboard', price: 12999, description: 'Touch sensitive keys, 400 tones, built-in lesson interfaces.', category: 'Keyboards', icon: '🎹', imageUrl: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=500' },
    { name: 'Mahogany Concert Ukulele Kit', price: 2499, description: 'Includes tuner, gig bag, and learning booklet, mahogany body.', category: 'String', icon: '🎻', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500' }
  ],
  hardware: [
    { name: '20V Max Cordless Drill Set', price: 4499, description: 'Variable speed trigger, 22 torque configurations, two batteries.', category: 'Power Tools', icon: '🛠️', imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500' },
    { name: 'Steel Heavy-Duty Tool Chest', price: 2999, description: 'Multi-compartment locking toolbox with comfortable grip metal handle.', category: 'Storage', icon: '🧰', imageUrl: 'https://images.unsplash.com/photo-1530124560072-aae937ad8ff3?w=500' },
    { name: 'Precision Magnetic Screwdriver Kit', price: 999, description: '60 alloy steel bits in a sleek push-to-open locking case.', category: 'Hand Tools', icon: '🪛', imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500' }
  ],
  toys: [
    { name: 'Smart STEM Coding Robot', price: 3499, description: 'App-controlled robot kit teaching graphical coding logic structures.', category: 'STEM', icon: '🤖', imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=500' },
    { name: 'Wooden Animal Stacking Puzzle', price: 599, description: 'Eco-friendly wooden shapes in bright non-toxic paint layers.', category: 'Wooden', icon: '🧩', imageUrl: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=500' },
    { name: 'High-Speed Offroad RC Buggy', price: 2499, description: '2.4GHz control system, independent shock suspensions, 20km/h speed.', category: 'RC', icon: '🚗', imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500' }
  ],
  'furniture-premium': [
    { name: 'Velvet Mid-Century Accent Sofa', price: 34999, description: 'Rich velvet upholstery, solid eucalyptus wood frame, tapered gold legs.', category: 'Living Room', icon: '🛋️', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500' },
    { name: 'Carrara Marble Coffee Table', price: 14999, description: 'Hexagonal polished marble tabletop on black steel geometric cage.', category: 'Living Room', icon: '🪑', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500' },
    { name: 'Orthopedic Leather Recliner Chair', price: 18999, description: 'Full grain leather recliner with massage nodes and footrest.', category: 'Office', icon: '🪑', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500' }
  ],
  'organic-farm': [
    { name: 'Fresh Farm Strawberry Basket', price: 350, description: 'Sweet, organic strawberries harvested at sunrise from eco-farm fields.', category: 'Produce', icon: '🍓', imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500' },
    { name: 'Artisanal Fresh Goat Cheese', price: 490, description: 'Creamy, log-shaped goat cheese made using traditional farm recipes.', category: 'Dairy', icon: '🧀', imageUrl: 'https://images.unsplash.com/photo-1486887396153-fa416525c108?w=500' },
    { name: 'Raw Clover Honeycomb Block', price: 650, description: 'Pure, unprocessed honey sealed in its original wax comb cells.', category: 'Pantry', icon: '🍯', imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500' }
  ],
  digital: [
    { name: 'Lightroom Pro Presets Pack', price: 1500, description: '10 custom professional presets for clean lifestyle and portrait color tones.', category: 'Presets', icon: '📸', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400' },
    { name: 'React Next.js Admin Boilerplate', price: 2999, description: 'Tailwind and React dashboard framework containing 30 prebuilt layouts.', category: 'Templates', icon: '📊', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400' },
    { name: 'SaaS Figma UI Landing Kit', price: 4500, description: 'Complete Figma design library for modern multi-purpose homepages.', category: 'Kits', icon: '🎨', imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400' }
  ],
  courses: [
    { name: 'React Next.js Masterclass Bootcamp', price: 4999, description: '12-week immersive course covering server components, authentication, and SSR.', category: 'Development', icon: '🎓', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500' },
    { name: 'Advanced Digital Marketing Strategy', price: 3499, description: 'Master SEO, meta pixel configurations, email outreach, and conversion analysis.', category: 'Marketing', icon: '📈', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500' },
    { name: 'Figma UI/UX Design System Guide', price: 2499, description: 'Build responsive web design systems from auto-layout grids to prototypes.', category: 'Design', icon: '🎨', imageUrl: 'https://images.unsplash.com/photo-1581291518655-9523c932ded7?w=500' }
  ],
  pod: [
    { name: 'Custom Graphic Urban Hoodie', price: 2299, description: 'Premium heavyweight cotton hoodie printed with customizable graphics.', category: 'Hoodies', icon: '🧥', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' },
    { name: 'Printed Ceramic Tea Mug', price: 499, description: 'Matte black ceramic mug with custom sublimation wrap design options.', category: 'Mugs', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500' },
    { name: 'Embroidered Heavy Canvas Tote', price: 899, description: 'Thick canvas tote bag featuring high-density custom embroidery.', category: 'Bags', icon: '👜', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500' }
  ],
  handmade: [
    { name: 'Hand-Woven Sunset Tapestry', price: 3499, description: 'Minimalist geometric wall art woven from organic wool and cotton.', category: 'Decor', icon: '🖼️', imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500' },
    { name: 'Hand-Carved Walnut Salad Bowl', price: 1899, description: 'Food-safe carved wooden bowl treated with organic linseed oils.', category: 'Kitchen', icon: '🥣', imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500' },
    { name: 'Hand-Thrown Ceramic Coffee Mug', price: 799, description: 'Stoneware mug with a beautiful glossy running glaze texture.', category: 'Mugs', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500' }
  ],
  art: [
    { name: 'Oil Landscape Painting Canvas', price: 14999, description: 'Original textured oil painting depicting mountain ridges at sunset.', category: 'Paintings', icon: '🎨', imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500' },
    { name: 'Abstract Stone Table Sculpture', price: 8999, description: 'Handcrafted abstract sculpture made from premium white limestone.', category: 'Sculptures', icon: '🗿', imageUrl: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=500' },
    { name: 'Fine Art Photography Print', price: 2499, description: 'Archival quality print of a misty forest landscape, unframed.', category: 'Prints', icon: '🖼️', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500' }
  ],
  medical: [
    { name: 'Digital Fingertip Pulse Oximeter', price: 1499, description: 'Accurately monitors SpO2 levels and pulse rate, LED screen.', category: 'Devices', icon: '🩺', imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500' },
    { name: 'Graduated Compression Leg Socks', price: 799, description: 'Promotes leg circulation and reduces swelling during recovery.', category: 'Wellness', icon: '🧦', imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500' },
    { name: 'Pro First Aid Emergency Box', price: 2999, description: 'Complete 150-piece medical kit in a secure red steel locking box.', category: 'Wellness', icon: '📦', imageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446ddd?w=500' }
  ],
  wholesale: [
    { name: 'Bulk Cotton Blank Tees (50-Pack)', price: 18999, description: 'Pack of 50 wholesale preshrunk cotton t-shirts in mixed sizes.', category: 'Apparel', icon: '📦', imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500' },
    { name: 'Wholesale Kraft Shopping Bags (500-Pack)', price: 4499, description: 'Box of 500 recyclable brown kraft paper bags with handles.', category: 'Packaging', icon: '🛍️', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500' },
    { name: 'Bulk LED E27 Light Bulbs (100-Pack)', price: 7999, description: 'Pack of 100 energy saving daylight white LED bulbs.', category: 'Lighting', icon: '💡', imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=500' }
  ],
  marketplace: [
    { name: 'Multi-Vendor Smart Tech Bundle', price: 18999, description: 'Curated audio and wearable gadgets from multiple certified vendor partners.', category: 'Electronics', icon: '📦', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
    { name: 'Marketplace Boutique Collection Pack', price: 9999, description: 'A mixed box of accessories and apparel curated from local boutiques.', category: 'Fashion', icon: '🛍️', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500' },
    { name: 'Gourmet Artisan Food Box', price: 3499, description: 'Direct marketplace farm products, cheeses, honey, and snacks.', category: 'Grocery', icon: '🍇', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500' }
  ],
  scratch: [
    { name: 'Blank Custom Product A', price: 100, description: 'Customize pricing, categories, and images inside the admin manager panel.', category: 'Custom', icon: '📦', imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400' },
    { name: 'Blank Custom Product B', price: 200, description: 'Customize pricing, categories, and images inside the admin manager panel.', category: 'Custom', icon: '📦', imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400' },
    { name: 'Blank Custom Product C', price: 300, description: 'Customize pricing, categories, and images inside the admin manager panel.', category: 'Custom', icon: '📦', imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400' }
  ]
};

const categoryIcons: Record<string, string> = {
  furniture: '🛋️', fashion: '👗', electronics: '💻', beauty: '💄', jewelry: '💍',
  books: '📚', restaurant: '🍔', pet: '🐕', sports: '🚴', pharmacy: '⚕️',
  bakery: '🍰', cafe: '☕', grocery: '🍎', 'home-decor': '🖼️', digital: '💾',
  flower: '💐', gift: '🎁', kids: '🧸', 'mobile-accessories': '📱', 'computer-store': '🖥️',
  automotive: '🚗', 'home-kitchen': '🍳', footwear: '👟', watches: '⌚', bags: '👜',
  musical: '🎸', hardware: '🛠️', toys: '🤖', 'furniture-premium': '🛋️', 'organic-farm': '🚜',
  courses: '🎓', pod: '👕', handmade: '🏺', art: '🎨', medical: '🩺', wholesale: '🏢',
  marketplace: '🌐', scratch: '🛠'
};

export const ALL_THEMES_160: StoreTheme[] = [];

// Custom typography selection matching adjectives
const themeFonts = [
  "Plus Jakarta Sans", "Outfit", "Sora", "Syne", "Playfair Display", 
  "Cinzel", "Montserrat", "Inter", "Cabinet Grotesk", "Satoshi"
];

// Custom card styling matching adjectives
const themeCardStyles = [
  "classic-bordered", "glassmorphic", "bold-shadow", "minimalist",
  "classic-bordered", "glassmorphic", "bold-shadow", "minimalist",
  "classic-bordered", "glassmorphic"
];

// Custom layout styling matching adjectives
const themeLayoutStyles = [
  "modern-grid", "asymmetric-split", "editorial-carousel", "minimal-masonry",
  "modern-grid", "asymmetric-split", "editorial-carousel", "minimal-masonry",
  "modern-grid", "asymmetric-split"
];

// Button roundness matching adjectives
const themeButtonRoundness = [
  "rounded-lg", "rounded-2xl", "rounded-full", "rounded-none",
  "rounded-lg", "rounded-2xl", "rounded-full", "rounded-none",
  "rounded-lg", "rounded-2xl"
];

// Hero banner styling matching adjectives
const themeBannerStyles = [
  "gradient-mesh", "editorial-split", "minimal-outline", "glass-card",
  "gradient-mesh", "editorial-split", "minimal-outline", "glass-card",
  "gradient-mesh", "editorial-split"
];

Object.keys(categoryColors).forEach((cat) => {
  const colorsList = categoryColors[cat];
  const capitalizedCat = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-./g, x => ' ' + x[1].toUpperCase());
  const icon = categoryIcons[cat] || '🛍️';
  
  for (let i = 0; i < 10; i++) {
    const adj = themeAdjectives[i];
    const [primary, secondary] = colorsList[i] || ['#6366f1', '#a5b4fc'];
    const id = `${cat}-${i + 1}`;
    
    // Assign professional stock images matching category
    let img = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80';
    if (cat === 'fashion') {
      img = `https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'electronics') {
      img = `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'grocery') {
      img = `https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'furniture' || cat === 'furniture-premium') {
      img = `https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'jewelry') {
      img = `https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'beauty') {
      img = `https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'pharmacy' || cat === 'medical') {
      img = `https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'pet') {
      img = `https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'books') {
      img = `https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'sports') {
      img = `https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'restaurant') {
      img = `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'bakery') {
      img = `https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'cafe') {
      img = `https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'home-decor' || cat === 'handmade') {
      img = `https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'digital' || cat === 'courses') {
      img = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'flower') {
      img = `https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'gift') {
      img = `https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'kids' || cat === 'toys') {
      img = `https://images.unsplash.com/photo-1515488042361-404e9250afef?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'mobile-accessories') {
      img = `https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'computer-store') {
      img = `https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'automotive') {
      img = `https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'home-kitchen') {
      img = `https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'footwear') {
      img = `https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'watches') {
      img = `https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'bags' || cat === 'pod' || cat === 'wholesale') {
      img = `https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'musical') {
      img = `https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'hardware') {
      img = `https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'organic-farm') {
      img = `https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'art') {
      img = `https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'marketplace') {
      img = `https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80`;
    } else if (cat === 'scratch') {
      img = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=80`;
    }

    ALL_THEMES_160.push({
      id,
      name: `${capitalizedCat} ${adj}`,
      category: cat,
      thumbnail: img,
      previewImage: img,
      primaryColor: primary,
      secondaryColor: secondary,
      description: `A premium professional theme preset designed for ${cat} retail stores.`,
      isPremium: i % 3 === 0,
      icon,
      desc: `Elegant and modern ${cat} layout featuring responsive headers, catalog builders, and checkout workflows.`,
      bgColor: '#0f172a',
      textColor: '#ffffff',
      accentBg: `${primary}15`,
      gradient: `from-[${primary}] to-[${secondary}]`,
      bgGradClass: `from-slate-900 via-slate-900 to-slate-950`,
      textColorClass: `text-[${primary}]`,
      primaryBtnClass: `bg-[${primary}] hover:scale-105 text-white`,
      sidebarBgClass: 'bg-slate-900 text-slate-100',
      heroImageUrl: img,
      bannerImageUrl: img,
      tagline: `Powering ${capitalizedCat} digital commerce.`,
      products: categoryProducts[cat] || [],
      fontFamily: themeFonts[i],
      cardStyle: themeCardStyles[i],
      layoutStyle: themeLayoutStyles[i],
      buttonRoundness: themeButtonRoundness[i],
      bannerStyle: themeBannerStyles[i]
    });
  }
});
