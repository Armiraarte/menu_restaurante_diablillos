import React from 'react';
import { RestaurantEditorial } from '../../types/immersiveMenu';
import { ChevronDown, Compass } from 'lucide-react';

interface EditorialCoverProps {
  restaurant: RestaurantEditorial;
  onStartExploration: () => void;
  onOpenIndex: () => void;
}

export const EditorialCover: React.FC<EditorialCoverProps> = ({
  restaurant,
  onStartExploration,
  onOpenIndex,
}) => {
  return (
    <div
      onClick={onStartExploration}
      className="relative w-full h-screen overflow-hidden bg-stone-950 text-stone-100 flex flex-col justify-between p-6 sm:p-12 select-none cursor-pointer group"
    >
      {/* Background Hero Image with Slow Cinematic Scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.65]"
        />
        {/* Editorial Gradients for Deep Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/30 to-stone-950/90" />
      </div>

      {/* Top Header: Quiet luxury branding */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto pt-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-amber-500/30 bg-stone-950/40 backdrop-blur-md flex items-center justify-center font-serif text-amber-300 font-bold text-sm tracking-widest">
            F·O
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-400 block">
              Menú Gastronómico
            </span>
            <span className="text-xs text-amber-400/90 font-mono">
              Mesa {restaurant.tableNumber}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenIndex();
          }}
          className="px-3.5 py-1.5 rounded-full border border-stone-700/80 bg-stone-950/50 backdrop-blur-md hover:border-amber-400/60 text-stone-300 hover:text-white transition-all text-xs font-mono tracking-wider flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>ÍNDICE</span>
        </button>
      </div>

      {/* Centerpiece: Poetic Editorial Typography */}
      <div className="relative z-10 max-w-3xl mx-auto text-center my-auto px-4 py-8">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-amber-400/90 block mb-3 animate-fade-in">
          {restaurant.tagline}
        </span>

        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-stone-50 tracking-tight leading-[1.08] text-balance mb-6 drop-shadow-md">
          {restaurant.name}
        </h1>

        <div className="w-12 h-[1px] bg-amber-500/40 mx-auto my-6" />

        <p className="font-editorial italic text-base sm:text-xl text-stone-300 max-w-xl mx-auto leading-relaxed font-light">
          {restaurant.welcomeMessage}
        </p>

        <p className="mt-6 text-xs text-stone-400 font-mono tracking-wide hidden sm:block">
          {restaurant.location}
        </p>
      </div>

      {/* Bottom Cue: "Desliza para explorar" */}
      <div className="relative z-10 max-w-md mx-auto text-center pb-4 flex flex-col items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400 group-hover:text-amber-300 transition-colors">
          Desliza o toca para explorar
        </span>
        <div className="w-7 h-7 rounded-full border border-stone-700 bg-stone-900/60 flex items-center justify-center text-amber-400 animate-bounce">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
