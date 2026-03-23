import i18n from "../i18n";
import { mapShop } from "../mapper/shopMapper";
import { ApiResponse, Shop } from "../model/shop";

const API_URL = import.meta.env.VITE_API_URL;

export const getShop = async (): Promise<Shop> => {
  const res = await fetch(`${API_URL}/data.json`);
  if (!res.ok)
    throw new Error(
      i18n.t("global.failedToFetchProducts", "Failed to fetch products"),
    );
  const data: ApiResponse = await res.json();
  return mapShop(data);
};
