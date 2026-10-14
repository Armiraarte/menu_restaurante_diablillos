import React, { useState } from 'react';
import { RestaurantInfo } from '../types/menu';
import { Wifi, Bell, QrCode, Clock, MapPin, Phone, Check, Copy } from 'lucide-react';

interface HeaderProps {
  restaurant: RestaurantInfo;
  tableNumber: string;
  onOpenCallWaiter: () => void;
  onOpenQrModal: () => void;
  onOpenConfig: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  restaurant,
  tableNumber,
  onOpenCallWaiter,
  onOpenQrModal,
  onOpenConfig,
}) => {
  const [showWifiModal, setShowWifiModal] = useState(false);
  const [copiedWifi, setCopiedWifi] = useState(false);

  const copyPassword = () => {
    if (restaurant.wifiPassword) {
      navigator.clipboard.writeText(restaurant.wifiPassword);
      setCopiedWifi(true);
      setTimeout(() => setCopiedWifi(false), 2000);
    }
  };

  return (
    <header className="relative w-full overflow-hidden bg-stone-950 text-stone-100">
      {/* Top action bar: Clean single row */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-display font-bold text-amber-400 text-sm tracking-wider">
            {restaurant.logoText}
          </div>
          <span className="font-display font-semibold tracking-tight text-stone-100 text-base">
            {restaurant.name}
          </span>
          <span className="hidden sm:inline-block text-xs text-stone-500 font-normal">
            · {tableNumber ? `Mesa ${tableNumber}` : 'Menú en Sala'}
          </span>
        </div>

        {/* Action icons with accessible 44px min hitboxes */}
        <div className="flex items-center gap-1">
          {restaurant.wifiPassword && (
            <button
              onClick={() => setShowWifiModal(true)}
              aria-label="Ver red WiFi"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-900 transition-colors"
              title="WiFi del restaurante"
            >
              <Wifi className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onOpenQrModal}
            aria-label="Ver código QR de la mesa"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-900 transition-colors"
            title="Código QR de la mesa"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCallWaiter}
            aria-label="Llamar al mesero"
            className="min-h-[44px] px-3 flex items-center gap-1.5 rounded-lg text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all active:scale-95"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Mesero</span>
          </button>

          <button
            onClick={onOpenConfig}
            aria-label="Personalizar menú"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-900 transition-colors"
            title="Opciones de restaurante"
          >
            <span className="w-2 h-2 rounded-full bg-stone-600 hover:bg-amber-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Cinematic Cover Banner */}
      <div className="relative h-48 sm:h-60 md:h-72 w-full overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-700 ease-out"
        />
        {/* Measured dark scrim for typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-black/30" />

        {/* Banner Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 max-w-5xl mx-auto flex flex-col justify-end">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300 mb-1.5 font-medium">
            <span>{restaurant.concept}</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-amber-400">{tableNumber ? `Mesa ${tableNumber}` : 'Salón Principal'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white mb-2 text-balance">
            {restaurant.name}
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>

          {/* Clean unboxed establishment metadata with typographic separators */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{restaurant.openingHours}</span>
            </span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              <span className="truncate max-w-[200px] sm:max-w-none">{restaurant.address}</span>
            </span>
            <span aria-hidden="true" className="text-stone-700 hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>{restaurant.phone}</span>
            </span>
          </div>
        </div>
      </div>

      {/* WiFi Modal */}
      {showWifiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-800 p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2 text-amber-400">
                <Wifi className="w-5 h-5" />
                <h3 className="font-display font-semibold text-stone-100">WiFi para Clientes</h3>
              </div>
              <button
                onClick={() => setShowWifiModal(false)}
                className="text-stone-400 hover:text-stone-100 text-sm font-medium p-1"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <span className="text-xs text-stone-400 block mb-0.5">Red:</span>
                <span className="font-mono text-sm text-stone-100 font-semibold">{restaurant.wifiNetwork}</span>
              </div>
              <div>
                <span className="text-xs text-stone-400 block mb-0.5">Contraseña:</span>
                <div className="flex items-center justify-between bg-stone-950 px-3 py-2 rounded-lg border border-stone-800">
                  <span className="font-mono text-sm text-amber-300 font-semibold">{restaurant.wifiPassword}</span>
                  <button
                    onClick={copyPassword}
                    className="flex items-center gap-1 text-xs text-stone-300 hover:text-white px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 transition-colors"
                  >
                    {copiedWifi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWifi ? 'Copiada' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-stone-500 text-center">
              Conexión de cortesía de alta velocidad para clientes de {restaurant.name}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
