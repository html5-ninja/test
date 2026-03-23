import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from ".";
import { productMock } from "../../mock/productMock";
import { Product } from "../../model/shop";

const product: Product = productMock;

test("renders product title", () => {
  render(<ProductCard product={product} currency="USD" cart={[]} />);
  expect(screen.getByText(productMock.title)).toBeInTheDocument();
});

test("decrements stock on add", () => {
  render(<ProductCard product={product} currency="USD" cart={[]} />);
  fireEvent.click(screen.getByText("Add to Cart"));
  expect(screen.getByText(`Stock: ${productMock.stock}`)).toBeInTheDocument();
});

test("disables button when quantity is 0", () => {
  render(
    <ProductCard
      product={{ ...product, quantity: 0 }}
      currency="USD"
      cart={[]}
    />,
  );
  expect(screen.getByText("Add to Cart")).toBeDisabled();
});
