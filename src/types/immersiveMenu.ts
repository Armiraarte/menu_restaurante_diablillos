export interface CulinaryChapter {
  id: string;
  numberRoman: string; // e.g. "I", "II", "III"
  title: string;
  subtitle: string;
  description: string;
  accentHue: string;
}

export type CompositionLayout = 'cinematic_bleed' | 'asymmetric_sculptural' | 'editorial_split';

export interface CulinaryDish {
  id: string;
  chapterId: string;
  chapterNumber: string;
  chapterTitle: string;
  name: string;
  subtitle: string; // e.g. "450g High Choice · Añejamiento 28 días"
  description: string;
  price: number;
  currency: string;
  image: string;
  composition: CompositionLayout;
  bgGradient: string; // Subtle atmospheric ambient background
  accentColor: string;
  notes: {
    technique?: string; // e.g. "Brasa viva de mezquite a 400°C"
    pairing?: string; // e.g. "Vino Tinto Nebbiolo, Valle de Guadalupe"
    origin?: string; // e.g. "Sal marina de Cuyutlán, Colima"
    ingredients?: string[]; // e.g. ["Carne Wagyu", "Trufa negra", "Brioche"]
  };
}

export interface RestaurantEditorial {
  name: string;
  tagline: string;
  welcomeMessage: string;
  coverImage: string;
  location: string;
  chefQuote: string;
  tableNumber: string;
}
