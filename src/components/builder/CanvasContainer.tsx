'use client';

import React from 'react';

interface CanvasContainerProps {
  canvasWidth: 'desktop' | 'tablet' | 'mobile';
  activePage: 'landing' | 'login' | 'dashboard' | 'products' | 'settings';
  children: React.ReactNode;
}

export default function CanvasContainer({
  canvasWidth,
  activePage,
  children,
}: CanvasContainerProps) {
  const isProductsOrSettings = activePage === 'products' || activePage === 'settings';

  if (isProductsOrSettings) {
    return (
      <main className="flex-1 bg-slate-100/70 p-6 overflow-y-auto flex flex-col items-center justify-start">
        <div className="w-full min-h-full bg-white border border-slate-200 rounded-2xl shadow-xl transition-all duration-300 max-w-6xl">
          {children}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-100/70 p-6 overflow-y-auto flex flex-col items-center justify-start">
      {canvasWidth === 'mobile' ? (
        /* Premium simulated mobile frame */
        <div className="my-4 relative bg-slate-900 rounded-[50px] p-3.5 shadow-2xl border-[12px] border-slate-900 ring-2 ring-slate-950/20 max-w-[375px] w-full flex-shrink-0">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-900 rounded-b-2xl z-35 flex items-center justify-center">
            <div className="w-12 h-1 bg-slate-800 rounded-full mb-1" />
          </div>
          <div className="bg-white rounded-[36px] overflow-hidden border border-slate-200 flex flex-col h-[700px] overflow-y-auto relative scrollbar-none">
            {children}
          </div>
        </div>
      ) : canvasWidth === 'tablet' ? (
        /* Premium simulated tablet frame */
        <div className="my-4 relative bg-slate-900 rounded-[40px] p-4.5 shadow-2xl border-[14px] border-slate-900 ring-2 ring-slate-950/20 max-w-[768px] w-full flex-shrink-0">
          <div className="bg-white rounded-[26px] overflow-hidden border border-slate-200 flex flex-col h-[900px] overflow-y-auto relative scrollbar-none">
            {children}
          </div>
        </div>
      ) : (
        /* Desktop */
        <div className="w-full min-h-full bg-white border border-slate-200 rounded-2xl shadow-xl transition-all duration-300 max-w-[900px]">
          {children}
        </div>
      )}
    </main>
  );
}
