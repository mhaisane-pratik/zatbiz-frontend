'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, getRandomFoodImage } from '@/services/api';
import { Project, Product } from '@/types';
import { useFileEncoder } from '@/hooks/useFileEncoder';
import { useDarkMode } from '@/hooks/useDarkMode';

import {
  UserProfilePanel,
  UserOrdersPanel,
  UserWishlistPanel,
  UserAddressPanel,
  UserCouponsPanel,
  UserNotificationsPanel,
} from '../UserPanels';

import {
  AdminOverviewPanel,
  AdminProductsPanel,
  AdminCategoriesBrandsPanel,
  AdminOrdersPanel,
  AdminCustomersPanel,
  AdminInventoryPanel,
  AdminCouponsPanel,
  AdminReportsPanel,
  AdminSettingsPanel,
} from '../AdminPanels';

import { StorefrontEditorPanel } from '../StorefrontEditorPanel';

interface EcommerceDashboardProps {
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

export default function EcommerceDashboard({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  setCompanyName,
  logoIcon,
  logoUrl,
  shopNiche,
}: EcommerceDashboardProps) {
  const { encodeFile } = useFileEncoder();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [walletBalance, setWalletBalance] = useState<number>(1250);

  // Core Database States
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [couponsList, setCouponsList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [brandsList, setBrandsList] = useState<any[]>([]);
  const [customersList, setCustomersList] = useState<any[]>([]);
  const [storeSettings, setStoreSettings] = useState<any>({
    storeName: companyName || 'My Shop',
    logoUrl: logoUrl || '',
    taxRate: 18.0,
    shippingFee: 0.0,
    enableUpi: true,
    enableCard: true,
    enableCod: true
  });

  // User States
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userAddressHome, setUserAddressHome] = useState('Flat 402, Skyline Towers, Sector 62, Noida, UP');
  const [userAddressWork, setUserAddressWork] = useState('ZATBIZ Tech Labs, Block C, Phase 3, Bangalore, KA');

  // Visual Editor State
  const [editHeroTitle, setEditHeroTitle] = useState('');
  const [editHeroSubtitle, setEditHeroSubtitle] = useState('');
  const [editHeroImage, setEditHeroImage] = useState('');
  const [editProductsTitle, setEditProductsTitle] = useState('');
  const [editProductsSubtitle, setEditProductsSubtitle] = useState('');
  const [editFooterText, setEditFooterText] = useState('');
  const [isSavingBlocks, setIsSavingBlocks] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Alice Merchant', text: 'Hey there! Is our CRM synced with the PostgreSQL database?', time: '10:30 AM', isAdmin: false },
    { id: 2, sender: 'You', text: 'Yes Alice, all Spring Boot REST endpoints are functioning!', time: '10:32 AM', isAdmin: true },
    { id: 3, sender: 'Alice Merchant', text: 'Fantastic! Can we test the video call feature soon?', time: '10:33 AM', isAdmin: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [activeChatUser, setActiveChatUser] = useState('Alice Merchant');

  // Video Call State
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // CRM State
  const [crmLeads, setCrmLeads] = useState([
    { id: 1, client: 'Royal Bistro Cafe', project: 'Menu Ordering & POS', value: 4500, stage: 'Leads', phone: '+91 98765 43210' },
    { id: 2, client: 'Spark Shop Ltd', project: 'Retail Shop & Invoicing', value: 8900, stage: 'Proposal Sent', phone: '+91 99999 88888' },
    { id: 3, client: 'Apex Academy', project: 'LMS Portal', value: 12000, stage: 'Won / Contracted', phone: '+91 95555 12345' },
    { id: 4, client: 'Metropolitan Hospital', project: 'Doctor Scheduling System', value: 15000, stage: 'Leads', phone: '+91 88888 77777' }
  ]);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadProject, setNewLeadProject] = useState('');
  const [newLeadValue, setNewLeadValue] = useState('');

  // ERP Inventory State
  const [erpInventory, setErpInventory] = useState<any[]>([]);

  // Books Ledger State
  const [booksLedger, setBooksLedger] = useState([
    { id: 'INV-1001', description: 'POS Software License', amount: 4500, type: 'Income', date: '2026-06-05', status: 'Cleared' },
    { id: 'INV-1002', description: 'Server Hosting (AWS)', amount: 1200, type: 'Expense', date: '2026-06-04', status: 'Cleared' },
    { id: 'INV-1003', description: 'Custom Domain Registration', amount: 500, type: 'Expense', date: '2026-06-03', status: 'Cleared' },
    { id: 'INV-1004', description: 'UI Design Consulting Payment', amount: 8900, type: 'Income', date: '2026-06-01', status: 'Cleared' }
  ]);
  const [bookDesc, setBookDesc] = useState('');
  const [bookAmount, setBookAmount] = useState('');
  const [bookType, setBookType] = useState<'Income' | 'Expense'>('Income');

  // Custom metric states
  const [dashboardTitle, setDashboardTitle] = useState('Administration Summary');
  const [metric1Title, setMetric1Title] = useState('Total Revenue');
  const [metric1Value, setMetric1Value] = useState('$5,824.00');
  const [metric1Trend, setMetric1Trend] = useState('▲ 14.2% since yesterday');
  const [metric2Title, setMetric2Title] = useState('Active Sales');
  const [metric2Value, setMetric2Value] = useState('244 units');
  const [metric2Trend, setMetric2Trend] = useState('Full database synced');
  const [metric3Title, setMetric3Title] = useState('Inventory Alert');
  const [metric3Value, setMetric3Value] = useState('3 low items');
  const [metric3Trend, setMetric3Trend] = useState('Restock recommended');

  const fetchDbProducts = () => {
    api.products.list(projectId)
      .then(setProducts)
      .catch((err) => console.error('Error fetching database products:', err));
  };

  const fetchOrders = () => {
    if (clientEmail === 'admin@gmail.com') {
      api.orders.list(projectId)
        .then(setOrders)
        .catch((err) => console.error('Error fetching admin orders:', err));
    } else {
      const clientId = localStorage.getItem('clientId');
      if (clientId) {
        api.orders.listForCustomer(projectId, parseInt(clientId, 10))
          .then(setOrders)
          .catch((err) => console.error('Error fetching customer orders:', err));
      }
    }
  };

  const fetchAdminResources = () => {
    fetchDbProducts();
    fetchOrders();
    
    api.settings.get(projectId)
      .then((settings) => {
        if (settings) setStoreSettings(settings);
      }).catch(console.error);

    api.coupons.list(projectId).then(setCouponsList).catch(console.error);
    api.categories.list(projectId).then(setCategoriesList).catch(console.error);
    api.brands.list(projectId).then(setBrandsList).catch(console.error);
    api.customers.list(projectId).then(setCustomersList).catch(console.error);
  };

  useEffect(() => {
    if (clientEmail === 'admin@gmail.com') {
      setActiveTab('overview');
      fetchAdminResources();
    } else {
      if (shopNiche === 'fashion_men') {
        setActiveTab('overview');
      } else {
        setActiveTab('orders');
      }
      const cachedName = localStorage.getItem('clientName');
      const cachedPhone = localStorage.getItem('clientPhone');
      const cachedAddress = localStorage.getItem('clientAddress');
      if (cachedName) setUserName(cachedName);
      if (cachedPhone) setUserPhone(cachedPhone);
      if (cachedAddress) setUserAddressHome(cachedAddress);
      fetchDbProducts();
      fetchOrders();
    }
  }, [projectId, clientEmail]);

  useEffect(() => {
    if (products.length > 0 && wishlist.length === 0) {
      setWishlist(products.slice(0, 2));
    }
    
    // Seed ERP inventory from products
    if (products.length > 0) {
      const mapped = products.map((p, index) => ({
        id: p.id || index,
        name: p.name,
        sku: `SKU-${p.name.slice(0, 3).toUpperCase()}-${index + 10}`,
        stock: p.stock || 15,
        location: `Aisle ${(index % 4) + 1}, Row ${String.fromCharCode(65 + (index % 3))}`
      }));
      setErpInventory(mapped);
    }
  }, [products]);

  // Load block settings
  useEffect(() => {
    try {
      const parsed = JSON.parse(project.blocksJson || '[]');
      const blocks = Array.isArray(parsed) ? parsed : Object.values(parsed.pages || {}).flat() as any[];
      
      const dashBlock = blocks.find((b: any) => b.type === 'dashboard_config');
      if (dashBlock && dashBlock.content) {
        const dc = dashBlock.content;
        if (dc.title) setDashboardTitle(dc.title);
        if (dc.metric1Title) setMetric1Title(dc.metric1Title);
        if (dc.metric1Value) setMetric1Value(dc.metric1Value);
        if (dc.metric1Trend) setMetric1Trend(dc.metric1Trend);
        if (dc.metric2Title) setMetric2Title(dc.metric2Title);
        if (dc.metric2Value) setMetric2Value(dc.metric2Value);
        if (dc.metric2Trend) setMetric2Trend(dc.metric2Trend);
        if (dc.metric3Title) setMetric3Title(dc.metric3Title);
        if (dc.metric3Value) setMetric3Value(dc.metric3Value);
        if (dc.metric3Trend) setMetric3Trend(dc.metric3Trend);
      }

      const heroBlock = blocks.find((b: any) => b.type === 'hero');
      if (heroBlock && heroBlock.content) {
        setEditHeroTitle(heroBlock.content.title || '');
        setEditHeroSubtitle(heroBlock.content.subtitle || '');
        setEditHeroImage(heroBlock.content.imageUrl || '');
      }

      const productsBlock = blocks.find((b: any) => b.type === 'products');
      if (productsBlock && productsBlock.content) {
        setEditProductsTitle(productsBlock.content.title || '');
        setEditProductsSubtitle(productsBlock.content.subtitle || '');
      }

      const footerBlock = blocks.find((b: any) => b.type === 'footer');
      if (footerBlock && footerBlock.content) {
        setEditFooterText(footerBlock.content.text || '');
      }
    } catch (e) {
      console.error(e);
    }
  }, [project]);

  // Profile Edit
  const handleSaveProfileChanges = async () => {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) return;
    try {
      await api.customers.update(parseInt(clientId, 10), {
        name: userName,
        phone: userPhone,
        address: userAddressHome
      });
      localStorage.setItem('clientName', userName);
      localStorage.setItem('clientPhone', userPhone);
      localStorage.setItem('clientAddress', userAddressHome);
      alert('Profile details updated in PostgreSQL!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  // Chat send
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAdmin: true
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: activeChatUser,
          text: `Thanks for contacting us! We received your message: "${newMsg.text}"`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAdmin: false
        }
      ]);
    }, 1200);
  };

  // CRM advancing
  const handleAdvanceCrmStage = (id: number) => {
    setCrmLeads(prev =>
      prev.map(lead => {
        if (lead.id === id) {
          const nextStage = lead.stage === 'Leads' ? 'Proposal Sent' : 'Won / Contracted';
          return { ...lead, stage: nextStage };
        }
        return lead;
      })
    );
  };

  const handleAddCrmLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadProject || !newLeadValue) return;
    setCrmLeads(prev => [
      ...prev,
      {
        id: Date.now(),
        client: newLeadName,
        project: newLeadProject,
        value: parseFloat(newLeadValue) || 1000,
        stage: 'Leads',
        phone: '+91 99999 88888'
      }
    ]);
    setNewLeadName('');
    setNewLeadProject('');
    setNewLeadValue('');
  };

  // ERP Adjustment
  const handleAdjustErpStock = (id: number, delta: number) => {
    setErpInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStock = Math.max(0, item.stock + delta);
          return { ...item, stock: nextStock };
        }
        return item;
      })
    );
  };

  // Books
  const handleAddBookTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookDesc || !bookAmount) return;
    setBooksLedger(prev => [
      ...prev,
      {
        id: `INV-${Date.now().toString().slice(-4)}`,
        description: bookDesc,
        amount: parseFloat(bookAmount) || 0,
        type: bookType,
        date: new Date().toISOString().split('T')[0],
        status: 'Cleared'
      }
    ]);
    setBookDesc('');
    setBookAmount('');
  };

  const netBooksRevenue = booksLedger.reduce((sum, tx) => {
    return tx.type === 'Income' ? sum + tx.amount : sum - tx.amount;
  }, 0);

  // Blocks Save
  const handleSaveBlocks = async () => {
    setIsSavingBlocks(true);
    try {
      const parsed = JSON.parse(project.blocksJson || '[]');
      const blocks = Array.isArray(parsed) ? parsed : [];
      
      const updated = blocks.map((b: any) => {
        if (b.type === 'hero') {
          b.content = { ...b.content, title: editHeroTitle, subtitle: editHeroSubtitle, imageUrl: editHeroImage };
        }
        if (b.type === 'products') {
          b.content = { ...b.content, title: editProductsTitle, subtitle: editProductsSubtitle };
        }
        if (b.type === 'footer') {
          b.content = { ...b.content, text: editFooterText };
        }
        return b;
      });

      await api.projects.update(projectId, {
        ...project,
        blocksJson: JSON.stringify(updated)
      });
      alert('Blocks updated successfully in postgres database!');
    } catch (e) {
      console.error(e);
      alert('Failed to save blocks.');
    } finally {
      setIsSavingBlocks(false);
    }
  };

  const handleSaveLandingPage = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveBlocks();
  };

  const renderChatPanel = () => (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex h-[500px]">
      <div className="w-64 border-r border-slate-100 bg-slate-50/50 p-4 space-y-4">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conversations</h4>
        <div className="space-y-1">
          {[
            { name: 'Alice Merchant', status: 'Active', avatar: '👩‍💼', preview: 'Fantastic! Can we test...' },
            { name: 'Bob Dealer', status: 'Idle', avatar: '👨‍💼', preview: 'DNS CNAMES are active' },
            { name: 'Charlie Dean', status: 'Offline', avatar: '👨‍🎓', preview: 'Payment was cleared' }
          ].map((usr) => (
            <button
              key={usr.name}
              onClick={() => setActiveChatUser(usr.name)}
              className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition text-left cursor-pointer ${
                activeChatUser === usr.name ? 'bg-white shadow-sm border border-slate-150' : 'hover:bg-slate-100/50'
              }`}
            >
              <span className="text-xl">{usr.avatar}</span>
              <div className="truncate flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-xs block">{usr.name}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${usr.status === 'Active' ? 'bg-emerald-500' : usr.status === 'Idle' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                </div>
                <span className="text-[9px] text-slate-400 font-semibold block truncate mt-0.5">{usr.preview}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between bg-white">
        <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-800 text-xs">{activeChatUser}</span>
          </div>
          <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">Customer Support</span>
        </header>
        <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[350px]">
          {chatMessages.filter(msg => msg.isAdmin || msg.sender === activeChatUser).map((msg) => (
            <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3.5 rounded-2xl shadow-sm text-xs leading-relaxed ${
                msg.isAdmin ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                <p className="font-semibold">{msg.text}</p>
                <span className={`text-[8px] mt-1 block text-right ${msg.isAdmin ? 'text-indigo-200' : 'text-slate-400'}`}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendChatMessage} className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={`Type a reply to ${activeChatUser}...`}
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 transition shadow-inner"
          />
          <button type="submit" className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer border-none">
            Send
          </button>
        </form>
      </div>
    </div>
  );

  const renderVideoCallPanel = () => (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-2xl p-6 relative flex flex-col justify-between h-[520px]">
        <div className="absolute top-4 left-6 z-25 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-[10px] text-white">
          <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          <span className="font-bold">Live Consultation Portal</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[380px] pt-8">
          <div className="bg-slate-800/80 border border-white/5 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center shadow-lg">
            {isVideoMuted ? (
              <div className="text-center space-y-2">
                <span className="text-3xl block">👤</span>
                <span className="text-[10px] text-white/50 font-bold uppercase">Camera Off</span>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-indigo-950/40 via-slate-850 to-indigo-900/30 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_100%)] animate-pulse" />
                <span className="text-4xl animate-bounce">⚡</span>
                <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-0.5 rounded text-[8px] text-white font-semibold">You (Admin)</div>
              </div>
            )}
            {isAudioMuted && <div className="absolute top-3 right-3 bg-rose-500 text-white rounded-full p-1 text-[8px]">🔇</div>}
          </div>
          <div className="bg-slate-800/80 border border-white/5 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center shadow-lg">
            <div className="w-full h-full bg-gradient-to-tr from-purple-950/40 via-slate-850 to-purple-900/30 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0,transparent_100%)] animate-pulse" />
              <span className="text-4xl">👩‍💼</span>
              <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-0.5 rounded text-[8px] text-white font-semibold">{activeChatUser}</div>
            </div>
          </div>
          <div className="bg-slate-800/80 border border-white/5 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center shadow-lg">
            {isScreenSharing ? (
              <div className="w-full h-full bg-slate-950 p-4 flex flex-col justify-between">
                <div className="border border-white/10 bg-white/5 rounded-lg p-2.5 flex-1 flex flex-col justify-center items-center text-center">
                  <span className="text-2xl mb-1">🖥️</span>
                  <span className="text-[10px] text-white font-bold block">{companyName} Landing Layout</span>
                  <span className="text-[8px] text-indigo-400 mt-1 uppercase font-semibold">Simulated Screen Share</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-0.5 rounded text-[8px] text-white font-semibold">Screen Stream</div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <span className="text-3xl block">🖥️</span>
                <span className="text-[10px] text-white/50 font-bold uppercase">Screen Not Shared</span>
              </div>
            )}
          </div>
        </div>
        <div className="bg-slate-850 border border-white/10 p-3.5 rounded-2xl flex justify-center items-center gap-3 max-w-md mx-auto w-full">
          <button onClick={() => setIsAudioMuted(!isAudioMuted)} className={`p-2.5 rounded-full transition cursor-pointer text-xs border-none bg-transparent ${isAudioMuted ? 'bg-rose-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            {isAudioMuted ? '🎙️ Unmute' : '🎙️ Mute'}
          </button>
          <button onClick={() => setIsVideoMuted(!isVideoMuted)} className={`p-2.5 rounded-full transition cursor-pointer text-xs border-none bg-transparent ${isVideoMuted ? 'bg-rose-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            {isVideoMuted ? '📹 Start Video' : '📹 Stop Video'}
          </button>
          <button onClick={() => setIsScreenSharing(!isScreenSharing)} className={`p-2.5 rounded-full transition cursor-pointer text-xs border-none bg-transparent ${isScreenSharing ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            🖥️ Share Screen
          </button>
          <button onClick={() => alert('Simulated call ended.')} className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold transition cursor-pointer border-none">
            ❌ End Call
          </button>
        </div>
      </div>
    </div>
  );

  const renderCrmPanel = () => (
    <div className="space-y-8 animate-fade-in text-xs text-slate-800">
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold text-slate-900 uppercase mb-4">Register New CRM Client Lead</h3>
        <form onSubmit={handleAddCrmLead} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
            <input type="text" required value={newLeadName} onChange={(e) => setNewLeadName(e.target.value)} placeholder="e.g. Globex Holdings" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-650 transition" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Project Description</label>
            <input type="text" required value={newLeadProject} onChange={(e) => setNewLeadProject(e.target.value)} placeholder="e.g. Visual Web App" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-650 transition" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Lead Budget ($)</label>
            <input type="text" required value={newLeadValue} onChange={(e) => setNewLeadValue(e.target.value)} placeholder="e.g. 8500" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-650 transition" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow cursor-pointer border-none">
            Add Lead +
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['Leads', 'Proposal Sent', 'Won / Contracted'] as const).map((stage) => {
          const leadsInStage = crmLeads.filter((l) => l.stage === stage);
          return (
            <div key={stage} className="bg-slate-100/50 border border-slate-200 rounded-2xl p-5 flex flex-col space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                <span className="font-extrabold text-[10px] text-slate-500 uppercase tracking-wider">{stage}</span>
                <span className="bg-slate-200 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded-full">{leadsInStage.length}</span>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[350px]">
                {leadsInStage.length === 0 ? (
                  <span className="text-[10px] text-slate-400 italic block text-center py-4">No leads in pipeline</span>
                ) : (
                  leadsInStage.map((lead) => (
                    <div key={lead.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">{lead.client}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">{lead.project}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-indigo-650 text-xs">${lead.value.toLocaleString()}</span>
                        <span className="text-[9px] text-slate-400 font-bold">{lead.phone}</span>
                      </div>
                      {stage !== 'Won / Contracted' && (
                        <button onClick={() => handleAdvanceCrmStage(lead.id)} className="w-full mt-2 py-1.5 border border-indigo-100 text-[9px] font-bold text-indigo-600 rounded-lg hover:bg-indigo-50 transition cursor-pointer bg-white">
                          Advance Stage ➜
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderErpPanel = () => (
    <div className="space-y-8 animate-fade-in text-xs">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-900 uppercase">Warehouse ERP Inventory</h3>
          <span className="text-[9px] bg-slate-100 text-slate-550 px-2 py-0.5 rounded-full font-bold">Live database catalog metrics</span>
        </header>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
              <th className="p-4 pl-6">Product Item</th>
              <th className="p-4">SKU Code</th>
              <th className="p-4">Stock Levels</th>
              <th className="p-4">Warehouse Location</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {erpInventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="p-4 pl-6 font-bold text-slate-900">{item.name}</td>
                <td className="p-4 font-mono font-semibold text-slate-450">{item.sku}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.stock <= 5 ? 'bg-rose-500 animate-pulse' : item.stock <= 15 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-slate-800">{item.stock} units</span>
                    {item.stock <= 5 && <span className="text-[8px] bg-rose-50 text-rose-600 font-extrabold uppercase px-1 rounded">Critically Low</span>}
                  </div>
                </td>
                <td className="p-4 font-semibold text-slate-600">{item.location}</td>
                <td className="p-4 pr-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleAdjustErpStock(item.id, 10)} className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 rounded text-[9px] font-bold text-emerald-600 cursor-pointer transition border-none">
                      +10 Restock
                    </button>
                    <button onClick={() => handleAdjustErpStock(item.id, -1)} className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 rounded text-[9px] font-bold text-blue-600 cursor-pointer transition border-none">
                      -1 Ship Out
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBooksPanel = () => (
    <div className="space-y-8 animate-fade-in text-xs text-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Bookkeeper Balance</span>
          <h2 className="text-xl font-extrabold text-emerald-600">${netBooksRevenue.toLocaleString()}</h2>
          <span className="text-[8px] font-semibold text-slate-400 block mt-1">Simulated Net Profit Ledger</span>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Incomes</span>
          <h2 className="text-xl font-extrabold text-indigo-650">
            ${booksLedger.filter(tx => tx.type === 'Income').reduce((acc, tx) => acc + tx.amount, 0).toLocaleString()}
          </h2>
          <span className="text-[8px] font-semibold text-slate-400 block mt-1">Gross sales & contracts</span>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Gross Expenses</span>
          <h2 className="text-xl font-extrabold text-rose-600">
            ${booksLedger.filter(tx => tx.type === 'Expense').reduce((acc, tx) => acc + tx.amount, 0).toLocaleString()}
          </h2>
          <span className="text-[8px] font-semibold text-slate-400 block mt-1">Amazon hosting & domain costs</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase">Record New Entry</h3>
          <form onSubmit={handleAddBookTransaction} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
              <input type="text" required value={bookDesc} onChange={(e) => setBookDesc(e.target.value)} placeholder="e.g. Consulting Invoice #102" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-650 transition" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Transaction Amount ($)</label>
              <input type="text" required value={bookAmount} onChange={(e) => setBookAmount(e.target.value)} placeholder="e.g. 2500" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-650 transition" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Entry Type</label>
              <select value={bookType} onChange={(e) => setBookType(e.target.value as 'Income' | 'Expense')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:bg-white focus:border-indigo-650 transition">
                <option value="Income">💰 Income (Revenue)</option>
                <option value="Expense">💸 Expense (Cost)</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow cursor-pointer border-none">
              Record Transaction
            </button>
          </form>
        </div>
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">ID</th>
                <th className="p-4">Description</th>
                <th className="p-4">Type</th>
                <th className="p-4 pr-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {booksLedger.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50">
                  <td className="p-4 pl-6 font-mono font-bold text-slate-500">{tx.id}</td>
                  <td className="p-4 font-bold text-slate-800">{tx.description}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                      tx.type === 'Income' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>{tx.type}</span>
                  </td>
                  <td className={`p-4 pr-6 text-right font-extrabold ${tx.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {tx.type === 'Income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const isFashionMenCustomer = shopNiche === 'fashion_men' && clientEmail !== 'admin@gmail.com';

  if (isFashionMenCustomer) {
    return (
      <div className="flex flex-1 min-h-screen bg-slate-50 font-sans">
        {/* Left Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between border-r border-slate-800">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white tracking-tight">
                Closet<span className="text-[#6366f1]">.</span>
              </span>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'overview', label: '📊 Dashboard' },
                { id: 'orders', label: '📦 My Orders' },
                { id: 'wishlist', label: '❤️ Wishlist' },
                { id: 'address', label: '📍 My Addresses' },
                { id: 'profile', label: '👤 Profile' },
                { id: 'coupons', label: '🎫 Coupons' },
                { id: 'reviews', label: '⭐ Reviews' },
                { id: 'notifications', label: '🔔 Notifications' },
                { id: 'settings', label: '⚙️ Settings' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                    activeTab === item.id ? 'bg-[#6366f1] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-400 rounded-xl hover:text-white hover:bg-slate-800 transition text-left cursor-pointer border-none bg-transparent"
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-400 rounded-xl hover:bg-rose-955/30 hover:text-rose-300 transition text-left cursor-pointer border-none bg-transparent"
            >
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Conditional Sub-panel Rendering */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-left">
                {/* Dashboard Header */}
                <header className="flex justify-between items-center pb-6 border-b border-slate-200">
                  <div className="space-y-1">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Buyer Portal</p>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                      Welcome back, John Doe 👋
                    </h1>
                    <p className="text-xs text-slate-500 font-semibold">
                      Here's what's happening with your account today.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative p-2 bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer">
                      <span className="text-lg">🔔</span>
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white" />
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" 
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                      alt="Avatar"
                    />
                  </div>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { title: 'Orders', val: '12', desc: 'Total Orders', color: 'bg-white' },
                    { title: 'Wishlist', val: '8', desc: 'Saved Items', color: 'bg-white' },
                    { title: 'Coupons', val: '5', desc: 'Available', color: 'bg-white' }
                  ].map((stat, idx) => (
                    <div key={idx} className={`${stat.color} p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2`}>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.title}</p>
                      <h3 className="text-3xl font-black text-slate-900">{stat.val}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.desc}</p>
                    </div>
                  ))}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Wallet</p>
                      <h3 className="text-3xl font-black text-slate-900">₹{walletBalance.toLocaleString('en-IN')}</h3>
                    </div>
                    <button 
                      onClick={() => {
                        const amt = prompt('Enter amount to add to wallet (₹):', '500');
                        if (amt) {
                          const parsed = parseFloat(amt);
                          if (!isNaN(parsed) && parsed > 0) {
                            setWalletBalance(prev => prev + parsed);
                            alert(`Successfully added ₹${parsed} to your wallet!`);
                          }
                        }
                      }}
                      className="mt-3 w-full py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-xl shadow-md shadow-[#6366f1]/10 border-none cursor-pointer transition"
                    >
                      + Add Money
                    </button>
                  </div>
                </div>

                {/* Main section: Table & Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
                  {/* Recent Orders (col-span-8) */}
                  <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Recent Orders</h3>
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-bold text-[#6366f1] hover:text-[#4f46e5] bg-transparent border-none cursor-pointer"
                      >
                        View All Orders
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[9px] font-black uppercase text-slate-400">
                            <th className="py-3">Order ID</th>
                            <th className="py-3">Status</th>
                            <th className="py-3">Total Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-700">
                          {[
                            { id: 'CL12345', date: 'May 12, 2026', status: 'Delivered', price: 1299, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=80&auto=format&fit=crop&q=80', badge: 'bg-emerald-50 text-emerald-700' },
                            { id: 'CL12344', date: 'May 08, 2026', status: 'Shipped', price: 2598, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=80&auto=format&fit=crop&q=80', badge: 'bg-blue-50 text-blue-700' },
                            { id: 'CL12343', date: 'Apr 30, 2026', status: 'Processing', price: 1799, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&auto=format&fit=crop&q=80', badge: 'bg-amber-50 text-amber-700' },
                            { id: 'CL12342', date: 'Apr 28, 2026', status: 'Delivered', price: 1099, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&auto=format&fit=crop&q=80', badge: 'bg-emerald-50 text-emerald-700' }
                          ].map((ord, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition">
                              <td className="py-3.5 flex items-center gap-3">
                                <img src={ord.image} className="w-9 h-9 rounded-lg object-cover border border-slate-100 shadow-sm" alt="product" />
                                <div className="text-left">
                                  <p className="font-extrabold text-slate-900">{ord.id}</p>
                                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">{ord.date}</p>
                                </div>
                              </td>
                              <td className="py-3.5">
                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${ord.badge}`}>
                                  {ord.status}
                                </span>
                              </td>
                              <td className="py-3.5 font-black text-slate-900">
                                ₹{ord.price.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right column: Categories & Promo */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Top Categories Card */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Top Categories</h3>
                        <a href="#landing" className="text-[10px] font-bold text-[#6366f1] hover:text-[#4f46e5]">View All</a>
                      </div>
                      <div className="space-y-4">
                        {[
                          { name: 'T-Shirts', count: '120 items', pct: 'w-[75%]', color: 'bg-[#6366f1]', icon: '👕' },
                          { name: 'Dresses', count: '85 items', pct: 'w-[55%]', color: 'bg-[#6366f1]', icon: '👗' },
                          { name: 'Jackets', count: '50 items', pct: 'w-[35%]', color: 'bg-[#6366f1]', icon: '🧥' },
                          { name: 'Shoes', count: '45 items', pct: 'w-[30%]', color: 'bg-[#6366f1]', icon: '👟' }
                        ].map((cat, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                              <span className="flex items-center gap-1.5">{cat.icon} {cat.name}</span>
                              <span className="text-[10px] text-slate-400">{cat.count}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${cat.color} ${cat.pct} rounded-full`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Promo Card */}
                    <div className="p-6 rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white text-left space-y-4 relative overflow-hidden shadow-lg shadow-[#6366f1]/20">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-4 translate-x-4 pointer-events-none" />
                      <div className="space-y-1 z-10 relative">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#fcd34d]">New Collection 2026</p>
                        <h4 className="text-lg font-black leading-snug">Up to 40% Off</h4>
                        <p className="text-[10px] text-slate-200 font-medium">Get the best luxury apparel on exclusive customer discounts.</p>
                      </div>
                      <Link 
                        href={`/preview/${projectId}`}
                        className="inline-block px-5 py-2 bg-white hover:bg-slate-50 text-[#6366f1] font-extrabold text-[10px] uppercase tracking-wider rounded-xl shadow-md border-none cursor-pointer transition"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Render standard sub-panels wrapped with uniform header styling */}
            {activeTab !== 'overview' && (
              <div className="space-y-6 text-left">
                <header className="flex justify-between items-center pb-6 border-b border-slate-200">
                  <div>
                    <p className="text-[10px] font-extrabold text-[#6366f1] uppercase tracking-widest">Buyer Dashboard</p>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase mt-0.5">
                      {activeTab.replaceAll('_', ' ')}
                    </h1>
                  </div>
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className="text-xs font-bold text-[#6366f1] hover:text-[#4f46e5] border-none bg-transparent cursor-pointer"
                  >
                    ← Back to Dashboard
                  </button>
                </header>

                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[400px]">
                  {activeTab === 'orders' && (
                    <UserOrdersPanel orders={orders} clientEmail={clientEmail} shopNiche={shopNiche} theme={theme} />
                  )}

                  {activeTab === 'wishlist' && (
                    <UserWishlistPanel wishlist={wishlist} setWishlist={setWishlist} theme={theme} shopNiche={shopNiche} />
                  )}

                  {activeTab === 'address' && (
                    <UserAddressPanel
                      userAddressHome={userAddressHome}
                      setUserAddressHome={setUserAddressHome}
                      userAddressWork={userAddressWork}
                      setUserAddressWork={setUserAddressWork}
                      projectId={projectId}
                    />
                  )}

                  {activeTab === 'coupons' && (
                    <UserCouponsPanel shopNiche={shopNiche} theme={theme} />
                  )}

                  {activeTab === 'notifications' && (
                    <UserNotificationsPanel shopNiche={shopNiche} />
                  )}

                  {activeTab === 'profile' && (
                    <UserProfilePanel
                      userName={userName}
                      setUserName={setUserName}
                      userPhone={userPhone}
                      setUserPhone={setUserPhone}
                      userAddressHome={userAddressHome}
                      setUserAddressHome={setUserAddressHome}
                      clientEmail={clientEmail}
                      theme={theme}
                      shopNiche={shopNiche}
                      handleSaveProfileChanges={handleSaveProfileChanges}
                    />
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4 text-center py-10">
                      <span className="text-4xl block">⭐</span>
                      <h3 className="font-extrabold text-slate-800 text-sm uppercase">My Product Reviews</h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">You haven't reviewed any products yet. Purchase items first to start rating them.</p>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="space-y-4 max-w-md">
                      <h3 className="font-extrabold text-slate-800 text-sm uppercase">Portal Settings</h3>
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-xs font-bold text-slate-700">Email Notifications</p>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Receive deals and order updates</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-[#6366f1] focus:ring-[#6366f1]" />
                        </div>
                        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-xs font-bold text-slate-700">SMS Alerts</p>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Get shipping status changes via SMS</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-[#6366f1] focus:ring-[#6366f1]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} className="w-8 h-8 object-contain rounded-md animate-fade-in" alt="logo" />
            ) : (
              <span className="text-2xl select-none">{logoIcon}</span>
            )}
            <div className="truncate font-sans">
              <h3 className="font-extrabold text-slate-900 text-sm truncate">{companyName}</h3>
              <span className={`text-[10px] font-extrabold ${theme.accentText} uppercase tracking-widest`}>
                {clientEmail === 'admin@gmail.com' ? 'Store Manager' : 'Buyer Profile'}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {clientEmail === 'admin@gmail.com' ? (
              <>
                {[
                  { id: 'overview', label: '📊 Dashboard' },
                  { id: 'products', label: '📦 Catalog Products' },
                  { id: 'categories_brands', label: '🏷️ Categories & Brands' },
                  { id: 'orders', label: '🛒 Customer Orders' },
                  { id: 'customers', label: '👥 Registered Customers' },
                  { id: 'inventory', label: '📉 Low Stock Alerts' },
                  { id: 'coupons', label: '🎫 Promo Coupons' },
                  { id: 'reports', label: '📈 Sales Reports' },
                  { id: 'chat', label: '💬 Support Live Chat' },
                  { id: 'video_call', label: '📹 Live Consultations' },
                  { id: 'crm', label: '🎯 CRM Sales Pipeline' },
                  { id: 'erp', label: '🏭 Warehouse ERP' },
                  { id: 'books', label: '📚 Bookkeeper Ledger' },
                  { id: 'editor', label: '🎨 Storefront Editor' },
                  { id: 'settings', label: '⚙️ Settings Console' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                      activeTab === item.id ? `${theme.activeTabBg} ${theme.activeTabBorder || ''}` : 'text-slate-550 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            ) : (
              <>
                {[
                  { id: 'orders', label: '📦 My Shopping Orders' },
                  { id: 'wishlist', label: '❤️ My Wishlist' },
                  { id: 'address', label: '📍 Shipping Addresses' },
                  { id: 'coupons', label: '🎫 Promo Coupons' },
                  { id: 'notifications', label: '🔔 Notifications' },
                  { id: 'profile', label: '👤 Account Profile' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-xl transition text-left cursor-pointer border-none bg-transparent ${
                      activeTab === item.id ? `${theme.activeTabBg} ${theme.activeTabBorder || ''}` : 'text-slate-550 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            )}
          </nav>
        </div>

        <div className="space-y-1.5">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-550 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition text-left cursor-pointer border-none bg-transparent"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 rounded-xl hover:bg-rose-50 transition text-left cursor-pointer border-none bg-transparent"
          >
            🚪 Sign Out Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50/50 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex justify-between items-center pb-6 border-b border-slate-200">
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Storefront Dashboard</p>
              <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase mt-0.5">
                {activeTab.replaceAll('_', ' ')}
              </h1>
            </div>
            <div className="text-[10px] bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-extrabold text-slate-500 shadow-sm flex items-center gap-2 select-none">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              SPRING API CONNECTED
            </div>
          </header>

          {/* Render Panels */}
          {activeTab === 'overview' && clientEmail === 'admin@gmail.com' && (
            <AdminOverviewPanel
              orders={orders}
              products={products}
              couponsList={couponsList}
              theme={theme}
              setActiveTab={setActiveTab}
              isRestaurant={false}
            />
          )}

          {activeTab === 'products' && clientEmail === 'admin@gmail.com' && (
            <AdminProductsPanel
              projectId={projectId}
              products={products}
              categoriesList={categoriesList}
              brandsList={brandsList}
              fetchDbProducts={fetchDbProducts}
              isRestaurant={false}
              shopNiche={shopNiche}
            />
          )}

          {activeTab === 'categories_brands' && clientEmail === 'admin@gmail.com' && (
            <AdminCategoriesBrandsPanel
              projectId={projectId}
              categoriesList={categoriesList}
              setCategoriesList={setCategoriesList}
              brandsList={brandsList}
              setBrandsList={setBrandsList}
            />
          )}

          {activeTab === 'orders' && (
            clientEmail === 'admin@gmail.com' ? (
              <AdminOrdersPanel orders={orders} fetchOrders={fetchOrders} />
            ) : (
              <UserOrdersPanel orders={orders} clientEmail={clientEmail} shopNiche={shopNiche} theme={theme} />
            )
          )}

          {activeTab === 'customers' && clientEmail === 'admin@gmail.com' && (
            <AdminCustomersPanel customersList={customersList} orders={orders} />
          )}

          {activeTab === 'inventory' && clientEmail === 'admin@gmail.com' && (
            <AdminInventoryPanel products={products} />
          )}

          {activeTab === 'coupons' && (
            clientEmail === 'admin@gmail.com' ? (
              <AdminCouponsPanel projectId={projectId} couponsList={couponsList} setCouponsList={setCouponsList} />
            ) : (
              <UserCouponsPanel shopNiche={shopNiche} theme={theme} />
            )
          )}

          {activeTab === 'reports' && clientEmail === 'admin@gmail.com' && (
            <AdminReportsPanel orders={orders} products={products} />
          )}

          {activeTab === 'chat' && renderChatPanel()}
          {activeTab === 'video_call' && renderVideoCallPanel()}
          {activeTab === 'crm' && renderCrmPanel()}
          {activeTab === 'erp' && renderErpPanel()}
          {activeTab === 'books' && renderBooksPanel()}

          {activeTab === 'editor' && (
            <StorefrontEditorPanel
              editHeroTitle={editHeroTitle}
              setEditHeroTitle={setEditHeroTitle}
              editHeroSubtitle={editHeroSubtitle}
              setEditHeroSubtitle={setEditHeroSubtitle}
              editHeroImage={editHeroImage}
              setEditHeroImage={setEditHeroImage}
              editProductsTitle={editProductsTitle}
              setEditProductsTitle={setEditProductsTitle}
              editProductsSubtitle={editProductsSubtitle}
              setEditProductsSubtitle={setEditProductsSubtitle}
              editFooterText={editFooterText}
              setEditFooterText={setEditFooterText}
              isSavingBlocks={isSavingBlocks}
              handleSaveLandingPage={handleSaveLandingPage}
              theme={theme}
            />
          )}

          {activeTab === 'settings' && clientEmail === 'admin@gmail.com' && (
            <AdminSettingsPanel
              projectId={projectId}
              storeSettings={storeSettings}
              setStoreSettings={setStoreSettings}
              setCompanyName={setCompanyName}
            />
          )}

          {activeTab === 'wishlist' && (
            <UserWishlistPanel wishlist={wishlist} setWishlist={setWishlist} theme={theme} shopNiche={shopNiche} />
          )}

          {activeTab === 'address' && (
            <UserAddressPanel
              userAddressHome={userAddressHome}
              setUserAddressHome={setUserAddressHome}
              userAddressWork={userAddressWork}
              setUserAddressWork={setUserAddressWork}
              projectId={projectId}
            />
          )}

          {activeTab === 'notifications' && (
            <UserNotificationsPanel shopNiche={shopNiche} />
          )}

          {activeTab === 'profile' && (
            <UserProfilePanel
              userName={userName}
              setUserName={setUserName}
              userPhone={userPhone}
              setUserPhone={setUserPhone}
              userAddressHome={userAddressHome}
              setUserAddressHome={setUserAddressHome}
              clientEmail={clientEmail}
              theme={theme}
              shopNiche={shopNiche}
              handleSaveProfileChanges={handleSaveProfileChanges}
            />
          )}
        </div>
      </main>
    </div>
  );
}
