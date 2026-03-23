import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from ".";
import { productMock } from "../../mock/productMock";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: productMock,
    currency: "USD",
    cart: [],
    onAddToCart: () => {},
  },
};
