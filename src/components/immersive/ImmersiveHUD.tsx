import React from 'react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';

interface ImmersiveHUDProps {
  currentIndex: number;
  totalSlides: number;
  currentTitle: string;
  onPrev: () => void;
  onNext: () => void;
  onOpenIndex: () => void;
}

export const ImmersiveHUD: React.FC<ImmersiveHUDProps> = ({
  currentIndex,
  totalSlides,
  currentTitle,
  onPrev,
  onNext,
  onOpenIndex,
}) => {
  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 pointer-events-none select-none">
      {/* Hairline Progress Bar */}
      <div className="w-full h-[2px] bg-stone-900">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Floating Bottom Nav Strip */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between pointer-events-auto">
        {/* Previous Button / Cue */}
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          aria-label="Platillo anterior"
          className="min-h-[44px] min-w-[44px] rounded-full bg-stone-950/70 backdrop-blur-md border border-stone-800 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Center Minimal Tracker */}
        <div
          onClick={onOpenIndex}
          className="cursor-pointer group flex items-center gap-2 bg-stone-950/70 backdrop-blur-md border border-stone-800/80 px-4 py-2 rounded-full shadow-lg"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
          <span className="font-mono text-xs text-stone-300 font-medium">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
          <span className="text-stone-600 hidden sm:inline">·</span>
          <span className="font-editorial italic text-xs text-stone-400 hidden sm:inline max-w-[160px] truncate">
            {currentTitle}
          </span>
        </div>

        {/* Next Button / Cue */}
        <button
          onClick={onNext}
          disabled={currentIndex >= totalSlides - 1}
          aria-label="Siguiente platillo"
          className="min-h-[44px] min-w-[44px] rounded-full bg-stone-950/70 backdrop-blur-md border border-stone-800 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
