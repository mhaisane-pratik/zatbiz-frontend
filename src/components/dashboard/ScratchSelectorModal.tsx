'use client';

import React, { useState } from 'react';

interface ScratchSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string, configData: any) => void;
}

export default function ScratchSelectorModal({
  isOpen,
  onClose,
  onSelectCategory
}: ScratchSelectorModalProps) {
  const [step, setStep] = useState(1);

  // Form States
  // Step 1: Account
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: Niche
  const [businessType, setBusinessType] = useState('Cloth Shop');

  // Step 3: Owner & Contact
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [whatsappNo, setWhatsappNo] = useState('');
  const [address, setAddress] = useState('');

  // Step 4: Assets
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  // Step 5: Homepage Layout
  const [selectedHomepageLayout, setSelectedHomepageLayout] = useState('grid-focus');

  // Step 6: Login Layout
  const [selectedLoginLayout, setSelectedLoginLayout] = useState('left-illustration');

  // Step 7: Dashboard Layout
  const [selectedDashboardLayout, setSelectedDashboardLayout] = useState('metric-overview');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const getDynamicNicheImages = () => {
    const bt = businessType.toLowerCase();
    if (bt.includes('cloth') || bt.includes('fashion') || bt.includes('wear') || bt.includes('boutique') || bt.includes('store')) {
      return {
        leftIllustration: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300',
        rightIllustration: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300',
        minimal: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300',
        neon: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300',
        floating: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300',
        curved: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300',
        split: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300',
        glassmorphism: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300',
        gradient: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300',
        masonry: 'https://images.unsplash.com/photo-1567401893930-7be752b4110b?w=300'
      };
    } else if (bt.includes('coffee') || bt.includes('cafe') || bt.includes('bakery') || bt.includes('restaurant')) {
      return {
        leftIllustration: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300',
        rightIllustration: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300',
        minimal: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300',
        neon: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=300',
        floating: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=300',
        curved: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=300',
        split: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=300',
        glassmorphism: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300',
        gradient: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300',
        masonry: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300'
      };
    } else if (bt.includes('gym') || bt.includes('fitness') || bt.includes('sports') || bt.includes('workout')) {
      return {
        leftIllustration: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300',
        rightIllustration: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300',
        minimal: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300',
        neon: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300',
        floating: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300',
        curved: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300',
        split: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300',
        glassmorphism: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300',
        gradient: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=300',
        masonry: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300'
      };
    } else {
      return {
        leftIllustration: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300',
        rightIllustration: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300',
        minimal: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300',
        neon: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300',
        floating: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300',
        curved: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300',
        split: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300',
        glassmorphism: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300',
        gradient: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=300',
        masonry: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300'
      };
    }
  };

  if (!isOpen) return null;

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    const defaultNiches = getDynamicNicheImages();
    const configData = {
      username: username.trim() || 'User',
      email: email.trim() || 'user@scratch.com',
      password: password || '123456',
      businessType: businessType.trim() || 'Cloth Shop',
      ownerName: ownerName.trim() || 'Administrator',
      ownerEmail: ownerEmail.trim() || 'admin@scratch.com',
      mobileNo: mobileNo.trim() || '+91 99999 88888',
      whatsappNo: whatsappNo.trim() || '+91 99999 88888',
      address: address.trim() || 'Commercial Hub, Noida, India',
      logoUrl: logoUrl || defaultNiches.minimal,
      bannerUrl: bannerUrl || defaultNiches.leftIllustration,
      photoUrl: photoUrl || defaultNiches.rightIllustration,
      selectedHomepageLayout,
      selectedLoginLayout,
      selectedDashboardLayout
    };
    onSelectCategory('scratch', configData);
  };

  const getBusinessEmoji = () => {
    const bt = businessType.toLowerCase();
    if (bt.includes('cloth') || bt.includes('fashion') || bt.includes('wear')) return '👕';
    if (bt.includes('coffee') || bt.includes('cafe')) return '☕';
    if (bt.includes('gym') || bt.includes('fitness')) return '💪';
    if (bt.includes('food') || bt.includes('eat')) return '🍔';
    if (bt.includes('salon') || bt.includes('beauty')) return '✂️';
    if (bt.includes('book') || bt.includes('library')) return '📚';
    return '💼';
  };

  const getBusinessNicheImage = () => {
    const bt = businessType.toLowerCase();
    if (bt.includes('cloth') || bt.includes('fashion') || bt.includes('wear')) {
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400';
    }
    if (bt.includes('coffee') || bt.includes('cafe')) {
      return 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400';
    }
    if (bt.includes('gym') || bt.includes('fitness')) {
      return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400';
    }
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans">
      <div className="bg-white text-slate-800 rounded-[32px] border border-slate-100 w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header (Aesthetic Light Mode) */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 backdrop-blur">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Custom Slate</span>
            <h2 className="text-lg font-black text-slate-900 mt-0.5">Build from Scratch Wizard</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-800 transition cursor-pointer bg-transparent border-none text-sm w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="px-8 py-3.5 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-[9px] font-black uppercase text-slate-500 tracking-wider overflow-x-auto whitespace-nowrap">
          {['Account Info', 'Business Type', 'Contacts', 'Assets', 'Home Layout', 'Login Style', 'Dashboard'].map((label, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum;
            const isActive = step === stepNum;
            return (
              <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border transition ${
                  isDone ? 'bg-indigo-600 border-indigo-600 text-white' :
                  isActive ? 'border-indigo-600 text-indigo-600 font-black' : 'border-slate-200 text-slate-400'
                }`}>{isDone ? '✓' : stepNum}</span>
                <span className={isActive ? 'text-slate-900 font-extrabold' : 'hidden md:inline'}>{label}</span>
                {idx < 6 && <span className="text-slate-200 ml-1 hidden md:inline">⟶</span>}
              </div>
            );
          })}
        </div>

        {/* Body content */}
        <div className="flex-grow p-8 overflow-y-auto min-h-[420px] bg-slate-50/30">
          
          {/* Step 1: Account Info */}
          {step === 1 && (
            <div className="space-y-6 max-w-md mx-auto text-left py-4">
              <div className="text-center space-y-1 mb-8">
                <h3 className="text-base font-extrabold text-slate-900">Create Administrator Credentials</h3>
                <p className="text-xs text-slate-400">Configure owner details to manage this custom site.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase tracking-wide">Account Name *</label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase tracking-wide">Account Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. owner@example.com"
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-455 uppercase tracking-wide">Secret Password *</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Type */}
          {step === 2 && (
            <div className="space-y-6 max-w-xl mx-auto text-left py-4">
              <div className="text-center space-y-1 mb-8">
                <h3 className="text-base font-extrabold text-slate-900">Define Business Niche</h3>
                <p className="text-xs text-slate-400">Enter what type of business you want to build. The wizard will adapt content dynamically.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-450 uppercase tracking-wide">Business Type *</label>
                    <input
                      type="text"
                      value={businessType}
                      onChange={e => setBusinessType(e.target.value)}
                      placeholder="e.g. Cloth Shop, Coffee Cafe, Gym Studio"
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 outline-none transition"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal font-semibold">
                    💡 Try typing <strong>"Cloth Shop"</strong>, <strong>"Coffee Cafe"</strong>, or <strong>"Gym"</strong> to see live previews update!
                  </p>
                </div>
                {/* Visual Preview Card */}
                <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm text-center space-y-4">
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-xl mx-auto">
                    {getBusinessEmoji()}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Preview Slate</h4>
                    <p className="text-sm font-extrabold text-slate-800 capitalize">{businessType || 'Your Business'}</p>
                  </div>
                  <img 
                    src={getBusinessNicheImage()} 
                    alt="Niche Preview" 
                    className="w-full h-24 object-cover rounded-xl border border-slate-100" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contacts */}
          {step === 3 && (
            <div className="space-y-6 max-w-2xl mx-auto text-left">
              <div className="text-center space-y-1 mb-8">
                <h3 className="text-base font-extrabold text-slate-900">Owner & Contact Details</h3>
                <p className="text-xs text-slate-400">Specify operational contact details for client dispatchers.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase">Owner Name *</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="e.g. Sarah Connor"
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase">Owner Email *</label>
                  <input
                    type="email"
                    value={ownerEmail}
                    onChange={e => setOwnerEmail(e.target.value)}
                    placeholder="e.g. sarah@example.com"
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase">Mobile Number *</label>
                  <input
                    type="text"
                    value={mobileNo}
                    onChange={e => setMobileNo(e.target.value)}
                    placeholder="e.g. +91 99999 88888"
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase">Whatsapp Number *</label>
                  <input
                    type="text"
                    value={whatsappNo}
                    onChange={e => setWhatsappNo(e.target.value)}
                    placeholder="e.g. +91 99999 88888"
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-450 uppercase">Business Address *</label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Enter street name, commercial plaza, city, state"
                    rows={2}
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Assets Selection */}
          {step === 4 && (
            <div className="space-y-6 max-w-2xl mx-auto text-left">
              <div className="text-center space-y-1 mb-8">
                <h3 className="text-base font-extrabold text-slate-900">Upload Branding Assets</h3>
                <p className="text-xs text-slate-400 font-medium">Click to select files from your system to upload your brand elements.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Logo */}
                <div className="bg-white border border-slate-150 p-5 rounded-2xl flex flex-col justify-between min-h-[220px]">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Company Logo</label>
                    <p className="text-[8px] text-slate-400 font-semibold mb-3">Upload your brand logo file.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-4 transition relative cursor-pointer min-h-[110px] text-center bg-slate-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileChange(e, setLogoUrl)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="h-16 w-16 object-cover rounded-lg shadow-sm" />
                    ) : (
                      <div className="space-y-1 text-slate-450 pointer-events-none">
                        <span className="text-xl">📁</span>
                        <p className="text-[8px] font-black uppercase tracking-wider text-indigo-600">Choose Logo File</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Photo */}
                <div className="bg-white border border-slate-150 p-5 rounded-2xl flex flex-col justify-between min-h-[220px]">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Showcase Photo</label>
                    <p className="text-[8px] text-slate-400 font-semibold mb-3">Primary photo to display on the storefront.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-4 transition relative cursor-pointer min-h-[110px] text-center bg-slate-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileChange(e, setPhotoUrl)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {photoUrl ? (
                      <img src={photoUrl} alt="Showcase" className="h-16 w-24 object-cover rounded-lg shadow-sm" />
                    ) : (
                      <div className="space-y-1 text-slate-450 pointer-events-none">
                        <span className="text-xl">🖼️</span>
                        <p className="text-[8px] font-black uppercase tracking-wider text-indigo-600">Choose Photo File</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Banner */}
                <div className="bg-white border border-slate-150 p-5 rounded-2xl flex flex-col justify-between min-h-[220px]">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Hero Banner</label>
                    <p className="text-[8px] text-slate-400 font-semibold mb-3">Background banner for your hero section.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-4 transition relative cursor-pointer min-h-[110px] text-center bg-slate-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileChange(e, setBannerUrl)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {bannerUrl ? (
                      <img src={bannerUrl} alt="Banner" className="h-16 w-28 object-cover rounded-lg shadow-sm" />
                    ) : (
                      <div className="space-y-1 text-slate-450 pointer-events-none">
                        <span className="text-xl">🌅</span>
                        <p className="text-[8px] font-black uppercase tracking-wider text-indigo-600">Choose Banner File</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Homepage Layout */}
          {step === 5 && (
            <div className="space-y-6 max-w-3xl mx-auto text-left">
              <div className="text-center space-y-1 mb-8">
                <h3 className="text-base font-extrabold text-slate-900">Select Landing Page Layout</h3>
                <p className="text-xs text-slate-400">Choose the initial scrollable structure that matches your business theme.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'grid-focus', name: 'Product Grid Focus', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500', desc: 'Prioritizes clean item displays and category search filters.' },
                  { id: 'banner-focus', name: 'Promotional Banner Focus', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500', desc: 'Highlights big hero campaigns, seasonal deals, and discount overlays.' },
                  { id: 'map-focus', name: 'Niche Locator Map Focus', image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=500', desc: 'Displays operational hours and physical showroom locators prominently.' }
                ].map((layout) => {
                  const isSelected = selectedHomepageLayout === layout.id;
                  return (
                    <button
                      key={layout.id}
                      type="button"
                      onClick={() => setSelectedHomepageLayout(layout.id)}
                      className={`flex flex-col bg-white border text-left rounded-2xl overflow-hidden group transition duration-300 ${
                        isSelected ? 'border-indigo-600 ring-2 ring-indigo-600/15' : 'border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      <div className="h-32 w-full overflow-hidden relative">
                        <img src={layout.image} alt={layout.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        {isSelected && <span className="absolute top-3 right-3 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black shadow">✓</span>}
                      </div>
                      <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-black uppercase text-slate-800 tracking-tight">{layout.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">{layout.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 6: Login Layout */}
          {step === 6 && (
            <div className="space-y-6 max-w-3xl mx-auto text-left">
              <div className="text-center space-y-1 mb-8">
                <h3 className="text-base font-extrabold text-slate-900">Select Login Page Layout</h3>
                <p className="text-xs text-slate-400">Choose one of the 10 modern illustration designs for your users.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {(() => {
                  const dynamicNiches = getDynamicNicheImages();
                  const loginLayouts = [
                    { id: 'left-illustration', name: 'Left Illustration banner', img: dynamicNiches.leftIllustration },
                    { id: 'right-illustration', name: 'Right Illustration banner', img: dynamicNiches.rightIllustration },
                    { id: 'minimal-logo', name: 'Minimal centered form', img: dynamicNiches.minimal },
                    { id: 'neon-dark', name: 'Neon Admin Dark Mode', img: dynamicNiches.neon },
                    { id: 'floating-dishes', name: 'Floating Ingredients', img: dynamicNiches.floating },
                    { id: 'curved-wave', name: 'Curved Divider wave', img: dynamicNiches.curved },
                    { id: 'split-screen', name: 'Split Screen half', img: dynamicNiches.split },
                    { id: 'glassmorphism', name: 'Glassmorphism dark overlay', img: dynamicNiches.glassmorphism },
                    { id: 'gradient-glow', name: 'Radial Gradient glow', img: dynamicNiches.gradient },
                    { id: 'grid-masonry', name: 'Masonry background grid', img: dynamicNiches.masonry }
                  ];

                  return loginLayouts.map((layout) => {
                    const isSelected = selectedLoginLayout === layout.id;
                    return (
                      <button
                        key={layout.id}
                        type="button"
                        onClick={() => setSelectedLoginLayout(layout.id)}
                        className={`flex flex-col bg-white border text-left rounded-xl overflow-hidden group transition duration-300 ${
                          isSelected ? 'border-indigo-600 ring-2 ring-indigo-600/15' : 'border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        <div className="h-20 w-full overflow-hidden relative">
                          <img src={layout.img} alt={layout.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          {isSelected && <span className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-black shadow">✓</span>}
                        </div>
                        <div className="p-2.5">
                          <h4 className="text-[9px] font-black uppercase text-slate-800 tracking-tight truncate">{layout.name}</h4>
                        </div>
                      </button>
                    );
                  });
                })()}
              </div>
            </div>
          )}

          {/* Step 7: Dashboard Layout */}
          {step === 7 && (
            <div className="space-y-6 max-w-3xl mx-auto text-left">
              <div className="text-center space-y-1 mb-8">
                <h3 className="text-base font-extrabold text-slate-900">Select Admin Dashboard Layout</h3>
                <p className="text-xs text-slate-400">Choose the sidebar navigation and layout mode for your backend dashboard.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'metric-overview', name: 'Metric Analytics Hub', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300', desc: 'Displays telemetry line charts, revenue indicators, and orders log lists.' },
                  { id: 'compact-menu', name: 'Compact Sidebar Menu', image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=300', desc: 'An icon-only navigation scheme optimized for kitchen display tablets.' },
                  { id: 'simple-list', name: 'Simple Table Logs', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300', desc: 'Omit telemetry charts and display item datasets directly for quick execution.' }
                ].map((layout) => {
                  const isSelected = selectedDashboardLayout === layout.id;
                  return (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedDashboardLayout(layout.id)}
                      className={`flex flex-col bg-white border text-left rounded-2xl overflow-hidden group transition duration-300 ${
                        isSelected ? 'border-indigo-650 ring-2 ring-indigo-650/15' : 'border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      <div className="h-32 w-full overflow-hidden relative">
                        <img src={layout.image} alt={layout.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        {isSelected && <span className="absolute top-3 right-3 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black shadow">✓</span>}
                      </div>
                      <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-black uppercase text-slate-800 tracking-tight">{layout.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">{layout.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Panel */}
        <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              step === 1 ? 'text-slate-300 bg-transparent border border-slate-100 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer'
            }`}
          >
            ← Back
          </button>
          
          {step < 7 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition shadow-md shadow-indigo-600/10 cursor-pointer"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition shadow-md shadow-emerald-600/10 cursor-pointer"
            >
              🚀 Generate Website
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
