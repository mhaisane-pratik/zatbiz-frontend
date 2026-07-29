/**
 * hotelThemes.ts
 * ---------------
 * Shared config + data for the Hotel & Resort template.
 * Four visually DISTINCT themes. Each theme drives its own landing layout,
 * plus themed login and dashboard. Kept isolated from other niche templates.
 */

export type HotelThemeId = 'azure' | 'noir' | 'terra' | 'metro';

export interface HotelTheme {
  id: HotelThemeId;
  name: string;          // display name in the gallery
  hotelName: string;     // sample hotel brand
  tagline: string;
  propertyType: string;  // Beach Resort / Boutique / Villa / Business Hotel
  vibe: string;          // one-line style description
  accent: string;        // primary color
  accent2: string;       // secondary color (gradients)
  bg: string;            // page background
  surface: string;       // card background
  text: string;          // main text color
  muted: string;         // muted text color
  border: string;        // border color
  radius: string;        // border radius token (e.g. '1rem')
  heroImage: string;
  emoji: string;
}

export const HOTEL_THEMES: HotelTheme[] = [
  {
    id: 'azure',
    name: 'Azure Bay',
    hotelName: 'Azure Bay Hotel & Resort',
    tagline: 'Where every stay feels like a getaway.',
    propertyType: 'Beach Resort',
    vibe: 'Bright, airy, coastal — sky-blue accents on clean white.',
    accent: '#0ea5e9',
    accent2: '#22d3ee',
    bg: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0',
    radius: '1rem',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop&q=80',
    emoji: '🏖️',
  },
  {
    id: 'noir',
    name: 'Noir Luxe',
    hotelName: 'The Noir Boutique',
    tagline: 'Quiet luxury, unforgettable nights.',
    propertyType: 'Boutique Hotel',
    vibe: 'Dark, elegant, editorial — gold on charcoal.',
    accent: '#d4af37',
    accent2: '#f5d67a',
    bg: '#0b0b0f',
    surface: '#16161d',
    text: '#f5f5f4',
    muted: '#a1a1aa',
    border: '#2a2a35',
    radius: '0.5rem',
    heroImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&auto=format&fit=crop&q=80',
    emoji: '🖤',
  },
  {
    id: 'terra',
    name: 'Terra Villa',
    hotelName: 'Terra Verde Villas',
    tagline: 'Slow mornings in nature’s embrace.',
    propertyType: 'Villa & Homestay',
    vibe: 'Warm, earthy, organic — terracotta on cream with soft curves.',
    accent: '#c2643f',
    accent2: '#e2a05f',
    bg: '#faf6f0',
    surface: '#fffdf9',
    text: '#3f2d24',
    muted: '#8a7566',
    border: '#ece0d3',
    radius: '1.5rem',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80',
    emoji: '🌿',
  },
  {
    id: 'metro',
    name: 'Metro Stay',
    hotelName: 'Metro Grand Hotel',
    tagline: 'Smart stays for the modern traveller.',
    propertyType: 'Business Hotel',
    vibe: 'Minimal, sharp, corporate — indigo on soft grey, tight grid.',
    accent: '#4f46e5',
    accent2: '#6366f1',
    bg: '#f4f4f5',
    surface: '#ffffff',
    text: '#18181b',
    muted: '#71717a',
    border: '#e4e4e7',
    radius: '0.75rem',
    heroImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&auto=format&fit=crop&q=80',
    emoji: '🏙️',
  },
];

export function getHotelTheme(id: HotelThemeId): HotelTheme {
  return HOTEL_THEMES.find((t) => t.id === id) ?? HOTEL_THEMES[0];
}

export interface HotelRoom {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  size: string;
  image: string;
  perks: string[];
}

export const HOTEL_ROOMS: HotelRoom[] = [
  {
    id: 'deluxe-king',
    name: 'Deluxe King Room',
    type: 'Deluxe',
    price: 4200,
    capacity: 2,
    size: '32 m²',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&auto=format&fit=crop&q=80',
    perks: ['King bed', 'City view', 'Free WiFi', 'Breakfast'],
  },
  {
    id: 'twin-standard',
    name: 'Standard Twin Room',
    type: 'Standard',
    price: 3100,
    capacity: 2,
    size: '26 m²',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&auto=format&fit=crop&q=80',
    perks: ['Two beds', 'Work desk', 'Free WiFi'],
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    type: 'Suite',
    price: 7800,
    capacity: 3,
    size: '52 m²',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&auto=format&fit=crop&q=80',
    perks: ['Living area', 'Ocean view', 'Lounge access', 'Breakfast'],
  },
  {
    id: 'family-suite',
    name: 'Family Garden Suite',
    type: 'Suite',
    price: 6400,
    capacity: 4,
    size: '48 m²',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&auto=format&fit=crop&q=80',
    perks: ['Two rooms', 'Garden view', 'Kids welcome', 'Breakfast'],
  },
  {
    id: 'presidential',
    name: 'Presidential Villa',
    type: 'Villa',
    price: 15200,
    capacity: 5,
    size: '120 m²',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&auto=format&fit=crop&q=80',
    perks: ['Private pool', 'Butler service', 'Panoramic view', 'All meals'],
  },
  {
    id: 'cozy-single',
    name: 'Cozy Single Room',
    type: 'Standard',
    price: 2200,
    capacity: 1,
    size: '18 m²',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&auto=format&fit=crop&q=80',
    perks: ['Queen bed', 'Free WiFi', 'City view'],
  },
];

export const HOTEL_ROOM_TYPES = ['All', 'Standard', 'Deluxe', 'Suite', 'Villa'];

export const HOTEL_AMENITIES = [
  { icon: '🏊', label: 'Infinity pool' },
  { icon: '🍽️', label: 'Fine dining' },
  { icon: '💆', label: 'Spa & wellness' },
  { icon: '🅿️', label: 'Free parking' },
  { icon: '📶', label: 'High-speed WiFi' },
  { icon: '🏋️', label: 'Fitness center' },
];

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
