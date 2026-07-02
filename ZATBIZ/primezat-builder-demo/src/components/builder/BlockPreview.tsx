'use client';

import { useState, useEffect } from 'react';
import { Block, Product } from '@/types';
import { THEMES_30 } from '@/app/dashboard/themesData';

interface BlockPreviewProps {
  block: Block;
  dbProducts: Product[];
  buttonStyle?: string;
  fontStyle?: string;
}

export default function BlockPreview({ 
  block, 
  dbProducts, 
  buttonStyle = 'rounded-md', 
  fontStyle = 'font-sans' 
}: BlockPreviewProps) {
  const themeClass = `block-theme-${block.theme}`;
  const c = block.content;

  const [activeTheme, setActiveTheme] = useState<any>(null);

  useEffect(() => {
    const storedActiveThemeId = localStorage.getItem('active_theme_id');
    const matchedTheme = THEMES_30.find(t => t.id === storedActiveThemeId);
    if (matchedTheme) {
      setActiveTheme(matchedTheme);
    } else {
      const blockTheme = THEMES_30.find(t => t.id === block.theme || t.id.includes(block.theme));
      if (blockTheme) {
        setActiveTheme(blockTheme);
      }
    }
  }, [block.theme]);

  // Dynamic Theme Styling Helper
  const getThemeStyles = () => {
    if (!activeTheme) {
      return {
        bgStyle: {},
        textStyle: {},
        btnClass: `bg-indigo-650 hover:bg-indigo-755 text-white font-bold ${buttonStyle}`,
        accentClass: 'text-indigo-650',
        mutedTextStyle: {},
        accentBg: '#f3f4f6'
      };
    }

    const isHeaderOrFooter = block.type === 'header' || block.type === 'footer';
    let bgStyle: React.CSSProperties = {};
    let textStyle: React.CSSProperties = { color: activeTheme.textColor || '#1f2937' };
    let mutedTextStyle: React.CSSProperties = { color: (activeTheme.textColor || '#1f2937') + 'a0' }; // Semi-transparent text

    if (isHeaderOrFooter) {
      bgStyle = { backgroundColor: activeTheme.bgColor || '#ffffff' };
    } else if (block.type === 'announcement_bar') {
      bgStyle = {
        background: `linear-gradient(135deg, ${activeTheme.primaryColor}, ${activeTheme.secondaryColor})`,
        color: '#ffffff'
      };
    } else if (block.type === 'image_banner') {
      bgStyle = {}; // handled by background image
    } else if (block.type === 'hero' && !c.imageUrl) {
      bgStyle = {
        background: `linear-gradient(135deg, ${activeTheme.accentBg || '#fafafa'}, #ffffff)`,
        color: activeTheme.textColor || '#1f2937'
      };
    } else {
      bgStyle = { backgroundColor: activeTheme.bgColor || '#ffffff', color: activeTheme.textColor || '#1f2937' };
    }

    const btnClass = `${activeTheme.primaryBtnClass || 'bg-indigo-650 hover:bg-indigo-755 text-white'} font-bold ${buttonStyle} transition duration-300`;
    const accentClass = activeTheme.textColorClass || 'text-indigo-650';

    return {
      bgStyle,
      textStyle,
      btnClass,
      accentClass,
      mutedTextStyle,
      accentBg: activeTheme.accentBg || '#f3f4f6'
    };
  };

  const ts = getThemeStyles();

  switch (block.type) {
    case 'announcement_bar': {
      return (
        <div 
          className={`px-4 py-2.5 text-center text-xs font-bold transition-colors duration-300 ${themeClass} flex items-center justify-center gap-2 ${fontStyle}`}
          style={ts.bgStyle}
        >
          <span>📢</span>
          <span>{c.text || 'Welcome to our store! Free shipping on orders over $50.'}</span>
          {c.linkText && c.linkUrl && (
            <span className="underline ml-2 hover:opacity-80">
              {c.linkText}
            </span>
          )}
        </div>
      );
    }

    case 'header': {
      const headerLayout = c.layout || 'left-logo';
      return (
        <div
          className={`px-10 py-5 flex items-center justify-between border-b border-slate-200/50 transition-colors duration-300 ${themeClass} ${fontStyle} ${
            headerLayout === 'centered-logo' ? 'flex-col gap-3 text-center' : ''
          }`}
          style={ts.bgStyle}
        >
          <div
            className={`flex items-center gap-2 font-bold text-lg ${
              headerLayout === 'centered-logo' ? 'mx-auto' : ''
            }`}
            style={ts.textStyle}
          >
            {c.logoUrl ? (
              <img src={c.logoUrl} className="w-8 h-8 object-contain rounded-md" alt="logo" />
            ) : (
              <span>{c.logoIcon || '⚡'}</span>
            )}
            <span>{c.companyName}</span>
          </div>

          <ul
            className={`flex gap-6 text-xs font-semibold text-slate-600 ${
              headerLayout === 'minimal' ? 'hidden' : ''
            }`}
          >
            {c.links && c.links.length > 0 ? (
              c.links.map((link: any, idx: number) => (
                <li key={idx}>
                  <span className={`hover:opacity-85 cursor-pointer`} style={ts.textStyle}>{link.label}</span>
                </li>
              ))
            ) : (
              <>
                <li>
                  <span className="hover:opacity-85 cursor-pointer" style={ts.textStyle}>Catalog</span>
                </li>
                <li>
                  <span className="hover:opacity-85 cursor-pointer" style={ts.textStyle}>Collections</span>
                </li>
                <li>
                  <span className="hover:opacity-85 cursor-pointer" style={ts.textStyle}>About Us</span>
                </li>
              </>
            )}
          </ul>

          <div
            className={`${
              headerLayout === 'centered-logo'
                ? 'w-full flex justify-center gap-4 text-xs mt-1 border-t border-slate-100 pt-2'
                : ''
            }`}
          >
            {headerLayout !== 'minimal' && (
              <span className={`px-4 py-1.5 ${ts.btnClass} text-[10px] font-bold shadow-sm select-none`}>
                Cart (0)
              </span>
            )}
          </div>
        </div>
      );
    }

    case 'hero': {
      const hasImage = !!c.imageUrl;
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
          <div
            className={`flex flex-col md:flex-row items-center gap-10 ${
              hasImage ? 'text-left' : 'text-center flex-col justify-center'
            }`}
          >
            <div className={`flex-1 ${hasImage ? '' : 'flex flex-col items-center justify-center'}`}>
              <h1 className="text-3xl font-extrabold tracking-tight mb-4 leading-tight" style={ts.textStyle}>
                {c.title}
              </h1>
              <p
                className="text-sm mb-8 leading-relaxed font-semibold"
                style={ts.mutedTextStyle}
              >
                {c.subtitle}
              </p>
              <div className="flex gap-3">
                {c.btn1Text && (
                  <span className={`px-5 py-2.5 text-xs font-bold ${ts.btnClass} shadow cursor-pointer`}>
                    {c.btn1Text}
                  </span>
                )}
                {c.btn2Text && (
                  <span className={`px-5 py-2.5 text-xs font-bold bg-white border border-slate-200 text-slate-700 ${buttonStyle} shadow-sm cursor-pointer hover:bg-slate-50 transition`}>
                    {c.btn2Text}
                  </span>
                )}
              </div>
            </div>
            {hasImage && (
              <div className="flex-1 max-w-sm w-full h-56 bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden shadow-md">
                <img src={c.imageUrl} className="w-full h-full object-cover" alt="Hero Banner" />
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'features':
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
          <div className="text-center mb-12 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={ts.textStyle}>{c.title}</h2>
            <p className="text-xs font-medium" style={ts.mutedTextStyle}>{c.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.items?.map((item: any, i: number) => (
              <div key={i} className="p-6 bg-white/60 border border-white/40 rounded-xl shadow-sm flex flex-col items-center text-center">
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h3 className="text-sm font-bold mb-2" style={ts.textStyle}>{item.title}</h3>
                <p className="text-xs leading-relaxed font-medium" style={ts.mutedTextStyle}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'text-image':
      return (
        <div
          className={`p-16 flex flex-col md:flex-row items-center gap-10 transition-colors duration-300 ${themeClass} ${fontStyle}`}
          style={{ ...ts.bgStyle, flexDirection: c.align === 'right' ? 'row-reverse' : 'row' }}
        >
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4" style={ts.textStyle}>{c.title}</h2>
            <p className="text-xs leading-relaxed font-medium" style={ts.mutedTextStyle}>{c.text}</p>
          </div>
          {c.imageUrl ? (
            <div className="flex-1 h-56 bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden shadow-md">
              <img src={c.imageUrl} className="w-full h-full object-cover" alt={c.title} />
            </div>
          ) : (
            <div className="flex-1 h-44 bg-white/40 border border-slate-200/50 border-dashed rounded-xl flex items-center justify-center text-slate-400 text-xs font-semibold">
              [Visual Graphics Block]
            </div>
          )}
        </div>
      );

    case 'pricing':
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold" style={ts.textStyle}>{c.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div
                key={i}
                className={`p-8 bg-white/60 border rounded-xl flex flex-col justify-between shadow-sm ${
                  item.isFeatured ? 'border-indigo-400/50 bg-indigo-50/20' : 'border-white/40'
                }`}
                style={ts.textStyle}
              >
                <div>
                  <h3 className="font-bold mb-2 text-sm">{item.title}</h3>
                  <div className="text-2xl font-extrabold mb-6">
                    {item.price}
                    <span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>
                  <ul className="space-y-2 mb-8 text-xs font-medium" style={ts.mutedTextStyle}>
                    {item.features?.map((f: string, j: number) => (
                      <li key={j}>✓ {f}</li>
                    ))}
                  </ul>
                </div>
                <span
                  className={`py-2 text-center text-xs font-bold rounded-lg shadow-sm cursor-pointer ${
                    item.isFeatured
                      ? ts.btnClass
                      : `bg-white border border-slate-200 text-slate-700 ${buttonStyle} hover:bg-slate-50 transition`
                  }`}
                >
                  Choose Plan
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'products':
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
          <div className="text-center mb-12 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={ts.textStyle}>{c.title || 'Products Catalog'}</h2>
            <p className="text-xs font-medium" style={ts.mutedTextStyle}>
              {c.subtitle || 'Explore our latest releases and premium essentials.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {dbProducts && dbProducts.length > 0 ? (
              dbProducts.map((p: Product) => (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200/55 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm p-4 text-xs hover:shadow-md transition duration-300"
                >
                  <div className="h-28 bg-slate-50 border-b border-slate-100 rounded-xl flex items-center justify-center overflow-hidden mb-3 p-2">
                    <img
                      src={p.imageUrl}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/images/login_illustration.png';
                      }}
                      alt={p.name}
                    />
                  </div>
                  <h3 className="font-extrabold text-slate-800 mb-1 truncate">{p.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-extrabold text-slate-900">${p.price?.toFixed(2)}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black uppercase">
                      {p.stock} units
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-slate-400 text-xs font-medium">
                No products found. Add products in the Product Catalog tab!
              </div>
            )}
          </div>
        </div>
      );

    case 'faq':
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold" style={ts.textStyle}>{c.title}</h2>
          </div>
          <div className="space-y-4 max-w-xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div key={i} className="p-5 bg-white/60 border border-white/40 rounded-xl shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold mb-2" style={ts.textStyle}>
                  <span>{item.question}</span>
                  <span>+</span>
                </div>
                <p className="text-xs leading-relaxed font-medium" style={ts.mutedTextStyle}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'footer': {
      const footerLayout = c.layout || 'simple';
      if (footerLayout === 'directory') {
        return (
          <div className={`p-10 border-t border-slate-100 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
            <div className="grid grid-cols-3 gap-6 mb-8 text-[10px] leading-relaxed font-semibold">
              <div>
                <h4 className="font-bold uppercase mb-3" style={ts.textStyle}>Shop</h4>
                <ul className="space-y-1.5" style={ts.mutedTextStyle}>
                  <li className="cursor-pointer hover:opacity-80">Best sellers</li>
                  <li className="cursor-pointer hover:opacity-80">New Arrivals</li>
                  <li className="cursor-pointer hover:opacity-80">Discounts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase mb-3" style={ts.textStyle}>Support</h4>
                <ul className="space-y-1.5" style={ts.mutedTextStyle}>
                  <li className="cursor-pointer hover:opacity-80">Contact Us</li>
                  <li className="cursor-pointer hover:opacity-80">FAQ Help</li>
                  <li className="cursor-pointer hover:opacity-80">Shipments</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase mb-3" style={ts.textStyle}>Branding</h4>
                <ul className="space-y-1.5" style={ts.mutedTextStyle}>
                  <li className="cursor-pointer hover:opacity-80">About Us</li>
                  <li className="cursor-pointer hover:opacity-80">Careers</li>
                  <li className="cursor-pointer hover:opacity-80">Store Policy</li>
                </ul>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-150 text-[10px] text-center font-bold" style={ts.mutedTextStyle}>
              {c.text}
            </div>
          </div>
        );
      }
      return (
        <div
          className={`p-8 flex justify-between items-center text-xs border-t border-slate-100 transition-colors duration-300 ${themeClass} ${fontStyle}`}
          style={ts.bgStyle}
        >
          <div className="font-semibold" style={ts.mutedTextStyle}>{c.text}</div>
          <div className="flex gap-4">
            {footerLayout === 'socials' ? (
              <div className="flex gap-3 font-bold select-none flex-wrap" style={ts.mutedTextStyle}>
                {c.socials && c.socials.length > 0 ? (
                  c.socials.map((soc: any, idx: number) => (
                    <span
                      key={idx}
                      className="hover:opacity-80 cursor-pointer flex items-center gap-1"
                    >
                      <span>{soc.icon}</span>
                      <span>{soc.label}</span>
                    </span>
                  ))
                ) : (
                  <>
                    <span className="cursor-pointer hover:opacity-80">📘 Facebook</span>
                    <span className="cursor-pointer hover:opacity-80">🐦 Twitter</span>
                    <span className="cursor-pointer hover:opacity-80">📸 Instagram</span>
                  </>
                )}
              </div>
            ) : (
              <span className="hover:underline cursor-pointer font-bold" style={ts.mutedTextStyle}>Privacy Policy</span>
            )}
          </div>
        </div>
      );
    }

    case 'image_banner': {
      return (
        <div className={`relative h-80 flex items-center justify-center text-center px-6 overflow-hidden ${themeClass} ${fontStyle}`}>
          <img src={c.imageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80'} className="absolute inset-0 w-full h-full object-cover brightness-[0.45]" alt="banner" />
          <div className="relative z-10 max-w-xl space-y-3">
            {c.subtitle && (
              <p className="text-xs text-white/90 font-bold uppercase tracking-wider">
                {c.subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {c.title || 'Premium Banner Title'}
            </h2>
            {c.btnText && (
              <div className="pt-2">
                <span className={`inline-block px-5 py-2.5 ${ts.btnClass} text-xs shadow-md cursor-pointer hover:scale-105 transition duration-300`}>
                  {c.btnText}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'text_block': {
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4" style={ts.textStyle}>{c.title || 'Brand Story & Mission'}</h2>
            <p className="text-xs leading-relaxed whitespace-pre-wrap font-medium" style={ts.mutedTextStyle}>
              {c.text || 'We are dedicated to crafting high-quality products that merge form, utility, and modern details. Every item in our store is hand-curated and authenticated by experts.'}
            </p>
          </div>
        </div>
      );
    }

    case 'gallery': {
      const imagesList = c.images || [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80'
      ];
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
          <div className="text-center mb-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={ts.textStyle}>{c.title || 'Visual Gallery Highlights'}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {imagesList.map((img: string, idx: number) => (
              <div key={idx} className="h-44 bg-slate-50 border border-slate-200/50 rounded-xl overflow-hidden shadow-sm">
                <img src={img} className="w-full h-full object-cover hover:scale-105 transition duration-305" alt={`gallery-img-${idx}`} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'contact_form': {
      const fields = c.fields || ['Name', 'Email', 'Inquiry Type', 'Message'];
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
          <div className="max-w-md mx-auto bg-white border border-slate-200/55 p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-800 mb-4 text-center">{c.title || 'Send a Message'}</h3>
            <div className="space-y-4">
              {fields.map((f: string, idx: number) => (
                <div key={idx}>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1.5">{f}</label>
                  {f === 'Message' ? (
                    <textarea rows={3} placeholder={`Enter your ${f.toLowerCase()}...`} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 transition resize-none" />
                  ) : (
                    <input type="text" placeholder={`Enter your ${f.toLowerCase()}...`} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 transition" />
                  )}
                </div>
              ))}
              <button className={`w-full py-2.5 ${ts.btnClass} text-[10px] shadow-sm`}>
                {c.btnText || 'Submit Details'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'testimonials': {
      const itemsList = c.items || [
        { quote: 'The customer service and product quality are both outstanding! Recommending them to all my colleagues.', author: 'Sarah Jenkins', role: 'Premium Buyer' },
        { quote: 'A beautiful shopping interface and high-speed delivery. Truly a state-of-the-art store experience.', author: 'David Miller', role: 'Verified Customer' }
      ];
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass} ${fontStyle}`} style={ts.bgStyle}>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold" style={ts.textStyle}>{c.title || 'What Our Customers Say'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {itemsList.map((item: any, idx: number) => (
              <div key={idx} className="p-6 bg-white/60 border border-slate-200/50 rounded-xl shadow-sm flex flex-col justify-between">
                <p className="text-xs italic text-slate-650 mb-4 leading-relaxed font-semibold">"{item.quote}"</p>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: ts.accentBg, color: activeTheme?.primaryColor || '#4f46e5' }}
                  >
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-slate-800">{item.author}</h4>
                    <span className="text-[9px] text-slate-400 font-semibold">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
