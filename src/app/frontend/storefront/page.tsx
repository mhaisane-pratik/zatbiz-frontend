'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'cloth' | 'electronics' | 'home';
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function StorefrontTemplate() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cloth' | 'electronics' | 'home'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 'p1',
      name: 'Premium Wool Blend Blazer',
      price: 189,
      category: 'cloth',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'p2',
      name: 'Active Noise-Cancelling Headphones',
      price: 249,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'p3',
      name: 'Minimalist Ash Wood Desk',
      price: 349,
      category: 'home',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'p4',
      name: 'Unisex Knit Fleece Hoodie',
      price: 79,
      category: 'cloth',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=80',
    },
  ];

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalCartValue = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-[#fafaf9] text-[#1c1917] min-h-screen flex flex-col font-sans relative">
      <nav className="fixed top-0 w-full z-45 bg-white/90 backdrop-blur-md border-b border-stone-200 z-40">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-stone-700 hover:opacity-90 font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-stone-800 font-bold">storefront</span>
            <span className="text-xl font-bold tracking-tight text-stone-800">Aura Boutique</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">shopping_bag</span>
            <span>Bag ({cart.reduce((qty, i) => qty + i.quantity, 0)})</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-stone-100 border border-stone-200 px-3 py-1 rounded-full text-stone-700 font-semibold text-xs uppercase tracking-wider">
            Premium Fashion & Tech
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            Curated Products <br />
            <span className="text-stone-600">For Modern Living</span>
          </h1>
          <p className="text-stone-500 font-light leading-relaxed max-w-lg">
            Discover a sophisticated collection of designer apparel, high-performance computing accessories, and minimalist house decors selected to elevate your everyday routines.
          </p>
          <div className="pt-2">
            <a href="#catalog" className="bg-stone-900 hover:bg-stone-850 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg transition-all">
              Shop Collection
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-stone-200 rounded-2xl blur-3xl -z-10 opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80" 
            alt="Retail showroom" 
            className="w-full max-w-[500px] mx-auto rounded-2xl shadow-xl object-cover aspect-[4/3] border border-stone-200"
          />
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="bg-white py-20 px-6 border-y border-stone-200">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Our Catalog</span>
            <h2 className="text-3xl font-bold text-stone-900">Featured Products</h2>
            <div className="w-12 h-0.5 bg-stone-900 mx-auto"></div>
          </div>

          <div className="flex justify-center gap-4 mb-10">
            {['all', 'cloth', 'electronics', 'home'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                  activeCategory === cat ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 hover:bg-stone-50 border-stone-200'
                }`}
              >
                {cat === 'all' ? 'All Items' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => activeCategory === 'all' || p.category === activeCategory)
              .map(p => (
                <div key={p.id} className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                  <div className="aspect-[4/3] bg-stone-200 overflow-hidden relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-stone-400 uppercase font-semibold tracking-wider">{p.category}</p>
                      <h4 className="font-bold text-sm text-stone-800 leading-tight">{p.name}</h4>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-[#1c1917] text-base">${p.price}</span>
                      <button 
                        onClick={() => addToCart(p)}
                        className="bg-stone-900 text-white text-[11px] font-bold uppercase py-2 px-3 rounded hover:bg-stone-850 transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col justify-between relative overflow-y-auto">
            <div>
              <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-6">
                <h3 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">shopping_bag</span>
                  <span>Your Shopping Bag</span>
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="material-symbols-outlined text-stone-500 hover:text-stone-800 text-xl font-bold">
                  close
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-stone-400 font-light space-y-2">
                  <span className="material-symbols-outlined text-4xl">shopping_cart</span>
                  <p className="text-sm">Your bag is empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b border-stone-100 pb-3">
                      <div className="flex gap-3 items-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-stone-200" />
                        <div>
                          <h5 className="font-bold text-xs text-stone-800 leading-tight max-w-[180px]">{item.name}</h5>
                          <p className="text-[10px] text-stone-400 mt-0.5">Qty: {item.quantity} • ${item.price} each</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 font-bold uppercase">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-stone-100 pt-6 space-y-4">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>Subtotal</span>
                  <span>${totalCartValue}</span>
                </div>
                <button 
                  onClick={() => {
                    alert('Order Placed Successfully!');
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-stone-900 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-lg hover:bg-stone-850 transition-colors"
                >
                  Checkout (${totalCartValue})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-12 w-full mt-auto text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-bold text-white tracking-wide text-base">Aura Boutique</h4>
            <p className="text-xs text-stone-500 mt-1">© 2026 Aura Boutique. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
