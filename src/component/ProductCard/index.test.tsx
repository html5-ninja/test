import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard, { Product } from ".";

const product: Product = {
  id: "P001",
  title: "Flame Lizard Plush",
  sku: "PLUSH-FL-001",
  price: 19.99,
  quantity: 2,
  points: 20,
  variations: [{ type: "size", options: ["small", "medium"] }],
};

test("renders product title", () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText("Flame Lizard Plush")).toBeInTheDocument();
});

test("decrements stock on add", () => {
  render(<ProductCard product={product} />);
  fireEvent.click(screen.getByText("Add to Cart"));
  expect(screen.getByText("Stock: 1")).toBeInTheDocument();
});

test("disables button when quantity is 0", () => {
  render(<ProductCard product={{ ...product, quantity: 0 }} />);
  expect(screen.getByText("Add to Cart")).toBeDisabled();
});
