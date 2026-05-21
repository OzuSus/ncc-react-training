// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CustomCheckbox } from '@/libs/components/ui/CheckBox/index.tsx';

const meta: Meta<typeof CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CustomCheckbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Check me',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checkbox test',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'blablabla',
    checked: false,
    disabled: true,
  },
};

export const Interac = {
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked ?? false);

    return (
      <CheckboxComponent
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: 'Test Checkbox',
    checked: false,
  },
};
