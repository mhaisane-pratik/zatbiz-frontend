'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';

function getProjectMockImage(project: Project): string {
  const name = project.name.toLowerCase();
  const desc = (project.description || '').toLowerCase();
  const blocksStr = (project.blocksJson || '').toLowerCase();

  // A. Extract image from blocksJson if available (e.g. image_banner, hero or gallery image)
  try {
    if (project.blocksJson) {
      const blocks = JSON.parse(project.blocksJson);
      for (const block of blocks) {
        if (block.content?.imageUrl) {
          return block.content.imageUrl;
        }
        if (block.content?.bannerImageUrl) {
          return block.content.bannerImageUrl;
        }
        if (block.content?.images && block.content.images.length > 0) {
          return block.content.images[0];
        }
      }
    }
  } catch (e) {
    // ignore json parse error
  }

  // B. Match by business config shopNiche
  try {
    if (project.blocksJson) {
      const blocks = JSON.parse(project.blocksJson);
      const bizConfig = blocks.find((b: any) => b.type === 'business_config');
      if (bizConfig && bizConfig.content?.shopNiche) {
        const niche = bizConfig.content.shopNiche.toLowerCase();
        if (niche.includes('cloth') || niche.includes('fashion') || niche.includes('boutique') || niche.includes('apparel') || niche.includes('jewelry') || niche.includes('streetwear') || niche.includes('activewear')) {
          return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80'; // Fashion
        }
        if (niche.includes('grocery') || niche.includes('food') || niche.includes('eat') || niche.includes('restaurant') || niche.includes('bakery') || niche.includes('coffee') || niche.includes('roasters')) {
          return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'; // Food/Grocery
        }
        if (niche.includes('electronics') || niche.includes('tech') || niche.includes('gadgets') || niche.includes('audio') || niche.includes('smart') || niche.includes('iot')) {
          return 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80'; // Tech/Electronics
        }
        if (niche.includes('pet') || niche.includes('dog') || niche.includes('cat') || niche.includes('aquatics')) {
          return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80'; // Pets
        }
        if (niche.includes('beauty') || niche.includes('spa') || niche.includes('skincare') || niche.includes('clinic')) {
          return 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80'; // Beauty/Spa
        }
        if (niche.includes('book') || niche.includes('literature') || niche.includes('writer')) {
          return 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80'; // Books
        }
        if (niche.includes('fitness') || niche.includes('sport') || niche.includes('gym') || niche.includes('athletic')) {
          return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'; // Fitness
        }
        if (niche.includes('automotive') || niche.includes('car') || niche.includes('parts')) {
          return 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80'; // Automotive
        }
        if (niche.includes('travel') || niche.includes('tour') || niche.includes('journey')) {
          return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80'; // Travel
        }
        if (niche.includes('realestate') || niche.includes('furniture') || niche.includes('decor') || niche.includes('crib') || niche.includes('interior')) {
          return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80'; // Furniture/Home
        }
      }
    }
  } catch (e) {
    // ignore
  }

  // C. Fallback matching by name/description keywords
  if (
    name.includes('restaurant') ||
    name.includes('food') ||
    name.includes('cafe') ||
    name.includes('eat') ||
    name.includes('gourmet') ||
    name.includes('dining') ||
    name.includes('kitchen') ||
    name.includes('sunset') ||
    name.includes('coffee') ||
    name.includes('bakery') ||
    name.includes('grocery') ||
    blocksStr.includes('sunset') ||
    blocksStr.includes('chef') ||
    blocksStr.includes('pizza')
  ) {
    return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80';
  }

  if (
    name.includes('salon') ||
    name.includes('hair') ||
    name.includes('beauty') ||
    name.includes('spa') ||
    name.includes('nail') ||
    name.includes('barber') ||
    name.includes('parlor') ||
    name.includes('skincare') ||
    desc.includes('salon') ||
    desc.includes('beauty')
  ) {
    return 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80';
  }

  if (
    name.includes('shop') ||
    name.includes('store') ||
    name.includes('apparel') ||
    name.includes('clothing') ||
    name.includes('fashion') ||
    name.includes('boutique') ||
    name.includes('wear') ||
    name.includes('cloth') ||
    name.includes('jacket') ||
    name.includes('sneakers') ||
    desc.includes('cloth') ||
    desc.includes('apparel') ||
    blocksStr.includes('cloth')
  ) {
    return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80';
  }

  if (
    name.includes('pet') ||
    name.includes('dog') ||
    name.includes('cat') ||
    name.includes('bark') ||
    desc.includes('pet')
  ) {
    return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80';
  }

  if (
    name.includes('fitness') ||
    name.includes('gym') ||
    name.includes('sport') ||
    name.includes('athletic') ||
    desc.includes('fitness')
  ) {
    return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80';
  }

  if (
    name.includes('agency') ||
    name.includes('portfolio') ||
    name.includes('design') ||
    name.includes('creative') ||
    name.includes('studio') ||
    name.includes('web') ||
    name.includes('tech') ||
    name.includes('royal')
  ) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';
  }

  // D. Default mockup image
  return 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80';
}

