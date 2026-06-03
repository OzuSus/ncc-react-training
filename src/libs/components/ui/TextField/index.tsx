import { memo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import type { ComponentProps } from 'react';

interface ITextFieldProps extends ComponentProps<typeof TextField> {
  label?: string;
}

export function CustomTextField({
  label,
  type = 'text',
  sx,
  slotProps,
  ...restProps
}: ITextFieldProps) {
  return (
    <Box>
      <Typography sx={{ color: 'black', fontSize: '16px', fontWeight: 400 }}>
        {label}
      </Typography>

      <TextField
        type={type}
        sx={[
          {
            '& .MuiInputBase-root': {
              borderRadius: '10px',
              minHeight: '58px',
              fontSize: '16px',
            },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#4680FF',
              },
            },
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        slotProps={slotProps}
        {...restProps}
      />
    </Box>
  );
}

export default memo(CustomTextField);
