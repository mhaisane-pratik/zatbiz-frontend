'use client';

import { useState, useEffect } from 'react';
import { useFileEncoder } from '@/hooks/useFileEncoder';
import { Product } from '@/types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, 'projectId'>) => void;
  product: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSubmit, product }: ProductModalProps) {
  const { encodeFile } = useFileEncoder();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState<number>(10);
  const [variants, setVariants] = useState('Size: S,M,L; Color: Black,Tan');
  const [imageUrl, setImageUrl] = useState('/images/login_illustration.png');
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setPrice(product.price || 0);
      setCategory(product.category || 'General');
      setStock(product.stock || 0);
      setVariants(product.variants || '');
      setImageUrl(product.imageUrl || '/images/login_illustration.png');
      setAvailable(product.available !== false);
    } else {
      setName('');
      setDescription('');
      setPrice(0);
      setCategory('');
      setStock(10);
      setVariants('Size: S,M,L; Color: Black,Tan');
      setImageUrl('/images/login_illustration.png');
      setAvailable(true);
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await encodeFile(file);
        setImageUrl(base64);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price.toString()) || 0,
      category: category.trim() || 'General',
      imageUrl,
      stock: parseInt(stock.toString()) || 0,
      variants: variants.trim(),
      available,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs text-slate-800 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-extrabold text-slate-900 uppercase">
            {product ? 'Edit Storefront Product' : 'Add New Storefront Product'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
              Product Title / Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Handmade Leather Wallet"
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
              Product Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief details about the product..."
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 outline-none transition resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Accessories"
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
              Product Variants (Semicolon & Comma Separated)
            </label>
            <input
              type="text"
              value={variants}
              onChange={(e) => setVariants(e.target.value)}
              placeholder="Size: S,M,L; Color: Black,Tan"
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 outline-none transition"
            />
            <p className="text-[9px] text-slate-400 font-semibold mt-1">
              Example format: `Size: S,M,L; Color: Red,Blue`
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
              Upload Product Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none"
            />
            {imageUrl && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[9px] text-slate-450 font-bold uppercase">Uploaded Preview:</span>
                <img
                  src={imageUrl}
                  className="w-10 h-10 object-contain rounded border border-slate-100 bg-white"
                  alt="product preview"
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 p-2.5 rounded-xl max-w-xs shadow-inner">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="rounded border-slate-300 text-indigo-606 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
              />
              <span className="text-[10px] text-slate-705 font-bold uppercase tracking-wider">Item Available for Ordering</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow transition cursor-pointer"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
