'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Block {
  id: string;
  type: string;
  theme: string;
  content: any;
}

interface Project {
  id: number;
  name: string;
  description: string;
  blocksJson: string;
  status: string;
}

export default function PreviewPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch project blocks from Spring Boot backend on mount
  useEffect(() => {
    if (!projectId) return;

    fetch(`http://localhost:8080/api/projects/${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load project preview');
        return res.json();
      })
      .then((data: Project) => {
        setProject(data);
        try {
          setBlocks(JSON.parse(data.blocksJson) || []);
        } catch {
          setBlocks([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Preview loading error:', err);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-400">Compiling visual site content...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center text-center p-6">
        <div>
          <span className="text-3xl block mb-4">⚠️</span>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Project not found</h2>
          <p className="text-xs text-slate-500 font-medium">Ensure the Spring Boot backend is active and the URL is correct.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      
      {/* Target Render Output */}
      <main className="divide-y divide-slate-100">
        {blocks.length === 0 ? (
          <div className="text-center py-32 text-slate-400">
            <span className="text-4xl block mb-4">📄</span>
            <h2 className="text-lg font-bold text-slate-900 mb-1">This page is blank</h2>
            <p className="text-xs max-w-xs mx-auto">Open the dashboard editor and construct layouts to show them here.</p>
          </div>
        ) : (
          blocks.map((block) => (
            <section key={block.id}>
              {renderBlockMarkup(block)}
            </section>
          ))
        )}
      </main>

      {/* Floating Preview Info Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200 px-4 py-2.5 rounded-full flex items-center gap-3 text-[11px] shadow-2xl z-50 backdrop-blur-md">
        <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
          project.status === 'Published' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
        }`}>
          {project.status}
        </span>
        <span className="text-slate-250">|</span>
        <span className="text-slate-900 font-bold truncate max-w-[150px]">{project.name}</span>
      </div>

    </div>
  );
}

