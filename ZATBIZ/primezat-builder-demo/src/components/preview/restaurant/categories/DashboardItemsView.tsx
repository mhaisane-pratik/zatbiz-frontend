import React from 'react';
import { Product } from '@/types';
import { getRandomFoodImage } from '@/services/api';

interface DashboardItemsViewProps {
  products: Product[];
  primaryColor: string;
  onAddToCart?: (p: Product) => void;
}

export function DashboardItemsView({
  products,
  primaryColor,
  onAddToCart
}: DashboardItemsViewProps) {
  return (
    <div className="space-y-6 text-left font-sans">
      <div className="bg-white border rounded-3xl p-6" style={{ borderColor: `${primaryColor}20` }}>
        <span className="text-[9px] font-black uppercase tracking-wider block mb-1" style={{ color: primaryColor }}>
          Authentic plated catalog
        </span>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-wider mb-1">Chef's Signature Recipes</h3>
        <p className="text-slate-500 text-xs font-semibold">
          Browse tonight's freshly cooked items. Select below to add to your diner order list.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="md:col-span-3 py-16 bg-white border border-stone-200/80 rounded-2xl text-center text-slate-500 font-bold uppercase tracking-widest text-xs">
            Chef menu is empty.
          </div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="bg-white border border-stone-200/80 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between group hover:scale-[1.01] transition-all duration-300">
              <div className="h-44 bg-stone-50 relative overflow-hidden">
                <img src={p.imageUrl || getRandomFoodImage(p.name)} alt={p.name} className="w-full h-full object-cover group-hover:scale-102 transition duration-500" />
                <span className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black border shadow-sm font-mono" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                  ₹{p.price}
                </span>
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider">{p.name}</h4>
                  <p className="text-[10px] font-semibold text-slate-500 mt-1 leading-relaxed">{p.description || 'Gourmet meal prepared fresh by our head chef.'}</p>
                </div>
                <button onClick={() => {
                  if (onAddToCart) onAddToCart(p);
                  alert(`Item "${p.name}" added to order draft!`);
                }} className="w-full py-2.5 text-slate-850 rounded-xl text-[10px] font-black uppercase tracking-wider transition border-none shadow-sm cursor-pointer" style={{ backgroundColor: primaryColor }}>
                  Add to Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
