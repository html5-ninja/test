import { Product } from "../model/store";

export const productMock: Product = {
  id: "P001",
  title: "Flame Lizard Plush",
  sku: "PLUSH-FL-001",
  price: 19.99,
  quantity: 120,
  points: 20,
  variations: [
    { type: "size", options: ["small", "medium", "large"] },
    { type: "color", options: ["orange", "shiny gold"] },
  ],
};
