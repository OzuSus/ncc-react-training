import React, { useState } from 'react';
import { Box, InputAdornment, Menu, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import { CustomButton } from '@/components/ui/Button';
import { CustomTypography } from '@/components/ui/Typography';
import { ProjectStatus } from '@/features/project/types.ts';

export type TFilterOption = {
  label: string;
  value: string;
  count: number;
};

export const statusFilterMap: Record<
  string,
  { label: string; status?: number }
> = {
  active: { label: 'Active Projects', status: ProjectStatus.Active },
  deactive: { label: 'Deactive Projects', status: ProjectStatus.Deactive },
  all: { label: 'All Projects', status: undefined },
};

type TFilterProps = {
  options: TFilterOption[];
  selectedValue: string;
  onSelectFilter: (value: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function Filter({
  options,
  selectedValue,
  onSelectFilter,
  searchValue,
  onSearchChange,
}: TFilterProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedOption = options.find((o) => o.value === selectedValue);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenuSelect = () => {
    setAnchorEl(null);
  };
  const handleSelect = (value: string) => {
    onSelectFilter(value);
    handleCloseMenuSelect();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 2,
        borderBottom: '1px solid #eee',
      }}
    >
      <CustomButton
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          bgcolor: '#e53935',
          '&:hover': { bgcolor: '#c62828' },
          borderRadius: 2,
          fontWeight: 600,
          fontSize: 14,
          px: 2.5,
          height: 50,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          textTransform: 'none',
          boxShadow: 'none',
          lineHeight: 1,
          minHeight: 'unset',
        }}
      >
        New Project
      </CustomButton>

      <CustomButton
        variant="outlined"
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              transition: 'transform 0.2s',
              transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        }
        onClick={handleOpenMenu}
        sx={{
          minWidth: 220,
          height: 50,
          minHeight: 'unset',
          lineHeight: 1,
          justifyContent: 'space-between',
          border: `1px solid ${anchorEl ? '#4080f0' : '#c8d0e0'}`,
          borderRadius: 2,
          color: '#1d2630',
          fontWeight: 400,
          fontSize: 14,
          px: 2,
          bgcolor: '#fffefe',
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            bgcolor: '#fffefe',
            border: '1px solid #4080f0',
          },
        }}
      >
        {selectedOption.label} ({selectedOption.count})
      </CustomButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenuSelect}
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              border: '1px solid #e8edf5',
              borderRadius: 3,
              boxShadow: '0px 4px 16px rgba(0,0,0,0.08)',
              mt: 0.5,
              py: 0.5,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            sx={{
              fontSize: 14,
              py: 1.2,
              px: 2.5,
              '&:hover': { bgcolor: '#f5f7fc' },
            }}
          >
            <CustomTypography sx={{ fontSize: 14, color: '#333' }}>
              {`${option.label} (${option.count})`}
            </CustomTypography>
          </MenuItem>
        ))}
      </Menu>

      <TextField
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by client or project name"
        size="small"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#aab4c8', fontSize: 18 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            fontSize: 14,
            color: '#555',
            bgcolor: '#fffefe',
            height: 50,
            '& fieldset': {
              borderColor: '#c8d0e0',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#4080f0',
              borderWidth: '1px',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4080f0',
              borderWidth: '1.5px',
            },
          },
        }}
      />
    </Box>
  );
}
