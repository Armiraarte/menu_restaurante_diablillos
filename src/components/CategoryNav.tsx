import React, { useRef, useEffect } from 'react';
import { Category } from '../types/menu';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  productCountByCategory: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  productCountByCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active tab into view when selected
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeBtn = scrollContainerRef.current.querySelector<HTMLButtonElement>('[data-active="true"]');
    if (activeBtn) {
      const container = scrollContainerRef.current;
      const scrollLeft = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <nav
      aria-label="Navegación de categorías del menú"
      className="sticky top-0 z-30 w-full bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 shadow-md shadow-stone-950/20"
    >
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto no-scrollbar scroll-smooth max-w-5xl mx-auto"
      >
        {/* 'Todos' option */}
        <button
          onClick={() => onSelectCategory('all')}
          data-active={activeCategory === 'all'}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-amber-500 text-stone-950 shadow-sm shadow-amber-500/20'
              : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
          }`}
        >
          Todo el Menú
        </button>

        {/* Dynamic categories */}
        {categories.map((cat) => {
          const count = productCountByCategory[cat.id] || 0;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              data-active={isActive}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500 text-stone-950 shadow-sm shadow-amber-500/20'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
              }`}
            >
              <span>{cat.name}</span>
              {count > 0 && (
                <span
                  className={`text-[11px] font-mono tabular-nums ${
                    isActive ? 'text-stone-900/80' : 'text-stone-500'
                  }`}
                >
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
