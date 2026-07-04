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
        <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl shadow-sm max-w-lg mx-auto">
          <span className="text-4xl block mb-3">🔍</span>
          <h3 className="text-sm font-extrabold text-slate-800 mb-1">No templates match this filter</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
            We don't have a pre-made template for this category yet, but you can build your custom site from scratch!
          </p>
          <button
            onClick={() => onSelectTemplate('scratch')}
            className="px-6 py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition"
          >
            Build from Scratch ➔
          </button>
        </div>
      )}

      {filteredTemplates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="group flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/20 hover:scale-[1.01] transition-all duration-300 relative"
            >
              {/* Header Image Thumbnail Mockup */}
              <div className="w-full h-40 overflow-hidden relative bg-slate-900 border-b border-slate-100 flex-shrink-0">
                {/* Accent gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${tpl.gradient} opacity-20 group-hover:opacity-10 transition duration-300 z-10`} />
                <img 
                  src={tpl.image} 
                  alt={tpl.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[9px] text-slate-700 px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm z-20">
                  {tpl.category}
                </span>
                {/* Floating Emoji Icon Badge */}
                <div className="w-10 h-10 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-lg absolute bottom-[-16px] right-4 z-20 transform group-hover:rotate-6 transition-transform">
                  {tpl.icon}
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-slate-850 tracking-tight">{tpl.name}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mb-5 line-clamp-3">
                    {tpl.desc}
                  </p>
                </div>
                <button
                  onClick={() => onSelectTemplate(tpl.id)}
                  className="w-full py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-sm hover:shadow-md text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  Customize & Create ➔
                </button>
              </div>
            </div>
          ))}

          {/* Persistent Build from Scratch Card */}
          <div
            className="bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/20 border border-dashed border-indigo-300 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-indigo-500 hover:scale-[1.01] transition duration-300 group"
          >
            {/* Header mockup representing blank slate */}
            <div className="w-full h-40 bg-slate-50 border-b border-dashed border-indigo-200/50 flex flex-col items-center justify-center relative flex-shrink-0">
              <div className="blueprint-grid absolute inset-0 opacity-40" />
              <span className="text-4xl group-hover:scale-110 group-hover:rotate-6 transition duration-300 z-10 select-none">✨</span>
              <span className="absolute top-3 left-3 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border border-indigo-200/20 z-20">
                Blank Canvas
              </span>
            </div>

            {/* Contents */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-sm font-black text-indigo-950 tracking-tight">Build from Scratch</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mb-5">
                  Skip template presets. Initialize a completely blank website, custom page links, default sections, and design your layout exactly how you want.
                </p>
              </div>
              <button
                onClick={() => onSelectTemplate('scratch')}
                className="w-full py-2.5 text-xs font-black bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition shadow-md hover:shadow-lg text-center cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1"
              >
                Start Blank Canvas ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
