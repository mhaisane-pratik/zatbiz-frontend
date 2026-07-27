'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ALL_THEMES_160 } from '@/app/dashboard/themesData';
import { api } from '@/services/api';
import { getEcomThemes } from '@/components/preview/ecommerce/ecomThemeVariants';
import EcommerceFullPreview from '@/components/preview/ecommerce/EcommerceFullPreview';

interface EcommerceCategory {
  storeTypeId: number;
  id: string;
  name: string;
  icon: string;
  desc: string;
  image: string;
}

export const ECOMMERCE_CATEGORIES: EcommerceCategory[] = [
 {
  storeTypeId: 1,
  id: 'fashion',
  name: 'Fashion & Boutique',
  icon: '👗',
  desc: 'Clothing apparel, streetwear, collections, garments, and active footwear.',
  image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80'
},
{
  storeTypeId: 2,
  id: 'electronics',
  name: 'Electronics & Tech',
  icon: '💻',
  desc: 'Digital gadgets, mobile accessories, computer hardware, and smart appliances.',
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
},
{
  storeTypeId: 3,
  id: 'grocery',
  name: 'Grocery & Organic Store',
  icon: '🍎',
  desc: 'Fresh farm produce, health foods, coffee roasters, and bakery sweets.',
  image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80'
},
{
  storeTypeId: 4,
  id: 'furniture',
  name: 'Furniture & Decor',
  icon: '🛋️',
  desc: 'Scandinavian furniture, modern lightings, and minimalist interiors.',
  image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80'
},
{
  storeTypeId: 5,
  id: 'jewelry',
  name: 'Jewelry & Luxury',
  icon: '💍',
  desc: 'Diamond rings, luxury gold chains, necklaces, and GIA-certified accessories.',
  image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80'
},
{
  storeTypeId: 6,
  id: 'beauty',
  name: 'Cosmetics & Beauty',
  icon: '💄',
  desc: 'Nourishing skincare, cosmetic items, spa oils, and beauty products.',
  image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80'
},
{
  storeTypeId: 7,
  id: 'pharmacy',
  name: 'Pharmacy & Wellness',
  icon: '⚕️',
  desc: 'First-aid, vitamins, daily supplements, and prescription medications.',
  image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&auto=format&fit=crop&q=80'
},
{
  storeTypeId: 8,
  id: 'pet',
  name: 'Pet Supplies Store',
  icon: '🐕',
  desc: 'Pet food kibbles, chew toys, scratching posts, and grooming gear.',
  image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80'
},
{
  storeTypeId: 9,
  id: 'books',
  name: 'Bookstore & Stationery',
  icon: '📚',
  desc: 'Novels, journals, calligraphy pens, notebooks, and school stationery.',
  image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80'
},
{
  storeTypeId: 10,
  id: 'sports',
  name: 'Sporting & Outdoors',
  icon: '🚴',
  desc: 'Fitness trackers, sports cycles, running shoes, and active tracksuits.',
  image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80'
},

  {
    storeTypeId: 11,
    id: 'restaurant',
    name: 'Restaurant & Diner',
    icon: '🍔',
    desc: 'Bacon cheese burgers, pepperoni pizzas, French fries, and soda refreshments.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId: 12,
    id: 'bakery',
    name: 'Bakery & Sweets',
    icon: '🍰',
    desc: 'Fudge chocolate cakes, fresh warm croissants, and red velvet cupcakes.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:13,
    id: 'cafe',
    name: 'Cafe & Roasters',
    icon: '☕',
    desc: 'Brewed drip coffee beans, espresso shots, iced caramel lattes, and teapots.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:14,
    id: 'home-decor',
    name: 'Home Decor & Crafts',
    icon: '🖼️',
    desc: 'Ceramic dried flower vases, geometric throw cushions, and scented soy candles.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:15,
    id: 'digital',
    name: 'Digital Products Store',
    icon: '💾',
    desc: 'Lightroom preset packs, SaaS admin templates, and Figma UI kits.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:16,
    id: 'flower',
    name: 'Flower Shop',
    icon: '💐',
    desc: 'Fresh premium rose bouquets, lilies, vases, and pre-assembled succulent gardens.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:17,
    id: 'gift',
    name: 'Gift Shop',
    icon: '🎁',
    desc: 'Gourmet chocolate baskets, customized ceramic mugs, and scented candle sets.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:18,
    id: 'kids',
    name: 'Baby & Kids Store',
    icon: '🧸',
    desc: 'Organic cotton baby bodysuit packs, wooden stacking toys, and soft crib sheets.',
    image: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:19,
    id: 'mobile-accessories',
    name: 'Mobile Accessories',
    icon: '📱',
    desc: 'Clear magnetic phone cases, auto-clamp car chargers, and pro LED ring light tripods.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:20,
    id: 'computer-store',
    name: 'Computer & Laptop Store',
    icon: '🖥️',
    desc: 'Ultra-wide curved IPS monitors, ergonomic mesh task chairs, and USB-C docks.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:21,
    id: 'automotive',
    name: 'Automotive Parts',
    icon: '🚗',
    desc: 'Carnauba liquid car wax, OBD2 diagnostic scanners, and car air purifiers.',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:22,
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    icon: '🍳',
    desc: 'Smart digital air fryers, ceramic non-stick fry pans, and Damascus steel chef knives.',
    image: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:23,
    id: 'footwear',
    name: 'Footwear Store',
    icon: '👟',
    desc: 'AeroCushion running sneakers, premium leather loafers, and comfort trail sandals.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:24,
    id: 'watches',
    name: 'Watches Store',
    icon: '⌚',
    desc: 'Chronograph leather sport watches, minimal quartz watches, and skeleton automatics.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:25,
    id: 'bags',
    name: 'Bags & Luggage',
    icon: '👜',
    desc: 'Vintage leather travel duffle bags, anti-theft laptop backpacks, and Saffiano crossbodies.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:26,
    id: 'musical',
    name: 'Musical Instruments',
    icon: '🎸',
    desc: 'Solid spruce acoustic guitars, digital arranger keyboards, and concert ukuleles.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:27,
    id: 'hardware',
    name: 'Hardware & Tools',
    icon: '🛠️',
    desc: 'Cordless drill sets, heavy duty steel tool chests, and precision magnetic kits.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:28,
    id: 'toys',
    name: 'Toys & Games',
    icon: '🤖',
    desc: 'STEM coding robots, wooden animal stacking puzzles, and offroad RC buggies.',
    image: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:29,
    id: 'furniture-premium',
    name: 'Furniture Premium',
    icon: '🛋️',
    desc: 'Velvet mid-century accent sofas, Carrara marble coffee tables, and orthopedic chairs.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:30,
    id: 'organic-farm',
    name: 'Organic Farm Store',
    icon: '🚜',
    desc: 'Fresh farm strawberry baskets, artisanal fresh goat cheese, and raw honeycombs.',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:31,
    id: 'courses',
    name: 'Online Courses',
    icon: '🎓',
    desc: 'React Next.js masterclass bootcamps, digital marketing strategies, and design system guides.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:32,
    id: 'pod',
    name: 'Print On Demand',
    icon: '👕',
    desc: 'Custom graphic hoodies, sublimated tea mugs, and embroidered canvas tote bags.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:33,
    id: 'handmade',
    name: 'Handmade Crafts',
    icon: '🏺',
    desc: 'Hand-woven sunset tapestries, carved walnut salad bowls, and thrown ceramic mugs.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:34,
    id: 'art',
    name: 'Art Gallery',
    icon: '🎨',
    desc: 'Original oil landscape canvas paintings, abstract stone sculptures, and fine art prints.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:35,
    id: 'medical',
    name: 'Medical Equipment',
    icon: '🩺',
    desc: 'Digital pulse oximeters, compression leg socks, and pro first aid box cases.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:36,
    id: 'wholesale',
    name: 'B2B Wholesale',
    icon: '🏢',
    desc: 'Bulk cotton blank tees, bulk kraft paper shopping bags, and bulk LED light bulbs.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:37,
    id: 'marketplace',
    name: 'Multi Vendor Marketplace',
    icon: '🌐',
    desc: 'Multi-vendor smart tech bundles, local boutique packs, and farm fresh food boxes.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80'
  },
  {
    storeTypeId:38,
    id: 'scratch',
    name: 'Build From Scratch',
    icon: '🛠️',
    desc: 'Create a blank slate and build custom storefront themes.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=80'
  }
];

