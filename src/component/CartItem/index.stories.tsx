import type { Meta, StoryObj } from "@storybook/react";
import CartItem from ".";

const meta: Meta<typeof CartItem> = {
  title: "Components/CartItem",
  component: CartItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Default: Story = {
  args: {
    product: {
      id: "P001",
      title: "Flame Lizard Plush",
      sku: "PLUSH-FL-001",
      price: 19.99,
      quantity: 2,
      points: 20,
      variations: [],
    },
    stock: 120,
    onRemove: () => null,
    onUpdateQuantity: () => null,
  },
};