const MOCK_WORKSPACES: any[] = [];

interface ProjectsGridProps {
  projects: Project[];
  onDeleteProject: (id: number, e: React.MouseEvent) => void;
  onNavigateToTemplates: () => void;
}

export default function ProjectsGrid({ projects, onDeleteProject, onNavigateToTemplates }: ProjectsGridProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Status');
  const [domain, setDomain] = useState('All Domains');
  const [sort, setSort] = useState('Recently Updated');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [favs, setFavs] = useState<Set<number>>(new Set());
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  // Merge projects from database with Mock workspaces, avoiding duplicate names
  const mergedWorkspaces = (() => {
    const seenNames = new Set<string>();
    const list: typeof MOCK_WORKSPACES = [];
    
    // Sort projects so that the most recent ones (higher ID) are processed first
    const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

    // Process real projects
    sortedProjects.forEach((p) => {
      const cleanName = p.name.trim().toLowerCase();
      if (!seenNames.has(cleanName)) {
        seenNames.add(cleanName);
        list.push({
          id: p.id,
          name: p.name,
          title: p.name,
          description: p.description || 'Custom online storefront canvas synced to H2 database.',
          status: p.status || 'Draft',
          domain: `${p.name.toLowerCase().replaceAll(' ', '') || 'site'}.zatbiz.site`,
          avatar: p.name[0]?.toUpperCase() || 'P',
          avatarBg: 'bg-[#eae8ff] text-[#5c3bee]',
          image: getProjectMockImage(p),
          updatedText: 'Updated recently',
          badgeStyle: p.status === 'Published' ? 'bg-[#e6fbf4] text-[#03a87c] border-[#bef3e5]' : 'bg-[#fff8ec] text-[#e09117] border-[#ffe8cc]',
          isMock: false
        });
      }
    });

    // Process mock workspaces
    MOCK_WORKSPACES.forEach((mw) => {
      const cleanName = mw.name.trim().toLowerCase();
      if (!seenNames.has(cleanName)) {
        seenNames.add(cleanName);
        list.push(mw);
      }
    });

    return list;
  })();

  // Filter workspaces
  const filtered = mergedWorkspaces.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) || 
                          w.title.toLowerCase().includes(search.toLowerCase()) ||
                          w.domain.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = status === 'All Status' || 
                          w.status.toLowerCase() === status.toLowerCase();
                          
    const matchesDomain = domain === 'All Domains' || 
                          (domain === 'zatbiz.site' && w.domain.endsWith('zatbiz.site')) ||
                          (domain === 'custom' && !w.domain.endsWith('zatbiz.site'));

    return matchesSearch && matchesStatus && matchesDomain;
  });

  // Sort workspaces
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Name A-Z') {
      return a.name.localeCompare(b.name);
    }
    return b.id - a.id;
  });

  // Paginate: 6 items per page
  const itemsPerPage = 6;
  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const paginated = sorted.slice(startIndex, startIndex + itemsPerPage);

  const toggleFav = (id: number) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (mergedWorkspaces.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm max-w-xl mx-auto">
        <div className="text-5xl mb-6">🏜️</div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">No Websites Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed mb-6 font-medium">
          You haven't generated any dynamic sites yet. Browse our template marketplace to start building!
        </p>
        <button
          onClick={onNavigateToTemplates}
          className="px-5 py-2.5 bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-xs font-bold rounded-lg transition shadow-sm cursor-pointer border-none"
        >
          Explore Templates Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-white border border-slate-200/50 p-4 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <i className="fa-solid fa-magnifying-glass text-xs" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search workspaces..."
            className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-450 outline-none focus:bg-white focus:border-indigo-500 transition font-bold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 outline-none cursor-pointer focus:border-indigo-500 shadow-sm"
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Password Protected</option>
            <option>Private</option>
          </select>

          {/* Domain Filter */}
          <select
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);
              setPage(1);
            }}
            className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 outline-none cursor-pointer focus:border-indigo-500 shadow-sm"
          >
            <option>All Domains</option>
            <option>zatbiz.site</option>
            <option>custom</option>
          </select>

          {/* Sort Filter */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-750 outline-none cursor-pointer focus:border-indigo-500 shadow-sm"
          >
            <option>Recently Updated</option>
            <option>Name A-Z</option>
          </select>

          {/* Layout view toggle */}
          <div className="flex border border-slate-200 rounded-xl overflow-hidden p-0.5 bg-slate-50 flex-shrink-0">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg text-xs transition cursor-pointer ${
                view === 'grid' ? 'bg-[#5c3bee] text-white' : 'text-slate-400 hover:text-slate-600 bg-transparent'
              }`}
              title="Grid View"
            >
              <i className="fa-solid fa-grip" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg text-xs transition cursor-pointer ${
                view === 'list' ? 'bg-[#5c3bee] text-white' : 'text-slate-400 hover:text-slate-600 bg-transparent'
              }`}
              title="List View"
            >
              <i className="fa-solid fa-list" />
            </button>
          </div>
        </div>
      </div>

      {/* View Content */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginated.map((w) => (
            <div
              key={w.isMock ? `mock-${w.id}` : `real-${w.id}`}
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300 flex flex-col group relative"
            >
              {/* Card Header image */}
              <div className="h-44 relative bg-slate-50 overflow-hidden select-none">
                {/* Status tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 text-[9px] font-black tracking-widest uppercase rounded-lg border ${w.badgeStyle}`}>
                    {w.status}
                  </span>
                </div>
                
                {/* Favorite Star */}
                <button 
                  onClick={() => toggleFav(w.id as number)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-400 hover:text-amber-500 hover:scale-105 active:scale-95 transition cursor-pointer border-none"
                >
                  <i className={`${favs.has(w.id as number) ? 'fa-solid fa-star text-amber-500' : 'fa-regular fa-star'}`} />
                </button>

                {/* Hover overlay with Link to builder/preview */}
                <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition duration-300 z-10 flex items-center justify-center gap-3 backdrop-blur-[1px]">
                  <Link
                    href={`/builder/${w.id}`}
                    className="px-4 py-2.5 bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-lg transition"
                  >
                    ✏&nbsp;&nbsp;Edit Layout
                  </Link>
                </div>

                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between relative bg-white">
                <div className="flex gap-3.5 items-start">
                  {/* Site Avatar */}
                  <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-black text-sm shadow-inner ${w.avatarBg}`}>
                    {w.avatar}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-slate-900 text-xs truncate leading-tight uppercase tracking-wider">
                      {w.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-400 mt-1 truncate max-w-[180px]">
                      {w.title}
                    </p>
                    <a 
                      href={`https://${w.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 mt-2 hover:underline"
                    >
                      <span className="truncate max-w-[130px]">{w.domain}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 my-4" />

                {/* Card Footer */}
                <div className="flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                  <span>{w.updatedText}</span>
                  <div className="flex items-center gap-2 relative">
                    <Link
                      href={`/preview/${w.id}`}
                      className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-[9px] font-black tracking-wider uppercase transition"
                    >
                      Preview
                    </Link>
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === w.id ? null : (w.id as number))}
                      className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition cursor-pointer border-none bg-transparent"
                    >
                      <i className="fa-solid fa-ellipsis-vertical text-xs" />
                    </button>

                    {/* Triple dots dropdown menu */}
                    {activeMenuId === w.id && (
                      <div className="absolute right-0 bottom-9 w-36 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 text-xs text-left normal-case tracking-normal">
                        <Link
                          href={`/builder/${w.id}`}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 font-bold text-slate-700"
                        >
                          <i className="fa-solid fa-pencil text-[10px]" />
                          <span>Edit Layout</span>
                        </Link>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            const newName = prompt("Rename workspace:", w.name);
                            if (newName && newName.trim()) {
                              alert("Rename workspace action: " + newName);
                            }
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 font-bold text-slate-700 border-none bg-transparent cursor-pointer"
                        >
                          <i className="fa-solid fa-i-cursor text-[10px]" />
                          <span>Rename Store</span>
                        </button>
                        <button
                          onClick={(e) => {
                            setActiveMenuId(null);
                            if (w.isMock) {
                              alert("Mock template workspaces are read-only and cannot be deleted from database.");
                            } else {
                              onDeleteProject(w.id, e);
                            }
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-rose-50 flex items-center gap-2 font-bold text-rose-600 border-none bg-transparent cursor-pointer"
                        >
                          <i className="fa-solid fa-trash-can text-[10px]" />
                          <span>Delete Site</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginated.map((w) => (
            <div
              key={w.isMock ? `mock-${w.id}` : `real-${w.id}`}
              className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-305 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={w.image} alt={w.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[8px] font-black tracking-widest uppercase rounded border ${w.badgeStyle}`}>
                      {w.status}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-xs truncate leading-tight uppercase tracking-wider">
                      {w.name}
                    </h4>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1 truncate max-w-[300px]">
                    {w.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 flex-shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{w.updatedText}</span>
                <Link
                  href={`/preview/${w.id}`}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-[10px] font-black uppercase tracking-wider transition"
                >
                  Preview
                </Link>
                <Link
                  href={`/builder/${w.id}`}
                  className="px-4 py-2 bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow transition"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/60 mt-8">
          <span className="text-xs text-slate-400 font-semibold select-none">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} workspaces
          </span>

          <div className="flex items-center gap-1.5 select-none">
            {/* Previous button */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <i className="fa-solid fa-chevron-left text-xs" />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => {
              const pageNum = idx + 1;
              const isCurrent = page === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                    isCurrent
                      ? 'bg-[#5c3bee] text-white font-black shadow-md shadow-indigo-100'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next button */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-450 hover:bg-slate-50 transition cursor-pointer disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <i className="fa-solid fa-chevron-right text-xs" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
