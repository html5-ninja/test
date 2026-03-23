import i18n from "../i18n";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/data.json`);
  if (!res.ok)
    throw new Error(
      i18n.t("global.failedToFetchProducts", "error fetching products"),
    );
  const data = await res.json();
  return data.products;
};
