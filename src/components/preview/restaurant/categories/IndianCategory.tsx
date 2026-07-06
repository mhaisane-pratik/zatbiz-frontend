'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CategoryProps, CategoryLoginProps, RestaurantDashboardProps } from './types';
import { CategoryLoginTemplate } from './CategoryLoginTemplate';
import { CategoryDashboardTemplate } from './CategoryDashboardTemplate';

export function IndianCategory({
  projectId,
  project,
  dbProducts,
  onAddToCart,
  setIsBookingModalOpen,
  customerSession,
  onLogout,
  logoUrl,
  logoIcon,
  companyName,
  heroImage,
  heroTitle,
  heroSubtitle,
  themePreset,
  activeBlockId,
  setActiveBlockId,
  headerBlockId,
  heroBlockId
}: CategoryProps) {
  const [activeCategory, setActiveCategory] = useState<'starters' | 'curries' | 'tandoor' | 'desserts'>('curries');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const displayName = companyName || project?.name?.replace(/\s*(website|web application|app|site)\s*/gi, '') || 'Spice Royalty';
  const displayHeroImage = heroImage || 'https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=1920&auto=format&fit=crop&q=80';
  const displayHeroTitle = heroTitle || 'Royal Flavors Of India';
  const displayHeroSubtitle = heroSubtitle || 'Experience authentic Indian cuisine crafted with centuries-old recipes, premium spices, and the warmth of royal hospitality.';

  // Fallback menu data if database products are empty
  const defaultMenu = {
    starters: [
      {
        name: 'Crispy Onion Bhaji',
        price: '₹140',
        description: 'Sliced onions bound in chickpea flour, infused with ginger, cumin, and fried until golden crispy.',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&auto=format&fit=crop&q=80'
      },
      {
        name: 'Punjabi Samosa Duo',
        price: '₹120',
        description: 'Flaky pastry pockets filled with spiced potato mash, green peas, mint, and served with tamarind chutney.',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&auto=format&fit=crop&q=80'
      },
      {
        name: 'Tandoori Paneer Tikka',
        price: '₹220',
        description: 'Cubes of cottage cheese marinated in hung curd, Kashmiri red chili paste, and roasted in clay oven.',
        imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&auto=format&fit=crop&q=80'
      }
    ],
    curries: [
      {
        name: 'Butter Chicken Royale',
        price: '₹340',
        description: 'Slow-cooked roasted chicken pieces simmered in a velvety tomato, cream, and dry fenugreek leaf gravy.',
        imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&auto=format&fit=crop&q=80'
      },
      {
        name: 'Paneer Tikka Masala',
        price: '₹290',
        description: 'Grilled paneer cubes cooked in a thick spiced tomato-onion masala, garnished with micro-coriander.',
        imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&auto=format&fit=crop&q=80'
      },
      {
        name: 'Hyderabadi Dum Biryani',
        price: '₹380',
        description: 'Long-grained basmati rice layered with aromatic spices and saffron, cooked on slow dum heat.',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80'
      }
    ],
    tandoor: [
      {
        name: 'Garlic Butter Naan',
        price: '₹80',
        description: 'Traditional leavened flatbread topped with minced garlic, fresh coriander, and brushed with pure ghee.',
        imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400&auto=format&fit=crop&q=80'
      },
      {
        name: 'Laccha Paratha',
        price: '₹90',
        description: 'Multi-layered, flaky whole wheat bread cooked in tandoor and brushed with butter.',
        imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400&auto=format&fit=crop&q=80'
      },
      {
        name: 'Peshawari Sweet Naan',
        price: '₹110',
        description: 'Clay-oven baked flatbread stuffed with a sweet paste of almonds, cashews, raisins, and desiccated coconut.',
        imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400&auto=format&fit=crop&q=80'
      }
    ],
    desserts: [
      {
        name: 'Royal Kesari Gulab Jamun',
        price: '₹140',
        description: 'Warm, deep-fried milk dumplings soaked in a sweet green cardamom, rose water, and saffron sugar syrup.',
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&auto=format&fit=crop&q=80'
      },
      {
        name: 'Saffron Pistachio Kulfi',
        price: '₹160',
        description: 'Slow-reduced milk ice cream infused with Persian saffron strands, crushed pistachios, and green cardamom.',
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&auto=format&fit=crop&q=80'
      }
    ]
  };

  // Maps database products dynamically into our categories if available
  const getProductsForCategory = (cat: 'starters' | 'curries' | 'tandoor' | 'desserts') => {
    if (!dbProducts || dbProducts.length === 0) {
      return defaultMenu[cat];
    }
    
    // Filter database products by category tag if applicable
    const filtered = dbProducts.filter((p) => {
      const pCat = p.category?.toLowerCase() || '';
      if (cat === 'starters') return pCat.includes('starter') || pCat.includes('appetizer');
      if (cat === 'curries') return pCat.includes('curry') || pCat.includes('main');
      if (cat === 'tandoor') return pCat.includes('bread') || pCat.includes('naan') || pCat.includes('tandoor');
      if (cat === 'desserts') return pCat.includes('dessert') || pCat.includes('sweet');
      return false;
    });

    if (filtered.length === 0) {
      return defaultMenu[cat];
    }

    return filtered.map((p) => ({
      name: p.name,
      price: `₹${p.price}`,
      description: p.description || 'Prepared fresh with premium grade traditional ingredients.',
      imageUrl: p.imageUrl || 'https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=400'
    }));
  };

  const currentMenu = getProductsForCategory(activeCategory);

  const handleAddToFeast = (name: string) => {
    setOrderCount((prev) => prev + 1);
    setAddedItem(name);
    setTimeout(() => setAddedItem(null), 3000);
    
    // Call the parent add-to-cart handler if dynamic products exist
    if (dbProducts && dbProducts.length > 0) {
      const match = dbProducts.find((p) => p.name === name);
      if (match) {
        onAddToCart(match);
      }
    }
  };

  const handleReserveClick = () => {
    setIsBookingModalOpen(true);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="bg-[#0a0503] text-[#fef3c7] font-sans min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Enhanced Background Decor with Multiple Gradients */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=1920&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      </div>
      
      {/* Animated Ambient Glow Effects */}
      <div className="absolute top-[5%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, transparent 70%)" }}></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] -z-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)" }}></div>

      {/* Navigation Header with Glassmorphism */}
      <nav 
        onClick={(e) => {
          if (setActiveBlockId && headerBlockId) {
            e.stopPropagation();
            setActiveBlockId(headerBlockId);
          }
        }}
        className={`fixed top-0 w-full z-50 bg-[#0a0503]/90 border-b backdrop-blur-xl shadow-2xl transition-all duration-300 ${
          setActiveBlockId ? 'cursor-pointer hover:border-indigo-500/50' : 'border-[#d97706]/20'
        } ${activeBlockId === headerBlockId ? 'ring-2 ring-indigo-500 border-indigo-500' : ''}`}
      >
        {setActiveBlockId && <div className="absolute inset-0 z-10 cursor-pointer" />}
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          {/* Logo & Sub-niche */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
              ) : (
                <span className="text-3xl select-none">{logoIcon || '🍛'}</span>
              )}
              <div className="absolute -inset-1 bg-[#d97706]/20 blur-md rounded-full -z-10"></div>
            </div>
            <div className="text-left font-sans">
              <span className="text-sm font-black tracking-tight text-white block uppercase bg-gradient-to-r from-[#d97706] to-[#fbbf24] bg-clip-text text-transparent">
                {displayName}
              </span>
              <span className="text-[9px] text-[#d97706] font-black uppercase tracking-widest block mt-0.5">
                Fine Indian Cuisine
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase font-bold tracking-widest">
            <a href="#menu" className="text-[#fef3c7]/60 hover:text-white transition-all duration-300 relative group">
              Royal Menu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d97706] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <span className="text-[#d97706]/30">|</span>
            <button onClick={handleReserveClick} className="bg-transparent border-none cursor-pointer text-[#fef3c7]/60 hover:text-white transition-all duration-300 uppercase text-[10px] font-bold tracking-widest relative group">
              Book Table
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d97706] transition-all duration-300 group-hover:w-full"></span>
            </button>
            {customerSession ? (
              <>
                <span className="text-[#d97706]/30">|</span>
                <Link href={`/preview/${projectId}/dashboard`} className="text-[#fef3c7]/60 hover:text-white transition-all duration-300">
                  Dashboard
                </Link>
                <span className="text-[#d97706]/30">|</span>
                <button onClick={onLogout} className="bg-transparent border-none cursor-pointer text-[#fef3c7]/60 hover:text-white transition-all duration-300 uppercase text-[10px] font-bold">
                  Logout
                </button>
              </>
            ) : (
              <>
                <span className="text-[#d97706]/30">|</span>
                <Link href={`/preview/${projectId}/login`} className="text-[#fef3c7]/60 hover:text-white transition-all duration-300">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Order button */}
          <div className="flex items-center gap-4">
            <a href="#menu" className="relative bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#d97706] text-white font-bold text-[10px] uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-[#d97706]/20 transform hover:scale-105">
              Order Online 
              {orderCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#0a0503] text-[8px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#d97706] shadow-lg animate-bounce">
                  {orderCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        onClick={(e) => {
          if (setActiveBlockId && heroBlockId) {
            e.stopPropagation();
            setActiveBlockId(heroBlockId);
          }
        }}
        className={`relative min-h-[90vh] flex items-center justify-center bg-cover bg-center text-center px-6 pt-24 overflow-hidden transition-all duration-300 ${
          setActiveBlockId ? 'cursor-pointer hover:ring-2 hover:ring-indigo-500/30' : ''
        } ${activeBlockId === heroBlockId ? 'ring-2 ring-indigo-500' : ''}`}
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(10, 5, 3, 0.3), rgba(10, 5, 3, 0.95)), url('${displayHeroImage}')`,
          backgroundAttachment: 'fixed'
        }}
      >
        {setActiveBlockId && <div className="absolute inset-0 z-10 cursor-pointer" />}
        <div className="max-w-4xl space-y-8 z-10 pt-8">
          <div className="inline-block bg-[#d97706]/10 backdrop-blur-sm border border-[#d97706]/30 rounded-full px-6 py-2">
            <span className="text-xs uppercase tracking-widest text-[#d97706] font-black">🌟 Premium Dining Experience</span>
          </div>
          <h1 className="text-5xl md:text-8xl text-white font-black uppercase tracking-tight leading-[1.05]">
            {displayHeroTitle}
          </h1>
          <p className="text-amber-100/80 text-sm md:text-base tracking-wide leading-relaxed max-w-2xl mx-auto font-light">
            {displayHeroSubtitle}
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-4 text-xs font-black uppercase font-sans">
            <a href="#menu" className="px-10 py-4 bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#d97706] text-white rounded-full shadow-2xl shadow-[#d97706]/30 hover:shadow-[#d97706]/50 transition-all duration-300 transform hover:scale-105 border-none">
              Explore Menu
            </a>
            <button onClick={handleReserveClick} className="px-10 py-4 bg-transparent border-2 border-[#d97706] text-[#d97706] hover:bg-[#d97706] hover:text-white rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm cursor-pointer">
              Reserve Table
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#d97706]/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#d97706] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-[#0a0503] border-y border-[#d97706]/20 py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d97706]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="group bg-gradient-to-br from-[#1a0e08] to-[#0a0503] border border-[#d97706]/20 rounded-2xl p-8 hover:border-[#d97706]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d97706]/10 transform hover:-translate-y-2">
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-[#d97706]/10 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl text-[#d97706]">nutrition</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white uppercase">Handcrafted Spices</h3>
              <p className="text-sm text-amber-200/60 font-light leading-relaxed">
                Every blend is grounded in-house, mixing organic tandoori chilies, 
                green cardamoms, and saffron threads for authentic flavors.
              </p>
            </div>
          </div>
          <div className="group bg-gradient-to-br from-[#1a0e08] to-[#0a0503] border border-[#d97706]/20 rounded-2xl p-8 hover:border-[#d97706]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d97706]/10 transform hover:-translate-y-2">
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-[#d97706]/10 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl text-[#d97706]">fireplace</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white uppercase">Clay Tandoor Oven</h3>
              <p className="text-sm text-amber-200/60 font-light leading-relaxed">
                Our flatbreads and tikka meats are roasted over raw charcoal heat 
                inside hand-molded clay tandoor pits for that distinctive smoky flavor.
              </p>
            </div>
          </div>
          <div className="group bg-gradient-to-br from-[#1a0e08] to-[#0a0503] border border-[#d97706]/20 rounded-2xl p-8 hover:border-[#d97706]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d97706]/10 transform hover:-translate-y-2">
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-[#d97706]/10 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl text-[#d97706]">award_star</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white uppercase">Royal Culinary Legacy</h3>
              <p className="text-sm text-amber-200/60 font-light leading-relaxed">
                Savor classic recipes preserved for generations, honoring the 
                culinary legacies of the royal courts of India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="max-w-7xl mx-auto w-full px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block bg-[#d97706]/10 backdrop-blur-sm border border-[#d97706]/30 rounded-full px-6 py-2">
            <span className="text-xs uppercase tracking-widest text-[#d97706] font-black">Signature Selection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide text-white">
            Royal Curry & <span className="bg-gradient-to-r from-[#d97706] to-[#fbbf24] bg-clip-text text-transparent">Clay Oven</span> Specials
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d97706] to-transparent mx-auto"></div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#0a0503]/60 backdrop-blur-sm border border-[#d97706]/20 p-1.5 rounded-full shadow-xl">
            {(['starters', 'curries', 'tandoor', 'desserts'] as const).map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-gradient-to-r from-[#d97706] to-[#b45309] text-white shadow-lg shadow-[#d97706]/30 transform scale-105' 
                    : 'text-[#fef3c7]/60 hover:text-white hover:bg-[#d97706]/10'
                }`}
              >
                {cat === 'tandoor' ? 'Tandoor Breads' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentMenu.map((item) => (
            <div 
              key={item.name} 
              className="group bg-gradient-to-br from-[#1a0e08] to-[#0a0503] border border-[#d97706]/20 rounded-2xl overflow-hidden hover:border-[#d97706]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d97706]/10 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-56 rounded-t-2xl overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={item.name} 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3 className="font-bold text-white text-lg uppercase tracking-tight group-hover:text-[#d97706] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="font-black text-[#d97706] text-lg shrink-0 bg-[#d97706]/10 px-3 py-1 rounded-full">
                    {item.price}
                  </span>
                </div>
                <p className="text-amber-200/50 text-sm font-light leading-relaxed min-h-[60px]">
                  {item.description}
                </p>
                <button 
                  onClick={() => handleAddToFeast(item.name)}
                  className="w-full mt-6 bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#d97706] text-white font-bold text-[11px] uppercase py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#d97706]/20 hover:shadow-[#d97706]/40 cursor-pointer"
                >
                  Add to Feast
                </button>
              </div>
            </div>
          ))}
        </div>

        {addedItem && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white px-8 py-4 rounded-full shadow-2xl shadow-[#d97706]/40 animate-bounce z-50">
            <p className="text-sm font-bold flex items-center gap-2">
              <span>✓</span> Added {addedItem} to your royal order!
            </p>
          </div>
        )}
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=1920&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0503] via-transparent to-[#0a0503]"></div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          <div className="space-y-8">
            <div className="inline-block bg-[#d97706]/10 backdrop-blur-sm border border-[#d97706]/30 rounded-full px-6 py-2">
              <span className="text-xs uppercase tracking-widest text-[#d97706] font-black">Private Dining</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-white leading-tight">
              Book Your <span className="bg-gradient-to-r from-[#d97706] to-[#fbbf24] bg-clip-text text-transparent">Royal</span> Table
            </h2>
            <p className="text-amber-100/60 text-sm font-light leading-relaxed max-w-lg">
              We highly recommend booking slots at least 24 hours in advance for clay-oven table setups. 
              For royal events or family banquets over 10 guests, please contact our coordinator.
            </p>
            <div className="space-y-3 text-[#fef3c7]/60 text-xs uppercase tracking-wider font-bold">
              <p className="flex items-center gap-3 bg-[#1a0e08] p-3 rounded-xl border border-[#d97706]/10">
                <span className="material-symbols-outlined text-[#d97706] text-sm">mail</span> 
                host@spiceroyalty.com
              </p>
              <p className="flex items-center gap-3 bg-[#1a0e08] p-3 rounded-xl border border-[#d97706]/10">
                <span className="material-symbols-outlined text-[#d97706] text-sm">schedule</span> 
                Daily: 12:00 PM - 11:00 PM
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-br from-[#1a0e08] to-[#0a0503] border border-[#d97706]/25 rounded-2xl p-8 shadow-2xl shadow-[#d97706]/10 backdrop-blur-sm">
            <form onSubmit={handleReserveSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#d97706] mb-2 tracking-wider">Your Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Aditi Sharma" 
                  className="w-full bg-[#0a0503] border border-[#d97706]/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-white placeholder-stone-700 transition-all duration-300" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#d97706] mb-2 tracking-wider">Date</label>
                  <input 
                    type="date" 
                    required 
                    className="w-full bg-[#0a0503] border border-[#d97706]/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-white transition-all duration-300" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#d97706] mb-2 tracking-wider">Diners</label>
                  <select 
                    required 
                    className="w-full bg-[#0a0503] border border-[#d97706]/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-white transition-all duration-300"
                  >
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8">8 Guests</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#d97706] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#d97706]/20 hover:shadow-[#d97706]/40 cursor-pointer"
              >
                Reserve Your Table
              </button>
              {bookingSuccess && (
                <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-white font-semibold flex items-center justify-center gap-2">
                    <span className="text-green-400">✓</span> Table reservation request sent! Check your mailbox.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0503] border-t border-[#d97706]/20 w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-white tracking-[0.2em] text-xl uppercase bg-gradient-to-r from-[#d97706] to-[#fbbf24] bg-clip-text text-transparent">
                {displayName}
              </h4>
              <p className="text-[10px] uppercase tracking-widest text-[#d97706]/50 mt-2">
                Fine Indian Cuisine
              </p>
              <p className="text-xs text-amber-200/40 mt-4 max-w-xs">
                Experience the authentic flavors of India in a royal setting.
              </p>
            </div>
            <div className="text-center">
              <h5 className="text-[10px] uppercase tracking-widest text-[#d97706] font-bold mb-4">Quick Links</h5>
              <div className="flex flex-col gap-2 text-xs text-amber-200/40">
                <a href="#menu" className="hover:text-white transition-colors">Menu</a>
                <button onClick={handleReserveClick} className="bg-transparent border-none cursor-pointer text-amber-200/40 hover:text-white transition-colors text-xs font-sans uppercase font-bold">Reservations</button>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h5 className="text-[10px] uppercase tracking-widest text-[#d97706] font-bold mb-4">Connect</h5>
              <div className="flex justify-center md:justify-end gap-4">
                <a href="#" className="text-[#d97706]/40 hover:text-[#d97706] transition-colors text-sm">Instagram</a>
                <a href="#" className="text-[#d97706]/40 hover:text-[#d97706] transition-colors text-sm">Facebook</a>
                <a href="#" className="text-[#d97706]/40 hover:text-[#d97706] transition-colors text-sm">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#d97706]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] uppercase tracking-widest text-[#d97706]/30">
              © 2026 {displayName}. All rights reserved.
            </p>
            <div className="flex gap-6 text-[10px] uppercase font-bold tracking-wider text-[#d97706]/30">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function IndianCategoryLogin(props: CategoryLoginProps) {
  return (
    <CategoryLoginTemplate
      {...props}
      niche="indian"
      themeColor="#dc2626"
      img="https://images.unsplash.com/photo-1585938338392-50a59970d2ee?w=800&auto=format&fit=crop&q=80"
      desc="Enjoy rich Butter Chicken, Biryani, and Tandoori Naan from the clay oven."
      emoji="🍛"
    />
  );
}

export function IndianCategoryDashboard(props: RestaurantDashboardProps) {
  return (
    <CategoryDashboardTemplate
      {...props}
      niche="indian"
      primaryColor="#dc2626"
      accentBg="bg-red-50 text-red-700 border-red-100"
      emoji="🍛"
      metrics={[
        { title: 'Curry Orders', value: '36', desc: 'Gravy dishes prep' },
        { title: 'Tandoori Items', value: '14', desc: 'Clay oven queue' }
      ]}
    />
  );
}
