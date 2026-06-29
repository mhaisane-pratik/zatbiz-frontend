'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { api } from '@/services/api';

interface MedicalShopAdminPanelProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  logoIcon: string;
  logoUrl: string;
}

export default function MedicalShopAdminPanel({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  logoIcon,
  logoUrl,
}: MedicalShopAdminPanelProps) {
  // Tabs
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'prescriptions' | 'orders' | 'customers' | 'coupons' | 'settings'>('dashboard');

  // API Data
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // CRUD Product Form States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState('');
  const [prodGeneric, setProdGeneric] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodUses, setProdUses] = useState('');
  const [prodDosage, setProdDosage] = useState('');
  const [prodIngredients, setProdIngredients] = useState('');
  const [prodSideEffects, setProdSideEffects] = useState('');
  const [prodWarnings, setProdWarnings] = useState('');
  const [prodStorage, setProdStorage] = useState('');
  const [prodExpiry, setProdExpiry] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDiscount, setProdDiscount] = useState('0');
  const [prodStockStatus, setProdStockStatus] = useState('In Stock');
  const [prodStockCount, setProdStockCount] = useState('100');
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [prodPrescReq, setProdPrescReq] = useState(false);
  const [prodCategory, setProdCategory] = useState('Medicines');

  // Coupon states
  const [coupons, setCoupons] = useState<any[]>([
    { id: 1, code: 'HEALTH10', discountType: 'percentage', discountValue: 10, minOrderAmount: 200, active: true },
    { id: 2, code: 'RXFREE', discountType: 'flat', discountValue: 50, minOrderAmount: 500, active: true }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState('10');

  // Settings states
  const [taxRate, setTaxRate] = useState(18);
  const [shippingFee, setShippingFee] = useState(40);
  const [settingsSaved, setSettingsSaved] = useState(false);

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

  // Handle direct product image upload and compress it via canvas
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('Image file is too large. Max allowed size is 10MB.', true);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setProdImageUrl(dataUrl);
          showToast('Product photo uploaded successfully!');
        }
      };
    };
  };

  // Fetch initial data
  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.medicalShop.get(projectId),
      api.medicalShop.products.list(projectId),
      api.medicalShop.orders.list(projectId)
    ])
      .then(([infoData, productsData, ordersData]) => {
        if (infoData) setInfo(infoData);
        if (productsData) setProducts(productsData);
        if (ordersData) setOrders(ordersData);
      })
      .catch((err) => {
        console.error('Error loading medical admin data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  // Handle open add modal
  const openAddModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdBrand('');
    setProdGeneric('');
    setProdDesc('');
    setProdUses('');
    setProdDosage('');
    setProdIngredients('');
    setProdSideEffects('');
    setProdWarnings('');
    setProdStorage('');
    setProdExpiry('Expiry: Dec 2028');
    setProdPrice('');
    setProdDiscount('0');
    setProdStockStatus('In Stock');
    setProdStockCount('100');
    setProdImageUrl('');
    setProdPrescReq(false);
    setProdCategory('Medicines');
    setIsProductModalOpen(true);
  };

  // Handle open edit modal
  const openEditModal = (prod: any) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdBrand(prod.brand);
    setProdGeneric(prod.genericName);
    setProdDesc(prod.description);
    setProdUses(prod.uses || '');
    setProdDosage(prod.dosage || '');
    setProdIngredients(prod.ingredients || '');
    setProdSideEffects(prod.sideEffects || '');
    setProdWarnings(prod.warnings || '');
    setProdStorage(prod.storageInstructions || '');
    setProdExpiry(prod.expiryInformation || '');
    setProdPrice(String(prod.price));
    setProdDiscount(String(prod.discount || 0));
    setProdStockStatus(prod.stockStatus || 'In Stock');
    setProdStockCount(String(prod.stockCount || 100));
    setProdImageUrl(prod.imageUrl || '');
    setProdPrescReq(!!prod.prescriptionRequired);
    setProdCategory(prod.category || 'Medicines');
    setIsProductModalOpen(true);
  };

  // Save/Update product handler
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice.trim()) return;

    const payload = {
      projectId,
      name: prodName.trim(),
      brand: prodBrand.trim() || 'Generic Brand',
      genericName: prodGeneric.trim() || 'Salt Compound',
      description: prodDesc.trim() || 'Authentic medicine dosage capsules.',
      uses: prodUses.trim() || 'As directed by physician.',
      dosage: prodDosage.trim() || 'Take daily after meals.',
      ingredients: prodIngredients.trim() || 'Active chemical agents.',
      sideEffects: prodSideEffects.trim() || 'Mild dry mouth.',
      warnings: prodWarnings.trim() || 'Consult doctor before use.',
      storageInstructions: prodStorage.trim() || 'Store in dry place.',
      expiryInformation: prodExpiry.trim(),
      price: parseFloat(prodPrice) || 0.0,
      discount: parseInt(prodDiscount, 10) || 0,
      stockStatus: prodStockStatus,
      category: prodCategory,
      stockCount: parseInt(prodStockCount, 10) || 10,
      rating: editingProduct ? editingProduct.rating : 4.5,
      imageUrl: prodImageUrl.trim() || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      prescriptionRequired: prodPrescReq
    };

    try {
      if (editingProduct) {
        // Update
        const updated = await api.medicalShop.products.update(editingProduct.id, { ...editingProduct, ...payload });
        setProducts(products.map(p => p.id === editingProduct.id ? updated : p));
        showToast('Medicine inventory updated successfully!');
      } else {
        // Create
        const created = await api.medicalShop.products.create(payload);
        setProducts([created, ...products]);
        showToast('New medicine added to stock catalog!');
      }
      setIsProductModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast('Error syncing product. Simulating in sandbox memory.', true);
      // Simulate locally
      if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, ...payload } : p));
      } else {
        setProducts([{ ...payload, id: Date.now() }, ...products]);
      }
      setIsProductModalOpen(false);
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to remove this medicine from inventory?')) return;
    try {
      await api.medicalShop.products.delete(id);
      setProducts(products.filter(p => p.id !== id));
      showToast('Medicine removed from database catalog.');
    } catch {
      setProducts(products.filter(p => p.id !== id));
      showToast('Medicine removed locally in sandbox simulation.');
    }
  };

  // Verify/Approve uploaded prescription
  const handleVerifyPrescription = async (orderId: number, verified: boolean) => {
    try {
      const updated = await api.medicalShop.orders.verifyPrescription(orderId, verified);
      setOrders(orders.map(o => o.id === orderId ? updated : o));
      showToast(verified ? 'Prescription Verified & Approved!' : 'Prescription Rejected.');
    } catch (err) {
      console.error(err);
      // Mock update
      setOrders(orders.map(o => o.id === orderId ? { 
        ...o, 
        pharmacistVerified: verified, 
        status: verified ? 'Prescription Verified' : 'Prescription Rejected' 
      } : o));
      showToast(`Simulated: Prescription ${verified ? 'Approved' : 'Rejected'}.`);
    }
  };

  // Advance delivery stepper status
  const handleAdvanceStatus = async (order: any) => {
    const statuses = ['Order Placed', 'Prescription Verified', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIdx = statuses.indexOf(order.status);
    if (currentIdx === -1 || currentIdx === statuses.length - 1) return; // already delivered or invalid

    const nextStatus = statuses[currentIdx + 1];

    try {
      const updated = await api.medicalShop.orders.updateStatus(order.id, nextStatus);
      setOrders(orders.map(o => o.id === order.id ? updated : o));
      showToast(`Order status advanced to: ${nextStatus}`);
    } catch (err) {
      console.error(err);
      // Mock update
      const mockUpdated = {
        ...order,
        status: nextStatus,
        pharmacistVerified: ['Prescription Verified', 'Packed', 'Shipped'].includes(nextStatus) ? true : order.pharmacistVerified
      };
      setOrders(orders.map(o => o.id === order.id ? mockUpdated : o));
      showToast(`Simulated: Advanced to ${nextStatus}.`);
    }
  };

  // Coupons creation
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const val = parseFloat(newCouponVal) || 10;
    const newCp = {
      id: Date.now(),
      code: newCouponCode.trim().toUpperCase(),
      discountType: 'percentage',
      discountValue: val,
      minOrderAmount: 200,
      active: true
    };
    setCoupons([...coupons, newCp]);
    setNewCouponCode('');
    showToast(`Coupon ${newCp.code} created!`);
  };

  const handleToggleCoupon = (id: number) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c));
    showToast('Coupon status updated.');
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    showToast('Dispensary tax rates and shipping rules synchronized.');
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  // Calculations for dashboard metrics
  const totalRevenue = orders
    .filter(o => o.status === 'Delivered')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingPrescriptionsCount = orders.filter(o => o.prescriptionUrl && !o.pharmacistVerified && !o.status.includes('Reject')).length;
  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered' && !o.status.includes('Reject')).length;

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800 font-sans text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl text-xs font-bold text-white shadow-2xl z-[100] animate-bounce flex items-center gap-2 ${
          toastError ? 'bg-rose-600' : 'bg-slate-900 border border-slate-750'
        }`}>
          <span>{toastError ? '⚠️' : '✓'}</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT ADMIN SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <span className="text-3xl text-emerald-500">{logoIcon || '💊'}</span>
            <div>
              <h2 className="text-sm font-black text-white tracking-tight leading-none truncate max-w-[150px]">
                {companyName || 'MedShop Rx'}
              </h2>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold block mt-1">Admin Panel</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-black">
            {[
              { id: 'dashboard', label: 'Dashboard Control', icon: '📊' },
              { id: 'products', label: 'Medicine Catalog', icon: '💊' },
              { id: 'prescriptions', label: 'Prescription Inbox', icon: '📄', badge: pendingPrescriptionsCount },
              { id: 'orders', label: 'Order Dispatch log', icon: '🚚', badge: activeOrdersCount },
              { id: 'customers', label: 'Patient Register', icon: '👥' },
              { id: 'coupons', label: 'Coupon Campaigns', icon: '🏷️' },
              { id: 'settings', label: 'Store Settings', icon: '⚙️' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition cursor-pointer ${
                  activeTab === link.id 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
                {!!link.badge && (
                  <span className="bg-rose-500 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-black text-white text-xs uppercase">
              AD
            </div>
            <div>
              <span className="block text-[10px] font-black text-white">Administrator</span>
              <span className="block text-[8px] text-slate-500 font-bold">admin@gmail.com</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition cursor-pointer"
            title="Log Out Admin"
          >
            🚪
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP STATUS BAR */}
        <header className="bg-white border-b border-slate-200 px-8 py-4.5 flex items-center justify-between shadow-sm z-10 shrink-0">
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight capitalize">
              {activeTab === 'dashboard' && 'Dashboard Overview & Analytics'}
              {activeTab === 'products' && 'Medicine Stock & Catalog Management'}
              {activeTab === 'prescriptions' && 'Pharmacist Prescription Inbox'}
              {activeTab === 'orders' && 'Order Shipments & Dispatch Pipeline'}
              {activeTab === 'customers' && 'Registered Patients list'}
              {activeTab === 'coupons' && 'Discount Coupon Campaigns'}
              {activeTab === 'settings' && 'Dispensary Settings'}
            </h2>
            <span className="block text-[9px] text-slate-400 font-bold mt-0.5">ZATBIZ pharmacy controller workspace</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <span>Server Link: <strong className="text-emerald-600">Active</strong></span>
            <span className="h-4 w-px bg-slate-200" />
            <button 
              onClick={loadData}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-[10px] text-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              🔄 Sync DB
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50">
          
          {/* TAB: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Counters Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Total Sales</span>
                    <span className="text-emerald-500">Delivered</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-mono">₹{totalRevenue.toFixed(2)}</h3>
                  <span className="block text-[9px] text-slate-400 font-bold">Sum of all successfully delivered orders</span>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Prescriptions checking</span>
                    <span className="text-amber-500 animate-pulse">Pending</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{pendingPrescriptionsCount} uploads</h3>
                  <span className="block text-[9px] text-slate-400 font-bold">Requires pharmacist document validation</span>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Active Orders</span>
                    <span className="text-blue-500">In Transit</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{activeOrdersCount} dispatches</h3>
                  <span className="block text-[9px] text-slate-400 font-bold">Orders being packaged or shipped</span>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Stock Catalog</span>
                    <span className="text-emerald-500">Available</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{products.length} medicines</h3>
                  <span className="block text-[9px] text-slate-400 font-bold">Items active in online store grid</span>
                </div>

              </div>

              {/* Graphical / Visual Telemetry row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visual Bar Chart */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4 lg:col-span-2 text-left">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">Monthly Medicine Sales Analytics</h4>
                  
                  {/* Faux graph columns */}
                  <div className="h-60 flex items-end justify-between gap-4 pt-4 px-2">
                    {[
                      { month: 'Jan', val: 'w-[40%]', height: 'h-[40%]', amt: '₹4K' },
                      { month: 'Feb', val: 'w-[55%]', height: 'h-[55%]', amt: '₹5.5K' },
                      { month: 'Mar', val: 'w-[75%]', height: 'h-[75%]', amt: '₹7.5K' },
                      { month: 'Apr', val: 'w-[60%]', height: 'h-[60%]', amt: '₹6K' },
                      { month: 'May', val: 'w-[85%]', height: 'h-[85%]', amt: '₹8.5K' },
                      { month: 'Jun', val: 'w-[95%]', height: 'h-[95%]', amt: '₹9.5K' }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                        <div className="text-[9px] font-black text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">{bar.amt}</div>
                        <div className={`w-full bg-emerald-500/20 group-hover:bg-emerald-500/35 border-t-4 border-emerald-600 rounded-t-xl transition-all duration-500 ${bar.height} flex items-end justify-center p-1`}>
                          <div className="w-full bg-emerald-600 rounded-t-lg h-3/4" />
                        </div>
                        <div className="text-[10px] font-black text-slate-500">{bar.month}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions panel */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4 text-left h-fit">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">Rapid Dispatch Commands</h4>
                  <div className="flex flex-col gap-3.5 pt-2">
                    <button 
                      onClick={openAddModal}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-2"
                    >
                      <span>➕</span> Add New Medicine
                    </button>
                    <button 
                      onClick={() => setActiveTab('prescriptions')}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-2"
                    >
                      <span>📄</span> View Prescriptions ({pendingPrescriptionsCount})
                    </button>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                    >
                      <span>🚚</span> Manage Dispatch Pipeline
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: PRODUCTS CATALOG CRUD */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              {/* Toolbar */}
              <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl flex items-center justify-between shadow-sm">
                <span className="text-xs font-bold text-slate-500">Catalog contains {products.length} registered medicines</span>
                <button
                  onClick={openAddModal}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <span>➕</span> Add Medicine
                </button>
              </div>

              {/* Table */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 font-black uppercase text-slate-400 text-[10px]">
                      <tr>
                        <th className="p-4 pl-6">Medicine Info</th>
                        <th className="p-4">Salt (Generic)</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price / Discount</th>
                        <th className="p-4">Stock status</th>
                        <th className="p-4">Rx Req.</th>
                        <th className="p-4 text-center pr-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-slate-50/50">
                          {/* Info */}
                          <td className="p-4 pl-6">
                            <div className="flex items-center gap-3">
                              <img src={prod.imageUrl} className="w-10 h-10 object-cover rounded-lg border border-slate-200" alt="" />
                              <div>
                                <span className="block font-black text-slate-850">{prod.name}</span>
                                <span className="block text-[9px] text-slate-400 font-extrabold uppercase">{prod.brand}</span>
                              </div>
                            </div>
                          </td>
                          
                          {/* Generic */}
                          <td className="p-4 font-mono text-[10px] text-slate-500">
                            {prod.genericName}
                          </td>

                          {/* Category */}
                          <td className="p-4">
                            <span className="bg-slate-100 border border-slate-200 text-slate-655 text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase">
                              {prod.category || 'General'}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="p-4 font-mono">
                            <div>₹{prod.price.toFixed(2)}</div>
                            {prod.discount > 0 && (
                              <span className="text-[8px] bg-emerald-50 border border-emerald-100 text-emerald-600 px-1 py-0.2 rounded font-black">
                                -{prod.discount}% Off
                              </span>
                            )}
                          </td>

                          {/* Stock */}
                          <td className="p-4">
                            <div className="flex flex-col gap-0.5">
                              <span className={`text-[10px] font-black uppercase ${prod.stockStatus === 'In Stock' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {prod.stockStatus}
                              </span>
                              <span className="text-[9px] text-slate-400 font-bold">{prod.stockCount || 0} left in boxes</span>
                            </div>
                          </td>

                          {/* Rx */}
                          <td className="p-4">
                            <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${
                              prod.prescriptionRequired 
                                ? 'bg-rose-50 border border-rose-100 text-rose-600' 
                                : 'bg-slate-100 border border-slate-250 text-slate-450'
                            }`}>
                              {prod.prescriptionRequired ? 'Required' : 'OTC'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-center pr-6">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openEditModal(prod)}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-[10px] rounded-lg font-black transition cursor-pointer"
                              >
                                Edit ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 text-[10px] rounded-lg font-black transition cursor-pointer"
                              >
                                Delete 🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB: PRESCRIPTION INBOX VERIFICATION */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                  <span>📄</span> Pharmacist Document Verification Queue
                </h3>

                {orders.filter(o => o.prescriptionUrl).length === 0 ? (
                  <div className="py-20 text-center text-slate-400 font-bold text-xs">
                    No prescriptions have been uploaded by customers yet.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {orders.filter(o => o.prescriptionUrl).map((order) => (
                      <div key={order.id} className="py-6 flex flex-col lg:flex-row gap-6 justify-between items-start first:pt-0 last:pb-0">
                        {/* Details */}
                        <div className="space-y-3.5 text-left max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900">Order #{order.id}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">• Patient: {order.customerName}</span>
                          </div>
                          
                          <div className="space-y-1.5 bg-slate-50 border border-slate-100 p-3 rounded-2xl text-[11px] font-semibold text-slate-655">
                            <p><strong>Doctor Notes:</strong> {order.doctorNotes || 'No notes added.'}</p>
                            <p><strong>Contact Email:</strong> {order.customerEmail}</p>
                            <p><strong>Contact Phone:</strong> {order.customerPhone}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[9px] text-slate-400 font-extrabold uppercase">Pharmacist Action Status:</span>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                              order.pharmacistVerified 
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                : order.status.includes('Reject')
                                  ? 'bg-rose-50 border-rose-100 text-rose-600'
                                  : 'bg-amber-50 border-amber-100 text-amber-600'
                            }`}>
                              {order.pharmacistVerified ? 'Approved' : order.status.includes('Reject') ? 'Rejected' : 'Pending Verification'}
                            </span>
                          </div>
                        </div>

                        {/* Prescription document preview */}
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <div className="w-40 aspect-square bg-slate-900 border border-slate-200 rounded-xl overflow-hidden shadow relative group cursor-pointer">
                            <img src={order.prescriptionUrl} className="w-full h-full object-cover group-hover:scale-105 transition" alt="Prescription Uploaded" />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-black transition">
                              Click to view large
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleVerifyPrescription(order.id, true)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-1"
                            >
                              <span>✓</span> Approve Rx
                            </button>
                            <button
                              onClick={() => handleVerifyPrescription(order.id, false)}
                              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-1"
                            >
                              <span>✕</span> Reject Rx
                            </button>
                            
                            {/* Large prescription view */}
                            <a 
                              href={order.prescriptionUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-[10px] font-black rounded-xl text-center transition"
                            >
                              View PDF / File 📁
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB: ORDER MANAGEMENT & DISPATCH */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                  <span>🚚</span> Shipping Dispatch & Tracking log
                </h3>

                {orders.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 font-bold text-xs">
                    No orders placed yet.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {orders.map((order, idx) => {
                      let items: any[] = [];
                      try { items = JSON.parse(order.itemsJson); } catch {}
                      return (
                        <div key={order.id || idx} className="py-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 first:pt-0 last:pb-0">
                          <div className="space-y-2 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-850">Order #{order.id}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">• Refill: {order.customerName}</span>
                            </div>
                            
                            {/* Address details */}
                            <p className="text-[10px] text-slate-400 font-bold">Ship Address: <strong>{order.shippingAddress}</strong></p>
                            <p className="text-[10px] text-slate-400 font-bold">Preferred Slot: <strong>{order.deliverySlot}</strong></p>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {items.map((item, itemIdx) => (
                                <span key={itemIdx} className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 text-[9px] font-bold text-slate-655 flex items-center gap-1">
                                  {item.image && <img src={item.image} className="w-3.5 h-3.5 object-cover rounded-full" alt="" />}
                                  <span>{item.name} (x{item.quantity})</span>
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 justify-between lg:justify-end w-full lg:w-auto">
                            <div className="text-left lg:text-right">
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

                            {order.status !== 'Delivered' && !order.status.includes('Reject') ? (
                              <button
                                onClick={() => handleAdvanceStatus(order)}
                                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black rounded-xl shadow transition cursor-pointer flex items-center gap-1"
                              >
                                <span>🛵</span> Advance Stepper ➔
                              </button>
                            ) : (
                              <button
                                disabled
                                className="px-4 py-2.5 bg-slate-200 text-slate-400 text-[10px] font-black rounded-xl cursor-not-allowed"
                              >
                                Stage Complete ✓
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB: CUSTOMER MANAGEMENT */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">Registered Patients Registry</h3>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {[
                    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', address: 'Noida Sector 62', ordersCount: 1, points: 450 },
                    { id: 2, name: 'Mary Smith', email: 'mary@example.com', phone: '+91 99999 77777', address: 'Noida Sector 137', ordersCount: 1, points: 200 }
                  ].map((cust) => (
                    <div key={cust.id} className="py-4 flex items-center justify-between gap-6 first:pt-0 last:pb-0">
                      <div>
                        <h4 className="font-extrabold text-slate-850 text-xs">{cust.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{cust.email} • {cust.phone}</span>
                        <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Address: {cust.address}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-500 font-black">{cust.ordersCount} Refills</span>
                        <span className="block text-[10px] text-emerald-600 font-black mt-1">{cust.points} Points</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: COUPON CAMPAIGNS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              
              {/* Create coupon form */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">Launch New Coupon Campaign</h3>
                
                <form onSubmit={handleCreateCoupon} className="flex flex-col sm:flex-row gap-3 items-end">
                  <div className="space-y-1.5 flex-1 w-full text-left">
                    <label className="text-[10px] font-black text-slate-700 uppercase">Coupon Code</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. LIFESAVE"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs outline-none uppercase"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1 w-full text-left">
                    <label className="text-[10px] font-black text-slate-700 uppercase">Discount Percentage (%)</label>
                    <input
                      required
                      type="number"
                      placeholder="15"
                      value={newCouponVal}
                      onChange={(e) => setNewCouponVal(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow transition cursor-pointer whitespace-nowrap"
                  >
                    Create Campaign
                  </button>
                </form>
              </div>

              {/* Coupons list */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">Active Coupon Codes</h4>
                
                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {coupons.map((c) => (
                    <div key={c.id} className="py-3 flex items-center justify-between gap-6">
                      <div>
                        <span className="font-extrabold text-slate-800 bg-slate-100 px-2 py-0.5 rounded font-mono uppercase border border-slate-200">{c.code}</span>
                        <span className="text-[10px] text-slate-400 font-bold ml-2">
                          Save {c.discountValue}% on orders above ₹{c.minOrderAmount}
                        </span>
                      </div>
                      <button
                        onClick={() => handleToggleCoupon(c.id)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition cursor-pointer border ${
                          c.active 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                            : 'bg-slate-100 border-slate-200 text-slate-450'
                        }`}
                      >
                        {c.active ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: STORE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left space-y-6">
                <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">Dispensary Logistics & Tax Rates</h3>

                <div className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-black text-slate-700 block">Default GST Tax Rate (%)</label>
                    <input
                      required
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-black text-slate-700 block">Base Delivery Fee (₹)</label>
                    <input
                      required
                      type="number"
                      value={shippingFee}
                      onChange={(e) => setShippingFee(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs outline-none"
                    />
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-[10px] font-semibold text-slate-500">
                    💡 Tax rates are applied dynamically on checkout totals. base delivery fee is waived for orders exceeding ₹500.
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                  {settingsSaved && (
                    <span className="text-xs text-emerald-600 font-extrabold">✓ Settings synced successfully</span>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow transition cursor-pointer ml-auto"
                  >
                    Save Config Rules
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>

      </main>

      {/* MODAL: ADD/EDIT PRODUCT DIALOG */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative text-slate-800 animate-scale-up">
            
            {/* Close */}
            <button 
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold transition cursor-pointer z-10"
            >
              ✕
            </button>

            {/* Header */}
            <div className="p-6 border-b border-slate-100 text-left bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-900">
                {editingProduct ? 'Edit Medicine specifications' : 'Add New Medicine to Stock'}
              </h3>
              <p className="text-[10px] text-slate-450 font-bold">Configure salts, classifications, price discount margins.</p>
            </div>

            {/* Form scrollable */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left col-span-2">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Medicine / Product Name *</label>
                  <input
                    required
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. Paracetamol 650mg"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Brand / Manufacturer</label>
                  <input
                    type="text"
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    placeholder="e.g. Calpol"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Generic Salt Name</label>
                  <input
                    type="text"
                    value={prodGeneric}
                    onChange={(e) => setProdGeneric(e.target.value)}
                    placeholder="e.g. Paracetamol"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left col-span-2">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Describe therapeutic effects, packaging..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none resize-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Uses / Indications</label>
                  <input
                    type="text"
                    value={prodUses}
                    onChange={(e) => setProdUses(e.target.value)}
                    placeholder="Fever, pain relief"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Dosage timings</label>
                  <input
                    type="text"
                    value={prodDosage}
                    onChange={(e) => setProdDosage(e.target.value)}
                    placeholder="1 tablet twice daily"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Ingredients composition</label>
                  <input
                    type="text"
                    value={prodIngredients}
                    onChange={(e) => setProdIngredients(e.target.value)}
                    placeholder="Paracetamol 650mg"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Side Effects warning</label>
                  <input
                    type="text"
                    value={prodSideEffects}
                    onChange={(e) => setProdSideEffects(e.target.value)}
                    placeholder="Mild drowsiness"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left col-span-2">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Contraindications / warnings</label>
                  <input
                    type="text"
                    value={prodWarnings}
                    onChange={(e) => setProdWarnings(e.target.value)}
                    placeholder="Do not take with alcohol."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Storage Instructions</label>
                  <input
                    type="text"
                    value={prodStorage}
                    onChange={(e) => setProdStorage(e.target.value)}
                    placeholder="Store below 30°C"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Expiry Information</label>
                  <input
                    type="text"
                    value={prodExpiry}
                    onChange={(e) => setProdExpiry(e.target.value)}
                    placeholder="Expiry: Dec 2028"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Price (INR ₹) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="120"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Discount (%)</label>
                  <input
                    type="number"
                    value={prodDiscount}
                    onChange={(e) => setProdDiscount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Inventory Status</label>
                  <select
                    value={prodStockStatus}
                    onChange={(e) => setProdStockStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Initial Box Count</label>
                  <input
                    type="number"
                    value={prodStockCount}
                    onChange={(e) => setProdStockCount(e.target.value)}
                    placeholder="100"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1 text-left col-span-2">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Category Niche *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none font-bold"
                  >
                    {['Medicines', 'Healthcare', 'Personal Care', 'Baby Care', 'Diabetes Care', 'Fitness', 'Ayurvedic', 'Medical Devices', 'Vitamins', 'Surgical Products'].map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 text-left col-span-2">
                  <label className="text-[10px] font-black text-slate-700 uppercase">Product Image</label>
                  
                  {prodImageUrl ? (
                    <div className="flex items-center gap-4 p-3 border border-slate-200 rounded-2xl bg-slate-50">
                      <img src={prodImageUrl} className="w-16 h-16 object-cover rounded-xl border border-slate-350" alt="Preview" />
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Image Preview Active</span>
                        <button
                          type="button"
                          onClick={() => setProdImageUrl('')}
                          className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 text-[10px] rounded-lg font-black transition cursor-pointer"
                        >
                          Clear / Upload Another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Direct upload */}
                      <label className="border-2 border-dashed border-slate-250 hover:border-emerald-500 rounded-2xl p-5 text-center bg-slate-50 hover:bg-emerald-50/20 cursor-pointer transition flex flex-col items-center justify-center gap-1">
                        <span className="text-xl">📷</span>
                        <span className="text-[10px] font-black text-slate-750">Upload from Device</span>
                        <span className="text-[8px] text-slate-450 font-bold">JPEG, PNG up to 10MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      
                      {/* Paste URL option */}
                      <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col justify-center gap-2">
                        <span className="text-[10px] font-black text-slate-750 uppercase block">Or Paste Image URL</span>
                        <input
                          type="text"
                          value={prodImageUrl}
                          onChange={(e) => setProdImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/photo..."
                          className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Prescription Checkbox */}
                <label className="col-span-2 flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={prodPrescReq}
                    onChange={(e) => setProdPrescReq(e.target.checked)}
                    className="w-4.5 h-4.5 rounded accent-emerald-600"
                  />
                  <span>This medicine requires pharmacist doctor prescription verification (Rx)</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition text-center cursor-pointer mt-4"
              >
                {editingProduct ? 'Save medicine alterations' : 'Dispensary seed new stock medicine'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
