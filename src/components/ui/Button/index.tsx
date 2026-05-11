import { memo } from 'react';
import { Button, ButtonProps } from '@mui/material';

export function CustomButton({
  children,
  color = 'primary',
  variant = 'contained',
  disabled = false,
  sx,
  ...restProps
}: ButtonProps) {
  return (
    <Button
      color={color}
      variant={variant}
      disabled={disabled}
      disableElevation
      sx={[
        {
          borderRadius: '8px',
          boxShadow: 'none',
          textTransform: 'none',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 400,
          px: 2,
          py: 1,
          minWidth: 'auto',
          '&:active': {
            transform: 'scale(0.98)',
            boxShadow: 'none',
          },
        },
        sx,
      ]}
      {...restProps}
    >
      {children}
    </Button>
  );
}

export default memo(CustomButton);
