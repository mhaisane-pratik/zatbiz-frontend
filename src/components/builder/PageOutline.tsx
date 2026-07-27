'use client';

import { useState } from 'react';
import { Block } from '@/types';

interface PageOutlineProps {
  blocks: Block[];
  activeBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onDeleteBlock: (id: string, e: React.MouseEvent) => void;
  onReorderBlocks: (draggedId: string, targetId: string) => void;
}

const BLOCK_META: Record<string, { label: string; icon: string }> = {
  announcement_bar: { label: 'Announcement bar', icon: '📢' },
  header: { label: 'Header', icon: '⚡' },
  image_banner: { label: 'Image banner', icon: '🌅' },
  hero: { label: 'Splash Hero Image', icon: '🎆' },
  'text-image': { label: 'Text with image', icon: '🖼️' },
  text_block: { label: 'Rich text', icon: '📄' },
  gallery: { label: 'Gallery', icon: '🎨' },
  features: { label: 'Multicolumn', icon: '📋' },
  pricing: { label: 'Pricing plans', icon: '💳' },
  products: { label: 'Featured collection', icon: '🛍️' },
  contact_form: { label: 'Contact form', icon: '📝' },
  faq: { label: 'FAQ accordion', icon: '❓' },
  testimonials: { label: 'Testimonials', icon: '🗣️' },
  footer: { label: 'Footer', icon: '📁' },
};

