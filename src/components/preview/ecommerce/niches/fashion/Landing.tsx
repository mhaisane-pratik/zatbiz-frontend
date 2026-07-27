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
  const primaryColor = projectConfig?.themeColor || '#6366f1';
  const isLight = projectConfig?.selectedThemeData?.bgColor !== '#0f172a';
  const logoIcon = projectConfig?.logoIcon || '👗';
  const companyName = projectConfig?.projectName || 'Boutique';
  const slogan = projectConfig?.slogan || 'Elevated Editorial Fashion';

  const [currentSubPage, setCurrentSubPage] = useState('home');

  // Interactive shopping cart states on homepage
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Indigo');
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
    const parsed = parseDesc(product.description);
    setSelectedSize(parsed.nicheFields?.size || 'M');
    setSelectedColor(parsed.nicheFields?.color || 'Indigo');
    setQuantity(1);
    setIsDetailModalOpen(true);
  };

  const handleAddCartItem = () => {
    if (!selectedProduct) return;
    setCart(prev => [...prev, { product: selectedProduct, size: selectedSize, color: selectedColor, quantity }]);
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
      customerEmail: 'guest-buyer@fashion.com',
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
        size: item.size,
        color: item.color,
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

  // Group products by sections
  const newCollectionProducts = products.slice(0, 3);
  const trendingProducts = products.slice(3, 7);
  const menProducts = products.filter((p: any) => parseDesc(p.description).nicheFields?.gender?.toLowerCase() === 'men');
  const womenProducts = products.filter((p: any) => parseDesc(p.description).nicheFields?.gender?.toLowerCase() === 'women');
  const kidsProducts = products.filter((p: any) => parseDesc(p.description).nicheFields?.gender?.toLowerCase() === 'kids');

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isLight ? 'bg-[#FAF9F6] text-stone-900' : 'bg-stone-950 text-stone-100'}`}>
      {/* Announcement Bar */}
      <div className="py-2.5 text-center text-[10px] font-black tracking-widest text-white uppercase" style={{ backgroundColor: primaryColor }}>
        ✨ Haute Couture - Spring Summer 2026 Collection Live ✨
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${isLight ? 'bg-[#FAF9F6]/90 border-stone-200' : 'bg-stone-950/90 border-stone-900'}`}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSubPage('home')}>
            <span className="text-3xl p-1 bg-stone-500/5 rounded-xl border border-stone-500/10">{logoIcon}</span>
            <div>
              <h1 className="text-sm font-black tracking-widest uppercase">{companyName}</h1>
              <p className="text-[8px] text-stone-500 font-bold uppercase tracking-widest">Fashion House</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-stone-500">
            <a href="#new-collection" className="hover:text-stone-900 transition">New Arrivals</a>
            <a href="#trending" className="hover:text-stone-900 transition">Trending</a>
            <a href="#collections" className="hover:text-stone-900 transition">Departments</a>
            <a href="#brands" className="hover:text-stone-900 transition">Brands</a>
          </nav>

          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button onClick={() => setIsCartOpen(true)} className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-[10px] font-black uppercase text-white rounded-full transition cursor-pointer">
                🛒 Bag ({cart.length})
              </button>
            )}
            <button 
              onClick={() => setActiveView('login')}
              className="px-4 py-1.5 border border-stone-300 hover:bg-stone-100 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
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
              className="relative py-32 px-6 text-center border-b border-stone-200 bg-cover bg-center"
              style={projectConfig?.bannerUrl ? { backgroundImage: `url(${projectConfig.bannerUrl})` } : { backgroundColor: '#f4f2ee' }}
            >
              {projectConfig?.bannerUrl && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0" />
              )}
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: primaryColor }}>
                  SPRING / SUMMER 2026
                </span>
                <h2 className={`text-4xl md:text-6xl font-serif tracking-tight leading-tight ${projectConfig?.bannerUrl ? 'text-white' : 'text-stone-900'}`}>
                  {slogan}
                </h2>
                <p className={`text-xs font-medium leading-relaxed max-w-xl mx-auto ${projectConfig?.bannerUrl ? 'text-stone-200' : 'text-stone-500'}`}>
                  Discover a minimalist approach to everyday attire. Tailored lines, organic textures, and muted tones designed for timeless elegance and structural ease.
                </p>
                <div className="pt-4">
                  <a 
                    href="#new-collection"
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-850 text-white rounded-full text-xs font-black uppercase tracking-widest transition shadow-lg cursor-pointer"
                  >
                    View Lookbook
                  </a>
                </div>
              </div>
            </section>

            {/* New Collection Section */}
            <section id="new-collection" className="max-w-6xl mx-auto px-6 space-y-8">
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Fresh Arrivals</span>
                <h3 className="text-2xl font-serif text-white tracking-wider mt-1 uppercase">New Collection</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {newCollectionProducts.map((p: any) => {
                  const details = parseDesc(p.description);
                  return (
                    <div key={p.id} className="group flex flex-col justify-between cursor-pointer space-y-4" onClick={() => handleOpenDetail(p)}>
                      <div className="aspect-[3/4] w-full overflow-hidden bg-stone-900 rounded-2xl relative border border-white/5 shadow-md">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
                        {details.nicheFields?.brand && (
                          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 text-[8px] font-black uppercase text-white">{details.nicheFields.brand}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] font-bold text-stone-500 uppercase">{p.category || 'Apparel'}</span>
                          <span className="text-xs font-bold text-white">₹{p.price}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase truncate pt-1">{p.name}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Trending Products Section */}
            <section id="trending" className="max-w-6xl mx-auto px-6 space-y-8">
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Curated Favorites</span>
                <h3 className="text-2xl font-serif text-white tracking-wider mt-1 uppercase">Trending Products</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {trendingProducts.map((p: any) => (
                  <div key={p.id} className="group cursor-pointer space-y-3" onClick={() => handleOpenDetail(p)}>
                    <div className="aspect-[3/4] w-full overflow-hidden bg-stone-900 rounded-xl relative border border-white/5">
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase truncate">{p.name}</h4>
                      <p className="text-[10px] text-stone-400">₹{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Departments: Men, Women, Kids */}
            <section id="collections" className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Shop by Gender</span>
                <h3 className="text-2xl font-serif text-white tracking-wider mt-1 uppercase">Departments</h3>
              </div>

              <div className="space-y-12">
                {/* Women's Department */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400 border-b border-white/5 pb-2">👗 Women</h4>
                  {womenProducts.length === 0 ? (
                    <p className="text-xs text-stone-550 italic">No products cataloged in Women's apparel yet.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in">
                      {womenProducts.map((p: any) => (
                        <div key={p.id} className="group cursor-pointer" onClick={() => handleOpenDetail(p)}>
                          <img src={p.imageUrl} className="aspect-[3/4] object-cover w-full rounded-xl" alt={p.name} />
                          <h5 className="text-[11px] font-bold text-white uppercase truncate mt-2">{p.name}</h5>
                          <span className="text-[10px] text-stone-400">₹{p.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Men's Department */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400 border-b border-white/5 pb-2">👔 Men</h4>
                  {menProducts.length === 0 ? (
                    <p className="text-xs text-stone-550 italic">No products cataloged in Men's apparel yet.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in">
                      {menProducts.map((p: any) => (
                        <div key={p.id} className="group cursor-pointer" onClick={() => handleOpenDetail(p)}>
                          <img src={p.imageUrl} className="aspect-[3/4] object-cover w-full rounded-xl" alt={p.name} />
                          <h5 className="text-[11px] font-bold text-white uppercase truncate mt-2">{p.name}</h5>
                          <span className="text-[10px] text-stone-400">₹{p.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Kids' Department */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400 border-b border-white/5 pb-2">🧸 Kids</h4>
                  {kidsProducts.length === 0 ? (
                    <p className="text-xs text-stone-550 italic">No products cataloged in Kids' apparel yet.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in">
                      {kidsProducts.map((p: any) => (
                        <div key={p.id} className="group cursor-pointer" onClick={() => handleOpenDetail(p)}>
                          <img src={p.imageUrl} className="aspect-[3/4] object-cover w-full rounded-xl" alt={p.name} />
                          <h5 className="text-[11px] font-bold text-white uppercase truncate mt-2">{p.name}</h5>
                          <span className="text-[10px] text-stone-400">₹{p.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Brands Section */}
            <section id="brands" className="max-w-6xl mx-auto px-6 space-y-6 border-t border-white/5 pt-12">
              <h4 className="text-xs font-black uppercase tracking-widest text-center text-stone-500">Partner Brands</h4>
              <div className="flex flex-wrap justify-center items-center gap-12 text-stone-400 text-xs font-black tracking-widest uppercase">
                <span>CHANEL</span>
                <span>VALENTINO</span>
                <span>GUCCI</span>
                <span>PRADA</span>
                <span>HERMÈS</span>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-xs text-stone-500 font-bold uppercase tracking-widest">
        © 2026 {companyName} Fashion House. All Rights Reserved.
      </footer>

      {/* Product Detail Modal */}
      {isDetailModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-stone-900 border border-white/10 rounded-3xl p-6 relative flex flex-col md:flex-row gap-6 my-8 text-white shadow-2xl">
            <button onClick={() => setIsDetailModalOpen(false)} className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-white bg-white/5 w-6 h-6 rounded-full flex items-center justify-center transition cursor-pointer">✕</button>
            <div className="w-full md:w-1/2 aspect-square md:aspect-[3/4] overflow-hidden bg-stone-950 rounded-2xl border border-white/5">
              <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400">{selectedProduct.category || 'Apparel'}</span>
                <h3 className="text-sm font-black uppercase tracking-wider">{selectedProduct.name}</h3>
                <p className="text-[10px] text-slate-450 leading-relaxed">{parseDesc(selectedProduct.description).text}</p>
                <div className="text-sm font-black">₹{selectedProduct.price}</div>

                {/* Variant Selections */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Select Size</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL'].map(sz => (
                      <button key={sz} type="button" onClick={() => setSelectedSize(sz)} className={`w-7 h-7 rounded-lg text-[10px] font-bold border transition flex items-center justify-center cursor-pointer ${selectedSize === sz ? 'bg-indigo-650 text-white border-indigo-650 font-bold' : 'bg-white/5 border-white/10 text-slate-400 hover:border-slate-400'}`}>{sz}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Select Color</label>
                  <div className="flex gap-2">
                    {['Indigo', 'Slate', 'Sage'].map(cl => (
                      <button key={cl} type="button" onClick={() => setSelectedColor(cl)} className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border transition flex items-center justify-center cursor-pointer ${selectedColor === cl ? 'bg-indigo-650 text-white border-indigo-650 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>{cl}</button>
                    ))}
                  </div>
                </div>

                {/* Specifications Grid */}
                {Object.keys(parseDesc(selectedProduct.description).nicheFields).length > 0 && (
                  <div className="border border-white/5 rounded-2xl p-3 bg-white/[0.01] space-y-2">
                    <h5 className="text-[9px] font-black uppercase text-indigo-400 tracking-wider">Product Specifications</h5>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                      {Object.entries(parseDesc(selectedProduct.description).nicheFields).map(([k, v]: any) => (
                        <div key={k} className="border-b border-white/5 pb-1">
                          <span className="text-slate-450 block capitalize text-[8px]">{k.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-white truncate block">{String(v)}</span>
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

              <button type="button" onClick={handleAddCartItem} className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-705 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition cursor-pointer">Add to Bag</button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-stone-900 border-l border-white/10 p-6 text-white flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/5">
                <h3 className="text-sm font-black uppercase tracking-wider">🛒 Shopping Bag</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-xs font-bold text-slate-400">✕ Close</button>
              </div>
              <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center p-2.5 bg-white/5 border border-white/5 rounded-xl">
                    <img src={item.product.imageUrl} className="w-12 h-12 object-cover rounded-lg border border-white/5" alt="" />
                    <div className="flex-grow">
                      <h4 className="text-xs font-black truncate max-w-[150px]">{item.product.name}</h4>
                      <p className="text-[9px] text-slate-400">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
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
                className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition cursor-pointer"
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
          <div className="w-full max-w-2xl bg-stone-900 border border-white/10 rounded-[32px] p-6 relative my-8 text-white shadow-2xl">
            <button type="button" onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-white bg-white/5 w-6 h-6 rounded-full flex items-center justify-center transition cursor-pointer">✕</button>
            <h2 className="text-sm font-black uppercase tracking-wider mb-4 border-b border-white/5 pb-2">🛍️ Guest Checkout</h2>
            
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
                  <button type="submit" disabled={isPlacing} className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer">{isPlacing ? 'Placing Order...' : 'Submit Order'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Celebration */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-stone-900 border border-white/10 rounded-[32px] p-6 text-center space-y-4 text-white shadow-2xl">
            <span className="text-4xl inline-block animate-bounce">🎉</span>
            <h3 className="text-base font-black uppercase tracking-wider">Order Confirmed!</h3>
            <p className="text-xs text-slate-400">Your fashion purchase has been submitted successfully.</p>
            <div className="p-3 bg-white/5 border border-white/5 rounded-2xl inline-block">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Tracking Manifest</span>
              <span className="text-xs font-black text-indigo-400">{successOrderId}</span>
            </div>
            <div>
              <button type="button" onClick={() => setIsSuccessOpen(false)} className="px-6 py-2 bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
