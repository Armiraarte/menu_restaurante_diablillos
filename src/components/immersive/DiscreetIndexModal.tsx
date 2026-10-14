import React from 'react';
import { CulinaryChapter, CulinaryDish, RestaurantEditorial } from '../../types/immersiveMenu';
import { formatCurrency } from '../../utils/formatters';
import { X, ArrowRight, Sparkles } from 'lucide-react';

interface DiscreetIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: RestaurantEditorial;
  chapters: CulinaryChapter[];
  dishes: CulinaryDish[];
  currentIndex: number;
  onSelectCover: () => void;
  onSelectDish: (dishIndex: number) => void;
  onSelectChapter: (chapterId: string) => void;
}

export const DiscreetIndexModal: React.FC<DiscreetIndexModalProps> = ({
  isOpen,
  onClose,
  restaurant,
  chapters,
  dishes,
  currentIndex,
  onSelectCover,
  onSelectDish,
  onSelectChapter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl text-stone-100 flex flex-col p-6 sm:p-10 overflow-hidden animate-fade-in select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4 max-w-5xl w-full mx-auto shrink-0">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 block">
            Índice de la Carta
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

      {/* Index Body: Scrollable Chapters and Dishes */}
      <div className="flex-1 max-w-5xl w-full mx-auto overflow-y-auto no-scrollbar py-6 space-y-8">
        {/* Cover jump shortcut */}
        <div
          onClick={() => {
            onSelectCover();
            onClose();
          }}
          className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-400/50 cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-editorial text-base text-stone-200 group-hover:text-amber-300">
              Portada de Bienvenida & Manifiesto
            </span>
          </div>
          <span className="text-xs font-mono text-stone-500 group-hover:text-stone-300">
            Ir al inicio →
          </span>
        </div>

        {/* Chapters list */}
        {chapters.map((chapter) => {
          const chapterDishes = dishes.filter((d) => d.chapterId === chapter.id);

          return (
            <div key={chapter.id} className="space-y-3">
              <div
                onClick={() => {
                  onSelectChapter(chapter.id);
                  onClose();
                }}
                className="flex items-baseline justify-between border-b border-stone-800/80 pb-1 cursor-pointer group"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-amber-400 font-semibold">
                    Cap. {chapter.numberRoman}
                  </span>
                  <h3 className="font-editorial text-xl text-stone-100 group-hover:text-amber-300 transition-colors">
                    {chapter.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-stone-500 group-hover:text-amber-400 transition-colors">
                  {chapterDishes.length} platillos
                </span>
              </div>

              {/* Dish thumbnails in this chapter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {chapterDishes.map((dish) => {
                  const dishGlobalIndex = dishes.findIndex((d) => d.id === dish.id);
                  const isCurrent = currentIndex === dishGlobalIndex;

                  return (
                    <div
                      key={dish.id}
                      onClick={() => {
                        onSelectDish(dishGlobalIndex);
                        onClose();
                      }}
                      className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-amber-500/10 border-amber-400 text-stone-100'
                          : 'bg-stone-900/40 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/80'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-950">
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

                      <ArrowRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
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
