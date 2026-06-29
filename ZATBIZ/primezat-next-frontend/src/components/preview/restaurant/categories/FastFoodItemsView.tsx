import React from 'react';
import { Product } from '@/types';
import { getRandomFoodImage } from '@/services/api';

interface FastFoodItemsViewProps {
  products: Product[];
  colors: any;
  onAddToCart?: (p: Product) => void;
}

export function FastFoodItemsView({
  products,
  colors,
  onAddToCart
}: FastFoodItemsViewProps) {
  return (
    <div className="space-y-6 text-left">
      <div className="bg-[#14151b] border border-orange-500/10 rounded-3xl p-6">
        <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-wider block mb-1`}>
          Fast delivery menu
        </span>
        <h3 className="text-xl font-black text-white uppercase tracking-wider mb-1">Flame-Grilled Smash Catalog</h3>
        <p className="text-slate-404 text-xs font-semibold">
          Ready and packed in 15 mins. Select items below to add to your order queue.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="md:col-span-3 py-16 bg-[#14151b] border border-slate-800 rounded-2xl text-center text-slate-500 font-black uppercase tracking-widest text-xs">
            Fast food catalog is empty.
          </div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="bg-[#14151b] border border-slate-800/80 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between group hover:scale-[1.01] transition-all duration-300">
              <div className="h-44 bg-slate-900 relative overflow-hidden">
                <img src={p.imageUrl || getRandomFoodImage(p.name)} alt={p.name} className="w-full h-full object-cover group-hover:scale-102 transition duration-500" />
                <span className={`absolute top-3 right-3 bg-slate-950/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black ${colors.textAccent} border border-orange-500/10 shadow-sm font-mono`}>
                  ₹{p.price}
                </span>
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-white text-xs uppercase tracking-wider">{p.name}</h4>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1 leading-relaxed">{p.description || 'Tasty burger deal cooked fresh to order.'}</p>
                </div>
                <button onClick={() => {
                  if (onAddToCart) onAddToCart(p);
                  alert(`Item "${p.name}" added to order draft!`);
                }} className={`w-full py-2.5 ${colors.bgAccent} ${colors.hoverBgAccent} text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition border-none shadow-sm cursor-pointer`}>
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
