'use client';

export const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'restaurant', name: 'Restaurant' },
  { id: 'clinic', name: 'Clinic' },
  { id: 'school', name: 'School' },
  { id: 'gym', name: 'Gym' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'realestate', name: 'Real Estate' },
  { id: 'agency', name: 'Agency & Others' }
];

interface CategoriesFilterProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoriesFilter({ selectedCategory, onSelectCategory }: CategoriesFilterProps) {
  return (
    <div className="flex flex-wrap gap-2.5 p-4.5 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm mb-6">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4.5 py-2.5 text-xs font-black rounded-full transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
            selectedCategory === cat.id
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
              : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
