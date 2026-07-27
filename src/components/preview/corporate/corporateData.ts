export interface CorpTheme {
  id: string;
  name: string;
  style: string;   // short descriptor of the distinct layout
  accent: string;
}

export interface CorpTemplate {
  id: 'consulting' | 'startup' | 'it' | 'marketing';
  name: string;
  tagline: string;
  desc: string;
  emoji: string;
  image: string;
  gradient: string;
  themes: CorpTheme[];
}

export const CORP_TEMPLATES: CorpTemplate[] = [
  {
    id: 'consulting',
    name: 'Business Consulting',
    tagline: 'Strategy, advisory & growth',
    desc: 'Professional consulting firm with service tabs, case studies, and quote-estimation forms.',
    emoji: '📈',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    gradient: 'from-blue-600 to-indigo-700',
    themes: [
      { id: 'executive', name: 'Executive Navy', style: 'Corporate split hero, trust-led', accent: '#1e3a8a' },
      { id: 'boardroom', name: 'Boardroom Dark', style: 'Dark luxe, editorial serif', accent: '#0f766e' },
      { id: 'advisory', name: 'Advisory Light', style: 'Clean minimal, lots of whitespace', accent: '#4f46e5' },
      { id: 'growth', name: 'Growth Data', style: 'Metric-driven, chart-forward', accent: '#059669' },
    ],
  },
  {
    id: 'startup',
    name: 'Startup Company',
    tagline: 'Pitch, product & momentum',
    desc: 'Venture-style landing with product showcase, traction metrics, and investor CTA.',
    emoji: '🚀',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    gradient: 'from-fuchsia-500 to-violet-600',
    themes: [
      { id: 'gradient', name: 'Gradient Bold', style: 'Vibrant gradient hero', accent: '#7c3aed' },
      { id: 'product', name: 'Product Focus', style: 'App mockup hero', accent: '#2563eb' },
      { id: 'mono', name: 'Mono Minimal', style: 'Black & white type-led', accent: '#111827' },
      { id: 'neon', name: 'Neon Dark', style: 'Dark neon glow', accent: '#22d3ee' },
    ],
  },
  {
    id: 'it',
    name: 'IT Company',
    tagline: 'Support, network & cloud',
    desc: 'Managed IT services with solution grid, SLA badges, and helpdesk portal.',
    emoji: '💻',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    gradient: 'from-sky-500 to-cyan-600',
    themes: [
      { id: 'enterprise', name: 'Enterprise Blue', style: 'Solution grid, corporate', accent: '#0284c7' },
      { id: 'cloud', name: 'Cloud Gradient', style: 'Soft gradient, friendly', accent: '#0ea5e9' },
      { id: 'terminal', name: 'Terminal Dark', style: 'Dev/terminal aesthetic', accent: '#22c55e' },
      { id: 'security', name: 'Security Slate', style: 'Trust/compliance heavy', accent: '#334155' },
    ],
  },
  {
    id: 'marketing',
    name: 'Digital Marketing Agency',
    tagline: 'SEO, ads & social growth',
    desc: 'Creative agency with campaign showcase, results metrics, and lead-capture forms.',
    emoji: '📣',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    gradient: 'from-orange-500 to-pink-600',
    themes: [
      { id: 'creative', name: 'Creative Punch', style: 'Bold colourful blocks', accent: '#ec4899' },
      { id: 'results', name: 'Results Driven', style: 'Stat-heavy, case studies', accent: '#f97316' },
      { id: 'editorial', name: 'Editorial Studio', style: 'Magazine-style layout', accent: '#111827' },
      { id: 'social', name: 'Social Gradient', style: 'Playful gradient, social-first', accent: '#8b5cf6' },
    ],
  },
];

export const getTemplate = (id: string) => CORP_TEMPLATES.find((t) => t.id === id) || CORP_TEMPLATES[0];
export const getTheme = (tpl: CorpTemplate, themeId: string) => tpl.themes.find((t) => t.id === themeId) || tpl.themes[0];
