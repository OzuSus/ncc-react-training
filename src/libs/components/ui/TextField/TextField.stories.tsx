// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { CustomTextField } from '@/libs/components/ui/TextField/index.tsx';

const meta: Meta<typeof TextFieldComponent> = {
  title: 'Components/TextField',
  component: CustomTextField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'number'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    value: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextFieldComponent>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'duoc.phungvan@ncc.asia',
    type: 'text',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled textfield',
    placeholder: 'disabled',
    disabled: true,
  },
};
