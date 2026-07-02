'use client';

import React from 'react';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (idx: number, delta: number) => void;
  onRemoveItem: (idx: number) => void;
  onCheckout: () => void;
  themePreset?: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  themePreset
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const taxRate = 0.10; // 10% CGST + SGST
  const tax = subtotal * taxRate;
  const deliveryFee = subtotal > 0 ? (subtotal > 500 ? 0 : 40) : 0; // Free delivery over 500
  const total = subtotal + tax + deliveryFee;

  // Visual Theme resolution
  const getThemeColor = () => {
    switch (themePreset) {
      case 'slate': return 'bg-slate-700 hover:bg-slate-800 border-slate-650';
      case 'deepblue': return 'bg-indigo-600 hover:bg-indigo-700 border-indigo-500';
      case 'sunset': return 'bg-orange-600 hover:bg-orange-700 border-orange-500';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 border-purple-500';
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-700 border-emerald-500';
      default: return 'bg-[#c5a880] hover:bg-[#d8c2a3] text-black border-[#c5a880]';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end transition-opacity duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md h-full bg-[#12131a]/95 text-white border-l border-zinc-800/80 shadow-2xl flex flex-col z-10 animate-slide-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-850 flex justify-between items-center bg-[#0d0e12]/80 backdrop-blur-md">
          <div>
            <h2 className="text-lg font-black uppercase tracking-wider text-white font-serif">Your Dining Cart</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
              {cart.length} {cart.length === 1 ? 'Item' : 'Items'} selected
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white transition duration-200 cursor-pointer bg-transparent border-0"
          >
            <span className="material-symbols-outlined text-2xl select-none">close</span>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="material-symbols-outlined text-5xl text-zinc-600 select-none">restaurant_menu</span>
              <div>
                <p className="text-sm font-extrabold uppercase tracking-widest text-zinc-400">Cart is empty</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-[200px]">Browse our tasting menu and add savory courses to begin.</p>
              </div>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={`${item.product.id}-${idx}`}
                className="flex gap-4 bg-zinc-900/50 border border-zinc-800/60 p-4 rounded-2xl items-center hover:border-zinc-700/50 transition duration-300"
              >
                {/* Item Thumbnail */}
                <img 
                  src={item.product.imageUrl || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=120'}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-zinc-800"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white uppercase truncate font-serif">{item.product.name}</h4>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                    ₹{item.product.price} / plate
                  </p>
                  
                  {/* Quantity Actions */}
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => onUpdateQuantity(idx, -1)}
                      className="w-6 h-6 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-300 font-bold text-xs flex items-center justify-center cursor-pointer border-0 transition"
                      type="button"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-white w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(idx, 1)}
                      className="w-6 h-6 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-300 font-bold text-xs flex items-center justify-center cursor-pointer border-0 transition"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Item Price & Delete */}
                <div className="text-right flex flex-col items-end gap-3">
                  <span className="text-xs font-black text-[#c5a880]">
                    ₹{item.product.price * item.quantity}
                  </span>
                  <button 
                    onClick={() => onRemoveItem(idx)}
                    className="text-zinc-500 hover:text-red-400 transition cursor-pointer bg-transparent border-0 p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg select-none">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-850 bg-[#0d0e12]/90 backdrop-blur-md space-y-4">
            <div className="space-y-2 text-xs text-zinc-400 font-bold uppercase tracking-widest font-sans">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST & Service (10%)</span>
                <span className="text-white">₹{tax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-white">{deliveryFee > 0 ? `₹${deliveryFee}` : 'FREE'}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-800 pt-3 text-sm font-black text-white font-serif">
                <span>Grand Total</span>
                <span className="text-[#c5a880]">₹{total.toFixed(0)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onCheckout();
                onClose();
              }}
              className={`w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl transition cursor-pointer shadow-lg active:scale-[0.98] border-0 mt-2 ${getThemeColor()} ${themePreset ? 'text-white' : 'text-black'}`}
              type="button"
            >
              Order & Pay ₹{total.toFixed(0)}
            </button>
          </div>
        )}
      </div>

      {/* Styled Slider Slide-In Animation CSS */}
      <style>{`
        @keyframes slide-in {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
