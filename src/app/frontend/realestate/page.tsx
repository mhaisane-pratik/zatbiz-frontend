'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'apartment' | 'house';
  image: string;
}

export default function RealestateTemplate() {
  const [filterType, setFilterType] = useState<'all' | 'apartment' | 'house'>('all');
  const [loanAmount, setLoanAmount] = useState<number>(350000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [contactSuccess, setContactSuccess] = useState(false);

  const properties: Property[] = [
    {
      id: 'prop1',
      title: 'Modern Minimalist Penthouse',
      price: 580000,
      beds: 3,
      baths: 2.5,
      sqft: 2200,
      type: 'apartment',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'prop2',
      title: 'Luxurious Stone Villa',
      price: 920000,
      beds: 5,
      baths: 4.5,
      sqft: 4500,
      type: 'house',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'prop3',
      title: 'Glass Waterfront Loft',
      price: 450000,
      beds: 2,
      baths: 2,
      sqft: 1600,
      type: 'apartment',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=80',
    },
  ];

  // Mortgage Calculator Math
  // M = P [ i(1+i)^n ] / [ (1+i)^n - 1 ]
  const P = loanAmount;
  const monthlyRate = interestRate / 100 / 12;
  const n = loanTerm * 12;
  
  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = Math.round(
      (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    );
  } else {
    monthlyPayment = Math.round(P / n);
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setContactSuccess(false), 5000);
  };

  return (
    <div className="bg-[#0f1115] text-[#d1d5db] min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-[#0f1115]/90 backdrop-blur-md border-b border-stone-800">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-amber-500 hover:opacity-90 font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 font-bold">domain</span>
            <span className="text-xl font-bold tracking-tight text-white">Vanguard Estates</span>
          </div>
          <a href="#calculator" className="bg-transparent border border-amber-500/60 text-amber-500 hover:bg-amber-500 hover:text-[#0f1115] px-5 py-2.5 rounded transition-all text-xs font-semibold uppercase tracking-wider">
            Mortgage Tool
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 border border-amber-500/30 px-3 py-1 rounded bg-amber-500/5 text-amber-400 font-semibold text-xs uppercase tracking-wider">
            Architectural Masterpieces
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find Your Dream Luxury <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Living Environment</span>
          </h1>
          <p className="text-stone-400 font-light leading-relaxed max-w-lg">
            Explore state-of-the-art penthouses, waterfront villas, and architect-designed smart homes. Providing exceptional build structures and luxury finishes.
          </p>
          <div className="pt-2">
            <a href="#listings" className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold text-sm px-6 py-3 rounded shadow-lg shadow-amber-500/10 transition-all">
              Browse Listings
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500/5 rounded-2xl blur-3xl -z-10 opacity-60"></div>
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80" 
            alt="Luxury modern villa" 
            className="w-full max-w-[500px] mx-auto rounded shadow-xl object-cover aspect-[4/3] border border-stone-800"
          />
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="bg-[#161a21] py-20 px-6 border-y border-stone-800/80">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">Our Portfolio</span>
            <h2 className="text-3xl font-bold text-white uppercase">Premium Listings</h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto"></div>
          </div>

          <div className="flex justify-center gap-4 mb-10">
            {['all', 'apartment', 'house'].map((t) => (
              <button 
                key={t}
                onClick={() => setFilterType(t as any)}
                className={`px-5 py-2 rounded text-xs font-bold uppercase transition-all border ${
                  filterType === t ? 'bg-amber-500 text-stone-950 border-amber-500' : 'bg-transparent text-stone-400 hover:border-stone-600 border-stone-800'
                }`}
              >
                {t === 'all' ? 'All Types' : `${t}s`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties
              .filter(p => filterType === 'all' || p.type === filterType)
              .map(p => (
                <div key={p.id} className="bg-[#0f1115] border border-stone-850 rounded overflow-hidden flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300">
                  <div className="aspect-[4/3] bg-slate-900 overflow-hidden relative">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-103" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-amber-500 uppercase font-bold tracking-wider">{p.type}</p>
                      <h4 className="font-bold text-base text-white leading-tight">{p.title}</h4>
                    </div>
                    <div className="flex justify-between items-center text-xs text-stone-400 border-y border-stone-800/60 py-3">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bed</span> {p.beds} Beds</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bathtub</span> {p.baths} Baths</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">square_foot</span> {p.sqft} Sqft</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-white text-lg">${p.price.toLocaleString()}</span>
                      <a href="#contact" className="border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-[#0f1115] text-[10px] font-bold uppercase py-2 px-3 rounded transition-colors">
                        Inquire
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Mortgage Calculator */}
      <section id="calculator" className="max-w-4xl mx-auto w-full px-6 py-24">
        <div className="bg-[#161a21] border border-stone-800 rounded p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold font-heavy">Finance Tools</span>
              <h2 className="text-3xl font-extrabold text-white uppercase leading-tight">Mortgage Calculator</h2>
              <p className="text-stone-400 text-sm font-sans font-light leading-relaxed">
                Estimate your monthly repayments. Customize loan terms and rates dynamically.
              </p>

              {/* Input Ranges */}
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-stone-400 uppercase">
                    <span>Loan Amount</span>
                    <span className="text-amber-400">${loanAmount.toLocaleString()}</span>
                  </div>
                  <input type="range" min="100000" max="1500000" step="10000" value={loanAmount} onChange={(e) => setLoanAmount(parseInt(e.target.value))} className="w-full bg-stone-800 h-1 rounded cursor-pointer accent-amber-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-stone-400 uppercase">
                    <span>Interest Rate</span>
                    <span className="text-amber-400">{interestRate}%</span>
                  </div>
                  <input type="range" min="1" max="10" step="0.1" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} className="w-full bg-stone-800 h-1 rounded cursor-pointer accent-amber-500" />
                </div>
              </div>
            </div>

            <div className="bg-[#0f1115] border border-stone-850 p-6 rounded flex flex-col justify-between h-full space-y-6">
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase text-stone-400 mb-2">Loan Term</label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 20, 30].map(term => (
                    <button 
                      key={term} 
                      onClick={() => setLoanTerm(term)}
                      className={`py-2 text-xs font-bold rounded ${
                        loanTerm === term ? 'bg-amber-500 text-[#0f1115]' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                      }`}
                    >
                      {term} Years
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-800 pt-4 text-center">
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">Estimated Monthly Payment</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-stone-400 text-xl font-bold">$</span>
                  <span className="text-5xl font-black text-white">{monthlyPayment}</span>
                  <span className="text-xs text-stone-500 font-medium">/ mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="max-w-4xl mx-auto w-full px-6 py-20 border-t border-stone-800">
        <div className="bg-[#161a21] border border-stone-800 shadow-xl rounded p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">Get In Touch</span>
            <h2 className="text-3xl font-bold text-white leading-tight">Connect With An Agent</h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Have questions about our luxury penthouses or payment structures? Send a callback request.
            </p>
            <div className="space-y-2 text-xs text-stone-400 pt-2 font-light">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-amber-500 text-sm">phone</span> +1 (555) 012-3498</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-amber-500 text-sm">schedule</span> Agent support: 8:00 AM - 6:00 PM</p>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Your Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-[#0f1115] border border-stone-800 rounded py-2 px-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1">Your Phone</label>
              <input type="tel" required placeholder="+1 (555) 000-0000" className="w-full bg-[#0f1115] border border-stone-800 rounded py-2 px-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white" />
            </div>
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-[#0f1115] font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors">
              Submit Request
            </button>
            {contactSuccess && (
              <p className="text-center text-xs text-emerald-400 font-semibold pt-1">
                ✓ Call request submitted! An agent will call you shortly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f1115] border-t border-stone-800 py-12 w-full mt-auto text-sm text-stone-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-bold text-white tracking-wide text-base">Vanguard Estates</h4>
            <p className="text-xs text-stone-600 mt-1">© 2026 Vanguard Estates. All rights reserved.</p>
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
