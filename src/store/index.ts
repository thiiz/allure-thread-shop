
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, FilterOptions, SortOption } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(
          (i) => 
            i.product.id === item.product.id && 
            i.size === item.size && 
            i.color === item.color
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.product.id === item.product.id && i.size === item.size && i.color === item.color
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (productId, size, color) => 
        set((state) => ({
          items: state.items.filter(
            (item) => !(
              item.product.id === productId && 
              item.size === size && 
              item.color === color
            )
          ),
        })),
      updateQuantity: (productId, quantity, size, color) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

interface WishlistState {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get();
        const exists = items.some((i) => i.id === item.id);
        if (!exists) {
          set({ items: [...items, item] });
        }
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((i) => i.id === productId);
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);

interface FilterState {
  filters: FilterOptions;
  searchQuery: string;
  sortOption: SortOption;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: SortOption) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: {
    categories: [],
    priceRange: [0, 1000],
    brands: [],
    sizes: [],
    colors: [],
  },
  searchQuery: '',
  sortOption: 'newest',
  setFilters: (filters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...filters } 
    })),
  resetFilters: () => 
    set({ 
      filters: {
        categories: [],
        priceRange: [0, 1000],
        brands: [],
        sizes: [],
        colors: [],
      } 
    }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortOption: (option) => set({ sortOption: option }),
}));

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email, password) => {
        // Mock login for now - would connect to backend later
        if (email && password) {
          // Mock successful response
          set({ 
            isAuthenticated: true, 
            user: {
              id: '1',
              name: email.split('@')[0],
              email,
              role: email.includes('admin') ? 'admin' : 'customer'
            }
          });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
