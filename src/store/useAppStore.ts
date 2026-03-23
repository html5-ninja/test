import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../i18n";
import { getPersistedLanguage } from "../i18n/getPersistedLanguage";
import { Product } from "../model/shop";
interface AppState {
  language: string;
  setLanguage: (lang: string) => void;
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
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
              : [
                  ...state.cart,
                  { ...product, quantity: 1, stock: product.quantity },
                ],
          };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((i) => i.id !== id)
              : state.cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
    }),
    { name: "app" },
  ),
);
