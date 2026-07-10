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

const SCRATCH_ECOMMERCE_BLOCKS = [
  { type: 'header', icon: '⚡', label: 'Navbar', desc: 'Store navigation bar with logo and page links.' },
  { type: 'hero', icon: '🎆', label: 'Hero Banner', desc: 'Splash banner with bold text and shop call-to-action.' },
  { type: 'announcement_bar', icon: '📢', label: 'Announcement Bar', desc: 'Thin top banner for sales & discounts notification.' },
  { type: 'categories', icon: '🍎', label: 'Categories', desc: 'Horizontal display of product categories.' },
  { type: 'collections_grid', icon: '🏷️', label: 'Collections', desc: 'Grid showcasing special collections.' },
  { type: 'products', icon: '🛍️', label: 'Featured Products', desc: 'Grid showing featured items with add-to-cart.' },
  { type: 'product_grid', icon: '🔍', label: 'Product Grid', desc: 'A full-width grid of products with filters.' },
  { type: 'flash_sale', icon: '⚡', label: 'Flash Sale', desc: 'Promo countdown banner highlighting active sales.' },
  { type: 'best_sellers', icon: '🏆', label: 'Best Sellers', desc: 'Slider of top-performing items.' },
  { type: 'recently_viewed', icon: '🕒', label: 'Recently Viewed', desc: 'Carousel of recently viewed items.' },
  { type: 'brands', icon: '🤝', label: 'Brands', desc: 'Horizontal slider of associated brands.' },
  { type: 'testimonials', icon: '🗣️', label: 'Testimonials', desc: 'Quotes and reviews from happy buyers.' },
  { type: 'newsletter', icon: '✉️', label: 'Newsletter', desc: 'Email sign-up form block.' },
  { type: 'footer', icon: '📁', label: 'Footer', desc: 'Copyrights, support links, and contacts.' },
  { type: 'shopping_cart', icon: '🛒', label: 'Shopping Cart', desc: 'Visual shopping cart list of items.' },
  { type: 'checkout_form', icon: '💳', label: 'Checkout', desc: 'Checkout billing and payment details form.' },
  { type: 'login_form', icon: '🔐', label: 'Login Form', desc: 'Customer sign-in form.' },
  { type: 'register_form', icon: '📝', label: 'Register Form', desc: 'Customer registration form.' },
];

interface BlockLibraryProps {
  onAddBlock: (type: string) => void;
  isScratchEcommerce?: boolean;
}

export default function BlockLibrary({ onAddBlock, isScratchEcommerce }: BlockLibraryProps) {
  const blocksToRender = isScratchEcommerce ? SCRATCH_ECOMMERCE_BLOCKS : AVAILABLE_BLOCKS;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          {isScratchEcommerce ? 'Ecommerce Components' : 'Block Library'}
        </h3>
        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Click any block to insert it at the end of the page canvas.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {blocksToRender.map((blk) => (
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
