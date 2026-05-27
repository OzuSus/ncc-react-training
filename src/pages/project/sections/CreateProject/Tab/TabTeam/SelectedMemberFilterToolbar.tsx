import React from 'react';
import { Box, Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { CustomTextField } from '@/libs/components/ui/TextField';

interface ISelectedMemberFilterToolbarProps {
  showDeactive: boolean;
  showInactive: boolean;
  leftSearch: string;
  showAddPanel: boolean;
  onShowDeactiveChange: (val: boolean) => void;
  onShowInactiveChange: (val: boolean) => void;
  onSearchChange: (val: string) => void;
  onToggleAddPanel: () => void;
}

export default function SelectedMemberFilterToolbar({
  showDeactive,
  showInactive,
  leftSearch,
  showAddPanel,
  onShowDeactiveChange,
  onShowInactiveChange,
  onSearchChange,
  onToggleAddPanel,
}: ISelectedMemberFilterToolbarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 3,
        py: 1.5,
        flexWrap: 'wrap',
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={showDeactive}
            onChange={(e) => onShowDeactiveChange(e.target.checked)}
          />
        }
        label={
          <CustomTypography sx={{ fontSize: 14 }}>
            Show deactive member
          </CustomTypography>
        }
      />
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={showInactive}
            onChange={(e) => onShowInactiveChange(e.target.checked)}
          />
        }
        label={
          <CustomTypography sx={{ fontSize: 14 }}>
            Show Inactive user
          </CustomTypography>
        }
      />
      <CustomTextField
        size="small"
        placeholder="Search by name, email"
        value={leftSearch}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 16, color: '#aaa' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-root': {
            minHeight: '20px',
            color: '#1d2630',
            fontSize: 14,
          },
          minWidth: 350,
        }}
      />
      <CustomButton
        variant="contained"
        onClick={onToggleAddPanel}
        sx={{
          bgcolor: '#4680ff',
          '&:hover': { bgcolor: '#3f78ff' },
          fontSize: 13,
          height: 36,
        }}
      >
        {showAddPanel ? 'Exit add' : 'Add users'}
      </CustomButton>
    </Box>
  );
}
