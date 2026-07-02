'use client';

import React from 'react';
import Link from 'next/link';
import { api } from '@/services/api';
import { Product } from '@/types';

const FASHION_NICHE_ASSETS: Record<string, {
  brandNameSuffix: string;
  heroTagline: string;
  heroTitle: string;
  heroAccentWord: string;
  heroSubtitle: string;
  heroImgLeft: string;
  heroImgRight: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImg: string;
  accentColor: string;
  accentBg: string;
  accentColorHoverClass: string;
  accentShadowClass: string;
  categoryList: Array<{ name: string; desc: string; img: string }>;
  mockProducts: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    discount?: string;
    category: string;
    imageUrl: string;
  }>;
}> = {
  fashion_men: {
    brandNameSuffix: 'Men',
    heroTagline: 'THE GENTLEMAN\'S CLOSET',
    heroTitle: 'Style That Defines ',
    heroAccentWord: 'You',
    heroSubtitle: 'Discover the latest trends in men\'s apparel. Premium quality, perfect fit, just for you.',
    heroImgLeft: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    heroImgRight: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    bannerTitle: 'Tailored to Perfection',
    bannerSubtitle: 'Get up to 30% off on all formal wear. Express shipping available.',
    bannerImg: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'text-[#6366f1]',
    accentBg: 'bg-[#6366f1]',
    accentColorHoverClass: 'hover:bg-[#4f46e5]',
    accentShadowClass: 'shadow-[#6366f1]/20',
    categoryList: [
      { name: 'Shirts', desc: 'Premium Linen', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
      { name: 'Jackets', desc: 'Leather & Casual', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
      { name: 'Suits', desc: 'Bespoke Tailored', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400' },
      { name: 'Denim', desc: 'Slim & Relaxed', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
      { name: 'Shoes', desc: 'Oxford & Sneakers', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
      { name: 'Watches', desc: 'Luxury Accents', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400' }
    ],
    mockProducts: [
      {
        id: 1011,
        name: 'Oversized Hoodie',
        description: 'Discover the latest trends in fashion. Premium quality, perfect fit, just for you.',
        price: 1299.00,
        originalPrice: 1999.00,
        discount: '35%',
        category: "Men's Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1013,
        name: 'Linen Shirt',
        description: 'Classic lightweight linen button-down shirt with a relaxed tailored fit, perfect for casual outings.',
        price: 1099.00,
        originalPrice: 1699.00,
        discount: '35%',
        category: "Men's Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1014,
        name: 'Slim Fit Jeans',
        description: 'Premium stretch denim slim-fit jeans featuring a mid-rise waist and classic five-pocket construction.',
        price: 1399.00,
        originalPrice: 2099.00,
        discount: '33%',
        category: "Men's Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1015,
        name: 'Bomber Jacket',
        description: 'Sleek black lightweight bomber jacket with ribbed cuffs, zip closure, and side utility pockets.',
        price: 1799.00,
        originalPrice: 2699.00,
        discount: '33%',
        category: "Men's Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1016,
        name: 'Bespoke Tweed Blazer',
        description: 'Premium tailored tweed blazer with classic lapels and double button closures for gentlemen.',
        price: 3499.00,
        originalPrice: 4999.00,
        discount: '30%',
        category: "Men's Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  fashion_women: {
    brandNameSuffix: 'Women',
    heroTagline: 'ELEGANCE & GRACE',
    heroTitle: 'Chic Women\'s ',
    heroAccentWord: 'Collection',
    heroSubtitle: 'Explore elegant summer dresses, designer handbags, and casual blazers tailored for your everyday grace.',
    heroImgLeft: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
    heroImgRight: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
    bannerTitle: 'Signature Grace & Glow',
    bannerSubtitle: 'Step out in confidence. 25% off all designer wear for a limited time.',
    bannerImg: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'text-[#db2777]',
    accentBg: 'bg-[#db2777]',
    accentColorHoverClass: 'hover:bg-[#be185d]',
    accentShadowClass: 'shadow-[#db2777]/20',
    categoryList: [
      { name: 'Dresses', desc: 'Summer & Evening', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400' },
      { name: 'Blouses', desc: 'Silk & Linen', img: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=400' },
      { name: 'Handbags', desc: 'Italian Leather', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
      { name: 'Heels', desc: 'Elegant Comfort', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400' },
      { name: 'Jewelry', desc: 'Gold & Silver', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
      { name: 'Sunwear', desc: 'Summer Accents', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400' }
    ],
    mockProducts: [
      {
        id: 1021,
        name: 'Floral Summer Dress',
        description: 'Flowing ankle-length chiffon maxi dress with delicate floral prints, V-neckline, and adjustable waist-tie.',
        price: 1499.00,
        originalPrice: 2299.00,
        discount: '35%',
        category: "Women's Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1022,
        name: 'Silk Party Blouse',
        description: 'Elegantly tailored 100% natural silk blouse with a glossy satin finish, perfect for evening parties.',
        price: 1199.00,
        originalPrice: 1799.00,
        discount: '33%',
        category: "Women's Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1023,
        name: 'Italian Leather Handbag',
        description: 'Luxurious tanned leather handbag with spacious compartments, gold-toned zipper hardware, and detatchable strap.',
        price: 2499.00,
        originalPrice: 3499.00,
        discount: '28%',
        category: "Accessories",
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1024,
        name: 'Elegant High Heels',
        description: 'Pointed toe high heels with velvet outer finish and padded footbeds to keep you comfortable all evening.',
        price: 1899.00,
        originalPrice: 2699.00,
        discount: '29%',
        category: "Footwear",
        imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1025,
        name: 'Gold Charm Necklace',
        description: 'Delicate 18k gold plated chain with classic starburst and pearl charms to complete your look.',
        price: 4999.00,
        originalPrice: 6999.00,
        discount: '28%',
        category: "Jewelry",
        imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  fashion_kids: {
    brandNameSuffix: 'Kids',
    heroTagline: 'PLAYFUL & COZY',
    heroTitle: 'Joyful Kids ',
    heroAccentWord: 'Playwear',
    heroSubtitle: 'Durable dungarees, cozy cartoon hoodies, and soft cotton sleepwear sets to keep your little ones active and cozy.',
    heroImgLeft: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
    heroImgRight: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
    bannerTitle: 'Active Play, Active Wear',
    bannerSubtitle: 'Buy 2 Get 1 Free on all kids cartoon hoodies and playwear overalls.',
    bannerImg: 'https://images.unsplash.com/photo-1471286174240-e7a8853b5e40?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'text-[#059669]',
    accentBg: 'bg-[#059669]',
    accentColorHoverClass: 'hover:bg-[#047857]',
    accentShadowClass: 'shadow-[#059669]/20',
    categoryList: [
      { name: 'Hoodies', desc: 'Soft Cartoon', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400' },
      { name: 'Dungarees', desc: 'Denim Playwear', img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400' },
      { name: 'Sleepwear', desc: '100% Organic Cotton', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400' },
      { name: 'Sneakers', desc: 'Lightweight Velcro', img: 'https://images.unsplash.com/photo-1514989940723-e8e5163ccbe8?w=400' },
      { name: 'Tees', desc: 'Funny Graphics', img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400' },
      { name: 'Overalls', desc: 'Comfy Outfits', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400' }
    ],
    mockProducts: [
      {
        id: 1031,
        name: 'Cartoon Dino Hoodie',
        description: 'Super soft brushed fleece hoodie with fun dinosaur spikes on the hood. Kids absolute favorite.',
        price: 899.00,
        originalPrice: 1499.00,
        discount: '40%',
        category: "Kids Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1032,
        name: 'Denim Dungaree Set',
        description: 'Durable stretch denim dungaree with an inner striped cotton tee, perfect for playground adventures.',
        price: 999.00,
        originalPrice: 1599.00,
        discount: '37%',
        category: "Kids Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1033,
        name: 'Organic Cotton Sleepwear',
        description: 'Two-piece snug-fitting sleepwear set made from 100% organic cotton yarn-dyed breathable fabrics.',
        price: 799.00,
        originalPrice: 1199.00,
        discount: '33%',
        category: "Kids Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1034,
        name: 'Velcro Play Sneakers',
        description: 'Lightweight breathable mesh sneakers with double velcro straps to make wearing them a breeze.',
        price: 1199.00,
        originalPrice: 1799.00,
        discount: '33%',
        category: "Footwear",
        imageUrl: 'https://images.unsplash.com/photo-1514989940723-e8e5163ccbe8?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1035,
        name: 'Cute Graphic Bear Tee',
        description: 'Classic crewneck cotton tee featuring a charming hand-drawn sleeping bear graphics details.',
        price: 499.00,
        originalPrice: 799.00,
        discount: '37%',
        category: "Kids Clothing",
        imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  cloth: {
    brandNameSuffix: 'Boutique',
    heroTagline: 'THE FASHION HOUSE',
    heroTitle: 'Curated Apparel & ',
    heroAccentWord: 'Trends',
    heroSubtitle: 'Discover the latest runway trends, premium clothing collections, and everyday essentials designed for comfort.',
    heroImgLeft: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    heroImgRight: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
    bannerTitle: 'Elevate Your Look',
    bannerSubtitle: 'Flat 20% discount on all new season collections. Code: ELEGANCE',
    bannerImg: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'text-[#6366f1]',
    accentBg: 'bg-[#6366f1]',
    accentColorHoverClass: 'hover:bg-[#4f46e5]',
    accentShadowClass: 'shadow-[#6366f1]/20',
    categoryList: [
      { name: 'Men', desc: 'Collection', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400' },
      { name: 'Women', desc: 'Collection', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400' },
      { name: 'Kids', desc: 'Collection', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400' },
      { name: 'Denim', desc: 'Essentials', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
      { name: 'Shoes', desc: 'Premium Brands', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Accessories', desc: 'Lookbook Accents', img: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=400' }
    ],
    mockProducts: [
      {
        id: 1041,
        name: 'Classic Urban Hoodie',
        description: 'Premium heavyweight cotton loopback hoodie tailored for structured everyday comfort.',
        price: 1299.00,
        originalPrice: 1999.00,
        discount: '35%',
        category: "Apparel",
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1042,
        name: 'Summer Maxi Dress',
        description: 'Flowing printed chiffon maxi dress featuring adjustable double strap design details.',
        price: 1499.00,
        originalPrice: 2299.00,
        discount: '35%',
        category: "Apparel",
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1043,
        name: 'Cotton Linen Shirt',
        description: 'Breathable linen-cotton blended shirt with classic spread collar and chest pocket details.',
        price: 1099.00,
        originalPrice: 1699.00,
        discount: '35%',
        category: "Apparel",
        imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1044,
        name: 'Mid-Rise Denim Jeans',
        description: 'Authentic stone washed stretch denim jeans with regular tailored fit leg construction.',
        price: 1399.00,
        originalPrice: 2099.00,
        discount: '33%',
        category: "Apparel",
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1045,
        name: 'Lightweight Bomber Jacket',
        description: 'Sleek casual wind-resistant bomber jacket with ribbed trim and solid brass zippers.',
        price: 1799.00,
        originalPrice: 2699.00,
        discount: '33%',
        category: "Apparel",
        imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  fashion_footwear: {
    brandNameSuffix: 'Kicks',
    heroTagline: 'ELITE FOOTWEAR',
    heroTitle: 'Step Into Premium ',
    heroAccentWord: 'Comfort',
    heroSubtitle: 'Step into comfort and style with elite running sneakers, classic leather loafers, and active outdoor footwear.',
    heroImgLeft: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    heroImgRight: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    bannerTitle: 'Walk Your Way',
    bannerSubtitle: 'Enjoy 30% off on premium lifestyle kicks and running shoes.',
    bannerImg: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&auto=format&fit=crop&q=80',
    accentColor: 'text-[#f97316]',
    accentBg: 'bg-[#f97316]',
    accentColorHoverClass: 'hover:bg-[#ea580c]',
    accentShadowClass: 'shadow-orange-500/20',
    categoryList: [
      { name: 'Sneakers', desc: 'Sport & Lifestyle', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Formal', desc: 'Oxford Leather', img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400' },
      { name: 'Loafers', desc: 'Classic Casual', img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400' },
      { name: 'Running', desc: 'Performance Gear', img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400' },
      { name: 'Boots', desc: 'Adventure Leather', img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400' },
      { name: 'Sandals', desc: 'Summer Comfort', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400' }
    ],
    mockProducts: [
      {
        id: 1051,
        name: 'Retro Running Sneakers',
        description: 'Ultra-lightweight mesh sneakers with cushioning soles and vintage athletic profiles.',
        price: 2499.00,
        originalPrice: 3499.00,
        discount: '28%',
        category: "Footwear",
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1052,
        name: 'Oxford Leather Brogues',
        description: 'Handcrafted premium calfskin leather Oxford shoes with wingtip detailing and solid wooden heels.',
        price: 3999.00,
        originalPrice: 5499.00,
        discount: '27%',
        category: "Footwear",
        imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1053,
        name: 'Classic Suede Loafers',
        description: 'Easy slip-on Italian suede leather loafers with anti-skid rubber pads, tailored for office-to-street transitions.',
        price: 2799.00,
        originalPrice: 3999.00,
        discount: '30%',
        category: "Footwear",
        imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1054,
        name: 'Air Cushion Trail Runners',
        description: 'High performance active trail running shoes featuring breathable outer knits and grip-lock outsoles.',
        price: 3499.00,
        originalPrice: 4999.00,
        discount: '30%',
        category: "Footwear",
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 1055,
        name: 'Adventure Leather Boots',
        description: 'Waterproof full-grain oiled leather boots with triple-stitched seams and steel arch shanks for heavy tracking.',
        price: 4499.00,
        originalPrice: 5999.00,
        discount: '25%',
        category: "Footwear",
        imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80'
      }
    ]
  }
};

interface FashionStorefrontProps {
  projectId: number;
  projectConfig: any;
  dbProducts: Product[];
  wishlist: number[];
  cartCountQuantity: number;
  customerSession: { id: number; name: string; email: string } | null;
  setActiveView: (view: any) => void;
  openProductDetail: (product: Product) => void;
  handleToggleWishlist: (product: Product) => void;
  handleAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  addToast: (text: string, isError?: boolean) => void;
}

export default function FashionStorefront({
  projectId,
  projectConfig,
  dbProducts,
  wishlist,
  cartCountQuantity,
  customerSession,
  setActiveView,
  openProductDetail,
  handleToggleWishlist,
  handleAddToCart,
  addToast
}: FashionStorefrontProps) {
  const activeNicheKey = projectConfig.shopNiche || 'cloth';
  const niche = FASHION_NICHE_ASSETS[activeNicheKey] || FASHION_NICHE_ASSETS.cloth;
  const displayProducts = dbProducts.length > 0 ? dbProducts : niche.mockProducts;

  return (
    <div className="bg-[#fafbf9] min-h-screen text-slate-800 pb-20 font-sans relative overflow-hidden">
      {/* Dotted Grid Paper Style Look Background overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] border-8 border-stone-200/40"
        style={{
          backgroundImage: `radial-gradient(#000000 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Header */}
      <header className="px-6 md:px-16 py-5 flex items-center justify-between bg-[#fafbf9]/95 border-b border-[#e6e2da] sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Closet<span className={niche.accentColor}>.</span><span className="text-xs font-normal lowercase text-slate-400 font-sans ml-1">{niche.brandNameSuffix}</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-600">
          <a href="#home" className={`${niche.accentColor} transition`}>Home</a>
          <a href="#shop" className="hover:text-slate-900 transition">Shop</a>
          <a href="#categories" className="hover:text-slate-900 transition">Categories</a>
          <a href="#new-arrivals" className="hover:text-slate-900 transition">New Arrivals</a>
          <a href="#about" className="hover:text-slate-900 transition">About Us</a>
          <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-700 bg-transparent border-none cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Cart Icon */}
          <button 
            onClick={() => setActiveView('cart')} 
            className="relative p-2 hover:bg-slate-100 rounded-xl transition cursor-pointer text-slate-700 bg-transparent border-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCountQuantity > 0 && (
              <span className={`absolute -top-1 -right-1 ${niche.accentBg} text-white text-[9px] font-black h-5 w-5 rounded-full flex items-center justify-center border border-white`}>
                {cartCountQuantity}
              </span>
            )}
          </button>
          {customerSession ? (
            <Link 
              href={`/preview/${projectId}/dashboard`} 
              className={`px-5 py-2.5 ${niche.accentBg} ${niche.accentColorHoverClass} text-white rounded-none text-xs font-black uppercase tracking-wider transition shadow-sm border border-stone-900`}
            >
              Sign In
            </Link>
          ) : (
            <Link 
              href={`/preview/${projectId}/login`} 
              className={`px-5 py-2.5 ${niche.accentBg} ${niche.accentColorHoverClass} text-white rounded-none text-xs font-black uppercase tracking-wider transition shadow-sm border border-stone-900`}
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section with Lookbook Aesthetic */}
      <section id="home" className="px-6 md:px-16 py-12 md:py-24 border-b border-[#e6e2da]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-6 space-y-6 text-left relative z-10">
            <span className={`text-[10px] font-black ${niche.accentColor} bg-white border border-[#e6e2da] px-4 py-2 rounded-none uppercase tracking-widest shadow-sm`}>
              {niche.heroTagline}
            </span>
            <h2 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-none uppercase serif">
              {niche.heroTitle}<br/>
              <span className={`font-black italic ${niche.accentColor}`}>{niche.heroAccentWord}</span>
            </h2>
            <p className="text-slate-500 font-semibold text-sm leading-relaxed max-w-md font-serif">
              {niche.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#new-arrivals" 
                className={`px-8 py-3.5 ${niche.accentBg} ${niche.accentColorHoverClass} text-white font-black rounded-none text-xs uppercase tracking-widest shadow-md ${niche.accentShadowClass} hover:scale-[1.02] active:scale-[0.98] transition border border-stone-900`}
              >
                Shop Now ➔
              </a>
              <a 
                href="#categories" 
                className="px-8 py-3.5 bg-white border border-stone-300 hover:bg-slate-50 text-slate-700 font-black rounded-none text-xs uppercase tracking-widest shadow-sm transition hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Collections
              </a>
            </div>
          </div>
          
          {/* Hero Images Stack */}
          <div className="lg:col-span-6 relative flex justify-center z-10">
            <div className="relative w-full max-w-[450px] flex items-center justify-center gap-6">
              {/* Stylized backing paper cards */}
              <div className="absolute inset-0 bg-[#f5f2eb] border border-[#e6e2da] translate-x-4 translate-y-4 rounded-none z-0 shadow-sm" />
              
              <div className="relative w-1/2 aspect-[3/4] rounded-none overflow-hidden shadow-md border-4 border-white translate-y-4 hover:rotate-2 transition duration-300">
                <img 
                  src={niche.heroImgLeft} 
                  alt="Lookbook fashion" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative w-1/2 aspect-[3/4] rounded-none overflow-hidden shadow-md border-4 border-white -translate-y-4 hover:-rotate-2 transition duration-300">
                <img 
                  src={niche.heroImgRight} 
                  alt="New seasonal arrivals" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges in Paper Look */}
        <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#e6e2da]">
          <div className="flex items-center gap-4 p-5 rounded-none bg-white shadow-sm border border-[#e6e2da]">
            <div className={`w-12 h-12 rounded-none ${niche.accentBg} text-white flex items-center justify-center text-xl font-bold border border-stone-900`}>
              🚚
            </div>
            <div className="text-left">
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Free Shipping</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">On orders over ₹999</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-none bg-white shadow-sm border border-[#e6e2da]">
            <div className={`w-12 h-12 rounded-none ${niche.accentBg} text-white flex items-center justify-center text-xl font-bold border border-stone-900`}>
              🔄
            </div>
            <div className="text-left">
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Easy Returns</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">30 day return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-none bg-white shadow-sm border border-[#e6e2da]">
            <div className={`w-12 h-12 rounded-none ${niche.accentBg} text-white flex items-center justify-center text-xl font-bold border border-stone-900`}>
              🛡️
            </div>
            <div className="text-left">
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Secure Payment</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">100% secure checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section id="categories" className="py-20 px-6 md:px-16 border-b border-[#e6e2da]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-center justify-between">
            <div className="text-left space-y-1">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight serif">Shop By Category</h3>
              <div className={`w-12 h-1 ${niche.accentBg}`} />
            </div>
            <a href="#shop" className={`text-xs font-black uppercase tracking-widest ${niche.accentColor} hover:opacity-80 transition`}>View All</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {niche.categoryList.map((cat, idx) => (
              <div key={idx} className="group text-center cursor-pointer space-y-3">
                <div className="aspect-square rounded-none overflow-hidden border-2 border-stone-200 group-hover:border-slate-800 transition-all duration-350 shadow-sm relative">
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition duration-300 z-10" />
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">{cat.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Editorial Full-Bleed Banner */}
      <section className="px-6 md:px-16 py-12 border-b border-[#e6e2da]">
        <div className="max-w-7xl mx-auto rounded-none overflow-hidden relative aspect-[16/7] min-h-[320px] border border-stone-300 shadow-md">
          <img 
            src={niche.bannerImg} 
            alt="Editorial lookbook fashion banner" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center items-start px-8 md:px-16 text-left max-w-xl space-y-4 z-20">
            <span className="text-[10px] font-black text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-none uppercase tracking-widest border border-white/10">
              EDITORIAL LOOKBOOK
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight serif uppercase">
              {niche.bannerTitle}
            </h3>
            <p className="text-xs text-slate-200 font-semibold max-w-sm leading-relaxed font-serif">
              {niche.bannerSubtitle}
            </p>
            <div className="pt-2">
              <a 
                href="#shop" 
                className="inline-block px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-black rounded-none text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-[0.98] transition border border-stone-900"
              >
                View Lookbook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new-arrivals" className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-center justify-between">
            <div className="text-left space-y-1">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight serif">New Arrivals</h3>
              <div className={`w-12 h-1 ${niche.accentBg}`} />
            </div>
            <a href="#shop" className={`text-xs font-black uppercase tracking-widest ${niche.accentColor} hover:opacity-80 transition`}>View All</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {displayProducts.map((p: any) => {
              const isWishlisted = wishlist.includes(p.id!);
              const discountStr = p.discount || (p.originalPrice ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%` : '');
              
              return (
                <div key={p.id} className="bg-white rounded-none overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
                  <div className="relative aspect-[3/4] bg-slate-50 overflow-hidden cursor-pointer" onClick={() => openProductDetail(p)}>
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-102 transition duration-500" />
                    {discountStr && (
                      <span className={`absolute top-3 left-3 ${niche.accentBg} text-white text-[9px] font-black px-2.5 py-1 rounded-none border border-stone-900 shadow-sm`}>
                        -{discountStr}
                      </span>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(p);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-none bg-white hover:bg-slate-50 shadow-sm flex items-center justify-center text-slate-600 hover:text-rose-500 transition border border-stone-200 cursor-pointer"
                    >
                      <span className="text-sm leading-none">{isWishlisted ? '❤️' : '🤍'}</span>
                    </button>
                    {/* Hover Add to Cart Button */}
                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/40 to-transparent">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(p, 'M', 'Black', 1);
                        }}
                        className="w-full py-2.5 bg-white hover:bg-slate-900 hover:text-white text-slate-900 font-black text-[10px] uppercase tracking-wider rounded-none shadow-md border border-stone-900 cursor-pointer transition-colors duration-200"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-4 text-left space-y-1.5 flex-1 flex flex-col justify-between border-t border-stone-100">
                    <div className="space-y-1">
                      <p className={`text-[9px] ${niche.accentColor} font-black uppercase tracking-widest`}>{p.category}</p>
                      <h4 
                        onClick={() => openProductDetail(p)}
                        className="font-extrabold text-slate-800 text-xs group-hover:text-slate-950 transition cursor-pointer line-clamp-1 serif"
                      >
                        {p.name}
                      </h4>
                      {/* Ratings stars */}
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500 text-[10px] select-none">★★★★★</span>
                        <span className="text-[8px] text-slate-400 font-bold">(24)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-2 pt-1 border-t border-dashed border-stone-100 mt-2">
                      <span className="font-black text-slate-900 text-xs">₹{p.price.toLocaleString('en-IN')}</span>
                      {p.originalPrice && (
                        <span className="text-[10px] text-slate-400 font-bold line-through">
                          ₹{p.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription with dynamic accent colors */}
      <section className="py-20 px-6 md:px-16 border-t border-[#e6e2da] bg-white">
        <div className="max-w-4xl mx-auto text-center p-8 md:p-16 rounded-none bg-[#fbfbf9] border border-[#e6e2da] shadow-sm space-y-6 relative">
          <div className="absolute inset-0 bg-white/20 pointer-events-none z-0" />
          <span className="text-4xl block z-10 relative">📩</span>
          <div className="space-y-2 z-10 relative">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight serif">Get 20% Off On Your First Order</h3>
            <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto leading-relaxed font-serif">
              Subscribe to our newsletter and get exclusive offers, style tips, and early access to sales.
            </p>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              addToast('Subscribed! Use code CLOSET20 for 20% off.');
              const couponObj = {
                id: Date.now(),
                code: 'CLOSET20',
                discount: '20% OFF',
                desc: 'Extra 20% off on your newsletter subscription.',
                projectId
              };
              api.coupons.create(couponObj).catch(() => {});
            }}
            className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto z-10 relative"
          >
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="w-full px-5 py-3 border border-stone-300 focus:border-slate-800 outline-none rounded-none text-xs font-semibold bg-white transition"
            />
            <button 
              type="submit" 
              className={`w-full sm:w-auto px-8 py-3 ${niche.accentBg} ${niche.accentColorHoverClass} text-white font-black rounded-none text-xs uppercase tracking-widest transition shadow-md border border-stone-900 cursor-pointer`}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer Badges */}
      <footer className="py-8 bg-slate-900 text-white border-t border-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-xl">✨</span>
            <div>
              <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-200">Trendy Styles</h5>
              <p className="text-[9px] text-slate-400 font-bold mt-0.5">Stay Ahead In Fashion</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-xl">💰</span>
            <div>
              <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-200">Best Prices</h5>
              <p className="text-[9px] text-slate-400 font-bold mt-0.5">Affordable Fashion</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-xl">😊</span>
            <div>
              <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-200">Happy Customers</h5>
              <p className="text-[9px] text-slate-400 font-bold mt-0.5">Satisfaction Guaranteed</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
