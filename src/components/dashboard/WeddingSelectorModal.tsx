'use client';

import React, { useState, useEffect, useMemo } from 'react';

export interface WeddingCategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
  image: string;
}

export const WEDDING_CATEGORIES: WeddingCategory[] = [
  {
    id: 'wedding-planner',
    name: 'Wedding Planner',
    icon: '💍',
    desc: 'Bespoke wedding planning, design, timeline management, and bridal coordination.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'event-planner',
    name: 'Event Planner',
    icon: '🎉',
    desc: 'General social gatherings, private dining parties, and corporate team events.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'birthday-planner',
    name: 'Birthday Planner',
    icon: '🎂',
    desc: 'Creative birthday party decorations, theme designs, catering, and kids activities.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'corporate-event-planner',
    name: 'Corporate Event Planner',
    icon: '👔',
    desc: 'Professional corporate seminars, board dinners, summits, and business galas.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'conference-organizer',
    name: 'Conference Organizer',
    icon: '💼',
    desc: 'Large-scale conventions, presentation halls, guest speaker panel coordination.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'catering-services',
    name: 'Catering Services',
    icon: '🍽️',
    desc: 'Gourmet meal courses, buffet arrangements, custom menus, and dining hospitality.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'decoration-services',
    name: 'Decoration Services',
    icon: '✨',
    desc: 'Bespoke lighting layouts, table decor, theme backdrops, and room styling.',
    image: 'https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'wedding-photography',
    name: 'Wedding Photography',
    icon: '📷',
    desc: 'Professional wedding album sessions, candid bridal portraits, and photo edits.',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'wedding-videography',
    name: 'Wedding Videography',
    icon: '🎥',
    desc: 'Cinematic wedding highlight videos, custom editing, and multi-camera shoots.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'dj-music-services',
    name: 'DJ & Music Services',
    icon: '🎵',
    desc: 'Live dancefloor DJ sound systems, custom playlists, and stage lighting.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'live-band-services',
    name: 'Live Band Services',
    icon: '🎸',
    desc: 'Live acoustic sets, full band equipment setups, and performance singers.',
    image: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'stage-decoration',
    name: 'Stage Decoration',
    icon: '🏛️',
    desc: 'Wedding stage setups, reception backdrops, and photo booth frames.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'balloon-decoration',
    name: 'Balloon Decoration',
    icon: '🎈',
    desc: 'Stunning balloon arches, columns, and custom party installations.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'flower-decoration',
    name: 'Flower Decoration',
    icon: '🌸',
    desc: 'Elegant fresh floral mandaps, centerpieces, and decorative panels.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'destination-wedding-planner',
    name: 'Destination Wedding Planner',
    icon: '✈️',
    desc: 'Cross-border event planning, hotel block arrangements, and travel guides.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'wedding-venue',
    name: 'Wedding Venue',
    icon: '🏰',
    desc: 'Scenic event lawns, beachfront plots, and private wedding halls.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'banquet-hall',
    name: 'Banquet Hall',
    icon: '🏢',
    desc: 'Elegant indoor dining spaces, corporate tables, and reception halls.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'convention-center',
    name: 'Convention Center',
    icon: '🏛️',
    desc: 'High-volume exhibition spaces, business summits, and large events.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'party-hall',
    name: 'Party Hall',
    icon: '🍻',
    desc: 'Small to medium event rooms for cocktails, birthdays, and social mixers.',
    image: 'https://images.unsplash.com/photo-1496337589254-7e19d01eae44?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'exhibition-organizer',
    name: 'Exhibition Organizer',
    icon: '🖼️',
    desc: 'Art gallery layouts, trade stands, booths, and visitor flow management.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'trade-show-organizer',
    name: 'Trade Show Organizer',
    icon: '📊',
    desc: 'B2B commercial trade show stalls, marketing banners, and registrations.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'college-event-organizer',
    name: 'College Event Organizer',
    icon: '🎓',
    desc: 'Campus cultural festivals, music concerts, and athletic sports meets.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'school-event-organizer',
    name: 'School Event Organizer',
    icon: '🏫',
    desc: 'Academic prize distributions, annual sports days, and parent-teacher galas.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'religious-event-planner',
    name: 'Religious Event Planner',
    icon: '⛪',
    desc: 'Sacred services, community dinners, holiday calendars, and fundraisers.',
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'festival-event-organizer',
    name: 'Festival Event Organizer',
    icon: '🎡',
    desc: 'Street fests, food truck fairs, community fairs, and large concerts.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'fashion-show-organizer',
    name: 'Fashion Show Organizer',
    icon: '💃',
    desc: 'Runway design, catwalk lighting, designer catalog presentations, and models.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'product-launch-organizer',
    name: 'Product Launch Organizer',
    icon: '🚀',
    desc: 'Media press kits, stage setups, product live demos, and brand unveilings.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'award-ceremony-organizer',
    name: 'Award Ceremony Organizer',
    icon: '🏆',
    desc: 'Red carpet entries, trophy presentations, live hosts, and seating charts.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'sports-event-organizer',
    name: 'Sports Event Organizer',
    icon: '⚽',
    desc: 'Tournament scoreboards, stadium coordination, participant registrations.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80'
  }
];

interface WeddingSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string) => void;
  onBuildFromScratch: () => void;
}

export default function WeddingSelectorModal({
  isOpen,
  onClose,
  onSelectCategory,
  onBuildFromScratch
}: WeddingSelectorModalProps) {
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
    if (!searchQuery.trim()) return WEDDING_CATEGORIES;
    const query = searchQuery.toLowerCase().trim();
    return WEDDING_CATEGORIES.filter(
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
              <span>💍</span> Wedding & Event Planner Niche Categories
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Select a specialized event planning or decoration category to configure your template.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event subcategory..."
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
              <h3 className="text-sm font-extrabold text-slate-800">No matching subcategories found</h3>
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
                  <span className="absolute top-2.5 left-2.5 bg-indigo-50 border border-indigo-250 text-indigo-650 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                    Blank Slate
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 mb-4 text-left font-sans">
                    <h3 className="text-xs font-black text-indigo-650 uppercase tracking-wider">Build from Scratch</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                      Skip pre-configured template pages and start building from a clean interface.
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

              {/* Wedding & Event Categories */}
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
                      className="w-full py-2.5 text-[10px] font-black bg-slate-50 border border-slate-200/80 hover:bg-indigo-600 hover:border-indigo-650 hover:text-white text-slate-600 rounded-xl transition uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
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
          Chosen subcategories help seed event schedules, photo galleries, and booking cards.
        </div>
      </div>
    </div>
  );
}
