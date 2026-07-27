'use client';

import { useState } from 'react';
import { Product } from '@/types';

interface ProductCatalogProps {
  dbProducts: Product[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
}

export default function ProductCatalog({
  dbProducts,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = dbProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-8 bg-slate-50 min-h-[600px] flex flex-col justify-between rounded-2xl">
      <div>
        <header className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">E-Commerce Product Catalog</h2>
            <p className="text-[10px] text-slate-500 font-medium">
              Manage stock inventory, variants, categories, and item images.
            </p>
          </div>
          <button
            onClick={onAddProduct}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs shadow transition cursor-pointer"
          >
            + Add Product
          </button>
        </header>

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white border border-slate-200 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none shadow-sm transition"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center text-slate-400 text-xs">
              <span className="text-3xl block mb-2 select-none">🛍️</span>
              No products found in database. Click "+ Add Product" to get started.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="p-4 pl-6">Product Image</th>
                  <th className="p-4">Name / Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock Inventory</th>
                  <th className="p-4">Variants</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="p-4 pl-6">
                      <div className="w-10 h-10 bg-slate-50 rounded border border-slate-200/50 flex items-center justify-center overflow-hidden">
                        <img
                          src={p.imageUrl}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/images/login_illustration.png';
                          }}
                          alt={p.name}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-extrabold text-slate-800 block">{p.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">
                        {p.category || 'General'}
                      </span>
                    </td>
                    <td className="p-4 font-extrabold text-slate-900">${p.price?.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.stock <= 5 ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-4">
                      {p.variants ? (
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {p.variants.split(';').map((v: string, idx: number) => {
                            const [vName, vVals] = v.split(':');
                            if (!vName || !vVals) return null;
                            return (
                              <div
                                key={idx}
                                className="flex gap-1 items-center bg-slate-50 border border-slate-200/60 px-1 py-0.5 rounded text-[8px] text-slate-500"
                              >
                                <span className="font-bold uppercase">{vName.trim()}:</span>
                                <span className="font-medium">{vVals.trim()}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">None</span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEditProduct(p)}
                          className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 rounded text-[10px] font-bold text-slate-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => p.id !== undefined && onDeleteProduct(p.id)}
                          className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 rounded text-[10px] font-bold text-rose-650 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
