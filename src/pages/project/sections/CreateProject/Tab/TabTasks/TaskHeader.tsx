import React, { memo } from 'react';
import { Box, Checkbox } from '@mui/material';
import { CustomTypography } from '@/libs/components/ui/Typography';

interface ITaskHeaderProps {
  allChecked: boolean;
  isIndeterminate: boolean;
  onToggleAll: () => void;
}

export function TaskHeader({
  allChecked,
  isIndeterminate,
  onToggleAll,
}: ITaskHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 1.5,
        borderBottom: '1px solid #eee',
      }}
    >
      <CustomTypography sx={{ flex: 1, fontSize: 14, fontWeight: 600 }}>
        Tasks
      </CustomTypography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 80,
        }}
      >
        <CustomTypography sx={{ fontSize: 14, fontWeight: 600 }}>
          Billable
        </CustomTypography>
        <Checkbox
          size="medium"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={onToggleAll}
          sx={{
            color: '#c5c4c4',
            '&.Mui-checked': { color: '#4680ff' },
            '&.MuiCheckbox-indeterminate': { color: '#4680ff' },
          }}
        />
      </Box>
    </Box>
  );
}

export default memo(TaskHeader);
