import React from 'react';
import { Compass, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

interface ProgressIndicatorProps {
  currentCategoryIndex: number;
  totalCategories: number;
  currentDishIndex: number;
  totalDishesInCategory: number;
  categoryName: string;
  onOpenIndex: () => void;
  onPrevDish: () => void;
  onNextDish: () => void;
  onPrevCategory: () => void;
  onNextCategory: () => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentCategoryIndex,
  totalCategories,
  currentDishIndex,
  totalDishesInCategory,
  categoryName,
  onOpenIndex,
  onPrevDish,
  onNextDish,
  onPrevCategory,
  onNextCategory,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 pointer-events-none select-none">
      {/* Hairline Progress Bar */}
      <div className="w-full h-[2px] bg-stone-900">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 ease-out"
          style={{
            width: `${((currentDishIndex + 1) / totalDishesInCategory) * 100}%`,
          }}
        />
      </div>

      {/* Floating Bottom Nav HUD */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between pointer-events-auto">
        {/* Left Side: Dish & Category Chevrons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrevDish}
            disabled={currentDishIndex === 0 && currentCategoryIndex === 0}
            aria-label="Platillo anterior"
            className="min-h-[44px] min-w-[44px] rounded-full bg-stone-950/75 backdrop-blur-md border border-stone-800 text-stone-300 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={onPrevCategory}
            disabled={currentCategoryIndex === 0}
            aria-label="Categoría anterior"
            title="Categoría anterior"
            className="min-h-[44px] min-w-[44px] rounded-full bg-stone-950/75 backdrop-blur-md border border-stone-800 text-stone-300 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed hidden sm:flex items-center justify-center transition-all active:scale-95 shadow-lg"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {/* Center Minimal Tracker */}
        <div
          onClick={onOpenIndex}
          className="cursor-pointer group flex items-center gap-2.5 bg-stone-950/80 backdrop-blur-md border border-stone-800/80 px-4 py-2 rounded-full shadow-lg"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
          
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-stone-300 font-semibold">
              {String(currentDishIndex + 1).padStart(2, '0')}/{String(totalDishesInCategory).padStart(2, '0')}
            </span>
            <span className="text-stone-600">·</span>
            <span className="text-amber-400/90 font-sans font-medium truncate max-w-[140px] sm:max-w-[200px]">
              {categoryName}
            </span>
          </div>

          {/* Dots Indicator for Dishes in this category */}
          {totalDishesInCategory > 1 && (
            <div className="flex items-center gap-1 pl-1">
              {Array.from({ length: totalDishesInCategory }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentDishIndex
                      ? 'bg-amber-400 w-3'
                      : 'bg-stone-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Next Chevrons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onNextCategory}
            disabled={currentCategoryIndex >= totalCategories - 1}
            aria-label="Siguiente categoría"
            title="Siguiente categoría"
            className="min-h-[44px] min-w-[44px] rounded-full bg-stone-950/75 backdrop-blur-md border border-stone-800 text-stone-300 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed hidden sm:flex items-center justify-center transition-all active:scale-95 shadow-lg"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          <button
            onClick={onNextDish}
            disabled={
              currentDishIndex >= totalDishesInCategory - 1 &&
              currentCategoryIndex >= totalCategories - 1
            }
            aria-label="Siguiente platillo"
            className="min-h-[44px] min-w-[44px] rounded-full bg-stone-950/75 backdrop-blur-md border border-stone-800 text-stone-300 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
