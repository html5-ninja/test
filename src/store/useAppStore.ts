import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../i18n";
import { getPersistedLanguage } from "../i18n/getPersistedLanguage";
import { Product } from "../model/store";

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  language: string;
  setLanguage: (lang: string) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: getPersistedLanguage(),
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === product.id);
          return {
            cart: existing
              ? state.cart.map((i) =>
                  i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
                )
              : [...state.cart, { ...product, quantity: 1 }],
          };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
    }),
    { name: "app" },
  ),
);
