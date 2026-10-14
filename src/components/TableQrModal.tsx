import React, { useState } from 'react';
import { RestaurantInfo } from '../types/menu';
import { QrCode, Copy, Check, ExternalLink, X, Smartphone } from 'lucide-react';

interface TableQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: RestaurantInfo;
  tableNumber: string;
  onUpdateTableNumber: (newTable: string) => void;
}

export const TableQrModal: React.FC<TableQrModalProps> = ({
  isOpen,
  onClose,
  restaurant,
  tableNumber,
  onUpdateTableNumber,
}) => {
  const [copied, setCopied] = useState(false);
  const [tempTable, setTempTable] = useState(tableNumber);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?mesa=${tempTable || '1'}`
    : `https://menu-digital.app?mesa=${tempTable || '1'}`;

  // Generate an authentic QR code SVG matrix representation using google charts / QR SVG data or direct dynamic SVG
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=FFFFFF&color=000000&margin=1`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyTable = (num: string) => {
    setTempTable(num);
    onUpdateTableNumber(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-sm rounded-3xl bg-stone-900 border border-stone-800 p-6 shadow-2xl z-10 text-stone-100 flex flex-col items-center text-center">
        <button
          onClick={onClose}
          aria-label="Cerrar modal QR"
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-amber-400 mb-1">
          <QrCode className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono">
            Acceso Rápido por Mesa
          </span>
        </div>

        <h3 className="font-display font-bold text-lg text-white">
          Menú QR para Mesas
        </h3>

        <p className="text-xs text-stone-400 mt-1 mb-4 max-w-xs">
          Los comensales escanean este código colocado en el soporte de mesa para abrir la carta sin descargar apps.
        </p>

        {/* Authentic Printable QR Stand Card */}
        <div className="w-full max-w-[240px] bg-white text-stone-900 rounded-2xl p-4 shadow-xl border border-stone-200 flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-amber-700 block">
              {restaurant.name}
            </span>
            <span className="text-[11px] font-semibold text-stone-600 block">
              Mesa {tempTable}
            </span>
          </div>

          {/* QR Code image with SVG fallback */}
          <div className="w-44 h-44 bg-stone-50 border border-stone-200 rounded-xl overflow-hidden flex items-center justify-center p-2">
            <img
              src={qrSvgUrl}
              alt={`Código QR Mesa ${tempTable}`}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="mt-3 flex items-center gap-1 text-[10px] text-stone-500 font-medium">
            <Smartphone className="w-3.5 h-3.5 text-stone-700" />
            <span>Escanea con tu cámara móvil</span>
          </div>
        </div>

        {/* Change table shortcut pills */}
        <div className="mt-5 w-full text-left">
          <span className="text-[11px] font-semibold text-stone-400 block mb-1.5">
            Cambiar identificador de mesa:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {['1', '4', '7', '12', 'Terraza 2', 'Barra 5'].map((table) => (
              <button
                key={table}
                onClick={() => handleApplyTable(table)}
                className={`min-h-[32px] px-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  tempTable === table
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-950 border border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                {table}
              </button>
            ))}
          </div>
        </div>

        {/* Copy Link Action */}
        <div className="mt-4 w-full flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 min-h-[42px] px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Enlace Copiado!' : 'Copiar URL de Mesa'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
