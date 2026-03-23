import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useAppStore } from "../../store/useAppStore";
import Cart from ".";

jest.mock("../../i18n", () => ({
  t: (key: string) => key,
}));

test("shows empty cart message", () => {
  useAppStore.setState({ cart: [] });
  render(
    <Cart cart={[]} removeFromCart={() => {}} updateQuantity={() => {}} />,
  );
  expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
});
