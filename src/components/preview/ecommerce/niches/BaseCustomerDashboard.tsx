'use client';
import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';

export default function BaseCustomerDashboard({ 
  projectId, 
  projectConfig, 
  customerSession, 
  onLogout, 
  setActiveView, 
  addToast,
  wishlist = [],
  handleToggleWishlist,
  dbProducts = [],
  defaultCategory = 'fashion',
  defaultPrimaryColor = '#6366f1',
  defaultLogoIcon = '👗'
}: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const primaryColor = projectConfig?.themeColor || defaultPrimaryColor;
  const logoIcon = projectConfig?.logoIcon || defaultLogoIcon;

  const category = defaultCategory;
  const isLight = projectConfig?.selectedThemeData?.bgColor === '#ffffff';

  const [orders, setOrders] = useState([
    { id: 'ORD-2026-9041', date: '2026-07-01', total: '₹4,999', status: 'Shipped', items: '2x Premium Items' },
    { id: 'ORD-2026-8712', date: '2026-06-15', total: '₹12,450', status: 'Delivered', items: '3x Curated Goods' },
    { id: 'ORD-2026-6105', date: '2026-05-20', total: '₹2,300', status: 'Cancelled', items: '1x Specialty Item' }
  ]);

  const [profile, setProfile] = useState({
    name: customerSession?.name || 'Valued Buyer',
    email: customerSession?.email || 'customer@gmail.com',
    phone: '+91 98765 43210',
    shippingAddress: '123 Main Street, Sector 4',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001'
  });

  const [supportMessage, setSupportMessage] = useState('');
  const [supportChat, setSupportChat] = useState<{ sender: string; text: string }[]>([]);

  // Cart & Modal States
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Indigo');
  const [productQuantity, setProductQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState('');

  // Checkout Form States
  const [checkoutName, setCheckoutName] = useState(profile.name);
  const [checkoutPhone, setCheckoutPhone] = useState(profile.phone);
  const [checkoutAddress, setCheckoutAddress] = useState(profile.shippingAddress);
  const [checkoutCity, setCheckoutCity] = useState(profile.city);
  const [checkoutState, setCheckoutState] = useState(profile.state);
  const [checkoutPincode, setCheckoutPincode] = useState(profile.zip);
  const [checkoutGateway, setCheckoutGateway] = useState('UPI');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Load customer orders from database if available
  useEffect(() => {
    if (customerSession?.id) {
      api.orders.listForCustomer(projectId, customerSession.id)
        .then((data) => {
          if (data && data.length > 0) {
            const formatted = data.map((o: any) => {
              let itemsDesc = 'Items';
              try {
                const parsed = JSON.parse(o.itemsJson || '[]');
                itemsDesc = parsed.map((item: any) => `${item.quantity}x ${item.name}`).join(', ');
              } catch (e) {}
              return {
                id: `ORD-${o.id}`,
                date: o.createdAt ? o.createdAt.split('T')[0] : '2026-07-16',
                total: `₹${o.total}`,
                status: o.status,
                items: itemsDesc
              };
            });
            setOrders(formatted);
          }
        })
        .catch((err) => {
          console.warn('Failed to load real customer orders:', err);
        });
    }
  }, [projectId, customerSession]);

  const openProductPurchaseModal = (product: any) => {
    setSelectedProduct(product);
    const parsed = parseDesc(product.description);
    setSelectedSize(parsed.nicheFields?.size || 'M');
    setSelectedColor(parsed.nicheFields?.color || 'Default');
    setProductQuantity(1);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const cartItem = {
      product: selectedProduct,
      quantity: productQuantity,
      size: selectedSize,
      color: selectedColor
    };
    setCart(prev => [...prev, cartItem]);
    setIsProductModalOpen(false);
    if (typeof addToast === 'function') {
      addToast(`Added ${selectedProduct.name} to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    const cartItem = {
      product: selectedProduct,
      quantity: productQuantity,
      size: selectedSize,
      color: selectedColor
    };
    setCart([cartItem]);
    setIsProductModalOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutPhone || !checkoutAddress || !checkoutCity || !checkoutState || !checkoutPincode) {
      if (typeof addToast === 'function') addToast('Please fill all shipping fields.', true);
      return;
    }

    setIsPlacingOrder(true);
    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    const orderData = {
      projectId,
      customerId: customerSession?.id,
      customerName: checkoutName,
      customerEmail: customerSession?.email || 'customer@example.com',
      customerPhone: checkoutPhone,
      customerAddress: `${checkoutAddress}, ${checkoutCity}, ${checkoutState} - ${checkoutPincode}`,
      city: checkoutCity,
      state: checkoutState,
      pincode: checkoutPincode,
      itemsJson: JSON.stringify(cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        imageUrl: item.product.imageUrl
      }))),
      subtotal: subtotal,
      tax: tax,
      total: total,
      status: 'Pending',
      paymentGateway: checkoutGateway,
      paymentStatus: checkoutGateway === 'COD' ? 'Pending' : 'Paid',
      paymentMethod: checkoutGateway
    };

    try {
      const createdOrder = await api.orders.place(orderData);
      setSuccessOrderId(`ORD-${createdOrder.id || '2026-NEW'}`);
      setCart([]);
      setIsCheckoutOpen(false);
      setIsSuccessOpen(true);
      if (typeof addToast === 'function') addToast('Your order has been successfully placed!');
      
      if (customerSession?.id) {
        api.orders.listForCustomer(projectId, customerSession.id)
          .then((data) => {
            const formatted = data.map((o: any) => {
              let itemsDesc = 'Items';
              try {
                const parsed = JSON.parse(o.itemsJson || '[]');
                itemsDesc = parsed.map((item: any) => `${item.quantity}x ${item.name}`).join(', ');
              } catch (e) {}
              return {
                id: `ORD-${o.id}`,
                date: o.createdAt ? o.createdAt.split('T')[0] : '2026-07-16',
                total: `₹${o.total}`,
                status: o.status,
                items: itemsDesc
              };
            });
            setOrders(formatted);
          });
      }
    } catch (err) {
      console.error(err);
      if (typeof addToast === 'function') addToast('Failed to submit order to database.', true);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleSupportSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    const userMsg = supportMessage;
    setSupportChat(prev => [...prev, { sender: 'user', text: userMsg }]);
    setSupportMessage('');
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: 'bot', text: `Thank you for reaching out. A support coordinator from the ${category.toUpperCase()} team has been notified.` }]);
    }, 1000);
  };

  const fallbackWishlist = [
    { id: 1, name: 'Premium Niche Collection Item A', price: 1850, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=60', description: '{"text":"Exclusive premium quality selection.","nicheFields":{"brand":"Vogue"}}' },
    { id: 2, name: 'Specialty Curated Selection B', price: 3400, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=60', description: '{"text":"Curated boutique apparel accessory.","nicheFields":{"brand":"Aura"}}' }
  ];

  const wishlistedItems = dbProducts && dbProducts.length > 0
    ? dbProducts.filter((p: any) => wishlist.includes(p.id))
    : fallbackWishlist;

  const fallbackProducts = [
    { id: 1, name: 'Premium Niche Collection Item A', price: 1850, category: 'Best Sellers', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&auto=format&fit=crop&q=80', description: '{"text":"Exclusive premium quality selection.","nicheFields":{"brand":"Vogue","fabric":"Silk","size":"M"}}' },
    { id: 2, name: 'Specialty Curated Selection B', price: 3400, category: 'New Arrivals', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80', description: '{"text":"Curated boutique apparel accessory.","nicheFields":{"brand":"Aura","color":"Gold","seasonalCollection":"Autumn 2026"}}' }
  ];

  const productsList = dbProducts && dbProducts.length > 0 ? dbProducts : fallbackProducts;

  const removeWishlist = (id: number) => {
    if (handleToggleWishlist) {
      handleToggleWishlist(id);
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof addToast === 'function') addToast('Profile details updated successfully.');
  };

  // Helper parser for products
  const parseDesc = (desc: string) => {
    try {
      if (desc && desc.trim().startsWith('{') && desc.trim().endsWith('}')) {
        const parsed = JSON.parse(desc);
        return { text: parsed.text || '', nicheFields: parsed.nicheFields || {} };
      }
    } catch(e){}
    return { text: desc || '', nicheFields: {} };
  };

  const cardClass = `rounded-2xl p-6 border transition duration-300 ${isLight ? 'bg-white border-slate-200 shadow-sm text-slate-800' : 'bg-slate-900 border-white/5 text-white shadow-lg'}`;
  const inputClass = `w-full px-3 py-2 rounded-xl text-xs focus:outline-none border transition ${isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-slate-400' : 'bg-white/5 border-white/10 text-white focus:border-indigo-500'}`;

  // Get active product details parsed
  const activeProductDetails = selectedProduct ? parseDesc(selectedProduct.description) : { text: '', nicheFields: {} };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-955 text-white'}`}>
      {/* Sidebar navigation */}
      <aside className={`w-64 p-5 border-r shrink-0 flex flex-col ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-white/5'}`}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <span className="text-2xl p-1 bg-white/5 border border-white/10 rounded-lg">{logoIcon}</span>
          <div>
            <h2 className="text-xs font-black uppercase tracking-tight">Customer Portal</h2>
            <p className="text-[9px] text-slate-500 font-bold truncate max-w-[130px]">{customerSession?.email || 'customer@example.com'}</p>
          </div>
        </div>

        <nav className="space-y-1 flex-grow">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'shop', label: `🛍️ Shop Catalog ${cart.length > 0 ? `(${cart.length})` : ''}` },
            { id: 'orders', label: '📦 My Orders' },
            { id: 'wishlist', label: '❤️ Wishlist' },
            { id: 'wallet', label: '💳 Wallet & Rewards' },
            { id: 'profile', label: '🏠 Address Book' },
            { id: 'support', label: '💬 Support Center' }
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
          Sign Out
        </button>
      </aside>

      {/* Main content viewport */}
      <main className="flex-grow p-6 md:p-8 space-y-6 overflow-y-auto max-w-5xl">
        <header className="flex justify-between items-center pb-4 border-b border-white/5">
          <h1 className="text-lg font-black tracking-tight capitalize">{activeTab} Details</h1>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button 
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-[10px] font-black uppercase text-white rounded-full transition shadow-md cursor-pointer"
              >
                🛒 Checkout ({cart.length})
              </button>
            )}
            <button onClick={() => setActiveView('landing')} className="text-xs font-bold text-slate-400 hover:text-white transition">← Back to Shop</button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className={cardClass}>
              <h2 className="text-lg font-black tracking-tight text-white mb-2">Welcome back, {profile.name}!</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Here is a summary of your premium customer account workspace dashboard. Connect orders, refunds, and support inquiries directly using Spring Boot backend REST APIs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className={cardClass}>
                <h4 className="text-[10px] font-black uppercase text-slate-500 mb-1">Total Purchases</h4>
                <p className="text-2xl font-black text-white">₹17,449</p>
              </div>
              <div className={cardClass}>
                <h4 className="text-[10px] font-black uppercase text-slate-500 mb-1">VIP Tier</h4>
                <p className="text-2xl font-black text-white">Gold Tier</p>
              </div>
              <div className={cardClass}>
                <h4 className="text-[10px] font-black uppercase text-slate-500 mb-1">Active Orders</h4>
                <p className="text-2xl font-black text-white">1 Shipped</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="space-y-6">
            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4 font-bold">Browse Store Products</h3>
              <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">
                Explore our catalog. Click the heart icon to save products directly to your wishlist database!
              </p>
              {productsList.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                  <p className="text-xs text-slate-500 font-bold uppercase">No products cataloged yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {productsList.map((p: any) => {
                    const isWishlisted = wishlist.includes(p.id);
                    const parsed = parseDesc(p.description);
                    return (
                      <div key={p.id} className="flex flex-col justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition duration-300">
                        <div className="aspect-[3/4] w-full overflow-hidden bg-slate-900 rounded-xl relative border border-white/5">
                          {p.imageUrl && (
                            <img src={p.imageUrl} className="w-full h-full object-cover" alt={p.name} />
                          )}
                          <button
                            onClick={() => removeWishlist(p.id!)}
                            className="absolute top-2.5 right-2.5 bg-slate-955/80 hover:bg-slate-900/90 text-white w-7 h-7 rounded-full flex items-center justify-center border border-white/10 transition cursor-pointer"
                          >
                            <span className="text-xs">{isWishlisted ? '❤️' : '🖤'}</span>
                          </button>
                        </div>
                        <div className="mt-4 space-y-1.5">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400">{p.category || category.toUpperCase()}</span>
                            <span className="text-xs font-black text-white">₹{p.price}</span>
                          </div>
                          <h4 className="text-xs font-black text-white truncate uppercase tracking-wider">{p.name}</h4>
                          <p className="text-[10px] text-slate-400 line-clamp-2 min-h-[30px] leading-relaxed">{parsed.text}</p>
                          
                          {/* Niche Specific Badges */}
                          {Object.keys(parsed.nicheFields).length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {parsed.nicheFields.brand && (
                                <span className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-bold text-slate-300 border border-white/5">{parsed.nicheFields.brand}</span>
                              )}
                              {parsed.nicheFields.organic && (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-[8px] font-black text-emerald-400 border border-emerald-500/20">Organic</span>
                              )}
                              {parsed.nicheFields.prescriptionRequired && (
                                <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-[8px] font-black text-rose-455 border border-rose-500/20">Rx Only</span>
                              )}
                              {parsed.nicheFields.weight && (
                                <span className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-bold text-slate-400 border border-white/5">{parsed.nicheFields.weight}{parsed.nicheFields.unit || 'g'}</span>
                              )}
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2">
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${p.stock === 0 ? 'bg-rose-500/10 text-rose-400' : 'bg-green-500/10 text-green-400'}`}>
                              {p.stock === 0 ? 'Out of Stock' : `${p.stock} units`}
                            </span>
                            <button
                              type="button"
                              onClick={() => openProductPurchaseModal(p)}
                              disabled={p.stock === 0}
                              className="px-3 py-1 bg-indigo-650 hover:bg-indigo-700 disabled:opacity-50 text-[9px] font-black text-white uppercase tracking-widest rounded-lg transition cursor-pointer"
                            >
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className={cardClass}>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4 font-bold text-white">All Store Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-500 font-black uppercase text-[10px]">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Fulfillment Date</th>
                    <th className="pb-3">Items Ordered</th>
                    <th className="pb-3">Total Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-semibold text-slate-355">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-white/[0.01]">
                      <td className="py-3.5 text-white">{order.id}</td>
                      <td className="py-3.5">{order.date}</td>
                      <td className="py-3.5">{order.items}</td>
                      <td className="py-3.5 text-white">{order.total}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                          order.status === 'Delivered' ? 'bg-green-500/10 text-green-400' :
                          order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className={cardClass}>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Your Saved Favorites</h3>
            {wishlistedItems.length === 0 ? (
              <p className="text-xs text-slate-450 font-bold">Wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistedItems.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-center p-3 rounded-xl bg-white/5 border border-white/5">
                    {item.imageUrl && (
                      <img src={item.imageUrl} className="w-16 h-16 object-cover rounded-lg bg-slate-900 border border-white/5" />
                    )}
                    <div className="flex-grow">
                      <h4 className="text-xs font-black text-white truncate max-w-[200px]">{item.name}</h4>
                      <p className="text-[10px] text-white font-bold">₹{item.price}</p>
                    </div>
                    <button onClick={() => removeWishlist(item.id)} className="text-xs font-bold text-rose-400 hover:underline cursor-pointer">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[24px] p-8 text-white flex flex-col justify-between min-h-[180px] shadow-xl" style={{ backgroundColor: primaryColor }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider">{category.toUpperCase()} VIP CARD</h3>
                  <p className="text-[9px] opacity-60">Loyalty Rewards Program</p>
                </div>
                <span className="text-3xl">{logoIcon}</span>
              </div>
              <div className="relative z-10 flex justify-between items-end mt-4">
                <div>
                  <p className="text-[8px] opacity-50 uppercase tracking-widest">Card Holder</p>
                  <p className="text-xs font-bold">{profile.name}</p>
                </div>
                <div>
                  <p className="text-[8px] opacity-50 uppercase tracking-widest text-right">Points Balance</p>
                  <p className="text-sm font-black">1,250 PTS</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className={cardClass}>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Shipping & Account Settings</h3>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                  <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Phone</label>
                  <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Shipping Address</label>
                <input type="text" value={profile.shippingAddress} onChange={(e) => setProfile({ ...profile, shippingAddress: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">City</label>
                  <input type="text" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">State</label>
                  <input type="text" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">ZIP</label>
                  <input type="text" value={profile.zip} onChange={(e) => setProfile({ ...profile, zip: e.target.value })} className={inputClass} />
                </div>
              </div>
              <button type="submit" className="px-4 py-2 rounded-xl text-xs font-black text-white uppercase tracking-wider hover:opacity-90 transition cursor-pointer" style={{ backgroundColor: primaryColor }}>
                Update Profile Book
              </button>
            </form>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3 font-semibold text-xs leading-relaxed">
                <div>
                  <h4 className="text-white uppercase font-black text-[11px] mb-1">How can I modify shipping address?</h4>
                  <p className="text-slate-450">Navigate to the Address Book tab to modify any pending shipping details before product dispatch.</p>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <h4 className="text-white uppercase font-black text-[11px] mb-1">What courier shipping services do you use?</h4>
                  <p className="text-slate-455">We partner with Express FedEx and DHL networks to deliver within 2-4 business days.</p>
                </div>
              </div>
            </div>

            <div className={`${cardClass} flex flex-col justify-between`}>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Store Support Messenger</h3>
                <div className="h-44 overflow-y-auto border border-white/5 bg-white/[0.02] rounded-xl p-3 space-y-2 mb-4">
                  {supportChat.length === 0 && (
                    <p className="text-[11px] text-slate-500 text-center font-bold mt-12">Submit a message to connect with verified helpdesk.</p>
                  )}
                  {supportChat.map((chat: any, idx) => (
                    <div key={idx} className={`text-xs p-2.5 rounded-xl max-w-[80%] ${chat.sender === 'user' ? 'bg-indigo-650 text-white ml-auto' : 'bg-slate-800 text-slate-350 mr-auto border border-white/5'}`}>
                      {chat.text}
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSupportSend} className="flex gap-2">
                <input type="text" placeholder="Type support inquiry..." value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} className={inputClass} />
                <button type="submit" className="px-4 py-2 text-xs font-black text-white uppercase tracking-wider rounded-xl hover:opacity-90 transition cursor-pointer" style={{ backgroundColor: primaryColor }}>Send</button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Product Detail & Purchase Selection Modal */}
      {isProductModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
          <div className={`w-full max-w-2xl rounded-3xl p-6 border shadow-2xl relative flex flex-col md:flex-row gap-6 my-8 ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-white/10 text-white'}`}>
            <button onClick={() => setIsProductModalOpen(false)} className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-white bg-white/5 w-6 h-6 rounded-full flex items-center justify-center transition cursor-pointer">✕</button>
            <div className="w-full md:w-1/2 aspect-square md:aspect-[3/4] overflow-hidden bg-slate-955 rounded-2xl border border-white/5 self-start">
              <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400">{selectedProduct.category || category.toUpperCase()}</span>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">{selectedProduct.name}</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">{activeProductDetails.text}</p>
                <div className="text-sm font-black text-white">₹{selectedProduct.price}</div>
                
                {/* Variant Selections (Conditional fashion sizes/colors) */}
                {category.toLowerCase().includes('fashion') && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400">Select Size</label>
                      <div className="flex gap-2">
                        {['S', 'M', 'L', 'XL'].map(sz => (
                          <button key={sz} type="button" onClick={() => setSelectedSize(sz)} className={`w-7 h-7 rounded-lg text-[10px] font-bold border transition flex items-center justify-center cursor-pointer ${selectedSize === sz ? 'bg-indigo-650 text-white border-indigo-650 font-bold' : 'bg-white/5 border-white/10 text-slate-400 hover:border-slate-405'}`}>{sz}</button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400">Select Color</label>
                      <div className="flex gap-2">
                        {['Indigo', 'Slate', 'Sage'].map(cl => (
                          <button key={cl} type="button" onClick={() => setSelectedColor(cl)} className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border transition flex items-center justify-center cursor-pointer ${selectedColor === cl ? 'bg-indigo-650 text-white border-indigo-650 font-bold' : 'bg-white/5 border-white/10 text-slate-400 hover:border-slate-405'}`}>{cl}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Technical Specifications Grid / Niche Details List */}
                {Object.keys(activeProductDetails.nicheFields).length > 0 && (
                  <div className="border border-white/5 rounded-2xl p-3 bg-white/[0.01] space-y-2">
                    <h5 className="text-[9px] font-black uppercase text-indigo-400 tracking-wider">Specifications</h5>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                      {Object.entries(activeProductDetails.nicheFields).map(([key, value]) => {
                        if (value === null || value === '' || value === undefined) return null;
                        const label = key.replace(/([A-Z])/g, ' $1');
                        return (
                          <div key={key} className="border-b border-white/5 pb-1">
                            <span className="text-slate-450 block capitalize text-[8px]">{label}:</span>
                            <span className="text-white truncate block">{value === true ? 'Yes' : value === false ? 'No' : String(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Quantity</label>
                  <div className="flex items-center gap-2.5">
                    <button type="button" onClick={() => setProductQuantity(prev => Math.max(1, prev - 1))} className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/10 flex items-center justify-center cursor-pointer">-</button>
                    <span className="text-xs font-bold text-white">{productQuantity}</span>
                    <button type="button" onClick={() => setProductQuantity(prev => prev + 1)} className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/10 flex items-center justify-center cursor-pointer">+</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <button type="button" onClick={handleAddToCart} className="w-full py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-black uppercase tracking-wider rounded-xl transition cursor-pointer">Add to Bag</button>
                <button type="button" onClick={handleBuyNow} className="w-full py-2 bg-indigo-650 hover:bg-indigo-705 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition cursor-pointer">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && cart.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
          <div className={`w-full max-w-2xl rounded-[32px] p-6 border shadow-2xl relative my-8 ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-white/10 text-white'}`}>
            <button type="button" onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-white bg-white/5 w-6 h-6 rounded-full flex items-center justify-center transition cursor-pointer">✕</button>
            <h2 className="text-sm font-black uppercase tracking-wider mb-4 border-b border-white/5 pb-2 text-white">🛍️ Order Checkout</h2>
            
            <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Details */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase text-slate-500">Shipping Destination</h4>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Recipient Name</label>
                  <input type="text" value={checkoutName} onChange={(e) => setCheckoutName(e.target.value)} className={inputClass} required />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Contact Phone</label>
                  <input type="text" value={checkoutPhone} onChange={(e) => setCheckoutPhone(e.target.value)} className={inputClass} required />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Street Address</label>
                  <input type="text" value={checkoutAddress} onChange={(e) => setCheckoutAddress(e.target.value)} className={inputClass} required />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">City</label>
                    <input type="text" value={checkoutCity} onChange={(e) => setCheckoutCity(e.target.value)} className={inputClass} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">State</label>
                    <input type="text" value={checkoutState} onChange={(e) => setCheckoutState(e.target.value)} className={inputClass} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">Pincode</label>
                    <input type="text" value={checkoutPincode} onChange={(e) => setCheckoutPincode(e.target.value)} className={inputClass} required />
                  </div>
                </div>
                {/* Gateway */}
                <div className="space-y-1 pt-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Payment Method</label>
                  <div className="flex gap-4">
                    {['UPI', 'COD', 'Card'].map(gw => (
                      <label key={gw} className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-slate-400 hover:text-white">
                        <input type="radio" name="checkoutGateway" value={gw} checked={checkoutGateway === gw} onChange={() => setCheckoutGateway(gw)} className="accent-indigo-600" />
                        <span>{gw}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary and Submission */}
              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-slate-500">Order Summary</h4>
                  <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-center p-2 rounded-xl bg-white/5 border border-white/5">
                        <img src={item.product.imageUrl} className="w-10 h-10 object-cover rounded-lg border border-white/5 bg-slate-955" alt="summary item" />
                        <div className="flex-grow">
                          <h5 className="text-[10px] font-black text-white truncate max-w-[120px]">{item.product.name}</h5>
                          <p className="text-[9px] text-slate-400 font-bold">Qty: {item.quantity} | Size: {item.size}</p>
                        </div>
                        <span className="text-[10px] font-black text-white">₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

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
                  <button
                    type="submit"
                    disabled={isPlacingOrder}
                    className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 disabled:opacity-50 text-xs font-black uppercase text-white tracking-widest rounded-xl transition cursor-pointer font-bold"
                  >
                    {isPlacingOrder ? 'Processing Payment...' : 'Confirm and Place Order'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Celebration Modal */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className={`w-full max-w-sm rounded-[32px] p-6 border shadow-2xl text-center space-y-4 ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-white/10 text-white'}`}>
            <span className="text-4xl inline-block animate-bounce">🎉</span>
            <h3 className="text-base font-black uppercase tracking-wider text-white">Order Confirmed!</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your order has been registered in the database inventory manifest.
            </p>
            <div className="p-3 bg-white/5 border border-white/5 rounded-2xl inline-block">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Tracking Manifest</span>
              <span className="text-xs font-black text-indigo-400">{successOrderId}</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setIsSuccessOpen(false);
                  setActiveTab('orders');
                }}
                className="px-6 py-2 bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition cursor-pointer"
              >
                Go to My Orders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
