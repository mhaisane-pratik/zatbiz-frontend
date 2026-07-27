'use client';
import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Product } from '@/types';

export default function BaseAdminDashboard({ 
  projectId, 
  projectConfig, 
  onLogout, 
  setActiveView, 
  addToast,
  dbProducts = [],
  setDbProducts,
  defaultCategory = 'fashion',
  defaultPrimaryColor = '#6366f1',
  defaultLogoIcon = '👗'
}: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const primaryColor = projectConfig?.themeColor || defaultPrimaryColor;
  const logoIcon = projectConfig?.logoIcon || defaultLogoIcon;

  const category = defaultCategory;
  const isLight = projectConfig?.selectedThemeData?.bgColor === '#ffffff';

  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Load categories from database on mount
  useEffect(() => {
    api.categories.list(projectId)
      .then((data) => {
        setDbCategories(data || []);
      })
      .catch((err) => {
        console.warn('Failed to load categories:', err);
      });
  }, [projectId]);

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductCategory, setNewProductCategory] = useState(defaultCategory.toUpperCase());
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductImageUrl, setNewProductImageUrl] = useState('');
  const [isUploadingProductImg, setIsUploadingProductImg] = useState(false);

  // Niche-specific field states
  // 1. Fashion
  const [fashionBrand, setFashionBrand] = useState('');
  const [fashionSize, setFashionSize] = useState('M');
  const [fashionColor, setFashionColor] = useState('');
  const [fashionFabric, setFashionFabric] = useState('');
  const [fashionGender, setFashionGender] = useState('Women');
  const [fashionStyle, setFashionStyle] = useState('');
  const [fashionCollection, setFashionCollection] = useState('');

  // 2. Electronics
  const [elecBrand, setElecBrand] = useState('');
  const [elecModel, setElecModel] = useState('');
  const [elecProcessor, setElecProcessor] = useState('');
  const [elecRam, setElecRam] = useState('');
  const [elecStorage, setElecStorage] = useState('');
  const [elecWarranty, setElecWarranty] = useState('');
  const [elecVoltage, setElecVoltage] = useState('');
  const [elecSpecs, setElecSpecs] = useState('');

  // 3. Grocery
  const [grocExpiry, setGrocExpiry] = useState('');
  const [grocWeight, setGrocWeight] = useState('');
  const [grocUnit, setGrocUnit] = useState('kg');
  const [grocFreshness, setGrocFreshness] = useState('Fresh');
  const [grocOrganic, setGrocOrganic] = useState(false);
  const [grocSlot, setGrocSlot] = useState('Morning');

  // 4. Pet
  const [petType, setPetType] = useState('Dog');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('Adult');
  const [petFood, setPetFood] = useState('');
  const [petVet, setPetVet] = useState(false);

  // 5. Books
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookPublisher, setBookPublisher] = useState('');
  const [bookIsbn, setBookIsbn] = useState('');
  const [bookLanguage, setBookLanguage] = useState('English');
  const [bookEdition, setBookEdition] = useState('1st Edition');
  const [bookPages, setBookPages] = useState('');

  // 6. Pharmacy
  const [pharmPrescription, setPharmPrescription] = useState(false);
  const [pharmDosage, setPharmDosage] = useState('');
  const [pharmManufacturer, setPharmManufacturer] = useState('');
  const [pharmExpiry, setPharmExpiry] = useState('');
  const [pharmType, setPharmType] = useState('Tablet');

  // Fallback products list for initial preview look
  const fallbackProducts = [
    { id: 1, name: 'Premium Niche Collection Item A', price: 1850, stock: 18, category: 'Best Sellers', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&auto=format&fit=crop&q=80', description: 'Exclusive premium quality selection.' },
    { id: 2, name: 'Specialty Curated Selection B', price: 3400, stock: 3, category: 'New Arrivals', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80', description: 'Curated boutique apparel accessory.' }
  ];

  const productsList = dbProducts && dbProducts.length > 0 ? dbProducts : fallbackProducts;

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice || !newProductStock) {
      if (typeof addToast === 'function') addToast('Please fill all fields', true);
      return;
    }

    // Bundle niche-specific fields
    let nicheFields: any = {};
    const catLower = category.toLowerCase();
    if (catLower.includes('fashion')) {
      nicheFields = {
        brand: fashionBrand,
        size: fashionSize,
        color: fashionColor,
        fabric: fashionFabric,
        gender: fashionGender,
        style: fashionStyle,
        seasonalCollection: fashionCollection
      };
    } else if (catLower.includes('electronics') || catLower.includes('gadgets') || catLower.includes('computer')) {
      nicheFields = {
        brand: elecBrand,
        modelNumber: elecModel,
        processor: elecProcessor,
        ram: elecRam,
        storage: elecStorage,
        warranty: elecWarranty,
        voltage: elecVoltage,
        specifications: elecSpecs
      };
    } else if (catLower.includes('grocery') || catLower.includes('organic')) {
      nicheFields = {
        expiryDate: grocExpiry,
        weight: grocWeight,
        unit: grocUnit,
        freshness: grocFreshness,
        organic: grocOrganic,
        deliverySlot: grocSlot
      };
    } else if (catLower.includes('pet')) {
      nicheFields = {
        petType,
        breed: petBreed,
        ageGroup: petAge,
        foodType: petFood,
        veterinaryProducts: petVet
      };
    } else if (catLower.includes('book')) {
      nicheFields = {
        author: bookAuthor,
        publisher: bookPublisher,
        isbn: bookIsbn,
        language: bookLanguage,
        edition: bookEdition,
        numberOfPages: bookPages
      };
    } else if (catLower.includes('pharmacy') || catLower.includes('medical') || catLower.includes('health')) {
      nicheFields = {
        prescriptionRequired: pharmPrescription,
        dosage: pharmDosage,
        manufacturer: pharmManufacturer,
        expiryDate: pharmExpiry,
        medicineType: pharmType
      };
    }
    
    const productPayload: Omit<Product, 'id'> = {
      projectId,
      name: newProductName,
      description: JSON.stringify({
        text: newProductDescription || `${newProductName} - Premium curated ${category} merchandise.`,
        nicheFields
      }),
      price: parseFloat(newProductPrice),
      category: newProductCategory,
      imageUrl: newProductImageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      stock: parseInt(newProductStock),
      available: parseInt(newProductStock) > 0
    };

    try {
      const created = await api.products.create(productPayload);
      if (setDbProducts) {
        setDbProducts((prev: any) => [created, ...prev]);
      }
      setNewProductName('');
      setNewProductPrice('');
      setNewProductStock('');
      setNewProductDescription('');
      setNewProductImageUrl('');
      // Clear niche states
      setFashionBrand(''); setFashionColor(''); setFashionFabric(''); setFashionStyle(''); setFashionCollection('');
      setElecBrand(''); setElecModel(''); setElecProcessor(''); setElecRam(''); setElecStorage(''); setElecWarranty(''); setElecVoltage(''); setElecSpecs('');
      setGrocExpiry(''); setGrocWeight(''); setGrocOrganic(false);
      setPetBreed(''); setPetFood(''); setPetVet(false);
      setBookAuthor(''); setBookPublisher(''); setBookIsbn(''); setBookPages('');
      setPharmDosage(''); setPharmManufacturer(''); setPharmExpiry(''); setPharmPrescription(false);

      if (typeof addToast === 'function') addToast('Product added to inventory catalog!');
    } catch (err) {
      console.error(err);
      if (typeof addToast === 'function') addToast('Failed to add product to backend database.', true);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await api.products.delete(productId);
      if (setDbProducts) {
        setDbProducts((prev: any) => prev.filter((p: any) => p.id !== productId));
      }
      if (typeof addToast === 'function') addToast('Product deleted successfully.');
    } catch (err) {
      console.error(err);
      if (typeof addToast === 'function') addToast('Failed to delete product.', true);
    }
  };

  // Orders (live from backend database)
  const [merchantOrders, setMerchantOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const itemCount = (order: any) => {
    try {
      const items = JSON.parse(order.itemsJson || '[]');
      if (Array.isArray(items)) {
        return items.reduce((sum: number, it: any) => sum + (Number(it.quantity) || 1), 0);
      }
    } catch (e) {}
    return order.itemCount || 0;
  };

  const handleToggleFulfillment = async (orderId: number, currentStatus: string) => {
    const nextStatus = (currentStatus || '').toLowerCase() === 'fulfilled' ? 'Unfulfilled' : 'Fulfilled';
    try {
      await api.orders.updateStatus(orderId, nextStatus);
      setMerchantOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status: nextStatus } : order
      ));
      if (typeof addToast === 'function') addToast(`Order #${orderId} marked as ${nextStatus}!`);
    } catch (err) {
      console.error(err);
      if (typeof addToast === 'function') addToast('Failed to update order status.', true);
    }
  };

  // Customers (live from backend database)
  const [customersList, setCustomersList] = useState<any[]>([]);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const created = await api.categories.create({ projectId, name: newCategoryName.trim() });
      setDbCategories(prev => [...prev, created]);
      setNewCategoryName('');
      if (typeof addToast === 'function') addToast('Category created successfully!');
    } catch (err) {
      console.error(err);
      if (typeof addToast === 'function') addToast('Failed to create category.', true);
    }
  };

  const handleDeleteCategory = async (catId: number) => {
    try {
      await api.categories.delete(catId);
      setDbCategories(prev => prev.filter(c => c.id !== catId));
      if (typeof addToast === 'function') addToast('Category deleted successfully.');
    } catch (err) {
      console.error(err);
      if (typeof addToast === 'function') addToast('Failed to delete category.', true);
    }
  };

  // Coupons (live from backend database)
  const [coupons, setCoupons] = useState<any[]>([]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponDiscount) return;
    const raw = newCouponDiscount.trim();
    const isPercent = raw.includes('%');
    const payload = {
      projectId,
      code: newCouponCode.toUpperCase(),
      discount: raw,
      discountValue: parseFloat(raw.replace(/[^0-9.]/g, '')) || 0,
      discountType: isPercent ? 'Percentage' : 'Flat Amount',
      type: isPercent ? 'Percentage' : 'Flat Amount',
      status: 'Active',
      active: true,
    };
    try {
      const created = await api.coupons.create(payload);
      setCoupons(prev => [...prev, created || payload]);
      setNewCouponCode('');
      setNewCouponDiscount('');
      if (typeof addToast === 'function') addToast('Promo coupon code generated!');
    } catch (err) {
      console.error(err);
      if (typeof addToast === 'function') addToast('Failed to save coupon.', true);
    }
  };

  const handleDeleteCoupon = async (coupon: any) => {
    if (!coupon?.id) {
      setCoupons(prev => prev.filter(c => c !== coupon));
      return;
    }
    try {
      await api.coupons.delete(coupon.id);
      setCoupons(prev => prev.filter(c => c.id !== coupon.id));
      if (typeof addToast === 'function') addToast('Coupon deleted.');
    } catch (err) {
      console.error(err);
      if (typeof addToast === 'function') addToast('Failed to delete coupon.', true);
    }
  };

  // Settings
  const [storeSettings, setStoreSettings] = useState({
    announcement: '✨ FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹1,500! ✨',
    slogan: `Premium quality ${category} products and customized essentials.`,
    supportEmail: `support@${category}.zatbiz.com`,
    taxRate: '18%'
  });

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.settings.update(projectId, storeSettings);
      if (typeof addToast === 'function') addToast('Store settings updated successfully.');
    } catch (err) {
      console.error(err);
      if (typeof addToast === 'function') addToast('Failed to save store settings.', true);
    }
  };

  // Load orders, customers, coupons and settings from the backend on mount
  useEffect(() => {
    setOrdersLoading(true);
    api.orders.list(projectId)
      .then((data) => setMerchantOrders(data || []))
      .catch((err) => console.warn('Failed to load orders:', err))
      .finally(() => setOrdersLoading(false));

    api.customers.list(projectId)
      .then((data) => setCustomersList(data || []))
      .catch((err) => console.warn('Failed to load customers:', err));

    api.coupons.list(projectId)
      .then((data) => { if (Array.isArray(data)) setCoupons(data); })
      .catch((err) => console.warn('Failed to load coupons:', err));

    api.settings.get(projectId)
      .then((data) => { if (data) setStoreSettings((prev) => ({ ...prev, ...data })); })
      .catch((err) => console.warn('Failed to load settings:', err));
  }, [projectId]);

  // Static review data for reports / reviews
  const [reviews] = useState([
    { id: 1, buyerName: 'Ananya Roy', rating: 5, comment: 'Exceptional build quality! Highly recommended.', date: '2026-07-15' },
    { id: 2, buyerName: 'Kabir Dev', rating: 4, comment: 'Delivery was slightly delayed but product is top-notch.', date: '2026-07-14' }
  ]);

  const cardClass = `rounded-2xl p-6 border transition duration-300 ${isLight ? 'bg-white border-slate-200 shadow-sm text-slate-800' : 'bg-slate-900 border-white/5 text-white shadow-lg'}`;
  const inputClass = `w-full px-3 py-2 rounded-xl text-xs focus:outline-none border transition ${isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-slate-405' : 'bg-white/5 border-white/10 text-white focus:border-indigo-500'}`;

  // Live stats derived from backend data
  const revenueValue = merchantOrders.reduce((sum: number, o: any) => sum + (Number(o.total) || 0), 0);
  const stats = {
    revenue: `₹${revenueValue.toLocaleString('en-IN')}`,
    sales: String(merchantOrders.length),
    customers: String(customersList.length),
    lowStock: String(productsList.filter((p: any) => (Number(p.stock) || 0) > 0 && (Number(p.stock) || 0) < 5).length),
  };

  // Helper parser for products
  const parseDesc = (desc: string) => {
    try {
      if (desc.trim().startsWith('{') && desc.trim().endsWith('}')) {
        const parsed = JSON.parse(desc);
        return { text: parsed.text, nicheFields: parsed.nicheFields || {} };
      }
    } catch(e){}
    return { text: desc, nicheFields: {} };
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-955 text-white'}`}>
      {/* Sidebar navigation */}
      <aside className={`w-64 p-5 border-r shrink-0 flex flex-col ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-white/5'}`}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <span className="text-2xl p-1 bg-white/5 border border-white/10 rounded-lg">{logoIcon}</span>
          <div>
            <h2 className="text-xs font-black uppercase tracking-tight">Admin Console</h2>
            <p className="text-[9px] text-slate-500 font-bold">Store ID: #{projectId}</p>
          </div>
        </div>

        <nav className="space-y-1 flex-grow overflow-y-auto max-h-[70vh] pr-1">
          {[
            { id: 'overview', label: '📊 Dashboard' },
            { id: 'inventory', label: '🛍️ Products' },
            { id: 'categories', label: '📁 Categories' },
            { id: 'orders', label: '📦 Orders' },
            { id: 'customers', label: '👥 Customers' },
            { id: 'coupons', label: '🎟️ Coupons' },
            { id: 'payments', label: '💳 Payments' },
            { id: 'shipping', label: '🚚 Shipping' },
            { id: 'reviews', label: '⭐ Reviews' },
            { id: 'reports', label: '📈 Reports' },
            { id: 'settings', label: '⚙️ Settings' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:bg-white/5'}`}
              style={activeTab === tab.id ? { backgroundColor: primaryColor } : {}}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="mt-auto w-full py-2 bg-rose-500/10 border border-rose-500/20 text-rose-455 text-xs font-bold rounded-xl hover:bg-rose-500/20 transition cursor-pointer">
          Log Out
        </button>
      </aside>

      {/* Main content viewport */}
      <main className="flex-grow p-6 md:p-8 space-y-6 overflow-y-auto max-w-5xl">
        <header className="flex justify-between items-center pb-4 border-b border-white/5">
          <h1 className="text-lg font-black tracking-tight capitalize">{activeTab} Details</h1>
          <button onClick={() => setActiveView('landing')} className="text-xs font-bold text-slate-400 hover:text-white transition">← View Storefront</button>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={cardClass}>
                <h4 className="text-[10px] font-black uppercase text-slate-500 mb-1">Total Revenue</h4>
                <p className="text-2xl font-black text-white">{stats.revenue}</p>
              </div>
              <div className={cardClass}>
                <h4 className="text-[10px] font-black uppercase text-slate-500 mb-1">Fulfillments</h4>
                <p className="text-2xl font-black text-white">{stats.sales}</p>
              </div>
              <div className={cardClass}>
                <h4 className="text-[10px] font-black uppercase text-slate-500 mb-1">Total Members</h4>
                <p className="text-2xl font-black text-white">{stats.customers}</p>
              </div>
              <div className={cardClass}>
                <h4 className="text-[10px] font-black uppercase text-slate-500 mb-1">Stock Alerts</h4>
                <p className="text-2xl font-black text-rose-400">{stats.lowStock} Items</p>
              </div>
            </div>

            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Monthly Merchant Sales Chart</h3>
              <div className="flex items-end gap-3 h-36 pt-4">
                {[45, 60, 50, 75, 90, 110, 85].map((val, idx) => (
                  <div key={idx} className="flex-grow flex flex-col items-center gap-1.5">
                    <div className="w-full rounded-t-lg transition hover:opacity-90" style={{ height: `${val}px`, backgroundColor: primaryColor }} />
                    <span className="text-[9px] text-slate-500 font-bold">M{idx+1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4 font-bold">Add Product to Catalog</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                {/* Standard product fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Product Name</label>
                    <input type="text" placeholder="e.g. Premium Item" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className={inputClass} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                    <select 
                      value={newProductCategory} 
                      onChange={(e) => setNewProductCategory(e.target.value)} 
                      className={inputClass}
                      required
                    >
                      <option value="">-- Select Category --</option>
                      {dbCategories.map((c: any) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                      <option value={category.toUpperCase()}>{category.toUpperCase()}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Price (₹)</label>
                    <input type="number" placeholder="1850" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} className={inputClass} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Stock Count</label>
                    <input type="number" placeholder="25" value={newProductStock} onChange={(e) => setNewProductStock(e.target.value)} className={inputClass} required />
                  </div>
                </div>

                {/* NICHE-SPECIFIC PRODUCT FORM OVERLAYS */}
                {/* 1. Fashion Product Fields */}
                {category.toLowerCase().includes('fashion') && (
                  <div className="border border-indigo-500/10 rounded-2xl p-4 bg-white/[0.01] space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">👗 Fashion Specific Attributes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Brand</label>
                        <input type="text" placeholder="e.g. Armani" value={fashionBrand} onChange={(e) => setFashionBrand(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Fabric</label>
                        <input type="text" placeholder="e.g. 100% Cotton" value={fashionFabric} onChange={(e) => setFashionFabric(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Color</label>
                        <input type="text" placeholder="e.g. Indigo Blue" value={fashionColor} onChange={(e) => setFashionColor(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Size</label>
                        <select value={fashionSize} onChange={(e) => setFashionSize(e.target.value)} className={inputClass}>
                          {['S', 'M', 'L', 'XL'].map(sz => <option key={sz} value={sz}>{sz}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Gender Target</label>
                        <select value={fashionGender} onChange={(e) => setFashionGender(e.target.value)} className={inputClass}>
                          {['Men', 'Women', 'Kids', 'Unisex'].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Style</label>
                        <input type="text" placeholder="e.g. Casual" value={fashionStyle} onChange={(e) => setFashionStyle(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Season Collection</label>
                        <input type="text" placeholder="e.g. Summer 2026" value={fashionCollection} onChange={(e) => setFashionCollection(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Electronics Product Fields */}
                {(category.toLowerCase().includes('electronics') || category.toLowerCase().includes('gadgets') || category.toLowerCase().includes('computer')) && (
                  <div className="border border-indigo-500/10 rounded-2xl p-4 bg-white/[0.01] space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">💻 Electronics Specific Attributes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Brand</label>
                        <input type="text" placeholder="e.g. Apple" value={elecBrand} onChange={(e) => setElecBrand(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Model Number</label>
                        <input type="text" placeholder="e.g. AP-X900" value={elecModel} onChange={(e) => setElecModel(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Processor</label>
                        <input type="text" placeholder="e.g. M3 Pro" value={elecProcessor} onChange={(e) => setElecProcessor(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">RAM</label>
                        <input type="text" placeholder="e.g. 16 GB" value={elecRam} onChange={(e) => setElecRam(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Storage</label>
                        <input type="text" placeholder="e.g. 512 GB SSD" value={elecStorage} onChange={(e) => setElecStorage(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Warranty</label>
                        <input type="text" placeholder="e.g. 1 Year Apple Care" value={elecWarranty} onChange={(e) => setElecWarranty(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Voltage</label>
                        <input type="text" placeholder="e.g. 240V" value={elecVoltage} onChange={(e) => setElecVoltage(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Specifications</label>
                        <input type="text" placeholder="e.g. Retina display" value={elecSpecs} onChange={(e) => setElecSpecs(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Grocery Product Fields */}
                {(category.toLowerCase().includes('grocery') || category.toLowerCase().includes('organic')) && (
                  <div className="border border-indigo-500/10 rounded-2xl p-4 bg-white/[0.01] space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">🍎 Grocery Specific Attributes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Expiry Date</label>
                        <input type="date" value={grocExpiry} onChange={(e) => setGrocExpiry(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Weight</label>
                        <input type="text" placeholder="e.g. 500" value={grocWeight} onChange={(e) => setGrocWeight(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Unit</label>
                        <select value={grocUnit} onChange={(e) => setGrocUnit(e.target.value)} className={inputClass}>
                          {['kg', 'g', 'litre', 'ml', 'pcs'].map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Freshness Indicator</label>
                        <input type="text" placeholder="e.g. Freshly Harvested" value={grocFreshness} onChange={(e) => setGrocFreshness(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Preferred Delivery Slot</label>
                        <select value={grocSlot} onChange={(e) => setGrocSlot(e.target.value)} className={inputClass}>
                          {['Morning 7-10 AM', 'Noon 12-3 PM', 'Evening 5-8 PM'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 pt-4">
                        <input type="checkbox" checked={grocOrganic} onChange={(e) => setGrocOrganic(e.target.checked)} className="accent-indigo-650" id="organic-check" />
                        <label htmlFor="organic-check" className="text-[10px] font-black uppercase text-slate-350 cursor-pointer">100% Certified Organic</label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Pet Store Fields */}
                {category.toLowerCase().includes('pet') && (
                  <div className="border border-indigo-500/10 rounded-2xl p-4 bg-white/[0.01] space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">🐶 Pet Specific Attributes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Pet Type</label>
                        <select value={petType} onChange={(e) => setPetType(e.target.value)} className={inputClass}>
                          {['Dog', 'Cat', 'Bird', 'Fish', 'Reptile'].map(pt => <option key={pt} value={pt}>{pt}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Breed</label>
                        <input type="text" placeholder="e.g. Golden Retriever" value={petBreed} onChange={(e) => setPetBreed(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Age Group</label>
                        <select value={petAge} onChange={(e) => setPetAge(e.target.value)} className={inputClass}>
                          {['Puppy / Kitten', 'Adult', 'Senior'].map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Food Type</label>
                        <input type="text" placeholder="e.g. High Protein Dry Kibble" value={petFood} onChange={(e) => setPetFood(e.target.value)} className={inputClass} />
                      </div>
                      <div className="flex items-center gap-2 pt-4">
                        <input type="checkbox" checked={petVet} onChange={(e) => setPetVet(e.target.checked)} className="accent-indigo-650" id="vet-check" />
                        <label htmlFor="vet-check" className="text-[10px] font-black uppercase text-slate-350 cursor-pointer">Veterinary Grade Product</label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Book Store Fields */}
                {category.toLowerCase().includes('book') && (
                  <div className="border border-indigo-500/10 rounded-2xl p-4 bg-white/[0.01] space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">📚 Book Specific Attributes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Author</label>
                        <input type="text" placeholder="e.g. George Orwell" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Publisher</label>
                        <input type="text" placeholder="e.g. Penguin Books" value={bookPublisher} onChange={(e) => setBookPublisher(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">ISBN</label>
                        <input type="text" placeholder="e.g. 978-0141036144" value={bookIsbn} onChange={(e) => setBookIsbn(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Language</label>
                        <input type="text" placeholder="e.g. English" value={bookLanguage} onChange={(e) => setBookLanguage(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Edition</label>
                        <input type="text" placeholder="e.g. Special Edition" value={bookEdition} onChange={(e) => setBookEdition(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-black uppercase text-slate-400">Number of Pages</label>
                        <input type="number" placeholder="328" value={bookPages} onChange={(e) => setBookPages(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Pharmacy Store Fields */}
                {(category.toLowerCase().includes('pharmacy') || category.toLowerCase().includes('medical') || category.toLowerCase().includes('health')) && (
                  <div className="border border-indigo-500/10 rounded-2xl p-4 bg-white/[0.01] space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">💊 Medical & Pharmacy Specific Attributes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Manufacturer</label>
                        <input type="text" placeholder="e.g. Pfizer" value={pharmManufacturer} onChange={(e) => setPharmManufacturer(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Dosage strength</label>
                        <input type="text" placeholder="e.g. 500mg" value={pharmDosage} onChange={(e) => setPharmDosage(e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Medicine Type</label>
                        <select value={pharmType} onChange={(e) => setPharmType(e.target.value)} className={inputClass}>
                          {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment'].map(mt => <option key={mt} value={mt}>{mt}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">Expiration Date</label>
                        <input type="date" value={pharmExpiry} onChange={(e) => setPharmExpiry(e.target.value)} className={inputClass} />
                      </div>
                      <div className="flex items-center gap-2 pt-4">
                        <input type="checkbox" checked={pharmPrescription} onChange={(e) => setPharmPrescription(e.target.checked)} className="accent-indigo-650" id="rx-check" />
                        <label htmlFor="rx-check" className="text-[10px] font-black uppercase text-slate-350 cursor-pointer">Prescription Required (Rx)</label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Product Description</label>
                  <textarea rows={3} placeholder="Write a detailed description of the product..." value={newProductDescription} onChange={(e) => setNewProductDescription(e.target.value)} className={inputClass} />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 block">Product Image</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <input type="text" placeholder="Or paste image URL" value={newProductImageUrl} onChange={(e) => setNewProductImageUrl(e.target.value)} className={inputClass} />
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Or upload from device:</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setIsUploadingProductImg(true);
                              try {
                                const url = await api.media.uploadImage(file);
                                setNewProductImageUrl(url);
                              } catch (err) {
                                console.error('Product image upload failed:', err);
                              } finally {
                                setIsUploadingProductImg(false);
                              }
                            }
                          }}
                          className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-650 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                        />
                      </div>
                      {isUploadingProductImg && (
                        <span className="text-[10px] text-indigo-400 font-bold animate-pulse">Uploading product image...</span>
                      )}
                    </div>
                    {newProductImageUrl && (
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2 max-w-xs">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Preview:</span>
                        <img src={newProductImageUrl} className="h-16 w-16 object-cover rounded-lg border border-white/10" alt="product preview" />
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="w-full py-2.5 text-xs font-black text-white uppercase tracking-wider rounded-xl hover:opacity-90 transition cursor-pointer font-bold" style={{ backgroundColor: primaryColor }}>
                  Add Product to Catalog
                </button>
              </form>
            </div>

            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Store Product Catalog</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-500 font-black uppercase text-[10px]">
                      <th className="pb-3">SKU Code</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Stock</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-semibold text-slate-350">
                    {productsList.map((p: any) => {
                      const details = parseDesc(p.description);
                      return (
                        <tr key={p.id} className="hover:bg-white/[0.01]">
                          <td className="py-3 text-indigo-400">NCH-{p.id || 'NEW'}</td>
                          <td className="py-3 flex items-center gap-3">
                            {p.imageUrl && (
                              <img src={p.imageUrl} className="w-10 h-10 object-cover rounded-lg border border-white/5 bg-slate-900" alt="prod thumb" />
                            )}
                            <div>
                              <span className="text-white block font-bold">{p.name}</span>
                              <span className="text-[10px] text-slate-450 block truncate max-w-xs">{details.text}</span>
                              {Object.keys(details.nicheFields).length > 0 && (
                                <span className="text-[8px] text-indigo-400 font-bold block max-w-xs truncate uppercase mt-0.5">
                                  {Object.entries(details.nicheFields).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${p.stock === 0 ? 'bg-rose-500/10 text-rose-455' : 'bg-green-500/10 text-green-455'}`}>
                              {p.stock === 0 ? 'Out of Stock' : `${p.stock} units`}
                            </span>
                          </td>
                          <td className="py-3 text-white">₹{p.price}</td>
                          <td className="py-3">
                            <button onClick={() => handleDeleteProduct(p.id!)} className="text-xs text-rose-455 hover:underline">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Add Category to Catalog</h3>
              <form onSubmit={handleCreateCategory} className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="e.g. Footwear" 
                  value={newCategoryName} 
                  onChange={(e) => setNewCategoryName(e.target.value)} 
                  className={inputClass} 
                  required 
                />
                <button 
                  type="submit" 
                  className="px-6 py-2.5 text-xs font-black text-white uppercase tracking-wider rounded-xl hover:opacity-90 transition shrink-0" 
                  style={{ backgroundColor: primaryColor }}
                >
                  Add Category
                </button>
              </form>
            </div>

            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Product Category Manifest</h3>
              <div className="space-y-4">
                {dbCategories.length === 0 ? (
                  <p className="text-xs text-slate-500 font-bold">No custom categories registered in the database yet.</p>
                ) : (
                  dbCategories.map((cat: any) => {
                    const count = productsList.filter((p: any) => p.category?.toUpperCase() === cat.name?.toUpperCase()).length;
                    return (
                      <div key={cat.id} className="flex justify-between items-center p-3.5 rounded-xl bg-white/5 border border-white/5">
                        <div>
                          <span className="text-xs font-black uppercase tracking-widest text-white">{cat.name}</span>
                          <span className="text-[10px] text-slate-500 font-bold block mt-0.5">{count} catalog products</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteCategory(cat.id)} 
                          className="text-xs text-rose-450 hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className={cardClass}>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Sales Order Fulfillment</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-500 font-black uppercase text-[10px]">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Buyer Name</th>
                    <th className="pb-3">Items</th>
                    <th className="pb-3">Gateway</th>
                    <th className="pb-3">Fulfillment Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-semibold text-slate-350">
                  {ordersLoading ? (
                    <tr><td colSpan={6} className="py-6 text-center text-slate-500 text-xs">Loading orders…</td></tr>
                  ) : merchantOrders.length === 0 ? (
                    <tr><td colSpan={6} className="py-6 text-center text-slate-500 text-xs">No orders yet.</td></tr>
                  ) : merchantOrders.map(order => (
                    <tr key={order.id} className="hover:bg-white/[0.01]">
                      <td className="py-3.5 text-white">#{order.invoiceNumber || order.id}</td>
                      <td className="py-3.5">{order.customerName || order.customerEmail || '—'}</td>
                      <td className="py-3.5">{itemCount(order)} item(s)</td>
                      <td className="py-3.5 text-indigo-400">{order.paymentGateway || '—'}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${(order.status || '').toLowerCase() === 'fulfilled' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <button onClick={() => handleToggleFulfillment(order.id, order.status)} className="text-xs text-indigo-400 hover:underline">
                          {(order.status || '').toLowerCase() === 'fulfilled' ? 'Unfulfill' : 'Fulfill Order'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className={cardClass}>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Registered Members List</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-500 font-black uppercase text-[10px] pb-3">
                    <th className="pb-3">Member Email</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">VIP Tier</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-350 font-semibold">
                  {customersList.length === 0 ? (
                    <tr><td colSpan={4} className="py-6 text-center text-slate-500 text-xs">No registered members yet.</td></tr>
                  ) : customersList.map((cust: any) => (
                    <tr key={cust.id} className="hover:bg-white/[0.01]">
                      <td className="py-3 text-white">{cust.email}</td>
                      <td className="py-3">{cust.name}</td>
                      <td className="py-3 text-indigo-400">{(cust.totalSpent || 0) > 10000 ? 'Gold Tier' : 'Member'}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${(cust.status || 'Active').toLowerCase() === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'}`}>
                          {cust.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Generate Discount Promo Coupon</h3>
              <form onSubmit={handleAddCoupon} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Coupon Code</label>
                  <input type="text" placeholder="FESTIVE30" value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value)} className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Discount Percent/Flat</label>
                  <input type="text" placeholder="30%" value={newCouponDiscount} onChange={(e) => setNewCouponDiscount(e.target.value)} className={inputClass} />
                </div>
                <button type="submit" className="py-2.5 text-xs font-black text-white uppercase tracking-wider rounded-xl hover:opacity-90 transition cursor-pointer" style={{ backgroundColor: primaryColor }}>
                  Generate Code
                </button>
              </form>
            </div>

            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Active Coupon Inventory</h3>
              <table className="w-full text-left text-xs font-semibold">
                <thead>
                  <tr className="border-b border-white/10 text-slate-500 font-black uppercase text-[10px] pb-3">
                    <th className="pb-3">Code</th>
                    <th className="pb-3">Discount Value</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-350">
                  {coupons.length === 0 ? (
                    <tr><td colSpan={5} className="py-6 text-center text-slate-500 text-xs">No coupons yet.</td></tr>
                  ) : coupons.map((c, idx) => {
                    const status = c.status || (c.active === false ? 'Expired' : 'Active');
                    return (
                      <tr key={c.id ?? c.code ?? idx} className="hover:bg-white/[0.01]">
                        <td className="py-3 text-white font-black">{c.code}</td>
                        <td className="py-3">{c.discount || c.discountValue}</td>
                        <td className="py-3">{c.discountType || c.type || '—'}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'}`}>
                            {status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button onClick={() => handleDeleteCoupon(c)} className="text-xs text-rose-455 hover:underline cursor-pointer">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className={cardClass}>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Payment Gateway Logs</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <h4 className="text-white font-black text-xs">Stripe Checkout Network</h4>
                  <p className="text-[10px] text-slate-450 mt-0.5">Primary credit card processor.</p>
                </div>
                <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-green-500/10 text-green-400 border border-green-500/20">Operational</span>
              </div>
              <div className="flex justify-between items-center p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <h4 className="text-white font-black text-xs">Razorpay UPI Gateway</h4>
                  <p className="text-[10px] text-slate-450 mt-0.5">Primary bank transfer interface.</p>
                </div>
                <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-green-500/10 text-green-400 border border-green-500/20">Operational</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Courier Service Shipping Rates</h3>
              <div className="space-y-4 font-semibold text-xs leading-relaxed">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <h4 className="text-white font-black">Domestic Zone (All India)</h4>
                    <p className="text-slate-400">Express delivery within 2-4 business days</p>
                  </div>
                  <span className="text-xs font-black text-white">₹150 Flat (Free &gt; ₹1,500)</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <h4 className="text-white font-black">International Zone (Global)</h4>
                    <p className="text-slate-400">International parcel networks (DHL/FedEx)</p>
                  </div>
                  <span className="text-xs font-black text-white">₹1,500 Flat Rate</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className={cardClass}>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Customer Store Reviews</h3>
            <div className="space-y-4 font-semibold">
              {reviews.map(r => (
                <div key={r.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white font-black">{r.buyerName}</span>
                    <span className="text-slate-500">{r.date}</span>
                  </div>
                  <div className="text-amber-400 text-xs">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                  <p className="text-xs text-slate-350 leading-relaxed font-medium">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Conversion Funnel Report</h3>
              <div className="space-y-4 text-xs font-bold">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Unique Visitors:</span>
                  <span className="text-white">1,825</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Product Views:</span>
                  <span className="text-white">942</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Add To Bags:</span>
                  <span className="text-white">324</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed Purchases:</span>
                  <span className="text-white">102</span>
                </div>
              </div>
            </div>
            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Category Sales Distribution</h3>
              <div className="space-y-4 text-xs font-bold">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Primary Category ({category}):</span>
                  <span className="text-white">74%</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Accessories:</span>
                  <span className="text-white">18%</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Promos:</span>
                  <span className="text-white">8%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className={cardClass}>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Configure Store Announcement & Slogans</h3>
            <form onSubmit={handleSettingsSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Announcement Bar Text</label>
                <input type="text" value={storeSettings.announcement} onChange={(e) => setStoreSettings({ ...storeSettings, announcement: e.target.value })} className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Shop Tagline Slogan</label>
                <input type="text" value={storeSettings.slogan} onChange={(e) => setStoreSettings({ ...storeSettings, slogan: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Support Email</label>
                  <input type="email" value={storeSettings.supportEmail} className={inputClass} disabled />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Tax VAT Rate</label>
                  <input type="text" value={storeSettings.taxRate} onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })} className={inputClass} />
                </div>
              </div>
              <button type="submit" className="px-4 py-2 rounded-xl text-xs font-black text-white uppercase tracking-wider hover:opacity-90 transition cursor-pointer" style={{ backgroundColor: primaryColor }}>
                Save Configurations
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
