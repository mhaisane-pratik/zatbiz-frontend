'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'prescription' | 'wellness' | 'firstaid';
  image: string;
}

export default function MedicalShopTemplate() {
  const [filterCat, setFilterCat] = useState<'all' | 'prescription' | 'wellness' | 'firstaid'>('all');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const products: Product[] = [
    {
      id: 'm1',
      name: 'Organic Multivitamin (60 Capsules)',
      price: 24,
      category: 'wellness',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'm2',
      name: 'All-in-One Family First Aid Kit',
      price: 35,
      category: 'firstaid',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'm3',
      name: 'Antiallergic Relief Tablets (30 Tabs)',
      price: 12,
      category: 'prescription',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    },
  ];

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setUploadSuccess(false), 5000);
  };

  return (
    <div className="bg-[#f0fdf4] text-[#0f766e] min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-teal-100">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-teal-700 hover:opacity-90 font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-600 font-bold">local_pharmacy</span>
            <span className="text-xl font-bold tracking-tight text-slate-800">MedVitals Pharmacy</span>
          </div>
          <a href="#upload" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-all">
            Upload Prescription
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 px-3 py-1 rounded text-teal-700 font-semibold text-xs uppercase tracking-wider">
            Verified Healthcare Supplies
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Order Medicines Online <br />
            <span className="text-teal-600">With Express Home Delivery</span>
          </h1>
          <p className="text-slate-500 font-light leading-relaxed max-w-lg">
            MedVitals supplies 100% authentic prescription medicines, wellness multivitamins, and medical aid kits. Checked by certified pharmacists.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#supplies" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-6 py-3 rounded shadow-lg shadow-teal-500/20 transition-all">
              Shop Supplies
            </a>
            <a href="#upload" className="bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 font-semibold text-sm px-6 py-3 rounded transition-all">
              Upload Script
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-teal-200 rounded blur-3xl -z-10 opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80" 
            alt="Pharmacy shelf bottles" 
            className="w-full max-w-[500px] mx-auto rounded shadow-xl object-cover aspect-[4/3] border border-teal-100"
          />
        </div>
      </section>

      {/* Supplies catalog */}
      <section id="supplies" className="bg-white py-20 px-6 border-y border-teal-100">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-teal-600 font-semibold">Verified Catalog</span>
            <h2 className="text-3xl font-bold text-slate-900">Featured Healthcare Supplies</h2>
            <div className="w-12 h-1 bg-teal-600 mx-auto rounded"></div>
          </div>

          <div className="flex justify-center gap-4 mb-10">
            {['all', 'prescription', 'wellness', 'firstaid'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilterCat(cat as any)}
                className={`px-5 py-2 rounded text-xs font-bold uppercase transition-all border ${
                  filterCat === cat ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-transparent text-teal-700 hover:bg-teal-50 border-teal-200'
                }`}
              >
                {cat === 'all' ? 'All OTC' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products
              .filter(p => filterCat === 'all' || p.category === filterCat)
              .map(p => (
                <div key={p.id} className="bg-teal-50/20 border border-teal-100 rounded overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
                  <div className="aspect-[4/3] bg-teal-100 overflow-hidden relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-103" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-teal-600 uppercase font-bold tracking-wider">{p.category}</p>
                      <h4 className="font-bold text-base text-slate-800 leading-tight">{p.name}</h4>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-800 text-lg">${p.price}</span>
                      <button 
                        onClick={() => alert(`Added ${p.name} to Cart`)}
                        className="bg-teal-600 text-white hover:bg-teal-700 text-[10px] font-bold uppercase py-2.5 px-4 rounded transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Prescription Upload Form */}
      <section id="upload" className="max-w-4xl mx-auto w-full px-6 py-24">
        <div className="bg-white border border-teal-100 shadow-xl rounded p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-teal-600 font-semibold">Secure Upload</span>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">Upload Medical Prescription</h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              Upload a clear photograph of your prescription. Our licensed pharmacist will review it, compile the order, and call you to confirm items and delivery timings.
            </p>
            <div className="space-y-2 text-xs text-slate-650 pt-2 font-light">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-teal-600 text-sm">health_and_safety</span> HIPAA Secure Data encryption</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-teal-600 text-sm">schedule</span> Average review time: 10 minutes</p>
            </div>
          </div>

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-650 mb-1">Your Mobile Number</label>
              <input type="tel" required placeholder="+1 (555) 000-0000" className="w-full bg-slate-50 border border-teal-100 rounded py-2 px-3 text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-650 mb-1">Attach Prescription File</label>
              <input type="file" required className="w-full bg-slate-50 border border-teal-100 rounded py-2 px-3 text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-slate-500" />
            </div>
            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors">
              Submit Prescription
            </button>
            {uploadSuccess && (
              <p className="text-center text-xs text-emerald-600 font-semibold pt-1">
                ✓ Prescription uploaded! A pharmacist will call you shortly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 w-full mt-auto text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-bold text-white tracking-wide text-base">MedVitals Pharmacy</h4>
            <p className="text-xs text-slate-500 mt-1">© 2026 MedVitals Health. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Pharmacist</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
