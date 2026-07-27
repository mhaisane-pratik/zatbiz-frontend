'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { api } from '@/services/api';
import { useDarkMode } from '@/hooks/useDarkMode';

interface MedicalShopUserPanelProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  logoIcon: string;
  logoUrl: string;
  shopNiche: string | null;
}

export default function MedicalShopUserPanel({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  logoIcon,
  logoUrl,
  shopNiche,
}: MedicalShopUserPanelProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  // Navigation & Page views
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'prescription' | 'dashboard' | 'about' | 'contact' | 'faq' | 'blog'>('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // For details page / quick view

  // API Data States
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Cart & checkout states
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  
  // Wishlist
  const [wishlist, setWishlist] = useState<any[]>([]);

  // Checkout Form States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(localStorage.getItem('clientAddress') || '');
  const [deliverySlot, setDeliverySlot] = useState('08:00 AM - 12:00 PM (Morning)');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [checkoutPrescriptionUrl, setCheckoutPrescriptionUrl] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');

  // Selected Order for Tracking view
  const [trackingOrder, setTrackingOrder] = useState<any>(null);

  // Prescription Upload Form States
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [prescDoctorNotes, setPrescDoctorNotes] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState<'name' | 'brand' | 'salt'>('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPrescription, setFilterPrescription] = useState('all');
  const [filterPrice, setFilterPrice] = useState(5000);
  const [sortBy, setSortBy] = useState('popular');

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Load initial data
  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.medicalShop.get(projectId),
      api.medicalShop.products.list(projectId),
      api.medicalShop.orders.listForCustomer(projectId, clientEmail)
    ])
      .then(([infoData, productsData, ordersData]) => {
        if (infoData) setInfo(infoData);
        if (productsData) setProducts(productsData);
        if (ordersData) setOrders(ordersData);
      })
      .catch((err) => {
        console.error('Error loading medical shop client data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId, clientEmail]);

  // Sync cart with localStorage for persistence
  useEffect(() => {
    const savedCart = localStorage.getItem(`medshop_cart_${projectId}`);
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch {}
    }
    const savedWish = localStorage.getItem(`medshop_wishlist_${projectId}`);
    if (savedWish) {
      try { setWishlist(JSON.parse(savedWish)); } catch {}
    }
  }, [projectId]);

  const saveCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem(`medshop_cart_${projectId}`, JSON.stringify(newCart));
  };

  const saveWishlist = (newWish: any[]) => {
    setWishlist(newWish);
    localStorage.setItem(`medshop_wishlist_${projectId}`, JSON.stringify(newWish));
  };

  // Cart operations
  const addToCart = (product: any, count = 1) => {
    const existing = cart.find(i => i.id === product.id);
    let newCart = [];
    if (existing) {
      newCart = cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + count } : i);
    } else {
      newCart = [...cart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        discount: product.discount,
        quantity: count, 
        image: product.imageUrl,
        prescriptionRequired: product.prescriptionRequired
      }];
    }
    saveCart(newCart);
    showToast(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: number, delta: number) => {
    const newCart = cart.map(i => {
      if (i.id === id) {
        const qty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: qty };
      }
      return i;
    }).filter(i => i.quantity > 0);
    saveCart(newCart);
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter(i => i.id !== id);
    saveCart(newCart);
  };

  // Wishlist operations
  const toggleWishlist = (product: any) => {
    const exists = wishlist.some(i => i.id === product.id);
    let newWish = [];
    if (exists) {
      newWish = wishlist.filter(i => i.id !== product.id);
      showToast(`${product.name} removed from wishlist`);
    } else {
      newWish = [...wishlist, product];
      showToast(`${product.name} added to wishlist!`);
    }
    saveWishlist(newWish);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'HEALTH10') {
      setAppliedDiscount(10);
      setAppliedCoupon('HEALTH10 (10% Off)');
      showToast('Coupon HEALTH10 applied! 10% discount added.');
    } else if (couponCode.toUpperCase() === 'RXFREE') {
      setAppliedDiscount(5);
      setAppliedCoupon('RXFREE (Flat Rs. 50 Off)');
      showToast('Coupon RXFREE applied! Rs. 50 discount added.');
    } else {
      showToast('Invalid Coupon Code.', true);
    }
  };

  // Helper toasts
  const [toastMessage, setToastMessage] = useState('');
  const [toastError, setToastError] = useState(false);
  const showToast = (msg: string, isError = false) => {
    setToastMessage(msg);
    setToastError(isError);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Cart summary
  const subtotal = cart.reduce((sum, item) => {
    const actualPrice = item.price * (1 - (item.discount || 0) / 100);
    return sum + (actualPrice * item.quantity);
  }, 0);
  
  const discountAmount = appliedCoupon.includes('10%') ? (subtotal * 0.1) : (appliedCoupon ? 50 : 0);
  const deliveryCharges = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharges);

  const cartHasPrescriptionItems = cart.some(item => item.prescriptionRequired);

  // File Upload Helper
  const handlePrescriptionFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFile(reader.result as string);
        setCheckoutPrescriptionUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Place Order Submit
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (cartHasPrescriptionItems && !checkoutPrescriptionUrl && !uploadedFile) {
      showToast('This order contains prescription medicines. Please upload your doctor\'s prescription.', true);
      return;
    }

    const orderPayload = {
      projectId,
      customerName: localStorage.getItem('clientName') || 'Guest Customer',
      customerEmail: clientEmail,
      customerPhone: localStorage.getItem('clientPhone') || '+91 99999 88888',
      shippingAddress: shippingAddress,
      deliverySlot,
      paymentMethod,
      prescriptionUrl: checkoutPrescriptionUrl || uploadedFile || '',
      doctorNotes: doctorNotes || prescDoctorNotes || '',
      pharmacistVerified: false,
      itemsJson: JSON.stringify(cart),
      subtotal,
      deliveryCharges,
      total: grandTotal
    };

    try {
      const placed = await api.medicalShop.orders.place(orderPayload);
      setOrders([placed, ...orders]);
      saveCart([]); // clear cart
      setIsCheckoutOpen(false);
      setTrackingOrder(placed);
      setActiveTab('dashboard'); // route to user dashboard to track
      showToast('Order placed successfully! Pending pharmacist prescription check.');
    } catch (err) {
      console.error(err);
      showToast('Failed to submit order. Saved in sandbox simulation memory.');
      // Simulate placed order
      const mockPlaced = {
        ...orderPayload,
        id: Date.now(),
        status: 'Order Placed',
        createdAt: new Date().toISOString()
      };
      setOrders([mockPlaced, ...orders]);
      saveCart([]);
      setIsCheckoutOpen(false);
      setTrackingOrder(mockPlaced);
      setActiveTab('dashboard');
    }
  };

  // Standalone Prescription Upload Submit
  const handlePrescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      showToast('Please upload a prescription file first.', true);
      return;
    }
    
    // Standalone prescription creates a mock check log
    setUploadSuccess(true);
    showToast('Prescription uploaded successfully! Pharmacist is reviewing.');
    
    // We can also create a zero-value mock order representing prescription verification!
    const mockOrder = {
      projectId,
      customerName: localStorage.getItem('clientName') || 'Guest Customer',
      customerEmail: clientEmail,
      customerPhone: localStorage.getItem('clientPhone') || '+91 98765 43210',
      shippingAddress: 'Prescription Verification Request Only',
      deliverySlot: 'N/A',
      paymentMethod: 'Prescription Verification',
      prescriptionUrl: uploadedFile,
      doctorNotes: prescDoctorNotes,
      pharmacistVerified: false,
      status: 'Order Placed', // Stepper state 1
      itemsJson: JSON.stringify([{ id: 999, name: 'Prescription Document Check', price: 0, quantity: 1, prescriptionRequired: true }]),
      subtotal: 0,
      deliveryCharges: 0,
      total: 0,
      createdAt: new Date().toISOString()
    };
    
    try {
      const placed = await api.medicalShop.orders.place(mockOrder);
      setOrders([placed, ...orders]);
    } catch {
      setOrders([{ ...mockOrder, id: Date.now() }, ...orders]);
    }
  };

  // Filtered products list
  const filteredProducts = products.filter(prod => {
    const matchesSearch = searchBy === 'name' 
      ? prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      : searchBy === 'brand'
        ? prod.brand.toLowerCase().includes(searchQuery.toLowerCase())
        : prod.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || prod.category?.toLowerCase() === filterCategory.toLowerCase();
    const matchesPresc = filterPrescription === 'all' || 
      (filterPrescription === 'required' && prod.prescriptionRequired) ||
      (filterPrescription === 'not-required' && !prod.prescriptionRequired);
    const matchesPrice = prod.price * (1 - (prod.discount || 0)/100) <= filterPrice;

    return matchesSearch && matchesCategory && matchesPresc && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'low') return a.price - b.price;
    if (sortBy === 'high') return b.price - a.price;
    if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
    return b.rating - a.rating; // popular
  });

  const categoriesList = [
    'Medicines', 'Healthcare', 'Personal Care', 'Baby Care', 'Diabetes Care', 'Fitness', 'Ayurvedic', 'Medical Devices', 'Vitamins', 'Surgical Products'
  ];

  const brandStyles = info ? {
    primaryText: `text-[${info.themeColor}]`,
    primaryBg: `bg-[${info.themeColor}]`,
    accentColor: info.themeColor
  } : {
    primaryText: 'text-emerald-600',
    primaryBg: 'bg-emerald-600',
    accentColor: '#10b981'
  };

  const accentColor = brandStyles.accentColor;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative text-slate-800 text-left font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl text-xs font-bold text-white shadow-2xl z-[100] animate-bounce flex items-center gap-2 ${
          toastError ? 'bg-rose-600' : 'bg-slate-900 border border-slate-750'
        }`}>
          <span>{toastError ? '⚠️' : '✓'}</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-40 shadow-sm">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { setActiveTab('home'); setSelectedProduct(null); }}>
          <span className="text-3xl text-emerald-600">{logoIcon || '💊'}</span>
          <div>
            <h1 className="text-base font-black text-slate-900 tracking-tight">
              {companyName || 'MedShop Rx'}
            </h1>
            <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-extrabold">Licensed Drugstore</span>
          </div>
        </div>

        {/* Categories filters tabs quick */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-500">
          <button onClick={() => { setActiveTab('home'); setSelectedProduct(null); }} className={`hover:text-emerald-600 transition ${activeTab === 'home' ? 'text-emerald-600 font-extrabold' : ''}`}>Home</button>
          <button onClick={() => { setActiveTab('shop'); setSelectedProduct(null); }} className={`hover:text-emerald-600 transition ${activeTab === 'shop' ? 'text-emerald-600 font-extrabold' : ''}`}>Shop Catalog</button>
          <button onClick={() => { setActiveTab('prescription'); setSelectedProduct(null); }} className={`hover:text-emerald-600 transition ${activeTab === 'prescription' ? 'text-emerald-600 font-extrabold' : ''}`}>Upload Prescription</button>
          <button onClick={() => { setActiveTab('dashboard'); setSelectedProduct(null); }} className={`hover:text-emerald-600 transition ${activeTab === 'dashboard' ? 'text-emerald-600 font-extrabold' : ''}`}>My Orders</button>
          <button onClick={() => { setActiveTab('about'); setSelectedProduct(null); }} className={`hover:text-emerald-600 transition ${activeTab === 'about' ? 'text-emerald-600 font-extrabold' : ''}`}>About Pharmacy</button>
          <button onClick={() => { setActiveTab('contact'); setSelectedProduct(null); }} className={`hover:text-emerald-600 transition ${activeTab === 'contact' ? 'text-emerald-600 font-extrabold' : ''}`}>Contact Us</button>
        </nav>

        {/* Utility indicators (Cart, Wishlist, Logout) */}
        <div className="flex items-center gap-3">
          {/* Wishlist quick link */}
          <button 
            onClick={() => { setActiveTab('dashboard'); }} 
            className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600 relative border border-slate-100"
            title="My Wishlist"
          >
            <span>❤️</span>
            {wishlist.length > 0 && (
              <span className="absolute top-[-3px] right-[-3px] bg-rose-500 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center gap-2 text-xs font-black shadow-md relative"
          >
            <span>🛒</span>
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="bg-emerald-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center absolute top-[-6px] right-[-6px] shadow border border-white">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            )}
          </button>

          {/* Profile logout */}
          <div className="h-8 w-px bg-slate-200 mx-1" />
          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-right">
              <span className="block text-[10px] font-black text-slate-800">{clientEmail.split('@')[0]}</span>
              <span className="block text-[8px] font-bold text-slate-400">Customer</span>
            </div>
            <button 
              onClick={toggleDarkMode} 
              className="w-9 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center transition cursor-pointer text-xs"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              <span>{isDarkMode ? '☀️' : '🌙'}</span>
            </button>
            <button 
              onClick={onLogout} 
              className="w-9 h-9 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 rounded-xl flex items-center justify-center transition cursor-pointer text-xs"
              title="Logout from pharmacy portal"
            >
              🚪
            </button>
          </div>
        </div>
      </header>

      {/* EMERGENCY CONTACT & ANNOUNCEMENT BAR */}
      <div className="bg-rose-50 border-b border-rose-150 px-6 py-2.5 flex flex-col md:flex-row items-center justify-between text-slate-700 text-[11px] font-semibold gap-2">
        <div className="flex items-center gap-2">
          <span className="animate-pulse text-rose-600">🚨</span>
          <span>Emergency Medication Services? Reach our 24/7 pharmacist helpline: <strong>{info?.mobileNo || '+91 98765 43210'}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span>Licensed Drugstore ID: <strong>Rx-92842</strong></span>
          <span className="h-3 w-px bg-slate-300" />
          <span>⏰ 08:00 AM - 10:00 PM</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        
        {/* VIEW: HOME PAGE */}
        {activeTab === 'home' && !selectedProduct && (
          <div className="space-y-12 pb-16">
            
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white px-8 py-16 md:py-24 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
              <div className="space-y-6 max-w-2xl text-left z-10">
                <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                  ⚡ 100% Genuine Pharmacy Home Delivery
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  Your Digital Drugstore & Health Apothecary
                </h2>
                <p className="text-xs md:text-sm text-emerald-100/80 leading-relaxed font-medium">
                  {info?.companyDescription || 'Order chronic medications, healthcare equipment, OTC cold pills, baby supplements, and ayurvedics. Quick upload of prescriptions with clinical pharmacist verification.'}
                </p>

                {/* Hero Search & Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg bg-white/10 p-2.5 rounded-2xl border border-white/15 backdrop-blur">
                  <div className="relative w-full">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-sm">🔍</span>
                    <input
                      type="text"
                      placeholder="Search medicine, tablets, vitamins, generic salt..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setActiveTab('shop'); }}
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => setActiveTab('shop')} 
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-md transition whitespace-nowrap cursor-pointer"
                  >
                    Search Shop
                  </button>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button 
                    onClick={() => setActiveTab('prescription')} 
                    className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 text-xs font-black rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>📄</span> Upload Prescription
                  </button>
                  <button 
                    onClick={() => setActiveTab('shop')} 
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                  >
                    Shop Now ➔
                  </button>
                </div>
              </div>

              {/* Static mock image placeholder / illustation */}
              <div className="w-full md:w-1/2 max-w-md aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative bg-slate-900 flex-shrink-0">
                <img 
                  src={logoUrl || '/images/medical_shop_template.png'} 
                  alt="Medical shop workspace" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <h4 className="text-xs font-black text-white">{companyName || 'MedShop Rx'}</h4>
                    <p className="text-[10px] text-slate-300 font-semibold">{info?.city}, {info?.state}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CATEGORIES GRID SECTION */}
            <section className="px-6 max-w-7xl mx-auto space-y-6">
              <div className="text-center md:text-left space-y-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Browse by Category</h3>
                <p className="text-xs text-slate-500 font-semibold">Quality healthcare products organized by therapeutic niche.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {categoriesList.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setFilterCategory(cat); setActiveTab('shop'); }}
                    className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/20 text-center hover:scale-[1.02] transition cursor-pointer flex flex-col items-center gap-3.5 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl group-hover:scale-110 transition duration-300">
                      {cat === 'Medicines' && '💊'}
                      {cat === 'Healthcare' && '🩺'}
                      {cat === 'Personal Care' && '🧴'}
                      {cat === 'Baby Care' && '🍼'}
                      {cat === 'Diabetes Care' && '🩸'}
                      {cat === 'Fitness' && '🏃'}
                      {cat === 'Ayurvedic' && '🍃'}
                      {cat === 'Medical Devices' && '🩻'}
                      {cat === 'Vitamins' && '🍊'}
                      {cat === 'Surgical Products' && '✂️'}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">{cat}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Explore Niche</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* FEATURED PRODUCTS SECTION */}
            <section className="px-6 max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Today's Deals & Featured Products</h3>
                  <p className="text-xs text-slate-500 font-semibold">Bestselling medications and supplements in stock.</p>
                </div>
                <button 
                  onClick={() => { setActiveTab('shop'); setFilterCategory('all'); }} 
                  className="text-xs font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 self-start md:self-center"
                >
                  View All Medicines ➔
                </button>
              </div>

              {products.length === 0 ? (
                <div className="py-12 bg-white border border-slate-200 border-dashed rounded-3xl text-center text-slate-400 font-bold text-xs">
                  Loading catalog inventory products...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {products.slice(0, 4).map((prod) => {
                    const discountedPrice = prod.price * (1 - (prod.discount || 0)/100);
                    const isInWish = wishlist.some(i => i.id === prod.id);
                    return (
                      <div 
                        key={prod.id} 
                        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between group relative"
                      >
                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(prod)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur border border-slate-100 flex items-center justify-center text-xs shadow-sm hover:scale-105 transition cursor-pointer z-10"
                        >
                          <span>{isInWish ? '❤️' : '🤍'}</span>
                        </button>

                        <div 
                          className="cursor-pointer" 
                          onClick={() => setSelectedProduct(prod)}
                        >
                          {/* Image container */}
                          <div className="h-44 bg-slate-100 border-b border-slate-100 relative overflow-hidden flex items-center justify-center">
                            <img 
                              src={prod.imageUrl} 
                              alt={prod.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            
                            {/* Prescription Badge */}
                            {prod.prescriptionRequired && (
                              <span className="absolute bottom-2 left-2 bg-rose-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow">
                                Rx Required
                              </span>
                            )}
                            
                            {/* Discount Badge */}
                            {prod.discount > 0 && (
                              <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow">
                                Save {prod.discount}%
                              </span>
                            )}
                          </div>

                          {/* Details */}
                          <div className="p-4 space-y-1.5 text-left">
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">{prod.brand} • {prod.category}</span>
                            <h4 className="text-xs font-black text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition">{prod.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold font-mono">Generic: {prod.genericName}</p>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                              <span>⭐</span>
                              <span>{prod.rating || '4.5'}</span>
                              <span className="text-slate-400">({Math.floor((prod.rating || 4) * 12)} reviews)</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-50 mt-2">
                          <div className="text-left">
                            {prod.discount > 0 ? (
                              <>
                                <span className="text-xs font-black text-slate-900">₹{discountedPrice.toFixed(2)}</span>
                                <span className="block text-[9px] text-slate-400 line-through font-bold">₹{prod.price.toFixed(2)}</span>
                              </>
                            ) : (
                              <span className="text-xs font-black text-slate-900">₹{prod.price.toFixed(2)}</span>
                            )}
                          </div>

                          <button
                            onClick={() => addToCart(prod)}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black rounded-xl shadow-md transition cursor-pointer flex items-center gap-1"
                          >
                            <span>🛒</span> Add
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* TRUST BANNER SECTION */}
            <section className="bg-slate-900 text-white py-12 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                <div className="flex items-start gap-4 flex-col md:flex-row items-center md:items-start">
                  <span className="text-3xl bg-white/10 p-3 rounded-2xl">Genuine Medicines</span>
                  <div>
                    <h4 className="text-xs font-black tracking-tight text-white mb-1">100% Authentic</h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">Directly sourced drugs from licensed global pharmaceutical firms.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 flex-col md:flex-row items-center md:items-start">
                  <span className="text-3xl bg-white/10 p-3 rounded-2xl">Licensed Pharmacy</span>
                  <div>
                    <h4 className="text-xs font-black tracking-tight text-white mb-1">State Registered</h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">Operated under drug control license code codes: Rx-92842.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 flex-col md:flex-row items-center md:items-start">
                  <span className="text-3xl bg-white/10 p-3 rounded-2xl">Fast Delivery</span>
                  <div>
                    <h4 className="text-xs font-black tracking-tight text-white mb-1">Express Dispatch</h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">Orders packed and shipped in sterile containers within 2 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 flex-col md:flex-row items-center md:items-start">
                  <span className="text-3xl bg-white/10 p-3 rounded-2xl">Secure Payments</span>
                  <div>
                    <h4 className="text-xs font-black tracking-tight text-white mb-1">UPI & Cards</h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">All transactions fully encrypted via standard PCI gateways.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* BLOGS / HEALTH TIPS SECTION */}
            <section className="px-6 max-w-7xl mx-auto space-y-6">
              <div className="text-center md:text-left space-y-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Health Tips & Blog Library</h3>
                <p className="text-xs text-slate-500 font-semibold">Expert medical guides for healthy everyday living.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Cold & Flu Relief Guide', desc: 'Practical tips on identifying viral symptoms, staying hydrated, and selecting OTC antihistamines.', date: 'June 25, 2026', img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80', readTime: '5 min read' },
                  { title: 'Understanding Diabetes Care', desc: 'How blood glucometers help track glycemic indexes and optimize Metformin dosage timings.', date: 'June 20, 2026', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=80', readTime: '8 min read' },
                  { title: 'Heart Wellness & BP Control', desc: 'Lifestyle adjustments to reduce cardiovascular strain and lower daily sodium intakes.', date: 'June 18, 2026', img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&auto=format&fit=crop&q=80', readTime: '6 min read' }
                ].map((blog, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between text-left group">
                    <div>
                      <div className="h-40 bg-slate-100 relative overflow-hidden">
                        <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <span className="absolute top-3 left-3 bg-white text-slate-800 text-[8px] font-black px-2 py-0.5 rounded uppercase">Medical Article</span>
                      </div>
                      <div className="p-5 space-y-2">
                        <span className="text-[9px] text-slate-400 font-bold">{blog.date} • {blog.readTime}</span>
                        <h4 className="text-xs font-black text-slate-850 group-hover:text-emerald-600 transition">{blog.title}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed line-clamp-3">{blog.desc}</p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 border-t border-slate-50 mt-2">
                      <button onClick={() => setActiveTab('blog')} className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 cursor-pointer">
                        Read Full Article ➔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* VIEW: SHOP PAGE */}
        {activeTab === 'shop' && !selectedProduct && (
          <div className="px-6 py-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* LEFT FILTERS COLUMN */}
            <aside className="space-y-6 text-left lg:col-span-1 bg-white p-6 border border-slate-200 rounded-2xl h-fit shadow-sm">
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Filter Products</span>
                <button 
                  onClick={() => {
                    setFilterCategory('all');
                    setFilterPrescription('all');
                    setFilterPrice(5000);
                    setSearchQuery('');
                  }}
                  className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold"
                >
                  Clear All
                </button>
              </h3>

              {/* Search input in filters */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Search Catalog</label>
                <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50">
                  <span className="text-slate-400 text-xs">🔍</span>
                  <input
                    type="text"
                    placeholder="Search query..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-xs w-full text-slate-800"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button 
                    onClick={() => setSearchBy('name')} 
                    className={`px-2 py-0.5 rounded text-[8px] font-black border ${
                      searchBy === 'name' ? 'bg-slate-950 text-white border-slate-950' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    Name
                  </button>
                  <button 
                    onClick={() => setSearchBy('brand')} 
                    className={`px-2 py-0.5 rounded text-[8px] font-black border ${
                      searchBy === 'brand' ? 'bg-slate-950 text-white border-slate-950' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    Brand
                  </button>
                  <button 
                    onClick={() => setSearchBy('salt')} 
                    className={`px-2 py-0.5 rounded text-[8px] font-black border ${
                      searchBy === 'salt' ? 'bg-slate-950 text-white border-slate-950' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    Generic Salt
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs outline-none"
                >
                  <option value="all">All Niches</option>
                  {categoriesList.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Prescription Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Prescription Filter</label>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'All Medicines', val: 'all' },
                    { label: 'Requires Prescription (Rx)', val: 'required' },
                    { label: 'Over-The-Counter (OTC)', val: 'not-required' }
                  ].map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="radio_prescription"
                        checked={filterPrescription === opt.val}
                        onChange={() => setFilterPrescription(opt.val)}
                        className="accent-emerald-600"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-black text-slate-700 uppercase tracking-wider">
                  <span>Max Price</span>
                  <span className="font-mono text-emerald-600 font-black">₹{filterPrice}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Sort By */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Sort Products</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs outline-none"
                >
                  <option value="popular">Popularity / Ratings</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="discount">Highest Discounts</option>
                </select>
              </div>
            </aside>

            {/* PRODUCTS GRID COLUMN */}
            <section className="lg:col-span-3 space-y-6">
              {/* Toolbar */}
              <div className="bg-white border border-slate-200 px-5 py-3.5 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-500 shadow-sm">
                <span>Found {filteredProducts.length} items in drugstore inventory</span>
                <span className="text-slate-400">Category: <strong className="text-emerald-600 capitalize">{filterCategory}</strong></span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-24 bg-white border border-slate-200 rounded-3xl text-center space-y-3">
                  <span className="text-5xl block">🔍</span>
                  <h4 className="text-sm font-extrabold text-slate-800">No matching medicines found</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">We don't have stock for this item yet. Please clear your filters or contact our emergency pharmacist.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map((prod) => {
                    const discountedPrice = prod.price * (1 - (prod.discount || 0)/100);
                    const isInWish = wishlist.some(i => i.id === prod.id);
                    return (
                      <div 
                        key={prod.id} 
                        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between group relative"
                      >
                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(prod)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur border border-slate-100 flex items-center justify-center text-xs shadow-sm hover:scale-105 transition cursor-pointer z-10"
                        >
                          <span>{isInWish ? '❤️' : '🤍'}</span>
                        </button>

                        <div 
                          className="cursor-pointer" 
                          onClick={() => setSelectedProduct(prod)}
                        >
                          {/* Image */}
                          <div className="h-44 bg-slate-100 border-b border-slate-100 relative overflow-hidden flex items-center justify-center">
                            <img 
                              src={prod.imageUrl} 
                              alt={prod.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            {prod.prescriptionRequired && (
                              <span className="absolute bottom-2 left-2 bg-rose-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow">
                                Rx Required
                              </span>
                            )}
                            {prod.discount > 0 && (
                              <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow">
                                Save {prod.discount}%
                              </span>
                            )}
                          </div>

                          {/* Details */}
                          <div className="p-4 space-y-1.5 text-left">
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">{prod.brand} • {prod.category}</span>
                            <h4 className="text-xs font-black text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition">{prod.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold font-mono">Generic: {prod.genericName}</p>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                              <span>⭐</span>
                              <span>{prod.rating || '4.5'}</span>
                              <span className="text-slate-400">({Math.floor((prod.rating || 4) * 12)} reviews)</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-50 mt-2">
                          <div className="text-left">
                            {prod.discount > 0 ? (
                              <>
                                <span className="text-xs font-black text-slate-900 font-mono">₹{discountedPrice.toFixed(2)}</span>
                                <span className="block text-[9px] text-slate-400 line-through font-bold font-mono">₹{prod.price.toFixed(2)}</span>
                              </>
                            ) : (
                              <span className="text-xs font-black text-slate-900 font-mono">₹{prod.price.toFixed(2)}</span>
                            )}
                          </div>

                          <button
                            onClick={() => addToCart(prod)}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black rounded-xl shadow-md transition cursor-pointer flex items-center gap-1"
                          >
                            <span>🛒</span> Add
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

          </div>
        )}

        {/* VIEW: PRESCRIPTION UPLOAD */}
        {activeTab === 'prescription' && (
          <div className="max-w-xl mx-auto py-12 px-6 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Prescription Upload Console</h3>
              <p className="text-xs text-slate-500 font-semibold">Upload doctor's prescription for pharmacist check and validation.</p>
            </div>

            {uploadSuccess ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-md animate-fade-in">
                <span className="text-5xl block">🎉</span>
                <h4 className="text-sm font-extrabold text-emerald-600">Prescription Uploaded Successfully!</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Our clinical pharmacist is verifying your file. Check your user dashboard orders section for verification updates.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button 
                    onClick={() => { setUploadSuccess(false); setUploadedFile(''); setPrescDoctorNotes(''); }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-750 text-xs font-bold rounded-xl transition"
                  >
                    Upload Another
                  </button>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                  >
                    Track Progress
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePrescriptionSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 text-left">
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-3.5 rounded-2xl text-[11px] font-semibold flex items-center gap-2">
                  <span>📄</span> Make sure doctor name, date, patient details, and drug dosage are clearly legible in the image.
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">Upload Image or PDF *</label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-8 text-center relative transition bg-slate-50 flex flex-col items-center justify-center cursor-pointer">
                    <input
                      type="file"
                      required
                      accept="image/*,application/pdf"
                      onChange={handlePrescriptionFile}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {uploadedFile ? (
                      <div className="space-y-2">
                        <span className="text-4xl">📎</span>
                        <p className="text-xs font-black text-emerald-600">Prescription loaded successfully!</p>
                        <p className="text-[10px] text-slate-400 font-semibold truncate max-w-xs">File details registered in session.</p>
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); setUploadedFile(''); }}
                          className="text-[10px] text-rose-500 hover:underline font-bold mt-1.5"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <span className="text-4xl text-slate-300">📤</span>
                        <p className="text-xs font-black text-slate-600">Drag & drop or click to upload file</p>
                        <p className="text-[10px] text-slate-400 font-bold">Supports JPEG, PNG, or PDF formats</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 block">Doctor Notes / Customer Remarks</label>
                  <textarea
                    rows={4}
                    value={prescDoctorNotes}
                    onChange={(e) => setPrescDoctorNotes(e.target.value)}
                    placeholder="Add special instructions like substitution choices, refill counts, drug allergies..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none resize-none text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <span>📤</span> Submit Prescription to Pharmacist
                </button>
              </form>
            )}
          </div>
        )}

        {/* VIEW: USER PROFILE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto py-8 px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* LEFT PROFILE SIDE PANEL */}
            <aside className="lg:col-span-1 bg-white p-6 border border-slate-200 rounded-2xl h-fit shadow-sm space-y-6 text-left">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black text-lg uppercase">
                  {clientEmail.slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-850">{clientEmail.split('@')[0]}</h4>
                  <span className="text-[10px] text-slate-400 font-bold font-mono truncate block max-w-[150px]">{clientEmail}</span>
                </div>
              </div>

              {/* Loyalty Tracker */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4.5 space-y-2">
                <div className="flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Loyalty Account</span>
                  <span className="text-emerald-600 font-black">Active</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">450 <span className="text-xs font-bold text-slate-400">Points</span></h3>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }} />
                </div>
                <p className="text-[9px] text-slate-400 font-semibold leading-normal">50 more points until your next Rs. 100 medicine voucher!</p>
              </div>

              {/* Profile Details List */}
              <div className="space-y-4 pt-2 text-xs font-bold text-slate-600">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Orders:</span>
                  <span>{orders.length} orders</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Active Prescriptions:</span>
                  <span>{orders.filter(o => o.prescriptionUrl && !o.pharmacistVerified).length} checking</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Addresses:</span>
                  <span>1 saved</span>
                </div>
              </div>
            </aside>

            {/* RIGHT DASHBOARD DATA AREA */}
            <section className="lg:col-span-3 space-y-8">
              
              {/* Order Tracking Stepper component (renders if trackingOrder is active) */}
              {trackingOrder && (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md text-left space-y-6 animate-fade-in relative">
                  <button 
                    onClick={() => setTrackingOrder(null)} 
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                  >
                    Close Track ✕
                  </button>

                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <span>🚚</span> Live Dispatch Stepper
                    </h3>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      Order ID: <strong>#{trackingOrder.id}</strong> • Placed: {new Date(trackingOrder.createdAt).toLocaleDateString()} • Method: {trackingOrder.paymentMethod}
                    </p>
                  </div>

                  {/* Stepper Graphic */}
                  <div className="grid grid-cols-6 gap-2 text-center text-[10px] font-black tracking-tight text-slate-400 relative pt-2">
                    {/* Horizontal Line background */}
                    <div className="absolute top-[28px] left-[8%] right-[8%] h-1 bg-slate-200 z-0" />
                    
                    {[
                      { status: 'Order Placed', label: 'Placed', icon: '📝', step: 1 },
                      { status: 'Prescription Verified', label: 'Verified', icon: '🩺', step: 2 },
                      { status: 'Packed', label: 'Packed', icon: '📦', step: 3 },
                      { status: 'Shipped', label: 'Shipped', icon: '🚚', step: 4 },
                      { status: 'Out for Delivery', label: 'Out', icon: '🛵', step: 5 },
                      { status: 'Delivered', label: 'Delivered', icon: '🏠', step: 6 },
                    ].map((stepObj) => {
                      const orderStatusIdx = ['Order Placed', 'Prescription Verified', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(trackingOrder.status);
                      const currentStepIdx = ['Order Placed', 'Prescription Verified', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(stepObj.status);
                      
                      const isCompleted = currentStepIdx <= orderStatusIdx;
                      const isActive = trackingOrder.status === stepObj.status;

                      return (
                        <div key={stepObj.step} className="flex flex-col items-center gap-2 z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-sm border transition-all duration-300 ${
                            isActive 
                              ? 'bg-emerald-500 border-emerald-600 text-white scale-110 ring-4 ring-emerald-100' 
                              : isCompleted 
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                : 'bg-white border-slate-200 text-slate-400'
                          }`}>
                            <span>{stepObj.icon}</span>
                          </div>
                          <div>
                            <span className={`block font-black uppercase text-[8px] tracking-wider ${
                              isActive ? 'text-emerald-600' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                            }`}>{stepObj.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs font-semibold flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">Status Description</span>
                      <p className="text-slate-700 mt-0.5">
                        {trackingOrder.status === 'Order Placed' && 'Waiting for clinical pharmacist verification of documents.'}
                        {trackingOrder.status === 'Prescription Verified' && 'Pharmacist has approved. Moving to package dispatch zone.'}
                        {trackingOrder.status === 'Packed' && 'Sourced items wrapped in sterile containers with logistics code.'}
                        {trackingOrder.status === 'Shipped' && 'Dispatched via Express Courier. Tracking coordinates active.'}
                        {trackingOrder.status === 'Out for Delivery' && 'Medications are with local pharmacy courier, arriving within minutes.'}
                        {trackingOrder.status === 'Delivered' && 'Order safely delivered. Thank you for choosing us!'}
                      </p>
                    </div>

                    {/* Prescription uploaded thumbnail preview */}
                    {trackingOrder.prescriptionUrl && (
                      <div className="flex items-center gap-2 border border-slate-200 p-1.5 bg-white rounded-xl">
                        <img src={trackingOrder.prescriptionUrl} className="w-10 h-10 object-cover rounded-lg" alt="Prescription" />
                        <div className="text-[9px]">
                          <span className="block font-black text-slate-800">Doc Verification</span>
                          <span className={`block font-extrabold ${trackingOrder.pharmacistVerified ? 'text-emerald-600' : 'text-amber-500'}`}>
                            {trackingOrder.pharmacistVerified ? 'Verified Approved' : 'Pending Verification'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Logs list */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-sm font-black text-slate-900">Order Logs & Refill Requests</h3>
                  <span className="text-[10px] bg-slate-100 border border-slate-200 rounded px-2.5 py-0.5 font-black text-slate-500 uppercase tracking-widest">
                    Customer ID: {clientEmail.split('@')[0]}
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 font-bold text-xs">
                    No orders placed yet. Explore the shop to make your first purchase!
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {orders.map((order, idx) => {
                      let items: any[] = [];
                      try { items = JSON.parse(order.itemsJson); } catch {}
                      return (
                        <div key={order.id || idx} className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-6 first:pt-0 last:pb-0">
                          <div className="space-y-2 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-850">Order #{order.id || 'N/A'}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">• {new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            
                            {/* Items inline */}
                            <div className="flex flex-wrap gap-2 pt-1">
                              {items.map((item, itemIdx) => (
                                <span key={itemIdx} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-[10px] font-bold text-slate-655 flex items-center gap-1.5">
                                  {item.image && <img src={item.image} className="w-3.5 h-3.5 object-cover rounded-full" alt="" />}
                                  <span>{item.name} (x{item.quantity})</span>
                                </span>
                              ))}
                            </div>

                            <p className="text-[10px] text-slate-400 font-bold truncate max-w-lg">Address: {order.shippingAddress}</p>
                          </div>

                          <div className="flex items-center gap-4 justify-between md:justify-end">
                            <div className="text-right">
                              <span className="block text-xs font-black text-slate-850 font-mono">₹{order.total.toFixed(2)}</span>
                              <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border mt-1.5 ${
                                order.status === 'Delivered' 
                                  ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                  : order.status.includes('Reject')
                                    ? 'bg-rose-50 border-rose-100 text-rose-600'
                                    : 'bg-amber-50 border-amber-100 text-amber-600'
                              }`}>
                                {order.status}
                              </span>
                            </div>

                            <button
                              onClick={() => { setTrackingOrder(order); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                              className="px-3 py-2 bg-slate-900 hover:bg-slate-850 text-white text-[10px] font-black rounded-xl shadow transition cursor-pointer"
                            >
                              Track 🚚
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

          </div>
        )}

        {/* VIEW: ABOUT US */}
        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto py-12 px-6 space-y-12 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">About Our Licensed Drugstore</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Operating under strict state control licenses, we are committed to safe medication distribution and clinical care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-850">Our Mission</h4>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  To provide accessible, 100% authentic medicines and healthcare support to our local community with rapid express home deliveries and pharmacist-verified approvals.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-850">Our Vision</h4>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  To leverage technology for rapid clinical prescription tracking, helping chronic patients manage refills smoothly without diagnostic delay.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-850 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                <span>🛡️</span> Clinical Licensing & Certifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-lg">✓</span>
                  <span>Drug License Code: DL-83920-R</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-lg">✓</span>
                  <span>Registered Pharmacist ID: RP-92842</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-lg">✓</span>
                  <span>Food Safety License: FSSAI-29104820</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-lg">✓</span>
                  <span>GCP Clinical Trial Certified Store</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: CONTACT US */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Get in Touch</h3>
                <p className="text-xs text-slate-500 font-semibold">Our pharmacists are ready to answer your inquiries and drug stock checks.</p>
              </div>

              <div className="space-y-4 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="text-xl bg-slate-100 p-2.5 rounded-xl">📞</span>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-black">Helpline Phone</span>
                    <span>{info?.mobileNo || '+91 98765 43210'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl bg-slate-100 p-2.5 rounded-xl">✉️</span>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-black">Support Email</span>
                    <span>{info?.email || 'care@lifecare.com'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl bg-slate-100 p-2.5 rounded-xl">📍</span>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-black">Store Address</span>
                    <span>{info?.address || 'Shop 12, Medical Plaza'}, {info?.city || 'Noida'}, {info?.state || 'UP'}, {info?.pincode}</span>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-slate-100 border border-slate-200/50 p-4.5 rounded-2xl text-xs font-semibold">
                <h4 className="font-extrabold text-slate-800 mb-2">⏰ Dispensary Working Hours</h4>
                <div className="space-y-1.5 text-slate-600">
                  <div className="flex justify-between">
                    <span>Monday - Saturday:</span>
                    <span>08:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday / Holidays:</span>
                    <span>10:00 AM - 06:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              {contactSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <span className="text-5xl block">🎉</span>
                  <h4 className="text-sm font-extrabold text-slate-800">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">We will reply to your registered email regarding drug availability within 15 minutes.</p>
                  <button onClick={() => setContactSubmitted(false)} className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl mt-3">Send another</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4">
                  <h4 className="font-extrabold text-slate-800 text-sm border-b border-slate-100 pb-2">Send Message</h4>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase">Your Name</label>
                    <input required type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs outline-none" placeholder="e.g. John" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase">Email Address</label>
                    <input required type="email" className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs outline-none" placeholder="e.g. name@domain.com" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase">Message Inquiry</label>
                    <textarea required rows={4} className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs outline-none resize-none" placeholder="Describe medicine availability, generic alternatives, bulk discounts..." />
                  </div>

                  <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition shadow">Send Inquiry Message</button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* VIEW: FAQ PAGE */}
        {activeTab === 'faq' && (
          <div className="max-w-2xl mx-auto py-12 px-6 space-y-6 text-left">
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Help Center & FAQ</h3>
              <p className="text-xs text-slate-500 font-semibold">Answers regarding prescription uploads, billing, and home dispatch.</p>
            </div>

            <div className="space-y-4 pt-4">
              {[
                { q: 'How do I upload a doctor prescription?', a: 'Go to the "Upload Prescription" tab, upload your file (JPEG, PNG, or PDF), and click submit. Our certified pharmacist will inspect and verify details like drug dosage, date, and doctor signatures before authorizing dispatch.' },
                { q: 'What is the estimated delivery time?', a: 'For localized standard areas, home delivery takes 2 hours. Scheduled morning or evening delivery slots can also be configured during checkout.' },
                { q: 'What payment options do you support?', a: 'We accept UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, Net Banking, and Cash on Delivery (COD).' },
                { q: 'Can I return un-opened medicines?', a: 'Yes. We support drug returns for sealed, unexpired items within 15 days of dispatch. Refrigerated items and critical care biological injections are excluded due to cold-chain preservation rules.' },
                { q: 'What if my prescription is rejected?', a: 'If your document is illegible, expired, or lacks the medical practitioner\'s registration code, our clinical pharmacist will flag it as "Rejected". We will notify you to upload a clear copy or substitute OTC drugs.' }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-xs space-y-2">
                  <h4 className="font-extrabold text-slate-850 flex items-center gap-2">
                    <span className="text-emerald-500 font-black">Q.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-slate-500 leading-relaxed font-semibold pl-4">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: HEALTH ADVISORY BLOGS */}
        {activeTab === 'blog' && (
          <div className="max-w-3xl mx-auto py-12 px-6 space-y-12 text-left">
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Health Tips & Medical Blog</h3>
              <p className="text-xs text-slate-500 font-semibold">Educational articles written by clinical specialists.</p>
            </div>

            <div className="space-y-8 pt-4">
              {[
                { title: 'Cold & Flu: Symptom Check & Antihistamines', content: 'Influenza and rhinovirus cases peak during changing weather cycles. Staying hydrated, getting ample rest, and using mild paracetamol tablets are key. Antihistamines like Cetirizine help suppress allergen reactions, dry nasal paths, and improve sleep cycles. Consult your family doctor if fever exceeds 102°F.', date: 'June 25, 2026', readTime: '5 min read' },
                { title: 'Type 2 Diabetes Management & Glucometers', content: 'Metformin Hydrochloride (SR) is highly effective in increasing insulin sensitivity. Tracking daily fasting glucose levels via high-precision home glucometers helps monitor drug efficacy. Fasting glucose should ideally remain below 120 mg/dL. Avoid high glycemic carbohydrates and engage in daily 30-minute cardio.', date: 'June 20, 2026', readTime: '8 min read' },
                { title: 'Active Cardiovascular Care & Blood Pressure', content: 'Blood pressure above 140/90 mmHg causes arterial stress. Meds like AmlodipineBesylate are prescribed to dilate blood vessels, easing cardiac loads. BP monitors are critical to register home metrics cases. Reduce dietary sodium, avoid smoking, and consult a doctor immediately if experiencing sudden chest tightness.', date: 'June 18, 2026', readTime: '6 min read' }
              ].map((article, idx) => (
                <article key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span className="text-emerald-600 uppercase font-black tracking-wider">Expert Reviewed</span>
                  </div>
                  <h4 className="text-base font-black text-slate-850 tracking-tight">{article.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold whitespace-pre-line">
                    {article.content}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-6 text-xs text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white flex items-center gap-1.5">
              <span>💊</span> {companyName || 'MedShop Rx'}
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
              Registered online drugstore and pharmacy dispatch system. Fully licensed to distribute authentic medications and healthcare equipment.
            </p>
            <div className="flex items-center gap-3 text-slate-500">
              <span>📘</span> <span>🐦</span> <span>📸</span> <span>📺</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 font-semibold">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition">Home Page</button></li>
              <li><button onClick={() => setActiveTab('shop')} className="hover:text-white transition">Shop Catalog</button></li>
              <li><button onClick={() => setActiveTab('prescription')} className="hover:text-white transition">Upload Prescription</button></li>
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition">My Dashboard</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Support Center</h4>
            <ul className="space-y-2 font-semibold">
              <li><button onClick={() => setActiveTab('faq')} className="hover:text-white transition">FAQ & Help</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-white transition">Contact Helpline</button></li>
              <li><span className="hover:text-white cursor-pointer transition">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Terms & Conditions</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Return Policy</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Dispensary App</h4>
            <p className="text-[11px] leading-relaxed text-slate-500 font-medium">Download our mobile pharmacy app to manage chronic refills automatically.</p>
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <span className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-[10px] font-black text-white flex items-center justify-center gap-1.5 cursor-pointer">
                🍏 App Store
              </span>
              <span className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-[10px] font-black text-white flex items-center justify-center gap-1.5 cursor-pointer">
                🤖 Google Play
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-semibold text-slate-500 gap-4">
          <span>© 2026 {companyName || 'MedShop Rx'} Pharmacy. All Rights Reserved. Licensed under Pharmacy Act 1948.</span>
          <span>Designed & Powered by ZATBIZ Builder.</span>
        </div>
      </footer>

      {/* VIEW MODAL: PRODUCT DETAILS */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative text-slate-800 animate-scale-up">
            
            {/* Close */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold transition cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
              
              {/* Product Images (Left side) */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="w-full aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-150 flex items-center justify-center relative">
                  <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  
                  {/* Badge */}
                  {selectedProduct.prescriptionRequired && (
                    <span className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow">
                      Prescription Required (Rx)
                    </span>
                  )}
                </div>

                {/* Grid of multiple static thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {[selectedProduct.imageUrl, selectedProduct.imageUrl, selectedProduct.imageUrl, selectedProduct.imageUrl].map((img, index) => (
                    <div key={index} className="aspect-square bg-slate-50 border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-500">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Specifications (Right side) */}
              <div className="w-full md:w-1/2 space-y-6 text-left">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-extrabold">{selectedProduct.brand} • {selectedProduct.category}</span>
                  <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">{selectedProduct.name}</h2>
                  <p className="text-xs text-slate-450 font-bold font-mono">Generic Name (Salt): {selectedProduct.genericName}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-1 text-amber-500">
                    <span>⭐</span>
                    <span>{selectedProduct.rating || '4.5'}</span>
                  </div>
                  <span className="h-3 w-px bg-slate-250" />
                  <span className="text-slate-400">({Math.floor((selectedProduct.rating || 4) * 12)} verified clinical ratings)</span>
                  <span className="h-3 w-px bg-slate-250" />
                  <span className={`font-black ${selectedProduct.stockStatus === 'In Stock' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {selectedProduct.stockStatus} ({selectedProduct.stockCount || 10} units)
                  </span>
                </div>

                {/* Price Display */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Best Online Price</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      {selectedProduct.discount > 0 ? (
                        <>
                          <span className="text-lg font-black text-slate-900 font-mono">₹{(selectedProduct.price * (1 - (selectedProduct.discount || 0)/100)).toFixed(2)}</span>
                          <span className="text-xs text-slate-400 line-through font-bold font-mono">₹{selectedProduct.price.toFixed(2)}</span>
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-black border border-emerald-100">SAVE {selectedProduct.discount}%</span>
                        </>
                      ) : (
                        <span className="text-lg font-black text-slate-900 font-mono">₹{selectedProduct.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                    <button 
                      onClick={() => addToCart(selectedProduct)}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-lg shadow transition cursor-pointer"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>

                {/* Specifications Tabs / Accordions */}
                <div className="space-y-4 pt-2">
                  <div className="text-xs border-b border-slate-150 pb-2">
                    <span className="font-black text-slate-800 block mb-0.5">Description & Uses</span>
                    <p className="text-slate-500 leading-relaxed font-semibold">{selectedProduct.description}</p>
                    <p className="text-slate-500 leading-relaxed font-semibold mt-1"><strong>Indications:</strong> {selectedProduct.uses}</p>
                  </div>
                  
                  <div className="text-xs border-b border-slate-150 pb-2">
                    <span className="font-black text-slate-800 block mb-0.5">Dosage & Composition</span>
                    <p className="text-slate-500 leading-relaxed font-semibold"><strong>Strength:</strong> {selectedProduct.dosage}</p>
                    <p className="text-slate-500 leading-relaxed font-semibold"><strong>Ingredients:</strong> {selectedProduct.ingredients}</p>
                  </div>

                  <div className="text-xs border-b border-slate-150 pb-2">
                    <span className="font-black text-slate-800 block mb-0.5">Safety Warnings & Side Effects</span>
                    <p className="text-rose-600 leading-relaxed font-bold">⚠️ {selectedProduct.warnings}</p>
                    <p className="text-slate-500 leading-relaxed font-semibold mt-1"><strong>Potential Side Effects:</strong> {selectedProduct.sideEffects}</p>
                  </div>

                  <div className="text-[10px] text-slate-400 font-bold flex justify-between">
                    <span>Storage: {selectedProduct.storageInstructions}</span>
                    <span>Expiry: {selectedProduct.expiryInformation}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* SLIDE DRAWYER: SHOPPING CART */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
          <div 
            className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl relative text-slate-800 animate-slide-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛒</span>
                <div>
                  <h3 className="text-xs font-black text-slate-900">Your Basket Summary</h3>
                  <span className="text-[9px] text-slate-400 font-bold">Manage items and apply discount coupons</span>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Cart Items list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {cartHasPrescriptionItems && (
                <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3.5 rounded-2xl text-[10px] font-bold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>This order contains Rx-prescription drugs. A valid prescription document must be attached during checkout.</span>
                </div>
              )}

              {cart.length === 0 ? (
                <div className="py-20 text-center text-slate-400 font-bold text-xs space-y-3">
                  <span className="text-5xl block">🛒</span>
                  <p>Your shopping basket is empty.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setActiveTab('shop'); }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black shadow-sm"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-slate-150">
                  {cart.map((item, idx) => {
                    const priceAfterDiscount = item.price * (1 - (item.discount || 0)/100);
                    return (
                      <div key={item.id} className="flex items-center justify-between gap-3 pt-3 first:pt-0">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={item.image} className="w-10 h-10 object-cover rounded-lg border border-slate-150" alt="" />
                          <div className="text-left min-w-0">
                            <h5 className="text-[11px] font-black text-slate-850 truncate">{item.name}</h5>
                            <span className="text-[9px] text-slate-400 font-bold block font-mono">₹{priceAfterDiscount.toFixed(2)} each</span>
                            {item.prescriptionRequired && (
                              <span className="text-[7px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-black uppercase inline-block mt-0.5">Rx</span>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded border border-slate-200 text-xs font-black hover:bg-slate-100">-</button>
                            <span className="text-xs font-black font-mono w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded border border-slate-200 text-xs font-black hover:bg-slate-100">+</button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-450 hover:text-rose-500 font-bold text-xs"
                            title="Remove item"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Coupons & Pricing */}
            <div className="p-5 border-t border-slate-150 space-y-4 bg-slate-50/50">
              
              {/* Coupon inputs */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon: HEALTH10 or RXFREE"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none w-full text-slate-800"
                />
                <button 
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white text-xs font-black rounded-xl"
                >
                  Apply
                </button>
              </div>

              {/* Order Calculation */}
              <div className="space-y-2 text-xs font-bold text-slate-600">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Items Subtotal:</span>
                  <span className="font-mono">₹{subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-emerald-600">
                    <span>Discount Applied:</span>
                    <span className="font-mono">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Sterile Packing & Delivery:</span>
                  <span className="font-mono">{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges.toFixed(2)}`}</span>
                </div>
                <div className="h-px bg-slate-200 mt-2" />
                <div className="flex justify-between items-center text-sm font-black text-slate-900 mt-1">
                  <span>Grand Total:</span>
                  <span className="font-mono text-emerald-600">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Actions */}
              {cart.length > 0 ? (
                <button
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition text-center cursor-pointer"
                >
                  Proceed to Checkout ➔
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-3 bg-slate-200 text-slate-400 text-xs font-black rounded-xl text-center cursor-not-allowed"
                >
                  Basket is Empty
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* DIALOG MODAL: CHECKOUT & SCHEDULER */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative text-slate-800 animate-scale-up">
            
            {/* Close */}
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold transition cursor-pointer z-10"
            >
              ✕
            </button>

            {/* Header */}
            <div className="p-6 border-b border-slate-100 text-left bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-1">
                <span>🛒</span> Dispensary Checkout
              </h3>
              <p className="text-[10px] text-slate-450 font-bold">Schedule delivery time slots and payment options.</p>
            </div>

            {/* Form scrollable */}
            <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              
              {/* Delivery location address */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700">Shipping Address *</label>
                <input
                  required
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street name, flat number, sector code, landmark..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                />
              </div>

              {/* Delivery time slots */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 block">Delivery Time Slot *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    '08:00 AM - 12:00 PM (Morning)',
                    '12:00 PM - 04:00 PM (Afternoon)',
                    '04:00 PM - 08:00 PM (Evening)',
                    'Express Delivery (2 Hours)'
                  ].map((slot, idx) => (
                    <label key={idx} className={`p-3 border rounded-xl flex items-center gap-2 cursor-pointer transition text-xs font-bold ${
                      deliverySlot === slot ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}>
                      <input
                        type="radio"
                        name="radio_timeslot"
                        checked={deliverySlot === slot}
                        onChange={() => setDeliverySlot(slot)}
                        className="accent-emerald-600"
                      />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 block">Payment Option *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash on Delivery', 'Wallet'].map((method, idx) => (
                    <label key={idx} className={`p-3 border rounded-xl flex items-center gap-2 cursor-pointer transition text-xs font-bold ${
                      paymentMethod === method ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}>
                      <input
                        type="radio"
                        name="radio_payment"
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="accent-emerald-600"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prescription attach checkout */}
              {cartHasPrescriptionItems && (
                <div className="space-y-3 bg-rose-50/50 border border-rose-100 p-4 rounded-2xl">
                  <div className="text-[10px] font-bold text-rose-700 flex items-center gap-1.5">
                    <span>⚠️</span>
                    <span>This order requires a medical prescription file.</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700">Attach Prescription File *</label>
                    <input
                      required={!checkoutPrescriptionUrl}
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handlePrescriptionFile}
                      className="w-full text-xs"
                    />
                    {checkoutPrescriptionUrl && (
                      <span className="text-[9px] text-emerald-600 font-extrabold block">✓ Prescription loaded from session cache.</span>
                    )}
                  </div>
                </div>
              )}

              {/* Doctor notes */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700">Doctor Notes / Special Delivery instructions</label>
                <textarea
                  rows={2}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="e.g. Keep items in separate packets, ring doorbell..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs outline-none resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-slate-900 text-white p-4.5 rounded-2xl space-y-2 text-xs font-bold">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Items:</span>
                  <span>{cart.reduce((sum, i) => sum + i.quantity, 0)} items</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Grand Total Payable:</span>
                  <span className="font-mono">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition text-center cursor-pointer flex items-center justify-center gap-1"
              >
                <span>🔒</span> Pay & Authorize Order Dispatch
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
