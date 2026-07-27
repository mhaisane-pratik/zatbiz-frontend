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
    <div className="flex flex-wrap gap-2 mb-8">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all cursor-pointer ${
            selectedCategory === cat.id
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-indigo-600 hover:ring-indigo-200'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
