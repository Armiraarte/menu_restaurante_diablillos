import hero from '../assets/images/hero_restaurant_cover_1791647053690.jpg';
import tacos from '../assets/images/dish_tacos_gourmet_1791647093985.jpg';
import steak from '../assets/images/dish_prime_steak_1791647084646.jpg';
import burger from '../assets/images/dish_gourmet_burger_1791647063635.jpg';
import pizza from '../assets/images/dish_woodfired_pizza_1791647074258.jpg';
import cocktail from '../assets/images/dish_signature_cocktail_1791651976795.jpg';
import dessert from '../assets/images/dish_luxury_dessert_1791651966647.jpg';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  /** 0 = nada, 1 = picosito, 2 = muy picante */
  spicy?: number;
  tag?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  dishes: Dish[];
}

export const RESTAURANT = {
  name: 'Cenaduría Los Diablitos',
  initials: 'LD',
  tagline: 'Menú',
};

// Platillos y precios de ejemplo: reemplazar por los reales.
export const CATEGORIES: MenuCategory[] = [
  {
    id: 'entradas',
    name: 'Entradas',
    description: 'Para abrir el apetito',
    image: hero,
    dishes: [
      { id: 'guacamole', name: 'Guacamole con totopos', description: 'Aguacate machacado al momento, cebolla, cilantro y chile serrano.', price: 95 },
      { id: 'queso-fundido', name: 'Queso fundido con chorizo', description: 'Queso Oaxaca gratinado con chorizo, servido con tortillas de harina.', price: 120, tag: 'Favorito' },
      { id: 'tostadas-tinga', name: 'Tostadas de tinga', description: 'Tres tostadas con tinga de pollo, crema, queso fresco y lechuga.', price: 85 },
      { id: 'elote', name: 'Elote asado', description: 'Con mayonesa, queso cotija, chile en polvo y limón.', price: 55, spicy: 1 },
    ],
  },
  {
    id: 'tacos',
    name: 'Tacos',
    description: 'Tortilla hecha a mano',
    image: tacos,
    dishes: [
      { id: 'pastor', name: 'Tacos al pastor', description: 'Cinco tacos de trompo con piña, cebolla y cilantro.', price: 90, tag: 'Favorito' },
      { id: 'asada', name: 'Tacos de asada', description: 'Cuatro tacos de res a la brasa con guacamole y cebollitas.', price: 110 },
      { id: 'dorados', name: 'Tacos dorados de papa', description: 'Cuatro tacos crujientes con crema, queso y salsa verde.', price: 75 },
      { id: 'diablitos', name: 'Tacos Diablitos', description: 'Cuatro tacos de costilla bañados en salsa de chile de árbol.', price: 115, spicy: 2, tag: 'De la casa' },
    ],
  },
  {
    id: 'cortes',
    name: 'Cortes',
    description: 'Al carbón y leña',
    image: steak,
    dishes: [
      { id: 'arrachera', name: 'Arrachera', description: '300 g marinada, con cebollitas, nopal asado y frijoles charros.', price: 260 },
      { id: 'ribeye', name: 'Rib eye', description: '350 g al carbón, con papa al horno y chiles toreados.', price: 390, tag: 'Favorito' },
      { id: 'costilla', name: 'Costilla a la brasa', description: 'Costilla de res glaseada con salsa de chipotle.', price: 290, spicy: 1 },
      { id: 'parrillada', name: 'Parrillada para dos', description: 'Arrachera, chorizo, pollo, queso asado y guarniciones.', price: 620 },
    ],
  },
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    description: 'Pan brioche artesanal',
    image: burger,
    dishes: [
      { id: 'clasica', name: 'Clásica', description: 'Carne de res, queso americano, lechuga, jitomate y papas.', price: 140 },
      { id: 'diabla', name: 'La Diabla', description: 'Jalapeños asados, queso pepper jack y mayonesa de chipotle.', price: 165, spicy: 2, tag: 'De la casa' },
      { id: 'bbq', name: 'BBQ con tocino', description: 'Tocino crujiente, aros de cebolla y salsa BBQ ahumada.', price: 170 },
    ],
  },
  {
    id: 'pizzas',
    name: 'Pizzas',
    description: 'Horno de leña',
    image: pizza,
    dishes: [
      { id: 'margarita', name: 'Margarita', description: 'Salsa de jitomate, mozzarella fresca y albahaca.', price: 160 },
      { id: 'pastor-pizza', name: 'Al pastor', description: 'Carne al pastor, piña asada, cebolla y cilantro.', price: 190 },
      { id: 'infierno', name: 'Infierno', description: 'Pepperoni, jalapeño, chile de árbol y miel picante.', price: 210, spicy: 2, tag: 'De la casa' },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    description: 'Coctelería y más',
    image: cocktail,
    dishes: [
      { id: 'agua', name: 'Agua fresca', description: 'Horchata, jamaica o del día.', price: 35 },
      { id: 'refresco', name: 'Refresco', description: 'Variedad de sabores.', price: 30 },
      { id: 'michelada', name: 'Michelada', description: 'Cerveza con limón, salsas y escarchado de chile.', price: 75, spicy: 1 },
      { id: 'margarita-coctel', name: 'Margarita', description: 'Tequila, licor de naranja y limón. Natural o de sabor.', price: 95 },
      { id: 'cafe', name: 'Café de olla', description: 'Con canela y piloncillo.', price: 35 },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    description: 'El cierre dulce',
    image: dessert,
    dishes: [
      { id: 'churros', name: 'Churros con cajeta', description: 'Recién hechos, con azúcar y canela.', price: 70 },
      { id: 'flan', name: 'Flan napolitano', description: 'Receta de la casa con caramelo.', price: 60 },
      { id: 'tres-leches', name: 'Pastel de tres leches', description: 'Esponjoso y bañado en tres leches.', price: 75 },
      { id: 'volcan', name: 'Volcán de chocolate', description: 'Centro de chocolate fundido con helado de vainilla.', price: 95, tag: 'Favorito' },
    ],
  },
];
