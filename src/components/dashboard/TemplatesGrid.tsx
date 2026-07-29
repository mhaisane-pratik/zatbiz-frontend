'use client';

export interface Template {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: string;
  image: string;
  gradient: string;
}

export const TEMPLATES: Template[] = [
  {
    id: 'restaurant',
    name: 'Restaurant Web Application',
    desc: 'Exquisite dining and reservation system equipped with digital menus, table reservation booking workflows, and kitchen stock metrics.',
    icon: '🍕',
    category: 'restaurant',
    image: '/images/restaurant_login_illustration.png',
    gradient: 'from-orange-500 to-rose-500'
  },
  {
    id: 'clinic',
    name: 'Hospital Web Application',
    desc: 'Professional clinic and patient portal featuring doctor schedule checkers, appointment scheduling tools, and patient inquiry workflows.',
    icon: '🏥',
    category: 'clinic',
    image: '/images/clinic_template.png',
    gradient: 'from-sky-500 to-indigo-500'
  },
  {
    id: 'school',
    name: 'School Web Application',
    desc: 'Interactive school management system with class timetable views, student admissions portal, and fee structure details.',
    icon: '🏫',
    category: 'school',
    image: '/images/school_template.png',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'gym',
    name: 'Fitness Gym Web Application',
    desc: 'High-energy fitness club platform equipped with gym membership calculators, training program planners, and class calendars.',
    icon: '💪',
    category: 'gym',
    image: '/images/gym_template.png',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'storefront',
    name: 'Ecommerce Web Application',
    desc: 'Shopify-style catalog store containing product inventory managers, order placement workflows, shopping cart drawers, and secure checkout simulation.',
    icon: '🛍️',
    category: 'ecommerce',
    image: '/images/website_creator_illustration.png',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'realestate',
    name: 'Real Estate Web Application',
    desc: 'Premium property management portal displaying house listings, dynamic mortgage calculators, and real estate broker contact forms.',
    icon: '🏡',
    category: 'realestate',
    image: '/images/realestate_template.png',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'travel',
    name: 'Travel Agency Web Application',
    desc: 'Wanderlust travel reservation portal featuring vacation itinerary filters, package booking managers, and tour guides details.',
    icon: '✈️',
    category: 'agency',
    image: '/images/travel_template.png',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'portfolio',
    name: 'Portfolio Web Application',
    desc: 'Interactive creator portfolio showcasing project filters, technical skill metrics, and contact messages inbox.',
    icon: '💼',
    category: 'agency',
    image: '/images/website_creator_illustration.png',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'wedding',
    name: 'Wedding & Event Web Application',
    desc: 'Bespoke event planning dashboard featuring wedding countdown clocks, guest RSVP registration workflows, and catering menu editors.',
    icon: '💍',
    category: 'agency',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=80',
    gradient: 'from-pink-400 to-rose-400'
  },
  {
    id: 'ngo',
    name: 'NGO & Non-Profit Web Application',
    desc: 'Meaningful charity platform featuring secure campaign donation engines, donor metrics, and volunteer registration.',
    icon: '🤝',
    category: 'agency',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80',
    gradient: 'from-emerald-400 to-teal-400'
  },
  {
    id: 'corporate',
    name: 'Corporate Web Application',
    desc: 'Enterprise business application with professional consulting service tabs and interactive quote estimation forms.',
    icon: '🏢',
    category: 'agency',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'medical-shop',
    name: 'Medical Shop Web Application',
    desc: 'Fully loaded digital pharmacy featuring secure prescription uploads, live order tracking, and inventory stock management.',
    icon: '💊',
    category: 'ecommerce',
    image: '/images/medical_shop_template.png',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'hotel',
    name: 'Hotel & Resort Web Application',
    desc: 'Premium hospitality platform with room listings, live availability search, and an end-to-end room booking flow.',
    icon: '🏨',
    category: 'agency',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    gradient: 'from-sky-500 to-cyan-500'
  }
];

interface TemplatesGridProps {
  selectedCategory: string;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplatesGrid({ selectedCategory, onSelectTemplate }: TemplatesGridProps) {
  const filteredTemplates = TEMPLATES.filter(
    (tpl) => selectedCategory === 'all' || tpl.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {filteredTemplates.length === 0 && (
        <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl max-w-lg mx-auto">
          <span className="text-3xl block mb-3">🔍</span>
          <h3 className="text-base font-semibold text-slate-800 mb-1">No templates match this filter</h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">
            We don't have a pre-made template for this category yet, but you can build your custom site from scratch.
          </p>
          <button
            onClick={() => onSelectTemplate('scratch')}
            className="px-6 py-3 text-sm font-medium bg-slate-900 hover:bg-indigo-600 text-white rounded-xl transition"
          >
            Build from Scratch →
          </button>
        </div>
      )}

      {filteredTemplates.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="group flex flex-col bg-white border border-slate-200/70 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-200 relative"
            >
              {/* Header Image Thumbnail Mockup */}
              <div className="w-full h-24 overflow-hidden relative bg-slate-50 border-b border-slate-100 flex-shrink-0">
                {/* Accent gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${tpl.gradient} opacity-10 group-hover:opacity-[0.06] transition duration-300 z-10`} />
                <img
                  src={tpl.image}
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Emoji Icon Badge */}
                <div className="w-7 h-7 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-sm absolute bottom-2 right-2 z-20">
                  {tpl.icon}
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1 mb-3">
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide">{tpl.category}</span>
                  <h3 className="text-[13px] font-semibold text-slate-900 tracking-tight leading-snug line-clamp-1">{tpl.name}</h3>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => onSelectTemplate(tpl.id)}
                    className="w-full py-2 text-xs font-medium bg-slate-900 hover:bg-indigo-600 text-white rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    Customize
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                  {tpl.category === 'ecommerce' && (
                    <button
                      onClick={() => window.open(tpl.id === 'medical-shop' ? '/medical-preview' : '/templates-preview', '_blank')}
                      className="w-full py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg transition text-center cursor-pointer flex items-center justify-center gap-1"
                    >
                      👁 Preview
                    </button>
                  )}
                  {tpl.id === 'corporate' && (
                    <button
                      onClick={() => window.open('/corporate-preview', '_blank')}
                      className="w-full py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg transition text-center cursor-pointer flex items-center justify-center gap-1"
                    >
                      👁 Preview
                    </button>
                  )}
                  {tpl.id === 'hotel' && (
                    <button
                      onClick={() => window.open('/hotel-preview', '_blank')}
                      className="w-full py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg transition text-center cursor-pointer flex items-center justify-center gap-1"
                    >
                      👁 Preview · 4 Themes
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Persistent Build from Scratch Card */}
          <div
            className="bg-indigo-50/30 border border-dashed border-indigo-200 rounded-xl overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition duration-200 group"
          >
            {/* Header mockup representing blank slate */}
            <div className="w-full h-24 bg-slate-50 border-b border-dashed border-indigo-200/50 flex flex-col items-center justify-center relative flex-shrink-0">
              <div className="blueprint-grid absolute inset-0 opacity-40" />
              <span className="text-2xl transition duration-300 z-10 select-none">✨</span>
            </div>

            {/* Contents */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1 mb-3">
                <span className="text-[9px] text-indigo-500 font-semibold uppercase tracking-wide">Blank Canvas</span>
                <h3 className="text-[13px] font-semibold text-slate-900 tracking-tight leading-snug">Build from Scratch</h3>
              </div>
              <button
                onClick={() => onSelectTemplate('scratch')}
                className="w-full py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition text-center cursor-pointer flex items-center justify-center gap-1"
              >
                Start Blank →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
