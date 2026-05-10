import { memo } from 'react';
import { Box, TextField, TextFieldProps, Typography } from '@mui/material';

interface ITextFieldProps extends TextFieldProps {
  label?: string;
}

export function TextFieldComponent({
  label,
  type = 'text',
  sx,
  ...restProps
}: ITextFieldProps) {
  return (
    <Box sx={{ mx: '16px' }}>
      <Typography
        sx={{ color: 'black', fontSize: '16px', fontWeight: 400, mb: '8px' }}
      >
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
          sx,
        ]}
        {...restProps}
      />
    </Box>
  );
}

export default memo(TextFieldComponent);
