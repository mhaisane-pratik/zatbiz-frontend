'use client';

import { useState, useEffect } from 'react';
import { api, getRandomFoodImage } from '@/services/api';
import { useFileEncoder } from '@/hooks/useFileEncoder';
import { generateTemplateBlocks, getRestaurantPreset } from '@/services/templates';
import { Project } from '@/types';
import { THEMES_30 } from '@/app/dashboard/themesData';
import { getInitialNichesForSubcategory, generate10SubcategoryItems } from './realEstateItems';
import WeddingWizardSteps from './WeddingWizardSteps';

const GLOBAL_THEME_COLORS: Record<string, string> = {
  emerald: '#10B981',
  deepblue: '#3B82F6',
  purple: '#D97706',
  sunset: '#F97316',
  slate: '#475569',
  'realestate-elite': '#1e3a8a',
  'realestate-luxury-mansions': '#0f172a',
  'realestate-apex-builders': '#b45309',
  'realestate-vertex-commercial': '#0284c7',
  'realestate-urban-nest': '#0d9488',
  'realestate-horizon-advisors': '#4f46e5',
  'realestate-luxe-spaces': '#7c3aed',
  'realestate-nova-smartcity': '#2563eb',
  'realestate-heritage-homes': '#15803d',
  'realestate-modern-living': '#ea580c'
};

interface NicheSubOption {
  id: string;
  name: string;
  icon: string;
  image: string;
  category: string;
}

interface NicheCategory {
  id: string;
  name: string;
  icon: string;
  image: string;
  desc: string;
  subOptions: NicheSubOption[];
}

