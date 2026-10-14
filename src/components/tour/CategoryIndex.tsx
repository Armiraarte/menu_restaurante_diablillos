import React from 'react';
import { Category, RestaurantData } from '../../types/interactiveMenu';
import { formatCurrency } from '../../utils/formatters';
import { X, Sparkles, Flame, Utensils, Wine, Cookie, ArrowRight } from 'lucide-react';

interface CategoryIndexProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: RestaurantData;
  categories: Category[];
  currentCategoryIndex: number;
  currentDishIndex: number;
  onSelectCategory: (categoryIndex: number) => void;
  onSelectDish: (categoryIndex: number, dishIndex: number) => void;
  onSelectCover: () => void;
}

export const CategoryIndex: React.FC<CategoryIndexProps> = ({
  isOpen,
  onClose,
  restaurant,
  categories,
  currentCategoryIndex,
  currentDishIndex,
  onSelectCategory,
  onSelectDish,
  onSelectCover,
}) => {
  if (!isOpen) return null;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Flame':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-orange-400" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-rose-500" />;
      case 'Wine':
        return <Wine className="w-4 h-4 text-yellow-500" />;
      case 'Cookie':
        return <Cookie className="w-4 h-4 text-pink-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl text-stone-100 flex flex-col p-5 sm:p-10 overflow-hidden animate-fade-in select-none">
      {/* Index Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4 max-w-5xl w-full mx-auto shrink-0">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 block">
            Índice del Recorrido
          </span>
          <h2 className="font-editorial text-2xl text-white">
            {restaurant.name}
          </h2>
        </div>

        <button
          onClick={onClose}
          aria-label="Cerrar índice"
          className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Index Body: Scrollable Categories and Dishes */}
      <div className="flex-1 max-w-5xl w-full mx-auto overflow-y-auto no-scrollbar py-6 space-y-8">
        {/* Cover link */}
        <div
          onClick={() => {
            onSelectCover();
            onClose();
          }}
          className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800 hover:border-amber-400/50 cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-editorial text-base text-stone-200 group-hover:text-amber-300">
              Portada & Bienvenida
            </span>
          </div>
          <span className="text-xs font-mono text-stone-500 group-hover:text-stone-300">
            Regresar al inicio →
          </span>
        </div>

        {/* Categories list */}
        {categories.map((cat, catIdx) => {
          const isCurrentCat = currentCategoryIndex === catIdx;

          return (
            <div key={cat.id} className="space-y-3">
              {/* Category banner trigger */}
              <div
                onClick={() => {
                  onSelectCategory(catIdx);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isCurrentCat
                    ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-sm'
                    : 'bg-stone-900/30 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-stone-950 flex items-center justify-center border border-stone-800">
                    {renderIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg text-stone-100 group-hover:text-amber-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-light truncate max-w-xs sm:max-w-md">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-stone-400">
                    {cat.dishes.length} platillo{cat.dishes.length === 1 ? '' : 's'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>

              {/* Dish Thumbnails inside this category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pl-2">
                {cat.dishes.map((dish, dishIdx) => {
                  const isCurrentDish = isCurrentCat && currentDishIndex === dishIdx;

                  return (
                    <div
                      key={dish.id}
                      onClick={() => {
                        onSelectDish(catIdx, dishIdx);
                        onClose();
                      }}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        isCurrentDish
                          ? 'bg-amber-500/15 border-amber-400 text-stone-100'
                          : 'bg-stone-950/60 border-stone-800/70 hover:border-stone-700 hover:bg-stone-900/50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-900">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-editorial text-sm text-stone-200 truncate leading-snug">
                          {dish.name}
                        </h4>
                        <span className="font-mono text-xs text-amber-400 font-medium block">
                          {formatCurrency(dish.price, dish.currency)}
                        </span>
                      </div>

                      {dish.tag && (
                        <span className="text-[10px] font-mono uppercase text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 shrink-0">
                          {dish.tag}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer in Index */}
      <div className="border-t border-stone-800/80 pt-4 max-w-5xl w-full mx-auto flex items-center justify-between text-xs text-stone-500 font-mono shrink-0">
        <span>Mesa {restaurant.tableNumber}</span>
        <span>{restaurant.location}</span>
      </div>
    </div>
  );
};
