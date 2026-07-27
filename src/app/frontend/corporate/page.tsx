'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CorporateTemplate() {
  const [activeService, setActiveService] = useState<'consulting' | 'integration' | 'support'>('consulting');
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSuccess(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => setQuoteSuccess(false), 5000);
  };

  return (
    <div className="bg-[#f8fafc] text-[#334155] min-h-screen flex flex-col font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto w-full">
          <Link href="/frontend" className="flex items-center gap-2 text-slate-700 hover:opacity-90 font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-850 font-bold text-slate-900">corporate_fare</span>
            <span className="text-xl font-bold tracking-tight text-slate-800">Apex Consulting</span>
          </div>
          <a href="#quote" className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-all">
            Get Quote
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1 rounded text-slate-700 font-semibold text-xs uppercase tracking-wider">
            Enterprise Solutions
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Strategic Advisory <br />
            <span className="text-slate-650 text-slate-600">For Global Enterprises</span>
          </h1>
          <p className="text-slate-500 font-light leading-relaxed max-w-lg">
            Apex partners with Fortune 500 firms to deliver digital migration, cloud system integrations, and structured operations auditing. Driving efficiency and sustainable profitability.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#quote" className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3 rounded shadow-lg transition-all">
              Request Quote
            </a>
            <a href="#services" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm px-6 py-3 rounded transition-all">
              Our Services
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-slate-200 rounded blur-3xl -z-10 opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80" 
            alt="Corporate skyscraper" 
            className="w-full max-w-[500px] mx-auto rounded shadow-xl object-cover aspect-[4/3] border border-slate-200"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="bg-slate-50 py-20 px-6 border-y border-slate-200">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Specialized Pillars</span>
            <h2 className="text-3xl font-bold text-slate-900">Professional Services</h2>
            <div className="w-12 h-0.5 bg-slate-900 mx-auto"></div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveService('consulting')}
              className={`px-5 py-2.5 rounded text-xs font-bold uppercase transition-all ${
                activeService === 'consulting' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Consulting
            </button>
            <button 
              onClick={() => setActiveService('integration')}
              className={`px-5 py-2.5 rounded text-xs font-bold uppercase transition-all ${
                activeService === 'integration' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Integration
            </button>
            <button 
              onClick={() => setActiveService('support')}
              className={`px-5 py-2.5 rounded text-xs font-bold uppercase transition-all ${
                activeService === 'support' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Managed Support
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded p-8 shadow-sm">
            {activeService === 'consulting' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-[fadeIn_0.4s_ease]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">Operational & Strategy Advisory</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Analyzing organizational structural overhead, preparing market penetration layouts, and auditing dynamic capital structures to reduce corporate waste and optimize cash output.
                  </p>
                </div>
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80" className="rounded object-cover aspect-video" alt="Consulting" />
              </div>
            )}

            {activeService === 'integration' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-[fadeIn_0.4s_ease]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">Cloud Systems & Platform Integration</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Connecting enterprise API systems, coordinating microservices, migrating legacy databases to serverless architectures, and auditing network security parameters.
                  </p>
                </div>
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80" className="rounded object-cover aspect-video" alt="Integration" />
              </div>
            )}

            {activeService === 'support' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-[fadeIn_0.4s_ease]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">24/7 Managed Enterprise Support</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Continuous server monitoring, disaster recovery audits, high-availability cluster patching, and dedicated telephone support for dynamic network failovers.
                  </p>
                </div>
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80" className="rounded object-cover aspect-video" alt="Support" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quote Request */}
      <section id="quote" className="max-w-4xl mx-auto w-full px-6 py-24">
        <div className="bg-white border border-slate-200 shadow-xl rounded p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Connect With Us</span>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">Request Project Quotation</h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              Submit your corporate email and request specifications. Our account manager will schedule a preliminary briefing session within 1 business day.
            </p>
            <div className="space-y-2 text-xs text-slate-600 pt-2 font-light">
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-slate-950 text-sm">mail</span> partner@apexconsulting.com</p>
              <p className="flex items-center gap-2"><span className="material-symbols-outlined text-slate-950 text-sm">schedule</span> Client Desk: 9:00 AM - 5:00 PM EST</p>
            </div>
          </div>

          <form onSubmit={handleQuoteSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Company Email</label>
              <input type="email" required placeholder="corporate@firm.com" className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Target Solutions</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900">
                <option value="strategic">Strategic Audit & Consulting</option>
                <option value="cloud">Cloud Integration APIs</option>
                <option value="support">Managed Support Plans</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors">
              Submit Request
            </button>
            {quoteSuccess && (
              <p className="text-center text-xs text-emerald-600 font-semibold pt-1">
                ✓ Request received! We will follow up via email shortly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 w-full mt-auto text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-bold text-white tracking-wide text-base">Apex Consulting</h4>
            <p className="text-xs text-slate-500 mt-1">© 2026 Apex Consulting Group. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Corporate Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
