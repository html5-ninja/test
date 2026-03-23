export const getPersistedLanguage = (): string => {
  try {
    const stored = localStorage.getItem("app");
    if (stored) return JSON.parse(stored).state?.language;
  } catch {
    return navigator.language.split("-")[0];
  }
  return navigator.language.split("-")[0];
};
