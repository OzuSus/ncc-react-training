import React, { useCallback, useMemo, useState } from 'react';
import {
  Autocomplete,
  Box,
  Checkbox,
  CircularProgress,
  Collapse,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { useController, useFormContext } from 'react-hook-form';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import type {
  ICreateProjectForm,
  IProjectMember,
} from '@/pages/project/sections/CreateProject';
import { useMemberQuery } from '@/libs/features/member/hooks/useMemberQuery';
import { useBranchQuery } from '@/libs/features/branch/hooks/useBranchQuery';
import type { IMember } from '@/libs/features/member/types';
import { useDebounce } from '@/libs/hooks/useDebounce';
import { MEMBER_TYPE_OPTIONS } from '@/libs/constants/member.ts';
import type { MemberLookupMap } from '@/libs/features/member/types';
import { BranchFilterValue } from '@/libs/features/branch/types';
import SelectedMemberRow from '@/pages/project/sections/CreateProject/Tab/TabTeam/SelectedMemberRow.tsx';
import AvailableUserRow from '@/pages/project/sections/CreateProject/Tab/TabTeam/AvailableUserRow.tsx';
import { CustomTextField } from '@/libs/components/ui/TextField';
import { MemberRole } from '@/libs/features/member/types';

export default function TabTeam() {
  const { control } = useFormContext<ICreateProjectForm>();
  const { field: membersField } = useController({ name: 'members', control });
  const members: IProjectMember[] = membersField.value || [];

  const { data: allMembers = [], isLoading: loadingMembers } = useMemberQuery();
  const { data: branches = [], isLoading: loadingBranches } = useBranchQuery();

  const [showAddPanel, setShowAddPanel] = useState(false);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [showDeactive, setShowDeactive] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [leftSearch, setLeftSearch] = useState('');
  const debouncedLeftSearch = useDebounce(leftSearch, 150);

  const [branchFilter, setBranchFilter] = useState<BranchFilterValue>('all');
  const [typeFilter, setTypeFilter] = useState<number>(-1);
  const [rightSearch, setRightSearch] = useState('');
  const debouncedRightSearch = useDebounce(rightSearch, 150);

  const branchOptions = useMemo(
    () => [
      { id: 'all', name: 'All' },
      ...branches.map((b) => ({ id: b.id, name: b.name })),
    ],
    [branches],
  );

  const memberByIdMap: MemberLookupMap = useMemo(() => {
    const map = new Map<number, IMember>();
    allMembers.forEach((u) => map.set(u.id, u));
    return map;
  }, [allMembers]);

  const selectedIds = useMemo(
    () => new Set(members.map((m) => m.userId)),
    [members],
  );

  const availableMember = useMemo(() => {
    const search = debouncedRightSearch.trim().toLowerCase();
    return allMembers.filter((u) => {
      if (selectedIds.has(u.id)) return false;
      if (branchFilter !== 'all' && u.branchId !== branchFilter) return false;
      if (typeFilter !== -1 && u.type !== typeFilter) return false;
      if (search) {
        const name = (u.name ?? '').toLowerCase();
        const email = (u.emailAddress ?? '').toLowerCase();
        return name.includes(search) || email.includes(search);
      }
      return true;
    });
  }, [allMembers, selectedIds, branchFilter, typeFilter, debouncedRightSearch]);

  const displayMembers = useMemo(() => {
    const search = debouncedLeftSearch.trim().toLowerCase();
    return members.filter((m) => {
      if (!showDeactive && m.type === MemberRole.Deactive) return false;
      if (!showInactive) {
        const user = memberByIdMap.get(m.userId);
        if (user && user.isActive === false) return false;
      }
      if (search) {
        const name = (m.name ?? '').toLowerCase();
        const email = (m.emailAddress ?? '').toLowerCase();
        return name.includes(search) || email.includes(search);
      }
      return true;
    });
  }, [members, showDeactive, showInactive, debouncedLeftSearch, memberByIdMap]);

  const handleAddMember = useCallback(
    (member: IMember) => {
      const newMember: IProjectMember = {
        userId: member.id,
        type: 0,
        isTemp: false,
        name: member.name,
        emailAddress: member.emailAddress,
        avatarFullPath: member.avatarFullPath,
        branchDisplayName: member.branchDisplayName,
        branchColor: member.branchColor,
        userType: member.type,
      };
      membersField.onChange([...members, newMember]);
    },
    [members, membersField],
  );
  const handleRemoveMember = useCallback(
    (userId: number) => {
      membersField.onChange(members.filter((m) => m.userId !== userId));
    },
    [members, membersField],
  );
  const handleUpdateMember = useCallback(
    (userId: number, key: 'type' | 'isTemp', value: number | boolean) => {
      membersField.onChange(
        members.map((m) => (m.userId === userId ? { ...m, [key]: value } : m)),
      );
    },
    [members, membersField],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        minHeight: 460,
        overflowX: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          borderRight: showAddPanel ? '1px solid #eee' : 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1.5,
            cursor: 'pointer',
          }}
          onClick={() => setLeftOpen((p) => !p)}
        >
          <CustomTypography sx={{ fontSize: 14, fontWeight: 600 }}>
            Selected member
          </CustomTypography>
          {leftOpen ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </Box>
        <Collapse in={leftOpen}>
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
                  onChange={(e) => setShowDeactive(e.target.checked)}
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
                  onChange={(e) => setShowInactive(e.target.checked)}
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
              onChange={(e) => setLeftSearch(e.target.value)}
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
            {!showAddPanel ? (
              <CustomButton
                variant="contained"
                onClick={() => setShowAddPanel(true)}
                sx={{
                  bgcolor: '#4680ff',
                  '&:hover': { bgcolor: '#3f78ff' },
                  fontSize: 13,
                  height: 36,
                }}
              >
                Add users
              </CustomButton>
            ) : (
              <CustomButton
                variant="contained"
                onClick={() => setShowAddPanel(false)}
                sx={{
                  bgcolor: '#4680ff',
                  '&:hover': { bgcolor: '#3f78ff' },
                  fontSize: 13,
                  height: 36,
                }}
              >
                Exit add
              </CustomButton>
            )}
          </Box>

          <Box>
            {displayMembers.map((member) => (
              <SelectedMemberRow
                member={member}
                onRemove={handleRemoveMember}
                onUpdate={handleUpdateMember}
              />
            ))}
          </Box>
        </Collapse>
      </Box>
      {showAddPanel && (
        <Box sx={{ flex: '0 0 42%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              cursor: 'pointer',
            }}
            onClick={() => setRightOpen((p) => !p)}
          >
            <CustomTypography sx={{ fontSize: 14, fontWeight: 600 }}>
              Select team member
            </CustomTypography>
            {rightOpen ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </Box>
          <Collapse in={rightOpen}>
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
                  Branch
                </CustomTypography>
                <Autocomplete
                  size="small"
                  options={branchOptions}
                  getOptionLabel={(opt) => opt.name}
                  value={
                    branchOptions.find((o) => o.id === branchFilter) ??
                    branchOptions[0]
                  }
                  onChange={(_, newVal) =>
                    setBranchFilter((newVal?.id ?? 'all') as BranchFilterValue)
                  }
                  disableClearable
                  loading={loadingBranches}
                  sx={{ width: 110 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: 35,
                          fontSize: 13,
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingBranches && (
                              <CircularProgress color="inherit" size={14} />
                            )}
                          </>
                        ),
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
                  ListboxProps={{ style: { maxHeight: 220 } }}
                  isOptionEqualToValue={(opt, val) => opt.id === val.id}
                />
              </Box>
              <Box>
                <CustomTypography sx={{ fontSize: 11, color: '#888', mb: 0.3 }}>
                  Type
                </CustomTypography>
                <Select
                  size="small"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(Number(e.target.value))}
                  sx={{ fontSize: 13, height: 35, minWidth: 60 }}
                >
                  {MEMBER_TYPE_OPTIONS.map((opt) => (
                    <MenuItem
                      key={opt.value}
                      value={opt.value}
                      sx={{ fontSize: 13 }}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ flex: 1, mt: 2 }}>
                <CustomTextField
                  size="small"
                  placeholder="Search by name, email"
                  value={rightSearch}
                  onChange={(e) => setRightSearch(e.target.value)}
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
            <Box sx={{ overflowY: 'auto' }}>
              {loadingMembers ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress color="inherit" size={24} thickness={4} />
                </Box>
              ) : (
                <Box sx={{ height: 400, position: 'relative' }}>
                  {availableMember.map((user) => (
                    <AvailableUserRow
                      member={user}
                      onAddMember={handleAddMember}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>
        </Box>
      )}
    </Box>
  );
}
