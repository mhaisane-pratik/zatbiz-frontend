export interface MedicalNiche {
  id: 'retail' | 'ayurvedic' | 'surgical' | 'pediatric' | 'wellness';
  name: string;
  tagline: string;
  desc: string;
  emoji: string;
  accent: string;      // primary hex
  accentSoft: string;  // light bg hex
  gradient: string;    // tailwind gradient classes
  image: string;       // selector card image
  vibe: string;        // one-word style label
}

export const MEDICAL_NICHES: MedicalNiche[] = [
  {
    id: 'retail',
    name: 'Retail Pharmacy',
    tagline: 'Your everyday neighbourhood chemist, online',
    desc: 'Clean, clinical and trustworthy. Search-led storefront with fast reorder, prescription upload, and same-day delivery.',
    emoji: '💊',
    accent: '#059669',
    accentSoft: '#ecfdf5',
    gradient: 'from-emerald-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80',
    vibe: 'Clinical',
  },
  {
    id: 'ayurvedic',
    name: 'Ayurvedic & Herbal',
    tagline: 'Ancient wisdom, naturally sourced',
    desc: 'Earthy, organic and editorial. Story-driven pages for herbal remedies, ingredient origins, and holistic wellness rituals.',
    emoji: '🌿',
    accent: '#b45309',
    accentSoft: '#fef3c7',
    gradient: 'from-amber-600 to-lime-600',
    image: 'https://images.unsplash.com/photo-1600635772350-b0e10e5b6d3f?auto=format&fit=crop&w=900&q=80',
    vibe: 'Organic',
  },
  {
    id: 'surgical',
    name: 'Surgical Supplies',
    tagline: 'Precision equipment for professionals',
    desc: 'Dark, technical and B2B. Spec-driven catalog for hospitals and clinics with bulk quotes and compliance detail.',
    emoji: '🔬',
    accent: '#0ea5e9',
    accentSoft: '#0f172a',
    gradient: 'from-sky-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
    vibe: 'Technical',
  },
  {
    id: 'pediatric',
    name: 'Pediatric Care',
    tagline: 'Gentle care for little ones',
    desc: 'Soft, playful and friendly. Rounded pastel design for baby & mother care, child-safe medicine, and parenting guides.',
    emoji: '🧸',
    accent: '#ec4899',
    accentSoft: '#fdf2f8',
    gradient: 'from-pink-400 to-fuchsia-400',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
    vibe: 'Playful',
  },
  {
    id: 'wellness',
    name: 'Cosmetic & Wellness',
    tagline: 'Elevate your everyday self-care',
    desc: 'Premium, minimal and luxurious. Editorial storefront for skincare, supplements, and beauty with a boutique feel.',
    emoji: '✨',
    accent: '#7c3aed',
    accentSoft: '#f5f3ff',
    gradient: 'from-violet-500 to-fuchsia-500',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
    vibe: 'Luxury',
  },
];

export const getNiche = (id: string) =>
  MEDICAL_NICHES.find((n) => n.id === id) || MEDICAL_NICHES[0];
