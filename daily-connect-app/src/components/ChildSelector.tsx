import { Child } from '@/types';

interface ChildSelectorProps {
  children: Child[];
  selectedChildId: string | null;
  onSelectChild: (childId: string) => void;
}

export function ChildSelector({ children, selectedChildId, onSelectChild }: ChildSelectorProps) {
  if (children.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8 animate-fade-in">
      {children.map(child => (
        <button
          key={child.id}
          onClick={() => onSelectChild(child.id)}
          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
            selectedChildId === child.id
              ? 'bg-gradient-to-r from-lavender to-periwinkle text-white shadow-lg scale-105'
              : 'bg-white text-charcoal border-2 border-lavender/20 hover:border-lavender/40 hover:shadow-md'
          }`}
        >
          {child.name}
        </button>
      ))}
    </div>
  );
}
