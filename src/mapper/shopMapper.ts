import { ApiProduct, ApiResponse, Product, Shop } from "../model/shop";

const PAGE_SIZE = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE);

const mapProduct = (product: ApiProduct): Product => ({
  id: product.id,
  title: product.title,
  sku: product.sku,
  price: product.price,
  quantity: product.quantity,
  points: product.points,
  variations: product.variations,
  stock: product.quantity,
});

export const mapShop = (data: ApiResponse): Shop => {
  const products = data.products.map(mapProduct);
  return {
    name: data.store,
    currency: data.currency,
    products,
    // technily limit and offset should be handled by the backend, but since we have all products in memory, we can calculate pagination here
    pagination: {
      total: products.length,
      totalPages: Math.ceil(products.length / PAGE_SIZE),
      pageSize: PAGE_SIZE,
    },
  };
};
