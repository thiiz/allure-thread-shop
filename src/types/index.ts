
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  features?: string[];
  material?: string;
  rating?: number;
  reviews?: number;
  tags?: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'customer' | 'admin';
  cart: CartItem[];
  wishlist: Product[];
}

export type SortOption = 
  | 'price-low-to-high'
  | 'price-high-to-low'
  | 'newest'
  | 'popularity'
  | 'rating';

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  sizes: string[];
  colors: string[];
}
