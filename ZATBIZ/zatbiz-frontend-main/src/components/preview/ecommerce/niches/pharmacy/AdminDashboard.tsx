'use client';
import React, { useState } from 'react';

export default function AdminDashboard({ projectId, projectConfig, onLogout, setActiveView, addToast }: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const primaryColor = projectConfig?.themeColor || '#059669';
  const logoIcon = projectConfig?.logoIcon || '🩺';

  const category = 'pharmacy';
  const isLight = projectConfig?.selectedThemeData?.bgColor === '#ffffff';

  // Stats
  const [stats] = useState({
    revenue: '₹1,42,850',
    sales: '324',
    customers: '194',
    lowStock: '4'
  });

  // Products
  const [products, setProducts] = useState([
    { id: 'PROD-001', name: 'Niche Curated Item Alpha', sku: 'NCH-ALP-01', price: 2999, stock: 18, category: 'Best Sellers' },
    { id: 'PROD-002', name: 'Premium Quality Item Beta', sku: 'NCH-BET-02', price: 4500, stock: 3, category: 'New Arrivals' },
    { id: 'PROD-003', name: 'Exclusive Designer Selection', sku: 'NCH-DSG-03', price: 1200, stock: 45, category: 'Limited Edition' },
    { id: 'PROD-004', name: 'Essential Everyday Item', sku: 'NCH-ESS-04', price: 899, stock: 0, category: 'Essentials' }
  ]);

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Best Sellers');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice || !newProductStock) {
      if (typeof addToast === 'function') addToast('Please fill all fields', true);
      return;
    }
    const newProduct = {
      id: 'PROD-' + Math.floor(100 + Math.random() * 900),
      name: newProductName,
      sku: 'NCH-NEW-' + Math.floor(10 + Math.random() * 90),
      price: parseFloat(newProductPrice),
      stock: parseInt(newProductStock),
      category: newProductCategory
    };
    setProducts(prev => [newProduct, ...prev]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductStock('');
    if (typeof addToast === 'function') addToast('Product added to inventory catalog!');
  };

  const handleDeleteProduct = (sku: string) => {
    setProducts(prev => prev.filter(p => p.sku !== sku));
    if (typeof addToast === 'function') addToast('Product deleted successfully.');
  };

  // Orders
  const [merchantOrders, setMerchantOrders] = useState([
    { id: 'ORD-9041', customer: 'Aarav Mehta', date: '2026-07-06', items: '2x Premium Items', total: '₹4,999', status: 'Pending', method: 'Razorpay' },
    { id: 'ORD-8712', customer: 'Priya Sharma', date: '2026-07-04', items: '3x Curated Goods', total: '₹12,450', status: 'Fulfilled', method: 'Stripe' },
    { id: 'ORD-6105', customer: 'Rohan Gupta', date: '2026-06-30', items: '1x Specialty Item', total: '₹2,300', status: 'Unfulfilled', method: 'COD' }
  ]);

  const handleToggleFulfillment = (orderId: string) => {
    setMerchantOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const nextStatus = order.status === 'Fulfilled' ? 'Unfulfilled' : 'Fulfilled';
        if (typeof addToast === 'function') addToast(`Order #${orderId} marked as ${nextStatus}!`);
        return { ...order, status: nextStatus };
      }
      return order;
    }));
  };

  // Coupons
  const [coupons, setCoupons] = useState([
    { code: 'WELCOME10', discount: '10%', type: 'Percentage', status: 'Active' },
    { code: 'SUPER500', discount: '₹500', type: 'Flat Amount', status: 'Active' },
    { code: 'EXPIRED20', discount: '20%', type: 'Percentage', status: 'Expired' }
  ]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponDiscount) return;
    const code = newCouponCode.toUpperCase();
    const discount = newCouponDiscount;
    setCoupons(prev => [...prev, { code, discount, type: 'Percentage', status: 'Active' }]);
    setNewCouponCode('');
    setNewCouponDiscount('');
    if (typeof addToast === 'function') addToast('Promo coupon code generated!');
  };

  // Settings
  const [storeSettings, setStoreSettings] = useState({
    announcement: '✨ FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹1,500! ✨',
    slogan: 'Curated premium quality niche products.',
    supportEmail: `support@${category}.zatbiz.com`,
    taxRate: '18%'
  });

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof addToast === 'function') addToast('Store settings updated successfully.');
  };

  const cardClass = `rounded-2xl p-6 border transition duration-300 ${isLight ? 'bg-white border-slate-200 shadow-sm text-slate-800' : 'bg-slate-900 border-white/5 text-white shadow-lg'}`;
  const inputClass = `w-full px-3 py-2 rounded-xl text-xs focus:outline-none border transition ${isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-slate-400' : 'bg-white/5 border-white/10 text-white focus:border-indigo-500'}`;

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-mono ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-955 text-white'}`}>
      {/* Sidebar navigation */}
      <aside className={`w-64 p-5 border-r shrink-0 flex flex-col ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-white/5'}`}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <span className="text-2xl p-1 bg-white/5 border border-white/10 rounded-lg">{logoIcon}</span>
          <div>
            <h2 className="text-xs font-black uppercase tracking-tight">Admin Console</h2>
            <p className="text-[9px] text-slate-500 font-bold">Store ID: #{projectId}</p>
          </div>
        </div>

        <nav className="space-y-1 flex-grow">
          {[
            { id: 'overview', label: '📊 Analytics' },
            { id: 'inventory', label: '🛍️ Products catalog' },
            { id: 'orders', label: '📦 Orders manager' },
            { id: 'coupons', label: '🎟️ Promo coupons' },
            { id: 'settings', label: '⚙️ Store settings' },
            { id: 'shipping', label: '🚚 Shipping setup' }
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
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Add Product to Catalog</h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Product Name</label>
                  <input type="text" placeholder="Organic Kibble Feed" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Price (₹)</label>
                  <input type="number" placeholder="1850" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Stock Count</label>
                  <input type="number" placeholder="25" value={newProductStock} onChange={(e) => setNewProductStock(e.target.value)} className={inputClass} />
                </div>
                <button type="submit" className="py-2.5 text-xs font-black text-white uppercase tracking-wider rounded-xl hover:opacity-90 transition cursor-pointer" style={{ backgroundColor: primaryColor }}>
                  Add Product
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
                    {products.map(p => (
                      <tr key={p.sku} className="hover:bg-white/[0.01]">
                        <td className="py-3 text-indigo-400">{p.sku}</td>
                        <td className="py-3 text-white">{p.name}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${p.stock === 0 ? 'bg-rose-500/10 text-rose-400' : 'bg-green-500/10 text-green-400'}`}>
                            {p.stock === 0 ? 'Out of Stock' : `${p.stock} units`}
                          </span>
                        </td>
                        <td className="py-3 text-white">₹{p.price}</td>
                        <td className="py-3">
                          <button onClick={() => handleDeleteProduct(p.sku)} className="text-xs text-rose-450 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  {merchantOrders.map(order => (
                    <tr key={order.id} className="hover:bg-white/[0.01]">
                      <td className="py-3.5 text-white">#{order.id}</td>
                      <td className="py-3.5">{order.customer}</td>
                      <td className="py-3.5">{order.items}</td>
                      <td className="py-3.5 text-indigo-400">{order.method}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${order.status === 'Fulfilled' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <button onClick={() => handleToggleFulfillment(order.id)} className="text-xs text-indigo-400 hover:underline">
                          {order.status === 'Fulfilled' ? 'Unfulfill' : 'Fulfill Order'}
                        </button>
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
                    <th className="pb-3">Fulfillment Zone</th>
                    <th className="pb-3">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-350">
                  {coupons.map(c => (
                    <tr key={c.code} className="hover:bg-white/[0.01]">
                      <td className="py-3 text-white font-black">{c.code}</td>
                      <td className="py-3">{c.discount}</td>
                      <td className="py-3">All Zones</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${c.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      </main>
    </div>
  );
}
