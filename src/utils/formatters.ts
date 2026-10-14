import { CartItem, RestaurantInfo } from '../types/menu';

export const formatCurrency = (amount: number, currency: string = 'MXN'): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generateWhatsAppOrderUrl = (
  restaurant: RestaurantInfo,
  tableNumber: string,
  customerName: string,
  items: CartItem[],
  subtotal: number,
  notes?: string
): string => {
  const cleanPhone = restaurant.whatsapp.replace(/\D/g, '');
  
  let msg = `🍽️ *NUEVO PEDIDO DIGITAL — ${restaurant.name}*\n`;
  msg += `📍 *Mesa:* ${tableNumber || 'Sin mesa asignada'}\n`;
  if (customerName.trim()) {
    msg += `👤 *Comensal:* ${customerName.trim()}\n`;
  }
  msg += `⏰ *Hora:* ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}\n`;
  msg += `─────────────────────────\n`;

  items.forEach((item, index) => {
    msg += `*${item.quantity}x* ${item.product.name} — ${formatCurrency(item.totalPrice)}\n`;
    
    // Add variant details
    if (item.product.variants && Object.keys(item.selectedVariants).length > 0) {
      Object.entries(item.selectedVariants).forEach(([groupId, optId]) => {
        const group = item.product.variants?.find(g => g.id === groupId);
        const opt = group?.options.find(o => o.id === optId);
        if (opt) {
          msg += `  ▫ ${group?.name}: ${opt.name}\n`;
        }
      });
    }

    // Add add-ons details
    if (item.selectedAddOns.length > 0) {
      const addOnNames: string[] = [];
      item.product.addOns?.forEach(g => {
        g.options.forEach(o => {
          if (item.selectedAddOns.includes(o.id)) {
            addOnNames.push(`+ ${o.name} (${formatCurrency(o.priceDelta)})`);
          }
        });
      });
      if (addOnNames.length > 0) {
        msg += `  ➕ ${addOnNames.join(', ')}\n`;
      }
    }

    // Removed ingredients
    if (item.removedIngredients.length > 0) {
      msg += `  ❌ Sin: ${item.removedIngredients.join(', ')}\n`;
    }

    // Special instruction
    if (item.specialInstructions?.trim()) {
      msg += `  📝 Nota: "${item.specialInstructions.trim()}"\n`;
    }

    if (index < items.length - 1) {
      msg += `\n`;
    }
  });

  msg += `─────────────────────────\n`;
  msg += `💰 *TOTAL A PAGAR:* ${formatCurrency(subtotal)} MXN\n`;
  
  if (notes?.trim()) {
    msg += `💬 *Observaciones generales:* ${notes.trim()}\n`;
  }
  
  msg += `\n_Pedido enviado directamente desde el Menú Digital QR_`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
};
