import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../i18n";
import { getPersistedLanguage } from "../i18n/getPersistedLanguage";

interface AppState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: getPersistedLanguage(),
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
    }),
    { name: "app" },
  ),
);
