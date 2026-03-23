import type { Meta, StoryObj } from "@storybook/react";
import CartItem from ".";
import { productMock } from "../../mock/productMock";

const meta: Meta<typeof CartItem> = {
  title: "Components/CartItem",
  component: CartItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Default: Story = {
  args: {
    product: productMock,
    stock: 120,
    onRemove: () => null,
    onUpdateQuantity: () => null,
  },
};