export default function PageOutline({
  blocks,
  activeBlockId,
  onSelectBlock,
  onDeleteBlock,
  onReorderBlocks,
}: PageOutlineProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Accordion group states
  const [headerOpen, setHeaderOpen] = useState(true);
  const [templateOpen, setTemplateOpen] = useState(true);
  const [footerOpen, setFooterOpen] = useState(true);

  // Individual nested block expansion state (Image Banner expanded by default)
  const [bannerExpanded, setBannerExpanded] = useState(true);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDragEnd = () => {
    if (draggedId && dragOverId && draggedId !== dragOverId) {
      onReorderBlocks(draggedId, dragOverId);
    }
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleAddSectionRedirect = () => {
    const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Briefly highlight the block library card
    const libHeader = document.querySelector('.grid.grid-cols-2');
    if (libHeader) {
      libHeader.classList.add('ring-2', 'ring-indigo-650', 'duration-500', 'transition-all');
      setTimeout(() => {
        libHeader.classList.remove('ring-2', 'ring-indigo-650');
      }, 1500);
    }
  };

  // Grouping block categories
  const headerBlockTypes = ['announcement_bar', 'header'];
  const footerBlockTypes = ['footer'];

  const headerBlocks = blocks.filter((b) => headerBlockTypes.includes(b.type));
  const footerBlocks = blocks.filter((b) => footerBlockTypes.includes(b.type));
  const templateBlocks = blocks.filter(
    (b) => !headerBlockTypes.includes(b.type) && !footerBlockTypes.includes(b.type)
  );

  const renderBlockNode = (block: Block) => {
    const isSelected = activeBlockId === block.id;
    const isBeingDragged = draggedId === block.id;
    const isTarget = dragOverId === block.id;
    const meta = BLOCK_META[block.type] || { label: block.type, icon: '🧩' };
    const isImageBanner = block.type === 'image_banner';

    return (
      <div key={block.id} className="space-y-1">
        {/* Main Section Node */}
        <div
          draggable
          onDragStart={() => handleDragStart(block.id)}
          onDragOver={(e) => handleDragOver(e, block.id)}
          onDragEnd={handleDragEnd}
          onClick={() => onSelectBlock(block.id)}
          className={`p-2.5 bg-white border rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 group ${
            isSelected
              ? 'border-indigo-650 ring-1 ring-indigo-650 bg-indigo-50/10'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/30'
          } ${isBeingDragged ? 'opacity-40 scale-95 border-dashed' : ''} ${
            isTarget ? 'border-indigo-400 translate-y-1.5' : ''
          }`}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Drag Handle icon */}
            <div className="text-slate-350 hover:text-slate-500 cursor-grab active:cursor-grabbing text-xs select-none">
              ⠿
            </div>
            {isImageBanner && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBannerExpanded(!bannerExpanded);
                }}
                className="w-4.5 h-4.5 flex items-center justify-center text-[8px] text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition border-0 cursor-pointer"
              >
                {bannerExpanded ? '▼' : '▶'}
              </button>
            )}
            <span className="text-sm select-none">{meta.icon}</span>
            <div className="truncate">
              <span className="text-[11px] font-bold text-slate-800 tracking-tight block">
                {meta.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={(e) => onDeleteBlock(block.id, e)}
              className="w-5 h-5 rounded-md hover:bg-rose-50 text-rose-605 text-[10px] flex items-center justify-center font-bold transition opacity-0 group-hover:opacity-100"
              title="Delete Section"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Nested block tree (Shopify customizer banner sub-nodes) */}
        {isImageBanner && bannerExpanded && (
          <div className="pl-6 border-l-2 border-dashed border-slate-200 ml-4 space-y-1.5 mt-1 pb-1">
            {/* Subnode 1: Text */}
            <div
              onClick={() => onSelectBlock(block.id)}
              className="py-1.5 px-2.5 bg-slate-50/50 hover:bg-slate-100 border border-slate-150 rounded-lg flex items-center gap-2 cursor-pointer transition text-[10px] text-slate-600 font-medium"
            >
              <span className="text-slate-400 font-bold text-xs select-none">⁓</span>
              <span>Text</span>
              <span className="text-[9px] text-slate-400 truncate max-w-[150px] italic">
                - {block.content.subtitle || '20% OFF STOREWIDE'}
              </span>
            </div>

            {/* Subnode 2: Heading */}
            <div
              onClick={() => onSelectBlock(block.id)}
              className="py-1.5 px-2.5 bg-slate-50/50 hover:bg-slate-100 border border-slate-150 rounded-lg flex items-center gap-2 cursor-pointer transition text-[10px] text-slate-600 font-medium"
            >
              <span className="text-slate-450 font-bold text-xs select-none">T</span>
              <span>Heading</span>
              <span className="text-[9px] text-slate-400 truncate max-w-[150px] italic">
                - {block.content.title || 'Premium Banner Title'}
              </span>
            </div>

            {/* Subnode 3: Buttons */}
            <div
              onClick={() => onSelectBlock(block.id)}
              className="py-1.5 px-2.5 bg-slate-50/50 hover:bg-slate-100 border border-slate-150 rounded-lg flex items-center gap-2 cursor-pointer transition text-[10px] text-slate-600 font-medium"
            >
              <span className="text-slate-400 font-bold text-xs select-none">🔗</span>
              <span>Buttons</span>
              <span className="text-[9px] text-slate-450 italic">
                {block.content.btnText ? `- ${block.content.btnText}` : '(Not Set)'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Visual Customizer</h3>
        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
          Shopify-style workspace outline. Reorder or customize your sections.
        </p>
      </div>

      <div className="space-y-3.5">
        
        {/* Category A: Header */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
          <div
            onClick={() => setHeaderOpen(!headerOpen)}
            className="px-3.5 py-2.5 bg-slate-100/70 hover:bg-slate-100 flex items-center justify-between cursor-pointer border-b border-slate-200"
          >
            <span className="text-[10px] font-black text-slate-550 uppercase tracking-wider select-none flex items-center gap-1.5">
              <span>{headerOpen ? '▼' : '▶'}</span>
              <span>Header</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold">
              {headerBlocks.length} sections
            </span>
          </div>
          {headerOpen && (
            <div className="p-3 space-y-2">
              {headerBlocks.map(renderBlockNode)}
              <button
                type="button"
                onClick={handleAddSectionRedirect}
                className="w-full py-2 bg-white hover:bg-indigo-50/5 border border-dashed border-slate-205 text-[10px] font-black text-[#5c3bee] rounded-xl cursor-pointer hover:border-indigo-400 transition"
              >
                + Add section
              </button>
            </div>
          )}
        </div>

        {/* Category B: Template */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
          <div
            onClick={() => setTemplateOpen(!templateOpen)}
            className="px-3.5 py-2.5 bg-slate-100/70 hover:bg-slate-100 flex items-center justify-between cursor-pointer border-b border-slate-200"
          >
            <span className="text-[10px] font-black text-slate-550 uppercase tracking-wider select-none flex items-center gap-1.5">
              <span>{templateOpen ? '▼' : '▶'}</span>
              <span>Template</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold">
              {templateBlocks.length} sections
            </span>
          </div>
          {templateOpen && (
            <div className="p-3 space-y-2">
              {templateBlocks.length === 0 ? (
                <div className="py-6 border border-dashed border-slate-200 text-slate-400 text-center rounded-xl text-[10px] font-medium">
                  No blocks in template zone.
                </div>
              ) : (
                templateBlocks.map(renderBlockNode)
              )}
              <button
                type="button"
                onClick={handleAddSectionRedirect}
                className="w-full py-2 bg-white hover:bg-indigo-50/5 border border-dashed border-slate-205 text-[10px] font-black text-[#5c3bee] rounded-xl cursor-pointer hover:border-indigo-400 transition"
              >
                + Add section
              </button>
            </div>
          )}
        </div>

        {/* Category C: Footer */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
          <div
            onClick={() => setFooterOpen(!footerOpen)}
            className="px-3.5 py-2.5 bg-slate-100/70 hover:bg-slate-100 flex items-center justify-between cursor-pointer border-b border-slate-200"
          >
            <span className="text-[10px] font-black text-slate-555 uppercase tracking-wider select-none flex items-center gap-1.5">
              <span>{footerOpen ? '▼' : '▶'}</span>
              <span>Footer</span>
            </span>
            <span className="text-[9px] text-slate-405 font-bold">
              {footerBlocks.length} sections
            </span>
          </div>
          {footerOpen && (
            <div className="p-3 space-y-2">
              {footerBlocks.map(renderBlockNode)}
              <button
                type="button"
                onClick={handleAddSectionRedirect}
                className="w-full py-2 bg-white hover:bg-indigo-50/5 border border-dashed border-slate-205 text-[10px] font-black text-[#5c3bee] rounded-xl cursor-pointer hover:border-indigo-400 transition"
              >
                + Add section
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
