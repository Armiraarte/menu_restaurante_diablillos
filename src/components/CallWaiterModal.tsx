import React, { useState } from 'react';
import { Bell, CreditCard, DollarSign, Utensils, HelpCircle, Check, X } from 'lucide-react';

interface CallWaiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string;
}

export const CallWaiterModal: React.FC<CallWaiterModalProps> = ({
  isOpen,
  onClose,
  tableNumber,
}) => {
  const [sentNotice, setSentNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRequest = (reason: string) => {
    setSentNotice(reason);
    setTimeout(() => {
      setSentNotice(null);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-800 p-5 shadow-2xl z-10 text-stone-100">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2 text-amber-400">
            <Bell className="w-5 h-5" />
            <h3 className="font-display font-semibold text-stone-100">Atención a la Mesa</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-stone-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sentNotice ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="font-display font-semibold text-base text-white">
              ¡Aviso Notificado!
            </h4>
            <p className="text-xs text-stone-300 max-w-xs mx-auto">
              El mesero asignado a la <strong>Mesa {tableNumber}</strong> ha sido notificado para: <br />
              <span className="text-amber-300 font-medium">"{sentNotice}"</span>.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-2.5">
            <p className="text-xs text-stone-400 mb-2">
              Selecciona qué necesitas para tu <strong>Mesa {tableNumber}</strong>:
            </p>

            <button
              onClick={() => handleRequest('Pedir la cuenta (Pago con Tarjeta)')}
              className="w-full min-h-[46px] px-3.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-800/60 text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-stone-200">
                  Pedir la cuenta (Terminal Tarjeta)
                </span>
              </div>
              <span className="text-stone-500 text-xs">→</span>
            </button>

            <button
              onClick={() => handleRequest('Pedir la cuenta (Pago en Efectivo)')}
              className="w-full min-h-[46px] px-3.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-800/60 text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-stone-200">
                  Pedir la cuenta (Efectivo)
                </span>
              </div>
              <span className="text-stone-500 text-xs">→</span>
            </button>

            <button
              onClick={() => handleRequest('Cubiertos, servilletas o vajilla adicional')}
              className="w-full min-h-[46px] px-3.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-800/60 text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Utensils className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-stone-200">
                  Cubiertos / Servilletas extra
                </span>
              </div>
              <span className="text-stone-500 text-xs">→</span>
            </button>

            <button
              onClick={() => handleRequest('Llamar mesero a la mesa para consulta')}
              className="w-full min-h-[46px] px-3.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-800/60 text-left flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-stone-200">
                  Llamar mesero a la mesa
                </span>
              </div>
              <span className="text-stone-500 text-xs">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
