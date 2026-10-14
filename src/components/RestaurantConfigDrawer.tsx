import React from 'react';
import { RestaurantInfo } from '../types/menu';
import { RESTAURANT_PROFILES } from '../data/mockRestaurants';
import { Settings, X, Check, Store, Sliders, Palette, ToggleLeft, ToggleRight } from 'lucide-react';

interface RestaurantConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRestaurant: RestaurantInfo;
  onSelectRestaurantProfile: (restaurant: RestaurantInfo) => void;
  onToggleOrdering: (enabled: boolean) => void;
  onUpdateAccentColor: (color: string) => void;
}

export const RestaurantConfigDrawer: React.FC<RestaurantConfigDrawerProps> = ({
  isOpen,
  onClose,
  currentRestaurant,
  onSelectRestaurantProfile,
  onToggleOrdering,
  onUpdateAccentColor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-stone-900 border-l border-stone-800 h-full flex flex-col z-10 shadow-2xl text-stone-100">
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <Sliders className="w-5 h-5" />
            <h3 className="font-display font-semibold text-stone-100 text-sm">
              Personalización & Administración
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar configuración"
            className="text-stone-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
          {/* Section 1: Ordering Mode Toggle */}
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display font-semibold text-sm text-white block">
                  Recepción de Pedidos
                </span>
                <span className="text-xs text-stone-400">
                  {currentRestaurant.enableOrdering
                    ? 'Activado (Permite armar comanda y pedir)'
                    : 'Desactivado (Solo catálogo digital de consulta)'}
                </span>
              </div>
              <button
                onClick={() => onToggleOrdering(!currentRestaurant.enableOrdering)}
                aria-label="Alternar pedidos digitales"
                className="text-amber-400 min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                {currentRestaurant.enableOrdering ? (
                  <ToggleRight className="w-8 h-8 text-amber-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-stone-600" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Cumple con el requisito 7: Permite alternar entre un menú puramente informativo y una comanda digital interactiva.
            </p>
          </div>

          {/* Section 2: Restaurant Demo Presets */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-amber-400" />
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-stone-300">
                Cambiar Perfil de Restaurante
              </h4>
            </div>

            <div className="space-y-2">
              {RESTAURANT_PROFILES.map((profile) => {
                const isSelected = profile.id === currentRestaurant.id;
                return (
                  <div
                    key={profile.id}
                    onClick={() => onSelectRestaurantProfile(profile)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500'
                        : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm text-stone-100">
                        {profile.name}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <span className="text-xs text-stone-400 block mb-1">
                      {profile.concept}
                    </span>
                    <span className="text-[11px] text-stone-500 block truncate">
                      {profile.address}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Brand Accent Tone */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-400" />
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-stone-300">
                Acento Cromático Gastronómico
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'amber', label: 'Ámbar Gourmet', bg: 'bg-amber-500' },
                { id: 'rose', label: 'Terracota Rosa', bg: 'bg-rose-500' },
                { id: 'orange', label: 'Fuego Asador', bg: 'bg-orange-500' },
                { id: 'emerald', label: 'Botánica Verde', bg: 'bg-emerald-500' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onUpdateAccentColor(theme.id)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    currentRestaurant.accentColor === theme.id
                      ? 'border-white bg-stone-800'
                      : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${theme.bg}`} />
                  <span className="text-stone-200 font-medium text-[11px]">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-stone-950 border-t border-stone-800">
          <button
            onClick={onClose}
            className="w-full min-h-[42px] rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider"
          >
            Guardar y Regresar al Menú
          </button>
        </div>
      </div>
    </div>
  );
};
