'use client';

interface StorefrontEditorPanelProps {
  editHeroTitle: string;
  setEditHeroTitle: (t: string) => void;
  editHeroSubtitle: string;
  setEditHeroSubtitle: (t: string) => void;
  editHeroImage: string;
  setEditHeroImage: (t: string) => void;
  editProductsTitle: string;
  setEditProductsTitle: (t: string) => void;
  editProductsSubtitle: string;
  setEditProductsSubtitle: (t: string) => void;
  editFooterText: string;
  setEditFooterText: (t: string) => void;
  isSavingBlocks: boolean;
  handleSaveLandingPage: (e: React.FormEvent) => void;
  theme: any;
}

export function StorefrontEditorPanel({
  editHeroTitle,
  setEditHeroTitle,
  editHeroSubtitle,
  setEditHeroSubtitle,
  editHeroImage,
  setEditHeroImage,
  editProductsTitle,
  setEditProductsTitle,
  editProductsSubtitle,
  setEditProductsSubtitle,
  editFooterText,
  setEditFooterText,
  isSavingBlocks,
  handleSaveLandingPage,
  theme,
}: StorefrontEditorPanelProps) {
  return (
    <div className="space-y-8 animate-fade-in text-xs text-slate-805">
      <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm text-left">
        <h3 className="text-xs font-bold text-slate-900 uppercase mb-2">🛠️ Edit Storefront Landing Page</h3>
        <p className="text-[10px] text-slate-505 mb-6 font-semibold">
          Customize the copywriting and hero graphics displayed on your public e-commerce store.
        </p>

        <form onSubmit={handleSaveLandingPage} className="space-y-6">
          {/* Hero Section Edit */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[11px] text-indigo-600 uppercase tracking-wider border-b border-indigo-50 pb-2">Hero Section Copy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hero Title Headline</label>
                <input
                  type="text"
                  required
                  value={editHeroTitle}
                  onChange={(e) => setEditHeroTitle(e.target.value)}
                  placeholder="e.g. Premium Men's Clothing Store"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hero Image URL</label>
                <input
                  type="text"
                  required
                  value={editHeroImage}
                  onChange={(e) => setEditHeroImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition font-mono"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hero Subtitle / Description</label>
                <textarea
                  rows={2}
                  required
                  value={editHeroSubtitle}
                  onChange={(e) => setEditHeroSubtitle(e.target.value)}
                  placeholder="Provide a welcoming description for your boutique store..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
                />
              </div>
            </div>
          </div>

          {/* Products Catalog Headers Edit */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="font-extrabold text-[11px] text-indigo-600 uppercase tracking-wider border-b border-indigo-50 pb-2">Products Catalog Section</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Catalog Section Title</label>
                <input
                  type="text"
                  required
                  value={editProductsTitle}
                  onChange={(e) => setEditProductsTitle(e.target.value)}
                  placeholder="e.g. Featured Products Catalog"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Catalog Subtitle</label>
                <input
                  type="text"
                  required
                  value={editProductsSubtitle}
                  onChange={(e) => setEditProductsSubtitle(e.target.value)}
                  placeholder="e.g. Explore our latest releases and premium essentials."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
                />
              </div>
            </div>
          </div>

          {/* Footer Copy Edit */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="font-extrabold text-[11px] text-indigo-600 uppercase tracking-wider border-b border-indigo-50 pb-2">Footer Branding</h4>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Footer Copyright Copy / Info</label>
              <input
                type="text"
                required
                value={editFooterText}
                onChange={(e) => setEditFooterText(e.target.value)}
                placeholder="© 2026 My Brand. All rights reserved."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white outline-none focus:border-indigo-650 transition"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-150">
            <button
              type="submit"
              disabled={isSavingBlocks}
              className={`px-6 py-2.5 ${theme.primaryBtn} text-xs font-bold rounded-xl shadow-md transition active:scale-95 cursor-pointer disabled:opacity-50`}
            >
              {isSavingBlocks ? 'Saving Changes...' : 'Save Landing Page'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
