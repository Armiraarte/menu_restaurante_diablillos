import React from 'react';
import { Product } from '../types/menu';
import { formatCurrency } from '../utils/formatters';
import { Flame, Leaf, Wheat, Plus, EyeOff } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  enableOrdering: boolean;
  onSelect: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  enableOrdering,
  onSelect,
  onQuickAdd,
}) => {
  const isAvailable = product.available;
  const hasVariants = (product.variants && product.variants.length > 0) || (product.addOns && product.addOns.length > 0);

  const handleCardClick = () => {
    if (!isAvailable) return;
    onSelect(product);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAvailable) return;
    if (hasVariants) {
      onSelect(product);
    } else if (onQuickAdd) {
      onQuickAdd(product);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col sm:flex-row bg-stone-900/60 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${
        !isAvailable ? 'opacity-65 grayscale-[30%] cursor-not-allowed' : 'active:scale-[0.99] hover:shadow-lg hover:shadow-black/40'
      }`}
    >
      {/* Product Image Section */}
      <div className="relative w-full sm:w-48 sm:h-auto h-48 shrink-0 overflow-hidden bg-stone-950">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent sm:hidden" />

        {/* Status / Promo Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {!isAvailable ? (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700 flex items-center gap-1 shadow-md">
              <EyeOff className="w-3 h-3" /> Agotado hoy
            </span>
          ) : product.badge ? (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-sans shadow-md">
              {product.badge === 'promocion'
                ? 'Promoción'
                : product.badge === 'recomendado'
                ? 'Recomendado'
                : product.badge === 'popular'
                ? 'Popular'
                : 'Nuevo'}
            </span>
          ) : null}
        </div>

        {/* Dietary indicators */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          {product.isVegetarian && (
            <span className="p-1 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400" title="Vegetariano">
              <Leaf className="w-3 h-3" />
            </span>
          )}
          {product.isGlutenFree && (
            <span className="p-1 rounded bg-amber-950/80 border border-amber-500/30 text-amber-400" title="Sin Gluten">
              <Wheat className="w-3 h-3" />
            </span>
          )}
          {product.spicyLevel && product.spicyLevel > 0 ? (
            <span className="p-1 rounded bg-red-950/80 border border-red-500/30 text-red-400" title="Picante">
              <Flame className="w-3 h-3" />
            </span>
          ) : null}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 p-4 sm:p-4.5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-base sm:text-lg text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
              {product.name}
            </h3>
          </div>

          <p className="mt-1.5 text-xs sm:text-sm text-stone-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Additional details: calories / preparation */}
          <div className="mt-2.5 flex items-center gap-2 text-xs text-stone-500">
            {product.prepTimeMinutes && (
              <span>~{product.prepTimeMinutes} min</span>
            )}
            {product.calories && (
              <>
                <span aria-hidden="true">·</span>
                <span>{product.calories} kcal</span>
              </>
            )}
            {hasVariants && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-500/90 font-medium">Personalizable</span>
              </>
            )}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base sm:text-lg font-bold text-amber-300">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-stone-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {isAvailable && enableOrdering && (
            <button
              onClick={handleQuickAddClick}
              aria-label={hasVariants ? 'Personalizar platillo' : 'Agregar a orden'}
              className="min-h-[40px] px-3.5 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/20 hover:border-amber-500 transition-all active:scale-95 shadow-sm"
            >
              {hasVariants ? (
                <span>Personalizar</span>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar</span>
                </>
              )}
            </button>
          )}

          {isAvailable && !enableOrdering && (
            <span className="text-xs font-semibold text-stone-400 group-hover:text-amber-400 transition-colors">
              Ver detalle →
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
