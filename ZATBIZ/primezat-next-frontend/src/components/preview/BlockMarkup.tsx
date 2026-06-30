'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Block, Product } from '@/types';
import ProductCard from './ProductCard';

interface BlockMarkupProps {
  block: Block;
  projectId: string;
  dbProducts: Product[];
  cartCount: number;
  onAddToCart: (p: Product) => void;
  onViewCart?: () => void;
  onViewMyOrders?: () => void;
  onProductClick?: (p: Product) => void;
  wishlist?: number[];
  onToggleWishlist?: (p: Product) => void;
  gymInfo?: any;
}

export default function BlockMarkup({
  block,
  projectId,
  dbProducts,
  cartCount,
  onAddToCart,
  onViewCart,
  onViewMyOrders,
  onProductClick,
  wishlist = [],
  onToggleWishlist,
  gymInfo,
}: BlockMarkupProps) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('clientEmail'));
    }
  }, []);
  const themeClass = `block-theme-${block.theme}`;
  const c = block.content;
  const [layoutMode, setLayoutMode] = useState<'grid' | 'swiggy'>(block.theme === 'sunset' ? 'swiggy' : 'grid');

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);

  switch (block.type) {
    case 'announcement_bar': {
      return (
        <div className={`px-4 py-2.5 text-center text-xs font-bold transition-colors duration-300 ${themeClass} flex items-center justify-center gap-2`}>
          <span>📢</span>
          <span>{c.text || 'Welcome to our store! Free shipping on orders over $50.'}</span>
          {c.linkText && c.linkUrl && (
            <a href={c.linkUrl} className="underline ml-2 hover:opacity-80">
              {c.linkText}
            </a>
          )}
        </div>
      );
    }

    case 'header': {
      const headerLayout = c.layout || 'left-logo';
      return (
        <div
          className={`px-10 py-5 flex items-center justify-between border-b border-slate-200/50 transition-colors duration-300 ${themeClass} ${
            headerLayout === 'centered-logo' ? 'flex-col gap-3 text-center' : ''
          }`}
        >
          <div
            className={`flex items-center gap-2 font-bold text-lg ${
              headerLayout === 'centered-logo' ? 'mx-auto' : ''
            }`}
          >
            {c.logoUrl ? (
              <img src={c.logoUrl} className="w-8 h-8 object-contain rounded-md" alt="logo" />
            ) : (
              <span>{escapeHtml(c.logoIcon)}</span>
            )}
            <span>{escapeHtml(c.companyName)}</span>
          </div>

          <ul
            className={`flex gap-6 text-xs font-semibold text-slate-650 ${
              headerLayout === 'minimal' ? 'hidden' : ''
            }`}
          >
            {c.links && c.links.length > 0 ? (
              c.links.map((link: any, idx: number) => (
                <li key={idx}>
                  <a href={link.url || '#'} className="hover:text-indigo-655 transition">
                    {escapeHtml(link.label)}
                  </a>
                </li>
              ))
            ) : (
              <>
                <li>
                  <span className="hover:text-indigo-655 cursor-pointer">Catalog</span>
                </li>
                <li>
                  <span className="hover:text-indigo-655 cursor-pointer">Collections</span>
                </li>
                <li>
                  <span className="hover:text-indigo-655 cursor-pointer">About Us</span>
                </li>
              </>
            )}
          </ul>

          <div
            className={`flex items-center gap-3 ${
              headerLayout === 'centered-logo'
                ? 'w-full justify-center gap-4 text-xs mt-1 border-t border-slate-100 pt-2'
                : ''
            }`}
          >
            {isLoggedIn && onViewMyOrders && (
              <button
                type="button"
                onClick={onViewMyOrders}
                className="px-3 py-1.5 border border-slate-250 hover:bg-slate-50 text-slate-705 rounded text-[10px] font-bold transition shadow-sm cursor-pointer"
              >
                📦 My Orders
              </button>
            )}
            {isLoggedIn ? (
              <Link
                href={`/preview/${projectId}/dashboard`}
                className="px-3.5 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded text-[10px] font-bold transition shadow-sm"
              >
                👤 My Account
              </Link>
            ) : (
              <Link
                href={`/preview/${projectId}/login`}
                className="px-3.5 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded text-[10px] font-bold transition shadow-sm"
              >
                Log In
              </Link>
            )}
            {headerLayout !== 'minimal' && (
              <button
                type="button"
                onClick={onViewCart}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold shadow-sm transition cursor-pointer"
              >
                Cart ({cartCount})
              </button>
            )}
          </div>
        </div>
      );
    }

    case 'hero': {
      const isGym = (block.theme && typeof block.theme === 'string' && block.theme.startsWith('gym-')) ||
                    (gymInfo && gymInfo.projectId) ||
                    (c.title && (c.title.toLowerCase().includes('fitness') || c.title.toLowerCase().includes('strength') || c.title.toLowerCase().includes('gym'))) ||
                    (c.subtitle && (c.subtitle.toLowerCase().includes('gym') || c.subtitle.toLowerCase().includes('fitness') || c.subtitle.toLowerCase().includes('workout')));

      const hasImage = !!c.imageUrl;
      const gymBgImage = gymInfo?.headerBgImage || c.imageUrl;

      if (isGym && gymBgImage) {
        return (
          <div 
            className={`relative py-32 md:py-40 px-6 text-center text-white bg-cover bg-center transition-colors duration-300 ${themeClass}`}
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.70), rgba(15, 23, 42, 0.85)), url(${gymBgImage})` }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">
                {c.title}
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-semibold">
                {c.subtitle}
              </p>
              <div className="flex justify-center gap-4 pt-2">
                {c.btn1Text && (
                  <a
                    href={c.btn1Url || '#'}
                    className="px-8 py-3 text-xs font-bold rounded-xl shadow-lg transition hover:scale-[1.02] bg-indigo-600 text-white"
                  >
                    {c.btn1Text}
                  </a>
                )}
                {c.btn2Text && (
                  <a
                    href={c.btn2Url || '#'}
                    className="px-8 py-3 text-xs font-bold rounded-xl bg-white/10 border border-white/20 text-white transition hover:bg-white/20"
                  >
                    {c.btn2Text}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className={`py-20 md:py-28 px-6 transition-colors duration-300 ${themeClass}`}>
          <div
            className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 ${
              hasImage ? 'text-left' : 'text-center flex-col justify-center'
            }`}
          >
            <div className={`flex-1 ${hasImage ? '' : 'flex flex-col items-center justify-center'}`}>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                {c.title}
              </h1>
              <p
                className={`muted-text text-sm md:text-base mb-8 leading-relaxed font-medium ${
                  hasImage ? 'max-w-xl' : 'max-w-2xl'
                }`}
              >
                {c.subtitle}
              </p>
              <div className="flex gap-4">
                {c.btn1Text && (
                  <a
                    href={c.btn1Url || '#'}
                    className="px-6 py-3 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
                  >
                    {c.btn1Text}
                  </a>
                )}
                {c.btn2Text && (
                  <a
                    href={c.btn2Url || '#'}
                    className="px-6 py-3 text-xs font-bold bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition"
                  >
                    {c.btn2Text}
                  </a>
                )}
              </div>
            </div>
            {hasImage && (
              <div className="flex-1 max-w-md w-full h-64 md:h-80 bg-slate-50 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50">
                <img src={c.imageUrl} className="w-full h-full object-cover" alt="Hero Banner" />
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'features':
      return (
        <div className={`py-20 px-6 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-12 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{c.title}</h2>
            <p className="muted-text text-xs font-medium">{c.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div
                key={i}
                className="p-6 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="muted-text text-xs leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'text-image':
      return (
        <div
          className={`py-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 transition-colors duration-300 ${themeClass}`}
          style={{ flexDirection: c.align === 'right' ? 'row-reverse' : 'row' }}
        >
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{c.title}</h2>
            <p className="muted-text text-xs md:text-sm leading-relaxed font-medium">{c.text}</p>
          </div>
          {c.imageUrl ? (
            <div className="flex-1 h-64 md:h-80 bg-slate-50 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50">
              <img src={c.imageUrl} className="w-full h-full object-cover" alt={c.title} />
            </div>
          ) : (
            <div className="flex-1 h-52 bg-white/40 border border-slate-200/50 border-dashed rounded-xl flex items-center justify-center text-slate-400 text-xs font-semibold">
              [Visual Graphics Block]
            </div>
          )}
        </div>
      );

    case 'pricing':
      return (
        <div className={`py-20 px-6 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">{c.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div
                key={i}
                className={`p-8 bg-white/60 border rounded-xl flex flex-col justify-between shadow-sm ${
                  item.isFeatured ? 'border-indigo-400/50 bg-indigo-50/20' : 'border-white/40'
                }`}
              >
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">{item.title}</h3>
                  <div className="text-3xl font-extrabold text-slate-900 mb-6">
                    {item.price}
                    <span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-xs muted-text font-medium">
                    {item.features?.map((f: string, j: number) => (
                      <li key={j}>✓ {f}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#"
                  className={`py-2.5 text-center text-xs font-bold rounded-lg shadow-sm ${
                    item.isFeatured
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      );

    case 'products': {
      const uniqueCategories = ['All', ...Array.from(new Set(dbProducts.map((p) => p.category || 'General')))];
      const uniqueBrands = Array.from(new Set(dbProducts.map((p) => p.brand || '').filter(Boolean)));
      const displayBrands = uniqueBrands.length > 0 ? uniqueBrands : ['Louis Philippe', 'Levis', 'Zara', 'Roadster', 'Allen Solly'];

      // Deterministic processing to attach brand, discount, color, rating
      const processedProducts = dbProducts.map((p) => {
        const discountPercent = p.discount ?? (p.id ? (p.id % 3) * 10 + 10 : 15);
        const brandName = p.brand ?? ['Louis Philippe', 'Levis', 'Zara', 'Roadster', 'Allen Solly'][(p.id || 0) % 5];
        const ratingVal = p.rating ?? (4.0 + ((p.id || 0) % 10) / 10);
        const colorVal = p.color ?? ['Black', 'Blue', 'White', 'Grey'][(p.id || 0) % 4];
        return {
          ...p,
          discount: discountPercent,
          brand: brandName,
          rating: ratingVal,
          color: colorVal,
        };
      });

      // Apply Filters
      const filteredDbProducts = processedProducts.filter((p) => {
        // Category filter
        if (selectedCat !== 'All' && (p.category || 'General') !== selectedCat) {
          return false;
        }

        // Search text
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchDesc = p.description?.toLowerCase().includes(query) || false;
          const matchBrand = p.brand?.toLowerCase().includes(query) || false;
          if (!matchName && !matchDesc && !matchBrand) return false;
        }

        // Price filter
        if (priceRange !== 'all') {
          // Detect USD vs INR
          const isUSD = p.price < 200;
          if (priceRange === 'under') {
            if (isUSD ? p.price > 50 : p.price > 500) return false;
          } else if (priceRange === 'between') {
            if (isUSD ? (p.price < 50 || p.price > 150) : (p.price < 500 || p.price > 1500)) return false;
          } else if (priceRange === 'over') {
            if (isUSD ? p.price < 150 : p.price < 1500) return false;
          }
        }

        // Brand checkboxes
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand || '')) {
          return false;
        }

        // Color selection
        if (selectedColor !== 'all' && p.color !== selectedColor) {
          return false;
        }

        // Rating threshold
        if (selectedRating > 0 && (p.rating || 0) < selectedRating) {
          return false;
        }

        return true;
      });

      return (
        <div className={`py-20 px-6 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-4 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {escapeHtml(c.title || 'Products Catalog')}
            </h2>
            <p className="muted-text text-xs font-medium">
              {escapeHtml(c.subtitle || 'Explore our latest releases and premium essentials.')}
            </p>
          </div>

          {/* Layout Mode Selector Option */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Layout View:</span>
            <div className="bg-slate-100/80 p-1 rounded-xl border border-slate-200/50 flex gap-1 shadow-sm">
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 transition cursor-pointer border-0 ${
                  layoutMode === 'grid'
                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200/30'
                    : 'text-slate-550 hover:text-slate-800 bg-transparent'
                }`}
              >
                <span>📱</span> Grid Layout
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('swiggy')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 transition cursor-pointer border-0 ${
                  layoutMode === 'swiggy'
                    ? 'bg-white text-orange-655 shadow-sm border border-slate-200/30'
                    : 'text-slate-500 hover:text-orange-600 bg-transparent'
                }`}
              >
                <span>🍔</span> Zomato / Swiggy Menu
              </button>
            </div>
          </div>

          {layoutMode === 'grid' ? (
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start">
              {/* Left Filters Panel */}
              <aside className="w-full lg:w-64 bg-slate-50 border border-slate-200/60 p-6 rounded-3xl space-y-6 text-left shrink-0 shadow-inner">
                {/* Search query */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Search</h4>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalog..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-905 outline-none focus:border-indigo-500 transition shadow-sm"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Price Range</h4>
                  <div className="flex flex-col gap-2 text-xs font-semibold text-slate-605">
                    {[
                      { label: 'All Prices', value: 'all' },
                      { label: 'Under $50 / ₹500', value: 'under' },
                      { label: '$50 - $150 / ₹500 - ₹1500', value: 'between' },
                      { label: 'Over $150 / ₹1500', value: 'over' },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer hover:text-slate-800">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={priceRange === opt.value}
                          onChange={() => setPriceRange(opt.value)}
                          className="w-3.5 h-3.5 rounded text-indigo-650 focus:ring-0 cursor-pointer"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands checkboxes */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Filter by Brand</h4>
                  <div className="flex flex-col gap-2 text-xs font-semibold text-slate-605">
                    {displayBrands.map((brand) => {
                      const isChecked = selectedBrands.includes(brand);
                      return (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-slate-800">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedBrands((prev) =>
                                isChecked ? prev.filter((b) => b !== brand) : [...prev, brand]
                              );
                            }}
                            className="w-3.5 h-3.5 rounded text-indigo-650 focus:ring-0 cursor-pointer"
                          />
                          <span>{brand}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Color selects */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Select Color</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', 'Black', 'Blue', 'White', 'Grey'].map((col) => {
                      const isSelected = selectedColor === col;
                      return (
                        <button
                          key={col}
                          type="button"
                          onClick={() => setSelectedColor(col)}
                          className={`px-2.5 py-1 text-[9px] font-extrabold rounded-lg border transition cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-605 border-indigo-605 text-white shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350'
                          }`}
                        >
                          {col === 'all' ? 'All' : col}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ratings */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Minimum Rating</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[0, 4.0, 4.2, 4.5].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setSelectedRating(stars)}
                        className={`px-2.5 py-1 text-[9px] font-black rounded-lg border transition cursor-pointer flex items-center gap-0.5 ${
                          selectedRating === stars
                            ? 'bg-indigo-605 border-indigo-605 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350'
                        }`}
                      >
                        {stars === 0 ? 'All' : `★ ${stars.toFixed(1)}`}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Right Side: Grid */}
              <div className="flex-1 w-full space-y-6">
                {/* Category Filter Navigation */}
                {dbProducts && dbProducts.length > 0 && (
                  <div className="flex flex-wrap gap-2 pb-2">
                    {uniqueCategories.map((cat) => {
                      const isActive = selectedCat === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCat(cat)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer border ${
                            isActive
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                              : 'bg-white border-slate-200 text-slate-655 hover:border-slate-350'
                          }`}
                        >
                          {escapeHtml(cat)}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDbProducts && filteredDbProducts.length > 0 ? (
                    filteredDbProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onAddToCart={onAddToCart}
                        layout="grid"
                        onProductClick={onProductClick}
                        isWishlisted={wishlist.includes(p.id || 0)}
                        onToggleWishlist={onToggleWishlist}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 text-slate-400 text-xs font-semibold">
                      No products match your selected filters.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Swiggy/Zomato style split Layout */
            <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto items-start">
              {/* Left Sticky category Navigation Sidebar */}
              <aside className="w-full md:w-56 flex-shrink-0 md:sticky md:top-24 bg-white/50 backdrop-blur-md md:bg-transparent border border-slate-200/50 md:border-0 md:border-r md:border-slate-205/60 p-4 md:p-0 md:pr-6 rounded-2xl md:rounded-none">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 hidden md:block">
                  Menu Categories
                </h3>
                
                {/* Horizontal scroll on mobile, vertical list on desktop */}
                <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-1.5 pb-2 md:pb-0 scrollbar-none">
                  {uniqueCategories.map((cat) => {
                    const isActive = selectedCat === cat;
                    const count = cat === 'All' ? dbProducts.length : dbProducts.filter(p => (p.category || 'General') === cat).length;
                    
                    let catIcon = '🍽️';
                    const catLower = cat.toLowerCase();
                    if (catLower.includes('pizza')) catIcon = '🍕';
                    else if (catLower.includes('burger')) catIcon = '🍔';
                    else if (catLower.includes('pasta') || catLower.includes('noodle')) catIcon = '🍝';
                    else if (catLower.includes('salad')) catIcon = '🥗';
                    else if (catLower.includes('dessert') || catLower.includes('cake')) catIcon = '🍰';
                    else if (catLower.includes('drink') || catLower.includes('beverage')) catIcon = '🥤';
                    else if (catLower.includes('all')) catIcon = '🍽️';
                    
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCat(cat)}
                        className={`flex-shrink-0 flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer border-0 w-full ${
                          isActive
                            ? 'bg-orange-50 text-orange-655 border-l-4 border-orange-500 pl-2 shadow-sm'
                            : 'text-slate-655 hover:bg-slate-100/50 hover:text-slate-900 bg-white/40 md:bg-transparent border border-slate-200/40 md:border-0'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{catIcon}</span>
                          <span className="truncate max-w-[100px] md:max-w-none">{escapeHtml(cat)}</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-orange-100 text-orange-655' : 'bg-slate-100 text-slate-450'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Right Side: Stack of Food rows */}
              <div className="flex-1 w-full space-y-4">
                {filteredDbProducts && filteredDbProducts.length > 0 ? (
                  filteredDbProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAddToCart={onAddToCart}
                      layout="horizontal"
                      onProductClick={onProductClick}
                      isWishlisted={wishlist.includes(p.id || 0)}
                      onToggleWishlist={onToggleWishlist}
                    />
                  ))
                ) : (
                  <div className="text-center py-16 bg-slate-50/30 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs animate-pulse font-medium">
                    No food items found in this category.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    case 'faq':
      return (
        <div className={`py-20 px-6 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">{c.title}</h2>
          </div>
          <div className="space-y-4 max-w-xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div key={i} className="p-5 bg-white/60 border border-white/40 rounded-xl shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 mb-2 cursor-pointer">
                  <span>{item.question}</span>
                  <span>+</span>
                </div>
                <p className="muted-text text-xs leading-relaxed font-medium">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'footer': {
      const footerLayout = c.layout || 'simple';
      if (footerLayout === 'directory') {
        return (
          <div
            className={`py-12 px-6 border-t border-slate-100 transition-colors duration-300 ${themeClass}`}
          >
            <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 mb-8 text-[11px] text-slate-500 leading-relaxed font-medium">
              <div>
                <h4 className="font-bold text-slate-900 uppercase mb-3">Shop</h4>
                <ul className="space-y-1.5">
                  <li>Best sellers</li>
                  <li>New Arrivals</li>
                  <li>Discounts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 uppercase mb-3">Support</h4>
                <ul className="space-y-1.5">
                  <li>Contact Us</li>
                  <li>FAQ Help</li>
                  <li>Shipments</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 uppercase mb-3">Branding</h4>
                <ul className="space-y-1.5">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Store Policy</li>
                </ul>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-semibold text-center max-w-4xl mx-auto">
              {escapeHtml(c.text)}
            </div>
          </div>
        );
      }
      return (
        <div
          className={`py-10 px-6 max-w-5xl mx-auto flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 transition-colors duration-300 ${themeClass}`}
        >
          <div>{escapeHtml(c.text)}</div>
          <div className="flex gap-4">
            {footerLayout === 'socials' ? (
              <div className="flex gap-3 text-slate-400 font-bold select-none flex-wrap">
                {c.socials && c.socials.length > 0 ? (
                  c.socials.map((soc: any, idx: number) => (
                    <a
                      key={idx}
                      href={soc.url || '#'}
                      className="hover:text-slate-600 transition flex items-center gap-1"
                    >
                      <span>{escapeHtml(soc.icon)}</span>
                      <span>{escapeHtml(soc.label)}</span>
                    </a>
                  ))
                ) : (
                  <>
                    <span>📘 Facebook</span>
                    <span>🐦 Twitter</span>
                    <span>📸 Instagram</span>
                  </>
                )}
              </div>
            ) : (
              <a href="#" className="hover:underline font-bold">
                Privacy Policy
              </a>
            )}
          </div>
        </div>
      );
    }
    case 'image_banner': {
      return (
        <div className={`relative h-80 flex items-center justify-center text-center px-6 overflow-hidden ${themeClass}`}>
          <img src={c.imageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80'} className="absolute inset-0 w-full h-full object-cover brightness-[0.45]" alt="banner" />
          <div className="relative z-10 max-w-xl space-y-3">
            {c.subtitle && (
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                {c.subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {c.title || 'Premium Banner Title'}
            </h2>
            {c.btnText && (
              <div className="pt-2">
                <a href={c.btnUrl || '#'} className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded text-xs font-bold shadow-md hover:bg-indigo-700 transition">
                  {c.btnText}
                </a>
              </div>
            )}
          </div>
        </div>
      );
    }
    case 'text_block': {
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass}`}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{c.title || 'Brand Story & Mission'}</h2>
            <p className="muted-text text-xs leading-relaxed whitespace-pre-wrap font-medium">
              {c.text || 'We are dedicated to crafting high-quality products that merge form, utility, and modern details. Every item in our store is hand-curated and authenticated by experts.'}
            </p>
          </div>
        </div>
      );
    }
    case 'gallery': {
      const imagesList = c.images || [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80'
      ];
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">{c.title || 'Visual Gallery Highlights'}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {imagesList.map((img: string, idx: number) => (
              <div key={idx} className="h-44 bg-slate-50 border border-slate-200/50 rounded-xl overflow-hidden shadow-sm">
                <img src={img} className="w-full h-full object-cover hover:scale-105 transition duration-300" alt={`gallery-img-${idx}`} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    case 'contact_form': {
      const fields = c.fields || ['Name', 'Email', 'Inquiry Type', 'Message'];
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(c.title ? `Thank you! Your ${c.title} details have been submitted.` : 'Thank you! Your message has been sent successfully.');
              (e.target as HTMLFormElement).reset();
            }}
            className="max-w-md mx-auto bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm text-left"
          >
            <h3 className="text-sm font-extrabold text-slate-800 mb-4 text-center">{c.title || 'Send a Message'}</h3>
            <div className="space-y-4">
              {fields.map((f: string, idx: number) => (
                <div key={idx}>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">{f}</label>
                  {f === 'Message' ? (
                    <textarea required rows={3} placeholder={`Enter your ${f.toLowerCase()}...`} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 transition resize-none text-slate-900" />
                  ) : (
                    <input required type={f === 'Email' ? 'email' : 'text'} placeholder={`Enter your ${f.toLowerCase()}...`} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 transition text-slate-900" />
                  )}
                </div>
              ))}
              <button type="submit" className="w-full py-2.5 bg-indigo-650 text-white font-bold rounded-xl text-[10px] shadow-sm hover:bg-indigo-700 transition cursor-pointer">
                {c.btnText || 'Submit Details'}
              </button>
            </div>
          </form>
        </div>
      );
    }
    case 'testimonials': {
      const itemsList = c.items || [
        { quote: 'The customer service and product quality are both outstanding! Recommending them to all my colleagues.', author: 'Sarah Jenkins', role: 'Premium Buyer' },
        { quote: 'A beautiful shopping interface and high-speed delivery. Truly a state-of-the-art store experience.', author: 'David Miller', role: 'Verified Customer' }
      ];
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">{c.title || 'What Our Customers Say'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {itemsList.map((item: any, idx: number) => (
              <div key={idx} className="p-6 bg-white/60 border border-slate-200/50 rounded-xl shadow-sm flex flex-col justify-between text-left">
                <p className="text-xs italic text-slate-605 mb-4 leading-relaxed font-medium">"{item.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-800">{item.author}</h4>
                    <span className="text-[9px] text-slate-400 font-semibold">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
}

function escapeHtml(string: string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
