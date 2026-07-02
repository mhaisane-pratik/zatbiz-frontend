'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface HospitalCategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
  image: string;
}

export const HOSPITAL_CATEGORIES: HospitalCategory[] = [
  {
    id: 'multi-speciality',
    name: 'Multi-Speciality Hospital',
    icon: '🏥',
    desc: 'Comprehensive tertiary care offering multi-disciplinary treatment, trauma, and diagnostics.',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'clinic',
    name: 'Clinic',
    icon: '🩺',
    desc: 'General outpatient clinic providing primary care consultations and general healthcare.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'dental-clinic',
    name: 'Dental Clinic',
    icon: '🦷',
    desc: 'Modern oral healthcare, dental surgery, cosmetic dentistry, and root canal therapy.',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'eye-hospital',
    name: 'Eye Hospital',
    icon: '👁️',
    desc: 'Ophthalmology center for vision testing, laser eye surgery, and optical care.',
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'skin-cosmetology',
    name: 'Skin & Cosmetology Clinic',
    icon: '✨',
    desc: 'Dermatological treatments, skin rejuvenation, chemical peels, and cosmetology.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'orthopedic-hospital',
    name: 'Orthopedic Hospital',
    icon: '🦴',
    desc: 'Specialist bone, joint, spine surgeries, joint replacements, and rehabilitation.',
    image: 'https://images.unsplash.com/photo-1579684453401-966b11832b44?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cardiology-hospital',
    name: 'Cardiology Hospital',
    icon: '❤️',
    desc: 'Advanced cardiac care, bypass surgeries, heart diagnostics, and CCU operations.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'neurology-hospital',
    name: 'Neurology Hospital',
    icon: '🧠',
    desc: 'Brain and nerve specialists treating stroke, epilepsy, and spinal conditions.',
    image: 'https://images.unsplash.com/photo-1559757175-5700def835bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'children-hospital',
    name: "Children's Hospital",
    icon: '👶',
    desc: 'Dedicated pediatric specialists offering child-centric wards and neonatology.',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'women-hospital',
    name: "Women's Hospital",
    icon: '👩',
    desc: 'Comprehensive obstetrics, gynecology, breast wellness, and specialist health care.',
    image: 'https://images.unsplash.com/photo-1590611357128-89c536594813?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'maternity-hospital',
    name: 'Maternity Hospital',
    icon: '🍼',
    desc: 'Labor suites, natural birthing programs, expert midwives, and post-natal care.',
    image: 'https://images.unsplash.com/photo-1505151828126-66d4187f5492?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ivf-fertility',
    name: 'IVF & Fertility Center',
    icon: '🔬',
    desc: 'Embryology labs, fertility testing, IUI, IVF, and genetic screenings.',
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'diagnostic-center',
    name: 'Diagnostic Center',
    icon: '🩻',
    desc: 'High-resolution ultrasounds, 3D CT/MRI scans, and diagnostic screenings.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pathology-lab',
    name: 'Pathology Lab',
    icon: '🧪',
    desc: 'Automated blood counts, biochemistry profiling, and histological analysis.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'physiotherapy-clinic',
    name: 'Physiotherapy Clinic',
    icon: '🏃',
    desc: 'Rehabilitation therapies, muscle strengthening, and recovery programs.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'mental-health-clinic',
    name: 'Mental Health Clinic',
    icon: '💬',
    desc: 'Professional counseling, psychotherapy, and emotional support services.',
    image: 'https://images.unsplash.com/photo-1527137341206-1a2ab8140b53?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ayurvedic-hospital',
    name: 'Ayurvedic Hospital',
    icon: '🍃',
    desc: 'Traditional Panchakarma therapy, herbal medicines, and natural wellness.',
    image: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'homeopathy-clinic',
    name: 'Homeopathy Clinic',
    icon: '💧',
    desc: 'Gentle natural remedies and individualized homeopathy treatments.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'veterinary-clinic',
    name: 'Veterinary Clinic',
    icon: '🐕',
    desc: 'Pet healthcare, animal surgery, vaccinations, and grooming diagnostics.',
    image: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'medical-college-hospital',
    name: 'Medical College Hospital',
    icon: '🎓',
    desc: 'Tertiary teaching hospital, academic clinical research, and emergency care.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80'
  }
];

interface HospitalSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string) => void;
  onBuildFromScratch: () => void;
}

export default function HospitalSelectorModal({
  isOpen,
  onClose,
  onSelectCategory,
  onBuildFromScratch
}: HospitalSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return HOSPITAL_CATEGORIES;
    const query = searchQuery.toLowerCase().trim();
    return HOSPITAL_CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.desc.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div 
        className="bg-white border border-slate-200 text-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer z-10"
          title="Close Selector"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <span>🏥</span> Clinical Health Niche Categories
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Select a specialized clinic or hospital theme to initialize your medical workspace.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search health subcategory..."
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-600 rounded-xl pl-9 pr-8 py-2.5 text-xs outline-none text-slate-800 transition placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-655 text-xs bg-transparent border-none cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Categories Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-slate-50/20">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-4xl block mb-4">🔍</span>
              <h3 className="text-sm font-extrabold text-slate-800">No matching hospital niches found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto mb-6">
                We couldn't find a category matching "{searchQuery}". You can try another search or start with a blank slate.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition border border-slate-200 cursor-pointer"
                >
                  Clear Search
                </button>
                <button
                  onClick={onBuildFromScratch}
                  className="px-5 py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition cursor-pointer border-none"
                >
                  Build from Scratch ➔
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Build from Scratch Card */}
              <div className="flex flex-col bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 border border-dashed border-indigo-300 rounded-2xl overflow-hidden hover:border-indigo-500 hover:shadow-xl transition-all duration-300 group">
                <div className="w-full h-32 bg-slate-50/80 flex flex-col items-center justify-center relative flex-shrink-0 border-b border-slate-100">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <span className="text-4xl group-hover:scale-110 group-hover:rotate-6 transition duration-300 z-10 select-none">✨</span>
                  <span className="absolute top-2.5 left-2.5 bg-indigo-50 border border-indigo-250 text-indigo-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                    Blank Slate
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 mb-4 text-left font-sans">
                    <h3 className="text-xs font-black text-indigo-600 uppercase tracking-wider">Build from Scratch</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                      Skip pre-configured medical pages and start with a clean site builder interface.
                    </p>
                  </div>
                  <button
                    onClick={onBuildFromScratch}
                    className="w-full py-2.5 text-[10px] font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition shadow-md uppercase tracking-wider cursor-pointer border-none"
                  >
                    Start Blank Canvas ➔
                  </button>
                </div>
              </div>

              {/* Dynamic Categories */}
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group"
                >
                  <div className="w-full h-32 overflow-hidden relative flex-shrink-0 border-b border-slate-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-80" />
                    
                    {/* Floating emoji icon */}
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-150 flex items-center justify-center text-base absolute bottom-2 right-2.5 z-10 shadow-md">
                      {cat.icon}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between text-left font-sans">
                    <div className="space-y-1.5 mb-4">
                      <h3 className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition tracking-tight">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-semibold line-clamp-2">
                        {cat.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => onSelectCategory(cat.name)}
                      className="w-full py-2.5 text-[10px] font-black bg-slate-50 border border-slate-200/80 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white text-slate-650 rounded-xl transition uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Select & Create ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-150 text-center text-[10px] text-slate-450 font-bold uppercase tracking-wider">
          Chosen medical subcategories initialize customized service guidelines and templates.
        </div>
      </div>
    </div>
  );
}
