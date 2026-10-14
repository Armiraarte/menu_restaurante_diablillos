export type BadgeType = 'popular' | 'nuevo' | 'recomendado' | 'promocion';

export interface ProductVariantOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ProductVariantGroup {
  id: string;
  name: string;
  required: boolean;
  options: ProductVariantOption[];
  defaultOptionId?: string;
}

export interface ProductAddOnOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ProductAddOnGroup {
  id: string;
  name: string;
  maxSelect?: number;
  options: ProductAddOnOption[];
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: BadgeType;
  available: boolean;
  spicyLevel?: number; // 0: None, 1: Mild, 2: Medium, 3: Hot
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  prepTimeMinutes?: number;
  calories?: number;
  pairingNote?: string;
  variants?: ProductVariantGroup[];
  addOns?: ProductAddOnGroup[];
  removableIngredients?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  order: number;
  active: boolean;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  concept: string;
  description: string;
  coverImage: string;
  logoText: string;
  address: string;
  phone: string;
  whatsapp: string;
  openingHours: string;
  isOpen: boolean;
  closingTime?: string;
  wifiNetwork: string;
  wifiPassword?: string;
  currency: string;
  accentColor: string; // 'amber' | 'emerald' | 'rose' | 'orange'
  enableOrdering: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>; // variantGroupId -> optionId
  selectedAddOns: string[]; // addOnOptionId[]
  removedIngredients: string[];
  specialInstructions: string;
  unitPrice: number;
  totalPrice: number;
}

export interface ActiveFilter {
  searchQuery: string;
  selectedCategory: string; // 'all' or category id
  onlyVegetarian: boolean;
  onlyGlutenFree: boolean;
  onlySpicy: boolean;
  onlyPromos: boolean;
}
