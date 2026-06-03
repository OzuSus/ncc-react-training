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
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...restProps}
    >
      {children}
    </Typography>
  );
}

export default memo(CustomTypography);