const ECOMMERCE_CATEGORIES: NicheCategory[] = [
  {
    id: 'fashion',
    name: 'Fashion and Clothing Store',
    icon: '👕',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    desc: 'Apparel, garments, and active footwear storefront template.',
    subOptions: [
      { id: 'fashion_men', name: "Men's Clothing", icon: '👕', image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600&auto=format&fit=crop&q=80', category: "Men's Clothing" },
      { id: 'fashion_women', name: "Women's Clothing", icon: '👗', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80', category: "Women's Clothing" },
      { id: 'fashion_kids', name: 'Kids Wear', icon: '🧸', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80', category: "Kids Wear" },
      { id: 'fashion_footwear', name: 'Footwear', icon: '👟', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', category: 'Footwear' }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronic Store',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=600&auto=format&fit=crop&q=80',
    desc: 'Laptops, flagship smartphones, smartwatches, and tech peripherals.',
    subOptions: [
      { id: 'electronics_mobile', name: 'Mobile', icon: '📱', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80', category: 'Mobiles' },
      { id: 'electronics_laptop', name: 'Laptop', icon: '💻', image: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=600&auto=format&fit=crop&q=80', category: 'Laptops' },
      { id: 'electronics_accessories', name: 'Accessories', icon: '🎧', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80', category: 'Accessories' },
      { id: 'electronics_smartwatch', name: 'Smart Watches', icon: '⌚', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80', category: 'Smart Watches' }
    ]
  },
  {
    id: 'grocery',
    name: 'Grocery Store',
    icon: '🍎',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    desc: 'Organic fresh produce, daily essentials, greens, and bakery goods.',
    subOptions: [
      { id: 'grocery_fruits', name: 'Fruits', icon: '🍎', image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=600&auto=format&fit=crop&q=80', category: 'Fruits' },
      { id: 'grocery_vegetables', name: 'Vegetables', icon: '🥦', image: 'https://images.unsplash.com/photo-1566385101042-1a010c129fa6?w=600&auto=format&fit=crop&q=80', category: 'Vegetables' },
      { id: 'grocery_essential', name: 'Daily Essential', icon: '🥛', image: 'https://images.unsplash.com/photo-1584263343329-74f157f461b8?w=600&auto=format&fit=crop&q=80', category: 'Daily Essentials' }
    ]
  },
  {
    id: 'pet',
    name: 'Pet Store',
    icon: '🐶',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
    desc: 'Healthy pet foods, toys, comfort accessories, and veterinary care.',
    subOptions: [
      { id: 'pet_food', name: 'Pet Food', icon: '🥩', image: 'https://images.unsplash.com/photo-1589721062230-fb10c85c2c7e?w=600&auto=format&fit=crop&q=80', category: 'Pet Food' },
      { id: 'pet_accessories', name: 'Accessories', icon: '🐕', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop&q=80', category: 'Accessories' },
      { id: 'pet_medicines', name: 'Medicines', icon: '💊', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80', category: 'Medicines' }
    ]
  },
  {
    id: 'books',
    name: 'Book Store',
    icon: '📚',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    desc: 'Academic reference books, best-selling novels, and downloadable e-books.',
    subOptions: [
      { id: 'books_education', name: 'Education book', icon: '📓', image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&auto=format&fit=crop&q=80', category: 'Education Books' },
      { id: 'books_novels', name: 'Novels', icon: '📖', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80', category: 'Novels' },
      { id: 'books_ebook', name: 'E-book', icon: '📱', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', category: 'E-books' }
    ]
  }
];

interface BusinessWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (newProject: Project) => void;
  showToast: (msg: string, isError?: boolean) => void;
  initialTemplateId?: string | null;
  initialRestaurantCategory?: string | null;
  initialHospitalCategory?: string | null;
  initialGymCategory?: string | null;
  initialGymThemeId?: string | null;
  initialGymThemeColor?: string | null;
  initialRealEstateCategory?: string | null;
  initialRealEstateThemeId?: string | null;
  initialRealEstateThemeColor?: string | null;
  initialWeddingCategory?: string | null;
  initialNgoCategory?: string | null;
  initialCorporateCategory?: string | null;
  initialMedicalShopConfig?: any;
  initialRestaurantConfig?: any;
  initialGymConfig?: any;
  onSelectThemeTemplates?: () => void;
  projects?: Project[];
}

export default function BusinessWizard({
  isOpen,
  onClose,
  onComplete,
  showToast,
  initialTemplateId,
  initialRestaurantCategory,
  initialHospitalCategory,
  initialGymCategory,
  initialGymThemeId,
  initialGymThemeColor,
  initialRealEstateCategory,
  initialRealEstateThemeId,
  initialRealEstateThemeColor,
  initialWeddingCategory,
  initialNgoCategory,
  initialCorporateCategory,
  initialMedicalShopConfig,
  initialRestaurantConfig,
  initialGymConfig,
  onSelectThemeTemplates,
  projects = []
}: BusinessWizardProps) {
  const { encodeFile } = useFileEncoder();
  const [step, setStep] = useState(1);

  // Wedding visual theme selections (1 to 10)
  const [selectedWeddingHomeOption, setSelectedWeddingHomeOption] = useState<number>(1);
  const [selectedWeddingLoginOption, setSelectedWeddingLoginOption] = useState<number>(1);
  const [selectedWeddingDashboardOption, setSelectedWeddingDashboardOption] = useState<number>(1);

  // Step 1: Sign Up Credentials
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Step 2: Create Business Account / Details
  const [companyName, setCompanyName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [logoIcon, setLogoIcon] = useState('📦');
  const [logoType, setLogoType] = useState<'icon' | 'custom' | 'auto'>('icon');
  const [customLogoUrl, setCustomLogoUrl] = useState('');
  const [currency, setCurrency] = useState('INR (₹)');
  const [gstin, setGstin] = useState('');

  // Build from scratch specific states
  const [isScratchFlow, setIsScratchFlow] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [country, setCountry] = useState('India');
  const [pincode, setPincode] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('⚡');
  const [faviconType, setFaviconType] = useState<'icon' | 'custom'>('icon');
  const [themeColor, setThemeColor] = useState('slate');

  // Real Estate specific states
  const [realEstateNiches, setRealEstateNiches] = useState<string[]>([]);
  const [businessNameVal, setBusinessNameVal] = useState('');
  const [companyDescVal, setCompanyDescVal] = useState('');
  const [brandImageVal, setBrandImageVal] = useState('');

  // Step 3: Select Business Type
  const [businessType, setBusinessType] = useState<'restaurant' | 'shop' | 'school' | 'hospital' | 'fashion' | 'wedding' | 'general' | null>(null);

  // E-commerce Niche selection
  const [shopNiche, setShopNiche] = useState<string | null>(null);
  const [wizardNicheCategory, setWizardNicheCategory] = useState<string | null>(null);

  // Step 4: Choose Website Template
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // Step 5: Customize Website
  const [themePreset, setThemePreset] = useState('slate');
  const [heroType, setHeroType] = useState<'default' | 'custom'>('default');
  const [customHeroUrl, setCustomHeroUrl] = useState('');
  const [projectId, setProjectId] = useState<number | null>(null);

  // Step 6: Add Products/Services
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodStock, setProdStock] = useState('10');
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [addedProducts, setAddedProducts] = useState<any[]>([]);

  // Step 7: Setup Payment Gateway
  const [paymentGateway, setPaymentGateway] = useState('Stripe');
  const [stripeKey, setStripeKey] = useState('pk_test_51Px9...');
  const [sandboxMode, setSandboxMode] = useState(true);
  const [gstRate, setGstRate] = useState(18);

  // Step 8: Setup Domain
  const [domainType, setDomainType] = useState<'subdomain' | 'custom'>('subdomain');
  const [subdomainPrefix, setSubdomainPrefix] = useState('');
  const [customDomainName, setCustomDomainName] = useState('');
  const [domainChecked, setDomainChecked] = useState(false);

  // Step 9: Publish & Confetti
  const [isPublished, setIsPublished] = useState(false);

  // Pre-fill registered email if logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInEmail = localStorage.getItem('userEmail');
      if (loggedInEmail) {
        setEmail(loggedInEmail);
        setUsername(loggedInEmail.split('@')[0]);
      }
    }
  }, []);

  const getRestaurantCategoryEmoji = (category: string): string => {
    const catLower = category.toLowerCase();
    if (catLower.includes('pizza')) return '🍕';
    if (catLower.includes('burger') || catLower.includes('fast food')) return '🍔';
    if (catLower.includes('cafe') || catLower.includes('coffee') || catLower.includes('roastery')) return '☕';
    if (catLower.includes('bakery') || catLower.includes('cake') || catLower.includes('sweet') || catLower.includes('dessert') || catLower.includes('chocolate')) return '🍰';
    if (catLower.includes('ice cream')) return '🍦';
    if (catLower.includes('biryani')) return '🍲';
    if (catLower.includes('seafood') || catLower.includes('fish')) return '🦞';
    if (catLower.includes('bbq') || catLower.includes('grill') || catLower.includes('steak') || catLower.includes('non-veg')) return '🥩';
    if (catLower.includes('chinese') || catLower.includes('momo') || catLower.includes('dumpling')) return '🥟';
    if (catLower.includes('south indian') || catLower.includes('dosa') || catLower.includes('tamil')) return '🥞';
    if (catLower.includes('juice') || catLower.includes('smoothie')) return '🥤';
    if (catLower.includes('tea')) return '🍵';
    if (catLower.includes('sandwich')) return '🥪';
    if (catLower.includes('veg') || catLower.includes('salad') || catLower.includes('organic') || catLower.includes('healthy')) return '🥗';
    if (catLower.includes('bar') || catLower.includes('lounge') || catLower.includes('pub') || catLower.includes('cocktail')) return '🍸';
    return '🍕';
  };

  // Handle template selection clicked from marketplace
  useEffect(() => {
    if (initialTemplateId) {
      setSelectedTemplateId(initialTemplateId);
      if (initialTemplateId === 'scratch') {
        setIsScratchFlow(true);
        setStep(1);
      } else if (initialTemplateId === 'medical-shop') {
        setBusinessType('shop');
        if (initialMedicalShopConfig) {
          setCompanyName(initialMedicalShopConfig.businessName);
          setSlogan(initialMedicalShopConfig.companyDescription);
          setLogoIcon('💊');
          setContactPhone(initialMedicalShopConfig.mobileNo);
          setContactEmail(initialMedicalShopConfig.email);
          setOwnerName(initialMedicalShopConfig.ownerName);
          setAddress(initialMedicalShopConfig.address);
          setCity(initialMedicalShopConfig.city);
          setStateVal(initialMedicalShopConfig.state);
          setPincode(initialMedicalShopConfig.pincode);
          setThemePreset(initialMedicalShopConfig.selectedTheme);
        } else {
          setCompanyName('Apothecary Rx');
          setSlogan('Your trusted local wellness partner');
          setLogoIcon('💊');
        }
        setStep(1);
      } else if (initialTemplateId === 'storefront') {
        setBusinessType('shop');
        setStep(10); // Start at E-commerce Niche selection grid first!
      } else if (initialTemplateId === 'restaurant') {
        setBusinessType('restaurant');
        if (initialRestaurantConfig) {
          setCompanyName(initialRestaurantConfig.restaurantName);
          setSlogan(initialRestaurantConfig.description);
          setLogoIcon('🍳');
          setContactPhone(initialRestaurantConfig.mobileNo);
          setContactEmail(initialRestaurantConfig.email);
          setOwnerName(initialRestaurantConfig.ownerName);
          setAddress(initialRestaurantConfig.address || '');
          setCity(initialRestaurantConfig.city);
          setStateVal(initialRestaurantConfig.state);
          setPincode(initialRestaurantConfig.pincode);
          setThemePreset(initialRestaurantConfig.selectedTheme);
          setShopNiche(initialRestaurantConfig.subcategory);
        } else if (initialRestaurantCategory) {
          setCompanyName(initialRestaurantCategory);
          setSlogan(`Crafting delicious meals for our guests`);
          setLogoIcon(getRestaurantCategoryEmoji(initialRestaurantCategory));
          setShopNiche(initialRestaurantCategory);
          const preset = getRestaurantPreset(initialRestaurantCategory, initialRestaurantCategory, '');
          if (preset && preset.theme) {
            setThemePreset(preset.theme);
          }
        } else {
          setCompanyName('Royal Bistro');
          setSlogan('Exquisite culinary experience');
          setLogoIcon('🍕');
          setShopNiche('General');
          setThemePreset('slate');
        }
        setStep(1);
      } else if (initialTemplateId === 'school') {
        setBusinessType('school');
        setStep(1);
      } else if (initialTemplateId === 'clinic') {
        setBusinessType('hospital');
        if (initialHospitalCategory) {
          setCompanyName(initialHospitalCategory);
          setSlogan(`Compassionate care at our ${initialHospitalCategory}`);
          setLogoIcon('🏥');
        } else {
          setCompanyName('Hope Care Hospital');
          setSlogan('Your health, our commitment');
          setLogoIcon('🏥');
        }
        setStep(1);
      } else if (initialTemplateId === 'realestate') {
        setBusinessType('general');
        setSelectedTemplateId('realestate');
        if (initialRealEstateCategory) {
          setRealEstateNiches(getInitialNichesForSubcategory(initialRealEstateCategory));
          setCompanyName(initialRealEstateCategory);
          setBusinessNameVal(initialRealEstateCategory);
          setSlogan(`Premium services and options for ${initialRealEstateCategory}`);
          setLogoIcon('🏡');
          setLogoType('auto');
        } else {
          setCompanyName('Elite Real Estate');
          setSlogan('Your dream property awaits');
          setLogoIcon('🏡');
        }
        if (initialRealEstateThemeId) {
          setThemePreset(initialRealEstateThemeId);
        } else if (initialRealEstateThemeColor) {
          setThemePreset(initialRealEstateThemeColor);
        } else {
          setThemePreset('realestate-elite');
        }
        setStep(1);
      } else if (initialTemplateId === 'gym') {
        setBusinessType('general');
        setSelectedTemplateId('gym');
        if (initialGymCategory) {
          setCompanyName(initialGymCategory);
          setSlogan(`Your ultimate destination for ${initialGymCategory}`);
          setLogoIcon('💪');
        } else {
          setCompanyName('Powerhouse Fitness');
          setSlogan('Be stronger than your excuses');
          setLogoIcon('💪');
        }
        if (initialGymConfig) {
          setThemePreset(initialGymConfig.selectedTheme || 'gym-iron-forge');
          if (initialGymConfig.headerBgImage) {
            setBannerUrl(initialGymConfig.headerBgImage);
          }
        } else {
          if (initialGymThemeId) {
            setThemePreset(initialGymThemeId);
          } else if (initialGymThemeColor) {
            setThemePreset(initialGymThemeColor);
          } else {
            setThemePreset('gym-iron-forge');
          }
        }
        setStep(1);
      } else if (initialTemplateId === 'wedding') {
        setBusinessType('wedding');
        setSelectedTemplateId('wedding');
        if (initialWeddingCategory) {
          setCompanyName(initialWeddingCategory);
          setSlogan(`Making your ${initialWeddingCategory} dreams come true`);
          setLogoIcon('💍');
        } else {
          setCompanyName('Royal Wedding Planner');
          setSlogan('Crafting unforgettable moments');
          setLogoIcon('💍');
        }
        setStep(1);
      } else if (initialTemplateId === 'ngo') {
        setBusinessType('general');
        setSelectedTemplateId('ngo');
        if (initialNgoCategory) {
          setCompanyName(initialNgoCategory);
          setSlogan(`Empowering community via our ${initialNgoCategory}`);
          setLogoIcon('🤝');
        } else {
          setCompanyName('Grace Foundation NGO');
          setSlogan('Together for a better tomorrow');
          setLogoIcon('🤝');
        }
        setStep(1);
      } else if (initialTemplateId === 'corporate') {
        setBusinessType('general');
        setSelectedTemplateId('corporate');
        if (initialCorporateCategory) {
          setCompanyName(initialCorporateCategory);
          setSlogan(`Premium solutions by ${initialCorporateCategory}`);
          setLogoIcon('🏢');
        } else {
          setCompanyName('Acuity Global Corporate');
          setSlogan('Strategic consulting and tech excellence');
          setLogoIcon('🏢');
        }
        setStep(1);
      }
    }
  }, [
    initialTemplateId,
    initialRestaurantCategory,
    initialHospitalCategory,
    initialGymCategory,
    initialGymThemeId,
    initialGymThemeColor,
    initialRealEstateCategory,
    initialRealEstateThemeId,
    initialRealEstateThemeColor,
    initialWeddingCategory,
    initialNgoCategory,
    initialCorporateCategory
  ]);

  if (!isOpen) return null;

  // Handle Logo file encode
  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await encodeFile(file);
        setCustomLogoUrl(base64);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Step 1: Sign up submit
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSigningUp) return;
    setIsSigningUp(true);
    const getApiUrl = () => {
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
    };
    const baseUrl = getApiUrl();
    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        showToast('Account registered successfully via Spring Boot Auth!');
      } else {
        const errorText = await response.text();
        showToast(`Auth endpoint: ${errorText || 'Simulation Mode Active'}`, true);
      }
    } catch (err) {
      console.warn('Backend not running, falling back to local simulation.');
      showToast('Simulation: Account registered in sandbox memory.');
    } finally {
      setIsSigningUp(false);
    }
    setIsRegistered(true);
    setContactEmail(email);
    if (initialTemplateId === 'medical-shop') {
      setTimeout(() => {
        initializeProject();
      }, 100);
    } else {
      setStep(2);
    }
  };

  // Step 2: Next
  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    
    if (isScratchFlow) {
      setStep(3);
    } else if (initialTemplateId === 'storefront' || selectedTemplateId === 'storefront') {
      setStep(5); // Go directly to customizer, niche was already chosen in step 10!
    } else if (initialTemplateId) {
      setStep(5); // Go directly to customizer for other templates
    } else {
      setStep(3); // Normal category select
    }
  };

  // Real Estate step submit handlers
  const handleRealEstateNichesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (realEstateNiches.length === 0) {
      showToast('Please select at least one property niche.', true);
      return;
    }
    setStep(3);
  };

  const handleRealEstateFormsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      showToast('Company Name is required.', true);
      return;
    }
    if (!businessNameVal.trim()) {
      showToast('Business Name is required.', true);
      return;
    }
    setStep(4);
  };

  const handleRealEstateBrandingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    initializeRealEstateProject();
  };

  const seedRealEstateProperties = async (projId: number) => {
    let defaultProperties: any[] = [];

    if (initialRealEstateCategory) {
      defaultProperties = generate10SubcategoryItems(initialRealEstateCategory);
    } else {
      if (realEstateNiches.includes('Residential')) {
        defaultProperties.push(
          { name: 'Meadowview Family Villa', price: 7500000, category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80', desc: 'Spacious 4 BHK family villa, 2400 sqft, garden-facing lawn, modular kitchen, quiet neighborhood.' },
          { name: 'Oakwood Suburban Home', price: 5000000, category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80', desc: 'Cozy 3 BHK independent house, 1800 sqft, nearby parks and school districts, modern construction.' }
        );
      }
      if (realEstateNiches.includes('Commercial')) {
        defaultProperties.push(
          { name: 'Apex Plaza Office Space', price: 25000000, category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80', desc: 'Premium multi-office commercial floor, 3200 sqft, centralized AC, security surveillance, located in business district.' },
          { name: 'Metropolitan Retail Spot', price: 18000000, category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80', desc: 'High footfall street-level retail shop outlet, 1200 sqft, glass display front, perfect for showroom or apparel store.' }
        );
      }
      if (realEstateNiches.includes('Rental')) {
        defaultProperties.push(
          { name: 'Skyline Heights Apartment', price: 35000, category: 'Rental', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=80', desc: 'Semi-furnished 2 BHK rental flat, modular fittings, 24/7 security, monthly leasing active.' },
          { name: 'Greenfield Cozy Studio', price: 20000, category: 'Rental', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80', desc: 'Fully furnished 1 BHK studio space, modern amenities, close to public transport transit networks.' }
        );
      }
      if (realEstateNiches.includes('Builder')) {
        defaultProperties.push(
          { name: 'Riverfront Township Plot', price: 4000000, category: 'Builder', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=80', desc: 'Construction-ready plots in premium gated community layout, clear title deeds, internal roads laid.' }
        );
      }
      if (realEstateNiches.includes('Property Dealer')) {
        defaultProperties.push(
          { name: 'Agent Brokerage Consultation Pass', price: 500, category: 'Property Dealer', imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80', desc: 'Book a 1-on-1 session with our certified real estate broker agent for layout advisory and catalog tours.' }
        );
      }
      if (realEstateNiches.includes('Luxury')) {
        defaultProperties.push(
          { name: 'The Sapphire Estate Mansion', price: 85000000, category: 'Luxury', imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80', desc: 'Exquisite 6 BHK luxury mansion, private swimming pool, landscaped lawn garden, home theatre room.' },
          { name: 'Oceanview Panoramic Penthouse', price: 62000000, category: 'Luxury', imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80', desc: 'Elite 4 BHK penthouse, rooftop terrace deck, automated smart home systems, gorgeous ocean panoramas.' }
        );
      }

      if (defaultProperties.length === 0) {
        defaultProperties.push(
          { name: 'Standard Suburban Villa', price: 6500000, category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80', desc: '3 BHK family home.' }
        );
      }
    }

    for (const p of defaultProperties) {
      const payload = {
        projectId: projId,
        name: p.name,
        description: p.desc,
        price: p.price,
        category: p.category,
        imageUrl: p.imageUrl,
        stock: 1,
        variants: 'Area: 1800 sqft; Facade: East-Facing',
        available: true
      };
      try {
        await api.products.create(payload);
      } catch (err) {
        console.warn('Seeding realestate property offline:', err);
        const simProd = { ...payload, id: Date.now() + Math.random() };
        if (typeof window !== 'undefined') {
          let offlineProds: any[] = [];
          const stored = localStorage.getItem('zatbiz_offline_products');
          if (stored) {
            try { offlineProds = JSON.parse(stored); } catch {}
          }
          offlineProds.push(simProd);
          localStorage.setItem('zatbiz_offline_products', JSON.stringify(offlineProds));
        }
      }
    }
  };

  const initializeRealEstateProject = async () => {
    const targetName = `${companyName.trim()} Real Estate`;
    if (projects.some((p) => p.name.trim().toLowerCase() === targetName.toLowerCase())) {
      showToast(`A workspace named "${targetName}" already exists! Please choose a unique company name.`, true);
      return;
    }

    let finalLogoUrl = customLogoUrl;
    if (logoType === 'auto') {
      const initials = companyName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const hexColor = GLOBAL_THEME_COLORS[themePreset] || 
                       (THEMES_30.find(t => t.id === themePreset)?.primaryColor) || 
                       initialRealEstateThemeColor || 
                       initialGymThemeColor || 
                       '#10B981';
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="24" fill="${hexColor}" /><text x="50%" y="54%" font-family="system-ui, sans-serif" font-weight="800" font-size="36" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
      finalLogoUrl = 'data:image/svg+xml;base64,' + window.btoa(svg);
      setCustomLogoUrl(finalLogoUrl);
    }

    const finalBrandImage = brandImageVal || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop&q=80';

    const blocksList = [
      {
        id: 'realestate-header',
        type: 'header',
        theme: themePreset,
        content: {
          companyName: companyName.trim(),
          logoIcon: '🏡',
          logoUrl: finalLogoUrl,
          layout: 'left-logo',
          links: [
            { label: 'Home', url: '#' },
            { label: 'Properties', url: '#properties' },
            { label: 'Contact Us', url: '#contact' },
            { label: 'Portal Sign In', url: `/preview/REPLACE_PROJ_ID/login` }
          ]
        }
      },
      {
        id: 'realestate-hero',
        type: 'hero',
        theme: themePreset,
        content: {
          title: `Discover Elegant Living with ${businessNameVal || companyName}`,
          subtitle: slogan || 'We bring your dream properties to reality. Luxury suburban estates, commercial spots, and cozy family rentals.',
          imageUrl: finalBrandImage,
          btn1Text: 'Explore Catalog',
          btn1Url: '#properties',
          btn2Text: 'Direct Whatsapp Consult',
          btn2Url: `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
        }
      },
      {
        id: 'realestate-about',
        type: 'features',
        theme: themePreset,
        content: {
          title: 'Premium Real Estate Niches',
          subtitle: `Specialized property options matching: ${realEstateNiches.join(', ')}`,
          items: realEstateNiches.map(n => {
            const nicheIcons: Record<string, string> = {
              Residential: '🏡',
              Commercial: '🏢',
              Rental: '🔑',
              Builder: '🏗️',
              'Property Dealer': '👔',
              Luxury: '💎'
            };
            return {
              icon: nicheIcons[n] || '🏡',
              title: `${n} Listings`,
              desc: `Explore our premium verified portfolio of ${n.toLowerCase()} offerings.`
            };
          })
        }
      },
      {
        id: 'realestate-properties',
        type: 'products',
        theme: themePreset,
        content: {
          title: 'Our Property Listings',
          subtitle: 'Browse through our premium verified listings.'
        }
      },
      {
        id: 'realestate-contact',
        type: 'faq',
        theme: 'slate',
        content: {
          title: 'Frequently Asked Questions',
          items: [
            { question: 'How do I schedule a home viewing?', answer: 'Simply click "Direct Whatsapp Consult" or call our mobile. We arrange scheduled site visits.' },
            { question: 'Do you assist with financing?', answer: 'We partner with premier financial institutions to expedite your home loan approval.' }
          ]
        }
      },
      {
        id: 'realestate-footer',
        type: 'footer',
        theme: 'slate',
        content: {
          text: `© 2026 ${companyName}. Office: ${city}, ${stateVal}, ${country} - Pincode ${pincode}. Owner: ${ownerName} | Mobile: ${contactPhone}`,
          layout: 'directory'
        }
      },
      {
        id: 'realestate-login-config',
        type: 'login_config',
        theme: themePreset,
        content: {
          title: 'Secure Portal Access',
          subtitle: `Sign in to check listed properties, consultation pipelines, and agency logs for ${companyName}.`,
          btnText: 'Log In to Portal',
          logoIcon: '🏡',
          logoUrl: finalLogoUrl,
          illustrationUrl: finalBrandImage
        }
      },
      {
        id: 'realestate-dashboard-config',
        type: 'dashboard_config',
        theme: themePreset,
        content: {
          title: `${companyName} Agency Hub`,
          metric1Title: 'Listed Properties',
          metric1Value: '12 active listings',
          metric1Trend: 'Direct DB linked',
          metric2Title: 'Consultations Booked',
          metric2Value: '5 clients scheduled',
          metric2Trend: '2 listings closed',
          metric3Title: 'Inquiry Status',
          metric3Value: '8 new messages',
          metric3Trend: 'Real-time dashboard'
        }
      },
      {
        id: 'business-config-block',
        type: 'business_config',
        theme: themePreset,
        content: {
          businessType: 'general',
          shopNiche: 'realestate',
          gstin: gstin.trim(),
          currency,
          domainName: domainType === 'subdomain' ? `${subdomainPrefix || 'store'}.zatbiz.site` : customDomainName,
          paymentGateway,
          stripeKey,
          sandboxMode,
          gstRate,
          seoTitle: `${companyName} | Real Estate Agency`,
          seoDescription: companyDescVal || slogan || `Customized visual workspace for ${companyName}`,
          seoKeywords: `real estate, property, luxury, residential, ${companyName}`,
        }
      }
    ];

    const payload = {
      name: `${companyName} Real Estate`,
      description: companyDescVal || slogan || `Customized real estate workspace for ${companyName}`,
      blocksJson: JSON.stringify(blocksList),
      status: 'Draft'
    };

    try {
      const newProj = await api.projects.create(payload);
      const projId = newProj.id;
      setProjectId(projId);

      const updatedBlocks = blocksList.map(b => {
        if (b.id === 'realestate-header' && b.content && Array.isArray(b.content.links)) {
          b.content.links = b.content.links.map(l => {
            if (l.url && l.url.includes('REPLACE_PROJ_ID')) {
              l.url = l.url.replace('REPLACE_PROJ_ID', String(projId));
            }
            return l;
          });
        }
        return b;
      });

      const updatedPayload = {
        ...newProj,
        blocksJson: JSON.stringify(updatedBlocks)
      };
      await api.projects.update(projId, updatedPayload);

      const reInfo = {
        projectId: projId,
        niches: realEstateNiches.join(','),
        companyName,
        businessName: businessNameVal,
        companyDescription: companyDescVal,
        ownerName,
        mobileNo: contactPhone,
        email: contactEmail,
        whatsappNo: whatsappNumber,
        city,
        state: stateVal,
        country,
        pincode,
        logoType,
        logoUrl: finalLogoUrl,
        brandImageUrl: finalBrandImage,
        themeColor: themePreset
      };

      try {
        await api.realEstate.update(projId, reInfo);
      } catch (err) {
        console.warn('Saving realestate settings offline fallback:', err);
      }

      await seedRealEstateProperties(projId);
      showToast(`Real Estate project initialized (ID: ${projId})`);
      setStep(9);
    } catch (err) {
      console.error(err);
      const tempId = Date.now();
      setProjectId(tempId);
      const reInfo = {
        projectId: tempId,
        niches: realEstateNiches.join(','),
        companyName,
        businessName: businessNameVal,
        companyDescription: companyDescVal,
        ownerName,
        mobileNo: contactPhone,
        email: contactEmail,
        whatsappNo: whatsappNumber,
        city,
        state: stateVal,
        country,
        pincode,
        logoType,
        logoUrl: finalLogoUrl,
        brandImageUrl: finalBrandImage,
        themeColor: themePreset
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(`zatbiz_offline_realestate_${tempId}`, JSON.stringify(reInfo));
      }
      await seedRealEstateProperties(tempId);
      showToast('Simulation: Real Estate project generated in sandbox memory.');
      setStep(9);
    }
  };

  // Step 3: Select Business Type
  const selectBusinessType = (type: 'restaurant' | 'shop' | 'school' | 'hospital') => {
    setBusinessType(type);
    // Auto-map templates
    if (type === 'restaurant') {
      setSelectedTemplateId('restaurant');
      setLogoIcon('🍕');
      setProdCategory('Main Courses');
      setStep(4);
    } else if (type === 'shop') {
      setSelectedTemplateId('storefront');
      setLogoIcon('🛍️');
      setProdCategory('Accessories');
      setStep(10); // Navigate to Niche Selection Step
    } else if (type === 'school') {
      setSelectedTemplateId('school');
      setLogoIcon('🏫');
      setProdCategory('Courses');
      setStep(4);
    } else if (type === 'hospital') {
      setSelectedTemplateId('clinic');
      setLogoIcon('🏥');
      setProdCategory('Clinical Checkup');
      setStep(4);
    }
  };

  const seedDefaultNicheProducts = async (projId: number, initialRestaurantCategory?: string) => {
    if (businessType !== 'shop' && businessType !== 'restaurant') return;
    
    let defaultProds: any[] = [];
    if (businessType === 'restaurant') {
      const catLower = (initialRestaurantCategory || '').toLowerCase();
      if (catLower.includes('pizza')) {
        defaultProds = [
          { name: 'Margherita Pizza', price: 299.00, category: 'Pizzas', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80', desc: 'Fresh mozzarella, tomato sauce, basil, and a drizzle of olive oil.' },
          { name: 'Double Pepperoni Pizza', price: 399.00, category: 'Pizzas', imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80', desc: 'Loaded with premium spicy pepperoni, extra mozzarella, and herb sauce.' },
          { name: 'Garlic Cheese Bread', price: 179.00, category: 'Sides', imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&auto=format&fit=crop&q=80', desc: 'Warm baguette slices toasted with garlic butter, parsley, and melted mozzarella.' },
          { name: 'Classic Tiramisu', price: 199.00, category: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80', desc: 'Traditional Italian dessert layered with coffee-soaked ladyfingers and mascarpone.' }
        ];
      } else if (catLower.includes('cafe') || catLower.includes('coffee') || catLower.includes('tea') || catLower.includes('roastery') || catLower.includes('juice') || catLower.includes('smoothie')) {
        defaultProds = [
          { name: 'Espresso Macchiato', price: 149.00, category: 'Beverages', imageUrl: 'https://images.unsplash.com/photo-1510972527407-cbd5e77fb736?w=600&auto=format&fit=crop&q=80', desc: 'Rich espresso shot with a dollop of warm frothed milk.' },
          { name: 'Caramel Latte Macchiato', price: 199.00, category: 'Beverages', imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80', desc: 'Velvety espresso, steamed milk, and sweet caramel drizzle.' },
          { name: 'Butter Croissant', price: 129.00, category: 'Bakery', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80', desc: 'Flaky, buttery French pastry baked golden brown.' },
          { name: 'Avocado Toast', price: 249.00, category: 'All Day Breakfast', imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=600&auto=format&fit=crop&q=80', desc: 'Mashed seasoned avocado on sourdough toast topped with cherry tomatoes.' }
        ];
      } else if (catLower.includes('bakery') || catLower.includes('cake') || catLower.includes('sweet') || catLower.includes('dessert') || catLower.includes('chocolate') || catLower.includes('ice cream')) {
        defaultProds = [
          { name: 'Chocolate Fudge Cake', price: 349.00, category: 'Cakes', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80', desc: 'Decadent triple layer chocolate cake with chocolate fudge frosting.' },
          { name: 'Red Velvet Cupcake', price: 89.00, category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1614707267537-b85acf00c4b8?w=600&auto=format&fit=crop&q=80', desc: 'Fluffy red velvet cupcake topped with signature cream cheese frosting.' },
          { name: 'Handmade Sweet Macarons (6pcs)', price: 299.00, category: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&auto=format&fit=crop&q=80', desc: 'Assorted French macarons containing raspberry, pistachio, and chocolate fillings.' },
          { name: 'Gulab Jamun (2pcs)', price: 79.00, category: 'Traditional Sweets', imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80', desc: 'Warm milk solid dumplings fried and soaked in cardamom sugar syrup.' }
        ];
      } else if (catLower.includes('fast food') || catLower.includes('burger') || catLower.includes('sandwich') || catLower.includes('snack')) {
        defaultProds = [
          { name: 'Classic Beef Burger', price: 249.00, category: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', desc: 'Flame-grilled patty with cheddar cheese, lettuce, tomato, pickles, and burger sauce.' },
          { name: 'Crispy French Fries', price: 129.00, category: 'Sides', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80', desc: 'Golden-brown salted potato fries served with tomato ketchup.' },
          { name: 'Clubhouse Sandwich', price: 189.00, category: 'Sandwiches', imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80', desc: 'Triple decker toast with grilled chicken breast, bacon, fried egg, lettuce, and mayo.' },
          { name: 'Crispy Onion Rings', price: 119.00, category: 'Sides', imageUrl: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?w=600&auto=format&fit=crop&q=80', desc: 'Thick-cut onion rings battered and deep fried to golden perfection.' }
        ];
      } else if (catLower.includes('south indian') || catLower.includes('kerala') || catLower.includes('andhra') || catLower.includes('tamil')) {
        defaultProds = [
          { name: 'Masala Dosa', price: 149.00, category: 'Dosa Specialities', imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80', desc: 'Crispy fermented rice pancake filled with spiced potato mash, served with sambar and coconut chutney.' },
          { name: 'Idli Sambar (2pcs)', price: 99.00, category: 'Breakfast', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80', desc: 'Steamed fluffy rice cakes served with hot flavorful lentil stew.' },
          { name: 'Medu Vada (2pcs)', price: 119.00, category: 'Breakfast', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80', desc: 'Crispy, deep-fried savory donut-shaped lentil fritters.' },
          { name: 'Filter Coffee', price: 69.00, category: 'Beverages', imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80', desc: 'Authentic chicory mixed South Indian coffee brewed in a brass filter.' }
        ];
      } else if (catLower.includes('chinese') || catLower.includes('momo') || catLower.includes('dumpling')) {
        defaultProds = [
          { name: 'Steamed Vegetable Momos (8pcs)', price: 139.00, category: 'Momos', imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80', desc: 'Delicate flour wrappers filled with finely minced mixed vegetables, steamed to order.' },
          { name: 'Veg Hakka Noodles', price: 179.00, category: 'Noodles', imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80', desc: 'Stir-fried wheat noodles tossed with julienned vegetables and light soy sauce.' },
          { name: 'Schezwan Fried Rice', price: 189.00, category: 'Rice', imageUrl: 'https://images.unsplash.com/photo-1603133872878-696658804445?w=600&auto=format&fit=crop&q=80', desc: 'Spicy, fiery wok-tossed rice flavored with hot Schezwan paste.' },
          { name: 'Crispy Spring Rolls (4pcs)', price: 129.00, category: 'Appetizers', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80', desc: 'Crunchy golden pastry shells stuffed with seasoned vegetables.' }
        ];
      } else if (catLower.includes('seafood')) {
        defaultProds = [
          { name: 'Grilled Salmon Steak', price: 499.00, category: 'Seafood', imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80', desc: 'Premium Atlantic salmon fillet grilled and served with lemon garlic butter sauce.' },
          { name: 'Garlic Butter Prawns', price: 399.00, category: 'Seafood', imageUrl: 'https://images.unsplash.com/photo-1559737607-3578911b4fa1?w=600&auto=format&fit=crop&q=80', desc: 'Plump prawns sautéed in garlic, rich butter, white wine, and fresh parsley.' },
          { name: 'Fish and Chips', price: 299.00, category: 'Seafood', imageUrl: 'https://images.unsplash.com/photo-1534080391025-09795d197a5b?w=600&auto=format&fit=crop&q=80', desc: 'Crispy beer-battered cod fillets served with rustic fries and tartar sauce.' },
          { name: 'Lobster Roll', price: 699.00, category: 'Seafood', imageUrl: 'https://images.unsplash.com/photo-1559737607-3578911b4fa1?w=600&auto=format&fit=crop&q=80', desc: 'Sweet lobster meat tossed in light herb mayo, served in a toasted brioche bun.' }
        ];
      } else if (catLower.includes('veg') || catLower.includes('salad') || catLower.includes('organic') || catLower.includes('healthy') || catLower.includes('jain') || catLower.includes('vegan')) {
        defaultProds = [
          { name: 'Avocado Quinoa Salad Bowl', price: 279.00, category: 'Salads & Bowls', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80', desc: 'Organic quinoa, fresh sliced avocado, kale, edamame, and lemon vinaigrette.' },
          { name: 'Mediterranean Falafel Wrap', price: 199.00, category: 'Wraps', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80', desc: 'Crispy falafels, hummus, cucumbers, and tomatoes wrapped in warm pita.' },
          { name: 'Vegan Buddha Bowl', price: 299.00, category: 'Salads & Bowls', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80', desc: 'Roasted sweet potato, chickpeas, steamed broccoli, and tahini dressing over brown rice.' },
          { name: 'Fresh Green Detox Juice', price: 149.00, category: 'Cold Press', imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a55b4cfd87?w=600&auto=format&fit=crop&q=80', desc: 'Cold-pressed green apples, cucumber, celery, spinach, and lemon juice.' }
        ];
      } else if (catLower.includes('biryani') || catLower.includes('hyderabadi')) {
        defaultProds = [
          { name: 'Kachhe Gosht ki Biryani', price: 349.00, category: 'Biryanis', imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80', desc: 'Aromatic basmati rice cooked layered with marinated raw mutton, saffron, and mint.' },
          { name: 'Hyderabadi Chicken Biryani', price: 279.00, category: 'Biryanis', imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80', desc: 'Basmati rice cooked dum-style with layered chicken, fried onions, and gourmet spices.' },
          { name: 'Mirchi Ka Salan', price: 99.00, category: 'Sides', imageUrl: 'https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=600&auto=format&fit=crop&q=80', desc: 'Traditional peanut-sesame curry gravy with whole green chillies.' },
          { name: 'Double Ka Meetha', price: 119.00, category: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80', desc: 'Hyderabadi bread pudding dessert soaked in saffron sugar syrup and thickened milk.' }
        ];
      } else {
        defaultProds = [
          { name: 'Butter Chicken Masala', price: 299.00, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80', desc: 'Tender tandoori chicken cooked in a rich, creamy, tomato butter gravy.' },
          { name: 'Paneer Butter Masala', price: 269.00, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80', desc: 'Artisanal cottage cheese cubes cooked in butter tomato gravy.' },
          { name: 'Chicken Dum Biryani', price: 279.00, category: 'Rice Specialities', imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80', desc: 'Slow-cooked aromatic basmati rice layered with juicy spiced chicken pieces.' },
          { name: 'Garlic Butter Naan', price: 59.00, category: 'Breads', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80', desc: 'Clay oven baked flatbread brushed with garlic and butter.' }
        ];
      }
    } else if (shopNiche === 'fashion_men') {
      defaultProds = [
        { name: 'Oversized Hoodie', price: 1299.00, originalPrice: 1999.00, discount: '35%', category: "Men's Clothing", imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80', desc: 'Discover the latest trends in fashion. Premium quality, perfect fit, just for you.' },
        { name: 'Floral Summer Dress', price: 1499.00, originalPrice: 2299.00, discount: '35%', category: "Women's Clothing", imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80', desc: 'Flowing ankle-length chiffon maxi dress with delicate floral prints, V-neckline, and an adjustable waist-tie.' },
        { name: 'Linen Shirt', price: 1099.00, originalPrice: 1699.00, discount: '35%', category: "Men's Clothing", imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80', desc: 'Classic lightweight linen button-down shirt with a relaxed tailored fit, perfect for casual outings.' },
        { name: 'Slim Fit Jeans', price: 1399.00, originalPrice: 2099.00, discount: '33%', category: "Men's Clothing", imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80', desc: 'Premium stretch denim slim-fit jeans featuring a mid-rise waist and classic five-pocket construction.' },
        { name: 'Bomber Jacket', price: 1799.00, originalPrice: 2699.00, discount: '33%', category: "Men's Clothing", imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80', desc: 'Sleek black lightweight bomber jacket with ribbed cuffs, zip closure, and side utility pockets.' }
      ];
    } else if (shopNiche === 'fashion_women') {
      defaultProds = [
        { name: 'Elegant Floral Maxi Dress', price: 2499.00, category: "Women's Clothing", imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80', desc: 'Flowing ankle-length chiffon maxi dress with delicate floral prints, V-neckline, and an adjustable waist-tie.' },
        { name: 'Designer Leather Handbag', price: 3499.00, category: "Women's Accessories", imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80', desc: 'Structured top-grain leather shoulder bag with gold-tone hardware and multiple organizational compartments.' },
        { name: 'Cotton Casual Blazer', price: 1999.00, category: "Women's Clothing", imageUrl: 'https://images.unsplash.com/photo-1548624149-f7b3e0c0df4a?w=600&auto=format&fit=crop&q=80', desc: 'Modern open-front lightweight cotton blend blazer with notched lapels and front patch pockets.' }
      ];
    } else if (shopNiche === 'fashion_kids') {
      defaultProds = [
        { name: 'Cute Cartoon Cotton Hoodie', price: 899.00, category: "Kids Wear", imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80', desc: 'Soft brushed fleece pullover hoodie for children featuring fun cartoon character ear extensions on the hood.' },
        { name: 'Kids Denim Dungarees', price: 1199.00, category: "Kids Wear", imageUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80', desc: 'Classic durable kids denim dungarees with adjustable shoulder straps and side button fasteners.' },
        { name: 'Soft Cotton Sleepwear Set', price: 799.00, category: "Kids Wear", imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80', desc: 'Breathable organic cotton matching pajama and long sleeve top set with whimsical space constellation print.' }
      ];
    } else if (shopNiche === 'fashion_footwear') {
      defaultProds = [
        { name: 'Premium Running Sneakers', price: 2999.00, category: "Footwear", imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', desc: 'High-performance athletic sneakers with reactive foam cushioning and mesh breathability grids.' },
        { name: 'Classic Leather Loafers', price: 3999.00, category: "Footwear", imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80', desc: 'Hand-burnished genuine leather slip-on loafers with cushioned leather insoles and durable rubber outsoles.' }
      ];
    } else if (shopNiche === 'electronics_mobile') {
      defaultProds = [
        { name: 'Flagship 5G Smartphone', price: 64999.00, category: "Mobiles", imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80', desc: 'Ultramodern smartphone with 6.7" OLED display, 108MP triple camera system, and 5000mAh long battery life.' },
        { name: 'Ultra Thin Protective Phone Case', price: 499.00, category: "Accessories", imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80', desc: 'Shock-proof silicone case with sleek matte finish and raised bezels for screen and camera protection.' }
      ];
    } else if (shopNiche === 'electronics_laptop') {
      defaultProds = [
        { name: 'Premium Ultrabook 14"', price: 84999.00, category: "Laptops", imageUrl: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=600&auto=format&fit=crop&q=80', desc: 'Super-thin laptop with high resolution IPS display, Octa-Core processor, and 16GB RAM for productivity.' },
        { name: 'High Performance Gaming Laptop', price: 114999.00, category: "Laptops", imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80', desc: 'Immersive gaming setup with powerful graphics card, 144Hz screen refresh rate, and advanced dual-cooling vents.' }
      ];
    } else if (shopNiche === 'electronics_accessories') {
      defaultProds = [
        { name: 'Noise Cancelling Wireless Headphones', price: 8999.00, category: "Accessories", imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80', desc: 'Active hybrid noise cancelling over-ear headphones with premium memory foam earmuffs and high-fidelity sound.' },
        { name: 'Ergonomic Wireless Mouse', price: 1499.00, category: "Accessories", imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80', desc: 'Optical mouse featuring quiet clicks, thumb scroll wheel, and customizable DPI settings for high precision.' }
      ];
    } else if (shopNiche === 'electronics_smartwatch') {
      defaultProds = [
        { name: 'GPS Sport Smartwatch', price: 18999.00, category: "Smart Watches", imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80', desc: 'Heart rate monitoring, fitness tracker, blood oxygen sensor, and standalone GPS route tracking.' },
        { name: 'Sleek Fitness Tracker Band', price: 3499.00, category: "Smart Watches", imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80', desc: 'Minimalist active fitness band tracking steps, sleep cycles, water intake, and high heart rate alerts.' }
      ];
    } else if (shopNiche === 'grocery_fruits') {
      defaultProds = [
        { name: 'Fresh Organic Gala Red Apples (1kg)', price: 180.00, category: 'Fruits', imageUrl: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=600&auto=format&fit=crop&q=80', desc: 'Fresh, sweet Gala red apples picked from certified pesticide-free orchards.' },
        { name: 'Sweet Seedless Green Grapes (500g)', price: 120.00, category: 'Fruits', imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80', desc: 'Juicy, sweet green seedless grapes packed under hygienic standards.' },
        { name: 'Premium Alphonso Mangoes (1 Dozen)', price: 850.00, category: 'Fruits', imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80', desc: 'Naturally ripened, extremely aromatic and sweet hand-picked Alphonso mangoes.' }
      ];
    } else if (shopNiche === 'grocery_vegetables') {
      defaultProds = [
        { name: 'Fresh Organic Tomatoes (1kg)', price: 60.00, category: 'Vegetables', imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a010c129fa6?w=600&auto=format&fit=crop&q=80', desc: 'Heirloom vine-ripened organic red tomatoes with excellent firmness and flavor.' },
        { name: 'Tender Green Broccoli (1 Piece)', price: 90.00, category: 'Vegetables', imageUrl: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=600&auto=format&fit=crop&q=80', desc: 'Fresh, crunch-filled premium green broccoli crowns, highly rich in fibers and vitamins.' },
        { name: 'Fresh Organic Potatoes (1kg)', price: 40.00, category: 'Vegetables', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b51482b04115?w=600&auto=format&fit=crop&q=80', desc: 'Premium quality organic soil potatoes ideal for baking, frying, and curries.' }
      ];
    } else if (shopNiche === 'grocery_essential') {
      defaultProds = [
        { name: 'Farm Fresh Whole Milk (1L)', price: 68.00, category: 'Daily Essentials', imageUrl: 'https://images.unsplash.com/photo-1584263343329-74f157f461b8?w=600&auto=format&fit=crop&q=80', desc: 'Pasteurized whole organic cow milk rich in vitamin D, sourced from local pastured cows.' },
        { name: 'Multi-Grain Sourdough Bread (400g)', price: 45.00, category: 'Daily Essentials', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80', desc: 'High-fiber freshly baked multi-grain bread loaf containing organic oats, barley, and seeds.' },
        { name: 'Organic Farm Eggs (Pack of 12)', price: 95.00, category: 'Daily Essentials', imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600&auto=format&fit=crop&q=80', desc: 'Free-range brown chicken eggs rich in omega-3 and proteins, delivered secure.' }
      ];
    } else if (shopNiche === 'pet_food') {
      defaultProds = [
        { name: 'Premium Chicken & Rice Dry Dog Food (3kg)', price: 1299.00, category: "Pet Food", imageUrl: 'https://images.unsplash.com/photo-1589721062230-fb10c85c2c7e?w=600&auto=format&fit=crop&q=80', desc: 'Complete nutritional dry food balanced with vitamins, fibers, and high-protein chicken for dogs.' },
        { name: 'Salmon in Gravy Wet Cat Food (Pack of 12)', price: 790.00, category: "Pet Food", imageUrl: 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=600&auto=format&fit=crop&q=80', desc: 'Delicious salmon chunks in thick savory gravy formulated to keep cats active and healthy.' }
      ];
    } else if (shopNiche === 'pet_accessories') {
      defaultProds = [
        { name: 'Durable Nylon Dog Harness', price: 599.00, category: "Accessories", imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop&q=80', desc: 'No-pull heavy-duty nylon harness with padded breathable mesh lining and reflective strips.' },
        { name: 'Soft Fleece Cushioned Pet Bed', price: 1499.00, category: "Accessories", imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=600&auto=format&fit=crop&q=80', desc: 'Ultra-plush fleece pet bed with elevated rims to support comfortable headrest and sleep.' }
      ];
    } else if (shopNiche === 'pet_medicines') {
      defaultProds = [
        { name: 'Tick & Flea Prevention Drops (Pack of 3)', price: 849.00, category: "Medicines", imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80', desc: 'Vet-recommended topical treatment drops to protect your dogs from fleas, ticks, and lice.' },
        { name: 'Multi-Vitamin Supplement Syrup (200ml)', price: 349.00, category: "Medicines", imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80', desc: 'Daily nutritional health syrup containing calcium, minerals, and essential vitamins for growth.' }
      ];
    } else if (shopNiche === 'books_education') {
      defaultProds = [
        { name: 'High School Physics Textbook', price: 699.00, category: "Education Books", imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80', desc: 'Comprehensive guide covering mechanics, quantum theory, electricity, and thermodynamics.' },
        { name: 'Master Data Structures & Algorithms', price: 899.00, category: "Education Books", imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80', desc: 'Complete syllabus with code implementations in Java, C++, and Python for engineering students.' }
      ];
    } else if (shopNiche === 'books_novels') {
      defaultProds = [
        { name: 'The Shadow of the Wind', price: 499.00, category: "Novels", imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80', desc: 'A gripping gothic mystery and romance novel set in post-war Barcelona about a forgotten book.' },
        { name: 'Classic Sci-Fi Odyssey', price: 799.00, category: "Novels", imageUrl: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&auto=format&fit=crop&q=80', desc: 'Special hardcover edition of the iconic science fiction masterpiece detailing interstellar space travel.' }
      ];
    } else if (shopNiche === 'books_ebook') {
      defaultProds = [
        { name: 'Digital Mastery in UI/UX Design (E-Book)', price: 299.00, category: "E-books", imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', desc: 'Downloadable e-book containing advanced design principles, wireframing guidelines, and user psychology.' },
        { name: 'Startup Launchpad Manual (E-Book)', price: 199.00, category: "E-books", imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80', desc: 'Practical workbook detailing seed funding raising, product-market fit, and team operations.' }
      ];
    } else if (shopNiche === 'cloth') {
      defaultProds = [
        { name: 'Vintage Denim Jacket', price: 89.99, category: 'Outerwear', imageUrl: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=600&auto=format&fit=crop&q=80', desc: 'Heavyweight denim jacket with shearling lining.' },
        { name: 'Cotton Floral Summer Dress', price: 54.99, category: 'Dresses', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80', desc: 'Breathable organic cotton dress with floral motif.' },
        { name: 'Classic Graphic Crewneck Tee', price: 24.99, category: 'T-Shirts', imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80', desc: 'Soft combed cotton tee with abstract design.' }
      ];
    } else if (shopNiche === 'grocery') {
      defaultProds = [
        { name: 'Organic Gala Red Apples (1kg)', price: 4.99, category: 'Fruits & Vegetables', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80', desc: 'Fresh, sweet red Gala apples from eco-orchards.' },
        { name: 'Whole Wheat Country Sourdough', price: 3.49, category: 'Bakery & Bread', imageUrl: 'https://images.unsplash.com/photo-1506617498336-d8d30030072e?w=600&auto=format&fit=crop&q=80', desc: 'Freshly baked naturally leavened country sourdough.' },
        { name: 'Farm Fresh Organic Milk (1L)', price: 2.99, category: 'Dairy & Eggs', imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=80', desc: 'Grass-fed cow milk rich in calcium.' }
      ];
    } else if (shopNiche === 'electronics') {
      defaultProds = [
        { name: 'Pro Noise-Cancelling Headphones', price: 149.99, category: 'Audio', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80', desc: 'Wireless over-ear headphones with hybrid ANC.' },
        { name: 'RGB Mechanical Gaming Keyboard', price: 89.99, category: 'Peripherals', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80', desc: 'RGB keyboard with hot-swappable linear red switches.' }
      ];
    } else {
      const nicheCap = shopNiche ? (shopNiche.charAt(0).toUpperCase() + shopNiche.slice(1)) : 'General';
      defaultProds = [
        { name: `Premium ${nicheCap} Essentials`, price: 29.99, category: `${nicheCap} Series`, imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80', desc: 'Premium quality essentials designed for your comfort.' },
        { name: `Luxury ${nicheCap} Collectible`, price: 45.00, category: `${nicheCap} Series`, imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80', desc: 'Elegant designer accessory piece.' }
      ];
    }

    const seeded: any[] = [];
    for (const prod of defaultProds) {
      const payload = {
        projectId: projId,
        name: prod.name,
        description: prod.desc,
        price: prod.price,
        category: prod.category,
        imageUrl: prod.imageUrl,
        stock: 50,
        variants: 'Default: Standard Size',
        available: true
      };
      try {
        const saved = await api.products.create(payload);
        seeded.push(saved);
      } catch (err) {
        console.warn('Seeding product offline fallback:', err);
        seeded.push({ ...payload, id: Date.now() + Math.random() });
      }
    }
    setAddedProducts(seeded);
  };

  // Step 5: Save project layout to backend
  const initializeProject = async () => {
    if (!selectedTemplateId) return;

    const targetName = `${companyName.trim()} Site`;
    if (projects.some((p) => p.name.trim().toLowerCase() === targetName.toLowerCase())) {
      showToast(`A workspace named "${targetName}" already exists! Please choose a unique company name.`, true);
      return;
    }

    let blocksJsonStr = '';

    if (isScratchFlow || selectedTemplateId === 'scratch') {
      const homeBlocks = [
        {
          id: 'header-scratch',
          type: 'header',
          theme: themePreset,
          content: {
            companyName: companyName.trim(),
            logoIcon: logoIcon || '⚡',
            logoUrl: customLogoUrl || '',
            layout: 'left-logo',
            links: [
              { label: 'Home', url: '?page=home' },
              { label: 'About', url: '?page=about' },
              { label: 'Contact', url: '?page=contact' }
            ]
          }
        },
        {
          id: 'hero-scratch',
          type: 'hero',
          theme: themePreset,
          content: {
            title: `Welcome to ${companyName.trim()}`,
            subtitle: slogan.trim() || 'Custom website created from scratch.',
            imageUrl: bannerUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
            btn1Text: 'Explore Products',
            btn1Url: '?page=shop',
            btn2Text: 'Learn More',
            btn2Url: '?page=about'
          }
        },
        {
          id: 'footer-scratch',
          type: 'footer',
          theme: themePreset,
          content: {
            text: `© 2026 ${companyName.trim()}. All rights reserved. Phone: ${contactPhone} | Email: ${contactEmail}`,
            layout: 'simple'
          }
        }
      ];

      const aboutBlocks = [
        {
          id: 'header-scratch-about',
          type: 'header',
          theme: themePreset,
          content: {
            companyName: companyName.trim(),
            logoIcon: logoIcon || '⚡',
            logoUrl: customLogoUrl || '',
            layout: 'left-logo',
            links: [
              { label: 'Home', url: '?page=home' },
              { label: 'About', url: '?page=about' },
              { label: 'Contact', url: '?page=contact' }
            ]
          }
        },
        {
          id: 'hero-scratch-about',
          type: 'hero',
          theme: themePreset,
          content: {
            title: `About ${companyName.trim()}`,
            subtitle: slogan.trim() || 'Learn more about our vision, our values, and our story.',
            imageUrl: bannerUrl || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80',
            btn1Text: 'Our Services',
            btn1Url: '?page=services',
            btn2Text: 'Contact Us',
            btn2Url: '?page=contact'
          }
        },
        {
          id: 'footer-scratch-about',
          type: 'footer',
          theme: themePreset,
          content: {
            text: `© 2026 ${companyName.trim()}. All rights reserved. Phone: ${contactPhone} | Email: ${contactEmail}`,
            layout: 'simple'
          }
        }
      ];

      const contactBlocks = [
        {
          id: 'header-scratch-contact',
          type: 'header',
          theme: themePreset,
          content: {
            companyName: companyName.trim(),
            logoIcon: logoIcon || '⚡',
            logoUrl: customLogoUrl || '',
            layout: 'left-logo',
            links: [
              { label: 'Home', url: '?page=home' },
              { label: 'About', url: '?page=about' },
              { label: 'Contact', url: '?page=contact' }
            ]
          }
        },
        {
          id: 'hero-scratch-contact',
          type: 'hero',
          theme: themePreset,
          content: {
            title: 'Contact Us',
            subtitle: 'Have questions? We would love to hear from you. Drop us a message below.',
            imageUrl: bannerUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
            btn1Text: 'Send Message',
            btn1Url: '#contact-form',
            btn2Text: 'Call Now',
            btn2Url: `tel:${contactPhone}`
          }
        },
        {
          id: 'footer-scratch-contact',
          type: 'footer',
          theme: themePreset,
          content: {
            text: `© 2026 ${companyName.trim()}. All rights reserved. Phone: ${contactPhone} | Email: ${contactEmail}`,
            layout: 'simple'
          }
        }
      ];

      const projectData = {
        pages: {
          home: homeBlocks,
          about: aboutBlocks,
          contact: contactBlocks
        },
        activePages: ['home', 'about', 'contact'],
        currentPage: 'home',
        businessConfig: {
          businessType,
          ownerName,
          whatsappNumber,
          address,
          city,
          state: stateVal,
          country,
          pincode,
          bannerUrl,
          faviconUrl,
          themeColor: themePreset,
          gstin: gstin.trim(),
          currency,
          domainName: domainType === 'subdomain' ? `${subdomainPrefix || 'store'}.zatbiz.site` : customDomainName,
          paymentGateway,
          stripeKey,
          sandboxMode,
          gstRate,
          seoTitle: `${companyName} | Premium ${businessType}`,
          seoDescription: slogan || `Custom visual site for ${companyName}`,
          seoKeywords: `${businessType}, ${companyName}, services`,
        }
      };
      blocksJsonStr = JSON.stringify(projectData);
    } else {
      const blocksList = generateTemplateBlocks({
        selectedTemplateId,
        companyName: companyName.trim(),
        slogan: slogan.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),
        logoType: logoType === 'auto' ? 'icon' : logoType,
        logoIcon,
        customLogoUrl,
        heroType: (selectedTemplateId === 'gym' && initialGymConfig?.headerBgImage) ? 'custom' : heroType,
        customHeroUrl: (selectedTemplateId === 'gym' && initialGymConfig?.headerBgImage) ? initialGymConfig.headerBgImage : customHeroUrl,
        shopNiche: shopNiche || undefined,
        restaurantCategory: initialRestaurantCategory || undefined,
        weddingCategory: initialWeddingCategory || undefined,
        ngoCategory: initialNgoCategory || undefined,
        corporateCategory: initialCorporateCategory || undefined,
        theme: themePreset,
      });

      // Append custom business config metadata block
      blocksList.push({
        id: 'business-config-block',
        type: 'business_config',
        theme: themePreset,
        content: {
          businessType,
          shopNiche,
          gstin: gstin.trim(),
          currency,
          domainName: domainType === 'subdomain' ? `${subdomainPrefix || 'store'}.zatbiz.site` : customDomainName,
          paymentGateway,
          stripeKey,
          sandboxMode,
          gstRate,
          seoTitle: `${companyName} | Premium ${businessType}`,
          seoDescription: slogan || `Custom visual site for ${companyName}`,
          seoKeywords: `${businessType}, ${companyName}, services`,
          ...(businessType === 'wedding' ? {
            weddingHomeOption: selectedWeddingHomeOption,
            weddingLoginOption: selectedWeddingLoginOption,
            weddingDashboardOption: selectedWeddingDashboardOption,
          } : {}),
        },
      });
      blocksJsonStr = JSON.stringify(blocksList);
    }

    const payload = {
      name: `${companyName} Site`,
      description: slogan || `Customized visual workspace for ${companyName}`,
      blocksJson: blocksJsonStr,
      status: 'Draft',
    };

    try {
      const newProj = await api.projects.create(payload);
      setProjectId(newProj.id);
      await seedDefaultNicheProducts(newProj.id, initialRestaurantCategory || undefined);
      showToast(`Website project initialized (ID: ${newProj.id})`);
      if (selectedTemplateId === 'medical-shop') {
        setStep(8);
      } else {
        setStep(6);
      }
    } catch (err) {
      console.error(err);
      // Fallback
      const tempId = Date.now();
      setProjectId(tempId);
      await seedDefaultNicheProducts(tempId, initialRestaurantCategory || undefined);
      showToast('Simulation: Project generated in sandbox memory.');
      if (selectedTemplateId === 'medical-shop') {
        setStep(8);
      } else {
        setStep(6);
      }
    }
  };

  const handleProdImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await encodeFile(file);
        setProdImageUrl(base64);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Step 6: Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice.trim()) return;

    const priceVal = parseFloat(prodPrice) || 0.0;
    const stockVal = parseInt(prodStock, 10) || 0;

    const productPayload = {
      projectId: projectId || 9999,
      name: prodName.trim(),
      description: `Premium catalog item seeded during setup workflow.`,
      price: priceVal,
      category: prodCategory.trim() || 'General',
      imageUrl: prodImageUrl || (businessType === 'restaurant' ? getRandomFoodImage(prodName.trim()) : '/images/login_illustration.png'),
      stock: stockVal,
      variants: 'Default: One Size',
      available: true,
    };

    try {
      if (projectId) {
        const savedProd = await api.products.create(productPayload);
        setAddedProducts([...addedProducts, savedProd]);
      } else {
        setAddedProducts([...addedProducts, { ...productPayload, id: Date.now() }]);
      }
      showToast(`Added product: ${prodName}`);
      setProdName('');
      setProdPrice('');
      setProdImageUrl('');
    } catch (err) {
      console.error(err);
      setAddedProducts([...addedProducts, { ...productPayload, id: Date.now() }]);
      showToast(`Added product in simulation memory.`);
      setProdName('');
      setProdPrice('');
      setProdImageUrl('');
    }
  };

  // Step 8: Domain Check
  const checkDomainAvailability = () => {
    setDomainChecked(true);
    showToast('Domain status: Available! Checkmark registered.');
  };

  // Step 9: Final Publish
  const publishWebsite = async () => {
    if (!projectId) return;

    try {
      // Fetch latest blocks, update status to Published, save domain/payment gateway
      const projectData = await api.projects.get(projectId);
      let parsed = JSON.parse(projectData.blocksJson) || [];
      
      const existingShopNiche = Array.isArray(parsed)
        ? parsed.find((b: any) => b.type === 'business_config')?.content?.shopNiche
        : parsed?.businessConfig?.shopNiche;

      const updatedConfig = {
        businessType,
        shopNiche: shopNiche || existingShopNiche || '',
        gstin: gstin.trim(),
        currency,
        domainName: domainType === 'subdomain' ? `${subdomainPrefix || 'store'}.zatbiz.site` : customDomainName,
        paymentGateway,
        stripeKey,
        sandboxMode,
        gstRate,
        seoTitle: `${companyName} | Premium ${businessType}`,
        seoDescription: slogan || `Custom visual site for ${companyName}`,
        seoKeywords: `${businessType}, ${companyName}, services`,
        ...(businessType === 'wedding' ? {
          weddingHomeOption: selectedWeddingHomeOption,
          weddingLoginOption: selectedWeddingLoginOption,
          weddingDashboardOption: selectedWeddingDashboardOption,
        } : {}),
      };

      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        // Multi-page structure
        parsed.businessConfig = {
          ...(parsed.businessConfig || {}),
          ...updatedConfig
        };
      } else if (Array.isArray(parsed)) {
        // Flat array structure
        const bizConfigIdx = parsed.findIndex((b: any) => b.type === 'business_config');
        if (bizConfigIdx !== -1) {
          parsed[bizConfigIdx].content = {
            ...(parsed[bizConfigIdx].content || {}),
            ...updatedConfig
          };
        } else {
          parsed.push({
            id: 'business-config-block',
            type: 'business_config',
            theme: themePreset,
            content: updatedConfig
          });
        }
      }

      const payload = {
        ...projectData,
        blocksJson: JSON.stringify(parsed),
        status: 'Published'
      };

      if (initialTemplateId === 'medical-shop' && initialMedicalShopConfig) {
        try {
          await api.medicalShop.create(projectId, initialMedicalShopConfig);
        } catch (medErr) {
          console.error('Failed to save medical shop info:', medErr);
        }
      }

      if (initialTemplateId === 'restaurant' && initialRestaurantConfig) {
        try {
          await api.restaurant.create(projectId, initialRestaurantConfig);
        } catch (restErr) {
          console.error('Failed to save restaurant info:', restErr);
        }
      }

      if (businessType === 'hospital') {
        try {
          await api.hospital.create(projectId, {
            subcategory: initialHospitalCategory || 'General Clinic',
            companyName: companyName,
            businessName: companyName,
            companyDescription: slogan,
            themeColor: '#4f46e5'
          });
        } catch (hospitalErr) {
          console.error('Failed to save hospital info:', hospitalErr);
        }
      }

      if (initialTemplateId === 'gym') {
        try {
          await api.gym.create(projectId, {
            subcategory: initialGymCategory || 'Traditional Gym',
            clubName: companyName,
            businessName: companyName,
            description: slogan,
            themeColor: GLOBAL_THEME_COLORS[themePreset] || 
                        (THEMES_30.find(t => t.id === themePreset)?.primaryColor) || 
                        initialGymThemeColor || 
                        '#ea580c',
            headerBgImage: initialGymConfig?.headerBgImage || bannerUrl || '',
            selectedLoginLayout: initialGymConfig?.selectedLoginLayout || 'split-left-image'
          });
        } catch (gymErr) {
          console.error('Failed to save gym info:', gymErr);
        }
      }

      if (businessType === 'restaurant') {
        try {
          await api.restaurant.create(projectId, {
            subcategory: initialRestaurantCategory || 'General Restaurant',
            restaurantName: companyName,
            businessName: companyName,
            description: slogan,
            ownerName: '',
            mobileNo: contactPhone || '',
            email: contactEmail || '',
            city: city || '',
            state: stateVal || '',
            country: country || '',
            pincode: pincode || '',
            logoUrl: customLogoUrl || '',
            themeColor: themePreset || 'slate'
          });
        } catch (restErr) {
          console.error('Failed to save restaurant info:', restErr);
        }
      }

      const updatedProject = await api.projects.update(projectId, payload);
      setIsPublished(true);
      showToast('Website Published Live!');
      onComplete(updatedProject);
    } catch (err) {
      console.error(err);
      setIsPublished(true);
      showToast('Website published in simulation sandbox mode.');
      onComplete({
        id: projectId || 9999,
        name: companyName,
        description: slogan,
        blocksJson: '[]',
        status: 'Published'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-6 overflow-y-auto">
      <div className="w-full max-w-[720px] bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto font-sans flex flex-col">
        
        {/* Stepper Header Progress */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 z-10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                ZATBIZ Business Builder Wizard
              </span>
              <h3 className="text-lg font-black tracking-tight mt-0.5">
                {selectedTemplateId === 'wedding' ? (
                  step === 7 ? '🎉 Ready to Launch!' : `Step ${step} of 6: ${getStepTitle(step, isScratchFlow, selectedTemplateId)}`
                ) : (
                  step === 9 ? '🎉 Ready to Launch!' : `Step ${step} of 8: ${getStepTitle(step, isScratchFlow, selectedTemplateId)}`
                )}
              </h3>
            </div>
            {step < (selectedTemplateId === 'wedding' ? 7 : 9) && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white font-bold cursor-pointer text-xs bg-slate-800 hover:bg-slate-700 w-7 h-7 rounded-full flex items-center justify-center transition"
              >
                ✕
              </button>
            )}
          </div>

          {/* Graphical Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex gap-0.5">
            {(selectedTemplateId === 'wedding' ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 6, 7, 8]).map((s) => (
              <div
                key={s}
                className={`flex-1 h-full rounded-full transition-all duration-300 ${
                  step >= s ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Content Scroll area */}
        <div className="p-8 flex-1">
          {selectedTemplateId === 'wedding' ? (
            <WeddingWizardSteps
              step={step}
              setStep={setStep}
              selectedWeddingHomeOption={selectedWeddingHomeOption}
              setSelectedWeddingHomeOption={setSelectedWeddingHomeOption}
              selectedWeddingLoginOption={selectedWeddingLoginOption}
              setSelectedWeddingLoginOption={setSelectedWeddingLoginOption}
              selectedWeddingDashboardOption={selectedWeddingDashboardOption}
              setSelectedWeddingDashboardOption={setSelectedWeddingDashboardOption}
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              companyName={companyName}
              setCompanyName={setCompanyName}
              slogan={slogan}
              setSlogan={setSlogan}
              contactEmail={contactEmail}
              setContactEmail={setContactEmail}
              contactPhone={contactPhone}
              setContactPhone={setContactPhone}
              logoType={logoType}
              setLogoType={setLogoType}
              logoIcon={logoIcon}
              setLogoIcon={setLogoIcon}
              customLogoUrl={customLogoUrl}
              setCustomLogoUrl={setCustomLogoUrl}
              customHeroUrl={customHeroUrl}
              setCustomHeroUrl={setCustomHeroUrl}
              domainType={domainType}
              setDomainType={setDomainType}
              subdomainPrefix={subdomainPrefix}
              setSubdomainPrefix={setSubdomainPrefix}
              customDomainName={customDomainName}
              setCustomDomainName={setCustomDomainName}
              isRegistered={isRegistered}
              setIsRegistered={setIsRegistered}
              isSigningUp={isSigningUp}
              setIsSigningUp={setIsSigningUp}
              isPublished={isPublished}
              setIsPublished={setIsPublished}
              projectId={projectId}
              setProjectId={setProjectId}
              showToast={showToast}
              onClose={onClose}
              onComplete={onComplete}
              initialWeddingCategory={initialWeddingCategory}
              gstin={gstin}
              currency={currency}
              paymentGateway={paymentGateway}
              stripeKey={stripeKey}
              sandboxMode={sandboxMode}
              gstRate={gstRate}
            />
          ) : (
            <>
              {step === 1 && (
            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="text-center max-w-sm mx-auto mb-6">
                <span className="text-4xl block mb-2">👋</span>
                <h4 className="text-base font-extrabold">Let's create your platform account</h4>
                <p className="text-xs text-slate-400 mt-1">
                  First step is registering your primary administrator credentials to secure your workspace.
                </p>
              </div>

              <div className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Primary Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin_merchant"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. merchant@zatbiz.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-750 hover:to-purple-750 font-bold rounded-xl text-xs shadow-md transition hover:scale-[1.01] cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningUp ? 'Registering...' : 'Create Account & Next ➔'}
                </button>
                {initialTemplateId === 'storefront' && (
                  <button
                    type="button"
                    onClick={() => setStep(10)}
                    className="w-full py-2.5 mt-2 border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    ← Back to Niche Selection
                  </button>
                )}
              </div>
            </form>
          )}

          {step === 2 && (
            selectedTemplateId === 'realestate' ? (
              <form onSubmit={handleRealEstateNichesSubmit} className="space-y-6">
                <div className="text-center max-w-sm mx-auto mb-4">
                  <h4 className="text-sm font-extrabold text-white">Select Property Niches</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose the categories of real estate your business works with (Select one or more).
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[350px] overflow-y-auto pr-1">
                  {[
                    { id: 'Residential', name: 'Residential', icon: '🏡', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80' },
                    { id: 'Commercial', name: 'Commercial', icon: '🏢', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80' },
                    { id: 'Rental', name: 'Rental', icon: '🔑', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop&q=80' },
                    { id: 'Builder', name: 'Builder / Construction', icon: '🏗️', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format&fit=crop&q=80' },
                    { id: 'Property Dealer', name: 'Property Dealer', icon: '👔', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop&q=80' },
                    { id: 'Luxury', name: 'Luxury Estates', icon: '💎', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format&fit=crop&q=80' }
                  ].map((niche) => {
                    const isSelected = realEstateNiches.includes(niche.id);
                    return (
                      <button
                        type="button"
                        key={niche.id}
                        onClick={() => {
                          if (isSelected) {
                            setRealEstateNiches(realEstateNiches.filter(n => n !== niche.id));
                          } else {
                            setRealEstateNiches([...realEstateNiches, niche.id]);
                          }
                        }}
                        className={`p-3 bg-slate-950 border rounded-xl text-left cursor-pointer transition hover:scale-[1.02] flex flex-col gap-2 relative group overflow-hidden ${
                          isSelected ? 'border-indigo-500 shadow-md shadow-indigo-500/15' : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="w-full h-20 rounded-lg overflow-hidden relative">
                          <img src={niche.image} alt={niche.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition" />
                          <div className="absolute top-1.5 left-1.5 bg-slate-900/80 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                            {niche.icon}
                          </div>
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-slate-200 group-hover:text-indigo-400 transition">{niche.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
                  >
                    Continue ➔
                  </button>
                </div>
              </form>
            ) : isScratchFlow ? (
              <form onSubmit={handleStep2Next} className="space-y-6">
                <div className="text-center max-w-sm mx-auto mb-4">
                  <h4 className="text-sm font-extrabold text-white">Basic Business Details</h4>
                  <p className="text-xs text-slate-450 mt-1">
                    Please provide the basic identity details of your brand.
                  </p>
                </div>
                <div className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Business / Store Name
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Vintage Apparel / Food Street"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Business Type
                    </label>
                    <select
                      required
                      value={businessType || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBusinessType(val as any);
                        if (val === 'fashion') {
                          setShopNiche('cloth');
                          setSelectedTemplateId('storefront');
                        } else if (val === 'restaurant') {
                          setShopNiche(null);
                          setSelectedTemplateId('restaurant');
                        } else if (val === 'hospital') {
                          setShopNiche(null);
                          setSelectedTemplateId('clinic');
                        } else if (val === 'school') {
                          setShopNiche(null);
                          setSelectedTemplateId('school');
                        } else {
                          setShopNiche(null);
                          setSelectedTemplateId('scratch');
                        }
                      }}
                      className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-slate-300 transition"
                    >
                      <option value="" className="bg-slate-900">Select Business Type</option>
                      <option value="fashion" className="bg-slate-900">👗 Fashion Store</option>
                      <option value="restaurant" className="bg-slate-900">🍕 Restaurant</option>
                      <option value="hospital" className="bg-slate-900">🏥 Clinic / Hospital</option>
                      <option value="school" className="bg-slate-900">🏫 School / Academy</option>
                      <option value="general" className="bg-slate-900">🛍️ General Store / E-commerce</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Business Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      placeholder="Write a brief overview of your business..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
                  >
                    Continue ➔
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleStep2Next} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Company / Store Brand Name
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Royal Bistro / Spark Shop"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Business Slogan / Slogan Line
                    </label>
                    <input
                      type="text"
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      placeholder="e.g. Crafted culinary masterpieces"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Store Contact Phone
                    </label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Store Billing Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none transition"
                    >
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      GSTIN (GST Identification Number)
                    </label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="e.g. 27AAAAA1111A1Z1 (For automated GST invoicing)"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none uppercase transition"
                    />
                  </div>

                  <div className="md:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <span className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                      Company Logo Symbol
                    </span>
                    
                    <div className="flex gap-4 text-xs font-semibold text-slate-400 mb-2">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="wizLogoType"
                          checked={logoType === 'icon'}
                          onChange={() => setLogoType('icon')}
                          className="text-indigo-600 focus:ring-0"
                        />
                        Preset Emoji Symbol
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="wizLogoType"
                          checked={logoType === 'custom'}
                          onChange={() => setLogoType('custom')}
                          className="text-indigo-600 focus:ring-0"
                        />
                        Upload Custom Graphic File
                      </label>
                    </div>

                    {logoType === 'icon' ? (
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { icon: '🍕', label: 'Pizza' },
                          { icon: '🛍️', label: 'Store' },
                          { icon: '🏫', label: 'School' },
                          { icon: '🏥', label: 'Clinic' },
                          { icon: '☕', label: 'Cafe' },
                          { icon: '⚡', label: 'Energy' },
                          { icon: '💪', label: 'Fitness' },
                          { icon: '💼', label: 'Agency' },
                        ].map((item) => (
                          <button
                            type="button"
                            key={item.icon}
                            onClick={() => setLogoIcon(item.icon)}
                            className={`py-3 text-center border rounded-xl cursor-pointer transition ${
                              logoIcon === item.icon
                                ? 'border-indigo-500 bg-indigo-950/20 text-white'
                                : 'border-slate-800 hover:border-slate-700 bg-slate-900/50 text-slate-300'
                            }`}
                          >
                            <span className="block text-xl">{item.icon}</span>
                            <span className="block text-[8px] font-bold text-slate-500 mt-1 uppercase">
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileChange}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 outline-none"
                        />
                        {customLogoUrl && (
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-slate-400 font-bold uppercase">Preview:</span>
                            <img src={customLogoUrl} className="w-8 h-8 object-contain rounded border border-slate-800 bg-white" alt="logo" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
                  >
                    Save & Next Step ➔
                  </button>
                </div>
              </form>
            )
          )}

          {step === 3 && (
            selectedTemplateId === 'realestate' ? (
              <form onSubmit={handleRealEstateFormsSubmit} className="space-y-6">
                <div className="text-center max-w-sm mx-auto mb-4">
                  <h4 className="text-sm font-extrabold text-white">Company & Owner Information</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter details about your agency and contact info for buyer inquiries.
                  </p>
                </div>

                <div className="max-h-[350px] overflow-y-auto pr-1 space-y-4 max-w-lg mx-auto text-left">
                  {/* Section 1: Company details */}
                  <div className="border-b border-slate-850 pb-4 space-y-4">
                    <span className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Company Info</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Grand Landmark Builders"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Business Name *</label>
                        <input
                          type="text"
                          required
                          value={businessNameVal}
                          onChange={(e) => setBusinessNameVal(e.target.value)}
                          placeholder="e.g. Landmark Realty"
                          className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Company Description</label>
                      <textarea
                        rows={2}
                        value={companyDescVal}
                        onChange={(e) => setCompanyDescVal(e.target.value)}
                        placeholder="e.g. Leading provider of luxury villas and residential plots with verified documentation."
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Section 2: Owner details */}
                  <div className="border-b border-slate-850 pb-4 space-y-4">
                    <span className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Owner Contact</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Owner Name</label>
                        <input
                          type="text"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          placeholder="e.g. Ritesh Kumar"
                          className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mobile Number</label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="e.g. contact@landmark.com"
                          className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp Number</label>
                        <input
                          type="tel"
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Address details */}
                  <div className="space-y-4">
                    <span className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Office Address</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Noida"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">State</label>
                        <input
                          type="text"
                          value={stateVal}
                          onChange={(e) => setStateVal(e.target.value)}
                          placeholder="e.g. Uttar Pradesh"
                          className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Country</label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="e.g. India"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pincode</label>
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="e.g. 201301"
                          className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
                  >
                    Continue ➔
                  </button>
                </div>
              </form>
            ) : isScratchFlow ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(4);
                }}
                className="space-y-6"
              >
                <div className="text-center max-w-sm mx-auto mb-4">
                  <h4 className="text-sm font-extrabold text-white">Contact Information</h4>
                  <p className="text-xs text-slate-455 mt-1">
                    Fill out the primary contact details for your business representation.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. john@business.com"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
                  >
                    Continue ➔
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center max-w-sm mx-auto mb-4">
                  <h4 className="text-sm font-extrabold text-white">Select Your Business Category</h4>
                  <p className="text-xs text-slate-455 mt-1">
                    We customize the visual building blocks and database structures based on the workflow of your business type.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      type: 'restaurant',
                      title: 'Restaurant & Dining',
                      icon: '🍕',
                      desc: 'Bookings, dynamic chef special menu list, reservation table scheduler, customer cart checkout.',
                      color: 'from-orange-500 to-amber-600',
                    },
                    {
                      type: 'shop',
                      title: 'Shop / Retail Store',
                      icon: '🛍️',
                      desc: 'Product catalog grids, inventory tracking, variant choices, low-stock warnings, shopping cart checkout.',
                      color: 'from-indigo-500 to-blue-600',
                    },
                    {
                      type: 'school',
                      title: 'School / Academy',
                      icon: '🏫',
                      desc: 'AP academic tracks, course fees grid, enrollment registration forms, AP advisors, contact sheets.',
                      color: 'from-emerald-500 to-teal-600',
                    },
                    {
                      type: 'hospital',
                      title: 'Hospital & Clinic',
                      icon: '🏥',
                      desc: 'Diagnostics departments, doctors catalog, patient FAQ accordion, clinical appointments booking.',
                      color: 'from-rose-500 to-red-600',
                    },
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => selectBusinessType(item.type as any)}
                      className="p-6 bg-slate-955 border border-slate-800 hover:border-slate-650 rounded-2xl text-left cursor-pointer transition hover:scale-[1.01] hover:shadow-lg group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-2xl shadow-lg mb-4 group-hover:scale-110 transition`}>
                        {item.icon}
                      </div>
                      <h5 className="font-extrabold text-sm text-white mb-2">{item.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            )
          )}

          {step === 10 && (
            <div className="space-y-6">
              {wizardNicheCategory === null ? (
                <>
                  <div className="text-center max-w-sm mx-auto mb-4">
                    <h4 className="text-sm font-extrabold text-white">Select E-commerce Store Category</h4>
                    <p className="text-xs text-slate-450 mt-1">
                      Choose a store type to view specific sub-options and automatically configure your storefront.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
                    {ECOMMERCE_CATEGORIES.map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setWizardNicheCategory(cat.id)}
                        className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-650 rounded-2xl text-left cursor-pointer transition hover:scale-[1.01] hover:shadow-lg group flex items-center gap-4"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-xs text-white mb-1 flex items-center gap-1.5">
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                          </h5>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{cat.desc}</p>
                        </div>
                      </button>
                    ))}

                    {/* Build from Scratch Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setShopNiche('scratch');
                        setLogoIcon('🛍️');
                        setProdCategory('General');
                        if (initialTemplateId === 'storefront') {
                          if (!isRegistered) {
                            setStep(1);
                          } else if (!companyName.trim()) {
                            setStep(2);
                          } else {
                            setStep(5);
                          }
                        } else {
                          setStep(1);
                        }
                      }}
                      className="p-4 bg-indigo-950/30 border border-dashed border-indigo-800 hover:border-indigo-500 rounded-2xl text-left cursor-pointer transition hover:scale-[1.01] hover:shadow-lg group flex items-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative bg-slate-900 flex items-center justify-center border border-indigo-900">
                        <img 
                          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&auto=format&fit=crop&q=80" 
                          alt="scratch" 
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300 opacity-60" 
                        />
                        <span className="absolute text-xl z-20">✨</span>
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-indigo-400 mb-1 flex items-center gap-1.5">
                          <span>✨</span>
                          <span>Build from Scratch</span>
                        </h5>
                        <p className="text-[10px] text-indigo-200/70 leading-relaxed font-semibold">Skip presets and create a blank custom online store canvas.</p>
                      </div>
                    </button>

                    {/* Choose Theme Template Option */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectThemeTemplates) {
                          onSelectThemeTemplates();
                        }
                      }}
                      className="p-4 bg-slate-950 border border-indigo-900 hover:border-indigo-650 rounded-2xl text-left cursor-pointer transition hover:scale-[1.01] hover:shadow-lg group flex items-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative bg-slate-900 flex items-center justify-center border border-slate-800">
                        <img 
                          src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&auto=format&fit=crop&q=80" 
                          alt="theme-template" 
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300 opacity-70" 
                        />
                        <span className="absolute text-xl z-20">🎨</span>
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-indigo-300 mb-1 flex items-center gap-1.5">
                          <span>🎨</span>
                          <span>Choose Theme Template</span>
                        </h5>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Select from our collection of 30 designer storefront templates.</p>
                      </div>
                    </button>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        if (initialTemplateId === 'storefront') {
                          onClose();
                        } else {
                          setStep(3);
                        }
                      }}
                      className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition cursor-pointer"
                    >
                      ← Back
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {(() => {
                    const currentCategory = ECOMMERCE_CATEGORIES.find(c => c.id === wizardNicheCategory);
                    if (!currentCategory) return null;

                    return (
                      <>
                        <div className="text-center max-w-sm mx-auto mb-4">
                          <h4 className="text-sm font-extrabold text-white">{currentCategory.name} Sub-options</h4>
                          <p className="text-xs text-slate-450 mt-1">
                            Select a specific template niche to seed catalog items and set visual styles.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                          {currentCategory.subOptions.map((sub) => (
                            <button
                              type="button"
                              key={sub.id}
                              onClick={() => {
                                setShopNiche(sub.id);
                                setLogoIcon(sub.icon);
                                setProdCategory(sub.category);
                                
                                // Route step correctly based on wizard entry path
                                if (initialTemplateId === 'storefront') {
                                  if (!isRegistered) {
                                    setStep(1);
                                  } else if (!companyName.trim()) {
                                    setStep(2);
                                  } else {
                                    setStep(5);
                                  }
                                } else if (selectedTemplateId === 'storefront') {
                                  setStep(5);
                                } else {
                                  setStep(4);
                                }
                              }}
                              className="p-3 bg-slate-950 border border-slate-800 hover:border-indigo-500/40 rounded-xl text-left cursor-pointer transition hover:scale-[1.02] flex flex-col gap-2 group"
                            >
                              <div className="w-full h-24 rounded-lg overflow-hidden relative">
                                <img src={sub.image} alt={sub.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                <div className="absolute top-2 left-2 bg-slate-900/80 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                  {sub.icon}
                                </div>
                              </div>
                              <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition">{sub.name}</span>
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between pt-4 border-t border-slate-800">
                          <button
                            type="button"
                            onClick={() => setWizardNicheCategory(null)}
                            className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition cursor-pointer"
                          >
                            ← Back
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </>
              )}
            </div>
          )}

          {step === 4 && (
            selectedTemplateId === 'realestate' ? (
              <form onSubmit={handleRealEstateBrandingSubmit} className="space-y-6">
                <div className="text-center max-w-sm mx-auto mb-4">
                  <h4 className="text-sm font-extrabold text-white">Branding & Theme Customization</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose a theme color, select your logo type, and set background assets.
                  </p>
                </div>

                <div className="max-h-[350px] overflow-y-auto pr-1 space-y-4 max-w-md mx-auto text-left">
                  {/* 1. Theme Color selection */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Theme Color Scheme *</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
                      {(() => {
                        const themeOptions = [
                          { id: 'emerald', name: 'Emerald', color: 'bg-emerald-500' },
                          { id: 'deepblue', name: 'Navy Blue', color: 'bg-blue-600' },
                          { id: 'purple', name: 'Luxury Amber', color: 'bg-amber-600' },
                          { id: 'sunset', name: 'Sunset Orange', color: 'bg-orange-500' },
                          { id: 'slate', name: 'Classic Slate', color: 'bg-slate-600' }
                        ];
                        if (themePreset && (themePreset.startsWith('realestate-') || themePreset.startsWith('gym-'))) {
                          const foundTheme = THEMES_30.find(t => t.id === themePreset);
                          if (foundTheme && !themeOptions.some(o => o.id === themePreset)) {
                            themeOptions.push({
                              id: foundTheme.id,
                              name: foundTheme.name,
                              color: ''
                            });
                          }
                        }
                        return themeOptions.map((theme) => {
                          const isSelected = themePreset === theme.id;
                          const isCustom = theme.id.startsWith('realestate-') || theme.id.startsWith('gym-');
                          const customColor = isCustom
                            ? (THEMES_30.find(t => t.id === theme.id)?.primaryColor || '#10B981')
                            : '';
                          return (
                            <button
                              type="button"
                              key={theme.id}
                              onClick={() => setThemePreset(theme.id)}
                              className={`py-2 px-1 text-center rounded-xl border text-[9px] font-bold flex flex-col items-center gap-1.5 cursor-pointer ${
                                isSelected ? 'border-indigo-500 bg-indigo-950/20' : 'border-slate-850 hover:border-slate-700 bg-slate-900/50'
                              }`}
                            >
                              <span
                                style={customColor ? { backgroundColor: customColor } : {}}
                                className={`w-3.5 h-3.5 rounded-full ${isCustom ? '' : theme.color} shadow-inner`}
                              />
                              <span className="truncate w-full block">{theme.name}</span>
                            </button>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  {/* 2. Logo Configuration */}
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Logo Option</label>
                    
                    <div className="flex gap-4 text-xs font-semibold text-slate-400 mb-2">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="reLogoType"
                          checked={logoType === 'auto'}
                          onChange={() => setLogoType('auto')}
                          className="text-indigo-600 focus:ring-0"
                        />
                        Auto-generate (SVG initials)
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="reLogoType"
                          checked={logoType === 'custom'}
                          onChange={() => setLogoType('custom')}
                          className="text-indigo-600 focus:ring-0"
                        />
                        Upload Graphic Logo
                      </label>
                    </div>

                    {logoType === 'custom' ? (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileChange}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-950 file:text-indigo-400 hover:file:bg-indigo-900 cursor-pointer"
                        />
                        {customLogoUrl && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] text-slate-400 font-bold uppercase">Uploaded Preview:</span>
                            <img src={customLogoUrl} className="w-8 h-8 object-contain rounded border border-slate-800 bg-white" alt="uploaded logo" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-300 uppercase block">Generative Logo preview</span>
                          <span className="text-[9px] text-slate-500 block">Based on company initials & theme color</span>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center font-extrabold text-white text-xs uppercase" style={{
                          backgroundColor: themePreset === 'emerald' ? '#10B981' : themePreset === 'deepblue' ? '#3B82F6' : themePreset === 'purple' ? '#D97706' : themePreset === 'sunset' ? '#F97316' : '#475569'
                        }}>
                          {companyName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'RE'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Brand Background Image */}
                  <div className="bg-slate-955 border border-slate-850 p-4 rounded-xl space-y-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brand Banner/Hero Background Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const base64 = await encodeFile(file);
                            setBrandImageVal(base64);
                          } catch (err) {
                            console.error(err);
                          }
                        }
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-950 file:text-indigo-400 hover:file:bg-indigo-900 cursor-pointer"
                    />
                    {brandImageVal ? (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Image Preview:</span>
                        <img src={brandImageVal} className="w-12 h-8 object-cover rounded border border-slate-800 bg-white" alt="brand banner preview" />
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-500 font-medium">No custom image. Premium modern home visual preset will be used.</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer font-bold"
                  >
                    Save & Generate Website ➔
                  </button>
                </div>
              </form>
            ) : isScratchFlow ? (
              <form onSubmit={(e) => { e.preventDefault(); setStep(5); }} className="space-y-6">
                <div className="text-center max-w-sm mx-auto mb-4">
                  <h4 className="text-sm font-extrabold text-white">Address Information</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Please provide the address details for your business.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 123 Business Arcade, MG Road"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      State / Province
                    </label>
                    <input
                      type="text"
                      required
                      value={stateVal}
                      onChange={(e) => setStateVal(e.target.value)}
                      placeholder="e.g. Maharashtra"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. India"
                      className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Pincode / Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 400001"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs outline-none text-white transition"
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-755 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
                  >
                    Continue ➔
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center max-w-sm mx-auto mb-4">
                  <h4 className="text-sm font-extrabold">Choose Your Visual template Layout</h4>
                  <p className="text-xs text-slate-455 mt-1">
                    We found customized starter templates designed specifically for **{businessType?.toUpperCase()}** layout.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getTemplatesForBiz(businessType).map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => {
                        setSelectedTemplateId(tpl.id);
                        setStep(5);
                      }}
                      className={`p-6 border rounded-2xl text-left cursor-pointer transition hover:scale-[1.01] ${
                        selectedTemplateId === tpl.id
                          ? 'border-indigo-500 bg-indigo-950/20'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-3xl block mb-4">{tpl.icon}</span>
                      <h5 className="font-extrabold text-sm mb-2">{tpl.name}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium mb-4">{tpl.desc}</p>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                        Select Template ➔
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(businessType === 'shop' ? 10 : 3)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            )
          )}

          {step === 5 && (
            isScratchFlow ? (
              <div className="space-y-6">
                <div className="text-center max-w-sm mx-auto mb-4">
                  <h4 className="text-sm font-extrabold text-white">Branding & Theme Details</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Customize your brand assets, logo, banner, and theme color choices.
                  </p>
                </div>
                <div className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Site Preset Theme Palette
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'slate', name: 'Charcoal', color: 'bg-slate-700' },
                        { id: 'deepblue', name: 'Navy Ocean', color: 'bg-indigo-900' },
                        { id: 'sunset', name: 'Sunset Warm', color: 'bg-amber-600' },
                        { id: 'purple', name: 'Cyber Neon', color: 'bg-purple-700' },
                      ].map((theme) => (
                        <button
                          type="button"
                          key={theme.id}
                          onClick={() => setThemePreset(theme.id)}
                          className={`py-2 text-center rounded-xl border text-[10px] font-bold flex flex-col items-center gap-1.5 cursor-pointer ${
                            themePreset === theme.id
                              ? 'border-indigo-500 bg-indigo-950/20'
                              : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full ${theme.color}`} />
                          <span>{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Business Logo Upload
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-950 file:text-indigo-400 hover:file:bg-indigo-900 cursor-pointer"
                    />
                    {customLogoUrl ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Logo Preview:</span>
                        <img src={customLogoUrl} className="w-8 h-8 object-contain rounded border border-slate-800 bg-white" alt="logo" />
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-500 font-medium">No custom logo. Default preset icon: {logoIcon} will be used.</div>
                    )}
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Store Banner Graphic Banner
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const base64 = await encodeFile(file);
                            setBannerUrl(base64);
                          } catch (err) {
                            console.error(err);
                          }
                        }
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-950 file:text-indigo-400 hover:file:bg-indigo-900 cursor-pointer"
                    />
                    {bannerUrl && (
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Banner Preview:</span>
                        <img src={bannerUrl} className="max-h-12 object-contain rounded border border-slate-800 bg-white" alt="banner" />
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Favicon Settings
                    </label>
                    <div className="flex gap-4 text-xs font-semibold text-slate-400 mb-2">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="wizFaviconType"
                          checked={faviconType === 'icon'}
                          onChange={() => setFaviconType('icon')}
                          className="text-indigo-600 focus:ring-0"
                        />
                        Preset Icon / Emoji
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="wizFaviconType"
                          checked={faviconType === 'custom'}
                          onChange={() => setFaviconType('custom')}
                          className="text-indigo-600 focus:ring-0"
                        />
                        Upload Custom Favicon
                      </label>
                    </div>
                    {faviconType === 'icon' ? (
                      <input
                        type="text"
                        value={faviconUrl}
                        onChange={(e) => setFaviconUrl(e.target.value)}
                        placeholder="e.g. ⚡ / 🍕"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2 text-xs outline-none text-white transition"
                      />
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const base64 = await encodeFile(file);
                              setFaviconUrl(base64);
                            } catch (err) {
                              console.error(err);
                            }
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-400 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-950 file:text-indigo-400 hover:file:bg-indigo-900 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={initializeProject}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
                  >
                    Generate Scratch Canvas ➔
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <span className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                    Brand Customizer Configurations
                  </span>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Site Preset Theme Palette
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { id: 'slate', name: 'Charcoal', color: 'bg-slate-700' },
                          { id: 'deepblue', name: 'Navy Ocean', color: 'bg-indigo-900' },
                          { id: 'sunset', name: 'Sunset Warm', color: 'bg-amber-600' },
                          { id: 'purple', name: 'Cyber Neon', color: 'bg-purple-700' },
                        ].map((theme) => (
                          <button
                            type="button"
                            key={theme.id}
                            onClick={() => setThemePreset(theme.id)}
                            className={`py-2 text-center rounded-xl border text-[10px] font-bold flex flex-col items-center gap-1.5 cursor-pointer ${
                              themePreset === theme.id
                                ? 'border-indigo-500 bg-indigo-950/20'
                                : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full ${theme.color}`} />
                            <span>{theme.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Site Hero Graphic Header
                      </label>
                      <div className="flex gap-4 text-xs font-semibold text-slate-400 mb-2">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="wizHeroType"
                            checked={heroType === 'default'}
                            onChange={() => setHeroType('default')}
                            className="text-indigo-600 focus:ring-0"
                          />
                          Use Default High-Quality Template Stock
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="wizHeroType"
                            checked={heroType === 'custom'}
                            onChange={() => setHeroType('custom')}
                            className="text-indigo-600 focus:ring-0"
                          />
                          Upload Custom Hero Banner
                        </label>
                      </div>

                      {heroType === 'custom' && (
                        <div className="space-y-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  const base64 = await encodeFile(file);
                                  setCustomHeroUrl(base64);
                                } catch (err) {
                                  console.error(err);
                                }
                              }
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 outline-none"
                          />
                          {customHeroUrl && (
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] text-slate-400 font-bold uppercase">Preview:</span>
                              <img src={customHeroUrl} className="max-h-16 object-contain rounded border border-slate-800 bg-slate-900" alt="hero" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      if (initialTemplateId === 'storefront') {
                        setStep(2);
                      } else if (selectedTemplateId === 'storefront') {
                        setStep(10);
                      } else {
                        setStep(4);
                      }
                    }}
                    className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={initializeProject}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
                  >
                    Generate Workspace Canvas ➔
                  </button>
                </div>
              </div>
            )
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center max-w-sm mx-auto">
                <h4 className="text-sm font-extrabold">Seed Your Products / Services</h4>
                <p className="text-xs text-slate-450 mt-1">
                  Create database items for your catalog. These will populate your public site storefront automatically.
                </p>
              </div>

              <form onSubmit={handleAddProduct} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Item / Product / Service Name
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder={businessType === 'restaurant' ? 'e.g. Classic Margherita Pizza' : 'e.g. Vintage Leather Jacket'}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Selling Price (Excl. Tax)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="e.g. 19.99 / 450"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Product Category
                  </label>
                  <input
                    type="text"
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    placeholder="e.g. Dinner Specials / Shoes"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Stock Quantity in Inventory
                  </label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs outline-none transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Product Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProdImageFileChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-450 outline-none transition file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-950 file:text-indigo-400 hover:file:bg-indigo-900 cursor-pointer"
                  />
                  {prodImageUrl && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Preview:</span>
                      <img src={prodImageUrl} className="w-10 h-10 object-contain rounded border border-slate-800 bg-white" alt="product preview" />
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-750 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Add to Database Catalog +
                  </button>
                </div>
              </form>

              {addedProducts.length > 0 && (
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                    Seeded Items list ({addedProducts.length})
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl divide-y divide-slate-900 overflow-hidden">
                    {addedProducts.map((p, idx) => (
                      <div key={idx} className="p-4 flex justify-between items-center text-xs">
                        <div>
                          <span className="font-bold text-white block">{p.name}</span>
                          <span className="text-[9px] font-bold text-slate-450 uppercase">{p.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-indigo-400 block">{currency.split(' ')[0]} {p.price.toFixed(2)}</span>
                          <span className="text-[9px] text-slate-400 font-medium">Stock: {p.stock} units</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setStep(5)}
                  className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(7)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
                >
                  Continue to Gateway ➔
                </button>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                <span className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                  Configure Checkout & Tax rates
                </span>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Select Primary Payment Gateway
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Stripe', 'PayPal'].map((gateway) => (
                        <button
                          type="button"
                          key={gateway}
                          onClick={() => setPaymentGateway(gateway)}
                          className={`py-3 text-center border rounded-xl text-xs font-bold cursor-pointer transition ${
                            paymentGateway === gateway
                              ? 'border-indigo-500 bg-indigo-950/20 text-white'
                              : 'border-slate-800 hover:border-slate-700 bg-slate-900/50 text-slate-400'
                          }`}
                        >
                          {gateway === 'Stripe' ? '💳 Stripe Payment' : '🅿️ PayPal Checkout'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Merchant Publishable API Key
                    </label>
                    <input
                      type="text"
                      value={stripeKey}
                      onChange={(e) => setStripeKey(e.target.value)}
                      placeholder="e.g. pk_test_..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs outline-none transition"
                    />
                  </div>

                  <div className="flex justify-between items-center bg-slate-900/50 border border-slate-900 p-4 rounded-xl">
                    <div>
                      <span className="block text-xs font-bold text-white">Enable Sandbox Test Mode</span>
                      <span className="block text-[9px] text-slate-400 mt-0.5">Allows dummy credit card payments at checkout.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sandboxMode}
                        onChange={() => setSandboxMode(!sandboxMode)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-350 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
                    </label>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-450 uppercase mb-2">
                      <span>GST Tax Surcharge Percentage</span>
                      <span className="text-indigo-400">{gstRate}% GST (CGST {gstRate/2}% + SGST {gstRate/2}%)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="28"
                      step="1"
                      value={gstRate}
                      onChange={(e) => setGstRate(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-[8px] font-bold text-slate-500 mt-1">
                      <span>0% (Exempt)</span>
                      <span>5%</span>
                      <span>12%</span>
                      <span>18% (Standard)</span>
                      <span>28% (Luxury)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setStep(6)}
                  className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(8)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
                >
                  Continue to Domains ➔
                </button>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                <span className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                  Secure Custom Web Domain
                </span>

                <div className="flex gap-4 text-xs font-semibold text-slate-400 mb-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="wizDomainType"
                      checked={domainType === 'subdomain'}
                      onChange={() => setDomainType('subdomain')}
                      className="text-indigo-600 focus:ring-0"
                    />
                    Free Subdomain
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="wizDomainType"
                      checked={domainType === 'custom'}
                      onChange={() => setDomainType('custom')}
                      className="text-indigo-600 focus:ring-0"
                    />
                    Link Custom Domain
                  </label>
                </div>

                {domainType === 'subdomain' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Configure Site URL Address
                      </label>
                      <div className="flex bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-1 focus-within:border-indigo-500 transition">
                        <input
                          type="text"
                          value={subdomainPrefix}
                          onChange={(e) => {
                            setSubdomainPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                            setDomainChecked(false);
                          }}
                          placeholder="your-brand"
                          className="flex-1 bg-transparent px-3 py-2 text-xs text-white outline-none"
                        />
                        <span className="bg-slate-950 border border-slate-850 px-4 py-2 text-xs font-bold text-slate-450 rounded-lg flex items-center">
                          .zatbiz.site
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={checkDomainAvailability}
                      className="px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-[10px] font-bold text-slate-300 rounded-lg transition"
                    >
                      Check Subdomain Availability
                    </button>

                    {domainChecked && (
                      <div className="p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-xl flex items-center gap-2 text-[10px] font-semibold text-emerald-400 animate-fade-in">
                        <span>✅</span>
                        <span>URL **{subdomainPrefix || 'store'}.zatbiz.site** is fully available to publish!</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Enter Custom Domain Name
                      </label>
                      <input
                        type="text"
                        value={customDomainName}
                        onChange={(e) => {
                          setCustomDomainName(e.target.value.toLowerCase().trim());
                          setDomainChecked(false);
                        }}
                        placeholder="e.g. www.mycafe.com"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs outline-none transition"
                      />
                    </div>

                    <button
                      onClick={checkDomainAvailability}
                      className="px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-[10px] font-bold text-slate-300 rounded-lg transition"
                    >
                      Check DNS Propagation status
                    </button>

                    {domainChecked && (
                      <div className="p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-xl flex items-center gap-2 text-[10px] font-semibold text-emerald-400 animate-fade-in">
                        <span>✅</span>
                        <span>DNS records active! Point CNAME to **dns.zatbiz.site**.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setStep(7)}
                  className="px-5 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={publishWebsite}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-indigo-650 text-white rounded-xl text-xs font-bold shadow-lg transition hover:scale-[1.01] cursor-pointer"
                >
                  Confirm & Publish Web Portal 🚀
                </button>
              </div>
            </div>
          )}

          {step === 9 && isPublished && (
            <div className="space-y-6 text-center py-6 animate-fade-in">
              <span className="text-6xl block animate-bounce">🚀</span>
              <h4 className="text-xl font-black text-white tracking-tight">Your Business Portal is Live!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                The visual layout, products catalog, automated GST invoicing, CRM pipeline, and Stripe checkout are synchronized with the database.
              </p>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl max-w-md mx-auto space-y-3.5 text-left text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-450 font-semibold">Business type:</span>
                  <span className="font-bold text-white capitalize">{businessType}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-450 font-semibold">Published URL:</span>
                  <a
                    href={`/preview/${projectId}`}
                    target="_blank"
                    className="font-bold text-indigo-400 hover:underline"
                  >
                    {domainType === 'subdomain' ? `${subdomainPrefix || 'store'}.zatbiz.site` : customDomainName}
                  </a>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-450 font-semibold">Tax configurations:</span>
                  <span className="font-bold text-white">{gstRate}% GST Activated</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-450 font-semibold">GSTIN registry:</span>
                  <span className="font-bold text-slate-300 font-mono">{gstin || 'GST Exempt'}</span>
                </div>
              </div>

              <div className="pt-6 max-w-sm mx-auto flex flex-col sm:flex-row gap-3">
                <a
                  href={`/preview/${projectId}`}
                  target="_blank"
                  className="flex-1 py-3 border border-slate-850 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded-xl transition text-center shadow-sm"
                >
                  🌐 Visit Customer Portal
                </a>
                <button
                  onClick={() => {
                    if (projectId) {
                      onClose();
                    }
                  }}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-750 text-xs font-bold text-white rounded-xl transition shadow-md cursor-pointer"
                >
                  📊 Manage Business Now
                </button>
              </div>
            </div>
          )}
        </>)}
        </div>
      </div>
    </div>
  );
}

function getStepTitle(step: number, isScratch = false, selectedTemplateId?: string | null): string {
  if (selectedTemplateId === 'wedding') {
    switch (step) {
      case 1:
        return 'Sign Up Platform Admin';
      case 2:
        return 'Select Homepage Design';
      case 3:
        return 'Select Login Page Design';
      case 4:
        return 'Select Portal Dashboard Style';
      case 5:
        return 'Fill Onboarding Details';
      case 6:
        return 'Setup Domain Address';
      case 7:
        return 'Launch & Publish Website';
      default:
        return 'Launch Website';
    }
  }
  if (isScratch) {
    switch (step) {
      case 1:
        return 'Sign Up Platform Admin';
      case 2:
        return 'Basic Business Details';
      case 3:
        return 'Contact Information';
      case 4:
        return 'Address Information';
      case 5:
        return 'Branding & Theme Details';
      case 6:
        return 'Seed Catalog Inventory';
      case 7:
        return 'Set Gateway & GST Rate';
      case 8:
        return 'Secure Site Domain';
      default:
        return 'Launch Website';
    }
  }
  switch (step) {
    case 1:
      return 'Sign Up Platform Admin';
    case 2:
      return 'Create Business Profile';
    case 3:
      return 'Select Business Sector';
    case 4:
      return 'Choose Visual Layout';
    case 5:
      return 'Theme & Logo Customizer';
    case 6:
      return 'Add Seed Inventory';
    case 7:
      return 'Set Gateway & GST Rate';
    case 8:
      return 'Secure Site Web Domain';
    default:
      return 'Launch Website';
  }
}

function getTemplatesForBiz(type: string | null): any[] {
  if (!type) return [];
  const allTemplates = [
    {
      id: 'restaurant',
      name: 'Restaurant Website',
      desc: 'Exquisite dining and reservations template with a custom pizza menu card block, dining highlights, location details, and sleek booking options.',
      icon: '🍕',
      category: 'restaurant',
    },
    {
      id: 'clinic',
      name: 'Hospital Website',
      desc: 'Professional clinic and hospital theme equipped with medical department lists, physician highlights, patient FAQ widgets, and service guidelines.',
      icon: '🏥',
      category: 'hospital',
    },
    {
      id: 'school',
      name: 'School Website',
      desc: 'Elegant academic institution platform designed to display educational tracks, course options, admissions details, and registration forms.',
      icon: '🏫',
      category: 'school',
    },
    {
      id: 'gym',
      name: 'Fitness Gym Center',
      desc: 'High-energy studio template with athletic hero layouts, coaching staff highlights, training program grids, and membership package listings.',
      icon: '💪',
      category: 'general',
    },
    {
      id: 'storefront',
      name: 'Ecommerce Store',
      desc: 'Shopify-style catalog store containing visual product cards layout, live stock inventory levels, variant filters, and sticky checkout cart counter.',
      icon: '🛍️',
      category: 'shop',
    },
    {
      id: 'realestate',
      name: 'Real Estate Website',
      desc: 'Premium property listings catalog displaying active estates, neighborhood pricing columns, agency guides, and custom contact submission cards.',
      icon: '🏡',
      category: 'shop',
    },
    {
      id: 'travel',
      name: 'Travel Agency Website',
      desc: 'Wanderlust itinerary booking portal featuring dynamic travel packages, verified tour guide details, FAQs, and a socials marketing footer.',
      icon: '✈️',
      category: 'shop',
    },
    {
      id: 'portfolio',
      name: 'Portfolio Website',
      desc: 'Elegant designer portfolio template containing custom profile layout, personal hero headings, skills features, and minimalist copy footer.',
      icon: '💼',
      category: 'school',
    },
  ];

  return allTemplates.filter((t) => t.category === type);
}
