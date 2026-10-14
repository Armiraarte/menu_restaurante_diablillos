import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, ArrowUpDown, X } from 'lucide-react';

interface NavigationHintProps {
  onDismiss?: () => void;
}

export const NavigationHint: React.FC<NavigationHintProps> = ({ onDismiss }) => {
  const [visible, setVisible] = useState(true);

  // Auto-hide hint after 6 seconds so it doesn't disturb exploration
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 inset-x-0 z-30 pointer-events-none flex justify-center px-4 animate-fade-in">
      <div className="pointer-events-auto bg-stone-950/85 backdrop-blur-md border border-stone-800/80 rounded-2xl p-2.5 px-4 shadow-2xl flex items-center gap-4 text-xs text-stone-300">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400">
          <ArrowLeftRight className="w-3.5 h-3.5 animate-pulse" />
          <span>Desliza platillos</span>
        </div>

        <span className="w-1 h-1 rounded-full bg-stone-700" />

        <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-300">
          <ArrowUpDown className="w-3.5 h-3.5 animate-pulse" />
          <span>Categorías</span>
        </div>

        <button
          onClick={() => {
            setVisible(false);
            if (onDismiss) onDismiss();
          }}
          aria-label="Cerrar guía"
          className="text-stone-500 hover:text-stone-300 pl-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
