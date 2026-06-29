'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, getRandomFoodImage } from '@/services/api';
import { Product, Order } from '@/types';
import { useFileEncoder } from '@/hooks/useFileEncoder';

// ==========================================
// 1. AdminOverviewPanel
// ==========================================
interface AdminOverviewPanelProps {
  orders: any[];
  products: Product[];
  couponsList: any[];
  theme: any;
  setActiveTab: (t: string) => void;
  isRestaurant: boolean;
}

export function AdminOverviewPanel({
  orders,
  products,
  couponsList,
  theme,
  setActiveTab,
  isRestaurant,
}: AdminOverviewPanelProps) {
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled' && o.status !== 'Returned')
    .reduce((sum, o) => sum + parseFloat(o.amount || '0'), 0);
  const totalProducts = products.length;
  const lowStockAlerts = products.filter((p) => (p.stock !== undefined ? p.stock : 0) <= 5).length;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800 text-left">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Revenue</p>
            <h3 className="text-xl font-extrabold text-slate-900">₹{totalRevenue.toLocaleString()}</h3>
            <span className="text-[9px] text-emerald-600 font-bold">▲ Live Database Synced</span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg">💰</div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Orders</p>
            <h3 className="text-xl font-extrabold text-slate-900">{totalOrders}</h3>
            <span className="text-[9px] text-slate-405 font-bold">Completed & Processing</span>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg">📦</div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Products</p>
            <h3 className="text-xl font-extrabold text-slate-900">{totalProducts}</h3>
            <span className="text-[9px] text-indigo-600 font-bold">Catalog Items Live</span>
          </div>
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-lg">👕</div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Low Stock Alerts</p>
            <h3 className={`text-xl font-extrabold ${lowStockAlerts > 0 ? 'text-rose-600' : 'text-slate-900'}`}>{lowStockAlerts}</h3>
            <span className="text-[9px] text-slate-405 font-bold">Needs restock soon</span>
          </div>
          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-lg">⚠️</div>
        </div>
      </div>

      {/* Growth & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Simulation */}
        <div className="lg:col-span-2 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 uppercase">Sales Performance Summary</h4>
            <span className="text-[9px] font-extrabold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Weekly View</span>
          </div>
          <div className="h-44 flex items-end justify-between gap-2 pt-4">
            {[60, 45, 80, 55, 90, 70, 100].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-slate-50 rounded-t-lg h-32 flex items-end">
                  <div
                    style={{ height: `${val}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-indigo-550 to-indigo-650 transition-all"
                  />
                </div>
                <span className="text-[8px] font-bold text-slate-400">Day {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 uppercase pb-2 border-b border-slate-100">Store Performance</h4>
          <div className="space-y-3 pt-2">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Average Order Value</span>
              <span className="font-bold">₹{totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Active Coupons</span>
              <span className="font-bold text-emerald-600">{couponsList.filter(c => c.active).length}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Low Stock Items</span>
              <span className={`font-bold ${lowStockAlerts > 0 ? 'text-rose-600 animate-pulse' : ''}`}>{lowStockAlerts}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Synced Gateway</span>
              <span className="font-bold text-indigo-600">UPI, Card, COD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-slate-900 uppercase">Recent Orders</h4>
          <button onClick={() => setActiveTab('orders')} className="text-[9px] font-bold text-indigo-650 hover:underline border-0 bg-transparent cursor-pointer">
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-405 uppercase">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-slate-405">No orders recorded yet.</td>
                </tr>
              ) : (
                recentOrders.map((o) => (
                  <tr key={o.id} className="text-[11px]">
                    <td className="py-3 font-mono font-bold text-slate-500">#{o.id}</td>
                    <td className="py-3 font-semibold text-slate-805">{o.customer}</td>
                    <td className="py-3 text-slate-450">{o.date}</td>
                    <td className="py-3 font-bold">₹{parseFloat(o.amount).toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : o.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-700'
                          : o.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. AdminProductsPanel
// ==========================================
interface AdminProductsPanelProps {
  projectId: number;
  products: Product[];
  categoriesList: any[];
  brandsList: any[];
  fetchDbProducts: () => void;
  isRestaurant: boolean;
  shopNiche: string | null;
}

export function AdminProductsPanel({
  projectId,
  products,
  categoriesList,
  brandsList,
  fetchDbProducts,
  isRestaurant,
  shopNiche,
}: AdminProductsPanelProps) {
  const { encodeFile } = useFileEncoder();

  // Create Product Form States
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemImage, setNewItemImage] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemBrand, setNewItemBrand] = useState('');
  const [newItemColor, setNewItemColor] = useState('');
  const [newItemRating, setNewItemRating] = useState(5.0);
  const [newItemStock, setNewItemStock] = useState(10);
  const [newItemDiscount, setNewItemDiscount] = useState(0);

  const [editingProd, setEditingProd] = useState<Product | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await encodeFile(file);
        setNewItemImage(base64);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    
    const newProductData: any = {
      projectId,
      name: newItemName,
      description: newItemDescription,
      price: parseFloat(newItemPrice),
      category: newItemCategory || 'General',
      imageUrl: newItemImage || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      stock: newItemStock,
      available: newItemStock > 0,
      brand: newItemBrand,
      color: newItemColor,
      rating: newItemRating,
      discount: newItemDiscount
    };

    try {
      if (editingProd && editingProd.id !== undefined) {
        await api.products.update(editingProd.id, { ...editingProd, ...newProductData, id: editingProd.id });
        alert('Product updated successfully!');
      } else {
        await api.products.create(newProductData);
        alert('Product published successfully!');
      }
      
      setNewItemName('');
      setNewItemPrice('');
      setNewItemCategory('');
      setNewItemImage('');
      setNewItemDescription('');
      setNewItemBrand('');
      setNewItemColor('');
      setNewItemRating(5.0);
      setNewItemStock(10);
      setNewItemDiscount(0);
      setEditingProd(null);
      
      fetchDbProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to publish product.');
    }
  };

  const handleEditProductClick = (prod: Product) => {
    setEditingProd(prod);
    setNewItemName(prod.name || '');
    setNewItemPrice(String(prod.price || ''));
    setNewItemCategory(prod.category || '');
    setNewItemImage(prod.imageUrl || '');
    setNewItemDescription(prod.description || '');
    setNewItemBrand(prod.brand || '');
    setNewItemColor(prod.color || '');
    setNewItemRating(prod.rating || 5.0);
    setNewItemStock(prod.stock || 10);
    setNewItemDiscount(prod.discount || 0);
  };

  const handleDeleteProductClick = async (prodId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.products.delete(prodId);
      fetchDbProducts();
      alert('Product deleted.');
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800 text-left">
      {/* Create/Edit Product Form */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold text-slate-900 uppercase mb-4">
          {editingProd ? 'Edit Product Item' : 'Add New E-Commerce Product'}
        </h3>
        <form onSubmit={handleCreateProductSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Product Name</label>
              <input
                type="text"
                required
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="e.g. Slim Fit Denim Shirt"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Price (₹)</label>
              <input
                type="number"
                required
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="e.g. 1299"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Discount (%)</label>
              <input
                type="number"
                value={newItemDiscount}
                onChange={(e) => setNewItemDiscount(parseInt(e.target.value) || 0)}
                placeholder="e.g. 10"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Category</label>
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-655 transition"
              >
                <option value="">Select Category</option>
                {categoriesList.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
                <option value="Shirt">Shirt</option>
                <option value="Pants">Pants</option>
                <option value="Footwear">Footwear</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Brand</label>
              <select
                value={newItemBrand}
                onChange={(e) => setNewItemBrand(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-655 transition"
              >
                <option value="">Select Brand</option>
                {brandsList.map((b) => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Color Options</label>
              <input
                type="text"
                value={newItemColor}
                onChange={(e) => setNewItemColor(e.target.value)}
                placeholder="e.g. Black, Blue, White"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Warehouse Stock</label>
              <input
                type="number"
                value={newItemStock}
                onChange={(e) => setNewItemStock(parseInt(e.target.value) || 0)}
                placeholder="e.g. 50"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Rating (1-5)</label>
              <input
                type="number"
                step="0.1"
                value={newItemRating}
                onChange={(e) => setNewItemRating(parseFloat(e.target.value) || 5.0)}
                placeholder="e.g. 4.5"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Product Image</label>
              <div className="space-y-2">
                {newItemImage ? (
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-100 bg-white flex items-center justify-center shrink-0">
                      <img src={newItemImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {newItemImage.startsWith('data:') ? 'Local Image Selected' : newItemImage}
                      </p>
                      <button
                        type="button"
                        onClick={() => setNewItemImage('')}
                        className="text-[10px] text-rose-500 hover:text-rose-600 font-bold mt-0.5 transition cursor-pointer"
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-xl p-3 bg-slate-50 hover:bg-slate-100/50 hover:border-slate-400 cursor-pointer transition text-center min-h-[64px]">
                    <svg className="w-4 h-4 text-slate-400 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] font-semibold text-slate-500">Choose Image File</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                )}
                <input
                  type="text"
                  value={newItemImage?.startsWith('data:') ? '' : newItemImage}
                  onChange={(e) => setNewItemImage(e.target.value)}
                  placeholder="Or paste image URL..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {editingProd && (
              <button
                type="button"
                onClick={() => {
                  setEditingProd(null);
                  setNewItemName('');
                  setNewItemPrice('');
                  setNewItemCategory('');
                  setNewItemImage('');
                  setNewItemDescription('');
                  setNewItemBrand('');
                  setNewItemColor('');
                  setNewItemRating(5.0);
                  setNewItemStock(10);
                  setNewItemDiscount(0);
                }}
                className="px-5 py-2 border border-slate-250 hover:bg-slate-50 text-[11px] font-bold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded-xl transition shadow-md cursor-pointer"
            >
              {editingProd ? 'Save Changes' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>

      {/* Products List Registry */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold text-slate-900 uppercase mb-4">Products Registry</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-450 uppercase">
                <th className="pb-3 w-16">Image</th>
                <th className="pb-3">Product Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Brand</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-slate-405">No products registered yet. Add one above.</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="text-[11px]">
                    <td className="py-2.5">
                      <img
                        src={p.imageUrl || '/images/login_illustration.png'}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-100"
                        alt="product"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/login_illustration.png';
                        }}
                      />
                    </td>
                    <td className="py-2.5 font-bold text-slate-805">
                      {p.name}
                      {p.discount !== undefined && p.discount > 0 && (
                        <span className="ml-1.5 px-1.5 py-0.5 bg-rose-50 text-rose-700 text-[8px] font-black rounded-full">
                          {p.discount}% OFF
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-slate-500 font-medium">{p.category}</td>
                    <td className="py-2.5 text-slate-500 font-medium">{p.brand || 'None'}</td>
                    <td className="py-2.5 font-bold">₹{p.price}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                        (p.stock || 0) <= 5 ? 'bg-rose-50 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-606'
                      }`}>
                        {p.stock !== undefined ? p.stock : 0} items
                      </span>
                    </td>
                    <td className="py-2.5 text-right space-x-2">
                      <button
                        onClick={() => handleEditProductClick(p)}
                        className="text-[10px] font-bold text-indigo-650 hover:underline cursor-pointer border-0 bg-transparent"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => p.id !== undefined && handleDeleteProductClick(p.id)}
                        className="text-[10px] font-bold text-rose-655 hover:underline cursor-pointer border-0 bg-transparent"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal (moved from parent component) */}
      {editingProd && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[99] p-6">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl border border-slate-200 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase">Edit Product Detail</h3>
              <button onClick={() => setEditingProd(null)} className="text-slate-400 hover:text-slate-700 font-bold border-none bg-transparent cursor-pointer">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Product Name</label>
                <input
                  type="text"
                  value={editingProd.name}
                  onChange={(e) => setEditingProd({ ...editingProd, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-505 mb-1">
                    Price ({shopNiche === 'cloth' || (shopNiche && (shopNiche.startsWith('fashion') || shopNiche.startsWith('grocery') || shopNiche.startsWith('electronics'))) ? '₹' : '$'})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProd.price}
                    onChange={(e) => setEditingProd({ ...editingProd, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-505 mb-1">Stock</label>
                  <input
                    type="number"
                    value={editingProd.stock}
                    onChange={(e) => setEditingProd({ ...editingProd, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-505 mb-1">Category</label>
                <input
                  type="text"
                  value={editingProd.category}
                  onChange={(e) => setEditingProd({ ...editingProd, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:bg-white"
                />
              </div>
              {isRestaurant && (
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 p-2.5 rounded-lg shadow-inner">
                    <input
                      type="checkbox"
                      checked={editingProd.available !== false}
                      onChange={(e) => setEditingProd({ ...editingProd, available: e.target.checked })}
                      className="rounded border-slate-300 text-indigo-606 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-705 font-bold uppercase tracking-wider">Available for Ordering</span>
                  </label>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 mt-4">
                <button onClick={() => setEditingProd(null)} className="px-3.5 py-2 border border-slate-200 text-slate-700 rounded-xl text-[11px] font-bold hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await api.products.update(editingProd.id!, editingProd);
                      fetchDbProducts();
                      setEditingProd(null);
                      alert('Product updated successfully!');
                    } catch (err) {
                      console.error(err);
                      alert('Failed to update product.');
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[11px] font-bold hover:bg-indigo-700 shadow cursor-pointer border-none"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. AdminCategoriesBrandsPanel
// ==========================================
interface AdminCategoriesBrandsPanelProps {
  projectId: number;
  categoriesList: any[];
  brandsList: any[];
  setCategoriesList: (l: any[]) => void;
  setBrandsList: (l: any[]) => void;
}

export function AdminCategoriesBrandsPanel({
  projectId,
  categoriesList,
  brandsList,
  setCategoriesList,
  setBrandsList,
}: AdminCategoriesBrandsPanelProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newBrandName, setNewBrandName] = useState('');

  const handleCreateCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      await api.categories.create({ projectId, name: newCategoryName.trim() });
      setNewCategoryName('');
      api.categories.list(projectId).then((data) => setCategoriesList(data));
      alert('Category added successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    try {
      await api.brands.create({ projectId, name: newBrandName.trim() });
      setNewBrandName('');
      api.brands.list(projectId).then((data) => setBrandsList(data));
      alert('Brand added successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategoryClick = async (id: number) => {
    if (!confirm('Delete this category tag?')) return;
    try {
      await api.categories.delete(id);
      api.categories.list(projectId).then((data) => setCategoriesList(data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBrandClick = async (id: number) => {
    if (!confirm('Delete this brand tag?')) return;
    try {
      await api.brands.delete(id);
      api.brands.list(projectId).then((data) => setBrandsList(data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-xs text-slate-800 text-left">
      {/* Categories registry */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-905 uppercase">Categories Registry</h3>
        <form onSubmit={handleCreateCategorySubmit} className="flex gap-2">
          <input
            type="text"
            required
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="e.g. Formal Shirts / Winter Wear"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition cursor-pointer border-none"
          >
            Add Category
          </button>
        </form>

        <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
          {categoriesList.length === 0 ? (
            <p className="text-slate-405 text-center py-4">No categories registered yet.</p>
          ) : (
            categoriesList.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2.5">
                <span className="font-semibold text-slate-705">🏷️ {c.name}</span>
                <button
                  onClick={() => handleDeleteCategoryClick(c.id)}
                  className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer border-none bg-transparent"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Brands registry */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-905 uppercase">Brands Registry</h3>
        <form onSubmit={handleCreateBrandSubmit} className="flex gap-2">
          <input
            type="text"
            required
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
            placeholder="e.g. Allen Solly / Raymond"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition cursor-pointer border-none"
          >
            Add Brand
          </button>
        </form>

        <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
          {brandsList.length === 0 ? (
            <p className="text-slate-405 text-center py-4">No brands registered yet.</p>
          ) : (
            brandsList.map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2.5">
                <span className="font-semibold text-slate-750">👔 {b.name}</span>
                <button
                  onClick={() => handleDeleteBrandClick(b.id)}
                  className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer border-none bg-transparent"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. AdminOrdersPanel
// ==========================================
interface AdminOrdersPanelProps {
  orders: any[];
  fetchOrders: () => void;
}

export function AdminOrdersPanel({ orders, fetchOrders }: AdminOrdersPanelProps) {
  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    try {
      await api.orders.updateStatus(orderId, status);
      fetchOrders();
      alert(`Order status updated to ${status}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800 text-left">
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase">Incoming Customer Orders</h3>
          <span className="text-[10px] bg-indigo-555 px-2.5 py-1 text-indigo-700 font-extrabold rounded-lg">
            {orders.length} total orders
          </span>
        </div>

        <div className="divide-y divide-slate-100 space-y-6 pt-2">
          {orders.length === 0 ? (
            <p className="text-center text-slate-405 py-6">No e-commerce orders received yet.</p>
          ) : (
            orders.map((o) => {
              let itemsList = [];
              try {
                itemsList = JSON.parse(o.itemsJson || '[]');
              } catch (e) {
                console.error(e);
              }

              return (
                <div key={o.id} className="pt-4 first:pt-0 flex flex-col md:flex-row gap-6 justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-black text-slate-900 text-sm">Order #{o.id}</span>
                      <span className="text-[10px] text-slate-400">({o.date})</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : o.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-700'
                          : o.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {o.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <p className="text-[9px] font-extrabold text-slate-400 uppercase">Customer Information</p>
                        <p className="font-bold text-slate-905 mt-0.5">{o.customerName || 'Guest Customer'}</p>
                        <p className="text-slate-500">{o.customerEmail}</p>
                        <p className="text-slate-505 font-mono">{o.customerPhone || 'No phone'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-extrabold text-slate-400 uppercase">Shipping Address</p>
                        <p className="text-slate-805 mt-0.5 font-semibold">{o.customerAddress || 'No Address'}</p>
                        {(o.city || o.state || o.pincode) && (
                          <p className="text-slate-500 font-medium">{[o.city, o.state, o.pincode].filter(Boolean).join(', ')}</p>
                        )}
                        <p className="text-indigo-650 font-bold text-[9px] uppercase mt-1">Payment Method: {o.paymentMethod || 'Credit Card'}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] font-extrabold text-slate-450 uppercase mb-1.5">Order Items ({itemsList.length})</p>
                      {itemsList.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-slate-50 text-[11px] last:border-b-0">
                          <span className="font-semibold text-slate-805">
                            {item.name} <span className="text-slate-400 font-normal">x {item.quantity}</span>
                          </span>
                          <span className="font-mono text-slate-900 font-black">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-60 flex flex-col justify-between items-end gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-right">
                    <div className="space-y-1 w-full text-xs text-right">
                      <div className="flex justify-between md:justify-end gap-4 text-[10px] text-slate-500 font-medium">
                        <span>Subtotal:</span>
                        <span className="font-mono">₹{o.subtotal}</span>
                      </div>
                      <div className="flex justify-between md:justify-end gap-4 text-[10px] text-slate-500 font-medium">
                        <span>GST (5%):</span>
                        <span className="font-mono">₹{o.tax}</span>
                      </div>
                      <div className="flex justify-between md:justify-end gap-4 font-black text-slate-900 border-t border-slate-100 pt-1">
                        <span>Total Amount:</span>
                        <span className="font-mono text-sm text-indigo-650">₹{o.total}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full">
                      {o.status === 'Processing' && (
                        <>
                          <button
                            onClick={() => handleUpdateOrderStatus(parseInt(o.id), 'Shipped')}
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-[9px] uppercase rounded-xl transition cursor-pointer border-none"
                          >
                            Accept & Ship
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(parseInt(o.id), 'Cancelled')}
                            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-[9px] uppercase rounded-xl transition cursor-pointer border border-rose-150"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {o.status === 'Shipped' && (
                        <>
                          <button
                            onClick={() => handleUpdateOrderStatus(parseInt(o.id), 'Delivered')}
                            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[9px] uppercase rounded-xl transition cursor-pointer border-none"
                          >
                            Mark Delivered
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(parseInt(o.id), 'Returned')}
                            className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 font-black text-[9px] uppercase rounded-xl transition cursor-pointer border border-amber-150"
                          >
                            Mark Returned
                          </button>
                        </>
                      )}
                      {(o.status === 'Delivered' || o.status === 'Cancelled' || o.status === 'Returned') && (
                        <div className="col-span-2 text-center py-2 bg-slate-50 rounded-xl text-slate-400 font-extrabold text-[9px] uppercase tracking-wider">
                          Order Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. AdminCustomersPanel
// ==========================================
interface AdminCustomersPanelProps {
  customersList: any[];
  orders: any[];
}

export function AdminCustomersPanel({ customersList, orders }: AdminCustomersPanelProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<any[]>([]);

  const handleCustomerClick = (cust: any) => {
    setSelectedCustomer(cust);
    const custOrders = orders.filter((o) => o.customerEmail === cust.email);
    setSelectedCustomerOrders(custOrders);
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800 text-left">
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold text-slate-905 uppercase mb-4">Customer Directory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-450 uppercase">
                <th className="pb-3">Customer Name</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Total Orders</th>
                <th className="pb-3">Total Spend</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customersList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-slate-405">No customer accounts registered yet.</td>
                </tr>
              ) : (
                customersList.map((c) => (
                  <tr key={c.id} className="text-[11px]">
                    <td className="py-3 font-bold text-slate-805">{c.name}</td>
                    <td className="py-3 text-slate-500 font-mono">{c.email}</td>
                    <td className="py-3 text-slate-500 font-mono">{c.phone || 'N/A'}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        c.status === 'Customer' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-105 text-slate-550'
                      }`}>
                        {c.status || 'Lead'}
                      </span>
                    </td>
                    <td className="py-3 font-semibold">{c.totalOrders || 0} orders</td>
                    <td className="py-3 font-bold text-slate-900">₹{(c.totalSpent || 0).toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleCustomerClick(c)}
                        className="text-[10px] font-bold text-indigo-650 hover:underline cursor-pointer border-none bg-transparent"
                      >
                        View Activity
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 shadow-xl text-xs">
          <div className="flex justify-between items-start pb-2 border-b border-slate-800">
            <div>
              <h4 className="font-extrabold text-sm">{selectedCustomer.name} Profile Overview</h4>
              <p className="text-[10px] text-slate-400">Account ID: #{selectedCustomer.id}</p>
            </div>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="text-slate-400 hover:text-white font-bold border-none bg-transparent cursor-pointer"
            >
              ✕ Close Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
            <div>
              <p className="text-slate-400 text-[9px] uppercase font-bold">Email Address</p>
              <p className="font-mono mt-0.5">{selectedCustomer.email}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[9px] uppercase font-bold">Contact Phone</p>
              <p className="font-mono mt-0.5">{selectedCustomer.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[9px] uppercase font-bold">Billing Address</p>
              <p className="mt-0.5">{selectedCustomer.address || 'No default address stored.'}</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Purchase History ({selectedCustomerOrders.length} orders)</h5>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="pb-2">Order ID</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Payment Method</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {selectedCustomerOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-2 text-center text-slate-500">No orders completed yet.</td>
                    </tr>
                  ) : (
                    selectedCustomerOrders.map((o) => (
                      <tr key={o.id}>
                        <td className="py-2 font-mono font-bold">#{o.id}</td>
                        <td className="py-2 text-slate-300">{o.date}</td>
                        <td className="py-2 font-bold text-white">₹{o.total || o.amount}</td>
                        <td className="py-2 text-slate-300">{o.paymentMethod || 'Credit Card'}</td>
                        <td className="py-2 text-right">
                          <span className="px-1.5 py-0.5 bg-slate-800 text-slate-200 rounded uppercase text-[8px] font-black">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. AdminInventoryPanel
// ==========================================
interface AdminInventoryPanelProps {
  products: Product[];
}

export function AdminInventoryPanel({ products }: AdminInventoryPanelProps) {
  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-805 text-left">
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-905 uppercase">Warehouse Inventory Tracking</h3>
          <span className="text-[9px] px-2 py-0.5 bg-rose-50 text-rose-707 font-extrabold rounded-lg">
            Stock Alerts Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-455 uppercase">
                <th className="pb-3 w-16">Item ID</th>
                <th className="pb-3">Product Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Brand</th>
                <th className="pb-3">Stock Level</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Restock Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-slate-405">No inventory tracks found.</td>
                </tr>
              ) : (
                products.map((p) => {
                  const isLow = (p.stock !== undefined ? p.stock : 0) <= 5;
                  return (
                    <tr key={p.id} className={`text-[11px] ${isLow ? 'bg-rose-50/10' : ''}`}>
                      <td className="py-3 font-mono font-bold text-slate-400">#PROD-{p.id}</td>
                      <td className="py-3 font-semibold text-slate-805">{p.name}</td>
                      <td className="py-3 text-slate-500">{p.category}</td>
                      <td className="py-3 text-slate-500">{p.brand || 'N/A'}</td>
                      <td className="py-3 font-black text-slate-900 font-mono">
                        {p.stock !== undefined ? p.stock : 0} units
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                          isLow ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-650'
                        }`}>
                          {isLow ? 'Low Stock' : 'Healthy'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {isLow ? (
                          <span className="text-rose-600 font-extrabold text-[9px] uppercase tracking-wider animate-pulse">
                            ⚠️ Restock Urgently
                          </span>
                        ) : (
                          <span className="text-emerald-600 font-extrabold text-[9px] uppercase tracking-wider">
                            ✓ Stock Adequate
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. AdminCouponsPanel
// ==========================================
interface AdminCouponsPanelProps {
  projectId: number;
  couponsList: any[];
  setCouponsList: (l: any[]) => void;
}

export function AdminCouponsPanel({
  projectId,
  couponsList,
  setCouponsList,
}: AdminCouponsPanelProps) {
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState('percentage');
  const [newCouponValue, setNewCouponValue] = useState(10);
  const [newCouponMinAmount, setNewCouponMinAmount] = useState(0);

  const handleCreateCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim() || !newCouponValue) return;
    const newC = {
      projectId,
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      discountValue: parseFloat(String(newCouponValue)),
      minOrderAmount: parseFloat(String(newCouponMinAmount)),
      active: true
    };
    try {
      await api.coupons.create(newC);
      setNewCouponCode('');
      setNewCouponValue(10);
      setNewCouponMinAmount(0);
      api.coupons.list(projectId).then((data) => setCouponsList(data));
      alert('Coupon created successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleCouponClick = async (id: number) => {
    try {
      await api.coupons.toggle(id);
      api.coupons.list(projectId).then((data) => setCouponsList(data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCouponClick = async (id: number) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await api.coupons.delete(id);
      api.coupons.list(projectId).then((data) => setCouponsList(data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800 text-left">
      {/* Create Coupon form */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold text-slate-905 uppercase mb-4">Create Discount Coupon</h3>
        <form onSubmit={handleCreateCouponSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Coupon Code</label>
            <input
              type="text"
              required
              value={newCouponCode}
              onChange={(e) => setNewCouponCode(e.target.value)}
              placeholder="e.g. FASHION50"
              className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-600 transition uppercase font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1.5">Discount Type</label>
            <select
              value={newCouponType}
              onChange={(e) => setNewCouponType(e.target.value)}
              className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition font-bold"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Flat Amount (₹)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Discount Value</label>
            <input
              type="number"
              required
              value={newCouponValue}
              onChange={(e) => setNewCouponValue(parseInt(e.target.value) || 0)}
              placeholder="e.g. 10 / 500"
              className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-600 transition font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Min Order Amount (₹)</label>
            <input
              type="number"
              required
              value={newCouponMinAmount}
              onChange={(e) => setNewCouponMinAmount(parseInt(e.target.value) || 0)}
              placeholder="e.g. 1500"
              className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-600 transition font-bold"
            />
          </div>

          <div className="col-span-1 md:col-span-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition cursor-pointer text-[11px] border-none"
            >
              Create Promo Code
            </button>
          </div>
        </form>
      </div>

      {/* Coupons List */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold text-slate-905 uppercase mb-4">Promo Coupons Registry</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-450 uppercase">
                <th className="pb-3">Coupon Code</th>
                <th className="pb-3">Discount Type</th>
                <th className="pb-3">Value</th>
                <th className="pb-3">Min Order Requirement</th>
                <th className="pb-3">Active Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {couponsList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-slate-405">No coupons configured. Create one above.</td>
                </tr>
              ) : (
                couponsList.map((c) => (
                  <tr key={c.id} className="text-[11px]">
                    <td className="py-3 font-bold text-slate-855 font-mono text-sm">{c.code}</td>
                    <td className="py-3 text-slate-500 font-medium capitalize">{c.discountType}</td>
                    <td className="py-3 font-bold text-slate-900">
                      {c.discountType === 'percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`}
                    </td>
                    <td className="py-3 text-slate-505 font-mono">₹{c.minOrderAmount || 0}</td>
                    <td className="py-3">
                      <button
                        onClick={() => handleToggleCouponClick(c.id)}
                        className={`px-3 py-1 text-[9px] font-extrabold rounded-xl transition cursor-pointer border ${
                          c.active ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-505 border-slate-200'
                        }`}
                      >
                        {c.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDeleteCouponClick(c.id)}
                        className="text-[10px] font-bold text-rose-650 hover:underline cursor-pointer border-none bg-transparent"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. AdminReportsPanel
// ==========================================
interface AdminReportsPanelProps {
  orders: any[];
  products: Product[];
}

export function AdminReportsPanel({ orders, products }: AdminReportsPanelProps) {
  const categoryRevenueMap: Record<string, number> = {};
  const popularProducts: Record<string, { name: string; count: number; revenue: number }> = {};

  orders.forEach((o) => {
    if (o.status === 'Cancelled') return;
    try {
      const items = JSON.parse(o.itemsJson || '[]');
      items.forEach((item: any) => {
        const prodObj = products.find((p) => String(p.id) === String(item.id));
        const cat = prodObj?.category || 'General';
        categoryRevenueMap[cat] = (categoryRevenueMap[cat] || 0) + item.price * item.quantity;

        const pKey = String(item.id);
        if (!popularProducts[pKey]) {
          popularProducts[pKey] = { name: item.name, count: 0, revenue: 0 };
        }
        popularProducts[pKey].count += item.quantity;
        popularProducts[pKey].revenue += item.price * item.quantity;
      });
    } catch (e) {
      console.error(e);
    }
  });

  const popularList = Object.values(popularProducts).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-905 uppercase">Sales Volume by Category</h3>
          <div className="space-y-4 pt-2">
            {Object.keys(categoryRevenueMap).length === 0 ? (
              <p className="text-slate-405 text-center py-6">No sales revenue recorded by category.</p>
            ) : (
              Object.entries(categoryRevenueMap).map(([cat, rev]) => {
                const maxRev = Math.max(...Object.values(categoryRevenueMap), 1);
                const widthPercent = Math.max(10, Math.round((rev / maxRev) * 100));
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>🏷️ {cat}</span>
                      <span className="font-mono text-slate-900">₹{rev.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${widthPercent}%` }}
                        className="bg-indigo-600 h-full rounded-full"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-905 uppercase">Top Selling Products</h3>
          <div className="divide-y divide-slate-50 flex flex-col pt-1">
            {popularList.length === 0 ? (
              <p className="text-slate-405 text-center py-6">No product units sold yet.</p>
            ) : (
              popularList.map((item, idx) => (
                <div key={idx} className="flex justify-between py-3 font-semibold items-center">
                  <div>
                    <p className="text-slate-900 font-bold text-xs">{item.name}</p>
                    <p className="text-[10px] text-slate-405">{item.count} items sold</p>
                  </div>
                  <span className="font-mono text-slate-900 font-black">₹{item.revenue.toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. AdminSettingsPanel
// ==========================================
interface AdminSettingsPanelProps {
  projectId: number;
  storeSettings: any;
  setStoreSettings: (s: any) => void;
  setCompanyName: (n: string) => void;
}

export function AdminSettingsPanel({
  projectId,
  storeSettings,
  setStoreSettings,
  setCompanyName,
}: AdminSettingsPanelProps) {
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.settings.update(projectId, storeSettings);
      if (storeSettings.storeName) setCompanyName(storeSettings.storeName);
      alert('Store settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-805 text-left">
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold text-slate-905 uppercase mb-4">E-Commerce Store Configurations</h3>
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Store Brand Name</label>
              <input
                type="text"
                required
                value={storeSettings.storeName || ''}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                placeholder="e.g. My Premium Apparel"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Store Logo Image URL</label>
              <input
                type="text"
                value={storeSettings.logoUrl || ''}
                onChange={(e) => setStoreSettings({ ...storeSettings, logoUrl: e.target.value })}
                placeholder="e.g. https://example.com/logo.png"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-655 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Default Tax / GST Rate (%)</label>
              <input
                type="number"
                required
                value={storeSettings.taxRate || 0}
                onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: parseFloat(e.target.value) || 0.0 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">Shipping Fee (₹)</label>
              <input
                type="number"
                required
                value={storeSettings.shippingFee || 0}
                onChange={(e) => setStoreSettings({ ...storeSettings, shippingFee: parseFloat(e.target.value) || 0.0 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Supported Payment Methods</label>
            <div className="flex gap-6 items-center flex-wrap pt-1.5 text-xs">
              <label className="flex items-center gap-2 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={storeSettings.enableUpi !== false}
                  onChange={(e) => setStoreSettings({ ...storeSettings, enableUpi: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 border-slate-350 focus:ring-indigo-500 cursor-pointer"
                />
                <span>BHIM UPI Gateway</span>
              </label>

              <label className="flex items-center gap-2 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={storeSettings.enableCard !== false}
                  onChange={(e) => setStoreSettings({ ...storeSettings, enableCard: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 border-slate-350 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Credit / Debit Card Gateway</span>
              </label>

              <label className="flex items-center gap-2 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={storeSettings.enableCod !== false}
                  onChange={(e) => setStoreSettings({ ...storeSettings, enableCod: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 border-slate-350 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition shadow cursor-pointer text-[11px] border-none"
            >
              Save configurations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 10. AdminTableBookingPanel
// ==========================================
interface AdminTableBookingPanelProps {
  projectId: number;
  reservations: any[];
  fetchReservations: () => void;
}

export function AdminTableBookingPanel({
  projectId,
  reservations,
  fetchReservations,
}: AdminTableBookingPanelProps) {
  const [selectedSchedulerDate, setSelectedSchedulerDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [selectedSchedulerTime, setSelectedSchedulerTime] = useState('18:00');
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);

  // Manual booking form fields
  const [resFormName, setResFormName] = useState('');
  const [resFormEmail, setResFormEmail] = useState('');
  const [resFormPhone, setResFormPhone] = useState('');
  const [resFormDate, setResFormDate] = useState('');
  const [resFormTime, setResFormTime] = useState('18:00');
  const [resFormGuests, setResFormGuests] = useState(2);
  const [resFormTable, setResFormTable] = useState('1');
  const [resFormNotes, setResFormNotes] = useState('');

  const DEFAULT_TABLES = [
    { id: '1', name: 'Table 1 (Window)', seats: 2 },
    { id: '2', name: 'Table 2 (Window)', seats: 2 },
    { id: '3', name: 'Table 3 (Booth)', seats: 4 },
    { id: '4', name: 'Table 4 (Booth)', seats: 4 },
    { id: '5', name: 'Table 5 (Center)', seats: 4 },
    { id: '6', name: 'Table 6 (Center)', seats: 6 },
    { id: '7', name: 'Table 7 (VIP Room)', seats: 8 },
    { id: '8', name: 'Table 8 (Patio)', seats: 2 },
  ];

  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      customerName: resFormName,
      customerEmail: resFormEmail || null,
      customerPhone: resFormPhone,
      bookingDate: resFormDate,
      bookingTime: resFormTime,
      numberOfGuests: resFormGuests,
      tableNumber: resFormTable,
      notes: resFormNotes,
      status: 'Pending'
    };
    try {
      await api.reservations.create(payload);
      alert('Reservation recorded successfully!');
      setIsManualBookingOpen(false);
      setResFormName('');
      setResFormEmail('');
      setResFormPhone('');
      setResFormDate('');
      setResFormTime('18:00');
      setResFormGuests(2);
      setResFormNotes('');
      fetchReservations();
    } catch (err) {
      console.error(err);
      alert('Failed to register reservation.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-805 text-left text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Visual Scheduler</h3>
          <h2 className="text-lg font-black text-slate-905 mt-1">Table Layout & Availability</h2>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="date"
            value={selectedSchedulerDate}
            onChange={(e) => setSelectedSchedulerDate(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer font-bold"
          />
          <select
            value={selectedSchedulerTime}
            onChange={(e) => setSelectedSchedulerTime(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-650 transition cursor-pointer font-bold"
          >
            {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setResFormDate(selectedSchedulerDate);
              setResFormTime(selectedSchedulerTime);
              setResFormTable('1');
              setIsManualBookingOpen(true);
            }}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow transition cursor-pointer border-none"
          >
            Book Table +
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-350" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-350" />
          <span>Booked / Reserved</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {DEFAULT_TABLES.map((table) => {
          const activeBooking = reservations.find(
            (r) =>
              r.bookingDate === selectedSchedulerDate &&
              r.bookingTime === selectedSchedulerTime &&
              String(r.tableNumber) === String(table.id) &&
              r.status !== 'Cancelled'
          );

          return (
            <div
              key={table.id}
              onClick={() => {
                if (activeBooking) {
                  alert(`Table ${table.id} is reserved for ${activeBooking.customerName} (${activeBooking.numberOfGuests} guests)`);
                } else {
                  setResFormDate(selectedSchedulerDate);
                  setResFormTime(selectedSchedulerTime);
                  setResFormTable(table.id);
                  setIsManualBookingOpen(true);
                }
              }}
              className={`relative border rounded-3xl p-6 flex flex-col items-center justify-between min-h-[160px] shadow-sm transition-all duration-300 hover:scale-[1.03] cursor-pointer ${
                activeBooking
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-sm shadow-md border ${
                activeBooking
                  ? 'bg-rose-100 border-rose-300 text-rose-750 animate-pulse'
                  : 'bg-white border-emerald-250 text-emerald-700'
              }`}>
                T - {table.id}
              </div>

              <div className="text-center mt-3 space-y-1">
                <span className="block font-extrabold text-xs">{table.name}</span>
                <span className="block text-[10px] font-bold opacity-75">{table.seats} Seats Max</span>
              </div>

              {activeBooking ? (
                <div className="mt-4 px-2.5 py-1 bg-rose-500 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm truncate max-w-full">
                  👤 {activeBooking.customerName}
                </div>
              ) : (
                <div className="mt-4 px-2.5 py-1 bg-emerald-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">
                  Available
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isManualBookingOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-black text-slate-955 uppercase tracking-wider">Record Table Reservation</h3>
              <button
                type="button"
                onClick={() => setIsManualBookingOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer font-bold border-none"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateReservation} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Guest Name</label>
                <input
                  type="text"
                  required
                  value={resFormName}
                  onChange={(e) => setResFormName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Guest Email</label>
                  <input
                    type="email"
                    value={resFormEmail}
                    onChange={(e) => setResFormEmail(e.target.value)}
                    placeholder="e.g. guest@gmail.com"
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">Guest Phone</label>
                  <input
                    type="text"
                    required
                    value={resFormPhone}
                    onChange={(e) => setResFormPhone(e.target.value)}
                    placeholder="e.g. +91 99999 88888"
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-800"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={resFormDate}
                    onChange={(e) => setResFormDate(e.target.value)}
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Time Slot</label>
                  <select
                    value={resFormTime}
                    onChange={(e) => setResFormTime(e.target.value)}
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805 cursor-pointer font-bold"
                  >
                    {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">Table No.</label>
                  <select
                    value={resFormTable}
                    onChange={(e) => setResFormTable(e.target.value)}
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805 cursor-pointer font-bold"
                  >
                    {DEFAULT_TABLES.map((t) => (
                      <option key={t.id} value={t.id}>Table {t.id}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">No. of Guests</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={20}
                    value={resFormGuests}
                    onChange={(e) => setResFormGuests(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805 font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Special Request Notes</label>
                <textarea
                  value={resFormNotes}
                  onChange={(e) => setResFormNotes(e.target.value)}
                  placeholder="e.g. Vegetarian diet, window table, highchair for toddler."
                  rows={3}
                  className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition resize-none text-slate-805 font-semibold"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsManualBookingOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow cursor-pointer border-none"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 11. AdminReservationsPanel
// ==========================================
interface AdminReservationsPanelProps {
  projectId: number;
  reservations: any[];
  fetchReservations: () => void;
}

export function AdminReservationsPanel({
  projectId,
  reservations,
  fetchReservations,
}: AdminReservationsPanelProps) {
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);

  // Manual booking form fields
  const [resFormName, setResFormName] = useState('');
  const [resFormEmail, setResFormEmail] = useState('');
  const [resFormPhone, setResFormPhone] = useState('');
  const [resFormDate, setResFormDate] = useState('');
  const [resFormTime, setResFormTime] = useState('18:00');
  const [resFormGuests, setResFormGuests] = useState(2);
  const [resFormTable, setResFormTable] = useState('1');
  const [resFormNotes, setResFormNotes] = useState('');

  const DEFAULT_TABLES = [
    { id: '1', name: 'Table 1 (Window)', seats: 2 },
    { id: '2', name: 'Table 2 (Window)', seats: 2 },
    { id: '3', name: 'Table 3 (Booth)', seats: 4 },
    { id: '4', name: 'Table 4 (Booth)', seats: 4 },
    { id: '5', name: 'Table 5 (Center)', seats: 4 },
    { id: '6', name: 'Table 6 (Center)', seats: 6 },
    { id: '7', name: 'Table 7 (VIP Room)', seats: 8 },
    { id: '8', name: 'Table 8 (Patio)', seats: 2 },
  ];

  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      projectId,
      customerName: resFormName,
      customerEmail: resFormEmail || null,
      customerPhone: resFormPhone,
      bookingDate: resFormDate,
      bookingTime: resFormTime,
      numberOfGuests: resFormGuests,
      tableNumber: resFormTable,
      notes: resFormNotes,
      status: 'Pending'
    };
    try {
      await api.reservations.create(payload);
      alert('Reservation recorded successfully!');
      setIsManualBookingOpen(false);
      setResFormName('');
      setResFormEmail('');
      setResFormPhone('');
      setResFormDate('');
      setResFormTime('18:00');
      setResFormGuests(2);
      setResFormNotes('');
      fetchReservations();
    } catch (err) {
      console.error(err);
      alert('Failed to register reservation.');
    }
  };

  const handleUpdateReservationStatus = async (id: number, status: string) => {
    try {
      await api.reservations.updateStatus(id, status);
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReservation = async (id: number) => {
    if (!confirm('Are you sure you want to delete this reservation?')) return;
    try {
      await api.reservations.delete(id);
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-805 text-left text-xs">
      <div className="flex justify-between items-center bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Reservations Registry</h3>
          <h2 className="text-lg font-black text-slate-905 mt-1">All Bookings Logs</h2>
        </div>
        <button
          onClick={() => {
            setResFormDate(new Date().toISOString().split('T')[0]);
            setResFormTime('18:00');
            setResFormTable('1');
            setIsManualBookingOpen(true);
          }}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow cursor-pointer border-none"
        >
          New Reservation +
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Guest Info</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Guests & Table</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 italic">
                    No reservation logs recorded in the system.
                  </td>
                </tr>
              ) : (
                reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/50 transition duration-150">
                    <td className="p-4 pl-6">
                      <span className="block font-black text-slate-900 text-xs leading-snug">{res.customerName}</span>
                      <span className="block text-[10px] text-slate-400 font-bold leading-normal">{res.customerPhone}</span>
                      {res.customerEmail && (
                        <span className="block text-[10px] text-slate-400 font-bold leading-none mt-0.5">{res.customerEmail}</span>
                      )}
                      {res.notes && (
                        <span className="block text-[10px] text-indigo-650 font-medium italic mt-1 bg-indigo-50/50 px-2 py-0.5 rounded-lg max-w-xs truncate">
                          Notes: "{res.notes}"
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="block font-bold text-slate-909">{res.bookingDate}</span>
                      <span className="block text-[10px] text-slate-400 font-bold">{res.bookingTime}</span>
                    </td>
                    <td className="p-4">
                      <span className="block text-slate-900 font-bold">{res.numberOfGuests} Guests</span>
                      <span className="block text-[10px] text-slate-400 font-bold">Table {res.tableNumber}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider inline-block ${
                        res.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : res.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-750 border border-amber-200'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2 whitespace-nowrap">
                      {res.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleUpdateReservationStatus(res.id, 'Confirmed')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition shadow-sm text-[9px] cursor-pointer border-none"
                        >
                          Confirm
                        </button>
                      )}
                      {res.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleUpdateReservationStatus(res.id, 'Cancelled')}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition shadow-sm text-[9px] cursor-pointer border-none"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReservation(res.id)}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg font-bold transition border border-rose-100 text-[9px] cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isManualBookingOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-black text-slate-955 uppercase tracking-wider">Record Table Reservation</h3>
              <button
                type="button"
                onClick={() => setIsManualBookingOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer font-bold border-none"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateReservation} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Guest Name</label>
                <input
                  type="text"
                  required
                  value={resFormName}
                  onChange={(e) => setResFormName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Guest Email</label>
                  <input
                    type="email"
                    value={resFormEmail}
                    onChange={(e) => setResFormEmail(e.target.value)}
                    placeholder="e.g. guest@gmail.com"
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">Guest Phone</label>
                  <input
                    type="text"
                    required
                    value={resFormPhone}
                    onChange={(e) => setResFormPhone(e.target.value)}
                    placeholder="e.g. +91 99999 88888"
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={resFormDate}
                    onChange={(e) => setResFormDate(e.target.value)}
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Time Slot</label>
                  <select
                    value={resFormTime}
                    onChange={(e) => setResFormTime(e.target.value)}
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-855 cursor-pointer font-bold"
                  >
                    {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">Table No.</label>
                  <select
                    value={resFormTable}
                    onChange={(e) => setResFormTable(e.target.value)}
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-855 cursor-pointer font-bold"
                  >
                    {DEFAULT_TABLES.map((t) => (
                      <option key={t.id} value={t.id}>Table {t.id}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">No. of Guests</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={20}
                    value={resFormGuests}
                    onChange={(e) => setResFormGuests(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition text-slate-805 font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Special Request Notes</label>
                <textarea
                  value={resFormNotes}
                  onChange={(e) => setResFormNotes(e.target.value)}
                  placeholder="e.g. Vegetarian diet, window table, highchair for toddler."
                  rows={3}
                  className="w-full bg-slate-55/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:bg-white focus:border-indigo-650 transition resize-none text-slate-805 font-semibold"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsManualBookingOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow cursor-pointer border-none"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
