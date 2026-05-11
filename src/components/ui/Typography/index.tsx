import * as React from 'react';
import { memo } from 'react';
import { Typography, TypographyProps } from '@mui/material';

export function CustomTypography({
  children,
  sx,
  color = 'black',
  ...restProps
}: TypographyProps) {
  return (
    <Typography
      sx={[
        {
          fontSize: '16px',
          fontWeight: 400,
          color: color,
        },
        sx,
      ]}
      {...restProps}
    >
      {children}
    </Typography>
  );
}

export default memo(CustomTypography);
