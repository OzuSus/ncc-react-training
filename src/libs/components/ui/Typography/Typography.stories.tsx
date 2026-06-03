// eslint-disable-next-line storybook/no-renderer-packages
import type { StoryObj } from '@storybook/react';
import { CustomTypography as TypographyComponent } from '@/libs/components/ui/Typography';

const meta = {
  title: 'Components/Typography',
  component: TypographyComponent,
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
