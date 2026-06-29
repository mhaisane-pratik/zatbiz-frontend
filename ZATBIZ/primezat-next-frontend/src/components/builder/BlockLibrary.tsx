'use client';

const AVAILABLE_BLOCKS = [
  { type: 'announcement_bar', icon: '📢', label: 'Announcement Bar', desc: 'Top thin banner displaying sale notifications or welcome texts.' },
  { type: 'header', icon: '⚡', label: 'Header Toolbar', desc: 'Navigation menu links & custom brand branding logo.' },
  { type: 'hero', icon: '🎆', label: 'Splash Hero Image', desc: 'Prominent header banner layout, title text, and primary call-to-actions.' },
  { type: 'image_banner', icon: '🌅', label: 'Image Banner', desc: 'Large banner image layout with title text overlay.' },
  { type: 'text-image', icon: '🖼️', label: 'Two Column Copy', desc: 'Editorial visual page block combining illustration and descriptive texts.' },
  { type: 'text_block', icon: '📄', label: 'Text Block', desc: 'Full-width text block for rich brand descriptions, stories or details.' },
  { type: 'gallery', icon: '🎨', label: 'Image Gallery', desc: 'Grid block layout showcasing custom brand graphics or products.' },
  { type: 'features', icon: '📋', label: 'Grid Features Lists', desc: 'Three-column items outline mapping service highlights or features.' },
  { type: 'pricing', icon: '💳', label: 'Store Subscription Tiers', desc: 'Side-by-side pricing cards outlining membership values.' },
  { type: 'products', icon: '🛍️', label: 'Store Database Grid', desc: 'H2 database-backed e-commerce products grid with add-to-cart links.' },
  { type: 'contact_form', icon: '📝', label: 'Contact Form', desc: 'Inquiry form block with customizable text input fields.' },
  { type: 'faq', icon: '❓', label: 'Collapsible Accordion', desc: 'Collapsible question accordion sections for troubleshooting.' },
  { type: 'testimonials', icon: '🗣️', label: 'Testimonials', desc: 'Visual customer quotes and review cards highlighting feedback.' },
  { type: 'footer', icon: '📁', label: 'Social Links Directory', desc: 'Site disclaimer rows, phone, email, and social networks handles.' },
];

interface BlockLibraryProps {
  onAddBlock: (type: string) => void;
}

export default function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Block Library</h3>
        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Click any block to insert it at the end of the page canvas.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {AVAILABLE_BLOCKS.map((blk) => (
          <button
            key={blk.type}
            onClick={() => onAddBlock(blk.type)}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left hover:border-indigo-500 hover:bg-indigo-50/10 transition group cursor-pointer"
          >
            <div className="text-2xl mb-1.5 select-none">{blk.icon}</div>
            <div className="text-[10px] font-extrabold text-slate-900 group-hover:text-indigo-650 transition">
              {blk.label}
            </div>
            <div className="text-[9px] text-slate-400 font-medium leading-normal mt-1 line-clamp-2">
              {blk.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
