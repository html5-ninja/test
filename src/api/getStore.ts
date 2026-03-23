import i18n from "../i18n";
import { mapStore } from "../mapper/storeMapper";
import { ApiResponse, Store } from "../model/store";

const API_URL = import.meta.env.VITE_API_URL;

export const getStore = async (): Promise<Store> => {
  const res = await fetch(`${API_URL}/data.json`);
  if (!res.ok)
    throw new Error(
      i18n.t("global.failedToFetchProducts", "Failed to fetch products"),
    );
  const data: ApiResponse = await res.json();
  return mapStore(data);
};
