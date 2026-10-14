import React from 'react';
import { RestaurantInfo } from '../types/menu';
import { MapPin, Phone, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  restaurant: RestaurantInfo;
  tableNumber: string;
}

export const Footer: React.FC<FooterProps> = ({ restaurant, tableNumber }) => {
  return (
    <footer className="w-full bg-stone-950 border-t border-stone-800/80 text-stone-400 py-10 px-4 mt-12 pb-24 sm:pb-16">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Brand identity & brief */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display font-bold text-lg text-white">
                {restaurant.name}
              </span>
              <span className="text-xs text-amber-400 font-mono">
                {tableNumber ? `· Mesa ${tableNumber}` : ''}
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-md">
              {restaurant.description}
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{restaurant.openingHours}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              <span>{restaurant.address}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>{restaurant.phone}</span>
            </span>
          </div>
        </div>

        {/* Allergen & Dietary Advisory Notice */}
        <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-stone-400">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-stone-200 block">
              Aviso sobre Alergias y Restricciones Alimentarias
            </span>
            <p className="leading-relaxed">
              Nuestros platillos se elaboran en una cocina viva donde se procesan frutos secos, mariscos, lácteos y cereales con gluten. Si usted o alguien en su mesa padece alguna alergia severa, favor de notificarlo a su mesero antes de ordenar.
            </p>
          </div>
        </div>

        {/* Bottom copyright and hygiene */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-400 pt-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ingredientes frescos locales con certificación de calidad sanitaria</span>
          </div>

          <div>
            Precios en Pesos Mexicanos (MXN) · I.V.A. incluido
          </div>
        </div>
      </div>
    </footer>
  );
};
