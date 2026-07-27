'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function NgoTemplate() {
  const [donationFrequency, setDonationFrequency] = useState<'once' | 'monthly'>('monthly');
  const [donationAmount, setDonationAmount] = useState<number>(25);
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerSuccess(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setVolunteerSuccess(false), 5000);
  };

  return (
    <div className="bg-[#f0fdf4] text-[#166534] min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-emerald-700 hover:opacity-90 font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 font-bold">eco</span>
            <span className="text-xl font-bold tracking-tight text-slate-800">GreenEarth Fund</span>
          </div>
          <a href="#donate" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-all">
            Donate Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded text-emerald-700 font-semibold text-xs uppercase tracking-wider">
            Conserving Our Biosphere
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Protecting Rare Habitats <br />
            <span className="text-emerald-600">For Future Generations</span>
          </h1>
          <p className="text-slate-500 font-light leading-relaxed max-w-lg">
            GreenEarth Fund is dedicated to restoring damaged eco-zones, planting native trees, and supporting local wild reserve managers. Join our environmental crusade today.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#donate" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3 rounded shadow-lg shadow-emerald-500/20 transition-all">
              Donate Support
            </a>
            <a href="#volunteer" className="bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-250 font-semibold text-sm px-6 py-3 rounded transition-all border-emerald-200">
              Become Volunteer
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-200 rounded blur-3xl -z-10 opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80" 
            alt="Planting small sapling" 
            className="w-full max-w-[500px] mx-auto rounded shadow-xl object-cover aspect-[4/3] border border-emerald-100"
          />
        </div>
      </section>

      {/* Impact metrics */}
      <section className="bg-emerald-800 text-emerald-100 py-16 px-6 border-y border-emerald-900">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-extrabold text-white">450k+</div>
            <div className="text-xs uppercase tracking-wider text-emerald-300 font-bold">Native Trees Planted</div>
          </div>
          <div className="space-y-2 border-y md:border-y-0 md:border-x border-emerald-700/60 py-6 md:py-0">
            <div className="text-4xl font-extrabold text-white">12,000</div>
            <div className="text-xs uppercase tracking-wider text-emerald-300 font-bold">Acres of Habitats Saved</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-extrabold text-white">15+</div>
            <div className="text-xs uppercase tracking-wider text-emerald-300 font-bold">Conservation Reserves Supported</div>
          </div>
        </div>
      </section>

      {/* Interactive Donation Widget */}
      <section id="donate" className="max-w-4xl mx-auto w-full px-6 py-24">
        <div className="bg-white border border-emerald-100 shadow-xl rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-emerald-600 font-semibold font-heavy">Impact Funding</span>
            <h2 className="text-3xl font-extrabold text-slate-900 uppercase leading-tight">Every Contribution Matters</h2>
            <p className="text-slate-500 text-sm font-sans font-light leading-relaxed">
              Choose your contribution type. Your monthly donations help us schedule long-term habitat maintenance contracts.
            </p>

            <div className="flex gap-2">
              <button 
                onClick={() => setDonationFrequency('monthly')}
                className={`flex-1 py-2 text-xs font-bold rounded ${
                  donationFrequency === 'monthly' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Donate Monthly
              </button>
              <button 
                onClick={() => setDonationFrequency('once')}
                className={`flex-1 py-2 text-xs font-bold rounded ${
                  donationFrequency === 'once' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                One-Time Gift
              </button>
            </div>
          </div>

          <div className="bg-[#f0fdf4]/50 border border-emerald-100 p-6 rounded flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Contribution Amount</label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 25, 50, 100].map(amount => (
                  <button 
                    key={amount} 
                    onClick={() => setDonationAmount(amount)}
                    className={`py-2 text-xs font-bold rounded ${
                      donationAmount === amount ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-emerald-100 pt-4 text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Your Total Support</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-slate-400 text-xl font-bold">$</span>
                <span className="text-5xl font-black text-slate-900">{donationAmount}</span>
                <span className="text-xs text-slate-500 font-medium">{donationFrequency === 'monthly' ? '/ month' : ' gift'}</span>
              </div>
            </div>

            <button 
              onClick={() => alert(`Thank you for your generous $${donationAmount} donation!`)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded transition-all shadow"
            >
              Donate ${donationAmount}
            </button>
          </div>
        </div>
      </section>

      {/* Volunteer Signup Form */}
      <section id="volunteer" className="max-w-4xl mx-auto w-full px-6 py-20 border-t border-emerald-100">
        <div className="bg-white border border-emerald-100 shadow-xl rounded p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-emerald-600 font-semibold">Join Campaign</span>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">Become A Conservation Volunteer</h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              We coordinate weekend planting programs and public awareness tours. Submit your details to join our newsletter.
            </p>
            <div className="space-y-2 text-xs text-slate-600 pt-2 font-light">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-600 text-sm">mail</span> volunteer@greenearth.org</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-600 text-sm">schedule</span> Average response: 24 hours</p>
            </div>
          </div>

          <form onSubmit={handleVolunteerSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Email</label>
              <input type="email" required placeholder="name@domain.com" className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-800" />
            </div>
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors">
              Join Campaign
            </button>
            {volunteerSuccess && (
              <p className="text-center text-xs text-emerald-600 font-semibold pt-1">
                ✓ Signup complete! Welcome to our volunteer circle.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-stone-400 border-t border-slate-800 py-12 w-full mt-auto text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-bold text-white tracking-wide text-base">GreenEarth Fund</h4>
            <p className="text-xs text-slate-500 mt-1">© 2026 GreenEarth Fund. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Campaigners</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
