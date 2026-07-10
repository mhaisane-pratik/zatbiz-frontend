'use client';

import { useState } from 'react';
import { useFileEncoder } from '@/hooks/useFileEncoder';

export interface OnboardingData {
  companyName: string;
  slogan: string;
  contactEmail: string;
  contactPhone: string;
  logoType: 'icon' | 'custom';
  logoIcon: string;
  customLogoUrl: string;
  heroType: 'default' | 'custom';
  customHeroUrl: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OnboardingData) => void;
  templateId: string;
}

export default function OnboardingModal({ isOpen, onClose, onSubmit, templateId }: OnboardingModalProps) {
  const { encodeFile } = useFileEncoder();
  const [companyName, setCompanyName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [logoType, setLogoType] = useState<'icon' | 'custom'>('icon');
  const [logoIcon, setLogoIcon] = useState('📦');
  const [customLogoUrl, setCustomLogoUrl] = useState('');
  const [heroType, setHeroType] = useState<'default' | 'custom'>('default');
  const [customHeroUrl, setCustomHeroUrl] = useState('');

  if (!isOpen) return null;

  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await encodeFile(file);
        setCustomLogoUrl(base64);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleHeroFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await encodeFile(file);
        setCustomHeroUrl(base64);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    onSubmit({
      companyName: companyName.trim(),
      slogan: slogan.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      logoType,
      logoIcon,
      customLogoUrl,
      heroType,
      customHeroUrl,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-905/45 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-[640px] p-8 bg-white rounded-2xl border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs text-slate-800 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Configure Your Business & Brand
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">
              Custom generate your website blocks using your business details ({templateId}).
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1: Business Profile */}
          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/50 space-y-4">
            <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
              1. Business Profile
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                  Company / Store Name
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Oak & Iron Store"
                  className="w-full bg-white border border-slate-205 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs text-slate-905 placeholder-slate-400 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                  Business Slogan / Description
                </label>
                <input
                  type="text"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  placeholder="e.g. Handcrafted premium goods."
                  className="w-full bg-white border border-slate-205 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs text-slate-905 placeholder-slate-400 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contact@brand.com"
                  className="w-full bg-white border border-slate-205 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs text-slate-905 placeholder-slate-400 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-white border border-slate-205 focus:border-indigo-655 rounded-lg px-3 py-2 text-xs text-slate-905 placeholder-slate-400 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Logo Configuration */}
          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/50 space-y-4">
            <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
              2. Brand Logo
            </h4>
            <div className="space-y-3">
              <div className="flex gap-4 text-xs font-semibold text-slate-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="logoTypeRadio"
                    checked={logoType === 'icon'}
                    onChange={() => setLogoType('icon')}
                    className="text-indigo-600 focus:ring-0"
                  />
                  Use Emoji Icon
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="logoTypeRadio"
                    checked={logoType === 'custom'}
                    onChange={() => setLogoType('custom')}
                    className="text-indigo-600 focus:ring-0"
                  />
                  Upload Custom Logo File Manually
                </label>
              </div>

              {logoType === 'icon' ? (
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-2">
                    Select Preset Icon
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: '📦', name: 'Cube' },
                      { icon: '⭐', name: 'Star' },
                      { icon: '💎', name: 'Gem' },
                      { icon: '⚡', name: 'Bolt' },
                    ].map((preset) => (
                      <button
                        type="button"
                        key={preset.icon}
                        onClick={() => setLogoIcon(preset.icon)}
                        className={`py-2 text-base rounded-lg border text-center font-bold transition cursor-pointer ${
                          logoIcon === preset.icon
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-650'
                            : 'border-slate-205 hover:border-slate-350 hover:bg-white text-slate-700'
                        }`}
                      >
                        <span className="block">{preset.icon}</span>
                        <span className="block text-[8px] font-bold text-slate-400 mt-0.5">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1.5">
                    Upload Logo Image File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoFileChange}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
                  />
                  {customLogoUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">
                        Uploaded Preview:
                      </span>
                      <img
                        src={customLogoUrl}
                        className="w-8 h-8 object-contain rounded border border-slate-100 bg-white"
                        alt="logo preview"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Header Banner Image */}
          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/50 space-y-4">
            <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
              3. Hero Banner Image
            </h4>
            <div className="space-y-3">
              <div className="flex gap-4 text-xs font-semibold text-slate-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="heroTypeRadio"
                    checked={heroType === 'default'}
                    onChange={() => setHeroType('default')}
                    className="text-indigo-600 focus:ring-0"
                  />
                  Use Default Template Graphic
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="heroTypeRadio"
                    checked={heroType === 'custom'}
                    onChange={() => setHeroType('custom')}
                    className="text-indigo-600 focus:ring-0"
                  />
                  Upload Custom Hero Image File Manually
                </label>
              </div>

              {heroType === 'custom' && (
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1.5">
                    Upload Custom Banner File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroFileChange}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
                  />
                  {customHeroUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">
                        Uploaded Preview:
                      </span>
                      <img
                        src={customHeroUrl}
                        className="max-h-16 object-contain rounded border border-slate-100 bg-white"
                        alt="hero preview"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
            >
              Generate Customized Website
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