// Map blocks structure to pure Tailwind HTML components
function renderBlockMarkup(block: Block) {
  const themeClass = `block-theme-${block.theme}`;
  const c = block.content;

  switch (block.type) {
    case 'header':
      const headerLayout = c.layout || 'left-logo';
      return (
        <div className={`px-10 py-5 flex items-center justify-between border-b border-slate-200/50 transition-colors duration-300 ${themeClass} ${
          headerLayout === 'centered-logo' ? 'flex-col gap-3 text-center' : ''
        }`}>
          <div className={`flex items-center gap-2 font-bold text-lg ${
            headerLayout === 'centered-logo' ? 'mx-auto' : ''
          }`}>
            <span>{escapeHtml(c.logoIcon)}</span>
            <span>{escapeHtml(c.companyName)}</span>
          </div>
          
          <ul className={`flex gap-6 text-xs font-semibold text-slate-650 ${
            headerLayout === 'minimal' ? 'hidden' : ''
          }`}>
            <li><span className="hover:text-indigo-650 cursor-pointer">Catalog</span></li>
            <li><span className="hover:text-indigo-650 cursor-pointer">Collections</span></li>
            <li><span className="hover:text-indigo-650 cursor-pointer">About Us</span></li>
          </ul>

          <div className={`${headerLayout === 'centered-logo' ? 'w-full flex justify-center gap-4 text-xs mt-1 border-t border-slate-100 pt-2' : ''}`}>
            {headerLayout !== 'minimal' && (
              <span className="px-4 py-1.5 bg-indigo-600 text-white rounded text-[10px] font-bold shadow-sm select-none">
                Cart (0)
              </span>
            )}
          </div>
        </div>
      );

    case 'hero':
      return (
        <div className={`py-20 md:py-28 px-6 text-center flex flex-col items-center justify-center transition-colors duration-300 ${themeClass}`}>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl leading-tight">{c.title}</h1>
          <p className="muted-text text-sm md:text-base max-w-2xl mb-8 leading-relaxed font-medium">{c.subtitle}</p>
          <div className="flex gap-4">
            {c.btn1Text && <a href={c.btn1Url || '#'} className="px-6 py-3 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition">{c.btn1Text}</a>}
            {c.btn2Text && <a href={c.btn2Url || '#'} className="px-6 py-3 text-xs font-bold bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition">{c.btn2Text}</a>}
          </div>
        </div>
      );
    case 'features':
      return (
        <div className={`py-20 px-6 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-12 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{c.title}</h2>
            <p className="muted-text text-xs font-medium">{c.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div key={i} className="p-6 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="muted-text text-xs leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'text-image':
      return (
        <div className={`py-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 transition-colors duration-300 ${themeClass}`} style={{ flexDirection: c.align === 'right' ? 'row-reverse' : 'row' }}>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{c.title}</h2>
            <p className="muted-text text-xs md:text-sm leading-relaxed font-medium">{c.text}</p>
          </div>
          <div className="flex-1 h-52 bg-white/40 border border-slate-200/50 border-dashed rounded-xl flex items-center justify-center text-slate-400 text-xs font-semibold">
            [Visual Graphics Block]
          </div>
        </div>
      );
    case 'pricing':
      return (
        <div className={`py-20 px-6 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">{c.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div key={i} className={`p-8 bg-white/60 border rounded-xl flex flex-col justify-between shadow-sm ${item.isFeatured ? 'border-indigo-400/50 bg-indigo-50/20' : 'border-white/40'}`}>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">{item.title}</h3>
                  <div className="text-3xl font-extrabold text-slate-900 mb-6">{item.price}<span className="text-xs font-normal text-slate-400">/mo</span></div>
                  <ul className="space-y-3 mb-8 text-xs muted-text font-medium">
                    {item.features?.map((f: string, j: number) => (
                      <li key={j}>✓ {f}</li>
                    ))}
                  </ul>
                </div>
                <a href="#" className={`py-2.5 text-center text-xs font-bold rounded-lg shadow-sm ${item.isFeatured ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>Choose Plan</a>
              </div>
            ))}
          </div>
        </div>
      );
    case 'faq':
      return (
        <div className={`py-20 px-6 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">{c.title}</h2>
          </div>
          <div className="space-y-4 max-w-xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div key={i} className="p-5 bg-white/60 border border-white/40 rounded-xl shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 mb-2 cursor-pointer">
                  <span>{item.question}</span>
                  <span>+</span>
                </div>
                <p className="muted-text text-xs leading-relaxed font-medium">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'footer':
      const footerLayout = c.layout || 'simple';
      if (footerLayout === 'directory') {
        return (
          <div className={`py-12 px-6 border-t border-slate-100 transition-colors duration-300 ${themeClass}`}>
            <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 mb-8 text-[11px] text-slate-500 leading-relaxed font-medium">
              <div>
                <h4 className="font-bold text-slate-900 uppercase mb-3">Shop</h4>
                <ul className="space-y-1.5">
                  <li>Best sellers</li>
                  <li>New Arrivals</li>
                  <li>Discounts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 uppercase mb-3">Support</h4>
                <ul className="space-y-1.5">
                  <li>Contact Us</li>
                  <li>FAQ Help</li>
                  <li>Shipments</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 uppercase mb-3">Branding</h4>
                <ul className="space-y-1.5">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Store Policy</li>
                </ul>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-semibold text-center max-w-4xl mx-auto">
              {escapeHtml(c.text)}
            </div>
          </div>
        );
      }
      return (
        <div className={`py-10 px-6 max-w-5xl mx-auto flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 transition-colors duration-300 ${themeClass}`}>
          <div>{escapeHtml(c.text)}</div>
          <div className="flex gap-4">
            {footerLayout === 'socials' ? (
              <div className="flex gap-3 text-slate-400 font-bold select-none">
                <span>📘 Facebook</span>
                <span>🐦 Twitter</span>
                <span>📸 Instagram</span>
              </div>
            ) : (
              <a href="#" className="hover:underline font-bold">Privacy Policy</a>
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
}

// Helper to escape HTML characters
function escapeHtml(string: string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
