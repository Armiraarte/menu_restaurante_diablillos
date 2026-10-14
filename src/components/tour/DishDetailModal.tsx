import React, { useState } from 'react';
import { Dish, Category } from '../../types/interactiveMenu';
import { formatCurrency } from '../../utils/formatters';
import { X, ChevronLeft, ChevronRight, Flame, Wine, Clock, Sparkles, Check, MapPin } from 'lucide-react';

interface DishDetailModalProps {
  dish: Dish | null;
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onZoomImage: (imageUrl: string, title: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  category,
  isOpen,
  onClose,
  onZoomImage,
}) => {
  if (!isOpen || !dish) return null;

  // Gallery of images: primary + secondary
  const allImages = [dish.image, ...(dish.secondaryImages || [])];
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 text-stone-100">
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-700 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar detalle"
          className="absolute top-3 right-3 z-30 min-h-[40px] min-w-[40px] rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-700/80 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto no-scrollbar flex-1 pb-6">
          {/* Gallery Carousel */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-950 group">
            <img
              src={allImages[activeImageIdx]}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center cursor-zoom-in transition-transform duration-500"
              onClick={() => onZoomImage(allImages[activeImageIdx], `${dish.name} (${activeImageIdx + 1}/${allImages.length})`)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent pointer-events-none" />

            {/* Gallery Arrows if multiple images */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label="Imagen previa"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-950/70 border border-stone-700 text-stone-200 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="Siguiente imagen"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-950/70 border border-stone-700 text-stone-200 hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Gallery Dots */}
                <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-20 pointer-events-none">
                  {allImages.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeImageIdx ? 'w-5 bg-amber-400' : 'w-1.5 bg-stone-600'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Dish Tag */}
            {dish.tag && (
              <span className="absolute top-4 left-4 text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-amber-500 text-stone-950 shadow-md">
                {dish.tag}
              </span>
            )}
          </div>

          {/* Detailed Content */}
          <div className="p-6 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
                  {category?.name || 'Gastronomía'}
                </span>
                <span className="font-editorial text-2xl sm:text-3xl font-normal text-amber-300">
                  {formatCurrency(dish.price, dish.currency)}
                </span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight mt-1">
                {dish.name}
              </h2>

              <p className="mt-3 text-sm text-stone-300 font-light leading-relaxed">
                {dish.fullDescription}
              </p>
            </div>

            {/* Ingredient breakdown */}
            <div className="pt-3 border-t border-stone-800 space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-400 block font-semibold">
                Ingredientes Principales & Procedencia:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                {dish.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-stone-950/60 p-2 rounded-xl border border-stone-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef Note & Pairing Recommendations */}
            <div className="pt-3 border-t border-stone-800 space-y-3">
              {dish.chefNote && (
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-3">
                  <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider font-bold block text-amber-300 mb-0.5">
                      Nota del Chef
                    </span>
                    <p className="leading-relaxed">{dish.chefNote}</p>
                  </div>
                </div>
              )}

              {dish.pairing && (
                <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs text-stone-300 flex items-start gap-3">
                  <Wine className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider font-bold block text-rose-300 mb-0.5">
                      Maridaje Sugerido por el Sommelier
                    </span>
                    <p className="leading-relaxed">{dish.pairing}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Time / Calories metadata */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-400 font-mono">
              {dish.cookTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>{dish.cookTime}</span>
                </span>
              )}
              {dish.calories && (
                <span>· {dish.calories} kcal aprox.</span>
              )}
              <span>· Precios con I.V.A. incluido en {dish.currency}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action: Close and return to tour */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 shrink-0 flex items-center justify-between">
          <span className="text-xs text-stone-400 font-mono">
            Toca fuera para cerrar
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            Continuar Recorrido
          </button>
        </div>
      </div>
    </div>
  );
};
