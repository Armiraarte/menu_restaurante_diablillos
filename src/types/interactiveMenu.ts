export type DishTag = 'Recomendado' | 'Especialidad' | 'Nuevo' | 'Favorito del Chef';

export interface Dish {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  currency: string;
  image: string;
  secondaryImages?: string[];
  tag?: DishTag;
  available: boolean;
  order: number;
  ingredients: string[];
  pairing?: string;
  chefNote?: string;
  cookTime?: string;
  spicyLevel?: number; // 0: None, 1: Mild, 2: Hot
  calories?: number;
  layoutStyle: 'cinematic_bleed' | 'asymmetric_editorial' | 'magazine_split';
}

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  iconName: string;
  order: number;
  accentHue: string; // Tailwind gradient hue class
  accentColor: string; // Hex for borders/dots
  dishes: Dish[];
}

export interface RestaurantData {
  name: string;
  subtitle: string;
  welcomeMessage: string;
  coverImage: string;
  location: string;
  schedule: string;
  tableNumber: string;
}
