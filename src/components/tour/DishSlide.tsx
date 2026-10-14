import React from 'react';
import { Dish, Category } from '../../types/interactiveMenu';
import { formatCurrency } from '../../utils/formatters';
import { Maximize2, Sparkles, ChevronRight, Flame, Wine, Clock } from 'lucide-react';

interface DishSlideProps {
  dish: Dish;
  category: Category;
  dishIndex: number;
  totalDishesInCategory: number;
  onOpenDetail: () => void;
  onZoomImage: (imageUrl: string, title: string) => void;
  onOpenIndex: () => void;
}

export const DishSlide: React.FC<DishSlideProps> = ({
  dish,
  category,
  dishIndex,
  totalDishesInCategory,
  onOpenDetail,
  onZoomImage,
  onOpenIndex,
}) => {
  return (
    <div
      className={`relative w-full h-screen overflow-hidden bg-gradient-to-b ${category.accentHue} text-stone-100 flex flex-col select-none`}
    >
      {/* Top Header HUD */}
      <header className="relative z-20 w-full px-5 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <span
            onClick={onOpenIndex}
            className="font-mono text-xs uppercase tracking-[0.22em] text-amber-400 font-semibold cursor-pointer hover:underline"
          >
            {category.name}
          </span>
          <span className="text-stone-600 hidden sm:inline">·</span>
          <span className="font-editorial italic text-xs sm:text-sm text-stone-400 hidden sm:inline truncate max-w-[220px]">
            {category.subtitle}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-stone-400">
            {dishIndex + 1} de {totalDishesInCategory}
          </span>
          <button
            onClick={onOpenIndex}
            className="px-3 py-1 rounded-full border border-stone-800 bg-stone-900/60 backdrop-blur-md text-stone-300 hover:text-white hover:border-amber-400/50 transition-colors font-mono text-[11px] tracking-wider"
          >
            ÍNDICE
          </button>
        </div>
      </header>

      {/* Main Visual Presentation by Layout Style */}
      <div className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 pb-16 flex flex-col justify-center overflow-y-auto no-scrollbar">
        {dish.layoutStyle === 'cinematic_bleed' && (
          /* Style A: Cinematic Bleed (Grand scale imagery) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
            {/* Visual focal hero (70-80% height) */}
            <div
              onClick={onOpenDetail}
              className="lg:col-span-7 relative h-[42vh] sm:h-[50vh] lg:h-[62vh] rounded-3xl overflow-hidden shadow-2xl border border-stone-800/80 group cursor-pointer"
            >
              <img
                src={dish.image}
                alt={dish.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

              {/* Tag / Badge */}
              {dish.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-stone-950 font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    <span>{dish.tag}</span>
                  </span>
                </div>
              )}

              {/* Zoom Trigger Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onZoomImage(dish.image, dish.name);
                }}
                aria-label="Ampliar fotografía"
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-950/70 backdrop-blur-md border border-stone-700/60 text-stone-300 hover:text-white transition-colors"
                title="Ampliar imagen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <span className="font-mono text-xs text-amber-300 uppercase tracking-widest bg-stone-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-stone-800">
                  {dish.cookTime || 'Elaborado al momento'}
                </span>
                <span className="text-[11px] font-mono text-stone-300 bg-stone-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-stone-800 flex items-center gap-1">
                  <span>Toca para ver detalle</span>
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                </span>
              </div>
            </div>

            {/* Editorial Information Column */}
            <div
              onClick={onOpenDetail}
              className="lg:col-span-5 space-y-4 px-1 lg:pl-4 cursor-pointer group"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
                  {category.name}
                </span>
                <span className="font-editorial text-2xl sm:text-3xl font-normal text-amber-300">
                  {formatCurrency(dish.price, dish.currency)}
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight group-hover:text-amber-200 transition-colors">
                {dish.name}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed font-sans">
                {dish.shortDescription}
              </p>

              {/* Key ingredients brief */}
              <div className="pt-2 border-t border-stone-800/80 space-y-2 text-xs">
                <div className="flex flex-wrap gap-1.5 text-stone-400">
                  {dish.ingredients.slice(0, 4).map((ing, i) => (
                    <span key={i} className="bg-stone-900/80 border border-stone-800 px-2 py-0.5 rounded text-[11px]">
                      {ing}
                    </span>
                  ))}
                </div>

                {dish.pairing && (
                  <div className="flex items-start gap-2 text-stone-400 pt-1">
                    <Wine className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-[11px]"><strong className="text-stone-300">Maridaje:</strong> {dish.pairing}</span>
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-amber-300 hover:text-white transition-all text-xs font-mono tracking-wider flex items-center justify-between sm:justify-start gap-2"
              >
                <span>Descubrir historia y preparación</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {dish.layoutStyle === 'asymmetric_editorial' && (
          /* Style B: Asymmetric Editorial (Text column left, sculptural image right) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
            {/* Text left on desktop */}
            <div
              onClick={onOpenDetail}
              className="lg:col-span-5 order-2 lg:order-1 space-y-4 px-1 lg:pr-4 cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-400">
                  {category.name}
                </span>
                {dish.tag && (
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    {dish.tag}
                  </span>
                )}
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight group-hover:text-amber-200 transition-colors">
                {dish.name}
              </h2>

              <div className="flex items-baseline gap-3">
                <span className="font-editorial text-2xl sm:text-3xl text-amber-300">
                  {formatCurrency(dish.price, dish.currency)}
                </span>
                {dish.calories && (
                  <span className="text-xs text-stone-500 font-mono">
                    · {dish.calories} kcal
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed font-sans">
                {dish.shortDescription}
              </p>

              {/* Chef note brief */}
              {dish.chefNote && (
                <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-stone-300 italic">{dish.chefNote}</p>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-amber-300 hover:text-white transition-all text-xs font-mono tracking-wider flex items-center justify-between sm:justify-start gap-2"
              >
                <span>Ver ingredientes y galería</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sculptural Photo right */}
            <div
              onClick={onOpenDetail}
              className="lg:col-span-7 order-1 lg:order-2 relative h-[42vh] sm:h-[50vh] lg:h-[62vh] rounded-3xl overflow-hidden shadow-2xl border border-stone-800/80 group cursor-pointer"
            >
              <img
                src={dish.image}
                alt={dish.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onZoomImage(dish.image, dish.name);
                }}
                aria-label="Ampliar fotografía"
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-950/70 backdrop-blur-md border border-stone-700/60 text-stone-300 hover:text-white transition-colors"
                title="Ampliar imagen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <span className="text-[11px] font-mono text-stone-300 bg-stone-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-stone-800 flex items-center gap-1">
                  <span>Toca para ver detalle</span>
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                </span>
              </div>
            </div>
          </div>
        )}

        {dish.layoutStyle === 'magazine_split' && (
          /* Style C: Magazine Split (Balanced 50/50 with sensory pairing focus) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
            {/* Image on left */}
            <div
              onClick={onOpenDetail}
              className="lg:col-span-6 relative h-[40vh] sm:h-[48vh] lg:h-[58vh] rounded-3xl overflow-hidden shadow-2xl border border-stone-800/80 group cursor-pointer"
            >
              <img
                src={dish.image}
                alt={dish.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20" />

              {dish.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/90 text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg">
                    {dish.tag}
                  </span>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onZoomImage(dish.image, dish.name);
                }}
                aria-label="Ampliar fotografía"
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-950/70 backdrop-blur-md border border-stone-700/60 text-stone-300 hover:text-white transition-colors"
                title="Ampliar imagen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-5">
                <span className="font-editorial text-2xl font-light text-amber-300 drop-shadow">
                  {formatCurrency(dish.price, dish.currency)}
                </span>
              </div>
            </div>

            {/* Narrative on right */}
            <div
              onClick={onOpenDetail}
              className="lg:col-span-6 space-y-4 px-1 lg:pl-4 cursor-pointer group"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-rose-400">
                  {category.name}
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight group-hover:text-amber-200 transition-colors">
                  {dish.name}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed font-sans">
                {dish.shortDescription}
              </p>

              {/* Pairing and cook time strip */}
              <div className="space-y-2 pt-2 border-t border-stone-800 text-xs">
                {dish.pairing && (
                  <div className="p-3 rounded-2xl bg-stone-900/50 border border-stone-800 flex items-start gap-2.5">
                    <Wine className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">Maridaje Recomendado</span>
                      <span className="text-stone-300 text-xs">{dish.pairing}</span>
                    </div>
                  </div>
                )}

                {dish.cookTime && (
                  <div className="flex items-center gap-2 text-stone-400 text-xs pl-1">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span>{dish.cookTime}</span>
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-amber-300 hover:text-white transition-all text-xs font-mono tracking-wider flex items-center justify-between sm:justify-start gap-2"
              >
                <span>Abrir ficha gastronómica completa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
