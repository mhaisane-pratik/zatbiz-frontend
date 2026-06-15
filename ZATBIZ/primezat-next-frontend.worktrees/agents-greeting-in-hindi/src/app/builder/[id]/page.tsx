'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AiSidekick from '../../components/AiSidekick';

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

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('Draft');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<{ id: number; text: string; isError?: boolean }[]>([]);
  
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch project details from Spring Boot REST API
  useEffect(() => {
    if (!projectId) return;
    
    fetch(`http://localhost:8080/api/projects/${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load project details');
        return res.json();
      })
      .then((data: Project) => {
        setProject(data);
        setProjectName(data.name);
        setStatus(data.status);
        try {
          setBlocks(JSON.parse(data.blocksJson) || []);
        } catch {
          setBlocks([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Builder API Error:', err);
        showToast('Error loading project layouts from backend API.', true);
        setLoading(false);
      });
  }, [projectId]);

  // Show alert banner
  const showToast = (text: string, isError = false) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, isError }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Debounced Autosave
  const triggerAutosave = (updatedBlocks: Block[], updatedName?: string) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    saveTimeoutRef.current = setTimeout(() => {
      saveLayout(updatedBlocks, updatedName || projectName, 'Draft', true);
    }, 1500);
  };

  // Sync API PUT request
  const saveLayout = (updatedBlocks: Block[], name: string, saveStatus: string, isAutoSave = false) => {
    const payload = {
      name: name,
      blocksJson: JSON.stringify(updatedBlocks),
      status: saveStatus
    };

    fetch(`http://localhost:8080/api/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Save layout failed');
        return res.json();
      })
      .then(() => {
        setStatus(saveStatus);
        if (!isAutoSave) {
          showToast(saveStatus === 'Published' ? 'Website Published Live!' : 'Changes Saved Successfully!');
        }
      })
      .catch((err) => {
        console.error('Save failed:', err);
        if (!isAutoSave) {
          showToast('Failed to save layout content.', true);
        }
      });
  };

  // Library items config templates
  const addBlock = (type: string) => {
    const defaultTemplates: Record<string, any> = {
      header: {
        companyName: projectName || 'My Shop',
        logoIcon: '📦',
        layout: 'left-logo'
      },
      hero: {
        title: 'Design beautiful websites in minutes',
        subtitle: 'Bring your ideas to life with PrimeZat, the next-generation block-based builder. Completely visual, fast, and responsive.',
        btn1Text: 'Get Started',
        btn2Text: 'Learn More'
      },
      features: {
        title: 'Futuristic Capabilities',
        subtitle: 'Discover the state-of-the-art tools powering your website project.',
        items: [
          { icon: '⚡', title: 'Lightning Fast', desc: 'Pre-rendered static React code structures load in a blink of an eye.' },
          { icon: '🎨', title: 'Tailwind Design', desc: 'Easily customize copy headers, theme layouts, and alignments.' },
          { icon: '📱', title: 'Fully Responsive', desc: 'Your content displays cleanly on mobiles, tablets, and desktops.' }
        ]
      },
      'text-image': {
        title: 'A Visual Workflow Without Code Restrictions',
        text: 'Say goodbye to complex CSS alignment hacks. PrimeZat allows you to stack elements, customize block themes, and configure parameters in real time.',
        align: 'left'
      },
      pricing: {
        title: 'Flexible Premium Pricing',
        items: [
          { title: 'Standard', price: '$0', features: ['1 Active Project', 'Standard blocks library', 'Subdomain hosting'], isFeatured: false },
          { title: 'Pro', price: '$15', features: ['Unlimited layouts', 'All block themes', 'Priority support', 'Traffic analytics'], isFeatured: true }
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { question: 'How do I publish my layout?', answer: 'Click the "Publish Page" button in the header toolbar. Your site is instantly viewable on the preview endpoint.' },
          { question: 'Can I export the code?', answer: 'Yes! Next.js compiles clean Tailwind CSS structures which can be copy-pasted anywhere.' }
        ]
      },
      footer: {
        text: `© 2026 ${projectName || 'PrimeZat'}. All rights reserved.`,
        layout: 'simple'
      }
    };

    const newBlock: Block = {
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      type,
      theme: type === 'header' || type === 'footer' ? 'slate' : 'deepblue',
      content: defaultTemplates[type] || {}
    };

    // Insert headers at the top, footers at the bottom, others in middle
    let updated: Block[] = [];
    if (type === 'header') {
      updated = [newBlock, ...blocks];
    } else if (type === 'footer') {
      updated = [...blocks, newBlock];
    } else {
      // Find index of footer if exists and insert before it
      const footerIdx = blocks.findIndex(b => b.type === 'footer');
      if (footerIdx !== -1) {
        updated = [...blocks.slice(0, footerIdx), newBlock, ...blocks.slice(footerIdx)];
      } else {
        updated = [...blocks, newBlock];
      }
    }

    setBlocks(updated);
    setActiveBlockId(newBlock.id);
    showToast(`Added ${type} section`);
    triggerAutosave(updated);
  };

  // Delete Block
  const deleteBlock = (id: string) => {
    const updated = blocks.filter((b) => b.id !== id);
    setBlocks(updated);
    if (activeBlockId === id) setActiveBlockId(null);
    showToast('Section removed');
    triggerAutosave(updated);
  };

  // Reorder Blocks
  const moveBlock = (id: string, dir: number) => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;
    
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    
    // Prevent moving header below or footer above standard contents
    const block = blocks[index];
    const targetBlock = blocks[newIdx];
    if (block.type === 'header' || targetBlock.type === 'header') return; // Keep header at top
    if (block.type === 'footer' || targetBlock.type === 'footer') return; // Keep footer at bottom

    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    
    setBlocks(updated);
    triggerAutosave(updated);
  };

  // Update block fields
  const updateBlockContent = (id: string, field: string, value: any) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        content: {
          ...b.content,
          [field]: value
        }
      };
    });
    setBlocks(updated);
    triggerAutosave(updated);
  };

  const updateFeatureItem = (blockId: string, idx: number, field: string, value: string) => {
    const updated = blocks.map((b) => {
      if (b.id !== blockId) return b;
      const items = [...b.content.items];
      items[idx] = { ...items[idx], [field]: value };
      return {
        ...b,
        content: { ...b.content, items }
      };
    });
    setBlocks(updated);
    triggerAutosave(updated);
  };

  const updateBlockTheme = (id: string, theme: string) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return { ...b, theme };
    });
    setBlocks(updated);
    triggerAutosave(updated);
  };

  const handleAiAction = (action: string, payload: any) => {
    if (action === 'UPDATE_CONTENT') {
      if (!activeBlockId) {
        showToast('Please click on a block in the canvas first to apply copy!', true);
        return;
      }
      const updated = blocks.map((b) => {
        if (b.id !== activeBlockId) return b;
        return {
          ...b,
          content: {
            ...b.content,
            ...payload
          }
        };
      });
      setBlocks(updated);
      showToast('Copywriting applied to selected block!');
      triggerAutosave(updated);
    } else if (action === 'ADD_BLOCK') {
      addBlock(payload.blockType);
    } else if (action === 'SET_THEME') {
      if (!activeBlockId) {
        showToast('Please select a block first to set its theme!', true);
        return;
      }
      updateBlockTheme(activeBlockId, payload.theme);
      showToast(`Block theme updated to ${payload.theme}!`);
    }
  };

  if (loading) return <div className="text-slate-500 p-10 bg-slate-50 min-h-screen font-semibold">Loading workspace files...</div>;
  if (!project) return <div className="text-rose-600 p-10 bg-slate-50 min-h-screen font-semibold">Website Project not found in database.</div>;

  const activeBlock = blocks.find((b) => b.id === activeBlockId);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100/50 text-slate-900">
      
      {/* Top Header Bar */}
      <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-6 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xs font-bold text-slate-500 hover:text-slate-950 transition">
            📂 Dashboard
          </Link>
          <span className="text-slate-200">|</span>
          <input 
            type="text" 
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              triggerAutosave(blocks, e.target.value);
            }}
            className="bg-transparent text-slate-900 font-extrabold text-sm focus:outline-none border-b border-transparent focus:border-slate-250 px-1 py-0.5" 
          />
          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${
            status === 'Published' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-605'
          }`}>
            {status}
          </span>
        </div>

        {/* Viewport size toggles */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
            <button 
              key={mode}
              onClick={() => setCanvasWidth(mode)}
              className={`px-3 py-1 text-xs font-bold rounded-md capitalize transition cursor-pointer ${
                canvasWidth === mode ? 'bg-white text-indigo-650 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Operations */}
        <div className="flex gap-2">
          <Link href={`/preview/${projectId}`} target="_blank" className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 shadow-sm transition">
            Preview Site
          </Link>
          <button 
            onClick={() => saveLayout(blocks, projectName, 'Draft')}
            className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 shadow-sm transition cursor-pointer"
          >
            Save Draft
          </button>
          <button 
            onClick={() => saveLayout(blocks, projectName, 'Published')}
            className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition cursor-pointer"
          >
            Publish Page
          </button>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar block catalog */}
        <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col overflow-y-auto p-4 space-y-4 shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Block Library</div>
          <div className="space-y-2 flex-1">
            {[
              { type: 'header', icon: '🔝', label: 'Header Bar' },
              { type: 'hero', icon: '🚀', label: 'Hero Banner' },
              { type: 'features', icon: '⚡', label: 'Features Grid' },
              { type: 'text-image', icon: '🎨', label: 'Text & Image Split' },
              { type: 'pricing', icon: '💳', label: 'Pricing Cards' },
              { type: 'faq', icon: '❓', label: 'FAQ Accordion' },
              { type: 'footer', icon: '🏁', label: 'Footer Bar' }
            ].map((lib) => (
              <button 
                key={lib.type}
                onClick={() => addBlock(lib.type)}
                className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200/55 hover:border-indigo-500/40 rounded-lg text-left text-sm text-slate-600 hover:text-slate-900 shadow-sm hover:shadow transition cursor-pointer"
              >
                <span className="text-base">{lib.icon}</span>
                <span className="font-semibold">{lib.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Center Workspace Canvas */}
        <main className="flex-1 bg-slate-100/70 p-6 overflow-y-auto flex flex-col items-center">
          <div className={`w-full min-h-full bg-white border border-slate-200 rounded-2xl shadow-xl transition-all duration-300 ${
            canvasWidth === 'tablet' ? 'max-w-[768px]' : 
            canvasWidth === 'mobile' ? 'max-w-[375px]' : 
            'max-w-[900px]'
          }`}>
            {blocks.length === 0 ? (
              <div className="h-full min-h-[300px] flex items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl m-8 p-12 text-center">
                Click blocks in the left catalog library to add them to your page canvas.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {blocks.map((block) => (
                  <div 
                    key={block.id} 
                    onClick={() => setActiveBlockId(block.id)}
                    className={`group relative border border-transparent hover:border-indigo-500/40 transition-colors ${
                      activeBlockId === block.id ? '!border-indigo-500 ring-1 ring-indigo-500/10' : ''
                    }`}
                  >
                    {/* Inner block layout compilation */}
                    {renderBlockPreview(block)}

                    {/* Floating actions */}
                    <div className="absolute top-3 right-3 bg-white border border-slate-200 rounded-md p-1 hidden group-hover:flex gap-1 shadow z-20">
                      {block.type !== 'header' && block.type !== 'footer' && (
                        <>
                          <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, -1); }} className="w-6 h-6 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 rounded hover:bg-slate-50 cursor-pointer">▲</button>
                          <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 1); }} className="w-6 h-6 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 rounded hover:bg-slate-50 cursor-pointer">▼</button>
                        </>
                      )}
                      <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} className="w-6 h-6 flex items-center justify-center text-xs text-rose-600 hover:bg-rose-50 rounded cursor-pointer">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Right Configuration panel */}
        <aside className="w-80 bg-slate-50 border-l border-slate-200 overflow-y-auto p-6 flex flex-col shadow-sm">
          {activeBlock ? (
            <div className="space-y-6">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">Edit {activeBlock.type} Layout</h3>
              
              {/* Theme custom selector */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Theme Preset</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'slate', name: 'Light Slate' },
                    { key: 'deepblue', name: 'Emerald Sky' },
                    { key: 'purple', name: 'Cosmic Orchid' },
                    { key: 'sunset', name: 'Sunset Glow' }
                  ].map((t) => (
                    <button 
                      key={t.key}
                      onClick={() => updateBlockTheme(activeBlock.id, t.key)}
                      className={`p-2.5 text-xs rounded-lg border text-left font-semibold transition cursor-pointer ${
                        activeBlock.theme === t.key ? 'border-indigo-500 text-indigo-650 bg-indigo-50/50' : 'border-slate-200 text-slate-500 hover:border-slate-350 hover:bg-white'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Property Fields depending on block type */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                {activeBlock.type === 'header' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Company Name</label>
                      <input 
                        type="text" 
                        value={activeBlock.content.companyName}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'companyName', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-650 focus:ring-2 focus:ring-indigo-600/10 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Logo Icon</label>
                      <select 
                        value={activeBlock.content.logoIcon}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'logoIcon', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      >
                        <option value="🛍️">🛍️ Store Bag</option>
                        <option value="📦">📦 Cube Pack</option>
                        <option value="⭐">⭐ Golden Star</option>
                        <option value="💎">💎 Crystal Gem</option>
                        <option value="⚡">⚡ Lightning Bolt</option>
                        <option value="🎨">🎨 Palette Brush</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Header Layout Preset</label>
                      <select 
                        value={activeBlock.content.layout}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'layout', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      >
                        <option value="left-logo">Left Logo & Right Menu (Shopify Style)</option>
                        <option value="centered-logo">Centered Logo & Spaced Menu</option>
                        <option value="minimal">Minimal Brand Icon Only</option>
                      </select>
                    </div>
                  </>
                )}

                {activeBlock.type === 'hero' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Main Title</label>
                      <input 
                        type="text" 
                        value={activeBlock.content.title}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-650 focus:ring-2 focus:ring-indigo-600/10 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Subtitle Copy</label>
                      <textarea 
                        rows={4}
                        value={activeBlock.content.subtitle}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'subtitle', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-650 focus:ring-2 focus:ring-indigo-600/10 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none resize-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Primary Button Text</label>
                      <input 
                        type="text" 
                        value={activeBlock.content.btn1Text}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'btn1Text', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-650 focus:ring-2 focus:ring-indigo-600/10 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      />
                    </div>
                  </>
                )}

                {activeBlock.type === 'features' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Section Header Title</label>
                      <input 
                        type="text" 
                        value={activeBlock.content.title}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Section Subtitle</label>
                      <input 
                        type="text" 
                        value={activeBlock.content.subtitle}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'subtitle', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Features Cards</div>
                      {activeBlock.content.items?.map((item: any, i: number) => (
                        <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                          <input 
                            type="text" 
                            value={item.icon} 
                            placeholder="Icon emoji" 
                            onChange={(e) => updateFeatureItem(activeBlock.id, i, 'icon', e.target.value)}
                            className="w-full bg-transparent border-b border-slate-100 text-xs text-slate-900 outline-none py-1"
                          />
                          <input 
                            type="text" 
                            value={item.title} 
                            placeholder="Card Title" 
                            onChange={(e) => updateFeatureItem(activeBlock.id, i, 'title', e.target.value)}
                            className="w-full bg-transparent border-b border-slate-100 text-xs text-slate-900 outline-none py-1 font-bold"
                          />
                          <textarea 
                            value={item.desc} 
                            rows={2}
                            placeholder="Card Desc" 
                            onChange={(e) => updateFeatureItem(activeBlock.id, i, 'desc', e.target.value)}
                            className="w-full bg-transparent text-xs text-slate-500 outline-none resize-none py-1 leading-relaxed"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeBlock.type === 'text-image' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Title</label>
                      <input 
                        type="text" 
                        value={activeBlock.content.title}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Description Paragraph</label>
                      <textarea 
                        rows={4}
                        value={activeBlock.content.text}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'text', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none resize-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Image Alignment</label>
                      <select 
                        value={activeBlock.content.align} 
                        onChange={(e) => updateBlockContent(activeBlock.id, 'align', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      >
                        <option value="left">Right Graphic (Left Text)</option>
                        <option value="right">Left Graphic (Right Text)</option>
                      </select>
                    </div>
                  </>
                )}

                {activeBlock.type === 'footer' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Copyright Copy</label>
                      <input 
                        type="text" 
                        value={activeBlock.content.text}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'text', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Footer Layout Preset</label>
                      <select 
                        value={activeBlock.content.layout}
                        onChange={(e) => updateBlockContent(activeBlock.id, 'layout', e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
                      >
                        <option value="simple">Simple Copyright Line</option>
                        <option value="socials">Copyright & Socials row</option>
                        <option value="directory">Rich Directory Columns (Shopify Style)</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 text-xs">
              <span className="text-2xl mb-2">⚙️</span>
              Select a block inside the canvas to edit its properties here.
            </div>
          )}
        </aside>
      </div>

      {/* AI Sidekick Chat Drawer */}
      <AiSidekick 
        context="builder"
        activeBlockId={activeBlockId}
        activeBlockType={activeBlock?.type}
        onExecuteAction={handleAiAction}
      />

      {/* Toasts alert log */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 text-xs min-w-[240px] border bg-white ${
              toast.isError ? 'border-rose-200 text-rose-600' : 'border-indigo-150 text-indigo-655'
            }`}
          >
            <span>{toast.isError ? '✕' : '✓'}</span>
            <span className="font-semibold text-slate-800">{toast.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

// Visual HTML component layouts mappings
function renderBlockPreview(block: Block) {
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
            <span>{c.logoIcon}</span>
            <span>{c.companyName}</span>
          </div>
          
          <ul className={`flex gap-6 text-xs font-semibold text-slate-600 ${
            headerLayout === 'minimal' ? 'hidden' : ''
          }`}>
            <li><span className="hover:text-indigo-600 cursor-pointer">Catalog</span></li>
            <li><span className="hover:text-indigo-600 cursor-pointer">Collections</span></li>
            <li><span className="hover:text-indigo-600 cursor-pointer">About Us</span></li>
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
        <div className={`p-16 text-center flex flex-col items-center justify-center transition-colors duration-300 ${themeClass}`}>
          <h1 className="text-3xl font-extrabold tracking-tight mb-4 max-w-2xl leading-tight">{c.title}</h1>
          <p className="muted-text text-sm max-w-xl mb-8 leading-relaxed">{c.subtitle}</p>
          <div className="flex gap-3">
            {c.btn1Text && <span className="px-5 py-2.5 text-xs font-bold bg-indigo-600 text-white rounded-lg shadow shadow-indigo-600/10">{c.btn1Text}</span>}
            {c.btn2Text && <span className="px-5 py-2.5 text-xs font-bold bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm">{c.btn2Text}</span>}
          </div>
        </div>
      );
    case 'features':
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-12 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-2">{c.title}</h2>
            <p className="muted-text text-xs font-medium">{c.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.items?.map((item: any, i: number) => (
              <div key={i} className="p-6 bg-white/60 border border-white/40 rounded-xl shadow-sm">
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h3 className="text-sm font-bold mb-2">{item.title}</h3>
                <p className="muted-text text-xs leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'text-image':
      return (
        <div className={`p-16 flex flex-col md:flex-row items-center gap-10 transition-colors duration-300 ${themeClass}`} style={{ flexDirection: c.align === 'right' ? 'row-reverse' : 'row' }}>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">{c.title}</h2>
            <p className="muted-text text-xs leading-relaxed font-medium">{c.text}</p>
          </div>
          <div className="flex-1 h-44 bg-white/40 border border-slate-200/50 border-dashed rounded-xl flex items-center justify-center text-slate-400 text-xs font-semibold">
            [Visual Graphics Block]
          </div>
        </div>
      );
    case 'pricing':
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">{c.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div key={i} className={`p-8 bg-white/60 border rounded-xl flex flex-col justify-between shadow-sm ${item.isFeatured ? 'border-indigo-400/50 bg-indigo-50/20' : 'border-white/40'}`}>
                <div>
                  <h3 className="font-bold mb-2 text-sm">{item.title}</h3>
                  <div className="text-2xl font-extrabold mb-6">{item.price}<span className="text-xs font-normal text-slate-400">/mo</span></div>
                  <ul className="space-y-2 mb-8 text-xs muted-text font-medium">
                    {item.features?.map((f: string, j: number) => (
                      <li key={j}>✓ {f}</li>
                    ))}
                  </ul>
                </div>
                <span className={`py-2 text-center text-xs font-bold rounded-lg shadow-sm ${item.isFeatured ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>Choose Plan</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'faq':
      return (
        <div className={`p-16 transition-colors duration-300 ${themeClass}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">{c.title}</h2>
          </div>
          <div className="space-y-4 max-w-xl mx-auto">
            {c.items?.map((item: any, i: number) => (
              <div key={i} className="p-5 bg-white/60 border border-white/40 rounded-xl shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
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
          <div className={`p-10 border-t border-slate-100 transition-colors duration-300 ${themeClass}`}>
            <div className="grid grid-cols-3 gap-6 mb-8 text-[10px] text-slate-500 leading-relaxed font-medium">
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
            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-semibold text-center">
              {c.text}
            </div>
          </div>
        );
      }
      return (
        <div className={`p-8 flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 transition-colors duration-300 ${themeClass}`}>
          <div>{c.text}</div>
          <div className="flex gap-4">
            {footerLayout === 'socials' ? (
              <div className="flex gap-3 text-slate-400/80 font-bold select-none">
                <span>📘 Facebook</span>
                <span>🐦 Twitter</span>
                <span>📸 Instagram</span>
              </div>
            ) : (
              <span className="hover:underline cursor-pointer font-bold">Privacy Policy</span>
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
}
