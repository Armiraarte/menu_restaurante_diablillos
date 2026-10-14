import { RestaurantInfo, Category, Product } from '../types/menu';

// Generated authentic high-definition culinary assets
export const ASSET_COVER = '/src/assets/images/hero_restaurant_cover_1791647053690.jpg';
export const ASSET_BURGER = '/src/assets/images/dish_gourmet_burger_1791647063635.jpg';
export const ASSET_PIZZA = '/src/assets/images/dish_woodfired_pizza_1791647074258.jpg';
export const ASSET_STEAK = '/src/assets/images/dish_prime_steak_1791647084646.jpg';
export const ASSET_TACOS = '/src/assets/images/dish_tacos_gourmet_1791647093985.jpg';

export const RESTAURANT_PROFILES: RestaurantInfo[] = [
  {
    id: 'fuego-olivo',
    name: 'Fuego & Olivo',
    concept: 'Bistró Gourmet & Asador de Leña',
    description: 'Cocina de autor al fuego directo, cortes premium añejados en casa, pasta fresca y coctelería botánica contemporánea.',
    coverImage: ASSET_COVER,
    logoText: 'F&O',
    address: 'Av. Providencia 2410, Zona Gastronómica',
    phone: '+52 33 3615 8820',
    whatsapp: '+523336158820',
    openingHours: 'Mar a Dom: 13:00 - 23:30',
    isOpen: true,
    closingTime: '23:30',
    wifiNetwork: 'Fuego_Olivo_Guest',
    wifiPassword: 'gourmetfuego2026',
    currency: 'MXN',
    accentColor: 'amber',
    enableOrdering: true,
  },
  {
    id: 'trattoria-nonna',
    name: 'Nonna Mia Trattoria',
    concept: 'Cucina Tradizionale & Pizzería Napolitana',
    description: 'Pizzas al horno de piedra volcánica, masa madre fermentada 48 horas e ingredientes importados de Campania.',
    coverImage: ASSET_PIZZA,
    logoText: 'NM',
    address: 'Calle Roma 45, Colonia Juárez',
    phone: '+52 55 5208 4411',
    whatsapp: '+525552084411',
    openingHours: 'Lun a Dom: 12:30 - 23:00',
    isOpen: true,
    closingTime: '23:00',
    wifiNetwork: 'Nonna_Mia_WiFi',
    wifiPassword: 'buonappetito',
    currency: 'MXN',
    accentColor: 'rose',
    enableOrdering: true,
  },
  {
    id: 'taqueria-volcanes',
    name: 'Los Volcanes Taquería',
    concept: 'Maíz Criollo & Brasas Tradicionales',
    description: 'Tacos de costilla cargada, tuétanos asados, salsas en molcajete de piedra volcánica y aguas frescas artesanales.',
    coverImage: ASSET_TACOS,
    logoText: 'LV',
    address: 'Av. Chapultepec 890, Cuauhtémoc',
    phone: '+52 55 5533 1290',
    whatsapp: '+525555331290',
    openingHours: 'Mié a Dom: 14:00 - 01:00',
    isOpen: true,
    closingTime: '01:00',
    wifiNetwork: 'Volcanes_Taqueria',
    wifiPassword: 'tacosconcostra',
    currency: 'MXN',
    accentColor: 'orange',
    enableOrdering: true,
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'esp', name: 'Especialidades', slug: 'especialidades', order: 1, active: true },
  { id: 'cor', name: 'Cortes & Brasas', slug: 'cortes', order: 2, active: true },
  { id: 'ham', name: 'Hamburguesas', slug: 'hamburguesas', order: 3, active: true },
  { id: 'piz', name: 'Pizzas al Horno', slug: 'pizzas', order: 4, active: true },
  { id: 'tac', name: 'Tacos & Antojos', slug: 'tacos', order: 5, active: true },
  { id: 'ent', name: 'Entradas', slug: 'entradas', order: 6, active: true },
  { id: 'beb', name: 'Bebidas de Autor', slug: 'bebidas', order: 7, active: true },
  { id: 'pos', name: 'Postres', slug: 'postres', order: 8, active: true },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-ribeye',
    categoryId: 'cor',
    name: 'Ribeye Prime al Carbón con Mantequilla de Ajo',
    description: '450g de corte High Choice bañado en mantequilla de hierbas aromáticas fundida en mesa, sal marina de Colima y espárragos tatemados.',
    price: 495,
    originalPrice: 540,
    image: ASSET_STEAK,
    badge: 'recomendado',
    available: true,
    prepTimeMinutes: 22,
    calories: 780,
    isGlutenFree: true,
    pairingNote: 'Recomendado con Vino Tinto Cabernet Sauvignon Valle de Guadalupe',
    variants: [
      {
        id: 'meat_term',
        name: 'Término de la Carne',
        required: true,
        options: [
          { id: 'term_rojo', name: 'Término Medio-Rojo (Sellado caliente)', priceDelta: 0 },
          { id: 'term_medio', name: 'Término Medio (Centro rosado jugoso)', priceDelta: 0 },
          { id: 'term_trescuartos', name: 'Tres Cuartos (3/4)', priceDelta: 0 },
          { id: 'term_bien', name: 'Bien Cocido', priceDelta: 0 },
        ],
        defaultOptionId: 'term_medio',
      },
      {
        id: 'side_choice',
        name: 'Guarnición Incluida',
        required: true,
        options: [
          { id: 'side_esparragos', name: 'Espárragos y papas al romero', priceDelta: 0 },
          { id: 'side_pure', name: 'Puré rústico con queso parmesano', priceDelta: 0 },
          { id: 'side_ensalada', name: 'Ensalada verde con vinagreta de jerez', priceDelta: 0 },
        ],
        defaultOptionId: 'side_esparragos',
      }
    ],
    addOns: [
      {
        id: 'addons_ribeye',
        name: 'Complementos Gourmet',
        maxSelect: 3,
        options: [
          { id: 'tuetano_extra', name: 'Hueso de Tuétano al carbón asado', priceDelta: 85 },
          { id: 'mantequilla_trufa', name: 'Mantequilla de Trufa Negra artesanal', priceDelta: 45 },
          { id: 'costra_queso', name: 'Costra de queso provolone ahumado', priceDelta: 50 },
        ],
      }
    ],
    removableIngredients: ['Mantequilla de hierbas', 'Sal en escamas', 'Espárragos'],
  },
  {
    id: 'prod-burger-wagyu',
    categoryId: 'ham',
    name: 'Hamburguesa Wagyu Trufada & Cheddar Añejo',
    description: '200g de carne Wagyu molida en casa, queso cheddar añejo 18 meses, tocino glaseado en maple, cebolla caramelizada y alioli de trufa en pan brioche.',
    price: 295,
    image: ASSET_BURGER,
    badge: 'popular',
    available: true,
    prepTimeMinutes: 15,
    calories: 890,
    pairingNote: 'Excelente maridaje con Cerveza Artesanal IPA o Stout',
    variants: [
      {
        id: 'burger_size',
        name: 'Selecciona el Tamaño',
        required: true,
        options: [
          { id: 'size_single', name: 'Individual (200g Wagyu)', priceDelta: 0 },
          { id: 'size_double', name: 'Doble Carne Wagyu (400g total)', priceDelta: 95 },
        ],
        defaultOptionId: 'size_single',
      },
      {
        id: 'burger_bread',
        name: 'Tipo de Pan',
        required: true,
        options: [
          { id: 'bread_brioche', name: 'Pan Brioche artesanal horneado hoy', priceDelta: 0 },
          { id: 'bread_sesame', name: 'Pan Rústico con sésamo negro', priceDelta: 0 },
          { id: 'bread_lettuce', name: 'Envuelto en Lechuga Francesa (Low Carb)', priceDelta: 0 },
        ],
        defaultOptionId: 'bread_brioche',
      }
    ],
    addOns: [
      {
        id: 'addons_burger',
        name: 'Extras y Aderezos',
        options: [
          { id: 'extra_bacon', name: 'Doble porción de Tocino crujiente', priceDelta: 40 },
          { id: 'extra_avocado', name: 'Aguacate tatemado Hass', priceDelta: 30 },
          { id: 'extra_papas_trufadas', name: 'Mejorar a Papas a la Trufa & Parmesano', priceDelta: 55 },
        ],
      }
    ],
    removableIngredients: ['Cebolla caramelizada', 'Alioli de trufa', 'Tocino ahumado', 'Quedar cheddar'],
  },
  {
    id: 'prod-pizza-margherita',
    categoryId: 'piz',
    name: 'Pizza Margherita D.O.P. al Horno de Leña',
    description: 'Masa madre de 48 horas, salsa de tomates San Marzano orgánicos, mozzarella di bufala fresca, hojas de albahaca viva y aceite de oliva virgen extra.',
    price: 265,
    image: ASSET_PIZZA,
    badge: 'recomendado',
    available: true,
    isVegetarian: true,
    prepTimeMinutes: 14,
    calories: 680,
    variants: [
      {
        id: 'pizza_size',
        name: 'Tamaño de Pizza',
        required: true,
        options: [
          { id: 'piz_individual', name: 'Mediana 30cm (Para 1-2 personas)', priceDelta: 0 },
          { id: 'piz_grande', name: 'Familiar 40cm (Para 3-4 personas)', priceDelta: 85 },
        ],
        defaultOptionId: 'piz_individual',
      }
    ],
    addOns: [
      {
        id: 'addons_pizza',
        name: 'Ingredientes Adicionales',
        options: [
          { id: 'extra_prosciutto', name: 'Prosciutto di Parma madurado 24 meses', priceDelta: 65 },
          { id: 'extra_burrata', name: 'Burrata fresca entera al centro', priceDelta: 90 },
          { id: 'extra_aceitunas', name: 'Aceitunas Kalamata maceradas', priceDelta: 25 },
        ],
      }
    ],
    removableIngredients: ['Albahaca fresca', 'Aceite de oliva virgen', 'Pimienta recién molida'],
  },
  {
    id: 'prod-tacos-costilla',
    categoryId: 'tac',
    name: 'Trilogía de Tacos de Costilla Blue Corn',
    description: 'Tres tacos en tortillas hechas a mano de maíz azul criollo, costilla de res confitada a fuego lento, puré de aguacate tatemado, cebollitas encurtidas y salsa molcajeteada.',
    price: 235,
    originalPrice: 260,
    image: ASSET_TACOS,
    badge: 'promocion',
    available: true,
    spicyLevel: 1,
    prepTimeMinutes: 12,
    calories: 620,
    isGlutenFree: true,
    variants: [
      {
        id: 'salsa_level',
        name: 'Salsa de Acompañamiento',
        required: true,
        options: [
          { id: 'salsa_verde', name: 'Salsa Verde tatemada (Picor suave)', priceDelta: 0 },
          { id: 'salsa_morita', name: 'Salsa Chile Morita ahumado (Picor medio)', priceDelta: 0 },
          { id: 'salsa_habanero', name: 'Salsa Habanero tatemado con ceniza (Muy picosa)', priceDelta: 0 },
        ],
        defaultOptionId: 'salsa_morita',
      }
    ],
    addOns: [
      {
        id: 'addons_tacos',
        name: 'Complementos de la Taquería',
        options: [
          { id: 'costra_quesillo', name: 'Base con Costra de Queso Oaxaca', priceDelta: 35 },
          { id: 'taco_extra', name: '1 Taco de Costilla adicional', priceDelta: 70 },
          { id: 'frijoles_charros', name: 'Orden de Frijolitos de la olla con veneno', priceDelta: 45 },
        ],
      }
    ],
    removableIngredients: ['Cilantro', 'Cebolla encurtida', 'Puré de aguacate'],
  },
  {
    id: 'prod-carpaccio-pulpo',
    categoryId: 'ent',
    name: 'Carpaccio de Pulpo del Golfo a las Finas Hierbas',
    description: 'Láminas finas de pulpo tiernas marinadas en cítricos de temporada, emulsión de alcaparras, láminas de rábano sandía y polvo de chile ancho.',
    price: 240,
    image: ASSET_COVER,
    badge: 'nuevo',
    available: true,
    isGlutenFree: true,
    prepTimeMinutes: 10,
    calories: 340,
    addOns: [
      {
        id: 'addons_carpaccio',
        name: 'Adicionales',
        options: [
          { id: 'crostinis_extra', name: 'Crostinis de masa madre tostados', priceDelta: 25 },
          { id: 'aceite_trufa', name: 'Gotas de aceite de trufa blanca', priceDelta: 35 },
        ]
      }
    ],
    removableIngredients: ['Chile ancho', 'Alcaparras', 'Rábano'],
  },
  {
    id: 'prod-tuetano-asado',
    categoryId: 'ent',
    name: 'Tuétano a la Leña con Escamoles y Sal Marina',
    description: 'Dos canoas de tuétano asadas al carbón de mezquite, acompañadas de chimichurri de la casa y tortillas calientes hechas al momento.',
    price: 220,
    image: ASSET_STEAK,
    available: true,
    isGlutenFree: true,
    prepTimeMinutes: 18,
    calories: 590,
  },
  {
    id: 'prod-mezcalita-maracuya',
    categoryId: 'beb',
    name: 'Mezcalita Ahumada de Maracuyá & Cardamomo',
    description: 'Mezcal espadín artesanal de Oaxaca, pulpa natural de maracuyá fresco, jarabe de cardamomo, escarchado de sal de gusano y chile piquín.',
    price: 175,
    originalPrice: 195,
    image: ASSET_COVER,
    badge: 'popular',
    available: true,
    spicyLevel: 1,
    prepTimeMinutes: 5,
    variants: [
      {
        id: 'mezcal_spirit',
        name: 'Estilo de Destilado',
        required: true,
        options: [
          { id: 'spirit_espadin', name: 'Mezcal Espadín 45°', priceDelta: 0 },
          { id: 'spirit_tobala', name: 'Mezcal Silvestre Tobalá (Premium)', priceDelta: 60 },
          { id: 'spirit_tequila', name: 'Tequila Reposado 100% Agave', priceDelta: 0 },
        ],
        defaultOptionId: 'spirit_espadin',
      }
    ],
    addOns: [
      {
        id: 'addons_cocktail',
        name: 'Opciones de Escarchado',
        options: [
          { id: 'sal_gusano', name: 'Sal de Gusano tradicional de Oaxaca', priceDelta: 0 },
          { id: 'sal_jamaica', name: 'Sal de Jamaica & Flor de Sal', priceDelta: 0 },
          { id: 'sin_escarcha', name: 'Sin escarchado', priceDelta: 0 },
        ]
      }
    ]
  },
  {
    id: 'prod-carajillo-43',
    categoryId: 'beb',
    name: 'Carajillo Shaken Licor 43 & Café de Altura',
    description: 'Café espresso recién extraído de Chiapas, Licor 43 batido en coctelera con hielo cristalino y twist de cáscara de naranja flambeada.',
    price: 160,
    image: ASSET_COVER,
    available: true,
    prepTimeMinutes: 4,
  },
  {
    id: 'prod-volcan-dulce-leche',
    categoryId: 'pos',
    name: 'Volcán Tibio de Dulce de Leche con Nieve Artesanal',
    description: 'Bizcocho horneado al momento con centro líquido caliente de dulce de leche artesanal, acompañado de helado de vainilla de Papantla.',
    price: 185,
    image: ASSET_BURGER,
    badge: 'recomendado',
    available: true,
    isVegetarian: true,
    prepTimeMinutes: 12,
    calories: 520,
    addOns: [
      {
        id: 'addons_dessert',
        name: 'Acompañamiento dulce',
        options: [
          { id: 'extra_helado', name: 'Bola extra de Helado de Vainilla', priceDelta: 40 },
          { id: 'frutos_rojos', name: 'Compota de Frutos Rojos silvestres', priceDelta: 30 },
        ]
      }
    ]
  },
  {
    id: 'prod-cheesecake-vasco',
    categoryId: 'pos',
    name: 'Tarta de Queso Vasca Tostada al Horno',
    description: 'Receta tradicional de San Sebastián con corazón cremoso y superficie caramelizada, toque de queso gorgonzola suave y coulis de zarzamora.',
    price: 175,
    image: ASSET_PIZZA,
    badge: 'popular',
    available: true,
    isVegetarian: true,
    prepTimeMinutes: 6,
    calories: 460,
  },
  {
    id: 'prod-promo-pareja',
    categoryId: 'esp',
    name: 'Experiencia Brasas para Dos & Botella de Vino',
    description: 'Incluye Ribeye Prime 450g al carbón + 2 Guarniciones rústicas + 1 Pizza Margherita al centro + Botella de Vino Tinto de la Casa.',
    price: 890,
    originalPrice: 1100,
    image: ASSET_STEAK,
    badge: 'promocion',
    available: true,
    prepTimeMinutes: 25,
  },
  {
    id: 'prod-atun-sellado',
    categoryId: 'esp',
    name: 'Medallón de Atún Aleta Azul en Costra de Ajonjolí',
    description: 'Atún fresco sellado en sartén de hierro colado con salsa ponzu de naranja agria, cremoso de aguacate y chips de raíz de loto.',
    price: 360,
    image: ASSET_TACOS,
    badge: 'nuevo',
    available: false, // Exemplifies "Agotado / Sold out" feature requested in prompt
    prepTimeMinutes: 15,
    calories: 410,
    isGlutenFree: true,
  }
];
