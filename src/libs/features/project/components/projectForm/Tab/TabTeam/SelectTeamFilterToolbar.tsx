import {
  Autocomplete,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { CustomTextField } from '@/libs/components/ui/TextField';
import { MEMBER_TYPE_OPTIONS } from '@/libs/constants/member.ts';
import type { BranchFilterValue } from '@/libs/features/branch/types';

interface IBranchOption {
  id: BranchFilterValue;
  name: string;
}
interface ISelectTeamFilterToolbarProps {
  branchOptions: IBranchOption[];
  branchFilter: BranchFilterValue;
  typeFilter: number;
  rightSearch: string;
  loadingBranches: boolean;
  onBranchChange: (value: BranchFilterValue) => void;
  onTypeChange: (value: number) => void;
  onSearchChange: (value: string) => void;
}

export default function SelectTeamFilterToolbar({
  branchOptions,
  branchFilter,
  typeFilter,
  rightSearch,
  loadingBranches,
  onBranchChange,
  onTypeChange,
  onSearchChange,
}: ISelectTeamFilterToolbarProps) {
  const { t } = useTranslation();
  const getMemberTypeLabel = (value: number) => {
    switch (value) {
      case -1:
        return t('project.team.all');
      case 0:
        return t('project.team.memberTypes.staff');
      case 1:
        return t('project.team.memberTypes.internship');
      case 2:
        return t('project.team.memberTypes.collaborator');
      default:
        return '';
    }
  };
  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Box>
        <CustomTypography sx={{ fontSize: 11, color: '#888', mb: 0.3 }}>
          {t('project.team.branch')}
        </CustomTypography>
        <Autocomplete
          size="small"
          options={branchOptions}
          getOptionLabel={(opt) => opt.name}
          value={
            branchOptions.find((o) => o.id === branchFilter) ?? branchOptions[0]
          }
          onChange={(_, newVal) =>
            onBranchChange((newVal?.id ?? 'all') as BranchFilterValue)
          }
          disableClearable
          loading={loadingBranches}
          sx={{ width: 110 }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { height: 35, fontSize: 13 } }}
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps?.input,
                  endAdornment: (
                    <>
                      {loadingBranches ? (
                        <CircularProgress color="inherit" size={14} />
                      ) : null}
                      {params.slotProps?.input?.endAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              key={option.id}
              sx={{ fontSize: 13 }}
            >
              {option.name}
            </Box>
          )}
          slotProps={{
            listbox: { style: { maxHeight: 220 } },
          }}
          isOptionEqualToValue={(opt, val) => opt.id === val.id}
        />
      </Box>
      <Box>
        <CustomTypography sx={{ fontSize: 11, color: '#888', mb: 0.3 }}>
          {t('project.team.type')}
        </CustomTypography>
        <Select
          size="small"
          value={typeFilter}
          onChange={(e) => onTypeChange(Number(e.target.value))}
          sx={{ fontSize: 13, height: 35, minWidth: 60 }}
        >
          {MEMBER_TYPE_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>
              {getMemberTypeLabel(opt.value)}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ flex: 1, mt: 2 }}>
        <CustomTextField
          size="small"
          placeholder={t('project.team.searchByNameEmail')}
          value={rightSearch}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              minHeight: '18px',
              color: '#1d2630',
              fontSize: 14,
            },
          }}
        />
      </Box>
    </Box>
  );
}
