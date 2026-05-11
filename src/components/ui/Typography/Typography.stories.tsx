// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { CustomTypography } from '@/components/ui/Typography';

const meta: Meta<typeof TypographyComponent> = {
  title: 'Components/Typography',
  component: CustomTypography,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle1', 'body1'],
    },
    color: {
      control: 'text',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    fontSize: {
      control: 'text',
    },
    fontWeight: {
      control: 'text',
    },
    sx: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TypographyComponent>;

export const Default: Story = {
  args: {
    children: 'Test Typo',
    variant: 'subtitle1',
    align: 'right',
    color: '',
    sx: null,
    fontSize: '',
  },
};

export const Title: Story = {
  args: {
    children: 'Typography',
    variant: 'h4',

    sx: {
      fontSize: '16px',
      fontWeight: 400,
    },

    color: 'warning',
  },
};

export const SmallText: Story = {
  args: {
    children: 'Small text',
    variant: 'caption',
    sx: {
      fontSize: '12px',
      color: '#666',
    },
  },
};

export const ErrorText: Story = {
  args: {
    children: ' error message',
    variant: 'body2',
    color: 'error',
    sx: {
      fontWeight: 500,
    },
  },
};
