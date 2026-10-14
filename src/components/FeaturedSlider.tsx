import React from 'react';
import { Product } from '../types/menu';
import { formatCurrency } from '../utils/formatters';
import { ChevronRight, Sparkles } from 'lucide-react';

interface FeaturedSliderProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({
  products,
  onSelectProduct,
}) => {
  if (products.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-4">
      {/* Editorial Title */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-base sm:text-lg font-display font-bold text-stone-100 tracking-tight">
            Especialidades & Recomendaciones del Chef
          </h2>
        </div>
        <span className="text-xs text-stone-500 font-medium hidden sm:inline">
          Desliza para explorar
        </span>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="snap-start shrink-0 w-[260px] sm:w-[300px] cursor-pointer group bg-stone-900/80 hover:bg-stone-900 border border-stone-800/90 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 active:scale-[0.99]"
            >
              {/* Product Photo */}
              <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-stone-950">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/20" />

                {/* Subtle text badge */}
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500 text-stone-950 shadow-sm">
                    {product.badge === 'promocion'
                      ? 'Promoción'
                      : product.badge === 'recomendado'
                      ? 'Especialidad'
                      : product.badge === 'popular'
                      ? 'Favorito'
                      : 'Nuevo'}
                  </span>
                )}

                {/* Price tag */}
                <div className="absolute bottom-2 right-2.5 font-mono text-sm font-bold text-amber-300 bg-stone-950/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-stone-800">
                  {formatCurrency(product.price)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 space-y-1.5">
                <h3 className="font-display font-semibold text-sm text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-stone-500 font-medium">
                  {product.prepTimeMinutes ? (
                    <span>{product.prepTimeMinutes} min prep</span>
                  ) : (
                    <span>Cocina al momento</span>
                  )}
                  <span className="flex items-center gap-0.5 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                    Ver <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
