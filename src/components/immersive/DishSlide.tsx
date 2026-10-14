import React, { useState } from 'react';
import { CulinaryDish } from '../../types/immersiveMenu';
import { formatCurrency } from '../../utils/formatters';
import { Sparkles, Wine, Flame, MapPin, Maximize2, X, Info } from 'lucide-react';

interface DishSlideProps {
  dish: CulinaryDish;
  index: number;
  totalDishes: number;
  onNext: () => void;
  onPrev: () => void;
  onOpenIndex: () => void;
}

export const DishSlide: React.FC<DishSlideProps> = ({
  dish,
  index,
  totalDishes,
  onNext,
  onPrev,
  onOpenIndex,
}) => {
  const [showFullPhoto, setShowFullPhoto] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'maridaje' | 'origen'>('desc');

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${dish.bgGradient} text-stone-100 flex flex-col select-none`}
    >
      {/* Top Navigation HUD - Minimal & Quiet */}
      <header className="relative z-20 w-full px-5 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
            {dish.chapterNumber}
          </span>
          <span className="text-stone-600 hidden sm:inline">·</span>
          <span className="font-editorial italic text-xs sm:text-sm text-stone-300 hidden sm:inline">
            {dish.chapterTitle}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-stone-400">
            {String(index + 1).padStart(2, '0')} / {String(totalDishes).padStart(2, '0')}
          </span>
          <button
            onClick={onOpenIndex}
            className="px-3 py-1 rounded-full border border-stone-800 bg-stone-900/60 backdrop-blur-md text-stone-300 hover:text-white hover:border-amber-400/50 transition-colors font-mono text-[11px] tracking-wider"
          >
            ÍNDICE
          </button>
        </div>
      </header>

      {/* Main Composition Container based on Layout Type */}
      <div className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 pb-16 flex flex-col justify-center overflow-y-auto no-scrollbar">
        {dish.composition === 'cinematic_bleed' && (
          /* Composition 1: Full Cinematic Bleed with Overlay Typographic Plate */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
            {/* Visual focal hero (70-80% prominence) */}
            <div className="lg:col-span-7 relative h-[42vh] sm:h-[52vh] lg:h-[62vh] rounded-3xl overflow-hidden shadow-2xl border border-stone-800/80 group">
              <img
                src={dish.image}
                alt={dish.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />
              
              <button
                onClick={() => setShowFullPhoto(true)}
                aria-label="Ver fotografía completa"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-950/60 backdrop-blur-md border border-stone-700/60 text-stone-300 hover:text-white transition-colors"
                title="Ampliar fotografía"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <span className="font-mono text-xs text-amber-300 uppercase tracking-widest bg-stone-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-stone-800">
                  {dish.subtitle}
                </span>
              </div>
            </div>

            {/* Editorial Information Block */}
            <div className="lg:col-span-5 space-y-4 px-1 lg:pl-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
                  Especialidad de la Casa
                </span>
                <span className="font-editorial text-2xl sm:text-3xl font-normal text-amber-300">
                  {formatCurrency(dish.price, dish.currency)}
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight">
                {dish.name}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed font-sans">
                {dish.description}
              </p>

              {/* Curated Sensory Notes */}
              <div className="pt-2 border-t border-stone-800/80 space-y-2.5 text-xs">
                {dish.notes.technique && (
                  <div className="flex items-start gap-2.5 text-stone-400">
                    <Flame className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong className="text-stone-200 font-medium">Técnica:</strong> {dish.notes.technique}</span>
                  </div>
                )}
                {dish.notes.pairing && (
                  <div className="flex items-start gap-2.5 text-stone-400">
                    <Wine className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong className="text-stone-200 font-medium">Maridaje:</strong> {dish.notes.pairing}</span>
                  </div>
                )}
                {dish.notes.origin && (
                  <div className="flex items-start gap-2.5 text-stone-400">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-stone-200 font-medium">Origen:</strong> {dish.notes.origin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {dish.composition === 'asymmetric_sculptural' && (
          /* Composition 2: Asymmetric Sculptural with Negative Space & Poetic Narrative */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
            {/* Editorial Information Block First on Desktop */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 px-1 lg:pr-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-orange-400 block">
                Tradición & Maíz Criollo
              </span>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight">
                {dish.name}
              </h2>

              <div className="flex items-baseline gap-3">
                <span className="font-editorial text-2xl sm:text-3xl text-amber-300">
                  {formatCurrency(dish.price, dish.currency)}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {dish.subtitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed font-sans">
                {dish.description}
              </p>

              {/* Ingredient Capsules in Minimal Text */}
              {dish.notes.ingredients && (
                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    Elementos Clave:
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-stone-300">
                    {dish.notes.ingredients.map((ing, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-orange-400" />
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {dish.notes.pairing && (
                <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5">
                  <Wine className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-200 block text-[11px] uppercase tracking-wider font-mono">Sugerencia del Sommelier</span>
                    <span>{dish.notes.pairing}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Asymmetric Photographic Canvas */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative h-[42vh] sm:h-[52vh] lg:h-[62vh] rounded-3xl overflow-hidden shadow-2xl border border-stone-800/80 group">
              <img
                src={dish.image}
                alt={dish.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20" />
              
              <button
                onClick={() => setShowFullPhoto(true)}
                aria-label="Ver fotografía completa"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-950/60 backdrop-blur-md border border-stone-700/60 text-stone-300 hover:text-white transition-colors"
                title="Ampliar fotografía"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {dish.composition === 'editorial_split' && (
          /* Composition 3: Magazine Split Spread with Interactive Sensory Notes */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
            {/* Image Spread */}
            <div className="lg:col-span-6 relative h-[40vh] sm:h-[50vh] lg:h-[58vh] rounded-3xl overflow-hidden shadow-2xl border border-stone-800/80 group">
              <img
                src={dish.image}
                alt={dish.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20" />

              <button
                onClick={() => setShowFullPhoto(true)}
                aria-label="Ver fotografía completa"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-950/60 backdrop-blur-md border border-stone-700/60 text-stone-300 hover:text-white transition-colors"
                title="Ampliar fotografía"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-5">
                <span className="font-editorial text-2xl font-light text-amber-300 drop-shadow">
                  {formatCurrency(dish.price, dish.currency)}
                </span>
              </div>
            </div>

            {/* Split Editorial Column */}
            <div className="lg:col-span-6 space-y-4 px-1 lg:pl-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-rose-400">
                  {dish.chapterTitle}
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight">
                  {dish.name}
                </h2>
                <p className="font-mono text-xs text-stone-400 pt-1">
                  {dish.subtitle}
                </p>
              </div>

              {/* Interactive Editorial Tabs */}
              <div className="flex items-center gap-2 border-b border-stone-800 pb-1">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`text-xs font-mono uppercase tracking-wider pb-1 transition-colors ${
                    activeTab === 'desc' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  El Platillo
                </button>
                <button
                  onClick={() => setActiveTab('maridaje')}
                  className={`text-xs font-mono uppercase tracking-wider pb-1 transition-colors ${
                    activeTab === 'maridaje' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  Maridaje
                </button>
                <button
                  onClick={() => setActiveTab('origen')}
                  className={`text-xs font-mono uppercase tracking-wider pb-1 transition-colors ${
                    activeTab === 'origen' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  Origen & Fuego
                </button>
              </div>

              {/* Tab Contents */}
              <div className="min-h-[110px] text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                {activeTab === 'desc' && (
                  <div className="space-y-3">
                    <p>{dish.description}</p>
                    {dish.notes.ingredients && (
                      <div className="flex flex-wrap gap-2 pt-1 text-stone-400 text-xs">
                        {dish.notes.ingredients.map((ing, idx) => (
                          <span key={idx} className="bg-stone-900/80 border border-stone-800 px-2 py-0.5 rounded-md">
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'maridaje' && (
                  <div className="space-y-2 bg-stone-900/40 p-3.5 rounded-2xl border border-stone-800">
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5 text-xs font-mono">
                      <Wine className="w-3.5 h-3.5" /> Recomendación del Sommelier
                    </span>
                    <p className="text-xs text-stone-300">{dish.notes.pairing || 'Consulte las reservas de bodega con su mesero.'}</p>
                  </div>
                )}

                {activeTab === 'origen' && (
                  <div className="space-y-2 bg-stone-900/40 p-3.5 rounded-2xl border border-stone-800">
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5 text-xs font-mono">
                      <Flame className="w-3.5 h-3.5" /> Técnica y Procedencia
                    </span>
                    <p className="text-xs text-stone-300 mb-1"><strong>Técnica:</strong> {dish.notes.technique}</p>
                    <p className="text-xs text-stone-300"><strong>Origen:</strong> {dish.notes.origin}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Photo Lightbox Modal for Immersive Admiration */}
      {showFullPhoto && (
        <div
          onClick={() => setShowFullPhoto(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none cursor-zoom-out"
        >
          <button
            onClick={() => setShowFullPhoto(false)}
            aria-label="Cerrar vista completa"
            className="absolute top-6 right-6 p-3 rounded-full bg-stone-900/80 border border-stone-700 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img
            src={dish.image}
            alt={dish.name}
            referrerPolicy="no-referrer"
            className="max-h-[85vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl"
          />

          <div className="mt-4 text-center">
            <h3 className="font-editorial text-xl text-white">{dish.name}</h3>
            <span className="font-mono text-xs text-amber-400">{formatCurrency(dish.price, dish.currency)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
