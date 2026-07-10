'use client';
import React, { useState } from 'react';

export default function CustomerDashboard({ projectId, projectConfig, customerSession, onLogout, setActiveView, addToast }: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const primaryColor = projectConfig?.themeColor || '#16a34a';
  const logoIcon = projectConfig?.logoIcon || '🍎';

  const category = 'grocery';
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
  const [supportChat, setSupportChat] = useState([]);

  const handleSupportSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    const userMsg = supportMessage;
    setSupportChat(prev => [...prev, { sender: 'user', text: userMsg }]);
    setSupportMessage('');
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: 'bot', text: 'Thank you for reaching out. A support coordinator from the Grocery & Organic team has been notified.' }]);
    }, 1000);
  };

  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Premium Niche Collection Item A', price: '₹1,850', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=60' },
    { id: 2, name: 'Specialty Curated Selection B', price: '₹3,400', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=60' }
  ]);

  const removeWishlist = (id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
    if (typeof addToast === 'function') addToast('Item removed from wishlist.');
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof addToast === 'function') addToast('Profile details updated successfully.');
  };

  const cardClass = `rounded-2xl p-6 border transition duration-300 ${isLight ? 'bg-white border-slate-200 shadow-sm text-slate-800' : 'bg-slate-900 border-white/5 text-white shadow-lg'}`;
  const inputClass = `w-full px-3 py-2 rounded-xl text-xs focus:outline-none border transition ${isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-slate-400' : 'bg-white/5 border-white/10 text-white focus:border-indigo-500'}`;

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-955 text-white'}`}>
      {/* Sidebar navigation */}
      <aside className={`w-64 p-5 border-r shrink-0 flex flex-col ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-white/5'}`}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <span className="text-2xl p-1 bg-white/5 border border-white/10 rounded-lg">{logoIcon}</span>
          <div>
            <h2 className="text-xs font-black uppercase tracking-tight">Customer Portal</h2>
            <p className="text-[9px] text-slate-500 font-bold truncate max-w-[130px]">{customerSession?.email || 'customer@gmail.com'}</p>
          </div>
        </div>

        <nav className="space-y-1 flex-grow">
          {[
            { id: 'overview', label: '📊 Overview' },
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
          <button onClick={() => setActiveView('landing')} className="text-xs font-bold text-slate-400 hover:text-white transition">← Back to Shop</button>
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

        {activeTab === 'orders' && (
          <div className={cardClass}>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">All Store Orders</h3>
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
                <tbody className="divide-y divide-white/5 font-semibold text-slate-300">
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
                          'bg-slate-500/10 text-slate-400'
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
            {wishlist.length === 0 ? (
              <p className="text-xs text-slate-450 font-bold">Wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlist.map(item => (
                  <div key={item.id} className="flex gap-4 items-center p-3 rounded-xl bg-white/5 border border-white/5">
                    <img src={item.img} className="w-16 h-16 object-cover rounded-lg bg-slate-900 border border-white/5" />
                    <div className="flex-grow">
                      <h4 className="text-xs font-black text-white truncate max-w-[200px]">{item.name}</h4>
                      <p className="text-[10px] text-white font-bold">{item.price}</p>
                    </div>
                    <button onClick={() => removeWishlist(item.id)} className="text-xs font-bold text-rose-400 hover:underline">Remove</button>
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
                  <h3 className="text-sm font-black uppercase tracking-wider">Grocery & Organic VIP VIP CARD</h3>
                  <p className="text-[9px] opacity-60">Loyalty Rewards Program</p>
                </div>
                <span className="text-3xl">{logoIcon}</span>
              </div>
              <div className="relative z-10 mt-6">
                <span className="text-[10px] uppercase opacity-75">Available Wallet Points Balance</span>
                <p className="text-3xl font-black">1,250 Points</p>
              </div>
            </div>

            <div className={cardClass}>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Transaction Rewards Log</h3>
              <div className="space-y-3 font-semibold text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Sign-Up Bonus Credit</span>
                  <span className="text-green-400">+500 pts</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Order Placement Rewards (#ORD-9041)</span>
                  <span className="text-green-400">+750 pts</span>
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
                  <p className="text-slate-400">Navigate to the Address Book tab to modify any pending shipping details before product dispatch.</p>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <h4 className="text-white uppercase font-black text-[11px] mb-1">What courier shipping services do you use?</h4>
                  <p className="text-slate-400">We partner with Express FedEx and Delhivery networks to deliver within 2-4 business days.</p>
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
    </div>
  );
}
