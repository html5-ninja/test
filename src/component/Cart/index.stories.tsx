import type { Meta, StoryObj } from '@storybook/react';
import { useAppStore } from '../../store/useAppStore';
import Cart from '.';

const meta: Meta<typeof Cart> = {
  title: 'Components/Cart',
  component: Cart,
  tags: ['autodocs'],
  decorators: [

  ],
};

export default meta;
type Story = StoryObj<typeof Cart>;


export const Empty: Story = {
  decorators: [
    (Story) => {
      useAppStore.setState({ cart: [] });
      return <Story />;
    },
  ],
};