interface SelectedStoreConfiguration {
  storeTypeId: number;
  categoryId: string;
  categoryName: string;
  themeId: number;
  themeName: string;
  themeColor: string;
  themeConfig: any;
  companyName?: string;
  slogan?: string;
  logoIcon?: string;
  logoType?: string;
  customLogoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  bannerUrl?: string;
}
interface EcommerceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuildFromScratch: () => void;

   onSelectCategory: (
    category: string,
    config: SelectedStoreConfiguration
  ) => void;
}

export default function EcommerceSelectorModal({
  isOpen,
  onClose,
  onSelectCategory,
  onBuildFromScratch
}: EcommerceSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EcommerceCategory | null>(null);
  const [wizardStep, setWizardStep] = useState<'niche' | 'info' | 'theme'>('niche');
  const [selectedTheme, setSelectedTheme] = useState<any>(null);

  // Custom Info States
  const [storeName, setStoreName] = useState('');
  const [tagline, setTagline] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [logoIcon, setLogoIcon] = useState('🛍️');
  const [logoType, setLogoType] = useState<'icon' | 'custom'>('icon');
  const [customLogoUrl, setCustomLogoUrl] = useState('');
  const [selectedHeroImage, setSelectedHeroImage] = useState('');
  const [customHeroUrl, setCustomHeroUrl] = useState('');
  // True only when the user explicitly picks a hero in the info step; the
  // auto-selected preset must not override the chosen theme's own imagery.
  const [heroChosen, setHeroChosen] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);

  // Fullscreen Theme Preview Modal state
  const [previewTheme, setPreviewTheme] = useState<any>(null);
  // Preview aspect mode: 'desktop' | 'tablet' | 'mobile'
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  // Which page of the storefront to preview
  const [previewPage, setPreviewPage] = useState<'landing' | 'login' | 'dashboard'>('landing');

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

  const getNicheHeroPresets = (catId: string) => {
    switch (catId) {
      case 'fashion':
      case 'footwear':
        return [
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80'
        ];
      case 'electronics':
      case 'mobile-accessories':
      case 'computer-store':
        return [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=600&auto=format&fit=crop&q=80'
        ];
      case 'grocery':
        return [
          'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1506617405387-8fb7522097e1?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1488459718955-418b6256272b?w=600&auto=format&fit=crop&q=80'
        ];
      case 'furniture':
      case 'home-decor':
      case 'home-kitchen':
        return [
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80'
        ];
      case 'jewelry':
        return [
          'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80'
        ];
      case 'beauty':
        return [
          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop&q=80'
        ];
      case 'pharmacy':
        return [
          'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80'
        ];
      case 'pet':
        return [
          'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=80'
        ];
      case 'books':
        return [
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=80'
        ];
      case 'sports':
        return [
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80'
        ];
      case 'restaurant':
      case 'bakery':
      case 'cafe':
        return [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'
        ];
      default:
        return [
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
          'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600'
        ];
    }
  };

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

  // Four genuinely distinct variants per niche (dark luxe / light minimal /
  // vivid gradient / editorial), each with its own imagery, copy and layouts.
  const themesForCategory = useMemo(() => {
    if (!selectedCategory) return [];
    return getEcomThemes(selectedCategory.id, selectedCategory.name);
  }, [selectedCategory]);

  if (!isOpen) return null;

  const handleSelectNiche = (cat: EcommerceCategory) => {
    setSelectedCategory(cat);
    setStoreName(`My ${cat.name}`);
    setTagline(cat.desc);
    setLogoIcon(cat.icon);
    setCustomLogoUrl('');
    setLogoType('icon');
    
    const presets = getNicheHeroPresets(cat.id);
    setSelectedHeroImage(presets[0] || cat.image);
    setCustomHeroUrl('');
    setHeroChosen(false);
    
    setWizardStep('info');
  };

  const handleNextStep = () => {
    if (wizardStep === 'niche' && selectedCategory) {
      handleSelectNiche(selectedCategory);
    } else if (wizardStep === 'info') {
      const available = themesForCategory;
      if (available.length > 0) {
        setSelectedTheme(available[0]);
      }
      setWizardStep('theme');
    }
  };

  const handleBackStep = () => {
    if (wizardStep === 'theme') {
      setWizardStep('info');
    } else if (wizardStep === 'info') {
      setWizardStep('niche');
    }
  };

