'use client';

import { Block } from '@/types';

interface SiteSettingsPanelProps {
  blocks: Block[];
  updateBlockContent: (blockId: string, field: string, value: any) => void;
}

export default function SiteSettingsPanel({ blocks, updateBlockContent }: SiteSettingsPanelProps) {
  const bizBlock = blocks.find((b) => b.type === 'business_config') || {
    id: 'business-config-block',
    type: 'business_config',
    theme: 'slate',
    content: {
      businessType: 'shop',
      gstin: '',
      currency: 'INR (₹)',
      domainName: '',
      paymentGateway: 'Stripe',
      stripeKey: 'pk_test_...',
      sandboxMode: true,
      gstRate: 18,
      seoTitle: 'My Business Portal',
      seoDescription: 'Handcrafted products',
      seoKeywords: 'store, shop',
    },
  };

  const c = bizBlock.content;

  const handleChange = (field: string, value: any) => {
    updateBlockContent(bizBlock.id, field, value);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in text-xs text-slate-800 font-sans">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">⚙️ Global Website Settings</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
            Configure SEO, payment gateways, automated GST invoice details, and domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          
          {/* Section 1: Business Profile */}
          <div className="space-y-4">
            <span className="block text-[10px] font-black text-indigo-650 uppercase tracking-widest">
              1. Business Profile Details
            </span>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Merchant Billing Currency
              </label>
              <select
                value={c.currency || 'INR (₹)'}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition"
              >
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Merchant GSTIN (For automated invoices)
              </label>
              <input
                type="text"
                value={c.gstin || ''}
                onChange={(e) => handleChange('gstin', e.target.value.toUpperCase())}
                placeholder="e.g. 27AAAAA1111A1Z1"
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition uppercase"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Business Category Sector
              </label>
              <select
                value={c.businessType || 'shop'}
                onChange={(e) => handleChange('businessType', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition"
              >
                <option value="restaurant">🍕 Restaurant & Food Menu</option>
                <option value="shop">🛍️ Retail Store & Inventory</option>
                <option value="school">🏫 School & Academy Tracks</option>
                <option value="hospital">🏥 Clinical Health Services</option>
                <option value="wedding">💍 Wedding & Event Planner</option>
                <option value="fashion">👗 Fashion Storefront</option>
                <option value="general">💼 General Business Portfolio</option>
              </select>
            </div>
          </div>

          {c.businessType === 'wedding' && (
            <div className="space-y-4 pt-4 border-t border-slate-100 col-span-full">
              <span className="block text-[10px] font-black text-indigo-650 uppercase tracking-widest">
                💒 Wedding & Event Theme Settings
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                    Homepage Layout & Theme
                  </label>
                  <select
                    value={c.weddingHomeOption || 1}
                    onChange={(e) => handleChange('weddingHomeOption', parseInt(e.target.value, 10))}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition"
                  >
                    <option value={1}>💜 Option 1: Lavender Blossom Planners</option>
                    <option value={2}>💗 Option 2: Rose Gold Romance Events</option>
                    <option value={3}>💙 Option 3: Midnight Starry Celebrations</option>
                    <option value={4}>💛 Option 4: Golden Palace Weddings</option>
                    <option value={5}>💚 Option 5: Sage & Botanical Planning</option>
                    <option value={6}>🌸 Option 6: Blushing Bride Decor</option>
                    <option value={7}>❤️ Option 7: Burgundy Royal Galas</option>
                    <option value={8}>🌊 Option 8: Ocean Coastline Destination</option>
                    <option value={9}>🤎 Option 9: Teal & Copper Events</option>
                    <option value={10}>🥂 Option 10: Warm Champagne Dream</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                    Portal Login Page Style
                  </label>
                  <select
                    value={c.weddingLoginOption || 1}
                    onChange={(e) => handleChange('weddingLoginOption', parseInt(e.target.value, 10))}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition"
                  >
                    <option value={1}>Option 1: Modern Fine Dining</option>
                    <option value={2}>Option 2: Cozy Fast Food</option>
                    <option value={3}>Option 3: Gourmet Pizza Pizzeria</option>
                    <option value={4}>Option 4: Authentic Indian Curry</option>
                    <option value={5}>Option 5: Sweet Delights Bakery</option>
                    <option value={6}>Option 6: Asian Imperial Chinese</option>
                    <option value={7}>Option 7: Pure Vegan Wellness</option>
                    <option value={8}>Option 8: General Corporate Style</option>
                    <option value={9}>Option 9: Custom Theme Preset</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                    Portal Dashboard Style
                  </label>
                  <select
                    value={c.weddingDashboardOption || 1}
                    onChange={(e) => handleChange('weddingDashboardOption', parseInt(e.target.value, 10))}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition"
                  >
                    <option value={1}>Option 1: Royal Amethyst theme</option>
                    <option value={2}>Option 2: Dark Cyberpunk Neon</option>
                    <option value={3}>Option 3: Amber Luxury Palace</option>
                    <option value={4}>Option 4: Emerald Forest Botanical</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Search Engine Optimization */}
          <div className="space-y-4">
            <span className="block text-[10px] font-black text-indigo-650 uppercase tracking-widest">
              2. Search Engine Optimization (SEO)
            </span>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Meta Header Title Tag
              </label>
              <input
                type="text"
                value={c.seoTitle || ''}
                onChange={(e) => handleChange('seoTitle', e.target.value)}
                placeholder="e.g. Royal Bistro | Fine Italian Dining"
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Meta Description Copy
              </label>
              <textarea
                rows={3}
                value={c.seoDescription || ''}
                onChange={(e) => handleChange('seoDescription', e.target.value)}
                placeholder="Summary displayed in search results..."
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2 text-xs outline-none transition resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                SEO Search Keywords (Comma separated)
              </label>
              <input
                type="text"
                value={c.seoKeywords || ''}
                onChange={(e) => handleChange('seoKeywords', e.target.value)}
                placeholder="pizza, restaurant, local cafe"
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition"
              />
            </div>
          </div>

          {/* Section 3: Payment Gateway Checkout */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <span className="block text-[10px] font-black text-indigo-650 uppercase tracking-widest">
              3. Payment Gateway Sandbox
            </span>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Checkout Provider Gateway
              </label>
              <select
                value={c.paymentGateway || 'Stripe'}
                onChange={(e) => handleChange('paymentGateway', e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition"
              >
                <option value="Stripe">Stripe Checkout API</option>
                <option value="PayPal">PayPal smart Buttons</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-550 uppercase mb-2">
                Publishable API Credential Key
              </label>
              <input
                type="text"
                value={c.stripeKey || ''}
                onChange={(e) => handleChange('stripeKey', e.target.value)}
                placeholder="pk_test_..."
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition font-mono"
              />
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 rounded-xl">
              <div>
                <span className="block font-bold text-slate-900">Sandbox Test Mode</span>
                <span className="block text-[9px] text-slate-400 mt-0.5 font-semibold">
                  Skips active card checking for quick testing.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={c.sandboxMode ?? true}
                  onChange={(e) => handleChange('sandboxMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650" />
              </label>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2">
                <span>GST Tax Percentage surcharge</span>
                <span className="text-indigo-600 font-extrabold">{c.gstRate || 18}% GST</span>
              </div>
              <input
                type="range"
                min="0"
                max="28"
                step="1"
                value={c.gstRate ?? 18}
                onChange={(e) => handleChange('gstRate', parseInt(e.target.value, 10))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Section 4: Web Domain Routing */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <span className="block text-[10px] font-black text-indigo-650 uppercase tracking-widest">
              4. Domain Name Configurations
            </span>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Mapped Website Domain Name
              </label>
              <input
                type="text"
                value={c.domainName || ''}
                onChange={(e) => handleChange('domainName', e.target.value.toLowerCase().trim())}
                placeholder="e.g. bistro.zatbiz.site or www.bistro.com"
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl px-4 py-2.5 text-xs outline-none transition"
              />
              <span className="block text-[9px] text-slate-400 mt-1 font-semibold">
                To link custom domains, point DNS CNAME targets to **dns.zatbiz.site**.
              </span>
            </div>

            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-2">
              <span className="block font-bold text-indigo-700">💡 Database Synchronized</span>
              <p className="text-[10px] text-indigo-600 leading-normal font-medium">
                Changes saved inside this setup console instantly update your public storefront database configuration.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
