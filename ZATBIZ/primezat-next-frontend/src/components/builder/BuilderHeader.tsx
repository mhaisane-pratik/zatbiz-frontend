'use client';

interface BuilderHeaderProps {
  projectName: string;
  status: string;
  activePage: 'landing' | 'login' | 'dashboard' | 'products' | 'settings';
  canvasWidth: 'desktop' | 'tablet' | 'mobile';
  onSave: () => void;
  onPublish: () => void;
  onChangePage: (page: 'landing' | 'login' | 'dashboard' | 'products' | 'settings') => void;
  onChangeCanvasWidth: (width: 'desktop' | 'tablet' | 'mobile') => void;
}

export default function BuilderHeader({
  projectName,
  status,
  activePage,
  canvasWidth,
  onSave,
  onPublish,
  onChangePage,
  onChangeCanvasWidth,
}: BuilderHeaderProps) {
  return (
    <header className="h-16 bg-slate-900 text-white border-b border-slate-800 flex justify-between items-center px-6 z-30 select-none">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <LinkToDashboard />
        <div className="hidden sm:block">
          <h1 className="text-xs font-black tracking-tight leading-none text-white">
            {projectName}
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Pages Selector Tabs */}
      <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[10px] font-bold">
        {[
          { id: 'landing', label: 'Landing Page' },
          { id: 'login', label: 'Client Login' },
          { id: 'dashboard', label: 'Client Portal' },
          { id: 'products', label: 'Product Catalog' },
          { id: 'settings', label: '⚙️ Site Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChangePage(tab.id as any)}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activePage === tab.id
                ? 'bg-slate-750 text-white shadow-sm'
                : 'text-slate-450 hover:text-slate-205'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sizing Viewports (Only visible for Landing Page) */}
      <div className="flex items-center gap-4">
        {activePage === 'landing' && (
          <div className="hidden md:flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[10px] font-bold">
            {[
              { id: 'desktop', label: '🖥️ Desktop' },
              { id: 'tablet', label: '平板 Tablet' },
              { id: 'mobile', label: '📱 Mobile' },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => onChangeCanvasWidth(size.id as any)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  canvasWidth === size.id
                    ? 'bg-slate-750 text-white shadow-sm'
                    : 'text-slate-450 hover:text-slate-205'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            className="px-3.5 py-1.5 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg transition cursor-pointer"
          >
            Save Draft
          </button>
          <button
            onClick={onPublish}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg shadow-md shadow-indigo-650/15 transition hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
          >
            Publish Live
          </button>
        </div>
      </div>
    </header>
  );
}

function LinkToDashboard() {
  return (
    <Link
      href="/dashboard"
      className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition"
    >
      🏠
    </Link>
  );
}

import Link from 'next/link';
