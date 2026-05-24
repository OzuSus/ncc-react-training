import React from 'react';
import { Box } from '@mui/material';
import { CustomTypography } from '@/libs/components/ui/Typography';

interface IformRowProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}
export default function FormRow({ label, required, children }: IformRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
      <Box sx={{ width: 140, flexShrink: 0 }}>
        <CustomTypography
          component="div"
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: '#222',
          }}
        >
          {label}
          {required && (
            <span style={{ color: '#e53935', marginLeft: 2 }}>*</span>
          )}
        </CustomTypography>
      </Box>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}
