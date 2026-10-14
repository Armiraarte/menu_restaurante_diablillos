import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  title: string;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
}) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 select-none cursor-zoom-out animate-fade-in"
    >
      <button
        onClick={onClose}
        aria-label="Cerrar ampliación"
        className="absolute top-6 right-6 p-3 rounded-full bg-stone-900/80 border border-stone-700 text-white hover:bg-stone-800 transition-colors shadow-2xl z-20"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-h-[85vh] max-w-[94vw] flex flex-col items-center">
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="max-h-[80vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl border border-stone-800/80 transform hover:scale-[1.02] transition-transform duration-300"
        />

        <div className="mt-4 text-center">
          <h3 className="font-editorial text-lg sm:text-xl text-white tracking-wide">
            {title}
          </h3>
          <span className="text-xs text-stone-400 font-mono flex items-center justify-center gap-1 mt-1">
            <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
            <span>Toca en cualquier parte para cerrar</span>
          </span>
        </div>
      </div>
    </div>
  );
};
