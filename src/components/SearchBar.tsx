import React from 'react';
import { Search, X, Flame, Leaf, Wheat, Sparkles } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onlyVegetarian: boolean;
  onToggleVegetarian: () => void;
  onlyGlutenFree: boolean;
  onToggleGlutenFree: () => void;
  onlySpicy: boolean;
  onToggleSpicy: () => void;
  onlyPromos: boolean;
  onTogglePromos: () => void;
  totalFilteredResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onlyVegetarian,
  onToggleVegetarian,
  onlyGlutenFree,
  onToggleGlutenFree,
  onlySpicy,
  onToggleSpicy,
  onlyPromos,
  onTogglePromos,
  totalFilteredResults,
}) => {
  const hasActiveFilters = onlyVegetarian || onlyGlutenFree || onlySpicy || onlyPromos || searchQuery.trim().length > 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-4 pb-2 space-y-3">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-stone-500 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar platillo, corte, ingrediente o cóctel..."
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 min-h-[36px] min-w-[36px] flex items-center justify-center text-stone-400 hover:text-stone-200"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dietary & Highlight Quick Filter Controls (interactive buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        <button
          onClick={onTogglePromos}
          className={`min-h-[36px] px-3 rounded-lg font-medium flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
            onlyPromos
              ? 'bg-amber-500 text-stone-950 font-semibold'
              : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Promociones</span>
        </button>

        <button
          onClick={onToggleVegetarian}
          className={`min-h-[36px] px-3 rounded-lg font-medium flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
            onlyVegetarian
              ? 'bg-emerald-600 text-white font-semibold'
              : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700'
          }`}
        >
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>Vegetariano</span>
        </button>

        <button
          onClick={onToggleGlutenFree}
          className={`min-h-[36px] px-3 rounded-lg font-medium flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
            onlyGlutenFree
              ? 'bg-amber-600 text-white font-semibold'
              : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700'
          }`}
        >
          <Wheat className="w-3.5 h-3.5 text-amber-400" />
          <span>Sin Gluten</span>
        </button>

        <button
          onClick={onToggleSpicy}
          className={`min-h-[36px] px-3 rounded-lg font-medium flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
            onlySpicy
              ? 'bg-red-600 text-white font-semibold'
              : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-red-400" />
          <span>Picante</span>
        </button>

        {hasActiveFilters && (
          <div className="ml-auto pl-2 text-stone-400 text-[11px] whitespace-nowrap shrink-0">
            {totalFilteredResults} platillo{totalFilteredResults === 1 ? '' : 's'}
          </div>
        )}
      </div>
    </div>
  );
};