const handleCompleteSetup = (themeToUse?: any) => {
  const theme = themeToUse || selectedTheme;

  if (!selectedCategory || !theme) return;

  // The generated site must match the preview exactly: the theme's own hero
  // wins unless the user explicitly uploaded / picked a custom one.
  const resolvedBanner =
    customHeroUrl ||
    (heroChosen ? selectedHeroImage : '') ||
    theme.bannerImageUrl ||
    theme.thumbnail;

  onSelectCategory(selectedCategory.name, {
    // Category
    storeTypeId: selectedCategory.storeTypeId,
    categoryId: selectedCategory.id,
    categoryName: selectedCategory.name,

    // Theme
    themeId: theme.id,
    themeName: theme.name,
    themeColor: theme.primaryColor,
    themeConfig: {
      ...theme,
      icon: logoIcon,
      tagline: tagline || theme.desc,
      bannerImageUrl: resolvedBanner
    },

    // Custom store details
    companyName: storeName.trim(),
    slogan: tagline.trim(),
    logoIcon,
    logoType,
    customLogoUrl: logoType === 'custom' ? customLogoUrl : '',
    contactEmail: contactEmail.trim(),
    contactPhone: contactPhone.trim(),
    bannerUrl: resolvedBanner
  });
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
                : wizardStep === 'info'
                ? `Configure ${selectedCategory?.name}`
                : `Choose Theme for ${selectedCategory?.name}`}
            </h2>
            <p className="text-xs text-slate-400">
              {wizardStep === 'niche'
                ? 'Select a business template category to seed product catalogs & inventory automatically.'
                : wizardStep === 'info'
                ? 'Enter basic information, logo details, and configure the main banner image for your store.'
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
                  setStoreName('My Custom Store');
                  setTagline('Custom scratch e-commerce store');
                  setLogoIcon('⚙️');
                  setLogoType('icon');
                  setSelectedHeroImage('');
                  setCustomHeroUrl('');
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
                  onClick={() => handleSelectNiche(cat)}
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

          {wizardStep === 'info' && selectedCategory && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                <h3 className="text-sm font-black text-indigo-400 uppercase tracking-wider border-b border-white/5 pb-2">
                  Store Details
                </h3>
                
                {/* Store Name & Slogan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Store Name</label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full bg-slate-955 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Slogan / Tagline</label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full bg-slate-955 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Contact Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Contact Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="support@mystore.com"
                      className="w-full bg-slate-955 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Contact Phone</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-955 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Logo Section */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Store Logo</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setLogoType('icon')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        logoType === 'icon' ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-white/10 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      Emoji / Icon
                    </button>
                    <button
                      type="button"
                      onClick={() => setLogoType('custom')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        logoType === 'custom' ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-white/10 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      Custom Logo URL
                    </button>
                  </div>

                  {logoType === 'icon' ? (
                    <div className="flex gap-2.5 items-center pt-2">
                      <span className="text-3xl p-2 bg-white/5 border border-white/10 rounded-xl">{logoIcon}</span>
                      <input
                        type="text"
                        value={logoIcon}
                        onChange={(e) => setLogoIcon(e.target.value)}
                        className="w-16 bg-slate-955 border border-white/10 rounded-xl px-3 py-2 text-center text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <span className="text-[10px] text-slate-500 font-medium">Type any emoji to use as your logo.</span>
                    </div>
                  ) : (
                    <div className="space-y-2 mt-2">
                      <input
                        type="text"
                        value={customLogoUrl}
                        onChange={(e) => setCustomLogoUrl(e.target.value)}
                        placeholder="https://example.com/logo.png"
                        className="w-full bg-slate-955 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Or upload from device:</span>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setIsUploadingLogo(true);
                                try {
                                  const url = await api.media.uploadImage(file);
                                  setCustomLogoUrl(url);
                                } catch (err) {
                                  console.error('Logo upload failed:', err);
                                } finally {
                                  setIsUploadingLogo(false);
                                }
                              }
                            }}
                            className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                          />
                        </div>
                        {isUploadingLogo && (
                          <span className="text-[10px] text-indigo-400 font-bold animate-pulse">Uploading logo...</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hero / Banner Image Preset Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Hero Banner Image</label>
                  
                  {/* Curated presets grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {getNicheHeroPresets(selectedCategory.id).map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedHeroImage(img);
                          setCustomHeroUrl('');
                          setHeroChosen(true);
                        }}
                        className={`aspect-video rounded-xl overflow-hidden relative cursor-pointer border-2 transition ${
                          selectedHeroImage === img && !customHeroUrl ? 'border-indigo-500 scale-[1.03]' : 'border-transparent opacity-60 hover:opacity-90'
                        }`}
                      >
                        <img src={img} alt="Preset banner" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/85 text-[8px] px-1 py-0.5 rounded text-white font-bold">Preset {idx + 1}</span>
                      </div>
                    ))}
                  </div>

                  {/* Or Custom URL */}
                  <div className="space-y-2 pt-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase block">Or Custom Image URL</label>
                    <input
                      type="text"
                      value={customHeroUrl}
                      onChange={(e) => {
                        setCustomHeroUrl(e.target.value);
                        setSelectedHeroImage('');
                      }}
                      placeholder="https://images.unsplash.com/... or own image url"
                      className="w-full bg-slate-955 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Or upload from device:</span>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setIsUploadingHero(true);
                              try {
                                const url = await api.media.uploadImage(file);
                                setCustomHeroUrl(url);
                                setSelectedHeroImage('');
                              } catch (err) {
                                console.error('Hero upload failed:', err);
                              } finally {
                                setIsUploadingHero(false);
                              }
                            }
                          }}
                          className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                        />
                      </div>
                      {isUploadingHero && (
                        <span className="text-[10px] text-indigo-400 font-bold animate-pulse">Uploading banner...</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-slate-900/30 to-transparent" />
                      
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
                          onClick={() => { setPreviewPage('landing'); setPreviewTheme(theme); }}
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
            {wizardStep !== 'niche' && (
              <button
                onClick={handleBackStep}
                className="px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-bold rounded-xl transition cursor-pointer text-slate-400"
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
                Configure Store →
              </button>
            )}
            {wizardStep === 'info' && (
              <button
                disabled={!storeName.trim()}
                onClick={handleNextStep}
                className="px-5 py-2 bg-indigo-650 hover:bg-indigo-700 disabled:opacity-50 text-xs font-bold rounded-xl text-white transition cursor-pointer shadow-lg"
              >
                Choose Theme →
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Fullscreen animated theme preview: scrollable landing + login */}
      {previewTheme && (
        <EcommerceFullPreview
          theme={previewTheme}
          storeName={storeName}
          tagline={tagline}
          logoIcon={logoIcon}
          onClose={() => setPreviewTheme(null)}
          onUseTheme={() => {
            const chosen = previewTheme;
            setPreviewTheme(null);
            handleCompleteSetup(chosen);
          }}
        />
      )}

      {/* Legacy inline mockup — superseded by EcommerceFullPreview above */}
      {false && previewTheme && (
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

            {/* Page switcher: Landing / Login / Dashboard */}
            <div className="flex gap-1 bg-slate-950 p-1 border border-white/10 rounded-xl">
              {([
                { id: 'landing', label: '🏠 Landing' },
                { id: 'login', label: '🔐 Login' },
                { id: 'dashboard', label: '📊 Dashboard' },
              ] as const).map((pg) => (
                <button
                  key={pg.id}
                  onClick={() => setPreviewPage(pg.id)}
                  className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition cursor-pointer ${
                    previewPage === pg.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  style={previewPage === pg.id ? { backgroundColor: previewTheme.primaryColor } : {}}
                >
                  {pg.label}
                </button>
              ))}
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
            {(() => {
              // ---- Theme-driven style tokens (each theme actually differs) ----
              const primary = previewTheme.primaryColor || '#6366f1';
              const secondary = previewTheme.secondaryColor || '#a5b4fc';
              const font = previewTheme.fontFamily || 'Inter';
              const radius =
                previewTheme.buttonRoundness === 'rounded-full' ? '9999px'
                : previewTheme.buttonRoundness === 'rounded-none' ? '0px'
                : previewTheme.buttonRoundness === 'rounded-2xl' ? '16px'
                : '10px';
              const cardStyle = previewTheme.cardStyle || 'classic-bordered';
              const layoutStyle = previewTheme.layoutStyle || 'modern-grid';
              const bannerStyle = previewTheme.bannerStyle || 'gradient-mesh';
              const products = (previewTheme.products || []).slice(0, 6);
              const isMobile = previewMode === 'mobile';

              const cardClass =
                cardStyle === 'glassmorphic' ? 'bg-white/60 backdrop-blur border border-white/70 shadow-sm'
                : cardStyle === 'bold-shadow' ? 'bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.12)]'
                : cardStyle === 'minimalist' ? 'bg-white border-0'
                : 'bg-white border border-slate-200 shadow-sm'; // classic-bordered

              const gridCols =
                isMobile ? 'grid-cols-2'
                : layoutStyle === 'minimal-masonry' ? 'grid-cols-4'
                : layoutStyle === 'editorial-carousel' ? 'grid-cols-3'
                : 'grid-cols-3';

              const btn = (label: string, filled = true) => (
                <button
                  className="px-4 py-2 text-[11px] font-bold transition"
                  style={filled
                    ? { backgroundColor: primary, color: '#fff', borderRadius: radius }
                    : { border: `1.5px solid ${primary}`, color: primary, borderRadius: radius, background: 'transparent' }}
                >
                  {label}
                </button>
              );

              // ---- LANDING ----
              const Landing = (
                <div className="min-h-full bg-white" style={{ fontFamily: font }}>
                  {/* Header */}
                  <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur z-10">
                    <span className="font-black text-sm flex items-center gap-2" style={{ color: primary }}>
                      <span>{previewTheme.icon}</span>{previewTheme.name}
                    </span>
                    {!isMobile && (
                      <div className="flex gap-5 text-[11px] font-semibold text-slate-600">
                        <span>Shop</span><span>Collections</span><span>About</span><span>Contact</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600">
                      <span>Log In</span>
                      <span style={{ color: primary }}>🛒 (0)</span>
                    </div>
                  </div>

                  {/* Hero — varies by bannerStyle */}
                  {bannerStyle === 'editorial-split' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-10 flex flex-col justify-center gap-4" style={{ background: `${primary}0d` }}>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: primary }}>New Season</span>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{previewTheme.tagline}</h1>
                        <p className="text-xs text-slate-500">{previewTheme.desc}</p>
                        <div className="flex gap-2 pt-1">{btn('Shop Now')}{btn('Learn More', false)}</div>
                      </div>
                      <img src={previewTheme.bannerImageUrl} alt="" className="h-56 md:h-auto w-full object-cover" />
                    </div>
                  ) : bannerStyle === 'minimal-outline' ? (
                    <div className="py-16 px-8 text-center border-b-4" style={{ borderColor: primary }}>
                      <h1 className="text-3xl font-black tracking-tight text-slate-900">{previewTheme.name}</h1>
                      <p className="text-xs text-slate-500 mt-3 max-w-md mx-auto">{previewTheme.tagline}</p>
                      <div className="flex gap-2 justify-center pt-5">{btn('Explore Store')}{btn('Our Story', false)}</div>
                    </div>
                  ) : bannerStyle === 'glass-card' ? (
                    <div className="relative h-64 flex items-center justify-center overflow-hidden">
                      <img src={previewTheme.bannerImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="relative z-10 bg-white/70 backdrop-blur-md rounded-2xl p-6 text-center max-w-sm mx-4 shadow-xl">
                        <h1 className="text-xl font-black text-slate-900">{previewTheme.tagline}</h1>
                        <p className="text-[11px] text-slate-600 mt-1">{previewTheme.desc}</p>
                        <div className="flex gap-2 justify-center pt-4">{btn('Shop Now')}</div>
                      </div>
                    </div>
                  ) : (
                    // gradient-mesh
                    <div className="relative h-64 flex items-center justify-center text-center overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${previewTheme.bannerImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <div className="relative z-10 text-white px-6 space-y-3">
                        <h1 className="text-2xl md:text-3xl font-black drop-shadow">{previewTheme.tagline}</h1>
                        <p className="text-[11px] opacity-90 max-w-md mx-auto">{previewTheme.desc}</p>
                        <div className="flex gap-2 justify-center pt-1">
                          <button className="px-5 py-2 text-[11px] font-bold bg-white" style={{ color: primary, borderRadius: radius }}>Shop Now</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Products */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">Featured Products</h4>
                      <span className="text-[11px] font-bold" style={{ color: primary }}>View all →</span>
                    </div>
                    <div className={`grid gap-3 ${gridCols}`}>
                      {products.map((p: any, idx: number) => (
                        <div key={idx} className={`rounded-xl overflow-hidden ${cardClass} ${layoutStyle === 'minimal-masonry' && idx % 3 === 0 ? 'row-span-2' : ''}`}>
                          <img src={p.imageUrl} alt={p.name} className={`w-full object-cover ${layoutStyle === 'minimal-masonry' && idx % 3 === 0 ? 'h-40' : 'h-24'}`} />
                          <div className="p-2.5 space-y-1">
                            <span className="text-[8px] font-bold text-slate-400 uppercase">{p.category}</span>
                            <h5 className="font-bold text-[11px] text-slate-800 truncate">{p.name}</h5>
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-[11px] font-black text-slate-900">₹{Number(p.price).toLocaleString()}</span>
                              <button className="w-6 h-6 flex items-center justify-center text-white text-[10px]" style={{ backgroundColor: primary, borderRadius: radius }}>+</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-6 mt-4 text-center text-[10px] text-white font-semibold" style={{ backgroundColor: primary }}>
                    © 2026 {previewTheme.name}. Crafted with ZATBIZ.
                  </div>
                </div>
              );

              // ---- LOGIN ----
              const Login = (
                <div className="min-h-full grid grid-cols-1 md:grid-cols-2" style={{ fontFamily: font }}>
                  <div className="hidden md:flex flex-col justify-center gap-4 p-10 text-white relative overflow-hidden"
                    style={{ background: `linear-gradient(150deg, ${primary}, ${secondary})` }}>
                    <img src={previewTheme.bannerImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
                    <div className="relative z-10 space-y-3">
                      <span className="text-3xl">{previewTheme.icon}</span>
                      <h2 className="text-2xl font-black leading-tight">{previewTheme.name}</h2>
                      <p className="text-xs opacity-90 max-w-xs">{previewTheme.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-8 bg-white">
                    <div className="w-full max-w-xs space-y-4">
                      <div className="space-y-1 text-center">
                        <h3 className="text-lg font-black text-slate-900">Welcome back</h3>
                        <p className="text-[11px] text-slate-500">Sign in to your {previewTheme.category} account</p>
                      </div>
                      <div className="space-y-2.5">
                        <div>
                          <label className="text-[9px] font-black uppercase tracking-wide text-slate-400">Email</label>
                          <div className="mt-1 h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 flex items-center text-[11px] text-slate-400">you@email.com</div>
                        </div>
                        <div>
                          <label className="text-[9px] font-black uppercase tracking-wide text-slate-400">Password</label>
                          <div className="mt-1 h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 flex items-center text-[11px] text-slate-400">••••••••</div>
                        </div>
                      </div>
                      <button className="w-full py-2.5 text-xs font-bold text-white" style={{ backgroundColor: primary, borderRadius: radius }}>Sign In</button>
                      <div className="text-center text-[10px] text-slate-400">or continue with</div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">Google</div>
                        <div className="flex-1 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">Apple</div>
                      </div>
                      <p className="text-center text-[10px] text-slate-400">New here? <span className="font-bold" style={{ color: primary }}>Create account</span></p>
                    </div>
                  </div>
                </div>
              );

              // ---- DASHBOARD ----
              const Dashboard = (
                <div className="min-h-full flex bg-slate-50" style={{ fontFamily: font }}>
                  {!isMobile && (
                    <div className="w-44 shrink-0 text-white p-4 space-y-1" style={{ backgroundColor: primary }}>
                      <div className="flex items-center gap-2 font-black text-sm mb-4">{previewTheme.icon} {previewTheme.name.split(' ')[0]}</div>
                      {['Overview', 'Orders', 'Products', 'Customers', 'Payments', 'Settings'].map((m, i) => (
                        <div key={m} className={`px-3 py-2 rounded-lg text-[11px] font-semibold ${i === 0 ? 'bg-white/20' : 'text-white/70'}`}>{m}</div>
                      ))}
                    </div>
                  )}
                  <div className="flex-1 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-black text-slate-900">Dashboard</h3>
                        <p className="text-[11px] text-slate-500">Welcome back to {previewTheme.name}</p>
                      </div>
                      <button className="px-3 py-1.5 text-[10px] font-bold text-white" style={{ backgroundColor: primary, borderRadius: radius }}>+ Add product</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[['Revenue', '₹1,24,500'], ['Orders', '318'], ['Customers', '1,204'], ['Conversion', '3.8%']].map(([k, v], i) => (
                        <div key={k} className={`rounded-xl p-3 ${cardClass}`}>
                          <p className="text-[9px] font-bold uppercase text-slate-400">{k}</p>
                          <p className="text-base font-black text-slate-900 mt-1">{v}</p>
                          <p className="text-[9px] font-bold mt-0.5" style={{ color: i % 2 ? '#16a34a' : primary }}>▲ {(i + 2) * 3}%</p>
                        </div>
                      ))}
                    </div>
                    <div className={`rounded-xl p-4 ${cardClass}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-black text-slate-800">Recent orders</h4>
                        <span className="text-[10px] font-bold" style={{ color: primary }}>See all</span>
                      </div>
                      <div className="space-y-2">
                        {products.slice(0, 4).map((p: any, i: number) => (
                          <div key={i} className="flex items-center gap-3 py-1.5 border-b border-slate-100 last:border-0">
                            <img src={p.imageUrl} className="w-8 h-8 rounded-md object-cover" alt="" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold text-slate-800 truncate">{p.name}</p>
                              <p className="text-[9px] text-slate-400">#ORD-{1000 + i}</p>
                            </div>
                            <span className="text-[11px] font-black text-slate-900">₹{Number(p.price).toLocaleString()}</span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${primary}1a`, color: primary }}>Paid</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  className={`bg-white border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 relative flex flex-col ${
                    isMobile ? 'w-[390px] h-[720px]' : previewMode === 'tablet' ? 'w-[820px] h-[85vh]' : 'w-full max-w-6xl h-[85vh]'
                  }`}
                >
                  {/* Simulated browser bar */}
                  <div className="bg-slate-950 px-4 py-2 flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <div className="flex-grow text-center text-[9px] text-slate-500 font-semibold bg-slate-900/60 py-0.5 rounded mx-6 truncate">
                      preview.zatbiz.site/{previewTheme.id}/{previewPage}
                    </div>
                  </div>
                  {/* Rendered page */}
                  <div className="flex-grow overflow-y-auto">
                    {previewPage === 'landing' ? Landing : previewPage === 'login' ? Login : Dashboard}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
}
