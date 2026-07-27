'use client';
import React, { useState } from 'react';
import { api } from '@/services/api';

export default function Landing({
  projectId,
  projectConfig,
  products = [],
  onProductClick,
  handleAddToCart,
  activeView,
  setActiveView,
  handleToggleWishlist,
  wishlist = [],
  handleCheckout
}: any) {
  const primaryColor = projectConfig?.themeColor || '#10b981';
  const logoIcon = projectConfig?.logoIcon || '🍎';
  const companyName = projectConfig?.projectName || 'FreshMarket';
  const slogan = projectConfig?.slogan || 'Organic Groceries Delivered Fresh';

  const [currentSubPage, setCurrentSubPage] = useState('home');

  // Interactive shopping cart states on homepage
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState('');

  // Checkout shipping states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [gateway, setGateway] = useState('UPI');
  const [isPlacing, setIsPlacing] = useState(false);

  // Helper parser for description JSON
  const parseDesc = (desc: string) => {
    try {
      if (desc && desc.trim().startsWith('{') && desc.trim().endsWith('}')) {
        const parsed = JSON.parse(desc);
        return { text: parsed.text || '', nicheFields: parsed.nicheFields || {} };
      }
    } catch (e) {}
    return { text: desc || '', nicheFields: {} };
  };

  const handleOpenDetail = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsDetailModalOpen(true);
  };

  const handleAddCartItem = () => {
    if (!selectedProduct) return;
    setCart(prev => [...prev, { product: selectedProduct, quantity }]);
    setIsDetailModalOpen(false);
    alert(`${selectedProduct.name} added to cart!`);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !city || !state || !zip) {
      alert('Please fill out all address details.');
      return;
    }
    setIsPlacing(true);
    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    const orderPayload = {
      projectId,
      customerName: name,
      customerEmail: 'guest-buyer@freshmarket.com',
      customerPhone: phone,
      customerAddress: `${address}, ${city}, ${state} - ${zip}`,
      city,
      state,
      pincode: zip,
      itemsJson: JSON.stringify(cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl
      }))),
      subtotal,
      tax,
      total,
      status: 'Pending',
      paymentGateway: gateway,
      paymentStatus: gateway === 'COD' ? 'Pending' : 'Paid',
      paymentMethod: gateway
    };

    try {
      const order = await api.orders.place(orderPayload);
      setSuccessOrderId(`ORD-${order.id}`);
      setCart([]);
      setIsCheckoutOpen(false);
      setIsSuccessOpen(true);
    } catch (err) {
      console.error(err);
      alert('Order placement failed.');
    } finally {
      setIsPlacing(false);
    }
  };

  // Group products by Grocery categories
  const fruitProducts = products.filter((p: any) => p.category?.toLowerCase().includes('fruit'));
  const vegetableProducts = products.filter((p: any) => p.category?.toLowerCase().includes('veg'));
  const dairyProducts = products.filter((p: any) => p.category?.toLowerCase().includes('dairy') || p.category?.toLowerCase().includes('milk'));
  const bakeryProducts = products.filter((p: any) => p.category?.toLowerCase().includes('bakery') || p.category?.toLowerCase().includes('bread'));
  const dailyEssentials = products.slice(0, 4); // Daily Essentials fallback list

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-900 text-slate-100">
      {/* Announcement Bar */}
      <div className="py-2.5 text-center text-[10px] font-black tracking-widest text-white uppercase bg-emerald-600" style={{ backgroundColor: primaryColor }}>
        ✨ HARVESTED FRESH DAILY: FREE DELIVERY ABOVE ₹999 ✨
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSubPage('home')}>
            <span className="text-3xl p-1 bg-white/5 rounded-xl border border-white/10">{logoIcon}</span>
            <div>
              <h1 className="text-sm font-black tracking-widest uppercase text-white">{companyName}</h1>
              <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Organic Market</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#fruits" className="hover:text-white transition">Fresh Fruits</a>
            <a href="#vegetables" className="hover:text-white transition">Vegetables</a>
            <a href="#dairy" className="hover:text-white transition">Dairy</a>
            <a href="#bakery" className="hover:text-white transition">Bakery</a>
            <a href="#essentials" className="hover:text-white transition">Daily Essentials</a>
          </nav>

          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button onClick={() => setIsCartOpen(true)} className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-black uppercase text-white rounded-full transition cursor-pointer">
                🛒 Basket ({cart.length})
              </button>
            )}
            <button 
              onClick={() => setActiveView('login')}
              className="px-4 py-1.5 border border-slate-800 hover:bg-slate-900 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white rounded-full transition cursor-pointer hover:opacity-90 shadow-md"
              style={{ backgroundColor: primaryColor }}
            >
              Workspace
            </button>
          </div>
        </div>
      </header>

      {/* Main Pages Content */}
      <main className="flex-grow">
        {currentSubPage === 'home' && (
          <div className="pb-24 space-y-20">
            {/* Hero Section */}
            <section 
              className="relative py-32 px-6 text-center border-b border-emerald-100/10 bg-cover bg-center"
              style={projectConfig?.bannerUrl ? { backgroundImage: `url(${projectConfig.bannerUrl})` } : { backgroundColor: '#14532d' }}
            >
              {projectConfig?.bannerUrl && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0" />
              )}
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white bg-emerald-600">
                  HARVESTED TODAY
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                  {slogan}
                </h2>
                <p className="text-xs text-slate-200 font-medium leading-relaxed max-w-xl mx-auto">
                  Sourced straight from certified organic local cultivators. Healthy green vegetables, sweet seasonal fruits, farm-fresh dairy, and artisan baked products delivered clean.
                </p>
                <div className="pt-4">
                  <a 
                    href="#essentials"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-black uppercase tracking-widest transition shadow-lg cursor-pointer"
                  >
                    Browse Produce
                  </a>
                </div>
              </div>
            </section>

            {/* Daily Essentials */}
            <section id="essentials" className="max-w-6xl mx-auto px-6 space-y-8">
              <div className="text-center">
                <span className="text-[10px] font-bold text-emerald-400 tracking-widest">// DAILY NUTRITION</span>
                <h3 className="text-2xl font-bold uppercase text-white mt-1">Daily Essentials</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {dailyEssentials.map((p: any) => {
                  const details = parseDesc(p.description);
                  return (
                    <div key={p.id} className="group cursor-pointer bg-slate-900 border border-white/5 p-4 rounded-2xl hover:border-emerald-500 transition duration-300" onClick={() => handleOpenDetail(p)}>
                      <img src={p.imageUrl} className="w-full aspect-square object-cover rounded-xl bg-slate-950" alt="" />
                      <div className="mt-3 flex justify-between items-center">
                        <h5 className="text-[11px] font-bold text-white uppercase truncate">{p.name}</h5>
                        {details.nicheFields?.weight && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">{details.nicheFields.weight}{details.nicheFields.unit || 'g'}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold block mt-1">₹{p.price}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Fruits Section */}
            <section id="fruits" className="max-w-6xl mx-auto px-6 space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 border-b border-white/5 pb-2">🍎 Fresh Fruits</h4>
              {fruitProducts.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No fresh fruits cataloged yet.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {fruitProducts.map((p: any) => (
                    <div key={p.id} className="group cursor-pointer bg-slate-900 border border-white/5 p-4 rounded-2xl hover:border-emerald-500 transition duration-300" onClick={() => handleOpenDetail(p)}>
                      <img src={p.imageUrl} className="w-full aspect-square object-cover rounded-xl bg-slate-950" alt="" />
                      <h5 className="text-[11px] font-bold text-white uppercase truncate mt-3">{p.name}</h5>
                      <span className="text-[10px] text-emerald-400">₹{p.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Vegetables Section */}
            <section id="vegetables" className="max-w-6xl mx-auto px-6 space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 border-b border-white/5 pb-2">🥬 Organic Vegetables</h4>
              {vegetableProducts.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No fresh vegetables cataloged yet.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {vegetableProducts.map((p: any) => (
                    <div key={p.id} className="group cursor-pointer bg-slate-900 border border-white/5 p-4 rounded-2xl hover:border-emerald-500 transition duration-300" onClick={() => handleOpenDetail(p)}>
                      <img src={p.imageUrl} className="w-full aspect-square object-cover rounded-xl bg-slate-950" alt="" />
                      <h5 className="text-[11px] font-bold text-white uppercase truncate mt-3">{p.name}</h5>
                      <span className="text-[10px] text-emerald-400">₹{p.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Dairy Section */}
            <section id="dairy" className="max-w-6xl mx-auto px-6 space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 border-b border-white/5 pb-2">🥛 Farm-Fresh Dairy & Milk</h4>
              {dairyProducts.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No dairy products cataloged yet.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {dairyProducts.map((p: any) => (
                    <div key={p.id} className="group cursor-pointer bg-slate-900 border border-white/5 p-4 rounded-2xl hover:border-emerald-500 transition duration-300" onClick={() => handleOpenDetail(p)}>
                      <img src={p.imageUrl} className="w-full aspect-square object-cover rounded-xl bg-slate-950" alt="" />
                      <h5 className="text-[11px] font-bold text-white uppercase truncate mt-3">{p.name}</h5>
                      <span className="text-[10px] text-emerald-400">₹{p.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Bakery Section */}
            <section id="bakery" className="max-w-6xl mx-auto px-6 space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 border-b border-white/5 pb-2">🍞 Artisan Bakery & Bread</h4>
              {bakeryProducts.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No bakery products cataloged yet.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {bakeryProducts.map((p: any) => (
                    <div key={p.id} className="group cursor-pointer bg-slate-900 border border-white/5 p-4 rounded-2xl hover:border-emerald-500 transition duration-300" onClick={() => handleOpenDetail(p)}>
                      <img src={p.imageUrl} className="w-full aspect-square object-cover rounded-xl bg-slate-950" alt="" />
                      <h5 className="text-[11px] font-bold text-white uppercase truncate mt-3">{p.name}</h5>
                      <span className="text-[10px] text-emerald-400">₹{p.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 text-center text-xs text-slate-500 uppercase tracking-widest bg-slate-950">
        © 2026 {companyName} Store. Fresh Groceries & Green Organic Produce.
      </footer>

      {/* Product Detail Modal */}
      {isDetailModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-emerald-500/10 rounded-3xl p-6 relative flex flex-col md:flex-row gap-6 my-8 text-white shadow-2xl">
            <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-white bg-white/5 w-6 h-6 rounded-full flex items-center justify-center transition cursor-pointer">✕</button>
            <div className="w-full md:w-1/2 aspect-square overflow-hidden bg-slate-955 rounded-2xl border border-white/5">
              <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-emerald-550/10 text-emerald-400">{selectedProduct.category || 'Grocery'}</span>
                <h3 className="text-sm font-black uppercase tracking-wider">{selectedProduct.name}</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">{parseDesc(selectedProduct.description).text}</p>
                <div className="text-sm font-black">₹{selectedProduct.price}</div>

                {/* Technical Specifications Grid */}
                {Object.keys(parseDesc(selectedProduct.description).nicheFields).length > 0 && (
                  <div className="border border-white/5 rounded-2xl p-3 bg-white/[0.01] space-y-2">
                    <h5 className="text-[9px] font-black uppercase text-emerald-405 tracking-wider">Nutrition & Info</h5>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                      {Object.entries(parseDesc(selectedProduct.description).nicheFields).map(([k, v]: any) => (
                        <div key={k} className="border-b border-white/5 pb-1">
                          <span className="text-slate-450 block capitalize text-[8px]">{k.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-white truncate block">{v === true ? 'Yes' : v === false ? 'No' : String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Quantity</label>
                  <div className="flex items-center gap-2.5">
                    <button type="button" onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/10 flex items-center justify-center cursor-pointer">-</button>
                    <span className="text-xs font-bold">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(prev => prev + 1)} className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/10 flex items-center justify-center cursor-pointer">+</button>
                  </div>
                </div>
              </div>

              <button type="button" onClick={handleAddCartItem} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition cursor-pointer font-bold">Add to Basket</button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-slate-900 border-l border-white/10 p-6 text-white flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/5">
                <h3 className="text-sm font-black uppercase tracking-wider">🛒 Fresh Basket</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-xs font-bold text-slate-400">✕ Close</button>
              </div>
              <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center p-2.5 bg-white/5 border border-white/5 rounded-xl">
                    <img src={item.product.imageUrl} className="w-12 h-12 object-cover rounded-lg border border-white/5" alt="" />
                    <div className="flex-grow">
                      <h4 className="text-xs font-black truncate max-w-[150px]">{item.product.name}</h4>
                      <p className="text-[9px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-black">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex justify-between text-xs font-bold">
                <span>Subtotal:</span>
                <span>₹{cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}</span>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[32px] p-6 relative my-8 text-white shadow-2xl">
            <button type="button" onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-white bg-white/5 w-6 h-6 rounded-full flex items-center justify-center transition cursor-pointer">✕</button>
            <h2 className="text-sm font-black uppercase tracking-wider mb-4 border-b border-white/5 pb-2">🛍️ Order Delivery Details</h2>
            
            <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Recipient Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none text-white focus:border-indigo-500" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Contact Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none text-white focus:border-indigo-500" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Street Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none text-white focus:border-indigo-500" required />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-2 py-2 text-xs focus:outline-none text-white focus:border-indigo-500" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">State</label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-2 py-2 text-xs focus:outline-none text-white focus:border-indigo-500" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">ZIP</label>
                    <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-2 py-2 text-xs focus:outline-none text-white focus:border-indigo-500" required />
                  </div>
                </div>
                <div className="space-y-1 pt-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Payment Method</label>
                  <div className="flex gap-4">
                    {['UPI', 'COD', 'Card'].map(gw => (
                      <label key={gw} className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-slate-400 hover:text-white">
                        <input type="radio" name="gateway" value={gw} checked={gateway === gw} onChange={() => setGateway(gw)} className="accent-indigo-650" />
                        <span>{gw}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-slate-500">Summary</h4>
                  <div className="border-t border-white/5 pt-3 space-y-1.5 text-[10px] font-bold">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal:</span>
                      <span>₹{cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>GST (18%):</span>
                      <span>₹{Math.round(cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) * 0.18)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-white font-black border-t border-white/5 pt-2">
                      <span>Grand Total:</span>
                      <span>₹{cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) + Math.round(cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) * 0.18)}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" disabled={isPlacing} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer">{isPlacing ? 'Processing...' : 'Place Order'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Celebration */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-[32px] p-6 text-center space-y-4 text-white shadow-2xl">
            <span className="text-4xl inline-block animate-bounce">🎉</span>
            <h3 className="text-base font-black uppercase tracking-wider text-white">Order Placed!</h3>
            <p className="text-xs text-slate-400">Your fresh organic groceries are scheduled for fulfillment delivery.</p>
            <div className="p-3 bg-white/5 border border-white/5 rounded-2xl inline-block">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Tracking Manifest</span>
              <span className="text-xs font-black text-emerald-400">{successOrderId}</span>
            </div>
            <div>
              <button type="button" onClick={() => setIsSuccessOpen(false)} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
