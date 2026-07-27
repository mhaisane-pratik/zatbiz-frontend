'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  layout?: 'grid' | 'horizontal';
  onProductClick?: (p: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (p: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  layout = 'grid',
  onProductClick,
  isWishlisted = false,
  onToggleWishlist,
}: ProductCardProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const parsedVariants = product.variants
    ? product.variants
        .split(';')
        .map((v: string) => {
          const parts = v.split(':');
          if (parts.length < 2) return null;
          return {
            name: parts[0].trim(),
            options: parts[1]
              .split(',')
              .map((o: string) => o.trim())
              .filter(Boolean),
          };
        })
        .filter(Boolean)
    : [];

  useEffect(() => {
    const defaults: Record<string, string> = {};
    parsedVariants.forEach((v: any) => {
      if (v.options.length > 0) {
        defaults[v.name] = v.options[0];
      }
    });
    setSelectedVariants(defaults);
  }, [product.variants]);

  const handleSelectVariant = (name: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [name]: value }));
  };

  const isVeg = !product.name.toLowerCase().includes('chicken') && 
                !product.name.toLowerCase().includes('beef') && 
                !product.name.toLowerCase().includes('mutton') &&
                !product.name.toLowerCase().includes('meat') &&
                !product.name.toLowerCase().includes('fish') &&
                !product.name.toLowerCase().includes('steak') &&
                !product.name.toLowerCase().includes('pork');

  // Real Estate layout check
  const isRealEstate = ['residential', 'commercial', 'rental', 'builder', 'property dealer', 'luxury'].includes(product.category?.toLowerCase() || '') || 
                       product.variants?.includes('Area:') || 
                       product.variants?.includes('Bedrooms:');

  const parseVariantsForRE = (variantsStr: string = '') => {
    const res: any = { area: '', bedrooms: '', bathrooms: '', amenities: '', video: '', documents: '' };
    if (!variantsStr) return res;
    variantsStr.split(';').forEach(part => {
      const [key, ...valParts] = part.split(':');
      const val = valParts.join(':').trim();
      if (key && val) {
        const k = key.trim().toLowerCase();
        if (k === 'area') res.area = val;
        else if (k === 'bedrooms') res.bedrooms = val;
        else if (k === 'bathrooms') res.bathrooms = val;
        else if (k === 'amenities') res.amenities = val;
        else if (k === 'video') res.video = val;
        else if (k === 'documents') res.documents = val;
      }
    });
    return res;
  };

  const discountPercent = product.discount ?? (product.id ? (product.id % 3) * 10 + 10 : 15); // 10%, 20%, 30%
  const originalPrice = product.price / (1 - discountPercent / 100);
  const brandName = product.brand ?? ['Louis Philippe', 'Levis', 'Zara', 'Roadster', 'Allen Solly'][(product.id || 0) % 5];
  const ratingVal = product.rating ?? (4.0 + ((product.id || 0) % 10) / 10);

  // --- 1. REAL ESTATE GRID LAYOUT ---
  if (isRealEstate && layout === 'grid') {
    const reInfo = parseVariantsForRE(product.variants || '');
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-[24px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-500 overflow-hidden flex flex-col justify-between relative group h-full">
        {/* Wishlist Heart button */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full border border-slate-100 shadow-sm cursor-pointer hover:scale-110 active:scale-90 transition z-10"
          >
            <span className="text-xs">{isWishlisted ? '❤️' : '🤍'}</span>
          </button>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white rounded-xl text-[9px] font-black uppercase tracking-widest px-2.5 py-1 shadow-md z-10 border border-white/10">
          {product.category || 'Residential'}
        </div>

        <div>
          {/* Image Canvas */}
          <div className="h-56 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden cursor-pointer relative" onClick={() => onProductClick?.(product)}>
            <img
              src={product.imageUrl}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80';
              }}
              alt={product.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
          </div>

          <div className="p-5 space-y-3 text-left">
            {/* Title & Location */}
            <div>
              <h3 
                onClick={() => onProductClick?.(product)}
                className="font-black text-slate-800 text-sm tracking-tight cursor-pointer hover:text-indigo-650 transition leading-snug line-clamp-1"
              >
                {product.name}
              </h3>
              <span className="text-[10px] text-slate-400 font-bold block mt-1">
                📍 {product.brand || 'Location Unspecified'}
              </span>
            </div>

            {/* BHK, Bath, Area Specification table */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200/50 rounded-2xl p-2.5 text-center text-[10px] font-bold text-slate-655 shadow-inner">
              <div>
                <span className="block text-[8px] text-slate-400 uppercase font-black tracking-wider mb-0.5">Area</span>
                <span className="font-extrabold">{reInfo.area || 'N/A'}</span>
              </div>
              <div>
                <span className="block text-[8px] text-slate-400 uppercase font-black tracking-wider mb-0.5">BHK</span>
                <span className="font-extrabold">{reInfo.bedrooms || 'N/A'} BHK</span>
              </div>
              <div>
                <span className="block text-[8px] text-slate-400 uppercase font-black tracking-wider mb-0.5">Baths</span>
                <span className="font-extrabold">{reInfo.bathrooms || 'N/A'} Baths</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-semibold line-clamp-2 leading-relaxed">
              {product.description || 'Premium apartment/villa featuring outstanding structural engineering, beautiful fixtures, and high-end security specifications.'}
            </p>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="p-5 pt-0 border-t border-slate-100/60 mt-3 flex items-center justify-between">
          <div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Asking Price</span>
            <span className="text-base font-black text-indigo-650 leading-none">
              ₹{product.price?.toLocaleString()}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="px-4.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-[10px] shadow-md transition cursor-pointer hover:scale-[1.03] active:scale-[0.97] uppercase tracking-wider"
          >
            Inquire Now
          </button>
        </div>
      </div>
    );
  }

  // --- 2. REAL ESTATE HORIZONTAL LAYOUT ---
  if (isRealEstate && layout === 'horizontal') {
    const reInfo = parseVariantsForRE(product.variants || '');
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-[24px] p-5 flex flex-col sm:flex-row justify-between items-stretch gap-6 hover:shadow-xl hover:border-indigo-250 transition duration-500 relative group">
        {/* Wishlist Heart button */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full border border-slate-100 shadow-sm cursor-pointer hover:scale-110 active:scale-90 transition z-10"
          >
            <span className="text-xs">{isWishlisted ? '❤️' : '🤍'}</span>
          </button>
        )}

        {/* Left Image */}
        <div className="w-full sm:w-48 h-40 sm:h-auto min-h-[140px] relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-150 shrink-0 cursor-pointer" onClick={() => onProductClick?.(product)}>
          <img
            src={product.imageUrl}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80';
            }}
            alt={product.name}
          />
          <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-white font-extrabold text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-lg border border-white/10">
            {product.category || 'Residential'}
          </span>
        </div>

        {/* Middle Details */}
        <div className="flex-1 flex flex-col justify-between space-y-3 text-left">
          <div className="space-y-1">
            <h3 
              onClick={() => onProductClick?.(product)}
              className="text-base font-black text-slate-900 leading-snug cursor-pointer hover:text-indigo-650 transition line-clamp-1"
            >
              {product.name}
            </h3>
            <span className="text-[10px] text-slate-400 font-bold block">
              📍 {product.brand || 'Location Unspecified'}
            </span>
          </div>

          <div className="flex gap-4 bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2 w-fit text-[10px] font-bold text-slate-655 shadow-inner">
            <span>📐 {reInfo.area || 'N/A'}</span>
            <span>•</span>
            <span>🛏️ {reInfo.bedrooms || 'N/A'} BHK</span>
            <span>•</span>
            <span>🚿 {reInfo.bathrooms || 'N/A'} Baths</span>
          </div>

          {product.description && (
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold line-clamp-2">
              {product.description}
            </p>
          )}

          {reInfo.amenities && (
            <div className="flex flex-wrap gap-1">
              {reInfo.amenities.split(',').slice(0, 3).map((am: string, i: number) => (
                <span key={i} className="bg-slate-100 text-slate-600 font-bold text-[8px] px-2 py-0.5 rounded">
                  ✓ {am.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right CTA */}
        <div className="flex flex-col justify-between items-end shrink-0 sm:border-l sm:border-slate-100 sm:pl-6 text-right self-stretch">
          <div className="space-y-0.5">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Asking Price</span>
            <span className="text-base font-black text-indigo-650 leading-none">
              ₹{product.price?.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="w-full sm:w-auto px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-[10px] shadow-md transition cursor-pointer hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider mt-4 sm:mt-0"
          >
            Inquire Now
          </button>
        </div>
      </div>
    );
  }

  // --- 3. E-COMMERCE HORIZONTAL LAYOUT ---
  if (layout === 'horizontal') {
    return (
      <div className="bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start gap-6 hover:shadow-md hover:border-slate-300 transition duration-350 relative">
        {/* Wishlist Heart button */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full border border-slate-100 shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition"
          >
            <span className="text-sm">{isWishlisted ? '❤️' : '🤍'}</span>
          </button>
        )}

        {/* Left Details */}
        <div className="flex-1 space-y-2 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            {product.category?.toLowerCase().includes('pizza') || product.category?.toLowerCase().includes('burger') ? (
              <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${
                isVeg ? 'border-emerald-500 bg-emerald-50/50' : 'border-rose-500 bg-rose-50/50'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              </span>
            ) : null}
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">
              {brandName}
            </span>
            <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-full">
              {product.category || 'General'}
            </span>
            <span className={`text-[9px] font-extrabold ${
              product.available === false || product.stock <= 0 ? 'text-rose-500' : 'text-slate-400'
            }`}>
              {product.available === false || product.stock <= 0 ? 'Out of Stock' : 'In Stock'}
            </span>
          </div>

          <div>
            <h3 
              onClick={() => onProductClick?.(product)}
              className="text-base font-extrabold text-slate-805 leading-tight cursor-pointer hover:text-indigo-650 transition"
            >
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm font-black text-slate-950">
                ${product.price?.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 line-through font-semibold">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="text-[10px] text-emerald-600 font-extrabold">
                {discountPercent}% OFF
              </span>
            </div>
          </div>

          {product.description && (
            <p className="text-xs text-slate-500 leading-relaxed max-w-xl font-medium">
              {product.description}
            </p>
          )}

          <div className="flex items-center gap-2.5 text-[10px] font-bold text-slate-400">
            <span className="flex items-center gap-0.5 text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md">
              ★ {ratingVal.toFixed(1)}
            </span>
            <span>•</span>
            <span>Fast Shipping Available</span>
          </div>

          {parsedVariants.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-slate-100/60 mt-1">
              {parsedVariants.map((v: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {v.name}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {v.options.map((opt: string, oIdx: number) => {
                      const isSelected = selectedVariants[v.name] === opt;
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectVariant(v.name, opt)}
                          className={`px-2 py-0.5 rounded text-[8px] font-bold border transition cursor-pointer ${
                            isSelected
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side Image & button */}
        <div className="relative w-full sm:w-36 h-36 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-inner self-center sm:self-start">
          <img
            onClick={() => onProductClick?.(product)}
            src={product.imageUrl}
            className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=450&auto=format&fit=crop&q=80';
            }}
            alt={product.name}
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <button
              type="button"
              disabled={product.available === false || product.stock <= 0}
              onClick={() => onAddToCart(product)}
              className="px-5 py-1.5 bg-white border border-slate-250/60 text-emerald-600 font-black rounded-lg text-[10px] shadow-md hover:bg-emerald-50 disabled:bg-slate-100 disabled:text-slate-400 transition cursor-pointer hover:scale-105 uppercase tracking-wider min-w-[70px] text-center"
            >
              {product.available === false || product.stock <= 0 ? 'Out' : 'ADD +'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 4. E-COMMERCE GRID LAYOUT (DEFAULT) ---
  return (
    <div className="bg-white border border-slate-250/50 rounded-3xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col justify-between relative group">
      {/* Wishlist toggle */}
      {onToggleWishlist && (
        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full border border-slate-100 shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition z-10"
        >
          <span className="text-xs">{isWishlisted ? '❤️' : '🤍'}</span>
        </button>
      )}

      {/* Discount Badge */}
      <div className="absolute top-3 left-3 bg-emerald-600 text-white rounded-lg text-[9px] font-black px-2 py-0.5 shadow-sm z-10">
        {discountPercent}% OFF
      </div>

      <div>
        <div className="h-60 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => onProductClick?.(product)}>
          <img
            src={product.imageUrl}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=450&auto=format&fit=crop&q=80';
            }}
            alt={product.name}
          />
        </div>

        <div className="p-5 text-left">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {brandName}
            </span>
            <span
              className={`text-[10px] font-extrabold ${
                product.available === false
                  ? 'text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full'
                  : product.stock <= 0
                  ? 'text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full'
                  : product.stock <= 5
                  ? 'text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full'
                  : 'text-slate-400'
              }`}
            >
              {product.available === false
                ? 'Unavailable'
                : product.stock <= 0
                ? 'Out of Stock'
                : product.stock <= 5
                ? `Only ${product.stock} left`
                : 'In Stock'}
            </span>
          </div>

          <h3 
            onClick={() => onProductClick?.(product)}
            className="font-extrabold text-sm text-slate-800 mb-1 cursor-pointer hover:text-indigo-650 transition line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3 font-medium">
            {product.description || `Premium quality item branded by ${brandName}.`}
          </p>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 mb-3">
            <span>★ {ratingVal.toFixed(1)}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400 font-semibold">Free Delivery</span>
          </div>

          {parsedVariants.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-100 mb-2">
              {parsedVariants.map((v: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                    {v.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {v.options.map((opt: string, oIdx: number) => {
                      const isSelected = selectedVariants[v.name] === opt;
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectVariant(v.name, opt)}
                          className={`px-2 py-1 rounded text-[9px] font-bold border transition cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-650 border-indigo-650 text-white'
                              : 'bg-white border-slate-200 text-slate-605 hover:border-slate-350'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100">
          <div className="flex flex-col text-left">
            <span className="text-xs text-slate-400 line-through font-semibold">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="text-base font-extrabold text-slate-900 font-sans leading-none">
              ${product.price?.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            disabled={product.available === false || product.stock <= 0}
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 disabled:bg-slate-200 text-white font-bold rounded-xl text-[10px] shadow-sm transition cursor-pointer"
          >
            {product.available === false
              ? 'Unavailable'
              : product.stock <= 0
              ? 'Sold Out'
              : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
