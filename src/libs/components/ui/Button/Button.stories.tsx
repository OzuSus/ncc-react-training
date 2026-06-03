// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import { CustomButton as ButtonComponent } from '@/libs/components/ui/Button/index.tsx';

const meta: Meta<typeof ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};
export default meta;

type Story = StoryObj<typeof ButtonComponent>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'contained',
    color: 'primary',
  },
};
export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
    color: 'primary',
  },
};
export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    color: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'contained',
    color: 'secondary',
  },
};
export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'contained',
    color: 'success',
    startIcon: <CheckIcon />,
  },
};
export const Error: Story = {
  args: {
    children: 'Delete',
    variant: 'contained',
    color: 'error',
    startIcon: <DeleteIcon />,
  },
};
export const WarningOutlined: Story = {
  args: {
    children: 'Warning',
    variant: 'outlined',
    color: 'warning',
    startIcon: <InfoIcon />,
  },
};
export const InfoText: Story = {
  args: {
    children: 'More info',
    variant: 'text',
    color: 'info',
    startIcon: <InfoIcon />,
  },
};
export const WithStartIcon: Story = {
  args: {
    children: 'Send',
    variant: 'contained',
    color: 'primary',
    startIcon: <SendIcon />,
  },
};
export const WithEndIcon: Story = {
  args: {
    children: 'Download',
    variant: 'contained',
    color: 'primary',
    endIcon: <DownloadIcon />,
  },
};
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'contained',
    color: 'primary',
    disabled: true,
  },
};
