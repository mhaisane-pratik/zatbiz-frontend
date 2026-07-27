'use client';

import { Block } from '@/types';
import { useFileEncoder } from '@/hooks/useFileEncoder';

interface ConfigSidebarProps {
  activeBlock: Block;
  updateBlockContent: (blockId: string, key: string, value: any) => void;
  updateBlockTheme: (blockId: string, theme: string) => void;
  onDeselect: () => void;
}

export default function ConfigSidebar({
  activeBlock,
  updateBlockContent,
  updateBlockTheme,
  onDeselect,
}: ConfigSidebarProps) {
  const { encodeFile } = useFileEncoder();
  const c = activeBlock.content;

  const handleFileChange = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await encodeFile(file);
        updateBlockContent(activeBlock.id, key, base64);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <aside className="w-80 bg-slate-50 border-l border-slate-200 overflow-y-auto p-6 flex flex-col shadow-sm select-none z-20">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
        <h3 className="text-xs font-black text-slate-905 uppercase tracking-wider">
          Edit {activeBlock.type} Layout
        </h3>
        <button
          onClick={onDeselect}
          className="text-[10px] bg-slate-200/60 hover:bg-slate-200 px-2.5 py-1 rounded text-slate-600 font-bold transition cursor-pointer"
        >
          Close Editor ✕
        </button>
      </div>

      <div className="space-y-6 text-xs text-slate-700">
        {/* Theme custom selector */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            Theme Preset Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: 'slate', name: 'Light Slate' },
              { key: 'deepblue', name: 'Emerald Sky' },
              { key: 'purple', name: 'Cosmic Orchid' },
              { key: 'sunset', name: 'Sunset Glow' },
            ].map((t) => (
              <button
                type="button"
                key={t.key}
                onClick={() => updateBlockTheme(activeBlock.id, t.key)}
                className={`py-2 px-1.5 rounded-lg border text-center font-bold transition cursor-pointer ${
                  activeBlock.theme === t.key
                    ? 'border-indigo-600 bg-indigo-50/20 text-indigo-650'
                    : 'border-slate-200 bg-white hover:border-slate-350'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Header Block configuration */}
        {activeBlock.type === 'header' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={c.companyName || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'companyName', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Navbar Layout
              </label>
              <select
                value={c.layout || 'left-logo'}
                onChange={(e) => updateBlockContent(activeBlock.id, 'layout', e.target.value)}
                className="w-full bg-white border border-slate-205 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs outline-none transition"
              >
                <option value="left-logo">Standard Logo Left</option>
                <option value="centered-logo">Centered Logo / Links Down</option>
                <option value="minimal">Minimal Header (Logo & LogIn only)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Brand Logo Icon
              </label>
              <input
                type="text"
                value={c.logoIcon || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'logoIcon', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Upload Logo Image (File)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('logoUrl', e)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
              {c.logoUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Preview:</span>
                  <img
                    src={c.logoUrl}
                    className="w-8 h-8 object-contain rounded border border-slate-100 bg-white"
                    alt="header logo"
                  />
                  <button
                    type="button"
                    onClick={() => updateBlockContent(activeBlock.id, 'logoUrl', '')}
                    className="text-rose-500 hover:text-rose-700 font-bold ml-auto"
                  >
                    Clear Image
                  </button>
                </div>
              )}
            </div>

            {/* Editable Links */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">
                  Navigation Links
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const current = c.links || [];
                    updateBlockContent(activeBlock.id, 'links', [
                      ...current,
                      { label: 'New Link', url: '#' },
                    ]);
                  }}
                  className="text-[9px] font-extrabold text-indigo-650 hover:underline cursor-pointer"
                >
                  + Add Link
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {(c.links || []).map((link: any, idx: number) => (
                  <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1.5 relative group">
                    <input
                      type="text"
                      value={link.label || ''}
                      placeholder="Label"
                      onChange={(e) => {
                        const newL = [...(c.links || [])];
                        newL[idx] = { ...newL[idx], label: e.target.value };
                        updateBlockContent(activeBlock.id, 'links', newL);
                      }}
                      className="w-[80%] bg-transparent border-b border-slate-100 text-xs font-bold text-slate-900 outline-none pb-0.5"
                    />
                    <input
                      type="text"
                      value={link.url || ''}
                      placeholder="URL/Anchor"
                      onChange={(e) => {
                        const newL = [...(c.links || [])];
                        newL[idx] = { ...newL[idx], url: e.target.value };
                        updateBlockContent(activeBlock.id, 'links', newL);
                      }}
                      className="w-full bg-transparent text-[10px] text-slate-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newL = (c.links || []).filter((_: any, i: number) => i !== idx);
                        updateBlockContent(activeBlock.id, 'links', newL);
                      }}
                      className="absolute top-2 right-2 text-rose-505 hover:text-rose-700 text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 2. Hero Block configuration */}
        {activeBlock.type === 'hero' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Hero Title
              </label>
              <textarea
                rows={2}
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition resize-none font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Hero Subtitle Copy
              </label>
              <textarea
                rows={3}
                value={c.subtitle || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'subtitle', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">
                  Primary Action Button
                </label>
                <input
                  type="text"
                  value={c.btn1Text || ''}
                  onChange={(e) => updateBlockContent(activeBlock.id, 'btn1Text', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">
                  Secondary Action Button
                </label>
                <input
                  type="text"
                  value={c.btn2Text || ''}
                  onChange={(e) => updateBlockContent(activeBlock.id, 'btn2Text', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Hero Graphic Banner (File)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('imageUrl', e)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
              {c.imageUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Preview:</span>
                  <img
                    src={c.imageUrl}
                    className="max-h-12 object-contain rounded border border-slate-100 bg-white"
                    alt="hero preview"
                  />
                  <button
                    type="button"
                    onClick={() => updateBlockContent(activeBlock.id, 'imageUrl', '')}
                    className="text-rose-500 hover:text-rose-700 font-bold ml-auto"
                  >
                    Clear Image
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* 3. Features Block configuration */}
        {activeBlock.type === 'features' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Section Heading Title
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Section Subtitle Details
              </label>
              <input
                type="text"
                value={c.subtitle || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'subtitle', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">
                  Features Items List
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const current = c.items || [];
                    updateBlockContent(activeBlock.id, 'items', [
                      ...current,
                      { icon: '⚡', title: 'New Feature', desc: 'Feature description text.' },
                    ]);
                  }}
                  className="text-[9px] font-extrabold text-indigo-650 hover:underline cursor-pointer"
                >
                  + Add Feature
                </button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {(c.items || []).map((item: any, i: number) => (
                  <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg space-y-1.5 relative group">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.icon || '⚡'}
                        placeholder="Icon"
                        onChange={(e) => {
                          const newI = [...(c.items || [])];
                          newI[i] = { ...newI[i], icon: e.target.value };
                          updateBlockContent(activeBlock.id, 'items', newI);
                        }}
                        className="w-[20%] bg-transparent border-b border-slate-100 text-xs text-center outline-none pb-0.5"
                      />
                      <input
                        type="text"
                        value={item.title || ''}
                        placeholder="Feature Name"
                        onChange={(e) => {
                          const newI = [...(c.items || [])];
                          newI[i] = { ...newI[i], title: e.target.value };
                          updateBlockContent(activeBlock.id, 'items', newI);
                        }}
                        className="w-[65%] bg-transparent border-b border-slate-100 text-xs font-bold text-slate-905 outline-none pb-0.5"
                      />
                    </div>
                    <textarea
                      value={item.desc || ''}
                      rows={2}
                      placeholder="Feature description details..."
                      onChange={(e) => {
                        const newI = [...(c.items || [])];
                        newI[i] = { ...newI[i], desc: e.target.value };
                        updateBlockContent(activeBlock.id, 'items', newI);
                      }}
                      className="w-full bg-transparent text-[10px] text-slate-500 outline-none resize-none border border-slate-100 rounded p-1 leading-normal"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newI = (c.items || []).filter((_: any, idx: number) => idx !== i);
                        updateBlockContent(activeBlock.id, 'items', newI);
                      }}
                      className="absolute top-2 right-2 text-rose-505 hover:text-rose-700 text-xs font-bold cursor-pointer font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 4. Text-Image Block configuration */}
        {activeBlock.type === 'text-image' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Section Headline Title
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Paragraph Content
              </label>
              <textarea
                rows={5}
                value={c.text || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'text', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition resize-none leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Image Align Direction
              </label>
              <select
                value={c.align || 'left'}
                onChange={(e) => updateBlockContent(activeBlock.id, 'align', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs outline-none transition"
              >
                <option value="left">Image on Left Column</option>
                <option value="right">Image on Right Column</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Upload Block Image (File)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('imageUrl', e)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
              {c.imageUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[9px] text-slate-405 font-bold uppercase">Preview:</span>
                  <img
                    src={c.imageUrl}
                    className="max-h-12 object-contain rounded border border-slate-100 bg-white"
                    alt="text-image preview"
                  />
                  <button
                    type="button"
                    onClick={() => updateBlockContent(activeBlock.id, 'imageUrl', '')}
                    className="text-rose-500 hover:text-rose-700 font-bold ml-auto"
                  >
                    Clear Image
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* 5. Pricing Block configuration */}
        {activeBlock.type === 'pricing' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Section Headline Title
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">
                  Subscription Plan Cards
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const current = c.items || [];
                    updateBlockContent(activeBlock.id, 'items', [
                      ...current,
                      { title: 'New Tier', price: '$29', features: ['Core feature'], isFeatured: false },
                    ]);
                  }}
                  className="text-[9px] font-extrabold text-indigo-650 hover:underline cursor-pointer"
                >
                  + Add Tier Plan
                </button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {(c.items || []).map((item: any, i: number) => (
                  <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2 relative group">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase">
                          Tier Name
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const newI = [...(c.items || [])];
                            newI[i] = { ...newI[i], title: e.target.value };
                            updateBlockContent(activeBlock.id, 'items', newI);
                          }}
                          className="w-full bg-transparent border-b border-slate-100 text-xs font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase">
                          Price Display
                        </label>
                        <input
                          type="text"
                          value={item.price}
                          onChange={(e) => {
                            const newI = [...(c.items || [])];
                            newI[i] = { ...newI[i], price: e.target.value };
                            updateBlockContent(activeBlock.id, 'items', newI);
                          }}
                          className="w-full bg-transparent border-b border-slate-100 text-xs font-bold text-indigo-655 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold text-slate-400 uppercase mb-1">
                        Features (Comma Separated)
                      </label>
                      <input
                        type="text"
                        value={(item.features || []).join(', ')}
                        onChange={(e) => {
                          const newI = [...(c.items || [])];
                          newI[i] = {
                            ...newI[i],
                            features: e.target.value
                              .split(',')
                              .map((f) => f.trim())
                              .filter(Boolean),
                          };
                          updateBlockContent(activeBlock.id, 'items', newI);
                        }}
                        className="w-full bg-slate-50 border border-slate-100 rounded px-2 py-1 text-[10px] outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 pt-1">
                      <input
                        type="checkbox"
                        checked={!!item.isFeatured}
                        onChange={(e) => {
                          const newI = [...(c.items || [])];
                          newI[i] = { ...newI[i], isFeatured: e.target.checked };
                          updateBlockContent(activeBlock.id, 'items', newI);
                        }}
                        className="rounded text-indigo-600 focus:ring-0 w-3 h-3 cursor-pointer"
                      />
                      Highlight/Feature Tier
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newI = (c.items || []).filter((_: any, idx: number) => idx !== i);
                        updateBlockContent(activeBlock.id, 'items', newI);
                      }}
                      className="absolute top-2 right-2 text-rose-505 hover:text-rose-700 text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 6. FAQ Block configuration */}
        {activeBlock.type === 'faq' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Section Header Title
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">
                  FAQ Questions
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const current = c.items || [];
                    updateBlockContent(activeBlock.id, 'items', [
                      ...current,
                      { question: 'New Question?', answer: 'Answer detail text.' },
                    ]);
                  }}
                  className="text-[9px] font-extrabold text-indigo-650 hover:underline cursor-pointer"
                >
                  + Add Question
                </button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {(c.items || []).map((item: any, i: number) => (
                  <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg space-y-1.5 relative group">
                    <input
                      type="text"
                      value={item.question}
                      placeholder="Question text"
                      onChange={(e) => {
                        const newI = [...(c.items || [])];
                        newI[i] = { ...newI[i], question: e.target.value };
                        updateBlockContent(activeBlock.id, 'items', newI);
                      }}
                      className="w-[85%] bg-transparent border-b border-slate-100 text-xs font-bold text-slate-900 outline-none pb-0.5"
                    />
                    <textarea
                      value={item.answer}
                      rows={3}
                      placeholder="Answer explanation..."
                      onChange={(e) => {
                        const newI = [...(c.items || [])];
                        newI[i] = { ...newI[i], answer: e.target.value };
                        updateBlockContent(activeBlock.id, 'items', newI);
                      }}
                      className="w-full bg-transparent text-[10px] text-slate-500 outline-none resize-none border border-slate-100 rounded p-1 leading-normal"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newI = (c.items || []).filter((_: any, idx: number) => idx !== i);
                        updateBlockContent(activeBlock.id, 'items', newI);
                      }}
                      className="absolute top-2 right-2 text-rose-505 hover:text-rose-700 text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 7. Products Block configuration */}
        {activeBlock.type === 'products' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Section Catalog Title
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Section Subtitle Details
              </label>
              <input
                type="text"
                value={c.subtitle || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'subtitle', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
              />
            </div>
            <div className="p-3 bg-stone-50 border border-stone-250/50 rounded-xl text-[10px] text-stone-500 font-semibold leading-normal">
              💡 **Products sync**: This block automatically pulls and renders all products configured
              in the **Product Catalog** switcher tab!
            </div>
          </>
        )}

        {/* 8. Footer Block configuration */}
        {activeBlock.type === 'footer' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Copyright Copy Line
              </label>
              <input
                type="text"
                value={c.text || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'text', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Footer Layout Preset
              </label>
              <select
                value={c.layout || 'simple'}
                onChange={(e) => updateBlockContent(activeBlock.id, 'layout', e.target.value)}
                className="w-full bg-white border border-slate-205 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none transition"
              >
                <option value="simple">Simple Copyright Line</option>
                <option value="socials">Copyright & Socials row</option>
                <option value="directory">Rich Directory Columns (Shopify Style)</option>
              </select>
            </div>

            {/* Social handles */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">
                  Social Channels
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const current = c.socials || [];
                    updateBlockContent(activeBlock.id, 'socials', [
                      ...current,
                      { icon: '🔗', label: 'Custom', url: '#' },
                    ]);
                  }}
                  className="text-[9px] font-extrabold text-indigo-650 hover:underline cursor-pointer"
                >
                  + Add Social Channel
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {(c.socials || []).map((soc: any, idx: number) => (
                  <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1.5 relative group">
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={soc.icon || '🔗'}
                        placeholder="Icon"
                        onChange={(e) => {
                          const newS = [...(c.socials || [])];
                          newS[idx] = { ...newS[idx], icon: e.target.value };
                          updateBlockContent(activeBlock.id, 'socials', newS);
                        }}
                        className="w-[25%] bg-transparent border-b border-slate-100 text-[11px] outline-none text-center"
                      />
                      <input
                        type="text"
                        value={soc.label || ''}
                        placeholder="Label"
                        onChange={(e) => {
                          const newS = [...(c.socials || [])];
                          newS[idx] = { ...newS[idx], label: e.target.value };
                          updateBlockContent(activeBlock.id, 'socials', newS);
                        }}
                        className="w-[60%] bg-transparent border-b border-slate-100 text-[11px] font-bold outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      value={soc.url || ''}
                      placeholder="URL Link"
                      onChange={(e) => {
                        const newS = [...(c.socials || [])];
                        newS[idx] = { ...newS[idx], url: e.target.value };
                        updateBlockContent(activeBlock.id, 'socials', newS);
                      }}
                      className="w-full bg-transparent text-[10px] text-slate-450 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newS = (c.socials || []).filter((_: any, i: number) => i !== idx);
                        updateBlockContent(activeBlock.id, 'socials', newS);
                      }}
                      className="absolute top-2 right-2 text-rose-505 hover:text-rose-700 text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 9. Portal Login Page Block configuration */}
        {activeBlock.type === 'login_config' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Brand Portal Name
              </label>
              <input
                type="text"
                value={c.companyName || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'companyName', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Login Title Text
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Login Subtitle Details
              </label>
              <textarea
                rows={3}
                value={c.subtitle || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'subtitle', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition resize-none leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Sign In Button Label
              </label>
              <input
                type="text"
                value={c.btnText || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'btnText', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Brand Portal Logo (Icon)
              </label>
              <input
                type="text"
                value={c.logoIcon || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'logoIcon', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Upload Portal Logo File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('logoUrl', e)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Upload Custom Illustration File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('illustrationUrl', e)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Login Style Variation
              </label>
              <select
                value={c.selectedLoginOption || 1}
                onChange={(e) => updateBlockContent(activeBlock.id, 'selectedLoginOption', Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              >
                <option value={1}>Option #1: Glassmorphic Overlay</option>
                <option value={2}>Option #2: Split Screen Left Image</option>
                <option value={3}>Option #3: Minimalist Dark Purple</option>
                <option value={4}>Option #4: Watercolor Rose Card</option>
                <option value={5}>Option #5: Serif Classic Editorial</option>
                <option value={6}>Option #6: Clean Left Sidebar</option>
                <option value={7}>Option #7: Luminous Glow Card</option>
                <option value={8}>Option #8: Royal Golden Crest</option>
                <option value={9}>Option #9: Retro Sunset Gradient</option>
                <option value={10}>Option #10: Stark High-Contrast</option>
              </select>
            </div>
          </>
        )}

        {/* 10. Portal Dashboard Page Block configuration */}
        {activeBlock.type === 'dashboard_config' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Dashboard Portal Header
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Dashboard Style Variation
              </label>
              <select
                value={c.selectedDashboardOption || 1}
                onChange={(e) => updateBlockContent(activeBlock.id, 'selectedDashboardOption', Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              >
                <option value={1}>Option #1: Glassmorphic Royale</option>
                <option value={2}>Option #2: Dark Purple Neon</option>
                <option value={3}>Option #3: Warm Gold Minimalist</option>
                <option value={4}>Option #4: Grid-based Dashboard</option>
                <option value={5}>Option #5: Modern Rose Sidebar</option>
                <option value={6}>Option #6: Classic Floating Panels</option>
                <option value={7}>Option #7: Coral Pastel Sweet</option>
                <option value={8}>Option #8: Dark Slate Technical</option>
                <option value={9}>Option #9: Lavender Elegant Cream</option>
                <option value={10}>Option #10: Cyber Neon Emerald</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                Metric card 1
              </label>
              <input
                type="text"
                value={c.metric1Title || ''}
                placeholder="Title (e.g. Sales)"
                onChange={(e) => updateBlockContent(activeBlock.id, 'metric1Title', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"
              />
              <input
                type="text"
                value={c.metric1Value || ''}
                placeholder="Value (e.g. $425)"
                onChange={(e) => updateBlockContent(activeBlock.id, 'metric1Value', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none font-bold"
              />
              <input
                type="text"
                value={c.metric1Trend || ''}
                placeholder="Trend (e.g. +10%)"
                onChange={(e) => updateBlockContent(activeBlock.id, 'metric1Trend', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                Metric card 2
              </label>
              <input
                type="text"
                value={c.metric2Title || ''}
                placeholder="Title"
                onChange={(e) => updateBlockContent(activeBlock.id, 'metric2Title', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"
              />
              <input
                type="text"
                value={c.metric2Value || ''}
                placeholder="Value"
                onChange={(e) => updateBlockContent(activeBlock.id, 'metric2Value', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none font-bold"
              />
              <input
                type="text"
                value={c.metric2Trend || ''}
                placeholder="Trend"
                onChange={(e) => updateBlockContent(activeBlock.id, 'metric2Trend', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                Metric card 3
              </label>
              <input
                type="text"
                value={c.metric3Title || ''}
                placeholder="Title"
                onChange={(e) => updateBlockContent(activeBlock.id, 'metric3Title', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"
              />
              <input
                type="text"
                value={c.metric3Value || ''}
                placeholder="Value"
                onChange={(e) => updateBlockContent(activeBlock.id, 'metric3Value', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none font-bold"
              />
              <input
                type="text"
                value={c.metric3Trend || ''}
                placeholder="Trend"
                onChange={(e) => updateBlockContent(activeBlock.id, 'metric3Trend', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none"
              />
            </div>
          </>
        )}

        {/* 11. Image Banner Block configuration */}
        {activeBlock.type === 'image_banner' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Banner Title / Heading
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Banner Subtitle / Text
              </label>
              <textarea
                rows={2}
                value={c.subtitle || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'subtitle', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition resize-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Button Label (Optional)
              </label>
              <input
                type="text"
                value={c.btnText || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'btnText', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs outline-none transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Button Link URL (Optional)
              </label>
              <input
                type="text"
                value={c.btnUrl || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'btnUrl', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs outline-none transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider mb-2">
                Upload Banner Image (File)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('imageUrl', e)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
              {c.imageUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[9px] text-slate-405 font-bold uppercase">Preview:</span>
                  <img
                    src={c.imageUrl}
                    className="max-h-12 object-contain rounded border border-slate-100 bg-white"
                    alt="banner preview"
                  />
                  <button
                    type="button"
                    onClick={() => updateBlockContent(activeBlock.id, 'imageUrl', '')}
                    className="text-rose-500 hover:text-rose-700 font-bold ml-auto"
                  >
                    Clear Image
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* 12. Text Block configuration */}
        {activeBlock.type === 'text_block' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Section Title Heading
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Paragraph Text Body
              </label>
              <textarea
                rows={6}
                value={c.text || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'text', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition resize-none leading-relaxed"
              />
            </div>
          </>
        )}

        {/* 13. Gallery Block configuration */}
        {activeBlock.type === 'gallery' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Gallery Section Title
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                Add Image to Gallery
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const base64 = await encodeFile(file);
                      const current = c.images || [];
                      updateBlockContent(activeBlock.id, 'images', [...current, base64]);
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                {(c.images || []).map((img: string, idx: number) => (
                  <div key={idx} className="relative h-10 border border-slate-200 rounded bg-white overflow-hidden group">
                    <img src={img} className="w-full h-full object-cover" alt="preview" />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (c.images || []).filter((_: any, i: number) => i !== idx);
                        updateBlockContent(activeBlock.id, 'images', updated);
                      }}
                      className="absolute inset-0 bg-rose-500/80 text-white flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition duration-200"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 14. Contact Form Block configuration */}
        {activeBlock.type === 'contact_form' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Form Heading Title
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-555 uppercase mb-2">
                Submit Button Label
              </label>
              <input
                type="text"
                value={c.btnText || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'btnText', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
            </div>
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                Editable Fields (Comma Separated)
              </label>
              <input
                type="text"
                value={(c.fields || []).join(', ')}
                onChange={(e) => {
                  const fieldsList = e.target.value
                    .split(',')
                    .map((f) => f.trim())
                    .filter(Boolean);
                  updateBlockContent(activeBlock.id, 'fields', fieldsList);
                }}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
            </div>
          </>
        )}

        {/* 15. Testimonials Block configuration */}
        {activeBlock.type === 'testimonials' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-555 uppercase mb-2">
                Section Heading Title
              </label>
              <input
                type="text"
                value={c.title || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'title', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">
                  Testimonials List
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const current = c.items || [];
                    updateBlockContent(activeBlock.id, 'items', [
                      ...current,
                      { quote: 'New review quote.', author: 'Customer Name', role: 'Reviewer Title' },
                    ]);
                  }}
                  className="text-[9px] font-extrabold text-indigo-650 hover:underline cursor-pointer"
                >
                  + Add Testimonial
                </button>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {(c.items || []).map((item: any, idx: number) => (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg space-y-1.5 relative group">
                    <input
                      type="text"
                      value={item.author}
                      placeholder="Author Name"
                      onChange={(e) => {
                        const newItems = [...(c.items || [])];
                        newItems[idx] = { ...newItems[idx], author: e.target.value };
                        updateBlockContent(activeBlock.id, 'items', newItems);
                      }}
                      className="w-[85%] bg-transparent border-b border-slate-100 text-xs font-bold text-slate-900 outline-none"
                    />
                    <input
                      type="text"
                      value={item.role}
                      placeholder="Author Role"
                      onChange={(e) => {
                        const newItems = [...(c.items || [])];
                        newItems[idx] = { ...newItems[idx], role: e.target.value };
                        updateBlockContent(activeBlock.id, 'items', newItems);
                      }}
                      className="w-full bg-transparent border-b border-slate-100 text-[10px] text-slate-500 outline-none"
                    />
                    <textarea
                      value={item.quote}
                      rows={2}
                      placeholder="Quote review..."
                      onChange={(e) => {
                        const newItems = [...(c.items || [])];
                        newItems[idx] = { ...newItems[idx], quote: e.target.value };
                        updateBlockContent(activeBlock.id, 'items', newItems);
                      }}
                      className="w-full bg-transparent text-[10px] text-slate-500 outline-none resize-none border border-slate-100 rounded p-1 leading-normal"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = (c.items || []).filter((_: any, i: number) => i !== idx);
                        updateBlockContent(activeBlock.id, 'items', newItems);
                      }}
                      className="absolute top-2 right-2 text-rose-505 hover:text-rose-705 text-xs font-bold cursor-pointer font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 16. Announcement Bar Block configuration */}
        {activeBlock.type === 'announcement_bar' && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                Announcement Message Text
              </label>
              <input
                type="text"
                value={c.text || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'text', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Link Label Text (Optional)
              </label>
              <input
                type="text"
                value={c.linkText || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'linkText', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase mb-2">
                Link URL Address (Optional)
              </label>
              <input
                type="text"
                value={c.linkUrl || ''}
                onChange={(e) => updateBlockContent(activeBlock.id, 'linkUrl', e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-indigo-650 rounded-lg px-3 py-2 text-xs outline-none transition"
              />
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

