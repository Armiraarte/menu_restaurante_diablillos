import React, { useState, useMemo } from 'react';
import { Product } from '../types/menu';
import { formatCurrency } from '../utils/formatters';
import { X, Plus, Minus, Check, Flame, Leaf, Wheat, Clock, AlertCircle } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  enableOrdering: boolean;
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedVariants: Record<string, string>,
    selectedAddOns: string[],
    removedIngredients: string[],
    specialInstructions: string,
    calculatedPrice: number
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  enableOrdering,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  // Selected variants (mandatory radio selections)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach((group) => {
      if (group.defaultOptionId) {
        initial[group.id] = group.defaultOptionId;
      } else if (group.options.length > 0) {
        initial[group.id] = group.options[0].id;
      }
    });
    return initial;
  });

  // Selected optional add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Removed ingredients
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

  // Special kitchen instructions
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Calculate live dynamic unit price
  const unitPrice = useMemo(() => {
    let total = product.price;

    // Add variant deltas
    if (product.variants) {
      product.variants.forEach((group) => {
        const selectedId = selectedVariants[group.id];
        const option = group.options.find((opt) => opt.id === selectedId);
        if (option) {
          total += option.priceDelta;
        }
      });
    }

    // Add add-on deltas
    if (product.addOns) {
      product.addOns.forEach((group) => {
        group.options.forEach((opt) => {
          if (selectedAddOns.includes(opt.id)) {
            total += opt.priceDelta;
          }
        });
      });
    }

    return total;
  }, [product, selectedVariants, selectedAddOns]);

  const totalPrice = unitPrice * quantity;

  // Toggle add-on
  const handleToggleAddOn = (addOnId: string, maxSelect?: number) => {
    setSelectedAddOns((prev) => {
      if (prev.includes(addOnId)) {
        return prev.filter((id) => id !== addOnId);
      }
      if (maxSelect && prev.length >= maxSelect) {
        return [...prev.slice(1), addOnId];
      }
      return [...prev, addOnId];
    });
  };

  // Toggle removed ingredient
  const handleToggleRemoveIngredient = (ingredient: string) => {
    setRemovedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleVariantSelect = (groupId: string, optionId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  const handleAddSubmit = () => {
    onAddToCart(
      product,
      quantity,
      selectedVariants,
      selectedAddOns,
      removedIngredients,
      specialInstructions,
      unitPrice
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Backdrop touch dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet Container */}
      <div className="relative w-full sm:max-w-xl max-h-[90vh] sm:max-h-[85vh] bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 text-stone-100">
        {/* Mobile Drag Indicator Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-700 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar detalle de producto"
          className="absolute top-3 right-3 z-20 min-h-[40px] min-w-[40px] rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto no-scrollbar flex-1 pb-6">
          {/* Hero Dish Image */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-950">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

            {/* Badges in modal */}
            {product.badge && (
              <span className="absolute top-4 left-4 text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-amber-500 text-stone-950 shadow-md">
                {product.badge === 'promocion'
                  ? 'Promoción'
                  : product.badge === 'recomendado'
                  ? 'Especialidad Recomendada'
                  : product.badge === 'popular'
                  ? 'Favorito de la Casa'
                  : 'Nuevo Lanzamiento'}
              </span>
            )}
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Title & Price Header */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  {product.name}
                </h2>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-amber-300 block">
                    {formatCurrency(unitPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-xs text-stone-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2.5 text-sm text-stone-300 leading-relaxed">
                {product.description}
              </p>

              {/* Informational badges & Pairings */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-stone-400">
                {product.prepTimeMinutes && (
                  <span className="inline-flex items-center gap-1 bg-stone-800/80 px-2 py-0.5 rounded text-stone-300">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>~{product.prepTimeMinutes} min</span>
                  </span>
                )}
                {product.calories && (
                  <span className="bg-stone-800/80 px-2 py-0.5 rounded text-stone-300">
                    {product.calories} kcal
                  </span>
                )}
                {product.isVegetarian && (
                  <span className="inline-flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-400">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Vegetariano</span>
                  </span>
                )}
                {product.isGlutenFree && (
                  <span className="inline-flex items-center gap-1 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded text-amber-400">
                    <Wheat className="w-3.5 h-3.5" />
                    <span>Sin Gluten</span>
                  </span>
                )}
                {product.spicyLevel && product.spicyLevel > 0 ? (
                  <span className="inline-flex items-center gap-1 bg-red-950/80 border border-red-500/30 px-2 py-0.5 rounded text-red-400">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Nivel Picante ({product.spicyLevel})</span>
                  </span>
                ) : null}
              </div>

              {product.pairingNote && (
                <div className="mt-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-200/90 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{product.pairingNote}</span>
                </div>
              )}
            </div>

            {/* Dynamic Variants (Mandatory options) */}
            {product.variants?.map((variantGroup) => (
              <div key={variantGroup.id} className="pt-2 border-t border-stone-800">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-sm font-semibold text-stone-200">
                    {variantGroup.name}
                  </span>
                  {variantGroup.required && (
                    <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400">
                      Obligatorio
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {variantGroup.options.map((opt) => {
                    const isSelected = selectedVariants[variantGroup.id] === opt.id;
                    return (
                      <label
                        key={opt.id}
                        onClick={() => handleVariantSelect(variantGroup.id, opt.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-stone-100 shadow-sm shadow-amber-500/10'
                            : 'bg-stone-950/50 border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-amber-400 bg-amber-500'
                                : 'border-stone-600 bg-stone-900'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                          </div>
                          <span className="text-xs sm:text-sm font-medium">{opt.name}</span>
                        </div>
                        {opt.priceDelta > 0 && (
                          <span className="font-mono text-xs font-semibold text-amber-300">
                            +{formatCurrency(opt.priceDelta)}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Dynamic Add-Ons (Optional with price updates) */}
            {product.addOns?.map((addonGroup) => (
              <div key={addonGroup.id} className="pt-2 border-t border-stone-800">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-sm font-semibold text-stone-200">
                    {addonGroup.name}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Opcional {addonGroup.maxSelect ? `(Máx. ${addonGroup.maxSelect})` : ''}
                  </span>
                </div>

                <div className="space-y-2">
                  {addonGroup.options.map((opt) => {
                    const isSelected = selectedAddOns.includes(opt.id);
                    return (
                      <label
                        key={opt.id}
                        onClick={() => handleToggleAddOn(opt.id, addonGroup.maxSelect)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-stone-100 shadow-sm'
                            : 'bg-stone-950/50 border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                              isSelected
                                ? 'border-amber-400 bg-amber-500 text-stone-950'
                                : 'border-stone-600 bg-stone-900'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs sm:text-sm font-medium">{opt.name}</span>
                        </div>
                        <span className="font-mono text-xs font-semibold text-amber-300">
                          +{formatCurrency(opt.priceDelta)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Removable Ingredients ("Quitar ingredientes") */}
            {product.removableIngredients && product.removableIngredients.length > 0 && (
              <div className="pt-2 border-t border-stone-800">
                <span className="text-sm font-semibold text-stone-200 block mb-2">
                  Personalizar ingredientes (Retirar del platillo)
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.removableIngredients.map((ing) => {
                    const isRemoved = removedIngredients.includes(ing);
                    return (
                      <button
                        key={ing}
                        onClick={() => handleToggleRemoveIngredient(ing)}
                        className={`min-h-[36px] px-3 rounded-lg text-xs font-medium transition-all ${
                          isRemoved
                            ? 'bg-red-950/70 border border-red-500/50 text-red-300 line-through'
                            : 'bg-stone-950/60 border border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {isRemoved ? `Sin ${ing}` : `Quitar ${ing}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions Input */}
            <div className="pt-2 border-t border-stone-800">
              <label htmlFor="notes" className="text-sm font-semibold text-stone-200 block mb-1.5">
                Instrucciones especiales para cocina
              </label>
              <textarea
                id="notes"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Ejemplo: Salsa por separado, sin hielo en la bebida, término muy sellado..."
                rows={2}
                className="w-full p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 shrink-0 flex items-center justify-between gap-3">
          {/* Quantity Stepper */}
          {enableOrdering ? (
            <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Disminuir cantidad"
                disabled={quantity <= 1}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-stone-300 hover:text-white disabled:opacity-40 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono text-sm font-bold text-stone-100 w-8 text-center tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar cantidad"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-stone-300 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-xs text-stone-400">
              Modo consulta de menú
            </div>
          )}

          {/* Submit Button */}
          {enableOrdering ? (
            <button
              onClick={handleAddSubmit}
              className="flex-1 min-h-[48px] px-4 rounded-xl font-semibold text-sm bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-stone-950 flex items-center justify-between shadow-lg shadow-amber-500/10 transition-all"
            >
              <span>Agregar a mi orden</span>
              <span className="font-mono font-bold">{formatCurrency(totalPrice)}</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 min-h-[48px] px-4 rounded-xl font-semibold text-sm bg-stone-800 hover:bg-stone-700 text-stone-100 flex items-center justify-center transition-all"
            >
              Volver a la carta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
