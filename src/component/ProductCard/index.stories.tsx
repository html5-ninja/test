import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from ".";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      id: "P001",
      title: "Flame Lizard Plush",
      sku: "PLUSH-FL-001",
      price: 19.99,
      quantity: 4,
      points: 20,
      variations: [
        { type: "size", options: ["small", "medium", "large"] },
        { type: "color", options: ["orange", "shiny gold"] },
      ],
    },
    currency: "USD",
    cart: [],
    onAddToCart: () => {},
  },
  
};
