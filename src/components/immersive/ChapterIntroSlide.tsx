import React from 'react';
import { CulinaryChapter } from '../../types/immersiveMenu';
import { ChevronRight } from 'lucide-react';

interface ChapterIntroSlideProps {
  chapter: CulinaryChapter;
  onContinue: () => void;
  onOpenIndex: () => void;
}

export const ChapterIntroSlide: React.FC<ChapterIntroSlideProps> = ({
  chapter,
  onContinue,
  onOpenIndex,
}) => {
  return (
    <div
      onClick={onContinue}
      className={`relative w-full h-screen overflow-hidden bg-gradient-to-b ${chapter.accentHue} text-stone-100 flex flex-col justify-between p-6 sm:p-12 select-none cursor-pointer group`}
    >
      {/* Background Architectural Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-radial from-amber-500/10 via-transparent to-stone-950" />

      {/* Top HUD */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto pt-2">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400">
          Capítulo {chapter.numberRoman}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenIndex();
          }}
          className="px-3.5 py-1.5 rounded-full border border-stone-800 bg-stone-900/60 backdrop-blur-md text-stone-300 hover:text-white font-mono text-[11px] tracking-wider"
        >
          ÍNDICE
        </button>
      </div>

      {/* Central Chapter Title */}
      <div className="relative z-10 max-w-2xl mx-auto text-center my-auto px-4 py-8">
        <span className="font-editorial italic text-stone-400 text-lg sm:text-2xl block mb-3 font-light">
          Capítulo {chapter.numberRoman}
        </span>

        <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-stone-50 tracking-tight leading-[1.08] mb-6 text-balance">
          {chapter.title}
        </h2>

        <div className="w-10 h-[1px] bg-amber-500/50 mx-auto my-5" />

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400/90 mb-3">
          {chapter.subtitle}
        </p>

        <p className="text-sm sm:text-base text-stone-300 max-w-lg mx-auto font-light leading-relaxed">
          {chapter.description}
        </p>
      </div>

      {/* Bottom Cue */}
      <div className="relative z-10 text-center pb-4 flex flex-col items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-400 group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
          <span>Ver platillos de este capítulo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
