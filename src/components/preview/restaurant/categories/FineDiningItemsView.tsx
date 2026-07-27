import React from 'react';
import { Product } from '@/types';
import { getRandomFoodImage } from '@/services/api';

interface FineDiningItemsViewProps {
  products: Product[];
  colors: any;
  onAddToCart?: (p: Product) => void;
}

export function FineDiningItemsView({
  products,
  colors,
  onAddToCart
}: FineDiningItemsViewProps) {
  return (
    <div className="space-y-6 text-left">
      <div className="bg-[#111217] border border-[#2a2c35]/35 rounded-3xl p-6">
        <span className={`text-[9px] ${colors.textAccent} font-black uppercase tracking-widest font-sans block mb-1`}>
          HAUTE CUISINE PREVIEW
        </span>
        <h3 className="text-xl font-extrabold text-white font-serif uppercase tracking-widest mb-1">
          Chef's Gourmet Tasting Menu
        </h3>
        <p className="text-stone-450 text-xs font-sans font-semibold">
          Plated to order for gold card diners. All seafood is freshly imported, steaks dry-aged for 28 days.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="md:col-span-3 py-16 bg-[#111217] border border-stone-850 rounded-2xl text-center text-stone-500 font-bold uppercase tracking-wider text-xs font-sans">
            The Grand Tasting menu is currently empty.
          </div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="bg-[#111217] border border-[#2a2c35]/25 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#c5a880]/30 transition duration-300">
              <div className="h-44 bg-stone-900 relative overflow-hidden">
                <img src={p.imageUrl || getRandomFoodImage(p.name)} alt={p.name} className="w-full h-full object-cover group-hover:scale-102 transition duration-500 filter brightness-95" />
                <span className={`absolute top-3 right-3 bg-neutral-950/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black ${colors.textAccent} border border-[#c5a880]/20 shadow-sm font-sans font-mono`}>
                  ₹{p.price}
                </span>
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">{p.name}</h4>
                  <p className="text-[10px] font-semibold text-stone-400 mt-1 leading-relaxed font-sans">{p.description || 'Plated to Chef standard using fresh imported ingredients.'}</p>
                </div>
                <button onClick={() => {
                  if (onAddToCart) onAddToCart(p);
                  alert(`Placing item "${p.name}" on the Diner Order list!`);
                }} className={`w-full py-2.5 bg-transparent border border-[#c5a880] hover:bg-[#c5a880] hover:text-black ${colors.textAccent} rounded-none text-[9px] font-black uppercase tracking-wider transition shadow-sm cursor-pointer font-sans`}>
                  Order to Table
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
