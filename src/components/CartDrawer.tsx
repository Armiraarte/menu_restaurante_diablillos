import React, { useState } from 'react';
import { CartItem, RestaurantInfo } from '../types/menu';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/formatters';
import { ShoppingBag, X, Plus, Minus, Trash2, Send, CheckCircle, MessageSquare } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  restaurant: RestaurantInfo;
  tableNumber: string;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  restaurant,
  tableNumber,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [orderSentSuccess, setOrderSentSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tipAmount = Math.round((subtotal * tipPercent) / 100);
  const grandTotal = subtotal + tipAmount;

  const handleSendWhatsApp = () => {
    const url = generateWhatsAppOrderUrl(
      restaurant,
      tableNumber,
      customerName,
      items,
      grandTotal,
      orderNotes
    );
    window.open(url, '_blank');
    setOrderSentSuccess(true);
  };

  const handleDirectConfirm = () => {
    setOrderSentSuccess(true);
  };

  const handleFinishOrder = () => {
    onClearCart();
    setOrderSentSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-stone-900 border-l border-stone-800 h-full flex flex-col z-10 shadow-2xl text-stone-100">
        {/* Drawer Header */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-stone-100">Mi Orden</h2>
              <span className="text-xs text-stone-400">
                {tableNumber ? `Mesa ${tableNumber}` : 'En mesa'} · {items.length} producto{items.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar orden"
            className="min-h-[40px] min-w-[40px] rounded-lg text-stone-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSentSuccess ? (
          /* Order Confirmation View */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-display font-bold text-white">
              ¡Comanda Generada con Éxito!
            </h3>

            <p className="text-sm text-stone-300 max-w-xs leading-relaxed">
              Tu pedido para la <strong className="text-amber-300">Mesa {tableNumber}</strong> ha sido preparado. El mesero y la cocina han recibido tu comanda.
            </p>

            <div className="w-full bg-stone-950 p-4 rounded-xl border border-stone-800 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between text-stone-400">
                <span>Total Comanda:</span>
                <span className="font-bold text-amber-300">{formatCurrency(grandTotal)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Estatus:</span>
                <span className="text-emerald-400">Enviada a comandas</span>
              </div>
            </div>

            <button
              onClick={handleFinishOrder}
              className="w-full mt-4 min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-colors"
            >
              Cerrar y seguir navegando
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center text-stone-600">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-display font-semibold text-stone-200">Tu orden está vacía</h3>
            <p className="text-xs text-stone-400 max-w-xs">
              Explora nuestra carta, personaliza tus platillos favoritos y agrégalos a tu mesa.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 rounded-xl bg-stone-800 text-stone-200 hover:bg-stone-700 text-xs font-semibold"
            >
              Ver platillos
            </button>
          </div>
        ) : (
          /* Active Cart Items & Details */
          <>
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-3.5 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display font-semibold text-sm text-stone-100">
                        {item.product.name}
                      </h4>
                      <span className="font-mono text-xs text-amber-400 font-medium">
                        {formatCurrency(item.unitPrice)} c/u
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      aria-label="Eliminar producto"
                      className="text-stone-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Customizations summary */}
                  <div className="text-[11px] text-stone-400 space-y-0.5">
                    {/* Selected variants */}
                    {Object.entries(item.selectedVariants).map(([groupId, optId]) => {
                      const group = item.product.variants?.find((g) => g.id === groupId);
                      const opt = group?.options.find((o) => o.id === optId);
                      return opt ? (
                        <div key={groupId} className="text-stone-300">
                          <span className="text-stone-500">{group?.name}:</span> {opt.name}
                        </div>
                      ) : null;
                    })}

                    {/* Selected add-ons */}
                    {item.selectedAddOns.length > 0 && (
                      <div className="text-amber-400/90">
                        + {item.selectedAddOns.map((id) => {
                          let name = id;
                          item.product.addOns?.forEach((g) => {
                            const found = g.options.find((o) => o.id === id);
                            if (found) name = found.name;
                          });
                          return name;
                        }).join(', ')}
                      </div>
                    )}

                    {/* Removals */}
                    {item.removedIngredients.length > 0 && (
                      <div className="text-red-400/90">
                        Sin: {item.removedIngredients.join(', ')}
                      </div>
                    )}

                    {/* Special instruction */}
                    {item.specialInstructions && (
                      <div className="italic text-stone-400">
                        "{item.specialInstructions}"
                      </div>
                    )}
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                    <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white"
                        aria-label="Disminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-xs font-bold text-stone-100 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-mono text-sm font-bold text-stone-100">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Customer Name & Notes */}
              <div className="pt-2 space-y-2.5">
                <div>
                  <label htmlFor="customerName" className="text-xs font-semibold text-stone-300 block mb-1">
                    Nombre o apodo del comensal (opcional)
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. Carlos / Familia López"
                    className="w-full h-9 px-3 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="orderNotes" className="text-xs font-semibold text-stone-300 block mb-1">
                    Nota general para el mesero / cocina
                  </label>
                  <input
                    id="orderNotes"
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Ej. Servir las entradas primero por favor"
                    className="w-full h-9 px-3 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Suggested Tip Selector */}
                <div>
                  <span className="text-xs font-semibold text-stone-300 block mb-1.5">
                    Propina sugerida para el servicio
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                    {[0, 10, 15, 20].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setTipPercent(pct)}
                        className={`h-8 rounded-lg border font-semibold transition-colors ${
                          tipPercent === pct
                            ? 'bg-amber-500 border-amber-500 text-stone-950'
                            : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {pct === 0 ? 'Sin propina' : `${pct}%`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Footer Total & Checkout */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal alimentos:</span>
                  <span className="font-mono">{formatCurrency(subtotal)}</span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between text-stone-400">
                    <span>Servicio ({tipPercent}%):</span>
                    <span className="font-mono">{formatCurrency(tipAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-stone-800/80">
                  <span>Total a pagar:</span>
                  <span className="font-mono text-amber-300 text-lg">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSendWhatsApp}
                  className="min-h-[44px] px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-900/20 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Pedir por WhatsApp</span>
                </button>

                <button
                  onClick={handleDirectConfirm}
                  className="min-h-[44px] px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-900/20 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar a Cocina</span>
                </button>
              </div>

              <div className="text-[11px] text-stone-500 text-center">
                El pago se realiza en mesa al mesero al finalizar su estancia.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
