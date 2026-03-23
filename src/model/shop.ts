export interface ProductVariation {
  type: string;
  options: string[];
}

export interface ApiProduct {
  id: string;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  points: number;
  variations: ProductVariation[];
}

export interface ApiResponse {
  store: string;
  currency: string;
  products: ApiProduct[];
}

export interface Product {
  id: string;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  points: number;
  variations: ProductVariation[];
  stock: number;
}

export interface Shop {
  name: string;
  currency: string;
  products: Product[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  totalPages: number;
  pageSize: number;
}
