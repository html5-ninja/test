import { ApiProduct, ApiResponse, Product, Store } from "../model/store";

const mapProduct = (product: ApiProduct): Product => ({
  id: product.id,
  title: product.title,
  sku: product.sku,
  price: product.price,
  quantity: product.quantity,
  points: product.points,
  variations: product.variations,
});

export const mapStore = (data: ApiResponse): Store => ({
  name: data.store,
  currency: data.currency,
  products: data.products.map(mapProduct),
});
